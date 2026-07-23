#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, saveConfig, XYZAIConfig } from './config/schema';
import { ensureAllDirs } from './utils/paths';
import { Agent, AgentCallbacks } from './core/agent';
import { ToolRegistry, ToolContext } from './tools/registry';

const pkg = require('../package.json');

const program = new Command();

program
  .name('xyzai')
  .description('XYZAI - AI Coding Assistant CLI')
  .version(pkg.version);

// Interactive TUI mode (default)
program
  .command('chat')
  .description('Start interactive chat')
  .action(async () => {
    ensureAllDirs();
    const { startTUI } = await import('./tui/app');
    startTUI();
  });

// Headless/one-shot mode
program
  .command('run')
  .description('Run a single prompt (headless mode)')
  .argument('<prompt>', 'The prompt to send')
  .option('-m, --model <model>', 'Model to use')
  .option('-l, --language <lang>', 'Language (en/fa)')
  .action(async (prompt: string, options: any) => {
    ensureAllDirs();
    const config = loadConfig();

    if (options.model) config.model = options.model;
    if (options.language) config.language = options.language;

    const agent = new Agent(config);
    const toolRegistry = new ToolRegistry();

    console.log(chalk.cyan('🤖 XYZAI'));
    console.log(chalk.gray('─'.repeat(40)));

    let output = '';

    const callbacks: AgentCallbacks = {
      onThinking: () => {
        process.stdout.write(chalk.yellow('🤔 Thinking...\r'));
      },
      onToken: (token) => {
        process.stdout.write(token);
      },
      onToolCall: (name, args) => {
        process.stdout.write(chalk.gray(`\n🔧 ${name}\n`));
      },
      onToolResult: (name, result) => {
        if (result.error) {
          console.log(chalk.red(`❌ ${result.error}`));
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        console.log('');
      },
      onError: (error) => {
        console.error(chalk.red(`\n❌ Error: ${error}`));
        process.exit(1);
      },
    };

    await agent.chat(prompt, callbacks);
    process.exit(0);
  });

// Config management
program
  .command('config')
  .description('Manage configuration')
  .option('-g, --get <key>', 'Get config value')
  .option('-s, --set <key> <value>', 'Set config value')
  .option('-l, --list', 'List all config')
  .action((options: any) => {
    ensureAllDirs();
    const config = loadConfig();

    if (options.list) {
      console.log(chalk.cyan('XYZAI Configuration:'));
      console.log(JSON.stringify(config, null, 2));
      return;
    }

    if (options.get) {
      const value = (config as any)[options.get];
      console.log(value !== undefined ? JSON.stringify(value) : 'Not set');
      return;
    }

    console.log(chalk.gray('Use --list, --get <key>, or --set <key> <value>'));
  });

// List models
program
  .command('models')
  .description('List available models')
  .action(() => {
    ensureAllDirs();
    const config = loadConfig();

    console.log(chalk.cyan('Available Models:'));
    console.log(chalk.gray('─'.repeat(40)));

    for (const provider of config.providers) {
      console.log(chalk.green(`\n${provider.name}:`));
      for (const [id, model] of Object.entries(provider.models)) {
        const freeTag = model.free ? chalk.green(' (FREE)') : '';
        console.log(chalk.white(`  ${provider.id}/${id} - ${model.name}${freeTag}`));
      }
    }
  });

// Session management
program
  .command('sessions')
  .description('List recent sessions')
  .action(() => {
    ensureAllDirs();
    const { SessionManager } = require('./core/session');
    const sm = new SessionManager();
    const sessions = sm.list();

    if (sessions.length === 0) {
      console.log(chalk.gray('No sessions found.'));
      return;
    }

    console.log(chalk.cyan('Recent Sessions:'));
    for (const session of sessions.slice(0, 10)) {
      const date = new Date(session.updated).toLocaleString();
      console.log(chalk.white(`  ${session.id} - ${session.model} - ${date}`));
    }
  });

// Language switch
program
  .command('lang')
  .description('Change language')
  .argument('[language]', 'Language code (en/fa)')
  .action((language?: string) => {
    ensureAllDirs();
    const config = loadConfig();

    if (!language) {
      console.log(chalk.cyan(`Current language: ${config.language}`));
      console.log(chalk.gray('Usage: xyzai lang <en|fa>'));
      return;
    }

    if (language !== 'en' && language !== 'fa') {
      console.log(chalk.red('Language must be "en" or "fa"'));
      return;
    }

    config.language = language;
    saveConfig(config);
    console.log(chalk.green(`Language changed to ${language === 'fa' ? 'فارسی' : 'English'}`));
  });

// Default command - launch TUI
program
  .action(() => {
    ensureAllDirs();
    const { startTUI } = require('./tui/app');
    startTUI();
  });

program.parse();
