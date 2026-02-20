# AGENTS.md - BMAD Agent 协作规范

## Agent 通讯协议

### 消息格式

**任务传递**
```
### 任务: [任务ID]
### 来源: [Agent名称]
### 目标: [Agent名称]
### 阶段: [PM/架构/开发/审查/测试]
---
### 需求/输入:
[内容]

### 期望输出:
[输出要求]
```

### 状态传递

每个任务包含:
- `task_id`: 唯一标识
- `status`: pending → in_progress → completed → blocked
- `phase`: 当前阶段
- `context`: 传递给下一个 Agent 的上下文
- `artifacts`: 产出物（PRD、代码、审查意见等）

## 协作流程

### 1. PM → Architect
- PM 产出: 完整 PRD
- 传递给 Architect: 需求文档 + 优先级
- Architect 确认: 技术可行性分析

### 2. Architect → Dev
- Architect 产出: 技术方案 + API设计
- 传递给 Dev: 设计文档 + 开发要点
- Dev 确认: 技术方案理解无误

### 3. Dev → Reviewer
- Dev 产出: 完整代码
- 传递给 Reviewer: 代码 + 自测结果
- Reviewer 确认: 审查意见

### 4. Reviewer → Dev (循环)
- Reviewer 产出: 审查意见列表
- Dev 修复后重新提交
- 直到 Reviewer 通过

### 5. Reviewer → Tester
- Reviewer 产出: 代码审查通过
- 传递给 Tester: 代码 + 设计文档
- Tester 确认: 测试计划

## 质量标准

- 每个阶段必须有明确产出
- 下一阶段以上一阶段产出为输入
- 任何阶段有问题可回溯

## 记忆共享

使用 `memory/` 目录共享:
- `project-context.md`: 项目整体上下文
- `tasks/`: 各任务的状态和产出
- `shared-decisions.md`: 共享决策记录
