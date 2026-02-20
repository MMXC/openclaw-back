/**
 * 模板市场页 - 现代模板展示设计
 */

import React, { useState } from 'react';

const TemplateCard = ({ title, category, image, uses, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ height: 200, background: image || 'linear-gradient(135deg, #2a2a3e, #1e1e2e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 48, opacity: 0.3 }}>📄</span>
      </div>
      <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontSize: 11, color: '#818cf8', background: 'rgba(99,102,241,0.15)', padding: '3px 8px', borderRadius: 4 }}>{category}</span>
        <h4 style={{ margin: '8px 0', fontSize: 15, color: '#f9fafb' }}>{title}</h4>
        <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>{uses} 次使用</p>
      </div>
    </div>
  );
};

export default function TemplateMarketPage() {
  const [category, setCategory] = useState('all');
  const categories = ['all', '登录页', '仪表盘', '表单', '电商', '个人'];
  const templates = [
    { title: '现代登录页', category: '登录页', uses: 1234 },
    { title: '数据分析仪表盘', category: '仪表盘', uses: 892 },
    { title: '用户注册表单', category: '表单', uses: 756 },
    { title: '电商产品页', category: '电商', uses: 543 },
    { title: '个人作品集', category: '个人', uses: 432 },
    { title: 'AI 对话界面', category: '仪表盘', uses: 321 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)', padding: 32 }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#f9fafb' }}>模板市场</h1>
      <p style={{ margin: '0 0 32px', color: '#6b7280' }}>发现灵感，从模板开始</p>

      {/* 分类 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '8px 16px',
              background: category === cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: category === cat ? '#6366f1' : 'rgba(255,255,255,0.08)',
              borderRadius: 20,
              color: category === cat ? '#818cf8' : '#9ca3af',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {cat === 'all' ? '全部' : cat}
          </button>
        ))}
      </div>

      {/* 模板网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {templates.map((t, i) => <TemplateCard key={i} {...t} onClick={() => {}} />)}
      </div>
    </div>
  );
}
