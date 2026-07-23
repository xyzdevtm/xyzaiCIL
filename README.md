# 🔥 XYZAI - AI Coding Assistant CLI

A powerful AI coding assistant CLI with Persian/Farsi support, built with TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## Features

- **Multiple AI Providers**: MiMo, DeepSeek, Gemini, Qwen, OpenRouter, and more
- **Free Models**: Use MiMo Auto, Gemini Flash, Llama, Mistral for free
- **Bilingual**: Persian (فارسی) and English support
- **RTL Text**: Proper right-to-left text rendering for Persian/Arabic
- **Rich Tools**: File operations, terminal commands, code search, web fetch
- **Permission System**: Configurable security with glob patterns
- **Session Management**: Save and resume conversations

## Installation

### From npm (recommended)
```bash
npm install -g xyzai
```

### From GitHub
```bash
npm install -g github:xyzai/xyzai
```

### From source
```bash
git clone https://github.com/xyzai/xyzai.git
cd xyzai
npm install
npm run build
npm link
```

## Quick Start

```bash
# Launch interactive chat
xyzai

# Or run a single command
xyzai run "Write a hello world in Python"

# List available models
xyzai models

# Change language to Persian
xyzai lang fa
```

## Commands

| Command | Description |
|---------|-------------|
| `xyzai` | Launch interactive chat (default) |
| `xyzai chat` | Start interactive chat |
| `xyzai run <prompt>` | Run a single prompt (headless mode) |
| `xyzai models` | List available AI models |
| `xyzai config` | Manage configuration |
| `xyzai lang <en\|fa>` | Change language |
| `xyzai sessions` | List recent sessions |

## Supported Providers

| Provider | Free Models | API Key Required |
|----------|------------|------------------|
| MiMo Auto | mimo-auto, mimo-v2.5-pro | No |
| DeepSeek | deepseek-chat, deepseek-coder | Yes |
| Gemini | gemini-2.0-flash, gemini-2.5-flash | Yes |
| Qwen | qwen-turbo, qwen-plus | Yes |
| OpenRouter | Llama 3.3, Mistral 7B | Yes |

## Tools

- **File Read/Write/Edit**: Read and modify files
- **Bash**: Execute shell commands
- **Glob**: Find files by pattern
- **Grep**: Search file contents
- **WebFetch**: Fetch web content

## Configuration

XYZAI stores configuration in `~/.config/xyzai/config.json`:

```json
{
  "model": "mimo/mimo-auto",
  "language": "en",
  "maxTokens": 4096,
  "temperature": 0.7
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Development mode (watch)
npm run dev
```

## License

MIT © XYZAI Team
