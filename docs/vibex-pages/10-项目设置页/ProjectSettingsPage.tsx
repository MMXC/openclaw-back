/**
 * 项目设置页 - 未来科幻AI风格
 */

import React, { useState } from 'react';

const SettingItem = ({ label, desc, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(0,255,255,0.06)' }}>
    <div><p style={{ margin: '0 0 4px', fontSize: 15, color: '#fff' }}>{label}</p>{desc && <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>}</div>
    {children}
  </div>
);

export default function ProjectSettingsPage() {
  const [active, setActive] = useState('general');
  const tabs = [['general','通用设置'],['team','团队成员'],['api','API 配置'],['billing','账单']];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, padding: 24, borderRight: '1px solid rgba(0,255,255,0.1)' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 18, color: '#fff' }}>项目设置</h2>
        {tabs.map(([k,l]) => <button key={k} onClick={()=>setActive(k)} style={{ width:'100%',padding:'12px 16px',background:active===k?'rgba(0,255,255,0.1)':'transparent',border:'none',borderRadius:10,textAlign:'left',color:active===k?'#00ffff':'rgba(255,255,255,0.6)',fontSize:14,cursor:'pointer',marginBottom:4 }}>{l}</button>)}
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        <h3 style={{ margin: '0 0 24px', fontSize: 18, color: '#fff' }}>通用设置</h3>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, border: '1px solid rgba(0,255,255,0.1)' }}>
          <SettingItem label="项目名称" desc="VibeX 原型设计"><input defaultValue="VibeX 项目" style={{ width: 200, padding: '10px 14px', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff', fontSize: 14 }} /></SettingItem>
          <SettingItem label="项目描述" desc="AI 驱动的应用原型生成平台"><input defaultValue="AI 驱动原型平台" style={{ width: 200, padding: '10px 14px', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff', fontSize: 14 }} /></SettingItem>
          <SettingItem label="是否公开"><input type="checkbox" defaultChecked style={{ width: 20, height: 20, accentColor: '#00ffff' }} /></SettingItem>
          <SettingItem label="自动保存"><input type="checkbox" defaultChecked style={{ width: 20, height: 20, accentColor: '#00ffff' }} /></SettingItem>
        </div>
        <div style={{ marginTop: 32 }}><button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #00ffff, #00ff88)', border: 'none', borderRadius: 10, color: '#0a0a0f', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,255,255,0.3)' }}>保存更改</button></div>
      </main>
    </div>
  );
}
