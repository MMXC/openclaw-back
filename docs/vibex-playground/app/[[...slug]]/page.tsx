import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPages, getAllComponents, getPageBySlug, getComponentBySlug } from '../../lib/config';
import { renderPage } from '../../lib/renderer';
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
  const slugArray = params.slug || [];
  const slug = slugArray.join('/');
  
  const page = getPageBySlug(slug);
  const component = getComponentBySlug(slug);
  
  if (!page && !component) {
    return { title: 'Not Found' };
  }
  
  const name = page?.name || component?.name || '';
  return {
    title: `${name} - VibeX Playground`,
  };
}

export default async function PagePreview({ params }: PageProps) {
  const slugArray = params.slug || [];
  const slug = slugArray.join('/');
  
  // 尝试匹配页面
  const page = getPageBySlug(slug);
  // 尝试匹配控件
  const component = getComponentBySlug(slug);

  if (!page && !component) {
    notFound();
  }

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
            <span className={styles.previewName}>{page?.name || component?.name}</span>
            <span className={styles.previewId}>{page?.id || component?.id}</span>
          </div>
          <div className={styles.previewActions}>
            <span className={styles.previewTip}>按 F12 截图</span>
          </div>
        </header>

        {/* 页面内容 - 基于骨架渲染 */}
        <div className={styles.previewContent}>
          {page?.skeleton ? (
            renderPage(page.skeleton)
          ) : component ? (
            <div style={{ padding: 48 }}>
              <h2 style={{ marginBottom: 24 }}>{component.name}</h2>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 16 }}>Props 定义</div>
              <pre style={{ background: '#1a1a2e', color: '#a9b7c6', padding: 16, borderRadius: 8, overflow: 'auto' }}>
                {JSON.stringify(component.propsDefinition, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
