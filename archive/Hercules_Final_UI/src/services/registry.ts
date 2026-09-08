/**
 * HERCULES · service registry
 * ---------------------------------------------------------------------------
 * THE integration boundary. The rest of the app imports `mockServices` (or
 * better: `useServices()`) and never learns which transport is in play.
 *
 * To go live with a real backend:
 *   1. set VITE_HERCULES_TRANSPORT=http (or ws/ipc) and VITE_HERCULES_API_BASE
 *   2. make sure that transport implements the same contract
 *   3. done — no component changes, no data shape changes.
 */
import type { HerculesServices } from './contracts';
import { createMockServices } from './mock';
import { createHttpServices, readTransportConfig } from './http';

type EnvLike = Record<string, string | undefined>;
const env: EnvLike = (import.meta as unknown as { env?: EnvLike }).env ?? {};

export type TransportName = 'mock' | 'http' | 'ws' | 'ipc';

const requested = (env.VITE_HERCULES_TRANSPORT ?? 'mock') as TransportName;

function build(): { services: HerculesServices; transport: TransportName; note: string } {
  if (requested !== 'mock' && env.VITE_HERCULES_API_BASE) {
    try {
      return {
        services: createHttpServices(readTransportConfig()),
        transport: requested,
        note: `${requested} transport → ${env.VITE_HERCULES_API_BASE}`,
      };
    } catch (error) {
      // Never white-screen on a bad transport config: fall back loudly.
      const message = error instanceof Error ? error.message : String(error);
      console.error('[HERCULES] transport init failed, falling back to mock:', message);
      return { services: createMockServices(), transport: 'mock', note: `transport error → mock (${message})` };
    }
  }
  return {
    services: createMockServices(),
    transport: 'mock',
    note: env.VITE_HERCULES_API_BASE ? 'api base set but transport=mock → mock in use' : 'mock services · zero-backend demo mode',
  };
}

const built = build();

/** Singleton used by the store. Prefer `useServices()` inside components. */
export const mockServices = built.services;
export const activeTransport = built.transport;
export const transportNote = built.note;

export function useServices(): HerculesServices {
  return mockServices;
}
