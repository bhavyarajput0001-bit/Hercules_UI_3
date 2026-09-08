# Hercules — Project Memory Map

Goal: AI command center with a voice-first web UI and a deterministic "brain" that plans and delegates work — no cloud, no LLM by default, fits a MacBook Air M3 (8GB / 256GB).

## Where things live
| Path | What |
|---|---|
| `hercules/` | The app (formerly at `~/Downloads/Coding/ai_os/Hercules/hercules`) |
| `hercules/backend/server.py` | FastAPI app, runs `uvicorn server:app --port 8420` |
| `hercules/backend/hercules_core/brain/` | Brain engine: `engine.py`, `cognition.py`, `planner.py`, `hands.py`, `hands_router.py`, `modes/`, `memory_rb.py` |
| `hercules/backend/hercules_core/data/brain-memory/` | App's own working memory: `episodic.json`, `procedure_usage.json` (JSON, rollback-safe, no LLM) |
| `hercules/src/` | React SPA (Vite): `screens/` (Core, CommandCenter, Settings, Automations, etc.), `hologram/`, `state/` (zustand), `components/` |
| `holo-mockups/` | Separate vite sandbox for hologram UI experiments (`hercules-holo-mockups`) |
| `memory/` | **This Obsidian vault** (canonical, git-tracked, auto-synced) |
| `archive/` | Superseded copies + regenerables (undo via `archive/MANIFEST.md` + `restore.sh`) |

## Ports & run
- Backend: `cd hercules/backend && uvicorn server:app --port 8420`
- Dev: `cd hercules && npm run dev` (vite, host 127.0.0.1, :5173)
- Brain SSE: `POST /v1/brain/run` → `GET /v1/brain/stream` (events: `thinking` → `plan` → `step:running/ok` → `report:delta` → `done:true`)

## Key details
- Frontend: React 18 + TypeScript, zustand stores (`state/createStore.ts`), CSS screens, ultra-HUD styling.
- Backend: FastAPI, python-dotenv, OpenAI SDK installed (unused offline).
- Machine tuning: sequential > parallel, minimal logs, lean builds.

## See also
- [[Architecture]] — full-stack layout
- [[Brain-Pipeline]] — brain algorithm + SSE contract
- [[Machine-Spec]] — 8GB/256GB tuning rules
- [[Sessions/2026-09-08-consolidation]] — repo + memory consolidation
- [[Decisions]] — decision log