/**
 * 落地页 - 未来科幻AI风格
 * 
 * 设计亮点:
 * 1. 打字机效果标题 - 模拟AI逐字输出
 * 2. 扫描线动画 - CRT显示器效果
 * 3. 量子波动背景 - 粒子系统
 * 4. 霓虹边框 - 赛博朋克风格
 * 5. 神经网络动画 - 连接点动画
 */

import React, { useState, useEffect } from 'react';

// 打字机效果组件
const Typewriter = ({ text, speed = 50, onComplete }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '1.2em',
        background: '#00ffff',
        marginLeft: 2,
        verticalAlign: 'text-bottom',
        animation: 'blink 0.7s infinite',
      }} />
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </span>
  );
};

// 扫描线效果
const Scanline = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
    pointerEvents: 'none',
    zIndex: 5,
  }} />
);

// 量子粒子背景
const QuantumBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(0, 255, 255, 0.6)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(30px, -30px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// 霓虹按钮
const NeonButton = ({ children, primary }) => (
  <button style={{
    padding: '14px 32px',
    fontSize: 15,
    fontWeight: 600,
    color: primary ? '#0a0a0f' : '#00ffff',
    background: primary 
      ? 'linear-gradient(135deg, #00ffff, #00ff88)' 
      : 'transparent',
    border: '2px solid #00ffff',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s',
    boxShadow: primary 
      ? '0 0 20px rgba(0, 255, 255, 0.5)' 
      : '0 0 10px rgba(0, 255, 255, 0.3)',
  }}>
    {children}
  </button>
);

// 特征卡片
const FeatureCard = ({ icon, title, desc, index }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300 + index * 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      padding: 28,
      background: 'rgba(0, 255, 255, 0.03)',
      border: '1px solid rgba(0, 255, 255, 0.15)',
      borderRadius: 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontSize: 32,
        marginBottom: 16,
        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))',
      }}>{icon}</div>
      <h3 style={{
        margin: '0 0 8px',
        fontSize: 18,
        color: '#fff',
        fontWeight: 600,
      }}>{title}</h3>
      <p style={{
        margin: 0,
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 1.6,
      }}>{desc}</p>
    </div>
  );
};

export default function LandingPage() {
  const [titleComplete, setTitleComplete] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    { icon: '🤖', title: 'AI 智能生成', desc: '基于描述自动生成完整页面' },
    { icon: '⚡', title: '实时预览', desc: '所见即所得的编辑体验' },
    { icon: '🔗', title: '流程编排', desc: '可视化业务流程设计' },
    { icon: '📦', title: '一键导出', desc: '多格式代码导出支持' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <QuantumBackground />
      <Scanline />

      {/* 导航 */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 60px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00ffff, #00ff88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          }}>V</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>VibeX</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['功能', '定价', '文档', '关于'].map(item => (
            <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero区 */}
      <main style={{
        textAlign: 'center',
        padding: '80px 20px 120px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* 状态指示 */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: 20,
          marginBottom: 32,
          fontSize: 13,
          color: '#00ffff',
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 10px #00ff88',
            animation: 'pulse 2s infinite',
          }} />
          AI 系统在线
        </div>

        {/* 主标题 - 打字机效果 */}
        <h1 style={{
          fontSize: 56,
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 24px',
          lineHeight: 1.2,
          minHeight: 70,
        }}>
          <Typewriter 
            text="AI 驱动的应用原型生成平台" 
            speed={60}
            onComplete={() => setTitleComplete(true)}
          />
        </h1>

        {/* 副标题 */}
        <p style={{
          fontSize: 18,
          color: 'rgba(255, 255, 255, 0.6)',
          margin: '0 0 48px',
          maxWidth: 600,
          marginInline: 'auto',
          opacity: titleComplete ? 1 : 0,
          transition: 'opacity 0.5s',
        }}>
          用自然语言描述需求，AI 自动生成完整的交互式原型。支持流程图、页面编排、一键导出。
        </p>

        {/* 按钮组 */}
        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          opacity: titleComplete ? 1 : 0,
          transition: 'opacity 0.5s 0.3s',
        }}>
          <NeonButton primary>开始免费试用</NeonButton>
          <NeonButton>查看演示</NeonButton>
        </div>

        {/* 代码展示区 */}
        <div style={{
          maxWidth: 700,
          margin: '80px auto 0',
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: 16,
          overflow: 'hidden',
          textAlign: 'left',
        }}>
          <div style={{
            padding: '12px 20px',
            background: 'rgba(0, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
            display: 'flex',
            gap: 8,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: ['#ff5f57', '#febc2e', '#28c840'][i],
              }} />
            ))}
          </div>
          <div style={{ padding: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
            <div style={{ color: '#00ffff' }}>{'>'} 描述你的应用需求</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>"创建一个任务管理应用，有看板视图、任务详情、团队协作功能"</div>
            <div style={{ color: '#00ffff' }}>{'>'} AI 正在分析...</div>
            <div style={{ color: '#00ff88', marginBottom: 8 }}>✓ 已生成 5 个页面</div>
            <div style={{ color: '#00ff88', marginBottom: 8 }}>✓ 已生成 3 个流程图</div>
            <div style={{ color: '#00ff88' }}>✓ 已导出 React 代码</div>
          </div>
        </div>
      </main>

      {/* 特性展示 */}
      <section style={{
        padding: '80px 60px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </section>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
