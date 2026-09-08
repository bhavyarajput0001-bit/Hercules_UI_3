/**
 * HERCULES · mock transport
 * ---------------------------------------------------------------------------
 * Assembles the full `HerculesServices` object from simulated implementations.
 * This is the single swap point: `createMockServices()` and
 * `createHttpServices()` have the same return type, so the app cannot tell
 * them apart.
 */
import type { HerculesServices } from '@/services/contracts';
import type { Persona } from '@/types/domain';
import { mockCore } from './core';
import { mockAi, mockBrain } from './ai';
import { mockAgents, mockDepartments, mockProjects, mockTasks } from './agents';
import { mockMemory } from './memory';
import { mockFiles } from './files';
import { mockActivity, mockAnalytics, mockMedia, mockNotifications, mockPermissions, mockSettings, mockSystem, mockVoice } from './system';
import { mockAutomation, mockBrowser, mockKnowledge, mockTerminal } from './knowledge';

export const mockPersona: Persona = {
  name: 'HERCULES',
  callsign: 'HERC-01',
  pronouns: 'it/its',
  preset: 'chief-of-staff',
  initiative: 0.78,
  verbosity: 0.34,
  wit: 0.42,
  caution: 0.66,
  formality: 'terse',
  avatarHue: 190,
};

export function createMockServices(): HerculesServices {
  return {
    core: mockCore,
    ai: mockAi,
    brain: mockBrain,
    agents: mockAgents,
    departments: mockDepartments,
    tasks: mockTasks,
    projects: mockProjects,
    memory: mockMemory,
    files: mockFiles,
    knowledge: mockKnowledge,
    automation: mockAutomation,
    browser: mockBrowser,
    terminal: mockTerminal,
    system: mockSystem,
    analytics: mockAnalytics,
    activity: mockActivity,
    notifications: mockNotifications,
    settings: mockSettings,
    permissions: mockPermissions,
    media: mockMedia,
    voice: mockVoice,
    persona: mockPersona,
    transport: 'mock',
    dispose() {
      /* mock singletons keep their world; a real transport closes its socket here */
    },
  };
}
