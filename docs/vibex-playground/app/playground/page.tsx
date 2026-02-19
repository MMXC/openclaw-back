'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Toolbar } from './components/Toolbar';
import { AIChatPanel } from './components/AIChatPanel';
import styles from './playground.module.css';

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
};

const componentMap: Record<string, React.FC<any>> = {
  Header: () => (
    <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>VibeX</div>
      <nav style={{ display: 'flex', gap: 24 }}><span style={{ color: '#666' }}>功能</span><span style={{ color: '#666' }}>定价</span><span style={{ color: '#666' }}>文档</span></nav>
      <div style={{ display: 'flex', gap: 12 }}><button style={{ padding: '8px 16px', border: 'none', background: 'transparent' }}>登录</button><button style={{ padding: '8px 16px', border: 'none', background: '#1890ff', color: '#fff', borderRadius: 6 }}>开始创建</button></div>
    </header>
  ),
  Hero: () => (
    <div style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: 0, fontSize: 48 }}>让想法快速变成产品</h1>
      <p style={{ margin: '16px 0 0', fontSize: 20, opacity: 0.9 }}>用 AI 生成页面原型</p>
    </div>
  ),
  FeatureCard: () => (
    <div style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, background: '#e6f7ff', borderRadius: 12, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>功能特性</h3>
      <p style={{ margin: 0, color: '#666', fontSize: 14 }}>描述文字</p>
    </div>
  ),
  Footer: () => <footer style={{ padding: 24, background: '#f5f5f5', textAlign: 'center', color: '#666', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>© 2026 VibeX</footer>,
  AuthCard: () => (
    <div style={{ padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.1)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ margin: '0 0 24px', textAlign: 'center' }}>登录 / 注册</h2>
      <div style={{ marginBottom: 16 }}><input placeholder="邮箱" style={{ width: '100%', padding: 12, border: '1px solid #d9d9d9', borderRadius: 8, boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: 24 }}><input type="password" placeholder="密码" style={{ width: '100%', padding: 12, border: '1px solid #d9d9d9', borderRadius: 8, boxSizing: 'border-box' }} /></div>
      <button style={{ width: '100%', padding: 12, background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>登录</button>
    </div>
  ),
  DashboardHeader: () => <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}><h2 style={{ margin: 0, fontSize: 20 }}>用户中心</h2></header>,
  Sidebar: () => (
    <aside style={{ background: '#fff', borderRight: '1px solid #e8e8e8', height: '100%', boxSizing: 'border-box', padding: '16px 0' }}>
      {['我的项目', '模板市场', '收藏夹', '设置'].map((item, i) => <div key={i} style={{ padding: '12px 24px', color: i === 0 ? '#1890ff' : '#666' }}>{item}</div>)}
    </aside>
  ),
  ProjectCard: () => (
    <div style={{ padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, marginBottom: 16, minHeight: 120 }}></div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>我的项目</h3>
      <p style={{ margin: '0 0 12px', color: '#666', fontSize: 14 }}>项目描述</p>
    </div>
  ),
  StatsCard: () => (
    <div style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 700, color: '#1890ff' }}>12</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>项目数</div>
    </div>
  ),
  ChatHeader: () => (
    <header style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e8e8e8', height: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>AI 对话</h2>
      <button style={{ padding: '6px 12px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: 6 }}>新对话</button>
    </header>
  ),
  MessageList: () => (
    <div style={{ padding: 24, background: '#fff', height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      <div style={{ marginBottom: 24 }}><div style={{ padding: '12px 16px', background: '#f0f0f0', borderRadius: 12, display: 'inline-block', maxWidth: '70%' }}>你好！有什么可以帮助你的？</div></div>
    </div>
  ),
  InputBox: () => (
    <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #e8e8e8', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 12, flex: 1 }}>
        <input placeholder="告诉 VibeX 你想做什么..." style={{ flex: 1, padding: '12px 16px', border: '1px solid #d9d9d9', borderRadius: 8 }} />
        <button style={{ padding: '12px 24px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>发送</button>
      </div>
    </div>
  ),
};

const customControls: Record<string, string[]> = {
  landing: ['Header', 'Hero', 'FeatureCard', 'Footer'],
  auth: ['AuthCard'],
  dashboard: ['DashboardHeader', 'Sidebar', 'ProjectCard', 'StatsCard'],
  chat: ['ChatHeader', 'MessageList', 'InputBox'],
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
