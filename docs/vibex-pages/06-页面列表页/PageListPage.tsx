/**
 * 页面列表页 - 未来科幻AI风格
 */

import React, { useState, useEffect } from 'react';

const PageCard = ({ title, desc, status, date, index }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), index * 100); }, []);

  return (
    <div style={{
      background: 'rgba(0, 255, 255, 0.03)',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(0, 255, 255, 0.1)',
      cursor: 'pointer',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s ease',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ height: 180, background: 'linear-gradient(135deg, #1a1a2e, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <span style={{ fontSize: 48, opacity: 0.3 }}>📄</span>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 8 }}>
          {['✏️', '📤', '🗑️'].map((e, i) => (
            <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.9)', fontSize: 14, cursor: 'pointer' }}>{e}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' }}>{title}</h3>
          <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: status === '已发布' ? 'rgba(0,255,136,0.15)' : 'rgba(255,193,7,0.15)', color: status === '已发布' ? '#00ff88' : '#ffc107' }}>{status}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
      </div>
    </div>
  );
};

export default function PageListPage() {
  const pages = [
    { title: 'VibeX 登录页', desc: '用户登录和注册页面', status: '已发布' },
    { title: '用户中心', desc: '个人资料和项目管理', status: '开发中' },
    { title: 'AI 对话界面', desc: '智能助手对话页面', status: '已发布' },
    { title: '流程图编辑器', desc: '可视化流程设计工具', status: '开发中' },
    { title: '模板市场', desc: '页面模板展示和选择', status: '规划中' },
    { title: '导出页面', desc: '项目导出和下载功能', status: '已发布' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1218 100%)', padding: 40 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, color: '#fff' }}>页面列表</h1>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>共 {pages.length} 个页面</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ padding: '10px 16px', background: 'rgba(0,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(0,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)' }}>
            <span>🔍</span>
            <input placeholder="搜索页面..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14 }} />
          </div>
          <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #00ffff, #00ff88)', border: 'none', borderRadius: 10, color: '#0a0a0f', fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 20px rgba(0,255,255,0.3)' }}>+ 新建页面</button>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {pages.map((p, i) => <PageCard key={i} {...p} index={i} />)}
      </div>
    </div>
  );
}
