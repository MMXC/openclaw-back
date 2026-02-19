import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPages, getAllComponents, getPageBySlug, getComponentBySlug } from '../../lib/config';
import Home from './Home';
import styles from './home.module.css';

export async function generateStaticParams() {
  const pages = getAllPages();
  const components = getAllComponents();
  
  return [
    ...pages.map(p => ({ slug: [p.slug] })),
    ...components.map(c => ({ slug: ['component', c.slug] })),
  ];
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.[0];
  if (!slug) {
    return { title: 'VibeX Playground' };
  }
  
  const page = getPageBySlug(slug);
  const component = getComponentBySlug(slug);
  const title = page?.name || component?.name || 'Not Found';
  
  return { title: `VibeX - ${title}` };
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.[0];
  
  // 首页
  if (!slug) {
    return <Home />;
  }
  
  // 页面
  const page = getPageBySlug(slug);
  if (page) {
    return <PageView page={page} />;
  }
  
  // 控件
  const component = getComponentBySlug(slug);
  if (component) {
    return <ComponentView component={component} />;
  }
  
  return notFound();
}

// 首页组件
function HomePage() {
  const pages = getAllPages();
  const components = getAllComponents();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>VibeX Playground</h1>
        <p className={styles.description}>UI 原型预览与测试</p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📄 页面 ({pages.length})</h2>
          <div className={styles.grid}>
            {pages.map((page) => (
              <Link 
                key={page.id} 
                href={`/${page.slug}`}
                className={styles.card}
              >
                <span className={styles.cardId}>{page.id.replace('page_', '').padStart(2, '0')}</span>
                <span className={styles.cardName}>{page.name}</span>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🧩 控件 ({components.length})</h2>
          <div className={styles.grid}>
            {components.map((comp) => (
              <Link 
                key={comp.id} 
                href={`/component/${comp.slug}`}
                className={styles.card}
              >
                <span className={styles.cardId}>{comp.id.replace('comp_', '').padStart(2, '0')}</span>
                <span className={styles.cardName}>{comp.name}</span>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// 页面预览组件
function PageView({ page }: { page: ReturnType<typeof getPageBySlug> }) {
  if (!page) return notFound();
  
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: '#1890ff', textDecoration: 'none' }}>← 返回首页</Link>
      </div>
      <h1>{page.name}</h1>
      <p>{page.description}</p>
      
      <div style={{ marginTop: 32, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
        <h3>页面结构</h3>
        <pre style={{ background: '#fff', padding: 16, borderRadius: 4, overflow: 'auto' }}>
          {JSON.stringify(page.skeleton, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h3>控件列表</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {page.skeleton.controls.map((ctrl) => (
            <div key={ctrl.id} style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
              <strong>{ctrl.id}</strong> - <code>{ctrl.type}</code>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                位置: {JSON.stringify(ctrl.position)} | 尺寸: {JSON.stringify(ctrl.size)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 控件预览组件
function ComponentView({ component }: { component: ReturnType<typeof getComponentBySlug> }) {
  if (!component) return notFound();
  
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: '#1890ff', textDecoration: 'none' }}>← 返回首页</Link>
      </div>
      <h1>{component.name}</h1>
      
      <div style={{ marginTop: 24 }}>
        <h3>属性定义</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(component.propsDefinition).map(([key, prop]) => (
            <div key={key} style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
              <strong>{key}</strong> - {prop.type}
              {prop.default !== undefined && <span style={{ color: '#666' }}> (默认: {JSON.stringify(prop.default)})</span>}
              {prop.options && <span style={{ color: '#666' }}> | 选项: {prop.options.join(', ')}</span>}
              {prop.description && <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{prop.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
