---
name: vibex-ui-design
description: "VibeX 前端UI设计技能：根据页面需求生成美观、现代的UI原型，融合专业设计系统与独特美学方向"
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

根据页面需求生成美观、现代的 UI 原型。融合专业设计系统（ui-ux-pro-max）与独特美学方向（frontend-design）。

## 设计原则

### 1. 配色方案

**基础色**
- 主色：#1890ff (蓝色，专业感)
- 辅助色：#667eea → #764ba2 (渐变，现代感)
- 成功：#52c41a
- 警告：#faad14
- 错误：#ff4d4f

**背景与文字**
- 背景：#f5f5f5 (浅灰)
- 卡片背景：#ffffff
- 文字：#333333 (主要), #666666 (次要), #999999 (辅助)

**进阶配色（按产品类型）**
| 产品类型 | 推荐配色 | 风格关键词 |
|---------|---------|-----------|
| SaaS/工具 | #0ea5e9, #6366f1 | 专业、简洁、现代 |
| 电商 | #f59e0b, #ec4899 | 活力、促销、时尚 |
| 金融 | #10b981, #059669 | 可信、稳重、低调 |
| 医疗 | #14b8a6, #0d9488 | 清新、关怀、专业 |
| 美妆/生活方式 | #f472b6, #c084fc | 优雅、柔和、高级 |

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

**进阶字体配对**
| 风格 | 标题字体 | 正文字体 |
|-----|---------|---------|
| 现代简洁 | Inter, Plus Jakarta Sans | Inter, System UI |
| 优雅精致 | Playfair Display, Cormorant | Lato, Open Sans |
| 技术感 | JetBrains Mono, Space Grotesk | IBM Plex Sans |
| 杂志风 | Bebas Neue, Oswald | Source Sans Pro |

## UI 风格选择

### 推荐风格（按优先级）

1. **Minimalism (极简)**
   - 大量留白、简洁线条、黑白灰+单色点缀
   - 适合：SaaS、工具类、ToB 产品

2. **Glassmorphism (毛玻璃)**
   - 半透明背景、模糊效果、渐变边框
   - 适合：移动应用、仪表盘、特殊场景

3. **Bento Grid (便当盒)**
   - 卡片网格布局、内容块分区明确
   - 适合：个人主页、数据展示

4. **Soft Gradient (柔和渐变)**
   - 粉/蓝/紫渐变、柔和边缘
   - 适合：AI 产品、创意应用

### 避免的过时风格
- ❌ 纯紫色渐变 + 白色背景（过度使用）
- ❌ 大面积纯色 + 简单阴影
- ❌ 使用 emoji 作为图标
- ❌ 粗糙的动画效果

## 动效规范

### 微交互时长
- 快速反馈：150ms
- 常规过渡：200-300ms
- 复杂动画：400ms+

### 动画原则
- 使用 `transform` 和 `opacity`，避免 `width/height`
- 支持 `prefers-reduced-motion`
- Hover 效果：轻微位移 + 阴影增强
- 页面加载：交错出现（staggered reveal）

## 无障碍标准

### 必须遵守
- **颜色对比度**：正文至少 4.5:1
- **触摸区域**：移动端最小 44x44px
- **焦点状态**：键盘导航时可见焦点环
- **表单标签**：所有输入框有对应的 label

## 输入

```json
{
  "pageName": "页面名称",
  "pageType": "landing|auth|dashboard|chat|form|list|detail|settings|...",
  "features": ["功能1", "功能2"],
  "target": "用户群体描述",
  "style": "minimal|glassmorphism|bento|gradient|..."
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
// 登录卡片 - 柔和渐变风格
const LoginCard = () => (
  <div style={{
    maxWidth: '400px',
    margin: '60px auto',
    padding: '40px',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
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
        padding: '14px 18px',
        marginBottom: '20px',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#667eea'}
      onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
    />
    
    <input 
      type="password"
      placeholder="请输入密码"
      style={{
        width: '100%',
        padding: '14px 18px',
        marginBottom: '28px',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        fontSize: '15px',
        outline: 'none'
      }}
    />
    
    <button style={{
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseOver={(e) => {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    }}
    onMouseOut={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.3)';
    }}
    >
      登录
    </button>
  </div>
);
```

### 设计要点

1. **舒适留白**：内边距 24-40px
2. **自然圆角**：12-20px，体现现代感
3. **细腻阴影**：柔和的层次感
4. **渐变按钮**：主色调渐变 + 悬浮效果
5. **输入框**：聚焦时边框高亮
6. **动效**：hover 时轻微上浮 + 阴影加深

## 专业检查清单

交付前验证：

- [ ] 无 emoji 作为图标（使用 SVG）
- [ ] 图标风格一致（Heroicons/Lucide）
- [ ] 悬停状态有视觉反馈
- [ ] 过渡动画 150-300ms
- [ ] 移动端触摸区域 ≥44px
- [ ] 颜色对比度符合标准
- [ ] 支持键盘导航焦点
- [ ] 响应式适配 375px/768px/1024px

## 使用场景

1. 根据页面需求生成全新设计
2. 优化现有组件的视觉效果
3. 保持多页面设计一致性
4. 响应式布局适配

## 依赖 Skills

- vibeX-flow-nodes: 流程节点定义
- vibeX-ui-components: 组件规格
