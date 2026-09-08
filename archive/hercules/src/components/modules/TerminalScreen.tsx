'use client';

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TermIcon, Plus, X, ChevronDown, Copy, Trash2, Maximize2, Minimize2, Search, Filter, Settings, Zap, Square, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { useAppStore } from '@/store';
import clsx from 'clsx';

interface TerminalSession {
  id: string;
  title: string;
  cwd: string;
  history: TerminalLine[];
  process?: string;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

export function TerminalScreen() {
  const [sessions, setSessions] = useState<TerminalSession[]>([
    { id: '1', title: 'Terminal', cwd: '~', history: [{ type: 'system', content: 'Welcome to HERCULES Terminal', timestamp: new Date() }] },
  ]);
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(13);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  useEffect(() => {
    inputRef.current?.focus();
    terminalRef.current?.scrollTop = terminalRef.current.scrollHeight;
  }, [activeSession?.history.length, activeSessionId]);

  const addSession = () => {
    const newSession: TerminalSession = {
      id: Date.now().toString(),
      title: `Terminal ${sessions.length + 1}`,
      cwd: '~',
      history: [{ type: 'system', content: `Session started at ${new Date().toLocaleTimeString()}`, timestamp: new Date() }],
    };
    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const closeSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) return;
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setActiveSessionId(remaining[remaining.length - 1].id);
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    const newHistory = [...(activeSession?.history || []), { type: 'input', content: `$ ${cmd}`, timestamp: new Date() }];
    let output = '';
    let type: TerminalLine['type'] = 'output';

    try {
      output = processCommand(cmd.trim());
    } catch (err) {
      output = `Error: ${err}`;
      type = 'error';
    }

    if (output) {
      newHistory.push({ type, content: output, timestamp: new Date() });
    }

    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, history: newHistory } : s));
    setCommandHistory(prev => [cmd, ...prev.slice(0, 99)]);
    setHistoryIndex(-1);
    setInput('');
  };

  const processCommand = (cmd: string): string => {
    const [command, ...args] = cmd.split(' ');

    switch (command) {
      case 'help':
        return `Available commands:
  help          - Show this help
  clear         - Clear terminal
  ls [path]     - List directory contents
  cd <path>     - Change directory
  pwd           - Print working directory
  echo <text>   - Print text
  date          - Show current date/time
  whoami        - Show current user
  ps            - List processes
  kill <pid>    - Kill process
  cat <file>    - Show file contents
  mkdir <dir>   - Create directory
  touch <file>  - Create empty file
  rm <file>     - Remove file
  history       - Show command history
  alias         - Show aliases
  env           - Show environment variables
  top           - Show system resources
  neofetch      - Show system info
  matrix        - Matrix rain animation
  cowsay <msg>  - Cow says message
  fortune       - Random fortune
  weather <city> - Show weather (demo)`;

      case 'clear':
        setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, history: [{ type: 'system', content: 'Terminal cleared', timestamp: new Date() }] } : s));
        return '';

      case 'ls':
        return `total 24
drwxr-xr-x  2 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x  3 user user 4096 Jan 10 14:22 Projects
drwxr-xr-x  5 user user 4096 Jan 12 09:15 Downloads
-rw-r--r--  1 user user  245 Jan 14 16:30 README.md
-rw-r--r--  1 user user 1024 Jan 13 11:22 config.json
-rwxr-xr-x  1 user user  512 Jan 11 13:45 script.sh`;

      case 'cd':
        if (args[0]) {
          setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, cwd: args[0] } : s));
          return '';
        }
        setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, cwd: '~' } : s));
        return '';

      case 'pwd':
        return activeSession?.cwd || '~';

      case 'echo':
        return args.join(' ');

      case 'date':
        return new Date().toString();

      case 'whoami':
        return 'commander@hercules';

      case 'ps':
        return `  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
  1234 pts/0    00:00:01 node
  5678 pts/0    00:00:00 python3
  9012 pts/0    00:00:02 hercules-daemon`;

      case 'history':
        return commandHistory.map((c, i) => `  ${commandHistory.length - i}  ${c}`).join('\n') || 'No history';

      case 'env':
        return `HOME=/home/commander
USER=commander
SHELL=/bin/bash
TERM=xterm-256color
PATH=/usr/local/bin:/usr/bin:/bin
HERCULES_VERSION=1.0.0`;

      case 'neofetch':
        return `                   -/:://::-                  commander@hercules
                 /::::::::::::/                  OS: Hercules AI OS 1.0
              /::::::::::::::::/                 Kernel: Linux 6.8.0
             /::::::::::::::::::/                Uptime: 3 days, 4 hours
            /:::::::/::::::::::/                 Packages: 1247 (npm), 89 (pip)
           /::::::/  /::::::::/                  Shell: bash 5.2
          /:::::/    /:::::::/                   Resolution: 1920x1080
         /::::/      /::::::/                    DE: Hercules Shell
        /:::/        /:::::/                     WM: Custom
       /:/            /:::/                      Theme: Cyberpunk Neon
                 /:::/                           CPU: AMD Ryzen 9 7950X
                /:/                             GPU: NVIDIA RTX 4090
                   /:/                          Memory: 64GB DDR5
                  /:/                           Disk: 2TB NVMe
                 /:/                            /::::::::::::::
                /:/                            /:::::::::::::::
               /:/                            /::::::::::::::::
              /:/                            /:::::::::::::::::
             /:/                            /::::::::::::::::::
            /:/                            /:::::::::::::::::::`;

      case 'matrix':
        return 'Matrix animation would run here. Use Ctrl+C to stop.';

      case 'cowsay':
        return ` _____________________
< ${args.join(' ') || 'Moo!'} >
 ---------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

      case 'fortune':
        const fortunes = [
          'A bug in the code is worth two in the documentation.',
          'The best code is no code at all.',
          'Talk is cheap. Show me the code. - Linus Torvalds',
          'Code never lies, comments sometimes do.',
          'First, solve the problem. Then, write the code.',
          'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];

      case 'weather':
        return `Weather for ${args.join(' ') || 'San Francisco'}:
  Temperature: 22°C (72°F)
  Condition: Sunny
  Humidity: 45%
  Wind: 12 km/h NW
  Forecast: Clear skies through the week`;

      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const commands = ['help', 'clear', 'ls', 'cd', 'pwd', 'echo', 'date', 'whoami', 'ps', 'kill', 'cat', 'mkdir', 'touch', 'rm', 'history', 'alias', 'env', 'top', 'neofetch', 'matrix', 'cowsay', 'fortune', 'weather'];
      const matches = commands.filter(c => c.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, history: [...s.history, { type: 'output', content: matches.join('  '), timestamp: new Date() }] } : s));
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      executeCommand('clear');
    } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setInput('');
      setHistoryIndex(-1);
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, history: [...s.history, { type: 'system', content: '^C', timestamp: new Date() }] } : s));
    }
  };

  return (
    <div className="terminal-screen h-full w-full flex flex-col bg-hercules-background">
      <div className="terminal-header h-10 flex items-center gap-2 px-3 bg-hercules-surface/60 backdrop-blur-2xl border-b border-hercules-border/50">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-hercules-error/80" />
          <span className="w-3 h-3 rounded-full bg-hercules-warning/80" />
          <span className="w-3 h-3 rounded-full bg-hercules-success/80" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-caption font-mono text-hercules-text-dim">{activeSession?.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={addSession} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50" aria-label="New session"><Plus className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowSearch(!showSearch)} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50" aria-label="Search"><Search className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50" aria-label="Settings"><Settings className="w-4 h-4" /></motion.button>
        </div>
      </div>

      <div className="terminal-tabs h-8 flex items-end px-2 border-b border-hercules-border/30 bg-hercules-surface/30 backdrop-blur-xl">
        <div className="flex-1 flex items-end gap-1 min-w-0 overflow-x-auto pb-1" role="tablist">
          {sessions.map((session, index) => (
            <motion.button
              key={session.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => setActiveSessionId(session.id)}
              className={clsx(
                'tab flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg min-w-[100px] max-w-[180px] transition-colors',
                activeSessionId === session.id
                  ? 'bg-hercules-surface-elevated border-b-2 border-hercules-primary text-hercules-text'
                  : 'bg-hercules-surface/50 text-hercules-text-muted hover:bg-hercules-surface-elevated/50'
              )}
              role="tab"
              aria-selected={activeSessionId === session.id}
            >
              <TermIcon className="w-4 h-4" />
              <span className="truncate text-body-sm">{session.title}</span>
              {sessions.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={e => closeSession(session.id, e)}
                  className="p-1 rounded hover:bg-hercules-error/20 text-hercules-error opacity-0 group-hover:opacity-100"
                  aria-label="Close session"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addSession}
            className="tab flex items-center justify-center w-8 h-7 rounded-t-lg bg-hercules-surface/50 hover:bg-hercules-surface-elevated/50 text-hercules-text-muted"
            aria-label="New session"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.6', fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
        >
          {activeSession?.history.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                'terminal-line',
                line.type === 'input' && 'text-hercules-primary',
                line.type === 'output' && 'text-hercules-text',
                line.type === 'error' && 'text-hercules-error',
                line.type === 'system' && 'text-hercules-text-dim italic'
              )}
            >
              {line.content.split('\n').map((l, i) => (
                <div key={i} className="whitespace-pre-wrap">{l}</div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="terminal-input-line flex items-center gap-2 px-4 py-3 border-t border-hercules-border/30 bg-hercules-surface/50 backdrop-blur-xl">
          <span className="text-hercules-primary font-mono text-sm">{activeSession?.cwd || '~'}</span>
          <span className="text-hercules-primary font-mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-hercules-text font-mono text-sm"
            style={{ fontSize: `${fontSize}px` }}
            spellCheck={false}
            autoComplete="off"
          />
          <span className="terminal-cursor inline-block w-4 h-4 bg-hercules-primary animate-pulse" />
        </div>

        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 border-t border-hercules-border/30 bg-hercules-surface/50 backdrop-blur-xl flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-hercules-text-dim" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search terminal output..."
              className="flex-1 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-lg px-3 py-1.5 text-hercules-text placeholder:text-hercules-text-dim text-sm outline-none"
            />
            <button onClick={() => setShowSearch(false)} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </div>
    </div>
  );
}