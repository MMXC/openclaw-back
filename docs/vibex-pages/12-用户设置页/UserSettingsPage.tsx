/**
 * 用户设置页 - 个人账户设置设计
 */

import React, { useState } from 'react';

export default function UserSettingsPage() {
  const [tab, setTab] = useState('account');
  const tabs = [
    ['account', '账户'],
    ['profile', '个人资料'],
    ['security', '安全'],
    ['notifications', '通知'],
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, padding: 24, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff' }}>Y</div>
          <div>
            <p style={{ margin: 0, fontSize: 15, color: '#f9fafb', fontWeight: 600 }}>余祥</p>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>免费版</p>
          </div>
        </div>

        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: tab === key ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              border: 'none',
              borderRadius: 10,
              textAlign: 'left',
              color: tab === key ? '#818cf8' : '#9ca3af',
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 4,
            }}
          >
            {label}
          </button>
        ))}
      </aside>

      <main style={{ flex: 1, padding: 32 }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, color: '#f9fafb' }}>账户设置</h2>

        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, color: '#9ca3af' }}>基本信息</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>用户名</label>
              <input defaultValue="余祥" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>邮箱</label>
              <input defaultValue="yuxiang@example.com" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14 }} />
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, color: '#9ca3af' }}>头像</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff' }}>Y</div>
            <button style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13, cursor: 'pointer' }}>更换头像</button>
          </div>
        </div>

        <button style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)' }}>
          保存更改
        </button>
      </main>
    </div>
  );
}
