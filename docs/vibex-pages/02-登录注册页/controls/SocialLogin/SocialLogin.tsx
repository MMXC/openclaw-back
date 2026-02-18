/**
 * SocialLogin 第三方登录
 */

import React from 'react';
import styles from './SocialLogin.module.css';

interface SocialLoginProps {
  /** 显示的平台 */
  platforms?: Array<'wechat' | 'dingtalk'>;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({
  platforms = ['wechat', 'dingtalk'],
}) => {
  return (
    <div className={styles.container}>
      {platforms.includes('wechat') && (
        <button className={`${styles.btn} ${styles.wechat}`}>
          💚 微信登录
        </button>
      )}
      {platforms.includes('dingtalk') && (
        <button className={`${styles.btn} ${styles.dingtalk}`}>
          💬 钉钉登录
        </button>
      )}
    </div>
  );
};

export default SocialLogin;
