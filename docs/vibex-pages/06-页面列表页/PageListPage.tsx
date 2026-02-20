/**
 * 页面列表页 - 现代化项目管理界面设计
 * 
 * 设计灵感:
 * 1. 卡片网格 - Pinterest/Instagram 瀑布流
 * 2. 缩略图预览 - Figma 项目缩略图
 * 3. 悬浮操作 - Medium/Notion 悬浮菜单
 * 4. 搜索栏 - macOS Spotlight 风格
 */

import React, { useState } from 'react';

const PageCard = ({ title, description, thumbnail, status, date, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered 
          ? '0 20px 40px rgba(0,0,0,0.4)' 
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* 缩略图 */}
      <div style={{
        height: 160,
        background: thumbnail || 'linear-gradient(135deg, #1e1e2e, #2a2a3e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {thumbnail ? (
          <img src={thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: 48, opacity: 0.3 }}>📄</span>
        )}
        
        {/* 悬浮遮罩 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* 悬浮操作 */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          display: 'flex',
          gap: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s',
        }}>
          {['✏️', '📤', '🗑️'].map((icon, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* 内容 */}
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#f9fafb' }}>{title}</h3>
          <span style={{
            fontSize: 11,
            padding: '3px 8px',
            borderRadius: 6,
            background: status === '已发布' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)',
            color: status === '已发布' ? '#34d399' : '#fbbf24',
            fontWeight: 500,
          }}>
            {status}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>{description}</p>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: '#6b7280' }}>{date}</p>
      </div>
    </div>
  );
};

export default function PageListPage() {
  const [view, setView] = useState('grid');
  const pages = [
    { title: 'VibeX 登录页', description: '用户登录和注册页面', status: '已发布', date: '2024-01-15' },
    { title: '用户中心', description: '个人资料和项目管理', status: '开发中', date: '2024-01-14' },
    { title: 'AI 对话界面', description: '智能助手对话页面', status: '已发布', date: '2024-01-13' },
    { title: '流程图编辑器', description: '可视化流程设计工具', status: '开发中', date: '2024-01-12' },
    { title: '模板市场', description: '页面模板展示和选择', status: '规划中', date: '2024-01-11' },
    { title: '导出页面', description: '项目导出和下载功能', status: '已发布', date: '2024-01-10' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)', padding: 32 }}>
      {/* 头部 */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, color: '#f9fafb' }}>页面列表</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>共 {pages.length} 个页面</p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* 搜索 */}
          <div style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 280,
          }}>
            <span style={{ color: '#6b7280' }}>🔍</span>
            <input
              placeholder="搜索页面..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f9fafb',
                fontSize: 14,
              }}
            />
          </div>

          {/* 新建按钮 */}
          <button style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: 10,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          }}>
            + 新建页面
          </button>
        </div>
      </header>

      {/* 网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {pages.map((page, i) => (
          <PageCard key={i} {...page} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
