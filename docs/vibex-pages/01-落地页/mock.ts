// 落地页 Mock 数据
export const landingPageMock = {
  // 用户行为模拟
  behaviors: {
    ctaClick: {
      event: 'click',
      action: 'navigate',
      to: '/create',
      params: { source: 'hero_cta' },
      analytics: { event: 'cta_click', label: '开始创建' },
    },
    navClick: {
      event: 'click',
      action: 'scrollTo',
      target: 'features',
      analytics: { event: 'nav_click', label: '功能' },
    },
    featureHover: {
      event: 'mouseenter',
      action: 'highlight',
      analytics: { event: 'feature_hover', feature: '{{feature}}' },
    },
  },

  // 统计数据
  analytics: {
    pageView: {
      event: 'page_view',
      page: 'landing',
      source: '{{source}}',
    },
    ctaClicks: {
      primary: { event: 'cta_click', cta: 'primary', label: '开始创建' },
      secondary: { event: 'cta_click', cta: 'secondary', label: '查看演示' },
    },
    featureClicks: {
      event: 'feature_click',
      features: ['AI智能理解', '流程图生成', '原型即所得', '一键导出'],
    },
  },

  // A/B 测试
  abTest: {
    heroVariant: {
      A: { background: 'gradient', title: 'AI 驱动，一句话生成应用原型' },
      B: { background: 'video', title: 'AI 原型生成神器' },
    },
    ctaVariant: {
      A: { buttons: 2, primary: '开始创建', secondary: '查看演示' },
      B: { buttons: 1, primary: '立即体验' },
    },
    featureVariant: {
      A: { layout: 'grid', columns: 4 },
      B: { layout: 'carousel' },
    },
  },

  // 性能模拟
  performance: {
    fcp: '1.2s',
    lcp: '2.5s',
    tti: '3.0s',
  },

  // 用户画像
  userPersona: {
    new: {
      cta: '开始创建',
      target: '/create',
    },
    returning: {
      cta: '继续项目',
      target: '/dashboard',
    },
  },
};

export default landingPageMock;
