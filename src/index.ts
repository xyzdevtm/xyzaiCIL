#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, saveConfig } from './config/schema';
import { ensureAllDirs } from './utils/paths';
import { Agent } from './core/agent';
import { readFileSync } from 'fs';
import { join } from 'path';

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

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
    const { startTUI } = await import('./tui/app.js');
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

    console.log(chalk.cyan('🤖 XYZAI'));
    console.log(chalk.gray('─'.repeat(40)));

    const callbacks = {
      onThinking: () => {
        process.stdout.write(chalk.yellow('🤔 Thinking...\r'));
      },
      onToken: (token: string) => {
        process.stdout.write(token);
      },
      onToolCall: (name: string, args: any) => {
        process.stdout.write(chalk.gray(`\n🔧 ${name}\n`));
      },
      onToolResult: (name: string, result: any) => {
        if (result.error) {
          console.log(chalk.red(`❌ ${result.error}`));
        }
      },
      onPermission: async () => true,
      onDone: (response: string) => {
        console.log('');
      },
      onError: (error: string) => {
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
  .option('-l, --list', 'List all config')
  .action((options: any) => {
    ensureAllDirs();
    const config = loadConfig();

    if (options.list) {
      console.log(chalk.cyan('XYZAI Configuration:'));
      console.log(JSON.stringify(config, null, 2));
      return;
    }

    console.log(chalk.gray('Use --list to show config'));
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
  .action(async () => {
    ensureAllDirs();
    const { startTUI } = await import('./tui/app.js');
    startTUI();
  });

program.parse();
