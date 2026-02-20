#!/bin/bash
# BMAD 多 Agent 系统一键安装脚本
# 自动检测并部署到目标服务器

set -e

# ============ 配置 ============
# 服务器配置
declare -A SERVERS=(
    [oc]="root@47.101.164.106"
    [od]="root@47.103.59.164"
    [oe]="root@106.14.142.124"
)

declare -A PASSWORDS=(
    [oc]="1qaz!QAZ1qaz"
    [od]="1qaz!QAZ1qaz" 
    [oe]="1qaz!QAZ1qaz"
)

# 颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ============ 用法 ============
usage() {
    echo "用法: $0 <server> [password]"
    echo ""
    echo "服务器:"
    echo "  oc   - 运营中心 (47.101.164.106)"
    echo "  od   - 开发机 (47.103.59.164)"
    echo "  oe   - 测试机 (106.14.142.124)"
    echo "  all  - 部署到所有服务器"
    echo ""
    echo "示例:"
    echo "  $0 oe              # 部署到 OE"
    echo "  $0 all             # 部署到所有"
    echo "  $0 oc mypass       # 自定义密码"
    exit 1
}

# ============ 主逻辑 ============
TARGET="${1:-}"
PASSWORD="${2:-}"

if [ -z "$TARGET" ]; then
    usage
fi

# 部署到单个服务器
deploy_to() {
    local name="$1"
    local server="$2"
    local pass="$3"
    
    echo ""
    echo "=========================================="
    echo "  部署到 $name: $server"
    echo "=========================================="
    
    # 检查服务器
    if ! sshpass -p "$pass" ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$server" "echo ok" &>/dev/null; then
        log_error "无法连接到 $name"
        return 1
    fi
    
    # 执行部署脚本
    sshpass -p "$pass" ssh -o StrictHostKeyChecking=no "$server" << DEPLOY_SCRIPT
set -e

echo "[$name] 检查 OpenClaw..."
if ! command -v openclaw &> /dev/null; then
    echo "ERROR: OpenClaw CLI 未安装"
    exit 1
fi
echo "✓ OpenClaw 已安装"

# 创建目录
echo "[$name] 创建目录..."
mkdir -p /root/.openclaw/workspace/bmad-multi-agent/{agents/{analyst,pm,architect,po,sm,dev,reviewer,ux-expert,tester}/memory,orchestrator/memory,shared/{tasks,memory},skills/bmad-orchestrator}

# 创建各 Agent SOUL.md
for role in analyst pm architect po sm dev reviewer ux-expert tester; do
cat > /root/.openclaw/workspace/bmad-multi-agent/agents/\$role/SOUL.md << EOF
# SOUL.md - BMAD \$role Agent

_你是 BMAD 系统的 \$role Agent。_

## 核心能力
- [待完善]

## 工作流程
收到任务 → 处理 → 输出给下游

## 反馈机制
- 完成后等待下游确认
- 如有问题，等待上游修复后重新确认
EOF

cat > /root/.openclaw/workspace/bmad-multi-agent/agents/\$role/USER.md << 'EOF'
# USER.md
- 用户: BMAD 团队
- 时区: Asia/Shanghai
EOF
done

# 创建 Orchestrator
echo "[$name] 创建 Orchestrator..."
cat > /root/.openclaw/workspace/bmad-multi-agent/orchestrator/SOUL.md << 'EOF'
# SOUL.md - BMAD 主编排器

你是 BMAD 系统的核心编排器。

## 9 角色闭环
Analyst → PM → Architect → PO → SM → Dev → Reviewer → 用户确认

## 反馈机制
1. 每个阶段必须下游确认才能流转
2. 发现问题立即反馈给上游
3. 修复后重新提交确认
4. 最终用户确认才算完成

## API
sessions_spawn({ agentId: "bmad-pm", task: "..." })
sessions_send({ sessionKey: "...", message: "..." })
EOF

cat > /root/.openclaw/workspace/bmad-multi-agent/orchestrator/USER.md << 'EOF'
# USER.md
- 用户: BMAD 团队
EOF

# 创建共享文档
cat > /root/.openclaw/workspace/bmad-multi-agent/shared/AGENTS.md << 'EOF'
# AGENTS.md - 协作规范

## 任务流转
用户 → Analyst → PM → Architect → PO → SM → Dev → Reviewer → 用户确认

## 确认机制
- 产出必须包含：产出物清单 + 待确认项
- 下游确认格式：✅ 通过 / ❌ 需要修改
EOF

cat > /root/.openclaw/workspace/bmad-multi-agent/shared/project-context.md << 'EOF'
# 项目上下文

## 当前项目
- 名称:
- 阶段:

## 需求清单
| ID | 需求 | 优先级 | 状态 |
|----|------|--------|------|
EOF

# 创建 Skills
cat > /root/.openclaw/workspace/skills/bmad-orchestrator/SKILL.md << 'EOF'
# SKILL.md - BMAD Orchestrator

你是 BMAD 核心编排器，使用 sessions_spawn/sessions_send 自动调度。

## 9 角色
Analyst → PM → Architect → PO → SM → Dev → Reviewer → 用户

## 使用
描述需求 → 自动调度各 Agent → 每阶段确认 → 完成
EOF

echo "✓ $name 部署完成"
DEPLOY_SCRIPT
    
    if [ $? -eq 0 ]; then
        log_info "$name 部署成功"
    else
        log_error "$name 部署失败"
    fi
}

# ============ 执行 ============
case "$TARGET" in
    oc)
        deploy_to "OC" "${SERVERS[oc]}" "${PASSWORD:-${PASSWORDS[oc]}}"
        ;;
    od)
        deploy_to "OD" "${SERVERS[od]}" "${PASSWORD:-${PASSWORDS[od]}}"
        ;;
    oe)
        deploy_to "OE" "${SERVERS[oe]}" "${PASSWORD:-${PASSWORDS[oe]}}"
        ;;
    all)
        deploy_to "OC" "${SERVERS[oc]}" "${PASSWORDS[oc]}"
        deploy_to "OD" "${SERVERS[od]}" "${PASSWORDS[od]}"
        deploy_to "OE" "${SERVERS[oe]}" "${PASSWORDS[oe]}"
        ;;
    *)
        log_error "未知服务器: $TARGET"
        usage
        ;;
esac

echo ""
log_info "部署完成!"
