/**
 * HERCULES · data hooks
 * useAsync is the only way screens read services: it handles loading, error,
 * refetch, subscription-driven invalidation (`rev`) and cancellation.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { store } from '@/state/hercules';

export interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refresh: () => void;
  setData: (updater: T | ((prev: T | null) => T)) => void;
}

export function useAsync<T>(loader: () => Promise<T>, keys: (string | number)[] = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const alive = useRef(true);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const run = useCallback(() => {
    setLoading(true);
    setError(null);
    loaderRef
      .current()
      .then((value) => {
        if (!alive.current) return;
        setData(value);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (!alive.current) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    alive.current = true;
    run();
    return () => {
      alive.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...keys, run]);

  const update = useCallback((updater: T | ((prev: T | null) => T)) => {
    setData((prev) => (typeof updater === 'function' ? (updater as (p: T | null) => T)(prev) : updater));
  }, []);

  return { data, error, loading, refresh: run, setData: update };
}

/** Watch a store revision counter and return it, for dependency arrays. */
export function useRev(...keys: string[]) {
  return store.use((s) => keys.map((k) => s.rev[k] ?? 0).join(':'));
}

/** Simple debounced value, used by every search field in the app. */
export function useDebounced<T>(value: T, ms = 220) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return v;
}

/** Ticking clock for relative timestamps / uptime. */
export function useNow(intervalMs = 1_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return now;
}

/** Drag-and-drop file intake for the Files screen. Spread `bind` on the
 *  drop target and attach `ref` to whatever should highlight. */
export function useDropZone<E extends HTMLElement = HTMLElement>(
  onDrop?: (files: { name: string; size: number }[]) => void,
) {
  const [active, setActive] = useState(false);
  const depth = useRef(0);
  const ref = useRef<E | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = el.dataset.dropzone ?? '';
    el.dataset.dropzone = '1';
    return () => {
      el.dataset.dropzone = prev;
    };
  }, []);

  const bind = {
    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault();
      depth.current += 1;
      setActive(true);
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    },
    onDragLeave: (e: React.DragEvent) => {
      e.preventDefault();
      depth.current = Math.max(0, depth.current - 1);
      if (!depth.current) setActive(false);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      depth.current = 0;
      setActive(false);
      const files = Array.from(e.dataTransfer?.files ?? []).map((f) => ({ name: f.name, size: f.size }));
      if (files.length && onDrop) onDrop(files);
    },
  };

  return { active, bind, ref };
}
