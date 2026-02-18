'use client';

import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function Playground() {
  return (
    <div className="playground">
      <aside className="sidebar">
        <div className="sidebar-title">Components</div>
        <div className="menu-item active">Button 按钮</div>
        <div className="menu-item">Input 输入框</div>
        <div className="menu-item">Card 卡片</div>
        <div className="menu-item">Modal 弹窗</div>
      </aside>

      <main className="main">
        <h1 className="section-title">Button 按钮</h1>

        <div className="component-preview">
          <div className="preview-label">Variants 变体</div>
          <div className="preview-area">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div className="component-preview">
          <div className="preview-label">Sizes 尺寸</div>
          <div className="preview-area">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>

        <div className="component-preview">
          <div className="preview-label">States 状态</div>
          <div className="preview-area">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </div>

        <div className="component-preview">
          <div className="preview-label">Card 示例</div>
          <div className="preview-area">
            <Card title="卡片标题" hoverable>
              卡片内容区域
            </Card>
          </div>
        </div>

        <div className="component-preview">
          <div className="preview-label">代码</div>
          <pre className="code-block">
{`import { Button } from './components/Button';

<Button variant="primary" size="medium">
  点击我
</Button>`}
          </pre>
        </div>
      </main>
    </div>
  );
}
