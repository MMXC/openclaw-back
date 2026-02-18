# Button 按钮

用于触发操作的按钮组件。

## 代码文件

| 文件 | 说明 |
|------|------|
| `Button.tsx` | 组件实现 |
| `Button.module.css` | 样式 |
| `index.ts` | 导出入口 |
| `README.md` | 说明文档 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | 按钮类型 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| onClick | `() => void` | - | 点击事件 |
| children | `ReactNode` | - | 子元素 |
| className | `string` | `''` | 额外类名 |

## 样式变量

```css
--button-primary: #1890ff;
--button-danger: #ff4d4f;
--button-radius: 8px;
```

## 使用示例

```tsx
import { Button } from './components/Button';

<Button variant="primary" size="medium">
  提交
</Button>

<Button variant="danger" size="large" loading>
  删除中...
</Button>
```

## 交互状态

| 状态 | 效果 |
|------|------|
| default | 正常显示 |
| hover | 上浮 + 阴影 |
| active | 按下效果 |
| disabled | 透明度 0.6 |
| loading | 显示旋转图标 |
