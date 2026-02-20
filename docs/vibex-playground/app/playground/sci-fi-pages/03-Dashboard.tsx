/**
 * 用户中心 - 未来科幻AI风格
 * 
 * 设计亮点:
 * 1. 数据仪表盘 - 全息投影效果
 * 2. 浮动计数器 - AI实时计算动画
 * 3. 网格统计卡 - 赛博朋克风格
 * 4. 神经连接动画 - 技能可视化
 * 5. 扫描加载 - 模拟AI分析
 */

import React, { useState, useEffect } from 'react';

// 浮动计数器
const FloatingCounter = ({ value, label, suffix = '', prefix = '', index = 0 }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(counter);
    }, index * 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      padding: 24,
      background: 'rgba(0, 255, 255, 0.03)',
      border: '1px solid rgba(0, 255, 255, 0.15)',
      borderRadius: 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 100,
        height: 100,
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
      }} />
      <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
      <p style={{ margin: 0, fontSize: 36, fontWeight: 700, color: '#fff', textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </p>
    </div>
  );
};

// 扫描加载动画
const ScanLoader = () => (
  <div style={{
    width: 40,
    height: 40,
    position: 'relative',
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      border: '3px solid transparent',
      borderTopColor: '#00ffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <div style={{
      position: 'absolute',
      inset: 4,
      border: '3px solid transparent',
      borderTopColor: '#00ff88',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite reverse',
    }} />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

// 神经技能网络
const NeuralSkillNetwork = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 78 },
    { name: 'Python', level: 72 },
    { name: 'AI/ML', level: 65 },
  ];

  return (
    <div style={{
      padding: 24,
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 16,
      border: '1px solid rgba(0, 255, 255, 0.1)',
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 16, color: '#fff' }}>技能矩阵</h3>
      {skills.map((skill, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{skill.name}</span>
            <span style={{ fontSize: 13, color: '#00ffff' }}>{skill.level}%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${skill.level}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00ffff, #00ff88)',
              borderRadius: 3,
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              animation: 'grow 1s ease-out forwards',
              animationDelay: `${i * 0.15}s`,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
            }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes grow { 100% { transform: scaleX(1); } }`}</style>
    </div>
  );
};

// 活动记录项
const ActivityItem = ({ icon, title, time, status }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    marginBottom: 12,
    border: '1px solid transparent',
    transition: 'all 0.3s',
  }}>
    <div style={{
      width: 44,
      height: 44,
      borderRadius: 12,
      background: 'rgba(0, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <p style={{ margin: '0 0 4px', fontSize: 14, color: '#fff' }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{time}</p>
    </div>
    <span style={{
      fontSize: 11,
      padding: '4px 10px',
      borderRadius: 6,
      background: status === '完成' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 193, 7, 0.15)',
      color: status === '完成' ? '#00ff88' : '#ffc107',
    }}>{status}</span>
  </div>
);

// 项目卡片
const ProjectCard = ({ name, desc, progress, color }) => (
  <div style={{
    padding: 20,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.06)',
    transition: 'all 0.3s',
    cursor: 'pointer',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
      <h4 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{name}</h4>
      <span style={{ fontSize: 20 }}>{color}</span>
    </div>
    <p style={{ margin: '0 0 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{progress}%</span>
    </div>
  </div>
);

export default function UserCenterPage() {
  const stats = [
    { value: 1248, label: '总项目数' },
    { value: 89, label: '活跃页面' },
    { value: 2341, label: 'AI 生成次数' },
    { value: 156, label: '团队成员' },
  ];

  const activities = [
    { icon: '📄', title: '创建新页面 "用户中心"', time: '2分钟前', status: '完成' },
    { icon: '🤖', title: 'AI 生成流程图', time: '15分钟前', status: '完成' },
    { icon: '📤', title: '导出 React 代码', time: '1小时前', status: '处理中' },
    { icon: '🔄', title: '更新组件库', time: '3小时前', status: '完成' },
  ];

  const projects = [
    { name: 'VibeX Web', desc: 'AI 原型生成平台', progress: 78, color: '💜' },
    { name: '移动端 App', desc: 'iOS/Android 应用', progress: 45, color: '🟢' },
    { name: '仪表盘系统', desc: '数据可视化面板', progress: 92, color: '🔵' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1218 100%)', padding: 32 }}>
      {/* 头部 */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #00ffff, #00ff88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 700,
            color: '#0a0a0f',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)',
          }}>Y</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, color: '#fff', fontWeight: 600 }}>欢迎回来, 余祥</h1>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>AI 正在分析你的使用模式...</p>
          </div>
        </div>
        <ScanLoader />
      </header>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
        {stats.map((stat, i) => (
          <FloatingCounter key={i} {...stat} index={i} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* 项目 */}
        <div>
          <h3 style={{ margin: '0 0 20px', fontSize: 18, color: '#fff' }}>我的项目</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
        </div>

        {/* 技能 */}
        <NeuralSkillNetwork />
      </div>

      {/* 活动 */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 18, color: '#fff' }}>最近活动</h3>
        {activities.map((a, i) => <ActivityItem key={i} {...a} />)}
      </div>
    </div>
  );
}
