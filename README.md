# Hercules — AI Operating System console

Voice-first AI command center: a deterministic offline "brain" that plans and delegates work, with a holographic web UI. No cloud required (LLM optional), designed for a MacBook Air M3 (8GB / 256GB).

Consolidated monorepo at `~/Downloads/ai_os/hercules_folder/Hercules/` (2026-09-08).

## What's inside

| Path | What |
| --- | --- |
| `hercules/` | The app — React 18 + Vite frontend, FastAPI backend, deterministic brain |
| `hercules/backend/` | `server.py` → `uvicorn server:app --port 8420`; `hercules_core/` brain + departments + memory (`data/brain-memory/`) |
| `hercules/src/` | React SPA: 19 screens, hologram orb, zustand stores, typed service contract |
| `holo-mockups/` | Standalone Vite sandbox for hologram design families (`/ultron`, `/nexus`, `/aegis`) |
| `memory/` | **Canonical Obsidian vault** — single source of truth for opencode, Claude, Hermes, and the app's own working memory (git-tracked, auto-synced) |
| `archive/` | Everything superseded/regenerable from the consolidation — fully reversible via `archive/MANIFEST.md` + `archive/restore.sh` |

## Run it

```bash
# backend (from hercules/backend)
uvicorn server:app --port 8420

# frontend dev (from hercules/)
npm run dev          # http://localhost:5173

# checks (from hercules/)
npx tsc --noEmit
npm run build
```

Brain SSE: `POST /v1/brain/run` → `GET /v1/brain/stream`
(`thinking → plan → step running/ok → report delta → done:true`; offline, ~1–9ms/directive).

## Memory vault sync

- Agent home files are symlinks into `memory/` (single source of truth).
- LaunchAgent `com.user.obsidian-autosync` → `hercules/scripts/memory-autosync.sh`:
  every 15 min + on-change (`WatchPaths`), mirrors app brain-memory → `memory/Hercules/Brain-Memory/`,
  copies `.agent-team/BOARD.md` → `memory/Hercules/BOARD.md`,
  then `git add -A && commit && push origin main`.
- Anyone on the project may read/write Obsidian notes at `memory/` — everything is git-versioned.

## Git

- Remote: `git@github-bhavya:bhavyarajput0001-bit/Hercules_UI_3.git`
- Commit author email: `bhavyarajput0001-bit@users.noreply.github.com` (GH007-compatible)
- Team protocol lives in `hercules/AGENTS.md`; live board in `hercules/.agent-team/BOARD.md`.

## Hardware notes

- 8GB RAM: brain is sequential; cap parallel agents; keep memory JSON tiny.
- No heavy native deps (numpy/torch/onnxruntime deliberately absent).

See `memory/Hercules/` for architecture, brain pipeline, machine spec, and decisions.