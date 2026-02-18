import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPages, getAllComponents, getConfigBySlug, PageConfig } from '../../lib/config';
import { loadPageComponent } from '../../lib/registry';
import styles from './page.module.css';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const pages = getAllPages();
  const components = getAllComponents();
  
  return [
    ...pages.map(p => ({ slug: [p.slug] })),
    ...components.map(c => ({ slug: ['component', c.slug] })),
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug?.join('/') || '';
  const config = getConfigBySlug(slug);
  
  if (!config) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `${config.name} - VibeX Playground`,
  };
}

export default async function PagePreview({ params }: PageProps) {
  const slugArray = params.slug || [];
  const slug = slugArray.join('/');
  
  const config = getConfigBySlug(slug);
  
  if (!config) {
    notFound();
  }

  // 加载组件
  const { component: Component, data, mock } = await loadPageComponent(slug);

  const pages = getAllPages();
  const components = getAllComponents();

  return (
    <div className={styles.previewContainer}>
      {/* 侧边栏 */}
      <aside className={styles.previewSidebar}>
        <div className={styles.previewSidebarTitle}>页面</div>
        {pages.map(p => (
          <Link 
            key={p.id} 
            href={`/${p.slug}`}
            className={`${styles.previewMenuItem} ${p.slug === slug ? styles.active : ''}`}
          >
            {p.name}
          </Link>
        ))}
        
        <div className={styles.previewSidebarTitle} style={{ marginTop: 24 }}>控件</div>
        {components.map(c => (
          <Link 
            key={c.id} 
            href={`/component/${c.slug}`}
            className={`${styles.previewMenuItem} ${c.slug === slug ? styles.active : ''}`}
          >
            {c.name}
          </Link>
        ))}
      </aside>

      {/* 主内容 */}
      <main className={styles.previewMain}>
        {/* 顶部栏 */}
        <header className={styles.previewHeader}>
          <Link href="/" className={styles.previewBack}>
            ← 返回首页
          </Link>
          <div>
            <span className={styles.previewName}>{config.name}</span>
            <span className={styles.previewId}>{config.id}</span>
          </div>
          <div className={styles.previewActions}>
            <span className={styles.previewTip}>按 F12 截图</span>
          </div>
        </header>

        {/* 组件内容 */}
        <div className={styles.previewContent}>
          {Component ? (
            <Component />
          ) : (
            <div className={styles.previewError}>
              <p>组件加载失败</p>
              <p>请检查路径: {config.path}</p>
            </div>
          )}
        </div>

        {/* 数据面板（可选显示） */}
        {data && (
          <details className={styles.dataPanel}>
            <summary>📊 查看数据</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </details>
        )}

        {mock && (
          <details className={styles.dataPanel}>
            <summary>🎭 查看 Mock 数据</summary>
            <pre>{JSON.stringify(mock, null, 2)}</pre>
          </details>
        )}
      </main>
    </div>
  );
}
