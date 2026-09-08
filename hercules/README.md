# HERCULES · AI Operating System console

A desktop-first control plane for an autonomous agent estate: one holographic
core, a workforce of agents and departments, tasks, memory, files, knowledge,
automations, browser and terminal control, trust and spend — all of it
observable and *editable by hand*.

This repository is the **front-end only**. It never talks to a model provider
directly and never holds a secret. Everything it shows arrives through one
typed service contract (`src/services/contracts.ts`), which is implemented
either by in-browser mock services (default) or by an HTTP/SSE transport that
talks to a real Hercules core.

```bash
npm install
npm run dev        # http://localhost:5173 — mock transport, no backend needed
npm run typecheck  # tsc --noEmit, strict + noUnusedLocals
npm run build      # typecheck, then vite build into dist/
```

## What's on screen

19 routed screens (`src/state/nav.ts`), grouped as the shell's rail presents them:

| Group | Screens |
| --- | --- |
| Command | Core, Command Center, Agent Estate, Departments |
| Work | Tasks, Projects |
| Estate | Memory, Files, Knowledge, Automations, Browser, Terminal |
| System | System Control, Analytics, Activity, Inbox, Trust, Settings, Media |

The rail items carry ⌘1–⌘0 hotkeys; `?` opens the command/keystroke overlay.

A few rules the whole surface obeys:

- **Nothing is decorative.** Every gauge is a live sample, every chart row
  leads to an action, every empty state explains the policy behind it.
- **Approvals are a gate, not a notification.** Anything that writes outside the
  estate stops and waits for a signature (Inbox, Trust, Core's ask rail).
- **You can always see who did what.** Activity rows carry `traceId`s that the
  Inspector follows; agents cannot write to that log.
- **One Inspector.** Selecting anything (agent, task, file, memory record,
  notice, department) opens the same right-hand surface.

## Architecture

```
src/
  app/            App shell, router (lazy screens), route → screen mapping
  state/
    hercules.ts   the store: AppState + actions.* + ui.* + toasts + chatState
    createStore.ts  ~70-line useSyncExternalStore selector store (+ useExternalValue)
    nav.ts        screen ids, titles, groups, hotkeys, search keywords
  services/
    contracts.ts  THE interface. Nothing else may reach a backend.
    registry.ts   transport switch: mock | http | ws | ipc
    mock/         in-browser world: fixtures + a ticking runtime
    http/         REST + SSE client (same contract, real backend)
  screens/        19 lazy screens
  components/
    ui.tsx        primitives: Button, Chip, Row, Meter, Gauge, Sparkline, Bars,
                  Tabs, Field, TextInput, Select, Slider, Toggle, EmptyState…
    Icon.tsx      77 hand-drawn SVG glyphs; `IconName` is a strict union
    shell/        Sidebar, TopBar, CommandBar, Inspector, FloatingCore,
                  VoiceOverlay, BootOverlay, HelpOverlay, ToastStack
    chat/         ChatComposer + MessageBlocks — eight block kinds: text, code,
                  plan, tool-call, file, chart, approval, citations
    command/      command-palette surfaces
  theme/          engine.ts (palettes), bridge.ts (apply + persist)
  styles/         global.css (tokens, shell, primitives, overlays)
                  screens.css (every screen's own layout)
  hooks/          useAsync / useDebounced / useNow / useDropZone
```

### State

`screens` read through selectors — `store.use(s => s.tasks)` — and mutate only
through `actions.*`, `ui.*`, `run()` or `toast*()`. Live service traffic is
subscribed once at module scope (`services.core.onCoreEvent.subscribe(...)`),
never per component.

Streaming chat deliberately lives **outside** the store (`chatState`) so token
deltas don't re-render the estate.

Three cross-cutting conventions make the app feel connected:

- `ui.bump('files' | 'agents' | 'tasks' | …)` increments `store.rev`, which is a
  dependency of every `useAsync` — that's how a write in one screen refetches
  another.
- `ui.flashFor('task:tsk-9')` pulses the matching row for ~2.2s so you can see
  where a change landed.
- `ui.select({ kind, id, label })` opens the shared Inspector from anywhere.

### Theme

Components never hard-code colour: they consume CSS custom properties
(`--accent`, `--surface`, `--line`, `--text-dim`, `--core-primary`,
`--glow-scale`, `--row-h`, `--r`, `--pad`, `--fs`, `--blur`) that
`src/theme/engine.ts` writes onto `:root` — six palettes (`obsidian-night`,
`cyan-eclipse`, `amber-forge`, `solar-flare`, `graphite-steel`,
`paper-daylight`), all re-tinted by the same variables. Density and font scale
are config, not CSS forks.

### Persistence & privacy

Operator config persists to `localStorage['hercules.config.v1']` and can be
exported/imported from Settings → Developer. **Import refuses to land a secret**:
any key named `api_key`, `token` or `secret` in the payload raises
`E_SECRET_IN_CONFIG`, because handles — not values — are what this UI ever sees.
Secrets are displayed masked (`svc-****-1a9f`) and rotation re-binds agents
without a value crossing the interface.

## Running against a real core

```bash
cp .env.example .env.local
# VITE_HERCULES_TRANSPORT=http
# VITE_HERCULES_API_BASE=https://core.internal:8420
npm run dev
```

No component changes: the same contract, a different implementation. The endpoint
map, SSE channels, auth model and streaming chunk shape are documented in
[`docs/BACKEND_INTEGRATION.md`](docs/BACKEND_INTEGRATION.md).

### NVIDIA Nemotron adapter

The repository includes a minimal local core adapter for NVIDIA's
OpenAI-compatible endpoint. Install and run it from the project root with the
key supplied through the process environment:

```bash
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
NVIDIA_API_KEY=nvapi-... backend/.venv/bin/uvicorn backend.server:app --reload --port 8420
```

Then set `VITE_HERCULES_TRANSPORT=http` and
`VITE_HERCULES_API_BASE=http://localhost:8420` in `.env.local` before starting
Vite. The NVIDIA key stays on the backend and is never sent to the browser.

`ws` and `ipc` (Tauri/Electron main-process bridge) share the same surface;
`ipc` is what the packaged desktop shell uses so the renderer keeps zero
network privileges.

## Notes on the mocks

`src/services/mock/` is a small world model, not a pile of fixtures: `runtime.ts`
ticks agents, vitals, queue pressure, automations and the core log; `fixtures.ts`
seeds a coherent estate (45 agents under 25 roles across 8 departments, 22 tasks,
18 memory records, 10 models, 6 knowledge sources, 8 automations, a media
library and an audit history) and then keeps it moving. Actions have consequences you can watch — run
an automation and the run log, spend chart and notices all move.

They exist so the interface can be judged without infrastructure. Every mock
method is typed against the same contract the real transport implements, so
drift fails the build rather than the demo.
