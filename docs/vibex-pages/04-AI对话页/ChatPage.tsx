/**
 * AI 对话页 - 现代聊天界面设计
 * 
 * 设计灵感:
 * 1. 消息气泡 - iOS/WhatsApp 经典 + 现代渐变
 * 2. 输入框 - Notion/Discord 风格
 * 3. 打字机动效 - Terminal/IDE 风格
 * 4. 侧边栏折叠 - Figma/Slack 现代面板
 * 5. 消息加载 - Three dots 脉冲动画
 */

import React, { useState, useEffect, useRef } from 'react';

// 头像组件
const Avatar = ({ src, name, size = 40, isAI = false }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: isAI 
      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
      : 'linear-gradient(135deg, #34d399, #10b981)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.4,
    fontWeight: 600,
    color: '#fff',
    flexShrink: 0,
    boxShadow: isAI ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none',
  }}>
    {isAI ? 'AI' : name?.[0] || '?'}
  </div>
);

// 消息气泡
const MessageBubble = ({ message, isUser, avatar, name, timestamp }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      marginBottom: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.3s ease',
    }}>
      {!isUser && <Avatar name={name} isAI={true} />}
      
      <div style={{
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
      }}>
        {!isUser && (
          <span style={{
            fontSize: 13,
            color: '#9ca3af',
            marginBottom: 6,
            marginLeft: 4,
          }}>
            {name}
          </span>
        )}
        
        <div style={{
          padding: '14px 18px',
          borderRadius: isUser 
            ? '18px 18px 4px 18px' 
            : '18px 18px 18px 4px',
          background: isUser 
            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            : 'rgba(255, 255, 255, 0.05)',
          color: '#f9fafb',
          fontSize: 15,
          lineHeight: 1.6,
          boxShadow: isUser ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
          wordBreak: 'break-word',
        }}>
          {message}
        </div>

        <span style={{
          fontSize: 12,
          color: '#6b7280',
          marginTop: 6,
          marginLeft: 4,
          marginRight: 4,
        }}>
          {timestamp}
        </span>
      </div>

      {isUser && <Avatar name={name} />}
    </div>
  );
};

// 打字机动效
const TypingIndicator = () => (
  <div style={{
    display: 'flex',
    gap: 4,
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 18,
    width: 'fit-content',
  }}>
    {[0, 1, 2].map(i => (
      <div
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#818cf8',
          animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-8px); }
      }
    `}</style>
  </div>
);

// 输入框
const ChatInput = ({ value, onChange, onSend }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      padding: '16px 24px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        padding: 12,
        background: focused ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
        borderRadius: 20,
        border: '1px solid',
        borderColor: focused ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.06)',
        transition: 'all 0.3s ease',
      }}>
        {/* 附件按钮 */}
        <button style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          border: 'none',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#9ca3af',
          cursor: 'pointer',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          +
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="输入消息..."
          rows={1}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f9fafb',
            fontSize: 15,
            lineHeight: 1.6,
            resize: 'none',
            maxHeight: 120,
            minHeight: 24,
            fontFamily: 'inherit',
          }}
        />

        {/* 发送按钮 */}
        <button
          onClick={onSend}
          disabled={!value.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            border: 'none',
            background: value.trim() 
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
              : 'rgba(255, 255, 255, 0.05)',
            color: value.trim() ? '#fff' : '#6b7280',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: value.trim() ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

// 聊天列表项
const ChatListItem = ({ title, lastMessage, time, unread, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
      border: 'none',
      borderLeft: active ? '3px solid #818cf8' : '3px solid transparent',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s',
    }}
  >
    <Avatar name={title} size={44} isAI={true} />
    
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
      }}>
        <span style={{
          fontSize: 15,
          fontWeight: active ? 600 : 500,
          color: '#f9fafb',
        }}>
          {title}
        </span>
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          {time}
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 13,
          color: '#9ca3af',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 180,
        }}>
          {lastMessage}
        </span>
        
        {unread > 0 && (
          <span style={{
            minWidth: 20,
            height: 20,
            padding: '0 6px',
            borderRadius: 10,
            background: '#818cf8',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {unread}
          </span>
        )}
      </div>
    </div>
  </button>
);

// 主组件
export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是 VibeX AI 助手。有什么可以帮助你的吗？', isUser: false, name: 'VibeX', timestamp: '10:30' },
    { id: 2, text: '你好！我想创建一个任务管理应用。', isUser: true, name: '你', timestamp: '10:31' },
    { id: 3, text: '好的，我来帮你。请问你希望这个应用有哪些核心功能？比如任务创建、分类、提醒、协作等？', isUser: false, name: 'VibeX', timestamp: '10:31' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      name: '你',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 模拟 AI 回复
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: '明白了！让我为你创建一个完整的任务管理应用方案。我们可以从需求分析开始...',
        isUser: false,
        name: 'VibeX',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 2000);
  };

  const chats = [
    { id: 1, title: 'VibeX AI', lastMessage: '明白了！让我为你创建...', time: '10:31', unread: 0, active: true },
    { id: 2, title: '产品助手', lastMessage: '这是今天的任务清单', time: '昨天', unread: 3, active: false },
    { id: 3, title: '代码审查', lastMessage: 'PR #123 已通过', time: '昨天', unread: 0, active: false },
    { id: 4, title: '数据分析', lastMessage: '周报已生成', time: '周三', unread: 1, active: false },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#0a0a0f',
    }}>
      {/* 侧边栏 */}
      <aside style={{
        width: 320,
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 搜索栏 */}
        <div style={{ padding: 20 }}>
          <div style={{
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#6b7280',
            fontSize: 14,
          }}>
            🔍 搜索对话...
          </div>
        </div>

        {/* 聊天列表 */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chats.map(chat => (
            <ChatListItem key={chat.id} {...chat} onClick={() => {}} />
          ))}
        </div>
      </aside>

      {/* 主聊天区 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 头部 */}
        <header style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="VibeX" size={40} isAI={true} />
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#f9fafb' }}>
                VibeX AI
              </h2>
              <span style={{ fontSize: 13, color: '#34d399' }}>● 在线</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 16,
            }}>
              ⋮
            </button>
          </div>
        </header>

        {/* 消息列表 */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}>
          {messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isUser={msg.isUser}
              name={msg.name}
              timestamp={msg.timestamp}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框 */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
        />
      </main>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
