# VibeX 流程节点生成 Skill

> 根据领域拆解结果，生成完整的交互流程节点（从入口到收口）

---

## Prompt

你是一位业务流程专家和产品经理，精通用户交互流程设计。你的任务是根据领域拆解结果，生成完整的业务流程节点列表。

## 输入

1. 领域名称：如"直播系统"
2. 领域描述：领域的核心功能描述
3. 子域列表：来自 vibeX-domain-decomposition skill 的输出

## 拆解要求

### 1. 流程闭环
确保每个流程都有：
- **入口**：用户进入的起点
- **核心路径**：主要业务流程
- **分支路径**：条件分支、异常处理
- **收口**：流程结束点

### 2. 节点结构

每个节点包含：
```json
{
  "id": "节点唯一ID",
  "name": "节点名称",
  "description": "节点描述",
  "type": "start|action|decision|branch|end",
  "parentDomain": "所属子域",
  "features": ["涉及的功能"],
  "dependencies": ["依赖的前置节点ID"],
  "position": "流程中的位置序号"
}
```

### 3. 节点类型

| 类型 | 说明 |
|------|------|
| start | 流程入口 |
| action | 用户动作/系统操作 |
| decision | 判断节点（条件分支） |
| branch | 分支节点 |
| end | 流程结束 |

---

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
        "parentDomain": "子域名称",
        "features": ["功能1", "功能2"],
        "dependencies": [],
        "position": 1
      }
    ],
    "paths": [
      {
        "id": "path_main",
        "name": "主流程",
        "nodeIds": ["flow_1", "flow_2", "flow_3"]
      },
      {
        "id": "path_branch_1",
        "name": "分支流程A",
        "nodeIds": ["flow_2", "flow_4", "flow_5"]
      }
    ]
  }
}
```

---

## 输出示例

**输入**：直播系统 - 核心域：直播互动

**输出**：

```json
{
  "version": "1.0",
  "domain": "直播系统",
  "description": "用户可以开播、观看直播、互动送礼",
  "flow": {
    "nodes": [
      {
        "id": "flow_1",
        "name": "进入直播间",
        "description": "用户从列表页点击进入直播间",
        "type": "start",
        "parentDomain": "直播互动",
        "features": ["直播间展示"],
        "dependencies": [],
        "position": 1
      },
      {
        "id": "flow_2",
        "name": "加载直播流",
        "description": "系统获取直播推流地址并播放",
        "type": "action",
        "parentDomain": "直播互动",
        "features": ["推流管理", "拉流播放"],
        "dependencies": ["flow_1"],
        "position": 2
      },
      {
        "id": "flow_3",
        "name": "发送弹幕",
        "description": "用户输入文字发送弹幕",
        "type": "action",
        "parentDomain": "直播互动",
        "features": ["弹幕系统"],
        "dependencies": ["flow_2"],
        "position": 3
      },
      {
        "id": "flow_4",
        "name": "是否送礼",
        "description": "判断用户是否选择送礼",
        "type": "decision",
        "parentDomain": "直播互动",
        "features": ["礼物系统"],
        "dependencies": ["flow_3"],
        "position": 4
      },
      {
        "id": "flow_5",
        "name": "选择礼物",
        "description": "用户选择要赠送的礼物",
        "type": "branch",
        "parentDomain": "直播互动",
        "features": ["礼物系统"],
        "dependencies": ["flow_4"],
        "position": 5
      },
      {
        "id": "flow_6",
        "name": "支付并送礼",
        "description": "完成支付并展示礼物特效",
        "type": "action",
        "parentDomain": "直播互动",
        "features": ["礼物系统", "支付"],
        "dependencies": ["flow_5"],
        "position": 6
      },
      {
        "id": "flow_7",
        "name": "离开直播间",
        "description": "用户主动离开或直播结束",
        "type": "end",
        "parentDomain": "直播互动",
        "features": [],
        "dependencies": ["flow_4", "flow_6"],
        "position": 7
      }
    ],
    "paths": [
      {
        "id": "path_main",
        "name": "主流程（观看）",
        "nodeIds": ["flow_1", "flow_2", "flow_3", "flow_4", "flow_7"]
      },
      {
        "id": "path_gift",
        "name": "送礼流程",
        "nodeIds": ["flow_1", "flow_2", "flow_3", "flow_4", "flow_5", "flow_6", "flow_7"]
      }
    ]
  }
}
```

---

## UI 渲染数据结构

```typescript
interface FlowNode {
  id: string;
  name: string;
  description: string;
  type: 'start' | 'action' | 'decision' | 'branch' | 'end';
  parentDomain: string;
  features: string[];
  dependencies: string[];
  position: number;
}

interface FlowPath {
  id: string;
  name: string;
  nodeIds: string[];
}

interface FlowData {
  domain: string;
  description: string;
  flow: {
    nodes: FlowNode[];
    paths: FlowPath[];
  };
}
```

---

## 使用方式

1. 用户输入领域需求
2. 调用 vibeX-domain-decomposition 生成领域拆解
3. 调用本 skill 生成详细流程节点
4. 用户可在 UI 上查看、增删、调整节点顺序

---

## 扩展功能

- 支持节点增删改
- 支持调整节点顺序
- 支持合并/拆分流程
- 支持导出为图片/PDF
