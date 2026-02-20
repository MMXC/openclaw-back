#!/bin/bash
# BMAD Multi-Agent System Installer
# 使用 OpenClaw 原生多 Agent 模式复刻 BMAD 功能

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_DIR="$SCRIPT_DIR/agents"
SHARED_DIR="$SCRIPT_DIR/shared"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Agent 列表
AGENTS=("pm" "architect" "dev" "reviewer" "tester")

echo "=========================================="
echo "  BMAD Multi-Agent System Installer"
echo "  基于 OpenClaw 原生多 Agent 模式"
echo "=========================================="
echo ""

# 1. 检查 OpenClaw CLI
log_info "检查 OpenClaw CLI..."
if ! command -v openclaw &> /dev/null; then
    log_error "OpenClaw CLI 未安装，请先安装 OpenClaw"
    exit 1
fi

# 2. 创建共享上下文目录
log_info "创建共享目录..."
mkdir -p "$SHARED_DIR/tasks"

# 3. 为每个角色创建独立的 Agent
log_info "创建 BMAD Agent 分身..."

for agent in "${AGENTS[@]}"; do
    agent_dir="$AGENTS_DIR/$agent"
    
    # 检查 Agent 是否已存在
    if openclaw agents list | grep -q "bmad-$agent"; then
        log_warn "Agent bmad-$agent 已存在，跳过创建"
        continue
    fi
    
    # 创建 Agent
    log_info "创建 bmad-$agent..."
    openclaw agents add "bmad-$agent" \
        --workspace "$agent_dir" \
        --model "minimax-cn/MiniMax-M2.5" \
        --non-interactive
    
    # 设置 Agent 身份
    case $agent in
        pm)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-PM" \
                --emoji "📋" \
                --theme "product"
            ;;
        architect)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Archi" \
                --emoji "🏗️" \
                --theme "architecture"
            ;;
        dev)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Dev" \
                --emoji "💻" \
                --theme "development"
            ;;
        reviewer)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Review" \
                --emoji "🔍" \
                --theme "review"
            ;;
        tester)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Test" \
                --emoji "🧪" \
                --theme "testing"
            ;;
    esac
    
    log_info "✓ bmad-$agent 创建完成"
done

# 4. 创建 Orchestrator（主编排器）
log_info "创建 Orchestrator Agent..."
ORCHESTRATOR_DIR="$SCRIPT_DIR/orchestrator"
mkdir -p "$ORCHESTRATOR_DIR/memory"

if ! openclaw agents list | grep -q "bmad-orchestrator"; then
    openclaw agents add "bmad-orchestrator" \
        --workspace "$ORCHESTRATOR_DIR" \
        --model "minimax-cn/MiniMax-M2.5" \
        --non-interactive
    
    openclaw agents set-identity "bmad-orchestrator" \
        --name "BMAD-Orch" \
        --emoji "🎯" \
        --theme "orchestration"
    
    log_info "✓ bmad-orchestrator 创建完成"
else
    log_warn "Agent bmad-orchestrator 已存在，跳过创建"
fi

# 5. 配置消息路由（可选）
log_info "配置 Agent 间通信..."
# 这里可以添加 DingTalk/WhatsApp 等频道绑定

echo ""
echo "=========================================="
echo "  安装完成!"
echo "=========================================="
echo ""
echo "已创建的 Agent:"
echo "  🎯 bmad-orchestrator - 主编排器"
echo "  📋 bmad-pm           - 产品经理"
echo "  🏗️  bmad-architect   - 架构师"
echo "  💻 bmad-dev         - 开发者"
echo "  🔍 bmad-reviewer    - 代码审查"
echo "  🧪 bmad-tester      - 测试工程师"
echo ""
echo "下一步："
echo "  1. 编辑各 Agent 的 SOUL.md 自定义角色行为"
echo "  2. 配置共享记忆 (shared/)"
echo "  3. 在群里使用 @BMAD-Orchestrator 启动项目"
echo ""
