#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/paths.ts
function getConfigDir() {
  return path.join(os.homedir(), ".config", "xyzai");
}
function getDataDir() {
  return path.join(os.homedir(), ".local", "share", "xyzai");
}
function getStateDir() {
  return path.join(os.homedir(), ".local", "state", "xyzai");
}
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
function ensureAllDirs() {
  ensureDir(getConfigDir());
  ensureDir(getDataDir());
  ensureDir(getStateDir());
  ensureDir(path.join(getDataDir(), "sessions"));
  ensureDir(path.join(getDataDir(), "memory"));
}
var path, os, fs;
var init_paths = __esm({
  "src/utils/paths.ts"() {
    "use strict";
    path = __toESM(require("path"));
    os = __toESM(require("os"));
    fs = __toESM(require("fs"));
  }
});

// src/config/schema.ts
function getConfigPath() {
  return path2.join(getConfigDir(), "config.json");
}
function loadConfig() {
  const configPath = getConfigPath();
  ensureDir(getConfigDir());
  if (fs2.existsSync(configPath)) {
    try {
      const raw = fs2.readFileSync(configPath, "utf-8");
      const userConfig = JSON.parse(raw);
      return { ...DEFAULT_CONFIG, ...userConfig };
    } catch {
      return DEFAULT_CONFIG;
    }
  }
  saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
}
function saveConfig(config) {
  const configPath = getConfigPath();
  ensureDir(getConfigDir());
  fs2.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}
function getProviderById(config, providerId) {
  return config.providers.find((p) => p.id === providerId);
}
function parseModelString(modelStr) {
  const parts = modelStr.split("/");
  if (parts.length >= 2) {
    return { provider: parts[0], model: parts.slice(1).join("/") };
  }
  return { provider: "mimo", model: modelStr };
}
var fs2, path2, DEFAULT_PROVIDERS, DEFAULT_PERMISSIONS, DEFAULT_CONFIG;
var init_schema = __esm({
  "src/config/schema.ts"() {
    "use strict";
    fs2 = __toESM(require("fs"));
    path2 = __toESM(require("path"));
    init_paths();
    DEFAULT_PROVIDERS = [
      {
        id: "mimo",
        name: "MiMo Auto",
        baseURL: "https://api.mimo.xiaomi.com/v1",
        models: {
          "mimo-auto": { name: "MiMo Auto (Free)", free: true, maxTokens: 4096 },
          "mimo-v2.5-pro": { name: "MiMo V2.5 Pro", free: true, maxTokens: 8192 }
        }
      },
      {
        id: "deepseek",
        name: "DeepSeek",
        baseURL: "https://api.deepseek.com/v1",
        models: {
          "deepseek-chat": { name: "DeepSeek Chat", maxTokens: 4096 },
          "deepseek-coder": { name: "DeepSeek Coder", maxTokens: 4096 }
        }
      },
      {
        id: "gemini",
        name: "Google Gemini",
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
        models: {
          "gemini-2.0-flash": { name: "Gemini 2.0 Flash", free: true, maxTokens: 8192 },
          "gemini-2.5-flash": { name: "Gemini 2.5 Flash", free: true, maxTokens: 8192 }
        }
      },
      {
        id: "qwen",
        name: "Alibaba Qwen",
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
        models: {
          "qwen-turbo": { name: "Qwen Turbo", maxTokens: 4096 },
          "qwen-plus": { name: "Qwen Plus", maxTokens: 8192 }
        }
      },
      {
        id: "openrouter",
        name: "OpenRouter",
        baseURL: "https://openrouter.ai/api/v1",
        models: {
          "meta-llama/llama-3.3-70b-instruct": { name: "Llama 3.3 70B", free: true, maxTokens: 4096 },
          "mistralai/mistral-7b-instruct": { name: "Mistral 7B", free: true, maxTokens: 4096 }
        }
      }
    ];
    DEFAULT_PERMISSIONS = [
      { tool: "bash", pattern: "*", action: "ask" },
      { tool: "bash", pattern: "git *", action: "allow" },
      { tool: "bash", pattern: "npm *", action: "allow" },
      { tool: "bash", pattern: "npx *", action: "allow" },
      { tool: "bash", pattern: "node *", action: "allow" },
      { tool: "bash", pattern: "rm -rf *", action: "deny" },
      { tool: "bash", pattern: "rm -r *", action: "deny" },
      { tool: "bash", pattern: "format *", action: "deny" },
      { tool: "file-write", pattern: "*", action: "ask" },
      { tool: "file-read", pattern: "*", action: "allow" },
      { tool: "glob", pattern: "*", action: "allow" },
      { tool: "grep", pattern: "*", action: "allow" },
      { tool: "webfetch", pattern: "*", action: "allow" },
      { tool: "websearch", pattern: "*", action: "allow" }
    ];
    DEFAULT_CONFIG = {
      model: "mimo/mimo-auto",
      provider: "mimo",
      language: "en",
      providers: DEFAULT_PROVIDERS,
      permissions: DEFAULT_PERMISSIONS,
      maxTokens: 4096,
      temperature: 0.7
    };
  }
});

// src/llm/providers/openai-compat.ts
var import_openai, OpenAICompatProvider;
var init_openai_compat = __esm({
  "src/llm/providers/openai-compat.ts"() {
    "use strict";
    import_openai = __toESM(require("openai"));
    OpenAICompatProvider = class {
      id;
      name;
      client;
      modelId;
      constructor(id, name, baseURL, apiKey, modelId) {
        this.id = id;
        this.name = name;
        this.modelId = modelId;
        this.client = new import_openai.default({
          baseURL,
          apiKey: apiKey || "dummy",
          dangerouslyAllowBrowser: true
        });
      }
      convertMessages(messages) {
        return messages.map((msg) => {
          if (msg.role === "tool") {
            return {
              role: "tool",
              content: msg.content,
              tool_call_id: msg.tool_call_id
            };
          }
          if (msg.role === "assistant" && msg.tool_calls) {
            return {
              role: "assistant",
              content: msg.content || null,
              tool_calls: msg.tool_calls.map((tc) => ({
                id: tc.id,
                type: "function",
                function: {
                  name: tc.function.name,
                  arguments: tc.function.arguments
                }
              }))
            };
          }
          return {
            role: msg.role,
            content: msg.content
          };
        });
      }
      convertTools(tools) {
        if (!tools || tools.length === 0) return void 0;
        return tools.map((tool) => ({
          type: "function",
          function: {
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters
          }
        }));
      }
      async chat(messages, tools) {
        const response = await this.client.chat.completions.create({
          model: this.modelId,
          messages: this.convertMessages(messages),
          tools: this.convertTools(tools),
          max_tokens: 4096
        });
        const choice = response.choices[0];
        const message = choice.message;
        return {
          content: message.content || "",
          tool_calls: message.tool_calls?.map((tc) => ({
            id: tc.id,
            type: "function",
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments
            }
          })),
          finish_reason: choice.finish_reason,
          usage: response.usage ? {
            prompt_tokens: response.usage.prompt_tokens,
            completion_tokens: response.usage.completion_tokens,
            total_tokens: response.usage.total_tokens
          } : void 0
        };
      }
      async *chatStream(messages, tools) {
        const stream = await this.client.chat.completions.create({
          model: this.modelId,
          messages: this.convertMessages(messages),
          tools: this.convertTools(tools),
          max_tokens: 4096,
          stream: true
        });
        for await (const chunk of stream) {
          const choice = chunk.choices[0];
          if (!choice) continue;
          const delta = choice.delta;
          const result = {};
          if (delta.content) {
            result.content = delta.content;
          }
          if (delta.tool_calls) {
            result.tool_calls = delta.tool_calls.map((tc) => ({
              id: tc.id,
              type: "function",
              function: {
                name: tc.function?.name,
                arguments: tc.function?.arguments
              }
            }));
          }
          if (choice.finish_reason) {
            result.finish_reason = choice.finish_reason;
          }
          if (result.content || result.tool_calls || result.finish_reason) {
            yield result;
          }
        }
      }
    };
  }
});

// src/llm/provider.ts
function createProvider(config, providerId, modelId) {
  const providerCfg = getProviderById(config, providerId);
  if (!providerCfg) return void 0;
  return new OpenAICompatProvider(
    providerCfg.id,
    providerCfg.name,
    providerCfg.baseURL,
    providerCfg.apiKey || "",
    modelId
  );
}
var init_provider = __esm({
  "src/llm/provider.ts"() {
    "use strict";
    init_openai_compat();
    init_schema();
  }
});

// src/utils/glob.ts
function minimatch(str, pattern) {
  if (pattern === "*") return true;
  const regex = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "<<GLOBSTAR>>").replace(/\*/g, "[^/]*").replace(/<<GLOBSTAR>>/g, ".*").replace(/\?/g, "[^/]");
  return new RegExp(`^${regex}$`).test(str);
}
var init_glob = __esm({
  "src/utils/glob.ts"() {
    "use strict";
  }
});

// src/tools/registry.ts
var fs3, path3, import_child_process, import_chalk, BaseTool, FileReadTool, FileWriteTool, FileEditTool, BashTool, GlobTool, GrepTool, WebFetchTool, QuestionTool, ToolRegistry;
var init_registry = __esm({
  "src/tools/registry.ts"() {
    "use strict";
    fs3 = __toESM(require("fs"));
    path3 = __toESM(require("path"));
    import_child_process = require("child_process");
    init_glob();
    import_chalk = __toESM(require("chalk"));
    BaseTool = class {
      checkPermission(args, config) {
        const rules = config.permissions.filter((p) => p.tool === this.name);
        if (rules.length === 0) return "ask";
        const argStr = JSON.stringify(args);
        for (const rule of rules) {
          if (minimatch(argStr, rule.pattern)) {
            return rule.action;
          }
        }
        return "ask";
      }
    };
    FileReadTool = class extends BaseTool {
      name = "file-read";
      description = "Read the contents of a file";
      parameters = {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute path to the file" },
          offset: { type: "number", description: "Line number to start from (1-indexed)" },
          limit: { type: "number", description: "Max lines to read (default 2000)" }
        },
        required: ["path"]
      };
      async execute(args, ctx) {
        const filePath = args.path;
        const offset = args.offset || 1;
        const limit = args.limit || 2e3;
        try {
          if (!fs3.existsSync(filePath)) {
            return { output: "", error: `File not found: ${filePath}` };
          }
          const content = fs3.readFileSync(filePath, "utf-8");
          const lines = content.split("\n");
          const start = Math.max(0, offset - 1);
          const end = Math.min(lines.length, start + limit);
          const slice = lines.slice(start, end);
          const numbered = slice.map((line, i) => `${start + i + 1}: ${line}`).join("\n");
          return { output: numbered };
        } catch (err) {
          return { output: "", error: err.message };
        }
      }
    };
    FileWriteTool = class extends BaseTool {
      name = "file-write";
      description = "Write content to a file";
      parameters = {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute path to write" },
          content: { type: "string", description: "Content to write" }
        },
        required: ["path", "content"]
      };
      async execute(args, ctx) {
        const filePath = args.path;
        const content = args.content;
        try {
          const dir = path3.dirname(filePath);
          if (!fs3.existsSync(dir)) {
            fs3.mkdirSync(dir, { recursive: true });
          }
          fs3.writeFileSync(filePath, content, "utf-8");
          return { output: `File written: ${filePath}` };
        } catch (err) {
          return { output: "", error: err.message };
        }
      }
    };
    FileEditTool = class extends BaseTool {
      name = "file-edit";
      description = "Replace text in a file (exact string match)";
      parameters = {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute path to file" },
          old_string: { type: "string", description: "Text to find (exact match)" },
          new_string: { type: "string", description: "Replacement text" },
          replace_all: { type: "boolean", description: "Replace all occurrences" }
        },
        required: ["path", "old_string", "new_string"]
      };
      async execute(args, ctx) {
        const filePath = args.path;
        const oldString = args.old_string;
        const newString = args.new_string;
        const replaceAll = args.replace_all;
        try {
          if (!fs3.existsSync(filePath)) {
            return { output: "", error: `File not found: ${filePath}` };
          }
          let content = fs3.readFileSync(filePath, "utf-8");
          if (!content.includes(oldString)) {
            return { output: "", error: "old_string not found in file" };
          }
          if (replaceAll) {
            content = content.split(oldString).join(newString);
          } else {
            content = content.replace(oldString, newString);
          }
          fs3.writeFileSync(filePath, content, "utf-8");
          return { output: "File edited successfully" };
        } catch (err) {
          return { output: "", error: err.message };
        }
      }
    };
    BashTool = class extends BaseTool {
      name = "bash";
      description = "Execute a shell command";
      parameters = {
        type: "object",
        properties: {
          command: { type: "string", description: "The command to execute" },
          timeout: { type: "number", description: "Timeout in milliseconds (default 30000)" }
        },
        required: ["command"]
      };
      async execute(args, ctx) {
        const command = args.command;
        const timeout = args.timeout || 3e4;
        try {
          const output = (0, import_child_process.execSync)(command, {
            cwd: ctx.workDir,
            timeout,
            encoding: "utf-8",
            maxBuffer: 1024 * 1024,
            // 1MB
            stdio: ["pipe", "pipe", "pipe"]
          });
          return { output: output || "(no output)" };
        } catch (err) {
          const stderr = err.stderr || "";
          const stdout = err.stdout || "";
          return { output: stdout || "(no output)", error: stderr || err.message };
        }
      }
    };
    GlobTool = class extends BaseTool {
      name = "glob";
      description = "Find files matching a pattern";
      parameters = {
        type: "object",
        properties: {
          pattern: { type: "string", description: 'Glob pattern (e.g., "**/*.ts")' },
          path: { type: "string", description: "Directory to search in" }
        },
        required: ["pattern"]
      };
      async execute(args, ctx) {
        const pattern = args.pattern;
        const searchPath = args.path || ctx.workDir;
        try {
          const output = (0, import_child_process.execSync)(`Get-ChildItem -Recurse -File -Path "${searchPath}" | Where-Object { $_.Name -like "${pattern.replace(/\*\*/g, "*").replace(/\*/g, "*")}" } | Select-Object -ExpandProperty FullName`, {
            cwd: ctx.workDir,
            encoding: "utf-8",
            maxBuffer: 1024 * 1024
          });
          const files = output.trim().split("\n").filter(Boolean);
          return { output: files.length > 0 ? files.join("\n") : "(no files found)" };
        } catch (err) {
          return { output: "(no files found)", error: err.message };
        }
      }
    };
    GrepTool = class extends BaseTool {
      name = "grep";
      description = "Search file contents using regex";
      parameters = {
        type: "object",
        properties: {
          pattern: { type: "string", description: "Regex pattern to search for" },
          path: { type: "string", description: "Directory to search in" },
          include: { type: "string", description: "File pattern to include (e.g., *.ts)" }
        },
        required: ["pattern"]
      };
      async execute(args, ctx) {
        const pattern = args.pattern;
        const searchPath = args.path || ctx.workDir;
        const include = args.include;
        try {
          let cmd = `rg -n "${pattern}" "${searchPath}"`;
          if (include) {
            cmd += ` --glob "${include}"`;
          }
          const output = (0, import_child_process.execSync)(cmd, {
            cwd: ctx.workDir,
            encoding: "utf-8",
            maxBuffer: 1024 * 1024
          });
          return { output: output || "(no matches found)" };
        } catch (err) {
          return { output: "(no matches found)", error: err.message };
        }
      }
    };
    WebFetchTool = class extends BaseTool {
      name = "webfetch";
      description = "Fetch content from a URL";
      parameters = {
        type: "object",
        properties: {
          url: { type: "string", description: "URL to fetch" }
        },
        required: ["url"]
      };
      async execute(args, ctx) {
        const url = args.url;
        try {
          const response = await fetch(url);
          const text = await response.text();
          return { output: text.substring(0, 5e4) };
        } catch (err) {
          return { output: "", error: err.message };
        }
      }
    };
    QuestionTool = class extends BaseTool {
      name = "question";
      description = "Ask the user a question";
      parameters = {
        type: "object",
        properties: {
          question: { type: "string", description: "The question to ask" },
          options: { type: "array", items: { type: "string" }, description: "Answer options" }
        },
        required: ["question"]
      };
      async execute(args, ctx) {
        const question = args.question;
        const options = args.options;
        const readline = await import("readline");
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        return new Promise((resolve) => {
          console.log(import_chalk.default.cyan(`
\u2753 ${question}`));
          if (options) {
            options.forEach((opt, i) => console.log(import_chalk.default.white(`  ${i + 1}. ${opt}`)));
          }
          rl.question(import_chalk.default.yellow("> "), (answer) => {
            rl.close();
            resolve({ output: answer });
          });
        });
      }
    };
    ToolRegistry = class {
      tools = /* @__PURE__ */ new Map();
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
      register(tool) {
        this.tools.set(tool.name, tool);
      }
      get(name) {
        return this.tools.get(name);
      }
      list() {
        return Array.from(this.tools.values());
      }
      getDefinitions() {
        return this.list().map((tool) => ({
          type: "function",
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
          }
        }));
      }
    };
  }
});

// src/core/session.ts
var session_exports = {};
__export(session_exports, {
  SessionManager: () => SessionManager
});
var fs4, path4, SessionManager;
var init_session = __esm({
  "src/core/session.ts"() {
    "use strict";
    fs4 = __toESM(require("fs"));
    path4 = __toESM(require("path"));
    init_paths();
    SessionManager = class {
      sessionsDir;
      constructor() {
        this.sessionsDir = path4.join(getDataDir(), "sessions");
        ensureDir(this.sessionsDir);
      }
      getSessionPath(id) {
        return path4.join(this.sessionsDir, `${id}.json`);
      }
      create(model) {
        const session = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          messages: [],
          model,
          created: Date.now(),
          updated: Date.now()
        };
        this.save(session);
        return session;
      }
      save(session) {
        session.updated = Date.now();
        const filePath = this.getSessionPath(session.id);
        fs4.writeFileSync(filePath, JSON.stringify(session, null, 2), "utf-8");
      }
      load(id) {
        const filePath = this.getSessionPath(id);
        if (!fs4.existsSync(filePath)) return null;
        try {
          const data = fs4.readFileSync(filePath, "utf-8");
          return JSON.parse(data);
        } catch {
          return null;
        }
      }
      list() {
        const files = fs4.readdirSync(this.sessionsDir).filter((f) => f.endsWith(".json"));
        return files.map((f) => {
          const data = fs4.readFileSync(path4.join(this.sessionsDir, f), "utf-8");
          return JSON.parse(data);
        }).sort((a, b) => b.updated - a.updated);
      }
      addMessage(session, role, content) {
        session.messages.push({
          role,
          content,
          timestamp: Date.now()
        });
        this.save(session);
      }
      clearMessages(session) {
        session.messages = [];
        this.save(session);
      }
    };
  }
});

// src/core/agent.ts
var SYSTEM_PROMPT, Agent;
var init_agent = __esm({
  "src/core/agent.ts"() {
    "use strict";
    init_schema();
    init_provider();
    init_registry();
    init_session();
    SYSTEM_PROMPT = `You are XYZAI, an AI coding assistant. You help users with software engineering tasks.

You have access to tools for:
- Reading and writing files
- Executing shell commands
- Searching code (grep, glob)
- Fetching web content

When you need to use a tool, respond with a tool_call. Always explain what you're doing before and after using tools.

Be helpful, concise, and accurate. When writing code, follow best practices.`;
    Agent = class {
      config;
      toolRegistry;
      sessionManager;
      session;
      constructor(config) {
        this.config = config;
        this.toolRegistry = new ToolRegistry();
        this.sessionManager = new SessionManager();
        this.session = this.sessionManager.create(config.model);
      }
      getConfig() {
        return this.config;
      }
      setLanguage(lang) {
        this.config.language = lang;
      }
      async chat(userInput, callbacks) {
        this.sessionManager.addMessage(this.session, "user", userInput);
        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...this.session.messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        ];
        const { provider: providerId, model } = parseModelString(this.config.model);
        const provider = createProvider(this.config, providerId, model);
        if (!provider) {
          callbacks.onError?.(`Provider not found: ${providerId}`);
          return;
        }
        const toolDefs = this.toolRegistry.getDefinitions();
        let maxIterations = 10;
        while (maxIterations-- > 0) {
          callbacks.onThinking?.();
          try {
            const response = await provider.chat(messages, toolDefs);
            if (response.tool_calls && response.tool_calls.length > 0) {
              messages.push({
                role: "assistant",
                content: response.content || "",
                tool_calls: response.tool_calls
              });
              for (const toolCall of response.tool_calls) {
                const toolName = toolCall.function.name;
                const toolArgs = JSON.parse(toolCall.function.arguments);
                callbacks.onToolCall?.(toolName, toolArgs);
                const tool = this.toolRegistry.get(toolName);
                if (tool) {
                  const permission = tool.checkPermission(toolArgs, this.config);
                  if (permission === "ask") {
                    const allowed = await callbacks.onPermission?.(toolName, JSON.stringify(toolArgs));
                    if (!allowed) {
                      const result2 = { output: "", error: "Permission denied by user" };
                      messages.push({
                        role: "tool",
                        content: JSON.stringify(result2),
                        tool_call_id: toolCall.id
                      });
                      callbacks.onToolResult?.(toolName, result2);
                      continue;
                    }
                  } else if (permission === "deny") {
                    const result2 = { output: "", error: "Permission denied by config" };
                    messages.push({
                      role: "tool",
                      content: JSON.stringify(result2),
                      tool_call_id: toolCall.id
                    });
                    callbacks.onToolResult?.(toolName, result2);
                    continue;
                  }
                }
                const ctx = {
                  workDir: process.cwd(),
                  config: this.config,
                  askPermission: async () => true
                };
                let result;
                if (tool) {
                  result = await tool.execute(toolArgs, ctx);
                } else {
                  result = { output: "", error: `Unknown tool: ${toolName}` };
                }
                callbacks.onToolResult?.(toolName, result);
                messages.push({
                  role: "tool",
                  content: JSON.stringify(result),
                  tool_call_id: toolCall.id
                });
              }
              continue;
            }
            const finalContent = response.content || "";
            this.sessionManager.addMessage(this.session, "assistant", finalContent);
            callbacks.onDone?.(finalContent);
            return;
          } catch (error) {
            callbacks.onError?.(error.message || "Unknown error");
            return;
          }
        }
        callbacks.onError?.("Max iterations reached");
      }
      async chatStream(userInput, callbacks) {
        this.sessionManager.addMessage(this.session, "user", userInput);
        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...this.session.messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        ];
        const { provider: providerId, model } = parseModelString(this.config.model);
        const provider = createProvider(this.config, providerId, model);
        if (!provider) {
          callbacks.onError?.(`Provider not found: ${providerId}`);
          return;
        }
        const toolDefs = this.toolRegistry.getDefinitions();
        let fullContent = "";
        let toolCalls = [];
        callbacks.onThinking?.();
        try {
          for await (const chunk of provider.chatStream(messages, toolDefs)) {
            if (chunk.content) {
              fullContent += chunk.content;
              callbacks.onToken?.(chunk.content);
            }
            if (chunk.tool_calls) {
              for (const tc of chunk.tool_calls) {
                const existing = toolCalls.find((t) => t.id === tc.id);
                if (existing) {
                  if (tc.function?.name) existing.function.name = tc.function.name;
                  if (tc.function?.arguments) existing.function.arguments += tc.function.arguments;
                } else if (tc.id) {
                  toolCalls.push({
                    id: tc.id,
                    type: "function",
                    function: {
                      name: tc.function?.name || "",
                      arguments: tc.function?.arguments || ""
                    }
                  });
                }
              }
            }
          }
          if (toolCalls.length > 0) {
            this.sessionManager.addMessage(this.session, "assistant", fullContent);
            for (const tc of toolCalls) {
              callbacks.onToolCall?.(tc.function.name, JSON.parse(tc.function.arguments || "{}"));
            }
          } else {
            this.sessionManager.addMessage(this.session, "assistant", fullContent);
            callbacks.onDone?.(fullContent);
          }
        } catch (error) {
          callbacks.onError?.(error.message || "Unknown error");
        }
      }
      getSession() {
        return this.session;
      }
      getSessionManager() {
        return this.sessionManager;
      }
      clearConversation() {
        this.sessionManager.clearMessages(this.session);
      }
    };
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "xyzai",
      version: "0.1.0",
      description: "XYZAI - AI Coding Assistant CLI with Persian support",
      main: "dist/index.js",
      bin: {
        xyzai: "bin/xyzai"
      },
      files: [
        "dist",
        "bin",
        "locales",
        "README.md",
        "LICENSE"
      ],
      scripts: {
        build: "tsup src/index.ts --format cjs --clean",
        dev: "tsup src/index.ts --format cjs --watch",
        start: "node dist/index.js",
        test: "node test.js",
        typecheck: "tsc --noEmit",
        prepublishOnly: "npm run build",
        release: "npm version patch && git push --tags"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/xyzdevtm/xyzaiCIL.git"
      },
      bugs: {
        url: "https://github.com/xyzdevtm/xyzaiCIL/issues"
      },
      homepage: "https://github.com/xyzdevtm/xyzaiCIL#readme",
      keywords: [
        "ai",
        "cli",
        "coding-assistant",
        "persian",
        "llm",
        "mimo",
        "deepseek",
        "gemini",
        "openai"
      ],
      author: "XYZAI Team",
      license: "MIT",
      type: "commonjs",
      engines: {
        node: ">=18.0.0"
      },
      dependencies: {
        "@types/react": "^19.2.17",
        chalk: "^5.6.2",
        commander: "^15.0.0",
        "highlight.js": "^11.11.1",
        ink: "^5.2.1",
        marked: "^18.0.7",
        openai: "^6.48.0",
        react: "^18.3.1"
      },
      devDependencies: {
        "@types/node": "^26.1.1",
        tsup: "^8.5.1",
        typescript: "^7.0.2"
      }
    };
  }
});

// src/rtl/bidi.ts
function containsRTL(text) {
  return RTL_CHARS.test(text);
}
var RTL_CHARS;
var init_bidi = __esm({
  "src/rtl/bidi.ts"() {
    "use strict";
    RTL_CHARS = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  }
});

// src/tui/components/chat.tsx
function getHelpText(lang) {
  if (lang === "fa") {
    return `=== \u0631\u0627\u0647\u0646\u0645\u0627\u06CC XYZAI ===

\u062F\u0633\u062A\u0648\u0631\u0627\u062A:
  /help  - \u0646\u0645\u0627\u06CC\u0634 \u0627\u06CC\u0646 \u0631\u0627\u0647\u0646\u0645\u0627
  /model - \u062A\u063A\u06CC\u06CC\u0631 \u0645\u062F\u0644 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC
  /lang  - \u062A\u063A\u06CC\u06CC\u0631 \u0632\u0628\u0627\u0646 (fa/en)
  /clear - \u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646 \u0645\u06A9\u0627\u0644\u0645\u0647
  /sessions - \u0644\u06CC\u0633\u062A \u062C\u0644\u0633\u0627\u062A
  /exit  - \u062E\u0631\u0648\u062C

\u0627\u0628\u0632\u0627\u0631\u0647\u0627:
  \u062E\u0648\u0627\u0646\u062F\u0646 \u0648 \u0646\u0648\u0634\u062A\u0646 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627
  \u0627\u062C\u0631\u0627\u06CC \u062F\u0633\u062A\u0648\u0631\u0627\u062A \u062A\u0631\u0645\u06CC\u0646\u0627\u0644
  \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u062F
  \u0645\u0631\u0648\u0631 \u0648\u0628`;
  }
  return `=== XYZAI Help ===

Commands:
  /help  - Show this help
  /model - Change AI model
  /lang  - Change language (fa/en)
  /clear - Clear conversation
  /sessions - List sessions
  /exit  - Exit

Tools:
  Read and write files
  Execute terminal commands
  Search code
  Browse the web`;
}
var import_react, import_ink, import_jsx_runtime, Chat;
var init_chat = __esm({
  "src/tui/components/chat.tsx"() {
    "use strict";
    import_react = require("react");
    import_ink = require("ink");
    init_bidi();
    import_jsx_runtime = require("ink/jsx-runtime");
    Chat = ({ agent, config }) => {
      const [messages, setMessages] = (0, import_react.useState)([]);
      const [input, setInput] = (0, import_react.useState)("");
      const [isThinking, setIsThinking] = (0, import_react.useState)(false);
      const [currentToken, setCurrentToken] = (0, import_react.useState)("");
      const { exit } = (0, import_ink.useApp)();
      const inputRef = (0, import_react.useRef)("");
      const addMessage = (role, content) => {
        setMessages((prev) => [...prev, { role, content, timestamp: Date.now() }]);
      };
      const handleSend = async (text) => {
        if (!text.trim()) return;
        if (text.startsWith("/")) {
          handleCommand(text);
          return;
        }
        addMessage("user", text);
        setInput("");
        setIsThinking(true);
        setCurrentToken("");
        const callbacks = {
          onThinking: () => {
            setIsThinking(true);
          },
          onToken: (token) => {
            setCurrentToken((prev) => prev + token);
          },
          onToolCall: (name, args) => {
            addMessage("tool", `\u{1F527} ${name}: ${JSON.stringify(args)}`);
          },
          onToolResult: (name, result) => {
            if (result.error) {
              addMessage("tool", `\u274C ${name}: ${result.error}`);
            }
          },
          onPermission: async (tool, detail) => {
            return true;
          },
          onDone: (response) => {
            setIsThinking(false);
            setCurrentToken("");
            addMessage("assistant", response);
          },
          onError: (error) => {
            setIsThinking(false);
            setCurrentToken("");
            addMessage("system", `\u274C Error: ${error}`);
          }
        };
        await agent.chat(text, callbacks);
      };
      const handleCommand = (cmd) => {
        const parts = cmd.split(" ");
        const command = parts[0].toLowerCase();
        switch (command) {
          case "/exit":
          case "/quit":
            exit();
            break;
          case "/help":
            addMessage("system", getHelpText(config.language));
            break;
          case "/clear":
            setMessages([]);
            agent.clearConversation();
            addMessage("system", config.language === "fa" ? "\u0645\u06A9\u0627\u0644\u0645\u0647 \u067E\u0627\u06A9 \u0634\u062F" : "Conversation cleared");
            break;
          case "/lang":
            const lang = parts[1];
            if (lang === "en" || lang === "fa") {
              agent.setLanguage(lang);
              addMessage("system", lang === "fa" ? "\u0632\u0628\u0627\u0646 \u0628\u0647 \u0641\u0627\u0631\u0633\u06CC \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F" : "Language changed to English");
            } else {
              addMessage("system", config.language === "fa" ? "\u0627\u0633\u062A\u0641\u0627\u062F\u0647: /lang fa \u06CC\u0627 /lang en" : "Usage: /lang fa or /lang en");
            }
            break;
          case "/model":
            if (parts[1]) {
              addMessage("system", config.language === "fa" ? "\u0645\u062F\u0644 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F" : "Model changed");
            }
            break;
          default:
            addMessage("system", config.language === "fa" ? `\u062F\u0633\u062A\u0648\u0631 \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647: ${command}` : `Unknown command: ${command}`);
        }
      };
      const renderMessage = (msg, index) => {
        const isRTL = containsRTL(msg.content);
        switch (msg.role) {
          case "user":
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", marginY: 1, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { bold: true, color: "cyan", children: config.language === "fa" ? "\u0634\u0645\u0627:" : "You:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "white", children: msg.content })
            ] }, index);
          case "assistant":
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", marginY: 1, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { bold: true, color: "green", children: "XYZAI:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "white", wrap: "wrap", children: msg.content })
            ] }, index);
          case "tool":
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Box, { flexDirection: "column", marginY: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "yellow", children: msg.content }) }, index);
          case "system":
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Box, { flexDirection: "column", marginY: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "gray", children: msg.content }) }, index);
          default:
            return null;
        }
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", height: "100%", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", flexGrow: 1, paddingX: 1, children: [
          messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { bold: true, color: "cyan", marginBottom: 1, children: config.language === "fa" ? "\u{1F525} XYZAI" : "\u{1F525} XYZAI" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "gray", marginBottom: 1, children: config.language === "fa" ? "\u062F\u0633\u062A\u06CC\u0627\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0646\u0648\u06CC\u0633\u06CC \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0634\u0645\u0627" : "Your AI Coding Assistant" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "gray", children: config.language === "fa" ? "\u0628\u0631\u0627\u06CC \u0634\u0631\u0648\u0639 \u06CC\u06A9 \u067E\u06CC\u0627\u0645 \u062A\u0627\u06CC\u067E \u06A9\u0646\u06CC\u062F. /help \u0628\u0631\u0627\u06CC \u0631\u0627\u0647\u0646\u0645\u0627" : "Type a message to start. /help for help" })
          ] }),
          messages.map(renderMessage),
          isThinking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Box, { marginY: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "yellow", children: config.language === "fa" ? "\u{1F914} \u062F\u0631 \u062D\u0627\u0644 \u0641\u06A9\u0631 \u06A9\u0631\u062F\u0646..." : "\u{1F914} Thinking..." }) }),
          currentToken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { flexDirection: "column", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { bold: true, color: "green", children: "XYZAI:" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "white", wrap: "wrap", children: currentToken })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { borderStyle: "round", borderColor: "cyan", paddingX: 1, paddingY: 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "cyan", children: "\u276F " }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "white", children: input }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "gray", children: "|" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Box, { justifyContent: "space-between", paddingX: 1, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ink.Text, { color: "gray", dimColor: true, children: config.model }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ink.Text, { color: "gray", dimColor: true, children: [
            config.language === "fa" ? "\u0641\u0627\u0631\u0633\u06CC" : "EN",
            " | /help"
          ] })
        ] })
      ] });
    };
  }
});

// src/tui/app.tsx
var app_exports = {};
__export(app_exports, {
  startTUI: () => startTUI
});
function startTUI(config) {
  const loadedConfig = config || loadConfig();
  if (process.platform === "win32") {
    try {
      const { execSync: execSync2 } = require("child_process");
      execSync2("chcp 65001", { stdio: "ignore" });
    } catch {
    }
  }
  import_chalk2.default.level = 3;
  const { waitUntilExit } = (0, import_ink2.render)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(App, { initialConfig: loadedConfig }),
    {
      exitOnCtrlC: true,
      patches: []
    }
  );
  waitUntilExit().then(() => {
    process.exit(0);
  });
}
var import_ink2, import_chalk2, import_jsx_runtime2, App;
var init_app = __esm({
  "src/tui/app.tsx"() {
    "use strict";
    import_ink2 = require("ink");
    init_chat();
    init_agent();
    init_schema();
    init_paths();
    import_chalk2 = __toESM(require("chalk"));
    import_jsx_runtime2 = require("ink/jsx-runtime");
    App = ({ initialConfig }) => {
      const [config] = (0, import_ink2.useState)(initialConfig || loadConfig());
      const [agent] = (0, import_ink2.useState)(() => new Agent(config));
      const { exit } = (0, import_ink2.useApp)();
      (0, import_ink2.useEffect)(() => {
        ensureAllDirs();
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Chat, { agent, config });
    };
  }
});

// src/index.ts
var import_commander = require("commander");
var import_chalk3 = __toESM(require("chalk"));
init_schema();
init_paths();
init_agent();
init_registry();
var pkg = require_package();
var program = new import_commander.Command();
program.name("xyzai").description("XYZAI - AI Coding Assistant CLI").version(pkg.version);
program.command("chat").description("Start interactive chat").action(async () => {
  ensureAllDirs();
  const { startTUI: startTUI2 } = await Promise.resolve().then(() => (init_app(), app_exports));
  startTUI2();
});
program.command("run").description("Run a single prompt (headless mode)").argument("<prompt>", "The prompt to send").option("-m, --model <model>", "Model to use").option("-l, --language <lang>", "Language (en/fa)").action(async (prompt, options) => {
  ensureAllDirs();
  const config = loadConfig();
  if (options.model) config.model = options.model;
  if (options.language) config.language = options.language;
  const agent = new Agent(config);
  const toolRegistry = new ToolRegistry();
  console.log(import_chalk3.default.cyan("\u{1F916} XYZAI"));
  console.log(import_chalk3.default.gray("\u2500".repeat(40)));
  let output = "";
  const callbacks = {
    onThinking: () => {
      process.stdout.write(import_chalk3.default.yellow("\u{1F914} Thinking...\r"));
    },
    onToken: (token) => {
      process.stdout.write(token);
    },
    onToolCall: (name, args) => {
      process.stdout.write(import_chalk3.default.gray(`
\u{1F527} ${name}
`));
    },
    onToolResult: (name, result) => {
      if (result.error) {
        console.log(import_chalk3.default.red(`\u274C ${result.error}`));
      }
    },
    onPermission: async () => true,
    onDone: (response) => {
      console.log("");
    },
    onError: (error) => {
      console.error(import_chalk3.default.red(`
\u274C Error: ${error}`));
      process.exit(1);
    }
  };
  await agent.chat(prompt, callbacks);
  process.exit(0);
});
program.command("config").description("Manage configuration").option("-g, --get <key>", "Get config value").option("-s, --set <key> <value>", "Set config value").option("-l, --list", "List all config").action((options) => {
  ensureAllDirs();
  const config = loadConfig();
  if (options.list) {
    console.log(import_chalk3.default.cyan("XYZAI Configuration:"));
    console.log(JSON.stringify(config, null, 2));
    return;
  }
  if (options.get) {
    const value = config[options.get];
    console.log(value !== void 0 ? JSON.stringify(value) : "Not set");
    return;
  }
  console.log(import_chalk3.default.gray("Use --list, --get <key>, or --set <key> <value>"));
});
program.command("models").description("List available models").action(() => {
  ensureAllDirs();
  const config = loadConfig();
  console.log(import_chalk3.default.cyan("Available Models:"));
  console.log(import_chalk3.default.gray("\u2500".repeat(40)));
  for (const provider of config.providers) {
    console.log(import_chalk3.default.green(`
${provider.name}:`));
    for (const [id, model] of Object.entries(provider.models)) {
      const freeTag = model.free ? import_chalk3.default.green(" (FREE)") : "";
      console.log(import_chalk3.default.white(`  ${provider.id}/${id} - ${model.name}${freeTag}`));
    }
  }
});
program.command("sessions").description("List recent sessions").action(() => {
  ensureAllDirs();
  const { SessionManager: SessionManager2 } = (init_session(), __toCommonJS(session_exports));
  const sm = new SessionManager2();
  const sessions = sm.list();
  if (sessions.length === 0) {
    console.log(import_chalk3.default.gray("No sessions found."));
    return;
  }
  console.log(import_chalk3.default.cyan("Recent Sessions:"));
  for (const session of sessions.slice(0, 10)) {
    const date = new Date(session.updated).toLocaleString();
    console.log(import_chalk3.default.white(`  ${session.id} - ${session.model} - ${date}`));
  }
});
program.command("lang").description("Change language").argument("[language]", "Language code (en/fa)").action((language) => {
  ensureAllDirs();
  const config = loadConfig();
  if (!language) {
    console.log(import_chalk3.default.cyan(`Current language: ${config.language}`));
    console.log(import_chalk3.default.gray("Usage: xyzai lang <en|fa>"));
    return;
  }
  if (language !== "en" && language !== "fa") {
    console.log(import_chalk3.default.red('Language must be "en" or "fa"'));
    return;
  }
  config.language = language;
  saveConfig(config);
  console.log(import_chalk3.default.green(`Language changed to ${language === "fa" ? "\u0641\u0627\u0631\u0633\u06CC" : "English"}`));
});
program.action(() => {
  ensureAllDirs();
  const { startTUI: startTUI2 } = (init_app(), __toCommonJS(app_exports));
  startTUI2();
});
program.parse();
