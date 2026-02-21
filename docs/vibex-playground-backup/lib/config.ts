/**
 * VibeX Playground 配置
 * 
 * 页面和控件分离
 * 页面只包含骨架结构，控件实例单独配置
 */

export interface ControlInstance {
  /** 控件 ID */
  id: string;
  /** 控件类型 */
  type: string;
  /** 控件位置 */
  position: { x: number | string; y: number | string; spanX?: number };
  /** 控件尺寸 */
  size: { width: number | string; height: number | string };
  /** 控件属性 */
  props: Record<string, any>;
  /** 子控件（容器类） */
  children?: ControlInstance[];
}

export interface PageSkeleton {
  /** 页面结构 */
  layout: {
    type: 'fixed' | 'flex' | 'grid';
    areas?: string[];
    rows?: string;
    cols?: string;
  };
  /** 控件实例 */
  controls: ControlInstance[];
}

export interface PageConfig {
  id: string;
  name: string;
  slug: string;
  route: string;
  path?: string;
  description?: string;
  /** 页面骨架 */
  skeleton: PageSkeleton;
}

export interface ComponentConfig {
  id: string;
  name: string;
  slug: string;
  path: string;
  /** 控件属性定义 */
  propsDefinition: Record<string, {
    type: string;
    default: any;
    options?: any[];
    description?: string;
  }>;
}

// 页面配置 - 骨架结构 + 控件实例
export const pages: PageConfig[] = [
  {
    id: 'page_01',
    name: '落地页',
    slug: 'landing',
    route: '/',
    description: 'VibeX 产品介绍首页',
    skeleton: {
      layout: { type: 'flex', rows: '64px 1fr auto auto' },
      controls: [
        { id: 'header', type: 'Header', position: { x: 0, y: 0 }, size: { width: '100%', height: 64 }, props: {} },
        { id: 'hero', type: 'Hero', position: { x: 0, y: 64 }, size: { width: '100%', height: '100vh' }, props: {} },
        { id: 'features', type: 'FeatureGrid', position: { x: 0, y: 'auto' }, size: { width: '100%', height: 'auto' }, props: { columns: 4 } },
        { id: 'footer', type: 'Footer', position: { x: 0, y: 'auto' }, size: { width: '100%', height: 'auto' }, props: {} },
      ],
    },
  },
  {
    id: 'page_02',
    name: '登录注册页',
    slug: 'auth',
    route: '/auth',
    skeleton: {
      layout: { type: 'flex', rows: '1fr auto 1fr' },
      controls: [
        { id: 'authCard', type: 'AuthCard', position: { x: 'center', y: 'center' }, size: { width: 400, height: 'auto' }, props: {} },
      ],
    },
  },
  {
    id: 'page_03',
    name: '用户中心',
    slug: 'dashboard',
    route: '/dashboard',
    skeleton: {
      layout: { type: 'flex', rows: '64px 1fr', cols: '200px 1fr' },
      controls: [
        { id: 'header', type: 'Header', position: { x: 0, y: 0, spanX: 2 }, size: { width: '100%', height: 64 }, props: {} },
        { id: 'sidebar', type: 'Sidebar', position: { x: 0, y: 64 }, size: { width: 200, height: '100%' }, props: {} },
        { id: 'main', type: 'DashboardMain', position: { x: 1, y: 64 }, size: { width: '1fr', height: '100%' }, props: {} },
      ],
    },
  },
  {
    id: 'page_04',
    name: 'AI对话页',
    slug: 'chat',
    route: '/chat',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr', cols: '1fr 280px' },
      controls: [
        { id: 'header', type: 'ChatHeader', position: { x: 0, y: 0, spanX: 2 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'chatPanel', type: 'ChatPanel', position: { x: 0, y: 56 }, size: { width: '1fr', height: '100%' }, props: {} },
        { id: 'sidebar', type: 'ChatSidebar', position: { x: 1, y: 56 }, size: { width: 280, height: '100%' }, props: {} },
      ],
    },
  },
  {
    id: 'page_05',
    name: '流程图编辑页',
    slug: 'flow',
    route: '/flow',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr', cols: '200px 1fr 280px' },
      controls: [
        { id: 'toolbar', type: 'FlowToolbar', position: { x: 0, y: 0, spanX: 3 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'nodeLib', type: 'NodeLibrary', position: { x: 0, y: 56 }, size: { width: 200, height: '100%' }, props: {} },
        { id: 'canvas', type: 'FlowCanvas', position: { x: 1, y: 56 }, size: { width: '1fr', height: '100%' }, props: {} },
        { id: 'props', type: 'PropertiesPanel', position: { x: 2, y: 56 }, size: { width: 280, height: '100%' }, props: {} },
      ],
    },
  },
  {
    id: 'page_06',
    name: '页面列表页',
    slug: 'pages',
    route: '/pages',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr' },
      controls: [
        { id: 'header', type: 'PageListHeader', position: { x: 0, y: 0 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'grid', type: 'PageCardGrid', position: { x: 0, y: 56 }, size: { width: '100%', height: '1fr' }, props: { columns: 3 } },
      ],
    },
  },
  {
    id: 'page_07',
    name: '页面编辑页',
    slug: 'editor',
    route: '/editor',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr 48px', cols: '200px 1fr 280px' },
      controls: [
        { id: 'toolbar', type: 'EditorToolbar', position: { x: 0, y: 0, spanX: 3 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'components', type: 'ComponentPanel', position: { x: 0, y: 56 }, size: { width: 200, height: '100%' }, props: {} },
        { id: 'canvas', type: 'EditorCanvas', position: { x: 1, y: 56 }, size: { width: '1fr', height: '100%' }, props: {} },
        { id: 'props', type: 'EditorProps', position: { x: 2, y: 56 }, size: { width: 280, height: '100%' }, props: {} },
        { id: 'device', type: 'DeviceSwitcher', position: { x: 1, y: 'auto' }, size: { width: '100%', height: 48 }, props: {} },
      ],
    },
  },
  {
    id: 'page_08',
    name: '原型预览页',
    slug: 'preview',
    route: '/preview',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr 64px', cols: '1fr auto' },
      controls: [
        { id: 'header', type: 'PreviewHeader', position: { x: 0, y: 0, spanX: 2 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'preview', type: 'DevicePreview', position: { x: 0, y: 56 }, size: { width: '1fr', height: '100%' }, props: {} },
        { id: 'tools', type: 'FloatTools', position: { x: 1, y: 56 }, size: { width: 60, height: '100%' }, props: {} },
        { id: 'nav', type: 'PreviewNav', position: { x: 0, y: 'auto', spanX: 2 }, size: { width: '100%', height: 64 }, props: {} },
      ],
    },
  },
  {
    id: 'page_09',
    name: '导出页面',
    slug: 'export',
    route: '/export',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr' },
      controls: [
        { id: 'header', type: 'ExportHeader', position: { x: 0, y: 0 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'content', type: 'ExportContent', position: { x: 0, y: 56 }, size: { width: '100%', height: '1fr' }, props: {} },
      ],
    },
  },
  {
    id: 'page_10',
    name: '项目设置页',
    slug: 'settings-project',
    route: '/settings/project',
    skeleton: {
      layout: { type: 'flex', rows: '56px 1fr', cols: '200px 1fr' },
      controls: [
        { id: 'header', type: 'SettingsHeader', position: { x: 0, y: 0, spanX: 2 }, size: { width: '100%', height: 56 }, props: {} },
        { id: 'nav', type: 'SettingsNav', position: { x: 0, y: 56 }, size: { width: 200, height: '100%' }, props: {} },
        { id: 'content', type: 'ProjectSettings', position: { x: 1, y: 56 }, size: { width: '1fr', height: '100%' }, props: {} },
      ],
    },
  },
  {
    id: 'page_11',
    name: '模板市场页',
    slug: 'templates',
    route: '/templates',
    skeleton: {
      layout: { type: 'flex', rows: '64px auto 1fr' },
      controls: [
        { id: 'header', type: 'TemplateHeader', position: { x: 0, y: 0 }, size: { width: '100%', height: 64 }, props: {} },
        { id: 'filters', type: 'FilterBar', position: { x: 0, y: 64 }, size: { width: '100%', height: 'auto' }, props: {} },
        { id: 'grid', type: 'TemplateGrid', position: { x: 0, y: 'auto' }, size: { width: '100%', height: '1fr' }, props: { columns: 3 } },
      ],
    },
  },
  {
    id: 'page_12',
    name: '用户设置页',
    slug: 'settings-user',
    route: '/settings/user',
    skeleton: {
      layout: { type: 'flex', rows: '64px 1fr', cols: '200px 1fr' },
      controls: [
        { id: 'header', type: 'UserSettingsHeader', position: { x: 0, y: 0, spanX: 2 }, size: { width: '100%', height: 64 }, props: {} },
        { id: 'nav', type: 'UserSettingsNav', position: { x: 0, y: 64 }, size: { width: 200, height: '100%' }, props: {} },
        { id: 'content', type: 'UserSettingsContent', position: { x: 1, y: 64 }, size: { width: '1fr', height: '100%' }, props: {} },
      ],
    },
  },
];

// 控件配置 - 可复用的组件
export const components: ComponentConfig[] = [
  {
    id: 'comp_01',
    name: 'Button 按钮',
    slug: 'button',
    path: '../vibex-ui-components/components/Button',
    propsDefinition: {
      variant: { type: 'select', default: 'primary', options: ['primary', 'secondary', 'ghost', 'danger'] },
      size: { type: 'select', default: 'medium', options: ['small', 'medium', 'large'] },
      disabled: { type: 'boolean', default: false },
      loading: { type: 'boolean', default: false },
      children: { type: 'text', default: '按钮' },
    },
  },
  {
    id: 'comp_02',
    name: 'Card 卡片',
    slug: 'card',
    path: '../vibex-ui-components/components/Card',
    propsDefinition: {
      title: { type: 'text', default: '' },
      hoverable: { type: 'boolean', default: false },
      children: { type: 'text', default: '卡片内容' },
    },
  },
];

// 工具函数
export function getAllPages(): PageConfig[] {
  return pages;
}

export function getAllComponents(): ComponentConfig[] {
  return components;
}

export function getConfigBySlug(slug: string | string[]): PageConfig | ComponentConfig | undefined {
  const slugStr = Array.isArray(slug) ? slug.join('/') : slug;
  if (slugStr.startsWith('component/')) {
    return getComponentBySlug(slugStr.replace('component/', ''));
  }
  return getPageBySlug(slugStr);
}

export const playgroundConfig = {
  pages,
  components,
};

export function getPageBySlug(slug: string): PageConfig | undefined {
  return pages.find(p => p.slug === slug);
}

export function getComponentBySlug(slug: string): ComponentConfig | undefined {
  return components.find(c => c.slug === slug);
}

export default { pages, components, getPageBySlug, getComponentBySlug };
