# Live team board

Updated: 2026-09-08

## Active task

Hologram design families: integrate the Ultron orb (from `~/Downloads/ai_os/ultron_hologram/`)
as the default Hercules orb, add pinch-gesture tracking, and build THREE distinct
orb design families — ULTRON (amber forge), NEXUS (cyan panel), AEGIS (violet
sentinel) — individually previewable on localhost as standalone mockups, plus a
common switcher UI in Hercules to flip between them live.

## Ownership

| Task | Owner | Files | Status | Check |
| --- | --- | --- | --- | --- |
| Team bootstrap | Antigravity | `.agent-team/*`, `AGENTS.md` | ready | relay blocked by workspace storage; local dispatcher available |
| Hologram design families | Hermes | `src/hologram/*`, `src/screens/CoreScreen.tsx`, `src/screens/SettingsScreen.tsx`, `src/types/domain.ts`, `src/services/mock/system.ts`, `src/theme/bridge.ts`, `src/styles/screens.css`, `holo-mockups/*` | **done** | `npx tsc --noEmit` clean; all 3 designs render in both apps |

## Event log

Append one short line per handoff. Keep this file human-readable so it can be
watched live in VS Code.

- 2026-09-07 Antigravity: collaboration protocol created; awaiting task.
- 2026-09-07 Antigravity: Relay broker startup reached the local binary but failed Relaycast initialization with `Workspace storage temporarily unavailable`.
- 2026-09-08 Hermes: fixed broken `export { useHologram }` re-export in OrbHologram.tsx (blank-screen bug); app boots.
- 2026-09-08 Hermes: claimed hologram design-families task.
- 2026-09-08 Hermes: wired `hologramDesign` through domain types, defaults (`orb`/`ultron`), OrbHologram `design` prop, design options into orbScene (bloom/aberration/surge/spin), HologramDesignSwitcher UI on Core screen and Settings. tsc clean.
- 2026-09-08 Hermes: built `holo-mockups/` standalone Vite app (individual /ultron /nexus /aegis pages + studio switcher) reusing the Hercules orb engine.
- 2026-09-08 Hermes: added structural variant geometry per design (designVariants.ts):
  - ULTRON: original dense wireframe sphere + cross meridians + spiral core
  - NEXUS: geodesic icosahedron shell + shield arcs + dodecahedron core + energy conduits
  - AEGIS: torus-knot wireframe + octahedron skeleton + crystalline shards + particle nebula
- 2026-09-08 Hermes: verified both apps render all 3 designs (Hercules at :5173, mockups at :5199). TypeScript clean.
- 2026-09-08 opencode: finished the Brain feature wiring that left the build broken — fixed `mockBrain.run` return type (AsyncIterable, no async wrap) + dropped non-`StreamChunk` `brain` field, typed plan `steps` status union, widened `Button.onClick` to accept a MouseEvent so the Automations `Run` button `stopPropagation`s, removed unused `res` in http `brain.run`, removed unused `StreamChunk`/props in Settings `BrainPanel`. `npm run build` + `npx tsc --noEmit` clean; app live at :5173 with Brain panel + procedures.
- 2026-09-08 opencode: Brain debug round (3 scouted agents) — fixed http `brain.run` to POST `/v1/brain/run` (was `/v1/ai/submit`), added `brain.stop` to contract + mock (abort map) + http (AbortController map) + `stopStream`; Automations now awaits `actions.runBrain` instead of fire-and-forget with `triggers[0]` guard; `useAsync` race (requestId) fix; CommandCenter subscribes to `chatState` so the streamed answer re-renders; CoreScreen passes `deps={[orbMode]}` to `useHologram` (renderer-toggle rAF leak) + drag-guard so orb drag doesn't navigate away; orb: `controls.enabled=false` (double-input), text-sprite G channel fixed, Settings step keys `id-i`, automations meter non-negative, `coreState` drives vitals in sendPrompt/runBrain. Backend: `engine.execute_stream` streams per-step (no buffer/deque double-emit), `_BrainSse` single-source + try/except + `.get()` defaults, invalid mode/procedure falls back and terminates with `done`. Verified: tsc + build clean, backend boots on :8420, `/v1/brain/modes|procedures|run` stream = thinking→plan→steps→report→done.
- 2026-09-08 opencode: second polish pass — removed dead deque/plan_seed vars in `brain_stream`, hardened `_BrainSse._handle` to build the plan block from engine data (no reliance on pre-seeded dict). tsc + py_compile clean; backend restarted on :8420, brain/run stream re-tested (12 frames, clean). README rendered to `~/Downloads/HERCULES_README.pdf` (5 pages) via a local fpdf2 generator.