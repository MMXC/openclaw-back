// 页面配置 - 从 vibex-pages 目录动态加载
import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), '../../docs/vibex-pages');

export interface PageControl {
  id: string;
  type: string;
  name: string;
  path: string;
}

export interface PageConfig {
  id: string;
  name: string;
  slug: string;
  description?: string;
  controls: PageControl[];
}

// 获取所有页面
export function getAllPages(): PageConfig[] {
  if (!fs.existsSync(pagesDir)) {
    return getDefaultPages();
  }
  
  const dirs = fs.readdirSync(pagesDir).filter(f => {
    const stat = fs.statSync(path.join(pagesDir, f));
    return stat.isDirectory();
  });
  
  return dirs.map(dir => {
    const controlDir = path.join(pagesDir, dir, 'controls');
    const controls: PageControl[] = [];
    
    if (fs.existsSync(controlDir)) {
      const controlDirs = fs.readdirSync(controlDir).filter(f => {
        return fs.statSync(path.join(controlDir, f)).isDirectory();
      });
      
      controlDirs.forEach(ctrl => {
        controls.push({
          id: ctrl.toLowerCase(),
          type: ctrl,
          name: ctrl,
          path: path.join(controlDir, ctrl),
        });
      });
    }
    
    // 从目录名提取 slug 和 name
    const match = dir.match(/(\d+)-(.+)/);
    const id = match ? match[1] : dir;
    const name = match ? match[2] : dir;
    const slug = name.replace(/页$/, '').toLowerCase();
    
    return {
      id,
      name,
      slug,
      description: `${name}原型`,
      controls,
    };
  }).sort((a, b) => a.id.localeCompare(b.id));
}

// 获取单个页面配置
export function getPageBySlug(slug: string): PageConfig | null {
  const pages = getAllPages();
  return pages.find(p => p.slug === slug || p.id === slug) || null;
}

// 获取控件源码
export function getControlCode(controlPath: string): string | null {
  const tsxPath = path.join(controlPath, '*.tsx');
  
  // 查找 tsx 文件
  const files = fs.readdirSync(controlPath).filter(f => f.endsWith('.tsx'));
  if (files.length === 0) return null;
  
  const fullPath = path.join(controlPath, files[0]);
  return fs.readFileSync(fullPath, 'utf-8');
}

// 默认页面（当目录不存在时）
function getDefaultPages(): PageConfig[] {
  return [
    { id: '01', name: '落地页', slug: 'landing', description: '产品介绍首页', controls: [] },
    { id: '02', name: '登录注册页', slug: 'auth', description: '用户登录/注册', controls: [] },
    { id: '03', name: '用户中心', slug: 'dashboard', description: '项目管理控制台', controls: [] },
    { id: '04', name: 'AI对话页', slug: 'chat', description: 'AI 智能对话', controls: [] },
  ];
}
