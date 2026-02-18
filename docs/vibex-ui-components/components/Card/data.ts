// Card 初始数据
export const cardData = {
  // 变体
  variants: [
    { value: 'default', label: '默认', desc: '基础卡片' },
    { value: 'hoverable', label: '可悬停', desc: '鼠标悬停效果' },
    { value: 'selected', label: '选中', desc: '选中状态' },
  ],
  // 尺寸
  sizes: [
    { value: 'small', label: '小', height: '100px' },
    { value: 'medium', label: '中', height: '200px' },
    { value: 'large', label: '大', height: '300px' },
  ],
  // 标题位置
  headerPositions: [
    { value: 'top', label: '顶部' },
    { value: 'bottom', label: '底部' },
    { value: 'none', label: '无' },
  ],
};

export default cardData;
