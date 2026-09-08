---
tags:
  - #index
  - #memory
---

# Hercules Memory Vault — Master Index

Canonical, auto-synced Obsidian vault. Single source of truth for every agent: **opencode**, **Claude**, **Hermes**, and the **Hercules app** itself. Lives inside the Hercules repo and is git-tracked + pushed to GitHub.

Vault root: `/Users/bhavyarajput/Downloads/ai_os/hercules_folder/Hercules/memory/`

## Sections
- [[Hercules/README|Hercules]] — THIS project (architecture, brain, sessions, decisions, app brain-memory)
- [[AI-Memory/INDEX.md|AI-Memory]] — opencode agent memory (master index + opencode-index.md)
- [[Claude-Memory/MEMORY.md|Claude-Memory]] — Claude agent memory (CLAUDE.md, reference/)
- [[hermes_memory/Index.md|hermes_memory]] — Hermes agent memory (USER.md, MEMORY.md)
- [[Memories/MEMORY_VAULT_VISUAL_MAP.md|Memories]] — cross-agent estate notes
- [[FRIDAY/2026-08-02.md|FRIDAY]] — FRIDAY agent daily logs

## How sync works
- Agent home files are **symlinks** into this vault (single source of truth).
- LaunchAgent `com.user.obsidian-autosync` runs the autosync script every 15 min AND on-change via `WatchPaths`.
- Script: `hercules/scripts/memory-autosync.sh` — commits + pushes the Hercules repo.
- App brain-memory mirrors to `Hercules/Brain-Memory/` (markdown).

## Last updated
Auto-updated by autosync: see `git log` in the Hercules repo.