import * as readline from 'readline';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent.js';
import { XYZAIConfig, loadConfig } from '../config/schema.js';

const LOGO = `
  ██╗  ██╗ ██████╗ ██╗  ██╗
  ╚██╗██╔╝██╔═══██╗╚██╗██╔╝
   ╚███╔╝ ██║   ██║ ╚███╔╝
   ██╔██╗ ██║   ██║ ██╔██╗
  ██╔╝ ██╗╚██████╔╝██╔╝ ██╗
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
     ███████╗██╗  ██╗ ███████╗██╗      ██████╗ ████████╗██╗  ██╗
     ██╔════╝██║  ██║ ██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║
     ███████╗███████║ █████╗  ██║     ██║   ██║   ██║   ███████║
     ╚════██║██╔══██║ ██╔══╝  ██║     ██║   ██║   ██║   ██╔══██║
     ███████║██║  ██║ ███████╗███████╗╚██████╔╝   ██║   ██║  ██║
     ╚══════╝╚═╝  ╚═╝ ╚══════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝`;

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);

  process.stdout.write('\x1b[2J\x1b[H');

  const termWidth = process.stdout.columns || 80;
  const termHeight = process.stdout.rows || 24;

  // Draw logo
  const logoLines = LOGO.trim().split('\n');
  const logoStartY = Math.floor((termHeight - logoLines.length - 10) / 2);

  logoLines.forEach((line, i) => {
    const x = Math.floor((termWidth - line.length) / 2);
    process.stdout.write(`\x1b[${logoStartY + i};${x}H`);
    process.stdout.write(chalk.yellow(line));
  });

  // Subtitle
  const subtitle = 'AI Coding Assistant';
  const subX = Math.floor((termWidth - subtitle.length) / 2);
  process.stdout.write(`\x1b[${logoStartY + logoLines.length + 1};${subX}H`);
  process.stdout.write(chalk.gray(subtitle));

  // Input box
  const inputBoxWidth = Math.min(60, termWidth - 20);
  const inputBoxX = Math.floor((termWidth - inputBoxWidth) / 2);
  const inputBoxY = logoStartY + logoLines.length + 3;

  // Draw input box
  process.stdout.write(`\x1b[${inputBoxY};${inputBoxX}H`);
  process.stdout.write(chalk.gray('╔' + '═'.repeat(inputBoxWidth - 2) + '╗'));
  process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX}H`);
  process.stdout.write(chalk.gray('║'));
  process.stdout.write(' '.repeat(inputBoxWidth - 2));
  process.stdout.write(chalk.gray('║'));
  process.stdout.write(`\x1b[${inputBoxY + 2};${inputBoxX}H`);
  process.stdout.write(chalk.gray('╚' + '═'.repeat(inputBoxWidth - 2) + '╝'));

  // Placeholder
  process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);
  process.stdout.write(chalk.gray('Type your message... (type / for commands)'));

  // Status bar
  const statusY = termHeight - 1;
  process.stdout.write(`\x1b[${statusY};1H`);
  process.stdout.write(' '.repeat(termWidth));
  process.stdout.write(`\x1b[${statusY};2H`);
  process.stdout.write(chalk.bgCyan.black(' Build '));
  process.stdout.write(chalk.gray(' · '));
  process.stdout.write(chalk.white(loadedConfig.model));
  process.stdout.write(`\x1b[${statusY};${termWidth - 8}H`);
  process.stdout.write(chalk.gray('0.1.0'));

  // Shortcuts
  const shortcutsY = termHeight - 3;
  process.stdout.write(`\x1b[${shortcutsY};2H`);
  process.stdout.write(chalk.white('tab'));
  process.stdout.write(chalk.gray(' switch mode  '));
  process.stdout.write(chalk.white('ctrl+p'));
  process.stdout.write(chalk.gray(' settings  '));
  process.stdout.write(chalk.cyan('@'));
  process.stdout.write(chalk.gray(' attach file  '));
  process.stdout.write(chalk.cyan('$'));
  process.stdout.write(chalk.gray(' subagent  '));
  process.stdout.write(chalk.yellow('/'));
  process.stdout.write(chalk.gray(' commands'));

  // Tip
  const tipY = termHeight - 5;
  process.stdout.write(`\x1b[${tipY};2H`);
  process.stdout.write(chalk.yellow('● '));
  process.stdout.write(chalk.yellow('Tip '));
  process.stdout.write(chalk.gray('Run /login to sign in or configure your own API'));

  // Position cursor for input
  process.stdout.write(`\x1b[?25h`);
  process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
  });

  const messages: Array<{ role: string; content: string }> = [];

  rl.on('line', async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);
      return;
    }

    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, rl, messages, termWidth, termHeight);
      return;
    }

    // Clear and show chat
    process.stdout.write('\x1b[2J\x1b[H');

    // Header
    process.stdout.write(`\x1b[1;2H`);
    process.stdout.write(chalk.cyan('🔥 XYZAI'));
    process.stdout.write(chalk.gray(' | '));
    process.stdout.write(chalk.white(loadedConfig.model));

    // Messages
    let y = 3;
    for (const msg of messages) {
      y = printMessage(y, msg.role, msg.content, termWidth);
    }

    // User message
    messages.push({ role: 'user', content: trimmed });
    y = printMessage(y, 'user', trimmed, termWidth);

    // Thinking
    const thinkingY = y;
    y = printMessage(y, 'thinking', loadedConfig.language === 'fa' ? 'در حال فکر کردن...' : 'Thinking...', termWidth);

    // Input box
    process.stdout.write(`\x1b[${inputBoxY};${inputBoxX}H`);
    process.stdout.write(chalk.gray('╔' + '═'.repeat(inputBoxWidth - 2) + '╗'));
    process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX}H`);
    process.stdout.write(chalk.gray('║'));
    process.stdout.write(' '.repeat(inputBoxWidth - 2));
    process.stdout.write(chalk.gray('║'));
    process.stdout.write(`\x1b[${inputBoxY + 2};${inputBoxX}H`);
    process.stdout.write(chalk.gray('╚' + '═'.repeat(inputBoxWidth - 2) + '╝'));

    // Status bar
    process.stdout.write(`\x1b[${statusY};1H`);
    process.stdout.write(' '.repeat(termWidth));
    process.stdout.write(`\x1b[${statusY};2H`);
    process.stdout.write(chalk.bgCyan.black(' Build '));
    process.stdout.write(chalk.gray(' · '));
    process.stdout.write(chalk.white(loadedConfig.model));
    process.stdout.write(`\x1b[${statusY};${termWidth - 8}H`);
    process.stdout.write(chalk.gray('0.1.0'));

    // Call AI
    let fullResponse = '';
    const callbacks: AgentCallbacks = {
      onThinking: () => {},
      onToken: (token) => {
        fullResponse += token;
        printMessage(thinkingY, 'assistant', fullResponse, termWidth, true);
      },
      onToolCall: (name, args) => {
        y = printMessage(y, 'tool', `🔧 ${name}`, termWidth);
      },
      onToolResult: (name, result) => {
        if (result.error) {
          y = printMessage(y, 'error', `❌ ${result.error}`, termWidth);
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        messages.push({ role: 'assistant', content: response });
        // Redraw input box
        process.stdout.write(`\x1b[${inputBoxY};${inputBoxX}H`);
        process.stdout.write(chalk.gray('╔' + '═'.repeat(inputBoxWidth - 2) + '╗'));
        process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX}H`);
        process.stdout.write(chalk.gray('║'));
        process.stdout.write(' '.repeat(inputBoxWidth - 2));
        process.stdout.write(chalk.gray('║'));
        process.stdout.write(`\x1b[${inputBoxY + 2};${inputBoxX}H`);
        process.stdout.write(chalk.gray('╚' + '═'.repeat(inputBoxWidth - 2) + '╝'));
        process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);
      },
      onError: (error) => {
        y = printMessage(y, 'error', `❌ Error: ${error}`, termWidth);
        process.stdout.write(`\x1b[${inputBoxY};${inputBoxX}H`);
        process.stdout.write(chalk.gray('╔' + '═'.repeat(inputBoxWidth - 2) + '╗'));
        process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX}H`);
        process.stdout.write(chalk.gray('║'));
        process.stdout.write(' '.repeat(inputBoxWidth - 2));
        process.stdout.write(chalk.gray('║'));
        process.stdout.write(`\x1b[${inputBoxY + 2};${inputBoxX}H`);
        process.stdout.write(chalk.gray('╚' + '═'.repeat(inputBoxWidth - 2) + '╝'));
        process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);
      },
    };

    await agent.chat(trimmed, callbacks);
  });

  rl.on('close', () => {
    process.stdout.write('\x1b[?25h');
    process.stdout.write('\x1b[2J\x1b[H');
    console.log(chalk.gray(loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
    process.exit(0);
  });

  process.on('SIGINT', () => {
    process.stdout.write('\x1b[?25h');
    process.stdout.write('\x1b[2J\x1b[H');
    console.log(chalk.gray(loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
    process.exit(0);
  });
}

function printMessage(y: number, role: string, content: string, termWidth: number, overwrite?: number): number {
  const prefix: Record<string, string> = {
    user: chalk.cyan('You: '),
    assistant: chalk.green('XYZAI: '),
    thinking: chalk.yellow('⏳ '),
    tool: chalk.blue('🔧 '),
    error: chalk.red('❌ '),
  };

  const p = prefix[role] || '';
  const maxWidth = termWidth - 8;

  // Word wrap
  const words = content.split(' ');
  let lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Print lines
  for (let i = 0; i < lines.length; i++) {
    process.stdout.write(`\x1b[${y + i};4H`);
    process.stdout.write(' '.repeat(termWidth - 8));
    process.stdout.write(`\x1b[${y + i};4H`);
    if (i === 0) {
      process.stdout.write(p + lines[i]);
    } else {
      process.stdout.write(' '.repeat(p.length) + lines[i]);
    }
  }

  return y + lines.length + 1;
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, rl: readline.Interface, messages: Array<{ role: string; content: string }>, termWidth: number, termHeight: number): void {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case '/exit':
    case '/quit':
      process.stdout.write('\x1b[?25h');
      process.stdout.write('\x1b[2J\x1b[H');
      console.log(chalk.gray(config.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
      process.exit(0);

    case '/help':
      messages.push({ role: 'system', content: config.language === 'fa'
        ? '=== راهنمای XYZAI ===\n\nدستورات:\n  /help  - نمایش راهنما\n  /model - تغییر مدل\n  /lang  - تغییر زبان\n  /clear - پاک کردن مکالمه\n  /exit  - خروج\n\nابزارها:\n  • خواندن و نوشتن فایل‌ها\n  • اجرای دستورات ترمینال\n  • جستجوی کد\n  • مرور وب'
        : '=== XYZAI Help ===\n\nCommands:\n  /help  - Show help\n  /model - Change model\n  /lang  - Change language\n  /clear - Clear conversation\n  /exit  - Exit\n\nTools:\n  • Read and write files\n  • Execute terminal commands\n  • Search code\n  • Browse the web'
      });
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        messages.push({ role: 'system', content: lang === 'fa' ? '✓ زبان به فارسی تغییر کرد' : '✓ Language changed to English' });
      }
      break;

    case '/clear':
      agent.clearConversation();
      messages.length = 0;
      break;

    case '/model':
      messages.push({ role: 'system', content: `${config.language === 'fa' ? 'مدل فعلی' : 'Current model'}: ${config.model}` });
      break;

    default:
      messages.push({ role: 'error', content: config.language === 'fa' ? `دستور ناشناخته: ${command}` : `Unknown command: ${command}` });
  }

  // Redraw
  process.stdout.write('\x1b[2J\x1b[H');
  process.stdout.write(`\x1b[1;2H`);
  process.stdout.write(chalk.cyan('🔥 XYZAI'));
  process.stdout.write(chalk.gray(' | '));
  process.stdout.write(chalk.white(loadedConfig.model));

  let y = 3;
  for (const msg of messages) {
    y = printMessage(y, msg.role, msg.content, termWidth);
  }

  const inputBoxWidth = Math.min(60, termWidth - 20);
  const inputBoxX = Math.floor((termWidth - inputBoxWidth) / 2);
  const inputBoxY = termHeight - 8;

  process.stdout.write(`\x1b[${inputBoxY};${inputBoxX}H`);
  process.stdout.write(chalk.gray('╔' + '═'.repeat(inputBoxWidth - 2) + '╗'));
  process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX}H`);
  process.stdout.write(chalk.gray('║'));
  process.stdout.write(' '.repeat(inputBoxWidth - 2));
  process.stdout.write(chalk.gray('║'));
  process.stdout.write(`\x1b[${inputBoxY + 2};${inputBoxX}H`);
  process.stdout.write(chalk.gray('╚' + '═'.repeat(inputBoxWidth - 2) + '╝'));

  process.stdout.write(`\x1b[${inputBoxY + 1};${inputBoxX + 2}H`);
}
