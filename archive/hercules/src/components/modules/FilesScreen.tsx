'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, FolderOpen, Image, Video, Music, Code, Archive, Globe, ChevronLeft, ChevronRight, Home, RefreshCw } from 'lucide-react';
import { useAppStore, useFiles } from '@/store';
import clsx from 'clsx';

const typeOptions = ['all', 'document', 'image', 'video', 'audio', 'code', 'archive', 'other'] as const;
const sortOptions = ['name', 'size', 'type', 'modified', 'created'] as const;
const viewModes = ['grid', 'list'] as const;

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  parentId: string | null;
  modifiedAt: string;
  createdAt: string;
  thumbnail?: string;
}

export function FilesScreen() {
  const files = useFiles();
  const { openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'document' | 'image' | 'video' | 'audio' | 'code' | 'archive' | 'other'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'type' | 'modified' | 'created'>('modified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([{ name: 'Home', path: '/' }]);

  const filteredFiles = useMemo(() => {
    let result = files.filter(file => file.parentId === (currentPath === '/' ? null : currentPath));
    if (searchQuery) {
      result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (typeFilter !== 'all') {
      result = result.filter(f => f.type === typeFilter);
    }
    result.sort((a, b) => {
      let aVal: string | number | Date = '';
      let bVal: string | number | Date = '';
      switch (sortBy) {
        case 'name': aVal = a.name; bVal = b.name; break;
        case 'size': aVal = a.size; bVal = b.size; break;
        case 'type': aVal = a.type; bVal = b.type; break;
        case 'modified': aVal = new Date(a.modifiedAt); bVal = new Date(b.modifiedAt); break;
        case 'created': aVal = new Date(a.createdAt); bVal = new Date(b.createdAt); break;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return result;
  }, [files, searchQuery, typeFilter, sortBy, sortOrder, currentPath]);

  const fileStats = useMemo(() => ({
    total: files.length,
    documents: files.filter(f => f.type === 'document').length,
    images: files.filter(f => f.type === 'image').length,
    code: files.filter(f => f.type === 'code').length,
    totalSize: files.reduce((sum, f) => sum + f.size, 0),
  }), [files]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const getFileIcon = (type: string, name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      case 'code': return Code;
      case 'archive': return Archive;
      default:
        if (['js', 'ts', 'jsx', 'tsx', 'py', 'rs', 'go', 'json', 'html', 'css'].includes(ext || '')) return Code;
        if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext || '')) return Image;
        if (['mp4', 'webm', 'mov'].includes(ext || '')) return Video;
        if (['mp3', 'wav', 'flac', 'ogg'].includes(ext || '')) return Music;
        if (['zip', 'tar', 'gz', 'rar', '7z'].includes(ext || '')) return Archive;
        if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext || '')) return FileText;
        return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-hercules-info';
      case 'image': return 'text-hercules-success';
      case 'video': return 'text-hercules-warning';
      case 'audio': return 'text-hercules-accent';
      case 'code': return 'text-hercules-primary';
      case 'archive': return 'text-hercules-text-dim';
      default: return 'text-hercules-text';
    }
  };

  const navigateTo = (path: string, name: string) => {
    setCurrentPath(path);
    const newBreadcrumbs = [...breadcrumbs.filter(b => b.path !== path && !path.startsWith(b.path + '/')), { name, path }];
    if (path === '/') {
      setBreadcrumbs([{ name: 'Home', path: '/' }]);
    } else {
      const parts = path.split('/').filter(Boolean);
      const newCrumbs = [{ name: 'Home', path: '/' }];
      let current = '';
      parts.forEach((part, i) => {
        current += '/' + part;
        newCrumbs.push({ name: part, path: current });
      });
      setBreadcrumbs(newCrumbs);
    }
  };

  const goUp = () => {
    if (currentPath !== '/') {
      const parent = currentPath.split('/').slice(0, -1).join('/') || '/';
      navigateTo(parent, '..');
    }
  };

  return (
    <div className="files-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goUp} disabled={currentPath === '/'} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors opacity-50" aria-label="Go up"><ChevronLeft className="w-5 h-5" /></motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigateTo('/', 'Home')} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Go home"><Home className="w-5 h-5" /></motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors" aria-label="Refresh"><RefreshCw className="w-5 h-5" /></motion.button>
            <div className="flex items-center gap-1 ml-2">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.path} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-4 h-4 text-hercules-text-dim" />}
                  <button onClick={() => navigateTo(crumb.path, crumb.name)} className={clsx('text-body-sm px-2 py-1 rounded', crumb.path === currentPath ? 'text-hercules-text font-medium' : 'text-hercules-text-dim hover:text-hercules-text')}>{crumb.name}</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'files', action: 'upload' })} className="btn-primary flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'files', action: 'new-folder' })} className="btn-secondary flex items-center gap-2"><FolderOpen className="w-4 h-4" /> New Folder</motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search files..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1).replace(/([A-Z])/g, ' $1')}</option>)}
            </select>
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">{sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              {viewModes.map(mode => (<button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>{mode === 'grid' && <Grid className="w-5 h-5" />}{mode === 'list' && <List className="w-5 h-5" />}</button>))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="File statistics">
          <StatCard label="Total" value={fileStats.total} icon=FileText color="text-hercules-text" />
          <StatCard label="Documents" value={fileStats.documents} icon=FileText color="text-hercules-info" />
          <StatCard label="Images" value={fileStats.images} icon=Image color="text-hercules-success" />
          <StatCard label="Code" value={fileStats.code} icon=Code color="text-hercules-primary" />
          <StatCard label="Total Size" value={formatSize(fileStats.totalSize)} icon=Database color="text-hercules-accent" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filteredFiles.map((file, index) => (
                  <motion.div key={file.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.02, duration: 0.2 }}>
                    <FileGridItem file={file} icon={getFileIcon(file.type, file.name)} color={getFileColor(file.type)} formatSize={formatSize} onClick={() => setSelectedFile(file.id)} onOpen={() => { if (file.type === 'folder') navigateTo(file.path, file.name); }} />
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
                <div className="grid grid-cols-[40px_1fr_120px_150px_150px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30">
                  <div></div><div>Name</div><div>Size</div><div>Type</div><div>Modified</div><div>Actions</div>
                </div>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredFiles.map((file, index) => (
                    <motion.div key={file.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="grid grid-cols-[40px_1fr_120px_150px_150px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30 transition-colors">
                      <input type="checkbox" className="rounded border-hercules-border" />
                      <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={() => { if (file.type === 'folder') navigateTo(file.path, file.name); }}>
                        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', `bg-hercules-${getFileColor(file.type).replace('text-', '')}/20`)}><getFileIcon(file.type, file.name) className={clsx('w-5 h-5', getFileColor(file.type))} /></div>
                        <div className="min-w-0"><p className="font-medium text-body-sm text-hercules-text truncate">{file.name}</p><p className="text-caption text-hercules-text-dim truncate">{file.path}</p></div>
                      </div>
                      <span className="text-body-sm text-hercules-text-dim font-mono">{formatSize(file.size)}</span>
                      <span className="badge badge-sm badge-neutral text-micro">{file.type}</span>
                      <span className="text-caption text-hercules-text-dim">{new Date(file.modifiedAt).toLocaleString()}</span>
                      <div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50"><Download className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => openModal('settings', { section: 'files', action: 'delete', id: file.id })}><Trash2 className="w-4 h-4" /></button></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredFiles.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center">
            <FolderOpen className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No files found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedFile && (
          <FilePreviewModal file={files.find(f => f.id === selectedFile)} onClose={() => setSelectedFile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>;
}

function FileGridItem({ file, icon: Icon, color, formatSize, onClick, onOpen }: { file: FileItem; icon: React.ComponentType<{ className?: string }>; color: string; formatSize: (bytes: number) => string; onClick: () => void; onOpen: () => void }) {
  const isFolder = file.type === 'folder' || file.name.endsWith('/');
  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick} onDoubleClick={onOpen} className="glass p-3 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-all h-full flex flex-col">
      <div className={clsx('w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3', isFolder ? 'bg-hercules-primary/15' : `bg-hercules-${color.replace('text-', '')}/15`)}><Icon className={clsx('w-8 h-8', isFolder ? 'text-hercules-primary' : color)} /></div>
      <p className="font-medium text-body-sm text-hercules-text truncate text-center">{file.name}</p>
      <p className="text-caption text-hercules-text-dim text-center">{isFolder ? 'Folder' : formatSize(file.size)}</p>
      <p className="text-micro text-hercules-text-dim text-center mt-auto">{new Date(file.modifiedAt).toLocaleDateString()}</p>
    </motion.button>
  );
}

function FilePreviewModal({ file, onClose }: { file: FileItem | undefined; onClose: () => void }) {
  if (!file) return null;
  return <Modal type="settings" data={{ section: 'files' }} onClose={onClose}><div className="p-6 max-w-2xl"><div className="flex items-center justify-between mb-6"><h2 className="text-heading-lg font-semibold text-hercules-text">{file.name}</h2><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button></div><div className="space-y-4"><div className="grid grid-cols-2 gap-4 text-caption text-hercules-text-dim"><div><span className="block text-hercules-text-dim">Path</span><span className="font-mono truncate">{file.path}</span></div><div><span className="block text-hercules-text-dim">Size</span><span>{formatSize(file.size)}</span></div><div><span className="block text-hercules-text-dim">Type</span><span>{file.type}</span></div><div><span className="block text-hercules-text-dim">Modified</span><span>{new Date(file.modifiedAt).toLocaleString()}</span></div></div></div></div></Modal>;
}

import { Database, Grid, List, ChevronUp, FolderOpen, Image, Video, Music, Code, Archive, Globe, Home, RefreshCw } from 'lucide-react';