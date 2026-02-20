/**
 * 用户中心页 - 现代仪表盘设计
 * 
 * 设计灵感:
 * 1. Bento Grid 布局 - 源自 Apple 官网产品展示
 * 2. 毛玻璃效果 - iOS/macOS 统一设计语言
 * 3. 浮动统计数字 - 源自加密货币仪表盘
 * 4. 渐变边框卡片 - 源自现代 SaaS 产品
 * 5. 涟漪菜单 - Material Design 3 交互
 */

import React, { useState, useEffect } from 'react';

// 浮动数字组件
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span style={{
      fontSize: 32,
      fontWeight: 700,
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// 项目卡片
const ProjectCard = ({ title, description, status, color, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 24,
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.06)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered 
          ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px ${color}20` 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 渐变光晕 */}
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0,
      }} />

      {/* 状态指示器 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }} />
        <span style={{
          fontSize: 12,
          padding: '4px 10px',
          borderRadius: 20,
          background: `${color}15`,
          color: color,
          fontWeight: 500,
        }}>
          {status}
        </span>
      </div>

      <h3 style={{
        margin: '0 0 8px',
        fontSize: 18,
        fontWeight: 600,
        color: '#f9fafb',
      }}>
        {title}
      </h3>

      <p style={{
        margin: 0,
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 1.6,
      }}>
        {description}
      </p>

      {/* 底部装饰 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />
    </div>
  );
};

// 统计卡片
const StatCard = ({ icon, label, value, suffix, trend, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 24,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        {trend && (
          <span style={{
            fontSize: 13,
            color: trend > 0 ? '#34d399' : '#f87171',
            fontWeight: 500,
          }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>

      <AnimatedCounter value={value} suffix={suffix} />

      <p style={{
        margin: '8px 0 0',
        fontSize: 14,
        color: '#6b7280',
      }}>
        {label}
      </p>
    </div>
  );
};

// 侧边栏菜单项
const MenuItem = ({ icon, label, active, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: active ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))' 
          : hovered ? 'rgba(255, 255, 255, 0.05)' 
          : 'transparent',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 选中指示器 */}
      {active && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 3,
          height: 24,
          background: 'linear-gradient(180deg, #818cf8, #c084fc)',
          borderRadius: '0 2px 2px 0',
        }} />
      )}

      <span style={{ 
        fontSize: 20,
        opacity: active ? 1 : hovered ? 0.8 : 0.6,
        transition: 'opacity 0.2s',
      }}>
        {icon}
      </span>
      
      <span style={{
        fontSize: 15,
        fontWeight: active ? 600 : 400,
        color: active ? '#f9fafb' : '#9ca3af',
        transition: 'color 0.2s',
      }}>
        {label}
      </span>
    </button>
  );
};

// 主组件
export default function UserCenterPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('projects');

  const projects = [
    { title: 'VibeX 原型设计', description: 'AI 驱动的应用原型生成平台', status: '开发中', color: '#818cf8' },
    { title: '智能工作流引擎', description: '自动化业务流程编排系统', status: '规划中', color: '#34d399' },
    { title: '数据分析仪表盘', description: '实时业务数据可视化', status: '已上线', color: '#f472b6' },
    { title: '客服机器人', description: '基于 LLM 的智能客服', status: '测试中', color: '#fb923c' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)',
    }}>
      {/* 侧边栏 */}
      <aside style={{
        width: sidebarCollapsed ? 80 : 260,
        padding: '24px 16px',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'width 0.3s ease',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 40,
          padding: '0 8px',
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: '#fff',
          }}>
            V
          </div>
          {!sidebarCollapsed && (
            <span style={{
              fontSize: 20,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f9fafb, #a5b4fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              VibeX
            </span>
          )}
        </div>

        {/* 菜单 */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <MenuItem icon="📊" label="仪表盘" active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} />
          <MenuItem icon="📁" label="我的项目" active={activeMenu === 'projects'} onClick={() => setActiveMenu('projects')} />
          <MenuItem icon="💬" label="对话记录" active={activeMenu === 'chats'} onClick={() => setActiveMenu('chats')} />
          <MenuItem icon="📈" label="数据分析" active={activeMenu === 'analytics'} onClick={() => setActiveMenu('analytics')} />
          <MenuItem icon="⚙️" label="设置" active={activeMenu === 'settings'} onClick={() => setActiveMenu('settings')} />
        </nav>

        {/* 折叠按钮 */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: 'absolute',
            bottom: 24,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#9ca3af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            transition: 'all 0.2s',
          }}
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </aside>

      {/* 主内容区 */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* 头部 */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}>
          <div>
            <h1 style={{
              margin: '0 0 8px',
              fontSize: 32,
              fontWeight: 700,
              color: '#f9fafb',
            }}>
              用户中心
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>
              欢迎回来，{sidebarCollapsed ? '' : '查看您的项目和统计数据'}
            </p>
          </div>

          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.2s',
          }}>
            + 新建项目
          </button>
        </header>

        {/* 统计卡片 - Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: 40,
        }}>
          <StatCard icon="📁" label="项目总数" value={12} trend={8} color="#818cf8" />
          <StatCard icon="💬" label="对话消息" value={1847} trend={24} color="#34d399" />
          <StatCard icon="⏱️" label="使用时长" value={128} suffix="h" trend={-3} color="#f472b6" />
          <StatCard icon="✨" label="AI 生成次数" value={523} trend={15} color="#fb923c" />
        </div>

        {/* 项目列表 */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <h2 style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: '#f9fafb',
            }}>
              我的项目
            </h2>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#818cf8',
              fontSize: 14,
              cursor: 'pointer',
            }}>
              查看全部 →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {projects.map((project, i) => (
              <ProjectCard key={i} {...project} onClick={() => {}} />
            ))}
          </div>
        </section>
      </main>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
