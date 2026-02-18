/**
 * Hero 控件
 * 首页主视觉区域
 */

import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  /** 主标题 */
  title?: string;
  /** 副标题 */
  subtitle?: string;
  /** 主要按钮文字 */
  primaryText?: string;
  /** 次要按钮文字 */
  secondaryText?: string;
  /** 主要按钮链接 */
  primaryUrl?: string;
  /** 次要按钮链接 */
  secondaryUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'AI 驱动，一句话生成应用原型',
  subtitle = '通过自然语言描述，快速生成完整的应用原型',
  primaryText = '开始创建',
  secondaryText = '查看演示',
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>{primaryText}</button>
          <button className={styles.secondaryBtn}>{secondaryText}</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
