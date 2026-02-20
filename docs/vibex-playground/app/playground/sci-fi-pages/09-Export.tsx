/**
 * 导出页面 - 未来科幻AI风格
 */

import React, { useState } from 'react';

const FormatCard = ({ name, desc, icon, selected, onClick }) => (
  <div onClick={onClick} style={{ padding: 24, background: selected?'rgba(0,255,255,0.1)':'rgba(255,255,255,0.03)', border: '2px solid', borderColor: selected?'#00ffff':'rgba(0,255,255,0.1)', borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
    <span style={{ fontSize: 36 }}>{icon}</span>
    <h4 style={{ margin: '14px 0 4px', fontSize: 16, color: '#fff' }}>{name}</h4>
    <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
  </div>
);

export default function ExportPage() {
  const [format, setFormat] = useState('react');
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1218 100%)', padding: 48 }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#fff' }}>导出页面</h1>
      <p style={{ margin: '0 0 40px', color: 'rgba(255,255,255,0.5)' }}>选择导出格式和选项</p>
      <h3 style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>导出格式</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
        <FormatCard name="React" desc="React + CSS" icon="⚛️" selected={format==='react'} onClick={()=>setFormat('react')} />
        <FormatCard name="Vue" desc="Vue 3 + Style" icon="💚" selected={format==='vue'} onClick={()=>setFormat('vue')} />
        <FormatCard name="HTML" desc="纯 HTML + CSS" icon="🌐" selected={format==='html'} onClick={()=>setFormat('html')} />
        <FormatCard name="小程序" desc="微信/支付宝" icon="📱" selected={format==='miniapp'} onClick={()=>setFormat('miniapp')} />
      </div>
      <h3 style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>导出选项</h3>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, marginBottom: 40, border: '1px solid rgba(0,255,255,0.1)' }}>
        {[['typescript','生成 TypeScript 类型定义'],['css','分离 CSS 文件'],['images','导出图片资源'],['compress','压缩代码']].map(([k,l],i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i<3?'1px solid rgba(255,255,255,0.06)':'none' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{l}</span>
            <input type="checkbox" defaultChecked={i<3} style={{ width: 20, height: 20, accentColor: '#00ffff' }} />
          </label>
        ))}
      </div>
      <button style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #00ffff, #00ff88)', border: 'none', borderRadius: 12, color: '#0a0a0f', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,255,255,0.3)' }}>开始导出</button>
    </div>
  );
}
