// Button 初始数据
export const buttonData = {
  // 变体
  variants: [
    { value: 'primary', label: '主要按钮', desc: '用于主要操作' },
    { value: 'secondary', label: '次要按钮', desc: '用于次要操作' },
    { value: 'ghost', label: '幽灵按钮', desc: '用于背景复杂场景' },
    { value: 'danger', label: '危险按钮', desc: '用于删除等危险操作' },
  ],
  // 尺寸
  sizes: [
    { value: 'small', label: '小', desc: '紧凑布局' },
    { value: 'medium', label: '中', desc: '默认尺寸' },
    { value: 'large', label: '大', desc: '强调操作' },
  ],
  // 状态
  states: [
    { value: 'default', label: '默认' },
    { value: 'hover', label: '悬停' },
    { value: 'active', label: '按下' },
    { value: 'disabled', label: '禁用' },
    { value: 'loading', label: '加载中' },
  ],
};

export default buttonData;
