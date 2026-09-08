---

name: anthropics-skills
description: anthropics/skills - Official 21 production-grade skills from Anthropic (claude-api, mcp-builder, skill-creator, etc.)
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #pattern
  - #reference
  - #skill
---


# anthropics/skills

**Path:** `/Users/bhavyarajput/skills`
**Repo:** https://github.com/anthropics/skills

## Overview
Official Anthropic skills repository — 21 production-grade skills built by Anthropic. Reference implementations for skill architecture.

## 21 Skills

| Skill | Purpose | Key For |
|-------|---------|---------|
| `academy-guide` | Interactive learning | Education |
| `algorithmic-art` | Creative coding | Generative art |
| `brand-guidelines` | Brand compliance | Design systems |
| `canvas-design` | HTML5 Canvas graphics | Visualizations |
| **`claude-api`** | **API reference (models, pricing, streaming, tools, MCP)** | **Essential for all Claude API work** |
| `discernment-nudge` | Critical thinking prompts | Reasoning quality |
| `doc-coauthoring` | Collaborative writing | Documentation |
| `docx` / `pptx` / `xlsx` / `pdf` | Office document manipulation | Document automation |
| `frontend-design` | Design guidance | UI quality |
| `internal-comms` | Internal communication | Team workflows |
| **`mcp-builder`** | **Build MCP servers** | **MCP development** |
| `pdf` | PDF manipulation | Document processing |
| `pptx` | PowerPoint generation | Presentations |
| **`skill-creator`** | **Create new skills** | **Bootstrap skills** |
| `slack-gif-creator` | Slack GIFs | Fun/engagement |
| `theme-factory` | Theme generation | Design systems |
| `web-artifacts-builder` | Web artifacts | Web development |
| `webapp-testing` | Web app testing | QA |
| `xlsx` | Excel manipulation | Data processing |

## Must-Use Skills
1. **`claude-api`** — Authoritative reference for model IDs, pricing, params, streaming, tool use, MCP, agents, caching, token counting
2. **`skill-creator`** — Generates skill scaffolding with best practices
3. **`mcp-builder`** — Build custom MCP servers from spec
4. **`frontend-design`** — Anti-slop design guidance

## Use Cases
- Learn skill architecture from the source
- Build custom skills/MCP servers
- API reference for Claude API/SDK
- Production-ready patterns

## Quick Access
```bash
ls /Users/bhavyarajput/skills/skills/
# Read claude-api skill (essential)
cat /Users/bhavyarajput/skills/skills/claude-api/README.md
# Create new skill
# Use skill-creator via Claude Code
```

## Integration Points
- **ECC**: Add to 288 skills collection
- **Superpowers**: Portable across editors
- **Karpathy CLAUDE.md**: Behavior discipline for skills
- **JARVIS**: Skills for voice assistant capabilities

## Related
[[everything-claude-code]] [[superpowers]] [[karpathy-claude-md]] [[jarvis-command-center]]