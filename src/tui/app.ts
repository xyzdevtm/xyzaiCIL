import * as readline from 'readline';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent';
import { XYZAIConfig, loadConfig } from '../config/schema';

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);

  // Clear screen
  process.stdout.write('\x1Bc');

  // Show banner
  printBanner(loadedConfig);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  promptUser(rl, loadedConfig);

  rl.on('line', async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      promptUser(rl, loadedConfig);
      return;
    }

    // Handle commands
    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, rl);
      return;
    }

    // Send to AI
    const callbacks: AgentCallbacks = {
      onThinking: () => {
        process.stdout.write(chalk.yellow('  ⏳ Thinking...\r'));
      },
      onToken: (token) => {
        process.stdout.write(token);
      },
      onToolCall: (name, args) => {
        process.stdout.write(chalk.blue(`\n  🔧 ${name}\n`));
      },
      onToolResult: (name, result) => {
        if (result.error) {
          process.stdout.write(chalk.red(`  ❌ ${result.error}\n`));
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        process.stdout.write('\n\n');
        promptUser(rl, loadedConfig);
      },
      onError: (error) => {
        process.stdout.write(chalk.red(`\n  ❌ Error: ${error}\n\n`));
        promptUser(rl, loadedConfig);
      },
    };

    process.stdout.write('\n');
    await agent.chat(trimmed, callbacks);
  });

  rl.on('close', () => {
    console.log(chalk.gray('\n' + (loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!')));
    process.exit(0);
  });

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log(chalk.gray('\n' + (loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!')));
    process.exit(0);
  });
}

function printBanner(config: XYZAIConfig): void {
  const width = 50;
  const line = '─'.repeat(width);

  console.log('');
  console.log(chalk.cyan('  ╔' + line + '╗'));
  console.log(chalk.cyan('  ║') + chalk.bold.white('  🔥 XYZAI') + chalk.gray(' - AI Coding Assistant') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.gray('  ' + config.model.padEnd(width - 2)) + chalk.cyan('║'));
  console.log(chalk.cyan('  ╚' + line + '╝'));
  console.log('');

  if (config.language === 'fa') {
    console.log(chalk.white('  سلام! من XYZAI هستم، دستیار برنامه‌نویسی هوش مصنوعی شما.'));
    console.log(chalk.gray('  یک پیام تایپ کنید یا ') + chalk.yellow('/help') + chalk.gray(' برای راهنما'));
  } else {
    console.log(chalk.white("  Hello! I'm XYZAI, your AI coding assistant."));
    console.log(chalk.gray('  Type a message or ') + chalk.yellow('/help') + chalk.gray(' for help'));
  }
  console.log('');
}

function promptUser(rl: readline.Interface, config: XYZAIConfig): void {
  const prompt = config.language === 'fa'
    ? chalk.cyan('  شما ❯ ')
    : chalk.cyan('  You ❯ ');
  rl.question(prompt, () => {});
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, rl: readline.Interface): void {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case '/exit':
    case '/quit':
      console.log(chalk.gray(config.language === 'fa' ? '\n  خداحافظ!' : '\n  Goodbye!'));
      process.exit(0);

    case '/help':
      console.log('');
      if (config.language === 'fa') {
        console.log(chalk.bold.cyan('  ═══════════════ راهنمای XYZAI ═══════════════'));
        console.log('');
        console.log(chalk.white('  دستورات:'));
        console.log(chalk.gray('    /help  - نمایش راهنما'));
        console.log(chalk.gray('    /model - تغییر مدل'));
        console.log(chalk.gray('    /lang  - تغییر زبان (fa/en)'));
        console.log(chalk.gray('    /clear - پاک کردن مکالمه'));
        console.log(chalk.gray('    /exit  - خروج'));
        console.log('');
        console.log(chalk.white('  ابزارها:'));
        console.log(chalk.gray('    • خواندن و نوشتن فایل‌ها'));
        console.log(chalk.gray('    • اجرای دستورات ترمینال'));
        console.log(chalk.gray('    • جستجوی کد'));
        console.log(chalk.gray('    • مرور وب'));
      } else {
        console.log(chalk.bold.cyan('  ═══════════════ XYZAI Help ═══════════════'));
        console.log('');
        console.log(chalk.white('  Commands:'));
        console.log(chalk.gray('    /help  - Show help'));
        console.log(chalk.gray('    /model - Change model'));
        console.log(chalk.gray('    /lang  - Change language (fa/en)'));
        console.log(chalk.gray('    /clear - Clear conversation'));
        console.log(chalk.gray('    /exit  - Exit'));
        console.log('');
        console.log(chalk.white('  Tools:'));
        console.log(chalk.gray('    • Read and write files'));
        console.log(chalk.gray('    • Execute terminal commands'));
        console.log(chalk.gray('    • Search code'));
        console.log(chalk.gray('    • Browse the web'));
      }
      console.log('');
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        console.log(chalk.green(lang === 'fa' ? '\n  ✓ زبان به فارسی تغییر کرد\n' : '\n  ✓ Language changed to English\n'));
      } else {
        console.log(chalk.gray('\n  Usage: /lang fa  or  /lang en\n'));
      }
      break;

    case '/clear':
      agent.clearConversation();
      console.log(chalk.green(config.language === 'fa' ? '\n  ✓ مکالمه پاک شد\n' : '\n  ✓ Conversation cleared\n'));
      break;

    case '/model':
      console.log(chalk.cyan(config.language === 'fa' ? '\n  مدل فعلی:' : '\n  Current model:'));
      console.log(chalk.white(`  ${config.model}\n`));
      break;

    default:
      console.log(chalk.red(config.language === 'fa' ? `\n  ❌ دستور ناشناخته: ${command}\n` : `\n  ❌ Unknown command: ${command}\n`));
  }

  promptUser(rl, config);
}
