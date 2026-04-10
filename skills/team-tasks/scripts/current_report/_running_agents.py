"""F7: Running agents detection.

NOTE: `openclaw tasks list` gateway calls are removed because they are slow
and frequently time out, polluting the report with "gateway timeout (15s)" errors.
The stall detection still works via direct team-task JSON inspection in
`detect_stalled_stages()` below.
"""
import json
import os


def get_running_agents() -> dict:
    """
    Return empty running agents data.

    The `openclaw tasks list` subprocess call was removed because:
    - It requires a live OpenClaw gateway connection
    - Timeouts (15s) pollute the Slack report with "gateway timeout (15s)" errors
    - Stall detection still works via team-task JSON inspection

    Returns:
        {
            "total": 0,
            "by_agent": {},
            "task_map": {},
            "error": None,
        }
    """
    return {
        "total": 0,
        "by_agent": {},
        "task_map": {},
        "error": None,
    }
# ── Stall Detection ────────────────────────────────────────────────────────────

def _load_team_task_stages() -> list:
    """Load all in-progress / ready stages from team-task JSON files.
    
    Searches in order of priority:
    1. /root/.openclaw/workspace-coord/team-tasks/*.json
    2. /root/.openclaw/skills/team-tasks/projects/*/project.json
    3. /root/.openclaw/vibex/team-tasks/*.json
    """
    import glob as _g

    search_paths = [
        "/root/.openclaw/workspace-coord/team-tasks/*.json",
        "/root/.openclaw/skills/team-tasks/projects/*/project.json",
        "/root/.openclaw/vibex/team-tasks/*.json",
    ]

    stages = []
    seen_files = set()

    for pattern in search_paths:
        for path in _g.glob(pattern):
            if path in seen_files:
                continue
            seen_files.add(path)
            try:
                data = json.load(open(path))
            except (OSError, json.JSONDecodeError):
                continue
            project = data.get("project", os.path.basename(path).replace(".json", "").replace("/project", ""))
            for sid, s in data.get("stages", {}).items():
                status = s.get("status", "")
                if status in ("in-progress", "ready"):
                    stages.append({
                        "project": project,
                        "stage_id": sid,
                        "agent_id": s.get("agent", s.get("agent_id", "")),
                        "status": status,
                        "output": s.get("output", ""),
                    })
    return stages


def _agent_key_from_agent_id(agent_id: str) -> list[str]:
    """Map a team-task agent_id to OpenClaw ownerKey prefixes to look for."""
    if not agent_id:
        return []
    # Try both "agent:X:" and "agent:X:subagent:" patterns
    return [
        f"agent:{agent_id}:",
        f"agent:{agent_id}:subagent:",
    ]


def detect_stalled_stages(running: dict) -> dict:
    """
    Cross-reference team-task in-progress/ready stages with running OpenClaw tasks.

    A stage is "stalled" if:
      - agent_id is set (not None/empty)
      - but NO OpenClaw task is running/queued for that agent
      - status is "in-progress" (not "ready" — ready means waiting for dispatch)

    Returns:
        {
            "count": int,
            "stalled": [
                {
                    "project": str,
                    "stage_id": str,
                    "agent_id": str,
                    "status": str,
                    "duration": str,      # how long since stage was marked in-progress
                }
            ],
            "error": str|None,
        }
    """
    from datetime import datetime, timezone

    task_map = running.get("task_map", {})

    # Build set of active agent prefixes
    active_agents = set()
    for owner_key in task_map:
        # Strip session/channel suffix to get agent identity
        # e.g. "agent:pm:slack:channel:C0APZP2JX2L" → "pm"
        parts = owner_key.split(":")
        if len(parts) >= 2:
            active_agents.add(parts[1])  # e.g. "pm"

    stalled = []
    try:
        stages = _load_team_task_stages()
    except Exception as e:
        return {"count": 0, "stalled": [], "error": str(e)}

    now = datetime.now(timezone.utc)
    for stage in stages:
        agent_id = stage.get("agent_id", "")
        status = stage.get("status", "")

        # Only check in-progress stages (not ready — ready means waiting for dispatch)
        if status != "in-progress":
            continue

        # If no agent assigned → wait for coord
        if not agent_id:
            continue

        # Check if this agent has any running/queued OpenClaw task
        agent_active = agent_id in active_agents

        if not agent_active:
            # Compute approximate duration
            started_at = stage.get("started_at") or stage.get("updated") or stage.get("created")
            dur_str = "unknown"
            if started_at:
                try:
                    if isinstance(started_at, (int, float)):
                        dt = datetime.fromtimestamp(started_at, tz=timezone.utc)
                    else:
                        dt = datetime.fromisoformat(str(started_at).replace("Z", "+00:00"))
                    delta = now - dt
                    total_min = int(delta.total_seconds() / 60)
                    if total_min < 1:
                        dur_str = "<1m"
                    else:
                        hours, minutes = divmod(total_min, 60)
                        dur_str = f"{hours}h {minutes}m" if hours else f"{minutes}m"
                except Exception:
                    pass

            stalled.append({
                "project": stage["project"],
                "stage_id": stage["stage_id"],
                "agent_id": agent_id,
                "status": status,
                "duration": dur_str,
            })

    return {
        "count": len(stalled),
        "stalled": stalled,
        "error": None,
    }


# ── Auto-fix stalled stages ──────────────────────────────────────────────────
_TM_BASE_PATH = None


def _get_tm_base() -> str:
    """Return task_manager base path, checking multiple possible locations."""
    global _TM_BASE_PATH
    if _TM_BASE_PATH:
        return _TM_BASE_PATH

    possible = [
        os.environ.get("OPENCLAW_TEAM_TASKS"),
        os.path.join(os.environ.get("OPENCLAW_WORKSPACE", "/root/.openclaw/vibex"), "team-tasks"),
        "/root/.openclaw/workspace-coord/team-tasks",
        "/root/.openclaw/skills/team-tasks/projects",
    ]
    for p in possible:
        if p and os.path.isdir(p):
            _TM_BASE_PATH = p
            return p
    _TM_BASE_PATH = "/root/.openclaw/vibex/team-tasks"
    return _TM_BASE_PATH


def _find_task_json(project: str) -> str | None:
    """Find the task JSON file for a project."""
    base = _get_tm_base()
    candidates = [
        os.path.join(base, f"{project}.json"),
        os.path.join(base, project, "project.json"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    # Try globbing in base dir
    import glob
    pattern = os.path.join(base, f"{project}*.json")
    matches = glob.glob(pattern)
    if matches:
        return matches[0]
    # Also check parent dir
    for parent in ["/root/.openclaw/skills/team-tasks/projects", "/root/.openclaw/vibex"]:
        pd = os.path.join(parent, project)
        if os.path.isdir(pd):
            for f in os.listdir(pd):
                if f.endswith(".json"):
                    return os.path.join(pd, f)
    return None


def _output_exists(stage_info: dict, project: str) -> bool:
    """Check if the expected output file/dir for a stage actually exists."""
    output = stage_info.get("output", "")
    if not output:
        return False
    # output can be a path or a description — only check if it looks like a path
    if not output.startswith("/") and not output.startswith("~"):
        return False
    path = os.path.expanduser(output)
    return os.path.exists(path) and os.path.getsize(path) > 0


def auto_fix_stalled_stages(running: dict, dry_run: bool = True) -> dict:
    """
    For each stalled stage:
      - If output file exists → auto-update to done (agent finished but forgot to update)
      - If output missing → leave stalled, add to notification list

    Args:
        running: output from get_running_agents()
        dry_run: if True, don't modify anything, just report what would happen

    Returns:
        {
            "fixed": [{"project", "stage_id", "agent_id", "output"}],
            "notify": [{"project", "stage_id", "agent_id", "output", "message_key"}],
            "errors": [str],
        }
    """
    import glob as _glob

    stalled_data = detect_stalled_stages(running)
    if stalled_data.get("error"):
        return {"fixed": [], "notify": [], "errors": [stalled_data["error"]]}

    fixed = []
    notify = []
    errors = []

    for stall in stalled_data.get("stalled", []):
        project = stall["project"]
        stage_id = stall["stage_id"]
        agent_id = stall["agent_id"]

        # Load task JSON to get stage info + output path
        json_path = _find_task_json(project)
        stage_info = {}
        if json_path and os.path.exists(json_path):
            try:
                data = json.load(open(json_path))
                stage_info = data.get("stages", {}).get(stage_id, {})
            except (OSError, json.JSONDecodeError) as e:
                errors.append(f"Failed to load {json_path}: {e}")

        output = stage_info.get("output", "")
        has_output = _output_exists(stage_info, project)

        if has_output:
            if dry_run:
                fixed.append({
                    "project": project,
                    "stage_id": stage_id,
                    "agent_id": agent_id,
                    "output": output,
                    "action": "would update to done",
                })
            else:
                # Run task_manager update
                import subprocess as sp
                cmd = [
                    "python3",
                    "/root/.openclaw/skills/team-tasks/scripts/task_manager.py",
                    "update", project, stage_id, "done"
                ]
                result = sp.run(cmd, capture_output=True, text=True, timeout=30)
                if result.returncode == 0:
                    fixed.append({
                        "project": project,
                        "stage_id": stage_id,
                        "agent_id": agent_id,
                        "output": output,
                        "action": "updated to done",
                    })
                else:
                    errors.append(f"update failed for {project}/{stage_id}: {result.stderr[:200]}")
        else:
            notify.append({
                "project": project,
                "stage_id": stage_id,
                "agent_id": agent_id,
                "output": output,
                "duration": stall.get("duration", "unknown"),
                "message_key": f"{project}/{stage_id}",
            })

    return {
        "fixed": fixed,
        "notify": notify,
        "errors": errors,
    }
