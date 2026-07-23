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

// node_modules/chalk/source/vendor/ansi-styles/index.js
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ANSI_BACKGROUND_OFFSET, wrapAnsi16, wrapAnsi256, wrapAnsi16m, styles, modifierNames, foregroundColorNames, backgroundColorNames, colorNames, ansiStyles, ansi_styles_default;
var init_ansi_styles = __esm({
  "node_modules/chalk/source/vendor/ansi-styles/index.js"() {
    "use strict";
    ANSI_BACKGROUND_OFFSET = 10;
    wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
    wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        gray: [90, 39],
        // Alias of `blackBright`
        grey: [90, 39],
        // Alias of `blackBright`
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgGray: [100, 49],
        // Alias of `bgBlackBright`
        bgGrey: [100, 49],
        // Alias of `bgBlackBright`
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    modifierNames = Object.keys(styles.modifier);
    foregroundColorNames = Object.keys(styles.color);
    backgroundColorNames = Object.keys(styles.bgColor);
    colorNames = [...foregroundColorNames, ...backgroundColorNames];
    ansiStyles = assembleStyles();
    ansi_styles_default = ansiStyles;
  }
});

// node_modules/chalk/source/vendor/supports-color/index.js
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process2.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process2.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var import_node_process2, import_node_os, import_node_tty, env, flagForceColor, supportsColor, supports_color_default;
var init_supports_color = __esm({
  "node_modules/chalk/source/vendor/supports-color/index.js"() {
    "use strict";
    import_node_process2 = __toESM(require("process"), 1);
    import_node_os = __toESM(require("os"), 1);
    import_node_tty = __toESM(require("tty"), 1);
    ({ env } = import_node_process2.default);
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    supportsColor = {
      stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
      stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
    };
    supports_color_default = supportsColor;
  }
});

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
var init_utilities = __esm({
  "node_modules/chalk/source/utilities.js"() {
    "use strict";
  }
});

// node_modules/chalk/source/index.js
function createChalk(options) {
  return chalkFactory(options);
}
var stdoutColor, stderrColor, GENERATOR, STYLER, IS_EMPTY, levelMapping, styles2, applyOptions, chalkFactory, getModelAnsi, usedModels, proto, createStyler, createBuilder, applyStyle, chalk, chalkStderr, source_default;
var init_source = __esm({
  "node_modules/chalk/source/index.js"() {
    "use strict";
    init_ansi_styles();
    init_supports_color();
    init_utilities();
    ({ stdout: stdoutColor, stderr: stderrColor } = supports_color_default);
    GENERATOR = /* @__PURE__ */ Symbol("GENERATOR");
    STYLER = /* @__PURE__ */ Symbol("STYLER");
    IS_EMPTY = /* @__PURE__ */ Symbol("IS_EMPTY");
    levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    styles2 = /* @__PURE__ */ Object.create(null);
    applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    chalkFactory = (options) => {
      const chalk2 = (...strings) => strings.join(" ");
      applyOptions(chalk2, options);
      Object.setPrototypeOf(chalk2, createChalk.prototype);
      return chalk2;
    };
    Object.setPrototypeOf(createChalk.prototype, Function.prototype);
    for (const [styleName, style] of Object.entries(ansi_styles_default)) {
      styles2[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles2.visible = {
      get() {
        const builder = createBuilder(this, this[STYLER], true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    getModelAnsi = (model, level, type, ...arguments_) => {
      if (model === "rgb") {
        if (level === "ansi16m") {
          return ansi_styles_default[type].ansi16m(...arguments_);
        }
        if (level === "ansi256") {
          return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
        }
        return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
      }
      if (model === "hex") {
        return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
      }
      return ansi_styles_default[type][model](...arguments_);
    };
    usedModels = ["rgb", "hex", "ansi256"];
    for (const model of usedModels) {
      styles2[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles2[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
    }
    proto = Object.defineProperties(() => {
    }, {
      ...styles2,
      level: {
        enumerable: true,
        get() {
          return this[GENERATOR].level;
        },
        set(level) {
          this[GENERATOR].level = level;
        }
      }
    });
    createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    createBuilder = (self, _styler, _isEmpty) => {
      const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      Object.setPrototypeOf(builder, proto);
      builder[GENERATOR] = self;
      builder[STYLER] = _styler;
      builder[IS_EMPTY] = _isEmpty;
      return builder;
    };
    applyStyle = (self, string) => {
      if (self.level <= 0 || !string) {
        return self[IS_EMPTY] ? "" : string;
      }
      let styler = self[STYLER];
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.includes("\x1B")) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    Object.defineProperties(createChalk.prototype, styles2);
    chalk = createChalk();
    chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
    source_default = chalk;
  }
});

// src/utils/paths.ts
function getConfigDir() {
  return path2.join(os2.homedir(), ".config", "xyzai");
}
function getDataDir() {
  return path2.join(os2.homedir(), ".local", "share", "xyzai");
}
function getStateDir() {
  return path2.join(os2.homedir(), ".local", "state", "xyzai");
}
function ensureDir(dir) {
  if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir, { recursive: true });
  }
}
function ensureAllDirs() {
  ensureDir(getConfigDir());
  ensureDir(getDataDir());
  ensureDir(getStateDir());
  ensureDir(path2.join(getDataDir(), "sessions"));
  ensureDir(path2.join(getDataDir(), "memory"));
}
var path2, os2, fs2;
var init_paths = __esm({
  "src/utils/paths.ts"() {
    "use strict";
    path2 = __toESM(require("path"));
    os2 = __toESM(require("os"));
    fs2 = __toESM(require("fs"));
  }
});

// src/config/schema.ts
var schema_exports = {};
__export(schema_exports, {
  getConfigPath: () => getConfigPath,
  getProviderById: () => getProviderById,
  loadConfig: () => loadConfig,
  parseModelString: () => parseModelString,
  saveConfig: () => saveConfig
});
function getConfigPath() {
  return path3.join(getConfigDir(), "config.json");
}
function loadConfig() {
  const configPath = getConfigPath();
  ensureDir(getConfigDir());
  if (fs3.existsSync(configPath)) {
    try {
      const raw = fs3.readFileSync(configPath, "utf-8");
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
  fs3.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
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
var fs3, path3, DEFAULT_PROVIDERS, DEFAULT_PERMISSIONS, DEFAULT_CONFIG;
var init_schema = __esm({
  "src/config/schema.ts"() {
    "use strict";
    fs3 = __toESM(require("fs"));
    path3 = __toESM(require("path"));
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

// node_modules/openai/internal/tslib.mjs
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
var init_tslib = __esm({
  "node_modules/openai/internal/tslib.mjs"() {
    "use strict";
  }
});

// node_modules/openai/internal/utils/uuid.mjs
var uuid4;
var init_uuid = __esm({
  "node_modules/openai/internal/utils/uuid.mjs"() {
    "use strict";
    uuid4 = function() {
      const { crypto: crypto2 } = globalThis;
      if (crypto2?.randomUUID) {
        uuid4 = crypto2.randomUUID.bind(crypto2);
        return crypto2.randomUUID();
      }
      const u8 = new Uint8Array(1);
      const randomByte = crypto2 ? () => crypto2.getRandomValues(u8)[0] : () => Math.random() * 255 & 255;
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (+c ^ randomByte() & 15 >> +c / 4).toString(16));
    };
  }
});

// node_modules/openai/internal/errors.mjs
function isAbortError(err) {
  return typeof err === "object" && err !== null && // Spec-compliant fetch implementations
  ("name" in err && err.name === "AbortError" || // Expo fetch
  "message" in err && String(err.message).includes("FetchRequestCanceledException"));
}
var castToError;
var init_errors = __esm({
  "node_modules/openai/internal/errors.mjs"() {
    "use strict";
    castToError = (err) => {
      if (err instanceof Error)
        return err;
      if (typeof err === "object" && err !== null) {
        try {
          if (Object.prototype.toString.call(err) === "[object Error]") {
            const error = new Error(err.message, err.cause ? { cause: err.cause } : {});
            if (err.stack)
              error.stack = err.stack;
            if (err.cause && !error.cause)
              error.cause = err.cause;
            if (err.name)
              error.name = err.name;
            return error;
          }
        } catch {
        }
        try {
          return new Error(JSON.stringify(err));
        } catch {
        }
      }
      return new Error(err);
    };
  }
});

// node_modules/openai/core/error.mjs
var OpenAIError, APIError, APIUserAbortError, APIConnectionError, APIConnectionTimeoutError, BadRequestError, AuthenticationError, PermissionDeniedError, NotFoundError, ConflictError, UnprocessableEntityError, RateLimitError, InternalServerError, LengthFinishReasonError, ContentFilterFinishReasonError, InvalidWebhookSignatureError, OAuthError, SubjectTokenProviderError;
var init_error = __esm({
  "node_modules/openai/core/error.mjs"() {
    "use strict";
    init_errors();
    OpenAIError = class extends Error {
    };
    APIError = class _APIError extends OpenAIError {
      constructor(status, error, message, headers) {
        super(`${_APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.requestID = headers?.get("x-request-id");
        this.error = error;
        const data = error;
        this.code = data?.["code"];
        this.param = data?.["param"];
        this.type = data?.["type"];
      }
      static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
          return new APIConnectionError({ message, cause: castToError(errorResponse) });
        }
        const error = errorResponse?.["error"];
        if (status === 400) {
          return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers);
        }
        return new _APIError(status, error, message, headers);
      }
    };
    APIUserAbortError = class extends APIError {
      constructor({ message } = {}) {
        super(void 0, void 0, message || "Request was aborted.", void 0);
      }
    };
    APIConnectionError = class extends APIError {
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        if (cause)
          this.cause = cause;
      }
    };
    APIConnectionTimeoutError = class extends APIConnectionError {
      constructor({ message } = {}) {
        super({ message: message ?? "Request timed out." });
      }
    };
    BadRequestError = class extends APIError {
    };
    AuthenticationError = class extends APIError {
    };
    PermissionDeniedError = class extends APIError {
    };
    NotFoundError = class extends APIError {
    };
    ConflictError = class extends APIError {
    };
    UnprocessableEntityError = class extends APIError {
    };
    RateLimitError = class extends APIError {
    };
    InternalServerError = class extends APIError {
    };
    LengthFinishReasonError = class extends OpenAIError {
      constructor() {
        super(`Could not parse response content as the length limit was reached`);
      }
    };
    ContentFilterFinishReasonError = class extends OpenAIError {
      constructor() {
        super(`Could not parse response content as the request was rejected by the content filter`);
      }
    };
    InvalidWebhookSignatureError = class extends Error {
      constructor(message) {
        super(message);
      }
    };
    OAuthError = class extends APIError {
      constructor(status, error, headers) {
        let finalMessage = "OAuth2 authentication error";
        let error_code = void 0;
        if (error && typeof error === "object") {
          const errorData = error;
          error_code = errorData["error"];
          const description = errorData["error_description"];
          if (description && typeof description === "string") {
            finalMessage = description;
          } else if (error_code) {
            finalMessage = error_code;
          }
        }
        super(status, error, finalMessage, headers);
        this.error_code = error_code;
      }
    };
    SubjectTokenProviderError = class extends OpenAIError {
      constructor(message, provider, cause) {
        super(message);
        this.provider = provider;
        this.cause = cause;
      }
    };
  }
});

// node_modules/openai/internal/utils/values.mjs
function maybeObj(x) {
  if (typeof x !== "object") {
    return {};
  }
  return x ?? {};
}
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isObj(obj) {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}
var startsWithSchemeRegexp, isAbsoluteURL, isArray, isReadonlyArray, validatePositiveInteger, safeJSON;
var init_values = __esm({
  "node_modules/openai/internal/utils/values.mjs"() {
    "use strict";
    init_error();
    startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
    isAbsoluteURL = (url) => {
      return startsWithSchemeRegexp.test(url);
    };
    isArray = (val) => (isArray = Array.isArray, isArray(val));
    isReadonlyArray = isArray;
    validatePositiveInteger = (name, n) => {
      if (typeof n !== "number" || !Number.isInteger(n)) {
        throw new OpenAIError(`${name} must be an integer`);
      }
      if (n < 0) {
        throw new OpenAIError(`${name} must be a positive integer`);
      }
      return n;
    };
    safeJSON = (text) => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return void 0;
      }
    };
  }
});

// node_modules/openai/internal/utils/sleep.mjs
var sleep;
var init_sleep = __esm({
  "node_modules/openai/internal/utils/sleep.mjs"() {
    "use strict";
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  }
});

// node_modules/openai/version.mjs
var VERSION;
var init_version = __esm({
  "node_modules/openai/version.mjs"() {
    "use strict";
    VERSION = "6.48.0";
  }
});

// node_modules/openai/internal/detect-platform.mjs
function getDetectedPlatform() {
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return "deno";
  }
  if (typeof EdgeRuntime !== "undefined") {
    return "edge";
  }
  if (Object.prototype.toString.call(typeof globalThis.process !== "undefined" ? globalThis.process : 0) === "[object process]") {
    return "node";
  }
  return "unknown";
}
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
var isRunningInBrowser, getPlatformProperties, normalizeArch, normalizePlatform, _platformHeaders, getPlatformHeaders;
var init_detect_platform = __esm({
  "node_modules/openai/internal/detect-platform.mjs"() {
    "use strict";
    init_version();
    isRunningInBrowser = () => {
      return (
        // @ts-ignore
        typeof window !== "undefined" && // @ts-ignore
        typeof window.document !== "undefined" && // @ts-ignore
        typeof navigator !== "undefined"
      );
    };
    getPlatformProperties = () => {
      const detectedPlatform = getDetectedPlatform();
      if (detectedPlatform === "deno") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": normalizePlatform(Deno.build.os),
          "X-Stainless-Arch": normalizeArch(Deno.build.arch),
          "X-Stainless-Runtime": "deno",
          "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
        };
      }
      if (typeof EdgeRuntime !== "undefined") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": `other:${EdgeRuntime}`,
          "X-Stainless-Runtime": "edge",
          "X-Stainless-Runtime-Version": globalThis.process.version
        };
      }
      if (detectedPlatform === "node") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": normalizePlatform(globalThis.process.platform ?? "unknown"),
          "X-Stainless-Arch": normalizeArch(globalThis.process.arch ?? "unknown"),
          "X-Stainless-Runtime": "node",
          "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
        };
      }
      const browserInfo = getBrowserInfo();
      if (browserInfo) {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": "unknown",
          "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
          "X-Stainless-Runtime-Version": browserInfo.version
        };
      }
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": VERSION,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": "unknown",
        "X-Stainless-Runtime-Version": "unknown"
      };
    };
    normalizeArch = (arch) => {
      if (arch === "x32")
        return "x32";
      if (arch === "x86_64" || arch === "x64")
        return "x64";
      if (arch === "arm")
        return "arm";
      if (arch === "aarch64" || arch === "arm64")
        return "arm64";
      if (arch)
        return `other:${arch}`;
      return "unknown";
    };
    normalizePlatform = (platform) => {
      platform = platform.toLowerCase();
      if (platform.includes("ios"))
        return "iOS";
      if (platform === "android")
        return "Android";
      if (platform === "darwin")
        return "MacOS";
      if (platform === "win32")
        return "Windows";
      if (platform === "freebsd")
        return "FreeBSD";
      if (platform === "openbsd")
        return "OpenBSD";
      if (platform === "linux")
        return "Linux";
      if (platform)
        return `Other:${platform}`;
      return "Unknown";
    };
    getPlatformHeaders = () => {
      return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
    };
  }
});

// node_modules/openai/internal/shims.mjs
function getDefaultFetch() {
  if (typeof fetch !== "undefined") {
    return fetch;
  }
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function makeReadableStream(...args) {
  const ReadableStream = globalThis.ReadableStream;
  if (typeof ReadableStream === "undefined") {
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  }
  return new ReadableStream(...args);
}
function ReadableStreamFrom(iterable) {
  let iter = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
  return makeReadableStream({
    start() {
    },
    async pull(controller) {
      const { done, value } = await iter.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    async cancel() {
      await iter.return?.();
    }
  });
}
function ReadableStreamToAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator])
    return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result?.done)
          reader.releaseLock();
        return result;
      } catch (e) {
        reader.releaseLock();
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function CancelReadableStream(stream) {
  if (stream === null || typeof stream !== "object")
    return;
  if (stream[Symbol.asyncIterator]) {
    await stream[Symbol.asyncIterator]().return?.();
    return;
  }
  const reader = stream.getReader();
  const cancelPromise = reader.cancel();
  reader.releaseLock();
  await cancelPromise;
}
var init_shims = __esm({
  "node_modules/openai/internal/shims.mjs"() {
    "use strict";
  }
});

// node_modules/openai/internal/request-options.mjs
var FallbackEncoder;
var init_request_options = __esm({
  "node_modules/openai/internal/request-options.mjs"() {
    "use strict";
    FallbackEncoder = ({ headers, body }) => {
      return {
        bodyHeaders: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      };
    };
  }
});

// node_modules/openai/internal/qs/formats.mjs
var default_format, default_formatter, formatters, RFC1738;
var init_formats = __esm({
  "node_modules/openai/internal/qs/formats.mjs"() {
    "use strict";
    default_format = "RFC3986";
    default_formatter = (v) => String(v);
    formatters = {
      RFC1738: (v) => String(v).replace(/%20/g, "+"),
      RFC3986: default_formatter
    };
    RFC1738 = "RFC1738";
  }
});

// node_modules/openai/internal/qs/utils.mjs
function is_buffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
function maybe_map(val, fn) {
  if (isArray(val)) {
    const mapped = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}
var has, hex_table, limit, encode;
var init_utils = __esm({
  "node_modules/openai/internal/qs/utils.mjs"() {
    "use strict";
    init_formats();
    init_values();
    has = (obj, key) => (has = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), has(obj, key));
    hex_table = /* @__PURE__ */ (() => {
      const array = [];
      for (let i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    })();
    limit = 1024;
    encode = (str2, _defaultEncoder, charset, _kind, format) => {
      if (str2.length === 0) {
        return str2;
      }
      let string = str2;
      if (typeof str2 === "symbol") {
        string = Symbol.prototype.toString.call(str2);
      } else if (typeof str2 !== "string") {
        string = String(str2);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      let out = "";
      for (let j = 0; j < string.length; j += limit) {
        const segment = string.length >= limit ? string.slice(j, j + limit) : string;
        const arr = [];
        for (let i = 0; i < segment.length; ++i) {
          let c = segment.charCodeAt(i);
          if (c === 45 || // -
          c === 46 || // .
          c === 95 || // _
          c === 126 || // ~
          c >= 48 && c <= 57 || // 0-9
          c >= 65 && c <= 90 || // a-z
          c >= 97 && c <= 122 || // A-Z
          format === RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hex_table[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
  }
});

// node_modules/openai/internal/qs/stringify.mjs
function is_non_nullish_primitive(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
}
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  let obj = object;
  let tmp_sc = sideChannel;
  let step = 0;
  let find_flag = false;
  while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
    const pos = tmp_sc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        find_flag = true;
      }
    }
    if (typeof tmp_sc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate?.(obj);
  } else if (generateArrayPrefix === "comma" && isArray(obj)) {
    obj = maybe_map(obj, function(value) {
      if (value instanceof Date) {
        return serializeDate?.(value);
      }
      return value;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? (
        // @ts-expect-error
        encoder(prefix, defaults.encoder, charset, "key", format)
      ) : prefix;
    }
    obj = "";
  }
  if (is_non_nullish_primitive(obj) || is_buffer(obj)) {
    if (encoder) {
      const key_value = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
      return [
        formatter?.(key_value) + "=" + // @ts-expect-error
        formatter?.(encoder(obj, defaults.encoder, charset, "value", format))
      ];
    }
    return [formatter?.(prefix) + "=" + formatter?.(String(obj))];
  }
  const values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  let obj_keys;
  if (generateArrayPrefix === "comma" && isArray(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = maybe_map(obj, encoder);
    }
    obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray(filter)) {
    obj_keys = filter;
  } else {
    const keys = Object.keys(obj);
    obj_keys = sort ? keys.sort(sort) : keys;
  }
  const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  const adjusted_prefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
  if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
    return adjusted_prefix + "[]";
  }
  for (let j = 0; j < obj_keys.length; ++j) {
    const key = obj_keys[j];
    const value = (
      // @ts-ignore
      typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
    );
    if (skipNulls && value === null) {
      continue;
    }
    const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
    const key_prefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
    sideChannel.set(object, step);
    const valueSideChannel = /* @__PURE__ */ new WeakMap();
    valueSideChannel.set(sentinel, sideChannel);
    push_to_array(values, inner_stringify(
      value,
      key_prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      // @ts-ignore
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
}
function normalize_stringify_options(opts = defaults) {
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  const charset = opts.charset || defaults.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  let format = default_format;
  if (typeof opts.format !== "undefined") {
    if (!has(formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  const formatter = formatters[format];
  let filter = defaults.filter;
  if (typeof opts.filter === "function" || isArray(opts.filter)) {
    filter = opts.filter;
  }
  let arrayFormat;
  if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
    // @ts-ignore
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
    // @ts-ignore
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
}
function stringify(object, opts = {}) {
  let obj = object;
  const options = normalize_stringify_options(opts);
  let obj_keys;
  let filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    obj_keys = filter;
  }
  const keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
  const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!obj_keys) {
    obj_keys = Object.keys(obj);
  }
  if (options.sort) {
    obj_keys.sort(options.sort);
  }
  const sideChannel = /* @__PURE__ */ new WeakMap();
  for (let i = 0; i < obj_keys.length; ++i) {
    const key = obj_keys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    push_to_array(keys, inner_stringify(
      obj[key],
      key,
      // @ts-expect-error
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel
    ));
  }
  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
}
var array_prefix_generators, push_to_array, toISOString, defaults, sentinel;
var init_stringify = __esm({
  "node_modules/openai/internal/qs/stringify.mjs"() {
    "use strict";
    init_utils();
    init_formats();
    init_values();
    array_prefix_generators = {
      brackets(prefix) {
        return String(prefix) + "[]";
      },
      comma: "comma",
      indices(prefix, key) {
        return String(prefix) + "[" + key + "]";
      },
      repeat(prefix) {
        return String(prefix);
      }
    };
    push_to_array = function(arr, value_or_array) {
      Array.prototype.push.apply(arr, isArray(value_or_array) ? value_or_array : [value_or_array]);
    };
    defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: encode,
      encodeValuesOnly: false,
      format: default_format,
      formatter: default_formatter,
      /** @deprecated */
      indices: false,
      serializeDate(date) {
        return (toISOString ?? (toISOString = Function.prototype.call.bind(Date.prototype.toISOString)))(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    sentinel = {};
  }
});

// node_modules/openai/internal/utils/query.mjs
function stringifyQuery(query) {
  return stringify(query, { arrayFormat: "brackets" });
}
var init_query = __esm({
  "node_modules/openai/internal/utils/query.mjs"() {
    "use strict";
    init_stringify();
  }
});

// node_modules/openai/internal/utils/bytes.mjs
function concatBytes(buffers) {
  let length = 0;
  for (const buffer of buffers) {
    length += buffer.length;
  }
  const output = new Uint8Array(length);
  let index = 0;
  for (const buffer of buffers) {
    output.set(buffer, index);
    index += buffer.length;
  }
  return output;
}
function encodeUTF8(str2) {
  let encoder;
  return (encodeUTF8_ ?? (encoder = new globalThis.TextEncoder(), encodeUTF8_ = encoder.encode.bind(encoder)))(str2);
}
function decodeUTF8(bytes) {
  let decoder;
  return (decodeUTF8_ ?? (decoder = new globalThis.TextDecoder(), decodeUTF8_ = decoder.decode.bind(decoder)))(bytes);
}
var encodeUTF8_, decodeUTF8_;
var init_bytes = __esm({
  "node_modules/openai/internal/utils/bytes.mjs"() {
    "use strict";
  }
});

// node_modules/openai/internal/decoders/line.mjs
function findNewlineIndex(buffer, startIndex) {
  const newline = 10;
  const carriage = 13;
  for (let i = startIndex ?? 0; i < buffer.length; i++) {
    if (buffer[i] === newline) {
      return { preceding: i, index: i + 1, carriage: false };
    }
    if (buffer[i] === carriage) {
      return { preceding: i, index: i + 1, carriage: true };
    }
  }
  return null;
}
function findDoubleNewlineIndex(buffer) {
  const newline = 10;
  const carriage = 13;
  for (let i = 0; i < buffer.length - 1; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === carriage) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
      return i + 4;
    }
  }
  return -1;
}
var _LineDecoder_buffer, _LineDecoder_carriageReturnIndex, LineDecoder;
var init_line = __esm({
  "node_modules/openai/internal/decoders/line.mjs"() {
    "use strict";
    init_tslib();
    init_bytes();
    LineDecoder = class {
      constructor() {
        _LineDecoder_buffer.set(this, void 0);
        _LineDecoder_carriageReturnIndex.set(this, void 0);
        __classPrivateFieldSet(this, _LineDecoder_buffer, new Uint8Array(), "f");
        __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
      }
      decode(chunk) {
        if (chunk == null) {
          return [];
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
        __classPrivateFieldSet(this, _LineDecoder_buffer, concatBytes([__classPrivateFieldGet(this, _LineDecoder_buffer, "f"), binaryChunk]), "f");
        const lines = [];
        let patternIndex;
        while ((patternIndex = findNewlineIndex(__classPrivateFieldGet(this, _LineDecoder_buffer, "f"), __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f"))) != null) {
          if (patternIndex.carriage && __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") == null) {
            __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, patternIndex.index, "f");
            continue;
          }
          if (__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") != null && (patternIndex.index !== __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") + 1 || patternIndex.carriage)) {
            lines.push(decodeUTF8(__classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(0, __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") - 1)));
            __classPrivateFieldSet(this, _LineDecoder_buffer, __classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f")), "f");
            __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
            continue;
          }
          const endIndex = __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") !== null ? patternIndex.preceding - 1 : patternIndex.preceding;
          const line = decodeUTF8(__classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(0, endIndex));
          lines.push(line);
          __classPrivateFieldSet(this, _LineDecoder_buffer, __classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(patternIndex.index), "f");
          __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
        }
        return lines;
      }
      flush() {
        if (!__classPrivateFieldGet(this, _LineDecoder_buffer, "f").length) {
          return [];
        }
        return this.decode("\n");
      }
    };
    _LineDecoder_buffer = /* @__PURE__ */ new WeakMap(), _LineDecoder_carriageReturnIndex = /* @__PURE__ */ new WeakMap();
    LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
    LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
  }
});

// node_modules/openai/internal/utils/log.mjs
function noop() {
}
function makeLogFn(fnLevel, logger, logLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    return logger[fnLevel].bind(logger);
  }
}
function loggerFor(client) {
  const logger = client.logger;
  const logLevel = client.logLevel ?? "off";
  if (!logger) {
    return noopLogger;
  }
  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }
  const levelLogger = {
    error: makeLogFn("error", logger, logLevel),
    warn: makeLogFn("warn", logger, logLevel),
    info: makeLogFn("info", logger, logLevel),
    debug: makeLogFn("debug", logger, logLevel)
  };
  cachedLoggers.set(logger, [logLevel, levelLogger]);
  return levelLogger;
}
var levelNumbers, parseLogLevel, noopLogger, cachedLoggers, formatRequestDetails;
var init_log = __esm({
  "node_modules/openai/internal/utils/log.mjs"() {
    "use strict";
    init_values();
    levelNumbers = {
      off: 0,
      error: 200,
      warn: 300,
      info: 400,
      debug: 500
    };
    parseLogLevel = (maybeLevel, sourceName, client) => {
      if (!maybeLevel) {
        return void 0;
      }
      if (hasOwn(levelNumbers, maybeLevel)) {
        return maybeLevel;
      }
      loggerFor(client).warn(`${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`);
      return void 0;
    };
    noopLogger = {
      error: noop,
      warn: noop,
      info: noop,
      debug: noop
    };
    cachedLoggers = /* @__PURE__ */ new WeakMap();
    formatRequestDetails = (details) => {
      if (details.options) {
        details.options = { ...details.options };
        delete details.options["headers"];
      }
      if (details.headers) {
        details.headers = Object.fromEntries((details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(([name, value]) => [
          name,
          name.toLowerCase() === "authorization" || name.toLowerCase() === "api-key" || name.toLowerCase() === "x-api-key" || name.toLowerCase() === "x-amz-security-token" || name.toLowerCase() === "cookie" || name.toLowerCase() === "set-cookie" ? "***" : value
        ]));
      }
      if ("retryOfRequestLogID" in details) {
        if (details.retryOfRequestLogID) {
          details.retryOf = details.retryOfRequestLogID;
        }
        delete details.retryOfRequestLogID;
      }
      return details;
    };
  }
});

// node_modules/openai/core/streaming.mjs
async function* _iterSSEMessages(response, controller) {
  if (!response.body) {
    controller.abort();
    if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") {
      throw new OpenAIError(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`);
    }
    throw new OpenAIError(`Attempted to iterate over a response with no body`);
  }
  const sseDecoder = new SSEDecoder();
  const lineDecoder = new LineDecoder();
  const iter = ReadableStreamToAsyncIterable(response.body);
  for await (const sseChunk of iterSSEChunks(iter)) {
    for (const line of lineDecoder.decode(sseChunk)) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield sse;
    }
  }
  for (const line of lineDecoder.flush()) {
    const sse = sseDecoder.decode(line);
    if (sse)
      yield sse;
  }
}
async function* iterSSEChunks(iterator) {
  let data = new Uint8Array();
  for await (const chunk of iterator) {
    if (chunk == null) {
      continue;
    }
    const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
    let newData = new Uint8Array(data.length + binaryChunk.length);
    newData.set(data);
    newData.set(binaryChunk, data.length);
    data = newData;
    let patternIndex;
    while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
      yield data.slice(0, patternIndex);
      data = data.slice(patternIndex);
    }
  }
  if (data.length > 0) {
    yield data;
  }
}
function partition(str2, delimiter) {
  const index = str2.indexOf(delimiter);
  if (index !== -1) {
    return [str2.substring(0, index), delimiter, str2.substring(index + delimiter.length)];
  }
  return [str2, "", ""];
}
var _Stream_client, Stream, SSEDecoder;
var init_streaming = __esm({
  "node_modules/openai/core/streaming.mjs"() {
    "use strict";
    init_tslib();
    init_error();
    init_shims();
    init_line();
    init_shims();
    init_errors();
    init_bytes();
    init_log();
    init_error();
    Stream = class _Stream {
      constructor(iterator, controller, client) {
        this.iterator = iterator;
        _Stream_client.set(this, void 0);
        this.controller = controller;
        __classPrivateFieldSet(this, _Stream_client, client, "f");
      }
      static fromSSEResponse(response, controller, client, synthesizeEventData) {
        let consumed = false;
        const logger = client ? loggerFor(client) : console;
        async function* iterator() {
          if (consumed) {
            throw new OpenAIError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          }
          consumed = true;
          let done = false;
          try {
            for await (const sse of _iterSSEMessages(response, controller)) {
              if (done)
                continue;
              if (sse.data.startsWith("[DONE]")) {
                done = true;
                continue;
              }
              if (sse.event === null || !sse.event.startsWith("thread.")) {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  logger.error(`Could not parse message into JSON:`, sse.data);
                  logger.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (data && data.error) {
                  throw new APIError(void 0, data.error, void 0, response.headers);
                }
                yield synthesizeEventData ? { event: sse.event, data } : data;
              } else {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  console.error(`Could not parse message into JSON:`, sse.data);
                  console.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (sse.event == "error") {
                  throw new APIError(void 0, data.error, data.message, void 0);
                }
                yield { event: sse.event, data };
              }
            }
            done = true;
          } catch (e) {
            if (isAbortError(e))
              return;
            throw e;
          } finally {
            if (!done)
              controller.abort();
          }
        }
        return new _Stream(iterator, controller, client);
      }
      /**
       * Generates a Stream from a newline-separated ReadableStream
       * where each item is a JSON value.
       */
      static fromReadableStream(readableStream, controller, client) {
        let consumed = false;
        async function* iterLines() {
          const lineDecoder = new LineDecoder();
          const reader = readableStream.getReader();
          let closed = false;
          let cancelPromise;
          const cancel = () => {
            cancelPromise ?? (cancelPromise = reader.cancel());
            cancelPromise.catch(() => {
            });
          };
          controller.signal.addEventListener("abort", cancel, { once: true });
          try {
            if (controller.signal.aborted) {
              cancel();
              return;
            }
            while (true) {
              const { value: chunk, done } = await reader.read();
              if (done) {
                closed = true;
                break;
              }
              if (controller.signal.aborted)
                return;
              for (const line of lineDecoder.decode(chunk)) {
                if (controller.signal.aborted)
                  return;
                yield line;
              }
            }
            if (controller.signal.aborted)
              return;
            for (const line of lineDecoder.flush()) {
              if (controller.signal.aborted)
                return;
              yield line;
            }
          } finally {
            controller.signal.removeEventListener("abort", cancel);
            if (!closed)
              cancel();
            reader.releaseLock();
          }
        }
        async function* iterator() {
          if (consumed) {
            throw new OpenAIError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          }
          consumed = true;
          let done = false;
          try {
            for await (const line of iterLines()) {
              if (done)
                continue;
              if (line)
                yield JSON.parse(line);
            }
            done = true;
          } catch (e) {
            if (controller.signal.aborted || isAbortError(e))
              return;
            throw e;
          } finally {
            if (!done)
              controller.abort();
          }
        }
        return new _Stream(iterator, controller, client);
      }
      [(_Stream_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
        return this.iterator();
      }
      /**
       * Splits the stream into two streams which can be
       * independently read from at different speeds.
       */
      tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = (queue) => {
          return {
            next: () => {
              if (queue.length === 0) {
                const result = iterator.next();
                left.push(result);
                right.push(result);
              }
              return queue.shift();
            }
          };
        };
        return [
          new _Stream(() => teeIterator(left), this.controller, __classPrivateFieldGet(this, _Stream_client, "f")),
          new _Stream(() => teeIterator(right), this.controller, __classPrivateFieldGet(this, _Stream_client, "f"))
        ];
      }
      /**
       * Converts this stream to a newline-separated ReadableStream of
       * JSON stringified values in the stream
       * which can be turned back into a Stream with `Stream.fromReadableStream()`.
       */
      toReadableStream() {
        const self = this;
        let iter;
        return makeReadableStream({
          async start() {
            iter = self[Symbol.asyncIterator]();
          },
          async pull(ctrl) {
            try {
              const { value, done } = await iter.next();
              if (done)
                return ctrl.close();
              const bytes = encodeUTF8(JSON.stringify(value) + "\n");
              ctrl.enqueue(bytes);
            } catch (err) {
              ctrl.error(err);
            }
          },
          async cancel() {
            await iter.return?.();
          }
        });
      }
    };
    SSEDecoder = class {
      constructor() {
        this.event = null;
        this.data = [];
        this.chunks = [];
      }
      decode(line) {
        if (line.endsWith("\r")) {
          line = line.substring(0, line.length - 1);
        }
        if (!line) {
          if (!this.event && !this.data.length)
            return null;
          const sse = {
            event: this.event,
            data: this.data.join("\n"),
            raw: this.chunks
          };
          this.event = null;
          this.data = [];
          this.chunks = [];
          return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(":")) {
          return null;
        }
        let [fieldname, _, value] = partition(line, ":");
        if (value.startsWith(" ")) {
          value = value.substring(1);
        }
        if (fieldname === "event") {
          this.event = value;
        } else if (fieldname === "data") {
          this.data.push(value);
        }
        return null;
      }
    };
  }
});

// node_modules/openai/internal/parse.mjs
async function defaultParseResponse(client, props) {
  const { response, requestLogID, retryOfRequestLogID, startTime } = props;
  const body = await (async () => {
    if (props.options.stream) {
      loggerFor(client).debug("response", response.status, response.url, response.headers, response.body);
      if (props.options.__streamClass) {
        return props.options.__streamClass.fromSSEResponse(response, props.controller, client, props.options.__synthesizeEventData);
      }
      return Stream.fromSSEResponse(response, props.controller, client, props.options.__synthesizeEventData);
    }
    if (response.status === 204) {
      return null;
    }
    if (props.options.__binaryResponse) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    const mediaType = contentType?.split(";")[0]?.trim();
    const isJSON = mediaType?.includes("application/json") || mediaType?.endsWith("+json");
    if (isJSON) {
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0") {
        return void 0;
      }
      const json = await response.json();
      return addRequestID(json, response);
    }
    const text = await response.text();
    return text;
  })();
  loggerFor(client).debug(`[${requestLogID}] response parsed`, formatRequestDetails({
    retryOfRequestLogID,
    url: response.url,
    status: response.status,
    body,
    durationMs: Date.now() - startTime
  }));
  return body;
}
function addRequestID(value, response) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  return Object.defineProperty(value, "_request_id", {
    value: response.headers.get("x-request-id"),
    enumerable: false
  });
}
var init_parse = __esm({
  "node_modules/openai/internal/parse.mjs"() {
    "use strict";
    init_streaming();
    init_log();
  }
});

// node_modules/openai/core/api-promise.mjs
var _APIPromise_client, APIPromise;
var init_api_promise = __esm({
  "node_modules/openai/core/api-promise.mjs"() {
    "use strict";
    init_tslib();
    init_parse();
    APIPromise = class _APIPromise extends Promise {
      constructor(client, responsePromise, parseResponse2 = defaultParseResponse) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse2;
        _APIPromise_client.set(this, void 0);
        __classPrivateFieldSet(this, _APIPromise_client, client, "f");
      }
      _thenUnwrap(transform) {
        return new _APIPromise(__classPrivateFieldGet(this, _APIPromise_client, "f"), this.responsePromise, async (client, props) => addRequestID(transform(await this.parseResponse(client, props), props), props.response));
      }
      /**
       * Gets the raw `Response` instance instead of parsing the response
       * data.
       *
       * If you want to parse the response body but still get the `Response`
       * instance, you can use {@link withResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
       * to your `tsconfig.json`.
       */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
       * Gets the parsed response data, the raw `Response` instance and the ID of the request,
       * returned via the X-Request-ID header which is useful for debugging requests and reporting
       * issues to OpenAI.
       *
       * If you just want to get the raw `Response` instance without parsing it,
       * you can use {@link asResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
       * to your `tsconfig.json`.
       */
      async withResponse() {
        const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
        return { data, response, request_id: response.headers.get("x-request-id") };
      }
      parse() {
        if (!this.parsedPromise) {
          this.parsedPromise = this.responsePromise.then((data) => this.parseResponse(__classPrivateFieldGet(this, _APIPromise_client, "f"), data));
        }
        return this.parsedPromise;
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    _APIPromise_client = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/openai/core/pagination.mjs
var _AbstractPage_client, AbstractPage, PagePromise, Page, CursorPage, ConversationCursorPage, NextCursorPage;
var init_pagination = __esm({
  "node_modules/openai/core/pagination.mjs"() {
    "use strict";
    init_tslib();
    init_error();
    init_parse();
    init_api_promise();
    init_values();
    AbstractPage = class {
      constructor(client, response, body, options) {
        _AbstractPage_client.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
      }
      hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length)
          return false;
        return this.nextPageRequestOptions() != null;
      }
      async getNextPage() {
        const nextOptions = this.nextPageRequestOptions();
        if (!nextOptions) {
          throw new OpenAIError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
        }
        return await __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    PagePromise = class extends APIPromise {
      constructor(client, request, Page2) {
        super(client, request, async (client2, props) => new Page2(client2, props.response, await defaultParseResponse(client2, props), props.options));
      }
      /**
       * Allow auto-paginating iteration on an unawaited list call, eg:
       *
       *    for await (const item of client.items.list()) {
       *      console.log(item)
       *    }
       */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    Page = class extends AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.object = body.object;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      nextPageRequestOptions() {
        return null;
      }
    };
    CursorPage = class extends AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        if (this.has_more === false) {
          return false;
        }
        return super.hasNextPage();
      }
      nextPageRequestOptions() {
        const data = this.getPaginatedItems();
        const id = data[data.length - 1]?.id;
        if (!id) {
          return null;
        }
        return {
          ...this.options,
          query: {
            ...maybeObj(this.options.query),
            after: id
          }
        };
      }
    };
    ConversationCursorPage = class extends AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
        this.last_id = body.last_id || "";
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        if (this.has_more === false) {
          return false;
        }
        return super.hasNextPage();
      }
      nextPageRequestOptions() {
        const cursor = this.last_id;
        if (!cursor) {
          return null;
        }
        return {
          ...this.options,
          query: {
            ...maybeObj(this.options.query),
            after: cursor
          }
        };
      }
    };
    NextCursorPage = class extends AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
        this.next = body.next || null;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        if (this.has_more === false) {
          return false;
        }
        return super.hasNextPage();
      }
      nextPageRequestOptions() {
        const cursor = this.next;
        if (!cursor) {
          return null;
        }
        return {
          ...this.options,
          query: {
            ...maybeObj(this.options.query),
            after: cursor
          }
        };
      }
    };
  }
});

// node_modules/openai/auth/workload-identity-auth.mjs
var SUBJECT_TOKEN_TYPES, TOKEN_EXCHANGE_GRANT_TYPE, WorkloadIdentityAuth;
var init_workload_identity_auth = __esm({
  "node_modules/openai/auth/workload-identity-auth.mjs"() {
    "use strict";
    init_shims();
    init_error();
    SUBJECT_TOKEN_TYPES = {
      jwt: "urn:ietf:params:oauth:token-type:jwt",
      id: "urn:ietf:params:oauth:token-type:id_token"
    };
    TOKEN_EXCHANGE_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    WorkloadIdentityAuth = class {
      constructor(config, fetch2) {
        this.cachedToken = null;
        this.refreshPromise = null;
        this.tokenExchangeUrl = "https://auth.openai.com/oauth/token";
        this.config = config;
        this.fetch = fetch2 ?? getDefaultFetch();
      }
      async getToken() {
        if (!this.cachedToken || this.isTokenExpired(this.cachedToken)) {
          if (this.refreshPromise) {
            return await this.refreshPromise;
          }
          this.refreshPromise = this.refreshToken();
          try {
            const token = await this.refreshPromise;
            return token;
          } finally {
            this.refreshPromise = null;
          }
        }
        if (this.needsRefresh(this.cachedToken) && !this.refreshPromise) {
          this.refreshPromise = this.refreshToken().finally(() => {
            this.refreshPromise = null;
          });
        }
        return this.cachedToken.token;
      }
      async refreshToken() {
        const subjectToken = await this.config.provider.getToken();
        const body = {
          grant_type: TOKEN_EXCHANGE_GRANT_TYPE,
          subject_token: subjectToken,
          subject_token_type: SUBJECT_TOKEN_TYPES[this.config.provider.tokenType],
          identity_provider_id: this.config.identityProviderId,
          service_account_id: this.config.serviceAccountId
        };
        if (this.config.clientId) {
          body["client_id"] = this.config.clientId;
        }
        const response = await this.fetch(this.tokenExchangeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          const errorText = await response.text();
          let body2 = void 0;
          try {
            body2 = JSON.parse(errorText);
          } catch {
          }
          if (response.status === 400 || response.status === 401 || response.status === 403) {
            throw new OAuthError(response.status, body2, response.headers);
          }
          throw APIError.generate(response.status, body2, `Token exchange failed with status ${response.status}`, response.headers);
        }
        const tokenResponse = await response.json();
        if (typeof tokenResponse !== "object" || tokenResponse === null || !("access_token" in tokenResponse) || typeof tokenResponse.access_token !== "string" || tokenResponse.access_token.trim().length === 0) {
          throw new OpenAIError("Token exchange response missing 'access_token' field");
        }
        const accessToken = tokenResponse.access_token;
        const expiresIn = tokenResponse.expires_in ?? 3600;
        const expiresAt = Date.now() + expiresIn * 1e3;
        this.cachedToken = {
          token: accessToken,
          expiresAt
        };
        return accessToken;
      }
      isTokenExpired(cachedToken) {
        return Date.now() >= cachedToken.expiresAt;
      }
      needsRefresh(cachedToken) {
        const bufferSeconds = this.config.refreshBufferSeconds ?? 1200;
        const bufferMs = bufferSeconds * 1e3;
        return Date.now() >= cachedToken.expiresAt - bufferMs;
      }
      invalidateToken() {
        this.cachedToken = null;
        this.refreshPromise = null;
      }
    };
  }
});

// node_modules/openai/internal/headers.mjs
function* iterateHeaders(headers) {
  if (!headers)
    return;
  if (brand_privateNullableHeaders in headers) {
    const { values, nulls } = headers;
    yield* values.entries();
    for (const name of nulls) {
      yield [name, null];
    }
    return;
  }
  let shouldClear = false;
  let iter;
  if (headers instanceof Headers) {
    iter = headers.entries();
  } else if (isReadonlyArray(headers)) {
    iter = headers;
  } else {
    shouldClear = true;
    iter = Object.entries(headers ?? {});
  }
  for (let row of iter) {
    const name = row[0];
    if (typeof name !== "string")
      throw new TypeError("expected header name to be a string");
    const values = isReadonlyArray(row[1]) ? row[1] : [row[1]];
    let didClear = false;
    for (const value of values) {
      if (value === void 0)
        continue;
      if (shouldClear && !didClear) {
        didClear = true;
        yield [name, null];
      }
      yield [name, value];
    }
  }
}
var brand_privateNullableHeaders, httpTokenHeaderName, buildHeaders;
var init_headers = __esm({
  "node_modules/openai/internal/headers.mjs"() {
    "use strict";
    init_values();
    brand_privateNullableHeaders = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
    httpTokenHeaderName = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    buildHeaders = (newHeaders) => {
      const targetHeaders = new Headers();
      const nullHeaders = /* @__PURE__ */ new Set();
      for (const headers of newHeaders) {
        const seenHeaders = /* @__PURE__ */ new Set();
        for (const [name, value] of iterateHeaders(headers)) {
          if (!httpTokenHeaderName.test(name)) {
            throw new TypeError(`Header name must be a valid HTTP token ["${name}"]`);
          }
          const lowerName = name.toLowerCase();
          if (!seenHeaders.has(lowerName)) {
            targetHeaders.delete(lowerName);
            seenHeaders.add(lowerName);
          }
          if (value === null) {
            targetHeaders.delete(lowerName);
            nullHeaders.add(lowerName);
          } else {
            targetHeaders.append(lowerName, value);
            nullHeaders.delete(lowerName);
          }
        }
      }
      return { [brand_privateNullableHeaders]: true, values: targetHeaders, nulls: nullHeaders };
    };
  }
});

// node_modules/openai/internal/uploads.mjs
function toStreamingFile(data, name, options) {
  if (!name) {
    throw new TypeError("toStreamingFile requires a non-empty file name");
  }
  return {
    [brand_privateStreamingFile]: true,
    data,
    name,
    ...options?.type ? { type: options.type } : {}
  };
}
function makeFile(fileBits, fileName, options) {
  checkFileSupport();
  return new File(fileBits, fileName ?? "unknown_file", options);
}
function getName(value) {
  return (typeof value === "object" && value !== null && ("name" in value && value.name && String(value.name) || "url" in value && value.url && String(value.url) || "filename" in value && value.filename && String(value.filename) || "path" in value && value.path && String(value.path)) || "").split(/[\\/]/).pop() || void 0;
}
function supportsFormData(fetchObject) {
  const fetch2 = typeof fetchObject === "function" ? fetchObject : fetchObject.fetch;
  const cached = supportsFormDataMap.get(fetch2);
  if (cached)
    return cached;
  const promise = (async () => {
    try {
      const FetchResponse = "Response" in fetch2 ? fetch2.Response : (await fetch2("data:,")).constructor;
      const data = new FormData();
      if (data.toString() === await new FetchResponse(data).text()) {
        return false;
      }
      return true;
    } catch {
      return true;
    }
  })();
  supportsFormDataMap.set(fetch2, promise);
  return promise;
}
async function* iterateMultipartBody(body, boundary) {
  for await (const { key, value } of iterateFormEntries(body)) {
    yield encodeUTF8(`--${boundary}\r
`);
    if (isUploadable(value)) {
      const filename = getStreamingFileName(value);
      const type = getStreamingFileType(value);
      yield encodeUTF8(`Content-Disposition: form-data; name="${escapeHeaderValue(key)}"; filename="${escapeHeaderValue(filename)}"\r
Content-Type: ${type}\r
\r
`);
      yield* iterateBytes(getStreamingFileData(value));
    } else {
      yield encodeUTF8(`Content-Disposition: form-data; name="${escapeHeaderValue(key)}"\r
\r
${String(value)}`);
    }
    yield encodeUTF8("\r\n");
  }
  yield encodeUTF8(`--${boundary}--\r
`);
}
async function* iterateFormEntries(body) {
  if (!body || typeof body !== "object")
    return;
  for (const [key, value] of Object.entries(body)) {
    yield* iterateFormValue(key, value);
  }
}
async function* iterateFormValue(key, value) {
  if (value === void 0)
    return;
  if (value == null) {
    throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || isUploadable(value)) {
    yield { key, value };
  } else if (Array.isArray(value)) {
    for (const entry of value) {
      yield* iterateFormValue(key + "[]", entry);
    }
  } else if (typeof value === "object") {
    for (const [name, prop] of Object.entries(value)) {
      yield* iterateFormValue(`${key}[${name}]`, prop);
    }
  } else {
    throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
  }
}
function getStreamingFileName(value) {
  return isStreamingFile(value) ? value.name : getName(value) ?? "unknown_file";
}
function getStreamingFileType(value) {
  if (isStreamingFile(value))
    return value.type || "application/octet-stream";
  if (isNamedBlob(value) && value.type)
    return value.type;
  if (value instanceof Response)
    return value.headers.get("content-type") || "application/octet-stream";
  return "application/octet-stream";
}
function getStreamingFileData(value) {
  if (isStreamingFile(value))
    return value.data;
  return value;
}
async function* iterateBytes(value) {
  if (typeof value === "string") {
    yield encodeUTF8(value);
  } else if (ArrayBuffer.isView(value)) {
    yield new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  } else if (value instanceof ArrayBuffer) {
    yield new Uint8Array(value);
  } else if (value instanceof Response) {
    if (value.body) {
      yield* iterateBytes(value.body);
    } else {
      yield* iterateBytes(await value.blob());
    }
  } else if (value instanceof Blob) {
    if (typeof value.stream === "function") {
      yield* iterateBytes(value.stream());
    } else {
      yield new Uint8Array(await value.arrayBuffer());
    }
  } else if (isReadableStream(value)) {
    for await (const chunk of ReadableStreamToAsyncIterable(value)) {
      yield* iterateBytes(chunk);
    }
  } else if (isAsyncIterable(value)) {
    for await (const chunk of value) {
      yield* iterateBytes(chunk);
    }
  } else {
    throw new TypeError(`Invalid streaming file chunk: ${String(value)}`);
  }
}
function escapeHeaderValue(value) {
  return value.replace(/["\\\r\n]/g, (character) => encodeURIComponent(character));
}
var brand_privateStreamingFile, checkFileSupport, isAsyncIterable, maybeMultipartFormRequestOptions, multipartFormRequestOptions, supportsFormDataMap, createForm, isNamedBlob, isReadableStream, isStreamingFile, isUploadable, hasStreamingUploadableValue, hasUploadableValue, createStreamingFormRequestOptions, addFormValue;
var init_uploads = __esm({
  "node_modules/openai/internal/uploads.mjs"() {
    "use strict";
    init_headers();
    init_shims();
    init_bytes();
    brand_privateStreamingFile = /* @__PURE__ */ Symbol("brand.privateStreamingFile");
    checkFileSupport = () => {
      if (typeof File === "undefined") {
        const { process: process4 } = globalThis;
        const isOldNode = typeof process4?.versions?.node === "string" && parseInt(process4.versions.node.split(".")) < 20;
        throw new Error("`File` is not defined as a global, which is required for file uploads." + (isOldNode ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
      }
    };
    isAsyncIterable = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";
    maybeMultipartFormRequestOptions = async (opts, fetch2) => {
      if (!hasUploadableValue(opts.body))
        return opts;
      if (hasStreamingUploadableValue(opts.body)) {
        return createStreamingFormRequestOptions(opts);
      }
      return { ...opts, body: await createForm(opts.body, fetch2) };
    };
    multipartFormRequestOptions = async (opts, fetch2) => {
      if (hasStreamingUploadableValue(opts.body)) {
        return createStreamingFormRequestOptions(opts);
      }
      return { ...opts, body: await createForm(opts.body, fetch2) };
    };
    supportsFormDataMap = /* @__PURE__ */ new WeakMap();
    createForm = async (body, fetch2) => {
      if (!await supportsFormData(fetch2)) {
        throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
      }
      const form = new FormData();
      await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
      return form;
    };
    isNamedBlob = (value) => value instanceof Blob && "name" in value;
    isReadableStream = (value) => typeof value === "object" && value !== null && "getReader" in value && typeof value.getReader === "function";
    isStreamingFile = (value) => typeof value === "object" && value !== null && brand_privateStreamingFile in value;
    isUploadable = (value) => typeof value === "object" && value !== null && (value instanceof Response || isAsyncIterable(value) || isReadableStream(value) || isStreamingFile(value) || isNamedBlob(value));
    hasStreamingUploadableValue = (value) => {
      if (isStreamingFile(value) || isAsyncIterable(value) || isReadableStream(value))
        return true;
      if (Array.isArray(value))
        return value.some(hasStreamingUploadableValue);
      if (value && typeof value === "object" && !isNamedBlob(value) && !(value instanceof Response)) {
        for (const k in value) {
          if (hasStreamingUploadableValue(value[k]))
            return true;
        }
      }
      return false;
    };
    hasUploadableValue = (value) => {
      if (isUploadable(value))
        return true;
      if (Array.isArray(value))
        return value.some(hasUploadableValue);
      if (value && typeof value === "object") {
        for (const k in value) {
          if (hasUploadableValue(value[k]))
            return true;
        }
      }
      return false;
    };
    createStreamingFormRequestOptions = (opts) => {
      const boundary = `openai-${Math.random().toString(36).slice(2)}`;
      const body = ReadableStreamFrom(iterateMultipartBody(opts.body, boundary));
      return {
        ...opts,
        body,
        headers: buildHeaders([{ "content-type": `multipart/form-data; boundary=${boundary}` }, opts.headers])
      };
    };
    addFormValue = async (form, key, value) => {
      if (value === void 0)
        return;
      if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
      }
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        form.append(key, String(value));
      } else if (value instanceof Response) {
        form.append(key, makeFile([await value.blob()], getName(value)));
      } else if (isAsyncIterable(value)) {
        form.append(key, makeFile([await new Response(ReadableStreamFrom(value)).blob()], getName(value)));
      } else if (isNamedBlob(value)) {
        form.append(key, value, getName(value));
      } else if (Array.isArray(value)) {
        await Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry)));
      } else if (typeof value === "object") {
        await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
      } else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
      }
    };
  }
});

// node_modules/openai/internal/to-file.mjs
async function toFile(value, name, options) {
  checkFileSupport();
  value = await value;
  if (isFileLike(value)) {
    if (value instanceof File) {
      return value;
    }
    return makeFile([await value.arrayBuffer()], value.name);
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop());
    return makeFile(await getBytes(blob), name, options);
  }
  const parts = await getBytes(value);
  name || (name = getName(value));
  if (!options?.type) {
    const type = parts.find((part) => typeof part === "object" && "type" in part && part.type);
    if (typeof type === "string") {
      options = { ...options, type };
    }
  }
  return makeFile(parts, name, options);
}
async function getBytes(value) {
  let parts = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(value instanceof Blob ? value : await value.arrayBuffer());
  } else if (isAsyncIterable(value)) {
    for await (const chunk of value) {
      parts.push(...await getBytes(chunk));
    }
  } else {
    const constructor = value?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof value}${constructor ? `; constructor: ${constructor}` : ""}${propsForError(value)}`);
  }
  return parts;
}
function propsForError(value) {
  if (typeof value !== "object" || value === null)
    return "";
  const props = Object.getOwnPropertyNames(value);
  return `; props: [${props.map((p) => `"${p}"`).join(", ")}]`;
}
var isBlobLike, isFileLike, isResponseLike;
var init_to_file = __esm({
  "node_modules/openai/internal/to-file.mjs"() {
    "use strict";
    init_uploads();
    init_uploads();
    isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
    isFileLike = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value);
    isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
  }
});

// node_modules/openai/core/uploads.mjs
var init_uploads2 = __esm({
  "node_modules/openai/core/uploads.mjs"() {
    "use strict";
    init_uploads();
    init_to_file();
  }
});

// node_modules/openai/core/resource.mjs
var APIResource;
var init_resource = __esm({
  "node_modules/openai/core/resource.mjs"() {
    "use strict";
    APIResource = class {
      constructor(client) {
        this._client = client;
      }
    };
  }
});

// node_modules/openai/internal/utils/path.mjs
function encodeURIPath(str2) {
  return str2.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var EMPTY, createPathTagFunction, path4;
var init_path = __esm({
  "node_modules/openai/internal/utils/path.mjs"() {
    "use strict";
    init_error();
    EMPTY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null));
    createPathTagFunction = (pathEncoder = encodeURIPath) => function path7(statics, ...params) {
      if (statics.length === 1)
        return statics[0];
      let postPath = false;
      const invalidSegments = [];
      const path8 = statics.reduce((previousValue, currentValue, index) => {
        if (/[?#]/.test(currentValue)) {
          postPath = true;
        }
        const value = params[index];
        let encoded = (postPath ? encodeURIComponent : pathEncoder)("" + value);
        if (index !== params.length && (value == null || typeof value === "object" && // handle values from other realms
        value.toString === Object.getPrototypeOf(Object.getPrototypeOf(value.hasOwnProperty ?? EMPTY) ?? EMPTY)?.toString)) {
          encoded = value + "";
          invalidSegments.push({
            start: previousValue.length + currentValue.length,
            length: encoded.length,
            error: `Value of type ${Object.prototype.toString.call(value).slice(8, -1)} is not a valid path parameter`
          });
        }
        return previousValue + currentValue + (index === params.length ? "" : encoded);
      }, "");
      const pathOnly = path8.split(/[?#]/, 1)[0];
      const invalidSegmentPattern = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
      let match;
      while ((match = invalidSegmentPattern.exec(pathOnly)) !== null) {
        invalidSegments.push({
          start: match.index,
          length: match[0].length,
          error: `Value "${match[0]}" can't be safely passed as a path parameter`
        });
      }
      invalidSegments.sort((a, b) => a.start - b.start);
      if (invalidSegments.length > 0) {
        let lastEnd = 0;
        const underline = invalidSegments.reduce((acc, segment) => {
          const spaces = " ".repeat(segment.start - lastEnd);
          const arrows = "^".repeat(segment.length);
          lastEnd = segment.start + segment.length;
          return acc + spaces + arrows;
        }, "");
        throw new OpenAIError(`Path parameters result in path with invalid segments:
${invalidSegments.map((e) => e.error).join("\n")}
${path8}
${underline}`);
      }
      return path8;
    };
    path4 = /* @__PURE__ */ createPathTagFunction(encodeURIPath);
  }
});

// node_modules/openai/resources/chat/completions/messages.mjs
var Messages;
var init_messages = __esm({
  "node_modules/openai/resources/chat/completions/messages.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Messages = class extends APIResource {
      /**
       * Get the messages in a stored chat completion. Only Chat Completions that have
       * been created with the `store` parameter set to `true` will be returned.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const chatCompletionStoreMessage of client.chat.completions.messages.list(
       *   'completion_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(completionID, query = {}, options) {
        return this._client.getAPIList(path4`/chat/completions/${completionID}/messages`, CursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/error.mjs
var init_error2 = __esm({
  "node_modules/openai/error.mjs"() {
    "use strict";
    init_error();
  }
});

// node_modules/openai/lib/parser.mjs
function isChatCompletionFunctionTool(tool) {
  return tool !== void 0 && "function" in tool && tool.function !== void 0;
}
function isAutoParsableResponseFormat(response_format) {
  return response_format?.["$brand"] === "auto-parseable-response-format";
}
function isAutoParsableTool(tool) {
  return tool?.["$brand"] === "auto-parseable-tool";
}
function maybeParseChatCompletion(completion, params) {
  if (!params || !hasAutoParseableInput(params)) {
    return {
      ...completion,
      choices: completion.choices.map((choice) => {
        assertToolCallsAreChatCompletionFunctionToolCalls(choice.message.tool_calls);
        return {
          ...choice,
          message: {
            ...choice.message,
            parsed: null,
            ...choice.message.tool_calls ? {
              tool_calls: choice.message.tool_calls
            } : void 0
          }
        };
      })
    };
  }
  return parseChatCompletion(completion, params);
}
function parseChatCompletion(completion, params) {
  const choices = completion.choices.map((choice) => {
    if (choice.finish_reason === "length") {
      throw new LengthFinishReasonError();
    }
    if (choice.finish_reason === "content_filter") {
      throw new ContentFilterFinishReasonError();
    }
    assertToolCallsAreChatCompletionFunctionToolCalls(choice.message.tool_calls);
    return {
      ...choice,
      message: {
        ...choice.message,
        ...choice.message.tool_calls ? {
          tool_calls: choice.message.tool_calls?.map((toolCall) => parseToolCall(params, toolCall)) ?? void 0
        } : void 0,
        parsed: choice.message.content && !choice.message.refusal ? parseResponseFormat(params, choice.message.content) : null
      }
    };
  });
  return { ...completion, choices };
}
function parseResponseFormat(params, content) {
  if (params.response_format?.type !== "json_schema") {
    return null;
  }
  if (params.response_format?.type === "json_schema") {
    if ("$parseRaw" in params.response_format) {
      const response_format = params.response_format;
      return response_format.$parseRaw(content);
    }
    return JSON.parse(content);
  }
  return null;
}
function parseToolCall(params, toolCall) {
  const inputTool = params.tools?.find((inputTool2) => isChatCompletionFunctionTool(inputTool2) && inputTool2.function?.name === toolCall.function.name);
  return {
    ...toolCall,
    function: {
      ...toolCall.function,
      parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCall.function.arguments) : null
    }
  };
}
function shouldParseToolCall(params, toolCall) {
  if (!params || !("tools" in params) || !params.tools) {
    return false;
  }
  const inputTool = params.tools?.find((inputTool2) => isChatCompletionFunctionTool(inputTool2) && inputTool2.function?.name === toolCall.function.name);
  return isChatCompletionFunctionTool(inputTool) && (isAutoParsableTool(inputTool) || inputTool?.function.strict || false);
}
function hasAutoParseableInput(params) {
  if (isAutoParsableResponseFormat(params.response_format)) {
    return true;
  }
  return params.tools?.some((t) => isAutoParsableTool(t) || t.type === "function" && t.function.strict === true) ?? false;
}
function assertToolCallsAreChatCompletionFunctionToolCalls(toolCalls) {
  for (const toolCall of toolCalls || []) {
    if (toolCall.type !== "function") {
      throw new OpenAIError(`Currently only \`function\` tool calls are supported; Received \`${toolCall.type}\``);
    }
  }
}
function validateInputTools(tools) {
  for (const tool of tools ?? []) {
    if (tool.type !== "function") {
      throw new OpenAIError(`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
    }
    if (tool.function.strict !== true) {
      throw new OpenAIError(`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
    }
  }
}
var init_parser = __esm({
  "node_modules/openai/lib/parser.mjs"() {
    "use strict";
    init_error2();
  }
});

// node_modules/openai/lib/chatCompletionUtils.mjs
var isAssistantMessage, isToolMessage;
var init_chatCompletionUtils = __esm({
  "node_modules/openai/lib/chatCompletionUtils.mjs"() {
    "use strict";
    isAssistantMessage = (message) => {
      return message?.role === "assistant";
    };
    isToolMessage = (message) => {
      return message?.role === "tool";
    };
  }
});

// node_modules/openai/lib/EventStream.mjs
var _EventStream_instances, _EventStream_connectedPromise, _EventStream_resolveConnectedPromise, _EventStream_rejectConnectedPromise, _EventStream_endPromise, _EventStream_resolveEndPromise, _EventStream_rejectEndPromise, _EventStream_listeners, _EventStream_abortListeners, _EventStream_ended, _EventStream_errored, _EventStream_aborted, _EventStream_catchingPromiseCreated, _EventStream_removeAbortListeners, _EventStream_handleError, EventStream;
var init_EventStream = __esm({
  "node_modules/openai/lib/EventStream.mjs"() {
    "use strict";
    init_tslib();
    init_error2();
    EventStream = class {
      constructor() {
        _EventStream_instances.add(this);
        this.controller = new AbortController();
        _EventStream_connectedPromise.set(this, void 0);
        _EventStream_resolveConnectedPromise.set(this, () => {
        });
        _EventStream_rejectConnectedPromise.set(this, () => {
        });
        _EventStream_endPromise.set(this, void 0);
        _EventStream_resolveEndPromise.set(this, () => {
        });
        _EventStream_rejectEndPromise.set(this, () => {
        });
        _EventStream_listeners.set(this, {});
        _EventStream_abortListeners.set(this, []);
        _EventStream_ended.set(this, false);
        _EventStream_errored.set(this, false);
        _EventStream_aborted.set(this, false);
        _EventStream_catchingPromiseCreated.set(this, false);
        __classPrivateFieldSet(this, _EventStream_connectedPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_resolveConnectedPromise, resolve, "f");
          __classPrivateFieldSet(this, _EventStream_rejectConnectedPromise, reject, "f");
        }), "f");
        __classPrivateFieldSet(this, _EventStream_endPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_resolveEndPromise, resolve, "f");
          __classPrivateFieldSet(this, _EventStream_rejectEndPromise, reject, "f");
        }), "f");
        __classPrivateFieldGet(this, _EventStream_connectedPromise, "f").catch(() => {
        });
        __classPrivateFieldGet(this, _EventStream_endPromise, "f").catch(() => {
        });
      }
      _run(executor) {
        setTimeout(() => {
          Promise.resolve().then(executor).then(() => {
            try {
              this._emitFinal();
            } catch (error) {
              __classPrivateFieldGet(this, _EventStream_instances, "m", _EventStream_handleError).call(this, error);
              return;
            }
            this._emit("end");
          }, __classPrivateFieldGet(this, _EventStream_instances, "m", _EventStream_handleError).bind(this));
        }, 0);
      }
      _connected() {
        if (this.ended)
          return;
        __classPrivateFieldGet(this, _EventStream_resolveConnectedPromise, "f").call(this);
        this._emit("connect");
      }
      get ended() {
        return __classPrivateFieldGet(this, _EventStream_ended, "f");
      }
      get errored() {
        return __classPrivateFieldGet(this, _EventStream_errored, "f");
      }
      get aborted() {
        return __classPrivateFieldGet(this, _EventStream_aborted, "f");
      }
      abort() {
        this.controller.abort();
      }
      _listenForAbort(signal) {
        if (!signal || this.ended)
          return;
        if (signal.aborted) {
          this.controller.abort();
          return;
        }
        const listener = () => this.controller.abort();
        signal.addEventListener("abort", listener, { once: true });
        __classPrivateFieldGet(this, _EventStream_abortListeners, "f").push({ signal, listener });
      }
      /**
       * Adds the listener function to the end of the listeners array for the event.
       * No checks are made to see if the listener has already been added. Multiple calls passing
       * the same combination of event and listener will result in the listener being added, and
       * called, multiple times.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      on(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({ listener });
        return this;
      }
      /**
       * Removes the specified listener from the listener array for the event.
       * off() will remove, at most, one instance of a listener from the listener array. If any single
       * listener has been added multiple times to the listener array for the specified event, then
       * off() must be called multiple times to remove each instance.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      off(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event];
        if (!listeners)
          return this;
        const index = listeners.findIndex((l) => l.listener === listener);
        if (index >= 0)
          listeners.splice(index, 1);
        return this;
      }
      /**
       * Adds a one-time listener function for the event. The next time the event is triggered,
       * this listener is removed and then invoked.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      once(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({ listener, once: true });
        return this;
      }
      /**
       * This is similar to `.once()`, but returns a Promise that resolves the next time
       * the event is triggered, instead of calling a listener callback.
       * @returns a Promise that resolves the next time given event is triggered,
       * or rejects if an error is emitted.  (If you request the 'error' event,
       * returns a promise that resolves with the error).
       *
       * Example:
       *
       *   const message = await stream.emitted('message') // rejects if the stream errors
       */
      emitted(event) {
        return new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_catchingPromiseCreated, true, "f");
          if (event !== "error")
            this.once("error", reject);
          this.once(event, resolve);
        });
      }
      /**
       * Returns an async iterator that yields every time the event is triggered.
       * The iterator ends when the stream ends and rejects if the stream errors
       * or is aborted. If you request the 'error' or 'abort' event, the iterator
       * yields that event instead of rejecting.
       *
       * Example:
       *
       *   for await (const [message] of stream.events('message')) {
       *     await processMessage(message);
       *   }
       */
      events(event) {
        const pushQueue = [];
        const readQueue = [];
        let ended = this.ended;
        let failure;
        let failureDelivered = false;
        const doneResult = () => ({ value: void 0, done: true });
        const finishReaders = () => {
          while (readQueue.length) {
            readQueue.shift().resolve(doneResult());
          }
        };
        const rejectReader = () => {
          if (!failure || failureDelivered || !readQueue.length)
            return;
          failureDelivered = true;
          readQueue.shift().reject(failure);
        };
        const cleanup = () => {
          this.off(event, onEvent);
          this.off("end", onEnd);
          if (event !== "error")
            this.off("error", onFailure);
          if (event !== "abort")
            this.off("abort", onFailure);
        };
        const onEvent = (...args) => {
          if (ended)
            return;
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve({ value: args, done: false });
          } else {
            pushQueue.push(args);
          }
        };
        const onFailure = (error) => {
          failure = error;
          if (!pushQueue.length)
            rejectReader();
        };
        const onEnd = () => {
          ended = true;
          cleanup();
          if (!pushQueue.length) {
            rejectReader();
            finishReaders();
          }
        };
        if (!ended) {
          this.on(event, onEvent);
          this.on("end", onEnd);
          if (event !== "error")
            this.on("error", onFailure);
          if (event !== "abort")
            this.on("abort", onFailure);
        }
        return {
          next: () => {
            const value = pushQueue.shift();
            if (value)
              return Promise.resolve({ value, done: false });
            if (failure && !failureDelivered) {
              failureDelivered = true;
              return Promise.reject(failure);
            }
            if (ended)
              return Promise.resolve(doneResult());
            return new Promise((resolve, reject) => {
              readQueue.push({ resolve, reject });
            });
          },
          return: () => {
            ended = true;
            pushQueue.length = 0;
            cleanup();
            finishReaders();
            return Promise.resolve(doneResult());
          },
          [Symbol.asyncIterator]() {
            return this;
          }
        };
      }
      async done() {
        __classPrivateFieldSet(this, _EventStream_catchingPromiseCreated, true, "f");
        await __classPrivateFieldGet(this, _EventStream_endPromise, "f");
      }
      _emit(event, ...args) {
        if (__classPrivateFieldGet(this, _EventStream_ended, "f")) {
          return;
        }
        if (event === "end") {
          __classPrivateFieldGet(this, _EventStream_instances, "m", _EventStream_removeAbortListeners).call(this);
          __classPrivateFieldSet(this, _EventStream_ended, true, "f");
          __classPrivateFieldGet(this, _EventStream_resolveEndPromise, "f").call(this);
        }
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event];
        if (listeners) {
          __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = listeners.filter((l) => !l.once);
          listeners.forEach(({ listener }) => listener(...args));
        }
        if (event === "abort") {
          const error = args[0];
          if (!__classPrivateFieldGet(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
            Promise.reject(error);
          }
          __classPrivateFieldGet(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
          __classPrivateFieldGet(this, _EventStream_rejectEndPromise, "f").call(this, error);
          this._emit("end");
          return;
        }
        if (event === "error") {
          const error = args[0];
          if (!__classPrivateFieldGet(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
            Promise.reject(error);
          }
          __classPrivateFieldGet(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
          __classPrivateFieldGet(this, _EventStream_rejectEndPromise, "f").call(this, error);
          this._emit("end");
        }
      }
      _emitFinal() {
      }
    };
    _EventStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_endPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_listeners = /* @__PURE__ */ new WeakMap(), _EventStream_abortListeners = /* @__PURE__ */ new WeakMap(), _EventStream_ended = /* @__PURE__ */ new WeakMap(), _EventStream_errored = /* @__PURE__ */ new WeakMap(), _EventStream_aborted = /* @__PURE__ */ new WeakMap(), _EventStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _EventStream_instances = /* @__PURE__ */ new WeakSet(), _EventStream_removeAbortListeners = function _EventStream_removeAbortListeners2() {
      for (const { signal, listener } of __classPrivateFieldGet(this, _EventStream_abortListeners, "f").splice(0)) {
        signal.removeEventListener("abort", listener);
      }
    }, _EventStream_handleError = function _EventStream_handleError2(error) {
      __classPrivateFieldSet(this, _EventStream_errored, true, "f");
      if (error instanceof Error && error.name === "AbortError") {
        error = new APIUserAbortError();
      }
      if (error instanceof APIUserAbortError) {
        __classPrivateFieldSet(this, _EventStream_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof OpenAIError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const openAIError = new OpenAIError(error.message);
        openAIError.cause = error;
        return this._emit("error", openAIError);
      }
      return this._emit("error", new OpenAIError(String(error)));
    };
  }
});

// node_modules/openai/lib/RunnableFunction.mjs
function isRunnableFunctionWithParse(fn) {
  return typeof fn.parse === "function";
}
var init_RunnableFunction = __esm({
  "node_modules/openai/lib/RunnableFunction.mjs"() {
    "use strict";
  }
});

// node_modules/openai/lib/AbstractChatCompletionRunner.mjs
function normalizeToolCallIds(chatCompletion) {
  for (const choice of chatCompletion.choices) {
    for (const toolCall of choice.message.tool_calls ?? []) {
      if (!toolCall.id) {
        toolCall.id = `call_${uuid4()}`;
      }
    }
  }
}
var _AbstractChatCompletionRunner_instances, _AbstractChatCompletionRunner_getFinalContent, _AbstractChatCompletionRunner_getFinalMessage, _AbstractChatCompletionRunner_getFinalFunctionToolCall, _AbstractChatCompletionRunner_getFinalFunctionToolCallResult, _AbstractChatCompletionRunner_calculateTotalUsage, _AbstractChatCompletionRunner_validateParams, _AbstractChatCompletionRunner_stringifyFunctionCallResult, DEFAULT_MAX_CHAT_COMPLETIONS, AbstractChatCompletionRunner;
var init_AbstractChatCompletionRunner = __esm({
  "node_modules/openai/lib/AbstractChatCompletionRunner.mjs"() {
    "use strict";
    init_tslib();
    init_error2();
    init_uuid();
    init_parser();
    init_chatCompletionUtils();
    init_EventStream();
    init_RunnableFunction();
    DEFAULT_MAX_CHAT_COMPLETIONS = 10;
    AbstractChatCompletionRunner = class extends EventStream {
      constructor() {
        super(...arguments);
        _AbstractChatCompletionRunner_instances.add(this);
        this._chatCompletions = [];
        this.messages = [];
      }
      _addChatCompletion(chatCompletion) {
        normalizeToolCallIds(chatCompletion);
        this._chatCompletions.push(chatCompletion);
        this._emit("chatCompletion", chatCompletion);
        const message = chatCompletion.choices[0]?.message;
        if (message)
          this._addMessage(message);
        return chatCompletion;
      }
      _addMessage(message, emit = true) {
        if (!("content" in message))
          message.content = null;
        this.messages.push(message);
        if (emit) {
          this._emit("message", message);
          if (isToolMessage(message) && message.content) {
            this._emit("functionToolCallResult", message.content);
          } else if (isAssistantMessage(message) && message.tool_calls) {
            for (const tool_call of message.tool_calls) {
              if (tool_call.type === "function") {
                this._emit("functionToolCall", tool_call.function);
              }
            }
          }
        }
      }
      /**
       * @returns a promise that resolves with the final ChatCompletion, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
       */
      async finalChatCompletion() {
        await this.done();
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (!completion)
          throw new OpenAIError("stream ended without producing a ChatCompletion");
        return completion;
      }
      /**
       * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalContent() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
      }
      /**
       * @returns a promise that resolves with the final assistant ChatCompletionMessage response,
       * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalMessage() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
      }
      /**
       * @returns a promise that resolves with the content of the final FunctionCall, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalFunctionToolCall() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCall).call(this);
      }
      async finalFunctionToolCallResult() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCallResult).call(this);
      }
      async totalUsage() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
      }
      allChatCompletions() {
        return [...this._chatCompletions];
      }
      _emitFinal() {
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (completion)
          this._emit("finalChatCompletion", completion);
        const finalMessage = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
        if (finalMessage)
          this._emit("finalMessage", finalMessage);
        const finalContent = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
        if (finalContent)
          this._emit("finalContent", finalContent);
        const finalFunctionCall = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCall).call(this);
        if (finalFunctionCall)
          this._emit("finalFunctionToolCall", finalFunctionCall);
        const finalFunctionCallResult = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCallResult).call(this);
        if (finalFunctionCallResult != null)
          this._emit("finalFunctionToolCallResult", finalFunctionCallResult);
        if (this._chatCompletions.some((c) => c.usage)) {
          this._emit("totalUsage", __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
        }
      }
      async _createChatCompletion(client, params, options) {
        this._listenForAbort(options?.signal);
        __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
        const chatCompletion = await client.chat.completions.create({ ...params, stream: false }, { ...options, signal: this.controller.signal });
        this._connected();
        return this._addChatCompletion(parseChatCompletion(chatCompletion, params));
      }
      async _runChatCompletion(client, params, options) {
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        return await this._createChatCompletion(client, params, options);
      }
      async _runTools(client, params, runner, options) {
        const role = "tool";
        const { tool_choice = "auto", stream, toolContext: inputToolContext, ...restParams } = params;
        const toolContext = inputToolContext;
        const singleFunctionToCall = typeof tool_choice !== "string" && tool_choice.type === "function" && tool_choice?.function?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS, afterCompletion } = options || {};
        const inputTools = params.tools.map((tool) => {
          if (isAutoParsableTool(tool)) {
            if (!tool.$callback) {
              throw new OpenAIError("Tool given to `.runTools()` that does not have an associated function");
            }
            return {
              type: "function",
              function: {
                function: tool.$callback,
                name: tool.function.name,
                description: tool.function.description || "",
                parameters: tool.function.parameters,
                parse: tool.$parseRaw,
                strict: true
              }
            };
          }
          return tool;
        });
        const functionsByName = {};
        for (const f of inputTools) {
          if (f.type === "function") {
            functionsByName[f.function.name || f.function.function.name] = f.function;
          }
        }
        const tools = "tools" in params ? inputTools.map((t) => t.type === "function" ? {
          type: "function",
          function: {
            name: t.function.name || t.function.function.name,
            parameters: t.function.parameters,
            description: t.function.description,
            strict: t.function.strict
          }
        } : t) : void 0;
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        const runToolCall = async (toolCall) => {
          if (toolCall.type !== "function")
            return { message: void 0, functionCalled: false };
          const tool_call_id = toolCall.id;
          const { name, arguments: args } = toolCall.function;
          const fn = functionsByName[name];
          if (!fn) {
            const content2 = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(functionsByName).map((name2) => JSON.stringify(name2)).join(", ")}. Please try again`;
            return { message: { role, tool_call_id, content: content2 }, functionCalled: false };
          }
          if (singleFunctionToCall && singleFunctionToCall !== name) {
            const content2 = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
            return { message: { role, tool_call_id, content: content2 }, functionCalled: false };
          }
          let rawContent;
          if (isRunnableFunctionWithParse(fn)) {
            let parsed;
            try {
              parsed = await fn.parse(args);
            } catch (error) {
              const content2 = error instanceof Error ? error.message : String(error);
              return { message: { role, tool_call_id, content: content2 }, functionCalled: false };
            }
            rawContent = await fn.function(parsed, runner, toolContext);
          } else {
            rawContent = await fn.function(args, runner, toolContext);
          }
          const content = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
          return { message: { role, tool_call_id, content }, functionCalled: true };
        };
        for (let i = 0; i < maxChatCompletions; ++i) {
          const chatCompletion = await this._createChatCompletion(client, {
            ...restParams,
            tool_choice,
            tools,
            messages: [...this.messages]
          }, options);
          const message = chatCompletion.choices[0]?.message;
          if (!message) {
            throw new OpenAIError(`missing message in ChatCompletion response`);
          }
          if (!message.tool_calls?.length) {
            await afterCompletion?.(chatCompletion, runner);
            return;
          }
          if (singleFunctionToCall || params.parallel_tool_calls === false) {
            for (const toolCall of message.tool_calls) {
              const result = await runToolCall(toolCall);
              if (result.message)
                this._addMessage(result.message);
              if (singleFunctionToCall && result.functionCalled) {
                await afterCompletion?.(chatCompletion, runner);
                return;
              }
            }
          } else {
            const results = await Promise.allSettled(message.tool_calls.map(runToolCall));
            for (const result of results) {
              if (result.status === "rejected")
                throw result.reason;
            }
            for (const result of results) {
              if (result.status === "fulfilled" && result.value.message) {
                this._addMessage(result.value.message);
              }
            }
          }
          await afterCompletion?.(chatCompletion, runner);
        }
        return;
      }
    };
    _AbstractChatCompletionRunner_instances = /* @__PURE__ */ new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent2() {
      return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
    }, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage2() {
      let i = this.messages.length;
      while (i-- > 0) {
        const message = this.messages[i];
        if (isAssistantMessage(message)) {
          const ret = {
            ...message,
            content: message.content ?? null,
            refusal: message.refusal ?? null
          };
          return ret;
        }
      }
      throw new OpenAIError("stream ended without producing a ChatCompletionMessage with role=assistant");
    }, _AbstractChatCompletionRunner_getFinalFunctionToolCall = function _AbstractChatCompletionRunner_getFinalFunctionToolCall2() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isAssistantMessage(message) && message?.tool_calls?.length) {
          for (let j = message.tool_calls.length - 1; j >= 0; j--) {
            const toolCall = message.tool_calls[j];
            if (toolCall?.type === "function") {
              return toolCall.function;
            }
          }
        }
      }
      return;
    }, _AbstractChatCompletionRunner_getFinalFunctionToolCallResult = function _AbstractChatCompletionRunner_getFinalFunctionToolCallResult2() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isToolMessage(message) && message.content != null && typeof message.content === "string" && this.messages.some((x) => x.role === "assistant" && x.tool_calls?.some((y) => y.type === "function" && y.id === message.tool_call_id))) {
          return message.content;
        }
      }
      return;
    }, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage2() {
      const total = {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0
      };
      for (const { usage } of this._chatCompletions) {
        if (usage) {
          total.completion_tokens += usage.completion_tokens;
          total.prompt_tokens += usage.prompt_tokens;
          total.total_tokens += usage.total_tokens;
        }
      }
      return total;
    }, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams2(params) {
      if (params.n != null && params.n > 1) {
        throw new OpenAIError("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
      }
    }, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult2(rawContent) {
      return typeof rawContent === "string" ? rawContent : rawContent === void 0 ? "undefined" : JSON.stringify(rawContent);
    };
  }
});

// node_modules/openai/lib/ChatCompletionRunner.mjs
var ChatCompletionRunner;
var init_ChatCompletionRunner = __esm({
  "node_modules/openai/lib/ChatCompletionRunner.mjs"() {
    "use strict";
    init_AbstractChatCompletionRunner();
    init_chatCompletionUtils();
    ChatCompletionRunner = class _ChatCompletionRunner extends AbstractChatCompletionRunner {
      static runTools(client, params, options) {
        const runner = new _ChatCompletionRunner();
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
        };
        runner._run(() => runner._runTools(client, params, runner, opts));
        return runner;
      }
      _addMessage(message, emit = true) {
        super._addMessage(message, emit);
        if (isAssistantMessage(message) && message.content) {
          this._emit("content", message.content);
        }
      }
    };
  }
});

// node_modules/openai/_vendor/partial-json-parser/parser.mjs
function parseJSON(jsonString, allowPartial = Allow.ALL) {
  if (typeof jsonString !== "string") {
    throw new TypeError(`expecting str, got ${typeof jsonString}`);
  }
  if (!jsonString.trim()) {
    throw new Error(`${jsonString} is empty`);
  }
  return _parseJSON(jsonString.trim(), allowPartial);
}
var STR, NUM, ARR, OBJ, NULL, BOOL, NAN, INFINITY, MINUS_INFINITY, INF, SPECIAL, ATOM, COLLECTION, ALL, Allow, PartialJSON, MalformedJSON, _parseJSON, partialParse;
var init_parser2 = __esm({
  "node_modules/openai/_vendor/partial-json-parser/parser.mjs"() {
    "use strict";
    STR = 1;
    NUM = 2;
    ARR = 4;
    OBJ = 8;
    NULL = 16;
    BOOL = 32;
    NAN = 64;
    INFINITY = 128;
    MINUS_INFINITY = 256;
    INF = INFINITY | MINUS_INFINITY;
    SPECIAL = NULL | BOOL | INF | NAN;
    ATOM = STR | NUM | SPECIAL;
    COLLECTION = ARR | OBJ;
    ALL = ATOM | COLLECTION;
    Allow = {
      STR,
      NUM,
      ARR,
      OBJ,
      NULL,
      BOOL,
      NAN,
      INFINITY,
      MINUS_INFINITY,
      INF,
      SPECIAL,
      ATOM,
      COLLECTION,
      ALL
    };
    PartialJSON = class extends Error {
    };
    MalformedJSON = class extends Error {
    };
    _parseJSON = (jsonString, allow) => {
      const length = jsonString.length;
      let index = 0;
      const markPartialJSON = (msg) => {
        throw new PartialJSON(`${msg} at position ${index}`);
      };
      const throwMalformedError = (msg) => {
        throw new MalformedJSON(`${msg} at position ${index}`);
      };
      const parseAny = () => {
        skipBlank();
        if (index >= length)
          markPartialJSON("Unexpected end of input");
        if (jsonString[index] === '"')
          return parseStr();
        if (jsonString[index] === "{")
          return parseObj();
        if (jsonString[index] === "[")
          return parseArr();
        if (jsonString.substring(index, index + 4) === "null" || Allow.NULL & allow && length - index < 4 && "null".startsWith(jsonString.substring(index))) {
          index += 4;
          return null;
        }
        if (jsonString.substring(index, index + 4) === "true" || Allow.BOOL & allow && length - index < 4 && "true".startsWith(jsonString.substring(index))) {
          index += 4;
          return true;
        }
        if (jsonString.substring(index, index + 5) === "false" || Allow.BOOL & allow && length - index < 5 && "false".startsWith(jsonString.substring(index))) {
          index += 5;
          return false;
        }
        if (jsonString.substring(index, index + 8) === "Infinity" || Allow.INFINITY & allow && length - index < 8 && "Infinity".startsWith(jsonString.substring(index))) {
          index += 8;
          return Infinity;
        }
        if (jsonString.substring(index, index + 9) === "-Infinity" || Allow.MINUS_INFINITY & allow && 1 < length - index && length - index < 9 && "-Infinity".startsWith(jsonString.substring(index))) {
          index += 9;
          return -Infinity;
        }
        if (jsonString.substring(index, index + 3) === "NaN" || Allow.NAN & allow && length - index < 3 && "NaN".startsWith(jsonString.substring(index))) {
          index += 3;
          return NaN;
        }
        return parseNum();
      };
      const parseStr = () => {
        const start = index;
        let escape2 = false;
        index++;
        while (index < length && (jsonString[index] !== '"' || escape2 && jsonString[index - 1] === "\\")) {
          escape2 = jsonString[index] === "\\" ? !escape2 : false;
          index++;
        }
        if (jsonString.charAt(index) == '"') {
          try {
            return JSON.parse(jsonString.substring(start, ++index - Number(escape2)));
          } catch (e) {
            throwMalformedError(String(e));
          }
        } else if (Allow.STR & allow) {
          try {
            return JSON.parse(jsonString.substring(start, index - Number(escape2)) + '"');
          } catch (e) {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("\\")) + '"');
          }
        }
        markPartialJSON("Unterminated string literal");
      };
      const parseObj = () => {
        index++;
        skipBlank();
        const obj = {};
        try {
          while (jsonString[index] !== "}") {
            skipBlank();
            if (index >= length && Allow.OBJ & allow)
              return obj;
            const key = parseStr();
            skipBlank();
            index++;
            try {
              const value = parseAny();
              Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
            } catch (e) {
              if (Allow.OBJ & allow)
                return obj;
              else
                throw e;
            }
            skipBlank();
            if (jsonString[index] === ",")
              index++;
          }
        } catch (e) {
          if (Allow.OBJ & allow)
            return obj;
          else
            markPartialJSON("Expected '}' at end of object");
        }
        index++;
        return obj;
      };
      const parseArr = () => {
        index++;
        const arr = [];
        try {
          while (jsonString[index] !== "]") {
            arr.push(parseAny());
            skipBlank();
            if (jsonString[index] === ",") {
              index++;
            }
          }
        } catch (e) {
          if (Allow.ARR & allow) {
            return arr;
          }
          markPartialJSON("Expected ']' at end of array");
        }
        index++;
        return arr;
      };
      const parseNum = () => {
        if (index === 0) {
          if (jsonString === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString);
          } catch (e) {
            if (Allow.NUM & allow) {
              try {
                if ("." === jsonString[jsonString.length - 1])
                  return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf(".")));
                return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf("e")));
              } catch (e2) {
              }
            }
            throwMalformedError(String(e));
          }
        }
        const start = index;
        if (jsonString[index] === "-")
          index++;
        while (jsonString[index] && !",]}".includes(jsonString[index]))
          index++;
        if (index == length && !(Allow.NUM & allow))
          markPartialJSON("Unterminated number literal");
        try {
          return JSON.parse(jsonString.substring(start, index));
        } catch (e) {
          if (jsonString.substring(start, index) === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("e")));
          } catch (e2) {
            throwMalformedError(String(e2));
          }
        }
      };
      const skipBlank = () => {
        while (index < length && " \n\r	".includes(jsonString[index])) {
          index++;
        }
      };
      return parseAny();
    };
    partialParse = (input) => parseJSON(input, Allow.ALL ^ Allow.NUM);
  }
});

// node_modules/openai/streaming.mjs
var init_streaming2 = __esm({
  "node_modules/openai/streaming.mjs"() {
    "use strict";
    init_streaming();
  }
});

// node_modules/openai/lib/ChatCompletionStream.mjs
function makeChatCompletionReadableStreamMessageChunk(chunk, message, toolCallIds) {
  const payload = {
    type: "message",
    message,
    ...toolCallIds ? { tool_call_ids: toolCallIds } : {}
  };
  return {
    id: chunk.id,
    choices: [],
    created: chunk.created,
    model: chunk.model,
    object: `${CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX}${JSON.stringify(payload)}`
  };
}
function isChatCompletionReadableStreamMessage(item) {
  return "type" in item && item.type === "message" && "message" in item || "object" in item && typeof item.object === "string" && item.object.startsWith(CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX);
}
function getChatCompletionReadableStreamMessage(item) {
  if ("type" in item) {
    return item;
  }
  return JSON.parse(item.object.slice(CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX.length));
}
function finalizeChatCompletion(snapshot, params) {
  const { id, choices, created, model, system_fingerprint, ...rest } = snapshot;
  const completion = {
    ...rest,
    id,
    choices: choices.map(({ message, finish_reason, index, logprobs, ...choiceRest }) => {
      if (!finish_reason) {
        throw new OpenAIError(`missing finish_reason for choice ${index}`);
      }
      const { content = null, function_call, tool_calls, ...messageRest } = message;
      const role = message.role;
      if (!role) {
        throw new OpenAIError(`missing role for choice ${index}`);
      }
      if (function_call) {
        const { arguments: args, name } = function_call;
        if (args == null) {
          throw new OpenAIError(`missing function_call.arguments for choice ${index}`);
        }
        if (!name) {
          throw new OpenAIError(`missing function_call.name for choice ${index}`);
        }
        return {
          ...choiceRest,
          message: {
            content,
            function_call: { arguments: args, name },
            role,
            refusal: message.refusal ?? null
          },
          finish_reason,
          index,
          logprobs
        };
      }
      if (tool_calls) {
        return {
          ...choiceRest,
          index,
          finish_reason,
          logprobs,
          message: {
            ...messageRest,
            role,
            content,
            refusal: message.refusal ?? null,
            tool_calls: tool_calls.map((tool_call, i) => {
              const { function: fn, type, id: id2, ...toolRest } = tool_call;
              const { arguments: args, name, ...fnRest } = fn || {};
              if (type == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].type
${str(snapshot)}`);
              }
              if (name == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name
${str(snapshot)}`);
              }
              if (args == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments
${str(snapshot)}`);
              }
              return {
                ...toolRest,
                id: id2 || `call_${uuid4()}`,
                type,
                function: { ...fnRest, name, arguments: args }
              };
            })
          }
        };
      }
      return {
        ...choiceRest,
        message: { ...messageRest, content, role, refusal: message.refusal ?? null },
        finish_reason,
        index,
        logprobs
      };
    }),
    created,
    model,
    object: "chat.completion",
    ...system_fingerprint ? { system_fingerprint } : {}
  };
  return maybeParseChatCompletion(completion, params);
}
function str(x) {
  return JSON.stringify(x);
}
function assertIsEmpty(obj) {
  return;
}
function assertNever(_x) {
}
var _ChatCompletionStream_instances, _ChatCompletionStream_params, _ChatCompletionStream_choiceEventStates, _ChatCompletionStream_currentChatCompletionSnapshot, _ChatCompletionStream_beginRequest, _ChatCompletionStream_getChoiceEventState, _ChatCompletionStream_addChunk, _ChatCompletionStream_emitToolCallDoneEvent, _ChatCompletionStream_emitContentDoneEvents, _ChatCompletionStream_endRequest, _ChatCompletionStream_getAutoParseableResponseFormat, _ChatCompletionStream_accumulateChatCompletion, CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX, ChatCompletionStream;
var init_ChatCompletionStream = __esm({
  "node_modules/openai/lib/ChatCompletionStream.mjs"() {
    "use strict";
    init_tslib();
    init_parser2();
    init_error2();
    init_uuid();
    init_parser();
    init_streaming2();
    init_AbstractChatCompletionRunner();
    CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX = "chat.completion.chunk.message:";
    ChatCompletionStream = class _ChatCompletionStream extends AbstractChatCompletionRunner {
      constructor(params) {
        super();
        _ChatCompletionStream_instances.add(this);
        _ChatCompletionStream_params.set(this, void 0);
        _ChatCompletionStream_choiceEventStates.set(this, void 0);
        _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
        __classPrivateFieldSet(this, _ChatCompletionStream_params, params, "f");
        __classPrivateFieldSet(this, _ChatCompletionStream_choiceEventStates, [], "f");
      }
      get currentChatCompletionSnapshot() {
        return __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
      }
      /**
       * Intended for use on the frontend, consuming a stream produced with
       * `.toReadableStream()` on the backend.
       *
       * Note that messages sent to the model do not appear in `.on('message')`
       * in this context.
       */
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStream(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      static createChatCompletion(client, params, options) {
        const runner = new _ChatCompletionStream(params);
        runner._run(() => runner._runChatCompletion(client, { ...params, stream: true }, { ...options, headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" } }));
        return runner;
      }
      async _createChatCompletion(client, params, options) {
        super._createChatCompletion;
        this._listenForAbort(options?.signal);
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        const stream = await client.chat.completions.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const chunk of stream) {
          __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        let chatId;
        for await (const item of stream) {
          if (isChatCompletionReadableStreamMessage(item)) {
            const message = getChatCompletionReadableStreamMessage(item);
            if (__classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f")) {
              const toolCalls = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f").choices[0]?.message.tool_calls;
              for (const [index, id] of message.tool_call_ids?.entries() ?? []) {
                const toolCall = toolCalls?.[index];
                if (toolCall && id) {
                  toolCall.id = id;
                }
              }
              this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
              chatId = void 0;
            }
            this._addMessage(message.message);
            continue;
          }
          const chunk = item;
          if (chatId && chunk.id && chatId !== chunk.id) {
            this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
          }
          __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
          if (chunk.id)
            chatId = chunk.id;
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        if (__classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f")) {
          return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
        }
        const lastChatCompletion = this._chatCompletions[this._chatCompletions.length - 1];
        if (lastChatCompletion) {
          return lastChatCompletion;
        }
        throw new OpenAIError(`request ended without sending any chunks`);
      }
      [(_ChatCompletionStream_params = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_choiceEventStates = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_currentChatCompletionSnapshot = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_instances = /* @__PURE__ */ new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest2() {
        if (this.ended)
          return;
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
      }, _ChatCompletionStream_getChoiceEventState = function _ChatCompletionStream_getChoiceEventState2(choice) {
        let state = __classPrivateFieldGet(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index];
        if (state) {
          return state;
        }
        state = {
          content_done: false,
          refusal_done: false,
          logprobs_content_done: false,
          logprobs_refusal_done: false,
          done_tool_calls: /* @__PURE__ */ new Set(),
          current_tool_call_index: null
        };
        __classPrivateFieldGet(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index] = state;
        return state;
      }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk2(chunk) {
        if (this.ended)
          return;
        const completion = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
        this._emit("chunk", chunk, completion);
        for (const choice of chunk.choices) {
          const choiceSnapshot = completion.choices[choice.index];
          const { delta } = choice;
          if (delta?.content != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.content) {
            this._emit("content", delta.content, choiceSnapshot.message.content);
            this._emit("content.delta", {
              delta: delta.content,
              snapshot: choiceSnapshot.message.content,
              parsed: choiceSnapshot.message.parsed
            });
          }
          if (delta?.refusal != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.refusal) {
            this._emit("refusal.delta", {
              delta: delta.refusal,
              snapshot: choiceSnapshot.message.refusal
            });
          }
          if (choice.logprobs?.content != null && choiceSnapshot.message?.role === "assistant") {
            this._emit("logprobs.content.delta", {
              content: choice.logprobs?.content,
              snapshot: choiceSnapshot.logprobs?.content ?? []
            });
          }
          if (choice.logprobs?.refusal != null && choiceSnapshot.message?.role === "assistant") {
            this._emit("logprobs.refusal.delta", {
              refusal: choice.logprobs?.refusal,
              snapshot: choiceSnapshot.logprobs?.refusal ?? []
            });
          }
          const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
          if (choiceSnapshot.finish_reason) {
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
            if (state.current_tool_call_index != null) {
              __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
            }
          }
          for (const toolCall of delta?.tool_calls ?? []) {
            if (state.current_tool_call_index !== toolCall.index) {
              __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
              if (state.current_tool_call_index != null) {
                __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
              }
            }
            state.current_tool_call_index = toolCall.index;
          }
          for (const toolCallDelta of delta?.tool_calls ?? []) {
            const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallDelta.index];
            if (!toolCallSnapshot?.type) {
              continue;
            }
            if (toolCallSnapshot?.type === "function") {
              this._emit("tool_calls.function.arguments.delta", {
                name: toolCallSnapshot.function?.name,
                index: toolCallDelta.index,
                arguments: toolCallSnapshot.function.arguments,
                parsed_arguments: toolCallSnapshot.function.parsed_arguments,
                arguments_delta: toolCallDelta.function?.arguments ?? ""
              });
            } else {
              assertNever(toolCallSnapshot?.type);
            }
          }
        }
      }, _ChatCompletionStream_emitToolCallDoneEvent = function _ChatCompletionStream_emitToolCallDoneEvent2(choiceSnapshot, toolCallIndex) {
        const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (state.done_tool_calls.has(toolCallIndex)) {
          return;
        }
        const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallIndex];
        if (!toolCallSnapshot) {
          throw new Error("no tool call snapshot");
        }
        if (!toolCallSnapshot.type) {
          throw new Error("tool call snapshot missing `type`");
        }
        if (toolCallSnapshot.type === "function") {
          const inputTool = __classPrivateFieldGet(this, _ChatCompletionStream_params, "f")?.tools?.find((tool) => isChatCompletionFunctionTool(tool) && tool.function.name === toolCallSnapshot.function.name);
          this._emit("tool_calls.function.arguments.done", {
            name: toolCallSnapshot.function.name,
            index: toolCallIndex,
            arguments: toolCallSnapshot.function.arguments,
            parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCallSnapshot.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCallSnapshot.function.arguments) : null
          });
        } else {
          assertNever(toolCallSnapshot.type);
        }
      }, _ChatCompletionStream_emitContentDoneEvents = function _ChatCompletionStream_emitContentDoneEvents2(choiceSnapshot) {
        const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (choiceSnapshot.message.content && !state.content_done) {
          state.content_done = true;
          const responseFormat = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this);
          this._emit("content.done", {
            content: choiceSnapshot.message.content,
            parsed: responseFormat ? responseFormat.$parseRaw(choiceSnapshot.message.content) : null
          });
        }
        if (choiceSnapshot.message.refusal && !state.refusal_done) {
          state.refusal_done = true;
          this._emit("refusal.done", { refusal: choiceSnapshot.message.refusal });
        }
        if (choiceSnapshot.logprobs?.content && !state.logprobs_content_done) {
          state.logprobs_content_done = true;
          this._emit("logprobs.content.done", { content: choiceSnapshot.logprobs.content });
        }
        if (choiceSnapshot.logprobs?.refusal && !state.logprobs_refusal_done) {
          state.logprobs_refusal_done = true;
          this._emit("logprobs.refusal.done", { refusal: choiceSnapshot.logprobs.refusal });
        }
      }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest2() {
        if (this.ended) {
          throw new OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        if (!snapshot) {
          throw new OpenAIError(`request ended without sending any chunks`);
        }
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
        __classPrivateFieldSet(this, _ChatCompletionStream_choiceEventStates, [], "f");
        return finalizeChatCompletion(snapshot, __classPrivateFieldGet(this, _ChatCompletionStream_params, "f"));
      }, _ChatCompletionStream_getAutoParseableResponseFormat = function _ChatCompletionStream_getAutoParseableResponseFormat2() {
        const responseFormat = __classPrivateFieldGet(this, _ChatCompletionStream_params, "f")?.response_format;
        if (isAutoParsableResponseFormat(responseFormat)) {
          return responseFormat;
        }
        return null;
      }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion2(chunk) {
        var _a3, _b, _c, _d;
        let snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        const { choices, ...rest } = chunk;
        if (!snapshot) {
          snapshot = __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, {
            ...rest,
            choices: []
          }, "f");
        } else if (chunk.id) {
          Object.assign(snapshot, rest);
        }
        for (const { delta, finish_reason, index, logprobs = null, ...other } of chunk.choices) {
          let choice = snapshot.choices[index];
          if (!choice) {
            choice = snapshot.choices[index] = { finish_reason, index, message: {}, logprobs, ...other };
          }
          if (logprobs) {
            if (!choice.logprobs) {
              choice.logprobs = Object.assign({}, logprobs);
            } else {
              const { content: content2, refusal: refusal2, ...rest3 } = logprobs;
              assertIsEmpty(rest3);
              Object.assign(choice.logprobs, rest3);
              if (content2) {
                (_a3 = choice.logprobs).content ?? (_a3.content = []);
                choice.logprobs.content.push(...content2);
              }
              if (refusal2) {
                (_b = choice.logprobs).refusal ?? (_b.refusal = []);
                choice.logprobs.refusal.push(...refusal2);
              }
            }
          }
          if (finish_reason) {
            choice.finish_reason = finish_reason;
            if (__classPrivateFieldGet(this, _ChatCompletionStream_params, "f") && hasAutoParseableInput(__classPrivateFieldGet(this, _ChatCompletionStream_params, "f"))) {
              if (finish_reason === "length") {
                throw new LengthFinishReasonError();
              }
              if (finish_reason === "content_filter") {
                throw new ContentFilterFinishReasonError();
              }
            }
          }
          Object.assign(choice, other);
          if (!delta)
            continue;
          const { content, refusal, function_call, role, tool_calls, ...rest2 } = delta;
          assertIsEmpty(rest2);
          Object.assign(choice.message, rest2);
          if (refusal) {
            choice.message.refusal = (choice.message.refusal || "") + refusal;
          }
          if (role)
            choice.message.role = role;
          if (function_call) {
            if (!choice.message.function_call) {
              choice.message.function_call = function_call;
            } else {
              if (function_call.name)
                choice.message.function_call.name = function_call.name;
              if (function_call.arguments) {
                (_c = choice.message.function_call).arguments ?? (_c.arguments = "");
                choice.message.function_call.arguments += function_call.arguments;
              }
            }
          }
          if (content) {
            choice.message.content = (choice.message.content || "") + content;
            if (!choice.message.refusal && __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this)) {
              choice.message.parsed = choice.message.content.trim() ? partialParse(choice.message.content) : null;
            }
          }
          if (tool_calls) {
            if (!choice.message.tool_calls)
              choice.message.tool_calls = [];
            for (const { index: index2, id, type, function: fn, ...rest3 } of tool_calls) {
              const tool_call = (_d = choice.message.tool_calls)[index2] ?? (_d[index2] = {});
              Object.assign(tool_call, rest3);
              if (id)
                tool_call.id = id;
              if (type)
                tool_call.type = type;
              if (fn)
                tool_call.function ?? (tool_call.function = { name: fn.name ?? "", arguments: "" });
              if (fn?.name)
                tool_call.function.name = fn.name;
              if (fn?.arguments) {
                tool_call.function.arguments += fn.arguments;
                if (shouldParseToolCall(__classPrivateFieldGet(this, _ChatCompletionStream_params, "f"), tool_call)) {
                  tool_call.function.parsed_arguments = partialParse(tool_call.function.arguments);
                }
              }
            }
          }
        }
        return snapshot;
      }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("chunk", (chunk) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(chunk);
          } else {
            pushQueue.push(chunk);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        };
      }
      toReadableStream() {
        const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
    };
  }
});

// node_modules/openai/lib/ChatCompletionStreamingRunner.mjs
var ChatCompletionStreamingRunner;
var init_ChatCompletionStreamingRunner = __esm({
  "node_modules/openai/lib/ChatCompletionStreamingRunner.mjs"() {
    "use strict";
    init_ChatCompletionStream();
    init_error2();
    init_streaming2();
    init_chatCompletionUtils();
    ChatCompletionStreamingRunner = class _ChatCompletionStreamingRunner extends ChatCompletionStream {
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStreamingRunner(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      toReadableStream() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        let lastChunk;
        let toolCallIds;
        const pushEvent = (event) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(event);
          } else {
            pushQueue.push(event);
          }
        };
        this.on("chunk", (chunk) => {
          lastChunk = chunk;
          pushEvent(chunk);
        });
        this.on("message", (message) => {
          if (isAssistantMessage(message)) {
            toolCallIds = message.tool_calls?.map((toolCall) => toolCall.id);
            return;
          }
          if (isToolMessage(message)) {
            if (!lastChunk) {
              throw new OpenAIError("cannot serialize a tool message before receiving any chunks");
            }
            pushEvent(makeChatCompletionReadableStreamMessageChunk(lastChunk, message, toolCallIds));
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        const iterator = () => ({
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((event2) => event2 ? { value: event2, done: false } : { value: void 0, done: true });
            }
            const event = pushQueue.shift();
            if (!event) {
              return { value: void 0, done: true };
            }
            return { value: event, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        });
        const stream = new Stream(iterator, this.controller);
        return stream.toReadableStream();
      }
      static runTools(client, params, options) {
        const runner = new _ChatCompletionStreamingRunner(
          // @ts-expect-error TODO these types are incompatible
          params
        );
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
        };
        runner._run(() => runner._runTools(client, params, runner, opts));
        return runner;
      }
    };
  }
});

// node_modules/openai/resources/chat/completions/completions.mjs
var Completions;
var init_completions = __esm({
  "node_modules/openai/resources/chat/completions/completions.mjs"() {
    "use strict";
    init_resource();
    init_messages();
    init_messages();
    init_pagination();
    init_path();
    init_ChatCompletionRunner();
    init_ChatCompletionStreamingRunner();
    init_ChatCompletionStream();
    init_parser();
    init_ChatCompletionStreamingRunner();
    init_RunnableFunction();
    init_ChatCompletionStream();
    init_ChatCompletionRunner();
    Completions = class extends APIResource {
      constructor() {
        super(...arguments);
        this.messages = new Messages(this._client);
      }
      create(body, options) {
        return this._client.post("/chat/completions", {
          body,
          ...options,
          stream: body.stream ?? false,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get a stored chat completion. Only Chat Completions that have been created with
       * the `store` parameter set to `true` will be returned.
       *
       * @example
       * ```ts
       * const chatCompletion =
       *   await client.chat.completions.retrieve('completion_id');
       * ```
       */
      retrieve(completionID, options) {
        return this._client.get(path4`/chat/completions/${completionID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modify a stored chat completion. Only Chat Completions that have been created
       * with the `store` parameter set to `true` can be modified. Currently, the only
       * supported modification is to update the `metadata` field.
       *
       * @example
       * ```ts
       * const chatCompletion = await client.chat.completions.update(
       *   'completion_id',
       *   { metadata: { foo: 'string' } },
       * );
       * ```
       */
      update(completionID, body, options) {
        return this._client.post(path4`/chat/completions/${completionID}`, {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List stored Chat Completions. Only Chat Completions that have been stored with
       * the `store` parameter set to `true` will be returned.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const chatCompletion of client.chat.completions.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/chat/completions", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a stored chat completion. Only Chat Completions that have been created
       * with the `store` parameter set to `true` can be deleted.
       *
       * @example
       * ```ts
       * const chatCompletionDeleted =
       *   await client.chat.completions.delete('completion_id');
       * ```
       */
      delete(completionID, options) {
        return this._client.delete(path4`/chat/completions/${completionID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      parse(body, options) {
        validateInputTools(body.tools);
        return this._client.chat.completions.create(body, {
          ...options,
          headers: {
            ...options?.headers,
            "X-Stainless-Helper-Method": "chat.completions.parse"
          }
        })._thenUnwrap((completion) => parseChatCompletion(completion, body));
      }
      runTools(body, options) {
        if (body.stream) {
          return ChatCompletionStreamingRunner.runTools(this._client, body, options);
        }
        return ChatCompletionRunner.runTools(this._client, body, options);
      }
      /**
       * Creates a chat completion stream
       */
      stream(body, options) {
        return ChatCompletionStream.createChatCompletion(this._client, body, options);
      }
    };
    Completions.Messages = Messages;
  }
});

// node_modules/openai/resources/chat/chat.mjs
var Chat;
var init_chat = __esm({
  "node_modules/openai/resources/chat/chat.mjs"() {
    "use strict";
    init_resource();
    init_completions();
    init_completions();
    Chat = class extends APIResource {
      constructor() {
        super(...arguments);
        this.completions = new Completions(this._client);
      }
    };
    Chat.Completions = Completions;
  }
});

// node_modules/openai/resources/chat/completions/index.mjs
var init_completions2 = __esm({
  "node_modules/openai/resources/chat/completions/index.mjs"() {
    "use strict";
    init_completions();
    init_completions();
    init_messages();
  }
});

// node_modules/openai/resources/chat/index.mjs
var init_chat2 = __esm({
  "node_modules/openai/resources/chat/index.mjs"() {
    "use strict";
    init_chat();
    init_completions2();
  }
});

// node_modules/openai/resources/shared.mjs
var init_shared = __esm({
  "node_modules/openai/resources/shared.mjs"() {
    "use strict";
  }
});

// node_modules/openai/resources/admin/organization/admin-api-keys.mjs
var AdminAPIKeys;
var init_admin_api_keys = __esm({
  "node_modules/openai/resources/admin/organization/admin-api-keys.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    AdminAPIKeys = class extends APIResource {
      /**
       * Create an organization admin API key
       *
       * @example
       * ```ts
       * const adminAPIKey =
       *   await client.admin.organization.adminAPIKeys.create({
       *     name: 'New Admin Key',
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/admin_api_keys", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieve a single organization API key
       *
       * @example
       * ```ts
       * const adminAPIKey =
       *   await client.admin.organization.adminAPIKeys.retrieve(
       *     'key_id',
       *   );
       * ```
       */
      retrieve(keyID, options) {
        return this._client.get(path4`/organization/admin_api_keys/${keyID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * List organization API keys
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const adminAPIKey of client.admin.organization.adminAPIKeys.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/admin_api_keys", CursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Delete an organization admin API key
       *
       * @example
       * ```ts
       * const adminAPIKey =
       *   await client.admin.organization.adminAPIKeys.delete(
       *     'key_id',
       *   );
       * ```
       */
      delete(keyID, options) {
        return this._client.delete(path4`/organization/admin_api_keys/${keyID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/audit-logs.mjs
var AuditLogs;
var init_audit_logs = __esm({
  "node_modules/openai/resources/admin/organization/audit-logs.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    AuditLogs = class extends APIResource {
      /**
       * List user actions and configuration changes within this organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const auditLogListResponse of client.admin.organization.auditLogs.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/audit_logs", ConversationCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/certificates.mjs
var Certificates;
var init_certificates = __esm({
  "node_modules/openai/resources/admin/organization/certificates.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Certificates = class extends APIResource {
      /**
       * Upload a certificate to the organization. This does **not** automatically
       * activate the certificate.
       *
       * Organizations can upload up to 50 certificates.
       *
       * @example
       * ```ts
       * const certificate =
       *   await client.admin.organization.certificates.create({
       *     certificate: 'certificate',
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/certificates", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get a certificate that has been uploaded to the organization.
       *
       * You can get a certificate regardless of whether it is active or not.
       *
       * @example
       * ```ts
       * const certificate =
       *   await client.admin.organization.certificates.retrieve(
       *     'certificate_id',
       *   );
       * ```
       */
      retrieve(certificateID, query = {}, options) {
        return this._client.get(path4`/organization/certificates/${certificateID}`, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Modify a certificate. Note that only the name can be modified.
       *
       * @example
       * ```ts
       * const certificate =
       *   await client.admin.organization.certificates.update(
       *     'certificate_id',
       *   );
       * ```
       */
      update(certificateID, body, options) {
        return this._client.post(path4`/organization/certificates/${certificateID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * List uploaded certificates for this organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateListResponse of client.admin.organization.certificates.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/certificates", ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Delete a certificate from the organization.
       *
       * The certificate must be inactive for the organization and all projects.
       *
       * @example
       * ```ts
       * const certificate =
       *   await client.admin.organization.certificates.delete(
       *     'certificate_id',
       *   );
       * ```
       */
      delete(certificateID, options) {
        return this._client.delete(path4`/organization/certificates/${certificateID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Activate certificates at the organization level.
       *
       * You can atomically and idempotently activate up to 10 certificates at a time.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateActivateResponse of client.admin.organization.certificates.activate(
       *   { certificate_ids: ['cert_abc'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      activate(body, options) {
        return this._client.getAPIList("/organization/certificates/activate", Page, {
          body,
          method: "post",
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deactivate certificates at the organization level.
       *
       * You can atomically and idempotently deactivate up to 10 certificates at a time.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateDeactivateResponse of client.admin.organization.certificates.deactivate(
       *   { certificate_ids: ['cert_abc'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      deactivate(body, options) {
        return this._client.getAPIList("/organization/certificates/deactivate", Page, { body, method: "post", ...options, __security: { adminAPIKeyAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/data-retention.mjs
var DataRetention;
var init_data_retention = __esm({
  "node_modules/openai/resources/admin/organization/data-retention.mjs"() {
    "use strict";
    init_resource();
    DataRetention = class extends APIResource {
      /**
       * Retrieves organization data retention controls.
       *
       * @example
       * ```ts
       * const organizationDataRetention =
       *   await client.admin.organization.dataRetention.retrieve();
       * ```
       */
      retrieve(options) {
        return this._client.get("/organization/data_retention", {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates organization data retention controls.
       *
       * @example
       * ```ts
       * const organizationDataRetention =
       *   await client.admin.organization.dataRetention.update({
       *     retention_type: 'zero_data_retention',
       *   });
       * ```
       */
      update(body, options) {
        return this._client.post("/organization/data_retention", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/invites.mjs
var Invites;
var init_invites = __esm({
  "node_modules/openai/resources/admin/organization/invites.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Invites = class extends APIResource {
      /**
       * Create an invite for a user to the organization. The invite must be accepted by
       * the user before they have access to the organization.
       *
       * @example
       * ```ts
       * const invite =
       *   await client.admin.organization.invites.create({
       *     email: 'email',
       *     role: 'reader',
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/invites", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves an invite.
       *
       * @example
       * ```ts
       * const invite =
       *   await client.admin.organization.invites.retrieve(
       *     'invite_id',
       *   );
       * ```
       */
      retrieve(inviteID, options) {
        return this._client.get(path4`/organization/invites/${inviteID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Returns a list of invites in the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const invite of client.admin.organization.invites.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/invites", ConversationCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Delete an invite. If the invite has already been accepted, it cannot be deleted.
       *
       * @example
       * ```ts
       * const invite =
       *   await client.admin.organization.invites.delete(
       *     'invite_id',
       *   );
       * ```
       */
      delete(inviteID, options) {
        return this._client.delete(path4`/organization/invites/${inviteID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/roles.mjs
var Roles;
var init_roles = __esm({
  "node_modules/openai/resources/admin/organization/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles = class extends APIResource {
      /**
       * Creates a custom role for the organization.
       *
       * @example
       * ```ts
       * const role = await client.admin.organization.roles.create({
       *   permissions: ['string'],
       *   role_name: 'role_name',
       * });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/roles", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves an organization role.
       *
       * @example
       * ```ts
       * const role = await client.admin.organization.roles.retrieve(
       *   'role_id',
       * );
       * ```
       */
      retrieve(roleID, options) {
        return this._client.get(path4`/organization/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates an existing organization role.
       *
       * @example
       * ```ts
       * const role = await client.admin.organization.roles.update(
       *   'role_id',
       * );
       * ```
       */
      update(roleID, body, options) {
        return this._client.post(path4`/organization/roles/${roleID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the roles configured for the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const role of client.admin.organization.roles.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/roles", NextCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deletes a custom role from the organization.
       *
       * @example
       * ```ts
       * const role = await client.admin.organization.roles.delete(
       *   'role_id',
       * );
       * ```
       */
      delete(roleID, options) {
        return this._client.delete(path4`/organization/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/spend-alerts.mjs
var SpendAlerts;
var init_spend_alerts = __esm({
  "node_modules/openai/resources/admin/organization/spend-alerts.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    SpendAlerts = class extends APIResource {
      /**
       * Creates an organization spend alert.
       *
       * @example
       * ```ts
       * const organizationSpendAlert =
       *   await client.admin.organization.spendAlerts.create({
       *     currency: 'USD',
       *     interval: 'month',
       *     notification_channel: {
       *       recipients: ['string'],
       *       type: 'email',
       *     },
       *     threshold_amount: 0,
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/spend_alerts", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves an organization spend alert.
       *
       * @example
       * ```ts
       * const organizationSpendAlert =
       *   await client.admin.organization.spendAlerts.retrieve(
       *     'alert_id',
       *   );
       * ```
       */
      retrieve(alertID, options) {
        return this._client.get(path4`/organization/spend_alerts/${alertID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates an organization spend alert.
       *
       * @example
       * ```ts
       * const organizationSpendAlert =
       *   await client.admin.organization.spendAlerts.update(
       *     'alert_id',
       *     {
       *       currency: 'USD',
       *       interval: 'month',
       *       notification_channel: {
       *         recipients: ['string'],
       *         type: 'email',
       *       },
       *       threshold_amount: 0,
       *     },
       *   );
       * ```
       */
      update(alertID, body, options) {
        return this._client.post(path4`/organization/spend_alerts/${alertID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists organization spend alerts.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const organizationSpendAlert of client.admin.organization.spendAlerts.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/spend_alerts", ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deletes an organization spend alert.
       *
       * @example
       * ```ts
       * const organizationSpendAlertDeleted =
       *   await client.admin.organization.spendAlerts.delete(
       *     'alert_id',
       *   );
       * ```
       */
      delete(alertID, options) {
        return this._client.delete(path4`/organization/spend_alerts/${alertID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/usage.mjs
var Usage;
var init_usage = __esm({
  "node_modules/openai/resources/admin/organization/usage.mjs"() {
    "use strict";
    init_resource();
    Usage = class extends APIResource {
      /**
       * Get audio speeches usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.audioSpeeches({
       *     start_time: 0,
       *   });
       * ```
       */
      audioSpeeches(query, options) {
        return this._client.get("/organization/usage/audio_speeches", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get audio transcriptions usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.audioTranscriptions(
       *     { start_time: 0 },
       *   );
       * ```
       */
      audioTranscriptions(query, options) {
        return this._client.get("/organization/usage/audio_transcriptions", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get code interpreter sessions usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.codeInterpreterSessions(
       *     { start_time: 0 },
       *   );
       * ```
       */
      codeInterpreterSessions(query, options) {
        return this._client.get("/organization/usage/code_interpreter_sessions", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get completions usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.completions({
       *     start_time: 0,
       *   });
       * ```
       */
      completions(query, options) {
        return this._client.get("/organization/usage/completions", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get costs details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.costs({
       *     start_time: 0,
       *   });
       * ```
       */
      costs(query, options) {
        return this._client.get("/organization/costs", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get embeddings usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.embeddings({
       *     start_time: 0,
       *   });
       * ```
       */
      embeddings(query, options) {
        return this._client.get("/organization/usage/embeddings", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get file search calls usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.fileSearchCalls({
       *     start_time: 0,
       *   });
       * ```
       */
      fileSearchCalls(query, options) {
        return this._client.get("/organization/usage/file_search_calls", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get images usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.images({
       *     start_time: 0,
       *   });
       * ```
       */
      images(query, options) {
        return this._client.get("/organization/usage/images", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get moderations usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.moderations({
       *     start_time: 0,
       *   });
       * ```
       */
      moderations(query, options) {
        return this._client.get("/organization/usage/moderations", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get vector stores usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.vectorStores({
       *     start_time: 0,
       *   });
       * ```
       */
      vectorStores(query, options) {
        return this._client.get("/organization/usage/vector_stores", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Get web search calls usage details for the organization.
       *
       * @example
       * ```ts
       * const response =
       *   await client.admin.organization.usage.webSearchCalls({
       *     start_time: 0,
       *   });
       * ```
       */
      webSearchCalls(query, options) {
        return this._client.get("/organization/usage/web_search_calls", {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/groups/roles.mjs
var Roles2;
var init_roles2 = __esm({
  "node_modules/openai/resources/admin/organization/groups/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles2 = class extends APIResource {
      /**
       * Assigns an organization role to a group within the organization.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.groups.roles.create(
       *     'group_id',
       *     { role_id: 'role_id' },
       *   );
       * ```
       */
      create(groupID, body, options) {
        return this._client.post(path4`/organization/groups/${groupID}/roles`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves an organization role assigned to a group.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.groups.roles.retrieve(
       *     'role_id',
       *     { group_id: 'group_id' },
       *   );
       * ```
       */
      retrieve(roleID, params, options) {
        const { group_id } = params;
        return this._client.get(path4`/organization/groups/${group_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the organization roles assigned to a group within the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const roleListResponse of client.admin.organization.groups.roles.list(
       *   'group_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(groupID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/groups/${groupID}/roles`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Unassigns an organization role from a group within the organization.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.groups.roles.delete(
       *     'role_id',
       *     { group_id: 'group_id' },
       *   );
       * ```
       */
      delete(roleID, params, options) {
        const { group_id } = params;
        return this._client.delete(path4`/organization/groups/${group_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/groups/users.mjs
var Users;
var init_users = __esm({
  "node_modules/openai/resources/admin/organization/groups/users.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Users = class extends APIResource {
      /**
       * Adds a user to a group.
       *
       * @example
       * ```ts
       * const user =
       *   await client.admin.organization.groups.users.create(
       *     'group_id',
       *     { user_id: 'user_id' },
       *   );
       * ```
       */
      create(groupID, body, options) {
        return this._client.post(path4`/organization/groups/${groupID}/users`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a user in a group.
       *
       * @example
       * ```ts
       * const user =
       *   await client.admin.organization.groups.users.retrieve(
       *     'user_id',
       *     { group_id: 'group_id' },
       *   );
       * ```
       */
      retrieve(userID, params, options) {
        const { group_id } = params;
        return this._client.get(path4`/organization/groups/${group_id}/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the users assigned to a group.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const organizationGroupUser of client.admin.organization.groups.users.list(
       *   'group_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(groupID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/groups/${groupID}/users`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Removes a user from a group.
       *
       * @example
       * ```ts
       * const user =
       *   await client.admin.organization.groups.users.delete(
       *     'user_id',
       *     { group_id: 'group_id' },
       *   );
       * ```
       */
      delete(userID, params, options) {
        const { group_id } = params;
        return this._client.delete(path4`/organization/groups/${group_id}/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/groups/groups.mjs
var Groups;
var init_groups = __esm({
  "node_modules/openai/resources/admin/organization/groups/groups.mjs"() {
    "use strict";
    init_resource();
    init_roles2();
    init_roles2();
    init_users();
    init_users();
    init_pagination();
    init_path();
    Groups = class extends APIResource {
      constructor() {
        super(...arguments);
        this.users = new Users(this._client);
        this.roles = new Roles2(this._client);
      }
      /**
       * Creates a new group in the organization.
       *
       * @example
       * ```ts
       * const group = await client.admin.organization.groups.create(
       *   { name: 'x' },
       * );
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/groups", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a group.
       *
       * @example
       * ```ts
       * const group =
       *   await client.admin.organization.groups.retrieve(
       *     'group_id',
       *   );
       * ```
       */
      retrieve(groupID, options) {
        return this._client.get(path4`/organization/groups/${groupID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates a group's information.
       *
       * @example
       * ```ts
       * const group = await client.admin.organization.groups.update(
       *   'group_id',
       *   { name: 'x' },
       * );
       * ```
       */
      update(groupID, body, options) {
        return this._client.post(path4`/organization/groups/${groupID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists all groups in the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const group of client.admin.organization.groups.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/groups", NextCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deletes a group from the organization.
       *
       * @example
       * ```ts
       * const group = await client.admin.organization.groups.delete(
       *   'group_id',
       * );
       * ```
       */
      delete(groupID, options) {
        return this._client.delete(path4`/organization/groups/${groupID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
    Groups.Users = Users;
    Groups.Roles = Roles2;
  }
});

// node_modules/openai/resources/admin/organization/projects/api-keys.mjs
var APIKeys;
var init_api_keys = __esm({
  "node_modules/openai/resources/admin/organization/projects/api-keys.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    APIKeys = class extends APIResource {
      /**
       * Retrieves an API key in the project.
       *
       * @example
       * ```ts
       * const projectAPIKey =
       *   await client.admin.organization.projects.apiKeys.retrieve(
       *     'api_key_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(apiKeyID, params, options) {
        const { project_id } = params;
        return this._client.get(path4`/organization/projects/${project_id}/api_keys/${apiKeyID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Returns a list of API keys in the project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectAPIKey of client.admin.organization.projects.apiKeys.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/api_keys`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deletes an API key from the project.
       *
       * Returns confirmation of the key deletion, or an error if the key belonged to a
       * service account.
       *
       * @example
       * ```ts
       * const apiKey =
       *   await client.admin.organization.projects.apiKeys.delete(
       *     'api_key_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(apiKeyID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/organization/projects/${project_id}/api_keys/${apiKeyID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/certificates.mjs
var Certificates2;
var init_certificates2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/certificates.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Certificates2 = class extends APIResource {
      /**
       * List certificates for this project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateListResponse of client.admin.organization.projects.certificates.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/certificates`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Activate certificates at the project level.
       *
       * You can atomically and idempotently activate up to 10 certificates at a time.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateActivateResponse of client.admin.organization.projects.certificates.activate(
       *   'project_id',
       *   { certificate_ids: ['cert_abc'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      activate(projectID, body, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/certificates/activate`, Page, { body, method: "post", ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deactivate certificates at the project level. You can atomically and
       * idempotently deactivate up to 10 certificates at a time.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const certificateDeactivateResponse of client.admin.organization.projects.certificates.deactivate(
       *   'project_id',
       *   { certificate_ids: ['cert_abc'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      deactivate(projectID, body, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/certificates/deactivate`, Page, { body, method: "post", ...options, __security: { adminAPIKeyAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/data-retention.mjs
var DataRetention2;
var init_data_retention2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/data-retention.mjs"() {
    "use strict";
    init_resource();
    init_path();
    DataRetention2 = class extends APIResource {
      /**
       * Retrieves project data retention controls.
       *
       * @example
       * ```ts
       * const projectDataRetention =
       *   await client.admin.organization.projects.dataRetention.retrieve(
       *     'project_id',
       *   );
       * ```
       */
      retrieve(projectID, options) {
        return this._client.get(path4`/organization/projects/${projectID}/data_retention`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates project data retention controls.
       *
       * @example
       * ```ts
       * const projectDataRetention =
       *   await client.admin.organization.projects.dataRetention.update(
       *     'project_id',
       *     { retention_type: 'organization_default' },
       *   );
       * ```
       */
      update(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/data_retention`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/hosted-tool-permissions.mjs
var HostedToolPermissions;
var init_hosted_tool_permissions = __esm({
  "node_modules/openai/resources/admin/organization/projects/hosted-tool-permissions.mjs"() {
    "use strict";
    init_resource();
    init_path();
    HostedToolPermissions = class extends APIResource {
      /**
       * Returns hosted tool permissions for a project.
       *
       * @example
       * ```ts
       * const projectHostedToolPermissions =
       *   await client.admin.organization.projects.hostedToolPermissions.retrieve(
       *     'project_id',
       *   );
       * ```
       */
      retrieve(projectID, options) {
        return this._client.get(path4`/organization/projects/${projectID}/hosted_tool_permissions`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates hosted tool permissions for a project.
       *
       * @example
       * ```ts
       * const projectHostedToolPermissions =
       *   await client.admin.organization.projects.hostedToolPermissions.update(
       *     'project_id',
       *   );
       * ```
       */
      update(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/hosted_tool_permissions`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/model-permissions.mjs
var ModelPermissions;
var init_model_permissions = __esm({
  "node_modules/openai/resources/admin/organization/projects/model-permissions.mjs"() {
    "use strict";
    init_resource();
    init_path();
    ModelPermissions = class extends APIResource {
      /**
       * Returns model permissions for a project.
       *
       * @example
       * ```ts
       * const projectModelPermissions =
       *   await client.admin.organization.projects.modelPermissions.retrieve(
       *     'project_id',
       *   );
       * ```
       */
      retrieve(projectID, options) {
        return this._client.get(path4`/organization/projects/${projectID}/model_permissions`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates model permissions for a project.
       *
       * @example
       * ```ts
       * const projectModelPermissions =
       *   await client.admin.organization.projects.modelPermissions.update(
       *     'project_id',
       *     { mode: 'allow_list', model_ids: ['string'] },
       *   );
       * ```
       */
      update(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/model_permissions`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deletes model permissions for a project.
       *
       * @example
       * ```ts
       * const projectModelPermissionsDeleted =
       *   await client.admin.organization.projects.modelPermissions.delete(
       *     'project_id',
       *   );
       * ```
       */
      delete(projectID, options) {
        return this._client.delete(path4`/organization/projects/${projectID}/model_permissions`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/rate-limits.mjs
var RateLimits;
var init_rate_limits = __esm({
  "node_modules/openai/resources/admin/organization/projects/rate-limits.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    RateLimits = class extends APIResource {
      /**
       * Returns the rate limits per model for a project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectRateLimit of client.admin.organization.projects.rateLimits.listRateLimits(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      listRateLimits(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/rate_limits`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Updates a project rate limit.
       *
       * @example
       * ```ts
       * const projectRateLimit =
       *   await client.admin.organization.projects.rateLimits.updateRateLimit(
       *     'rate_limit_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      updateRateLimit(rateLimitID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/organization/projects/${project_id}/rate_limits/${rateLimitID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/roles.mjs
var Roles3;
var init_roles3 = __esm({
  "node_modules/openai/resources/admin/organization/projects/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles3 = class extends APIResource {
      /**
       * Creates a custom role for a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.roles.create(
       *     'project_id',
       *     { permissions: ['string'], role_name: 'role_name' },
       *   );
       * ```
       */
      create(projectID, body, options) {
        return this._client.post(path4`/projects/${projectID}/roles`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project role.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.roles.retrieve(
       *     'role_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(roleID, params, options) {
        const { project_id } = params;
        return this._client.get(path4`/projects/${project_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates an existing project role.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.roles.update(
       *     'role_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      update(roleID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/projects/${project_id}/roles/${roleID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the roles configured for a project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const role of client.admin.organization.projects.roles.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/projects/${projectID}/roles`, NextCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deletes a custom role from a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.roles.delete(
       *     'role_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(roleID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/projects/${project_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/spend-alerts.mjs
var SpendAlerts2;
var init_spend_alerts2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/spend-alerts.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    SpendAlerts2 = class extends APIResource {
      /**
       * Creates a project spend alert.
       *
       * @example
       * ```ts
       * const projectSpendAlert =
       *   await client.admin.organization.projects.spendAlerts.create(
       *     'project_id',
       *     {
       *       currency: 'USD',
       *       interval: 'month',
       *       notification_channel: {
       *         recipients: ['string'],
       *         type: 'email',
       *       },
       *       threshold_amount: 0,
       *     },
       *   );
       * ```
       */
      create(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/spend_alerts`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project spend alert.
       *
       * @example
       * ```ts
       * const projectSpendAlert =
       *   await client.admin.organization.projects.spendAlerts.retrieve(
       *     'alert_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(alertID, params, options) {
        const { project_id } = params;
        return this._client.get(path4`/organization/projects/${project_id}/spend_alerts/${alertID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates a project spend alert.
       *
       * @example
       * ```ts
       * const projectSpendAlert =
       *   await client.admin.organization.projects.spendAlerts.update(
       *     'alert_id',
       *     {
       *       project_id: 'project_id',
       *       currency: 'USD',
       *       interval: 'month',
       *       notification_channel: {
       *         recipients: ['string'],
       *         type: 'email',
       *       },
       *       threshold_amount: 0,
       *     },
       *   );
       * ```
       */
      update(alertID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/organization/projects/${project_id}/spend_alerts/${alertID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists project spend alerts.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectSpendAlert of client.admin.organization.projects.spendAlerts.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/spend_alerts`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deletes a project spend alert.
       *
       * @example
       * ```ts
       * const projectSpendAlertDeleted =
       *   await client.admin.organization.projects.spendAlerts.delete(
       *     'alert_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(alertID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/organization/projects/${project_id}/spend_alerts/${alertID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/groups/roles.mjs
var Roles4;
var init_roles4 = __esm({
  "node_modules/openai/resources/admin/organization/projects/groups/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles4 = class extends APIResource {
      /**
       * Assigns a project role to a group within a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.groups.roles.create(
       *     'group_id',
       *     { project_id: 'project_id', role_id: 'role_id' },
       *   );
       * ```
       */
      create(groupID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/projects/${project_id}/groups/${groupID}/roles`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project role assigned to a group.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.groups.roles.retrieve(
       *     'role_id',
       *     { project_id: 'project_id', group_id: 'group_id' },
       *   );
       * ```
       */
      retrieve(roleID, params, options) {
        const { project_id, group_id } = params;
        return this._client.get(path4`/projects/${project_id}/groups/${group_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the project roles assigned to a group within a project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const roleListResponse of client.admin.organization.projects.groups.roles.list(
       *   'group_id',
       *   { project_id: 'project_id' },
       * )) {
       *   // ...
       * }
       * ```
       */
      list(groupID, params, options) {
        const { project_id, ...query } = params;
        return this._client.getAPIList(path4`/projects/${project_id}/groups/${groupID}/roles`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Unassigns a project role from a group within a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.groups.roles.delete(
       *     'role_id',
       *     { project_id: 'project_id', group_id: 'group_id' },
       *   );
       * ```
       */
      delete(roleID, params, options) {
        const { project_id, group_id } = params;
        return this._client.delete(path4`/projects/${project_id}/groups/${group_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/groups/groups.mjs
var Groups2;
var init_groups2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/groups/groups.mjs"() {
    "use strict";
    init_resource();
    init_roles4();
    init_roles4();
    init_pagination();
    init_path();
    Groups2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.roles = new Roles4(this._client);
      }
      /**
       * Grants a group access to a project.
       *
       * @example
       * ```ts
       * const projectGroup =
       *   await client.admin.organization.projects.groups.create(
       *     'project_id',
       *     { group_id: 'group_id', role: 'role' },
       *   );
       * ```
       */
      create(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/groups`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project's group.
       *
       * @example
       * ```ts
       * const projectGroup =
       *   await client.admin.organization.projects.groups.retrieve(
       *     'group_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(groupID, params, options) {
        const { project_id, ...query } = params;
        return this._client.get(path4`/organization/projects/${project_id}/groups/${groupID}`, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the groups that have access to a project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectGroup of client.admin.organization.projects.groups.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/groups`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Revokes a group's access to a project.
       *
       * @example
       * ```ts
       * const group =
       *   await client.admin.organization.projects.groups.delete(
       *     'group_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(groupID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/organization/projects/${project_id}/groups/${groupID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
    Groups2.Roles = Roles4;
  }
});

// node_modules/openai/resources/admin/organization/projects/service-accounts/api-keys.mjs
var APIKeys2;
var init_api_keys2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/service-accounts/api-keys.mjs"() {
    "use strict";
    init_resource();
    init_path();
    APIKeys2 = class extends APIResource {
      /**
       * Creates an API key for a service account in the project.
       *
       * @example
       * ```ts
       * const apiKey =
       *   await client.admin.organization.projects.serviceAccounts.apiKeys.create(
       *     'service_account_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      create(serviceAccountID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/organization/projects/${project_id}/service_accounts/${serviceAccountID}/api_keys`, { body, ...options, __security: { adminAPIKeyAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/service-accounts/service-accounts.mjs
var ServiceAccounts;
var init_service_accounts = __esm({
  "node_modules/openai/resources/admin/organization/projects/service-accounts/service-accounts.mjs"() {
    "use strict";
    init_resource();
    init_api_keys2();
    init_api_keys2();
    init_pagination();
    init_path();
    ServiceAccounts = class extends APIResource {
      constructor() {
        super(...arguments);
        this.apiKeys = new APIKeys2(this._client);
      }
      /**
       * Creates a new service account in the project. By default, this also returns an
       * unredacted API key for the service account.
       *
       * @example
       * ```ts
       * const serviceAccount =
       *   await client.admin.organization.projects.serviceAccounts.create(
       *     'project_id',
       *     { name: 'name' },
       *   );
       * ```
       */
      create(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/service_accounts`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a service account in the project.
       *
       * @example
       * ```ts
       * const projectServiceAccount =
       *   await client.admin.organization.projects.serviceAccounts.retrieve(
       *     'service_account_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(serviceAccountID, params, options) {
        const { project_id } = params;
        return this._client.get(path4`/organization/projects/${project_id}/service_accounts/${serviceAccountID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Updates a service account in the project.
       *
       * @example
       * ```ts
       * const projectServiceAccount =
       *   await client.admin.organization.projects.serviceAccounts.update(
       *     'service_account_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      update(serviceAccountID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/organization/projects/${project_id}/service_accounts/${serviceAccountID}`, { body, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Returns a list of service accounts in the project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectServiceAccount of client.admin.organization.projects.serviceAccounts.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/service_accounts`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deletes a service account from the project.
       *
       * Returns confirmation of service account deletion, or an error if the project is
       * archived (archived projects have no service accounts).
       *
       * @example
       * ```ts
       * const serviceAccount =
       *   await client.admin.organization.projects.serviceAccounts.delete(
       *     'service_account_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(serviceAccountID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/organization/projects/${project_id}/service_accounts/${serviceAccountID}`, { ...options, __security: { adminAPIKeyAuth: true } });
      }
    };
    ServiceAccounts.APIKeys = APIKeys2;
  }
});

// node_modules/openai/resources/admin/organization/projects/users/roles.mjs
var Roles5;
var init_roles5 = __esm({
  "node_modules/openai/resources/admin/organization/projects/users/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles5 = class extends APIResource {
      /**
       * Assigns a project role to a user within a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.users.roles.create(
       *     'user_id',
       *     { project_id: 'project_id', role_id: 'role_id' },
       *   );
       * ```
       */
      create(userID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/projects/${project_id}/users/${userID}/roles`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project role assigned to a user.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.users.roles.retrieve(
       *     'role_id',
       *     { project_id: 'project_id', user_id: 'user_id' },
       *   );
       * ```
       */
      retrieve(roleID, params, options) {
        const { project_id, user_id } = params;
        return this._client.get(path4`/projects/${project_id}/users/${user_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the project roles assigned to a user within a project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const roleListResponse of client.admin.organization.projects.users.roles.list(
       *   'user_id',
       *   { project_id: 'project_id' },
       * )) {
       *   // ...
       * }
       * ```
       */
      list(userID, params, options) {
        const { project_id, ...query } = params;
        return this._client.getAPIList(path4`/projects/${project_id}/users/${userID}/roles`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Unassigns a project role from a user within a project.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.projects.users.roles.delete(
       *     'role_id',
       *     { project_id: 'project_id', user_id: 'user_id' },
       *   );
       * ```
       */
      delete(roleID, params, options) {
        const { project_id, user_id } = params;
        return this._client.delete(path4`/projects/${project_id}/users/${user_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/projects/users/users.mjs
var Users2;
var init_users2 = __esm({
  "node_modules/openai/resources/admin/organization/projects/users/users.mjs"() {
    "use strict";
    init_resource();
    init_roles5();
    init_roles5();
    init_pagination();
    init_path();
    Users2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.roles = new Roles5(this._client);
      }
      /**
       * Adds a user to the project. Users must already be members of the organization to
       * be added to a project.
       *
       * @example
       * ```ts
       * const projectUser =
       *   await client.admin.organization.projects.users.create(
       *     'project_id',
       *     { role: 'role' },
       *   );
       * ```
       */
      create(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}/users`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a user in the project.
       *
       * @example
       * ```ts
       * const projectUser =
       *   await client.admin.organization.projects.users.retrieve(
       *     'user_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      retrieve(userID, params, options) {
        const { project_id } = params;
        return this._client.get(path4`/organization/projects/${project_id}/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Modifies a user's role in the project.
       *
       * @example
       * ```ts
       * const projectUser =
       *   await client.admin.organization.projects.users.update(
       *     'user_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      update(userID, params, options) {
        const { project_id, ...body } = params;
        return this._client.post(path4`/organization/projects/${project_id}/users/${userID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Returns a list of users in the project.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const projectUser of client.admin.organization.projects.users.list(
       *   'project_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(projectID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/projects/${projectID}/users`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Deletes a user from the project.
       *
       * Returns confirmation of project user deletion, or an error if the project is
       * archived (archived projects have no users).
       *
       * @example
       * ```ts
       * const user =
       *   await client.admin.organization.projects.users.delete(
       *     'user_id',
       *     { project_id: 'project_id' },
       *   );
       * ```
       */
      delete(userID, params, options) {
        const { project_id } = params;
        return this._client.delete(path4`/organization/projects/${project_id}/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
    Users2.Roles = Roles5;
  }
});

// node_modules/openai/resources/admin/organization/projects/projects.mjs
var Projects;
var init_projects = __esm({
  "node_modules/openai/resources/admin/organization/projects/projects.mjs"() {
    "use strict";
    init_resource();
    init_api_keys();
    init_api_keys();
    init_certificates2();
    init_certificates2();
    init_data_retention2();
    init_data_retention2();
    init_hosted_tool_permissions();
    init_hosted_tool_permissions();
    init_model_permissions();
    init_model_permissions();
    init_rate_limits();
    init_rate_limits();
    init_roles3();
    init_roles3();
    init_spend_alerts2();
    init_spend_alerts2();
    init_groups2();
    init_groups2();
    init_service_accounts();
    init_service_accounts();
    init_users2();
    init_users2();
    init_pagination();
    init_path();
    Projects = class extends APIResource {
      constructor() {
        super(...arguments);
        this.users = new Users2(this._client);
        this.serviceAccounts = new ServiceAccounts(this._client);
        this.apiKeys = new APIKeys(this._client);
        this.rateLimits = new RateLimits(this._client);
        this.modelPermissions = new ModelPermissions(this._client);
        this.hostedToolPermissions = new HostedToolPermissions(this._client);
        this.groups = new Groups2(this._client);
        this.roles = new Roles3(this._client);
        this.dataRetention = new DataRetention2(this._client);
        this.spendAlerts = new SpendAlerts2(this._client);
        this.certificates = new Certificates2(this._client);
      }
      /**
       * Create a new project in the organization. Projects can be created and archived,
       * but cannot be deleted.
       *
       * @example
       * ```ts
       * const project =
       *   await client.admin.organization.projects.create({
       *     name: 'name',
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/organization/projects", {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves a project.
       *
       * @example
       * ```ts
       * const project =
       *   await client.admin.organization.projects.retrieve(
       *     'project_id',
       *   );
       * ```
       */
      retrieve(projectID, options) {
        return this._client.get(path4`/organization/projects/${projectID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Modifies a project in the organization.
       *
       * @example
       * ```ts
       * const project =
       *   await client.admin.organization.projects.update(
       *     'project_id',
       *   );
       * ```
       */
      update(projectID, body, options) {
        return this._client.post(path4`/organization/projects/${projectID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Returns a list of projects.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const project of client.admin.organization.projects.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/projects", ConversationCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Archives a project in the organization. Archived projects cannot be used or
       * updated.
       *
       * @example
       * ```ts
       * const project =
       *   await client.admin.organization.projects.archive(
       *     'project_id',
       *   );
       * ```
       */
      archive(projectID, options) {
        return this._client.post(path4`/organization/projects/${projectID}/archive`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
    Projects.Users = Users2;
    Projects.ServiceAccounts = ServiceAccounts;
    Projects.APIKeys = APIKeys;
    Projects.RateLimits = RateLimits;
    Projects.ModelPermissions = ModelPermissions;
    Projects.HostedToolPermissions = HostedToolPermissions;
    Projects.Groups = Groups2;
    Projects.Roles = Roles3;
    Projects.DataRetention = DataRetention2;
    Projects.SpendAlerts = SpendAlerts2;
    Projects.Certificates = Certificates2;
  }
});

// node_modules/openai/resources/admin/organization/users/roles.mjs
var Roles6;
var init_roles6 = __esm({
  "node_modules/openai/resources/admin/organization/users/roles.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Roles6 = class extends APIResource {
      /**
       * Assigns an organization role to a user within the organization.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.users.roles.create(
       *     'user_id',
       *     { role_id: 'role_id' },
       *   );
       * ```
       */
      create(userID, body, options) {
        return this._client.post(path4`/organization/users/${userID}/roles`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Retrieves an organization role assigned to a user.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.users.roles.retrieve(
       *     'role_id',
       *     { user_id: 'user_id' },
       *   );
       * ```
       */
      retrieve(roleID, params, options) {
        const { user_id } = params;
        return this._client.get(path4`/organization/users/${user_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists the organization roles assigned to a user within the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const roleListResponse of client.admin.organization.users.roles.list(
       *   'user_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(userID, query = {}, options) {
        return this._client.getAPIList(path4`/organization/users/${userID}/roles`, NextCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * Unassigns an organization role from a user within the organization.
       *
       * @example
       * ```ts
       * const role =
       *   await client.admin.organization.users.roles.delete(
       *     'role_id',
       *     { user_id: 'user_id' },
       *   );
       * ```
       */
      delete(roleID, params, options) {
        const { user_id } = params;
        return this._client.delete(path4`/organization/users/${user_id}/roles/${roleID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/admin/organization/users/users.mjs
var Users3;
var init_users3 = __esm({
  "node_modules/openai/resources/admin/organization/users/users.mjs"() {
    "use strict";
    init_resource();
    init_roles6();
    init_roles6();
    init_pagination();
    init_path();
    Users3 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.roles = new Roles6(this._client);
      }
      /**
       * Retrieves a user by their identifier.
       *
       * @example
       * ```ts
       * const organizationUser =
       *   await client.admin.organization.users.retrieve('user_id');
       * ```
       */
      retrieve(userID, options) {
        return this._client.get(path4`/organization/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Modifies a user's role in the organization.
       *
       * @example
       * ```ts
       * const organizationUser =
       *   await client.admin.organization.users.update('user_id');
       * ```
       */
      update(userID, body, options) {
        return this._client.post(path4`/organization/users/${userID}`, {
          body,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Lists all of the users in the organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const organizationUser of client.admin.organization.users.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/organization/users", ConversationCursorPage, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * Deletes a user from the organization.
       *
       * @example
       * ```ts
       * const user = await client.admin.organization.users.delete(
       *   'user_id',
       * );
       * ```
       */
      delete(userID, options) {
        return this._client.delete(path4`/organization/users/${userID}`, {
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
    };
    Users3.Roles = Roles6;
  }
});

// node_modules/openai/resources/admin/organization/organization.mjs
var Organization;
var init_organization = __esm({
  "node_modules/openai/resources/admin/organization/organization.mjs"() {
    "use strict";
    init_resource();
    init_admin_api_keys();
    init_admin_api_keys();
    init_audit_logs();
    init_audit_logs();
    init_certificates();
    init_certificates();
    init_data_retention();
    init_data_retention();
    init_invites();
    init_invites();
    init_roles();
    init_roles();
    init_spend_alerts();
    init_spend_alerts();
    init_usage();
    init_usage();
    init_groups();
    init_groups();
    init_projects();
    init_projects();
    init_users3();
    init_users3();
    Organization = class extends APIResource {
      constructor() {
        super(...arguments);
        this.auditLogs = new AuditLogs(this._client);
        this.adminAPIKeys = new AdminAPIKeys(this._client);
        this.usage = new Usage(this._client);
        this.invites = new Invites(this._client);
        this.users = new Users3(this._client);
        this.groups = new Groups(this._client);
        this.roles = new Roles(this._client);
        this.dataRetention = new DataRetention(this._client);
        this.spendAlerts = new SpendAlerts(this._client);
        this.certificates = new Certificates(this._client);
        this.projects = new Projects(this._client);
      }
    };
    Organization.AuditLogs = AuditLogs;
    Organization.AdminAPIKeys = AdminAPIKeys;
    Organization.Usage = Usage;
    Organization.Invites = Invites;
    Organization.Users = Users3;
    Organization.Groups = Groups;
    Organization.Roles = Roles;
    Organization.DataRetention = DataRetention;
    Organization.SpendAlerts = SpendAlerts;
    Organization.Certificates = Certificates;
    Organization.Projects = Projects;
  }
});

// node_modules/openai/resources/admin/admin.mjs
var Admin;
var init_admin = __esm({
  "node_modules/openai/resources/admin/admin.mjs"() {
    "use strict";
    init_resource();
    init_organization();
    init_organization();
    Admin = class extends APIResource {
      constructor() {
        super(...arguments);
        this.organization = new Organization(this._client);
      }
    };
    Admin.Organization = Organization;
  }
});

// node_modules/openai/resources/audio/speech.mjs
var Speech;
var init_speech = __esm({
  "node_modules/openai/resources/audio/speech.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    Speech = class extends APIResource {
      /**
       * Generates audio from the input text.
       *
       * Returns the audio file content, or a stream of audio events.
       *
       * @example
       * ```ts
       * const speech = await client.audio.speech.create({
       *   input: 'input',
       *   model: 'tts-1',
       *   voice: 'alloy',
       * });
       *
       * const content = await speech.blob();
       * console.log(content);
       * ```
       */
      create(body, options) {
        return this._client.post("/audio/speech", {
          body,
          ...options,
          headers: buildHeaders([{ Accept: "application/octet-stream" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
    };
  }
});

// node_modules/openai/resources/audio/transcriptions.mjs
var Transcriptions;
var init_transcriptions = __esm({
  "node_modules/openai/resources/audio/transcriptions.mjs"() {
    "use strict";
    init_resource();
    init_uploads();
    Transcriptions = class extends APIResource {
      create(body, options) {
        return this._client.post("/audio/transcriptions", multipartFormRequestOptions({
          body,
          ...options,
          stream: body.stream ?? false,
          __metadata: { model: body.model },
          __security: { bearerAuth: true }
        }, this._client));
      }
    };
  }
});

// node_modules/openai/resources/audio/translations.mjs
var Translations;
var init_translations = __esm({
  "node_modules/openai/resources/audio/translations.mjs"() {
    "use strict";
    init_resource();
    init_uploads();
    Translations = class extends APIResource {
      create(body, options) {
        return this._client.post("/audio/translations", multipartFormRequestOptions({ body, ...options, __metadata: { model: body.model }, __security: { bearerAuth: true } }, this._client));
      }
    };
  }
});

// node_modules/openai/resources/audio/audio.mjs
var Audio;
var init_audio = __esm({
  "node_modules/openai/resources/audio/audio.mjs"() {
    "use strict";
    init_resource();
    init_speech();
    init_speech();
    init_transcriptions();
    init_transcriptions();
    init_translations();
    init_translations();
    Audio = class extends APIResource {
      constructor() {
        super(...arguments);
        this.transcriptions = new Transcriptions(this._client);
        this.translations = new Translations(this._client);
        this.speech = new Speech(this._client);
      }
    };
    Audio.Transcriptions = Transcriptions;
    Audio.Translations = Translations;
    Audio.Speech = Speech;
  }
});

// node_modules/openai/resources/batches.mjs
var Batches;
var init_batches = __esm({
  "node_modules/openai/resources/batches.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Batches = class extends APIResource {
      /**
       * Creates and executes a batch from an uploaded file of requests
       */
      create(body, options) {
        return this._client.post("/batches", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Retrieves a batch.
       */
      retrieve(batchID, options) {
        return this._client.get(path4`/batches/${batchID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * List your organization's batches.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/batches", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
       * 10 minutes, before changing to `cancelled`, where it will have partial results
       * (if any) available in the output file.
       */
      cancel(batchID, options) {
        return this._client.post(path4`/batches/${batchID}/cancel`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/assistants.mjs
var Assistants;
var init_assistants = __esm({
  "node_modules/openai/resources/beta/assistants.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_path();
    Assistants = class extends APIResource {
      /**
       * Create an assistant with a model and instructions.
       *
       * @deprecated
       */
      create(body, options) {
        return this._client.post("/assistants", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves an assistant.
       *
       * @deprecated
       */
      retrieve(assistantID, options) {
        return this._client.get(path4`/assistants/${assistantID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modifies an assistant.
       *
       * @deprecated
       */
      update(assistantID, body, options) {
        return this._client.post(path4`/assistants/${assistantID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of assistants.
       *
       * @deprecated
       */
      list(query = {}, options) {
        return this._client.getAPIList("/assistants", CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete an assistant.
       *
       * @deprecated
       */
      delete(assistantID, options) {
        return this._client.delete(path4`/assistants/${assistantID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/realtime/sessions.mjs
var Sessions;
var init_sessions = __esm({
  "node_modules/openai/resources/beta/realtime/sessions.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    Sessions = class extends APIResource {
      /**
       * Create an ephemeral API token for use in client-side applications with the
       * Realtime API. Can be configured with the same session parameters as the
       * `session.update` client event.
       *
       * It responds with a session object, plus a `client_secret` key which contains a
       * usable ephemeral API token that can be used to authenticate browser clients for
       * the Realtime API.
       *
       * @example
       * ```ts
       * const session =
       *   await client.beta.realtime.sessions.create();
       * ```
       */
      create(body, options) {
        return this._client.post("/realtime/sessions", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/realtime/transcription-sessions.mjs
var TranscriptionSessions;
var init_transcription_sessions = __esm({
  "node_modules/openai/resources/beta/realtime/transcription-sessions.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    TranscriptionSessions = class extends APIResource {
      /**
       * Create an ephemeral API token for use in client-side applications with the
       * Realtime API specifically for realtime transcriptions. Can be configured with
       * the same session parameters as the `transcription_session.update` client event.
       *
       * It responds with a session object, plus a `client_secret` key which contains a
       * usable ephemeral API token that can be used to authenticate browser clients for
       * the Realtime API.
       *
       * @example
       * ```ts
       * const transcriptionSession =
       *   await client.beta.realtime.transcriptionSessions.create();
       * ```
       */
      create(body, options) {
        return this._client.post("/realtime/transcription_sessions", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/realtime/realtime.mjs
var Realtime;
var init_realtime = __esm({
  "node_modules/openai/resources/beta/realtime/realtime.mjs"() {
    "use strict";
    init_resource();
    init_sessions();
    init_sessions();
    init_transcription_sessions();
    init_transcription_sessions();
    Realtime = class extends APIResource {
      constructor() {
        super(...arguments);
        this.sessions = new Sessions(this._client);
        this.transcriptionSessions = new TranscriptionSessions(this._client);
      }
    };
    Realtime.Sessions = Sessions;
    Realtime.TranscriptionSessions = TranscriptionSessions;
  }
});

// node_modules/openai/resources/beta/chatkit/sessions.mjs
var Sessions2;
var init_sessions2 = __esm({
  "node_modules/openai/resources/beta/chatkit/sessions.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    init_path();
    Sessions2 = class extends APIResource {
      /**
       * Create a ChatKit session.
       *
       * @example
       * ```ts
       * const chatSession =
       *   await client.beta.chatkit.sessions.create({
       *     user: 'x',
       *     workflow: { id: 'id' },
       *   });
       * ```
       */
      create(body, options) {
        return this._client.post("/chatkit/sessions", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancel an active ChatKit session and return its most recent metadata.
       *
       * Cancelling prevents new requests from using the issued client secret.
       *
       * @example
       * ```ts
       * const chatSession =
       *   await client.beta.chatkit.sessions.cancel('cksess_123');
       * ```
       */
      cancel(sessionID, options) {
        return this._client.post(path4`/chatkit/sessions/${sessionID}/cancel`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/chatkit/threads.mjs
var Threads;
var init_threads = __esm({
  "node_modules/openai/resources/beta/chatkit/threads.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_path();
    Threads = class extends APIResource {
      /**
       * Retrieve a ChatKit thread by its identifier.
       *
       * @example
       * ```ts
       * const chatkitThread =
       *   await client.beta.chatkit.threads.retrieve('cthr_123');
       * ```
       */
      retrieve(threadID, options) {
        return this._client.get(path4`/chatkit/threads/${threadID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * List ChatKit threads with optional pagination and user filters.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const chatkitThread of client.beta.chatkit.threads.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/chatkit/threads", ConversationCursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a ChatKit thread along with its items and stored attachments.
       *
       * @example
       * ```ts
       * const thread = await client.beta.chatkit.threads.delete(
       *   'cthr_123',
       * );
       * ```
       */
      delete(threadID, options) {
        return this._client.delete(path4`/chatkit/threads/${threadID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * List items that belong to a ChatKit thread.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const thread of client.beta.chatkit.threads.listItems(
       *   'cthr_123',
       * )) {
       *   // ...
       * }
       * ```
       */
      listItems(threadID, query = {}, options) {
        return this._client.getAPIList(path4`/chatkit/threads/${threadID}/items`, ConversationCursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "chatkit_beta=v1" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/chatkit/chatkit.mjs
var ChatKit;
var init_chatkit = __esm({
  "node_modules/openai/resources/beta/chatkit/chatkit.mjs"() {
    "use strict";
    init_resource();
    init_sessions2();
    init_sessions2();
    init_threads();
    init_threads();
    ChatKit = class extends APIResource {
      constructor() {
        super(...arguments);
        this.sessions = new Sessions2(this._client);
        this.threads = new Threads(this._client);
      }
    };
    ChatKit.Sessions = Sessions2;
    ChatKit.Threads = Threads;
  }
});

// node_modules/openai/resources/beta/responses/input-items.mjs
var InputItems;
var init_input_items = __esm({
  "node_modules/openai/resources/beta/responses/input-items.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_path();
    InputItems = class extends APIResource {
      /**
       * Returns a list of input items for a given response.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const betaResponseItem of client.beta.responses.inputItems.list(
       *   'response_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(responseID, params = {}, options) {
        const { betas, ...query } = params ?? {};
        return this._client.getAPIList(path4`/responses/${responseID}/input_items?beta=true`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/responses/input-tokens.mjs
var InputTokens;
var init_input_tokens = __esm({
  "node_modules/openai/resources/beta/responses/input-tokens.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    InputTokens = class extends APIResource {
      /**
       * Returns input token counts of the request.
       *
       * Returns an object with `object` set to `response.input_tokens` and an
       * `input_tokens` count.
       *
       * @example
       * ```ts
       * const response =
       *   await client.beta.responses.inputTokens.count();
       * ```
       */
      count(params = {}, options) {
        const { betas, ...body } = params ?? {};
        return this._client.post("/responses/input_tokens?beta=true", {
          body,
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/responses/responses.mjs
var Responses;
var init_responses = __esm({
  "node_modules/openai/resources/beta/responses/responses.mjs"() {
    "use strict";
    init_resource();
    init_input_items();
    init_input_items();
    init_input_tokens();
    init_input_tokens();
    init_headers();
    init_path();
    Responses = class extends APIResource {
      constructor() {
        super(...arguments);
        this.inputItems = new InputItems(this._client);
        this.inputTokens = new InputTokens(this._client);
      }
      create(params, options) {
        const { betas, ...body } = params;
        return this._client.post("/responses?beta=true", {
          body,
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          stream: params.stream ?? false,
          __security: { bearerAuth: true }
        });
      }
      retrieve(responseID, params = {}, options) {
        const { betas, ...query } = params ?? {};
        return this._client.get(path4`/responses/${responseID}?beta=true`, {
          query,
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          stream: params?.stream ?? false,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Deletes a model response with the given ID.
       *
       * @example
       * ```ts
       * await client.beta.responses.delete(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      delete(responseID, params = {}, options) {
        const { betas } = params ?? {};
        return this._client.delete(path4`/responses/${responseID}?beta=true`, {
          ...options,
          headers: buildHeaders([
            { Accept: "*/*", ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancels a model response with the given ID. Only responses created with the
       * `background` parameter set to `true` can be cancelled.
       * [Learn more](https://platform.openai.com/docs/guides/background).
       *
       * @example
       * ```ts
       * const betaResponse = await client.beta.responses.cancel(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      cancel(responseID, params = {}, options) {
        const { betas } = params ?? {};
        return this._client.post(path4`/responses/${responseID}/cancel?beta=true`, {
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Compact a conversation. Returns a compacted response object.
       *
       * Learn when and how to compact long-running conversations in the
       * [conversation state guide](https://platform.openai.com/docs/guides/conversation-state#managing-the-context-window).
       * For ZDR-compatible compaction details, see
       * [Compaction (advanced)](https://platform.openai.com/docs/guides/conversation-state#compaction-advanced).
       *
       * @example
       * ```ts
       * const betaCompactedResponse =
       *   await client.beta.responses.compact({
       *     model: 'gpt-5.6-sol',
       *   });
       * ```
       */
      compact(params, options) {
        const { betas, ...body } = params;
        return this._client.post("/responses/compact?beta=true", {
          body,
          ...options,
          headers: buildHeaders([
            { ...betas?.toString() != null ? { "openai-beta": betas?.toString() } : void 0 },
            options?.headers
          ]),
          __security: { bearerAuth: true }
        });
      }
    };
    Responses.InputItems = InputItems;
    Responses.InputTokens = InputTokens;
  }
});

// node_modules/openai/resources/beta/threads/messages.mjs
var Messages2;
var init_messages2 = __esm({
  "node_modules/openai/resources/beta/threads/messages.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_path();
    Messages2 = class extends APIResource {
      /**
       * Create a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      create(threadID, body, options) {
        return this._client.post(path4`/threads/${threadID}/messages`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieve a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(messageID, params, options) {
        const { thread_id } = params;
        return this._client.get(path4`/threads/${thread_id}/messages/${messageID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modifies a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(messageID, params, options) {
        const { thread_id, ...body } = params;
        return this._client.post(path4`/threads/${thread_id}/messages/${messageID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of messages for a given thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      list(threadID, query = {}, options) {
        return this._client.getAPIList(path4`/threads/${threadID}/messages`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Deletes a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      delete(messageID, params, options) {
        const { thread_id } = params;
        return this._client.delete(path4`/threads/${thread_id}/messages/${messageID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/beta/threads/runs/steps.mjs
var Steps;
var init_steps = __esm({
  "node_modules/openai/resources/beta/threads/runs/steps.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_path();
    Steps = class extends APIResource {
      /**
       * Retrieves a run step.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(stepID, params, options) {
        const { thread_id, run_id, ...query } = params;
        return this._client.get(path4`/threads/${thread_id}/runs/${run_id}/steps/${stepID}`, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of run steps belonging to a run.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      list(runID, params, options) {
        const { thread_id, ...query } = params;
        return this._client.getAPIList(path4`/threads/${thread_id}/runs/${runID}/steps`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/internal/utils/base64.mjs
var toFloat32Array;
var init_base64 = __esm({
  "node_modules/openai/internal/utils/base64.mjs"() {
    "use strict";
    init_error();
    init_bytes();
    toFloat32Array = (base64Str) => {
      if (typeof Buffer !== "undefined") {
        const buf = Buffer.from(base64Str, "base64");
        return Array.from(new Float32Array(buf.buffer, buf.byteOffset, buf.length / Float32Array.BYTES_PER_ELEMENT));
      } else {
        const binaryStr = atob(base64Str);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        return Array.from(new Float32Array(bytes.buffer));
      }
    };
  }
});

// node_modules/openai/internal/utils/env.mjs
var readEnv;
var init_env = __esm({
  "node_modules/openai/internal/utils/env.mjs"() {
    "use strict";
    readEnv = (env2) => {
      if (typeof globalThis.process !== "undefined") {
        return globalThis.process.env?.[env2]?.trim() || void 0;
      }
      if (typeof globalThis.Deno !== "undefined") {
        return globalThis.Deno.env?.get?.(env2)?.trim() || void 0;
      }
      return void 0;
    };
  }
});

// node_modules/openai/internal/utils.mjs
var init_utils2 = __esm({
  "node_modules/openai/internal/utils.mjs"() {
    "use strict";
    init_values();
    init_base64();
    init_env();
    init_log();
    init_uuid();
    init_sleep();
    init_query();
  }
});

// node_modules/openai/lib/AssistantStream.mjs
function assertNever2(_x) {
}
var _AssistantStream_instances, _a, _AssistantStream_events, _AssistantStream_runStepSnapshots, _AssistantStream_messageSnapshots, _AssistantStream_messageSnapshot, _AssistantStream_finalRun, _AssistantStream_currentContentIndex, _AssistantStream_currentContent, _AssistantStream_currentToolCallIndex, _AssistantStream_currentToolCall, _AssistantStream_currentEvent, _AssistantStream_currentRunSnapshot, _AssistantStream_currentRunStepSnapshot, _AssistantStream_addEvent, _AssistantStream_endRequest, _AssistantStream_handleMessage, _AssistantStream_handleRunStep, _AssistantStream_handleEvent, _AssistantStream_accumulateRunStep, _AssistantStream_accumulateMessage, _AssistantStream_accumulateContent, _AssistantStream_handleRun, AssistantStream;
var init_AssistantStream = __esm({
  "node_modules/openai/lib/AssistantStream.mjs"() {
    "use strict";
    init_tslib();
    init_streaming2();
    init_error2();
    init_EventStream();
    init_utils2();
    AssistantStream = class extends EventStream {
      constructor() {
        super(...arguments);
        _AssistantStream_instances.add(this);
        _AssistantStream_events.set(this, []);
        _AssistantStream_runStepSnapshots.set(this, {});
        _AssistantStream_messageSnapshots.set(this, {});
        _AssistantStream_messageSnapshot.set(this, void 0);
        _AssistantStream_finalRun.set(this, void 0);
        _AssistantStream_currentContentIndex.set(this, void 0);
        _AssistantStream_currentContent.set(this, void 0);
        _AssistantStream_currentToolCallIndex.set(this, void 0);
        _AssistantStream_currentToolCall.set(this, void 0);
        _AssistantStream_currentEvent.set(this, void 0);
        _AssistantStream_currentRunSnapshot.set(this, void 0);
        _AssistantStream_currentRunStepSnapshot.set(this, void 0);
      }
      [(_AssistantStream_events = /* @__PURE__ */ new WeakMap(), _AssistantStream_runStepSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_finalRun = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContentIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCallIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCall = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentEvent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunStepSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("event", (event) => {
          const eventCopy = structuredClone(event);
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(eventCopy);
          } else {
            pushQueue.push(eventCopy);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        };
      }
      static fromReadableStream(stream) {
        const runner = new _a();
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        for await (const event of stream) {
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      toReadableStream() {
        const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
      static createToolAssistantStream(runId, runs, params, options) {
        const runner = new _a();
        runner._run(() => runner._runToolAssistantStream(runId, runs, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      async _createToolAssistantStream(run, runId, params, options) {
        this._listenForAbort(options?.signal);
        const body = { ...params, stream: true };
        const stream = await run.submitToolOutputs(runId, body, {
          ...options,
          signal: this.controller.signal
        });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static createThreadAssistantStream(params, thread, options) {
        const runner = new _a();
        runner._run(() => runner._threadAssistantStream(params, thread, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      static createAssistantStream(threadId, runs, params, options) {
        const runner = new _a();
        runner._run(() => runner._runAssistantStream(threadId, runs, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      currentEvent() {
        return __classPrivateFieldGet(this, _AssistantStream_currentEvent, "f");
      }
      currentRun() {
        return __classPrivateFieldGet(this, _AssistantStream_currentRunSnapshot, "f");
      }
      currentMessageSnapshot() {
        return __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f");
      }
      currentRunStepSnapshot() {
        return __classPrivateFieldGet(this, _AssistantStream_currentRunStepSnapshot, "f");
      }
      async finalRunSteps() {
        await this.done();
        return Object.values(__classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f"));
      }
      async finalMessages() {
        await this.done();
        return Object.values(__classPrivateFieldGet(this, _AssistantStream_messageSnapshots, "f"));
      }
      async finalRun() {
        await this.done();
        if (!__classPrivateFieldGet(this, _AssistantStream_finalRun, "f"))
          throw Error("Final run was not received.");
        return __classPrivateFieldGet(this, _AssistantStream_finalRun, "f");
      }
      async _createThreadAssistantStream(thread, params, options) {
        this._listenForAbort(options?.signal);
        const body = { ...params, stream: true };
        const stream = await thread.createAndRun(body, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      async _createAssistantStream(run, threadId, params, options) {
        this._listenForAbort(options?.signal);
        const body = { ...params, stream: true };
        const stream = await run.create(threadId, body, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static accumulateDelta(acc, delta) {
        for (const [key, deltaValue] of Object.entries(delta)) {
          if (!acc.hasOwnProperty(key)) {
            acc[key] = deltaValue;
            continue;
          }
          let accValue = acc[key];
          if (accValue === null || accValue === void 0) {
            acc[key] = deltaValue;
            continue;
          }
          if (key === "index" || key === "type") {
            acc[key] = deltaValue;
            continue;
          }
          if (typeof accValue === "string" && typeof deltaValue === "string") {
            accValue += deltaValue;
          } else if (typeof accValue === "number" && typeof deltaValue === "number") {
            accValue += deltaValue;
          } else if (isObj(accValue) && isObj(deltaValue)) {
            accValue = this.accumulateDelta(accValue, deltaValue);
          } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
            if (accValue.every((x) => typeof x === "string" || typeof x === "number")) {
              accValue.push(...deltaValue);
              continue;
            }
            for (const deltaEntry of deltaValue) {
              if (!isObj(deltaEntry)) {
                throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
              }
              const index = deltaEntry["index"];
              if (index == null) {
                console.error(deltaEntry);
                throw new Error("Expected array delta entry to have an `index` property");
              }
              if (typeof index !== "number") {
                throw new Error(`Expected array delta entry \`index\` property to be a number but got ${index}`);
              }
              const accEntry = accValue[index];
              if (accEntry == null) {
                accValue[index] = deltaEntry;
              } else {
                accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
              }
            }
            continue;
          } else {
            throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
          }
          acc[key] = accValue;
        }
        return acc;
      }
      _addRun(run) {
        return run;
      }
      async _threadAssistantStream(params, thread, options) {
        return await this._createThreadAssistantStream(thread, params, options);
      }
      async _runAssistantStream(threadId, runs, params, options) {
        return await this._createAssistantStream(runs, threadId, params, options);
      }
      async _runToolAssistantStream(runId, runs, params, options) {
        return await this._createToolAssistantStream(runs, runId, params, options);
      }
    };
    _a = AssistantStream, _AssistantStream_addEvent = function _AssistantStream_addEvent2(event) {
      if (this.ended)
        return;
      __classPrivateFieldSet(this, _AssistantStream_currentEvent, event, "f");
      __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
      switch (event.event) {
        case "thread.created":
          break;
        case "thread.run.created":
        case "thread.run.queued":
        case "thread.run.in_progress":
        case "thread.run.requires_action":
        case "thread.run.completed":
        case "thread.run.incomplete":
        case "thread.run.failed":
        case "thread.run.cancelling":
        case "thread.run.cancelled":
        case "thread.run.expired":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
          break;
        case "thread.run.step.created":
        case "thread.run.step.in_progress":
        case "thread.run.step.delta":
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
          break;
        case "thread.message.created":
        case "thread.message.in_progress":
        case "thread.message.delta":
        case "thread.message.completed":
        case "thread.message.incomplete":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
          break;
        case "error":
          throw new Error("Encountered an error event in event processing - errors should be processed earlier");
        default:
          assertNever2(event);
      }
    }, _AssistantStream_endRequest = function _AssistantStream_endRequest2() {
      if (this.ended) {
        throw new OpenAIError(`stream has ended, this shouldn't happen`);
      }
      if (!__classPrivateFieldGet(this, _AssistantStream_finalRun, "f"))
        throw Error("Final run has not been received");
      return __classPrivateFieldGet(this, _AssistantStream_finalRun, "f");
    }, _AssistantStream_handleMessage = function _AssistantStream_handleMessage2(event) {
      const [accumulatedMessage, newContent] = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
      __classPrivateFieldSet(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
      __classPrivateFieldGet(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
      for (const content of newContent) {
        const snapshotContent = accumulatedMessage.content[content.index];
        if (snapshotContent?.type == "text") {
          this._emit("textCreated", snapshotContent.text);
        }
      }
      switch (event.event) {
        case "thread.message.created":
          this._emit("messageCreated", event.data);
          break;
        case "thread.message.in_progress":
          break;
        case "thread.message.delta":
          this._emit("messageDelta", event.data.delta, accumulatedMessage);
          if (event.data.delta.content) {
            for (const content of event.data.delta.content) {
              if (content.type == "text" && content.text) {
                let textDelta = content.text;
                let snapshot = accumulatedMessage.content[content.index];
                if (snapshot && snapshot.type == "text") {
                  this._emit("textDelta", textDelta, snapshot.text);
                } else {
                  throw Error("The snapshot associated with this text delta is not text or missing");
                }
              }
              if (content.index != __classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f")) {
                if (__classPrivateFieldGet(this, _AssistantStream_currentContent, "f")) {
                  switch (__classPrivateFieldGet(this, _AssistantStream_currentContent, "f").type) {
                    case "text":
                      this._emit("textDone", __classPrivateFieldGet(this, _AssistantStream_currentContent, "f").text, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                    case "image_file":
                      this._emit("imageFileDone", __classPrivateFieldGet(this, _AssistantStream_currentContent, "f").image_file, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                  }
                }
                __classPrivateFieldSet(this, _AssistantStream_currentContentIndex, content.index, "f");
              }
              __classPrivateFieldSet(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
            }
          }
          break;
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (__classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f") !== void 0) {
            const currentContent = event.data.content[__classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f")];
            if (currentContent) {
              switch (currentContent.type) {
                case "image_file":
                  this._emit("imageFileDone", currentContent.image_file, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                  break;
                case "text":
                  this._emit("textDone", currentContent.text, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                  break;
              }
            }
          }
          if (__classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f")) {
            this._emit("messageDone", event.data);
          }
          __classPrivateFieldSet(this, _AssistantStream_messageSnapshot, void 0, "f");
      }
    }, _AssistantStream_handleRunStep = function _AssistantStream_handleRunStep2(event) {
      const accumulatedRunStep = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
      __classPrivateFieldSet(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
      switch (event.event) {
        case "thread.run.step.created":
          this._emit("runStepCreated", event.data);
          break;
        case "thread.run.step.delta":
          const delta = event.data.delta;
          if (delta.step_details && delta.step_details.type == "tool_calls" && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == "tool_calls") {
            for (const toolCall of delta.step_details.tool_calls) {
              if (toolCall.index == __classPrivateFieldGet(this, _AssistantStream_currentToolCallIndex, "f")) {
                this._emit("toolCallDelta", toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
              } else {
                if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
                  this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
                }
                __classPrivateFieldSet(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
                __classPrivateFieldSet(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
                if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"))
                  this._emit("toolCallCreated", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
              }
            }
          }
          this._emit("runStepDelta", event.data.delta, accumulatedRunStep);
          break;
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldSet(this, _AssistantStream_currentRunStepSnapshot, void 0, "f");
          const details = event.data.step_details;
          if (details.type == "tool_calls") {
            if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
              this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
              __classPrivateFieldSet(this, _AssistantStream_currentToolCall, void 0, "f");
            }
          }
          this._emit("runStepDone", event.data, accumulatedRunStep);
          break;
        case "thread.run.step.in_progress":
          break;
      }
    }, _AssistantStream_handleEvent = function _AssistantStream_handleEvent2(event) {
      __classPrivateFieldGet(this, _AssistantStream_events, "f").push(event);
      this._emit("event", event);
    }, _AssistantStream_accumulateRunStep = function _AssistantStream_accumulateRunStep2(event) {
      switch (event.event) {
        case "thread.run.step.created":
          __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          return event.data;
        case "thread.run.step.delta":
          let snapshot = __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
          if (!snapshot) {
            throw Error("Received a RunStepDelta before creation of a snapshot");
          }
          let data = event.data;
          if (data.delta) {
            const accumulated = _a.accumulateDelta(snapshot, data.delta);
            __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
          }
          return __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
        case "thread.run.step.in_progress":
          __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          break;
      }
      if (__classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id])
        return __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
      throw new Error("No snapshot available");
    }, _AssistantStream_accumulateMessage = function _AssistantStream_accumulateMessage2(event, snapshot) {
      let newContent = [];
      switch (event.event) {
        case "thread.message.created":
          return [event.data, newContent];
        case "thread.message.delta":
          if (!snapshot) {
            throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
          }
          let data = event.data;
          if (data.delta.content) {
            for (const contentElement of data.delta.content) {
              if (contentElement.index in snapshot.content) {
                let currentContent = snapshot.content[contentElement.index];
                snapshot.content[contentElement.index] = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
              } else {
                snapshot.content[contentElement.index] = contentElement;
                newContent.push(contentElement);
              }
            }
          }
          return [snapshot, newContent];
        case "thread.message.in_progress":
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (snapshot) {
            return [snapshot, newContent];
          } else {
            throw Error("Received thread message event with no existing snapshot");
          }
      }
      throw Error("Tried to accumulate a non-message event");
    }, _AssistantStream_accumulateContent = function _AssistantStream_accumulateContent2(contentElement, currentContent) {
      return _a.accumulateDelta(currentContent, contentElement);
    }, _AssistantStream_handleRun = function _AssistantStream_handleRun2(event) {
      __classPrivateFieldSet(this, _AssistantStream_currentRunSnapshot, event.data, "f");
      switch (event.event) {
        case "thread.run.created":
          break;
        case "thread.run.queued":
          break;
        case "thread.run.in_progress":
          break;
        case "thread.run.requires_action":
        case "thread.run.cancelled":
        case "thread.run.failed":
        case "thread.run.completed":
        case "thread.run.expired":
        case "thread.run.incomplete":
          __classPrivateFieldSet(this, _AssistantStream_finalRun, event.data, "f");
          if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
            this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
            __classPrivateFieldSet(this, _AssistantStream_currentToolCall, void 0, "f");
          }
          break;
        case "thread.run.cancelling":
          break;
      }
    };
  }
});

// node_modules/openai/resources/beta/threads/runs/runs.mjs
var Runs;
var init_runs = __esm({
  "node_modules/openai/resources/beta/threads/runs/runs.mjs"() {
    "use strict";
    init_resource();
    init_steps();
    init_steps();
    init_pagination();
    init_headers();
    init_AssistantStream();
    init_sleep();
    init_path();
    Runs = class extends APIResource {
      constructor() {
        super(...arguments);
        this.steps = new Steps(this._client);
      }
      create(threadID, params, options) {
        const { include, ...body } = params;
        return this._client.post(path4`/threads/${threadID}/runs`, {
          query: { include },
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          stream: params.stream ?? false,
          __synthesizeEventData: true,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves a run.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(runID, params, options) {
        const { thread_id } = params;
        return this._client.get(path4`/threads/${thread_id}/runs/${runID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modifies a run.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(runID, params, options) {
        const { thread_id, ...body } = params;
        return this._client.post(path4`/threads/${thread_id}/runs/${runID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of runs belonging to a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      list(threadID, query = {}, options) {
        return this._client.getAPIList(path4`/threads/${threadID}/runs`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancels a run that is `in_progress`.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      cancel(runID, params, options) {
        const { thread_id } = params;
        return this._client.post(path4`/threads/${thread_id}/runs/${runID}/cancel`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * A helper to create a run an poll for a terminal state. More information on Run
       * lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndPoll(threadId, body, options) {
        const run = await this.create(threadId, body, options);
        return await this.poll(run.id, { thread_id: threadId }, options);
      }
      /**
       * Create a Run stream
       *
       * @deprecated use `stream` instead
       */
      createAndStream(threadId, body, options) {
        return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      /**
       * A helper to poll a run status until it reaches a terminal state. More
       * information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async poll(runId, params, options) {
        const headers = buildHeaders([
          options?.headers,
          {
            "X-Stainless-Poll-Helper": "true",
            "X-Stainless-Custom-Poll-Interval": options?.pollIntervalMs?.toString() ?? void 0
          }
        ]);
        while (true) {
          const { data: run, response } = await this.retrieve(runId, params, {
            ...options,
            headers: { ...options?.headers, ...headers }
          }).withResponse();
          switch (run.status) {
            //If we are in any sort of intermediate state we poll
            case "queued":
            case "in_progress":
            case "cancelling":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            //We return the run in any terminal state.
            case "requires_action":
            case "incomplete":
            case "cancelled":
            case "completed":
            case "failed":
            case "expired":
              return run;
          }
        }
      }
      /**
       * Create a Run stream
       */
      stream(threadId, body, options) {
        return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      submitToolOutputs(runID, params, options) {
        const { thread_id, ...body } = params;
        return this._client.post(path4`/threads/${thread_id}/runs/${runID}/submit_tool_outputs`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          stream: params.stream ?? false,
          __synthesizeEventData: true,
          __security: { bearerAuth: true }
        });
      }
      /**
       * A helper to submit a tool output to a run and poll for a terminal run state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async submitToolOutputsAndPoll(runId, params, options) {
        const run = await this.submitToolOutputs(runId, params, options);
        return await this.poll(run.id, params, options);
      }
      /**
       * Submit the tool outputs from a previous run and stream the run to a terminal
       * state. More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      submitToolOutputsStream(runId, params, options) {
        return AssistantStream.createToolAssistantStream(runId, this._client.beta.threads.runs, params, options);
      }
    };
    Runs.Steps = Steps;
  }
});

// node_modules/openai/resources/beta/threads/threads.mjs
var Threads2;
var init_threads2 = __esm({
  "node_modules/openai/resources/beta/threads/threads.mjs"() {
    "use strict";
    init_resource();
    init_messages2();
    init_messages2();
    init_runs();
    init_runs();
    init_headers();
    init_AssistantStream();
    init_path();
    Threads2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.runs = new Runs(this._client);
        this.messages = new Messages2(this._client);
      }
      /**
       * Create a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      create(body = {}, options) {
        return this._client.post("/threads", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(threadID, options) {
        return this._client.get(path4`/threads/${threadID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modifies a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(threadID, body, options) {
        return this._client.post(path4`/threads/${threadID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      delete(threadID, options) {
        return this._client.delete(path4`/threads/${threadID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      createAndRun(body, options) {
        return this._client.post("/threads/runs", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          stream: body.stream ?? false,
          __synthesizeEventData: true,
          __security: { bearerAuth: true }
        });
      }
      /**
       * A helper to create a thread, start a run and then poll for a terminal state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndRunPoll(body, options) {
        const run = await this.createAndRun(body, options);
        return await this.runs.poll(run.id, { thread_id: run.thread_id }, options);
      }
      /**
       * Create a thread and stream the run back
       */
      createAndRunStream(body, options) {
        return AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
      }
    };
    Threads2.Runs = Runs;
    Threads2.Messages = Messages2;
  }
});

// node_modules/openai/resources/beta/beta.mjs
var Beta;
var init_beta = __esm({
  "node_modules/openai/resources/beta/beta.mjs"() {
    "use strict";
    init_resource();
    init_assistants();
    init_assistants();
    init_realtime();
    init_realtime();
    init_chatkit();
    init_chatkit();
    init_responses();
    init_responses();
    init_threads2();
    init_threads2();
    Beta = class extends APIResource {
      constructor() {
        super(...arguments);
        this.realtime = new Realtime(this._client);
        this.responses = new Responses(this._client);
        this.chatkit = new ChatKit(this._client);
        this.assistants = new Assistants(this._client);
        this.threads = new Threads2(this._client);
      }
    };
    Beta.Realtime = Realtime;
    Beta.Responses = Responses;
    Beta.ChatKit = ChatKit;
    Beta.Assistants = Assistants;
    Beta.Threads = Threads2;
  }
});

// node_modules/openai/resources/completions.mjs
var Completions2;
var init_completions3 = __esm({
  "node_modules/openai/resources/completions.mjs"() {
    "use strict";
    init_resource();
    Completions2 = class extends APIResource {
      create(body, options) {
        return this._client.post("/completions", {
          body,
          ...options,
          stream: body.stream ?? false,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/containers/files/content.mjs
var Content;
var init_content = __esm({
  "node_modules/openai/resources/containers/files/content.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    init_path();
    Content = class extends APIResource {
      /**
       * Retrieve Container File Content
       */
      retrieve(fileID, params, options) {
        const { container_id } = params;
        return this._client.get(path4`/containers/${container_id}/files/${fileID}/content`, {
          ...options,
          headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
    };
  }
});

// node_modules/openai/resources/containers/files/files.mjs
var Files;
var init_files = __esm({
  "node_modules/openai/resources/containers/files/files.mjs"() {
    "use strict";
    init_resource();
    init_content();
    init_content();
    init_pagination();
    init_headers();
    init_uploads();
    init_path();
    Files = class extends APIResource {
      constructor() {
        super(...arguments);
        this.content = new Content(this._client);
      }
      /**
       * Create a Container File
       *
       * You can send either a multipart/form-data request with the raw file content, or
       * a JSON request with a file ID.
       */
      create(containerID, body, options) {
        return this._client.post(path4`/containers/${containerID}/files`, maybeMultipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Retrieve Container File
       */
      retrieve(fileID, params, options) {
        const { container_id } = params;
        return this._client.get(path4`/containers/${container_id}/files/${fileID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List Container files
       */
      list(containerID, query = {}, options) {
        return this._client.getAPIList(path4`/containers/${containerID}/files`, CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete Container File
       */
      delete(fileID, params, options) {
        const { container_id } = params;
        return this._client.delete(path4`/containers/${container_id}/files/${fileID}`, {
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
    Files.Content = Content;
  }
});

// node_modules/openai/resources/containers/containers.mjs
var Containers;
var init_containers = __esm({
  "node_modules/openai/resources/containers/containers.mjs"() {
    "use strict";
    init_resource();
    init_files();
    init_files();
    init_pagination();
    init_headers();
    init_path();
    Containers = class extends APIResource {
      constructor() {
        super(...arguments);
        this.files = new Files(this._client);
      }
      /**
       * Create Container
       */
      create(body, options) {
        return this._client.post("/containers", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Retrieve Container
       */
      retrieve(containerID, options) {
        return this._client.get(path4`/containers/${containerID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List Containers
       */
      list(query = {}, options) {
        return this._client.getAPIList("/containers", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete Container
       */
      delete(containerID, options) {
        return this._client.delete(path4`/containers/${containerID}`, {
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
    Containers.Files = Files;
  }
});

// node_modules/openai/resources/conversations/items.mjs
var Items;
var init_items = __esm({
  "node_modules/openai/resources/conversations/items.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Items = class extends APIResource {
      /**
       * Create items in a conversation with the given ID.
       */
      create(conversationID, params, options) {
        const { include, ...body } = params;
        return this._client.post(path4`/conversations/${conversationID}/items`, {
          query: { include },
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get a single item from a conversation with the given IDs.
       */
      retrieve(itemID, params, options) {
        const { conversation_id, ...query } = params;
        return this._client.get(path4`/conversations/${conversation_id}/items/${itemID}`, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List all items for a conversation with the given ID.
       */
      list(conversationID, query = {}, options) {
        return this._client.getAPIList(path4`/conversations/${conversationID}/items`, ConversationCursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Delete an item from a conversation with the given IDs.
       */
      delete(itemID, params, options) {
        const { conversation_id } = params;
        return this._client.delete(path4`/conversations/${conversation_id}/items/${itemID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/conversations/conversations.mjs
var Conversations;
var init_conversations = __esm({
  "node_modules/openai/resources/conversations/conversations.mjs"() {
    "use strict";
    init_resource();
    init_items();
    init_items();
    init_path();
    Conversations = class extends APIResource {
      constructor() {
        super(...arguments);
        this.items = new Items(this._client);
      }
      /**
       * Create a conversation.
       */
      create(body = {}, options) {
        return this._client.post("/conversations", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Get a conversation
       */
      retrieve(conversationID, options) {
        return this._client.get(path4`/conversations/${conversationID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Update a conversation
       */
      update(conversationID, body, options) {
        return this._client.post(path4`/conversations/${conversationID}`, {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a conversation. Items in the conversation will not be deleted.
       */
      delete(conversationID, options) {
        return this._client.delete(path4`/conversations/${conversationID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
    Conversations.Items = Items;
  }
});

// node_modules/openai/resources/embeddings.mjs
var Embeddings;
var init_embeddings = __esm({
  "node_modules/openai/resources/embeddings.mjs"() {
    "use strict";
    init_resource();
    init_utils2();
    Embeddings = class extends APIResource {
      /**
       * Creates an embedding vector representing the input text.
       *
       * @example
       * ```ts
       * const createEmbeddingResponse =
       *   await client.embeddings.create({
       *     input: 'The quick brown fox jumped over the lazy dog',
       *     model: 'text-embedding-3-small',
       *   });
       * ```
       */
      create(body, options) {
        const hasUserProvidedEncodingFormat = !!body.encoding_format;
        let encoding_format = hasUserProvidedEncodingFormat ? body.encoding_format : "base64";
        if (hasUserProvidedEncodingFormat) {
          loggerFor(this._client).debug("embeddings/user defined encoding_format:", body.encoding_format);
        }
        const response = this._client.post("/embeddings", {
          body: {
            ...body,
            encoding_format
          },
          ...options,
          __security: { bearerAuth: true }
        });
        if (hasUserProvidedEncodingFormat) {
          return response;
        }
        loggerFor(this._client).debug("embeddings/decoding base64 embeddings from base64");
        return response._thenUnwrap((response2) => {
          if (response2 && response2.data) {
            response2.data.forEach((embeddingBase64Obj) => {
              const embeddingBase64Str = embeddingBase64Obj.embedding;
              embeddingBase64Obj.embedding = toFloat32Array(embeddingBase64Str);
            });
          }
          return response2;
        });
      }
    };
  }
});

// node_modules/openai/resources/evals/runs/output-items.mjs
var OutputItems;
var init_output_items = __esm({
  "node_modules/openai/resources/evals/runs/output-items.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    OutputItems = class extends APIResource {
      /**
       * Get an evaluation run output item by ID.
       */
      retrieve(outputItemID, params, options) {
        const { eval_id, run_id } = params;
        return this._client.get(path4`/evals/${eval_id}/runs/${run_id}/output_items/${outputItemID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get a list of output items for an evaluation run.
       */
      list(runID, params, options) {
        const { eval_id, ...query } = params;
        return this._client.getAPIList(path4`/evals/${eval_id}/runs/${runID}/output_items`, CursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/evals/runs/runs.mjs
var Runs2;
var init_runs2 = __esm({
  "node_modules/openai/resources/evals/runs/runs.mjs"() {
    "use strict";
    init_resource();
    init_output_items();
    init_output_items();
    init_pagination();
    init_path();
    Runs2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.outputItems = new OutputItems(this._client);
      }
      /**
       * Kicks off a new run for a given evaluation, specifying the data source, and what
       * model configuration to use to test. The datasource will be validated against the
       * schema specified in the config of the evaluation.
       */
      create(evalID, body, options) {
        return this._client.post(path4`/evals/${evalID}/runs`, {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get an evaluation run by ID.
       */
      retrieve(runID, params, options) {
        const { eval_id } = params;
        return this._client.get(path4`/evals/${eval_id}/runs/${runID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get a list of runs for an evaluation.
       */
      list(evalID, query = {}, options) {
        return this._client.getAPIList(path4`/evals/${evalID}/runs`, CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete an eval run.
       */
      delete(runID, params, options) {
        const { eval_id } = params;
        return this._client.delete(path4`/evals/${eval_id}/runs/${runID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancel an ongoing evaluation run.
       */
      cancel(runID, params, options) {
        const { eval_id } = params;
        return this._client.post(path4`/evals/${eval_id}/runs/${runID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
    Runs2.OutputItems = OutputItems;
  }
});

// node_modules/openai/resources/evals/evals.mjs
var Evals;
var init_evals = __esm({
  "node_modules/openai/resources/evals/evals.mjs"() {
    "use strict";
    init_resource();
    init_runs2();
    init_runs2();
    init_pagination();
    init_path();
    Evals = class extends APIResource {
      constructor() {
        super(...arguments);
        this.runs = new Runs2(this._client);
      }
      /**
       * Create the structure of an evaluation that can be used to test a model's
       * performance. An evaluation is a set of testing criteria and the config for a
       * data source, which dictates the schema of the data used in the evaluation. After
       * creating an evaluation, you can run it on different models and model parameters.
       * We support several types of graders and datasources. For more information, see
       * the [Evals guide](https://platform.openai.com/docs/guides/evals).
       */
      create(body, options) {
        return this._client.post("/evals", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Get an evaluation by ID.
       */
      retrieve(evalID, options) {
        return this._client.get(path4`/evals/${evalID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Update certain properties of an evaluation.
       */
      update(evalID, body, options) {
        return this._client.post(path4`/evals/${evalID}`, { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * List evaluations for a project.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/evals", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete an evaluation.
       */
      delete(evalID, options) {
        return this._client.delete(path4`/evals/${evalID}`, { ...options, __security: { bearerAuth: true } });
      }
    };
    Evals.Runs = Runs2;
  }
});

// node_modules/openai/resources/files.mjs
var Files2;
var init_files2 = __esm({
  "node_modules/openai/resources/files.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_sleep();
    init_error2();
    init_uploads();
    init_path();
    Files2 = class extends APIResource {
      /**
       * Upload a file that can be used across various endpoints. Individual files can be
       * up to 512 MB, and each project can store up to 2.5 TB of files in total. There
       * is no organization-wide storage limit. Uploads to this endpoint are rate-limited
       * to 1,000 requests per minute per authenticated user.
       *
       * - The Assistants API supports files up to 2 million tokens and of specific file
       *   types. See the
       *   [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools)
       *   for details.
       * - The Fine-tuning API only supports `.jsonl` files. The input also has certain
       *   required formats for fine-tuning
       *   [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input)
       *   or
       *   [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
       *   models.
       * - The Batch API only supports `.jsonl` files up to 200 MB in size. The input
       *   also has a specific required
       *   [format](https://platform.openai.com/docs/api-reference/batch/request-input).
       * - For Retrieval or `file_search` ingestion, upload files here first. If you need
       *   to attach multiple uploaded files to the same vector store, use
       *   [`/vector_stores/{vector_store_id}/file_batches`](https://platform.openai.com/docs/api-reference/vector-stores-file-batches/createBatch)
       *   instead of attaching them one by one. Vector store attachment has separate
       *   limits from file upload, including 2,000 attached files per minute per
       *   organization.
       *
       * Please [contact us](https://help.openai.com/) if you need to increase these
       * storage limits.
       */
      create(body, options) {
        return this._client.post("/files", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Returns information about a specific file.
       */
      retrieve(fileID, options) {
        return this._client.get(path4`/files/${fileID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Returns a list of files.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/files", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a file and remove it from all vector stores.
       */
      delete(fileID, options) {
        return this._client.delete(path4`/files/${fileID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Returns the contents of the specified file.
       */
      content(fileID, options) {
        return this._client.get(path4`/files/${fileID}/content`, {
          ...options,
          headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
      /**
       * Waits for the given file to be processed, default timeout is 30 mins.
       */
      async waitForProcessing(id, { pollInterval = 5e3, maxWait = 30 * 60 * 1e3 } = {}) {
        const TERMINAL_STATES = /* @__PURE__ */ new Set(["processed", "error", "deleted"]);
        const start = Date.now();
        let file = await this.retrieve(id);
        while (!file.status || !TERMINAL_STATES.has(file.status)) {
          await sleep(pollInterval);
          file = await this.retrieve(id);
          if (Date.now() - start > maxWait) {
            throw new APIConnectionTimeoutError({
              message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`
            });
          }
        }
        return file;
      }
    };
  }
});

// node_modules/openai/resources/fine-tuning/methods.mjs
var Methods;
var init_methods = __esm({
  "node_modules/openai/resources/fine-tuning/methods.mjs"() {
    "use strict";
    init_resource();
    Methods = class extends APIResource {
    };
  }
});

// node_modules/openai/resources/fine-tuning/alpha/graders.mjs
var Graders;
var init_graders = __esm({
  "node_modules/openai/resources/fine-tuning/alpha/graders.mjs"() {
    "use strict";
    init_resource();
    Graders = class extends APIResource {
      /**
       * Run a grader.
       *
       * @example
       * ```ts
       * const response = await client.fineTuning.alpha.graders.run({
       *   grader: {
       *     input: 'input',
       *     name: 'name',
       *     operation: 'eq',
       *     reference: 'reference',
       *     type: 'string_check',
       *   },
       *   model_sample: 'model_sample',
       * });
       * ```
       */
      run(body, options) {
        return this._client.post("/fine_tuning/alpha/graders/run", {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Validate a grader.
       *
       * @example
       * ```ts
       * const response =
       *   await client.fineTuning.alpha.graders.validate({
       *     grader: {
       *       input: 'input',
       *       name: 'name',
       *       operation: 'eq',
       *       reference: 'reference',
       *       type: 'string_check',
       *     },
       *   });
       * ```
       */
      validate(body, options) {
        return this._client.post("/fine_tuning/alpha/graders/validate", {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/fine-tuning/alpha/alpha.mjs
var Alpha;
var init_alpha = __esm({
  "node_modules/openai/resources/fine-tuning/alpha/alpha.mjs"() {
    "use strict";
    init_resource();
    init_graders();
    init_graders();
    Alpha = class extends APIResource {
      constructor() {
        super(...arguments);
        this.graders = new Graders(this._client);
      }
    };
    Alpha.Graders = Graders;
  }
});

// node_modules/openai/resources/fine-tuning/checkpoints/permissions.mjs
var Permissions;
var init_permissions = __esm({
  "node_modules/openai/resources/fine-tuning/checkpoints/permissions.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Permissions = class extends APIResource {
      /**
       * **NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).
       *
       * This enables organization owners to share fine-tuned models with other projects
       * in their organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const permissionCreateResponse of client.fineTuning.checkpoints.permissions.create(
       *   'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
       *   { project_ids: ['string'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      create(fineTunedModelCheckpoint, body, options) {
        return this._client.getAPIList(path4`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`, Page, { body, method: "post", ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
       *
       * Organization owners can use this endpoint to view all permissions for a
       * fine-tuned model checkpoint.
       *
       * @deprecated Retrieve is deprecated. Please swap to the paginated list method instead.
       */
      retrieve(fineTunedModelCheckpoint, query = {}, options) {
        return this._client.get(path4`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`, {
          query,
          ...options,
          __security: { adminAPIKeyAuth: true }
        });
      }
      /**
       * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
       *
       * Organization owners can use this endpoint to view all permissions for a
       * fine-tuned model checkpoint.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const permissionListResponse of client.fineTuning.checkpoints.permissions.list(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(fineTunedModelCheckpoint, query = {}, options) {
        return this._client.getAPIList(path4`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`, ConversationCursorPage, { query, ...options, __security: { adminAPIKeyAuth: true } });
      }
      /**
       * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
       *
       * Organization owners can use this endpoint to delete a permission for a
       * fine-tuned model checkpoint.
       *
       * @example
       * ```ts
       * const permission =
       *   await client.fineTuning.checkpoints.permissions.delete(
       *     'cp_zc4Q7MP6XxulcVzj4MZdwsAB',
       *     {
       *       fine_tuned_model_checkpoint:
       *         'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
       *     },
       *   );
       * ```
       */
      delete(permissionID, params, options) {
        const { fine_tuned_model_checkpoint } = params;
        return this._client.delete(path4`/fine_tuning/checkpoints/${fine_tuned_model_checkpoint}/permissions/${permissionID}`, { ...options, __security: { adminAPIKeyAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/fine-tuning/checkpoints/checkpoints.mjs
var Checkpoints;
var init_checkpoints = __esm({
  "node_modules/openai/resources/fine-tuning/checkpoints/checkpoints.mjs"() {
    "use strict";
    init_resource();
    init_permissions();
    init_permissions();
    Checkpoints = class extends APIResource {
      constructor() {
        super(...arguments);
        this.permissions = new Permissions(this._client);
      }
    };
    Checkpoints.Permissions = Permissions;
  }
});

// node_modules/openai/resources/fine-tuning/jobs/checkpoints.mjs
var Checkpoints2;
var init_checkpoints2 = __esm({
  "node_modules/openai/resources/fine-tuning/jobs/checkpoints.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Checkpoints2 = class extends APIResource {
      /**
       * List checkpoints for a fine-tuning job.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const fineTuningJobCheckpoint of client.fineTuning.jobs.checkpoints.list(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(fineTuningJobID, query = {}, options) {
        return this._client.getAPIList(path4`/fine_tuning/jobs/${fineTuningJobID}/checkpoints`, CursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/fine-tuning/jobs/jobs.mjs
var Jobs;
var init_jobs = __esm({
  "node_modules/openai/resources/fine-tuning/jobs/jobs.mjs"() {
    "use strict";
    init_resource();
    init_checkpoints2();
    init_checkpoints2();
    init_pagination();
    init_path();
    Jobs = class extends APIResource {
      constructor() {
        super(...arguments);
        this.checkpoints = new Checkpoints2(this._client);
      }
      /**
       * Creates a fine-tuning job which begins the process of creating a new model from
       * a given dataset.
       *
       * Response includes details of the enqueued job including job status and the name
       * of the fine-tuned models once complete.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.create({
       *   model: 'gpt-4o-mini',
       *   training_file: 'file-abc123',
       * });
       * ```
       */
      create(body, options) {
        return this._client.post("/fine_tuning/jobs", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Get info about a fine-tuning job.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.retrieve(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      retrieve(fineTuningJobID, options) {
        return this._client.get(path4`/fine_tuning/jobs/${fineTuningJobID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List your organization's fine-tuning jobs
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const fineTuningJob of client.fineTuning.jobs.list()) {
       *   // ...
       * }
       * ```
       */
      list(query = {}, options) {
        return this._client.getAPIList("/fine_tuning/jobs", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Immediately cancel a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.cancel(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      cancel(fineTuningJobID, options) {
        return this._client.post(path4`/fine_tuning/jobs/${fineTuningJobID}/cancel`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Get status updates for a fine-tuning job.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const fineTuningJobEvent of client.fineTuning.jobs.listEvents(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * )) {
       *   // ...
       * }
       * ```
       */
      listEvents(fineTuningJobID, query = {}, options) {
        return this._client.getAPIList(path4`/fine_tuning/jobs/${fineTuningJobID}/events`, CursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Pause a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.pause(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      pause(fineTuningJobID, options) {
        return this._client.post(path4`/fine_tuning/jobs/${fineTuningJobID}/pause`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Resume a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.resume(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      resume(fineTuningJobID, options) {
        return this._client.post(path4`/fine_tuning/jobs/${fineTuningJobID}/resume`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
    Jobs.Checkpoints = Checkpoints2;
  }
});

// node_modules/openai/resources/fine-tuning/fine-tuning.mjs
var FineTuning;
var init_fine_tuning = __esm({
  "node_modules/openai/resources/fine-tuning/fine-tuning.mjs"() {
    "use strict";
    init_resource();
    init_methods();
    init_methods();
    init_alpha();
    init_alpha();
    init_checkpoints();
    init_checkpoints();
    init_jobs();
    init_jobs();
    FineTuning = class extends APIResource {
      constructor() {
        super(...arguments);
        this.methods = new Methods(this._client);
        this.jobs = new Jobs(this._client);
        this.checkpoints = new Checkpoints(this._client);
        this.alpha = new Alpha(this._client);
      }
    };
    FineTuning.Methods = Methods;
    FineTuning.Jobs = Jobs;
    FineTuning.Checkpoints = Checkpoints;
    FineTuning.Alpha = Alpha;
  }
});

// node_modules/openai/resources/graders/grader-models.mjs
var GraderModels;
var init_grader_models = __esm({
  "node_modules/openai/resources/graders/grader-models.mjs"() {
    "use strict";
    init_resource();
    GraderModels = class extends APIResource {
    };
  }
});

// node_modules/openai/resources/graders/graders.mjs
var Graders2;
var init_graders2 = __esm({
  "node_modules/openai/resources/graders/graders.mjs"() {
    "use strict";
    init_resource();
    init_grader_models();
    init_grader_models();
    Graders2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.graderModels = new GraderModels(this._client);
      }
    };
    Graders2.GraderModels = GraderModels;
  }
});

// node_modules/openai/resources/images.mjs
var Images;
var init_images = __esm({
  "node_modules/openai/resources/images.mjs"() {
    "use strict";
    init_resource();
    init_uploads();
    Images = class extends APIResource {
      /**
       * Creates a variation of a given image. This endpoint only supports `dall-e-2`.
       *
       * @example
       * ```ts
       * const imagesResponse = await client.images.createVariation({
       *   image: fs.createReadStream('otter.png'),
       * });
       * ```
       */
      createVariation(body, options) {
        return this._client.post("/images/variations", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      edit(body, options) {
        return this._client.post("/images/edits", multipartFormRequestOptions({ body, ...options, stream: body.stream ?? false, __security: { bearerAuth: true } }, this._client));
      }
      generate(body, options) {
        return this._client.post("/images/generations", {
          body,
          ...options,
          stream: body.stream ?? false,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/models.mjs
var Models;
var init_models = __esm({
  "node_modules/openai/resources/models.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    Models = class extends APIResource {
      /**
       * Retrieves a model instance, providing basic information about the model such as
       * the owner and permissioning.
       */
      retrieve(model, options) {
        return this._client.get(path4`/models/${model}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Lists the currently available models, and provides basic information about each
       * one such as the owner and availability.
       */
      list(options) {
        return this._client.getAPIList("/models", Page, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Delete a fine-tuned model. You must have the Owner role in your organization to
       * delete a model.
       */
      delete(model, options) {
        return this._client.delete(path4`/models/${model}`, { ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/moderations.mjs
var Moderations;
var init_moderations = __esm({
  "node_modules/openai/resources/moderations.mjs"() {
    "use strict";
    init_resource();
    Moderations = class extends APIResource {
      /**
       * Classifies if text and/or image inputs are potentially harmful. Learn more in
       * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
       */
      create(body, options) {
        return this._client.post("/moderations", { body, ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/realtime/calls.mjs
var Calls;
var init_calls = __esm({
  "node_modules/openai/resources/realtime/calls.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    init_path();
    Calls = class extends APIResource {
      /**
       * Accept an incoming SIP call and configure the realtime session that will handle
       * it.
       *
       * @example
       * ```ts
       * await client.realtime.calls.accept('call_id', {
       *   type: 'realtime',
       * });
       * ```
       */
      accept(callID, body, options) {
        return this._client.post(path4`/realtime/calls/${callID}/accept`, {
          body,
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * End an active Realtime API call, whether it was initiated over SIP or WebRTC.
       *
       * @example
       * ```ts
       * await client.realtime.calls.hangup('call_id');
       * ```
       */
      hangup(callID, options) {
        return this._client.post(path4`/realtime/calls/${callID}/hangup`, {
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Transfer an active SIP call to a new destination using the SIP REFER verb.
       *
       * @example
       * ```ts
       * await client.realtime.calls.refer('call_id', {
       *   target_uri: 'tel:+14155550123',
       * });
       * ```
       */
      refer(callID, body, options) {
        return this._client.post(path4`/realtime/calls/${callID}/refer`, {
          body,
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Decline an incoming SIP call by returning a SIP status code to the caller.
       *
       * @example
       * ```ts
       * await client.realtime.calls.reject('call_id');
       * ```
       */
      reject(callID, body = {}, options) {
        return this._client.post(path4`/realtime/calls/${callID}/reject`, {
          body,
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/realtime/client-secrets.mjs
var ClientSecrets;
var init_client_secrets = __esm({
  "node_modules/openai/resources/realtime/client-secrets.mjs"() {
    "use strict";
    init_resource();
    ClientSecrets = class extends APIResource {
      /**
       * Create a Realtime client secret with an associated session configuration.
       *
       * Client secrets are short-lived tokens that can be passed to a client app, such
       * as a web frontend or mobile client, which grants access to the Realtime API
       * without leaking your main API key. You can configure a custom TTL for each
       * client secret.
       *
       * You can also attach session configuration options to the client secret, which
       * will be applied to any sessions created using that client secret, but these can
       * also be overridden by the client connection.
       *
       * [Learn more about authentication with client secrets over WebRTC](https://platform.openai.com/docs/guides/realtime-webrtc).
       *
       * Returns the created client secret and the effective session object. The client
       * secret is a string that looks like `ek_1234`.
       *
       * @example
       * ```ts
       * const clientSecret =
       *   await client.realtime.clientSecrets.create();
       * ```
       */
      create(body, options) {
        return this._client.post("/realtime/client_secrets", {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/realtime/realtime.mjs
var Realtime2;
var init_realtime2 = __esm({
  "node_modules/openai/resources/realtime/realtime.mjs"() {
    "use strict";
    init_resource();
    init_calls();
    init_calls();
    init_client_secrets();
    init_client_secrets();
    Realtime2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.clientSecrets = new ClientSecrets(this._client);
        this.calls = new Calls(this._client);
      }
    };
    Realtime2.ClientSecrets = ClientSecrets;
    Realtime2.Calls = Calls;
  }
});

// node_modules/openai/lib/ResponsesParser.mjs
function maybeParseResponse(response, params) {
  if (!params || !hasAutoParseableInput2(params)) {
    const parsed = {
      ...response,
      output_parsed: null,
      output: response.output.map((item) => {
        if (item.type === "function_call") {
          return {
            ...item,
            parsed_arguments: null
          };
        }
        if (item.type === "message") {
          return {
            ...item,
            content: item.content.map((content) => ({
              ...content,
              parsed: null
            }))
          };
        } else {
          return item;
        }
      })
    };
    if (needsOutputText(response, parsed)) {
      addOutputText(parsed);
    }
    return parsed;
  }
  return parseResponse(response, params);
}
function parseResponse(response, params) {
  const shouldParse = !response.status || response.status === "completed";
  const output = response.output.map((item) => {
    if (item.type === "function_call") {
      return {
        ...item,
        parsed_arguments: shouldParse ? parseToolCall2(params, item) : null
      };
    }
    if (item.type === "message") {
      const content = item.content.map((content2) => {
        if (content2.type === "output_text") {
          return {
            ...content2,
            parsed: shouldParse ? parseTextFormat(params, content2.text) : null
          };
        }
        return content2;
      });
      return {
        ...item,
        content
      };
    }
    return item;
  });
  const parsed = Object.assign({}, response, { output });
  if (needsOutputText(response, parsed)) {
    addOutputText(parsed);
  }
  Object.defineProperty(parsed, "output_parsed", {
    enumerable: true,
    get() {
      for (const output2 of parsed.output) {
        if (output2.type !== "message") {
          continue;
        }
        for (const content of output2.content) {
          if (content.type === "output_text" && content.parsed !== null) {
            return content.parsed;
          }
        }
      }
      return null;
    }
  });
  return parsed;
}
function parseTextFormat(params, content) {
  if (params.text?.format?.type !== "json_schema") {
    return null;
  }
  if ("$parseRaw" in params.text?.format) {
    const text_format = params.text?.format;
    return text_format.$parseRaw(content);
  }
  return JSON.parse(content);
}
function hasAutoParseableInput2(params) {
  if (isAutoParsableResponseFormat(params.text?.format)) {
    return true;
  }
  return false;
}
function isAutoParsableTool2(tool) {
  return tool?.["$brand"] === "auto-parseable-tool";
}
function getInputToolByName(input_tools, name) {
  return input_tools.find((tool) => tool.type === "function" && tool.name === name);
}
function parseToolCall2(params, toolCall) {
  const inputTool = getInputToolByName(params.tools ?? [], toolCall.name);
  return {
    ...toolCall,
    ...toolCall,
    parsed_arguments: isAutoParsableTool2(inputTool) ? inputTool.$parseRaw(toolCall.arguments) : inputTool?.strict ? JSON.parse(toolCall.arguments) : null
  };
}
function needsOutputText(response, target) {
  return !Object.getOwnPropertyDescriptor(response, "output_text") || target.output_text == null;
}
function addOutputText(rsp) {
  const texts = [];
  for (const output of rsp.output) {
    if (output.type !== "message") {
      continue;
    }
    for (const content of output.content) {
      if (content.type === "output_text") {
        texts.push(content.text);
      }
    }
  }
  rsp.output_text = texts.join("");
}
var init_ResponsesParser = __esm({
  "node_modules/openai/lib/ResponsesParser.mjs"() {
    "use strict";
    init_error2();
    init_parser();
  }
});

// node_modules/openai/lib/responses/ResponseAccumulator.mjs
function accumulateResponse(event, snapshot) {
  if (!snapshot) {
    if (event.type !== "response.created") {
      throw new OpenAIError(`When snapshot hasn't been set yet, expected 'response.created' event, got ${event.type}`);
    }
    return cloneResponse(event.response);
  }
  switch (event.type) {
    case "response.output_item.added": {
      snapshot.output.push(structuredClone(event.item));
      if (event.item.type === "message") {
        addOutputText(snapshot);
      }
      break;
    }
    case "response.output_item.done": {
      getOutput(snapshot, event.output_index);
      snapshot.output[event.output_index] = structuredClone(event.item);
      if (event.item.type === "message") {
        addOutputText(snapshot);
      }
      break;
    }
    case "response.content_part.added": {
      const output = getOutput(snapshot, event.output_index);
      const type = output.type;
      const part = event.part;
      if (type === "message" && part.type !== "reasoning_text") {
        output.content.push(structuredClone(part));
        if (part.type === "output_text") {
          addOutputText(snapshot);
        }
      } else if (type === "reasoning" && part.type === "reasoning_text") {
        if (!output.content) {
          output.content = [];
        }
        output.content.push(structuredClone(part));
      }
      break;
    }
    case "response.content_part.done": {
      const output = getOutput(snapshot, event.output_index);
      const part = event.part;
      if (output.type === "message" && part.type !== "reasoning_text") {
        getContent(output.content, event.content_index);
        output.content[event.content_index] = structuredClone(part);
        if (part.type === "output_text") {
          addOutputText(snapshot);
        }
      } else if (output.type === "reasoning" && part.type === "reasoning_text") {
        const content = output.content;
        if (!content) {
          throw new OpenAIError(`missing content at index ${event.content_index}`);
        }
        getContent(content, event.content_index);
        content[event.content_index] = structuredClone(part);
      }
      break;
    }
    case "response.output_text.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "message") {
        const content = getContent(output.content, event.content_index);
        if (content.type !== "output_text") {
          throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
        }
        content.text += event.delta;
        snapshot.output_text += event.delta;
      }
      break;
    }
    case "response.output_text.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "message") {
        const content = getContent(output.content, event.content_index);
        if (content.type !== "output_text") {
          throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
        }
        content.text = event.text;
        addOutputText(snapshot);
      }
      break;
    }
    case "response.output_text.annotation.added": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "message") {
        const content = getContent(output.content, event.content_index);
        if (content.type !== "output_text") {
          throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
        }
        content.annotations[event.annotation_index] = structuredClone(event.annotation);
      }
      break;
    }
    case "response.refusal.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "message") {
        const content = getContent(output.content, event.content_index);
        if (content.type !== "refusal") {
          throw new OpenAIError(`expected content to be 'refusal', got ${content.type}`);
        }
        content.refusal += event.delta;
      }
      break;
    }
    case "response.refusal.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "message") {
        const content = getContent(output.content, event.content_index);
        if (content.type !== "refusal") {
          throw new OpenAIError(`expected content to be 'refusal', got ${content.type}`);
        }
        content.refusal = event.refusal;
      }
      break;
    }
    case "response.function_call_arguments.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "function_call") {
        output.arguments += event.delta;
      }
      break;
    }
    case "response.function_call_arguments.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "function_call") {
        output.arguments = event.arguments;
      }
      break;
    }
    case "response.reasoning_text.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        if (!output.content) {
          throw new OpenAIError(`missing content at index ${event.content_index}`);
        }
        const content = getContent(output.content, event.content_index);
        if (content.type !== "reasoning_text") {
          throw new OpenAIError(`expected content to be 'reasoning_text', got ${content.type}`);
        }
        content.text += event.delta;
      }
      break;
    }
    case "response.reasoning_text.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        if (!output.content) {
          throw new OpenAIError(`missing content at index ${event.content_index}`);
        }
        const content = getContent(output.content, event.content_index);
        if (content.type !== "reasoning_text") {
          throw new OpenAIError(`expected content to be 'reasoning_text', got ${content.type}`);
        }
        content.text = event.text;
      }
      break;
    }
    case "response.reasoning_summary_part.added": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        output.summary.push(structuredClone(event.part));
      }
      break;
    }
    case "response.reasoning_summary_part.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        getContent(output.summary, event.summary_index);
        output.summary[event.summary_index] = structuredClone(event.part);
      }
      break;
    }
    case "response.reasoning_summary_text.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        const part = getContent(output.summary, event.summary_index);
        part.text += event.delta;
      }
      break;
    }
    case "response.reasoning_summary_text.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "reasoning") {
        const part = getContent(output.summary, event.summary_index);
        part.text = event.text;
      }
      break;
    }
    case "response.custom_tool_call_input.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "custom_tool_call") {
        output.input += event.delta;
      }
      break;
    }
    case "response.custom_tool_call_input.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "custom_tool_call") {
        output.input = event.input;
      }
      break;
    }
    case "response.mcp_call_arguments.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "mcp_call") {
        output.arguments += event.delta;
      }
      break;
    }
    case "response.mcp_call_arguments.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "mcp_call") {
        output.arguments = event.arguments;
      }
      break;
    }
    case "response.code_interpreter_call_code.delta": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "code_interpreter_call") {
        output.code = (output.code ?? "") + event.delta;
      }
      break;
    }
    case "response.code_interpreter_call_code.done": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "code_interpreter_call") {
        output.code = event.code;
      }
      break;
    }
    case "response.code_interpreter_call.in_progress": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "code_interpreter_call") {
        output.status = "in_progress";
      }
      break;
    }
    case "response.code_interpreter_call.interpreting": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "code_interpreter_call") {
        output.status = "interpreting";
      }
      break;
    }
    case "response.code_interpreter_call.completed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "code_interpreter_call") {
        output.status = "completed";
      }
      break;
    }
    case "response.file_search_call.in_progress": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "file_search_call") {
        output.status = "in_progress";
      }
      break;
    }
    case "response.file_search_call.searching": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "file_search_call") {
        output.status = "searching";
      }
      break;
    }
    case "response.file_search_call.completed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "file_search_call") {
        output.status = "completed";
      }
      break;
    }
    case "response.web_search_call.in_progress": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "web_search_call") {
        output.status = "in_progress";
      }
      break;
    }
    case "response.web_search_call.searching": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "web_search_call") {
        output.status = "searching";
      }
      break;
    }
    case "response.web_search_call.completed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "web_search_call") {
        output.status = "completed";
      }
      break;
    }
    case "response.image_generation_call.in_progress": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "image_generation_call") {
        output.status = "in_progress";
      }
      break;
    }
    case "response.image_generation_call.generating": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "image_generation_call") {
        output.status = "generating";
      }
      break;
    }
    case "response.image_generation_call.completed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "image_generation_call") {
        output.status = "completed";
      }
      break;
    }
    case "response.mcp_call.in_progress": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "mcp_call") {
        output.status = "in_progress";
      }
      break;
    }
    case "response.mcp_call.completed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "mcp_call") {
        output.status = "completed";
      }
      break;
    }
    case "response.mcp_call.failed": {
      const output = getOutput(snapshot, event.output_index);
      if (output.type === "mcp_call") {
        output.status = "failed";
      }
      break;
    }
    case "response.created":
    case "response.queued":
    case "response.in_progress":
    case "response.completed":
    case "response.failed":
    case "response.incomplete": {
      snapshot = cloneResponse(event.response);
      break;
    }
    case "response.audio.delta":
    case "response.audio.done":
    case "response.audio.transcript.delta":
    case "response.audio.transcript.done":
    case "response.image_generation_call.partial_image":
    case "response.mcp_list_tools.in_progress":
    case "response.mcp_list_tools.completed":
    case "response.mcp_list_tools.failed":
    case "keepalive":
    case "error": {
      break;
    }
    default: {
      assertNever3(event);
    }
  }
  return snapshot;
}
function cloneResponse(response) {
  const snapshot = structuredClone(response);
  if (!Object.getOwnPropertyDescriptor(snapshot, "output_text") || snapshot.output_text == null) {
    addOutputText(snapshot);
  }
  return snapshot;
}
function getOutput(snapshot, outputIndex) {
  const output = snapshot.output[outputIndex];
  if (!output) {
    throw new OpenAIError(`missing output at index ${outputIndex}`);
  }
  return output;
}
function getContent(content, contentIndex) {
  const part = content[contentIndex];
  if (!part) {
    throw new OpenAIError(`missing content at index ${contentIndex}`);
  }
  return part;
}
function assertNever3(value) {
  throw new OpenAIError(`Unhandled response stream event: ${JSON.stringify(value)}`);
}
var init_ResponseAccumulator = __esm({
  "node_modules/openai/lib/responses/ResponseAccumulator.mjs"() {
    "use strict";
    init_error2();
    init_ResponsesParser();
  }
});

// node_modules/openai/lib/responses/ResponseStream.mjs
function finalizeResponse(snapshot, params) {
  return maybeParseResponse(snapshot, params);
}
var _ResponseStream_instances, _ResponseStream_params, _ResponseStream_currentResponseSnapshot, _ResponseStream_finalResponse, _ResponseStream_beginRequest, _ResponseStream_addEvent, _ResponseStream_endRequest, ResponseStream;
var init_ResponseStream = __esm({
  "node_modules/openai/lib/responses/ResponseStream.mjs"() {
    "use strict";
    init_tslib();
    init_error2();
    init_EventStream();
    init_ResponseAccumulator();
    init_ResponsesParser();
    init_streaming2();
    ResponseStream = class _ResponseStream extends EventStream {
      constructor(params) {
        super();
        _ResponseStream_instances.add(this);
        _ResponseStream_params.set(this, void 0);
        _ResponseStream_currentResponseSnapshot.set(this, void 0);
        _ResponseStream_finalResponse.set(this, void 0);
        __classPrivateFieldSet(this, _ResponseStream_params, params, "f");
      }
      static createResponse(client, params, options) {
        const runner = new _ResponseStream(params);
        runner._run(() => runner._createOrRetrieveResponse(client, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      static fromReadableStream(stream) {
        const runner = new _ResponseStream(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      async _createOrRetrieveResponse(client, params, options) {
        this._listenForAbort(options?.signal);
        __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_beginRequest).call(this);
        let stream;
        let starting_after = null;
        if ("response_id" in params) {
          stream = await client.responses.retrieve(params.response_id, { stream: true }, { ...options, signal: this.controller.signal, stream: true });
          starting_after = params.starting_after ?? null;
        } else {
          stream = await client.responses.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
        }
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_addEvent).call(this, event, starting_after);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_endRequest).call(this);
      }
      async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_beginRequest).call(this);
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        for await (const event of stream) {
          __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_addEvent).call(this, event, null);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return __classPrivateFieldGet(this, _ResponseStream_instances, "m", _ResponseStream_endRequest).call(this);
      }
      [(_ResponseStream_params = /* @__PURE__ */ new WeakMap(), _ResponseStream_currentResponseSnapshot = /* @__PURE__ */ new WeakMap(), _ResponseStream_finalResponse = /* @__PURE__ */ new WeakMap(), _ResponseStream_instances = /* @__PURE__ */ new WeakSet(), _ResponseStream_beginRequest = function _ResponseStream_beginRequest2() {
        if (this.ended)
          return;
        __classPrivateFieldSet(this, _ResponseStream_currentResponseSnapshot, void 0, "f");
      }, _ResponseStream_addEvent = function _ResponseStream_addEvent2(event, starting_after) {
        if (this.ended)
          return;
        const maybeEmit = (name, event2) => {
          if (starting_after == null || event2.sequence_number > starting_after) {
            this._emit(name, event2);
          }
        };
        const response = accumulateResponse(event, __classPrivateFieldGet(this, _ResponseStream_currentResponseSnapshot, "f"));
        __classPrivateFieldSet(this, _ResponseStream_currentResponseSnapshot, response, "f");
        maybeEmit("event", event);
        switch (event.type) {
          case "response.output_text.delta": {
            const output = response.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "message") {
              const content = output.content[event.content_index];
              if (!content) {
                throw new OpenAIError(`missing content at index ${event.content_index}`);
              }
              if (content.type !== "output_text") {
                throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
              }
              maybeEmit("response.output_text.delta", {
                ...event,
                snapshot: content.text
              });
            }
            break;
          }
          case "response.function_call_arguments.delta": {
            const output = response.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "function_call") {
              maybeEmit("response.function_call_arguments.delta", {
                ...event,
                snapshot: output.arguments
              });
            }
            break;
          }
          default:
            maybeEmit(event.type, event);
            break;
        }
      }, _ResponseStream_endRequest = function _ResponseStream_endRequest2() {
        if (this.ended) {
          throw new OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet(this, _ResponseStream_currentResponseSnapshot, "f");
        if (!snapshot) {
          throw new OpenAIError(`request ended without sending any events`);
        }
        __classPrivateFieldSet(this, _ResponseStream_currentResponseSnapshot, void 0, "f");
        const parsedResponse = finalizeResponse(snapshot, __classPrivateFieldGet(this, _ResponseStream_params, "f"));
        __classPrivateFieldSet(this, _ResponseStream_finalResponse, parsedResponse, "f");
        return parsedResponse;
      }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("event", (event) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(event);
          } else {
            pushQueue.push(event);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((event2) => event2 ? { value: event2, done: false } : { value: void 0, done: true });
            }
            const event = pushQueue.shift();
            return { value: event, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        };
      }
      /**
       * @returns a promise that resolves with the final Response, or rejects
       * if an error occurred or the stream ended prematurely without producing a REsponse.
       */
      async finalResponse() {
        await this.done();
        const response = __classPrivateFieldGet(this, _ResponseStream_finalResponse, "f");
        if (!response)
          throw new OpenAIError("stream ended without producing a ChatCompletion");
        return response;
      }
    };
  }
});

// node_modules/openai/resources/responses/input-items.mjs
var InputItems2;
var init_input_items2 = __esm({
  "node_modules/openai/resources/responses/input-items.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_path();
    InputItems2 = class extends APIResource {
      /**
       * Returns a list of input items for a given response.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const responseItem of client.responses.inputItems.list(
       *   'response_id',
       * )) {
       *   // ...
       * }
       * ```
       */
      list(responseID, query = {}, options) {
        return this._client.getAPIList(path4`/responses/${responseID}/input_items`, CursorPage, { query, ...options, __security: { bearerAuth: true } });
      }
    };
  }
});

// node_modules/openai/resources/responses/input-tokens.mjs
var InputTokens2;
var init_input_tokens2 = __esm({
  "node_modules/openai/resources/responses/input-tokens.mjs"() {
    "use strict";
    init_resource();
    InputTokens2 = class extends APIResource {
      /**
       * Returns input token counts of the request.
       *
       * Returns an object with `object` set to `response.input_tokens` and an
       * `input_tokens` count.
       *
       * @example
       * ```ts
       * const response = await client.responses.inputTokens.count();
       * ```
       */
      count(body = {}, options) {
        return this._client.post("/responses/input_tokens", {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/responses/responses.mjs
var Responses2;
var init_responses2 = __esm({
  "node_modules/openai/resources/responses/responses.mjs"() {
    "use strict";
    init_ResponsesParser();
    init_ResponseStream();
    init_resource();
    init_input_items2();
    init_input_items2();
    init_input_tokens2();
    init_input_tokens2();
    init_headers();
    init_path();
    Responses2 = class extends APIResource {
      constructor() {
        super(...arguments);
        this.inputItems = new InputItems2(this._client);
        this.inputTokens = new InputTokens2(this._client);
      }
      create(body, options) {
        return this._client.post("/responses", {
          body,
          ...options,
          stream: body.stream ?? false,
          __security: { bearerAuth: true }
        })._thenUnwrap((rsp) => {
          if ("object" in rsp && rsp.object === "response") {
            addOutputText(rsp);
          }
          return rsp;
        });
      }
      retrieve(responseID, query = {}, options) {
        return this._client.get(path4`/responses/${responseID}`, {
          query,
          ...options,
          stream: query?.stream ?? false,
          __security: { bearerAuth: true }
        })._thenUnwrap((rsp) => {
          if ("object" in rsp && rsp.object === "response") {
            addOutputText(rsp);
          }
          return rsp;
        });
      }
      /**
       * Deletes a model response with the given ID.
       *
       * @example
       * ```ts
       * await client.responses.delete(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      delete(responseID, options) {
        return this._client.delete(path4`/responses/${responseID}`, {
          ...options,
          headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      parse(body, options) {
        return this._client.responses.create(body, options)._thenUnwrap((response) => parseResponse(response, body));
      }
      /**
       * Creates a model response stream
       */
      stream(body, options) {
        return ResponseStream.createResponse(this._client, body, options);
      }
      /**
       * Cancels a model response with the given ID. Only responses created with the
       * `background` parameter set to `true` can be cancelled.
       * [Learn more](https://platform.openai.com/docs/guides/background).
       *
       * @example
       * ```ts
       * const response = await client.responses.cancel(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      cancel(responseID, options) {
        return this._client.post(path4`/responses/${responseID}/cancel`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Compact a conversation. Returns a compacted response object.
       *
       * Learn when and how to compact long-running conversations in the
       * [conversation state guide](https://platform.openai.com/docs/guides/conversation-state#managing-the-context-window).
       * For ZDR-compatible compaction details, see
       * [Compaction (advanced)](https://platform.openai.com/docs/guides/conversation-state#compaction-advanced).
       *
       * @example
       * ```ts
       * const compactedResponse = await client.responses.compact({
       *   model: 'gpt-5.6-sol',
       * });
       * ```
       */
      compact(body, options) {
        return this._client.post("/responses/compact", { body, ...options, __security: { bearerAuth: true } });
      }
    };
    Responses2.InputItems = InputItems2;
    Responses2.InputTokens = InputTokens2;
  }
});

// node_modules/openai/resources/skills/content.mjs
var Content2;
var init_content2 = __esm({
  "node_modules/openai/resources/skills/content.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    init_path();
    Content2 = class extends APIResource {
      /**
       * Download a skill zip bundle by its ID.
       */
      retrieve(skillID, options) {
        return this._client.get(path4`/skills/${skillID}/content`, {
          ...options,
          headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
    };
  }
});

// node_modules/openai/resources/skills/versions/content.mjs
var Content3;
var init_content3 = __esm({
  "node_modules/openai/resources/skills/versions/content.mjs"() {
    "use strict";
    init_resource();
    init_headers();
    init_path();
    Content3 = class extends APIResource {
      /**
       * Download a skill version zip bundle.
       */
      retrieve(version, params, options) {
        const { skill_id } = params;
        return this._client.get(path4`/skills/${skill_id}/versions/${version}/content`, {
          ...options,
          headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
    };
  }
});

// node_modules/openai/resources/skills/versions/versions.mjs
var Versions;
var init_versions = __esm({
  "node_modules/openai/resources/skills/versions/versions.mjs"() {
    "use strict";
    init_resource();
    init_content3();
    init_content3();
    init_pagination();
    init_uploads();
    init_path();
    Versions = class extends APIResource {
      constructor() {
        super(...arguments);
        this.content = new Content3(this._client);
      }
      /**
       * Create a new immutable skill version.
       */
      create(skillID, body = {}, options) {
        return this._client.post(path4`/skills/${skillID}/versions`, maybeMultipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Get a specific skill version.
       */
      retrieve(version, params, options) {
        const { skill_id } = params;
        return this._client.get(path4`/skills/${skill_id}/versions/${version}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List skill versions for a skill.
       */
      list(skillID, query = {}, options) {
        return this._client.getAPIList(path4`/skills/${skillID}/versions`, CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a skill version.
       */
      delete(version, params, options) {
        const { skill_id } = params;
        return this._client.delete(path4`/skills/${skill_id}/versions/${version}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
    Versions.Content = Content3;
  }
});

// node_modules/openai/resources/skills/skills.mjs
var Skills;
var init_skills = __esm({
  "node_modules/openai/resources/skills/skills.mjs"() {
    "use strict";
    init_resource();
    init_content2();
    init_content2();
    init_versions();
    init_versions();
    init_pagination();
    init_uploads();
    init_path();
    Skills = class extends APIResource {
      constructor() {
        super(...arguments);
        this.content = new Content2(this._client);
        this.versions = new Versions(this._client);
      }
      /**
       * Create a new skill.
       */
      create(body = {}, options) {
        return this._client.post("/skills", maybeMultipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Get a skill by its ID.
       */
      retrieve(skillID, options) {
        return this._client.get(path4`/skills/${skillID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Update the default version pointer for a skill.
       */
      update(skillID, body, options) {
        return this._client.post(path4`/skills/${skillID}`, {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * List all skills for the current project.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/skills", CursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a skill by its ID.
       */
      delete(skillID, options) {
        return this._client.delete(path4`/skills/${skillID}`, { ...options, __security: { bearerAuth: true } });
      }
    };
    Skills.Content = Content2;
    Skills.Versions = Versions;
  }
});

// node_modules/openai/resources/uploads/parts.mjs
var Parts;
var init_parts = __esm({
  "node_modules/openai/resources/uploads/parts.mjs"() {
    "use strict";
    init_resource();
    init_uploads();
    init_path();
    Parts = class extends APIResource {
      /**
       * Adds a
       * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
       * A Part represents a chunk of bytes from the file you are trying to upload.
       *
       * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
       * maximum of 8 GB.
       *
       * It is possible to add multiple Parts in parallel. You can decide the intended
       * order of the Parts when you
       * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
       */
      create(uploadID, body, options) {
        return this._client.post(path4`/uploads/${uploadID}/parts`, multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
    };
  }
});

// node_modules/openai/resources/uploads/uploads.mjs
var Uploads;
var init_uploads3 = __esm({
  "node_modules/openai/resources/uploads/uploads.mjs"() {
    "use strict";
    init_resource();
    init_parts();
    init_parts();
    init_path();
    Uploads = class extends APIResource {
      constructor() {
        super(...arguments);
        this.parts = new Parts(this._client);
      }
      /**
       * Creates an intermediate
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
       * that you can add
       * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
       * Currently, an Upload can accept at most 8 GB in total and expires after an hour
       * after you create it.
       *
       * Once you complete the Upload, we will create a
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * contains all the parts you uploaded. This File is usable in the rest of our
       * platform as a regular File object.
       *
       * For certain `purpose` values, the correct `mime_type` must be specified. Please
       * refer to documentation for the
       * [supported MIME types for your use case](https://platform.openai.com/docs/assistants/tools/file-search#supported-files).
       *
       * For guidance on the proper filename extensions for each purpose, please follow
       * the documentation on
       * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
       *
       * Returns the Upload object with status `pending`.
       */
      create(body, options) {
        return this._client.post("/uploads", { body, ...options, __security: { bearerAuth: true } });
      }
      /**
       * Cancels the Upload. No Parts may be added after an Upload is cancelled.
       *
       * Returns the Upload object with status `cancelled`.
       */
      cancel(uploadID, options) {
        return this._client.post(path4`/uploads/${uploadID}/cancel`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Completes the
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
       *
       * Within the returned Upload object, there is a nested
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * is ready to use in the rest of the platform.
       *
       * You can specify the order of the Parts by passing in an ordered list of the Part
       * IDs.
       *
       * The number of bytes uploaded upon completion must match the number of bytes
       * initially specified when creating the Upload object. No Parts may be added after
       * an Upload is completed. Returns the Upload object with status `completed`,
       * including an additional `file` property containing the created usable File
       * object.
       */
      complete(uploadID, body, options) {
        return this._client.post(path4`/uploads/${uploadID}/complete`, {
          body,
          ...options,
          __security: { bearerAuth: true }
        });
      }
    };
    Uploads.Parts = Parts;
  }
});

// node_modules/openai/lib/Util.mjs
var allSettledWithThrow;
var init_Util = __esm({
  "node_modules/openai/lib/Util.mjs"() {
    "use strict";
    allSettledWithThrow = async (promises) => {
      const results = await Promise.allSettled(promises);
      const rejected = results.filter((result) => result.status === "rejected");
      if (rejected.length) {
        for (const result of rejected) {
          console.error(result.reason);
        }
        throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
      }
      const values = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          values.push(result.value);
        }
      }
      return values;
    };
  }
});

// node_modules/openai/resources/vector-stores/file-batches.mjs
var FileBatches;
var init_file_batches = __esm({
  "node_modules/openai/resources/vector-stores/file-batches.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_sleep();
    init_Util();
    init_path();
    FileBatches = class extends APIResource {
      /**
       * Create a vector store file batch.
       */
      create(vectorStoreID, body, options) {
        return this._client.post(path4`/vector_stores/${vectorStoreID}/file_batches`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves a vector store file batch.
       */
      retrieve(batchID, params, options) {
        const { vector_store_id } = params;
        return this._client.get(path4`/vector_stores/${vector_store_id}/file_batches/${batchID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Cancel a vector store file batch. This attempts to cancel the processing of
       * files in this batch as soon as possible.
       */
      cancel(batchID, params, options) {
        const { vector_store_id } = params;
        return this._client.post(path4`/vector_stores/${vector_store_id}/file_batches/${batchID}/cancel`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Create a vector store batch and poll until all files have been processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const batch = await this.create(vectorStoreId, body);
        return await this.poll(vectorStoreId, batch.id, options);
      }
      /**
       * Returns a list of vector store files in a batch.
       */
      listFiles(batchID, params, options) {
        const { vector_store_id, ...query } = params;
        return this._client.getAPIList(path4`/vector_stores/${vector_store_id}/file_batches/${batchID}/files`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Wait for the given file batch to be processed.
       *
       * Note: this will return even if one of the files failed to process, you need to
       * check batch.file_counts.failed_count to handle this case.
       */
      async poll(vectorStoreID, batchID, options) {
        const headers = buildHeaders([
          options?.headers,
          {
            "X-Stainless-Poll-Helper": "true",
            "X-Stainless-Custom-Poll-Interval": options?.pollIntervalMs?.toString() ?? void 0
          }
        ]);
        while (true) {
          const { data: batch, response } = await this.retrieve(batchID, { vector_store_id: vectorStoreID }, {
            ...options,
            headers
          }).withResponse();
          switch (batch.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            case "failed":
            case "cancelled":
            case "completed":
              return batch;
          }
        }
      }
      /**
       * Uploads the given files concurrently and then creates a vector store file batch.
       *
       * The concurrency limit is configurable using the `maxConcurrency` parameter.
       */
      async uploadAndPoll(vectorStoreId, { files, fileIds = [] }, options) {
        if (files == null || files.length == 0) {
          throw new Error(`No \`files\` provided to process. If you've already uploaded files you should use \`.createAndPoll()\` instead`);
        }
        const configuredConcurrency = options?.maxConcurrency ?? 5;
        const concurrencyLimit = Math.min(configuredConcurrency, files.length);
        const client = this._client;
        const fileIterator = files.values();
        const allFileIds = [...fileIds];
        async function processFiles(iterator) {
          for (let item of iterator) {
            const fileObj = await client.files.create({ file: item, purpose: "assistants" }, options);
            allFileIds.push(fileObj.id);
          }
        }
        const workers = Array(concurrencyLimit).fill(fileIterator).map(processFiles);
        await allSettledWithThrow(workers);
        return await this.createAndPoll(vectorStoreId, {
          file_ids: allFileIds
        });
      }
    };
  }
});

// node_modules/openai/resources/vector-stores/files.mjs
var Files3;
var init_files3 = __esm({
  "node_modules/openai/resources/vector-stores/files.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_utils2();
    init_path();
    Files3 = class extends APIResource {
      /**
       * Create a vector store file by attaching a
       * [File](https://platform.openai.com/docs/api-reference/files) to a
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
       */
      create(vectorStoreID, body, options) {
        return this._client.post(path4`/vector_stores/${vectorStoreID}/files`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves a vector store file.
       */
      retrieve(fileID, params, options) {
        const { vector_store_id } = params;
        return this._client.get(path4`/vector_stores/${vector_store_id}/files/${fileID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Update attributes on a vector store file.
       */
      update(fileID, params, options) {
        const { vector_store_id, ...body } = params;
        return this._client.post(path4`/vector_stores/${vector_store_id}/files/${fileID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of vector store files.
       */
      list(vectorStoreID, query = {}, options) {
        return this._client.getAPIList(path4`/vector_stores/${vectorStoreID}/files`, CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a vector store file. This will remove the file from the vector store but
       * the file itself will not be deleted. To delete the file, use the
       * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
       * endpoint.
       */
      delete(fileID, params, options) {
        const { vector_store_id } = params;
        return this._client.delete(path4`/vector_stores/${vector_store_id}/files/${fileID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Attach a file to the given vector store and wait for it to be processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const file = await this.create(vectorStoreId, body, options);
        return await this.poll(vectorStoreId, file.id, options);
      }
      /**
       * Wait for the vector store file to finish processing.
       *
       * Note: this will return even if the file failed to process, you need to check
       * file.last_error and file.status to handle these cases
       */
      async poll(vectorStoreID, fileID, options) {
        const headers = buildHeaders([
          options?.headers,
          {
            "X-Stainless-Poll-Helper": "true",
            "X-Stainless-Custom-Poll-Interval": options?.pollIntervalMs?.toString() ?? void 0
          }
        ]);
        while (true) {
          const fileResponse = await this.retrieve(fileID, {
            vector_store_id: vectorStoreID
          }, { ...options, headers }).withResponse();
          const file = fileResponse.data;
          switch (file.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = fileResponse.response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            case "failed":
            case "completed":
              return file;
          }
        }
      }
      /**
       * Upload a file to the `files` API and then attach it to the given vector store.
       *
       * Note the file will be asynchronously processed (you can use the alternative
       * polling helper method to wait for processing to complete).
       */
      async upload(vectorStoreId, file, options) {
        const fileInfo = await this._client.files.create({ file, purpose: "assistants" }, options);
        return this.create(vectorStoreId, { file_id: fileInfo.id }, options);
      }
      /**
       * Add a file to a vector store and poll until processing is complete.
       */
      async uploadAndPoll(vectorStoreId, file, options) {
        const fileInfo = await this.upload(vectorStoreId, file, options);
        return await this.poll(vectorStoreId, fileInfo.id, options);
      }
      /**
       * Retrieve the parsed contents of a vector store file.
       */
      content(fileID, params, options) {
        const { vector_store_id } = params;
        return this._client.getAPIList(path4`/vector_stores/${vector_store_id}/files/${fileID}/content`, Page, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
  }
});

// node_modules/openai/resources/vector-stores/vector-stores.mjs
var VectorStores;
var init_vector_stores = __esm({
  "node_modules/openai/resources/vector-stores/vector-stores.mjs"() {
    "use strict";
    init_resource();
    init_file_batches();
    init_file_batches();
    init_files3();
    init_files3();
    init_pagination();
    init_headers();
    init_path();
    VectorStores = class extends APIResource {
      constructor() {
        super(...arguments);
        this.files = new Files3(this._client);
        this.fileBatches = new FileBatches(this._client);
      }
      /**
       * Create a vector store.
       */
      create(body, options) {
        return this._client.post("/vector_stores", {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Retrieves a vector store.
       */
      retrieve(vectorStoreID, options) {
        return this._client.get(path4`/vector_stores/${vectorStoreID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Modifies a vector store.
       */
      update(vectorStoreID, body, options) {
        return this._client.post(path4`/vector_stores/${vectorStoreID}`, {
          body,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Returns a list of vector stores.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/vector_stores", CursorPage, {
          query,
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Delete a vector store.
       */
      delete(vectorStoreID, options) {
        return this._client.delete(path4`/vector_stores/${vectorStoreID}`, {
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
      /**
       * Search a vector store for relevant chunks based on a query and file attributes
       * filter.
       */
      search(vectorStoreID, body, options) {
        return this._client.getAPIList(path4`/vector_stores/${vectorStoreID}/search`, Page, {
          body,
          method: "post",
          ...options,
          headers: buildHeaders([{ "OpenAI-Beta": "assistants=v2" }, options?.headers]),
          __security: { bearerAuth: true }
        });
      }
    };
    VectorStores.Files = Files3;
    VectorStores.FileBatches = FileBatches;
  }
});

// node_modules/openai/resources/videos.mjs
var Videos;
var init_videos = __esm({
  "node_modules/openai/resources/videos.mjs"() {
    "use strict";
    init_resource();
    init_pagination();
    init_headers();
    init_uploads();
    init_path();
    Videos = class extends APIResource {
      /**
       * Create a new video generation job from a prompt and optional reference assets.
       */
      create(body, options) {
        return this._client.post("/videos", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Fetch the latest metadata for a generated video.
       */
      retrieve(videoID, options) {
        return this._client.get(path4`/videos/${videoID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * List recently generated videos for the current project.
       */
      list(query = {}, options) {
        return this._client.getAPIList("/videos", ConversationCursorPage, {
          query,
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Permanently delete a completed or failed video and its stored assets.
       */
      delete(videoID, options) {
        return this._client.delete(path4`/videos/${videoID}`, { ...options, __security: { bearerAuth: true } });
      }
      /**
       * Create a character from an uploaded video.
       */
      createCharacter(body, options) {
        return this._client.post("/videos/characters", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Download the generated video bytes or a derived preview asset.
       *
       * Streams the rendered video content for the specified video job.
       */
      downloadContent(videoID, query = {}, options) {
        return this._client.get(path4`/videos/${videoID}/content`, {
          query,
          ...options,
          headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
          __security: { bearerAuth: true },
          __binaryResponse: true
        });
      }
      /**
       * Create a new video generation job by editing a source video or existing
       * generated video.
       */
      edit(body, options) {
        return this._client.post("/videos/edits", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Create an extension of a completed video.
       */
      extend(body, options) {
        return this._client.post("/videos/extensions", multipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
      /**
       * Fetch a character.
       */
      getCharacter(characterID, options) {
        return this._client.get(path4`/videos/characters/${characterID}`, {
          ...options,
          __security: { bearerAuth: true }
        });
      }
      /**
       * Create a remix of a completed video using a refreshed prompt.
       */
      remix(videoID, body, options) {
        return this._client.post(path4`/videos/${videoID}/remix`, maybeMultipartFormRequestOptions({ body, ...options, __security: { bearerAuth: true } }, this._client));
      }
    };
  }
});

// node_modules/openai/resources/webhooks/webhooks.mjs
var _Webhooks_instances, _Webhooks_validateSecret, _Webhooks_getRequiredHeader, Webhooks;
var init_webhooks = __esm({
  "node_modules/openai/resources/webhooks/webhooks.mjs"() {
    "use strict";
    init_tslib();
    init_error2();
    init_resource();
    init_headers();
    Webhooks = class extends APIResource {
      constructor() {
        super(...arguments);
        _Webhooks_instances.add(this);
      }
      /**
       * Validates that the given payload was sent by OpenAI and parses the payload.
       */
      async unwrap(payload, headers, secret = this._client.webhookSecret, tolerance = 300) {
        await this.verifySignature(payload, headers, secret, tolerance);
        return JSON.parse(payload);
      }
      /**
       * Validates whether or not the webhook payload was sent by OpenAI.
       *
       * An error will be raised if the webhook payload was not sent by OpenAI.
       *
       * @param payload - The webhook payload
       * @param headers - The webhook headers
       * @param secret - The webhook secret (optional, will use client secret if not provided)
       * @param tolerance - Maximum age of the webhook in seconds (default: 300 = 5 minutes)
       */
      async verifySignature(payload, headers, secret = this._client.webhookSecret, tolerance = 300) {
        if (typeof crypto === "undefined" || typeof crypto.subtle.importKey !== "function" || typeof crypto.subtle.verify !== "function") {
          throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
        }
        __classPrivateFieldGet(this, _Webhooks_instances, "m", _Webhooks_validateSecret).call(this, secret);
        const headersObj = buildHeaders([headers]).values;
        const signatureHeader = __classPrivateFieldGet(this, _Webhooks_instances, "m", _Webhooks_getRequiredHeader).call(this, headersObj, "webhook-signature");
        const timestamp = __classPrivateFieldGet(this, _Webhooks_instances, "m", _Webhooks_getRequiredHeader).call(this, headersObj, "webhook-timestamp");
        const webhookId = __classPrivateFieldGet(this, _Webhooks_instances, "m", _Webhooks_getRequiredHeader).call(this, headersObj, "webhook-id");
        const timestampSeconds = parseInt(timestamp, 10);
        if (isNaN(timestampSeconds)) {
          throw new InvalidWebhookSignatureError("Invalid webhook timestamp format");
        }
        const nowSeconds = Math.floor(Date.now() / 1e3);
        if (nowSeconds - timestampSeconds > tolerance) {
          throw new InvalidWebhookSignatureError("Webhook timestamp is too old");
        }
        if (timestampSeconds > nowSeconds + tolerance) {
          throw new InvalidWebhookSignatureError("Webhook timestamp is too new");
        }
        const signatures = signatureHeader.split(" ").map((part) => part.startsWith("v1,") ? part.substring(3) : part);
        const decodedSecret = secret.startsWith("whsec_") ? Buffer.from(secret.replace("whsec_", ""), "base64") : Buffer.from(secret, "utf-8");
        const signedPayload = webhookId ? `${webhookId}.${timestamp}.${payload}` : `${timestamp}.${payload}`;
        const key = await crypto.subtle.importKey("raw", decodedSecret, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
        for (const signature of signatures) {
          try {
            const signatureBytes = Buffer.from(signature, "base64");
            const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(signedPayload));
            if (isValid) {
              return;
            }
          } catch {
            continue;
          }
        }
        throw new InvalidWebhookSignatureError("The given webhook signature does not match the expected signature");
      }
    };
    _Webhooks_instances = /* @__PURE__ */ new WeakSet(), _Webhooks_validateSecret = function _Webhooks_validateSecret2(secret) {
      if (typeof secret !== "string" || secret.length === 0) {
        throw new Error(`The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function`);
      }
    }, _Webhooks_getRequiredHeader = function _Webhooks_getRequiredHeader2(headers, name) {
      if (!headers) {
        throw new Error(`Headers are required`);
      }
      const value = headers.get(name);
      if (value === null || value === void 0) {
        throw new Error(`Missing required header: ${name}`);
      }
      return value;
    };
  }
});

// node_modules/openai/resources/webhooks/index.mjs
var init_webhooks2 = __esm({
  "node_modules/openai/resources/webhooks/index.mjs"() {
    "use strict";
    init_webhooks();
  }
});

// node_modules/openai/resources/webhooks.mjs
var init_webhooks3 = __esm({
  "node_modules/openai/resources/webhooks.mjs"() {
    "use strict";
    init_webhooks2();
  }
});

// node_modules/openai/resources/index.mjs
var init_resources = __esm({
  "node_modules/openai/resources/index.mjs"() {
    "use strict";
    init_chat2();
    init_shared();
    init_admin();
    init_audio();
    init_batches();
    init_beta();
    init_completions3();
    init_containers();
    init_conversations();
    init_embeddings();
    init_evals();
    init_files2();
    init_fine_tuning();
    init_graders2();
    init_images();
    init_models();
    init_moderations();
    init_realtime2();
    init_responses2();
    init_skills();
    init_uploads3();
    init_vector_stores();
    init_videos();
    init_webhooks3();
  }
});

// node_modules/openai/internal/provider.mjs
function configureProvider(provider) {
  const definition = providerDefinitions.get(provider);
  if (!definition) {
    throw new Error("Invalid provider. Providers must be created with createProvider().");
  }
  return definition.configure();
}
var providerDefinitionsKey, providerGlobal, existingProviderDefinitions, providerDefinitions;
var init_provider = __esm({
  "node_modules/openai/internal/provider.mjs"() {
    "use strict";
    providerDefinitionsKey = /* @__PURE__ */ Symbol.for("openai.node.providerDefinitions.v1");
    providerGlobal = globalThis;
    existingProviderDefinitions = providerGlobal[providerDefinitionsKey];
    providerDefinitions = existingProviderDefinitions ?? /* @__PURE__ */ new WeakMap();
    if (!existingProviderDefinitions) {
      Object.defineProperty(providerGlobal, providerDefinitionsKey, { value: providerDefinitions });
    }
  }
});

// node_modules/openai/client.mjs
function getConnectionErrorMessage(error) {
  if (isUndiciDispatcherVersionMismatchError(error)) {
    return `Connection error. This may be caused by passing an undici dispatcher, such as ProxyAgent, that is incompatible with the fetch implementation. If you are using undici's ProxyAgent, pass the fetch implementation from the same undici package: import { fetch, ProxyAgent } from 'undici'; new OpenAI({ fetch, fetchOptions: { dispatcher: new ProxyAgent(...) } });`;
  }
  return void 0;
}
function isUndiciDispatcherVersionMismatchError(error) {
  let current = error;
  for (let i = 0; i < 8 && current && typeof current === "object"; i++) {
    const err = current;
    if (err.code === "UND_ERR_INVALID_ARG" && typeof err.message === "string" && err.message.includes("invalid onRequestStart method")) {
      return true;
    }
    current = err.cause;
  }
  return false;
}
var _OpenAI_instances, _a2, _OpenAI_encoder, _OpenAI_baseURLOverridden, WORKLOAD_IDENTITY_API_KEY_PLACEHOLDER, OpenAI;
var init_client = __esm({
  "node_modules/openai/client.mjs"() {
    "use strict";
    init_tslib();
    init_uuid();
    init_values();
    init_sleep();
    init_errors();
    init_detect_platform();
    init_shims();
    init_request_options();
    init_query();
    init_version();
    init_error();
    init_pagination();
    init_workload_identity_auth();
    init_error();
    init_uploads2();
    init_resources();
    init_api_promise();
    init_batches();
    init_completions3();
    init_embeddings();
    init_files2();
    init_images();
    init_models();
    init_moderations();
    init_videos();
    init_admin();
    init_audio();
    init_beta();
    init_chat();
    init_containers();
    init_conversations();
    init_evals();
    init_fine_tuning();
    init_graders2();
    init_realtime2();
    init_responses2();
    init_skills();
    init_uploads3();
    init_vector_stores();
    init_webhooks();
    init_detect_platform();
    init_headers();
    init_provider();
    init_env();
    init_log();
    init_values();
    WORKLOAD_IDENTITY_API_KEY_PLACEHOLDER = "workload-identity-auth";
    OpenAI = class {
      /**
       * API Client for interfacing with the OpenAI API.
       *
       * @param {string | null | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? null]
       * @param {string | null | undefined} [opts.adminAPIKey=process.env['OPENAI_ADMIN_KEY'] ?? null]
       * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
       * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
       * @param {string | null | undefined} [opts.webhookSecret=process.env['OPENAI_WEBHOOK_SECRET'] ?? null]
       * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
       * @param {Provider} [opts.provider] - Configure a third-party API provider. Mutually exclusive with top-level authentication and base URL options.
       * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
       * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
       * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
       * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
       * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
       * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
       * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
       */
      constructor(clientOptions = {}) {
        _OpenAI_instances.add(this);
        _OpenAI_encoder.set(this, void 0);
        this.completions = new Completions2(this);
        this.chat = new Chat(this);
        this.embeddings = new Embeddings(this);
        this.files = new Files2(this);
        this.images = new Images(this);
        this.audio = new Audio(this);
        this.moderations = new Moderations(this);
        this.models = new Models(this);
        this.fineTuning = new FineTuning(this);
        this.graders = new Graders2(this);
        this.vectorStores = new VectorStores(this);
        this.webhooks = new Webhooks(this);
        this.beta = new Beta(this);
        this.batches = new Batches(this);
        this.uploads = new Uploads(this);
        this.admin = new Admin(this);
        this.responses = new Responses2(this);
        this.realtime = new Realtime2(this);
        this.conversations = new Conversations(this);
        this.evals = new Evals(this);
        this.containers = new Containers(this);
        this.skills = new Skills(this);
        this.videos = new Videos(this);
        const provider = clientOptions.provider;
        if (provider) {
          const conflictingOptions = ["apiKey", "adminAPIKey", "workloadIdentity", "baseURL"].filter((key) => clientOptions[key] != null);
          if (conflictingOptions.length) {
            throw new OpenAIError(`The \`provider\` option cannot be used with ${conflictingOptions.map((key) => `\`${key}\``).join(", ")}. Configure authentication and the base URL through the provider instead.`);
          }
        }
        const { baseURL = provider ? null : readEnv("OPENAI_BASE_URL"), apiKey = provider ? null : readEnv("OPENAI_API_KEY") ?? null, adminAPIKey = provider ? null : readEnv("OPENAI_ADMIN_KEY") ?? null, organization = provider ? null : readEnv("OPENAI_ORG_ID") ?? null, project = provider ? null : readEnv("OPENAI_PROJECT_ID") ?? null, webhookSecret = readEnv("OPENAI_WEBHOOK_SECRET") ?? null, workloadIdentity, ...opts } = clientOptions;
        const providerRuntime = provider ? configureProvider(provider) : void 0;
        const options = {
          apiKey,
          adminAPIKey,
          organization,
          project,
          webhookSecret,
          workloadIdentity,
          provider,
          ...opts,
          baseURL: providerRuntime?.baseURL ?? (baseURL || `https://api.openai.com/v1`)
        };
        if (apiKey && workloadIdentity) {
          throw new OpenAIError("The `apiKey` and `workloadIdentity` options are mutually exclusive");
        }
        if (!providerRuntime && !apiKey && !adminAPIKey && !workloadIdentity) {
          throw new OpenAIError("Missing credentials. Please pass an `apiKey`, `workloadIdentity`, `adminAPIKey`, or set the `OPENAI_API_KEY` or `OPENAI_ADMIN_KEY` environment variable.");
        }
        if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
          throw new OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
        }
        this.baseURL = options.baseURL;
        this.timeout = options.timeout ?? _a2.DEFAULT_TIMEOUT;
        this.logger = options.logger ?? console;
        const defaultLogLevel = "warn";
        this.logLevel = defaultLogLevel;
        this.logLevel = parseLogLevel(options.logLevel, "ClientOptions.logLevel", this) ?? parseLogLevel(readEnv("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ?? defaultLogLevel;
        this.fetchOptions = options.fetchOptions;
        this.maxRetries = options.maxRetries ?? 2;
        this.fetch = options.fetch ?? getDefaultFetch();
        __classPrivateFieldSet(this, _OpenAI_encoder, FallbackEncoder, "f");
        const customHeadersEnv = provider ? void 0 : readEnv("OPENAI_CUSTOM_HEADERS");
        if (customHeadersEnv) {
          const parsed = {};
          for (const line of customHeadersEnv.split("\n")) {
            const colon = line.indexOf(":");
            if (colon >= 0) {
              parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
            }
          }
          options.defaultHeaders = buildHeaders([parsed, options.defaultHeaders]);
        }
        this._options = options;
        this._provider = providerRuntime;
        if (workloadIdentity) {
          this._workloadIdentityAuth = new WorkloadIdentityAuth(workloadIdentity, this.fetch);
        }
        this.apiKey = typeof apiKey === "string" ? apiKey : null;
        this.adminAPIKey = adminAPIKey;
        this.organization = organization;
        this.project = project;
        this.webhookSecret = webhookSecret;
      }
      /**
       * Create a new client instance re-using the same options given to the current client with optional overriding.
       */
      withOptions(options) {
        const inheritedProvider = this._options.provider;
        const provider = options.provider ?? inheritedProvider;
        const inheritedOptions = {
          ...this._options,
          baseURL: this.baseURL,
          maxRetries: this.maxRetries,
          timeout: this.timeout,
          logger: this.logger,
          logLevel: this.logLevel,
          fetch: this.fetch,
          fetchOptions: this.fetchOptions,
          apiKey: this._options.apiKey,
          adminAPIKey: this.adminAPIKey,
          workloadIdentity: this._options.workloadIdentity,
          organization: this.organization,
          project: this.project,
          webhookSecret: this.webhookSecret
        };
        if (provider) {
          delete inheritedOptions.apiKey;
          delete inheritedOptions.adminAPIKey;
          delete inheritedOptions.workloadIdentity;
          delete inheritedOptions.baseURL;
          if (provider !== inheritedProvider) {
            delete inheritedOptions.organization;
            delete inheritedOptions.project;
            delete inheritedOptions.defaultHeaders;
          }
        }
        const client = new this.constructor({
          ...inheritedOptions,
          ...options,
          provider
        });
        return client;
      }
      defaultQuery() {
        return this._options.defaultQuery;
      }
      validateHeaders({ values, nulls }, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
      }) {
        if (values.get("authorization") || values.get("api-key")) {
          return;
        }
        if (nulls.has("authorization") || nulls.has("api-key")) {
          return;
        }
        if (this._workloadIdentityAuth && schemes.bearerAuth) {
          return;
        }
        throw new Error('Could not resolve authentication method. Expected either apiKey or adminAPIKey to be set. Or for one of the "Authorization" or "api-key" headers to be explicitly omitted');
      }
      async authHeaders(opts, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
      }) {
        return buildHeaders([
          schemes.bearerAuth ? await this.bearerAuth(opts) : null,
          schemes.adminAPIKeyAuth ? await this.adminAPIKeyAuth(opts) : null
        ]);
      }
      async bearerAuth(opts) {
        if (this._workloadIdentityAuth) {
          return buildHeaders([{ Authorization: `Bearer ${await this._workloadIdentityAuth.getToken()}` }]);
        }
        if (this.apiKey == null) {
          return void 0;
        }
        return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
      }
      async adminAPIKeyAuth(opts) {
        if (this.adminAPIKey == null) {
          return void 0;
        }
        return buildHeaders([{ Authorization: `Bearer ${this.adminAPIKey}` }]);
      }
      stringifyQuery(query) {
        return stringifyQuery(query);
      }
      getUserAgent() {
        return `${this.constructor.name}/JS ${VERSION}`;
      }
      defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
      }
      makeStatusError(status, error, message, headers) {
        return APIError.generate(status, error, message, headers);
      }
      async _callApiKey() {
        if (this._provider)
          return false;
        const apiKey = this._options.apiKey;
        if (typeof apiKey !== "function")
          return false;
        let token;
        try {
          token = await apiKey();
        } catch (err) {
          if (err instanceof OpenAIError)
            throw err;
          throw new OpenAIError(
            `Failed to get token from 'apiKey' function: ${err.message}`,
            // @ts-ignore
            { cause: err }
          );
        }
        if (typeof token !== "string" || !token) {
          throw new OpenAIError(`Expected 'apiKey' function argument to return a string but it returned ${token}`);
        }
        this.apiKey = token;
        return true;
      }
      buildURL(path7, query, defaultBaseURL) {
        const baseURL = !__classPrivateFieldGet(this, _OpenAI_instances, "m", _OpenAI_baseURLOverridden).call(this) && defaultBaseURL || this.baseURL;
        const url = isAbsoluteURL(path7) ? new URL(path7) : new URL(baseURL + (baseURL.endsWith("/") && path7.startsWith("/") ? path7.slice(1) : path7));
        const defaultQuery = this.defaultQuery();
        const pathQuery = Object.fromEntries(url.searchParams);
        if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
          query = { ...pathQuery, ...defaultQuery, ...query };
        }
        if (typeof query === "object" && query && !Array.isArray(query)) {
          url.search = this.stringifyQuery(query);
        }
        return url.toString();
      }
      /**
       * Used as a callback for mutating the given `FinalRequestOptions` object.
       */
      async prepareOptions(options) {
        if (this._provider)
          return;
        const security = options.__security ?? { bearerAuth: true };
        if (security.bearerAuth) {
          await this._callApiKey();
        }
      }
      /**
       * Used as a callback for mutating the given `RequestInit` object.
       *
       * This is useful for cases where you want to add certain headers based off of
       * the request properties, e.g. `method` or `url`.
       */
      async prepareRequest(request, { url, options }) {
      }
      get(path7, opts) {
        return this.methodRequest("get", path7, opts);
      }
      post(path7, opts) {
        return this.methodRequest("post", path7, opts);
      }
      patch(path7, opts) {
        return this.methodRequest("patch", path7, opts);
      }
      put(path7, opts) {
        return this.methodRequest("put", path7, opts);
      }
      delete(path7, opts) {
        return this.methodRequest("delete", path7, opts);
      }
      methodRequest(method, path7, opts) {
        return this.request(Promise.resolve(opts).then((opts2) => {
          return { method, path: path7, ...opts2 };
        }));
      }
      request(options, remainingRetries = null) {
        return new APIPromise(this, this.makeRequest(options, remainingRetries, void 0));
      }
      async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
        const options = await optionsInput;
        const maxRetries = options.maxRetries ?? this.maxRetries;
        if (retriesRemaining == null) {
          retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = await this.buildRequest(options, {
          retryCount: maxRetries - retriesRemaining
        });
        const hasStreamingBody = options.__metadata?.["hasStreamingBody"] === true;
        await this.prepareRequest(req, { url, options });
        await this._provider?.prepareRequest?.(req, { url, options });
        const requestLogID = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0");
        const retryLogStr = retryOfRequestLogID === void 0 ? "" : `, retryOf: ${retryOfRequestLogID}`;
        const startTime = Date.now();
        loggerFor(this).debug(`[${requestLogID}] sending request`, formatRequestDetails({
          retryOfRequestLogID,
          method: options.method,
          url,
          options,
          headers: req.headers
        }));
        if (options.signal?.aborted) {
          throw new APIUserAbortError();
        }
        const security = options.__security ?? { bearerAuth: true };
        const controller = new AbortController();
        const response = await this.fetchWithAuth(url, req, timeout, controller, security).catch(castToError);
        const headersTime = Date.now();
        if (response instanceof globalThis.Error) {
          const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
          if (options.signal?.aborted) {
            throw new APIUserAbortError();
          }
          const isTimeout = isAbortError(response) || /timed? ?out/i.test(String(response) + ("cause" in response ? String(response.cause) : ""));
          if (retriesRemaining && !hasStreamingBody) {
            loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - ${retryMessage}`);
            loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (${retryMessage})`, formatRequestDetails({
              retryOfRequestLogID,
              url,
              durationMs: headersTime - startTime,
              message: response.message
            }));
            return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
          }
          const terminalMessage = hasStreamingBody ? "error; streaming body cannot be retried" : "error; no more retries left";
          loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - ${terminalMessage}`);
          loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (${terminalMessage})`, formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message
          }));
          if (response instanceof OAuthError || response instanceof SubjectTokenProviderError) {
            throw response;
          }
          if (isTimeout) {
            throw new APIConnectionTimeoutError();
          }
          throw new APIConnectionError({
            message: getConnectionErrorMessage(response),
            cause: response
          });
        }
        const specialHeaders = [...response.headers.entries()].filter(([name]) => name === "x-request-id").map(([name, value]) => ", " + name + ": " + JSON.stringify(value)).join("");
        const responseInfo = `[${requestLogID}${retryLogStr}${specialHeaders}] ${req.method} ${url} ${response.ok ? "succeeded" : "failed"} with status ${response.status} in ${headersTime - startTime}ms`;
        if (!response.ok) {
          if (response.status === 401 && this._workloadIdentityAuth && security.bearerAuth && !options.__metadata?.["hasStreamingBody"] && !options.__metadata?.["workloadIdentityTokenRefreshed"]) {
            await CancelReadableStream(response.body);
            this._workloadIdentityAuth.invalidateToken();
            return this.makeRequest({
              ...options,
              __metadata: {
                ...options.__metadata,
                workloadIdentityTokenRefreshed: true
              }
            }, retriesRemaining, retryOfRequestLogID ?? requestLogID);
          }
          const shouldRetry = await this.shouldRetry(response);
          if (retriesRemaining && shouldRetry && !hasStreamingBody) {
            const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
            await CancelReadableStream(response.body);
            loggerFor(this).info(`${responseInfo} - ${retryMessage2}`);
            loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage2})`, formatRequestDetails({
              retryOfRequestLogID,
              url: response.url,
              status: response.status,
              headers: response.headers,
              durationMs: headersTime - startTime
            }));
            return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID, response.headers);
          }
          const retryMessage = shouldRetry ? hasStreamingBody ? `error; streaming body cannot be retried` : `error; no more retries left` : `error; not retryable`;
          loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
          const errText = await response.text().catch((err2) => castToError(err2).message);
          const errJSON = safeJSON(errText);
          const errMessage = errJSON ? void 0 : errText;
          loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage})`, formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            message: errMessage,
            durationMs: Date.now() - startTime
          }));
          const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
          throw err;
        }
        loggerFor(this).info(responseInfo);
        loggerFor(this).debug(`[${requestLogID}] response start`, formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          durationMs: headersTime - startTime
        }));
        return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
      }
      getAPIList(path7, Page2, opts) {
        return this.requestAPIList(Page2, opts && "then" in opts ? opts.then((opts2) => ({ method: "get", path: path7, ...opts2 })) : { method: "get", path: path7, ...opts });
      }
      requestAPIList(Page2, options) {
        const request = this.makeRequest(options, null, void 0);
        return new PagePromise(this, request, Page2);
      }
      async fetchWithAuth(url, init, timeout, controller, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
      }) {
        if (this._workloadIdentityAuth && schemes.bearerAuth) {
          const headers = init.headers;
          const authHeader = headers.get("Authorization");
          if (!authHeader || authHeader === `Bearer ${WORKLOAD_IDENTITY_API_KEY_PLACEHOLDER}`) {
            const token = await this._workloadIdentityAuth.getToken();
            headers.set("Authorization", `Bearer ${token}`);
          }
        }
        const response = await this.fetchWithTimeout(url, init, timeout, controller);
        return response;
      }
      async fetchWithTimeout(url, init, ms, controller) {
        const { signal, method, ...options } = init || {};
        const abort = this._makeAbort(controller);
        if (signal)
          signal.addEventListener("abort", abort, { once: true });
        const timeout = setTimeout(abort, ms);
        const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === "object" && options.body !== null && Symbol.asyncIterator in options.body;
        const fetchOptions = {
          signal: controller.signal,
          ...isReadableBody ? { duplex: "half" } : {},
          method: "GET",
          ...options
        };
        if (method) {
          fetchOptions.method = method.toUpperCase();
        }
        try {
          return await this.fetch.call(void 0, url, fetchOptions);
        } finally {
          clearTimeout(timeout);
        }
      }
      async shouldRetry(response) {
        const shouldRetryHeader = response.headers.get("x-should-retry");
        if (shouldRetryHeader === "true")
          return true;
        if (shouldRetryHeader === "false")
          return false;
        if (response.status === 408)
          return true;
        if (response.status === 409)
          return true;
        if (response.status === 429)
          return true;
        if (response.status >= 500)
          return true;
        return false;
      }
      async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
        let timeoutMillis;
        const retryAfterMillisHeader = responseHeaders?.get("retry-after-ms");
        if (retryAfterMillisHeader) {
          const timeoutMs = parseFloat(retryAfterMillisHeader);
          if (!Number.isNaN(timeoutMs)) {
            timeoutMillis = timeoutMs;
          }
        }
        const retryAfterHeader = responseHeaders?.get("retry-after");
        if (retryAfterHeader && !timeoutMillis) {
          const timeoutSeconds = parseFloat(retryAfterHeader);
          if (!Number.isNaN(timeoutSeconds)) {
            timeoutMillis = timeoutSeconds * 1e3;
          } else {
            timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
          }
        }
        if (timeoutMillis === void 0) {
          const maxRetries = options.maxRetries ?? this.maxRetries;
          timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await sleep(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1, requestLogID);
      }
      calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8;
        const numRetries = maxRetries - retriesRemaining;
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1e3;
      }
      async buildRequest(inputOptions, { retryCount = 0 } = {}) {
        const options = { ...inputOptions };
        const { method, path: path7, query, defaultBaseURL } = options;
        const url = this.buildURL(path7, query, defaultBaseURL);
        if ("timeout" in options)
          validatePositiveInteger("timeout", options.timeout);
        options.timeout = options.timeout ?? this.timeout;
        const { bodyHeaders, body, isStreamingBody } = this.buildBody({ options });
        if (isStreamingBody) {
          inputOptions.__metadata = {
            ...inputOptions.__metadata,
            hasStreamingBody: true
          };
        }
        const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });
        const req = {
          method,
          headers: reqHeaders,
          ...options.signal && { signal: options.signal },
          ...globalThis.ReadableStream && body instanceof globalThis.ReadableStream && { duplex: "half" },
          ...body && { body },
          ...this.fetchOptions ?? {},
          ...options.fetchOptions ?? {}
        };
        return { req, url, timeout: options.timeout };
      }
      async buildHeaders({ options, method, bodyHeaders, retryCount }) {
        let idempotencyHeaders = {};
        if (this.idempotencyHeader && method !== "get") {
          if (!options.idempotencyKey)
            options.idempotencyKey = this.defaultIdempotencyKey();
          idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
        }
        const headers = buildHeaders([
          idempotencyHeaders,
          {
            Accept: "application/json",
            "User-Agent": this.getUserAgent(),
            "X-Stainless-Retry-Count": String(retryCount),
            ...options.timeout ? { "X-Stainless-Timeout": String(Math.trunc(options.timeout / 1e3)) } : {},
            ...getPlatformHeaders(),
            "OpenAI-Organization": this.organization,
            "OpenAI-Project": this.project
          },
          this._provider ? void 0 : await this.authHeaders(options, options.__security ?? { bearerAuth: true }),
          this._options.defaultHeaders,
          bodyHeaders,
          options.headers
        ]);
        if (!this._provider) {
          this.validateHeaders(headers, options.__security ?? { bearerAuth: true });
        }
        return headers.values;
      }
      _makeAbort(controller) {
        return () => controller.abort();
      }
      buildBody({ options }) {
        const { body, headers: rawHeaders } = options;
        if (!body) {
          if (body === void 0 && "body" in options) {
            return { ...__classPrivateFieldGet(this, _OpenAI_encoder, "f").call(this, { body, headers: buildHeaders([rawHeaders]) }), isStreamingBody: false };
          }
          return { bodyHeaders: void 0, body: void 0, isStreamingBody: false };
        }
        const headers = buildHeaders([rawHeaders]);
        const isReadableStream2 = typeof globalThis.ReadableStream !== "undefined" && body instanceof globalThis.ReadableStream;
        const isRetryableBody = !isReadableStream2 && (typeof body === "string" || body instanceof ArrayBuffer || ArrayBuffer.isView(body) || typeof globalThis.Blob !== "undefined" && body instanceof globalThis.Blob || body instanceof URLSearchParams || body instanceof FormData);
        if (
          // Pass raw type verbatim
          ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === "string" && // Preserve legacy string encoding behavior for now
          headers.values.has("content-type") || // `Blob` is superset of `File`
          globalThis.Blob && body instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
          body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
          body instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
          isReadableStream2
        ) {
          return { bodyHeaders: void 0, body, isStreamingBody: !isRetryableBody };
        } else if (typeof body === "object" && (Symbol.asyncIterator in body || Symbol.iterator in body && "next" in body && typeof body.next === "function")) {
          return {
            bodyHeaders: void 0,
            body: ReadableStreamFrom(body),
            isStreamingBody: true
          };
        } else if (typeof body === "object" && headers.values.get("content-type") === "application/x-www-form-urlencoded") {
          return {
            bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
            body: this.stringifyQuery(body),
            isStreamingBody: false
          };
        } else {
          return { ...__classPrivateFieldGet(this, _OpenAI_encoder, "f").call(this, { body, headers }), isStreamingBody: false };
        }
      }
    };
    _a2 = OpenAI, _OpenAI_encoder = /* @__PURE__ */ new WeakMap(), _OpenAI_instances = /* @__PURE__ */ new WeakSet(), _OpenAI_baseURLOverridden = function _OpenAI_baseURLOverridden2() {
      return this._provider !== void 0 || this.baseURL !== "https://api.openai.com/v1";
    };
    OpenAI.OpenAI = _a2;
    OpenAI.DEFAULT_TIMEOUT = 6e5;
    OpenAI.OpenAIError = OpenAIError;
    OpenAI.APIError = APIError;
    OpenAI.APIConnectionError = APIConnectionError;
    OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
    OpenAI.APIUserAbortError = APIUserAbortError;
    OpenAI.NotFoundError = NotFoundError;
    OpenAI.ConflictError = ConflictError;
    OpenAI.RateLimitError = RateLimitError;
    OpenAI.BadRequestError = BadRequestError;
    OpenAI.AuthenticationError = AuthenticationError;
    OpenAI.InternalServerError = InternalServerError;
    OpenAI.PermissionDeniedError = PermissionDeniedError;
    OpenAI.UnprocessableEntityError = UnprocessableEntityError;
    OpenAI.InvalidWebhookSignatureError = InvalidWebhookSignatureError;
    OpenAI.toFile = toFile;
    OpenAI.toStreamingFile = toStreamingFile;
    OpenAI.Completions = Completions2;
    OpenAI.Chat = Chat;
    OpenAI.Embeddings = Embeddings;
    OpenAI.Files = Files2;
    OpenAI.Images = Images;
    OpenAI.Audio = Audio;
    OpenAI.Moderations = Moderations;
    OpenAI.Models = Models;
    OpenAI.FineTuning = FineTuning;
    OpenAI.Graders = Graders2;
    OpenAI.VectorStores = VectorStores;
    OpenAI.Webhooks = Webhooks;
    OpenAI.Beta = Beta;
    OpenAI.Batches = Batches;
    OpenAI.Uploads = Uploads;
    OpenAI.Admin = Admin;
    OpenAI.Responses = Responses2;
    OpenAI.Realtime = Realtime2;
    OpenAI.Conversations = Conversations;
    OpenAI.Evals = Evals;
    OpenAI.Containers = Containers;
    OpenAI.Skills = Skills;
    OpenAI.Videos = Videos;
  }
});

// node_modules/openai/azure.mjs
var init_azure = __esm({
  "node_modules/openai/azure.mjs"() {
    "use strict";
    init_headers();
    init_error2();
    init_utils2();
    init_client();
  }
});

// node_modules/openai/bedrock.mjs
var init_bedrock = __esm({
  "node_modules/openai/bedrock.mjs"() {
    "use strict";
    init_error2();
    init_client();
    init_headers();
    init_utils2();
    init_ResponsesParser();
    init_resources();
  }
});

// node_modules/openai/index.mjs
var init_openai = __esm({
  "node_modules/openai/index.mjs"() {
    "use strict";
    init_client();
    init_uploads2();
    init_api_promise();
    init_client();
    init_pagination();
    init_error();
    init_azure();
    init_bedrock();
  }
});

// src/llm/providers/openai-compat.ts
var OpenAICompatProvider;
var init_openai_compat = __esm({
  "src/llm/providers/openai-compat.ts"() {
    "use strict";
    init_openai();
    OpenAICompatProvider = class {
      id;
      name;
      client;
      modelId;
      constructor(id, name, baseURL, apiKey, modelId) {
        this.id = id;
        this.name = name;
        this.modelId = modelId;
        this.client = new OpenAI({
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
var init_provider2 = __esm({
  "src/llm/provider.ts"() {
    "use strict";
    init_openai_compat();
    init_schema();
  }
});

// src/utils/glob.ts
function minimatch(str2, pattern) {
  if (pattern === "*") return true;
  const regex = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "<<GLOBSTAR>>").replace(/\*/g, "[^/]*").replace(/<<GLOBSTAR>>/g, ".*").replace(/\?/g, "[^/]");
  return new RegExp(`^${regex}$`).test(str2);
}
var init_glob = __esm({
  "src/utils/glob.ts"() {
    "use strict";
  }
});

// src/tools/registry.ts
var fs4, path5, import_child_process, BaseTool, FileReadTool, FileWriteTool, FileEditTool, BashTool, GlobTool, GrepTool, WebFetchTool, QuestionTool, ToolRegistry;
var init_registry = __esm({
  "src/tools/registry.ts"() {
    "use strict";
    fs4 = __toESM(require("fs"));
    path5 = __toESM(require("path"));
    import_child_process = require("child_process");
    init_glob();
    init_source();
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
        const limit2 = args.limit || 2e3;
        try {
          if (!fs4.existsSync(filePath)) {
            return { output: "", error: `File not found: ${filePath}` };
          }
          const content = fs4.readFileSync(filePath, "utf-8");
          const lines = content.split("\n");
          const start = Math.max(0, offset - 1);
          const end = Math.min(lines.length, start + limit2);
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
          const dir = path5.dirname(filePath);
          if (!fs4.existsSync(dir)) {
            fs4.mkdirSync(dir, { recursive: true });
          }
          fs4.writeFileSync(filePath, content, "utf-8");
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
          if (!fs4.existsSync(filePath)) {
            return { output: "", error: `File not found: ${filePath}` };
          }
          let content = fs4.readFileSync(filePath, "utf-8");
          if (!content.includes(oldString)) {
            return { output: "", error: "old_string not found in file" };
          }
          if (replaceAll) {
            content = content.split(oldString).join(newString);
          } else {
            content = content.replace(oldString, newString);
          }
          fs4.writeFileSync(filePath, content, "utf-8");
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
        const readline2 = await import("readline");
        const rl = readline2.createInterface({ input: process.stdin, output: process.stdout });
        return new Promise((resolve) => {
          console.log(source_default.cyan(`
\u2753 ${question}`));
          if (options) {
            options.forEach((opt, i) => console.log(source_default.white(`  ${i + 1}. ${opt}`)));
          }
          rl.question(source_default.yellow("> "), (answer) => {
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
var fs5, path6, SessionManager;
var init_session = __esm({
  "src/core/session.ts"() {
    "use strict";
    fs5 = __toESM(require("fs"));
    path6 = __toESM(require("path"));
    init_paths();
    SessionManager = class {
      sessionsDir;
      constructor() {
        this.sessionsDir = path6.join(getDataDir(), "sessions");
        ensureDir(this.sessionsDir);
      }
      getSessionPath(id) {
        return path6.join(this.sessionsDir, `${id}.json`);
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
        fs5.writeFileSync(filePath, JSON.stringify(session, null, 2), "utf-8");
      }
      load(id) {
        const filePath = this.getSessionPath(id);
        if (!fs5.existsSync(filePath)) return null;
        try {
          const data = fs5.readFileSync(filePath, "utf-8");
          return JSON.parse(data);
        } catch {
          return null;
        }
      }
      list() {
        const files = fs5.readdirSync(this.sessionsDir).filter((f) => f.endsWith(".json"));
        return files.map((f) => {
          const data = fs5.readFileSync(path6.join(this.sessionsDir, f), "utf-8");
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
    init_provider2();
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
        xyzai: "dist/index.js"
      },
      files: [
        "dist",
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
      devDependencies: {
        "@types/node": "^26.1.1",
        chalk: "^5.6.2",
        commander: "^15.0.0",
        "highlight.js": "^11.11.1",
        marked: "^18.0.7",
        openai: "^6.48.0",
        tsup: "^8.5.1",
        typescript: "^7.0.2"
      }
    };
  }
});

// src/tui/app.ts
var app_exports = {};
__export(app_exports, {
  startTUI: () => startTUI
});
function startTUI(config) {
  const { loadConfig: loadConfig2 } = (init_schema(), __toCommonJS(schema_exports));
  const loadedConfig = config || loadConfig2();
  const agent = new Agent(loadedConfig);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: source_default.cyan("xyzai \u276F ")
  });
  console.log("");
  console.log(source_default.bold.cyan("\u{1F525} XYZAI - AI Coding Assistant"));
  console.log(source_default.gray("\u2500".repeat(40)));
  console.log(source_default.white(loadedConfig.language === "fa" ? "\u0633\u0644\u0627\u0645! \u0645\u0646 XYZAI \u0647\u0633\u062A\u0645. \u06CC\u06A9 \u067E\u06CC\u0627\u0645 \u062A\u0627\u06CC\u067E \u06A9\u0646\u06CC\u062F. /help \u0628\u0631\u0627\u06CC \u0631\u0627\u0647\u0646\u0645\u0627" : "Hello! I'm XYZAI. Type a message. /help for help"));
  console.log(source_default.gray("\u2500".repeat(40)));
  console.log("");
  rl.prompt();
  rl.on("line", async (input) => {
    const trimmed = input.trim();
    if (!trimmed) {
      rl.prompt();
      return;
    }
    if (trimmed.startsWith("/")) {
      handleCommand(trimmed, loadedConfig, agent, rl);
      return;
    }
    let output = "";
    const callbacks = {
      onThinking: () => {
        process.stdout.write(source_default.yellow("\u{1F914} Thinking...\r"));
      },
      onToken: (token) => {
        process.stdout.write(token);
      },
      onToolCall: (name, args) => {
        console.log(source_default.gray(`
  \u{1F527} ${name}`));
      },
      onToolResult: (name, result) => {
        if (result.error) {
          console.log(source_default.red(`  \u274C ${result.error}`));
        }
      },
      onPermission: async () => true,
      onDone: (response) => {
        console.log("");
        console.log("");
      },
      onError: (error) => {
        console.log(source_default.red(`
\u274C Error: ${error}`));
      }
    };
    await agent.chat(trimmed, callbacks);
    rl.prompt();
  });
  rl.on("close", () => {
    console.log(source_default.gray("\n" + (loadedConfig.language === "fa" ? "\u062E\u062F\u0627\u062D\u0627\u0641\u0638!" : "Goodbye!")));
    process.exit(0);
  });
}
function handleCommand(cmd, config, agent, rl) {
  const parts = cmd.split(" ");
  const command = parts[0].toLowerCase();
  switch (command) {
    case "/exit":
    case "/quit":
      console.log(source_default.gray(config.language === "fa" ? "\u062E\u062F\u0627\u062D\u0627\u0641\u0638!" : "Goodbye!"));
      process.exit(0);
    case "/help":
      console.log("");
      console.log(source_default.bold.cyan(config.language === "fa" ? "=== \u0631\u0627\u0647\u0646\u0645\u0627\u06CC XYZAI ===" : "=== XYZAI Help ==="));
      console.log("");
      console.log(source_default.white(config.language === "fa" ? "\u062F\u0633\u062A\u0648\u0631\u0627\u062A:" : "Commands:"));
      console.log(source_default.gray("  /help  - " + (config.language === "fa" ? "\u0646\u0645\u0627\u06CC\u0634 \u0631\u0627\u0647\u0646\u0645\u0627" : "Show help")));
      console.log(source_default.gray("  /model - " + (config.language === "fa" ? "\u062A\u063A\u06CC\u06CC\u0631 \u0645\u062F\u0644" : "Change model")));
      console.log(source_default.gray("  /lang  - " + (config.language === "fa" ? "\u062A\u063A\u06CC\u06CC\u0631 \u0632\u0628\u0627\u0646 (fa/en)" : "Change language (fa/en)")));
      console.log(source_default.gray("  /clear - " + (config.language === "fa" ? "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646 \u0645\u06A9\u0627\u0644\u0645\u0647" : "Clear conversation")));
      console.log(source_default.gray("  /exit  - " + (config.language === "fa" ? "\u062E\u0631\u0648\u062C" : "Exit")));
      console.log("");
      break;
    case "/lang":
      const lang = parts[1];
      if (lang === "en" || lang === "fa") {
        config.language = lang;
        agent.setLanguage(lang);
        console.log(source_default.green(lang === "fa" ? "\u0632\u0628\u0627\u0646 \u0628\u0647 \u0641\u0627\u0631\u0633\u06CC \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F" : "Language changed to English"));
      } else {
        console.log(source_default.gray("Usage: /lang fa  or  /lang en"));
      }
      break;
    case "/clear":
      agent.clearConversation();
      console.log(source_default.green(config.language === "fa" ? "\u0645\u06A9\u0627\u0644\u0645\u0647 \u067E\u0627\u06A9 \u0634\u062F" : "Conversation cleared"));
      break;
    case "/model":
      console.log(source_default.cyan(config.language === "fa" ? "\u0645\u062F\u0644 \u0641\u0639\u0644\u06CC:" : "Current model:"));
      console.log(source_default.white(`  ${config.model}`));
      console.log(source_default.gray(config.language === "fa" ? "\u0628\u0631\u0627\u06CC \u062A\u063A\u06CC\u06CC\u0631\u060C \u0645\u062F\u0644 \u0631\u0627 \u062F\u0631 config \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC\u062F" : "Change in config file"));
      break;
    default:
      console.log(source_default.red(config.language === "fa" ? `\u062F\u0633\u062A\u0648\u0631 \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647: ${command}` : `Unknown command: ${command}`));
  }
  rl.prompt();
}
var readline;
var init_app = __esm({
  "src/tui/app.ts"() {
    "use strict";
    readline = __toESM(require("readline"));
    init_source();
    init_agent();
  }
});

// node_modules/commander/lib/error.js
var CommanderError = class extends Error {
  /**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   */
  constructor(exitCode, code, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.exitCode = exitCode;
    this.nestedError = void 0;
  }
};
var InvalidArgumentError = class extends CommanderError {
  /**
   * Constructs the InvalidArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   */
  constructor(message) {
    super(1, "commander.invalidArgument", message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
};

// node_modules/commander/lib/argument.js
var Argument = class {
  /**
   * Initialize a new command argument with the given name and description.
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @param {string} name
   * @param {string} [description]
   */
  constructor(name, description) {
    this.description = description || "";
    this.variadic = false;
    this.parseArg = void 0;
    this.defaultValue = void 0;
    this.defaultValueDescription = void 0;
    this.argChoices = void 0;
    switch (name[0]) {
      case "<":
        this.required = true;
        this._name = name.slice(1, -1);
        break;
      case "[":
        this.required = false;
        this._name = name.slice(1, -1);
        break;
      default:
        this.required = true;
        this._name = name;
        break;
    }
    if (this._name.endsWith("...")) {
      this.variadic = true;
      this._name = this._name.slice(0, -3);
    }
  }
  /**
   * Return argument name.
   *
   * @return {string}
   */
  name() {
    return this._name;
  }
  /**
   * @package
   */
  _collectValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }
    previous.push(value);
    return previous;
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {*} value
   * @param {string} [description]
   * @return {Argument}
   */
  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }
  /**
   * Set the custom handler for processing CLI command arguments into argument values.
   *
   * @param {Function} [fn]
   * @return {Argument}
   */
  argParser(fn) {
    this.parseArg = fn;
    return this;
  }
  /**
   * Only allow argument value to be one of choices.
   *
   * @param {string[]} values
   * @return {Argument}
   */
  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(
          `Allowed choices are ${this.argChoices.join(", ")}.`
        );
      }
      if (this.variadic) {
        return this._collectValue(arg, previous);
      }
      return arg;
    };
    return this;
  }
  /**
   * Make argument required.
   *
   * @returns {Argument}
   */
  argRequired() {
    this.required = true;
    return this;
  }
  /**
   * Make argument optional.
   *
   * @returns {Argument}
   */
  argOptional() {
    this.required = false;
    return this;
  }
};
function humanReadableArgName(arg) {
  const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
  return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
}

// node_modules/commander/lib/command.js
var import_node_events = require("events");
var import_node_child_process = __toESM(require("child_process"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_fs = __toESM(require("fs"), 1);
var import_node_process = __toESM(require("process"), 1);
var import_node_util2 = require("util");

// node_modules/commander/lib/help.js
var import_node_util = require("util");
var Help = class {
  constructor() {
    this.helpWidth = void 0;
    this.minWidthToWrap = 40;
    this.sortSubcommands = false;
    this.sortOptions = false;
    this.showGlobalOptions = false;
  }
  /**
   * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
   * and just before calling `formatHelp()`.
   *
   * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
   *
   * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
   */
  prepareContext(contextOptions) {
    this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
  }
  /**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */
  visibleCommands(cmd) {
    const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
    const helpCommand = cmd._getHelpCommand();
    if (helpCommand && !helpCommand._hidden) {
      visibleCommands.push(helpCommand);
    }
    if (this.sortSubcommands) {
      visibleCommands.sort((a, b) => {
        return a.name().localeCompare(b.name());
      });
    }
    return visibleCommands;
  }
  /**
   * Compare options for sort.
   *
   * @param {Option} a
   * @param {Option} b
   * @returns {number}
   */
  compareOptions(a, b) {
    const getSortKey = (option) => {
      return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
    };
    return getSortKey(a).localeCompare(getSortKey(b));
  }
  /**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleOptions(cmd) {
    const visibleOptions = cmd.options.filter((option) => !option.hidden);
    const helpOption = cmd._getHelpOption();
    if (helpOption && !helpOption.hidden) {
      const removeShort = helpOption.short && cmd._findOption(helpOption.short);
      const removeLong = helpOption.long && cmd._findOption(helpOption.long);
      if (!removeShort && !removeLong) {
        visibleOptions.push(helpOption);
      } else if (helpOption.long && !removeLong) {
        visibleOptions.push(
          cmd.createOption(helpOption.long, helpOption.description)
        );
      } else if (helpOption.short && !removeShort) {
        visibleOptions.push(
          cmd.createOption(helpOption.short, helpOption.description)
        );
      }
    }
    if (this.sortOptions) {
      visibleOptions.sort(this.compareOptions);
    }
    return visibleOptions;
  }
  /**
   * Get an array of the visible global options. (Not including help.)
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleGlobalOptions(cmd) {
    if (!this.showGlobalOptions) return [];
    const globalOptions = [];
    for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
      const visibleOptions = ancestorCmd.options.filter(
        (option) => !option.hidden
      );
      globalOptions.push(...visibleOptions);
    }
    if (this.sortOptions) {
      globalOptions.sort(this.compareOptions);
    }
    return globalOptions;
  }
  /**
   * Get an array of the arguments if any have a description.
   *
   * @param {Command} cmd
   * @returns {Argument[]}
   */
  visibleArguments(cmd) {
    if (cmd._argsDescription) {
      cmd.registeredArguments.forEach((argument) => {
        argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
      });
    }
    if (cmd.registeredArguments.find((argument) => argument.description)) {
      return cmd.registeredArguments;
    }
    return [];
  }
  /**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandTerm(cmd) {
    const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
    return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
    (args ? " " + args : "");
  }
  /**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */
  optionTerm(option) {
    return option.flags;
  }
  /**
   * Get the argument term to show in the list of arguments.
   *
   * @param {Argument} argument
   * @returns {string}
   */
  argumentTerm(argument) {
    return argument.name();
  }
  /**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestSubcommandTermLength(cmd, helper) {
    return helper.visibleCommands(cmd).reduce((max, command) => {
      return Math.max(
        max,
        this.displayWidth(
          helper.styleSubcommandTerm(helper.subcommandTerm(command))
        )
      );
    }, 0);
  }
  /**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestOptionTermLength(cmd, helper) {
    return helper.visibleOptions(cmd).reduce((max, option) => {
      return Math.max(
        max,
        this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
      );
    }, 0);
  }
  /**
   * Get the longest global option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestGlobalOptionTermLength(cmd, helper) {
    return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
      return Math.max(
        max,
        this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
      );
    }, 0);
  }
  /**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestArgumentTermLength(cmd, helper) {
    return helper.visibleArguments(cmd).reduce((max, argument) => {
      return Math.max(
        max,
        this.displayWidth(
          helper.styleArgumentTerm(helper.argumentTerm(argument))
        )
      );
    }, 0);
  }
  /**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandUsage(cmd) {
    let cmdName = cmd._name;
    if (cmd._aliases[0]) {
      cmdName = cmdName + "|" + cmd._aliases[0];
    }
    let ancestorCmdNames = "";
    for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
      ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
    }
    return ancestorCmdNames + cmdName + " " + cmd.usage();
  }
  /**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandDescription(cmd) {
    return cmd.description();
  }
  /**
   * Get the subcommand summary to show in the list of subcommands.
   * (Fallback to description for backwards compatibility.)
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandDescription(cmd) {
    return cmd.summary() || cmd.description();
  }
  /**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */
  optionDescription(option) {
    const extraInfo = [];
    if (option.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
      );
    }
    if (option.defaultValue !== void 0) {
      const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
      if (showDefault) {
        extraInfo.push(
          `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
        );
      }
    }
    if (option.presetArg !== void 0 && option.optional) {
      extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
    }
    if (option.envVar !== void 0) {
      extraInfo.push(`env: ${option.envVar}`);
    }
    if (extraInfo.length > 0) {
      const extraDescription = `(${extraInfo.join(", ")})`;
      if (option.description) {
        return `${option.description} ${extraDescription}`;
      }
      return extraDescription;
    }
    return option.description;
  }
  /**
   * Get the argument description to show in the list of arguments.
   *
   * @param {Argument} argument
   * @return {string}
   */
  argumentDescription(argument) {
    const extraInfo = [];
    if (argument.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
      );
    }
    if (argument.defaultValue !== void 0) {
      extraInfo.push(
        `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
      );
    }
    if (extraInfo.length > 0) {
      const extraDescription = `(${extraInfo.join(", ")})`;
      if (argument.description) {
        return `${argument.description} ${extraDescription}`;
      }
      return extraDescription;
    }
    return argument.description;
  }
  /**
   * Format a list of items, given a heading and an array of formatted items.
   *
   * @param {string} heading
   * @param {string[]} items
   * @param {Help} helper
   * @returns string[]
   */
  formatItemList(heading, items, helper) {
    if (items.length === 0) return [];
    return [helper.styleTitle(heading), ...items, ""];
  }
  /**
   * Group items by their help group heading.
   *
   * @param {Command[] | Option[]} unsortedItems
   * @param {Command[] | Option[]} visibleItems
   * @param {Function} getGroup
   * @returns {Map<string, Command[] | Option[]>}
   */
  groupItems(unsortedItems, visibleItems, getGroup) {
    const result = /* @__PURE__ */ new Map();
    unsortedItems.forEach((item) => {
      const group = getGroup(item);
      if (!result.has(group)) result.set(group, []);
    });
    visibleItems.forEach((item) => {
      const group = getGroup(item);
      if (!result.has(group)) {
        result.set(group, []);
      }
      result.get(group).push(item);
    });
    return result;
  }
  /**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */
  formatHelp(cmd, helper) {
    const termWidth = helper.padWidth(cmd, helper);
    const helpWidth = helper.helpWidth ?? 80;
    function callFormatItem(term, description) {
      return helper.formatItem(term, termWidth, description, helper);
    }
    let output = [
      `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
      ""
    ];
    const commandDescription = helper.commandDescription(cmd);
    if (commandDescription.length > 0) {
      output = output.concat([
        helper.boxWrap(
          helper.styleCommandDescription(commandDescription),
          helpWidth
        ),
        ""
      ]);
    }
    const argumentList = helper.visibleArguments(cmd).map((argument) => {
      return callFormatItem(
        helper.styleArgumentTerm(helper.argumentTerm(argument)),
        helper.styleArgumentDescription(helper.argumentDescription(argument))
      );
    });
    output = output.concat(
      this.formatItemList("Arguments:", argumentList, helper)
    );
    const optionGroups = this.groupItems(
      cmd.options,
      helper.visibleOptions(cmd),
      (option) => option.helpGroupHeading ?? "Options:"
    );
    optionGroups.forEach((options, group) => {
      const optionList = options.map((option) => {
        return callFormatItem(
          helper.styleOptionTerm(helper.optionTerm(option)),
          helper.styleOptionDescription(helper.optionDescription(option))
        );
      });
      output = output.concat(this.formatItemList(group, optionList, helper));
    });
    if (helper.showGlobalOptions) {
      const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
        return callFormatItem(
          helper.styleOptionTerm(helper.optionTerm(option)),
          helper.styleOptionDescription(helper.optionDescription(option))
        );
      });
      output = output.concat(
        this.formatItemList("Global Options:", globalOptionList, helper)
      );
    }
    const commandGroups = this.groupItems(
      cmd.commands,
      helper.visibleCommands(cmd),
      (sub) => sub.helpGroup() || "Commands:"
    );
    commandGroups.forEach((commands, group) => {
      const commandList = commands.map((sub) => {
        return callFormatItem(
          helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
          helper.styleSubcommandDescription(helper.subcommandDescription(sub))
        );
      });
      output = output.concat(this.formatItemList(group, commandList, helper));
    });
    return output.join("\n");
  }
  /**
   * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
   *
   * @param {string} str
   * @returns {number}
   */
  displayWidth(str2) {
    return (0, import_node_util.stripVTControlCharacters)(str2).length;
  }
  /**
   * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
   *
   * @param {string} str
   * @returns {string}
   */
  styleTitle(str2) {
    return str2;
  }
  styleUsage(str2) {
    return str2.split(" ").map((word) => {
      if (word === "[options]") return this.styleOptionText(word);
      if (word === "[command]") return this.styleSubcommandText(word);
      if (word[0] === "[" || word[0] === "<")
        return this.styleArgumentText(word);
      return this.styleCommandText(word);
    }).join(" ");
  }
  styleCommandDescription(str2) {
    return this.styleDescriptionText(str2);
  }
  styleOptionDescription(str2) {
    return this.styleDescriptionText(str2);
  }
  styleSubcommandDescription(str2) {
    return this.styleDescriptionText(str2);
  }
  styleArgumentDescription(str2) {
    return this.styleDescriptionText(str2);
  }
  styleDescriptionText(str2) {
    return str2;
  }
  styleOptionTerm(str2) {
    return this.styleOptionText(str2);
  }
  styleSubcommandTerm(str2) {
    return str2.split(" ").map((word) => {
      if (word === "[options]") return this.styleOptionText(word);
      if (word[0] === "[" || word[0] === "<")
        return this.styleArgumentText(word);
      return this.styleSubcommandText(word);
    }).join(" ");
  }
  styleArgumentTerm(str2) {
    return this.styleArgumentText(str2);
  }
  styleOptionText(str2) {
    return str2;
  }
  styleArgumentText(str2) {
    return str2;
  }
  styleSubcommandText(str2) {
    return str2;
  }
  styleCommandText(str2) {
    return str2;
  }
  /**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  padWidth(cmd, helper) {
    return Math.max(
      helper.longestOptionTermLength(cmd, helper),
      helper.longestGlobalOptionTermLength(cmd, helper),
      helper.longestSubcommandTermLength(cmd, helper),
      helper.longestArgumentTermLength(cmd, helper)
    );
  }
  /**
   * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
   *
   * @param {string} str
   * @returns {boolean}
   */
  preformatted(str2) {
    return /\n[^\S\r\n]/.test(str2);
  }
  /**
   * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
   *
   * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
   *   TTT  DDD DDDD
   *        DD DDD
   *
   * @param {string} term
   * @param {number} termWidth
   * @param {string} description
   * @param {Help} helper
   * @returns {string}
   */
  formatItem(term, termWidth, description, helper) {
    const itemIndent = 2;
    const itemIndentStr = " ".repeat(itemIndent);
    if (!description) return itemIndentStr + term;
    const paddedTerm = term.padEnd(
      termWidth + term.length - helper.displayWidth(term)
    );
    const spacerWidth = 2;
    const helpWidth = this.helpWidth ?? 80;
    const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
    let formattedDescription;
    if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
      formattedDescription = description;
    } else {
      const wrappedDescription = helper.boxWrap(description, remainingWidth);
      formattedDescription = wrappedDescription.replace(
        /\n/g,
        "\n" + " ".repeat(termWidth + spacerWidth)
      );
    }
    return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
  }
  /**
   * Wrap a string at whitespace, preserving existing line breaks.
   * Wrapping is skipped if the width is less than `minWidthToWrap`.
   *
   * @param {string} str
   * @param {number} width
   * @returns {string}
   */
  boxWrap(str2, width) {
    if (width < this.minWidthToWrap) return str2;
    const rawLines = str2.split(/\r\n|\n/);
    const chunkPattern = /[\s]*[^\s]+/g;
    const wrappedLines = [];
    rawLines.forEach((line) => {
      const chunks = line.match(chunkPattern);
      if (chunks === null) {
        wrappedLines.push("");
        return;
      }
      let sumChunks = [chunks.shift()];
      let sumWidth = this.displayWidth(sumChunks[0]);
      chunks.forEach((chunk) => {
        const visibleWidth = this.displayWidth(chunk);
        if (sumWidth + visibleWidth <= width) {
          sumChunks.push(chunk);
          sumWidth += visibleWidth;
          return;
        }
        wrappedLines.push(sumChunks.join(""));
        const nextChunk = chunk.trimStart();
        sumChunks = [nextChunk];
        sumWidth = this.displayWidth(nextChunk);
      });
      wrappedLines.push(sumChunks.join(""));
    });
    return wrappedLines.join("\n");
  }
};

// node_modules/commander/lib/option.js
var Option = class {
  /**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */
  constructor(flags, description) {
    this.flags = flags;
    this.description = description || "";
    this.required = flags.includes("<");
    this.optional = flags.includes("[");
    this.variadic = /\w\.\.\.[>\]]$/.test(flags);
    this.mandatory = false;
    const optionFlags = splitOptionFlags(flags);
    this.short = optionFlags.shortFlag;
    this.long = optionFlags.longFlag;
    this.negate = false;
    if (this.long) {
      this.negate = this.long.startsWith("--no-");
    }
    this.defaultValue = void 0;
    this.defaultValueDescription = void 0;
    this.presetArg = void 0;
    this.envVar = void 0;
    this.parseArg = void 0;
    this.hidden = false;
    this.argChoices = void 0;
    this.conflictsWith = [];
    this.implied = void 0;
    this.helpGroupHeading = void 0;
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {*} value
   * @param {string} [description]
   * @return {Option}
   */
  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }
  /**
   * Preset to use when option used without option-argument, especially optional but also boolean and negated.
   * The custom processing (parseArg) is called.
   *
   * @example
   * new Option('--color').default('GREYSCALE').preset('RGB');
   * new Option('--donate [amount]').preset('20').argParser(parseFloat);
   *
   * @param {*} arg
   * @return {Option}
   */
  preset(arg) {
    this.presetArg = arg;
    return this;
  }
  /**
   * Add option name(s) that conflict with this option.
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @example
   * new Option('--rgb').conflicts('cmyk');
   * new Option('--js').conflicts(['ts', 'jsx']);
   *
   * @param {(string | string[])} names
   * @return {Option}
   */
  conflicts(names) {
    this.conflictsWith = this.conflictsWith.concat(names);
    return this;
  }
  /**
   * Specify implied option values for when this option is set and the implied options are not.
   *
   * The custom processing (parseArg) is not called on the implied values.
   *
   * @example
   * program
   *   .addOption(new Option('--log', 'write logging information to file'))
   *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
   *
   * @param {object} impliedOptionValues
   * @return {Option}
   */
  implies(impliedOptionValues) {
    let newImplied = impliedOptionValues;
    if (typeof impliedOptionValues === "string") {
      newImplied = { [impliedOptionValues]: true };
    }
    this.implied = Object.assign(this.implied || {}, newImplied);
    return this;
  }
  /**
   * Set environment variable to check for option value.
   *
   * An environment variable is only used if when processed the current option value is
   * undefined, or the source of the current value is 'default' or 'config' or 'env'.
   *
   * @param {string} name
   * @return {Option}
   */
  env(name) {
    this.envVar = name;
    return this;
  }
  /**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */
  argParser(fn) {
    this.parseArg = fn;
    return this;
  }
  /**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */
  makeOptionMandatory(mandatory = true) {
    this.mandatory = !!mandatory;
    return this;
  }
  /**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */
  hideHelp(hide = true) {
    this.hidden = !!hide;
    return this;
  }
  /**
   * @package
   */
  _collectValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }
    previous.push(value);
    return previous;
  }
  /**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */
  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(
          `Allowed choices are ${this.argChoices.join(", ")}.`
        );
      }
      if (this.variadic) {
        return this._collectValue(arg, previous);
      }
      return arg;
    };
    return this;
  }
  /**
   * Return option name.
   *
   * @return {string}
   */
  name() {
    if (this.long) {
      return this.long.replace(/^--/, "");
    }
    return this.short.replace(/^-/, "");
  }
  /**
   * Return option name, in a camelcase format that can be used
   * as an object attribute key.
   *
   * @return {string}
   */
  attributeName() {
    if (this.negate) {
      return camelcase(this.name().replace(/^no-/, ""));
    }
    return camelcase(this.name());
  }
  /**
   * Set the help group heading.
   *
   * @param {string} heading
   * @return {Option}
   */
  helpGroup(heading) {
    this.helpGroupHeading = heading;
    return this;
  }
  /**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @package
   */
  is(arg) {
    return this.short === arg || this.long === arg;
  }
  /**
   * Return whether a boolean option.
   *
   * Options are one of boolean, negated, required argument, or optional argument.
   *
   * @return {boolean}
   * @package
   */
  isBoolean() {
    return !this.required && !this.optional && !this.negate;
  }
};
var DualOptions = class {
  /**
   * @param {Option[]} options
   */
  constructor(options) {
    this.positiveOptions = /* @__PURE__ */ new Map();
    this.negativeOptions = /* @__PURE__ */ new Map();
    this.dualOptions = /* @__PURE__ */ new Set();
    options.forEach((option) => {
      if (option.negate) {
        this.negativeOptions.set(option.attributeName(), option);
      } else {
        this.positiveOptions.set(option.attributeName(), option);
      }
    });
    this.negativeOptions.forEach((value, key) => {
      if (this.positiveOptions.has(key)) {
        this.dualOptions.add(key);
      }
    });
  }
  /**
   * Did the value come from the option, and not from possible matching dual option?
   *
   * @param {*} value
   * @param {Option} option
   * @returns {boolean}
   */
  valueFromOption(value, option) {
    const optionKey = option.attributeName();
    if (!this.dualOptions.has(optionKey)) return true;
    const preset = this.negativeOptions.get(optionKey).presetArg;
    const negativeValue = preset !== void 0 ? preset : false;
    return option.negate === (negativeValue === value);
  }
};
function camelcase(str2) {
  return str2.split("-").reduce((str3, word) => {
    return str3 + word[0].toUpperCase() + word.slice(1);
  });
}
function splitOptionFlags(flags) {
  let shortFlag;
  let longFlag;
  const shortFlagExp = /^-[^-]$/;
  const longFlagExp = /^--[^-]/;
  const flagParts = flags.split(/[ |,]+/).concat("guard");
  if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
  if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
  if (!shortFlag && shortFlagExp.test(flagParts[0]))
    shortFlag = flagParts.shift();
  if (!shortFlag && longFlagExp.test(flagParts[0])) {
    shortFlag = longFlag;
    longFlag = flagParts.shift();
  }
  if (flagParts[0].startsWith("-")) {
    const unsupportedFlag = flagParts[0];
    const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
    if (/^-[^-][^-]/.test(unsupportedFlag))
      throw new Error(
        `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
      );
    if (shortFlagExp.test(unsupportedFlag))
      throw new Error(`${baseError}
- too many short flags`);
    if (longFlagExp.test(unsupportedFlag))
      throw new Error(`${baseError}
- too many long flags`);
    throw new Error(`${baseError}
- unrecognised flag format`);
  }
  if (shortFlag === void 0 && longFlag === void 0)
    throw new Error(
      `option creation failed due to no flags found in '${flags}'.`
    );
  return { shortFlag, longFlag };
}

// node_modules/commander/lib/suggestSimilar.js
var maxDistance = 3;
function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > maxDistance)
    return Math.max(a.length, b.length);
  const d = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    d[0][j] = j;
  }
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      let cost;
      if (a[i - 1] === b[j - 1]) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        // deletion
        d[i][j - 1] + 1,
        // insertion
        d[i - 1][j - 1] + cost
        // substitution
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}
function suggestSimilar(word, candidates) {
  if (!candidates || candidates.length === 0) return "";
  candidates = Array.from(new Set(candidates));
  const searchingOptions = word.startsWith("--");
  if (searchingOptions) {
    word = word.slice(2);
    candidates = candidates.map((candidate) => candidate.slice(2));
  }
  let similar = [];
  let bestDistance = maxDistance;
  const minSimilarity = 0.4;
  candidates.forEach((candidate) => {
    if (candidate.length <= 1) return;
    const distance = editDistance(word, candidate);
    const length = Math.max(word.length, candidate.length);
    const similarity = (length - distance) / length;
    if (similarity > minSimilarity) {
      if (distance < bestDistance) {
        bestDistance = distance;
        similar = [candidate];
      } else if (distance === bestDistance) {
        similar.push(candidate);
      }
    }
  });
  similar.sort((a, b) => a.localeCompare(b));
  if (searchingOptions) {
    similar = similar.map((candidate) => `--${candidate}`);
  }
  if (similar.length > 1) {
    return `
(Did you mean one of ${similar.join(", ")}?)`;
  }
  if (similar.length === 1) {
    return `
(Did you mean ${similar[0]}?)`;
  }
  return "";
}

// node_modules/commander/lib/command.js
var Command = class _Command extends import_node_events.EventEmitter {
  /**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */
  constructor(name) {
    super();
    this.commands = [];
    this.options = [];
    this.parent = null;
    this._allowUnknownOption = false;
    this._allowExcessArguments = false;
    this.registeredArguments = [];
    this._args = this.registeredArguments;
    this.args = [];
    this.rawArgs = [];
    this.processedArgs = [];
    this._scriptPath = null;
    this._name = name || "";
    this._optionValues = {};
    this._optionValueSources = {};
    this._storeOptionsAsProperties = false;
    this._actionHandler = null;
    this._executableHandler = false;
    this._executableFile = null;
    this._executableDir = null;
    this._defaultCommandName = null;
    this._exitCallback = null;
    this._aliases = [];
    this._combineFlagAndOptionalValue = true;
    this._description = "";
    this._summary = "";
    this._argsDescription = void 0;
    this._enablePositionalOptions = false;
    this._passThroughOptions = false;
    this._lifeCycleHooks = {};
    this._showHelpAfterError = false;
    this._showSuggestionAfterError = true;
    this._savedState = null;
    this._outputConfiguration = {
      writeOut: (str2) => import_node_process.default.stdout.write(str2),
      writeErr: (str2) => import_node_process.default.stderr.write(str2),
      outputError: (str2, write) => write(str2),
      getOutHelpWidth: () => import_node_process.default.stdout.isTTY ? import_node_process.default.stdout.columns : void 0,
      getErrHelpWidth: () => import_node_process.default.stderr.isTTY ? import_node_process.default.stderr.columns : void 0,
      getOutHasColors: () => useColor() ?? (import_node_process.default.stdout.isTTY && import_node_process.default.stdout.hasColors?.()),
      getErrHasColors: () => useColor() ?? (import_node_process.default.stderr.isTTY && import_node_process.default.stderr.hasColors?.()),
      stripColor: (str2) => (0, import_node_util2.stripVTControlCharacters)(str2)
    };
    this._hidden = false;
    this._helpOption = void 0;
    this._addImplicitHelpCommand = void 0;
    this._helpCommand = void 0;
    this._helpConfiguration = {};
    this._helpGroupHeading = void 0;
    this._defaultCommandGroup = void 0;
    this._defaultOptionGroup = void 0;
  }
  /**
   * Copy settings that are useful to have in common across root command and subcommands.
   *
   * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
   *
   * @param {Command} sourceCommand
   * @return {Command} `this` command for chaining
   */
  copyInheritedSettings(sourceCommand) {
    this._outputConfiguration = sourceCommand._outputConfiguration;
    this._helpOption = sourceCommand._helpOption;
    this._helpCommand = sourceCommand._helpCommand;
    this._helpConfiguration = sourceCommand._helpConfiguration;
    this._exitCallback = sourceCommand._exitCallback;
    this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
    this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
    this._allowExcessArguments = sourceCommand._allowExcessArguments;
    this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
    this._showHelpAfterError = sourceCommand._showHelpAfterError;
    this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
    return this;
  }
  /**
   * @returns {Command[]}
   * @private
   */
  _getCommandAndAncestors() {
    const result = [];
    for (let command = this; command; command = command.parent) {
      result.push(command);
    }
    return result;
  }
  /**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * @example
   * // Command implemented using action handler (description is supplied separately to `.command`)
   * program
   *   .command('clone <source> [destination]')
   *   .description('clone a repository into a newly created directory')
   *   .action((source, destination) => {
   *     console.log('clone command called');
   *   });
   *
   * // Command implemented using separate executable file (description is second parameter to `.command`)
   * program
   *   .command('start <service>', 'start named service')
   *   .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */
  command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
    let desc = actionOptsOrExecDesc;
    let opts = execOpts;
    if (typeof desc === "object" && desc !== null) {
      opts = desc;
      desc = null;
    }
    opts = opts || {};
    const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
    const cmd = this.createCommand(name);
    if (desc) {
      cmd.description(desc);
      cmd._executableHandler = true;
    }
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    cmd._hidden = !!(opts.noHelp || opts.hidden);
    cmd._executableFile = opts.executableFile || null;
    if (args) cmd.arguments(args);
    this._registerCommand(cmd);
    cmd.parent = this;
    cmd.copyInheritedSettings(this);
    if (desc) return this;
    return cmd;
  }
  /**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */
  createCommand(name) {
    return new _Command(name);
  }
  /**
   * You can customise the help with a subclass of Help by overriding createHelp,
   * or by overriding Help properties using configureHelp().
   *
   * @return {Help}
   */
  createHelp() {
    return Object.assign(new Help(), this.configureHelp());
  }
  /**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {object} [configuration] - configuration options
   * @return {(Command | object)} `this` command for chaining, or stored configuration
   */
  configureHelp(configuration) {
    if (configuration === void 0) return this._helpConfiguration;
    this._helpConfiguration = configuration;
    return this;
  }
  /**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *     // change how output being written, defaults to stdout and stderr
   *     writeOut(str)
   *     writeErr(str)
   *     // change how output being written for errors, defaults to writeErr
   *     outputError(str, write) // used for displaying errors and not used for displaying help
   *     // specify width for wrapping help
   *     getOutHelpWidth()
   *     getErrHelpWidth()
   *     // color support, currently only used with Help
   *     getOutHasColors()
   *     getErrHasColors()
   *     stripColor() // used to remove ANSI escape codes if output does not have colors
   *
   * @param {object} [configuration] - configuration options
   * @return {(Command | object)} `this` command for chaining, or stored configuration
   */
  configureOutput(configuration) {
    if (configuration === void 0) return this._outputConfiguration;
    this._outputConfiguration = {
      ...this._outputConfiguration,
      ...configuration
    };
    return this;
  }
  /**
   * Display the help or a custom message after an error occurs.
   *
   * @param {(boolean|string)} [displayHelp]
   * @return {Command} `this` command for chaining
   */
  showHelpAfterError(displayHelp = true) {
    if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
    this._showHelpAfterError = displayHelp;
    return this;
  }
  /**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   *
   * @param {boolean} [displaySuggestion]
   * @return {Command} `this` command for chaining
   */
  showSuggestionAfterError(displaySuggestion = true) {
    this._showSuggestionAfterError = !!displaySuggestion;
    return this;
  }
  /**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */
  addCommand(cmd, opts) {
    if (!cmd._name) {
      throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
    }
    opts = opts || {};
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    if (opts.noHelp || opts.hidden) cmd._hidden = true;
    this._registerCommand(cmd);
    cmd.parent = this;
    cmd._checkForBrokenPassThrough();
    return this;
  }
  /**
   * Factory routine to create a new unattached argument.
   *
   * See .argument() for creating an attached argument, which uses this routine to
   * create the argument. You can override createArgument to return a custom argument.
   *
   * @param {string} name
   * @param {string} [description]
   * @return {Argument} new argument
   */
  createArgument(name, description) {
    return new Argument(name, description);
  }
  /**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * program.argument('<input-file>');
   * program.argument('[output-file]');
   *
   * @param {string} name
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom argument processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  argument(name, description, parseArg, defaultValue) {
    const argument = this.createArgument(name, description);
    if (typeof parseArg === "function") {
      argument.default(defaultValue).argParser(parseArg);
    } else {
      argument.default(parseArg);
    }
    this.addArgument(argument);
    return this;
  }
  /**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * program.arguments('<cmd> [env]');
   *
   * @param {string} names
   * @return {Command} `this` command for chaining
   */
  arguments(names) {
    names.trim().split(/ +/).forEach((detail) => {
      this.argument(detail);
    });
    return this;
  }
  /**
   * Define argument syntax for command, adding a prepared argument.
   *
   * @param {Argument} argument
   * @return {Command} `this` command for chaining
   */
  addArgument(argument) {
    const previousArgument = this.registeredArguments.slice(-1)[0];
    if (previousArgument?.variadic) {
      throw new Error(
        `only the last argument can be variadic '${previousArgument.name()}'`
      );
    }
    if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
      throw new Error(
        `a default value for a required argument is never used: '${argument.name()}'`
      );
    }
    this.registeredArguments.push(argument);
    return this;
  }
  /**
   * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
   *
   * @example
   *    program.helpCommand('help [cmd]');
   *    program.helpCommand('help [cmd]', 'show help');
   *    program.helpCommand(false); // suppress default help command
   *    program.helpCommand(true); // add help command even if no subcommands
   *
   * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
   * @param {string} [description] - custom description
   * @return {Command} `this` command for chaining
   */
  helpCommand(enableOrNameAndArgs, description) {
    if (typeof enableOrNameAndArgs === "boolean") {
      this._addImplicitHelpCommand = enableOrNameAndArgs;
      if (enableOrNameAndArgs && this._defaultCommandGroup) {
        this._initCommandGroup(this._getHelpCommand());
      }
      return this;
    }
    const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
    const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
    const helpDescription = description ?? "display help for command";
    const helpCommand = this.createCommand(helpName);
    helpCommand.helpOption(false);
    if (helpArgs) helpCommand.arguments(helpArgs);
    if (helpDescription) helpCommand.description(helpDescription);
    this._addImplicitHelpCommand = true;
    this._helpCommand = helpCommand;
    if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
    return this;
  }
  /**
   * Add prepared custom help command.
   *
   * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
   * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
   * @return {Command} `this` command for chaining
   */
  addHelpCommand(helpCommand, deprecatedDescription) {
    if (typeof helpCommand !== "object") {
      this.helpCommand(helpCommand, deprecatedDescription);
      return this;
    }
    this._addImplicitHelpCommand = true;
    this._helpCommand = helpCommand;
    this._initCommandGroup(helpCommand);
    return this;
  }
  /**
   * Lazy create help command.
   *
   * @return {(Command|null)}
   * @package
   */
  _getHelpCommand() {
    const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
    if (hasImplicitHelpCommand) {
      if (this._helpCommand === void 0) {
        this.helpCommand(void 0, void 0);
      }
      return this._helpCommand;
    }
    return null;
  }
  /**
   * Add hook for life cycle event.
   *
   * @param {string} event
   * @param {Function} listener
   * @return {Command} `this` command for chaining
   */
  hook(event, listener) {
    const allowedValues = ["preSubcommand", "preAction", "postAction"];
    if (!allowedValues.includes(event)) {
      throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    if (this._lifeCycleHooks[event]) {
      this._lifeCycleHooks[event].push(listener);
    } else {
      this._lifeCycleHooks[event] = [listener];
    }
    return this;
  }
  /**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */
  exitOverride(fn) {
    if (fn) {
      this._exitCallback = fn;
    } else {
      this._exitCallback = (err) => {
        if (err.code !== "commander.executeSubCommandAsync") {
          throw err;
        } else {
        }
      };
    }
    return this;
  }
  /**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @private
   */
  _exit(exitCode, code, message) {
    if (this._exitCallback) {
      this._exitCallback(new CommanderError(exitCode, code, message));
    }
    import_node_process.default.exit(exitCode);
  }
  /**
   * Register callback `fn` for the command.
   *
   * @example
   * program
   *   .command('serve')
   *   .description('start service')
   *   .action(function() {
   *      // do work here
   *   });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */
  action(fn) {
    const listener = (args) => {
      const expectedArgsCount = this.registeredArguments.length;
      const actionArgs = args.slice(0, expectedArgsCount);
      if (this._storeOptionsAsProperties) {
        actionArgs[expectedArgsCount] = this;
      } else {
        actionArgs[expectedArgsCount] = this.opts();
      }
      actionArgs.push(this);
      return fn.apply(this, actionArgs);
    };
    this._actionHandler = listener;
    return this;
  }
  /**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */
  createOption(flags, description) {
    return new Option(flags, description);
  }
  /**
   * Wrap parseArgs to catch 'commander.invalidArgument'.
   *
   * @param {(Option | Argument)} target
   * @param {string} value
   * @param {*} previous
   * @param {string} invalidArgumentMessage
   * @private
   */
  _callParseArg(target, value, previous, invalidArgumentMessage) {
    try {
      return target.parseArg(value, previous);
    } catch (err) {
      if (err.code === "commander.invalidArgument") {
        const message = `${invalidArgumentMessage} ${err.message}`;
        this.error(message, { exitCode: err.exitCode, code: err.code });
      }
      throw err;
    }
  }
  /**
   * Check for option flag conflicts.
   * Register option if no conflicts found, or throw on conflict.
   *
   * @param {Option} option
   * @private
   */
  _registerOption(option) {
    const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
    if (matchingOption) {
      const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
      throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
    }
    this._initOptionGroup(option);
    this.options.push(option);
  }
  /**
   * Check for command name and alias conflicts with existing commands.
   * Register command if no conflicts found, or throw on conflict.
   *
   * @param {Command} command
   * @private
   */
  _registerCommand(command) {
    const knownBy = (cmd) => {
      return [cmd.name()].concat(cmd.aliases());
    };
    const alreadyUsed = knownBy(command).find(
      (name) => this._findCommand(name)
    );
    if (alreadyUsed) {
      const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
      const newCmd = knownBy(command).join("|");
      throw new Error(
        `cannot add command '${newCmd}' as already have command '${existingCmd}'`
      );
    }
    this._initCommandGroup(command);
    this.commands.push(command);
  }
  /**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addOption(option) {
    this._registerOption(option);
    const oname = option.name();
    const name = option.attributeName();
    if (option.defaultValue !== void 0) {
      this.setOptionValueWithSource(name, option.defaultValue, "default");
    }
    const handleOptionValue = (val, invalidValueMessage, valueSource) => {
      if (val == null && option.presetArg !== void 0) {
        val = option.presetArg;
      }
      const oldValue = this.getOptionValue(name);
      if (val !== null && option.parseArg) {
        val = this._callParseArg(option, val, oldValue, invalidValueMessage);
      } else if (val !== null && option.variadic) {
        val = option._collectValue(val, oldValue);
      }
      if (val == null) {
        if (option.negate) {
          val = false;
        } else if (option.isBoolean() || option.optional) {
          val = true;
        } else {
          val = "";
        }
      }
      this.setOptionValueWithSource(name, val, valueSource);
    };
    this.on("option:" + oname, (val) => {
      const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
      handleOptionValue(val, invalidValueMessage, "cli");
    });
    if (option.envVar) {
      this.on("optionEnv:" + oname, (val) => {
        const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
        handleOptionValue(val, invalidValueMessage, "env");
      });
    }
    return this;
  }
  /**
   * Internal implementation shared by .option() and .requiredOption()
   *
   * @return {Command} `this` command for chaining
   * @private
   */
  _optionEx(config, flags, description, fn, defaultValue) {
    if (typeof flags === "object" && flags instanceof Option) {
      throw new Error(
        "To add an Option object use addOption() instead of option() or requiredOption()"
      );
    }
    const option = this.createOption(flags, description);
    option.makeOptionMandatory(!!config.mandatory);
    if (typeof fn === "function") {
      option.default(defaultValue).argParser(fn);
    } else if (fn instanceof RegExp) {
      const regex = fn;
      fn = (val, def) => {
        const m = regex.exec(val);
        return m ? m[0] : def;
      };
      option.default(defaultValue).argParser(fn);
    } else {
      option.default(fn);
    }
    return this.addOption(option);
  }
  /**
   * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
   *
   * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
   * option-argument is indicated by `<>` and an optional option-argument by `[]`.
   *
   * See the README for more details, and see also addOption() and requiredOption().
   *
   * @example
   * program
   *     .option('-p, --pepper', 'add pepper')
   *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
   *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
   *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  option(flags, description, parseArg, defaultValue) {
    return this._optionEx({}, flags, description, parseArg, defaultValue);
  }
  /**
   * Add a required option which must have a value after parsing. This usually means
   * the option must be specified on the command line. (Otherwise the same as .option().)
   *
   * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  requiredOption(flags, description, parseArg, defaultValue) {
    return this._optionEx(
      { mandatory: true },
      flags,
      description,
      parseArg,
      defaultValue
    );
  }
  /**
   * Alter parsing of short flags with optional values.
   *
   * @example
   * // for `.option('-f,--flag [value]'):
   * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
   * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
   * @return {Command} `this` command for chaining
   */
  combineFlagAndOptionalValue(combine = true) {
    this._combineFlagAndOptionalValue = !!combine;
    return this;
  }
  /**
   * Allow unknown options on the command line.
   *
   * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
   * @return {Command} `this` command for chaining
   */
  allowUnknownOption(allowUnknown = true) {
    this._allowUnknownOption = !!allowUnknown;
    return this;
  }
  /**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
   * @return {Command} `this` command for chaining
   */
  allowExcessArguments(allowExcess = true) {
    this._allowExcessArguments = !!allowExcess;
    return this;
  }
  /**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {boolean} [positional]
   * @return {Command} `this` command for chaining
   */
  enablePositionalOptions(positional = true) {
    this._enablePositionalOptions = !!positional;
    return this;
  }
  /**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {boolean} [passThrough] for unknown options.
   * @return {Command} `this` command for chaining
   */
  passThroughOptions(passThrough = true) {
    this._passThroughOptions = !!passThrough;
    this._checkForBrokenPassThrough();
    return this;
  }
  /**
   * @private
   */
  _checkForBrokenPassThrough() {
    if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
      throw new Error(
        `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
      );
    }
  }
  /**
   * Whether to store option values as properties on command object,
   * or store separately (specify false). In both cases the option values can be accessed using .opts().
   *
   * @param {boolean} [storeAsProperties=true]
   * @return {Command} `this` command for chaining
   */
  storeOptionsAsProperties(storeAsProperties = true) {
    if (this.options.length) {
      throw new Error("call .storeOptionsAsProperties() before adding options");
    }
    if (Object.keys(this._optionValues).length) {
      throw new Error(
        "call .storeOptionsAsProperties() before setting option values"
      );
    }
    this._storeOptionsAsProperties = !!storeAsProperties;
    return this;
  }
  /**
   * Retrieve option value.
   *
   * @param {string} key
   * @return {object} value
   */
  getOptionValue(key) {
    if (this._storeOptionsAsProperties) {
      return this[key];
    }
    return this._optionValues[key];
  }
  /**
   * Store option value.
   *
   * @param {string} key
   * @param {object} value
   * @return {Command} `this` command for chaining
   */
  setOptionValue(key, value) {
    return this.setOptionValueWithSource(key, value, void 0);
  }
  /**
   * Store option value and where the value came from.
   *
   * @param {string} key
   * @param {object} value
   * @param {string} source - expected values are default/config/env/cli/implied
   * @return {Command} `this` command for chaining
   */
  setOptionValueWithSource(key, value, source) {
    if (this._storeOptionsAsProperties) {
      this[key] = value;
    } else {
      this._optionValues[key] = value;
    }
    this._optionValueSources[key] = source;
    return this;
  }
  /**
   * Get source of option value.
   * Expected values are default | config | env | cli | implied
   *
   * @param {string} key
   * @return {string}
   */
  getOptionValueSource(key) {
    return this._optionValueSources[key];
  }
  /**
   * Get source of option value. See also .optsWithGlobals().
   * Expected values are default | config | env | cli | implied
   *
   * @param {string} key
   * @return {string}
   */
  getOptionValueSourceWithGlobals(key) {
    let source;
    this._getCommandAndAncestors().forEach((cmd) => {
      if (cmd.getOptionValueSource(key) !== void 0) {
        source = cmd.getOptionValueSource(key);
      }
    });
    return source;
  }
  /**
   * Get user arguments from implied or explicit arguments.
   * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
   *
   * @private
   */
  _prepareUserArgs(argv, parseOptions) {
    if (argv !== void 0 && !Array.isArray(argv)) {
      throw new Error("first parameter to parse must be array or undefined");
    }
    parseOptions = parseOptions || {};
    if (argv === void 0 && parseOptions.from === void 0) {
      if (import_node_process.default.versions?.electron) {
        parseOptions.from = "electron";
      }
      const execArgv = import_node_process.default.execArgv ?? [];
      if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
        parseOptions.from = "eval";
      }
    }
    if (argv === void 0) {
      argv = import_node_process.default.argv;
    }
    this.rawArgs = argv.slice();
    let userArgs;
    switch (parseOptions.from) {
      case void 0:
      case "node":
        this._scriptPath = argv[1];
        userArgs = argv.slice(2);
        break;
      case "electron":
        if (import_node_process.default.defaultApp) {
          this._scriptPath = argv[1];
          userArgs = argv.slice(2);
        } else {
          userArgs = argv.slice(1);
        }
        break;
      case "user":
        userArgs = argv.slice(0);
        break;
      case "eval":
        userArgs = argv.slice(1);
        break;
      default:
        throw new Error(
          `unexpected parse option { from: '${parseOptions.from}' }`
        );
    }
    if (!this._name && this._scriptPath)
      this.nameFromFilename(this._scriptPath);
    this._name = this._name || "program";
    return userArgs;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async.
   *
   * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
   *
   * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
   * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
   * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
   * - `'user'`: just user arguments
   *
   * @example
   * program.parse(); // parse process.argv and auto-detect electron and special node flags
   * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */
  parse(argv, parseOptions) {
    this._prepareForParse();
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    this._parseCommand([], userArgs);
    return this;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
   *
   * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
   * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
   * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
   * - `'user'`: just user arguments
   *
   * @example
   * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
   * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
   * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */
  async parseAsync(argv, parseOptions) {
    this._prepareForParse();
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    await this._parseCommand([], userArgs);
    return this;
  }
  _prepareForParse() {
    if (this._savedState === null) {
      this.options.filter(
        (option) => option.negate && option.defaultValue === void 0 && this.getOptionValue(option.attributeName()) === void 0
      ).forEach((option) => {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        if (!this._findOption(positiveLongFlag)) {
          this.setOptionValueWithSource(
            option.attributeName(),
            true,
            "default"
          );
        }
      });
      this.saveStateBeforeParse();
    } else {
      this.restoreStateBeforeParse();
    }
  }
  /**
   * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
   * Not usually called directly, but available for subclasses to save their custom state.
   *
   * This is called in a lazy way. Only commands used in parsing chain will have state saved.
   */
  saveStateBeforeParse() {
    this._savedState = {
      // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
      _name: this._name,
      // option values before parse have default values (including false for negated options)
      // shallow clones
      _optionValues: { ...this._optionValues },
      _optionValueSources: { ...this._optionValueSources }
    };
  }
  /**
   * Restore state before parse for calls after the first.
   * Not usually called directly, but available for subclasses to save their custom state.
   *
   * This is called in a lazy way. Only commands used in parsing chain will have state restored.
   */
  restoreStateBeforeParse() {
    if (this._storeOptionsAsProperties)
      throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
    this._name = this._savedState._name;
    this._scriptPath = null;
    this.rawArgs = [];
    this._optionValues = { ...this._savedState._optionValues };
    this._optionValueSources = { ...this._savedState._optionValueSources };
    this.args = [];
    this.processedArgs = [];
  }
  /**
   * Throw if expected executable is missing. Add lots of help for author.
   *
   * @param {string} executableFile
   * @param {string} executableDir
   * @param {string} subcommandName
   */
  _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
    if (import_node_fs.default.existsSync(executableFile)) return;
    const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
    const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
    throw new Error(executableMissing);
  }
  /**
   * Execute a sub-command executable.
   *
   * @private
   */
  _executeSubCommand(subcommand, args) {
    args = args.slice();
    const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
    function findFile(baseDir, baseName) {
      const localBin = import_node_path.default.resolve(baseDir, baseName);
      if (import_node_fs.default.existsSync(localBin)) return localBin;
      if (sourceExt.includes(import_node_path.default.extname(baseName))) return void 0;
      const foundExt = sourceExt.find(
        (ext) => import_node_fs.default.existsSync(`${localBin}${ext}`)
      );
      if (foundExt) return `${localBin}${foundExt}`;
      return void 0;
    }
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();
    let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
    let executableDir = this._executableDir || "";
    if (this._scriptPath) {
      let resolvedScriptPath;
      try {
        resolvedScriptPath = import_node_fs.default.realpathSync(this._scriptPath);
      } catch {
        resolvedScriptPath = this._scriptPath;
      }
      executableDir = import_node_path.default.resolve(
        import_node_path.default.dirname(resolvedScriptPath),
        executableDir
      );
    }
    if (executableDir) {
      let localFile = findFile(executableDir, executableFile);
      if (!localFile && !subcommand._executableFile && this._scriptPath) {
        const legacyName = import_node_path.default.basename(
          this._scriptPath,
          import_node_path.default.extname(this._scriptPath)
        );
        if (legacyName !== this._name) {
          localFile = findFile(
            executableDir,
            `${legacyName}-${subcommand._name}`
          );
        }
      }
      executableFile = localFile || executableFile;
    }
    const launchWithNode = sourceExt.includes(import_node_path.default.extname(executableFile));
    let proc;
    if (import_node_process.default.platform !== "win32") {
      if (launchWithNode) {
        args.unshift(executableFile);
        args = incrementNodeInspectorPort(import_node_process.default.execArgv).concat(args);
        proc = import_node_child_process.default.spawn(import_node_process.default.argv[0], args, { stdio: "inherit" });
      } else {
        proc = import_node_child_process.default.spawn(executableFile, args, { stdio: "inherit" });
      }
    } else {
      this._checkForMissingExecutable(
        executableFile,
        executableDir,
        subcommand._name
      );
      args.unshift(executableFile);
      args = incrementNodeInspectorPort(import_node_process.default.execArgv).concat(args);
      proc = import_node_child_process.default.spawn(import_node_process.default.execPath, args, { stdio: "inherit" });
    }
    if (!proc.killed) {
      const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
      signals.forEach((signal) => {
        import_node_process.default.on(signal, () => {
          if (proc.killed === false && proc.exitCode === null) {
            proc.kill(signal);
          }
        });
      });
    }
    const exitCallback = this._exitCallback;
    proc.on("close", (code) => {
      code = code ?? 1;
      if (!exitCallback) {
        import_node_process.default.exit(code);
      } else {
        exitCallback(
          new CommanderError(
            code,
            "commander.executeSubCommandAsync",
            "(close)"
          )
        );
      }
    });
    proc.on("error", (err) => {
      if (err.code === "ENOENT") {
        this._checkForMissingExecutable(
          executableFile,
          executableDir,
          subcommand._name
        );
      } else if (err.code === "EACCES") {
        throw new Error(`'${executableFile}' not executable`);
      }
      if (!exitCallback) {
        import_node_process.default.exit(1);
      } else {
        const wrappedError = new CommanderError(
          1,
          "commander.executeSubCommandAsync",
          "(error)"
        );
        wrappedError.nestedError = err;
        exitCallback(wrappedError);
      }
    });
    this.runningCommand = proc;
  }
  /**
   * @private
   */
  _dispatchSubcommand(commandName, operands, unknown) {
    const subCommand = this._findCommand(commandName);
    if (!subCommand) this.help({ error: true });
    subCommand._prepareForParse();
    let promiseChain;
    promiseChain = this._chainOrCallSubCommandHook(
      promiseChain,
      subCommand,
      "preSubcommand"
    );
    promiseChain = this._chainOrCall(promiseChain, () => {
      if (subCommand._executableHandler) {
        this._executeSubCommand(subCommand, operands.concat(unknown));
      } else {
        return subCommand._parseCommand(operands, unknown);
      }
    });
    return promiseChain;
  }
  /**
   * Invoke help directly if possible, or dispatch if necessary.
   * e.g. help foo
   *
   * @private
   */
  _dispatchHelpCommand(subcommandName) {
    if (!subcommandName) {
      this.help();
    }
    const subCommand = this._findCommand(subcommandName);
    if (subCommand && !subCommand._executableHandler) {
      subCommand.help();
    }
    return this._dispatchSubcommand(
      subcommandName,
      [],
      [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
    );
  }
  /**
   * Check this.args against expected this.registeredArguments.
   *
   * @private
   */
  _checkNumberOfArguments() {
    this.registeredArguments.forEach((arg, i) => {
      if (arg.required && this.args[i] == null) {
        this.missingArgument(arg.name());
      }
    });
    if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
      return;
    }
    if (this.args.length > this.registeredArguments.length) {
      this._excessArguments(this.args);
    }
  }
  /**
   * Process this.args using this.registeredArguments and save as this.processedArgs!
   *
   * @private
   */
  _processArguments() {
    const myParseArg = (argument, value, previous) => {
      let parsedValue = value;
      if (value !== null && argument.parseArg) {
        const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
        parsedValue = this._callParseArg(
          argument,
          value,
          previous,
          invalidValueMessage
        );
      }
      return parsedValue;
    };
    this._checkNumberOfArguments();
    const processedArgs = [];
    this.registeredArguments.forEach((declaredArg, index) => {
      let value = declaredArg.defaultValue;
      if (declaredArg.variadic) {
        if (index < this.args.length) {
          value = this.args.slice(index);
          if (declaredArg.parseArg) {
            value = value.reduce((processed, v) => {
              return myParseArg(declaredArg, v, processed);
            }, declaredArg.defaultValue);
          }
        } else if (value === void 0) {
          value = [];
        }
      } else if (index < this.args.length) {
        value = this.args[index];
        if (declaredArg.parseArg) {
          value = myParseArg(declaredArg, value, declaredArg.defaultValue);
        }
      }
      processedArgs[index] = value;
    });
    this.processedArgs = processedArgs;
  }
  /**
   * Once we have a promise we chain, but call synchronously until then.
   *
   * @param {(Promise|undefined)} promise
   * @param {Function} fn
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCall(promise, fn) {
    if (promise?.then && typeof promise.then === "function") {
      return promise.then(() => fn());
    }
    return fn();
  }
  /**
   *
   * @param {(Promise|undefined)} promise
   * @param {string} event
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCallHooks(promise, event) {
    let result = promise;
    const hooks = [];
    this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
      hookedCommand._lifeCycleHooks[event].forEach((callback) => {
        hooks.push({ hookedCommand, callback });
      });
    });
    if (event === "postAction") {
      hooks.reverse();
    }
    hooks.forEach((hookDetail) => {
      result = this._chainOrCall(result, () => {
        return hookDetail.callback(hookDetail.hookedCommand, this);
      });
    });
    return result;
  }
  /**
   *
   * @param {(Promise|undefined)} promise
   * @param {Command} subCommand
   * @param {string} event
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCallSubCommandHook(promise, subCommand, event) {
    let result = promise;
    if (this._lifeCycleHooks[event] !== void 0) {
      this._lifeCycleHooks[event].forEach((hook) => {
        result = this._chainOrCall(result, () => {
          return hook(this, subCommand);
        });
      });
    }
    return result;
  }
  /**
   * Process arguments in context of this command.
   * Returns action result, in case it is a promise.
   *
   * @private
   */
  _parseCommand(operands, unknown) {
    const parsed = this.parseOptions(unknown);
    this._parseOptionsEnv();
    this._parseOptionsImplied();
    operands = operands.concat(parsed.operands);
    unknown = parsed.unknown;
    this.args = operands.concat(unknown);
    if (operands && this._findCommand(operands[0])) {
      return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
    }
    if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
      return this._dispatchHelpCommand(operands[1]);
    }
    if (this._defaultCommandName) {
      this._outputHelpIfRequested(unknown);
      return this._dispatchSubcommand(
        this._defaultCommandName,
        operands,
        unknown
      );
    }
    if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
      this.help({ error: true });
    }
    this._outputHelpIfRequested(parsed.unknown);
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();
    const checkForUnknownOptions = () => {
      if (parsed.unknown.length > 0) {
        this.unknownOption(parsed.unknown[0]);
      }
    };
    const commandEvent = `command:${this.name()}`;
    if (this._actionHandler) {
      checkForUnknownOptions();
      this._processArguments();
      let promiseChain;
      promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
      promiseChain = this._chainOrCall(
        promiseChain,
        () => this._actionHandler(this.processedArgs)
      );
      if (this.parent) {
        promiseChain = this._chainOrCall(promiseChain, () => {
          this.parent.emit(commandEvent, operands, unknown);
        });
      }
      promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
      return promiseChain;
    }
    if (this.parent?.listenerCount(commandEvent)) {
      checkForUnknownOptions();
      this._processArguments();
      this.parent.emit(commandEvent, operands, unknown);
    } else if (operands.length) {
      if (this._findCommand("*")) {
        return this._dispatchSubcommand("*", operands, unknown);
      }
      if (this.listenerCount("command:*")) {
        this.emit("command:*", operands, unknown);
      } else if (this.commands.length) {
        this.unknownCommand();
      } else {
        checkForUnknownOptions();
        this._processArguments();
      }
    } else if (this.commands.length) {
      checkForUnknownOptions();
      this.help({ error: true });
    } else {
      checkForUnknownOptions();
      this._processArguments();
    }
  }
  /**
   * Find matching command.
   *
   * @private
   * @return {Command | undefined}
   */
  _findCommand(name) {
    if (!name) return void 0;
    return this.commands.find(
      (cmd) => cmd._name === name || cmd._aliases.includes(name)
    );
  }
  /**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @package
   */
  _findOption(arg) {
    return this.options.find((option) => option.is(arg));
  }
  /**
   * Display an error message if a mandatory option does not have a value.
   * Called after checking for help flags in leaf subcommand.
   *
   * @private
   */
  _checkForMissingMandatoryOptions() {
    this._getCommandAndAncestors().forEach((cmd) => {
      cmd.options.forEach((anOption) => {
        if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
          cmd.missingMandatoryOptionValue(anOption);
        }
      });
    });
  }
  /**
   * Display an error message if conflicting options are used together in this.
   *
   * @private
   */
  _checkForConflictingLocalOptions() {
    const definedNonDefaultOptions = this.options.filter((option) => {
      const optionKey = option.attributeName();
      if (this.getOptionValue(optionKey) === void 0) {
        return false;
      }
      return this.getOptionValueSource(optionKey) !== "default";
    });
    const optionsWithConflicting = definedNonDefaultOptions.filter(
      (option) => option.conflictsWith.length > 0
    );
    optionsWithConflicting.forEach((option) => {
      const conflictingAndDefined = definedNonDefaultOptions.find(
        (defined) => option.conflictsWith.includes(defined.attributeName())
      );
      if (conflictingAndDefined) {
        this._conflictingOption(option, conflictingAndDefined);
      }
    });
  }
  /**
   * Display an error message if conflicting options are used together.
   * Called after checking for help flags in leaf subcommand.
   *
   * @private
   */
  _checkForConflictingOptions() {
    this._getCommandAndAncestors().forEach((cmd) => {
      cmd._checkForConflictingLocalOptions();
    });
  }
  /**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Side effects: modifies command by storing options. Does not reset state if called again.
   *
   * Examples:
   *
   *     argv => operands, unknown
   *     --known kkk op => [op], []
   *     op --known kkk => [op], []
   *     sub --unknown uuu op => [sub], [--unknown uuu op]
   *     sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {string[]} args
   * @return {{operands: string[], unknown: string[]}}
   */
  parseOptions(args) {
    const operands = [];
    const unknown = [];
    let dest = operands;
    function maybeOption(arg) {
      return arg.length > 1 && arg[0] === "-";
    }
    const negativeNumberArg = (arg) => {
      if (!/^-(\d+|\d*\.\d+)(e[+-]?\d+)?$/.test(arg)) return false;
      return !this._getCommandAndAncestors().some(
        (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
      );
    };
    let activeVariadicOption = null;
    let activeGroup = null;
    let i = 0;
    while (i < args.length || activeGroup) {
      const arg = activeGroup ?? args[i++];
      activeGroup = null;
      if (arg === "--") {
        if (dest === unknown) dest.push(arg);
        dest.push(...args.slice(i));
        break;
      }
      if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
        this.emit(`option:${activeVariadicOption.name()}`, arg);
        continue;
      }
      activeVariadicOption = null;
      if (maybeOption(arg)) {
        const option = this._findOption(arg);
        if (option) {
          if (option.required) {
            const value = args[i++];
            if (value === void 0) this.optionMissingArgument(option);
            this.emit(`option:${option.name()}`, value);
          } else if (option.optional) {
            let value = null;
            if (i < args.length && (!maybeOption(args[i]) || negativeNumberArg(args[i]))) {
              value = args[i++];
            }
            this.emit(`option:${option.name()}`, value);
          } else {
            this.emit(`option:${option.name()}`);
          }
          activeVariadicOption = option.variadic ? option : null;
          continue;
        }
      }
      if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
        const option = this._findOption(`-${arg[1]}`);
        if (option) {
          if (option.required || option.optional && this._combineFlagAndOptionalValue) {
            this.emit(`option:${option.name()}`, arg.slice(2));
          } else {
            this.emit(`option:${option.name()}`);
            activeGroup = `-${arg.slice(2)}`;
          }
          continue;
        }
      }
      if (/^--[^=]+=/.test(arg)) {
        const index = arg.indexOf("=");
        const option = this._findOption(arg.slice(0, index));
        if (option && (option.required || option.optional)) {
          this.emit(`option:${option.name()}`, arg.slice(index + 1));
          continue;
        }
      }
      if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
        dest = unknown;
      }
      if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
        if (this._findCommand(arg)) {
          operands.push(arg);
          unknown.push(...args.slice(i));
          break;
        } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
          operands.push(arg, ...args.slice(i));
          break;
        } else if (this._defaultCommandName) {
          unknown.push(arg, ...args.slice(i));
          break;
        }
      }
      if (this._passThroughOptions) {
        dest.push(arg, ...args.slice(i));
        break;
      }
      dest.push(arg);
    }
    return { operands, unknown };
  }
  /**
   * Return an object containing local option values as key-value pairs.
   *
   * @return {object}
   */
  opts() {
    if (this._storeOptionsAsProperties) {
      const result = {};
      const len = this.options.length;
      for (let i = 0; i < len; i++) {
        const key = this.options[i].attributeName();
        result[key] = key === this._versionOptionName ? this._version : this[key];
      }
      return result;
    }
    return this._optionValues;
  }
  /**
   * Return an object containing merged local and global option values as key-value pairs.
   *
   * @return {object}
   */
  optsWithGlobals() {
    return this._getCommandAndAncestors().reduce(
      (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
      {}
    );
  }
  /**
   * Display error message and exit (or call exitOverride).
   *
   * @param {string} message
   * @param {object} [errorOptions]
   * @param {string} [errorOptions.code] - an id string representing the error
   * @param {number} [errorOptions.exitCode] - used with process.exit
   */
  error(message, errorOptions) {
    this._outputConfiguration.outputError(
      `${message}
`,
      this._outputConfiguration.writeErr
    );
    if (typeof this._showHelpAfterError === "string") {
      this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
    } else if (this._showHelpAfterError) {
      this._outputConfiguration.writeErr("\n");
      this.outputHelp({ error: true });
    }
    const config = errorOptions || {};
    const exitCode = config.exitCode || 1;
    const code = config.code || "commander.error";
    this._exit(exitCode, code, message);
  }
  /**
   * Apply any option related environment variables, if option does
   * not have a value from cli or client code.
   *
   * @private
   */
  _parseOptionsEnv() {
    this.options.forEach((option) => {
      if (option.envVar && option.envVar in import_node_process.default.env) {
        const optionKey = option.attributeName();
        if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
          this.getOptionValueSource(optionKey)
        )) {
          if (option.required || option.optional) {
            this.emit(`optionEnv:${option.name()}`, import_node_process.default.env[option.envVar]);
          } else {
            this.emit(`optionEnv:${option.name()}`);
          }
        }
      }
    });
  }
  /**
   * Apply any implied option values, if option is undefined or default value.
   *
   * @private
   */
  _parseOptionsImplied() {
    const dualHelper = new DualOptions(this.options);
    const hasCustomOptionValue = (optionKey) => {
      return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
    };
    this.options.filter(
      (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
        this.getOptionValue(option.attributeName()),
        option
      )
    ).forEach((option) => {
      Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
        this.setOptionValueWithSource(
          impliedKey,
          option.implied[impliedKey],
          "implied"
        );
      });
    });
  }
  /**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @private
   */
  missingArgument(name) {
    const message = `error: missing required argument '${name}'`;
    this.error(message, { code: "commander.missingArgument" });
  }
  /**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @private
   */
  optionMissingArgument(option) {
    const message = `error: option '${option.flags}' argument missing`;
    this.error(message, { code: "commander.optionMissingArgument" });
  }
  /**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @private
   */
  missingMandatoryOptionValue(option) {
    const message = `error: required option '${option.flags}' not specified`;
    this.error(message, { code: "commander.missingMandatoryOptionValue" });
  }
  /**
   * `Option` conflicts with another option.
   *
   * @param {Option} option
   * @param {Option} conflictingOption
   * @private
   */
  _conflictingOption(option, conflictingOption) {
    const findBestOptionFromValue = (option2) => {
      const optionKey = option2.attributeName();
      const optionValue = this.getOptionValue(optionKey);
      const negativeOption = this.options.find(
        (target) => target.negate && optionKey === target.attributeName()
      );
      const positiveOption = this.options.find(
        (target) => !target.negate && optionKey === target.attributeName()
      );
      if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
        return negativeOption;
      }
      return positiveOption || option2;
    };
    const getErrorMessage = (option2) => {
      const bestOption = findBestOptionFromValue(option2);
      const optionKey = bestOption.attributeName();
      const source = this.getOptionValueSource(optionKey);
      if (source === "env") {
        return `environment variable '${bestOption.envVar}'`;
      }
      return `option '${bestOption.flags}'`;
    };
    const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
    this.error(message, { code: "commander.conflictingOption" });
  }
  /**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @private
   */
  unknownOption(flag) {
    if (this._allowUnknownOption) return;
    let suggestion = "";
    if (flag.startsWith("--") && this._showSuggestionAfterError) {
      let candidateFlags = [];
      let command = this;
      do {
        const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
        candidateFlags = candidateFlags.concat(moreFlags);
        command = command.parent;
      } while (command && !command._enablePositionalOptions);
      suggestion = suggestSimilar(flag, candidateFlags);
    }
    const message = `error: unknown option '${flag}'${suggestion}`;
    this.error(message, { code: "commander.unknownOption" });
  }
  /**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @private
   */
  _excessArguments(receivedArgs) {
    if (this._allowExcessArguments) return;
    const expected = this.registeredArguments.length;
    const s = expected === 1 ? "" : "s";
    const received = receivedArgs.length;
    const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
    const details = receivedArgs.join(", ");
    const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${received}: ${details}.`;
    this.error(message, { code: "commander.excessArguments" });
  }
  /**
   * Unknown command.
   *
   * @private
   */
  unknownCommand() {
    const unknownName = this.args[0];
    let suggestion = "";
    if (this._showSuggestionAfterError) {
      const candidateNames = [];
      this.createHelp().visibleCommands(this).forEach((command) => {
        candidateNames.push(command.name());
        if (command.alias()) candidateNames.push(command.alias());
      });
      suggestion = suggestSimilar(unknownName, candidateNames);
    }
    const message = `error: unknown command '${unknownName}'${suggestion}`;
    this.error(message, { code: "commander.unknownCommand" });
  }
  /**
   * Get or set the program version.
   *
   * This method auto-registers the "-V, --version" option which will print the version number.
   *
   * You can optionally supply the flags and description to override the defaults.
   *
   * @param {string} [str]
   * @param {string} [flags]
   * @param {string} [description]
   * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
   */
  version(str2, flags, description) {
    if (str2 === void 0) return this._version;
    this._version = str2;
    flags = flags || "-V, --version";
    description = description || "output the version number";
    const versionOption = this.createOption(flags, description);
    this._versionOptionName = versionOption.attributeName();
    this._registerOption(versionOption);
    this.on("option:" + versionOption.name(), () => {
      this._outputConfiguration.writeOut(`${str2}
`);
      this._exit(0, "commander.version", str2);
    });
    return this;
  }
  /**
   * Set the description.
   *
   * @param {string} [str]
   * @param {object} [argsDescription]
   * @return {(string|Command)}
   */
  description(str2, argsDescription) {
    if (str2 === void 0 && argsDescription === void 0)
      return this._description;
    this._description = str2;
    if (argsDescription) {
      this._argsDescription = argsDescription;
    }
    return this;
  }
  /**
   * Set the summary. Used when listed as subcommand of parent.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  summary(str2) {
    if (str2 === void 0) return this._summary;
    this._summary = str2;
    return this;
  }
  /**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {(string|Command)}
   */
  alias(alias) {
    if (alias === void 0) return this._aliases[0];
    let command = this;
    if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
      command = this.commands[this.commands.length - 1];
    }
    if (alias === command._name)
      throw new Error("Command alias can't be the same as its name");
    const matchingCommand = this.parent?._findCommand(alias);
    if (matchingCommand) {
      const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
      throw new Error(
        `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
      );
    }
    command._aliases.push(alias);
    return this;
  }
  /**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {(string[]|Command)}
   */
  aliases(aliases) {
    if (aliases === void 0) return this._aliases;
    aliases.forEach((alias) => this.alias(alias));
    return this;
  }
  /**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  usage(str2) {
    if (str2 === void 0) {
      if (this._usage) return this._usage;
      const args = this.registeredArguments.map((arg) => {
        return humanReadableArgName(arg);
      });
      return [].concat(
        this.options.length || this._helpOption !== null ? "[options]" : [],
        this.commands.length ? "[command]" : [],
        this.registeredArguments.length ? args : []
      ).join(" ");
    }
    this._usage = str2;
    return this;
  }
  /**
   * Get or set the name of the command.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  name(str2) {
    if (str2 === void 0) return this._name;
    this._name = str2;
    return this;
  }
  /**
   * Set/get the help group heading for this subcommand in parent command's help.
   *
   * @param {string} [heading]
   * @return {Command | string}
   */
  helpGroup(heading) {
    if (heading === void 0) return this._helpGroupHeading ?? "";
    this._helpGroupHeading = heading;
    return this;
  }
  /**
   * Set/get the default help group heading for subcommands added to this command.
   * (This does not override a group set directly on the subcommand using .helpGroup().)
   *
   * @example
   * program.commandsGroup('Development Commands:);
   * program.command('watch')...
   * program.command('lint')...
   * ...
   *
   * @param {string} [heading]
   * @returns {Command | string}
   */
  commandsGroup(heading) {
    if (heading === void 0) return this._defaultCommandGroup ?? "";
    this._defaultCommandGroup = heading;
    return this;
  }
  /**
   * Set/get the default help group heading for options added to this command.
   * (This does not override a group set directly on the option using .helpGroup().)
   *
   * @example
   * program
   *   .optionsGroup('Development Options:')
   *   .option('-d, --debug', 'output extra debugging')
   *   .option('-p, --profile', 'output profiling information')
   *
   * @param {string} [heading]
   * @returns {Command | string}
   */
  optionsGroup(heading) {
    if (heading === void 0) return this._defaultOptionGroup ?? "";
    this._defaultOptionGroup = heading;
    return this;
  }
  /**
   * @param {Option} option
   * @private
   */
  _initOptionGroup(option) {
    if (this._defaultOptionGroup && !option.helpGroupHeading)
      option.helpGroup(this._defaultOptionGroup);
  }
  /**
   * @param {Command} cmd
   * @private
   */
  _initCommandGroup(cmd) {
    if (this._defaultCommandGroup && !cmd.helpGroup())
      cmd.helpGroup(this._defaultCommandGroup);
  }
  /**
   * Set the name of the command from script filename, such as process.argv[1],
   * or import.meta.filename.
   *
   * (Used internally and public although not documented in README.)
   *
   * @example
   * program.nameFromFilename(import.meta.filename);
   *
   * @param {string} filename
   * @return {Command}
   */
  nameFromFilename(filename) {
    this._name = import_node_path.default.basename(filename, import_node_path.default.extname(filename));
    return this;
  }
  /**
   * Get or set the directory for searching for executable subcommands of this command.
   *
   * @example
   * program.executableDir(import.meta.dirname);
   * // or
   * program.executableDir('subcommands');
   *
   * @param {string} [path]
   * @return {(string|null|Command)}
   */
  executableDir(path7) {
    if (path7 === void 0) return this._executableDir;
    this._executableDir = path7;
    return this;
  }
  /**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */
  helpInformation(contextOptions) {
    const helper = this.createHelp();
    const context = this._getOutputContext(contextOptions);
    helper.prepareContext({
      error: context.error,
      helpWidth: context.helpWidth,
      outputHasColors: context.hasColors
    });
    const text = helper.formatHelp(this, helper);
    if (context.hasColors) return text;
    return this._outputConfiguration.stripColor(text);
  }
  /**
   * @typedef HelpContext
   * @type {object}
   * @property {boolean} error
   * @property {number} helpWidth
   * @property {boolean} hasColors
   * @property {function} write - includes stripColor if needed
   *
   * @returns {HelpContext}
   * @private
   */
  _getOutputContext(contextOptions) {
    contextOptions = contextOptions || {};
    const error = !!contextOptions.error;
    let baseWrite;
    let hasColors;
    let helpWidth;
    if (error) {
      baseWrite = (str2) => this._outputConfiguration.writeErr(str2);
      hasColors = this._outputConfiguration.getErrHasColors();
      helpWidth = this._outputConfiguration.getErrHelpWidth();
    } else {
      baseWrite = (str2) => this._outputConfiguration.writeOut(str2);
      hasColors = this._outputConfiguration.getOutHasColors();
      helpWidth = this._outputConfiguration.getOutHelpWidth();
    }
    const write = (str2) => {
      if (!hasColors) str2 = this._outputConfiguration.stripColor(str2);
      return baseWrite(str2);
    };
    return { error, write, hasColors, helpWidth };
  }
  /**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  outputHelp(contextOptions) {
    let deprecatedCallback;
    if (typeof contextOptions === "function") {
      deprecatedCallback = contextOptions;
      contextOptions = void 0;
    }
    const outputContext = this._getOutputContext(contextOptions);
    const eventContext = {
      error: outputContext.error,
      write: outputContext.write,
      command: this
    };
    this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
    this.emit("beforeHelp", eventContext);
    let helpInformation = this.helpInformation({ error: outputContext.error });
    if (deprecatedCallback) {
      helpInformation = deprecatedCallback(helpInformation);
      if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
        throw new Error("outputHelp callback must return a string or a Buffer");
      }
    }
    outputContext.write(helpInformation);
    if (this._getHelpOption()?.long) {
      this.emit(this._getHelpOption().long);
    }
    this.emit("afterHelp", eventContext);
    this._getCommandAndAncestors().forEach(
      (command) => command.emit("afterAllHelp", eventContext)
    );
  }
  /**
   * You can pass in flags and a description to customise the built-in help option.
   * Pass in false to disable the built-in help option.
   *
   * @example
   * program.helpOption('-?, --help' 'show help'); // customise
   * program.helpOption(false); // disable
   *
   * @param {(string | boolean)} flags
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */
  helpOption(flags, description) {
    if (typeof flags === "boolean") {
      if (flags) {
        if (this._helpOption === null) this._helpOption = void 0;
        if (this._defaultOptionGroup) {
          this._initOptionGroup(this._getHelpOption());
        }
      } else {
        this._helpOption = null;
      }
      return this;
    }
    this._helpOption = this.createOption(
      flags ?? "-h, --help",
      description ?? "display help for command"
    );
    if (flags || description) this._initOptionGroup(this._helpOption);
    return this;
  }
  /**
   * Lazy create help option.
   * Returns null if has been disabled with .helpOption(false).
   *
   * @returns {(Option | null)} the help option
   * @package
   */
  _getHelpOption() {
    if (this._helpOption === void 0) {
      this.helpOption(void 0, void 0);
    }
    return this._helpOption;
  }
  /**
   * Supply your own option to use for the built-in help option.
   * This is an alternative to using helpOption() to customise the flags and description etc.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addHelpOption(option) {
    this._helpOption = option;
    this._initOptionGroup(option);
    return this;
  }
  /**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  help(contextOptions) {
    this.outputHelp(contextOptions);
    let exitCode = Number(import_node_process.default.exitCode ?? 0);
    if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
      exitCode = 1;
    }
    this._exit(exitCode, "commander.help", "(outputHelp)");
  }
  /**
   * // Do a little typing to coordinate emit and listener for the help text events.
   * @typedef HelpTextEventContext
   * @type {object}
   * @property {boolean} error
   * @property {Command} command
   * @property {function} write
   */
  /**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {(string | Function)} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */
  addHelpText(position, text) {
    const allowedValues = ["beforeAll", "before", "after", "afterAll"];
    if (!allowedValues.includes(position)) {
      throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    const helpEvent = `${position}Help`;
    this.on(helpEvent, (context) => {
      let helpStr;
      if (typeof text === "function") {
        helpStr = text({ error: context.error, command: context.command });
      } else {
        helpStr = text;
      }
      if (helpStr) {
        context.write(`${helpStr}
`);
      }
    });
    return this;
  }
  /**
   * Output help information if help flags specified
   *
   * @param {Array} args - array of options to search for help flags
   * @private
   */
  _outputHelpIfRequested(args) {
    const helpOption = this._getHelpOption();
    const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
    if (helpRequested) {
      this.outputHelp();
      this._exit(0, "commander.helpDisplayed", "(outputHelp)");
    }
  }
};
function incrementNodeInspectorPort(args) {
  return args.map((arg) => {
    if (!arg.startsWith("--inspect")) {
      return arg;
    }
    let debugOption;
    let debugHost = "127.0.0.1";
    let debugPort = "9229";
    let match;
    if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
      debugOption = match[1];
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
      debugOption = match[1];
      if (/^\d+$/.test(match[3])) {
        debugPort = match[3];
      } else {
        debugHost = match[3];
      }
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      debugOption = match[1];
      debugHost = match[3];
      debugPort = match[4];
    }
    if (debugOption && debugPort !== "0") {
      return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
    }
    return arg;
  });
}
function useColor() {
  if (import_node_process.default.env.NO_COLOR || import_node_process.default.env.FORCE_COLOR === "0" || import_node_process.default.env.FORCE_COLOR === "false")
    return false;
  if (import_node_process.default.env.FORCE_COLOR || import_node_process.default.env.CLICOLOR_FORCE !== void 0)
    return true;
  return void 0;
}

// node_modules/commander/index.js
var program = new Command();

// src/index.ts
init_source();
init_schema();
init_paths();
init_agent();
init_registry();
var pkg = require_package();
var program2 = new Command();
program2.name("xyzai").description("XYZAI - AI Coding Assistant CLI").version(pkg.version);
program2.command("chat").description("Start interactive chat").action(async () => {
  ensureAllDirs();
  const { startTUI: startTUI2 } = await Promise.resolve().then(() => (init_app(), app_exports));
  startTUI2();
});
program2.command("run").description("Run a single prompt (headless mode)").argument("<prompt>", "The prompt to send").option("-m, --model <model>", "Model to use").option("-l, --language <lang>", "Language (en/fa)").action(async (prompt, options) => {
  ensureAllDirs();
  const config = loadConfig();
  if (options.model) config.model = options.model;
  if (options.language) config.language = options.language;
  const agent = new Agent(config);
  const toolRegistry = new ToolRegistry();
  console.log(source_default.cyan("\u{1F916} XYZAI"));
  console.log(source_default.gray("\u2500".repeat(40)));
  let output = "";
  const callbacks = {
    onThinking: () => {
      process.stdout.write(source_default.yellow("\u{1F914} Thinking...\r"));
    },
    onToken: (token) => {
      process.stdout.write(token);
    },
    onToolCall: (name, args) => {
      process.stdout.write(source_default.gray(`
\u{1F527} ${name}
`));
    },
    onToolResult: (name, result) => {
      if (result.error) {
        console.log(source_default.red(`\u274C ${result.error}`));
      }
    },
    onPermission: async () => true,
    onDone: (response) => {
      console.log("");
    },
    onError: (error) => {
      console.error(source_default.red(`
\u274C Error: ${error}`));
      process.exit(1);
    }
  };
  await agent.chat(prompt, callbacks);
  process.exit(0);
});
program2.command("config").description("Manage configuration").option("-g, --get <key>", "Get config value").option("-s, --set <key> <value>", "Set config value").option("-l, --list", "List all config").action((options) => {
  ensureAllDirs();
  const config = loadConfig();
  if (options.list) {
    console.log(source_default.cyan("XYZAI Configuration:"));
    console.log(JSON.stringify(config, null, 2));
    return;
  }
  if (options.get) {
    const value = config[options.get];
    console.log(value !== void 0 ? JSON.stringify(value) : "Not set");
    return;
  }
  console.log(source_default.gray("Use --list, --get <key>, or --set <key> <value>"));
});
program2.command("models").description("List available models").action(() => {
  ensureAllDirs();
  const config = loadConfig();
  console.log(source_default.cyan("Available Models:"));
  console.log(source_default.gray("\u2500".repeat(40)));
  for (const provider of config.providers) {
    console.log(source_default.green(`
${provider.name}:`));
    for (const [id, model] of Object.entries(provider.models)) {
      const freeTag = model.free ? source_default.green(" (FREE)") : "";
      console.log(source_default.white(`  ${provider.id}/${id} - ${model.name}${freeTag}`));
    }
  }
});
program2.command("sessions").description("List recent sessions").action(() => {
  ensureAllDirs();
  const { SessionManager: SessionManager2 } = (init_session(), __toCommonJS(session_exports));
  const sm = new SessionManager2();
  const sessions = sm.list();
  if (sessions.length === 0) {
    console.log(source_default.gray("No sessions found."));
    return;
  }
  console.log(source_default.cyan("Recent Sessions:"));
  for (const session of sessions.slice(0, 10)) {
    const date = new Date(session.updated).toLocaleString();
    console.log(source_default.white(`  ${session.id} - ${session.model} - ${date}`));
  }
});
program2.command("lang").description("Change language").argument("[language]", "Language code (en/fa)").action((language) => {
  ensureAllDirs();
  const config = loadConfig();
  if (!language) {
    console.log(source_default.cyan(`Current language: ${config.language}`));
    console.log(source_default.gray("Usage: xyzai lang <en|fa>"));
    return;
  }
  if (language !== "en" && language !== "fa") {
    console.log(source_default.red('Language must be "en" or "fa"'));
    return;
  }
  config.language = language;
  saveConfig(config);
  console.log(source_default.green(`Language changed to ${language === "fa" ? "\u0641\u0627\u0631\u0633\u06CC" : "English"}`));
});
program2.action(() => {
  ensureAllDirs();
  const { startTUI: startTUI2 } = (init_app(), __toCommonJS(app_exports));
  startTUI2();
});
program2.parse();
