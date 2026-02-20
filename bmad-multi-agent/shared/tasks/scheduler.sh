#!/bin/bash
# BMAD 任务调度器
# 用于在 Agent 间自动传递任务

set -e

TASKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/shared/tasks"
QUEUE_DIR="$TASKS_DIR/queue"
DONE_DIR="$TASKS_DIR/done"
STATE_FILE="$TASKS_DIR/state.json"

# Agent 映射表
declare -A AGENT_SESSION=(
    ["pm"]="agent:main:bmad-pm:xxx"
    ["architect"]="agent:main:bmad-architect:xxx"
    ["dev"]="agent:main:bmad-dev:xxx"
    ["qa"]="agent:main:bmad-qa:xxx"
    ["po"]="agent:main:bmad-po:xxx"
    ["sm"]="agent:main:bmad-sm:xxx"
    ["analyst"]="agent:main:bmad-analyst:xxx"
    ["ux"]="agent:main:bmad-ux-expert:xxx"
)

# Agent 下游映射
declare -A NEXT_AGENT=(
    ["analyst"]="pm"
    ["pm"]="architect"
    ["architect"]="po"
    ["po"]="sm"
    ["sm"]="dev"
    ["dev"]="qa"
    ["qa"]="done"
)

init_tasks() {
    mkdir -p "$QUEUE_DIR" "$DONE_DIR"
    if [ ! -f "$STATE_FILE" ]; then
        echo '{"current": null, "queue": [], "history": []}' > "$STATE_FILE"
    fi
}

# 添加任务到队列
enqueue() {
    local task="$1"
    local from_agent="$2"
    local to_agent="${3:-orchestrator}"
    
    local task_id=$(date +%s)
    local task_file="$QUEUE_DIR/${task_id}.json"
    
    cat > "$task_file" << EOF
{
    "id": $task_id,
    "task": "$task",
    "from": "$from_agent",
    "to": "$to_agent",
    "status": "pending",
    "created": $(date -Iseconds)
}
EOF
    
    echo "✓ 任务已加入队列: $task_id"
    echo "  任务: $task"
    echo "  流程: $from_agent → $to_agent"
}

# 处理任务（调用 sessions_send）
process_task() {
    local task_file="$1"
    local task_id=$(basename "$task_file" .json)
    
    # 读取任务
    local task=$(jq -r '.task' "$task_file")
    local from=$(jq -r '.from' "$task_file")
    local to=$(jq -r '.to' "$task_file")
    
    # 获取下游 Agent
    local next="${NEXT_AGENT[$to]}"
    
    if [ "$next" = "done" ]; then
        echo "✓ 任务完成: $task_id"
        mv "$task_file" "$DONE_DIR/"
        return
    fi
    
    # 调用 sessions_send（这里只是模拟，实际需要通过 API）
    echo "→ 传递任务到 bmad-$next"
    echo "  任务: $task"
    
    # 更新状态
    mv "$task_file" "$DONE_DIR/"
}

# 查看状态
status() {
    echo "=== BMAD 任务状态 ==="
    echo "队列: $(ls $QUEUE_DIR/*.json 2>/dev/null | wc -l) 个任务"
    echo "完成: $(ls $DONE_DIR/*.json 2>/dev/null | wc -l) 个任务"
    echo ""
    cat "$STATE_FILE"
}

# 主命令
case "${1:-}" in
    init)
        init_tasks
        echo "✓ 任务队列初始化完成"
        ;;
    enqueue)
        init_tasks
        enqueue "$2" "$3" "$4"
        ;;
    process)
        init_tasks
        task_file=$(ls -t $QUEUE_DIR/*.json 2>/dev/null | head -1)
        if [ -n "$task_file" ]; then
            process_task "$task_file"
        else
            echo "队列为空"
        fi
        ;;
    status)
        init_tasks
        status
        ;;
    *)
        echo "用法: $0 <command> [args]"
        echo ""
        echo "命令:"
        echo "  init              初始化任务队列"
        echo "  enqueue <task> <from> <to>  添加任务"
        echo "  process           处理下一个任务"
        echo "  status            查看状态"
        ;;
esac
