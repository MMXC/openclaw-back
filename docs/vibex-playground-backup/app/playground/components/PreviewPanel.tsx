'use client';

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
  onDelete: (id: string) => void;
  code: Record<string, string>;
  viewMode: 'ui' | 'code';
}

export function PreviewPanel({ controls, selectedControl, onSelect, onDelete, code, viewMode }: Props) {
  if (controls.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>👋</div>
        <p>拖拽左侧组件到这里</p>
      </div>
    );
  }

  return (
    <div className={styles.preview}>
      {controls.map(control => (
        <div
          key={control.id}
          className={`${styles.controlWrapper} ${selectedControl?.id === control.id ? styles.selected : ''}`}
        >
          <div className={styles.controlHeader}>
            <span className={styles.controlType}>{control.type}</span>
            <button 
              className={styles.deleteBtn}
              onClick={(e) => { e.stopPropagation(); onDelete(control.id); }}
            >
              ×
            </button>
          </div>
          
          <div 
            className={styles.controlContent}
            onClick={() => onSelect(control)}
          >
            {viewMode === 'ui' ? (
              <div className={styles.render}>
                {renderComponent(control)}
              </div>
            ) : (
              <pre className={styles.code}>
                {code[control.type] || '// 未找到源码'}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderComponent(control: Control) {
  const { type, props } = control;
  
  switch (type) {
    case 'Button':
      return (
        <button style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          background: props.variant === 'primary' ? '#1890ff' : '#f0f0f0',
          color: props.variant === 'primary' ? '#fff' : '#333',
          cursor: 'pointer',
        }}>
          {props.children || '按钮'}
        </button>
      );
      
    case 'Card':
      return (
        <div style={{
          padding: '20px',
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {props.title && <h3 style={{ margin: '0 0 12px' }}>{props.title}</h3>}
          <div>{props.children || '内容'}</div>
        </div>
      );
      
    case 'Input':
      return (
        <input
          placeholder={props.placeholder || '请输入...'}
          readOnly
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            width: '100%',
          }}
        />
      );
      
    case 'Header':
      return (
        <div style={{
          padding: '16px 24px',
          background: '#fff',
          borderBottom: '1px solid #e8e8e8',
        }}>
          <h2 style={{ margin: 0 }}>{props.title || '标题'}</h2>
        </div>
      );
      
    case 'Hero':
      return (
        <div style={{
          padding: '60px 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '8px',
        }}>
          <h1 style={{ margin: '0 0 16px', fontSize: '32px' }}>{props.title || '欢迎'}</h1>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>{props.subtitle || '副标题'}</p>
        </div>
      );
      
    case 'Sidebar':
      return (
        <div style={{
          width: '200px',
          background: '#fff',
          borderRight: '1px solid #e8e8e8',
          borderRadius: '8px',
          padding: '8px 0',
        }}>
          {(props.items || ['菜单1', '菜单2']).map((item: string, i: number) => (
            <div key={i} style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px' }}>{item}</div>
          ))}
        </div>
      );
      
    case 'Footer':
      return (
        <div style={{
          padding: '16px',
          background: '#f5f5f5',
          textAlign: 'center',
          color: '#666',
          borderRadius: '8px',
          fontSize: '13px',
        }}>
          {props.text || '© 2026'}
        </div>
      );
      
    default:
      return <div>Unknown: {type}</div>;
  }
}
