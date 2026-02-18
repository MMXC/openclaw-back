# 用户系统 UI 组件规格（详细版）

---

## 1. 页面级

### 注册页 /register

```json
{
  "page": {
    "id": "page_register",
    "name": "注册页",
    "path": "/register",
    "description": "用户手机号注册",
    "layout": {
      "type": "单栏",
      "regions": {
        "header": { "height": "64px", "content": "Logo + 标题" },
        "content": { "minHeight": "calc(100vh - 112px)", "background": "#f5f5f5", "padding": "24px", "display": "flex", "justifyContent": "center", "alignItems": "center" },
        "footer": { "height": "48px", "content": "版权信息" }
      }
    },
    "components": [
      {
        "component": "Card",
        "position": { "region": "content", "order": 1 },
        "props": { "width": "400px", "bordered": false },
        "style": { "borderRadius": "12px", "boxShadow": "0 4px 12px rgba(0,0,0,0.08)" },
        "slots": {
          "default": [
            { "component": "Typography", "variant": "h2", "text": "注册", "style": { "textAlign": "center", "marginBottom": "24px" } },
            { "component": "Form", "props": { "layout": "vertical" }, "slots": {
              "default": [
                { "component": "FormItem", "label": "手机号", "required": true, "slots": {
                  "default": { "component": "Input", "placeholder": "请输入手机号", "size": "large", "maxLength": 11, "style": { "height": "40px", "borderRadius": "6px" } }
                }},
                { "component": "FormItem", "label": "验证码", "required": true, "slots": {
                  "default": { "component": "InputGroup", "slots": {
                    "addonAfter": { "component": "Button", "text": "获取验证码" }
                  }}
                }},
                { "component": "FormItem", "label": "密码", "required": true, "slots": {
                  "default": { "component": "Input", "type": "password", "size": "large", "style": { "height": "40px" } }
                }},
                { "component": "FormItem", "slots": {
                  "default": { "component": "Checkbox", "text": "我已阅读并同意《用户协议》" }
                }},
                { "component": "FormItem", "slots": {
                  "default": { "component": "Button", "type": "primary", "size": "large", "text": "注册", "block": true, "style": { "height": "40px", "borderRadius": "8px" } }
                }}
              ]
            }}
          ]
        }
      }
    ]
  }
}
```

### 登录页 /login

```json
{
  "page": {
    "id": "page_login",
    "name": "登录页",
    "path": "/login",
    "layout": { "type": "单栏", "regions": { "content": { "minHeight": "100vh", "background": "#fff", "display": "flex", "alignItems": "center", "justifyContent": "center" } } },
    "components": [
      {
        "component": "Card",
        "props": { "width": "400px", "bordered": false },
        "style": { "borderRadius": "12px", "boxShadow": "0 4px 12px rgba(0,0,0,0.08)" },
        "slots": {
          "default": [
            { "component": "Typography", "variant": "h2", "text": "登录", "style": { "textAlign": "center", "marginBottom": "24px" } },
            { "component": "Form", "slots": {
              "default": [
                { "component": "FormItem", "slots": { "default": { "component": "Input", "placeholder": "手机号/邮箱", "size": "large", "prefix": { "component": "Icon", "name": "UserOutlined" } } }},
                { "component": "FormItem", "slots": { "default": { "component": "Input", "type": "password", "placeholder": "密码", "size": "large", "prefix": { "component": "Icon", "name": "LockOutlined" } } }},
                { "component": "FormItem", "slots": { "default": { "component": "Button", "type": "primary", "size": "large", "text": "登录", "block": true } }},
                { "component": "Space", "props": { "justify": "space-between", "style": { "width": "100%" } }, "slots": {
                  "default": [
                    { "component": "Link", "text": "忘记密码?" },
                    { "component": "Link", "text": "立即注册", "props": { "to": "/register" } }
                  ]
                }}
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

## 2. 控件级

### Input 输入框

| 属性 | 值 | 说明 |
|------|-----|------|
| size | large(40px) / medium(32px) / small(24px) | 尺寸 |
| type | text / password / number / textarea | 类型 |
| borderRadius | 6px | 圆角 |
| border | 1px solid #d9d9d9 | 边框 |
| focus | border-color: #1890ff, box-shadow: 0 0 0 2px rgba(24,144,255,0.2) | 聚焦态 |
| disabled | opacity: 0.65, cursor: not-allowed, bg: #f5f5f5 | 禁用态 |
| clearable | true/false | 可清除 |
| maxLength | 100 | 最大长度 |
| 可替换 | Textarea, InputNumber | 替代组件 |

### Button 按钮

| 属性 | 值 | 说明 |
|------|-----|------|
| type | primary / default / dashed / text / ghost | 类型 |
| size | large(40px) / medium(32px) / small(24px) | 尺寸 |
| shape | default / round / circle | 形状 |
| borderRadius | 8px (default) / 20px (round) / 50% (circle) | 圆角 |
| primary颜色 | #1890ff | 主色 |
| hover | transform: translateY(-1px), box-shadow: 0 4px 12px rgba(24,144,255,0.3) | 悬停态 |
| active | transform: translateY(0) | 点击态 |
| loading | 显示Spin图标，延迟300ms | 加载态 |

### Checkbox 复选框

| 属性 | 值 |
|------|-----|
| size | 16px 方框 |
| borderRadius | 4px |
| checked颜色 | #1890ff |
| indeterminate | 半选状态 |
| 可替换 | Switch, Toggle |

### Card 卡片

| 属性 | 值 |
|------|-----|
| borderRadius | 12px |
| boxShadow | 0 4px 12px rgba(0,0,0,0.08) |
| padding | 24px |
| bordered | true / false |

---

## 3. 完整规格示例（注册页 Input 组件）

```json
{
  "component": "Input",
  "name": "手机号输入框",
  "position": { "region": "form", "order": 1 },
  "props": {
    "placeholder": "请输入手机号",
    "size": "large",
    "maxLength": 11,
    "clearable": true
  },
  "style": {
    "size": { "height": "40px", "padding": "8px 12px", "fontSize": "16px" },
    "colors": { "background": "#ffffff", "border": "#d9d9d9", "text": "#333333" },
    "border": { "radius": "6px", "width": "1px" },
    "transition": "all 0.3s"
  },
  "interactions": {
    "hover": { "borderColor": "#40a9ff" },
    "focus": { "borderColor": "#1890ff", "boxShadow": "0 0 0 2px rgba(24,144,255,0.2)" },
    "disabled": { "background": "#f5f5f5", "cursor": "not-allowed", "opacity": 0.65 }
  },
  "slots": {
    "prefix": { "component": "Icon", "name": "PhoneOutlined", "style": { "color": "#bfbfbf", "marginRight": "8px" } }
  },
  "events": {
    "onChange": "更新表单值",
    "onFocus": "记录焦点",
    "onBlur": "触发校验"
  },
  "replaceable": true,
  "alternatives": ["InputNumber", "Textarea"]
}
```
