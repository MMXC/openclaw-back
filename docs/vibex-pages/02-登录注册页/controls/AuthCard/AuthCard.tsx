/**
 * AuthCard 登录注册卡片
 */

import React from 'react';
import styles from './AuthCard.module.css';

interface AuthCardProps {
  /** 模式 */
  mode?: 'login' | 'register';
  /** 标题 */
  title?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  mode = 'login',
  title = mode === 'login' ? '登录 VibeX' : '注册 VibeX',
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.form}>
        {mode === 'register' && (
          <input className={styles.input} placeholder="昵称" />
        )}
        <input className={styles.input} type="email" placeholder="邮箱" />
        <input className={styles.input} type="password" placeholder="密码" />
        {mode === 'register' && (
          <input className={styles.input} type="password" placeholder="确认密码" />
        )}
        <button className={styles.submitBtn}>
          {mode === 'login' ? '登录' : '注册'}
        </button>
      </div>
    </div>
  );
};

export default AuthCard;
