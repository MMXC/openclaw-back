'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Toolbar } from './components/Toolbar';
import { AIChatPanel } from './components/AIChatPanel';
import styles from './playground.module.css';

// 科幻风格完整页面组件
import SciFiLanding from './sci-fi-pages/01-Landing';
import SciFiAuth from './sci-fi-pages/02-Auth';
import SciFiDashboard from './sci-fi-pages/03-Dashboard';
import SciFiChat from './sci-fi-pages/04-Chat';
import SciFiFlow from './sci-fi-pages/05-Flow';
import SciFiPageList from './sci-fi-pages/06-PageList';
import SciFiEditor from './sci-fi-pages/07-Editor';
import SciFiPreview from './sci-fi-pages/08-Preview';
import SciFiExport from './sci-fi-pages/09-Export';
import SciFiProjectSettings from './sci-fi-pages/10-ProjectSettings';
import SciFiTemplates from './sci-fi-pages/11-Templates';
import SciFiUserSettings from './sci-fi-pages/12-UserSettings';

const sciFiPageComponents: Record<string, React.FC> = {
  'landing': SciFiLanding,
  'auth': SciFiAuth,
  'dashboard': SciFiDashboard,
  'chat': SciFiChat,
  'flow': SciFiFlow,
  'pages': SciFiPageList,
  'editor': SciFiEditor,
  'preview': SciFiPreview,
  'export': SciFiExport,
  'settings-project': SciFiProjectSettings,
  'templates': SciFiTemplates,
  'settings-user': SciFiUserSettings,
};

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Control {
  id: string;
  type: string;
  name: string;
  position: Position;
  size: Size;
  code?: string;
}

interface PageState {
  id: string;
  name: string;
  controls: Control[];
}

type TabView = 'home' | 'page';

const pageConfigsData: Record<string, { 
  name: string; 
  layout: 'full' | 'left-right' | 'top-bottom' | 'three-col';
  controls: Array<{ type: string; position: Position; size: Size }>;
}> = {
  landing: { 
    name: '落地页', 
    layout: 'full',
    controls: [
      { type: 'Header', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
      { type: 'Hero', position: { x: 0, y: 64 }, size: { width: 1200, height: 400 } },
      { type: 'FeatureCard', position: { x: 0, y: 464 }, size: { width: 400, height: 200 } },
      { type: 'FeatureCard', position: { x: 400, y: 464 }, size: { width: 400, height: 200 } },
      { type: 'FeatureCard', position: { x: 800, y: 464 }, size: { width: 400, height: 200 } },
      { type: 'Footer', position: { x: 0, y: 664 }, size: { width: 1200, height: 100 } },
    ]
  },
  auth: { 
    name: '登录注册页', 
    layout: 'full',
    controls: [
      { type: 'AuthCard', position: { x: 400, y: 100 }, size: { width: 400, height: 450 } },
    ]
  },
  dashboard: { 
    name: '用户中心', 
    layout: 'left-right',
    controls: [
      { type: 'DashboardHeader', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
      { type: 'Sidebar', position: { x: 0, y: 64 }, size: { width: 240, height: 600 } },
      { type: 'ProjectCard', position: { x: 240, y: 64 }, size: { width: 320, height: 280 } },
      { type: 'ProjectCard', position: { x: 560, y: 64 }, size: { width: 320, height: 280 } },
      { type: 'StatsCard', position: { x: 880, y: 64 }, size: { width: 320, height: 280 } },
    ]
  },
  chat: { 
    name: 'AI对话页', 
    layout: 'full',
    controls: [
      { type: 'ChatHeader', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
      { type: 'MessageList', position: { x: 0, y: 64 }, size: { width: 1200, height: 500 } },
      { type: 'InputBox', position: { x: 0, y: 564 }, size: { width: 1200, height: 100 } },
    ]
  },
  flow: { 
    name: '流程图编辑页', 
    layout: 'full',
    controls: [
      { type: 'FlowToolbar', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
      { type: 'FlowCanvas', position: { x: 0, y: 48 }, size: { width: 1000, height: 600 } },
      { type: 'NodePanel', position: { x: 1000, y: 48 }, size: { width: 200, height: 600 } },
    ]
  },
  pages: { 
    name: '页面列表页', 
    layout: 'full',
    controls: [
      { type: 'SearchBar', position: { x: 0, y: 0 }, size: { width: 1200, height: 60 } },
      { type: 'PageGrid', position: { x: 0, y: 60 }, size: { width: 1200, height: 600 } },
    ]
  },
  editor: { 
    name: '页面编辑页', 
    layout: 'full',
    controls: [
      { type: 'EditorToolbar', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
      { type: 'ComponentPanel', position: { x: 0, y: 48 }, size: { width: 240, height: 600 } },
      { type: 'PropertyPanel', position: { x: 960, y: 48 }, size: { width: 240, height: 600 } },
    ]
  },
  preview: { 
    name: '原型预览页', 
    layout: 'full',
    controls: [
      { type: 'DeviceSwitcher', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
      { type: 'DeviceFrame', position: { x: 350, y: 48 }, size: { width: 500, height: 700 } },
    ]
  },
  export: { 
    name: '导出页面', 
    layout: 'full',
    controls: [
      { type: 'ExportOptions', position: { x: 0, y: 0 }, size: { width: 1200, height: 100 } },
      { type: 'CodePreview', position: { x: 0, y: 100 }, size: { width: 1200, height: 500 } },
      { type: 'DownloadButton', position: { x: 0, y: 600 }, size: { width: 1200, height: 80 } },
    ]
  },
  'settings-project': { 
    name: '项目设置页', 
    layout: 'left-right',
    controls: [
      { type: 'SettingsNav', position: { x: 0, y: 0 }, size: { width: 200, height: 600 } },
      { type: 'ProjectForm', position: { x: 200, y: 0 }, size: { width: 700, height: 400 } },
      { type: 'TeamList', position: { x: 200, y: 400 }, size: { width: 700, height: 200 } },
    ]
  },
  templates: { 
    name: '模板市场页', 
    layout: 'full',
    controls: [
      { type: 'CategoryFilter', position: { x: 0, y: 0 }, size: { width: 1200, height: 56 } },
      { type: 'TemplateGrid', position: { x: 0, y: 56 }, size: { width: 1200, height: 600 } },
    ]
  },
  'settings-user': { 
    name: '用户设置页', 
    layout: 'full',
    controls: [
      { type: 'UserProfile', position: { x: 0, y: 0 }, size: { width: 1200, height: 120 } },
      { type: 'AvatarUpload', position: { x: 0, y: 120 }, size: { width: 1200, height: 180 } },
      { type: 'PreferenceForm', position: { x: 0, y: 300 }, size: { width: 1200, height: 300 } },
    ]
  },
};

const componentMap: Record<string, React.FC<any>> = {
  Header: () => (
    <header style={{ padding: '20px 32px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontWeight: 700, fontSize: 22, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VibeX</div>
      <nav style={{ display: 'flex', gap: 32 }}><span style={{ color: '#666', fontSize: 14 }}>功能</span><span style={{ color: '#666', fontSize: 14 }}>定价</span><span style={{ color: '#666', fontSize: 14 }}>文档</span></nav>
      <div style={{ display: 'flex', gap: 12 }}><button style={{ padding: '10px 20px', border: 'none', background: 'transparent', color: '#666', fontSize: 14, cursor: 'pointer', borderRadius: 8 }}>登录</button><button style={{ padding: '10px 20px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontSize: 14, cursor: 'pointer', borderRadius: 10, boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>开始创建</button></div>
    </header>
  ),
  Hero: () => (
    <div style={{ padding: '100px 32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: 52, fontWeight: 700, letterSpacing: '-1px' }}>让想法快速变成产品</h1>
      <p style={{ margin: '20px 0 0', fontSize: 22, opacity: 0.9 }}>用 AI 生成页面原型</p>
    </div>
  ),
  FeatureCard: () => (
    <div style={{ padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
      <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #e6f7ff 0%, #d6f4ff 100%)', borderRadius: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎯</div>
      <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: '#333' }}>功能特性</h3>
      <p style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.6 }}>描述文字</p>
    </div>
  ),
  Footer: () => <footer style={{ padding: 32, background: '#fff', borderTop: '1px solid #f0f0f0', textAlign: 'center', color: '#999', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>© 2026 VibeX · 让 AI 帮助创造</footer>,
  AuthCard: () => (
    <div style={{ padding: 40, background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 32px', textAlign: 'center', fontSize: 26, fontWeight: 600, color: '#333' }}>欢迎回来</h2>
      <div style={{ marginBottom: 20 }}><input placeholder="请输入邮箱" style={{ width: '100%', padding: '14px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 15, boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s' }} /></div>
      <div style={{ marginBottom: 28 }}><input type="password" placeholder="请输入密码" style={{ width: '100%', padding: '14px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} /></div>
      <button style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)' }}>登 录</button>
      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#999' }}>还没有账号？<span style={{ color: '#667eea', cursor: 'pointer', fontWeight: 500 }}>立即注册</span></p>
    </div>
  ),
  DashboardHeader: () => <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}><h2 style={{ margin: 0, fontSize: 20 }}>用户中心</h2></header>,
  Sidebar: () => (
    <aside style={{ background: '#fff', borderRight: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', padding: '16px 0' }}>
      {['我的项目', '模板市场', '收藏夹', '设置'].map((item, i) => <div key={i} style={{ padding: '14px 28px', color: i === 0 ? '#667eea' : '#666', fontSize: 14, fontWeight: i === 0 ? 500 : 400, background: i === 0 ? 'linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)' : 'transparent', borderLeft: i === 0 ? '3px solid #667eea' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>{item}</div>)}
    </aside>
  ),
  ProjectCard: () => (
    <div style={{ padding: 20, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12, marginBottom: 16, minHeight: 140 }}></div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#333' }}>我的项目</h3>
      <p style={{ margin: '0 0 12px', color: '#999', fontSize: 13 }}>项目描述</p>
    </div>
  ),
  StatsCard: () => (
    <div style={{ padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
      <div style={{ fontSize: 42, fontWeight: 700, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>12</div>
      <div style={{ fontSize: 14, color: '#999', marginTop: 12 }}>项目数</div>
    </div>
  ),
  ChatHeader: () => (
    <header style={{ padding: '16px 28px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#333' }}>AI 对话</h2>
      <button style={{ padding: '8px 18px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 10, fontSize: 13, color: '#666', cursor: 'pointer' }}>+ 新对话</button>
    </header>
  ),
  MessageList: () => (
    <div style={{ padding: 24, background: '#fff', height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      <div style={{ marginBottom: 24 }}><div style={{ padding: '12px 16px', background: '#f0f0f0', borderRadius: 16, display: 'inline-block', maxWidth: '70%' }}>你好！有什么可以帮助你的？</div></div>
    </div>
  ),
  InputBox: () => (
    <div style={{ padding: '20px 28px', background: '#fff', borderTop: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 12, flex: 1 }}>
        <input placeholder="告诉 VibeX 你想做什么..." style={{ flex: 1, padding: '14px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 14, outline: 'none' }} />
        <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>发送</button>
      </div>
    </div>
  ),
  FlowToolbar: () => (
    <div style={{ padding: 12, background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', gap: 8 }}>
      <button style={{ padding: '8px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>选择</button>
      <button style={{ padding: '8px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>连接</button>
      <button style={{ padding: '8px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>删除</button>
    </div>
  ),
  FlowCanvas: () => (
    <div style={{ background: '#fafafa', height: '100%', boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 20, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>流程节点</div>
    </div>
  ),
  NodePanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderLeft: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>节点</h4>
      {['开始', 'AI 对话', '条件判断', '结束'].map((n, i) => <div key={i} style={{ padding: 12, background: i === 0 ? '#e6f7ff' : i === 2 ? '#fff7e6' : '#f5f5f5', borderRadius: 8, marginBottom: 8, cursor: 'grab', fontSize: 13 }}>{n}</div>)}
    </div>
  ),
  SearchBar: () => (
    <div style={{ padding: '16px 28px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box' }}>
      <input placeholder="搜索页面..." style={{ width: '100%', padding: '12px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 14, outline: 'none' }} />
    </div>
  ),
  PageGrid: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: 28, height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      {[1,2,3].map(i => <div key={i} style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12 }}></div>)}
    </div>
  ),
  EditorToolbar: () => (
    <div style={{ padding: '10px 20px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', gap: 8 }}>
      <button style={{ padding: '6px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>撤销</button>
      <button style={{ padding: '6px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>重做</button>
      <button style={{ padding: '6px 14px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>保存</button>
    </div>
  ),
  ComponentPanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderRight: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14 }}>组件</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{['文','图','布','按','输','卡'].map((c, i) => <div key={i} style={{ aspectRatio: '1', background: '#fafafa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}>{c}</div>)}</div>
    </div>
  ),
  PropertyPanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderLeft: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14 }}>属性</h4>
      {['宽度', '高度'].map((p, i) => <div key={i} style={{ marginBottom: 12 }}><label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>{p}</label><input defaultValue={p === '宽度' ? '100%' : 'auto'} style={{ width: '100%', padding: 6, border: '1px solid #d9d9d9', borderRadius: 4 }} /></div>)}
    </div>
  ),
  DeviceSwitcher: () => (
    <div style={{ padding: 14, background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', gap: 16 }}>
      {['手机', '平板', '桌面'].map((d, i) => <button key={i} style={{ padding: '8px 20px', border: '1px solid #e8e8e8', background: i === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff', color: i === 0 ? '#fff' : '#666', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>{d}</button>)}
    </div>
  ),
  DeviceFrame: ({ children }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f5f5f5', boxSizing: 'border-box' }}>
      <div style={{ width: 375, height: 667, background: '#fff', borderRadius: 40, border: '12px solid #333', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ height: 30, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 80, height: 6, background: '#ddd', borderRadius: 3 }}></div></div>
        <div style={{ height: 'calc(100% - 30px)', overflow: 'auto' }}>{children}</div>
      </div>
    </div>
  ),
  ExportOptions: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>导出格式</h3>
      {['React', 'Vue', 'HTML'].map((f, i) => <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, cursor: 'pointer', fontSize: 14 }}><input type="radio" name="format" defaultChecked={i === 0} /> {f}</label>)}
    </div>
  ),
  CodePreview: () => (
    <div style={{ flex: 1, background: '#1e1e1e', color: '#d4d4d4', padding: 20, fontSize: 13, fontFamily: 'monospace', overflow: 'auto', boxSizing: 'border-box' }}>
      <pre style={{ margin: 0 }}>{`import React from 'react';\n\nexport const Page = () => {\n  return <h1>Hello</h1>;\n};`}</pre>
    </div>
  ),
  DownloadButton: () => (
    <div style={{ padding: 28, background: '#fff', borderTop: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
      <button style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(82, 196, 26, 0.3)' }}>下载代码</button>
    </div>
  ),
  SettingsNav: () => (
    <nav style={{ width: '100%', height: '100%', background: '#fff', borderRight: '1px solid #f0f0f0', boxSizing: 'border-box', padding: '16px 0' }}>
      {['基本信息', '团队成员', '域名设置', '付费记录'].map((item, i) => <div key={i} style={{ padding: '14px 28px', color: i === 0 ? '#667eea' : '#666', fontSize: 14, background: i === 0 ? 'linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)' : 'transparent', borderLeft: i === 0 ? '3px solid #667eea' : '3px solid transparent', cursor: 'pointer' }}>{item}</div>)}
    </nav>
  ),
  ProjectForm: () => (
    <div style={{ flex: 1, padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      {['项目名称', '项目描述'].map((label, i) => <div key={i} style={{ marginBottom: 24 }}><label style={{ display: 'block', marginBottom: 10, fontWeight: 500, fontSize: 14 }}>{label}</label><input defaultValue={i === 0 ? '我的项目' : '这是一个 AI 原型项目'} style={{ width: '100%', maxWidth: 440, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: 10, fontSize: 14, outline: 'none' }} /></div>)}
    </div>
  ),
  TeamList: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>团队成员</h3>
      {['张三', '李四', '王五'].map((name, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}><div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%' }}></div><div><div style={{ fontWeight: 500, fontSize: 14 }}>{name}</div><div style={{ fontSize: 12, color: '#999' }}>owner</div></div></div>)}
    </div>
  ),
  CategoryFilter: () => (
    <div style={{ padding: '16px 28px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', gap: 12 }}>
      {['全部', '登录', '仪表盘', '电商', '社交'].map((c, i) => <button key={i} style={{ padding: '8px 18px', border: '1px solid #e8e8e8', background: i === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff', color: i === 0 ? '#fff' : '#666', borderRadius: 20, fontSize: 13, cursor: 'pointer' }}>{c}</button>)}
    </div>
  ),
  TemplateGrid: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: 28, height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', cursor: 'pointer' }}><div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, hsl(${(i * 60) % 360}, 60%, 70%) 0%, hsl(${(i * 60 + 30) % 360}, 60%, 60%) 100%)` }}></div><div style={{ padding: 18 }}><h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>模板 {i}</h3><p style={{ margin: 0, color: '#999', fontSize: 13 }}>模板描述</p></div></div>)}
    </div>
  ),
  UserProfile: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 28 }}>
      <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%' }}></div>
      <div><h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600, color: '#333' }}>用户</h2><p style={{ margin: 0, color: '#999', fontSize: 14 }}>user@example.com</p></div>
    </div>
  ),
  AvatarUpload: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: 120, height: 120, background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>点击上传</div>
      <button style={{ padding: '10px 24px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 10, cursor: 'pointer' }}>选择图片</button>
    </div>
  ),
  PreferenceForm: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>偏好设置</h3>
      {['接收邮件通知', '公开个人资料'].map((label, i) => <div key={i} style={{ marginBottom: 16 }}><label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}><input type="checkbox" defaultChecked /> {label}</label></div>)}
    </div>
  ),
};

const customControls: Record<string, string[]> = {
  landing: ['Header', 'Hero', 'FeatureCard', 'Footer'],
  auth: ['AuthCard'],
  dashboard: ['DashboardHeader', 'Sidebar', 'ProjectCard', 'StatsCard'],
  chat: ['ChatHeader', 'MessageList', 'InputBox'],
  flow: ['FlowToolbar', 'FlowCanvas', 'NodePanel'],
  pages: ['SearchBar', 'PageGrid'],
  editor: ['EditorToolbar', 'ComponentPanel', 'PropertyPanel'],
  preview: ['DeviceSwitcher', 'DeviceFrame'],
  export: ['ExportOptions', 'CodePreview', 'DownloadButton'],
  'settings-project': ['SettingsNav', 'ProjectForm', 'TeamList'],
  templates: ['CategoryFilter', 'TemplateGrid'],
  'settings-user': ['UserProfile', 'AvatarUpload', 'PreferenceForm'],
};

const moreControls = ['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Tabs', 'Table', 'Avatar', 'Badge', 'Toast'];

const menuItems = [
  { id: 'landing', name: '落地页' },
  { id: 'auth', name: '登录注册页' },
  { id: 'dashboard', name: '用户中心' },
  { id: 'chat', name: 'AI对话页' },
  { id: 'flow', name: '流程图编辑页' },
  { id: 'pages', name: '页面列表页' },
  { id: 'editor', name: '页面编辑页' },
  { id: 'preview', name: '原型预览页' },
  { id: 'export', name: '导出页面' },
  { id: 'settings-project', name: '项目设置页' },
  { id: 'templates', name: '模板市场页' },
  { id: 'settings-user', name: '用户设置页' },
];

const GRID_SIZE = 20;

function snapToGrid(value: number): number {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const initialPage = searchParams.get('page') || 'landing';
  
  const [activeTab, setActiveTab] = useState<TabView>('home');
  const [currentPageId, setCurrentPageId] = useState(initialPage);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sciFiPreview, setSciFiPreview] = useState(false);
  
  const config = pageConfigsData[currentPageId] || pageConfigsData.landing;
  const [page, setPage] = useState<PageState>({ id: '', name: config.name, controls: [] });
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls: Control[] = config.controls.map((c, i) => ({
      id: `${c.type}_${i}`,
      type: c.type,
      name: c.type,
      position: c.position,
      size: c.size,
      code: '',
    }));
    setPage({ id: currentPageId, name: config.name, controls });
    setSelectedControl(null);
  }, [currentPageId, config]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    setActiveId(null);
    
    if (over && over.id === 'canvas') {
      const compType = String(active.id);
      if (componentMap[compType]) {
        const x = showGrid ? snapToGrid(100 + delta.x) : 100 + delta.x;
        const y = showGrid ? snapToGrid(100 + delta.y) : 100 + delta.y;
        
        const newControl: Control = {
          id: `${compType}_${Date.now()}`,
          type: compType,
          name: compType,
          position: { x: Math.max(0, x), y: Math.max(0, y) },
          size: { width: 200, height: 100 },
          code: '',
        };
        setPage(p => ({ ...p, controls: [...p.controls, newControl] }));
        setSelectedControl(newControl);
      }
    }
  };

  const moveControl = (id: string, delta: { x: number; y: number }) => {
    setPage(p => ({
      ...p,
      controls: p.controls.map(c => c.id === id ? {
        ...c,
        position: { 
          x: Math.max(0, showGrid ? snapToGrid(c.position.x + delta.x) : c.position.x + delta.x), 
          y: Math.max(0, showGrid ? snapToGrid(c.position.y + delta.y) : c.position.y + delta.y) 
        }
      } : c)
    }));
  };

  const resizeControl = (id: string, delta: { width: number; height: number }) => {
    setPage(p => ({
      ...p,
      controls: p.controls.map(c => c.id === id ? {
        ...c,
        size: { 
          width: Math.max(50, showGrid ? snapToGrid(c.size.width + delta.width) : c.size.width + delta.width), 
          height: Math.max(30, showGrid ? snapToGrid(c.size.height + delta.height) : c.size.height + delta.height) 
        }
      } : c)
    }));
  };

  const updateControl = (id: string, updates: Partial<Control>) => {
    setPage(p => ({ ...p, controls: p.controls.map(c => c.id === id ? { ...c, ...updates } : c) }));
    if (selectedControl?.id === id) setSelectedControl(s => s ? { ...s, ...updates } : null);
  };

  const deleteControl = (id: string) => {
    setPage(p => ({ ...p, controls: p.controls.filter(c => c.id !== id) }));
    if (selectedControl?.id === id) setSelectedControl(null);
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify({ page }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${page.name}.json`;
    a.click();
  };

  const renderControl = (control: Control) => {
    const Component = componentMap[control.type];
    if (!Component) return <div>Unknown</div>;
    return <Component />;
  };

  const currentCustomControls = customControls[currentPageId] || [];

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).className.includes('canvas')) {
      setSelectedControl(null);
    }
  };

  return (
    <DndContext onDragStart={(e) => setActiveId(String(e.active.id))} onDragEnd={handleDragEnd}>
      <div className={styles.playground}>
        <Toolbar pageName={page.name} onNameChange={() => {}} onExport={exportConfig} viewMode="ui" onViewModeChange={() => {}} />

        <div className={styles.main}>
          {/* 左侧菜单 */}
          <div className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>📁 页面菜单</span>
              <button className={styles.collapseBtn} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                {sidebarCollapsed ? '▶' : '◀'}
              </button>
            </div>
            
            {!sidebarCollapsed && (
              <nav className={styles.nav}>
                {menuItems.map(item => (
                  <div key={item.id} className={styles.navItem}>
                    <div 
                      className={`${styles.navHeader} ${currentPageId === item.id && activeTab === 'page' ? styles.active : ''}`}
                      onClick={() => { setCurrentPageId(item.id); setActiveTab('page'); }}
                    >
                      <span className={styles.pageId}>{item.id.padStart(2, '0')}</span>
                      <span className={styles.pageName}>{item.name}</span>
                    </div>
                    
                    {currentPageId === item.id && activeTab === 'page' && (
                      <div className={styles.navActions}>
                        <div className={styles.navAction}>📄 说明</div>
                        <div className={`${styles.navAction} ${styles.activeAction}`}>🎨 {item.name}原型</div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Tab 栏 */}
          {activeTab === 'page' && (
            <div className={styles.tabBar}>
              <div className={styles.tab}>
                <span>🏠 首页</span>
                <button onClick={() => setActiveTab('home')}>×</button>
              </div>
              <div className={`${styles.tab} ${styles.activeTab}`}>
                <span>🎨 {config.name}原型</span>
                <button onClick={() => setActiveTab('home')}>×</button>
              </div>
              <div className={styles.gridToggle}>
                <label>
                  <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} />
                  显示网格
                </label>
              </div>
              <button 
                onClick={() => setSciFiPreview(!sciFiPreview)}
                style={{
                  padding: '6px 12px',
                  background: sciFiPreview ? 'linear-gradient(135deg, #00ffff, #00ff88)' : 'rgba(0,255,255,0.1)',
                  border: '1px solid',
                  borderColor: sciFiPreview ? '#00ffff' : 'rgba(0,255,255,0.3)',
                  borderRadius: 6,
                  color: sciFiPreview ? '#0a0a0f' : '#00ffff',
                  fontSize: 12,
                  cursor: 'pointer',
                  marginLeft: 12,
                }}
              >
                {sciFiPreview ? '🔙 返回编辑' : '🚀 科幻预览'}
              </button>
            </div>
          )}

          {/* 画布区域 */}
          {activeTab === 'page' ? (
            <div className={styles.canvasWrapper}>
              <div 
                ref={canvasRef} 
                className={styles.canvas}
                onClick={handleCanvasClick}
              >
                {/* 科幻预览模式 */}
                {sciFiPreview ? (
                  <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#0a0a0f' }}>
                    {sciFiPageComponents[currentPageId] ? (
                      React.createElement(sciFiPageComponents[currentPageId])
                    ) : (
                      <div style={{ padding: 40, color: '#666', textAlign: 'center' }}>
                        该页面暂无科幻风格版本
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {showGrid && (
                      <div 
                        className={styles.gridOverlay}
                        style={{ 
                          backgroundImage: `linear-gradient(to right, #e0e0e0 1px, transparent 1px), linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)`,
                          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                        }}
                      />
                    )}
                    {page.controls.map(control => (
                      <DraggableControl
                        key={control.id}
                        control={control}
                        isSelected={selectedControl?.id === control.id}
                        onSelect={() => setSelectedControl(control)}
                        onMove={(delta) => moveControl(control.id, delta)}
                        onResize={(delta) => resizeControl(control.id, delta)}
                        onDelete={() => deleteControl(control.id)}
                      >
                        {renderControl(control)}
                      </DraggableControl>
                    ))}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.homeContent}>
              <h1>🎯 VibeX Playground</h1>
              <p>选择左侧页面，点击"XX原型"开始编辑</p>
              <div className={styles.features}>
                <div className={styles.feature}><span>🧩</span><span>组件库拖拽</span></div>
                <div className={styles.feature}><span>✏️</span><span>可视化属性</span></div>
                <div className={styles.feature}><span>📐</span><span>网格吸附</span></div>
                <div className={styles.feature}><span>🤖</span><span>AI 智能调整</span></div>
              </div>
            </div>
          )}

          {/* 右侧属性面板 + AI助手 */}
          {activeTab === 'page' && (
            <div className={styles.rightPanel}>
              <div className={styles.propsSection}>
                {selectedControl ? (
                  <div className={styles.propsPanel}>
                    <h3>✏️ {selectedControl.type}</h3>
                    
                    <div className={styles.propGroup}>
                      <label>位置</label>
                      <div className={styles.propRow}>
                        <span>X</span>
                        <input 
                          type="number" 
                          value={selectedControl.position.x} 
                          onChange={e => updateControl(selectedControl.id, { position: { ...selectedControl.position, x: Number(e.target.value) } })}
                        />
                        <span>Y</span>
                        <input 
                          type="number" 
                          value={selectedControl.position.y} 
                          onChange={e => updateControl(selectedControl.id, { position: { ...selectedControl.position, y: Number(e.target.value) } })}
                        />
                      </div>
                    </div>

                    <div className={styles.propGroup}>
                      <label>尺寸</label>
                      <div className={styles.propRow}>
                        <span>W</span>
                        <input 
                          type="number" 
                          value={selectedControl.size.width} 
                          onChange={e => updateControl(selectedControl.id, { size: { ...selectedControl.size, width: Number(e.target.value) } })}
                        />
                        <span>H</span>
                        <input 
                          type="number" 
                          value={selectedControl.size.height} 
                          onChange={e => updateControl(selectedControl.id, { size: { ...selectedControl.size, height: Number(e.target.value) } })}
                        />
                      </div>
                    </div>

                    <button className={styles.deleteBtn} onClick={() => deleteControl(selectedControl.id)}>🗑️ 删除控件</button>
                  </div>
                ) : (
                  <div className={styles.hint}>
                    👈 拖拽组件到画布<br/>
                    🎯 点击控件查看/编辑<br/>
                    ↘️ 拖拽右下角调整大小
                  </div>
                )}
              </div>
              
              {/* AI 助手面板 */}
              <div className={styles.aiSection}>
                <AIChatPanel 
                  selectedControl={selectedControl ? { id: selectedControl.id, type: selectedControl.type, code: '' } : null}
                  pageCode={JSON.stringify({ page }, null, 2)}
                  onApplyChange={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

function DraggableItem({ type, name }: { type: string; name: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: type });
  return <div ref={setNodeRef} {...listeners} {...attributes} className={styles.draggable} style={{ opacity: isDragging ? 0.5 : 1 }}>{name}</div>;
}

function DraggableControl({ 
  children, 
  control, 
  isSelected, 
  onSelect, 
  onMove, 
  onResize,
  onDelete 
}: { 
  children: React.ReactNode; 
  control: Control; 
  isSelected: boolean; 
  onSelect: () => void;
  onMove: (delta: { x: number; y: number }) => void;
  onResize: (delta: { width: number; height: number }) => void;
  onDelete: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).className.includes('resizeHandle')) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    startPos.current = { x: e.clientX, y: e.clientY };
    onSelect();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        onMove({ x: dx, y: dy });
        startPos.current = { x: e.clientX, y: e.clientY };
      }
      if (isResizing) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        onResize({ width: dx, height: dy });
        startPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, onMove, onResize]);

  return (
    <div
      className={`${styles.controlItem} ${isSelected ? styles.selected : ''} ${isDragging ? styles.dragging : ''}`}
      style={{
        position: 'absolute',
        left: control.position.x,
        top: control.position.y,
        width: control.size.width,
        height: control.size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
      {isSelected && (
        <>
          <div className={styles.controlLabel}>{control.type}</div>
          <div className={styles.resizeHandle} onMouseDown={handleMouseDown}></div>
        </>
      )}
    </div>
  );
}

export default function Playground() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#999' }}>加载中...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
