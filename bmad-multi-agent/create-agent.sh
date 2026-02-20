#!/bin/bash
# BMAD Agent 分身创建脚本
# 用法: ./create-agent.sh <角色名> <职责描述> <上游角色> <下游角色>

set -e

ROLE="$1"
DESC="$2"
UPSTREAM="$3"
DOWNSTREAM="$4"

if [ -z "$ROLE" ] || [ -z "$DESC" ]; then
    echo "用法: $0 <角色名> <职责描述> <上游角色> <下游角色>"
    echo "示例: $0 data-analyst '数据分析、报表生成' pm dev"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_DIR="$(dirname "$SCRIPT_DIR")/agents"
ORCHESTRATOR_DIR="$(dirname "$SCRIPT_DIR")/orchestrator"
SHARED_DIR="$(dirname "$SCRIPT_DIR")/shared"

echo "=========================================="
echo "  BMAD Agent 分身创建器"
echo "=========================================="
echo ""
echo "角色: $ROLE"
echo "职责: $DESC"
echo "上游: ${UPSTREAM:-无}"
echo "下游: ${DOWNSTREAM:-无}"
echo ""

# 创建目录
AGENT_DIR="$AGENTS_DIR/$ROLE"
mkdir -p "$AGENT_DIR/memory"

# 创建 SOUL.md
cat > "$AGENT_DIR/SOUL.md" << EOF
# SOUL.md - BMAD $ROLE Agent

_你是 BMAD 系统的 $ROLE Agent，负责 $DESC。_

## 核心能力

- $DESC

## 工作流程

收到上游任务 → 处理 → 输出给下游

## 边界

- 不越权处理其他角色职责
- 保持上下文清晰
EOF

echo "✓ 创建 $AGENT_DIR/SOUL.md"

# 创建 USER.md
cat > "$AGENT_DIR/USER.md" << 'EOF'
# USER.md - 用户信息

- **用户**: BMAD 团队
- **称呼**: 团队成员
- **时区**: Asia/Shanghai

## 期望

- 清晰的任务描述
- 明确的输出格式
- 完整的上下文信息
EOF

echo "✓ 创建 $AGENT_DIR/USER.md"

# 更新 Orchestrator
if [ -n "$UPSTREAM" ] && [ -n "$DOWNSTREAM" ]; then
    # 添加到 Agent 表格
    sed -i "/| bmad-ux-expert |/i | bmad-$ROLE | $DESC | ${UPSTREAM:-待定} | → $DOWNSTREAM |" "$ORCHESTRATOR_DIR/SOUL.md"
    echo "✓ 更新 orchestrator/SOUL.md"
fi

# 更新 AGENTS.md
cat >> "$SHARED_DIR/AGENTS.md" << EOF

## $ROLE

- **职责**: $DESC
- **上游**: ${UPSTREAM:-待定}
- **下游**: ${DOWNSTREAM:-待定}
- **目录**: agents/$ROLE/
EOF

echo "✓ 更新 shared/AGENTS.md"

echo ""
echo "=========================================="
echo "  创建完成!"
echo "=========================================="
echo ""
echo "已创建:"
echo "  - $AGENT_DIR/SOUL.md"
echo "  - $AGENT_DIR/USER.md"
echo ""
echo "下一步: 编辑 SOUL.md 完善角色定义"
