import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

export function getConfigDir(): string {
  return path.join(os.homedir(), '.config', 'xyzai');
}

export function getDataDir(): string {
  return path.join(os.homedir(), '.local', 'share', 'xyzai');
}

export function getStateDir(): string {
  return path.join(os.homedir(), '.local', 'state', 'xyzai');
}

export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function ensureAllDirs(): void {
  ensureDir(getConfigDir());
  ensureDir(getDataDir());
  ensureDir(getStateDir());
  ensureDir(path.join(getDataDir(), 'sessions'));
  ensureDir(path.join(getDataDir(), 'memory'));
}
