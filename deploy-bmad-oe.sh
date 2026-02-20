#!/bin/bash
# BMAD 多 Agent 系统一键安装脚本
# 部署到远程 OpenClaw 服务器

set -e

# ============ 配置 ============
SERVER="${1:-root@106.14.142.124}"  # 默认 OE 服务器
PASS="${2:-1qaz!QAZ1qaz}"          # 密码

# ============ 颜色 ============
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

echo "=========================================="
echo "  BMAD Multi-Agent 一键安装脚本"
echo "  目标服务器: $SERVER"
echo "=========================================="
echo ""

# ============ 1. 检查 OpenClaw ============
log_info "检查 OpenClaw CLI..."
sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CHECK'
if ! command -v openclaw &> /dev/null; then
    echo "ERROR: OpenClaw CLI 未安装"
    exit 1
fi
echo "✓ OpenClaw 已安装"
CHECK

# ============ 2. 创建 Agent 分身 ============
log_info "创建 9 个 Agent 分身..."

AGENTS=("analyst" "pm" "architect" "po" "sm" "dev" "reviewer" "ux-expert" "tester")

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CREATE_AGENTS'
set -e

cd /root/.openclaw/workspace

# 创建主目录
mkdir -p bmad-multi-agent

# Agent 映射 (角色 -> emoji)
declare -A EMOJI=(
    [analyst]="📊" [pm]="📋" [architect]="🏗️" [po]="🎯"
    [sm]="⚡" [dev]="💻" [reviewer]="🔍" [ux-expert]="🎨" [tester]="🧪"
)

# 创建每个 Agent
for role in analyst pm architect po sm dev reviewer ux-expert tester; do
    echo "创建 bmad-$role..."
    
    # 创建目录
    mkdir -p "bmad-multi-agent/agents/$role"
    
    # 创建 SOUL.md
    cat > "bmad-multi-agent/agents/$role/SOUL.md" << EOF
# SOUL.md - BMAD $role Agent

_你是 BMAD 系统的 $role Agent。_

## 核心能力
- [待完善]

## 工作流程
收到任务 → 处理 → 输出给下游

## 反馈机制
- 完成后等待下游确认
- 如有问题，等待上游修复后重新确认

## 边界
- 不越权处理其他角色职责
EOF

    # 创建 USER.md
    cat > "bmad-multi-agent/agents/$role/USER.md" << 'EOF'
# USER.md - 用户信息

- **用户**: BMAD 团队
- **称呼**: 团队成员
- **时区**: Asia/Shanghai

## 期望
- 清晰的任务描述
- 明确的输出格式
- 完整的上下文信息
EOF

    # 创建 memory 目录
    mkdir -p "bmad-multi-agent/agents/$role/memory"
    
    echo "✓ bmad-$role"
done

echo "✓ 所有 Agent 目录创建完成"
CREATE_AGENTS

# ============ 3. 创建 Orchestrator ============
log_info "创建 Orchestrator..."

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CREATE_ORCH'
set -e

mkdir -p /root/.openclaw/workspace/bmad-multi-agent/orchestrator/memory

cat > /root/.openclaw/workspace/bmad-multi-agent/orchestrator/SOUL.md << 'EOF'
# SOUL.md - BMAD 主编排器

_你是 BMAD 系统的核心编排器，负责协调整个开发流程。_

## 核心职责

**任务分发** - 使用 sessions_spawn 创建子任务
**进度协调** - 跟踪各 Agent 任务状态
**结果汇总** - 收集各 Agent 输出

## 9 角色闭环

| Agent | 职责 | 下游 |
|-------|------|------|
| bmad-analyst | 市场分析 | → pm |
| bmad-pm | PRD编写 | → architect |
| bmad-architect | 架构设计 | → po |
| bmad-po | 故事拆分 | → sm |
| bmad-sm | 冲刺管理 | → dev |
| bmad-dev | 代码开发 | → reviewer |
| bmad-reviewer | 代码审查 | → (用户确认) |

## 反馈机制

1. 每个阶段必须下游确认才能流转
2. 发现问题立即反馈给上游
3. 修复后重新提交确认
4. 最终用户确认才算完成

## API 使用

```javascript
// 启动子任务
sessions_spawn({
  agentId: "bmad-pm",
  task: "创建xxx的PRD"
})

// 任务传递
sessions_send({
  sessionKey: "agent:main:bmad-pm:xxx",
  message: "PRD已完成，继续架构设计..."
})
```

## 边界
- 不直接写代码
- 不跳过必要阶段
- 始终保持用户知情
EOF

cat > /root/.openclaw/workspace/bmad-multi-agent/orchestrator/USER.md << 'EOF'
# USER.md - 用户信息

- **用户**: BMAD 团队
- **时区**: Asia/Shanghai
EOF

echo "✓ Orchestrator 创建完成"
CREATE_ORCH

# ============ 4. 创建共享目录 ============
log_info "创建共享目录..."

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CREATE_SHARED'
set -e

mkdir -p /root/.openclaw/workspace/bmad-multi-agent/shared/{tasks,memory}

# 创建协作规范
cat > /root/.openclaw/workspace/bmad-multi-agent/shared/AGENTS.md << 'EOF'
# AGENTS.md - BMAD Agent 协作规范

## 任务流转

```
用户 → Analyst → PM → Architect → PO → SM → Dev → Reviewer → 用户确认
```

## 状态传递

每个任务包含:
- task_id: 唯一标识
- status: pending → in_progress → completed → blocked
- phase: 当前阶段
- context: 传递给下一个 Agent 的上下文
- artifacts: 产出物

## 确认机制

- 产出必须包含：产出物清单 + 待确认项
- 下游确认格式：✅ 通过 / ❌ 需要修改
- 反馈必须具体说明问题

## 记忆共享

使用 shared/memory/ 目录共享项目上下文
EOF

# 创建项目上下文模板
cat > /root/.openclaw/workspace/bmad-multi-agent/shared/project-context.md << 'EOF'
# 项目上下文

## 当前项目

- 项目名称:
- 创建时间:
- 当前阶段:

## 项目概述

[描述项目目标]

## 需求清单

| ID | 需求 | 优先级 | 状态 |
|----|------|--------|------|
| 1 |  |  |  |

## 技术栈

- 前端:
- 后端:
- 数据库:

## 里程碑

- [ ] 阶段1: 需求分析
- [ ] 阶段2: 架构设计
- [ ] 阶段3: 开发实现
- [ ] 阶段4: 代码审查
- [ ] 阶段5: 测试验证
EOF

echo "✓ 共享目录创建完成"
CREATE_SHARED

# ============ 5. 安装 Skills ============
log_info "安装 Skills..."

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CREATE_SKILLS'
set -e

# 创建 orchestrator skill
mkdir -p /root/.openclaw/workspace/skills/bmad-orchestrator

cat > /root/.openclaw/workspace/skills/bmad-orchestrator/SKILL.md << 'EOF'
# SKILL.md - BMAD Orchestrator

你是 BMAD 系统的核心编排器。

## 9 角色闭环

Analyst → PM → Architect → PO → SM → Dev → Reviewer → 用户确认

## 使用方式

```
创建一个任务管理app
```

→ 自动调用 sessions_spawn 启动各个 Agent

## 反馈机制

每个阶段产出必须包含：
- 产出物清单
- 待确认项
- 需要下游确认的问题

下游反馈：✅ 通过 / ❌ 需要修改 + 具体问题

## API

```javascript
sessions_spawn({ agentId: "bmad-pm", task: "..." })
sessions_send({ sessionKey: "...", message: "..." })
```
EOF

echo "✓ Skills 安装完成"
CREATE_SKILLS

# ============ 6. 创建使用说明 ============
log_info "创建使用说明..."

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER << 'CREATE_README'
set -e

cat > /root/.openclaw/workspace/bmad-multi-agent/README.md << 'EOF'
# BMAD Multi-Agent System

基于 OpenClaw 原生多 Agent 模式复刻 BMAD 功能。

## 9 角色

| Agent | 职责 | Emoji |
|-------|------|-------|
| bmad-analyst | 业务分析师 | 📊 |
| bmad-pm | 产品经理 | 📋 |
| bmad-architect | 架构师 | 🏗️ |
| bmad-po | 产品负责人 | 🎯 |
| bmad-sm | Scrum Master | ⚡ |
| bmad-dev | 开发者 | 💻 |
| bmad-reviewer | 代码审查 | 🔍 |
| bmad-ux-expert | UX设计师 | 🎨 |
| bmad-tester | 测试工程师 | 🧪 |

## 工作流程

```
用户需求
    ↓
[Analyst] → [PM] → [Architect] → [PO]
    ↓
[SM] → [Dev] → [Reviewer]
    ↓
[用户确认] → 闭环
```

## 反馈机制

- 每个阶段下游确认才算完成
- 发现问题反馈给上游修复
- 循环直到用户最终确认

## 使用

1. 在群里 @机器人
2. 描述需求
3. Orchestrator 自动调度各 Agent
4. 每个阶段需要确认
5. 最终用户确认完成
EOF

echo "✓ README 创建完成"
CREATE_README

# ============ 完成 ============
echo ""
echo "=========================================="
echo "  安装完成!"
echo "=========================================="
echo ""
echo "已创建:"
echo "  - 9 个 Agent 分身 (bmad-*)"
echo "  - 1 个 Orchestrator"
echo "  - Skills 配置"
echo "  - 协作规范文档"
echo ""
echo "目录: /root/.openclaw/workspace/bmad-multi-agent/"
echo ""
echo "使用方式："
echo "  1. 在群里 @bmad-orchestrator"
echo "  2. 描述项目需求"
echo "  3. 自动流转各 Agent"
echo "  4. 每阶段确认后继续"
echo ""

