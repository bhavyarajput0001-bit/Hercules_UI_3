---
tags:
  - #index
  - #memory
  - #pattern
---

# AI Memory Vault

Persistent memory for AI assistant across sessions. Optimized for fast retrieval and pattern recognition.

## Structure

```
AI-Memory/
├── README.md              # This file
├── INDEX.md               # Master index (auto-generated)
├── sessions/              # Session summaries & context
├── patterns/              # Reusable patterns & solutions
├── code/                  # Code snippets & implementations
├── projects/              # Project-specific knowledge
├── references/            # External docs, APIs, configs
├── agents/                # Agent definitions & behaviors
├── skills/                # Skill configs & learnings
├── tools/                 # Tool configurations & MCP servers
└── meta/                  # Vault metadata & optimization
```

## Memory Types

| Type | Folder | Retention | Use For |
|------|--------|-----------|---------|
| Session | `sessions/` | 30 days | Context, decisions, outcomes |
| Pattern | `patterns/` | Permanent | Reusable solutions, architectures |
| Code | `code/` | Permanent | Snippets, functions, modules |
| Project | `projects/` | Project life | Specs, decisions, progress |
| Reference | `references/` | Permanent | APIs, configs, docs |
| Agent | `agents/` | Permanent | Agent configs, behaviors |
| Skill | `skills/` | Permanent | Skill configs, customizations |
| Tool | `tools/` | Permanent | MCP, CLI, integrations |
| Meta | `meta/` | Permanent | Vault stats, optimization |

## Tagging System

- `#session/YYYY-MM-DD` - Session date
- `#project/name` - Project tag
- `#pattern/type` - Pattern category
- `#tool/name` - Tool reference
- `#agent/name` - Agent reference
- `#skill/name` - Skill reference
- `#lang/name` - Language tag
- `#framework/name` - Framework tag
- `#status/active\|done\|archived` - Status
- `#priority/high\|med\|low` - Priority

## Auto-Generation

Run `python3 meta/generate_index.py` to rebuild INDEX.md