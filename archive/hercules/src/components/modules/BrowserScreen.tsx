'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Search, ChevronLeft, ChevronRight, RefreshCw, Home, Menu, X, Maximize2, Minimize2, Shield, Settings, Link2, Download, Bookmark, Star, History, Trash2, MoreVertical, NewTab } from 'lucide-react';
import { useAppStore } from '@/store';
import clsx from 'clsx';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

const DEFAULT_TABS: Tab[] = [
  { id: '1', title: 'New Tab', url: 'about:blank', favicon: '', loading: false, canGoBack: false, canGoForward: false },
];

export function BrowserScreen() {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeTabId, setActiveTabId] = useState('1');
  const [url, setUrl] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [bookmarks, setBookmarks] = useState<Array<{ title: string; url: string }>>([]);
  const [history, setHistory] = useState<Array<{ title: string; url: string; time: Date }>>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId);

  useEffect(() => {
    if (activeTab && iframeRef.current) {
      if (activeTab.url !== 'about:blank' && !activeTab.url.startsWith('chrome://')) {
        setUrl(activeTab.url);
      } else {
        setUrl('');
      }
    }
  }, [activeTab]);

  const addTab = () => {
    const newTab: Tab = { id: Date.now().toString(), title: 'New Tab', url: 'about:blank', favicon: '', loading: false, canGoBack: false, canGoForward: false };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(prev => prev.filter(t => t.id !== id));
    if (activeTabId === id) {
      const remaining = tabs.filter(t => t.id !== id);
      if (remaining.length > 0) setActiveTabId(remaining[remaining.length - 1].id);
      else addTab();
    }
  };

  const navigate = (newUrl: string) => {
    if (!newUrl.trim()) return;
    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('chrome://') && !formattedUrl.startsWith('about:')) {
      if (formattedUrl.includes('.') && !formattedUrl.includes(' ')) {
        formattedUrl = 'https://' + formattedUrl;
      } else {
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}`;
      }
    }
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: formattedUrl, loading: true, title: 'Loading...' } : t));
    setUrl(formattedUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') navigate(url);
  };

  const goBack = () => { if (iframeRef.current) iframeRef.current.contentWindow?.history.back(); };
  const goForward = () => { if (iframeRef.current) iframeRef.current.contentWindow?.history.forward(); };
  const reload = () => { setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, loading: true } : t)); iframeRef.current?.contentWindow?.location.reload(); };

  const addBookmark = () => {
    if (activeTab && activeTab.url !== 'about:blank') {
      setBookmarks(prev => [...prev, { title: activeTab.title, url: activeTab.url }]);
    }
  };

  const bookmarksList = [
    { title: 'GitHub', url: 'https://github.com' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { title: 'React Docs', url: 'https://react.dev' },
    { title: 'Vercel', url: 'https://vercel.com' },
  ];

  const historyList = [
    { title: 'Google', url: 'https://google.com', time: new Date(Date.now() - 3600000) },
    { title: 'GitHub', url: 'https://github.com', time: new Date(Date.now() - 7200000) },
    { title: 'MDN', url: 'https://developer.mozilla.org', time: new Date(Date.now() - 10800000) },
  ];

  return (
    <div className="browser-screen h-full w-full flex flex-col bg-hercules-background">
      <div className="browser-toolbar h-11 flex items-center gap-2 px-3 bg-hercules-surface/60 backdrop-blur-2xl border-b border-hercules-border/50">
        <div className="flex items-center gap-1">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goBack} disabled={!activeTab?.canGoBack} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors opacity-50" aria-label="Back"><ChevronLeft className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goForward} disabled={!activeTab?.canGoForward} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors opacity-50" aria-label="Forward"><ChevronRight className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={reload} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Reload"><RefreshCw className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate('https://google.com')} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Home"><Home className="w-4 h-4" /></motion.button>
        </div>

        <div className="flex-1 max-w-3xl relative">
          <div className="glass rounded-xl border border-hercules-border/50 focus-within:border-hercules-primary/30 transition-colors">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter address"
              className="w-full px-4 py-2 bg-transparent border-none outline-none text-hercules-text placeholder:text-hercules-text-dim text-body-sm"
              spellCheck={false}
            />
            {activeTab?.loading && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw className="w-4 h-4 text-hercules-primary" /></motion.div>}
            <Shield className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-hercules-success" title="Secure connection" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={addBookmark} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Bookmark"><Star className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowBookmarks(!showBookmarks)} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Bookmarks"><Bookmark className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowHistory(!showHistory)} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="History"><History className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={addTab} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="New Tab"><Plus className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Menu"><MoreVertical className="w-4 h-4" /></motion.button>
        </div>
      </div>

      <div className="browser-tabs h-9 flex items-end px-2 border-b border-hercules-border/30 bg-hercules-surface/30 backdrop-blur-xl">
        <div className="flex-1 flex items-end gap-1 min-w-0 overflow-x-auto pb-1" role="tablist">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => setActiveTabId(tab.id)}
              className={clsx(
                'tab flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg min-w-[120px] max-w-[200px] transition-colors',
                activeTabId === tab.id
                  ? 'bg-hercules-surface-elevated border-b-2 border-hercules-primary text-hercules-text'
                  : 'bg-hercules-surface/50 text-hercules-text-muted hover:bg-hercules-surface-elevated/50'
              )}
              role="tab"
              aria-selected={activeTabId === tab.id}
            >
              {tab.favicon ? (
                <img src={tab.favicon} alt="" className="w-4 h-4 rounded" />
              ) : (
                <Globe className="w-4 h-4 text-hercules-text-dim" />
              )}
              <span className="truncate text-body-sm">{tab.title}</span>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={e => closeTab(tab.id, e)}
                className="p-1 rounded hover:bg-hercules-error/20 text-hercules-error opacity-0 group-hover:opacity-100"
                aria-label="Close tab"
              >
                <X className="w-3 h-3" />
              </motion.button>
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addTab}
            className="tab flex items-center justify-center w-8 h-7 rounded-t-lg bg-hercules-surface/50 hover:bg-hercules-surface-elevated/50 text-hercules-text-muted"
            aria-label="New tab"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {activeTab && (
          <iframe
            ref={iframeRef}
            src={activeTab.url}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-presentation"
            allow="accelerometer; camera; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => {
              setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, loading: false, title: iframeRef.current?.contentDocument?.title || t.url } : t));
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {showBookmarks && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-11 right-4 z-dropdown w-72 glass rounded-xl border border-hercules-border/50 shadow-xl p-2"
            role="menu"
          >
            <div className="px-2 py-1 text-caption font-medium uppercase tracking-wider text-hercules-text-dim">Bookmarks</div>
            {bookmarksList.map(bm => (
              <button key={bm.url} onClick={() => navigate(bm.url)} className="dropdown-item w-full justify-start flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="truncate">{bm.title}</span>
              </button>
            ))}
            <div className="dropdown-divider" />
            {bookmarks.map(bm => (
              <button key={bm.url} onClick={() => navigate(bm.url)} className="dropdown-item w-full justify-start flex items-center gap-2">
                <Star className="w-4 h-4 fill-current text-hercules-warning" />
                <span className="truncate">{bm.title}</span>
              </button>
            ))}
            {bookmarks.length === 0 && bookmarksList.length === 0 && (
              <div className="px-3 py-4 text-center text-hercules-text-dim text-body-sm">No bookmarks yet</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-11 right-48 z-dropdown w-80 glass rounded-xl border border-hercules-border/50 shadow-xl p-2"
            role="menu"
          >
            <div className="px-2 py-1 text-caption font-medium uppercase tracking-wider text-hercules-text-dim">History</div>
            {historyList.map(h => (
              <button key={h.url} onClick={() => navigate(h.url)} className="dropdown-item w-full justify-start flex flex-col items-start gap-1">
                <span className="truncate w-full font-medium">{h.title}</span>
                <span className="text-micro text-hercules-text-dim w-full truncate">{h.url}</span>
                <span className="text-micro text-hercules-text-dim">{h.time.toLocaleString()}</span>
              </button>
            ))}
            {historyList.length === 0 && (
              <div className="px-3 py-4 text-center text-hercules-text-dim text-body-sm">No history</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}