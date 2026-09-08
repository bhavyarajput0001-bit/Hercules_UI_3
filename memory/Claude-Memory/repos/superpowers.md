---

name: superpowers
description: obra/superpowers - Cross-platform skill/plugin framework for AI editors (Claude Code, Codex, Cursor, Gemini, Kimi, OpenCode)
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# superpowers

**Path:** `/Users/bhavyarajput/superpowers`
**Repo:** https://github.com/obra/superpowers

## Overview
Write-once, run-anywhere skill framework. Skills work across Claude Code, Codex, Cursor, Gemini, Kimi, OpenCode, Devin, Hermes, Pi.

## Key Components
- **16 skills** in `skills/` (portable across editors)
- **Plugin manifests** for 8+ editors:
  - `.claude-plugin` — Claude Code
  - `.codex-plugin` — Codex
  - `.cursor-plugin` — Cursor
  - `.devin-plugin` — Devin
  - `.hermes-plugin` — Hermes
  - `.kimi-plugin` — Kimi
  - `.opencode` — OpenCode
  - `.pi` — Pi

## Core Files
- `hooks/` — Automation hooks
- `scripts/` — Skill management utilities
- `RELEASE-NOTES.md` — 94K lines changelog
- `docs/` — Documentation

## Use Cases
- Teams using multiple AI editors
- Distributing skills as portable packages
- CI/CD integration via hooks
- Cross-editor standardization

## Integration Points
- **ECC**: Portable skills work across ECC's 288 skills
- **anthropics/skills**: Reference implementations
- **Karpathy CLAUDE.md**: Universal behavior layer

## Quick Access
```bash
ls /Users/bhavyarajput/superpowers/skills/
cat /Users/bhavyarajput/superpowers/CLAUDE.md
```

## Related
[[everything-claude-code]] [[anthropics-skills]] [[karpathy-claude-md]]