'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Home.module.css';

interface Page {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const pages: Page[] = [
  { id: '01', name: '落地页', slug: 'landing', description: 'VibeX 产品介绍首页' },
  { id: '02', name: '登录注册页', slug: 'auth', description: '用户登录/注册' },
  { id: '03', name: '用户中心', slug: 'dashboard', description: '项目管理控制台' },
  { id: '04', name: 'AI对话页', slug: 'chat', description: 'AI 智能对话界面' },
  { id: '05', name: '流程图编辑页', slug: 'flow', description: '可视化流程编排' },
  { id: '06', name: '页面列表页', slug: 'pages', description: '项目页面管理' },
  { id: '07', name: '页面编辑页', slug: 'editor', description: '拖拽式页面编辑器' },
  { id: '08', name: '原型预览页', slug: 'preview', description: '多设备预览' },
  { id: '09', name: '导出页面', slug: 'export', description: '导出配置' },
  { id: '10', name: '项目设置页', slug: 'settings-project', description: '项目配置' },
  { id: '11', name: '模板市场页', slug: 'templates', description: '页面模板库' },
  { id: '12', name: '用户设置页', slug: 'settings-user', description: '个人设置' },
];

export default function Home() {
  const pathname = usePathname();
  const [expandedPages, setExpandedPages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      {/* 移动端顶部栏 */}
      {isMobile && (
        <header className={styles.mobileHeader}>
          <button 
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <span className={styles.mobileTitle}>🚀 VibeX</span>
          <div style={{ width: 40 }} />
        </header>
      )}

      {/* 移动端遮罩 */}
      {isMobile && menuOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* 左侧菜单 - 桌面端 */}
      {!isMobile && (
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>📁 页面菜单</h2>
          <nav className={styles.nav}>
            {pages.map(page => (
              <div key={page.id} className={styles.pageItem}>
                <div 
                  className={styles.pageHeader}
                  onClick={() => toggleExpand(page.id)}
                >
                  <span className={styles.expandIcon}>
                    {expandedPages.includes(page.id) ? '▼' : '▶'}
                  </span>
                  <span className={styles.pageId}>{page.id}</span>
                  <span className={styles.pageName}>{page.name}</span>
                </div>
                
                {expandedPages.includes(page.id) && (
                  <div className={styles.pageActions}>
                    <Link 
                      href={`/${page.slug}`}
                      className={`${styles.actionLink} ${pathname === `/${page.slug}` ? styles.active : ''}`}
                    >
                      📄 说明
                    </Link>
                    <Link 
                      href={`/playground?page=${page.slug}`}
                      className={`${styles.actionLink} ${pathname === '/playground' ? styles.active : ''}`}
                    >
                      🎨 调整画布
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* 移动端抽屉菜单 */}
      {isMobile && (
        <aside className={`${styles.mobileSidebar} ${menuOpen ? styles.open : ''}`}>
          <h2 className={styles.sidebarTitle}>📁 页面菜单</h2>
          <nav className={styles.nav}>
            {pages.map(page => (
              <div key={page.id} className={styles.pageItem}>
                <div 
                  className={styles.pageHeader}
                  onClick={() => toggleExpand(page.id)}
                >
                  <span className={styles.expandIcon}>
                    {expandedPages.includes(page.id) ? '▼' : '▶'}
                  </span>
                  <span className={styles.pageId}>{page.id}</span>
                  <span className={styles.pageName}>{page.name}</span>
                </div>
                
                {expandedPages.includes(page.id) && (
                  <div className={styles.pageActions}>
                    <Link 
                      href={`/${page.slug}`}
                      className={`${styles.actionLink} ${pathname === `/${page.slug}` ? styles.active : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      📄 说明
                    </Link>
                    <Link 
                      href={`/playground?page=${page.slug}`}
                      className={`${styles.actionLink} ${pathname === '/playground' ? styles.active : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      🎨 调整画布
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* 右侧内容区 */}
      <main className={styles.main}>
        <div className={styles.welcome}>
          <div className={styles.heroGlow} />
          <h1 className={styles.title}>🚀 VibeX Playground</h1>
          <p className={styles.subtitle}>选择左侧页面，点击"🎨 调整画布"开始编辑</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🧩</span>
              <span>组件库拖拽</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✏️</span>
              <span>可视化属性</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💻</span>
              <span>源码编辑</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🤖</span>
              <span>AI 智能调整</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
