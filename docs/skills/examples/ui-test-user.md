# 用户系统 UI 组件规格测试

> 输入：用户系统

---

## UI 组件树

```
用户系统
├── 页面级
│   ├── 注册页 /register
│   │   ├── Input（手机号）
│   │   ├── Button（获取验证码）
│   │   ├── Input（验证码）
│   │   ├── Input（密码）
│   │   ├── Button（注册）
│   │   └── Link（去登录）
│   │
│   ├── 登录页 /login
│   │   ├── Input（账号）
│   │   ├── Input（密码）
│   │   ├── Button（登录）
│   │   ├── Link（注册）
│   │   └── Link（忘记密码）
│   │
│   └── 个人中心 /profile
│       ├── Avatar（头像）
│       ├── List（资料项）
│       ├── Button（编辑）
│       └── Drawer（编辑资料）
│
└── 控件级
    ├── 基础
    │   ├── Button
    │   ├── Icon
    │   └── Text
    │
    ├── 表单
    │   ├── Input
    │   ├── InputCode（验证码输入）
    │   ├── Checkbox（同意协议）
    │   └── Link
    │
    ├── 反馈
    │   ├── Toast（登录成功/失败）
    │   ├── Loading（提交中）
    │   └── Alert（错误提示）
    │
    └── 展示
        ├── Avatar
        └── Card
```

---

## 组件规格

### 页面级

| 页面 | 路径 | 包含组件 |
|------|------|----------|
| 注册页 | /register | Input, Button, Link |
| 登录页 | /login | Input, Button, Link |
| 个人中心 | /profile | Avatar, List, Drawer |

### 控件级

| 组件 | 类别 | 规格 |
|------|------|------|
| Button | basic | type: primary/default, size: large/medium/small |
| Input | form | placeholder, clearable, maxLength |
| Link | basic | type: default/primary |
| Avatar | display | size: 48px/64px/80px, shape: circle |
| Toast | feedback | duration: 2000ms, type: success/error/warning |
| Loading | feedback | spin, text: 提交中... |
| Drawer | page | width: 400px, placement: right |

---

## 样式规范

### 颜色

| 用途 | 色值 |
|------|------|
| 主色 | #1890ff |
| 成功 | #52c41a |
| 警告 | #faad14 |
| 错误 | #ff4d4f |
| 文字 | #333333 |
| 边框 | #d9d9d9 |
| 背景 | #ffffff |

### 间距

| 用途 | 值 |
|------|-----|
| 页面边距 | 24px |
| 组件间距 | 16px |
| 紧凑间距 | 8px |

### 圆角

| 组件 | 值 |
|------|-----|
| 按钮 | 8px |
| 输入框 | 6px |
| 卡片 | 12px |
| 头像 | 50% |
