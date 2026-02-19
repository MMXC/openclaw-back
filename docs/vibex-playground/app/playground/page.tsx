'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Toolbar } from './components/Toolbar';
import { AIChatPanel } from './components/AIChatPanel';
import styles from './playground.module.css';

interface Position { x: number; y: number; }
interface Size { width: number; height: number; }
interface Control { id: string; type: string; name: string; position: Position; size: Size; code?: string; }
interface PageState { id: string; name: string; controls: Control[]; }
type TabView = 'home' | 'page';

const pageConfigsData: Record<string, { name: string; layout: string; controls: Array<{ type: string; position: Position; size: Size }> }> = {
  landing: { name: '落地页', layout: 'full', controls: [
    { type: 'Header', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
    { type: 'Hero', position: { x: 0, y: 64 }, size: { width: 1200, height: 400 } },
    { type: 'FeatureCard', position: { x: 0, y: 464 }, size: { width: 400, height: 200 } },
    { type: 'FeatureCard', position: { x: 400, y: 464 }, size: { width: 400, height: 200 } },
    { type: 'FeatureCard', position: { x: 800, y: 464 }, size: { width: 400, height: 200 } },
    { type: 'Footer', position: { x: 0, y: 664 }, size: { width: 1200, height: 100 } },
  ]},
  auth: { name: '登录注册页', layout: 'full', controls: [{ type: 'AuthCard', position: { x: 400, y: 100 }, size: { width: 400, height: 450 } }] },
  dashboard: { name: '用户中心', layout: 'left-right', controls: [
    { type: 'DashboardHeader', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
    { type: 'Sidebar', position: { x: 0, y: 64 }, size: { width: 240, height: 600 } },
    { type: 'ProjectCard', position: { x: 240, y: 64 }, size: { width: 320, height: 280 } },
    { type: 'ProjectCard', position: { x: 560, y: 64 }, size: { width: 320, height: 280 } },
    { type: 'StatsCard', position: { x: 880, y: 64 }, size: { width: 320, height: 280 } },
  ]},
  chat: { name: 'AI对话页', layout: 'full', controls: [
    { type: 'ChatHeader', position: { x: 0, y: 0 }, size: { width: 1200, height: 64 } },
    { type: 'MessageList', position: { x: 0, y: 64 }, size: { width: 1200, height: 500 } },
    { type: 'InputBox', position: { x: 0, y: 564 }, size: { width: 1200, height: 100 } },
  ]},
  flow: { name: '流程图编辑页', layout: 'full', controls: [
    { type: 'FlowToolbar', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
    { type: 'FlowCanvas', position: { x: 0, y: 48 }, size: { width: 1000, height: 600 } },
    { type: 'NodePanel', position: { x: 1000, y: 48 }, size: { width: 200, height: 600 } },
  ]},
  pages: { name: '页面列表页', layout: 'full', controls: [
    { type: 'SearchBar', position: { x: 0, y: 0 }, size: { width: 1200, height: 60 } },
    { type: 'PageGrid', position: { x: 0, y: 60 }, size: { width: 1200, height: 600 } },
  ]},
  editor: { name: '页面编辑页', layout: 'full', controls: [
    { type: 'EditorToolbar', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
    { type: 'ComponentPanel', position: { x: 0, y: 48 }, size: { width: 240, height: 600 } },
    { type: 'PropertyPanel', position: { x: 960, y: 48 }, size: { width: 240, height: 600 } },
  ]},
  preview: { name: '原型预览页', layout: 'full', controls: [
    { type: 'DeviceSwitcher', position: { x: 0, y: 0 }, size: { width: 1200, height: 48 } },
    { type: 'DeviceFrame', position: { x: 350, y: 48 }, size: { width: 500, height: 700 } },
  ]},
  export: { name: '导出页面', layout: 'full', controls: [
    { type: 'ExportOptions', position: { x: 0, y: 0 }, size: { width: 1200, height: 100 } },
    { type: 'CodePreview', position: { x: 0, y: 100 }, size: { width: 1200, height: 500 } },
    { type: 'DownloadButton', position: { x: 0, y: 600 }, size: { width: 1200, height: 80 } },
  ]},
  'settings-project': { name: '项目设置页', layout: 'left-right', controls: [
    { type: 'SettingsNav', position: { x: 0, y: 0 }, size: { width: 200, height: 600 } },
    { type: 'ProjectForm', position: { x: 200, y: 0 }, size: { width: 700, height: 400 } },
    { type: 'TeamList', position: { x: 200, y: 400 }, size: { width: 700, height: 200 } },
  ]},
  templates: { name: '模板市场页', layout: 'full', controls: [
    { type: 'CategoryFilter', position: { x: 0, y: 0 }, size: { width: 1200, height: 56 } },
    { type: 'TemplateGrid', position: { x: 0, y: 56 }, size: { width: 1200, height: 600 } },
  ]},
  'settings-user': { name: '用户设置页', layout: 'full', controls: [
    { type: 'UserProfile', position: { x: 0, y: 0 }, size: { width: 1200, height: 120 } },
    { type: 'AvatarUpload', position: { x: 0, y: 120 }, size: { width: 1200, height: 180 } },
    { type: 'PreferenceForm', position: { x: 0, y: 300 }, size: { width: 1200, height: 300 } },
  ]},
};

const componentMap: Record<string, React.FC<any>> = {
  Header: () => (
    <header style={{ padding: '20px 32px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontWeight: 700, fontSize: 22, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VibeX</div>
      <nav style={{ display: 'flex', gap: 32 }}><span style={{ color: '#666', fontSize: 14 }}>功能</span><span style={{ color: '#666', fontSize: 14 }}>定价</span><span style={{ color: '#666', fontSize: 14 }}>文档</span></nav>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ padding: '10px 20px', border: 'none', background: 'transparent', color: '#666', fontSize: 14, cursor: 'pointer', borderRadius: 8 }}>登录</button>
        <button style={{ padding: '10px 20px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontSize: 14, cursor: 'pointer', borderRadius: 10, boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>开始创建</button>
      </div>
    </header>
  ),
  Hero: () => (
    <div style={{ padding: '100px 32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: 52, fontWeight: 700, letterSpacing: '-1px' }}>让想法快速变成产品</h1>
      <p style={{ margin: '20px 0 0', fontSize: 22, opacity: 0.9 }}>用 AI 生成页面原型</p>
    </div>
  ),
  FeatureCard: () => (
    <div style={{ padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #e6f7ff 0%, #d6f4ff 100%)', borderRadius: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎯</div>
      <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: '#333' }}>功能特性</h3>
      <p style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.6 }}>描述文字</p>
    </div>
  ),
  Footer: () => <footer style={{ padding: 32, background: '#fff', borderTop: '1px solid #f0f0f0', textAlign: 'center', color: '#999', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>© 2026 VibeX · 让 AI 帮助创造</footer>,
  AuthCard: () => (
    <div style={{ padding: 40, background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 32px', textAlign: 'center', fontSize: 26, fontWeight: 600, color: '#333' }}>欢迎回来</h2>
      <div style={{ marginBottom: 20 }}><input placeholder="请输入邮箱" style={{ width: '100%', padding: '14px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} /></div>
      <div style={{ marginBottom: 28 }}><input type="password" placeholder="请输入密码" style={{ width: '100%', padding: '14px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} /></div>
      <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)' }}>登 录</button>
      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#999' }}>还没有账号？<span style={{ color: '#667eea', cursor: 'pointer', fontWeight: 500 }}>立即注册</span></p>
    </div>
  ),
  DashboardHeader: () => <header style={{ padding: '20px 32px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#333' }}>用户中心</h2><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%' }}></div></div></header>,
  Sidebar: () => (
    <aside style={{ background: '#fff', borderRight: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', padding: '16px 0' }}>
      {['我的项目', '模板市场', '收藏夹', '设置'].map((item, i) => <div key={i} style={{ padding: '14px 28px', color: i === 0 ? '#667eea' : '#666', fontSize: 14, fontWeight: i === 0 ? 500 : 400, background: i === 0 ? 'linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)' : 'transparent', borderLeft: i === 0 ? '3px solid #667eea' : '3px solid transparent' }}>{item}</div>)}
    </aside>
  ),
  ProjectCard: () => (
    <div style={{ padding: 20, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12, marginBottom: 16, minHeight: 140 }}></div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#333' }}>我的项目</h3>
      <p style={{ margin: '0 0 12px', color: '#999', fontSize: 13 }}>项目描述</p>
    </div>
  ),
  StatsCard: () => (
    <div style={{ padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
    <div style={{ padding: 28, background: '#fafafa', height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      <div style={{ marginBottom: 20 }}><div style={{ padding: '14px 18px', background: '#fff', borderRadius: 16, borderTopLeftRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'inline-block', maxWidth: '75%', fontSize: 14, color: '#333', lineHeight: 1.5 }}>你好！有什么可以帮助你的？</div></div>
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
  FlowCanvas: () => <div style={{ background: '#f5f5f5', height: '100%', boxSizing: 'border-box', position: 'relative' }}><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>流程节点</div></div>,
  NodePanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderLeft: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>节点</h4>
      {['开始', 'AI 对话', '条件判断', '结束'].map((n, i) => <div key={i} style={{ padding: 12, background: i === 0 ? '#e6f7ff' : i === 2 ? '#fff7e6' : '#f5f5f5', borderRadius: 8, marginBottom: 8, cursor: 'grab', fontSize: 13 }}>{n}</div>)}
    </div>
  ),
  SearchBar: () => <div style={{ padding: '16px 28px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box' }}><input placeholder="搜索页面..." style={{ width: '100%', padding: '12px 18px', border: '1px solid #e8e8e8', borderRadius: 12, fontSize: 14 }} /></div>,
  PageGrid: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: 28, height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>{[1,2,3].map(i => <div key={i} style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12 }}></div>)}</div>,
  EditorToolbar: () => (
    <div style={{ padding: '10px 20px', background: '#fff', borderBottom: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', gap: 8 }}>
      <button style={{ padding: '6px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>撤销</button>
      <button style={{ padding: '6px 14px', border: '1px solid #e8e8e8', background: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>重做</button>
      <button style={{ padding: '6px 14px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>保存</button>
    </div>
  ),
  ComponentPanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderRight: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>组件</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{['文','图','布','按','输','卡'].map((c, i) => <div key={i} style={{ aspectRatio: '1', background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', fontSize: 14 }}>{c}</div>)}</div>
    </div>
  ),
  PropertyPanel: () => (
    <div style={{ width: '100%', height: '100%', background: '#fff', borderLeft: '1px solid #f0f0f0', boxSizing: 'border-box', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>属性</h4>
      {['宽度', '高度'].map((p, i) => <div key={i} style={{ marginBottom: 16 }}><label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 6 }}>{p}</label><input defaultValue={p === '宽度' ? '100%' : 'auto'} style={{ width: '100%', padding: 8, border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 13 }} /></div>)}
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
  CodePreview: () => <div style={{ flex: 1, background: '#1e1e1e', color: '#d4d4d4', padding: 20, fontSize: 13, fontFamily: 'monospace', overflow: 'auto', boxSizing: 'border-box' }}><pre style={{ margin: 0 }}>{`import React from 'react';\n\nexport const Page = () => {\n  return <h1>Hello</h1>;\n};`}</pre></div>,
  DownloadButton: () => <div style={{ padding: 28, background: '#fff', borderTop: '1px solid #f0f0f0', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}><button style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(82, 196, 26, 0.3)' }}>下载代码</button></div>,
  SettingsNav: () => (
    <nav style={{ width: '100%', height: '100%', background: '#fff', borderRight: '1px solid #f0f0f0', boxSizing: 'border-box', padding: '16px 0' }}>
      {['基本信息', '团队成员', '域名设置', '付费记录'].map((item, i) => <div key={i} style={{ padding: '14px 28px', color: i === 0 ? '#667eea' : '#666', fontSize: 14, background: i === 0 ? 'linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)' : 'transparent', borderLeft: i === 0 ? '3px solid #667eea' : '3px solid transparent' }}>{item}</div>)}
    </nav>
  ),
  ProjectForm: () => (
    <div style={{ flex: 1, padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box' }}>
      {['项目名称', '项目描述'].map((label, i) => <div key={i} style={{ marginBottom: 24 }}><label style={{ display: 'block', marginBottom: 10, fontWeight: 500, fontSize: 14 }}>{label}</label><input defaultValue={i === 0 ? '我的项目' : '这是一个 AI 原型项目'} style={{ width: '100%', maxWidth: 440, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: 10, fontSize: 14 }} /></div>)}
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
      {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}><div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, hsl(${(i * 60) % 360}, 60%, 70%) 0%, hsl(${(i * 60 + 30) % 360}, 60%, 60%) 100%)` }}></div><div style={{ padding: 18 }}><h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>模板 {i}</h3><p style={{ margin: 0, color: '#999', fontSize: 13 }}>模板描述</p></div></div>)}
    </div>
  ),
  UserProfile: () => (
    <div style={{ padding: 28, background: '#fff', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 28 }}>
      <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%' }}></div>
