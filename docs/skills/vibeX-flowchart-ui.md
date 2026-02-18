# VibeX 流程节点 UI 组件 Skill

> 将领域拆解结果转换为可视化流程图 UI 组件

---

## Prompt

你是一位 UI/UX 设计师和前端架构师，精通流程图设计工具。你的任务是将领域拆解结果转换为可视化的流程节点 UI 组件结构。

## 输入

领域拆解结果（JSON格式，来自 vibeX-domain-decomposition skill）

## 拆解要求

### 1. 节点类型映射
将领域/子域映射为 BPMN 风格的流程节点：

| 领域类型 | 节点类型 | UI 样式 |
|---------|---------|---------|
| 核心域-用户动作 | User Task | 矩形，含处理人图标 |
| 核心域-自动逻辑 | Service Task | 圆角矩形，齿轮图标 |
| 支撑域 | Service Task | 圆角矩形 |
| 通用域 | Service Task | 浅色矩形 |
| 流程起点 | Start Event | 圆形，绿色 |
| 流程终点 | End Event | 圆形，红色 |
| 分支/并行 | Gateway | 菱形 |

### 2. 页面级组件（容器）

| 组件 | 说明 |
|------|------|
| FlowCanvas | 流程画布，支持缩放、拖拽 |
| NodePanel | 左侧组件库面板 |
| PropertyPanel | 右侧属性配置面板 |
| Toolbar | 顶部工具栏（保存、发布、撤销、重做） |

### 3. 控件级组件（节点）

| 组件 | 说明 |
|------|------|
| StartNode | 开始节点 |
| EndNode | 结束节点 |
| TaskNode | 任务节点（用户/自动） |
| GatewayNode | 网关节点（分流/合流） |
| Edge | 连接线 |
| Anchor | 节点锚点（连接点） |

### 4. 节点状态 UI

| 状态 | UI 表现 |
|------|---------|
| 待处理 | 蓝色边框 + 闪烁动画 |
| 处理中 | 黄色高亮 |
| 已完成 | 绿色打勾 |
| 已拒绝 | 红色叉号 |
| 已跳过 | 灰色 |

### 5. 交互设计

**添加节点**：
- 拖拽：从左侧面板拖拽到画布
- 右键菜单：右键 → 添加节点 → 选择类型
- 快捷键：按 N 键弹出节点选择器

**删除节点**：
- 选中节点 → 按 Delete 键
- 选中节点 → 右键菜单 → 删除

**修改节点**：
- 双击节点 → 弹出属性编辑面板
- 选中节点 → 右侧属性栏修改

**连接节点**：
- 拖拽连接：从源节点锚点拖到目标节点
- 条件连线：双击连线设置条件

### 6. 连线样式

| 类型 | 样式 |
|------|------|
| 正常流程 | 实线 + 箭头 |
| 条件分支 | 虚线 + 箭头 |
| 主流程 | 粗实线 + 箭头 |

---

## 输出格式（JSON）

```json
{
  "version": "1.0",
  "source": {
    "domainJson": "原始领域拆解JSON"
  },
  "canvas": {
    "width": 1920,
    "height": 1080,
    "gridSize": 20,
    "backgroundColor": "#f5f5f5"
  },
  "pages": [
    {
      "id": "page_1",
      "name": "页面名称",
      "components": [
        {
          "id": "canvas_1",
          "type": "FlowCanvas",
          "props": {
            "zoom": 1,
            "panX": 0,
            "panY": 0
          }
        },
        {
          "id": "nodePanel_1",
          "type": "NodePanel",
          "position": "left",
          "width": 200
        },
        {
          "id": "propertyPanel_1",
          "type": "PropertyPanel",
          "position": "right",
          "width": 300
        }
      ]
    }
  ],
  "nodes": [
    {
      "id": "node_1",
      "type": "TaskNode",
      "bpmnType": "userTask",
      "domainId": "core_1_1",
      "name": "子域名称",
      "position": {"x": 100, "y": 100},
      "size": {"width": 120, "height": 80},
      "style": {
        "fill": "#ffffff",
        "stroke": "#1890ff",
        "borderRadius": 4
      },
      "icon": "user",
      "status": "pending",
      "properties": {
        "assignee": "",
        "description": "",
        "priority": "P0"
      }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "type": "polyline",
      "source": "node_1",
      "target": "node_2",
      "style": {
        "stroke": "#666",
        "strokeWidth": 2,
        "lineDash": null,
        "endArrow": true
      },
      "label": "",
      "condition": null
    }
  ],
  "components": {
    "page": ["FlowCanvas", "NodePanel", "PropertyPanel", "Toolbar"],
    "control": ["StartNode", "EndNode", "TaskNode", "GatewayNode", "Edge", "Anchor", "Tooltip"]
  }
}
```

---

## UI 渲染数据结构

```typescript
// 页面级组件
interface PageComponent {
  id: string;
  type: 'FlowCanvas' | 'NodePanel' | 'PropertyPanel' | 'Toolbar';
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  props?: Record<string, any>;
}

// 控件级组件
interface NodeComponent {
  id: string;
  type: 'StartNode' | 'EndNode' | 'TaskNode' | 'GatewayNode';
  bpmnType: 'startEvent' | 'endEvent' | 'userTask' | 'serviceTask' | 'exclusiveGateway' | 'parallelGateway';
  domainId: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: NodeStyle;
  status: 'pending' | 'processing' | 'completed' | 'rejected' | 'skipped';
  properties: Record<string, any>;
}

interface EdgeComponent {
  id: string;
  type: 'polyline' | 'bezier';
  source: string;
  target: string;
  style: EdgeStyle;
  label?: string;
  condition?: string;
}
```

---

## 参考开源项目

| 项目 | 特点 |
|------|------|
| LogicFlow | 滴滴开源，支持 Vue/React |
| lowflow-design | Vue3 + Element Plus |
| easy-flow | Vue + ElementUI + JsPlumb |
| vue-flow-design-plus | Vue + Ant Design Vue |

---

## 使用方式

在 VibeX 流程图编辑界面：
1. 用户确认领域拆解结果后
2. 系统自动生成流程节点布局
3. 用户可在画布上拖拽、连接、编辑节点
