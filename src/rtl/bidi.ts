// Unicode Bidirectional Algorithm support for Persian/Arabic text

const RTL_CHARS = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LTR_CHARS = /[\u0000-\u007F\u0080-\u00BF\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/;

export function detectDirection(text: string): 'rtl' | 'ltr' | 'mixed' {
  let rtlCount = 0;
  let ltrCount = 0;

  for (const char of text) {
    if (RTL_CHARS.test(char)) rtlCount++;
    else if (LTR_CHARS.test(char)) ltrCount++;
  }

  if (rtlCount > ltrCount * 2) return 'rtl';
  if (ltrCount > rtlCount * 2) return 'ltr';
  if (rtlCount > 0 && ltrCount > 0) return 'mixed';
  return 'ltr';
}

export function containsRTL(text: string): boolean {
  return RTL_CHARS.test(text);
}

// Wrap RTL text for terminal display
export function wrapRTL(text: string): string {
  if (!containsRTL(text)) return text;

  const lines = text.split('\n');
  return lines.map(line => {
    const dir = detectDirection(line);
    if (dir === 'rtl') {
      // For pure RTL, we add RTL mark to ensure correct rendering
      return '\u200F' + line;
    }
    if (dir === 'mixed') {
      // For mixed text, wrap each segment
      return line;
    }
    return line;
  }).join('\n');
}

// Process markdown-like text for RTL support
export function processRTLText(text: string): string {
  // Split by newlines and process each line
  const lines = text.split('\n');
  const processed = lines.map(line => {
    // If line is empty, return as-is
    if (!line.trim()) return line;

    // Detect if line has code blocks or inline code
    const hasCode = /`[^`]+`/.test(line) || /^#{1,6}\s/.test(line);

    if (hasCode) {
      // For code lines, keep as-is
      return line;
    }

    const dir = detectDirection(line);
    if (dir === 'rtl') {
      return '\u200F' + line + '\u200E';
    }
    return line;
  });

  return processed.join('\n');
}

// Split text into segments of same direction
export function splitByDirection(text: string): Array<{ text: string; dir: 'rtl' | 'ltr' }> {
  const segments: Array<{ text: string; dir: 'rtl' | 'ltr' }> = [];
  let current = '';
  let currentDir: 'rtl' | 'ltr' = 'ltr';

  for (const char of text) {
    const charDir = RTL_CHARS.test(char) ? 'rtl' : 'ltr';
    if (charDir !== currentDir && current.length > 0) {
      segments.push({ text: current, dir: currentDir });
      current = '';
    }
    current += char;
    currentDir = charDir;
  }

  if (current.length > 0) {
    segments.push({ text: current, dir: currentDir });
  }

  return segments;
}
