/**
 * 控件渲染器
 * 
 * 根据控件实例配置渲染对应的 React 组件
 * 页面只引用控件，不内嵌控件代码
 */

import React from 'react';
import { ControlInstance } from './config';

// 控件组件映射 - 独立的可复用组件
const controlComponents: Record<string, React.FC<any>> = {
  // 布局控件
  Header: () => (
    <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 20 }}>VibeX</span>
    </header>
  ),
  
  Hero: () => (
    <section style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', flexDirection: 'column', padding: '120px 24px' }}>
      <h1 style={{ fontSize: 56, fontWeight: 700, marginBottom: 24 }}>AI 驱动，一句话生成应用原型</h1>
      <p style={{ fontSize: 20, opacity: 0.9 }}>通过自然语言描述，快速生成完整的应用原型</p>
      <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
        <button style={{ padding: '16px 40px', fontSize: 16, borderRadius: 24, border: 'none', background: '#fff', color: '#667eea', fontWeight: 600, cursor: 'pointer' }}>开始创建</button>
        <button style={{ padding: '16px 40px', fontSize: 16, borderRadius: 24, border: '2px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>查看演示</button>
      </div>
    </section>
  ),
  
  FeatureGrid: () => (
    <section style={{ padding: '100px 48px', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 600, marginBottom: 16 }}>核心功能</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: 64 }}>强大功能，助您快速构建应用原型</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 1200, margin: '0 auto' }}>
        {[
          { icon: '🧠', title: 'AI 智能理解', desc: '自然语言描述需求，AI 智能理解并生成原型' },
          { icon: '🔀', title: '流程图生成', desc: '自动生成业务流程图，可视化展示逻辑' },
          { icon: '📱', title: '原型即所得', desc: '所见即所得的设计器，快速调整原型' },
          { icon: '📦', title: '一键导出', desc: '支持导出 PDF、HTML、图片等多种格式' }
        ].map((f, i) => (
          <div key={i} style={{ textAlign: 'center', padding: 32, borderRadius: 16, background: '#f9f9f9' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: '#666' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  ),
  
  Footer: () => (
    <footer style={{ background: '#1a1a2e', color: 'white', padding: '64px 48px 32px' }}>
      <div style={{ textAlign: 'center', opacity: 0.5 }}>© 2026 VibeX. All rights reserved.</div>
    </footer>
  ),
  
  Sidebar: () => (
    <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '24px 0' }}>
      {[
        { icon: '📁', name: '我的项目', active: true },
        { icon: '📋', name: '模板市场', active: false },
        { icon: '❤️', name: '收藏夹', active: false },
        { icon: '⚙️', name: '设置', active: false },
        { icon: '❓', name: '帮助', active: false }
      ].map((item, i) => (
        <div key={i} style={{ padding: '12px 24px', cursor: 'pointer', color: item.active ? '#1890ff' : '#666', background: item.active ? '#e6f7ff' : 'transparent', borderRight: item.active ? '3px solid #1890ff' : '3px solid transparent' }}>{item.icon} {item.name}</div>
      ))}
    </aside>
  ),
  
  AuthCard: () => (
    <div style={{ width: 400, background: '#fff', borderRadius: 12, padding: 40, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>登录 VibeX</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #07C160', background: '#fff', color: '#07C160' }}>💚 微信</button>
        <button style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #1488F5', background: '#fff', color: '#1488F5' }}>💬 钉钉</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input placeholder="邮箱" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d9d9d9', marginBottom: 12 }} />
        <input placeholder="密码" type="password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d9d9d9' }} />
      </div>
      <button style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1890ff', color: '#fff', fontSize: 16 }}>登录</button>
    </div>
  ),
  
  ChatPanel: () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>告诉 VibeX 你想做什么</h2>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ maxWidth: '80%', padding: 12, background: '#1890ff', color: '#fff', borderRadius: 12, marginBottom: 16, alignSelf: 'flex-end' }}>我想做直播系统</div>
        <div style={{ maxWidth: '80%', padding: 16, background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, marginBottom: 16 }}>
          <div style={{ color: '#1890ff', marginBottom: 8 }}>✓ 需求理解</div>
          <div>我理解你想要一个直播平台</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, display: 'flex', gap: 12 }}>
        <textarea placeholder="描述你想要的应用..." style={{ flex: 1, border: 'none', resize: 'none', outline: 'none', minHeight: 60 }} />
        <button style={{ padding: '8px 24px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>发送</button>
      </div>
    </div>
  ),
  
  ChatSidebar: () => (
    <aside style={{ width: 280, background: '#fff', borderLeft: '1px solid #e8e8e8', padding: 16 }}>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>项目信息</div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>直播系统</div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 24, marginBottom: 12 }}>对话配置</div>
      {['标准模式', '详细模式', '简洁模式'].map((m, i) => (
        <div key={i} style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer', background: i === 0 ? '#e6f7ff' : 'transparent', color: i === 0 ? '#1890ff' : '#666' }}>{m}</div>
      ))}
    </aside>
  ),
  
  FlowToolbar: () => (
    <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
      <button>←</button>
      <span>直播系统 - 流程图</span>
      <div style={{ flex: 1 }} />
      <button>预览</button>
      <button>导出</button>
      <button style={{ background: '#1890ff', color: '#fff', border: 'none' }}>保存</button>
    </header>
  ),
  
  NodeLibrary: () => (
    <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: 16 }}>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>基础节点</div>
      {['开始', '结束', '任务'].map((n, i) => (
        <div key={i} style={{ padding: '10px 12px', background: '#f5f5f5', borderRadius: 6, marginBottom: 8, cursor: 'grab' }}>● {n}</div>
      ))}
      <div style={{ fontSize: 12, color: '#999', marginTop: 20, marginBottom: 12 }}>页面节点</div>
      <div style={{ padding: '10px 12px', background: '#bae7ff', borderRadius: 6, marginBottom: 8, cursor: 'grab' }}>▢ 页面</div>
    </aside>
  ),
  
  FlowCanvas: () => (
    <div style={{ flex: 1, background: '#f5f5f5', position: 'relative', backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div style={{ position: 'absolute', padding: '12px 20px', background: '#d9f7be', borderRadius: 20, left: 80, top: 50 }}>开始</div>
      <div style={{ position: 'absolute', padding: '12px 20px', background: '#bae7ff', borderRadius: 8, left: 260, top: 130 }}>用户登录</div>
      <div style={{ position: 'absolute', padding: '12px 20px', background: '#ffe58f', borderRadius: 8, left: 420, top: 130 }}>是否注册</div>
    </div>
  ),
  
  PropertiesPanel: () => (
    <aside style={{ width: 280, background: '#fff', borderLeft: '1px solid #e8e8e8', padding: 16 }}>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>节点属性</div>
      <input defaultValue="用户登录" style={{ width: '100%', padding: 8, border: '1px solid #e8e8e8', borderRadius: 6, marginBottom: 12 }} />
      <textarea defaultValue="用户登录页面" style={{ width: '100%', padding: 8, border: '1px solid #e8e8e8', borderRadius: 6, minHeight: 80 }} />
    </aside>
  ),
  
  PageListHeader: () => (
    <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16 }}>
      <button>←</button>
      <span>页面列表</span>
      <span style={{ color: '#666' }}>(3 个页面)</span>
      <div style={{ flex: 1 }} />
      <button>+ 添加页面</button>
    </header>
  ),
  
  PageCardGrid: () => (
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {['首页', '用户中心', '设置'].map((name, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ height: 180, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 48 }}>
            {['🏠', '👤', '⚙️'][i]}
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: 14, color: '#666' }}>描述</div>
          </div>
        </div>
      ))}
    </div>
  ),
  
  EditorToolbar: () => (
    <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
      <button>←</button>
      <input defaultValue="首页" />
      <div style={{ flex: 1 }} />
      <button>预览</button>
      <button style={{ background: '#1890ff', color: '#fff', border: 'none' }}>保存</button>
    </header>
  ),
  
  ComponentPanel: () => (
    <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: 12 }}>
      {['按钮', '输入框', '图片'].map((c, i) => (
        <div key={i} style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 6, marginBottom: 8, cursor: 'grab', fontSize: 13 }}>{c}</div>
      ))}
    </aside>
  ),
  
  EditorCanvas: () => (
    <div style={{ flex: 1, background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 20, top: 20, width: 200, height: 40, background: '#667eea', borderRadius: 8 }}></div>
      </div>
    </div>
  ),
  
  EditorProps: () => (
    <aside style={{ width: 280, background: '#fff', borderLeft: '1px solid #e8e8e8', padding: 16 }}>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>选中元素</div>
      <input defaultValue="200px" style={{ width: '100%', padding: 8, border: '1px solid #e8e8e8', borderRadius: 6, marginBottom: 12 }} />
      <input defaultValue="40px" style={{ width: '100%', padding: 8, border: '1px solid #e8e8e8', borderRadius: 6 }} />
    </aside>
  ),
  
  DeviceSwitcher: () => (
    <div style={{ height: 48, background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      {['桌面端', '平板', '移动端'].map((d, i) => (
        <button key={i} style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #e8e8e8', background: i === 0 ? '#1890ff' : '#fff', color: i === 0 ? '#fff' : '#666' }}>{d}</button>
      ))}
    </div>
  ),
  
  PreviewHeader: () => (
    <header style={{ height: 56, background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <button style={{ background: 'none', border: 'none', color: '#fff' }}>✕</button>
      <span style={{ flex: 1, marginLeft: 16 }}>首页</span>
      <span>1 / 3</span>
    </header>
  ),
  
  DevicePreview: () => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#1a1a2e' }}>
      <div style={{ width: 375, height: 667, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: 20 }}>
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>欢迎来到 VibeX</h1>
          <p style={{ fontSize: 14, color: '#666' }}>AI 驱动，一句话生成应用原型</p>
        </div>
      </div>
    </div>
  ),
  
  PreviewNav: () => (
    <div style={{ height: 64, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <button style={{ padding: '8px 24px', borderRadius: 20, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>← 上一页</button>
      <div style={{ display: 'flex', gap: 8 }}>
        {['●', '○', '○'].map((d, i) => <span key={i} style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.3)' }}>{d}</span>)}
      </div>
      <button style={{ padding: '8px 24px', borderRadius: 20, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>下一页 →</button>
    </div>
  ),
  
  FloatTools: () => (
    <div style={{ position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['⛶', '↗', '💬'].map((icon, i) => (
        <button key={i} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{icon}</button>
      ))}
    </div>
  ),
  
  ExportHeader: () => (
    <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <h1 style={{ fontSize: 18 }}>导出项目</h1>
    </header>
  ),
  
  ExportContent: () => (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 20 }}>导出格式</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {['📄 PDF', '🌐 HTML', '🖼️ PNG', '📋 JSON'].map((f, i) => (
            <div key={i} style={{ padding: 20, border: `2px solid ${i === 0 ? '#1890ff' : '#e8e8e8'}`, borderRadius: 12, background: i === 0 ? 'rgba(24,144,255,0.05)' : 'transparent' }}>
              {f}
            </div>
          ))}
        </div>
      </div>
      <button style={{ width: '100%', padding: 16, background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8 }}>开始导出</button>
    </div>
  ),
  
  SettingsHeader: () => (
    <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <button>←</button>
      <h1 style={{ fontSize: 18, marginLeft: 16 }}>项目设置</h1>
    </header>
  ),
  
  SettingsNav: () => (
    <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '24px 0' }}>
      {['基本信息', '团队成员', '版本历史'].map((n, i) => (
        <div key={i} style={{ padding: '12px 24px', cursor: 'pointer', color: i === 0 ? '#1890ff' : '#666', background: i === 0 ? 'rgba(24,144,255,0.1)' : 'transparent' }}>{n}</div>
      ))}
      <div style={{ padding: '12px 24px', cursor: 'pointer', color: '#ff4d4f' }}>删除项目</div>
    </aside>
  ),
  
  ProjectSettings: () => (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <input defaultValue="直播系统" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, marginBottom: 16 }} />
      <textarea defaultValue="一个支持弹幕互动的直播平台" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, minHeight: 100, marginBottom: 24 }} />
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e8e8e8' }}>
        <div style={{ color: '#ff4d4f', fontWeight: 600, marginBottom: 16 }}>危险区</div>
        <button style={{ padding: '10px 20px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 8 }}>删除项目</button>
      </div>
    </div>
  ),
  
  TemplateHeader: () => (
    <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 48px', gap: 24 }}>
      <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VibeX</span>
      <input placeholder="搜索模板..." style={{ flex: 1, maxWidth: 400, padding: '8px 16px', border: '1px solid #e8e8e8', borderRadius: 8 }} />
    </header>
  ),
  
  FilterBar: () => (
    <div style={{ background: '#fff', padding: '16px 48px', borderBottom: '1px solid #e8e8e8', display: 'flex', gap: 24 }}>
      <span style={{ color: '#666' }}>类型：<select><option>全部</option></select></span>
      <span style={{ color: '#666' }}>行业：<select><option>全部</option></select></span>
    </div>
  ),
  
  TemplateGrid: () => (
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {['🛒 电商后台', '📚 在线教育', '💬 社交聊天'].map((t, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ height: 160, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 48 }}>{t.split(' ')[0]}</div>
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 500 }}>{t.split(' ').slice(1).join(' ')}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  
  UserSettingsHeader: () => (
    <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', padding: '0 48px', gap: 24 }}>
      <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VibeX</span>
      <span style={{ fontSize: 16 }}>账号设置</span>
    </header>
  ),
  
  UserSettingsNav: () => (
    <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '24px 0' }}>
      {['账号信息', '偏好设置', 'API 设置'].map((n, i) => (
        <div key={i} style={{ padding: '12px 24px', cursor: 'pointer', color: i === 0 ? '#1890ff' : '#666', background: i === 0 ? 'rgba(24,144,255,0.1)' : 'transparent' }}>{n}</div>
      ))}
      <div style={{ padding: '12px 24px', cursor: 'pointer', color: '#ff4d4f' }}>账号操作</div>
    </aside>
  ),
  
  UserSettingsContent: () => (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, marginBottom: 20 }}>张</div>
      <input defaultValue="张三" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, marginBottom: 16 }} />
      <input defaultValue="zhangsan@example.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, marginBottom: 24 }} />
      <button style={{ padding: '10px 20px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 8 }}>退出登录</button>
    </div>
  ),
};

// 根据控件类型渲染对应的组件
export function renderControl(instance: ControlInstance): React.ReactNode {
  const Component = controlComponents[instance.type];
  
  if (!Component) {
    return (
      <div key={instance.id} style={{ 
        padding: 20, 
        background: '#fff3e0', 
        border: '1px solid #ffb74d', 
        borderRadius: 8,
        color: '#e65100'
      }}>
        未找到控件: {instance.type}
      </div>
    );
  }
  
  return (
    <div key={instance.id} style={getControlStyle(instance)}>
      <Component {...instance.props} />
    </div>
  );
}

// 获取控件样式
function getControlStyle(instance: ControlInstance): React.CSSProperties {
  const { position, size } = instance;
  
  return {
    position: 'absolute',
    left: typeof position.x === 'number' ? position.x : undefined,
    top: typeof position.y === 'number' ? position.y : undefined,
    width: typeof size.width === 'number' ? size.width : size.width,
    height: typeof size.height === 'number' ? size.height : size.height,
    gridArea: position.spanX ? 'auto' : undefined,
  };
}

// 渲染整个页面骨架
export function renderPage(skeleton: { layout: any; controls: ControlInstance[] }): React.ReactNode {
  const { layout, controls } = skeleton;
  
  // 根据布局类型选择渲染方式
  if (layout.type === 'grid') {
    return (
      <div style={{ 
        display: 'grid',
        gridTemplateRows: layout.rows || 'auto',
        gridTemplateColumns: layout.cols || '1fr',
        minHeight: '100vh'
      }}>
        {controls.map(ctrl => {
          const spanX = ctrl.position.spanX;
          if (spanX) {
            return (
              <div key={ctrl.id} style={{ gridColumn: `1 / span ${spanX}` }}>
                {renderControl(ctrl)}
              </div>
            );
          }
          return renderControl(ctrl);
        })}
      </div>
    );
  }
  
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {controls.map(ctrl => renderControl(ctrl))}
    </div>
  );
}

export default { renderControl, renderPage };
