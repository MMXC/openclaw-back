# SKILL.md - BMAD Agent 分身生成器

_此技能用于生成新的 BMAD Agent 分身，确保形成编排闭环。_

## 功能

1. **创建新 Agent 分身**
2. **自动配置角色**
3. **加入编排闭环**
4. **生成协作规范**

## 使用方式

```
创建新的 BMAD Agent：
- 角色名：[角色名称]
- 职责：[主要职责]
- 上游：[谁会给这个Agent任务]
- 下游：[这个Agent完成任务后交给谁]
```

## Agent 模板

当创建新 Agent 时，需要定义：

### 1. 角色定义 (SOUL.md)
```markdown
# SOUL.md - [角色名] Agent

_你是..._

## 核心能力
- 能力1
- 能力2

## 工作流程
输入 → 处理 → 输出

## 下游
[完成后交给谁]

## 边界
- 不做...
```

### 2. 用户信息 (USER.md)
- 基本信息
- 项目背景
- 期望输出格式

### 3. 编排配置 (orchestration.yaml)
```yaml
role: [角色名]
upstream: [上游角色]
downstream: [下游角色]
phase: [规划/开发/测试]
trigger: [何时触发]
```

## 闭环规则

**重要**：每个新 Agent 必须满足：
1. 有明确定义的 **上游**（谁给我任务）
2. 有明确定义的 **下游**（我完成任务给谁）
3. 有清晰的 **输入/输出** 格式
4. 纳入 **Orchestrator** 调度

### 闭环检查清单

创建新 Agent 前必须确认：
- [ ] 上游 Agent 已定义
- [ ] 下游 Agent 已定义  
- [ ] 输入格式明确
- [ ] 输出格式明确
- [ ] 异常处理方案
- [ ] 已注册到 Orchestrator

## 示例：创建 Data Analyst

### 输入
```
创建 Data Analyst
- 职责：数据分析、报表生成
- 上游：PM（根据PRD需求）
- 下游：Dev（提供数据支持）
```

### 生成的文件

1. **agents/data-analyst/SOUL.md**
2. **agents/data-analyst/USER.md**
3. **更新 orchestrator/SOUL.md 添加 data-analyst**
4. **更新 shared/AGENTS.md 添加角色**

## 自动创建脚本

运行以下命令创建新 Agent：
```bash
cd bmad-multi-agent
./create-agent.sh <角色名> <职责描述> <上游> <下游>
```

## 注意事项

- 新 Agent 必须有明确的上下游
- 避免创建"孤立"的 Agent
- 确保任务流始终闭环
