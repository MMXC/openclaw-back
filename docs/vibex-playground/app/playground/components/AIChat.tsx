'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedControls: Array<{ id: string; type: string; code: string }>;
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
1. 理解用户想要什么样的调整（如：按钮改成红色、卡片加圆角、调整间距等）
2. 分析当前控件源码和页面结构
3. 给出具体的修改建议和代码

## 输出格式
当用户要求修改时，请：
1. 先确认理解用户需求
2. 提供修改后的代码片段
3. 说明修改位置

## 上下文信息
{{CONTEXT}}

## 模式说明
- ask 模式：回答问题，给出建议
- agent 模式：直接生成修改后的完整代码，用户确认后应用

请用中文回复。`;

export function AIChat({ isOpen, onClose, selectedControls, pageCode, onApplyChange }: Props) {
  const [mode, setMode] = useState<'ask' | 'agent'>('ask');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 构建上下文
  const buildContext = () => {
    let context = '';
    
    if (selectedControls.length > 0) {
      context += '## 选中的控件\n';
      selectedControls.forEach(ctrl => {
        context += `\n### ${ctrl.type} (${ctrl.id})\n\`\`\`jsx\n${ctrl.code}\n\`\`\`\n`;
      });
    } else {
      context += '## 选中的控件\n无\n';
    }
    
    context += `\n## 页面完整代码\n\`\`\`jsx\n${pageCode}\n\`\`\``;
    
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
      // 替换上下文
      const prompt = SYSTEM_PROMPT.replace('{{CONTEXT}}', buildContext()) 
        + `\n\n## 用户请求\n${userMessage}`;
      
      // 调用 MiniMax API (这里需要配置实际的 API)
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'MiniMax-M2.5',
          messages: [
            { role: 'system', content: prompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      });

      const data = await response.json();
      
      if (data.choices?.[0]?.message) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '抱歉，API 调用失败。请检查配置后重试。' 
        }]);
      }
    } catch (error) {
      // 演示模式：返回模拟响应
      const demoResponse = getDemoResponse(userMessage, selectedControls);
      setMessages(prev => [...prev, { role: 'assistant', content: demoResponse }]);
    }
    
    setIsLoading(false);
  };

  // 演示响应
  const getDemoResponse = (userInput: string, controls: typeof selectedControls): string => {
    if (controls.length === 0) {
      return `我理解你想调整页面。\n\n请先在画布中点击选择要调整的控件，然后告诉我你想要怎么修改。\n\n比如：\n- "把按钮改成红色"\n- "给卡片加圆角"\n- "调整输入框的宽度"`;
    }
    
    const controlType = controls[0].type;
    
    if (userInput.includes('颜色') || userInput.includes('红色') || userInput.includes('蓝色')) {
      return `好的，我来帮你调整颜色。\n\n以 ${controlType} 为例，修改代码如下：\n\n\`\`\`jsx\n// 添加或修改 style 属性\nstyle={{\n  background: '#ff4d4f',  // 改成红色\n  color: '#fff'\n}}\n\`\`\`\n\n在 agent 模式下，我可以帮你直接应用到画布中。`;
    }
    
    if (userInput.includes('圆角') || userInput.includes('圆')) {
      return `好的，添加圆角样式：\n\n\`\`\`jsx\nstyle={{\n  borderRadius: '12px'\n}}\n\`\`\``;
    }
    
    return `我理解你想调整 "${userInput}"。\n\n对于选中的 ${controlType} 控件，你可以：\n1. 告诉我具体想改什么（颜色、尺寸、间距、样式等）\n2. 切换到 agent 模式，我直接生成修改后的代码\n3. 点击应用按钮将修改应用到画布`;
  };

  // 应用修改
  const applyChange = () => {
    const lastAssistantMsg = messages.filter(m => m.role === 'assistant').pop();
    if (lastAssistantMsg) {
      onApplyChange(lastAssistantMsg.content);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.title}>🤖 AI 调整助手</span>
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
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.selected}>
          {selectedControls.length === 0 ? (
            <span>未选中控件</span>
          ) : (
            <span>已选: {selectedControls.map(c => c.type).join(', ')}</span>
          )}
        </div>
        
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.welcome}>
              👋 你好！我是 VibeX AI 助手
              <p>选中画布中的控件，告诉我你想如何调整</p>
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
        
        {mode === 'agent' && messages.length > 0 && (
          <div className={styles.actions}>
            <button className={styles.applyBtn} onClick={applyChange}>
              ✅ 应用修改
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
