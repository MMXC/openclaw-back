# Hero 主视觉区域

首页主视觉展示区域。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `'AI 驱动，一句话生成应用原型'` | 主标题 |
| subtitle | `string` | `'通过自然语言描述，快速生成完整的应用原型'` | 副标题 |
| primaryText | `string` | `'开始创建'` | 主要按钮文字 |
| secondaryText | `string` | `'查看演示'` | 次要按钮文字 |
| primaryUrl | `string` | - | 主要按钮链接 |
| secondaryUrl | `string` | - | 次要按钮链接 |

## 使用示例

```tsx
import { Hero } from './controls/Hero';

<Hero 
  title="AI 驱动"
  subtitle="一句话生成应用原型"
  primaryText="开始创建"
/>
```

---

## 修改历史记录

### 2026-02-18 19:58 - 初始版本
- 创建 Hero 控件
- 支持自定义标题、副标题、按钮文字
- 添加浮动动画效果

### 
<!-- 在此追加新的修改记录 -->

---

## 待办
- [ ] 添加视频背景支持
- [ ] 添加 A/B 测试 variant
