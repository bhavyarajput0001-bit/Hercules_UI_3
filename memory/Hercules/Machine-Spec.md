# Machine Spec — Tuning Rules

Hardware: **MacBook Air M3 · 8GB unified RAM · 256GB SSD** ("specs of my mac" = M3 / 8GB / 256GB).

## Rules
- Cap parallel agents: `min(4, floor(freeGB / 2))`; force sequential under memory pressure.
- Prefer lean builds: no heavy native deps unless required (numpy/torch/onnxruntime deliberately absent from Hercules).
- Keep processes light: no daemons hogging RAM; launchd `WatchPaths` triggers instead of fswatch.
- Logs minimal; JSON memory files tiny.
- Dev stack: npm/vite, pip/uv, FastAPI — all low-footprint.

## Violations to avoid
- Multiple vite dev servers + multiple backends simultaneously.
- Running Ollama models during heavy builds.
- Duplicate node_modules copies under sync.

## Evidence
- `pgrep` discipline: never kill unrelated services (e.g. `Master_Prompt` vite).
- Hercules brain measured 1–9ms/directive on-device (sample directives).