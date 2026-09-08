'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Wifi, WifiOff, Bluetooth, BluetoothOff, Music, Mic, Monitor, Smartphone, MoreHorizontal, Heart } from 'lucide-react';
import { useAppStore, useMediaState } from '@/store';
import clsx from 'clsx';

export function BottomBar() {
  const mediaState = useMediaState();
  const { controlMedia } = useAppStore();

  const progress = mediaState.duration > 0 ? (mediaState.currentTime / mediaState.duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sourceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    spotify: Music,
    'apple-music': Music,
    youtube: Monitor,
    system: Mic,
    local: Music,
    other: Music,
  };

  const SourceIcon = mediaState.source ? sourceIcons[mediaState.source.type] || Music : Music;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      className="media-player fixed bottom-0 left-0 right-0 z-fixed h-20"
      role="region"
      aria-label="Media player"
    >
      <div className="w-full h-full flex items-center justify-between px-4 md:px-8 gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex items-center gap-3 p-1 glass rounded-xl border border-hercules-border/50">
            <Wifi className={clsx('w-5 h-5', 'text-hercules-success')} />
            <Bluetooth className="w-5 h-5 text-hercules-text-dim" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => controlMedia(mediaState.playing ? 'pause' : 'play')}
            className="flex-shrink-0 relative w-14 h-14 rounded-xl glass-elevated border border-hercules-border/50 flex items-center justify-center transition-all duration-200"
            aria-label={mediaState.playing ? 'Pause' : 'Play'}
            aria-pressed={mediaState.playing}
          >
            <motion.div
              animate={{ scale: mediaState.playing ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {mediaState.playing ? (
                <Pause className="w-6 h-6 text-hercules-text" />
              ) : (
                <Play className="w-6 h-6 text-hercules-text ml-1" />
              )}
            </motion.div>
            <AnimatePresence>
              {mediaState.playing && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 rounded-xl border border-hercules-primary/50"
                />
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex items-center gap-3 min-w-0 flex-1 max-w-md">
            <motion.div
              className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.08 }}
            >
              {mediaState.artwork ? (
                <img
                  src={mediaState.artwork}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-hercules-primary/30 to-hercules-secondary/30 flex items-center justify-center">
                  <Music className="w-6 h-6 text-hercules-primary/50" />
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-hercules-background/80 backdrop-blur-sm flex items-center justify-center border border-hercules-border/50">
                <SourceIcon className="w-2.5 h-2.5 text-hercules-text" />
              </div>
            </motion.div>

            <div className="min-w-0 flex-1">
              <motion.p
                key={mediaState.title}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-body-sm font-medium text-hercules-text truncate"
              >
                {mediaState.title || 'Nothing Playing'}
              </motion.p>
              <motion.p
                key={mediaState.artist}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-caption text-hercules-text-muted truncate"
              >
                {mediaState.artist || mediaState.source?.name || 'No source'}
              </motion.p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 min-w-0 flex-1 max-w-md justify-center">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => controlMedia('previous')}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5 text-hercules-text" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => controlMedia(mediaState.playing ? 'pause' : 'play')}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label={mediaState.playing ? 'Pause' : 'Play'}
            >
              {mediaState.playing ? <Pause className="w-5 h-5 text-hercules-text" /> : <Play className="w-5 h-5 text-hercules-text" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => controlMedia('next')}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5 text-hercules-text" />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-caption font-mono tabular-nums text-hercules-text-muted">
            <span>{formatTime(mediaState.currentTime)}</span>
            <div className="w-32 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden relative" style={{ minWidth: 80 }}>
              <motion.div
                className="progress-fill h-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span>{formatTime(mediaState.duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => controlMedia('volume', mediaState.muted ? 0.7 : 0)}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label={mediaState.muted ? 'Unmute' : 'Mute'}
              aria-pressed={mediaState.muted}
            >
              {mediaState.muted || mediaState.volume === 0 ? (
                <VolumeX className="w-5 h-5 text-hercules-text-muted" />
              ) : (
                <Volume2 className="w-5 h-5 text-hercules-text" />
              )}
            </motion.button>

            <div className="w-24 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="progress-fill h-full"
                style={{ width: `${mediaState.volume * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${mediaState.volume * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 ml-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label="Shuffle"
              aria-pressed={mediaState.shuffle}
            >
              <MoreHorizontal className={clsx('w-4 h-4', mediaState.shuffle ? 'text-hercules-primary' : 'text-hercules-text-muted')} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
              aria-label={`Repeat: ${mediaState.repeat}`}
              aria-pressed={mediaState.repeat !== 'off'}
            >
              <Heart className={clsx('w-4 h-4', mediaState.repeat !== 'off' ? 'text-hercules-primary fill-current' : 'text-hercules-text-muted')} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}