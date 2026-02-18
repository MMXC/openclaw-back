import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /** 按钮类型 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 点击事件 */
  onClick?: () => void;
  /** 子元素 */
  children: React.ReactNode;
  /** 样式类名 */
  className?: string;
}

/**
 * Button 按钮
 * 
 * 用于触发操作
 * 
 * ## 使用示例
 * ```tsx
 * <Button variant="primary" size="medium">点击</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className={styles.spinner}>⟳</span> : null}
      {children}
    </button>
  );
};

export default Button;
