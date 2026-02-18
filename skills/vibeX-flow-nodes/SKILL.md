---
name: vibeX-flow-nodes
description: "VibeX 流程节点生成：根据领域拆解结果生成完整的交互流程节点（入口到收口），输出 JSON 格式便于用户增删"
metadata:
  {
    "openclaw": {
      "emoji": "🔀",
      "requires": {},
      "category": "vibex"
    }
  }
---

# VibeX 流程节点生成 Skill

根据领域拆解结果，生成完整的业务流程节点列表（从入口到收口）。

## 输入

1. 领域名称：如"直播系统"
2. 领域描述：核心功能描述
3. 子域列表（可选，来自 vibeX-domain-decomposition）

## 输出格式（JSON）

```json
{
  "version": "1.0",
  "domain": "领域名称",
  "description": "领域描述",
  "flow": {
    "nodes": [
      {
        "id": "flow_1",
        "name": "节点名称",
        "description": "详细描述",
        "type": "start|action|decision|branch|end",
        "parentDomain": "所属子域",
        "features": ["涉及的功能"],
        "dependencies": ["依赖的前置节点ID"],
        "position": 1
      }
    ],
    "paths": [
      {
        "id": "path_main",
        "name": "主流程",
        "nodeIds": ["flow_1", "flow_2", "flow_3"]
      }
    ]
  }
}
```

## 节点类型

| 类型 | 说明 |
|------|------|
| start | 流程入口 |
| action | 用户动作/系统操作 |
| decision | 判断节点（条件分支） |
| branch | 分支节点 |
| end | 流程结束 |

## 示例

**输入**：用户系统

**流程节点**：
1. 进入注册页 (start)
2. 选择注册方式 (action)
3. 是否手机注册 (decision)
4. 输入手机号 (branch)
5. 获取验证码 (action)
6. 输入验证码 (action)
7. 验证成功 (decision)
8. 设置密码 (action)
9. 完善资料 (action)
10. 注册成功 (end)

## 闭环要求

确保每个流程都有：
- **入口**：用户进入的起点
- **核心路径**：主要业务流程
- **分支路径**：条件分支、异常处理
- **收口**：流程结束点
