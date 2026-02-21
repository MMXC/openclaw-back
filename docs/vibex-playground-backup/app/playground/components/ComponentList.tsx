'use client';

import styles from './ComponentList.module.css';

interface Component {
  type: string;
  name: string;
}

interface Props {
  components: Component[];
  selectedControl: any;
  onSelect: (c: any) => void;
  onDelete: (id: string) => void;
}

export function ComponentList({ components, selectedControl, onSelect, onDelete }: Props) {
  return (
    <div className={styles.list}>
      <h3 className={styles.title}>🧩 组件库</h3>
      <p className={styles.hint}>拖拽到右侧画布</p>
      <div className={styles.grid}>
        {components.map(comp => (
          <div
            key={comp.type}
            className={styles.item}
            data-type={comp.type}
          >
            {comp.name}
          </div>
        ))}
      </div>
    </div>
  );
}
