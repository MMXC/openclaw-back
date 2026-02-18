---
name: vibeX-ui-components
description: "VibeX UI 组件规格：根据领域和流程节点生成完整 UI 组件树，包含页面级和控件级组件规格、样式、交互及数据交互格式"
metadata:
  {
    "openclaw": {
      "emoji": "🎨",
      "requires": {},
      "category": "vibex"
    }
  }
---

# VibeX UI 组件规格 Skill

根据领域和流程节点，生成完整的 UI 组件树及详细规格。

## 输入

1. 领域名称
2. 流程节点列表（来自 vibeX-flow-nodes）

## 输出格式

### 页面级组件

```json
{
  "page": {
    "id": "page_xxx",
    "name": "页面名称",
    "path": "/路由路径",
    "layout": {
      "type": "单栏|双栏|三栏",
      "regions": {
        "header": { "height": "64px" },
        "sidebar": { "width": "200px" },
        "content": { "flex": 1 }
      }
    },
    "components": [
      {
        "component": "组件名",
        "position": { "region": "header|sidebar|content", "order": 1 },
        "props": {},
        "slots": {}
      }
    ]
  }
}
```

### 控件级组件

```json
{
  "component": {
    "name": "Button",
    "category": "basic|form|feedback|display|layout",
    "variants": [
      {
        "variant": "primary",
        "props": { "type": "primary", "size": "large" },
        "style": {
          "size": { "height": "40px" },
          "colors": { "primary": "#1890ff" },
          "border": { "radius": "8px" }
        },
        "interactions": {
          "hover": {},
          "active": {},
          "disabled": {}
        },
        "replaceable": true,
        "alternatives": []
      }
    ]
  }
}
```

## 组件分类

### 页面级
- Page（页面）
- Drawer（抽屉）
- Modal（弹窗）
- Sidebar（侧边栏）
- TabBar（底部导航）
- Table（表格）

### 控件级
- **基础**：Button, Icon, Text, Link
- **表单**：Input, Select, Radio, Checkbox, Switch, DatePicker, Upload
- **反馈**：Loading, Toast, Tooltip, Alert, Progress
- **展示**：Tag, Avatar, Card, List, Collapse
- **布局**：Grid, Space, Divider

## 数据交互格式

### 请求格式

```json
{
  "component": "组件名",
  "action": "操作类型",
  "params": {},
  "options": { "loading": true }
}
```

### 响应格式

```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "code": 200
}
```

### 常见交互

| 组件 | 请求 | 响应 |
|------|------|------|
| LoginForm | POST /api/login | token + user |
| ProjectList | GET /api/projects | list + pagination |
| FlowCanvas | GET/PUT /api/flow | nodes + edges |
| ChatInput | POST /api/chat/send | reply + actions |
| Prototype | POST /api/prototype/generate | html + css + preview |

## 样式规范

- 主色：#1890ff
- 成功：#52c41a
- 警告：#faad14
- 错误：#ff4d4f
- 圆角：8px（按钮）、6px（输入框）、12px（卡片）
- 间距：24px（页面）、16px（组件）
