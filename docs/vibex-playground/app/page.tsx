import Link from 'next/link';
import { playgroundConfig, getAllPages, getAllComponents } from '../lib/config';
import styles from './page.module.css';

export default function Home() {
  const pages = getAllPages();
  const components = getAllComponents();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{playgroundConfig.title}</h1>
        <p className={styles.description}>{playgroundConfig.description}</p>
      </header>

      <main className={styles.main}>
        {/* 页面列表 */}
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

        {/* 控件列表 */}
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

        {/* 使用说明 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📖 使用说明</h2>
          <div className={styles.tutorial}>
            <div className={styles.tutorialItem}>
              <div className={styles.tutorialStep}>1</div>
              <div>
                <h3>添加页面</h3>
                <p>在 <code>docs/vibex-pages/</code> 目录添加新页面</p>
              </div>
            </div>
            <div className={styles.tutorialItem}>
              <div className={styles.tutorialStep}>2</div>
              <div>
                <h3>配置路由</h3>
                <p>在 <code>lib/config.ts</code> 注册页面</p>
              </div>
            </div>
            <div className={styles.tutorialItem}>
              <div className={styles.tutorialStep}>3</div>
              <div>
                <h3>预览</h3>
                <p>运行 <code>npm run dev</code> 访问预览</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
