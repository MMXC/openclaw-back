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

# Agent 列表 (9角色闭环)
AGENTS=("analyst" "pm" "architect" "po" "sm" "dev" "reviewer" "ux-expert" "tester")

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
    if openclaw agents list 2>/dev/null | grep -q "bmad-$agent"; then
        log_warn "Agent bmad-$agent 已存在，跳过创建"
        continue
    fi
    
    # 创建 Agent
    log_info "创建 bmad-$agent..."
    openclaw agents add "bmad-$agent" \
        --workspace "$agent_dir" \
        --model "minimax-cn/MiniMax-M2.5" \
        --non-interactive 2>/dev/null || true
    
    # 设置 Agent 身份
    case $agent in
        analyst)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Analyst" \
                --emoji "📊" \
                --theme "analysis" 2>/dev/null || true
            ;;
        pm)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-PM" \
                --emoji "📋" \
                --theme "product" 2>/dev/null || true
            ;;
        architect)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Archi" \
                --emoji "🏗️" \
                --theme "architecture" 2>/dev/null || true
            ;;
        po)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-PO" \
                --emoji "🎯" \
                --theme "product-owner" 2>/dev/null || true
            ;;
        sm)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-SM" \
                --emoji "⚡" \
                --theme "scrum" 2>/dev/null || true
            ;;
        dev)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Dev" \
                --emoji "💻" \
                --theme "development" 2>/dev/null || true
            ;;
        reviewer)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Review" \
                --emoji "🔍" \
                --theme "review" 2>/dev/null || true
            ;;
        ux-expert)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-UX" \
                --emoji "🎨" \
                --theme "design" 2>/dev/null || true
            ;;
        tester)
            openclaw agents set-identity "bmad-$agent" \
                --name "BMAD-Test" \
                --emoji "🧪" \
                --theme "testing" 2>/dev/null || true
            ;;
    esac
    
    log_info "✓ bmad-$agent 创建完成"
done

# 4. 创建 Orchestrator（主编排器）
log_info "创建 Orchestrator Agent..."
ORCHESTRATOR_DIR="$SCRIPT_DIR/orchestrator"
mkdir -p "$ORCHESTRATOR_DIR/memory"

if ! openclaw agents list 2>/dev/null | grep -q "bmad-orchestrator"; then
    openclaw agents add "bmad-orchestrator" \
        --workspace "$ORCHESTRATOR_DIR" \
        --model "minimax-cn/MiniMax-M2.5" \
        --non-interactive 2>/dev/null || true
    
    openclaw agents set-identity "bmad-orchestrator" \
        --name "BMAD-Orch" \
        --emoji "🎯" \
        --theme "orchestration" 2>/dev/null || true
    
    log_info "✓ bmad-orchestrator 创建完成"
else
    log_warn "Agent bmad-orchestrator 已存在，跳过创建"
fi

echo ""
echo "=========================================="
echo "  安装完成!"
echo "=========================================="
echo ""
echo "已创建的 Agent (9角色闭环):"
echo "  🎯 bmad-orchestrator - 主编排器"
echo "  📊 bmad-analyst      - 业务分析师"
echo "  📋 bmad-pm           - 产品经理"
echo "  🏗️  bmad-architect   - 架构师"
echo "  🎯 bmad-po           - 产品负责人"
echo "  ⚡ bmad-sm           - Scrum Master"
echo "  💻 bmad-dev         - 开发者"
echo "  🔍 bmad-reviewer    - 代码审查"
echo "  🎨 bmad-ux-expert   - UX设计师"
echo "  🧪 bmad-tester      - 测试工程师"
echo ""
echo "工作流程 (闭环):"
echo "  用户 → Analyst → PM → Architect → PO → SM → Dev → QA → 用户"
echo ""
echo "下一步："
echo "  1. 编辑各 Agent 的 SOUL.md 自定义角色行为"
echo "  2. 使用 ./create-agent.sh 创建新 Agent (需定义上下游)"
echo "  3. 在群里使用 @BMAD-Orchestrator 启动项目"
echo ""
