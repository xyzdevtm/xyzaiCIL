export function minimatch(str: string, pattern: string): boolean {
  // Simple glob matching for permission patterns
  if (pattern === '*') return true;

  const regex = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '<<GLOBSTAR>>')
    .replace(/\*/g, '[^/]*')
    .replace(/<<GLOBSTAR>>/g, '.*')
    .replace(/\?/g, '[^/]');

  return new RegExp(`^${regex}$`).test(str);
}
