# Consolidation Manifest — 2026-09-08

Everything consolidated into `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/`.
Nothing was deleted; every move is reversible via `restore.sh`. This archive is git-tracked in the Hercules repo.

## New layout
```
Hercules/
├── .git                 # active repo (was ~/Downloads/Coding/ai_os/Hercules) — checkpoint kept
├── hercules/            # THE app (was .../Coding/ai_os/Hercules/hercules)
├── holo-mockups/        # hologram UI sandbox (was .../Coding/ai_os/Hercules/holo-mockups)
├── memory/              # canonical Obsidian vault (was ~/Downloads/Coding/ai_os/Obsidian)
├── archive/             # everything below is preserved here
└── scripts/             # (created) memory-autosync.sh lives in hercules/scripts/
```

## Archive contents (source → archive/)
| Source | Archived as | Why |
|---|---|---|
| `~/Downloads/Coding/ai_os/Hercules/.DS_Store`, `screenshot.png`, `hercules-full-experience.png`, `hercules-ultron-hud.png`, `uploads/` | `archive/old-repo-artifacts/` | root cruft/artifacts |
| `~/Downloads/ai_os/hercules_folder/Hercules/{hercules,Hercules_frontend,uploads,package-lock.json}` | `archive/old-hercules/`, `archive/old-hercules-git-archived/`, `archive/old-uploads/`, `archive/old-package-lock.json` | stale pre-consolidation copy of the same repo |
| `~/Downloads/ai_os/hercules_folder/Hercules/.git` | `archive/old-git-repo/` | older checkout's git info (superseded by active .git) |
| hercules/node_modules, holo-mockups/node_modules, hercules/dist, all __pycache__, *.tsbuildinfo, .DS_Store | `archive/regenerables/` | regenerable build/deps |
| `~/Downloads/ai_os/launch_hercules.py`, `~/Downloads/ai_os/docker-compose.hercules.yml` | `archive/` | legacy runners (referenced old core) |
| `~/Downloads/ai_os/Hercules_Final_UI` | `archive/Hercules_Final_UI/` | superseded UI build (0 unique files) |
| `~/Downloads/Coding/ai_os/Hercules_frontend` (77M) + `~/Downloads/ai_os/Hercules_frontend` (empty) | `archive/Hercules_frontend/` (one kept, empty dropped) | scaffold duplicates |
| `~/hercules` | `archive/hercules/` (top-level under archive) | v1 Tailwind prototype |
| `~/Downloads/ai_os/hercules-core` | `archive/hercules-core/` | FastAPI ancestor |
| `~/Downloads/ai_os/ultron_hologram ` + `~/Downloads/Coding/ai_os/ultron_hologram ` (trailing spaces in names) | `archive/ultron_hologram/` (2nd nested as `ultron_hologram/ultron_hologram`) | orb source study |
| `~/Downloads/Coding/ai_os/Obsidian` | `memory/` | re-homed as canonical vault |
| `~/Downloads/ai_os/Obsidian` | `archive/obsidian-vault-duplicate/` | identical duplicate |
| `~/.config/opencode/memory/index.md(.bak,.backup)` | `archive/legacy-agent-files/opencode/` | pre-symlink backups |
| `~/.claude/CLAUDE.md` | `archive/legacy-agent-files/claude/CLAUDE.md.bak` | pre-symlink backup |
| `~/.claude/memory/` | moved to `memory/Claude-Memory/claude-memory/`, symlinked back | single source |

## Git
- Remote `origin` = `git@github-bhavya:bhavyarajput0001-bit/Hercules_UI_3.git` (unchanged).
- Local commit-author email rewritten to `bhavyarajput0001-bit@users.noreply.github.com` (GH007 compatibility).
- All local commits pushed: `faec1f1..cbe3f38 main -> origin/main`.

## Restore
Run `bash archive/restore.sh` (dry-run mode: `bash archive/restore.sh --dry-run`). See file header.