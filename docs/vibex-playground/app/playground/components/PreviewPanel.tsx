'use client';

import { useState, useEffect } from 'react';
import styles from './PreviewPanel.module.css';

interface Control {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  code?: string;
}

interface Props {
  controls: Control[];
  selectedControl: Control | null;
  onSelect: (c: Control) => void;
  code: Record<string, string>;
  viewMode: 'ui' | 'code';
}

// 简单的组件渲染器
function renderComponent(control: Control, code: Record<string, string>) {
  const componentCode = code[control.type] || '';
  
  // 简单替换占位符
  let jsx = componentCode
    .replace(/export const \w+ = /, 'return ')
    .replace(/\{ children,/, `{ children: "${control.props.children || ''}",`)
    .replace(/\{ title, children \}/, `{ title: "${control.props.title || ''}", children: "${control.props.children || ''}"}`)
    .replace(/\{ placeholder,/, `{ placeholder: "${control.props.placeholder || ''}",`)
    .replace(/\{ title, subtitle \}/, `{ title: "${control.props.title || ''}", subtitle: "${control.props.subtitle || ''}"}`);
  
  return <div key={control.id} dangerouslySetInnerHTML={{ __html: jsx }} />;
}

export function PreviewPanel({ controls, selectedControl, onSelect, code, viewMode }: Props) {
  if (controls.length === 0) {
    return (
      <div className={styles.empty}>
        <p>👋 拖拽左侧组件到这里</p>
      </div>
    );
  }

  return (
    <div className={styles.preview}>
      {controls.map(control => (
        <div
          key={control.id}
          className={`${styles.control} ${selectedControl?.id === control.id ? styles.selected : ''}`}
          onClick={() => onSelect(control)}
        >
          {viewMode === 'ui' ? (
            <div className={styles.render}>
              {control.type === 'Button' && (
                <button style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#1890ff',
                  color: '#fff',
                  cursor: 'pointer',
                }}>
                  {control.props.children || '按钮'}
                </button>
              )}
              {control.type === 'Card' && (
                <div style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  <h3 style={{ margin: '0 0 12px' }}>{control.props.title || '标题'}</h3>
                  <div>{control.props.children || '内容'}</div>
                </div>
              )}
              {control.type === 'Input' && (
                <input
                  placeholder={control.props.placeholder || '请输入...'}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d9d9d9',
                    width: '100%',
                  }}
                />
              )}
              {control.type === 'Header' && (
                <div style={{
                  padding: '16px 24px',
                  background: '#fff',
                  borderBottom: '1px solid #e8e8e8',
                }}>
                  <h2 style={{ margin: 0 }}>{control.props.title || '标题'}</h2>
                </div>
              )}
              {control.type === 'Hero' && (
                <div style={{
                  padding: '60px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                  <h1 style={{ margin: '0 0 16px', fontSize: '48px' }}>{control.props.title || '欢迎'}</h1>
                  <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>{control.props.subtitle || '副标题'}</p>
                </div>
              )}
              {control.type === 'Sidebar' && (
                <div style={{
                  width: '200px',
                  background: '#fff',
                  borderRight: '1px solid #e8e8e8',
                  padding: '16px 0',
                }}>
                  {(control.props.items || ['菜单1', '菜单2']).map((item: string, i: number) => (
                    <div key={i} style={{ padding: '12px 24px', cursor: 'pointer' }}>{item}</div>
                  ))}
                </div>
              )}
              {control.type === 'Footer' && (
                <div style={{
                  padding: '24px',
                  background: '#f5f5f5',
                  textAlign: 'center',
                  color: '#666',
                }}>
                  {control.props.text || '© 2026'}
                </div>
              )}
            </div>
          ) : (
            <pre className={styles.code}>
              {code[control.type] || '// 未找到源码'}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
