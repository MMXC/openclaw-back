import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPages, getAllComponents, getPageBySlug, getComponentBySlug } from '../../lib/config';
import styles from './home.module.css';

export async function generateStaticParams() {
  const pages = getAllPages();
  const components = getAllComponents();
  
  return [
    ...pages.map(p => ({ slug: [p.slug] })),
    ...components.map(c => ({ slug: ['component', c.slug] })),
  ];
}

export async function generateMetadata() {
  return {
    title: 'VibeX Playground - UI 原型预览',
    description: 'VibeX 页面和控件原型预览',
  };
}

export default async function Home() {
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
