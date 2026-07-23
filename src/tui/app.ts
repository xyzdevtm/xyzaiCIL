import * as readline from 'readline';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent';
import { XYZAIConfig, loadConfig } from '../config/schema';

const XYZAI_LOGO = `
    ▓█████▄▄▄█████▓
    ▒██▀ ▒██▓ ▒██▒ ▒██▒
    ░██   ▒▓██░ ▒██░ ▒██░
    ░██▓  ▒██▒ ▒██▒ ▒██▒
    ░ ▒▓▓▓░██▒ ░██████▒░
       ░▒██████░░   ░▒▓▓▓░
`;

function getTermSize(): { width: number; height: number } {
  return {
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24,
  };
}

function clearScreen(): void {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[H');
}

function moveTo(x: number, y: number): void {
  process.stdout.write(`\x1b[${y};${x}H`);
}

function setCursorVisible(visible: boolean): void {
  process.stdout.write(visible ? '\x1b[?25h' : '\x1b[?25l');
}

function drawCentered(y: number, text: string, color?: string): void {
  const { width } = getTermSize();
  const x = Math.floor((width - text.length) / 2);
  moveTo(x, y);
  if (color && (chalk as any)[color]) {
    process.stdout.write((chalk as any)[color](text));
  } else {
    process.stdout.write(text);
  }
}

function drawBox(x: number, y: number, width: number, height: number, options?: { borderColor?: string; fillColor?: string }): void {
  const border = options?.borderColor || 'cyan';
  const borderFn = (chalk as any)[border] || chalk.cyan;

  // Top border
  moveTo(x, y);
  process.stdout.write(borderFn('╔' + '═'.repeat(width - 2) + '╗'));

  // Side borders
  for (let i = 1; i < height - 1; i++) {
    moveTo(x, y + i);
    process.stdout.write(borderFn('║'));
    process.stdout.write(' '.repeat(width - 2));
    process.stdout.write(borderFn('║'));
  }

  // Bottom border
  moveTo(x, y + height - 1);
  process.stdout.write(borderFn('╚' + '═'.repeat(width - 2) + '╝'));
}

function drawStatusBar(config: XYZAIConfig, termHeight: number): void {
  const { width } = getTermSize();
  const statusY = termHeight - 1;

  // Status bar background
  moveTo(1, statusY);
  process.stdout.write(' '.repeat(width - 2));

  // Left side: mode and model
  moveTo(2, statusY);
  process.stdout.write(chalk.bgCyan.black(' Build '));
  process.stdout.write(chalk.gray(' · '));
  process.stdout.write(chalk.white(config.model));

  // Right side: version
  moveTo(width - 8, statusY);
  process.stdout.write(chalk.gray('0.1.0'));
}

function drawShortcuts(termHeight: number): void {
  const { width } = getTermSize();
  const shortcutsY = termHeight - 3;

  moveTo(2, shortcutsY);
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
}

function drawTip(config: XYZAIConfig, termHeight: number): void {
  const { width } = getTermSize();
  const tipY = termHeight - 5;

  moveTo(2, tipY);
  process.stdout.write(chalk.yellow('● '));
  process.stdout.write(chalk.yellow('Tip '));
  if (config.language === 'fa') {
    process.stdout.write(chalk.gray('برای ورود /login را تایپ کنید یا API خود را تنظیم کنید'));
  } else {
    process.stdout.write(chalk.gray('Run /login to sign in or configure your own API'));
  }
}

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);
  const { width, height } = getTermSize();

  // Clear and hide cursor
  clearScreen();
  setCursorVisible(false);

  // Draw logo
  const logoLines = XYZAI_LOGO.trim().split('\n');
  const logoStartY = Math.floor(height / 2) - logoLines.length - 4;
  logoLines.forEach((line, i) => {
    drawCentered(logoStartY + i, line, 'yellow');
  });

  // Draw "Xiaomi" subtitle
  drawCentered(logoStartY + logoLines.length + 1, 'Xiaomi', 'gray');

  // Draw input box
  const inputBoxWidth = Math.min(60, width - 20);
  const inputBoxX = Math.floor((width - inputBoxWidth) / 2);
  const inputBoxY = logoStartY + logoLines.length + 3;

  drawBox(inputBoxX, inputBoxY, inputBoxWidth, 3, { borderColor: 'gray' });

  // Input placeholder
  moveTo(inputBoxX + 2, inputBoxY + 1);
  process.stdout.write(chalk.gray('Type your message... (type / for commands)'));

  // Status bar
  drawStatusBar(loadedConfig, height);

  // Shortcuts
  drawShortcuts(height);

  // Tip
  drawTip(loadedConfig, height);

  // Show cursor for input
  setCursorVisible(true);
  moveTo(inputBoxX + 2, inputBoxY + 1);

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
  });

  // Messages storage
  const messages: Array<{ role: string; content: string }> = [];

  // Handle input
  rl.on('line', async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      moveTo(inputBoxX + 2, inputBoxY + 1);
      return;
    }

    // Handle commands
    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, rl, messages);
      return;
    }

    // Clear and redraw for new message
    clearScreen();
    setCursorVisible(false);

    // Show header
    drawCentered(2, '🔥 XYZAI', 'cyan');
    drawCentered(3, loadedConfig.model, 'gray');

    // Show messages
    let y = 5;
    for (const msg of messages) {
      y = printMessage(y, msg.role, msg.content, width);
    }

    // Add user message
    messages.push({ role: 'user', content: trimmed });
    y = printMessage(y, 'user', trimmed, width);

    // Show thinking
    const thinkingY = y;
    y = printMessage(y, 'thinking', loadedConfig.language === 'fa' ? 'در حال فکر کردن...' : 'Thinking...', width);

    // Draw input box at bottom
    drawBox(inputBoxX, inputBoxY, inputBoxWidth, 3, { borderColor: 'gray' });
    drawStatusBar(loadedConfig, height);
    drawShortcuts(height);
    drawTip(loadedConfig, height);

    // Call AI
    let fullResponse = '';
    const callbacks: AgentCallbacks = {
      onThinking: () => {},
      onToken: (token) => {
        fullResponse += token;
        printMessage(thinkingY, 'assistant', fullResponse, width, true);
      },
      onToolCall: (name, args) => {
        y = printMessage(y, 'tool', `🔧 ${name}`, width);
      },
      onToolResult: (name, result) => {
        if (result.error) {
          y = printMessage(y, 'error', `❌ ${result.error}`, width);
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        messages.push({ role: 'assistant', content: response });
        // Redraw input box
        drawBox(inputBoxX, inputBoxY, inputBoxWidth, 3, { borderColor: 'gray' });
        drawStatusBar(loadedConfig, height);
        setCursorVisible(true);
        moveTo(inputBoxX + 2, inputBoxY + 1);
      },
      onError: (error) => {
        y = printMessage(y, 'error', `❌ Error: ${error}`, width);
        drawBox(inputBoxX, inputBoxY, inputBoxWidth, 3, { borderColor: 'gray' });
        drawStatusBar(loadedConfig, height);
        setCursorVisible(true);
        moveTo(inputBoxX + 2, inputBoxY + 1);
      },
    };

    await agent.chat(trimmed, callbacks);
  });

  rl.on('close', () => {
    setCursorVisible(true);
    clearScreen();
    console.log(chalk.gray(loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
    process.exit(0);
  });

  process.on('SIGINT', () => {
    setCursorVisible(true);
    clearScreen();
    console.log(chalk.gray(loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
    process.exit(0);
  });
}

function printMessage(y: number, role: string, content: string, termWidth: number, overwrite?: number): number {
  const { width } = getTermSize();
  const prefix: Record<string, string> = {
    user: chalk.cyan('You: '),
    assistant: chalk.green('XYZAI: '),
    thinking: chalk.yellow('⏳ '),
    tool: chalk.blue('🔧 '),
    error: chalk.red('❌ '),
  };

  const p = prefix[role] || '';
  const maxWidth = width - 8;

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
    moveTo(4, y + i);
    process.stdout.write(' '.repeat(width - 8));
    moveTo(4, y + i);
    if (i === 0) {
      process.stdout.write(p + lines[i]);
    } else {
      process.stdout.write(' '.repeat(p.length) + lines[i]);
    }
  }

  return y + lines.length + 1;
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, rl: readline.Interface, messages: Array<{ role: string; content: string }>): void {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case '/exit':
    case '/quit':
      setCursorVisible(true);
      clearScreen();
      console.log(chalk.gray(config.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
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
  • خواندن و نوشتن فایل‌ها
  • اجرای دستورات ترمینال
  • جستجوی کد
  • مرور وب`
        : `=== XYZAI Help ===

Commands:
  /help  - Show help
  /model - Change model
  /lang  - Change language (fa/en)
  /clear - Clear conversation
  /exit  - Exit

Tools:
  • Read and write files
  • Execute terminal commands
  • Search code
  • Browse the web`;

      messages.push({ role: 'system', content: helpText });
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        messages.push({ role: 'system', content: lang === 'fa' ? '✓ زبان به فارسی تغییر کرد' : '✓ Language changed to English' });
      } else {
        messages.push({ role: 'system', content: 'Usage: /lang fa  or  /lang en' });
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
  clearScreen();
  setCursorVisible(false);
  const { width, height } = getTermSize();

  drawCentered(2, '🔥 XYZAI', 'cyan');
  drawCentered(3, config.model, 'gray');

  let y = 5;
  for (const msg of messages) {
    y = printMessage(y, msg.role, msg.content, width);
  }

  const inputBoxWidth = Math.min(60, width - 20);
  const inputBoxX = Math.floor((width - inputBoxWidth) / 2);
  const inputBoxY = height - 8;

  drawBox(inputBoxX, inputBoxY, inputBoxWidth, 3, { borderColor: 'gray' });
  drawStatusBar(config, height);
  drawShortcuts(height);
  drawTip(config, height);

  setCursorVisible(true);
  moveTo(inputBoxX + 2, inputBoxY + 1);
}
