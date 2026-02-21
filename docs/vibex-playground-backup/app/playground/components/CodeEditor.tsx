'use client';

import styles from './CodeEditor.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function CodeEditor({ value, onChange, language = 'javascript' }: Props) {
  return (
    <div className={styles.editor}>
      <div className={styles.tabs}>
        <span className={styles.tab}>{language}</span>
      </div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
