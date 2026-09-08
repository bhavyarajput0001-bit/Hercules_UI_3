/**
 * HERCULES · core service (mock)
 */
import type { CoreService } from '@/services/contracts';
import type { CoreState } from '@/types/domain';
import { bootSequence, coreBus, holdState, logCore, recomputeVitals, setState, startWorld, stopWorld, world } from './runtime';
import { clamp } from './helpers';

export const mockCore: CoreService = {
  onCoreEvent: coreBus,
  get phase() {
    return world.phase;
  },
  get vitals() {
    return { ...world.vitals };
  },
  holdState(state: CoreState, owner: string) {
    return holdState(state, owner);
  },
  async boot() {
    world.phase = 'booting';
    setState('updating');
    for await (const line of bootSequence()) logCore('info', 'boot', line);
    world.phase = 'calibrating';
    setState('thinking');
    await new Promise((r) => setTimeout(r, 260));
    world.phase = 'online';
    startWorld();
    recomputeVitals();
    setState('idle');
    logCore('success', 'core', 'HERCULES online · all subsystems nominal');
  },
  async shutdown() {
    stopWorld();
    world.phase = 'cold';
    setState('dormant');
    world.vitals.energy = clamp(world.vitals.energy * 0.2, 0.05, 1);
    coreBus.emit({ type: 'vitals', vitals: { ...world.vitals } });
    logCore('warn', 'core', 'Core stood down · agents parked · state preserved');
  },
  async reconfigure() {
    setState('thinking');
    await new Promise((r) => setTimeout(r, 320));
    recomputeVitals();
    logCore('info', 'core', 'Configuration applied live · no restart required');
  },
};
