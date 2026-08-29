/**
 * Tiny typed event bus shared by every mock service so state changes fan out
 * to the store exactly like a real backend push channel would.
 */
import type { Unsubscribe } from '@/services/contracts';

export function createBus<E>() {
  const listeners = new Set<(event: E) => void>();
  return {
    subscribe(listener: (event: E) => void): Unsubscribe {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    emit(event: E) {
      for (const l of [...listeners]) l(event);
    },
    get size() {
      return listeners.size;
    },
  };
}

/** A repeatable heartbeat that services use to advance simulated state. */
export function createTicker(intervalMs: number, fn: (tick: number) => void) {
  let handle: number | undefined;
  let tick = 0;
  return {
    start() {
      if (handle != null) return;
      handle = window.setInterval(() => fn(tick++), intervalMs);
    },
    stop() {
      if (handle != null) window.clearInterval(handle);
      handle = undefined;
    },
    get running() {
      return handle != null;
    },
  };
}
