---

name: karpathy-claude-md
description: multica-ai/andrej-karpathy-skills - Single CLAUDE.md from Karpathy's LLM coding pitfalls observations
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #project
  - #reference
---


# karpathy-claude-md (andrej-karpathy-skills)

**Path:** `/Users/bhavyarajput/andrej-karpathy-skills`
**Repo:** https://github.com/multica-ai/andrej-karpathy-skills

## Overview
Single CLAUDE.md distilled from Andrej Karpathy's observations on LLM coding pitfalls. Battle-tested patterns from a top AI practitioner. Drop into any project for immediate behavior improvement.

## Key Pitfalls Addressed

| Pitfall | Karpathy's Fix |
|---------|----------------|
| Over-engineering / premature abstraction | YAGNI — write minimal code |
| Ignoring existing patterns | READ first, then write |
| Verbose/defensive code | Concise, idiomatic |
| Not reading files before editing | **Always Read before Edit** |
| Hallucinating APIs | Check imports, docs, types |
| Missing error handling | Explicit error cases |
| Inconsistent style | Match surrounding code |

## Core Files
- **`CLAUDE.md`** (2.3K lines) — Core configuration, drop into any project
- **`EXAMPLES.md`** (14.8K lines) — Extensive before/after patterns
- **`README.md`** / **`README.zh.md`** — Documentation
- **`CURSOR.md`** — Cursor-specific config
- `skills/` — Modular extracts

## Key Principles
1. **Read before write** — Never edit unread files
2. **Match existing style** — Consistency > preference
3. **Minimal changes** — Smallest diff that works
4. **Explicit over implicit** — Clear intent
5. **Test behavior** — Verify, don't assume

## Use Cases
- **Immediate behavior upgrade** — Paste CLAUDE.md into any project
- Solo developers & teams wanting Karpathy-level discipline
- Code review checklist via EXAMPLES.md
- Works with ANY Claude Code setup (universal)

## Quick Access
```bash
cat /Users/bhavyarajput/andrej-karpathy-skills/CLAUDE.md
cat /Users/bhavyarajput/andrej-karpathy-skills/EXAMPLES.md | head -100
```

## Integration Points
- **Universal** — Works with ECC, Superpowers, any setup
- **ECC**: Add to CLAUDE.md or as skill
- **Superpowers**: Portable behavior layer
- **anthropics/skills**: Discipline for skill development
- **JARVIS**: Coding discipline for voice assistant

## Related
[[everything-claude-code]] [[superpowers]] [[anthropics-skills]] [[jarvis-command-center]]