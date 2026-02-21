'use client';

import styles from './Toolbar.module.css';

interface Props {
  pageName: string;
  onNameChange: (name: string) => void;
  onExport: () => void;
  viewMode: 'ui' | 'code';
  onViewModeChange: (mode: 'ui' | 'code') => void;
}

export function Toolbar({ pageName, onNameChange, onExport, viewMode, onViewModeChange }: Props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <input
          className={styles.nameInput}
          value={pageName}
          onChange={e => onNameChange(e.target.value)}
        />
      </div>
      <div className={styles.center}>
        <button
          className={`${styles.modeBtn} ${viewMode === 'ui' ? styles.active : ''}`}
          onClick={() => onViewModeChange('ui')}
        >
          👁 UI预览
        </button>
        <button
          className={`${styles.modeBtn} ${viewMode === 'code' ? styles.active : ''}`}
          onClick={() => onViewModeChange('code')}
        >
          💻 源码
        </button>
      </div>
      <div className={styles.right}>
        <button className={styles.exportBtn} onClick={onExport}>
          📥 导出配置
        </button>
      </div>
    </div>
  );
}
