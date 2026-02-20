/**
 * 模板市场页 - 未来科幻AI风格
 */

import React, { useState, useEffect } from 'react';

const TemplateCard = ({ title, category, uses, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{ borderRadius: 18, overflow: 'hidden', cursor: 'pointer', transform: hovered?'translateY(-6px)':'translateY(0)', transition: 'all 0.3s', boxShadow: hovered?'0 24px 48px rgba(0,0,0,0.4)':'0 4px 12px rgba(0,0,0,0.1)', border: '1px solid rgba(0,255,255,0.1)' }}>
      <div style={{ height: 200, background: 'linear-gradient(135deg, #1a1a2e, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 52, opacity: 0.3 }}>📄</span></div>
      <div style={{ padding: 18, background: 'rgba(0,255,255,0.02)', borderTop: '1px solid rgba(0,255,255,0.1)' }}>
        <span style={{ fontSize: 11, color: '#00ffff', background: 'rgba(0,255,255,0.15)', padding: '4px 10px', borderRadius: 6 }}>{category}</span>
        <h4 style={{ margin: '12px 0', fontSize: 15, color: '#fff' }}>{title}</h4>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{uses} 次使用</p>
      </div>
    </div>
  );
};

export default function TemplateMarketPage() {
  const [category, setCategory] = useState('all');
  const categories = ['all','登录页','仪表盘','表单','电商','个人'];
  const templates = [
    { title: '现代登录页', category: '登录页', uses: 1234 },
    { title: '数据分析仪表盘', category: '仪表盘', uses: 892 },
    { title: '用户注册表单', category: '表单', uses: 756 },
    { title: '电商产品页', category: '电商', uses: 543 },
    { title: '个人作品集', category: '个人', uses: 432 },
    { title: 'AI 对话界面', category: '仪表盘', uses: 321 },
  ];
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1218 100%)', padding: 40 }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#fff' }}>模板市场</h1>
      <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,0.5)' }}>发现灵感，从模板开始</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {categories.map(cat => <button key={cat} onClick={()=>setCategory(cat)} style={{ padding: '8px 16px', background: category===cat?'rgba(0,255,255,0.2)':'rgba(255,255,255,0.04)', border: '1px solid', borderColor: category===cat?'#00ffff':'rgba(255,255,255,0.08)', borderRadius: 20, color: category===cat?'#00ffff':'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer' }}>{cat==='all'?'全部':cat}</button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {templates.map((t,i) => <TemplateCard key={i} {...t} index={i} />)}
      </div>
    </div>
  );
}
