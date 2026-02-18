# Header 顶部导航栏

页面顶部导航组件。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| logo | `string` | `'VibeX'` | Logo 文字 |
| navLinks | `Array<{label, url}>` | `[]` | 导航链接 |
| showLogin | `boolean` | `true` | 显示登录按钮 |
| showCta | `boolean` | `true` | 显示开始创建按钮 |

## 使用示例

```tsx
import { Header } from './controls/Header';

<Header 
  logo="VibeX"
  navLinks={[
    { label: '首页', url: '/' },
    { label: '功能', url: '#features' }
  ]}
/>
```

---

## 修改历史记录

### 2026-02-18 19:58 - 初始版本
- 创建 Header 控件
- 支持 logo、导航链接、登录按钮、CTA 按钮

### 
<!-- 在此追加新的修改记录 -->

---

## 待办
- [ ] 添加移动端 hamburger 菜单
- [ ] 添加滚动时背景模糊效果增强
