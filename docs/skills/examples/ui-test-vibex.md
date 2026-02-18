# VibeX 项目原型页 UI 组件测试

---

## 1. 输入

### VibeX 主要领域
- AI 对话（核心域）
- 流程图生成（核心域）
- 页面骨架生成（核心域）
- 项目管理（支撑域）

---

## 2. 页面级

### 首页 /home

```json
{
  "page": {
    "id": "page_home",
    "name": "首页/Landing",
    "path": "/",
    "description": "VibeX 落地页，引导用户开始创建",
    "layout": {
      "type": "单栏",
      "regions": {
        "header": {
          "height": "64px",
          "content": "Logo + 导航 + 登录/注册",
          "background": "#ffffff",
          "position": "fixed",
          "zIndex": 1000
        },
        "hero": {
          "height": "calc(100vh - 64px)",
          "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "display": "flex",
          "flexDirection": "column",
          "alignItems": "center",
          "justifyContent": "center",
          "textAlign": "center",
          "padding": "0 24px"
        },
        "features": {
          "padding": "80px 24px",
          "background": "#ffffff"
        },
        "footer": {
          "height": "auto",
          "padding": "24px",
          "background": "#f5f5f5"
        }
      }
    },
    "components": [
      {
        "component": "Header",
        "position": { "region": "header" },
        "slots": {
          "left": { "component": "Logo", "props": { "text": "VibeX", "height": "32px" } },
          "right": [
            { "component": "Button", "props": { "type": "text", "text": "登录" } },
            { "component": "Button", "props": { "type": "primary", "text": "开始创建" } }
          ]
        }
      },
      {
        "component": "HeroSection",
        "position": { "region": "hero" },
        "slots": {
          "title": { "component": "Typography", "variant": "h1", "text": "AI 驱动，一句话生成应用原型", "style": { "color": "#fff", "fontSize": "48px", "fontWeight": 700, "marginBottom": "16px" } },
          "subtitle": { "component": "Typography", "variant": "p", "text": "通过自然语言描述，快速生成完整的应用原型", "style": { "color": "rgba(255,255,255,0.9)", "fontSize": "18px", "marginBottom": "32px" } },
          "actions": {
            "component": "Space",
            "props": { "size": "large" },
            "slots": {
              "default": [
                { "component": "Button", "props": { "type": "primary", "size": "large", "text": "开始创建", "style": { "height": "48px", "padding": "0 32px", "borderRadius": "24px" } } },
                { "component": "Button", "props": { "type": "default", "size": "large", "text": "查看演示", "style": { "height": "48px", "padding": "0 32px", "borderRadius": "24px", "background": "rgba(255,255,255,0.2)", "borderColor": "rgba(255,255,255,0.5)", "color": "#fff" } } }
              ]
            }
          }
        }
      }
    ]
  }
}
```

---

### AI 对话页 /create

```json
{
  "page": {
    "id": "page_create",
    "name": "AI 对话创建页",
    "path": "/create",
    "description": "用户输入需求，AI 理解并生成",
    "layout": {
      "type": "双栏",
      "regions": {
        "header": { "height": "64px", "content": "返回 + 项目名称 + 设置" },
        "sidebar": { "width": "240px", "position": "left", "content": "项目列表" },
        "content": { "content": "AI 对话区域" }
      }
    },
    "components": [
      {
        "component": "Sidebar",
        "position": { "region": "sidebar" },
        "props": { "width": "240px", "collapsible": true },
        "slots": {
          "header": { "component": "Typography", "text": "我的项目", "style": { "padding": "16px", "fontWeight": 600 } },
          "default": {
            "component": "Menu",
            "props": { "mode": "vertical", "theme": "light" },
            "slots": {
              "default": [
                { "component": "MenuItem", "props": { "icon": "Plus", "text": "新建项目" } },
                { "component": "MenuItem", "props": { "icon": "Project", "text": "项目A", "active": true } },
                { "component": "MenuItem", "props": { "icon": "Project", "text": "项目B" } }
              ]
            }
          }
        }
      },
      {
        "component": "ChatArea",
        "position": { "region": "content" },
        "slots": {
          "header": {
            "component": "ChatHeader",
            "props": { "title": "告诉 VibeX 你想做什么", "subtitle": "描述你想要的应用功能" }
          },
          "messages": {
            "component": "MessageList",
            "props": { "scrollable": true },
            "slots": {
              "default": [
                { "component": "Message", "props": { "role": "user", "content": "我想做一个直播系统" } },
                { "component": "Message", "props": { "role": "assistant", "content": "好的，我来为你创建直播系统..." } }
              ]
            }
          },
          "input": {
            "component": "ChatInput",
            "props": { "placeholder": "描述你想要的应用...", "sendable": true },
            "slots": {
              "prefix": { "component": "Button", "props": { "type": "text", "icon": "Plus" } },
              "default": { "component": "Textarea", "props": { "autoSize": { "minRows": 1, "maxRows": 4 }, "placeholder": "描述你想要的应用..." } },
              "suffix": { "component": "Button", "props": { "type": "primary", "icon": "Send", "text": "发送" } }
            }
          }
        }
      }
    ]
  }
}
```

---

### 流程图编辑页 /flow

```json
{
  "page": {
    "id": "page_flow",
    "name": "流程图编辑页",
    "path": "/flow/:id",
    "description": "可视化流程图编辑器",
    "layout": {
      "type": "三栏",
      "regions": {
        "header": { "height": "56px", "content": "返回 + 标题 + 工具栏" },
        "leftSidebar": { "width": "200px", "content": "节点面板" },
        "canvas": { "content": "流程画布", "flex": 1 },
        "rightSidebar": { "width": "280px", "content": "属性面板" }
      }
    },
    "components": [
      {
        "component": "Toolbar",
        "position": { "region": "header" },
        "props": { "height": "56px" },
        "slots": {
          "left": [
            { "component": "Button", "props": { "type": "text", "icon": "ArrowLeft", "text": "返回" } },
            { "component": "Typography", "text": "直播系统流程图", "style": { "marginLeft": "16px" } }
          ],
          "right": [
            { "component": "Button", "props": { "icon": "Undo", "text": "撤销" } },
            { "component": "Button", "props": { "icon": "Redo", "text": "重做" } },
            { "component": "Button", "props": { "icon": "Save", "text": "保存" } },
            { "component": "Button", "props": { "type": "primary", "icon": "Export", "text": "导出" } }
          ]
        }
      },
      {
        "component": "NodePanel",
        "position": { "region": "leftSidebar" },
        "props": { "title": "组件库", "collapsible": true },
        "slots": {
          "default": {
            "component": "Collapse",
            "slots": {
              "default": [
                { "component": "CollapsePanel", "props": { "header": "基础节点", "slots": {
                  "default": [
                    { "component": "DraggableNode", "props": { "type": "start", "icon": "PlayCircle", "text": "开始" } },
                    { "component": "DraggableNode", "props": { "type": "end", "icon": "Stop", "text": "结束" } },
                    { "component": "DraggableNode", "props": { "type": "task", "icon": "FileText", "text": "任务" } }
                  ]
                }}},
                { "component": "CollapsePanel", "props": { "header": "网关", "slots": {
                  "default": [
                    { "component": "DraggableNode", "props": { "type": "gateway", "icon": "Api", "text": "网关" } },
                    { "component": "DraggableNode", "props": { "type": "condition", "icon": "Branches", "text": "条件" } }
                  ]
                }}
              ]
            }
          }
        }
      },
      {
        "component": "FlowCanvas",
        "position": { "region": "canvas" },
        "props": {
          "background": "#f5f5f5",
          "grid": true,
          "minimap": true,
          "zoom": { "min": 0.25, "max": 2 }
        },
        "slots": {
          "default": [
            { "component": "FlowNode", "props": { "type": "start", "x": 100, "y": 200, "label": "开始", "style": { "fill": "#52c41a", "stroke": "#52c41a" } } },
            { "component": "FlowEdge", "props": { "source": "node1", "target": "node2" } },
            { "component": "FlowNode", "props": { "type": "task", "x": 300, "y": 200, "label": "用户注册", "style": { "fill": "#1890ff", "stroke": "#1890ff" } } }
          ]
        }
      },
      {
        "component": "PropertyPanel",
        "position": { "region": "rightSidebar" },
        "props": { "title": "属性", "width": "280px" },
        "slots": {
          "default": [
            { "component": "Form", "slots": {
              "default": [
                { "component": "FormItem", "props": { "label": "节点名称", "slots": { "default": { "component": "Input", "props": { "value": "用户注册" } } }},
                { "component": "FormItem", "props": { "label": "节点类型", "slots": { "default": { "component": "Select", "props": { "value": "userTask" } } }},
                { "component": "FormItem", "props": { "label": "描述", "slots": { "default": { "component": "Textarea", "props": { "value": "用户注册流程" } } }}
              ]
            }}
          ]
        }
      }
    ]
  }
}
```

---

## 3. 控件级

### ChatInput 对话输入框

| 属性 | 值 |
|------|-----|
| 容器高度 | auto |
| 输入框 | Textarea, autoSize |
| 按钮 | primary, icon: Send |
| 位置 | 底部固定 |
| 交互 | 回车发送、shift+换行 |

### FlowCanvas 流程画布

| 属性 | 值 |
|------|-----|
| 背景 | #f5f5f5 |
| 网格 | 20px, #e8e8e8 |
| 小地图 | 右下角 |
| 缩放 | 25% - 200% |
| 交互 | 滚轮缩放、空格拖拽、节点拖拽 |

### FlowNode 流程节点

| 属性 | 值 |
|------|-----|
| 尺寸 | 120x80px |
| 圆角 | 8px |
| 阴影 | 0 2px 8px rgba(0,0,0,0.15) |
| 选中态 | 蓝色边框 + 光晕 |
| 类型颜色 | 开始:#52c41a, 任务:#1890ff, 网关:#faad14, 结束:#ff4d4f |
