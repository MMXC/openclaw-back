'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChatPanel.module.css';
import styles from './AIChat.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  selectedControl: { id: string; type: string; code: string } | null;
  pageCode: string;
  onApplyChange: (changes: string) => void;
}

// AI 对话系统提示词
const SYSTEM_PROMPT = `你是 VibeX UI 助手，专门帮助用户调整和修改页面原型。

## 你的能力
1. 分析用户需求，生成代码修改建议
2. 理解 React/Next.js 组件代码
3. 提供具体的代码修改方案

## 工作流程
1. 理解用户想要什么样的调整
2. 分析当前控件源码和页面结构
3. 给出具体的修改建议和代码

## 上下文信息
{{CONTEXT}}

请用中文回复。`;

export function AIChatPanel({ selectedControl, pageCode, onApplyChange }: Props) {
  const [mode, setMode] = useState<'ask' | 'agent'>('ask');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 构建上下文
  const buildContext = () => {
    let context = '';
    
    if (selectedControl) {
      context += `## 选中的控件\n- 类型: ${selectedControl.type}\n- ID: ${selectedControl.id}\n`;
    } else {
      context += '## 选中的控件\n无（请先在画布中点击选择控件）\n';
    }
    
    return context;
  };

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = SYSTEM_PROMPT.replace('{{CONTEXT}}', buildContext()) + `\n\n## 用户请求\n${userMessage}`;
      
      // 模拟响应
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoResponse = getDemoResponse(userMessage, selectedControl);
      setMessages(prev => [...prev, { role: 'assistant', content: demoResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，请稍后重试。' }]);
    }
    
    setIsLoading(false);
  };

  // 演示响应
  const getDemoResponse = (userInput: string, ctrl: Props['selectedControl']): string => {
    if (!ctrl) {
      return `请先在画布中点击选择要调整的控件，然后告诉我你想怎么修改。`;
    }
    
    if (userInput.includes('颜色') || userInput.includes('红色') || userInput.includes('蓝色')) {
      return `好的，修改 ${ctrl.type} 的颜色：\n\n\`\`\`jsx\nstyle={{ background: '#ff4d4f', color: '#fff' }}\n\`\`\``;
    }
    
    if (userInput.includes('圆角') || userInput.includes('圆')) {
      return `好的，添加圆角：\n\n\`\`\`jsx\nstyle={{ borderRadius: '12px' }}\n\`\`\``;
    }
    
    return `我理解你想调整 "${userInput}"。\n\n对于 ${ctrl.type} 控件，你可以：\n1. 调整颜色、尺寸、间距\n2. 切换到 agent 模式生成修改代码`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.panel}>
      {/* 头部 */}
      <div className={styles.header}>
        <span className={styles.title}>🤖 AI 助手</span>
        <div className={styles.modeSwitch}>
          <button 
            className={`${styles.modeBtn} ${mode === 'ask' ? styles.active : ''}`}
            onClick={() => setMode('ask')}
          >
            💬 Ask
          </button>
          <button 
            className={`${styles.modeBtn} ${mode === 'agent' ? styles.active : ''}`}
            onClick={() => setMode('agent')}
          >
            ⚡ Agent
          </button>
        </div>
      </div>

      {/* 选中控件信息 */}
      <div className={styles.selectedInfo}>
        {selectedControl ? (
          <span>✅ 已选: {selectedControl.type}</span>
        ) : (
          <span>请点击画布中的控件</span>
        )}
      </div>

      {/* 消息区域 */}
      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            👋 你好！我是 VibeX AI 助手
            <p>选中控件，告诉我你想怎么调整</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
            <div className={styles.messageContent}>{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className={styles.loading}>思考中...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* 工具栏 */}
      <div className={styles.toolbar}>
        <button onClick={() => fileInputRef.current?.click()} title="上传附件">📎</button>
        <button onClick={() => imageInputRef.current?.click()} title="上传图片">🖼️</button>
        <button title="富文本">📝</button>
      </div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
      <input type="file" accept="image/*" ref={imageInputRef} style={{ display: 'none' }} />

      {/* 输入区 */}
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={mode === 'agent' ? '描述你想要的效果...' : '问我想怎么调整...'}
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? '...' : '发送'}
        </button>
      </div>

      {/* Agent 模式操作 */}
      {mode === 'agent' && messages.length > 0 && (
        <div className={styles.actions}>
          <button className={styles.applyBtn} onClick={() => onApplyChange('apply')}>
            ✅ 应用修改
          </button>
        </div>
      )}
    </div>
  );
}
