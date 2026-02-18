import React from 'react';
import styles from './landing.module.css';
import { landingPageData } from './data';
import { Button } from '../../vibex-ui-components/components/Button';
import { Card } from '../../vibex-ui-components/components/Card';

/**
 * 落地页 Landing Page
 * 
 * VibeX 产品介绍首页
 */
export const LandingPage: React.FC = () => {
  const { navLinks, hero, features, steps, footer } = landingPageData;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>VibeX</div>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.url} href={link.url} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <Button variant="ghost">登录</Button>
          <Button variant="primary">开始创建</Button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroSubtitle}>{hero.subtitle}</p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="large">{hero.ctaPrimary}</Button>
            <Button variant="secondary" size="large">{hero.ctaSecondary}</Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>核心功能</h2>
        <p className={styles.sectionSubtitle}>强大功能，助您快速构建应用原型</p>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <Card key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <h2 className={styles.sectionTitle}>使用流程</h2>
        <p className={styles.sectionSubtitle}>三步完成应用原型生成</p>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNumber}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <h4>产品</h4>
            {footer.products.map((item) => (
              <a key={item.label} href={item.url}>{item.label}</a>
            ))}
          </div>
          <div>
            <h4>公司</h4>
            {footer.company.map((item) => (
              <a key={item.label} href={item.url}>{item.label}</a>
            ))}
          </div>
          <div>
            <h4>法律</h4>
            {footer.legal.map((item) => (
              <a key={item.label} href={item.url}>{item.label}</a>
            ))}
          </div>
          <div>
            <h4>关注我们</h4>
            {footer.social.map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          {footer.copyright}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
