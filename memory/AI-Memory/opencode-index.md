# OpenCode Memory Index

Auto-loaded at session start via `~/.config/opencode/memory/index.md` (symlink → this file). Keep entries concise.

## User
- **Role**: Full-stack dev / AI systems builder
- **Expertise**: Python, TypeScript (expert) | Rust, Go (intermediate)
- **Project**: JARVIS Command Center (voice-first AI, web UI, telemetry, camera, multi-empire dashboard, Ollama + Omniroute) **+ Hercules AI command center**
- **Stack**: Python/TS, FastAPI/React/Vite/zustand, pip/uv, pnpm
- **AI**: Ollama (local), Omniroute (cloud), Hermes
- **Env**: macOS, zsh, /Users/bhavyarajput
- **Hardware**: MacBook Air M3 · 8GB unified RAM · 256GB SSD. Resource-constrained: cap parallel agents, keep memory use low, prefer lean builds. "specs of my mac" = M3 / 8GB / 256GB.

## Preferences
- Concise, direct CLI responses. Minimal markdown.
- Assume competence, don't over-explain. Minimal code comments.
- Default to action for low-risk ops. Ask before: destructive ops, API calls, credentials, foreground focus.
- Show results, not plans.
- Code: follow conventions (prettier/black/ruff). TDD, integration>unit. Inline docs for public APIs. Modular, async-first, DI.
- Git: feat/fix branches, conventional commits.

## Active Context
- **Hercules repo**: `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/` (consolidated 2026-09-08; was `~/Downloads/Coding/ai_os/Hercules`)
  - App `hercules/` (frontend :5173, backend :8420), mirror vault `memory/`, `archive/` (reversible), `holo-mockups/`
  - Brain: offline/deterministic, no LLM required, SSE at `/v1/brain/run` + `/v1/brain/stream`
- **JARVIS**: Running at localhost:8000
- **Omniroute Key**: sk-d656ee33b2d34cb0-f54790-3ecdd835
- **Ollama Models**: llama3.2:3b (default), qwen3.5, gemma3:1b, minimax-m2.1:cloud
- **Supabase**: https://qyfgrtbprklunmzfalid.supabase.co
- **Memory vault**: `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/memory/` — THIS file is the opencode index (single source of truth); git-tracked + auto-synced.

## Sessions
- 2026-09-08 (build): executed the full consolidation — repo moved, `memory/` vault seeded, symlinks wired, autosync LaunchAgent working (mirror→commit→push), backend boot fixed (`...execution` imports), READMEs updated, `restore.sh`/`MANIFEST.md` shipped, GitHub in sync.
- 2026-09-08: Executed full repo + memory consolidation. Canonical vault at `memory/`; agent homes symlinked; autosync via LaunchAgent `com.user.obsidian-autosync` → `hercules/scripts/memory-autosync.sh` (15-min + WatchPaths + git push).
- 2026-08-25: Supabase MCP + agent skills installed.
- 2026-08-25: Shared agent memory system created (opencode + Hermes + Claude Code).
- 2026-08-24: Test entry from custom memory system.
- 2026-08-24: Open Design MCP added, custom opencode memory created.
- 2026-08-23: JARVIS built + Obsidian memory vault configured.