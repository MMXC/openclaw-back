// 落地页数据
export const landingPageData = {
  // 页面基础信息
  page: {
    id: 'page_001',
    name: '落地页',
    route: '/',
    description: 'VibeX 产品介绍首页',
  },

  // 导航
  navLinks: [
    { label: '首页', url: '/' },
    { label: '功能', url: '#features' },
    { label: '模板', url: '/templates' },
    { label: '定价', url: '#pricing' },
  ],

  // Hero
  hero: {
    title: 'AI 驱动，一句话生成应用原型',
    subtitle: '通过自然语言描述，快速生成完整的应用原型',
    ctaPrimary: '开始创建',
    ctaSecondary: '查看演示',
  },

  // 特性
  features: [
    { 
      id: 'feature_001',
      icon: '🧠', 
      title: 'AI 智能理解', 
      desc: '自然语言描述需求，AI 智能理解并生成原型' 
    },
    { 
      id: 'feature_002',
      icon: '🔀', 
      title: '流程图生成', 
      desc: '自动生成业务流程图，可视化展示逻辑' 
    },
    { 
      id: 'feature_003',
      icon: '📱', 
      title: '原型即所得', 
      desc: '所见即所得的设计器，快速调整原型' 
    },
    { 
      id: 'feature_004',
      icon: '📦', 
      title: '一键导出', 
      desc: '支持导出 PDF、HTML、图片等多种格式' 
    },
  ],

  // 流程步骤
  steps: [
    { num: 1, title: '描述需求', desc: '告诉 VibeX 你想要什么' },
    { num: 2, title: 'AI 分析', desc: '智能理解需求，生成结构化设计' },
    { num: 3, title: '原型生成', desc: '快速生成可交互的应用原型' },
  ],

  // 页脚
  footer: {
    products: [
      { label: '功能介绍', url: '/features' },
      { label: '使用教程', url: '/docs' },
      { label: '模板市场', url: '/templates' },
    ],
    company: [
      { label: '关于我们', url: '/about' },
      { label: '联系我们', url: '/contact' },
    ],
    legal: [
      { label: '用户协议', url: '/terms' },
      { label: '隐私政策', url: '/privacy' },
    ],
    social: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'Discord', url: 'https://discord.com' },
    ],
    copyright: '© 2026 VibeX. All rights reserved.',
  },
};

export default landingPageData;
