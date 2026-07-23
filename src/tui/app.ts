import * as readline from 'readline';
import chalk from 'chalk';
import { Agent, AgentCallbacks } from '../core/agent';
import { XYZAIConfig } from '../config/schema';
import { containsRTL } from '../rtl/bidi';

export function startTUI(config?: XYZAIConfig): void {
  const { loadConfig } = require('../config/schema');
  const loadedConfig = config || loadConfig();
  const agent = new Agent(loadedConfig);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan('xyzai ❯ '),
  });

  // Show welcome message
  console.log('');
  console.log(chalk.bold.cyan('🔥 XYZAI - AI Coding Assistant'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(chalk.white(loadedConfig.language === 'fa'
    ? 'سلام! من XYZAI هستم. یک پیام تایپ کنید. /help برای راهنما'
    : 'Hello! I\'m XYZAI. Type a message. /help for help'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log('');

  rl.prompt();

  rl.on('line', async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      rl.prompt();
      return;
    }

    // Handle commands
    if (trimmed.startsWith('/')) {
      handleCommand(trimmed, loadedConfig, agent, rl);
      return;
    }

    // Send to AI
    let output = '';
    const callbacks: AgentCallbacks = {
      onThinking: () => {
        process.stdout.write(chalk.yellow('🤔 Thinking...\r'));
      },
      onToken: (token) => {
        process.stdout.write(token);
      },
      onToolCall: (name, args) => {
        console.log(chalk.gray(`\n  🔧 ${name}`));
      },
      onToolResult: (name, result) => {
        if (result.error) {
          console.log(chalk.red(`  ❌ ${result.error}`));
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        console.log('');
        console.log('');
      },
      onError: (error) => {
        console.log(chalk.red(`\n❌ Error: ${error}`));
      },
    };

    await agent.chat(trimmed, callbacks);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log(chalk.gray('\n' + (loadedConfig.language === 'fa' ? 'خداحافظ!' : 'Goodbye!')));
    process.exit(0);
  });
}

function handleCommand(cmd: string, config: XYZAIConfig, agent: any, rl: readline.Interface): void {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case '/exit':
    case '/quit':
      console.log(chalk.gray(config.language === 'fa' ? 'خداحافظ!' : 'Goodbye!'));
      process.exit(0);

    case '/help':
      console.log('');
      console.log(chalk.bold.cyan(config.language === 'fa' ? '=== راهنمای XYZAI ===' : '=== XYZAI Help ==='));
      console.log('');
      console.log(chalk.white(config.language === 'fa' ? 'دستورات:' : 'Commands:'));
      console.log(chalk.gray('  /help  - ' + (config.language === 'fa' ? 'نمایش راهنما' : 'Show help')));
      console.log(chalk.gray('  /model - ' + (config.language === 'fa' ? 'تغییر مدل' : 'Change model')));
      console.log(chalk.gray('  /lang  - ' + (config.language === 'fa' ? 'تغییر زبان (fa/en)' : 'Change language (fa/en)')));
      console.log(chalk.gray('  /clear - ' + (config.language === 'fa' ? 'پاک کردن مکالمه' : 'Clear conversation')));
      console.log(chalk.gray('  /exit  - ' + (config.language === 'fa' ? 'خروج' : 'Exit')));
      console.log('');
      break;

    case '/lang':
      const lang = parts[1] as 'en' | 'fa';
      if (lang === 'en' || lang === 'fa') {
        config.language = lang;
        agent.setLanguage(lang);
        console.log(chalk.green(lang === 'fa' ? 'زبان به فارسی تغییر کرد' : 'Language changed to English'));
      } else {
        console.log(chalk.gray('Usage: /lang fa  or  /lang en'));
      }
      break;

    case '/clear':
      agent.clearConversation();
      console.log(chalk.green(config.language === 'fa' ? 'مکالمه پاک شد' : 'Conversation cleared'));
      break;

    case '/model':
      console.log(chalk.cyan(config.language === 'fa' ? 'مدل فعلی:' : 'Current model:'));
      console.log(chalk.white(`  ${config.model}`));
      console.log(chalk.gray(config.language === 'fa' ? 'برای تغییر، مدل را در config تنظیم کنید' : 'Change in config file'));
      break;

    default:
      console.log(chalk.red(config.language === 'fa' ? `دستور ناشناخته: ${command}` : `Unknown command: ${command}`));
  }

  rl.prompt();
}
