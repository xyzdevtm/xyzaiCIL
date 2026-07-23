import * as readline from 'readline';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent';
import { XYZAIConfig, loadConfig } from '../config/schema';

// ANSI escape codes for terminal control
const ESC = '\x1b';
const CSI = ESC + '[';

function clearScreen(): void {
  process.stdout.write(CSI + '2J' + CSI + 'H');
}

function moveTo(x: number, y: number): void {
  process.stdout.write(CSI + `${y + 1};${x + 1}H`);
}

function setCursorVisible(visible: boolean): void {
  process.stdout.write(CSI + (visible ? '?25h' : '?25l'));
}

function drawBox(x: number, y: number, width: number, height: number, title?: string): void {
  // Top border
  moveTo(x, y);
  process.stdout.write(chalk.cyan('┌'));
  if (title) {
    const titleText = ` ${title} `;
    const padding = width - 2 - titleText.length;
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    process.stdout.write(chalk.cyan('─'.repeat(leftPad)));
    process.stdout.write(chalk.bold.white(titleText));
    process.stdout.write(chalk.cyan('─'.repeat(rightPad)));
  } else {
    process.stdout.write(chalk.cyan('─'.repeat(width - 2)));
  }
  process.stdout.write(chalk.cyan('┐'));

  // Side borders
  for (let i = 1; i < height - 1; i++) {
    moveTo(x, y + i);
    process.stdout.write(chalk.cyan('│'));
    process.stdout.write(' '.repeat(width - 2));
    process.stdout.write(chalk.cyan('│'));
  }

  // Bottom border
  moveTo(x, y + height - 1);
  process.stdout.write(chalk.cyan('└'));
  process.stdout.write(chalk.cyan('─'.repeat(width - 2)));
  process.stdout.write(chalk.cyan('┘'));
}

function drawText(x: number, y: number, text: string, color?: string): void {
  moveTo(x, y);
  if (color) {
    process.stdout.write((chalk as any)[color](text));
  } else {
    process.stdout.write(text);
  }
}

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);

  // Get terminal size
  const termWidth = process.stdout.columns || 80;
  const termHeight = process.stdout.rows || 24;

  // Clear and hide cursor
  clearScreen();
  setCursorVisible(false);

  // Draw UI
  const headerHeight = 3;
  const footerHeight = 3;
  const chatHeight = termHeight - headerHeight - footerHeight - 2;

  // Header
  drawBox(0, 0, termWidth, headerHeight, '🔥 XYZAI');
  drawText(2, 1, 'AI Coding Assistant', 'white');
  drawText(termWidth - 30, 1, loadedConfig.model, 'gray');

  // Chat area
  drawBox(0, headerHeight, termWidth, chatHeight + 2);

  // Footer
  drawBox(0, termHeight - footerHeight, termWidth, footerHeight);
  drawText(2, termHeight - footerHeight + 1, loadedConfig.language === 'fa' ? 'پیام خود را تایپ کنید...' : 'Type your message...', 'gray');
  drawText(2, termHeight - 1, '/help', 'yellow');
  drawText(10, termHeight - 1, loadedConfig.language === 'fa' ? 'برای راهنما' : 'for help', 'gray');

  // Welcome message
  const welcomeY = headerHeight + 1;
  const welcomeMsg = loadedConfig.language === 'fa'
    ? 'سلام! من XYZAI هستم، دستیار برنامه‌نویسی هوش مصنوعی شما.'
    : "Hello! I'm XYZAI, your AI coding assistant.";
  drawText(2, welcomeY, welcomeMsg, 'green');

  const helpMsg = loadedConfig.language === 'fa'
    ? 'یک پیام تایپ کنید یا /help برای راهنما'
    : 'Type a message or /help for help';
  drawText(2, welcomeY + 1, helpMsg, 'gray');

  // Show cursor and position for input
  setCursorVisible(true);
  const inputY = termHeight - footerHeight + 1;
  moveTo(2, inputY);

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
  });

  // Store messages for display
  const messages: Array<{ role: string; content: string; y: number }> = [];
  let currentY = welcomeY + 3;

  // Handle input
  process.stdout.write(chalk.cyan('> '));
  rl.on('line', async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      process.stdout.write(chalk.cyan('> '));
      return;
    }

    // Handle commands
    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, rl, messages, currentY);
      return;
    }

    // Add user message
    clearScreen();
    redrawUI(loadedConfig, messages, termWidth, termHeight, headerHeight, footerHeight, chatHeight);

    // Re-add user message
    messages.push({ role: 'user', content: trimmed, y: currentY });
    currentY = printMessage(currentY, 'user', trimmed, termWidth);

    // Show thinking
    const thinkingY = currentY;
    currentY = printMessage(currentY, 'thinking', loadedConfig.language === 'fa' ? 'در حال فکر کردن...' : 'Thinking...', termWidth);

    // Call AI
    let fullResponse = '';
    const callbacks: AgentCallbacks = {
      onThinking: () => {},
      onToken: (token) => {
        fullResponse += token;
        // Update thinking message with response
        currentY = printMessage(thinkingY, 'assistant', fullResponse, termWidth, true);
      },
      onToolCall: (name, args) => {
        currentY = printMessage(currentY, 'tool', `🔧 ${name}`, termWidth);
      },
      onToolResult: (name, result) => {
        if (result.error) {
          currentY = printMessage(currentY, 'error', `❌ ${result.error}`, termWidth);
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        messages.push({ role: 'assistant', content: response, y: thinkingY });
        printFooter(loadedConfig, termWidth, termHeight, footerHeight);
        process.stdout.write(chalk.cyan('> '));
      },
      onError: (error) => {
        currentY = printMessage(currentY, 'error', `❌ Error: ${error}`, termWidth);
        printFooter(loadedConfig, termWidth, termHeight, footerHeight);
        process.stdout.write(chalk.cyan('> '));
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
  const prefix: Record<string, string> = {
    user: chalk.cyan('  شما: '),
    assistant: chalk.green('  XYZAI: '),
    thinking: chalk.yellow('  ⏳ '),
    tool: chalk.blue('  🔧 '),
    error: chalk.red('  ❌ '),
    system: chalk.gray('  📢 '),
  };

  const p = prefix[role] || '  ';
  const maxWidth = termWidth - 4;

  // Word wrap
  const words = content.split(' ');
  let lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Print lines
  for (let i = 0; i < lines.length; i++) {
    moveTo(2, y + i);
    process.stdout.write(' '.repeat(termWidth - 4));
    moveTo(2, y + i);
    if (i === 0) {
      process.stdout.write(p + lines[i]);
    } else {
      process.stdout.write(' '.repeat(p.length) + lines[i]);
    }
  }

  return y + lines.length + 1;
}

function redrawUI(config: XYZAIConfig, messages: Array<{ role: string; content: string; y: number }>, termWidth: number, termHeight: number, headerHeight: number, footerHeight: number, chatHeight: number): void {
  clearScreen();

  // Header
  drawBox(0, 0, termWidth, headerHeight, '🔥 XYZAI');
  drawText(2, 1, 'AI Coding Assistant', 'white');
  drawText(termWidth - 30, 1, config.model, 'gray');

  // Chat area
  drawBox(0, headerHeight, termWidth, chatHeight + 2);

  // Redraw messages
  let y = headerHeight + 1;
  for (const msg of messages) {
    y = printMessage(y, msg.role, msg.content, termWidth);
  }

  // Update current Y
  printFooter(config, termWidth, termHeight, footerHeight);
}

function printFooter(config: XYZAIConfig, termWidth: number, termHeight: number, footerHeight: number): void {
  drawBox(0, termHeight - footerHeight, termWidth, footerHeight);
  drawText(2, termHeight - footerHeight + 1, config.language === 'fa' ? 'پیام خود را تایپ کنید...' : 'Type your message...', 'gray');
  drawText(2, termHeight - 1, '/help', 'yellow');
  drawText(10, termHeight - 1, config.language === 'fa' ? 'برای راهنما' : 'for help', 'gray');
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, rl: readline.Interface, messages: Array<{ role: string; content: string; y: number }>, currentY: number): void {
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

      messages.push({ role: 'system', content: helpText, y: currentY });
      printFooter(config, process.stdout.columns || 80, process.stdout.rows || 24, 3);
      process.stdout.write(chalk.cyan('> '));
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        messages.push({ role: 'system', content: lang === 'fa' ? '✓ زبان به فارسی تغییر کرد' : '✓ Language changed to English', y: currentY });
      } else {
        messages.push({ role: 'system', content: 'Usage: /lang fa  or  /lang en', y: currentY });
      }
      printFooter(config, process.stdout.columns || 80, process.stdout.rows || 24, 3);
      process.stdout.write(chalk.cyan('> '));
      break;

    case '/clear':
      agent.clearConversation();
      messages.length = 0;
      printFooter(config, process.stdout.columns || 80, process.stdout.rows || 24, 3);
      process.stdout.write(chalk.cyan('> '));
      break;

    case '/model':
      messages.push({ role: 'system', content: `${config.language === 'fa' ? 'مدل فعلی' : 'Current model'}: ${config.model}`, y: currentY });
      printFooter(config, process.stdout.columns || 80, process.stdout.rows || 24, 3);
      process.stdout.write(chalk.cyan('> '));
      break;

    default:
      messages.push({ role: 'error', content: config.language === 'fa' ? `دستور ناشناخته: ${command}` : `Unknown command: ${command}`, y: currentY });
      printFooter(config, process.stdout.columns || 80, process.stdout.rows || 24, 3);
      process.stdout.write(chalk.cyan('> '));
  }
}
