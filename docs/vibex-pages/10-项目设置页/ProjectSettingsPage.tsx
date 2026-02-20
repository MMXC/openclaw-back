/**
 * 项目设置页 - 现代设置面板设计
 */

import React, { useState } from 'react';

const SettingItem = ({ label, desc, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <div>
      <p style={{ margin: '0 0 4px', fontSize: 15, color: '#f9fafb' }}>{label}</p>
      {desc && <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>{desc}</p>}
    </div>
    {children}
  </div>
);

export default function ProjectSettingsPage() {
  const [active, setActive] = useState('general');
  const tabs = [
    ['general', '通用设置'],
    ['team', '团队成员'],
    ['api', 'API 配置'],
    ['billing', '账单'],
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, padding: 24, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 18, color: '#f9fafb' }}>项目设置</h2>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: active === key ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              border: 'none',
              borderRadius: 10,
              textAlign: 'left',
              color: active === key ? '#818cf8' : '#9ca3af',
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
        <h3 style={{ margin: '0 0 24px', fontSize: 18, color: '#f9fafb' }}>通用设置</h3>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
          <SettingItem label="项目名称" desc="VibeX 原型设计">
            <input defaultValue="VibeX 项目" style={{ width: 200, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          </SettingItem>
          
          <SettingItem label="项目描述" desc="AI 驱动的应用原型生成平台">
            <input defaultValue="AI 驱动的应用原型生成平台" style={{ width: 200, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          </SettingItem>

          <SettingItem label="是否公开" desc="允许所有人查看项目">
            <input type="checkbox" defaultChecked style={{ width: 20, height: 20, accentColor: '#6366f1' }} />
          </SettingItem>

          <SettingItem label="自动保存" desc="实时保存项目更改">
            <input type="checkbox" defaultChecked style={{ width: 20, height: 20, accentColor: '#6366f1' }} />
          </SettingItem>
        </div>

        <div style={{ marginTop: 32 }}>
          <button style={{ padding: '12px 24px', background: '#6366f1', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            保存更改
          </button>
        </div>
      </main>
    </div>
  );
}
