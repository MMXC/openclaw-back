import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** 标题 */
  title?: string;
  /** 额外操作区域 */
  extra?: React.ReactNode;
  /** 内容 */
  children: React.ReactNode;
  /** 是否可悬停 */
  hoverable?: boolean;
  /** 点击事件 */
  onClick?: () => void;
  /** 样式类名 */
  className?: string;
}

/**
 * Card 卡片
 * 
 * 用于展示内容容器
 */
export const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  hoverable = false,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}
      onClick={onClick}
    >
      {(title || extra) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;
