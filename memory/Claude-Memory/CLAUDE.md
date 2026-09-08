# Shared Agent Memory — CLAUDE.md

Auto-loaded by Claude Code on startup. Single source of truth for all three agents.

---

## User Profile

- **Role**: Full-stack dev / AI systems builder
- **Expertise**: Python, TypeScript (expert) | Rust, Go (intermediate)
- **Project**: JARVIS Command Center (voice-first AI, web UI, telemetry, camera, multi-empire dashboard, Ollama + Omniroute) **+ Hercules AI command center**
- **Stack**: Python/TS, FastAPI/React/Vite/zustand, pip/uv, pnpm
- **AI**: Ollama (local), Omniroute (cloud), Hermes
- **Env**: macOS, zsh, /Users/bhavyarajput
- **Hardware**: MacBook Air M3 · 8GB unified RAM · 256GB SSD. Resource-constrained: cap parallel agents, keep memory use low, prefer lean builds. "specs of my mac" = M3 / 8GB / 256GB.

---

## Preferences

- Concise, direct CLI responses. Minimal markdown.
- Assume competence, don't over-explain. Minimal code comments.
- Default to action for low-risk ops. Ask before: destructive ops, API calls, credentials, foreground focus.
- Show results, not plans.
- Code: follow conventions (prettier/black/ruff). TDD, integration>unit. Inline docs for public APIs. Modular, async-first, DI.
- Git: feat/fix branches, conventional commits.

---

## Active Context

- **JARVIS**: Running at localhost:8000
- **Hercules repo**: `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/` (consolidated 2026-09-08; was `~/Downloads/Coding/ai_os/Hercules`) — app `hercules/` (frontend :5173, backend :8420), mirror vault `memory/`, `archive/` (reversible), `holo-mockups/`. Brain: offline/deterministic, no LLM required.
- **Memory vault**: `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/memory/` — canonical Obsidian vault; `Claude-Memory/` holds this file + `claude-memory/` (moved from `~/.claude/memory`). Auto-synced + git-pushed.
- **Omniroute Key**: sk-d656ee33b2d34cb0-89a9dc-80b992e0
- **Ollama Models**: llama3.2:3b (default), qwen3.5, gemma3:1b, minimax-m2.1:cloud
- **Supabase**: https://qyfgrtbprklunmzfalid.supabase.co (PostgreSQL, Realtime, Storage, pgvector)
- **Open Design MCP**: Configured in opencode.jsonc
- **Obsidian Vault**: `~/Downloads/ai_os/hercules_folder/Hercules/memory/` (canonical, auto-load skill configured)

---

## Sessions Log

- 2026-09-08: **Hercules consolidation** — everything moved to `hercules_folder/Hercules/`, canonical `memory/` vault created, all agent memories symlinked in, autosync LaunchAgent wired (`com.user.obsidian-autosync` → `hercules/scripts/memory-autosync.sh`).
- 2026-09-03: **Master Orchestrator Framework** created — Hierarchical CEO model with 15 departments, Sub-CEOs, persistent memory system, and Obsidian integration. Goal: reduce repeat-task time via template recall across sessions.
- 2026-08-26: Omniroute API integrated with Claude Code via opencode gateway (localhost:20128)...
- 2026-08-25: Supabase MCP server added, agent skills installed, Obsidian vault updated
- 2026-08-25: Shared agent memory system created (opencode + Hermes + Claude Code)
- 2026-08-24: Open Design MCP added, custom opencode memory created
- 2026-08-23: JARVIS built + Obsidian memory vault configured

---

## Projects

### JARVIS Command Center
Voice-first AI assistant with web UI, telemetry, camera, multi-empire dashboard. Uses Ollama + Omniroute + Supabase.
- Repo: ~/Documents/opencode_atlas/OmniRoute (or current working dir). Running at: localhost:8000.
- **Supabase**: Project `qyfgrtbprklunmzfalid` ...

### Hercules AI Command Center
Voice-first AI command center with deterministic offline brain (FastAPI backend + React/Vite frontend).
- Repo: `~/Downloads/ai_os/hercules_folder/Hercules/`; app in `hercules/`; brain SSE at `/v1/brain/run` + `/v1/brain/stream`.
- App memory: `hercules/backend/hercules_core/data/brain-memory/`.

---

## Agent-Specific Notes

### opencode
- Memory file: `index.md` → symlink to `memory/AI-Memory/opencode-index.md`
- Skills: ui-ux-pro-max, frontend-design, design-taste-frontend, vercel-react-best-practices...
- Config: ~/.config/opencode/opencode.jsonc

### Hermes
- Memory files: `USER.md`, `MEMORY.md` → symlinks to `memory/hermes_memory/`

### Claude Code
- Reads `~/.claude/CLAUDE.md` (symlink → `memory/Claude-Memory/CLAUDE.md`)
- `~/.claude/memory/` → symlink to `memory/Claude-Memory/claude-memory/`
- Custom agents defined in ~/.claude/agents/ (91 specialized agents)

## Master Orchestrator v2.0 (20 departments, 5 modes, hardware-aware)
- Workflow: `master-orchestrator` at ~/.claude/workflows/master-orchestrator.js
- Invoke: "ultracode", "use master-orchestrator", or a mode keyword
- Modes: `parallel <task>` | `sequential "p1 | p2 | p3"` | `todo "i1; i2"` | `research "<identity>"` | auto (default)
- Hardware: auto-tune — cap min(4, floor(freeGB/2)), forced sequential under memory pressure
- Memory: `~/.claude/memory/` (token-minimal: memory-map.md index → load ONE dept file on demand)
- Obsidian mirror: `~/Documents/Obsidian Vault/Claude-Memory/` (legacy rsync one-way)
- Research: hybrid — agent-based OSINT fan-out now, research-mcp-adapter slot for future paid search MCPs

## Memory Map (token-minimal recall)
- **Every task:** read `~/.claude/memory/memory-map.md` FIRST (cheap, <300 tokens). Match the department, then load ONLY that one department file (<2000 tokens). NEVER load all files.
- Research requests: check `~/.claude/memory/research-dossiers/` BEFORE searching the web (30-day cache = zero-cost answer).
- Sequential runs: resume from `~/.claude/memory/project-checkpoints/`.

## Skills Policy
- Installed skills: see `~/.claude/skills/` (19 installed).
- Official marketplace: `~/.claude/plugins/marketplaces/claude-plugins-official/`.
- Policy: install ONLY official/verified skills. No random GitHub/plugin repos.
- Agent audit: run `bash ~/.claude/scripts/audit-agents.sh` to flag duplicates/stale agents.