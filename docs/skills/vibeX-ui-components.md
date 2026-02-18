# VibeX UI 组件规格 Skill

> 根据领域和流程节点，生成完整的 UI 组件树及规格说明

---

## Prompt

你是一位 UI 设计师和前端组件专家。你的任务是根据领域拆解结果和流程节点，生成完整的 UI 组件树及详细规格。

## 输入

1. 领域列表（来自 vibeX-domain-decomposition）
2. 流程节点列表（来自 vibeX-flow-nodes）
3. 节点涉及的功能

---

## 输出要求

### 1. UI 组件树（树形结构）

```
├── 页面级
│   ├── 页面（Page）
│   ├── 抽屉（Drawer）
│   ├── 弹窗（Modal）
│   ├── 侧边栏（Sidebar）
│   ├── 底部导航（TabBar）
│   └── 表格（Table）
│
└── 控件级
    ├── 基础
    │   ├── 按钮（Button）
    │   ├── 图标（Icon）
    │   ├── 链接（Link）
    │   └── 文本（Text）
    ├── 表单
    │   ├── 输入框（Input）
    │   ├── 下拉框（Select）
    │   ├── 单选（Radio）
    │   ├── 复选框（Checkbox）
    │   ├── 开关（Switch）
    │   ├── 日期选择（DatePicker）
    │   └── 上传（Upload）
    ├── 反馈
    │   ├── 加载动画（Loading）
    │   ├── 提示（Toast）
    │   ├── 气泡（Tooltip）
    │   ├── 警告（Alert）
    │   └── 进度条（Progress）
    ├── 展示
    │   ├── 标签（Tag）
    │   ├── 头像（Avatar）
    │   ├── 卡片（Card）
    │   ├── 列表（List）
    │   └── 折叠面板（Collapse）
    └── 布局
        ├── 栅格（Grid）
        ├── 间距（Space）
        └── 分割线（Divider）
```

### 2. 页面级组件规格

| 组件 | 说明 | 必需属性 |
|------|------|----------|
| Page | 页面容器 | title, content |
| Drawer | 抽屉侧边栏 | visible, position, width |
| Modal | 弹窗对话框 | visible, title, footer |
| Sidebar | 侧边导航 | items, collapsed |
| TabBar | 底部导航 | tabs, active |
| Table | 表格 | columns, data, pagination |

### 3. 控件级组件规格

#### 按钮 Button
```
属性：
- type: primary | default | text | ghost
- size: large | medium | small
- state: normal | disabled | loading
- icon: 图标名称
- shape: default | round | circle

样式：
- 圆角：8px（默认）, 20px（round）, 50%（circle）
- 间距：16px 水平 padding
- 颜色：主色 #1890ff
```

#### 输入框 Input
```
属性：
- type: text | password | number | textarea
- size: large | medium | small
- state: default | error | disabled
- prefix/suffix: 前置/后置图标
- clearable: 是否可清除

样式：
- 高度：40px (large), 32px (medium), 24px (small)
- 边框圆角：6px
- 边框颜色：#d9d9d9（默认）, #ff4d4f（error）
```

#### 下拉框 Select
```
属性：
- mode: single | multiple
- size: large | medium | small
- options: 选项列表
- placeholder: 占位符
- searchable: 是否可搜索

样式：
- 下拉菜单最大高度：300px
- 选项高度：32px
- 选中背景：#e6f7ff
```

#### 单选 Radio
```
属性：
- type: radio | radioButton
- options: 选项列表
- disabled: 是否禁用

样式：
- 选中颜色：#1890ff
- 按钮样式圆角：4px
```

#### 复选框 Checkbox
```
属性：
- checked: 是否选中
- indeterminate: 半选状态
- disabled: 是否禁用
- label: 标签文本

样式：
- 选中背景：#1890ff
- 方框尺寸：16px
```

#### 加载动画 Loading
```
类型：
- spin: 旋转 spinner
- skeleton: 骨架屏
- progress: 进度条
- dots: 三个点

样式：
- 主色：#1890ff
- 骨架屏背景：#f5f5f5
- 骨架屏闪烁：animate
```

---

## 输出格式（JSON）

```json
{
  "version": "1.0",
  "domain": "领域名称",
  "uiTree": {
    "page": [
      {
        "id": "page_1",
        "name": "页面名称",
        "path": "/path",
        "components": ["组件1", "组件2"],
        "children": []
      }
    ],
    "control": {
      "basic": ["Button", "Icon", "Text"],
      "form": ["Input", "Select", "Radio", "Checkbox", "Switch", "DatePicker"],
      "feedback": ["Loading", "Toast", "Tooltip", "Alert"],
      "display": ["Tag", "Avatar", "Card", "List"],
      "layout": ["Grid", "Space", "Divider"]
    }
  },
  "components": [
    {
      "name": "Button",
      "category": "basic",
      "usage": "在哪些节点使用",
      "props": {
        "type": "primary | default",
        "size": "large | medium | small"
      },
      "style": {
        "borderRadius": "8px",
        "padding": "0 16px",
        "primaryColor": "#1890ff"
      }
    }
  ]
}
```

---

## UI 渲染数据结构

```typescript
// 页面级
interface PageSpec {
  id: string;
  name: string;
  path: string;
  components: string[];
  children?: PageSpec[];
}

// 控件级
interface ControlSpec {
  name: string;
  category: 'basic' | 'form' | 'feedback' | 'display' | 'layout';
  usage: string;
  props: Record<string, any>;
  style: Record<string, any>;
}
```

---

## 使用方式

1. 用户确认领域和流程节点
2. 调用本 skill 生成 UI 组件树
3. 用户可增删组件
4. 输出用于后续页面骨架生成
