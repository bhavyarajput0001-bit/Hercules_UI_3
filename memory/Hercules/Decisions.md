# Decisions

Log of notable decisions, date ascending.

| Date | Decision | Reversible? |
|---|---|---|
| 2026-09-08 | Consolidate all Hercules code into `~/Downloads/ai_os/hercules_folder/Hercules/` | yes (archive + restore.sh) |
| 2026-09-08 | Canonical Obsidian vault at `memory/`; agent homes become symlinks into it | yes (restore.sh) |
| 2026-09-08 | Autosync = 15-min LaunchAgent + launchd WatchPaths (no fswatch dep) | yes |
| 2026-09-08 | Git: memory/ tracked in Hercules repo, pushed to `Hercules_UI_3.git`; legacy `shared-agent-memory` GitHub remote kept as safety mirror | yes |
| 2026-09-08 | Brain stays offline/deterministic (no LLM by default) for 8GB machine | yes |
| 2026-09-08 | numpy/torch/onnxruntime NOT installed — app is pure Python | yes |

## Policy notes
- Low-risk ops → just do them. Ask before: destructive ops, API calls, credentials, foreground focus.
- Everything reversible: every move recorded in `archive/MANIFEST.md`.