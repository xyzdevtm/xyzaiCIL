import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execSync, spawn } from 'child_process';
import { XYZAIConfig, PermissionRule } from '../config/schema';
import { minimatch } from '../utils/glob';
import chalk from 'chalk';

export interface ToolResult {
  output: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface ToolContext {
  workDir: string;
  config: XYZAIConfig;
  askPermission: (tool: string, pattern: string, detail: string) => Promise<boolean>;
}

export abstract class BaseTool {
  abstract name: string;
  abstract description: string;
  abstract parameters: Record<string, unknown>;

  abstract execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult>;

  checkPermission(args: Record<string, unknown>, config: XYZAIConfig): 'allow' | 'ask' | 'deny' {
    const rules = config.permissions.filter(p => p.tool === this.name);
    if (rules.length === 0) return 'ask';

    const argStr = JSON.stringify(args);
    for (const rule of rules) {
      if (minimatch(argStr, rule.pattern)) {
        return rule.action;
      }
    }
    return 'ask';
  }
}

// ========== File Read Tool ==========
export class FileReadTool extends BaseTool {
  name = 'file-read';
  description = 'Read the contents of a file';
  parameters = {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Absolute path to the file' },
      offset: { type: 'number', description: 'Line number to start from (1-indexed)' },
      limit: { type: 'number', description: 'Max lines to read (default 2000)' },
    },
    required: ['path'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const filePath = args.path as string;
    const offset = (args.offset as number) || 1;
    const limit = (args.limit as number) || 2000;

    try {
      if (!fs.existsSync(filePath)) {
        return { output: '', error: `File not found: ${filePath}` };
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      const start = Math.max(0, offset - 1);
      const end = Math.min(lines.length, start + limit);
      const slice = lines.slice(start, end);
      const numbered = slice.map((line, i) => `${start + i + 1}: ${line}`).join('\n');
      return { output: numbered };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }
}

// ========== File Write Tool ==========
export class FileWriteTool extends BaseTool {
  name = 'file-write';
  description = 'Write content to a file';
  parameters = {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Absolute path to write' },
      content: { type: 'string', description: 'Content to write' },
    },
    required: ['path', 'content'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const filePath = args.path as string;
    const content = args.content as string;

    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, content, 'utf-8');
      return { output: `File written: ${filePath}` };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }
}

// ========== File Edit Tool ==========
export class FileEditTool extends BaseTool {
  name = 'file-edit';
  description = 'Replace text in a file (exact string match)';
  parameters = {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Absolute path to file' },
      old_string: { type: 'string', description: 'Text to find (exact match)' },
      new_string: { type: 'string', description: 'Replacement text' },
      replace_all: { type: 'boolean', description: 'Replace all occurrences' },
    },
    required: ['path', 'old_string', 'new_string'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const filePath = args.path as string;
    const oldString = args.old_string as string;
    const newString = args.new_string as string;
    const replaceAll = args.replace_all as boolean;

    try {
      if (!fs.existsSync(filePath)) {
        return { output: '', error: `File not found: ${filePath}` };
      }
      let content = fs.readFileSync(filePath, 'utf-8');
      if (!content.includes(oldString)) {
        return { output: '', error: 'old_string not found in file' };
      }
      if (replaceAll) {
        content = content.split(oldString).join(newString);
      } else {
        content = content.replace(oldString, newString);
      }
      fs.writeFileSync(filePath, content, 'utf-8');
      return { output: 'File edited successfully' };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }
}

// ========== Bash Tool ==========
export class BashTool extends BaseTool {
  name = 'bash';
  description = 'Execute a shell command';
  parameters = {
    type: 'object',
    properties: {
      command: { type: 'string', description: 'The command to execute' },
      timeout: { type: 'number', description: 'Timeout in milliseconds (default 30000)' },
    },
    required: ['command'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const command = args.command as string;
    const timeout = (args.timeout as number) || 30000;

    try {
      const output = execSync(command, {
        cwd: ctx.workDir,
        timeout,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024, // 1MB
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      return { output: output || '(no output)' };
    } catch (err: any) {
      const stderr = err.stderr || '';
      const stdout = err.stdout || '';
      return { output: stdout || '(no output)', error: stderr || err.message };
    }
  }
}

// ========== Glob Tool ==========
export class GlobTool extends BaseTool {
  name = 'glob';
  description = 'Find files matching a pattern';
  parameters = {
    type: 'object',
    properties: {
      pattern: { type: 'string', description: 'Glob pattern (e.g., "**/*.ts")' },
      path: { type: 'string', description: 'Directory to search in' },
    },
    required: ['pattern'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const pattern = args.pattern as string;
    const searchPath = (args.path as string) || ctx.workDir;

    try {
      const output = execSync(`Get-ChildItem -Recurse -File -Path "${searchPath}" | Where-Object { $_.Name -like "${pattern.replace(/\*\*/g, '*').replace(/\*/g, '*')}" } | Select-Object -ExpandProperty FullName`, {
        cwd: ctx.workDir,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024,
      });
      const files = output.trim().split('\n').filter(Boolean);
      return { output: files.length > 0 ? files.join('\n') : '(no files found)' };
    } catch (err: any) {
      return { output: '(no files found)', error: err.message };
    }
  }
}

// ========== Grep Tool ==========
export class GrepTool extends BaseTool {
  name = 'grep';
  description = 'Search file contents using regex';
  parameters = {
    type: 'object',
    properties: {
      pattern: { type: 'string', description: 'Regex pattern to search for' },
      path: { type: 'string', description: 'Directory to search in' },
      include: { type: 'string', description: 'File pattern to include (e.g., *.ts)' },
    },
    required: ['pattern'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const pattern = args.pattern as string;
    const searchPath = (args.path as string) || ctx.workDir;
    const include = args.include as string;

    try {
      let cmd = `rg -n "${pattern}" "${searchPath}"`;
      if (include) {
        cmd += ` --glob "${include}"`;
      }
      const output = execSync(cmd, {
        cwd: ctx.workDir,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024,
      });
      return { output: output || '(no matches found)' };
    } catch (err: any) {
      return { output: '(no matches found)', error: err.message };
    }
  }
}

// ========== WebFetch Tool ==========
export class WebFetchTool extends BaseTool {
  name = 'webfetch';
  description = 'Fetch content from a URL';
  parameters = {
    type: 'object',
    properties: {
      url: { type: 'string', description: 'URL to fetch' },
    },
    required: ['url'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const url = args.url as string;

    try {
      const response = await fetch(url);
      const text = await response.text();
      return { output: text.substring(0, 50000) };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }
}

// ========== Question Tool ==========
export class QuestionTool extends BaseTool {
  name = 'question';
  description = 'Ask the user a question';
  parameters = {
    type: 'object',
    properties: {
      question: { type: 'string', description: 'The question to ask' },
      options: { type: 'array', items: { type: 'string' }, description: 'Answer options' },
    },
    required: ['question'],
  };

  async execute(args: Record<string, unknown>, ctx: ToolContext): Promise<ToolResult> {
    const question = args.question as string;
    const options = args.options as string[] | undefined;

    const readline = await import('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    return new Promise((resolve) => {
      console.log(chalk.cyan(`\n❓ ${question}`));
      if (options) {
        options.forEach((opt, i) => console.log(chalk.white(`  ${i + 1}. ${opt}`)));
      }
      rl.question(chalk.yellow('> '), (answer) => {
        rl.close();
        resolve({ output: answer });
      });
    });
  }
}

// ========== Tool Registry ==========
export class ToolRegistry {
  private tools: Map<string, BaseTool> = new Map();

  constructor() {
    this.register(new FileReadTool());
    this.register(new FileWriteTool());
    this.register(new FileEditTool());
    this.register(new BashTool());
    this.register(new GlobTool());
    this.register(new GrepTool());
    this.register(new WebFetchTool());
    this.register(new QuestionTool());
  }

  register(tool: BaseTool): void {
    this.tools.set(tool.name, tool);
  }

  get(name: string): BaseTool | undefined {
    return this.tools.get(name);
  }

  list(): BaseTool[] {
    return Array.from(this.tools.values());
  }

  getDefinitions(): any[] {
    return this.list().map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  }
}
