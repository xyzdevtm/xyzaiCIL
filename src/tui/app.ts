import * as blessed from 'blessed';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent';
import { XYZAIConfig, loadConfig } from '../config/schema';

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);

  // Create screen
  const screen = blessed.screen({
    smartCSR: true,
    title: 'XYZAI - AI Coding Assistant',
  });

  // Header
  const header = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    content: chalk.bold.cyan(' 🔥 XYZAI ') + chalk.gray('| ') + chalk.white('AI Coding Assistant') + chalk.gray(' | ') + chalk.yellow(loadedConfig.model),
    border: { type: 'line' },
    style: {
      border: { fg: 'cyan' },
      fg: 'white',
    },
  });

  // Chat area
  const chatArea = blessed.box({
    parent: screen,
    top: 3,
    left: 0,
    width: '100%',
    height: '100%-5',
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      style: {
        bg: 'cyan',
      },
    },
    style: {
      fg: 'white',
    },
  });

  // Input area
  const inputBox = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    border: { type: 'line' },
    label: chalk.cyan(' Message '),
    style: {
      border: { fg: 'cyan' },
      fg: 'white',
    },
  });

  const input = blessed.textarea({
    parent: inputBox,
    top: 0,
    left: 1,
    width: '100%-2',
    height: 1,
    inputOnFocus: true,
    style: {
      fg: 'white',
      focus: {
        border: { fg: 'cyan' },
      },
    },
  });

  // Status bar
  const statusBar = blessed.box({
    parent: screen,
    bottom: 3,
    left: 0,
    width: '100%',
    height: 1,
    content: chalk.gray(' Tab: switch mode | Ctrl+C: exit | /help: help'),
    style: {
      fg: 'gray',
      bg: 'black',
    },
  });

  // Welcome message
  const welcomeMsg = loadedConfig.language === 'fa'
    ? 'سلام! من XYZAI هستم، دستیار برنامه‌نویسی هوش مصنوعی شما.\nیک پیام تایپ کنید یا /help را برای راهنما بزنید.'
    : 'Hello! I\'m XYZAI, your AI coding assistant.\nType a message or /help for help.';

  addMessage(chatArea, 'system', welcomeMsg);

  // Message history
  const messages: Array<{ role: string; content: string }> = [];

  // Handle input
  input.on('submit', async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    input.clearValue();
    screen.render();

    // Handle commands
    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, chatArea, screen);
      return;
    }

    // Add user message
    addMessage(chatArea, 'user', trimmed);
    messages.push({ role: 'user', content: trimmed });
    screen.render();

    // Show thinking
    const thinkingId = addMessage(chatArea, 'thinking', '🤔 ' + (loadedConfig.language === 'fa' ? 'در حال فکر کردن...' : 'Thinking...'));
    screen.render();

    // Call AI
    let fullResponse = '';
    const callbacks: AgentCallbacks = {
      onThinking: () => {},
      onToken: (token) => {
        fullResponse += token;
        updateMessage(chatArea, thinkingId, 'assistant', fullResponse);
        screen.render();
      },
      onToolCall: (name, args) => {
        addMessage(chatArea, 'tool', `🔧 ${name}`);
        screen.render();
      },
      onToolResult: (name, result) => {
        if (result.error) {
          addMessage(chatArea, 'error', `❌ ${result.error}`);
          screen.render();
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        messages.push({ role: 'assistant', content: response });
      },
      onError: (error) => {
        removeMessage(chatArea, thinkingId);
        addMessage(chatArea, 'error', `❌ Error: ${error}`);
        screen.render();
      },
    };

    await agent.chat(trimmed, callbacks);
    screen.render();
  });

  // Key bindings
  input.key(['C-c'], () => {
    process.exit(0);
  });

  screen.key(['C-c'], () => {
    process.exit(0);
  });

  // Focus input
  input.focus();
  screen.render();
}

let messageId = 0;

function addMessage(parent: any, role: string, content: string): number {
  const id = messageId++;
  const colors: Record<string, string> = {
    user: 'cyan',
    assistant: 'green',
    system: 'gray',
    thinking: 'yellow',
    tool: 'blue',
    error: 'red',
  };

  const labels: Record<string, string> = {
    user: '👤 You',
    assistant: '🤖 XYZAI',
    system: '📢 System',
    thinking: '⏳',
    tool: '🔧 Tool',
    error: '❌ Error',
  };

  const color = colors[role] || 'white';
  const label = labels[role] || role;

  const box = blessed.box({
    parent,
    width: '100%',
    height: 'auto',
    tags: true,
    content: `{${color}-fg}${label}:{/${color}-fg} ${content}`,
    style: {
      fg: 'white',
    },
  });

  (box as any)._messageId = id;

  // Auto-scroll
  parent.setScrollPerc(100);

  return id;
}

function updateMessage(parent: any, id: number, role: string, content: string): void {
  const children = parent.children || [];
  for (const child of children) {
    if ((child as any)._messageId === id) {
      const colors: Record<string, string> = {
        assistant: 'green',
        thinking: 'yellow',
      };
      const labels: Record<string, string> = {
        assistant: '🤖 XYZAI',
        thinking: '⏳',
      };
      const color = colors[role] || 'white';
      const label = labels[role] || role;
      child.setContent(`{${color}-fg}${label}:{/${color}-fg} ${content}`);
      parent.setScrollPerc(100);
      break;
    }
  }
}

function removeMessage(parent: any, id: number): void {
  const children = parent.children || [];
  for (const child of children) {
    if ((child as any)._messageId === id) {
      parent.remove(child);
      break;
    }
  }
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, chatArea: any, screen: any): void {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case '/exit':
    case '/quit':
      process.exit(0);

    case '/help':
      const helpText = config.language === 'fa'
        ? `=== راهنمای XYZAI ===

دستورات:
  /help  - نمایش راهنما
  /model - تغییر مدل
  /lang  - تغییر زبان (fa/en)
  /clear - پاک کردن مکالمه
  /exit  - خروج

ابزارها:
  خواندن و نوشتن فایل‌ها
  اجرای دستورات ترمینال
  جستجوی کد
  مرور وب`
        : `=== XYZAI Help ===

Commands:
  /help  - Show help
  /model - Change model
  /lang  - Change language (fa/en)
  /clear - Clear conversation
  /exit  - Exit

Tools:
  Read and write files
  Execute terminal commands
  Search code
  Browse the web`;
      addMessage(chatArea, 'system', helpText);
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        addMessage(chatArea, 'system', lang === 'fa' ? 'زبان به فارسی تغییر کرد' : 'Language changed to English');
      } else {
        addMessage(chatArea, 'system', 'Usage: /lang fa  or  /lang en');
      }
      break;

    case '/clear':
      agent.clearConversation();
      // Clear chat area
      while (chatArea.children.length > 0) {
        chatArea.remove(chatArea.children[0]);
      }
      addMessage(chatArea, 'system', config.language === 'fa' ? 'مکالمه پاک شد' : 'Conversation cleared');
      break;

    case '/model':
      addMessage(chatArea, 'system', `${config.language === 'fa' ? 'مدل فعلی' : 'Current model'}: ${config.model}`);
      break;

    default:
      addMessage(chatArea, 'error', config.language === 'fa' ? `دستور ناشناخته: ${command}` : `Unknown command: ${command}`);
  }

  screen.render();
}
