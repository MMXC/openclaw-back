/**
 * 流程图编辑页 - 未来科幻AI风格
 * 
 * 设计亮点:
 * 1. 量子网格背景 - 无限延伸网格
 * 2. 全息节点 - 玻璃拟态+发光边框
 * 3. 数据流动画 - 连接线脉冲效果
 * 4. AI分析面板 - 实时建议
 * 5. 神经工具栏 - 悬浮操作
 */

import React, { useState, useEffect } from 'react';

// 量子网格
const QuantumGrid = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '30px 30px',
    animation: 'gridMove 20s linear infinite',
  }} />
);

// 流程节点
const FlowNode = ({ type, label, x, y, selected, onClick }) => {
  const configs = {
    start: { color: '#00ff88', icon: '▶', label: '开始' },
    process: { color: '#00ffff', icon: '⚙', label: '处理' },
    decision: { color: '#fbbf24', icon: '◇', label: '判断' },
    input: { color: '#a78bfa', icon: '↓', label: '输入' },
    end: { color: '#f87171', icon: '■', label: '结束' },
  };
  const config = configs[type] || configs.process;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        minWidth: 140,
        padding: '14px 18px',
        background: selected ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        borderRadius: 14,
        border: '2px solid',
        borderColor: selected ? config.color : 'rgba(0, 255, 255, 0.2)',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s',
        boxShadow: selected ? `0 0 30px ${config.color}40` : '0 4px 12px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* 连接点 */}
      {[0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute',
          [i === 0 ? 'top' : 'bottom']: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: config.color,
          border: '2px solid #0a0a0f',
          boxShadow: `0 0 10px ${config.color}`,
        }} />
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: `${config.color}20`,
          color: config.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}>{config.icon}</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{label}</span>
      </div>
    </div>
  );
};

// 节点库
const NodeLibrary = () => {
  const nodes = [
    { type: 'start', label: '开始' },
    { type: 'process', label: '处理' },
    { type: 'decision', label: '判断' },
    { type: 'input', label: '输入' },
    { type: 'end', label: '结束' },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>节点库</h3>
      {nodes.map((n, i) => (
        <div key={i} draggable style={{
          padding: '12px 14px',
          background: 'rgba(0, 255, 255, 0.03)',
          borderRadius: 10,
          border: '1px solid rgba(0, 255, 255, 0.1)',
          marginBottom: 10,
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          transition: 'all 0.2s',
        }}>
          <span style={{ color: '#00ffff', fontSize: 14 }}>⬡</span>
          <span style={{ fontSize: 13, color: '#fff' }}>{n.label}</span>
        </div>
      ))}
    </div>
  );
};

// AI分析面板
const AIPanel = () => (
  <div style={{ padding: 20, borderTop: '1px solid rgba(0,255,255,0.1)' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
      padding: '8px 12px',
      background: 'rgba(0, 255, 136, 0.1)',
      borderRadius: 8,
      border: '1px solid rgba(0, 255, 136, 0.2)',
    }}>
      <span style={{ fontSize: 14 }}>🤖</span>
      <span style={{ fontSize: 12, color: '#00ff88' }}>AI 优化建议</span>
    </div>
    <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
      检测到 3 个可优化的流程节点，建议添加错误处理流程以提高健壮性。
    </p>
  </div>
);

// 工具栏
const Toolbar = () => {
  const tools = [
    { icon: '↖', label: '选择' },
    { icon: '✋', label: '拖拽' },
    { icon: '🔗', label: '连接' },
    { icon: '🔍', label: '缩放' },
    { icon: '↩', label: '撤销' },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 4,
      padding: 8,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: 14,
      border: '1px solid rgba(0, 255, 255, 0.2)',
    }}>
      {tools.map((t, i) => (
        <button key={i} style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: 'none',
          background: i === 0 ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
          color: i === 0 ? '#00ffff' : 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          fontSize: 16,
          transition: 'all 0.2s',
        }}>{t.icon}</button>
      ))}
    </div>
  );
};

export default function FlowEditorPage() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(100);

  const nodes = [
    { id: 1, type: 'start', label: '开始', x: 380, y: 60 },
    { id: 2, type: 'input', label: '获取输入', x: 340, y: 160 },
    { id: 3, type: 'process', label: 'AI 处理', x: 340, y: 260 },
    { id: 4, type: 'decision', label: '验证?', x: 320, y: 360 },
    { id: 5, type: 'process', label: '保存结果', x: 460, y: 460 },
    { id: 6, type: 'end', label: '结束', x: 380, y: 560 },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f' }}>
      <aside style={{ width: 240, borderRight: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
        <NodeLibrary />
        <AIPanel />
      </aside>

      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <QuantumGrid />
        <Toolbar />
        
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {nodes.map(node => (
            <FlowNode
              key={node.id}
              {...node}
              selected={selectedNode?.id === node.id}
              onClick={() => setSelectedNode(node)}
            />
          ))}
        </div>

        {/* 缩放 */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 12,
          border: '1px solid rgba(0, 255, 255, 0.2)',
        }}>
          <button onClick={() => setZoom(Math.max(25, zoom - 25))} style={{ background: 'none', border: 'none', color: '#00ffff', cursor: 'pointer', fontSize: 16 }}>-</button>
          <span style={{ fontSize: 13, color: '#fff', minWidth: 45, textAlign: 'center' }}>{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 25))} style={{ background: 'none', border: 'none', color: '#00ffff', cursor: 'pointer', fontSize: 16 }}>+</button>
        </div>
      </main>

      <aside style={{ width: 280, borderLeft: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ padding: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>节点属性</h3>
          {selectedNode ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>名称</label>
                <input defaultValue={selectedNode.label} style={{
                  width: '100%', padding: '12px', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff', fontSize: 14,
                }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>描述</label>
                <textarea rows={4} placeholder="输入节点描述..." style={{
                  width: '100%', padding: '12px', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: 8, color: '#fff', fontSize: 14, resize: 'none',
                }} />
              </div>
            </>
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>选择一个节点查看属性</p>
          )}
        </div>
      </aside>
    </div>
  );
}
