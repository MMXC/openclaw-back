/**
 * 页面编辑页 - 专业原型编辑器设计
 * 
 * 设计灵感:
 * 1. 组件面板 - Sketch/Figma 左侧面板
 * 2. 编辑画布 - Canva/FigJam 无限画布
 * 3. 属性检查器 - Xcode Interface Builder
 * 4. 设备切换 - Apple Preview 风格
 */

import React, { useState } from 'react';

const ComponentItem = ({ icon, name, onDragStart }) => (
  <div
    draggable
    onDragStart={onDragStart}
    style={{
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderRadius: 8,
      cursor: 'grab',
      transition: 'background 0.2s',
      marginBottom: 4,
    }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    <span style={{ fontSize: 13, color: '#d1d5db' }}>{name}</span>
  </div>
);

const DeviceFrame = ({ device, children }) => (
  <div style={{
    background: '#1a1a1a',
    borderRadius: device === 'mobile' ? 40 : 16,
    padding: device === 'mobile' ? '12px 6px' : 16,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    maxWidth: device === 'mobile' ? 375 : '100%',
    maxHeight: device === 'mobile' ? 812 : '100%',
    margin: '0 auto',
  }}>
    {device !== 'mobile' && (
      <div style={{
        height: 24,
        background: '#2a2a2a',
        borderRadius: '8px 8px 0 0',
        margin: -16,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        gap: 6,
      }}>
        {[].map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: ['#ff5f57', '#febc2e', '#28c840'][i] }} />
        ))}
      </div>
    )}
    {children}
  </div>
);

export default function PageEditorPage() {
  const [device, setDevice] = useState('desktop');
  const [zoom, setZoom] = useState(50);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f' }}>
      {/* 左侧组件面板 */}
      <aside style={{ width: 240, borderRight: '1px solid rgba(255,255,255,0.06)', padding: 16, overflowY: 'auto' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>基础组件</h3>
        {[
          ['📝', '输入框'], ['🔘', '按钮'], ['☑️', '复选框'],
          ['⬇️', '下拉框'], ['🔠', '文本'], ['🖼️', '图片'],
          ['📊', '卡片'], ['📋', '列表'], ['🏷️', '标签'],
        ].map(([icon, name], i) => (
          <ComponentItem key={i} icon={icon} name={name} onDragStart={() => {}} />
        ))}

        <h3 style={{ margin: '24px 0 16px', fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>布局组件</h3>
        {[
          ['📦', '容器'], ['⬜', '网格'], ['📏', '分隔线'], ['🔲', '弹窗'],
        ].map(([icon, name], i) => (
          <ComponentItem key={i} icon={icon} name={name} onDragStart={() => {}} />
        ))}
      </aside>

      {/* 中间画布 */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden', background: `
        radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
      `, backgroundSize: '100% 100%, 20px 20px, 20px 20px' }}>
        {/* 顶部工具栏 */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          zIndex: 10,
        }}>
          {['desktop', 'tablet', 'mobile'].map(d => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: 'none',
                background: device === d ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                color: device === d ? '#818cf8' : '#9ca3af',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {d === 'desktop' ? '🖥️' : d === 'tablet' ? '📱' : '📱'}
            </button>
          ))}
        </div>

        {/* 画布内容 */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}>
          <div style={{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }}>
            <DeviceFrame device={device}>
              <div style={{
                background: '#fff',
                borderRadius: 8,
                minHeight: 400,
                padding: 24,
              }}>
                <div style={{ color: '#333', textAlign: 'center', paddingTop: 100 }}>
                  <p style={{ margin: 0, fontSize: 14 }}>拖拽组件到此处开始编辑</p>
                </div>
              </div>
            </DeviceFrame>
          </div>
        </div>

        {/* 缩放 */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 20,
        }}>
          <button onClick={() => setZoom(Math.max(25, zoom - 25))} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 14 }}>-</button>
          <span style={{ fontSize: 12, color: '#9ca3af', minWidth: 40, textAlign: 'center' }}>{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 25))} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 14 }}>+</button>
        </div>
      </main>

      {/* 右侧属性面板 */}
      <aside style={{ width: 260, borderLeft: '1px solid rgba(255,255,255,0.06)', padding: 20 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 13, color: '#9ca3af', textTransform: 'uppercase' }}>属性</h3>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>宽度</label>
          <input defaultValue="100%" style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f9fafb', fontSize: 13 }} />
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>高度</label>
          <input defaultValue="auto" style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f9fafb', fontSize: 13 }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>间距</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['上', '右', '下', '左'].map(dir => (
              <input key={dir} placeholder={dir} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f9fafb', fontSize: 12, textAlign: 'center' }} />
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>背景</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} />
            <input defaultValue="#FFFFFF" style={{ flex: 1, padding: '8px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f9fafb', fontSize: 13 }} />
          </div>
        </div>
      </aside>
    </div>
  );
}
