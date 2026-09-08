# Hercules Architecture

## Layout (inside `hercules/`)
```
hercules/
├── index.html               # vite entry
├── vite.config.ts
├── package.json
├── backend/                 # FastAPI
│   ├── server.py            # uvicorn entry (`server:app`, :8420)
│   └── hercules_core/
│       ├── brain/           # engine.py, cognition.py, planner.py, hands.py,
│       │                    # hands_router.py, modes/, memory_rb.py
│       ├── ceo.py, ceo_assistant.py, orchestrator.py
│       ├── departments/     # research, reasoning, designer, coding, generation, pc_control
│       ├── execution/       # claude_code.py (optional exec)
│       ├── labour/          # labour_agents.py
│       ├── skills/          # skills_registry.py
│       ├── memory/          # task_memory.py
│       ├── procedures/
│       └── data/brain-memory/     # episodic.json, procedure_usage.json (app memory)
└── src/                     # React 18 SPA
    ├── main.tsx, app/App.tsx, app/router.tsx, app/ScreenLoad.tsx
    ├── screens/             # 19 screens: Core, CommandCenter, Settings, Automations, Projects,
    │                        # Browser, Analytics, Files, Permissions, Departments, Knowledge,
    │                        # Notifications, Activity, Agents, Terminal, Tasks, Memory, Media, System
    ├── hologram/            # orb (orbScene.ts), OrbHologram.tsx (M1 drag guard, M3 text tint)
    ├── components/          # shell (TopBar, Sidebar, FloatingCore, VoiceOverlay, Inspector, HelpOverlay, ToastStack), chat (ChatComposer, MessageBlocks), Icon
    ├── state/               # createStore.ts (zustand: coreState), hercules.ts, nav.ts
    ├── services/            # API + SSE clients (sendPrompt, runBrain)
    ├── hooks/ styles/ theme/ types/
```

## Runtime
- **Backend**: `uvicorn server:app --port 8420` from `hercules/backend`
- **Frontend dev**: `npm run dev` — vite on 127.0.0.1:5173
- **Production build**: `npm run build` → `dist/`

## Data flow (voice → action)
1. `src/screens/CoreScreen.tsx` — voice/composer input → `services` API client
2. `sendPrompt`/`runBrain` → POST `/v1/brain/run` (backend `server.py`)
3. Engine streams → `GET /v1/brain/stream` (SSE) → `coreState` drives the dashboard vitals:
   `thinking → plan → step(running/ok) → report(delta) → done:true`
4. App memory: `memory_rb.py` appends to `data/brain-memory/episodic.json` + `procedure_usage.json`.

## No cloud, no LLM
- `offline=True` default. Brain runs fully deterministic on CPU (1–9ms/sample directive).
- Ollama + Omniroute available as optional upscalers; OpenAI SDK is installed but unused by default.

## Prior debug fixes (June–Sep 2026)

### Round 1 — core stability
- Backend double-emit in `_BrainSse` fixed (SSE frames twice → once).
- Removed orphaned `self._sse()` in `step` running branch of `server.py`.

### Round 2 — UI orb + misc
- **M1 orb drag navigates away**: drag-guard added to `CoreScreen` stage via `dragOrigin`/`dragged` refs.
- **M2 double input**: `controls.enabled = false` after click in `orbScene.ts`.
- **M3 text tint**: fixed orb text sprite G channel (`orbScene.ts:449`).
- **M1 double commands** (partial): CommandCenter active-command dedupe.

### Round 3 — screen bugs + memory
- Settings step keys `${p.id}-${i}` (BUG 8 collision).
- Automations meter `Math.max(0, liveStepIndex(a))` (BUG 9).
- `coreState` in `sendPrompt`/`runBrain` updates `vitals.state` from engine chunk (BUG 4).
- `CommandCenterScreen` cleanup returns `() => { void off(); }`.
- `server.py`: dropped dead `deque`/plan-seed vars; `_BrainSse._handle` builds plan block from engine data.
- Verified: `tsc --noEmit`, `npm run build`, backend boots, `/v1/brain/run` stream clean (12 frames), fallbacks terminate cleanly.