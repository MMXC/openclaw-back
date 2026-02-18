// Button Mock 交互数据
export const buttonMock = {
  // 模拟点击事件
  onClick: {
    // 基础点击
    basic: {
      before: { loading: false },
      after: { loading: true },
      next: { loading: false, success: true },
    },
    // 确认弹窗
    confirm: {
      trigger: '点击按钮',
      modal: {
        title: '确认操作',
        content: '确定要执行此操作吗？',
        okText: '确定',
        cancelText: '取消',
      },
    },
  },
  // 模拟 API 调用
  apiCall: {
    endpoint: '/api/button/action',
    method: 'POST',
    request: {
      action: 'submit',
      timestamp: '{{$timestamp}}',
    },
    response: {
      success: {
        code: 0,
        message: '操作成功',
        data: { id: '{{$uuid}}' },
      },
      error: {
        code: 400,
        message: '操作失败',
      },
    },
  },
  // 加载状态时序
  loadingTimeline: [
    { time: 0, state: 'idle' },
    { time: 100, state: 'clicked' },
    { time: 200, state: 'loading' },
    { time: 1500, state: 'success' },
  ],
};

export default buttonMock;
