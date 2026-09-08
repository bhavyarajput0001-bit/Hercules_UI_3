---

name: integration-patterns
description: Cross-repository integration patterns and recommended stacks for maximum efficiency
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #pattern
  - #project
  - #reference
---


# Integration Patterns — Cross-Repository Synergies

## Core Pattern: The Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│  BEHAVIOR LAYER (Universal)                             │
│  Karpathy CLAUDE.md → Discipline for ALL coding         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  CAPABILITY LAYER (MCP + Skills)                        │
│  GitHub MCP + shadcn MCP + anthropics/skills            │
│  (claude-api, mcp-builder, skill-creator)               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  ORCHESTRATION LAYER (Agents + Commands + Workflows)    │
│  ECC (70 agents, 96 commands, 288 skills, workflows)    │
│  Superpowers (portable across editors)                  │
│  awesome-subagents (domain experts)                     │
└─────────────────────────────────────────────────────────┘
```

---

## Stack 1: Maximum Claude Code Power (Recommended Default)

**Components:**
- `ECC` — Full agent/command/skill fleet + dashboard
- `Karpathy CLAUDE.md` — Drop into `~/.claude/CLAUDE.md` or project
- `GitHub MCP` — Native GitHub ops

**Setup:**
```bash
# 1. Add Karpathy discipline to your global config
cat /Users/bhavyarajput/andrej-karpathy-skills/CLAUDE.md >> ~/.claude/CLAUDE.md

# 2. Run ECC dashboard
python3 /Users/bhavyarajput/ECC/ecc_dashboard.py

# 3. Configure GitHub MCP in Claude Code
# Add to ~/.claude/mcp_servers.json or use ECC's mcp-configs/
```

**Result:** 70 agents + 288 skills + 96 commands + GitHub native ops + Karpathy discipline

---

## Stack 2: Design Quality Fortress

**Components:**
- `taste-skill` — Anti-slop enforcement
- `shadcn-ui-mcp-server` — Live component data
- `shadcn-skills` — Correct usage patterns
- `anthropics/frontend-design` — Design guidance

**Setup:**
```bash
# 1. Install shadcn MCP server
cd /Users/bhavyarajput/shadcn-ui-mcp-server && npm install && npm run build

# 2. Add to Claude Code MCP config
# {"shadcn-ui": {"command": "node", "args": ["/Users/bhavyarajput/shadcn-ui-mcp-server/dist/index.js"]}}

# 3. Load taste-skill as skill in ECC or directly
# 4. Use anthropics/frontend-design skill for guidance
```

**Result:** Zero-hallucination shadcn/ui usage + taste enforcement + design guidance

---

## Stack 3: Skill Development Laboratory

**Components:**
- `anthropics/skills` — Reference implementations
  - `claude-api` — Authoritative API reference
  - `skill-creator` — Bootstrap new skills
  - `mcp-builder` — Build MCP servers
- `Superpowers` — Make skills portable
- `ECC` — Test in massive skill collection

**Workflow:**
```bash
# 1. Study reference implementations
cat /Users/bhavyarajput/skills/skills/claude-api/README.md
cat /Users/bhavyarajput/skills/skills/skill-creator/README.md
cat /Users/bhavyarajput/skills/skills/mcp-builder/README.md

# 2. Create new skill using skill-creator (via Claude Code)
# "Use the skill-creator skill to make a new skill for X"

# 3. Add Superpowers manifests for cross-editor support
# 4. Test in ECC's 288-skill environment
```

**Result:** Professional-grade skill/MCP development with official patterns

---

## Stack 4: JARVIS Voice Assistant Enhancement

**Components:**
- `GitHub MCP` — Voice-controlled GitHub
- `Karpathy CLAUDE.md` — Coding discipline
- `ECC commands` — 96 automation commands
- `skills-sh/claude-seo` — SEO for project sites
- `awesome-subagents` — Specialized agents

**Setup:**
```bash
# 1. Integrate GitHub MCP with JARVIS FastAPI backend
# 2. Add Karpathy CLAUDE.md to JARVIS project
# 3. Use ECC commands via JARVIS command execution
# 4. Deploy SEO commands for project documentation sites
```

**Result:** Voice-controlled development + GitHub + SEO + disciplined coding

---

## Stack 5: Cross-Editor Team Standardization

**Components:**
- `Superpowers` — Write once, run on 8+ editors
- `awesome-opencode` — OpenCode ecosystem awareness
- `ECC` — Claude Code reference implementation

**Use Case:** Team uses Cursor, Claude Code, Codex, OpenCode — same skills work everywhere.

**Setup:**
```bash
# 1. Develop skills in Superpowers format
# 2. Add manifests for each editor (.claude-plugin, .cursor-plugin, etc.)
# 3. Distribute via git submodule or npm package
# 4. Team installs once, works everywhere
```

---

## Pattern: MCP as Universal Interface

| MCP Server | Purpose | Works With |
|------------|---------|------------|
| GitHub MCP | GitHub API | All MCP clients |
| shadcn-ui MCP | Component data | All MCP clients |
| Custom (mcp-builder) | Anything | All MCP clients |

**Key Insight:** Build once (MCP), use everywhere (Claude Code, Cursor, OpenCode, custom agents)

---

## Pattern: Skill → Agent → Command → Workflow

```
Skill (atomic capability)
    │
    ▼
Agent (specialized persona with skills)
    │
    ▼
Command (slash command invoking agent)
    │
    ▼
Workflow (multi-agent orchestration)
```

**ECC implements all 4 layers.** Superpowers makes Skills portable. awesome-subagents provides Agents.

---

## Pattern: Quality Gates at Each Layer

| Layer | Quality Gate | Repo |
|-------|--------------|------|
| Behavior | Karpathy discipline | karpathy-claude-md |
| Code | Read-before-write, minimal diff | karpathy-claude-md |
| Design | Taste enforcement | taste-skill |
| UI Components | Correct usage + live data | shadcn-skills + shadcn-MCP |
| API Usage | Official reference | anthropics/claude-api |
| Security | Specialized agents | awesome-subagents |

---

## Recommended Daily Workflow

```bash
# Morning: Sync all repos
for repo in ECC superpowers awesome-claude-code-subagents github-mcp-server skills taste-skill andrej-karpathy-skills; do
  git -C /Users/bhavyarajput/$repo pull
done

# Start ECC dashboard
python3 /Users/bhavyarajput/ECC/ecc_dashboard.py &

# Start shadcn MCP (if doing UI work)
cd /Users/bhavyarajput/shadcn-ui-mcp-server && node dist/index.js &

# Work with Karpathy discipline active (in CLAUDE.md)
```

---

## Obsidian Vault Queries for Pattern Recognition

```dataview
# All repos with "skill" in name
LIST FROM "repos" WHERE contains(file.name, "skill")

# All MCP-related repos
LIST FROM "repos" WHERE contains(file.name, "mcp")

# All official repos (GitHub, Anthropic)
LIST FROM "repos" WHERE contains(description, "Official") OR contains(description, "official")

# Repos by type
LIST FROM "repos" WHERE contains(description, "skill")
LIST FROM "repos" WHERE contains(description, "agent")
LIST FROM "repos" WHERE contains(description, "MCP")
```

---

## Maintenance Notes

- **Weekly**: `git pull` all repos, check for new skills/agents/commands
- **Monthly**: Review ECC dashboard for new additions
- **Per Project**: Add Karpathy CLAUDE.md, relevant MCP servers, needed skills
- **Vault**: Auto-syncs — just edit .md files in Obsidian or CLI

---

*Pattern recognition enabled: 11 repos, 5 integration stacks, 3-layer architecture*