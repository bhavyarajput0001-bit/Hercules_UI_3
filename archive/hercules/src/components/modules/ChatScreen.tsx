'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Volume2, VolumeX, Trash2, Copy, MessageSquare, Bot, Sparkles, Loader2, Search, FileText, Image, Code, Globe, Settings, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useAppStore, useChatHistory, useVoiceState, useHerculesState, useAgents } from '@/store';
import clsx from 'clsx';

const quickPrompts = [
  'Explain quantum computing in simple terms',
  'Write a Python function for fibonacci sequence',
  'Help me debug this React component',
  'Summarize the latest AI research papers',
  'Create a workout plan for beginners',
  'Translate this text to Spanish',
];

export function ChatScreen() {
  const chatHistory = useChatHistory();
  const voiceState = useVoiceState();
  const herculesState = useHerculesState();
  const agents = useAgents();
  const { sendMessage, setVoiceState, setHerculesState, clearChatHistory, setCurrentAgent } = useAppStore();
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [showAgentPicker, setShowAgentPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isComposing) return;
    sendMessage(input, selectedAgent || undefined);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setShowAgentPicker(false);
      setShowAttachMenu(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    inputRef.current?.style.setProperty('height', 'auto');
    inputRef.current?.style.setProperty('height', `${Math.min(inputRef.current.scrollHeight, 160)}px`);
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

  const availableAgents = agents.filter(a => a.status !== 'error');

  return (
    <div className="chat-screen h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display font-bold text-heading-lg text-hercules-text">Chat</h1>
              <p className="text-body-sm text-hercules-text-muted">Conversational AI with agent specialization</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={clsx('status-dot', herculesState === 'idle' ? 'status-idle' : herculesState === 'listening' ? 'status-active' : herculesState === 'thinking' ? 'status-processing' : herculesState === 'speaking' ? 'status-active' : 'status-idle')} />
              <span className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim">{herculesState.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim">⌘Enter</span>
            <span className="text-caption text-hercules-text-dim">Send</span>
            <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim ml-2">⌘⇧C</span>
            <span className="text-caption text-hercules-text-dim">Clear</span>
            <span className="px-2 py-1 text-micro font-mono bg-hercules-surface-elevated rounded text-hercules-text-dim ml-2">Esc</span>
            <span className="text-caption text-hercules-text-dim">Close menus</span>
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
            aria-label="Chat history"
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
                  <MessageSquare className="w-12 h-12 text-hercules-primary/50" />
                </motion.div>
                <h3 className="font-display font-medium text-heading-md text-hercules-text mb-2">Start a Conversation</h3>
                <p className="text-body text-hercules-text-muted mb-8 max-w-sm">
                  Chat with HERCULES or select a specialized agent for focused assistance. Agents have specific expertise and can maintain context across conversations.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mb-8">
                  {quickPrompts.slice(0, 4).map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setInput(prompt); handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
                      className="px-4 py-2 rounded-xl glass border border-hercules-border/50 hover:border-hercules-primary/30 text-body-sm text-hercules-text transition-colors"
                      style={{ transitionDelay: `${index * 0.05}s` }}
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 text-caption text-hercules-text-dim">
                  <button className="flex items-center gap-1 hover:text-hercules-text transition-colors" onClick={() => setShowAgentPicker(true)}>
                    <Bot className="w-4 h-4" />
                    <span>Select Agent</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-hercules-text transition-colors" onClick={() => setShowAttachMenu(true)}>
                    <FileText className="w-4 h-4" />
                    <span>Attach</span>
                  </button>
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
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    message.role === 'user' ? 'bg-hercules-primary/20' :
                    message.role === 'assistant' ? 'bg-hercules-success/20' :
                    'bg-hercules-warning/20'
                  )}>
                    {message.role === 'user' ? (
                      <FileText className="w-5 h-5 text-hercules-primary" />
                    ) : message.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-hercules-success" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-hercules-warning" />
                    )}
                  </div>
                  <div className={clsx('flex-1 max-w-[calc(100%-80px)]', message.role === 'user' ? 'text-right' : '')}>
                    <div className={clsx('inline-block max-w-[85%] p-4 rounded-2xl',
                      message.role === 'user' ? 'bg-hercules-primary/15 border border-hercules-primary/30 text-hercules-text' :
                      message.role === 'assistant' ? 'bg-hercules-surface-elevated/50 border border-hercules-border/50 text-hercules-text' :
                      'bg-hercules-warning/10 border border-hercules-warning/30 text-hercules-text'
                    )}>
                      {message.metadata?.agentName && message.role === 'assistant' && (
                        <div className="flex items-center gap-1 mb-1 text-micro font-medium text-hercules-primary">
                          <Bot className="w-3 h-3" />
                          <span>{message.metadata.agentName}</span>
                        </div>
                      )}
                      <p className="text-body-sm whitespace-pre-wrap break-words">{message.content}</p>
                      {message.metadata && (
                        <div className="mt-2 flex items-center gap-2 text-micro text-hercules-text-dim">
                          {message.metadata.model && <span>{message.metadata.model}</span>}
                          {message.metadata.model && <span>•</span>}
                          {message.metadata.tokens && <span>{message.metadata.tokens} tokens</span>}
                          {message.metadata.tokens && <span>•</span>}
                          {message.metadata.duration && <span>{message.metadata.duration}ms</span>}
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
            Clear Conversation
          </motion.button>
        )}

        <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-hercules-border/30 flex-shrink-0">
          <div className="relative">
            <div className="flex items-end gap-2">
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAgentPicker(!showAgentPicker)}
                  className={clsx(
                    'p-2 rounded-xl transition-colors',
                    selectedAgent ? 'bg-hercules-primary/20 text-hercules-primary' : 'glass hover:bg-hercules-surface-elevated/50 text-hercules-text-muted'
                  )}
                  aria-label="Select agent"
                  aria-expanded={showAgentPicker}
                  aria-haspopup="menu"
                >
                  <Bot className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors text-hercules-text-muted"
                  aria-label="Attach file"
                  aria-expanded={showAttachMenu}
                  aria-haspopup="menu"
                >
                  <FileText className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  placeholder={voiceState.state === 'listening' ? 'Listening...' : 'Message HERCULES...'}
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
                  aria-label="Chat input"
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
                    {voiceState.state === 'listening' ? <Volume2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
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
                    aria-label="Send message"
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

            <AnimatePresence>
              {showAgentPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 dropdown z-10 max-h-80 overflow-y-auto"
                  role="menu"
                >
                  <button
                    onClick={() => { setSelectedAgent(null); setShowAgentPicker(false); }}
                    className={clsx('dropdown-item w-full justify-start', !selectedAgent && 'bg-hercules-primary/10 text-hercules-primary')}
                    role="menuitem"
                    aria-selected={!selectedAgent}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-hercules-primary/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-hercules-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-body-sm text-hercules-text">HERCULES (Default)</p>
                        <p className="text-caption text-hercules-text-dim">General purpose assistant</p>
                      </div>
                    </div>
                  </button>
                  <div className="dropdown-divider" />
                  {availableAgents.map(agent => (
                    <button
                      key={agent.id}
                      onClick={() => { setSelectedAgent(agent.id); setCurrentAgent(agent.id); setShowAgentPicker(false); }}
                      className={clsx('dropdown-item w-full justify-start', selectedAgent === agent.id && 'bg-hercules-primary/10 text-hercules-primary')}
                      role="menuitem"
                      aria-selected={selectedAgent === agent.id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-hercules-success/20 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-hercules-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-body-sm text-hercules-text truncate">{agent.name}</p>
                          <p className="text-caption text-hercules-text-dim truncate">{agent.role} • {agent.model}</p>
                        </div>
                        <span className={clsx('badge badge-sm', agent.status === 'active' ? 'badge-success' : 'badge-neutral')}>
                          {agent.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 dropdown z-10"
                  role="menu"
                >
                  <button className="dropdown-item" role="menuitem">
                    <Image className="w-4 h-4" />
                    Upload Image
                  </button>
                  <button className="dropdown-item" role="menuitem">
                    <FileText className="w-4 h-4" />
                    Upload Document
                  </button>
                  <button className="dropdown-item" role="menuitem">
                    <Code className="w-4 h-4" />
                    Share Code Snippet
                  </button>
                  <button className="dropdown-item" role="menuitem">
                    <Globe className="w-4 h-4" />
                    Share Link
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}