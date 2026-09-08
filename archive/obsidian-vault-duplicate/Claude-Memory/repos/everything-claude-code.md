---

name: everything-claude-code
description: affaan-m/everything-claude-code - The motherlode: 70+ agents, 96 commands, 288 skills, workflows, MCP configs, dashboard
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# everything-claude-code (ECC)

**Path:** `/Users/bhavyarajput/ECC`
**Repo:** https://github.com/affaan-m/everything-claude-code

## Overview
Massive monorepo aggregating EVERYTHING for Claude Code — agents, commands, skills, workflows, MCP configs, hooks, dashboard. The "meta-framework" for Claude Code power users.

## Key Components

| Component | Count | Location |
|-----------|-------|----------|
| Agents | 70+ | `agents/` |
| Commands | 96 | `commands/` |
| Skills | 288 | `skills/` |
| Workflows | Multiple | `workflows/` |
| MCP Configs | Many | `mcp-configs/` |
| Hooks | Multiple | `hooks/` |

## Core Files
- `ecc_dashboard.py` — Web UI for managing agents/commands/skills
- `ecc2/` — Secondary implementation
- `the-longform-guide.md` — Comprehensive guide
- `the-shortform-guide.md` — Quick reference
- `the-security-guide.md` — Security best practices
- `WORKING-CONTEXT.md` — Project context (80K lines)
- `AGENTS.md` → `CLAUDE.md` — Main config

## Use Cases
- One-stop shop for Claude Code standardization
- Team agent/command/skill library
- Building custom agent fleets
- Learning best practices from massive real-world config

## Integration Points
- **Superpowers**: Portable skills work across ECC's fleet
- **awesome-claude-code-subagents**: Drop specialized agents into ECC
- **GitHub MCP**: Native GitHub ops in ECC dashboard/workflows
- **anthropics/skills**: Reference implementations (claude-api, mcp-builder, skill-creator)
- **Karpathy CLAUDE.md**: Universal behavior upgrade

## Quick Access
```bash
ls /Users/bhavyarajput/ECC/skills/ | head -30
ls /Users/bhavyarajput/ECC/agents/
ls /Users/bhavyarajput/ECC/commands/
python3 /Users/bhavyarajput/ECC/ecc_dashboard.py
```

## Related
[[superpowers]] [[awesome-claude-code-subagents]] [[github-mcp-server]] [[anthropics-skills]] [[karpathy-claude-md]]