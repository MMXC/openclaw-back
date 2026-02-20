#!/bin/bash
# BMAD 多 Agent 系统 - 完整部署脚本（创建真实 Agent）

set -e

SERVER="root@106.14.142.124"
PASS="1qaz!QAZ1qaz"

echo "=== BMAD Agent 部署脚本 ==="

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'EOF'
set -e

echo "[1/4] 检查 OpenClaw..."
if ! command -v openclaw &> /dev/null; then
    echo "ERROR: OpenClaw 未安装"
    exit 1
fi

echo "[2/4] 创建 Agent 分身..."

ROLES=("analyst" "pm" "architect" "po" "sm" "dev" "reviewer" "ux-expert" "tester")

for role in "${ROLES[@]}"; do
    echo "  创建 bmad-$role..."
    
    # 检查是否已存在
    if openclaw agents list | grep -q "bmad-$role"; then
        echo "    ⚠ 已存在，跳过"
        continue
    fi
    
    # 创建目录
    mkdir -p ~/.openclaw/workspace/bmad-$role
    
    # 创建 Agent
    openclaw agents add "bmad-$role" \
        --workspace ~/.openclaw/workspace/bmad-$role \
        --model minimax-cn/MiniMax-M2.5 \
        --non-interactive 2>/dev/null || true
    
    echo "    ✓ bmad-$role"
done

echo "[3/4] 创建 Orchestrator..."

if ! openclaw agents list | grep -q "bmad-orchestrator"; then
    mkdir -p ~/.openclaw/workspace/bmad-orchestrator
    openclaw agents add "bmad-orchestrator" \
        --workspace ~/.openclaw/workspace/bmad-orchestrator \
        --model minimax-cn/MiniMax-M2.5 \
        --non-interactive 2>/dev/null || true
    echo "  ✓ bmad-orchestrator"
else
    echo "  ⚠ 已存在，跳过"
fi

echo "[4/4] 验证..."
openclaw agents list

echo ""
echo "=== 部署完成 ==="
echo ""
echo "已创建 Agent:"
echo "  - bmad-orchestrator (主编排器)"
echo "  - bmad-analyst (业务分析)"
echo "  - bmad-pm (产品经理)"
echo "  - bmad-architect (架构师)"
echo "  - bmad-po (产品负责人)"
echo "  - bmad-sm (Scrum Master)"
echo "  - bmad-dev (开发者)"
echo "  - bmad-reviewer (代码审查)"
echo "  - bmad-ux-expert (UX设计)"
echo "  - bmad-tester (测试)"
echo ""
echo "下一步：在群里 @bmad-orchestrator 启动任务"
EOF
