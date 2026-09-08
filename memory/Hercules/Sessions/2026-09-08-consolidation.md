# Sessions — 2026-09-08: Repo + Memory Consolidation

## What happened
- Decided to pull every Hercules-linked file into one common folder:
  `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/`
- Kept everything **reversible** (nothing deleted): dups + regenerables archived, `MANIFEST.md` + `restore.sh`.
- Moved the active repo (`.git`, `hercules/`, `holo-mockups/`) into the target; archived the target's stale copies and other dup codebases.
- Created canonical Obsidian vault at `memory/`, symlinked all agent memories into it, and wired the autosync LaunchAgent.

## Decisions made (user-confirmed)
1. Target folder: `hercules_folder/Hercules/`
2. Duplicates: reversible archive (do NOT delete); must be undoable.
3. FRIDAY agent: leave alone.
4. Git: keep `.git`, checkpoint commit before moving, keep GitHub push (`Hercules_UI_3.git`).
5. Canonical vault name: `memory/`
6. Agent wiring: **symlink everything** into the vault.
7. Sync trigger: 15-min LaunchAgent **+ instant WatchPaths**.
8. Git: hercules repo + GitHub push + it doubles as the Obsidian vault.

## Moved summary (see archive/MANIFEST.md for exact entries)
- Active repo: old path `~/Downloads/Coding/ai_os/Hercules` → target.
- Archived: `Hercules_Final_UI`, `Hercules_frontend` (×2), `~/hercules` (v1), `hercules-core`, `ultron_hologram` (×2), `launch_hercules.py`, `docker-compose.hercules.yml`, premade vault duplicate, old target copies, regenerables (node_modules, dist, __pycache__), screenshots/uploads.

## Next: verify + commit + push + READMEs.