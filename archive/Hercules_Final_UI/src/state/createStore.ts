/**
 * HERCULES · micro store
 * A ~70-line Zustand-shaped store built on useSyncExternalStore: selector
 * based subscriptions, stable equality, zero dependencies. Screens subscribe
 * to slices (`store.use(s => s.tasks)`) and everything else is a plain read.
 */
import { useCallback, useRef, useSyncExternalStore } from 'react';

export interface Store<T extends object> {
  get(): T;
  set(patch: Partial<T> | ((state: T) => Partial<T>)): void;
  subscribe(listener: () => void): () => void;
  use<S>(selector: (state: T) => S, isEqual?: (a: S, b: S) => boolean): S;
}

export function createStore<T extends object>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<() => void>();

  const get = (): T => state;

  const set = (patch: Partial<T> | ((s: T) => Partial<T>)) => {
    const next = typeof patch === 'function' ? patch(state) : patch;
    let changed = false;
    for (const k of Object.keys(next) as (keyof T)[]) {
      if (!Object.is(state[k], next[k])) {
        changed = true;
        break;
      }
    }
    if (!changed) return;
    state = { ...state, ...next };
    for (const l of [...listeners]) l();
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const use = <S,>(selector: (s: T) => S, isEqual: (a: S, b: S) => boolean = Object.is): S => {
    const cache = useRef<{ state: T; value: S } | null>(null);

    const read = useCallback(() => {
      const prev = cache.current;
      if (prev && prev.state === state) return prev.value;
      const value = selector(state);
      if (prev && isEqual(prev.value, value)) {
        cache.current = { state, value: prev.value };
        return prev.value;
      }
      cache.current = { state, value };
      return value;
      // selector/isEqual are stable by construction in this app
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector, isEqual]);

    const subscribeToStore = useCallback((onStoreChange: () => void) => subscribe(onStoreChange), []);

    return useSyncExternalStore(subscribeToStore, read, read);
  };

  return { get, set, subscribe, use };
}

/** Bind an external emitter (service bus) into React state without a store. */
export function useExternalValue<A>(read: () => A, subscribe: (push: () => void) => () => void) {
  return useSyncExternalStore(
    useCallback((cb: () => void) => subscribe(() => cb()), [subscribe]),
    read,
    read,
  );
}
