/**
 * 页面骨架配置
 * 
 * 记录页面的控件布局结构
 * 拖拽修改控件后，在此更新配置
 */

import { Header } from './controls/Header';
import { Hero } from './controls/Hero';

export interface ControlConfig {
  id: string;
  type: string;
  component: React.FC<any>;
  position: {
    x?: number;
    y?: number;
    order?: number;
  };
  size: {
    width?: number | string;
    height?: number | string;
  };
  props?: Record<string, any>;
}

export interface PageSkeleton {
  /** 页面布局类型 */
  layout: 'stack' | 'grid' | 'absolute';
  /** 布局配置 */
  layoutConfig?: {
    rows?: string;
    cols?: string;
    gap?: number;
  };
  /** 控件配置列表 */
  controls: ControlConfig[];
}

// 落地页骨架配置
export const landingSkeleton: PageSkeleton = {
  layout: 'stack',
  layoutConfig: {
    gap: 0,
  },
  controls: [
    {
      id: 'header',
      type: 'Header',
      component: Header,
      position: { order: 1 },
      size: { width: '100%', height: 64 },
      props: {
        logo: 'VibeX',
        navLinks: [
          { label: '首页', url: '/' },
          { label: '功能', url: '#features' },
          { label: '模板', url: '/templates' },
          { label: '定价', url: '#pricing' },
        ],
        showLogin: true,
        showCta: true,
      },
    },
    {
      id: 'hero',
      type: 'Hero',
      component: Hero,
      position: { order: 2 },
      size: { width: '100%', height: 'calc(100vh - 64px)' },
      props: {
        title: 'AI 驱动，一句话生成应用原型',
        subtitle: '通过自然语言描述，快速生成完整的应用原型',
        primaryText: '开始创建',
        secondaryText: '查看演示',
      },
    },
    {
      id: 'features',
      type: 'FeatureGrid',
      component: Hero, // TODO: 创建 FeatureGrid 控件
      position: { order: 3 },
      size: { width: '100%', height: 'auto' },
      props: {},
    },
    {
      id: 'footer',
      type: 'Footer',
      component: Hero, // TODO: 创建 Footer 控件
      position: { order: 4 },
      size: { width: '100%', height: 'auto' },
      props: {},
    },
  ],
};

/**
 * 更新控件配置
 * 
 * 拖拽修改控件后调用此函数更新骨架
 */
export function updateControl(
  skeleton: PageSkeleton,
  controlId: string,
  updates: Partial<ControlConfig>
): PageSkeleton {
  return {
    ...skeleton,
    controls: skeleton.controls.map(ctrl =>
      ctrl.id === controlId ? { ...ctrl, ...updates } : ctrl
    ),
  };
}

/**
 * 添加控件
 */
export function addControl(
  skeleton: PageSkeleton,
  newControl: ControlConfig
): PageSkeleton {
  return {
    ...skeleton,
    controls: [...skeleton.controls, newControl],
  };
}

/**
 * 删除控件
 */
export function removeControl(
  skeleton: PageSkeleton,
  controlId: string
): PageSkeleton {
  return {
    ...skeleton,
    controls: skeleton.controls.filter(ctrl => ctrl.id !== controlId),
  };
}

export default landingSkeleton;
