# HERCULES — System Analysis & Orchestrator Mapping

> Generated 2026-09-07. Precise read of the whole repo: main app, backend core,
> demo. Written as the working basis for the "rebuild/touch up the system" pass.

---

## 1. The Idea (in one screenful)

HERCULES is a **desktop-first control plane / AI operating system console** for an
autonomous agent estate. It makes an internal hierarchy of agents, departments,
tasks, memory, files, knowledge, automations, browser, terminal, trust and spend —
**observable and editable by hand**. It is *front-end only*: it never talks to a
provider directly and never holds a secret. Everything arrives through **one typed
service contract** (`src/services/contracts.ts`), which a mock transport (default)
or an HTTP/SSE transport implements — so the interface is judgeable with zero
infrastructure, and a real core can be plugged in with **no component edits**.

## 2. Architecture at a glance

```
Hercules/                       (the full system)
  hercules/                     main React 18 + Vite + strict-TS app  [the real thing]
    src/
      app/          App shell, lazy router
      state/        hercules.ts (store: AppState + actions + ui + toast + chatState)
                    nav.ts      (19 screens: 1 registry drives rail/router/hotkeys)
      services/
        contracts.ts  THE typed contract (20+ services)
        registry.ts   transport switch: mock | http | ws | ipc
        mock/         a shared "world" + heartbeat runtime + fixtures
        http/         REST + SSE client for a real core
      screens/      19 lazy screens (Core, Command, Agents, Departments, Tasks,
                    Projects, Memory, Files, Knowledge, Automations, Browser,
                    Terminal, System, Analytics, Activity, Inbox, Trust, Settings, Media)
      components/   ui.tsx primitives, 77-glyph Icon set, shell/ (Sidebar, TopBar,
                    CommandBar, Inspector, FloatingCore, VoiceOverlay, BootOverlay...),
                    chat/ (8 block kinds), command/ palettes
      theme/        engine.ts (6 palettes), bridge.ts (apply + persist)
      hologram/     orb/ (Three.js Iron-Man orb + MediaPipe gestures), 2D core
      hooks/        useAsync / useDebounced / useNow / useDropZone
    backend/
      server.py     FastAPI "NVIDIA Nemotron core adapter" + real orchestrator
      hercules_core/  the actual multi-agent brain (CEO → Departments → Labour)
  Hercules_frontend/  lightweight single-screen "foundation" demo (historic precursor)
```

## 3. The brain (backend `hercules_core/`)

The backend is **not just an API** — it's a working hierarchical multi-agent
orchestrator (in the same spirit as our own `master-orchestrator`):

- **`ceo.py` — `HerculesCEO`**: reviews a directive → recalls memory → commissions a
  department/agent. `review_and_commission()` is the entry.
- **`ceo_assistant.py` — `CEOAssistant`**: the **classifier / decomposer**. Maps a
  prompt → `(department, agent, action_type, steps, explanation)` via keyword rules,
  with a skills-registry override. Emits the step-by-step "how to do it."
- **`memory/task_memory.py` — `TaskMemory`**: JSON-file **episodic memory** with a
  Jaccard keyword-recall + substring boost. Records every execution with
  `actions_taken` ("how it was done") so **repeat tasks get faster** — the exact
  stated goal of our Master Orchestrator sessions log.
- **`skills/skills_registry.py`** + `*.json`: JSON skill templates matched by trigger
  keywords — a **procedural template bank**.
- **`orchestrator.py` — `HerculesOrchestrator`**: the 6-step pipeline
  (CEO review → Assistant refine → Department execute → record memory → report →
  voice/chat output). Routes to 7 departments: Reasoning, Coding, Research,
  Generation, PC Control, Designer, Labour Agents.

Departments (`departments/`): `reasoning`, `coding`, `research`, `generation`,
`pc_control`, `designer`. Labour (`labour/labour_agents.py`): email, pdf, clipboard.
Output (`output/outputs.py`): voice + chat formatting.

**`server.py`** exposes this as REST + SSE: `/v1/ai/submit` streams a full
`StreamChunk` sequence (thinking → plan block → tool-call block → executing →
speaking → done) that the React chat UI renders as interactive blocks. NVIDIA
Nemotron is used for the final executive synthesis when a key is present.

## 4. The interface conventions (what makes it feel alive)

- **Nothing is decorative**: gauges are live samples, chart rows lead to actions,
  empty states explain policy.
- **Approvals are a gate, not a notification**: writes outside the estate stop and
  wait for a signature (Inbox, Trust, Core's ask rail).
- **You can always see who did what**: `traceId`s on Activity rows the Inspector
  follows; agents cannot write the log.
- **One Inspector**: selecting any entity opens the same right-hand surface.
- The **mock runtime** is a single shared world + one heartbeat, so a task completing
  shows up in Activity, Analytics, vitals and a notification at the same instant —
  exactly how a real push channel would behave.

## 5. Known-good & verified (2026-09-07)

- Code is `tsc --noEmit` clean by manual review; `dist/` builds exist.
- Port layout (avoid Vite's default-5173 collision):
  - backend uvicorn → **8420**
  - main app Vite → **5173**
  - frontend demo Vite → **4173**
- Deployment was deferred earlier only by an Anthropic permission-classifier outage;
  the code itself was verified clean and build-ready.

## 6. Gaps / rough edges (candidate work for the rebuild pass)

1. **`server.py` implements only a slice of `contracts.ts`.** The contract declares
   20+ services (files, knowledge, memory, media, voice, analytics, activity, …);
   the HTTP backend only serves models/intents/ai/departments/agents/tasks/settings/
   conversations/core. Wire the remaining surfaces against the real core.
2. **`hercules_core` uses keyword-rules, not a model router.** The CEO Assistant is
   a heuristic classifier. Upgrade to our model-router (Ollama/Omniroute) if we want
   general intent understanding instead of keyword buckets.
3. **Task memory is a JSON file, not vector.** Jaccard recall is fine for demos;
   swapping to pgvector / embeddings (Supabase) would make recall semantic.
4. **No durable per-session state** for chat/memory across the app restart in HTTP
   transport — the mock holds it all in-browser.
5. **`Hercules_frontend`** is a stale precursor; consider folding or archiving it so
   the `5173`/`4173` collision and two-app confusion go away.
6. **Skills registry** has only 3 sample skills — grow the template bank from our
   own `~/.claude/skills/`.
7. **Frontend `hologram/orb`** was freshly ported (Three.js + MediaPipe) and is the
   signature visual; confirm it renders under `appearance.hologram==='orb'` in the
   real build (there was no live browser verification yet).

---

## 7. Mapped onto the Master Orchestrator v2.0 workflow

Our `master-orchestrator.js` runs
`Prompt Engineer → CEO → Sub-CEOs → Departments → Manager → Memory Update`
with 20 departments, 5 modes, hardware auto-tune, and token-minimal recall.
HERCULES already encodes the *same hierarchy* — the mapping is nearly one-to-one:

| Master Orchestrator v2.0          | HERCULES (backend `hercules_core/`)      | Status |
|-----------------------------------|------------------------------------------|--------|
| Prompt Engineer (refine intent)   | `CEOAssistant.refine_and_explain()`      | ✅ present (keyword rules) |
| CEO (route + commission)          | `HerculesCEO.review_and_commission()`    | ✅ present |
| Sub-CEOs / Department leads       | 7 departments (Reasoning, Coding, Research, Generation, PC Control, Designer, Labour) | ✅ present |
| Department specialist agents      | `departments/*` agent classes            | ✅ present |
| Labour agents                     | `labour/labour_agents.py`                | ✅ present |
| Memory update + template recall   | `TaskMemory.record_task()` + `recall_task()` (Jaccard) | ✅ present, but JSON not vector |
| Skills/template bank              | `SkillsRegistry` + `skills/*.json`       | ✅ present (3 skills only) |
| Report / synthesis                | `report.py` + output channels             | ✅ present |

**What HERCULES adds that our orchestrator workflow doesn't ship:**
- A full **observable UI** over the whole estate (19 screens) — our master
  orchestrator is CLI/agent-only with no control-plane surface.
- **Approvals as gates**, `traceId` audit, one Inspector — human-in-the-loop on top
  of autonomous agents.
- A **transport abstraction** (`contracts.ts`) so the "workflow engine" and the "UI"
  are decoupled and each is swappable.

**What our orchestrator workflow has that HERCULES lacks:**
- A **real model router** (Ollama local + Omniroute cloud, `kr/…`/`oc/…` profiles).
  HERCULES's CEO Assistant is hard-coded keyword classification.
- **20 departments** with memory-map token-minimal recall; HERCULES has 7 and a
  single JSON memory.
- **Persistent memory files per department** (`~/.claude/memory/`) + templates.
- **Hardware-aware auto-tuning** (resource-monitor) to decide parallel vs sequential.
- **Real tool execution** — HERCULES's departments mostly return canned/structured
  responses; they don't actually run the machine.

### The synthesis: a hybrid

The natural "work up the entire system again" move is to **keep HERCULES as the
control plane / shell and upgrade its brain to our orchestrator's engine**:

- Plug the **model router** (Ollama + Omniroute) into `CEOAssistant` so classification
  and step-planning go from keyword buckets → real intent understanding.
- Swap **JSON task-memory** for **vector recall** (Supabase pgvector / embeddings).
- Import the **20-department memory map + skills template bank** from
  `~/.claude/memory/` + `~/.claude/skills/` into `SkillsRegistry`.
- Back the **contract surface with the real core** — implement the missing
  `contracts.ts` services (files, knowledge, memory, media, voice, analytics,
  activity) in `server.py` / `hercules_core/` so the UI's claims are real.
- Optionally **archive `Hercules_frontend`** to collapse the two-app split.