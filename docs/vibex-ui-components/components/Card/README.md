# Card 卡片

用于展示内容容器。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| extra | `ReactNode` | - | 额外操作 |
| children | `ReactNode` | - | 内容 |
| hoverable | `boolean` | `false` | 是否可悬停 |
| onClick | `() => void` | - | 点击事件 |
| className | `string` | `''` | 类名 |

## 使用

```tsx
<Card title="卡片标题" hoverable>
  卡片内容
</Card>
```
