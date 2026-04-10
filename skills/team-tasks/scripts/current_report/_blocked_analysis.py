"""F2: Blocked root cause analysis — detect tasks that are pending due to unmet dependencies.

Epic2 for coord-decision-report.
"""
import json
import os
from datetime import datetime
from typing import List, Dict, Optional

TEAM_TASKS_DIR = "/root/.openclaw/workspace-coord/team-tasks"

# Whitelist: project/stage_id pairs to exclude from blocked report
# These are confirmed false positives (e.g. blocked but depends_on=null, or in-progress)
_BLOCKED_WHITELIST = [
    # vibex-analyst-proposals — in-progress, dev actively working
    "vibex-analyst-proposals/dev-epic1-基础设施修复",
    # vibex-p0-sprint — in-progress, dev actively working
    "vibex-p0-sprint/dev-epic1-reviewer-dedup",
    # vibex-p0-sprint — blocked but depends_on=null (data inconsistency)
    "vibex-p0-sprint/reviewer-epic1-reviewer-dedup",
    # vibex-tester-proposals — blocked but depends_on=null (data inconsistency)
    "vibex-tester-proposals/review-e1-test-infra",
    # vibex-architect-proposals — blocked but depends_on=null (data inconsistency)
    "vibex-architect-proposals/reviewer-epic2-design-token-motion层",
    # vibex-proposals-summary — blocked but depends_on=null (data inconsistency)
    "vibex-proposals-summary/reviewer-e2-p001p002设计投入释放",
    "vibex-proposals-summary/reviewer-push-e2-p001p002设计投入释放",
]


def get_blocked_tasks(tasks_dir: str = None) -> dict:
    """Detect blocked tasks (pending but dependencies are not all done).
    
    Returns:
        {
            "count": int,
            "blocked": [
                {
                    "project": str,
                    "task_id": str,
                    "agent": str,
                    "depends_on": List[str],
                    "blocked_by": List[str],  # dependencies that are not done
                    "blocked_duration_seconds": Optional[float],
                    "root_cause": str  # first non-done dependency
                }
            ],
            "error": Optional[str]
        }
    """
    base = tasks_dir or TEAM_TASKS_DIR

    if not os.path.isdir(base):
        return {"count": 0, "blocked": [], "error": f"Directory not found: {base}"}

    # Load all project files
    projects = {}
    try:
        # Scan root level json files
        for fname in os.listdir(base):
            if not fname.endswith(".json") or fname.startswith("."):
                continue
            fpath = os.path.join(base, fname)
            try:
                with open(fpath) as f:
                    data = json.load(f)
                project_name = data.get("project", fname.replace(".json", ""))
                projects[project_name] = data
            except (json.JSONDecodeError, OSError, UnicodeDecodeError):
                continue

        # Scan projects/ subdirectory
        projects_subdir = os.path.join(base, "projects")
        if os.path.isdir(projects_subdir):
            for subdir in os.listdir(projects_subdir):
                tpath = os.path.join(projects_subdir, subdir, "tasks.json")
                if not os.path.isfile(tpath):
                    continue
                try:
                    with open(tpath) as f:
                        data = json.load(f)
                    project_name = data.get("project", subdir)
                    projects[project_name] = data
                except (json.JSONDecodeError, OSError, UnicodeDecodeError):
                    continue
    except OSError as e:
        return {"count": 0, "blocked": [], "error": str(e)}

    # Build task status map
    task_status = {}
    for project_name, project in projects.items():
        stages = project.get("stages", {})
        for stage_name, stage_info in stages.items():
            key = f"{project_name}/{stage_name}"
            task_status[key] = {
                "status": stage_info.get("status", "pending"),
                "completed_at": stage_info.get("completedAt") or stage_info.get("completed_at")
            }

    blocked = []
    now = datetime.now().timestamp()

    for project_name, project in projects.items():
        stages = project.get("stages", {})
        for stage_name, stage_info in stages.items():
            if stage_info.get("status") != "pending":
                continue  # only pending tasks can be blocked

            depends_on = stage_info.get("dependsOn", [])
            if not depends_on:
                continue  # no dependencies = not blocked (it's ready)

            blocked_by = []
            completed_times = []
            for dep in depends_on:
                # Resolve dependency: can be "stage_name" (same project) or "project/stage_name"
                if "/" in dep:
                    dep_key = dep
                else:
                    dep_key = f"{project_name}/{dep}"

                dep_info = task_status.get(dep_key, {"status": "pending"})
                if dep_info["status"] != "done":
                    blocked_by.append(dep_key)
                else:
                    completed_at = dep_info.get("completed_at")
                    if completed_at is not None:
                        # Handle both Unix timestamp (int/float) and ISO string
                        if isinstance(completed_at, (int, float)):
                            ts = completed_at
                        elif isinstance(completed_at, str):
                            try:
                                dt = datetime.fromisoformat(completed_at.replace("Z", "+00:00"))
                                ts = dt.timestamp()
                            except Exception:
                                ts = None
                        else:
                            ts = None
                        if ts is not None:
                            completed_times.append(ts)

            if blocked_by:
                # Only show tasks whose blocker is DONE (real blocking situation)
                # Skip tasks whose blocker is also pending (they're just waiting in line)
                done_blockers = []
                for b in blocked_by:
                    b_info = task_status.get(b, {"status": "pending"})
                    if b_info["status"] == "done":
                        done_blockers.append(b)
                
                if not done_blockers:
                    continue  # All blockers are pending - this task is just in line
                
                # Task is blocked by a done task (anomaly)
                root_cause = done_blockers[0]
                blocked_by = done_blockers
                blocked_duration = None
                if completed_times:
                    latest_completed = max(completed_times)
                    blocked_duration = now - latest_completed

                # Whitelist check
                task_key = f"{project_name}/{stage_name}"
                if task_key in _BLOCKED_WHITELIST:
                    continue

                blocked.append({
                    "project": project_name,
                    "task_id": stage_name,
                    "agent": stage_info.get("agent", "unknown"),
                    "depends_on": depends_on,
                    "blocked_by": blocked_by,
                    "blocked_duration_seconds": blocked_duration,
                    "blocked_duration_str": _fmt_duration(blocked_duration),
                    "root_cause": root_cause
                })

    return {
        "count": len(blocked),
        "blocked": blocked,
        "error": None
    }


def _fmt_duration(seconds: Optional[float]) -> str:
    """Format duration as human-readable string."""
    if seconds is None or seconds < 0:
        return "unknown"
    days = int(seconds // 86400)
    hours = int((seconds % 86400) // 3600)
    mins = int((seconds % 3600) // 60)
    if days > 0:
        return f"{days}d {hours}h"
    if hours > 0:
        return f"{hours}h {mins}m"
    return f"{mins}m"
