'use client';

import { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CodeEditor } from './components/CodeEditor';
import { PreviewPanel } from './components/PreviewPanel';
import { ComponentList } from './components/ComponentList';
import { Toolbar } from './components/Toolbar';
import styles from './playground.module.css';

// 控件定义
interface Control {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  code?: string;
}

// 页面状态
interface PageState {
  id: string;
  name: string;
  controls: Control[];
}

const defaultComponents = [
  { type: 'Button', name: '按钮', defaultProps: { children: '按钮', variant: 'primary' } },
  { type: 'Card', name: '卡片', defaultProps: { title: '标题', children: '内容' } },
  { type: 'Input', name: '输入框', defaultProps: { placeholder: '请输入...' } },
  { type: 'Header', name: '头部', defaultProps: { title: '标题' } },
  { type: 'Hero', name: 'Hero区', defaultProps: { title: '欢迎', subtitle: '副标题' } },
  { type: 'Sidebar', name: '侧边栏', defaultProps: { items: ['菜单1', '菜单2'] } },
  { type: 'Footer', name: '底部', defaultProps: { text: '© 2026' } },
];

const defaultCode: Record<string, string> = {
  Button: `export const Button = ({ children, variant = 'primary', onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      background: variant === 'primary' ? '#1890ff' : '#f0f0f0',
      color: variant === 'primary' ? '#fff' : '#333',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);`,
  Card: `export const Card = ({ title, children }) => (
  <div style={{
    padding: '20px',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }}>
    {title && <h3 style={{ margin: '0 0 12px' }}>{title}</h3>}
    <div>{children}</div>
  </div>
);`,
  Input: `export const Input = ({ placeholder, value, onChange }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #d9d9d9',
      width: '100%',
    }}
  />
);`,
  Header: `export const Header = ({ title }) => (
  <div style={{
    padding: '16px 24px',
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
  }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
  </div>
);`,
  Hero: `export const Hero = ({ title, subtitle }) => (
  <div style={{
    padding: '60px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    textAlign: 'center',
  }}>
    <h1 style={{ margin: '0 0 16px', fontSize: '48px' }}>{title}</h1>
    <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>{subtitle}</p>
  </div>
);`,
  Sidebar: `export const Sidebar = ({ items }) => (
  <div style={{
    width: '200px',
    background: '#fff',
    borderRight: '1px solid #e8e8e8',
    padding: '16px 0',
  }}>
    {items.map((item, i) => (
      <div key={i} style={{ padding: '12px 24px', cursor: 'pointer' }}>{item}</div>
    ))}
  </div>
);`,
  Footer: `export const Footer = ({ text }) => (
  <div style={{
    padding: '24px',
    background: '#f5f5f5',
    textAlign: 'center',
    color: '#666',
  }}>
    {text}
  </div>
);`,
};

export default function Playground() {
  const [page, setPage] = useState<PageState>({
    id: 'page_01',
    name: '新页面',
    controls: [],
  });
  
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'ui' | 'code'>('ui');
  const [code, setCode] = useState<Record<string, string>>(defaultCode);

  // 拖拽结束
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (over && over.id === 'canvas') {
      const compType = String(active.id);
      const comp = defaultComponents.find(c => c.type === compType);
      if (comp) {
        const newControl: Control = {
          id: `${comp.type}_${Date.now()}`,
          type: comp.type,
          name: comp.name,
          props: { ...comp.defaultProps },
          code: code[comp.type] || '',
        };
        setPage(p => ({
          ...p,
          controls: [...p.controls, newControl],
        }));
        setSelectedControl(newControl);
      }
    }
  };

  // 更新控件属性
  const updateControl = (id: string, updates: Partial<Control>) => {
    setPage(p => ({
      ...p,
      controls: p.controls.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
    if (selectedControl?.id === id) {
      setSelectedControl(s => s ? { ...s, ...updates } : null);
    }
  };

  // 更新控件源码
  const updateCode = (type: string, newCode: string) => {
    setCode(c => ({ ...c, [type]: newCode }));
    // 更新使用该类型的所有控件
    setPage(p => ({
      ...p,
      controls: p.controls.map(c => c.type === type ? { ...c, code: newCode } : c),
    }));
    // 同时更新选中控件
    if (selectedControl?.type === type) {
      setSelectedControl(s => s ? { ...s, code: newCode } : null);
    }
  };

  // 删除控件
  const deleteControl = (id: string) => {
    setPage(p => ({
      ...p,
      controls: p.controls.filter(c => c.id !== id),
    }));
    if (selectedControl?.id === id) {
      setSelectedControl(null);
    }
  };

  // 导出配置
  const exportConfig = () => {
    const config = JSON.stringify({ page, code }, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.name}.json`;
    a.click();
  };

  return (
    <DndContext 
      onDragStart={(e) => setActiveId(String(e.active.id))} 
      onDragEnd={handleDragEnd}
    >
      <div className={styles.playground}>
        {/* 顶部工具栏 */}
        <Toolbar 
          pageName={page.name}
          onNameChange={name => setPage(p => ({ ...p, name }))}
          onExport={exportConfig}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className={styles.main}>
          {/* 左侧组件列表 - 使用 Draggable */}
          <div className={styles.sidebar}>
            <h3 className={styles.title}>🧩 组件库</h3>
            <p className={styles.hint}>拖拽到右侧画布</p>
            <div className={styles.componentGrid}>
              {defaultComponents.map(comp => (
                <DraggableItem key={comp.type} type={comp.type} name={comp.name} />
              ))}
            </div>
          </div>

          {/* 中间画布 - 使用 Droppable */}
          <DropArea>
            <PreviewPanel 
              controls={page.controls}
              selectedControl={selectedControl}
              onSelect={setSelectedControl}
              onDelete={deleteControl}
              code={code}
              viewMode={viewMode}
            />
          </DropArea>

          {/* 右侧属性/代码编辑器 */}
          <div className={styles.rightPanel}>
            {selectedControl ? (
              viewMode === 'ui' ? (
                <div className={styles.propsPanel}>
                  <h3>✏️ 属性编辑器</h3>
                  <div className={styles.propList}>
                    {Object.entries(selectedControl.props).map(([key, value]) => (
                      <div key={key} className={styles.prop}>
                        <label>{key}</label>
                        <input
                          value={value as string}
                          onChange={e => updateControl(selectedControl.id, {
                            props: { ...selectedControl.props, [key]: e.target.value }
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.codePanel}>
                  <h3>💻 {selectedControl.type} 源码</h3>
                  <CodeEditor
                    value={code[selectedControl.type] || ''}
                    onChange={v => updateCode(selectedControl.type, v)}
                  />
                </div>
              )
            ) : (
              <div className={styles.hint}>
                👈 拖拽组件到画布<br/>
                🎯 点击控件查看属性/源码
              </div>
            )}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

// 可拖拽组件
function DraggableItem({ type, name }: { type: string; name: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: type });
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.draggable}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {name}
    </div>
  );
}

// 放置区域
function DropArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });
  
  return (
    <div 
      ref={setNodeRef} 
      className={styles.canvas} 
      style={{ background: isOver ? '#e6f7ff' : '#f5f5f5' }}
    >
      {children}
    </div>
  );
}
