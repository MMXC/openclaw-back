/**
 * AI 对话页 - 未来科幻AI风格
 * 
 * 设计亮点:
 * 1. 全息消息气泡 - 3D透视 + 扫描线
 * 2. 打字机回复 - 逐字输出效果
 * 3. 神经网络连接 - 背景可视化
 * 4. 脉冲输入框 - 能量波动动画
 * 5. AI状态指示 - 思维计算可视化
 */

import React, { useState, useEffect, useRef } from 'react';

// 神经网络背景
const NeuralBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: 4,
        height: 4,
        background: '#00ffff',
        borderRadius: '50%',
        animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        boxShadow: '0 0 10px #00ffff',
      }} />
    ))}
    <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }`}</style>
  </div>
);

// 打字机消息
const TypewriterMessage = ({ text, onComplete }) => {
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
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          background: '#00ffff',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'blink 0.7s infinite',
        }} />
      )}
    </span>
  );
};

// AI状态指示器
const AIStatusIndicator = () => {
  const [status, setStatus] = useState(0);
  const statuses = ['思考中...', '检索知识库...', '生成回复...', '在线'];

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      background: 'rgba(0, 255, 255, 0.1)',
      borderRadius: 20,
      border: '1px solid rgba(0, 255, 255, 0.2)',
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#00ff88',
        boxShadow: '0 0 10px #00ff88',
        animation: 'pulse 1.5s infinite',
      }} />
      <span style={{ fontSize: 12, color: '#00ffff' }}>{statuses[status]}</span>
    </div>
  );
};

// 全息气泡
const HolographicBubble = ({ children, isUser, name, time, typing = false }) => (
  <div style={{
    display: 'flex',
    gap: 12,
    marginBottom: 20,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  }}>
    {!isUser && (
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #00ffff, #00ff88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 700,
        color: '#0a0a0f',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      }}>AI</div>
    )}
    <div style={{ maxWidth: '70%' }}>
      {!isUser && (
        <p style={{ margin: '0 0 6px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{name}</p>
      )}
      <div style={{
        padding: '16px 20px',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        background: isUser 
          ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 136, 0.2))'
          : 'rgba(0, 0, 0, 0.4)',
        border: '1px solid',
        borderColor: isUser ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 255, 0.1)',
        color: '#fff',
        fontSize: 15,
        lineHeight: 1.6,
        boxShadow: isUser ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none',
      }}>
        {typing ? <TypingAnimation /> : children}
      </div>
      <p style={{ margin: '6px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: isUser ? 'right' : 'left' }}>{time}</p>
    </div>
    {isUser && (
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
      }}>Y</div>
    )}
  </div>
);

// 打字动画
const TypingAnimation = () => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#00ffff',
        animation: `bounce 1.4s ${i * 0.2}s infinite`,
      }} />
    ))}
    <style>{`@keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }`}</style>
  </div>
);

// 脉冲输入框
const PulseInput = ({ value, onChange, onSend }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      padding: '16px 24px',
      background: 'rgba(0, 0, 0, 0.6)',
      borderTop: '1px solid rgba(0, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        padding: 12,
        background: focused ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        border: '1px solid',
        borderColor: focused ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 255, 0.1)',
        transition: 'all 0.3s',
        boxShadow: focused ? '0 0 30px rgba(0, 255, 255, 0.1)' : 'none',
      }}>
        <button style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: '1px solid rgba(0, 255, 255, 0.3)',
          background: 'rgba(0, 255, 255, 0.05)',
          color: '#00ffff',
          cursor: 'pointer',
          fontSize: 18,
        }}>+</button>
        
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="描述你的需求..."
          rows={1}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: 15,
            resize: 'none',
            minHeight: 24,
            maxHeight: 120,
          }}
        />
        
        <button
          onClick={onSend}
          disabled={!value.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            border: 'none',
            background: value.trim() 
              ? 'linear-gradient(135deg, #00ffff, #00ff88)' 
              : 'rgba(255, 255, 255, 0.1)',
            color: value.trim() ? '#0a0a0f' : 'rgba(255,255,255,0.3)',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
            fontSize: 18,
            boxShadow: value.trim() ? '0 0 20px rgba(0, 255, 255, 0.5)' : 'none',
            transition: 'all 0.3s',
          }}
        >➤</button>
      </div>
    </div>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是 VibeX AI 助手。我可以帮助你创建应用原型、设计流程图、生成代码等。有什么我可以帮你的吗？', isUser: false, name: 'VibeX AI', time: '10:30', typing: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      name: '你',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        '明白了！让我为你创建这个页面设计。我会生成一个现代科技风格的界面...',
        '好的，我来分析你的需求并生成相应的原型。稍等片刻...',
        '收到！我正在为你构建这个功能，这将包括完整的交互设计...',
      ];
      setReplyText(responses[Math.floor(Math.random() * responses.length)]);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: '',
        isUser: false,
        name: 'VibeX AI',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        typing: false,
        fullText: replyText || responses[0],
      }]);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f' }}>
      {/* 侧边栏 */}
      <aside style={{ width: 280, borderRight: '1px solid rgba(0,255,255,0.1)', padding: 20 }}>
        <div style={{
          padding: '12px 16px',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: 12,
          border: '1px solid rgba(0, 255, 255, 0.1)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 14,
          marginBottom: 24,
        }}>🔍 搜索对话...</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { title: 'VibeX AI', msg: '明白了！让我为你创建...', time: '10:30', active: true },
            { title: '产品助手', msg: '这是今天的任务清单', time: '昨天', active: false },
            { title: '代码审查', msg: 'PR #123 已通过', time: '昨天', active: false },
          ].map((chat, i) => (
            <button key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              background: chat.active ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
              border: 'none',
              borderLeft: chat.active ? '3px solid #00ffff' : '3px solid transparent',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #00ffff, #00ff88)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: '#0a0a0f',
              }}>{chat.title[0]}</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, color: '#fff' }}>{chat.title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{chat.msg}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* 主聊天区 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <NeuralBackground />
        
        {/* 头部 */}
        <header style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(0,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #00ffff, #00ff88)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: '#0a0a0f',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            }}>V</div>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#fff' }}>VibeX AI</h2>
              <AIStatusIndicator />
            </div>
          </div>
        </header>

        {/* 消息 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, position: 'relative', zIndex: 10 }}>
          {messages.map(msg => (
            <HolographicBubble
              key={msg.id}
              isUser={msg.isUser}
              name={msg.name}
              time={msg.time}
              typing={isTyping && msg.id === messages[messages.length - 1]?.id}
            >
              {msg.fullText ? <TypewriterMessage text={msg.fullText} /> : msg.text}
            </HolographicBubble>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <PulseInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}
