/**
 * 原型预览页 - 沉浸式预览体验
 */

import React, { useState } from 'react';

export default function PreviewPage() {
  const [showNav, setShowNav] = useState(true);

  return (
    <div style={{ height: '100vh', background: '#0a0a0f', position: 'relative' }}>
      {/* 顶部导航 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '12px 20px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        opacity: showNav ? 1 : 0,
        transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.3s',
      }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>预览: 登录页</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12 }}>导出</button>
          <button style={{ padding: '6px 12px', background: '#6366f1', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12 }}>分享</button>
        </div>
      </div>

      {/* 预览区 */}
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e, #0a0a0f)',
      }}>
        <div style={{
          width: 375,
          height: 667,
          background: '#fff',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}>
          {/* 手机状态栏 */}
          <div style={{ height: 44, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
            <span style={{ fontSize: 12, color: '#333' }}>9:41</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ fontSize: 10 }}>📶</span>
              <span style={{ fontSize: 10 }}>🔋</span>
            </div>
          </div>
          {/* 登录页内容 */}
          <div style={{ padding: 40, background: '#fff', minHeight: '100%' }}>
            <h2 style={{ margin: '60px 0 8px', fontSize: 24, color: '#111', textAlign: 'center' }}>欢迎回来</h2>
            <p style={{ margin: '0 0 32px', fontSize: 14, color: '#666', textAlign: 'center' }}>登录您的账号</p>
            <input placeholder="邮箱" style={{ width: '100%', padding: 14, marginBottom: 16, border: '1px solid #eee', borderRadius: 10, fontSize: 14 }} />
            <input placeholder="密码" type="password" style={{ width: '100%', padding: 14, marginBottom: 24, border: '1px solid #eee', borderRadius: 10, fontSize: 14 }} />
            <button style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 600 }}>登录</button>
          </div>
        </div>
      </div>

      {/* 底部浮动工具 */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <button onClick={() => setShowNav(!showNav)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}>
          {showNav ? '隐藏导航' : '显示导航'}
        </button>
      </div>
    </div>
  );
}
