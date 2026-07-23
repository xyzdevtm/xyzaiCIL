import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../../core/agent';
import { XYZAIConfig } from '../../config/schema';
import { containsRTL } from '../../rtl/bidi';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: number;
}

export interface ChatProps {
  agent: Agent;
  config: XYZAIConfig;
}

export const Chat: React.FC<ChatProps> = ({ agent, config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [currentToken, setCurrentToken] = useState('');
  const { exit } = useApp();
  const inputRef = useRef('');

  const addMessage = (role: ChatMessage['role'], content: string) => {
    setMessages(prev => [...prev, { role, content, timestamp: Date.now() }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Handle commands
    if (text.startsWith('/')) {
      handleCommand(text);
      return;
    }

    addMessage('user', text);
    setInput('');
    setIsThinking(true);
    setCurrentToken('');

    const callbacks: AgentCallbacks = {
      onThinking: () => {
        setIsThinking(true);
      },
      onToken: (token) => {
        setCurrentToken(prev => prev + token);
      },
      onToolCall: (name, args) => {
        addMessage('tool', `🔧 ${name}: ${JSON.stringify(args)}`);
      },
      onToolResult: (name, result) => {
        if (result.error) {
          addMessage('tool', `❌ ${name}: ${result.error}`);
        }
      },
      onPermission: async (tool, detail) => {
        // For MVP, auto-allow
        return true;
      },
      onDone: (response) => {
        setIsThinking(false);
        setCurrentToken('');
        addMessage('assistant', response);
      },
      onError: (error) => {
        setIsThinking(false);
        setCurrentToken('');
        addMessage('system', `❌ Error: ${error}`);
      },
    };

    await agent.chat(text, callbacks);
  };

  const handleCommand = (cmd: string) => {
    const parts = cmd.split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case '/exit':
      case '/quit':
        exit();
        break;
      case '/help':
        addMessage('system', getHelpText(config.language));
        break;
      case '/clear':
        setMessages([]);
        agent.clearConversation();
        addMessage('system', config.language === 'fa' ? 'مکالمه پاک شد' : 'Conversation cleared');
        break;
      case '/lang':
        const lang = parts[1] as 'en' | 'fa';
        if (lang === 'en' || lang === 'fa') {
          agent.setLanguage(lang);
          addMessage('system', lang === 'fa' ? 'زبان به فارسی تغییر کرد' : 'Language changed to English');
        } else {
          addMessage('system', config.language === 'fa' ? 'استفاده: /lang fa یا /lang en' : 'Usage: /lang fa or /lang en');
        }
        break;
      case '/model':
        if (parts[1]) {
          // Would change model here
          addMessage('system', config.language === 'fa' ? 'مدل تغییر کرد' : 'Model changed');
        }
        break;
      default:
        addMessage('system', config.language === 'fa' ? `دستور ناشناخته: ${command}` : `Unknown command: ${command}`);
    }
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    const isRTL = containsRTL(msg.content);

    switch (msg.role) {
      case 'user':
        return (
          <Box key={index} flexDirection="column" marginY={1}>
            <Text bold color="cyan">
              {config.language === 'fa' ? 'شما:' : 'You:'}
            </Text>
            <Text color="white">{msg.content}</Text>
          </Box>
        );

      case 'assistant':
        return (
          <Box key={index} flexDirection="column" marginY={1}>
            <Text bold color="green">
              XYZAI:
            </Text>
            <Text color="white" wrap="wrap">{msg.content}</Text>
          </Box>
        );

      case 'tool':
        return (
          <Box key={index} flexDirection="column" marginY={0}>
            <Text color="yellow">{msg.content}</Text>
          </Box>
        );

      case 'system':
        return (
          <Box key={index} flexDirection="column" marginY={0}>
            <Text color="gray">{msg.content}</Text>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box flexDirection="column" height="100%">
      {/* Messages area */}
      <Box flexDirection="column" flexGrow={1} paddingX={1}>
        {messages.length === 0 && (
          <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Text bold color="cyan" marginBottom={1}>
              {config.language === 'fa' ? '🔥 XYZAI' : '🔥 XYZAI'}
            </Text>
            <Text color="gray" marginBottom={1}>
              {config.language === 'fa'
                ? 'دستیار برنامه‌نویسی هوش مصنوعی شما'
                : 'Your AI Coding Assistant'}
            </Text>
            <Text color="gray">
              {config.language === 'fa'
                ? 'برای شروع یک پیام تایپ کنید. /help برای راهنما'
                : 'Type a message to start. /help for help'}
            </Text>
          </Box>
        )}

        {messages.map(renderMessage)}

        {isThinking && (
          <Box marginY={1}>
            <Text color="yellow">
              {config.language === 'fa' ? '🤔 در حال فکر کردن...' : '🤔 Thinking...'}
            </Text>
          </Box>
        )}

        {currentToken && (
          <Box flexDirection="column">
            <Text bold color="green">XYZAI:</Text>
            <Text color="white" wrap="wrap">{currentToken}</Text>
          </Box>
        )}
      </Box>

      {/* Input area */}
      <Box borderStyle="round" borderColor="cyan" paddingX={1} paddingY={0}>
        <Text color="cyan">❯ </Text>
        <Text color="white">{input}</Text>
        <Text color="gray">|</Text>
      </Box>

      {/* Status bar */}
      <Box justifyContent="space-between" paddingX={1}>
        <Text color="gray" dimColor>
          {config.model}
        </Text>
        <Text color="gray" dimColor>
          {config.language === 'fa' ? 'فارسی' : 'EN'} | /help
        </Text>
      </Box>
    </Box>
  );
};

function getHelpText(lang: 'en' | 'fa'): string {
  if (lang === 'fa') {
    return `=== راهنمای XYZAI ===

دستورات:
  /help  - نمایش این راهنما
  /model - تغییر مدل هوش مصنوعی
  /lang  - تغییر زبان (fa/en)
  /clear - پاک کردن مکالمه
  /sessions - لیست جلسات
  /exit  - خروج

ابزارها:
  خواندن و نوشتن فایل‌ها
  اجرای دستورات ترمینال
  جستجوی کد
  مرور وب`;
  }
  return `=== XYZAI Help ===

Commands:
  /help  - Show this help
  /model - Change AI model
  /lang  - Change language (fa/en)
  /clear - Clear conversation
  /sessions - List sessions
  /exit  - Exit

Tools:
  Read and write files
  Execute terminal commands
  Search code
  Browse the web`;
}
