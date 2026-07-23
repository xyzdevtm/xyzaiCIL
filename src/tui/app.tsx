import React from 'react';
import { render, Box, Text, useInput, useApp, useState, useEffect } from 'ink';
import { Chat } from './components/chat';
import { Agent } from '../core/agent';
import { loadConfig, XYZAIConfig } from '../config/schema';
import { ensureAllDirs } from '../utils/paths';
import chalk from 'chalk';

export interface AppProps {
  initialConfig?: XYZAIConfig;
}

const App: React.FC<AppProps> = ({ initialConfig }) => {
  const [config] = useState<XYZAIConfig>(initialConfig || loadConfig());
  const [agent] = useState<Agent>(() => new Agent(config));
  const { exit } = useApp();

  useEffect(() => {
    ensureAllDirs();
  }, []);

  return <Chat agent={agent} config={config} />;
};

export function startTUI(config?: XYZAIConfig): void {
  const loadedConfig = config || loadConfig();

  // Set console encoding for RTL support
  if (process.platform === 'win32') {
    try {
      // Try to set UTF-8 mode
      const { execSync } = require('child_process');
      execSync('chcp 65001', { stdio: 'ignore' });
    } catch {}
  }

  // Enable chalk
  chalk.level = 3;

  const { waitUntilExit } = render(
    <App initialConfig={loadedConfig} />,
    {
      exitOnCtrlC: true,
      patches: [],
    }
  );

  waitUntilExit().then(() => {
    process.exit(0);
  });
}
