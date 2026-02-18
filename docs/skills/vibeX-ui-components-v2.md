# VibeX UI 组件规格 Skill（详细版）

> 根据领域和流程节点，生成完整的 UI 组件树及详细规格

---

## Prompt

你是一位资深 UI 设计师和前端架构师。你的任务是根据领域拆解结果和流程节点，生成完整、详细的 UI 组件规格。

---

## 一、输入

1. 领域名称：如"用户系统"
2. 领域描述：核心功能描述
3. 流程节点列表（来自 vibeX-flow-nodes）

---

## 二、输出要求

### 1. 页面级组件（骨架 + 关联组件）

每个页面包含：

```json
{
  "page": {
    "id": "page_xxx",
    "name": "页面名称",
    "path": "/路由路径",
    "description": "页面功能描述",
    "layout": {
      "type": "单栏|双栏|三栏|底部导航|标签页",
      "regions": {
        "header": { "height": "64px", "content": "顶部区域" },
        "sidebar": { "width": "200px", "position": "left" },
        "content": { "minHeight": "calc(100vh - 64px)" },
        "footer": { "height": "48px", "content": "底部区域" }
      }
    },
    "components": [
      {
        "component": "组件名称",
        "position": { "region": "header|sidebar|content|footer", "order": 1 },
        "props": { "key": "value" },
        "slots": { "default": "子组件" }
      }
    ],
    "responsive": {
      "mobile": "移动端布局",
      "tablet": "平板布局",
      "desktop": "桌面布局"
    }
  }
}
```

### 2. 控件级组件（样式 + 交互 + 位置）

每个控件包含：

```json
{
  "control": {
    "name": "组件名称",
    "category": "basic|form|feedback|display|layout",
    "variants": [
      {
        "variant": "变体名称",
        "usage": "使用场景",
        "props": {
          "type": "属性类型",
          "size": "尺寸",
          "state": "状态"
        },
        "style": {
          "size": { "width": "宽度", "height": "高度", "minWidth": "最小宽度" },
          "spacing": { "padding": "内边距", "margin": "外边距", "gap": "间距" },
          "typography": { "fontSize": "14px", "fontWeight": "400", "lineHeight": "1.5" },
          "colors": { "background": "#fff", "border": "#d9d9d9", "text": "#333", "primary": "#1890ff" },
          "border": { "radius": "8px", "width": "1px", "style": "solid" },
          "shadow": "0 2px 8px rgba(0,0,0,0.1)",
          "transition": "all 0.3s ease"
        },
        "interactions": {
          "hover": { "background": "#e6f7ff", "borderColor": "#1890ff" },
          "active": { "background": "#1890ff", "text": "#fff" },
          "disabled": { "opacity": 0.5, "cursor": "not-allowed" },
          "focus": { "boxShadow": "0 0 0 2px rgba(24,144,255,0.2)" },
          "loading": { "icon": "spin", "text": "提交中..." }
        },
        "position": {
          "display": "inline-block|block|flex",
          "float": "none|left|right",
          "alignment": "flex-start|center|flex-end",
          "margin": "0 8px 8px 0"
        },
        "replaceable": true,
        "alternatives": ["替代组件1", "替代组件2"]
      }
    ],
    "slots": {
      "prefix": "前缀插槽",
      "suffix": "后缀插槽",
      "default": "默认插槽",
      "extra": "扩展插槽"
    },
    "events": {
      "onClick": "点击事件",
      "onChange": "值变化",
      "onFocus": "获得焦点",
      "onBlur": "失去焦点"
    }
  }
}
```

---

## 三、完整输出格式（JSON）

```json
{
  "version": "1.0",
  "domain": "用户系统",
  "description": "用户注册、登录、认证、管理个人资料",
  "pages": [
    {
      "id": "page_register",
      "name": "注册页",
      "path": "/register",
      "description": "用户注册页面，支持手机号注册",
      "layout": {
        "type": "单栏",
        "regions": {
          "header": {
            "height": "64px",
            "content": "Logo + 标题"
          },
          "content": {
            "minHeight": "calc(100vh - 64px - 48px)",
            "background": "#f5f5f5",
            "padding": "24px"
          },
          "footer": {
            "height": "48px",
            "content": "版权信息"
          }
        }
      },
      "components": [
        {
          "component": "Card",
          "position": { "region": "content", "order": 1 },
          "props": {
            "width": "400px",
            "centered": true,
            "bordered": false,
            "style": { "borderRadius": "12px", "boxShadow": "0 4px 12px rgba(0,0,0,0.08)" }
          },
          "slots": {
            "default": [
              {
                "component": "Typography",
                "props": { "variant": "h2", "text": "注册", "style": { "textAlign": "center", "marginBottom": "24px" } }
              },
              {
                "component": "Form",
                "props": { "layout": "vertical" },
                "slots": {
                  "default": [
                    {
                      "component": "FormItem",
                      "props": { "label": "手机号", "name": "phone", "required": true },
                      "slots": {
                        "default": {
                          "component": "Input",
                          "props": {
                            "placeholder": "请输入手机号",
                            "size": "large",
                            "maxLength": 11,
                            "prefix": { "component": "Icon", "props": { "name": "PhoneOutlined" } }
                          },
                          "style": { "height": "40px", "borderRadius": "6px" }
                        }
                      }
                    },
                    {
                      "component": "FormItem",
                      "props": { "label": "验证码", "name": "code", "required": true },
                      "slots": {
                        "default": {
                          "component": "Input",
                          "props": {
                            "placeholder": "请输入验证码",
                            "size": "large",
                            "maxLength": 6
                          },
                          "style": { "height": "40px", "borderRadius": "6px" },
                          "slots": {
                            "suffix": {
                              "component": "Button",
                              "props": {
                                "type": "link",
                                "size": "small",
                                "text": "获取验证码",
                                "style": { "whiteSpace": "nowrap" }
                              },
                              "interactions": {
                                "onClick": "发送验证码"
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "component": "FormItem",
                      "props": { "label": "密码", "name": "password", "required": true },
                      "slots": {
                        "default": {
                          "component": "Input",
                          "props": {
                            "placeholder": "请设置密码",
                            "type": "password",
                            "size": "large"
                          },
                          "style": { "height": "40px", "borderRadius": "6px" }
                        }
                      }
                    },
                    {
                      "component": "FormItem",
                      "props": { "name": "agreement" },
                      "slots": {
                        "default": {
                          "component": "Checkbox",
                          "props": { "text": "我已阅读并同意《用户协议》和《隐私政策》" }
                        }
                      }
                    },
                    {
                      "component": "FormItem",
                      "slots": {
                        "default": {
                          "component": "Button",
                          "props": {
                            "type": "primary",
                            "size": "large",
                            "text": "注册",
                            "block": true,
                            "style": { "height": "40px", "borderRadius": "8px", "fontSize": "16px" }
                          },
                          "interactions": {
                            "onClick": "提交注册",
                            "loading": { "text": "注册中..." }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "controls": [
    {
      "name": "Input",
      "category": "form",
      "variants": [
        {
          "variant": "default",
          "usage": "通用输入框",
          "props": {
            "size": "large|medium|small",
            "type": "text|password|number|textarea",
            "disabled": false,
            "readonly": false,
            "clearable": true,
            "maxLength": 100,
            "showCount": false
          },
          "style": {
            "size": {
              "large": { "height": "40px", "padding": "8px 12px", "fontSize": "16px" },
              "medium": { "height": "32px", "padding": "4px 12px", "fontSize": "14px" },
              "small": { "height": "24px", "padding": "2px 8px", "fontSize": "12px" }
            },
            "colors": {
              "background": "#ffffff",
              "border": "#d9d9d9",
              "borderFocus": "#1890ff",
              "text": "#333333",
              "placeholder": "#bfbfbf",
              "disabledBg": "#f5f5f5"
            },
            "border": {
              "radius": "6px",
              "width": "1px",
              "transition": "all 0.3s"
            }
          },
          "interactions": {
            "hover": { "borderColor": "#40a9ff" },
            "focus": { "borderColor": "#1890ff", "boxShadow": "0 0 0 2px rgba(24,144,255,0.2)" },
            "disabled": { "background": "#f5f5f5", "cursor": "not-allowed", "opacity": 0.65 }
          },
          "position": { "display": "block", "marginBottom": "16px" },
          "replaceable": true,
          "alternatives": ["Textarea", "InputNumber", "Password"]
        }
      ]
    },
    {
      "name": "Button",
      "category": "basic",
      "variants": [
        {
          "variant": "primary",
          "usage": "主要操作按钮",
          "props": {
            "type": "primary|default|dashed|text|ghost",
            "size": "large|medium|small",
            "shape": "default|round|circle",
            "disabled": false,
            "loading": false,
            "block": false,
            "icon": null
          },
          "style": {
            "size": {
              "large": { "height": "40px", "padding": "8px 20px", "fontSize": "16px" },
              "medium": { "height": "32px", "padding": "4px 16px", "fontSize": "14px" },
              "small": { "height": "24px", "padding": "2px 8px", "fontSize": "12px" }
            },
            "colors": {
              "primary": "#1890ff",
              "primaryHover": "#40a9ff",
              "primaryActive": "#096dd9",
              "defaultBg": "#ffffff",
              "defaultBorder": "#d9d9d9",
              "text": "#ffffff"
            },
            "border": {
              "radius": "8px",
              "transition": "all 0.3s"
            }
          },
          "interactions": {
            "hover": { "transform": "translateY(-1px)", "boxShadow": "0 4px 12px rgba(24,144,255,0.3)" },
            "active": { "transform": "translateY(0)", "boxShadow": "0 2px 4px rgba(24,144,255,0.2)" },
            "loading": { "icon": "Spin", "delay": 0 }
          },
          "position": { "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px" },
          "replaceable": false
        }
      ]
    },
    {
      "name": "Checkbox",
      "category": "form",
      "variants": [
        {
          "variant": "default",
          "usage": "多选框",
          "props": {
            "checked": false,
            "indeterminate": false,
            "disabled": false,
            "text": "复选框文字"
          },
          "style": {
            "size": {
              "box": "16px",
              "font": "14px"
            },
            "colors": {
              "checked": "#1890ff",
              "border": "#d9d9d9",
              "text": "#333333"
            },
            "border": {
              "radius": "4px"
            }
          },
          "interactions": {
            "hover": { "borderColor": "#1890ff" },
            "checked": { "background": "#1890ff", "borderColor": "#1890ff" }
          },
          "position": { "display": "inline-flex", "alignItems": "center", "gap": "8px" },
          "replaceable": true,
          "alternatives": ["Switch", "Toggle"]
        }
      ]
    }
  ]
}
```

---

## 四、控件级组件完整规格表

### 1. 基础组件

| 组件 | 尺寸 | 圆角 | 颜色 | 交互 | 可替换 |
|------|------|------|------|------|--------|
| Button | 40/32/24px | 8px | 主色#1890ff | hover/active/disabled | 视场景 |
| Icon | 14/16/20px | - | 继承文字色 | hover变色 | 可替换 |
| Text | 12/14/16px | - | #333 | - | - |
| Link | 14px | - | #1890ff | hover下划线 | 可替换 |

### 2. 表单组件

| 组件 | 高度 | 圆角 | 边框 | 状态 | 可替换 |
|------|------|------|------|------|--------|
| Input | 40/32/24px | 6px | 1px#d9d9d9 | default/focus/error/disabled | Textarea |
| Select | 同Input | 6px | 同Input | 同Input+open | Dropdown |
| Radio | 20/18/16px | 4px | #1890ff | checked/disabled | - |
| Checkbox | 16px | 4px | #1890ff | checked/indeterminate/disabled | Switch |
| Switch | 22/18px | 11/9px | #1890ff | checked/disabled/loading | Checkbox |
| DatePicker | 同Input | 6px | 同Input | 同Input+range | - |
| Upload | 同Input | 6px | 虚线#d9d9d9 | hover/drag/uploading | - |

### 3. 反馈组件

| 组件 | 样式 | 动画 | 位置 | 持续时间 |
|------|------|------|------|----------|
| Loading | Spin/Spinner | 旋转 | 父元素居中 | 实时 |
| Toast | 圆角8px | fadeIn/Out | 顶部居中/底部居中 | 2000ms |
| Tooltip | 深色背景 | fadeIn | 跟随鼠标 | hover触发 |
| Alert | 圆角8px | slideIn | 页面顶部/局部 | 常驻/dismissible |
| Progress | 圆角4px | 进度动画 | 线性/环形 | 实时 |

### 4. 展示组件

| 组件 | 尺寸 | 圆角 | 样式 | 可替换 |
|------|------|------|------|--------|
| Tag | auto/28px | 4px/14px | filled/outlined | Badge |
| Avatar | 40/48/64/80px | 50% | image/icon/text | - |
| Card | auto | 12px | bordered/shadowless | Panel |
| List | auto | 同Card | bordered/empty/loadMore | Table |
| Collapse | auto | 0 | bordered | Accordion |

### 5. 布局组件

| 组件 | 特性 | 响应式 | 样式 |
|------|------|--------|------|
| Grid | 24栏 | xs/sm/md/lg/xl | flex |
| Space | 8/16/24px | wrap | flex |
| Divider | 1px#e8e8e8 | horizontal/vertical | - |
| Layout | header/sider/content/footer | collapsible | - |

---

## 五、使用方式

1. 用户确认领域和流程节点
2. 调用 vibeX-flow-nodes 生成流程
3. 调用本 skill 生成完整 UI 组件规格
4. 用户可在 UI 上查看、调整组件
5. 输出用于后续页面代码生成
