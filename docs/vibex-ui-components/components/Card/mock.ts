// Card Mock 交互数据
export const cardMock = {
  // 模拟点击事件
  onClick: {
    // 跳转
    navigate: {
      trigger: '点击卡片',
      to: '/pages/{{id}}',
      animation: 'slide-right',
    },
    // 选中
    select: {
      trigger: '点击卡片',
      before: { selected: false },
      after: { selected: true },
    },
  },
  // 模拟数据加载
  dataLoading: {
    endpoint: '/api/card/{{id}}',
    method: 'GET',
    response: {
      id: 'card_001',
      title: '示例卡片',
      content: '卡片内容区域',
      author: '张三',
      createdAt: '2026-02-18',
      stats: {
        views: 1234,
        likes: 56,
        comments: 8,
      },
    },
    skeleton: {
      title: true,
      content: true,
      author: true,
    },
  },
  // 动画效果
  animations: [
    { name: 'fade-in', duration: '0.3s' },
    { name: 'slide-up', duration: '0.3s' },
    { name: 'scale', duration: '0.2s' },
  ],
};

export default cardMock;
