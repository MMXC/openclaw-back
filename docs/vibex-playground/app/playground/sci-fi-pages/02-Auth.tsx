/**
 * 登录注册页 - 未来科幻AI风格
 * 
 * 设计亮点:
 * 1. 粒子连线背景 - 神经网络可视化
 * 2. 全息玻璃卡片 - 3D透视效果
 * 3. 能量输入框 - 脉冲边框动画
 * 4. 激光按钮 - 发光悬停效果
 * 5. 扫描验证 - 模拟AI安全验证
 */

import React, { useState, useEffect, useRef } from 'react';

// 粒子连线背景
const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.fill();

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    }} />
  );
};

// 全息卡片
const HolographicCard = ({ children }) => (
  <div style={{
    position: 'relative',
    padding: 48,
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    boxShadow: `
      0 0 60px rgba(0, 255, 255, 0.1),
      inset 0 0 60px rgba(0, 255, 255, 0.02)
    `,
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
      animation: 'scan 3s linear infinite',
    }} />
    <style>{`@keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(400px); } }`}</style>
    {children}
  </div>
);

// 能量输入框
const EnergyInput = ({ label, type = 'text', placeholder }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{
        display: 'block',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>{label}</label>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
      }}>
        <input
          type={type}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid',
            borderColor: focused ? '#00ffff' : 'rgba(0, 255, 255, 0.2)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 15,
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: focused ? '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.05)' : 'none',
          }}
        />
        {focused && (
          <div style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 14,
            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
            animation: 'energy 1.5s ease-in-out infinite',
            zIndex: -1,
          }} />
        )}
        <style>{`
          @keyframes energy {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

// 激光按钮
const LaserButton = ({ children, primary }) => (
  <button style={{
    width: '100%',
    padding: '18px',
    fontSize: 16,
    fontWeight: 600,
    color: primary ? '#0a0a0f' : '#00ffff',
    background: primary 
      ? 'linear-gradient(135deg, #00ffff, #00ff88)' 
      : 'rgba(0, 255, 255, 0.1)',
    border: primary ? 'none' : '2px solid rgba(0, 255, 255, 0.5)',
    borderRadius: 12,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s',
    boxShadow: primary 
      ? '0 0 30px rgba(0, 255, 255, 0.6)' 
      : '0 0 15px rgba(0, 255, 255, 0.2)',
  }}>
    <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    {!primary && (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.5s',
      }} />
    )}
  </button>
);

// 标签切换
const TabSwitch = ({ tabs, active, onChange }) => (
  <div style={{
    display: 'flex',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  }}>
    {tabs.map((tab, i) => (
      <button
        key={i}
        onClick={() => onChange(tab)}
        style={{
          flex: 1,
          padding: '12px',
          fontSize: 14,
          fontWeight: 500,
          color: active === tab ? '#00ffff' : 'rgba(255, 255, 255, 0.5)',
          background: active === tab ? 'rgba(0, 255, 255, 0.15)' : 'transparent',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

// 社交登录
const SocialLogin = () => (
  <div style={{ marginTop: 32 }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>其他登录方式</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
    </div>
    <div style={{ display: 'flex', gap: 12 }}>
      {['Google', 'GitHub', 'Apple'].map(brand => (
        <button key={brand} style={{
          flex: 1,
          padding: 14,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 12,
          color: '#fff',
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}>
          {brand}
        </button>
      ))}
    </div>
  </div>
);

export default function AuthPage() {
  const [mode, setMode] = useState('登录');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0f1a24 50%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <ParticleNetwork />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440, padding: 20 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64,
            height: 64,
            margin: '0 auto 16px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #00ffff, #00ff88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
          }}>V</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#fff' }}>VibeX</h1>
        </div>

        <HolographicCard>
          <TabSwitch tabs={['登录', '注册']} active={mode} onChange={setMode} />

          <h2 style={{ margin: '0 0 8px', fontSize: 24, color: '#fff', textAlign: 'center' }}>
            {mode === '登录' ? '欢迎回来' : '创建账户'}
          </h2>
          <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: 14 }}>
            {mode === '登录' ? '登录你的 VibeX 账号' : '开始 AI 驱动的原型设计'}
          </p>

          <EnergyInput label="邮箱" placeholder="your@email.com" />
          <EnergyInput label="密码" type="password" placeholder="••••••••" />
          
          {mode === '登录' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 13 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#00ffff' }} />
                记住我
              </label>
              <a href="#" style={{ color: '#00ffff', textDecoration: 'none' }}>忘记密码?</a>
            </div>
          )}

          <LaserButton primary>{mode === '登录' ? '立即登录' : '创建账号'}</LaserButton>

          <SocialLogin />
        </HolographicCard>

        {/* 底部提示 */}
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          © 2024 VibeX Labs. All rights reserved.
        </p>
      </div>
    </div>
  );
}
