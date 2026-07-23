import * as fs from 'fs';
import * as path from 'path';
import { getDataDir, ensureDir } from '../utils/paths';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  messages: Message[];
  model: string;
  created: number;
  updated: number;
}

export class SessionManager {
  private sessionsDir: string;

  constructor() {
    this.sessionsDir = path.join(getDataDir(), 'sessions');
    ensureDir(this.sessionsDir);
  }

  private getSessionPath(id: string): string {
    return path.join(this.sessionsDir, `${id}.json`);
  }

  create(model: string): Session {
    const session: Session = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      messages: [],
      model,
      created: Date.now(),
      updated: Date.now(),
    };
    this.save(session);
    return session;
  }

  save(session: Session): void {
    session.updated = Date.now();
    const filePath = this.getSessionPath(session.id);
    fs.writeFileSync(filePath, JSON.stringify(session, null, 2), 'utf-8');
  }

  load(id: string): Session | null {
    const filePath = this.getSessionPath(id);
    if (!fs.existsSync(filePath)) return null;
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  list(): Session[] {
    const files = fs.readdirSync(this.sessionsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
      const data = fs.readFileSync(path.join(this.sessionsDir, f), 'utf-8');
      return JSON.parse(data);
    }).sort((a, b) => b.updated - a.updated);
  }

  addMessage(session: Session, role: Message['role'], content: string): void {
    session.messages.push({
      role,
      content,
      timestamp: Date.now(),
    });
    this.save(session);
  }

  clearMessages(session: Session): void {
    session.messages = [];
    this.save(session);
  }
}
