/**
 * VibeX 组件注册表
 * 
 * 动态加载页面和控件
 */

import { PageConfig, getConfigBySlug } from './config';

// 缓存已加载的模块
const moduleCache = new Map<string, any>();

/**
 * 动态加载模块
 */
export async function loadModule(config: PageConfig) {
  if (moduleCache.has(config.id)) {
    return moduleCache.get(config.id);
  }

  try {
    // 根据 category 动态导入
    if (config.category === 'page') {
      // 动态导入页面组件
      const module = await import(`../vibex-pages/${config.path.split('/').pop()}/index`);
      moduleCache.set(config.id, module);
      return module;
    } else {
      // 动态导入控件组件
      const module = await import(`../vibex-ui-components/components/${config.path.split('/').pop()}`);
      moduleCache.set(config.id, module);
      return module;
    }
  } catch (error) {
    console.error(`Failed to load module: ${config.path}`, error);
    return null;
  }
}

/**
 * 加载页面组件
 */
export async function loadPageComponent(slug: string) {
  const config = getConfigBySlug(slug);
  if (!config) {
    return { config: null, component: null };
  }
  
  const module = await loadModule(config);
  return {
    config,
    component: module?.default || module?.[config.name.replace(/\s/g, '')] || null,
    data: module?.default ? module[`${config.slug}Data`] || module[`${config.name.replace(/\s/g, '')}Data`] : null,
    mock: module?.default ? module[`${config.slug}Mock`] || module[`${config.name.replace(/\s/g, '')}Mock`] : null,
  };
}

/**
 * 预加载所有模块（开发环境）
 */
export async function preloadAllModules() {
  const configs = getConfigBySlug;
  // 可以在这里预加载所有模块
}

export default {
  loadModule,
  loadPageComponent,
};
