'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CodeEditor } from './components/CodeEditor';
import { PreviewPanel } from './components/PreviewPanel';
import { Toolbar } from './components/Toolbar';
import { AIChat } from './components/AIChat';
import styles from './playground.module.css';

interface Control {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  code?: string;
}

interface PageState {
  id: string;
  name: string;
  controls: Control[];
}

// 页面配置数据
const pageConfigsData: Record<string, { name: string; controls: string[] }> = {
  landing: { name: '落地页', controls: ['Header', 'Hero', 'FeatureCard', 'Footer'] },
  auth: { name: '登录注册页', controls: ['AuthCard'] },
  dashboard: { name: '用户中心', controls: ['DashboardHeader', 'Sidebar', 'ProjectCard', 'StatsCard'] },
  chat: { name: 'AI对话页', controls: ['ChatHeader', 'MessageList', 'InputBox', 'SuggestionBar'] },
  flow: { name: '流程图编辑页', controls: ['FlowToolbar', 'FlowCanvas', 'NodePanel'] },
  pages: { name: '页面列表页', controls: ['PageGrid', 'PageCard', 'SearchBar'] },
  editor: { name: '页面编辑页', controls: ['EditorToolbar', 'ComponentPanel', 'PropertyPanel'] },
  preview: { name: '原型预览页', controls: ['DeviceFrame', 'PreviewCanvas', 'DeviceSwitcher'] },
  export: { name: '导出页面', controls: ['ExportOptions', 'CodePreview', 'DownloadButton'] },
  'settings-project': { name: '项目设置页', controls: ['SettingsNav', 'ProjectForm', 'TeamList'] },
  templates: { name: '模板市场页', controls: ['TemplateGrid', 'TemplateCard', 'CategoryFilter'] },
  'settings-user': { name: '用户设置页', controls: ['UserProfile', 'AvatarUpload', 'PreferenceForm'] },
};

// 控件组件映射
const componentMap: Record<string, React.ComponentType<any>> = {
  Header: ({ logo = 'VibeX' }) => (
    <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: '20px' }}>{logo}</div>
      <nav style={{ display: 'flex', gap: '24px' }}><span style={{ color: '#666' }}>功能</span><span style={{ color: '#666' }}>定价</span><span style={{ color: '#666' }}>文档</span></nav>
      <div style={{ display: 'flex', gap: '12px' }}><button style={{ padding: '8px 16px', border: 'none', background: 'transparent' }}>登录</button><button style={{ padding: '8px 16px', border: 'none', background: '#1890ff', color: '#fff', borderRadius: '6px' }}>开始创建</button></div>
    </header>
  ),
  Hero: () => (
    <div style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center' }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '48px' }}>让想法快速变成产品</h1>
      <p style={{ margin: 0, fontSize: '20px', opacity: 0.9 }}>用 AI 生成页面原型</p>
    </div>
  ),
  FeatureCard: () => (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ width: 48, height: 48, background: '#e6f7ff', borderRadius: 12, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>功能特性</h3>
      <p style={{ margin: 0, color: '#666', fontSize: 14 }}>描述文字</p>
    </div>
  ),
  Footer: () => <footer style={{ padding: 24, background: '#f5f5f5', textAlign: 'center', color: '#666' }}>© 2026 VibeX</footer>,
  AuthCard: () => (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 24px', textAlign: 'center' }}>登录 / 注册</h2>
      <div style={{ marginBottom: 16 }}><input placeholder="邮箱" style={{ width: '100%', padding: 12, border: '1px solid #d9d9d9', borderRadius: 8 }} /></div>
      <div style={{ marginBottom: 24 }}><input type="password" placeholder="密码" style={{ width: '100%', padding: 12, border: '1px solid #d9d9d9', borderRadius: 8 }} /></div>
      <button style={{ width: '100%', padding: 12, background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>登录</button>
    </div>
  ),
  DashboardHeader: () => <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8' }}><h2 style={{ margin: 0, fontSize: 20 }}>用户中心</h2></header>,
  Sidebar: () => (
    <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '16px 0' }}>
      {['我的项目', '模板市场', '收藏夹', '设置'].map((item, i) => <div key={i} style={{ padding: '12px 24px', color: i === 0 ? '#1890ff' : '#666' }}>{item}</div>)}
    </aside>
  ),
  ProjectCard: () => (
    <div style={{ padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ width: '100%', height: 120, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, marginBottom: 16 }}></div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>我的项目</h3>
      <p style={{ margin: '0 0 12px', color: '#666', fontSize: 14 }}>项目描述</p>
    </div>
  ),
  StatsCard: () => (
    <div style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 700, color: '#1890ff' }}>12</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>项目数</div>
    </div>
  ),
  ChatHeader: () => (
    <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ margin: 0 }}>AI 对话</h2>
      <button style={{ padding: '6px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 6 }}>新对话</button>
    </header>
  ),
  MessageList: () => (
    <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
      <div style={{ marginBottom: 24 }}><div style={{ padding: '12px 16px', background: '#f0f0f0', borderRadius: 12, display: 'inline-block', maxWidth: '70%' }}>你好！有什么可以帮助你的？</div></div>
    </div>
  ),
  InputBox: () => (
    <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #e8e8e8' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <input placeholder="告诉 VibeX 你想做什么..." style={{ flex: 1, padding: '12px 16px', border: '1px solid #d9d9d9', borderRadius: 8 }} />
        <button style={{ padding: '12px 24px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>发送</button>
      </div>
    </div>
  ),
  SuggestionBar: () => (
    <div style={{ padding: '12px 24px', background: '#fafafa', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {['生成登录页', '创建用户中心', '设计流程图'].map((item, i) => <span key={i} style={{ padding: '6px 12px', background: '#fff', border: '1px solid #d9d9d9', borderRadius: 16, fontSize: 13 }}>{item}</span>)}
    </div>
  ),
  FlowToolbar: () => (
    <div style={{ padding: 12, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', gap: 8 }}>
      <button style={{ padding: '8px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 6 }}>选择</button>
      <button style={{ padding: '8px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 6 }}>连接</button>
      <button style={{ padding: '8px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 6 }}>删除</button>
    </div>
  ),
  FlowCanvas: () => <div style={{ flex: 1, background: '#f5f5f5', minHeight: 400, position: 'relative' }}><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>流程节点</div></div>,
  NodePanel: () => (
    <div style={{ width: 200, background: '#fff', borderLeft: '1px solid #e8e8e8', padding: 16 }}>
      <h4 style={{ margin: '0 0 12px', fontSize: 14 }}>节点</h4>
      {['开始', 'AI 对话', '条件判断', '结束'].map((n, i) => <div key={i} style={{ padding: 12, background: i === 0 ? '#e6f7ff' : i === 2 ? '#fff7e6' : '#f5f5f5', borderRadius: 6, marginBottom: 8, cursor: 'grab' }}>{n}</div>)}
    </div>
  ),
  PageGrid: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: 24 }}>{[1,2,3].map(i => <div key={i} style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8 }}></div>)}</div>,
  PageCard: () => <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}><div style={{ aspectRatio: '16/9', background: '#f0f0f0' }}></div><div style={{ padding: 16 }}><h3 style={{ margin: '0 0 8px', fontSize: 16 }}>新页面</h3><span style={{ fontSize: 12, color: '#999' }}>更新于 2小时前</span></div></div>,
  SearchBar: () => <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8' }}><input placeholder="搜索页面..." style={{ width: '100%', padding: '10px 16px', border: '1px solid #d9d9d9', borderRadius: 8 }} /></div>,
  EditorToolbar: () => (
    <div style={{ padding: '8px 16px', background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', gap: 8 }}>
      <button style={{ padding: '6px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 4 }}>撤销</button>
      <button style={{ padding: '6px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 4 }}>重做</button>
      <button style={{ padding: '6px 12px', border: 'none', background: '#1890ff', color: '#fff', borderRadius: 4 }}>保存</button>
    </div>
  ),
  ComponentPanel: () => (
    <div style={{ width: 240, background: '#fff', borderRight: '1px solid #e8e8e8', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14 }}>组件</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{['文','图','布','按','输','卡'].map((c, i) => <div key={i} style={{ aspectRatio: '1', background: '#f5f5f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}>{c}</div>)}</div>
    </div>
  ),
  PropertyPanel: () => (
    <div style={{ width: 280, background: '#fff', borderLeft: '1px solid #e8e8e8', padding: 16 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14 }}>属性</h4>
      {['宽度', '高度'].map((p, i) => <div key={i} style={{ marginBottom: 12 }}><label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>{p}</label><input defaultValue={p === '宽度' ? '100%' : 'auto'} style={{ width: '100%', padding: 6, border: '1px solid #d9d9d9', borderRadius: 4 }} /></div>)}
    </div>
  ),
  DeviceFrame: ({ children }: any) => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <div style={{ width: 375, height: 667, background: '#fff', borderRadius: 40, border: '12px solid #333', overflow: 'hidden' }}>
        <div style={{ height: 30, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 80, height: 6, background: '#ddd', borderRadius: 3 }}></div></div>
        <div style={{ height: 'calc(100% - 30px)', overflow: 'auto' }}>{children}</div>
      </div>
    </div>
  ),
  PreviewCanvas: ({ children }: any) => <div style={{ flex: 1, background: '#fff' }}>{children}</div>,
  DeviceSwitcher: () => (
    <div style={{ padding: 12, background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', justifyContent: 'center', gap: 16 }}>
      {['手机', '平板', '桌面'].map((d, i) => <button key={i} style={{ padding: '8px 16px', border: '1px solid #d9d9d9', background: i === 0 ? '#1890ff' : '#fff', color: i === 0 ? '#fff' : '#666', borderRadius: 6 }}>{d}</button>)}
    </div>
  ),
  ExportOptions: () => (
    <div style={{ padding: 24, background: '#fff' }}>
      <h3 style={{ margin: '0 0 16px' }}>导出格式</h3>
      {['React', 'Vue', 'HTML'].map((f, i) => <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}><input type="radio" name="format" defaultChecked={i === 0} /> {f}</label>)}
    </div>
  ),
  CodePreview: () => (
    <div style={{ flex: 1, background: '#1e1e1e', color: '#d4d4d4', padding: 16, fontSize: 13, fontFamily: 'monospace', overflow: 'auto' }}>
      <pre style={{ margin: 0 }}>{`import React from 'react';\n\nexport const Page = () => {\n  return <h1>Hello</h1>;\n};`}</pre>
    </div>
  ),
  DownloadButton: () => <div style={{ padding: 24, background: '#fff', borderTop: '1px solid #e8e8e8' }}><button style={{ width: '100%', padding: 14, background: '#52c41a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16 }}>下载代码</button></div>,
  SettingsNav: () => (
    <nav style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '16px 0' }}>
      {['基本信息', '团队成员', '域名设置', '付费记录'].map((item, i) => <div key={i} style={{ padding: '12px 24px', color: i === 0 ? '#1890ff' : '#666', background: i === 0 ? '#e6f7ff' : 'transparent' }}>{item}</div>)}
    </nav>
  ),
  ProjectForm: () => (
    <div style={{ flex: 1, padding: 24, background: '#fff' }}>
      {['项目名称', '项目描述'].map((label, i) => <div key={i} style={{ marginBottom: 20 }}><label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>{label}</label><input defaultValue={i === 0 ? '我的项目' : '这是一个 AI 原型项目'} style={{ width: '100%', maxWidth: 400, padding: 10, border: '1px solid #d9d9d9', borderRadius: 8 }} /></div>)}
    </div>
  ),
  TeamList: () => (
    <div style={{ padding: 24, background: '#fff' }}>
      <h3 style={{ margin: '0 0 16px' }}>团队成员</h3>
      {['张三', '李四', '王五'].map((name, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}><div style={{ width: 40, height: 40, background: '#ddd', borderRadius: '50%' }}></div><div><div style={{ fontWeight: 500 }}>{name}</div><div style={{ fontSize: 12, color: '#999' }}>owner</div></div></div>)}
    </div>
  ),
  TemplateGrid: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: 24 }}>
      {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}><div style={{ aspectRatio: '16/9', background: `hsl(${(i * 60) % 360}, 60%, 70%)` }}></div><div style={{ padding: 16 }}><h3 style={{ margin: '0 0 8px' }}>模板 {i}</h3><p style={{ margin: 0, color: '#666', fontSize: 14 }}>模板描述</p></div></div>)}
    </div>
  ),
  TemplateCard: () => <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}><div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div><div style={{ padding: 16 }}><h3 style={{ margin: '0 0 8px' }}>模板</h3><p style={{ margin: 0, color: '#666', fontSize: 14 }}>描述</p></div></div>,
  CategoryFilter: () => (
    <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', gap: 12 }}>
      {['全部', '登录', '仪表盘', '电商', '社交'].map((c, i) => <button key={i} style={{ padding: '6px 16px', border: '1px solid #d9d9d9', background: i === 0 ? '#1890ff' : '#fff', color: i === 0 ? '#fff' : '#666', borderRadius: 16 }}>{c}</button>)}
    </div>
  ),
  UserProfile: () => (
    <div style={{ padding: 24, background: '#fff', display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ width: 80, height: 80, background: '#ddd', borderRadius: '50%' }}></div>
      <div><h2 style={{ margin: '0 0 8px' }}>用户</h2><p style={{ margin: 0, color: '#666' }}>user@example.com</p></div>
    </div>
  ),
  AvatarUpload: () => (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ width: 120, height: 120, background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>点击上传</div>
      <button style={{ padding: '10px 24px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 8 }}>选择图片</button>
    </div>
  ),
  PreferenceForm: () => (
    <div style={{ padding: 24, background: '#fff' }}>
      <h3 style={{ margin: '0 0 16px' }}>偏好设置</h3>
      {['接收邮件通知', '公开个人资料'].map((label, i) => <div key={i} style={{ marginBottom: 16 }}><label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> {label}</label></div>)}
    </div>
  ),
};

const sidebarComponents = Object.keys(componentMap).map(type => ({ type, name: type }));

export default function Playground() {
  const searchParams = useSearchParams();
  const pageSlug = searchParams.get('page') || 'landing';
  const config = pageConfigsData[pageSlug] || { name: '新页面', controls: [] };
  
  const [page, setPage] = useState<PageState>({ id: `page_${pageSlug}`, name: config.name, controls: [] });
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'ui' | 'code'>('ui');
  const [aiChatOpen, setAiChatOpen] = useState(false);

  useEffect(() => {
    const controls: Control[] = config.controls.map((type, i) => ({ id: `${type}_${i}`, type, name: type, props: {}, code: '' }));
    setPage(p => ({ ...p, controls, name: config.name }));
    setSelectedControl(null);
  }, [pageSlug]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && over.id === 'canvas') {
      const compType = String(active.id);
      if (componentMap[compType]) {
        const newControl: Control = { id: `${compType}_${Date.now()}`, type: compType, name: compType, props: {}, code: '' };
        setPage(p => ({ ...p, controls: [...p.controls, newControl] }));
        setSelectedControl(newControl);
      }
    }
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

  const applyAiChange = (changes: string) => { console.log('Apply AI changes:', changes); };

  const renderControl = (control: Control) => {
    const Component = componentMap[control.type];
    if (!Component) return <div>Unknown: {control.type}</div>;
    return <Component {...control.props} />;
  };

  return (
    <DndContext onDragStart={(e) => setActiveId(String(e.active.id))} onDragEnd={handleDragEnd}>
      <div className={styles.playground}>
        <Toolbar pageName={page.name} onNameChange={name => setPage(p => ({ ...p, name }))} onExport={exportConfig} viewMode={viewMode} onViewModeChange={setViewMode} />
        <button className={styles.aiButton} onClick={() => setAiChatOpen(true)}>🤖 AI</button>
        <div className={styles.main}>
          <div className={styles.sidebar}>
            <h3 className={styles.title}>🧩 组件库</h3>
            <p className={styles.hint}>拖拽到右侧画布</p>
            <div className={styles.componentGrid}>
              {sidebarComponents.map(comp => <DraggableItem key={comp.type} type={comp.type} name={comp.name} />)}
            </div>
          </div>
          <DropArea>
            <div className={styles.previewContainer}>
              {page.controls.length === 0 ? (
                <div className={styles.emptyCanvas}><p>👈 拖拽组件到画布</p><p style={{ fontSize: 12, color: '#999' }}>或从左侧组件库选择</p></div>
              ) : (
                <div className={styles.previewContent}>
                  {page.controls.map(control => (
                    <div key={control.id} className={selectedControl?.id === control.id ? styles.controlSelected : ''} onClick={() => setSelectedControl(control)}>
                      {renderControl(control)}
                      <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); deleteControl(control.id); }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DropArea>
          <div className={styles.rightPanel}>
            {selectedControl ? (
              viewMode === 'ui' ? (
                <div className={styles.propsPanel}>
                  <h3>✏️ 属性编辑器</h3>
                  <p style={{ fontSize: 12, color: '#999', marginBottom: 16 }}>选中控件: {selectedControl.type}</p>
                  <div style={{ fontSize: 13, color: '#666' }}>点击控件可查看/编辑属性</div>
                </div>
              ) : (
                <div className={styles.codePanel}><h3>💻 {selectedControl.type} 源码</h3><CodeEditor value={''} onChange={() => {}} /></div>
              )
            ) : (<div className={styles.hint}>👈 拖拽组件到画布<br />🎯 点击控件查看属性/源码</div>)}
          </div>
        </div>
      </div>
      <AIChat isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} selectedControls={selectedControl ? [{ id: selectedControl.id, type: selectedControl.type, code: '' }] : []} pageCode={JSON.stringify({ page }, null, 2)} onApplyChange={applyAiChange} />
    </DndContext>
  );
}

function DraggableItem({ type, name }: { type: string; name: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: type });
  return <div ref={setNodeRef} {...listeners} {...attributes} className={styles.draggable} style={{ opacity: isDragging ? 0.5 : 1 }}>{name}</div>;
}

function DropArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });
  return <div ref={setNodeRef} className={styles.canvas} style={{ background: isOver ? '#e6f7ff' : '#f5f5f5' }}>{children}</div>;
}
