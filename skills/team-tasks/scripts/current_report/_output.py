import json
from datetime import datetime, timezone
from typing import Any, Optional


def _fmt(val: Any, suffix: str = "") -> str:
    if val is None:
        return "N/A"
    return f"{val}{suffix}"


def _fmt_uptime(seconds: Optional[int]) -> str:
    if seconds is None:
        return "N/A"
    d = seconds // 86400
    h = (seconds % 86400) // 3600
    m = (seconds % 3600) // 60
    if d > 0:
        return f"{d}d {h}h {m}m"
    if h > 0:
        return f"{h}h {m}m"
    return f"{m}m"


def format_text(active: dict, false_comp: dict, server: dict,
                ready: dict = None, blocked: dict = None,
                running_agents: dict = None,
                stalled: dict = None) -> str:
    """Format report as human-readable text."""
    lines = []

    # Ready Tasks
    if ready:
        count = ready.get("count", 0)
        items = ready.get("items", [])
        if count > 0:
            lines.append(f"待执行任务 ({count})")
            for item in items[:5]:
                lines.append(f"  • {item.get('label', item.get('task_id', '?'))} P{item.get('priority', '?')}")
            if count > 5:
                lines.append(f"  ... +{count - 5} more")

    # Running Agents
    if running_agents:
        total = running_agents.get("total", 0)
        if total > 0:
            lines.append(f"正在处理任务的Agent ({total})")
            by_agent = running_agents.get("by_agent", {})
            for agent, info in sorted(by_agent.items()):
                tasks = info.get("tasks", [])
                for t in tasks[:2]:
                    lines.append(f"  • {agent}: {t.get('label', '')[:60]}")

    # Stalled
    if stalled:
        count = stalled.get("count", 0)
        if count > 0:
            lines.append(f"=== 空转阶段检测 ({count}) ===")
            for s in stalled.get("stalled", [])[:5]:
                lines.append(f"  • {s['project']}/{s['stage_id']} agent={s['agent_id']}")

    # Blocked
    if blocked:
        count = blocked.get("count", 0)
        if count > 0:
            lines.append(f"阻塞任务 ({count})")
            for t in blocked.get("blocked", [])[:5]:
                lines.append(f"  • {t['project']}/{t['task_id']} blocked_by={t['blocked_by']}")

    # Active
    active_count = active.get("count", 0)
    if active_count > 0:
        lines.append(f"活跃项目 ({active_count})")
        for p in active.get("projects", []):
            lines.append(f"  • {p['name']} {p['stage']} ({p['pending']}/{p['total']})")

    # False Completion
    fc_count = false_comp.get("count", 0)
    if fc_count > 0:
        lines.append(f"虚假完成 ({fc_count})")
        for item in false_comp.get("items", [])[:5]:
            lines.append(f"  • {item['project']}/{item['task']}")

    # Server
    if server.get("psutil_available"):
        cpu = _fmt(server.get("cpu_percent"), "%")
        mem = _fmt(server.get("memory_percent"), "%")
        lines.append(f"Server: CPU={cpu} RAM={mem}")

    return "\n".join(lines) if lines else "(no data)"


def format_json(active: dict, false_comp: dict, server: dict,
                ready: dict = None, blocked: dict = None,
                running_agents: dict = None,
                stalled: dict = None) -> str:
    """Format report as JSON."""
    return json.dumps({
        "active": active,
        "false_completion": false_comp,
        "server": server,
        "ready": ready,
        "blocked": blocked,
        "running_agents": running_agents,
        "stalled": stalled,
    }, indent=2, ensure_ascii=False)


def format_slack_blocks(active: dict, false_comp: dict, server: dict,
                        ready: dict = None, blocked: dict = None,
                        running_agents: dict = None,
                        stalled: dict = None) -> list:
    """Format report as Slack Block Kit blocks."""
    blocks = []

    # Ready Tasks
    if ready:
        count = ready.get("count", 0)
        items = ready.get("items", [])
        if count > 0:
            lines = [f"*📋 待执行任务 ({count})*"]
            for item in items[:5]:
                label = item.get("label", item.get("task_id", "?"))
                agent = item.get("agent", "")
                dur = item.get("waiting_duration_str", "?")
                pri = item.get("priority", "?")
                lines.append(f"• `<@{agent}>` `{item.get('project', '')}/{item.get('stage_id', '')}` `等待={dur}` `P{pri}`")
            if count > 5:
                lines.append(f"_... 还有 {count - 5} 个_")
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})
        else:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*📋 待执行任务 (0)*\n✓ 无待执行任务"}})

    # Running Agents
    if running_agents:
        blocks.append({"type": "divider"})
        total = running_agents.get("total", 0)
        error = running_agents.get("error")
        if error:
            blocks.append({"type": "section", "text": {
                "type": "mrkdwn",
                "text": "*🤖 正在处理任务的Agent*\n⚠️ 获取失败: " + str(error)
            }})
        elif total == 0:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*🤖 正在处理任务的Agent (0)*\n✓ 无Agent正在处理任务"}})
        else:
            by_agent = running_agents.get("by_agent", {})
            lines = [f"*🤖 正在处理任务的Agent ({total})*"]
            for agent, info in sorted(by_agent.items()):
                tasks = info.get("tasks", [])
                lines.append(f"• `{agent}` ({info['count']} task{'s' if info['count'] > 1 else ''})")
                for t in tasks[:3]:
                    lines.append(f"  └ {t.get('label', '')[:80]} `[{t.get('status', '')}, {t.get('duration', '?')}]`")
                if len(tasks) > 3:
                    lines.append(f"  └ ... +{len(tasks) - 3} more")
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})

    # Stalled
    if stalled:
        blocks.append({"type": "divider"})
        count = stalled.get("count", 0)
        items = stalled.get("stalled", [])
        error = stalled.get("error")
        if error:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*⚠️ 空转阶段检测*\n⚠️ 获取失败: " + str(error)}})
        elif count == 0:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*⚠️ 空转阶段检测 (0)*\n✓ 无空转阶段"}})
        else:
            lines = [f"*⚠️ 空转阶段检测 ({count})*"]
            for s in items[:5]:
                lines.append(f"• `{s['project']}/{s['stage_id']}` agent=`{s['agent_id']}` 空转={s.get('duration', '?')}")
                lines.append(f"  → `task update {s['project']} {s['stage_id']} ready`")
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})

    # Blocked
    if blocked:
        blocks.append({"type": "divider"})
        count = blocked.get("count", 0)
        tasks = blocked.get("blocked", [])
        if count == 0:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*🔴 阻塞任务 (0)*\n✓ 无阻塞任务"}})
        else:
            lines = [f"*🔴 阻塞任务 ({count})*"]
            for t in tasks[:5]:
                dur = t.get("blocked_duration_str", "unknown")
                sep = "`, `"
                lines.append(f"• `<@{t.get('agent', '')}>` `{t.get('project', '')}/{t.get('task_id', '')}` `阻塞={dur}`")
                lines.append(f"  └ 🚫 阻塞来源: `{sep.join(t.get('blocked_by', [])[:3])}`")
                lines.append(f"  └ ⚠️ 根因: `{t.get('root_cause', '')}`")
            text = "\n".join(lines)
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": text}})

    # Active Projects
    blocks.append({"type": "divider"})
    active_count = active.get("count", 0)
    projects = active.get("projects", [])
    if active_count == 0:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*🔄 活跃项目 (0)*\n（无）"}})
    else:
        lines = [f"*🔄 活跃项目 ({active_count})*"]
        for p in projects:
            dur = p.get("stage_duration", "?")
            warn_flag = " ⚠️" if p.get("stage_stale") else ""
            lines.append(f"• `{p['name']}` `阶段={p['stage']}` `时长={dur}{warn_flag}` `待处理={p['pending']}/{p['total']}`")
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})

    # False Completion
    blocks.append({"type": "divider"})
    fc_count = false_comp.get("count", 0)
    fc_items = false_comp.get("items", [])
    if fc_count == 0:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "*⚠️ 虚假完成检测 (0)*\n✓ 无虚假完成"}})
    else:
        lines = [f"*⚠️ 虚假完成检测 ({fc_count})*"]
        for item in fc_items[:10]:
            lines.append(f"• `{item['project']}/{item['task']}` `缺失={item.get('output', '')}`")
        if fc_count > 10:
            lines.append(f"_... 还有 {fc_count - 10} 项_")
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": "\n".join(lines)}})

    # Server Info — only show when CPU is saturated (meaningful signal)
    # CPU 没满时服务器指标是噪音，隐藏；dev 持有但不干活 → 催办即可，不靠服务器指标判断
    cpu = server.get("cpu_percent")
    _SATURATED_CPU = 80  # show server info only when CPU >= 80%
    if server.get("psutil_available") and cpu is not None and cpu >= _SATURATED_CPU:
        blocks.append({"type": "divider"})
        mem_pct = _fmt(server.get("memory_percent"), "%")
        mem_mb = server.get("memory_mb")
        disk = _fmt(server.get("disk_percent"), "%")
        uptime = _fmt_uptime(server.get("uptime_seconds"))
        blocks.append({"type": "section", "text": {
            "type": "mrkdwn",
            "text": (
                f"*🖥️ 服务器信息*\n"
                f"• CPU: {cpu}%\n"
                f"• 内存: {mem_pct} ({mem_mb}MB)\n"
                f"• 磁盘: {disk}\n"
                f"• 运行时间: {uptime}"
            )
        }})

    # Footer
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    blocks.append({"type": "context", "elements": [{"type": "mrkdwn", "text": f"_生成时间: {ts}_"}]})

    return {"blocks": blocks}
