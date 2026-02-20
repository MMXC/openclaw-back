/**
 * 用户设置页 - 未来科幻AI风格
 */

import React, { useState } from 'react';

export default function UserSettingsPage() {
  const [tab, setTab] = useState('account');
  const tabs = [['account','账户'],['profile','个人资料'],['security','安全'],['notifications','通知']];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, padding: 24, borderRight: '1px solid rgba(0,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00ffff, #00ff88)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#0a0a0f', fontWeight: 700, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}>Y</div>
          <div><p style={{ margin: 0, fontSize: 15, color: '#fff', fontWeight: 600 }}>余祥</p><p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>免费版</p></div>
        </div>
        {tabs.map(([k,l]) => <button key={k} onClick={()=>setTab(k)} style={{ width:'100%',padding:'12px 16px',background:tab===k?'rgba(0,255,255,0.1)':'transparent',border:'none',borderRadius:10,textAlign:'left',color:tab===k?'#00ffff':'rgba(255,255,255,0.6)',fontSize:14,cursor:'pointer',marginBottom:4 }}>{l}</button>)}
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, color: '#fff' }}>账户设置</h2>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 24, border: '1px solid rgba(0,255,255,0.1)', marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>基本信息</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['用户名','余祥'],['邮箱','yuxiang@example.com']].map(([l,v],i) => <div key={i}><label style={{ display:'block',fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:8 }}>{l}</label><input defaultValue={v} style={{ width:'100%',padding:'12px 16px',background:'rgba(0,255,255,0.05)',border:'1px solid rgba(0,255,255,0.2)',borderRadius:10,color:'#fff',fontSize:14 }} /></div>)}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 24, border: '1px solid rgba(0,255,255,0.1)', marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>头像</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #00ffff, #00ff88)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#0a0a0f', fontWeight: 700, boxShadow: '0 0 30px rgba(0,255,255,0.5)' }}>Y</div>
            <button style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 10, color: '#fff', fontSize: 13, cursor: 'pointer' }}>更换头像</button>
          </div>
        </div>
        <button style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #00ffff, #00ff88)', border: 'none', borderRadius: 12, color: '#0a0a0f', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,255,255,0.3)' }}>保存更改</button>
      </main>
    </div>
  );
}
