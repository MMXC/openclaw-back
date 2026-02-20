/**
 * 导出页面 - 现代导出选项设计
 */

import React, { useState } from 'react';

const FormatCard = ({ name, desc, icon, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: 20,
      background: selected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
      border: '2px solid',
      borderColor: selected ? '#6366f1' : 'rgba(255,255,255,0.06)',
      borderRadius: 16,
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
  >
    <span style={{ fontSize: 32 }}>{icon}</span>
    <h4 style={{ margin: '12px 0 4px', fontSize: 16, color: '#f9fafb' }}>{name}</h4>
    <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>{desc}</p>
  </div>
);

export default function ExportPage() {
  const [format, setFormat] = useState('react');
  const [options, setOptions] = useState({ css: true, typescript: true, images: true });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)', padding: 40 }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#f9fafb' }}>导出页面</h1>
      <p style={{ margin: '0 0 40px', color: '#6b7280' }}>选择导出格式和选项</p>

      <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#9ca3af', textTransform: 'uppercase' }}>导出格式</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
        <FormatCard name="React" desc="React + CSS" icon="⚛️" selected={format === 'react'} onClick={() => setFormat('react')} />
        <FormatCard name="Vue" desc="Vue 3 + Style" icon="💚" selected={format === 'vue'} onClick={() => setFormat('vue')} />
        <FormatCard name="HTML" desc="纯 HTML + CSS" icon="🌐" selected={format === 'html'} onClick={() => setFormat('html')} />
        <FormatCard name="小程序" desc="微信/支付宝" icon="📱" selected={format === 'miniapp'} onClick={() => setFormat('miniapp')} />
      </div>

      <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#9ca3af', textTransform: 'uppercase' }}>导出选项</h3>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, marginBottom: 40, border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          ['typescript', '生成 TypeScript 类型定义', true],
          ['css', '分离 CSS 文件', true],
          ['images', '导出图片资源', true],
          ['compress', '压缩代码', false],
        ].map(([key, label, def]) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ color: '#d1d5db', fontSize: 14 }}>{label}</span>
            <input type="checkbox" defaultChecked={def} style={{ width: 20, height: 20, accentColor: '#6366f1' }} />
          </label>
        ))}
      </div>

      <button style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 12, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)' }}>
        开始导出
      </button>
    </div>
  );
}
