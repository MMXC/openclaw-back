/**
 * VibeX Playground 配置
 * 
 * 在此配置需要展示的页面和控件
 * 添加新页面只需在此注册，无需修改代码
 */

export interface PageConfig {
  id: string;
  name: string;
  slug: string;
  path: string;
  description?: string;
  category: 'page' | 'component';
}

export interface PlaygroundConfig {
  title: string;
  description: string;
  pages: PageConfig[];
  components: PageConfig[];
}

// 页面配置 - 软链接到 ../vibex-pages/
export const pages: PageConfig[] = [
  { id: 'page_01', name: '落地页', slug: 'landing', path: '../vibex-pages/01-落地页', category: 'page' },
  { id: 'page_02', name: '登录注册页', slug: 'auth', path: '../vibex-pages/02-登录注册页', category: 'page' },
  { id: 'page_03', name: '用户中心', slug: 'dashboard', path: '../vibex-pages/03-用户中心', category: 'page' },
  { id: 'page_04', name: 'AI对话页', slug: 'chat', path: '../vibex-pages/04-AI对话页', category: 'page' },
  { id: 'page_05', name: '流程图编辑页', slug: 'flow', path: '../vibex-pages/05-流程图编辑页', category: 'page' },
  { id: 'page_06', name: '页面列表页', slug: 'pages', path: '../vibex-pages/06-页面列表页', category: 'page' },
  { id: 'page_07', name: '页面编辑页', slug: 'editor', path: '../vibex-pages/07-页面编辑页', category: 'page' },
  { id: 'page_08', name: '原型预览页', slug: 'preview', path: '../vibex-pages/08-原型预览页', category: 'page' },
  { id: 'page_09', name: '导出页面', slug: 'export', path: '../vibex-pages/09-导出页面', category: 'page' },
  { id: 'page_10', name: '项目设置页', slug: 'settings-project', path: '../vibex-pages/10-项目设置页', category: 'page' },
  { id: 'page_11', name: '模板市场页', slug: 'templates', path: '../vibex-pages/11-模板市场页', category: 'page' },
  { id: 'page_12', name: '用户设置页', slug: 'settings-user', path: '../vibex-pages/12-用户设置页', category: 'page' },
];

// 控件配置 - 软链接到 ../vibex-ui-components/components/
export const components: PageConfig[] = [
  { id: 'comp_01', name: 'Button 按钮', slug: 'button', path: '../vibex-ui-components/components/Button', category: 'component' },
  { id: 'comp_02', name: 'Card 卡片', slug: 'card', path: '../vibex-ui-components/components/Card', category: 'component' },
  // 添加更多控件...
];

// 完整配置
export const playgroundConfig: PlaygroundConfig = {
  title: 'VibeX Playground',
  description: 'UI 原型预览与测试',
  pages,
  components,
};

// 工具函数：根据 slug 获取配置
export function getConfigBySlug(slug: string): PageConfig | undefined {
  return [...pages, ...components].find(p => p.slug === slug);
}

// 工具函数：获取所有页面（用于导航）
export function getAllPages() {
  return pages;
}

// 工具函数：获取所有控件
export function getAllComponents() {
  return components;
}

export default playgroundConfig;
