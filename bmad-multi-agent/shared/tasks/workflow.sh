#!/bin/bash
# BMAD 任务自动流转脚本
# 基于 OpenClaw sessions_spawn 实现 Agent 间任务传递

set -e

# 配置
WORKSPACE="/root/.openclaw/workspace/bmad-multi-agent"
SHARED_DIR="$WORKSPACE/shared"
TASKS_DIR="$SHARED_DIR/tasks"

# Agent 顺序
AGENTS=("analyst" "pm" "architect" "po" "sm" "dev" "qa")

log() {
    echo "[BMAD] $(date '+%H:%M:%S') $1"
}

# 启动新项目流程
start_project() {
    local project_name="$1"
    
    log "启动项目: $project_name"
    
    # 创建任务文件
    local task_id=$(date +%s)
    local task_file="$TASKS_DIR/${task_id}.json"
    
    cat > "$task_file" << EOF
{
    "id": $task_id,
    "project": "$project_name",
    "phase": "analyst",
    "status": "pending",
    "started": "$(date -Iseconds)",
    "context": {}
}
EOF
    
    log "任务已创建: $task_id"
    
    # 开始第一阶段
    next_phase "$task_id" "analyst"
}

# 执行下一阶段
next_phase() {
    local task_id="$1"
    local current_phase="$2"
    
    # 找到当前阶段索引
    local current_idx=-1
    for i in "${!AGENTS[@]}"; do
        if [[ "${AGENTS[$i]}" == "$current_phase" ]]; then
            current_idx=$i
            break
        fi
    done
    
    # 检查是否有下一阶段
    if [ $current_idx -eq -1 ] || [ $current_idx -ge $((${#AGENTS[@]} - 1)) ]; then
        log "任务完成: $task_id"
        return 0
    fi
    
    local next_phase="${AGENTS[$((current_idx + 1)]}"
    
    log "流转: $current_phase → $next_phase"
    
    # 调用 OpenClaw sessions_spawn
    openclaw sessions spawn \
        --agent "bmad-$next_phase" \
        --task "继续项目: $task_id, 阶段: $next_phase" \
        --timeout 300 || true
    
    # 更新任务状态
    local task_file="$TASKS_DIR/${task_id}.json"
    if [ -f "$task_file" ]; then
        jq ".phase = \"$next_phase\" | .status = \"processing\"" "$task_file" > tmp.$$.json
        mv tmp.$$.json "$task_file"
    fi
    
    log "已触发 bmad-$next_phase"
}

# 检查任务状态
check_status() {
    echo "=== BMAD 任务状态 ==="
    ls -la "$TASKS_DIR/"*.json 2>/dev/null || echo "无任务"
}

# 主命令
case "${1:-}" in
    start)
        start_project "$2"
        ;;
    next)
        next_phase "$2" "$3"
        ;;
    status)
        check_status
        ;;
    *)
        echo "用法: $0 <command> [args]"
        echo ""
        echo "命令:"
        echo "  start <项目名>  启动新项目"
        echo "  next <task_id> <当前阶段>  执行下一阶段"
        echo "  status           查看状态"
        ;;
esac
