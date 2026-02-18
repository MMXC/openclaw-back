/**
 * Header 控件
 * 页面顶部导航栏
 */

import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  /** Logo 文字 */
  logo?: string;
  /** 导航链接 */
  navLinks?: Array<{ label: string; url: string }>;
  /** 是否显示登录按钮 */
  showLogin?: boolean;
  /** 是否显示开始创建按钮 */
  showCta?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo = 'VibeX',
  navLinks = [],
  showLogin = true,
  showCta = true,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logo}</div>
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <a key={link.url} href={link.url} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className={styles.actions}>
        {showLogin && <button className={styles.loginBtn}>登录</button>}
        {showCta && <button className={styles.ctaBtn}>开始创建</button>}
      </div>
    </header>
  );
};

export default Header;
