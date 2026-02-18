/**
 * VibeX 组件注册表
 * 简化版 - 动态加载页面和控件
 */

import { PageConfig, ComponentConfig, getConfigBySlug } from './config';

// 缓存已加载的模块
const moduleCache = new Map<string, any>();

/**
 * 动态加载模块
 */
export async function loadModule(config: PageConfig | ComponentConfig) {
  if (moduleCache.has(config.id)) {
    return moduleCache.get(config.id);
  }

  try {
    // 根据路径动态导入
    const module = await import(`${config.path}`);
    moduleCache.set(config.id, module);
    return module;
  } catch (error) {
    console.error(`Failed to load module: ${config.path}`, error);
    return null;
  }
}

/**
 * 加载页面/控件组件
 */
export async function loadPageComponent(slug: string) {
  const config = getConfigBySlug(slug);
  if (!config) {
    return { config: null, component: null };
  }
  
  // 尝试动态加载
  let component = null;
  try {
    const mod = await loadModule(config);
    component = mod?.default || mod?.[config.name.replace(/\s/g, '')] || null;
  } catch (e) {
    // 控件未实现时返回空
  }
  
  return {
    config,
    component,
  };
}

export default {
  loadModule,
  loadPageComponent,
};
