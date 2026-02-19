---
name: vibex-ui-design
description: "VibeX 前端UI设计技能：根据页面需求生成美观、现代的UI原型，包含配色方案、间距、圆角、阴影等设计规范"
metadata:
  {
    "openclaw": {
      "emoji": "🎨",
      "requires": ["vibeX-flow-nodes", "vibeX-ui-components"],
      "category": "vibex"
    }
  }
---

# VibeX 前端 UI 设计 Skill

根据页面需求生成美观、现代的 UI 原型。

## 设计原则

### 1. 配色方案
- 主色：#1890ff (蓝色，专业感)
- 辅助色：#667eea → #764ba2 (渐变，现代感)
- 成功：#52c41a
- 警告：#faad14
- 错误：#ff4d4f
- 背景：#f5f5f5 (浅灰)
- 卡片背景：#ffffff
- 文字：#333333 (主要), #666666 (次要), #999999 (辅助)

### 2. 间距系统
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

### 3. 圆角
- sm: 4px (按钮、小元素)
- md: 8px (输入框)
- lg: 12px (卡片)
- xl: 16px (大卡片)
- full: 9999px (圆形)

### 4. 阴影
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 2px 8px rgba(0,0,0,0.08)
- lg: 0 4px 16px rgba(0,0,0,0.12)

### 5. 字体
- 主字体：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- 标题：font-weight: 600-700
- 正文：font-weight: 400, line-height: 1.5-1.8

## 输入

```json
{
  "pageName": "页面名称",
  "pageType": "landing|auth|dashboard|chat|form|list|detail|settings|...",
  "features": ["功能1", "功能2"],
  "target": "用户群体描述"
}
```

## 输出格式

### 1. 页面布局配置

```json
{
  "layout": {
    "type": "full-width|boxed|centered",
    "maxWidth": "1200px",
    "background": "#f5f5f5",
    "padding": "24px"
  }
}
```

### 2. 组件设计规格

```json
{
  "components": [
    {
      "name": "组件名",
      "style": {
        "background": "#ffffff",
        "borderRadius": "12px",
        "padding": "24px",
        "boxShadow": "0 2px 8px rgba(0,0,0,0.08)",
        "marginBottom": "16px"
      },
      "typography": {
        "fontSize": "16px",
        "fontWeight": "600",
        "color": "#333333"
      },
      "interactive": {
        "hover": { "transform": "translateY(-2px)", "boxShadow": "0 4px 16px rgba(0,0,0,0.12)" },
        "active": { "transform": "translateY(0)" }
      }
    }
  ]
}
```

### 3. 完整 React 组件代码

生成可直接使用的 React 组件代码，包含：
- 完整的样式（内联或 CSS-in-JS）
- 合理的 HTML 结构
- 适当的交互状态
- 响应式设计

## 示例输出

### 登录页设计

```jsx
// 登录卡片
const LoginCard = () => (
  <div style={{
    maxWidth: '400px',
    margin: '60px auto',
    padding: '40px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
  }}>
    <h2 style={{
      margin: '0 0 32px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: '600',
      color: '#333'
    }}>
      欢迎回来
    </h2>
    
    <input 
      placeholder="请输入邮箱"
      style={{
        width: '100%',
        padding: '14px 16px',
        marginBottom: '16px',
        border: '1px solid #e8e8e8',
        borderRadius: '10px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s'
      }}
    />
    
    <button style={{
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    }}>
      登录
    </button>
  </div>
);
```

### 设计要点

1. **舒适留白**：内边距 24-40px
2. **自然圆角**：10-16px，体现现代感
3. **细腻阴影**：柔和的层次感
4. **渐变按钮**：主色调渐变，更醒目
5. **输入框**：清晰的边框，聚焦时高亮

## 使用场景

1. 根据页面需求生成全新设计
2. 优化现有组件的视觉效果
3. 保持多页面设计一致性
4. 响应式布局适配

## 依赖 Skills

- vibeX-flow-nodes: 流程节点定义
- vibeX-ui-components: 组件规格
