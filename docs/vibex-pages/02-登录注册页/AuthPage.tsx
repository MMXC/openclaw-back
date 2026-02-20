/**
 * 登录注册页 - 科技感玻璃拟态设计
 * 
 * 设计灵感:
 * 1. 玻璃卡片 - 源自 Apple Vision Pro 沉浸式 UI
 * 2. 霓虹光效 - VS Code 霓虹主题 + 赛博朋克
 * 3. 背景粒子 - 星空/数据流意象
 * 4. 交互动效 - iOS 动态岛屿平滑过渡
 */

import React, { useState, useEffect } from 'react';

// 背景粒子组件
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
    }}>
      {/* 渐变光晕 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite',
      }} />

      {/* 粒子 */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(139, 92, 246, 0.5)`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.5; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.9; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// 霓虹输入框
const NeonInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  icon,
  value,
  onChange 
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block',
        marginBottom: 8,
        fontSize: 13,
        fontWeight: 500,
        color: focused ? '#a5b4fc' : '#9ca3af',
        transition: 'color 0.3s',
        letterSpacing: '0.5px',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {/* 霓虹左边条 */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          borderRadius: '0 2px 2px 0',
          background: focused 
            ? 'linear-gradient(180deg, #818cf8 0%, #c084fc 100%)' 
            : '#374151',
          boxShadow: focused 
            ? '0 0 12px rgba(129, 140, 248, 0.6), 0 0 4px rgba(129, 140, 248, 0.8)' 
            : 'none',
          transition: 'all 0.3s ease',
        }} />
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '14px 16px 14px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid',
            borderColor: focused ? 'rgba(129, 140, 248, 0.5)' : 'rgba(55, 65, 81, 0.5)',
            borderRadius: 12,
            fontSize: 15,
            color: '#f9fafb',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        />
        
        {/* 聚焦时的光晕 */}
        {focused && (
          <div style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 13,
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1), rgba(192, 132, 252, 0.1))',
            zIndex: -1,
            filter: 'blur(8px)',
            animation: 'glow 2s ease-in-out infinite',
          }} />
        )}
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// 流光按钮
const GlowingButton = ({ children, onClick, variant = 'primary' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '16px',
        border: 'none',
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: variant === 'primary'
          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          : 'transparent',
        color: variant === 'primary' ? '#fff' : '#a5b4fc',
        border: variant === 'primary' ? 'none' : '1px solid rgba(129, 140, 248, 0.3)',
        transition: 'all 0.3s ease',
        letterSpacing: '0.5px',
      }}
    >
      {/* 流光效果 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '200%',
        height: '100%',
        background: variant === 'primary'
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
          : 'none',
        transform: hovered ? 'skewX(-20deg)' : 'translateX(-100%)',
        transition: 'transform 0.6s ease',
        animation: hovered ? 'shimmer 1.5s infinite' : 'none',
      }} />

      {/* 悬浮光晕 */}
      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
          zIndex: -1,
          filter: 'blur(15px)',
        }} />
      )}

      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

// 社交登录按钮
const SocialButton = ({ provider, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  const icons = {
    google: '🔵',
    github: '⚫',
    wechat: '🟢',
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 500,
        color: '#9ca3af',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ fontSize: 20 }}>{icons[provider]}</span>
      <span>{provider === 'google' ? 'Google' : provider === 'github' ? 'GitHub' : '微信'}</span>
    </button>
  );
};

// 主组件
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交:', formData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
    }}>
      <ParticleBackground />
      
      {/* 玻璃卡片 */}
      <div style={{
        width: '100%',
        maxWidth: 420,
        padding: 40,
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        {/* 顶部装饰 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
        }} />

        {/* 标题 */}
        <h1 style={{
          margin: '0 0 8px',
          fontSize: 28,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #f9fafb 0%, #a5b4fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}>
          {isLogin ? '欢迎回来' : '创建账号'}
        </h1>
        
        <p style={{
          margin: '0 0 32px',
          fontSize: 14,
          color: '#6b7280',
          textAlign: 'center',
        }}>
          {isLogin ? '登录您的 VibeX 账号' : '开始您的 AI 之旅'}
        </p>

        {/* 标签切换 */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 32,
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              background: isLogin ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: isLogin ? '#fff' : '#6b7280',
              transition: 'all 0.3s ease',
            }}
          >
            登录
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              background: !isLogin ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: !isLogin ? '#fff' : '#6b7280',
              transition: 'all 0.3s ease',
            }}
          >
            注册
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <NeonInput
              label="用户名"
              placeholder="请输入用户名"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          
          <NeonInput
            label="邮箱"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <NeonInput
            label="密码"
            type="password"
            placeholder="请输入密码"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          {isLogin && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 24,
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: 13,
                color: '#818cf8',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => e.target.style.color = '#a5b4fc'}
              onMouseOut={(e) => e.target.style.color = '#818cf8'}
              >
                忘记密码?
              </button>
            </div>
          )}

          <GlowingButton onClick={handleSubmit}>
            {isLogin ? '登录' : '注册'}
          </GlowingButton>
        </form>

        {/* 分割线 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '28px 0',
          gap: 16,
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 13, color: '#6b7280' }}>或</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* 社交登录 */}
        <div style={{ display: 'flex', gap: 12 }}>
          <SocialButton provider="google" onClick={() => {}} />
          <SocialButton provider="github" onClick={() => {}} />
          <SocialButton provider="wechat" onClick={() => {}} />
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
