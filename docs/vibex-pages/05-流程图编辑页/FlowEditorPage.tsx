/**
 * 流程图编辑页 - 专业可视化编辑器设计
 * 
 * 设计灵感:
 * 1. 画布网格 - Figma/Miro 专业设计工具
 * 2. 节点设计 - Notion Database 卡片风格
 * 3. 工具栏 - Adobe 全家桶悬浮工具栏
 * 4. 属性面板 - Sketch/Linova 右侧 Inspector
 * 5. 缩放控制 - Google Maps 地图控件
 */

import React, { useState } from 'react';

// 节点类型定义
const nodeTypes = {
  start: { label: '开始', color: '#34d399', icon: '▶' },
  process: { label: '处理', color: '#60a5fa', icon: '⚙' },
  decision: { label: '判断', color: '#fbbf24', icon: '◇' },
  input: { label: '输入', color: '#a78bfa', icon: '↓' },
  output: { label: '输出', color: '#f472b6', icon: '↑' },
  end: { label: '结束', color: '#f87171', icon: '■' },
};

// 流程节点
const FlowNode = ({ type, label, x, y, selected, onClick }) => {
  const config = nodeTypes[type] || nodeTypes.process;
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
        padding: '12px 16px',
        background: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
        borderRadius: 12,
        border: '2px solid',
        borderColor: selected ? config.color : 'rgba(255,255,255,0.08)',
        boxShadow: selected 
          ? `0 0 0 2px ${config.color}30, 0 8px 24px rgba(0,0,0,0.3)` 
          : '0 2px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* 连接点 */}
      <div style={{
        position: 'absolute',
        top: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: config.color,
        border: '2px solid #0a0a0f',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: config.color,
        border: '2px solid #0a0a0f',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `${config.color}20`,
          color: config.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
        }}>
          {config.icon}
        </span>
        <span style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#f9fafb',
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// 工具栏按钮
const ToolButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      border: 'none',
      background: active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
      color: active ? '#818cf8' : '#9ca3af',
      cursor: 'pointer',
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    }}
  >
    {icon}
  </button>
);

// 节点库项
const LibraryItem = ({ type, label, onDragStart }) => (
  <div
    draggable
    onDragStart={onDragStart}
    style={{
      padding: '10px 14px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: 10,
      border: '1px solid rgba(255,255,255,0.06)',
      cursor: 'grab',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      transition: 'all 0.2s',
      marginBottom: 8,
    }}
  >
    <span style={{
      width: 24,
      height: 24,
      borderRadius: 6,
      background: `${nodeTypes[type].color}20`,
      color: nodeTypes[type].color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
    }}>
      {nodeTypes[type].icon}
    </span>
    <span style={{ fontSize: 13, color: '#d1d5db' }}>
      {label}
    </span>
  </div>
);

// 属性面板
const PropertiesPanel = ({ node }) => {
  if (!node) {
    return (
      <div style={{ padding: 24, color: '#6b7280', fontSize: 14, textAlign: 'center' }}>
        选择一个节点查看属性
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        节点属性
      </h3>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>
          节点名称
        </label>
        <input
          defaultValue={node.label}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#f9fafb',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>
          节点类型
        </label>
        <select
          defaultValue={node.type}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#f9fafb',
            fontSize: 14,
            outline: 'none',
          }}
        >
          {Object.entries(nodeTypes).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>
          描述
        </label>
        <textarea
          rows={3}
          placeholder="输入节点描述..."
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#f9fafb',
            fontSize: 14,
            outline: 'none',
            resize: 'none',
          }}
        />
      </div>
    </div>
  );
};

// 主组件
export default function FlowEditorPage() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [tool, setTool] = useState('select');

  const nodes = [
    { id: 1, type: 'start', label: '开始', x: 400, y: 60 },
    { id: 2, type: 'input', label: '获取用户输入', x: 360, y: 160 },
    { id: 3, type: 'process', label: '处理数据', x: 360, y: 260 },
    { id: 4, type: 'decision', label: '验证通过?', x: 340, y: 360 },
    { id: 5, type: 'process', label: '保存结果', x: 500, y: 460 },
    { id: 6, type: 'end', label: '结束', x: 400, y: 560 },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f' }}>
      {/* 左侧节点库 */}
      <aside style={{
        width: 220,
        padding: 20,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>
          节点库
        </h3>
        
        {Object.entries(nodeTypes).map(([key, val]) => (
          <LibraryItem
            key={key}
            type={key}
            label={val.label}
            onDragStart={() => {}}
          />
        ))}
      </aside>

      {/* 主画布 */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* 顶部工具栏 */}
        <div style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
          padding: 6,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.08)',
          zIndex: 10,
        }}>
          <ToolButton icon="↖" label="选择" active={tool === 'select'} onClick={() => setTool('select')} />
          <ToolButton icon="✋" label="拖拽" active={tool === 'drag'} onClick={() => setTool('drag')} />
          <ToolButton icon="🔗" label="连接" active={tool === 'connect'} onClick={() => setTool('connect')} />
          <ToolButton icon="🔍" label="缩放" active={false} onClick={() => {}} />
          <ToolButton icon="↩" label="撤销" active={false} onClick={() => {}} />
          <ToolButton icon="↪" label="重做" active={false} onClick={() => {}} />
        </div>

        {/* 画布背景 */}
        <div style={{
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 20px 20px, 20px 20px',
          position: 'relative',
        }}>
          {/* 流程节点 */}
          {nodes.map(node => (
            <FlowNode
              key={node.id}
              {...node}
              selected={selectedNode?.id === node.id}
              onClick={() => setSelectedNode(node)}
            />
          ))}
        </div>

        {/* 缩放控件 */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            -
          </button>
          <span style={{ fontSize: 13, color: '#9ca3af', minWidth: 45, textAlign: 'center' }}>
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            +
          </button>
        </div>
      </main>

      {/* 右侧属性面板 */}
      <aside style={{
        width: 280,
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <PropertiesPanel node={selectedNode} />
      </aside>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
