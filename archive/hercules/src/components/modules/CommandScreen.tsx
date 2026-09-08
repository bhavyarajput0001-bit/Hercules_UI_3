'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Volume2, VolumeX, Trash2, Copy, Terminal, Zap, Bot, Sparkles, ArrowUpRight, ChevronUp, ChevronDown, Settings, Loader2 } from 'lucide-react';
import { useAppStore, useChatHistory, useVoiceState, useHerculesState } from '@/store';
import { HologramCore } from '@/components/hologram/HologramCore';
import clsx from 'clsx';

const commandSuggestions = [
  'Create a new agent for code review',
  'Analyze system performance metrics',
  'Generate a workflow for CI/CD',
  'Search memory for "project alpha"',
  'Show me active tasks',
  'Create a new department',
  'Run system diagnostics',
  'Export current session',
];

export function CommandScreen() {
  const chatHistory = useChatHistory();
  const voiceState = useVoiceState();
  const herculesState = useHerculesState();
  const { sendMessage, setVoiceState, setHerculesState, clearChatHistory } = useAppStore();
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hologramExpanded, setHologramExpanded] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isComposing) return;
    sendMessage(input);
    setInput('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (showSuggestions && commandSuggestions[selectedSuggestion]) {
        setInput(commandSuggestions[selectedSuggestion]);
        handleSubmit(e);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion(prev => Math.min(prev + 1, commandSuggestions.length - 1));
    } else if (e.key === 'ArrowUp' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestion(0);
    inputRef.current?.style.setProperty('--textarea-height', 'auto');
    inputRef.current?.style.setProperty('--textarea-height', `${Math.min(inputRef.current.scrollHeight, 160)}px`);
  };

  const handleVoiceToggle = () => {
    if (voiceState.state === 'idle') {
      setVoiceState({ state: 'listening', transcript: '', audioLevel: 0.5 });
      setHerculesState('listening');
    } else if (voiceState.state === 'listening') {
      setVoiceState({ state: 'processing' });
      setHerculesState('thinking');
    }
  };

  const filteredSuggestions = commandSuggestions.filter(s =>
    s.toLowerCase().includes(input.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="command-screen h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden relative">
        <div className={clsx(
          'w-full md:w-1/2 h-full transition-all duration-500 ease-out-expo',
          hologramExpanded ? 'w-full' : 'md:w-1/2'
        )}>
          <div className="relative h-full">
            <HologramCore
              presetId={useAppStore.getState().selectedHologram}
              state={voiceState.state}
              audioLevel={voiceState.audioLevel}
              className="w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none flex flex-col">
              <div className="flex-1 flex items-center justify-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center max-w-md glass px-6 py-8 rounded-2xl border border-hercules-border/50"
                >
                  <Zap className="w-16 h-16 mx-auto text-hercules-primary/50 mb-4" />
                  <h2 className="font-display font-bold text-heading-xl text-hercules-text mb-2">HERCULES</h2>
                  <p className="text-body text-hercules-text-muted mb-6">AI Operating System Command Center</p>
                  <div className="flex items-center justify-center gap-4 text-caption text-hercules-text-dim">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-hercules-success" />
                      Systems nominal
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-hercules-primary animate-pulse" />
                      {voiceState.state === 'idle' ? 'Awaiting command' : voiceState.state.charAt(0).toUpperCase() + voiceState.state.slice(1)}
                    </span>
                  </div>
                </motion.div>
              </div>
              <div className="p-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHologramExpanded(!hologramExpanded)}
                  className="mx-auto w-full md:w-auto px-4 py-2 rounded-xl glass border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors flex items-center justify-center gap-2"
                >
                  {hologramExpanded ? (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      <span>Minimize Hologram</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      <span>Expand Hologram</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(
          'w-full md:w-1/2 h-full flex flex-col',
          hologramExpanded ? 'absolute inset-0 z-10 bg-hercules-background/95 backdrop-blur-xl' : 'relative'
        )}>
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="font-display font-bold text-heading-lg text-hercules-text">Command Interface</h1>
                  <p className="text-body-sm text-hercules-text-muted">Natural language command & control</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={clsx('status-dot', herculesState === 'idle' ? 'status-idle' : herculesState === 'listening' ? 'status-active' : herculesState === 'thinking' ? 'status-processing' : 'status-idle')} />
                  <span className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim">{herculesState.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim">⌘Enter</span>
                <span className="text-caption text-hercules-text-dim">Execute</span>
                <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim ml-2">↑↓</span>
                <span className="text-caption text-hercules-text-dim">History</span>
                <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim ml-2">Esc</span>
                <span className="text-caption text-hercules-text-dim">Clear</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={chatHistory.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
                role="log"
                aria-live="polite"
                aria-label="Command history"
              >
                {chatHistory.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-hercules-primary/20 to-hercules-secondary/20 flex items-center justify-center mb-6"
                    >
                      <Zap className="w-12 h-12 text-hercules-primary/50" />
                    </motion.div>
                    <h3 className="font-display font-medium text-heading-md text-hercules-text mb-2">Ready for Commands</h3>
                    <p className="text-body text-hercules-text-muted mb-8 max-w-sm">
                      Type a command below or use voice input. HERCULES can spawn agents, run workflows, query memory, and control system operations.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
                      {commandSuggestions.slice(0, 6).map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setInput(suggestion); handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
                          className="px-4 py-2 rounded-xl glass border border-hercules-border/50 hover:border-hercules-primary/30 text-body-sm text-hercules-text transition-colors"
                          style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  chatHistory.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={clsx('flex gap-3', message.role === 'user' ? 'flex-row-reverse' : '')}
                    >
                      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', message.role === 'user' ? 'bg-hercules-primary/20' : 'bg-hercules-success/20')}>
                        {message.role === 'user' ? (
                          <Terminal className="w-5 h-5 text-hercules-primary" />
                        ) : (
                          <Bot className="w-5 h-5 text-hercules-success" />
                        )}
                      </div>
                      <div className={clsx('flex-1 max-w-[calc(100%-80px)]', message.role === 'user' ? 'text-right' : '')}>
                        <div className={clsx('inline-block max-w-[80%] p-4 rounded-2xl', message.role === 'user' ? 'bg-hercules-primary/15 border border-hercules-primary/30 text-hercules-text' : 'bg-hercules-surface-elevated/50 border border-hercules-border/50 text-hercules-text')}>
                          <p className="text-body-sm whitespace-pre-wrap break-words">{message.content}</p>
                          {message.metadata && (
                            <div className="mt-2 flex items-center gap-2 text-micro text-hercules-text-dim">
                              <span>{message.metadata.model}</span>
                              <span>•</span>
                              <span>{message.metadata.tokens} tokens</span>
                              <span>•</span>
                              <span>{message.metadata.duration}ms</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 justify-end">
                          <span className="text-micro text-hercules-text-dim">{message.timestamp}</span>
                          <button className="p-1 rounded-lg hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Copy message">
                            <Copy className="w-4 h-4 text-hercules-text-dim" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            </AnimatePresence>

            {chatHistory.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={clearChatHistory}
                className="mx-4 md:mx-6 mb-4 px-4 py-2 rounded-xl glass border border-hercules-border/50 hover:border-hercules-error/50 text-hercules-error text-body-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </motion.button>
            )}

            <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-hercules-border/30 flex-shrink-0">
              <div className="relative">
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 right-0 mb-2 dropdown z-10 max-h-60 overflow-y-auto"
                      role="listbox"
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          onClick={() => { setInput(suggestion); handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
                          className={clsx(
                            'dropdown-item w-full justify-start px-4 py-3',
                            selectedSuggestion === index && 'bg-hercules-primary/10 text-hercules-primary'
                          )}
                          role="option"
                          aria-selected={selectedSuggestion === index}
                        >
                          <Sparkles className="w-4 h-4 mr-3 text-hercules-primary" />
                          <span className="text-body-sm">{suggestion}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                      onFocus={() => setShowSuggestions(input.length > 0)}
                      placeholder={voiceState.state === 'listening' ? 'Listening...' : 'Type a command or ask anything...'}
                      rows={1}
                      className={clsx(
                        'command-textarea w-full',
                        'bg-hercules-surface-elevated/50 border border-hercules-border/50',
                        'rounded-2xl px-4 py-3 pr-16',
                        'text-hercules-text placeholder:text-hercules-text-dim',
                        'focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20',
                        'resize-none transition-all duration-200',
                        'font-body text-body-sm',
                        'max-h-[160px] min-h-[48px]'
                      )}
                      style={{
                        height: 'auto',
                        minHeight: '48px',
                        maxHeight: '160px',
                      }}
                      aria-label="Command input"
                      spellCheck={false}
                    />
                    <div className="absolute right-3 bottom-3 flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleVoiceToggle}
                        disabled={voiceState.state === 'processing' || voiceState.state === 'speaking'}
                        className={clsx(
                          'p-2 rounded-xl transition-colors',
                          voiceState.state === 'listening' ? 'bg-hercules-primary/20 text-hercules-primary' : 'glass hover:bg-hercules-surface-elevated/50 text-hercules-text-muted'
                        )}
                        aria-label={voiceState.state === 'listening' ? 'Stop listening' : 'Start voice input'}
                        aria-pressed={voiceState.state === 'listening'}
                      >
                        {voiceState.state === 'listening' ? (
                          <Volume2 className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSubmit}
                        disabled={!input.trim() || isComposing}
                        className={clsx(
                          'p-2 rounded-xl transition-colors',
                          input.trim() ? 'bg-hercules-primary text-hercules-background' : 'glass text-hercules-text-dim'
                        )}
                        aria-label="Send command"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {voiceState.state === 'listening' && voiceState.transcript && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-caption text-hercules-primary flex items-center gap-1"
                  >
                    <Mic className="w-3 h-3 animate-pulse" />
                    <span>"{voiceState.transcript}"</span>
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}