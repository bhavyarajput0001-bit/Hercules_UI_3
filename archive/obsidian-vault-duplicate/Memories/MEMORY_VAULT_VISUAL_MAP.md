# Memory Vault Visual Organization Map
## Color-Coded Node & Connection System

---

## 🎨 COLOR SPECIFICATION LEGEND

| Color | Hex | Category | Purpose |
|-------|-----|----------|---------|
| 🔴 **Red** | `#FF4444` | **Core Identity** | User profile, preferences, working style |
| 🟠 **Orange** | `#FF8C00` | **Project Active** | JARVIS Command Center, active builds |
| 🟡 **Yellow** | `#FFD700` | **Session History** | Past chats, session records, timestamps |
| 🟢 **Green** | `#32CD32` | **Reference/External** | API keys, models, external systems, repos |
| 🔵 **Blue** | `#4169E1` | **Skills/Tools** | Installed skills, CLI tools, MCP servers |
| 🟣 **Purple** | `#9370DB` | **Integration** | Cross-repo patterns, workflows, sync systems |
| 🩷 **Pink** | `#FF69B4` | **Memory Vault** | Obsidian structure, memory files, folders |
| 🟤 **Brown** | `#8B4513` | **Archive/Completed** | Finished sessions, deprecated configs |
| ⚫ **Gray** | `#808080` | **Meta/System** | Config, scripts, automation, cron jobs |

---

## 🧱 WALL 1: USER IDENTITY WALL (Red)
**Nodes:**
- `User Profile` — Role: Full-stack dev / AI systems builder
- `Working Style` — Concise CLI, action-first, TDD, modular async
- `Stack` — Python/TS, FastAPI/Next.js/Tailwind, Ollama + Omniroute
- `Environment` — macOS M3 Air 8/256, zsh, ~/Documents/Obsidian

**Connections:** → Project Wall (active builds), → Reference Wall (API keys)

---

## 🧱 WALL 2: PROJECT ACTIVE WALL (Orange)
**Nodes:**
- `JARVIS Command Center` — Voice-first AI, web UI, telemetry, camera
  - Sub-nodes: Voice Assistant Dashboard, Multi-empire Dashboard
- `Obsidian Memory Vault` — Auto-load configured, graph view
  - Sub-nodes: `hermes_memory/`, `Claude-Memory/`, `AI-Memory/`, `Memories/`

**Connections:** → Session Wall (history), → Skills Wall (tools used), → Integration Wall (sync)

---

## 🧱 WALL 3: SESSION HISTORY WALL (Yellow)
**Nodes:**
- `Session 2026-08-25 10:49` — GitHub repo research, vault update
- `Session 2026-08-25 09:42` — Slack/Telegram workflow connect
- `Session 2026-08-23` — JARVIS built + Obsidian auto-load
- `Session 2026-08-25 (ACPR)` — Empty ACP session

**Recall Triggers:** "Recall last chat" | "Recall past session" | "Wake up, daddy's home"
**Connections:** → Project Wall (context), → Reference Wall (tools used)

---

## 🧱 WALL 4: REFERENCE/EXTERNAL WALL (Green)
**Nodes:**
- `Omniroute API Key` — `sk-d656ee33b2d34cb0-f54790-3ecdd835`
- `Ollama Models` — llama3.2:3b, qwen3.5, gemma3:1b, minimax-m2.1:cloud
- `Open Design MCP` — Design tooling server
- `Repositories Index` — 11 cloned AI/dev repos
- `External Systems` — Docs, dashboards, resources

**Connections:** → Project Wall (JARVIS uses), → Skills Wall (MCP servers)

---

## 🧱 WALL 5: SKILLS & TOOLS WALL (Blue)
**Nodes (Installed/Active):**
- `hermes-agent` — Config, theme, extend, orchestrate
- `obsidian` — Read/search/create/edit notes
- `obsidian-auto-memory` — Auto-load vault at session start
- `github-repo-management` — Clone/create/fork, remotes, releases
- `codebase-inspection` — LOC, languages, ratios
- `systematic-debugging` — 4-phase root cause
- `test-driven-development` — RED-GREEN-REFACTOR
- `subagent-driven-development` — 2-stage review delegation
- `plan` / `writing-plans` — Markdown plans to .hermes/plans/
- `accessibility-audit` — WCAG 2.2 compliance
- `macos-computer-use` — Background desktop control

**Repositories (Cloned):**
- `everything-claude-code` — 70 agents, 96 commands, 288 skills
- `superpowers` — Cross-editor skill framework
- `awesome-claude-code-subagents` — Domain-expert agents
- `github-mcp-server` — Official GitHub MCP
- `anthropics-skills` — 21 official skills
- `shadcn-skills` / `shadcn-ui-mcp-server` — UI components
- `taste-skill` — Anti-slop design enforcement
- `karpathy-claude-md` — Coding discipline
- `skills-sh-claude-seo` — 13 SEO commands
- `work-ethic-agents` — 11 mindset agents

**Connections:** → Project Wall (used in builds), → Integration Wall (patterns)

---

## 🧱 WALL 6: INTEGRATION PATTERNS WALL (Purple)
**Nodes:**
- `5 Stacks` — Python/TS, FastAPI/Next.js, Tailwind/shadcn, pip/uv/pnpm
- `3-Layer Architecture` — Core → Integration → Application
- `Cross-Repo Synergies` — Skills ↔ Repos ↔ Memory ↔ Agents
- `Obsidian ↔ GitHub Sync` — Cron every 30min, `obsidian-github-sync.sh`
- `Shared Agent Memory` — `bhavyarajput0001-bit/shared-agent-memory` (private)

**Connections:** → All walls (binding layer)

---

## 🧱 WALL 7: MEMORY VAULT STRUCTURE WALL (Pink)
**Nodes:**
```
~/.hermes/memories/
├── MEMORY.md (index, 10 entries)
├── user/
│   ├── profile.md
│   └── working-style.md
├── feedback/
│   ├── code-review.md
│   └── communication.md
├── project/
│   ├── jarvis-command-center.md
│   ├── session-2026-08-23-jarvis-obsidian.md
│   ├── session-2026-08-23.md
│   └── session-2026-08-25-github-repos.md
├── reference/
│   ├── external-systems.md
│   ├── omniroute-api-key.md
│   ├── ollama-models.md
│   ├── open-design-mcp.md
│   ├── integration-patterns.md
│   └── repos/
│       ├── README.md
│       ├── everything-claude-code.md
│       ├── superpowers.md
│       ├── awesome-claude-code-subagents.md
│       ├── github-mcp-server.md
│       ├── awesome-opencode.md
│       ├── anthropics-skills.md
│       ├── shadcn-skills.md
│       ├── shadcn-ui-mcp-server.md
│       ├── taste-skill.md
│       ├── karpathy-claude-md.md
│       ├── skills-sh-claude-seo.md
│       └── work-ethic-agents.md

~/Documents/Obsidian/
├── hermes_memory/ (synced copy)
├── Claude-Memory/ (auto-load skill)
├── AI-Memory/
├── Memories/
│   ├── Session_2026-08-25_GitHub_Repos_Research.md
│   ├── Memory_Vault_Updates.md
│   └── Open_Design_Helper_Benefits.md
└── FRIDAY/
```

**Graph View Config:** Groups by folder, colors by tag, links by [[wikilinks]]

---

## 🧱 WALL 8: ARCHIVE/COMPLETED WALL (Brown)
**Nodes:**
- AutoCAD request (declined, alternatives given)
- Initial repo research (superseded by 2026-08-25 session)
- Homebrew installs (node, ollama, opencode, gh, ripgrep, atuin, python@3.14)
- Atuin history import (completed)
- GitHub repo creation (completed)

---

## 🧱 WALL 9: META/SYSTEM WALL (Gray)
**Nodes:**
- `Cron Jobs` — `Obsidian Vault Autosync` (every 30min)
- `Sync Scripts` — `obsidian-autosync.sh`, `github-autosync.sh`, `obsidian-github-sync.sh`
- `Hermes Config` — Profile: default, skills/, plugins/, cron/, memories/
- `Session DB` — SQLite FTS5, `session_search` tool
- `Memory Tool` — Persistent cross-session storage

---

## 🔗 CONNECTION MAP (Cross-Wall Links)

```
USER IDENTITY (Red)
    │
    ├──→ PROJECT ACTIVE (Orange) ──→ MEMORY VAULT (Pink)
    │         │                           │
    │         ├──→ SKILLS/TOOLS (Blue)    ├──→ SESSION HISTORY (Yellow)
    │         │         │                 │         │
    │         │         └──→ INTEGRATION (Purple) ←──┘
    │         │                   │
    │         └──→ REFERENCE (Green) ←──────────────┘
    │
    └──→ META/SYSTEM (Gray) ←────────────────────────┘
              │
              └──→ ARCHIVE (Brown)
```

---

## 📊 GRAPH VIEW OPTIMIZATION SETTINGS

```yaml
# Obsidian Graph View Settings
groups:
  - name: "Core Identity"
    query: "tag:#user"
    color: "#FF4444"
  - name: "Active Projects"
    query: "tag:#project"
    color: "#FF8C00"
  - name: "Sessions"
    query: "tag:#session"
    color: "#FFD700"
  - name: "References"
    query: "tag:#reference"
    color: "#32CD32"
  - name: "Skills"
    query: "tag:#skill"
    color: "#4169E1"
  - name: "Integrations"
    query: "tag:#integration"
    color: "#9370DB"
  - name: "Memory Vault"
    query: "path:Memories"
    color: "#FF69B4"
  - name: "Archive"
    query: "tag:#archive"
    color: "#8B4513"
  - name: "System"
    query: "tag:#meta"
    color: "#808080"

layout:
  force_directed: true
  repel_force: 0.5
  link_distance: 100
  show_tags: true
  show_tags_on_hover: true
  show_existing_only: false
```

---

## 🏷️ TAGGING CONVENTION FOR NODES

| Prefix | Example | Wall |
|--------|---------|------|
| `#user/` | `#user/profile` | Red |
| `#project/` | `#project/jarvis` | Orange |
| `#session/` | `#session/2026-08-25` | Yellow |
| `#ref/` | `#ref/omniroute` | Green |
| `#skill/` | `#skill/hermes-agent` | Blue |
| `#integration/` | `#integration/sync` | Purple |
| `#memory/` | `#memory/vault` | Pink |
| `#archive/` | `#archive/autocad` | Brown |
| `#meta/` | `#meta/cron` | Gray |

---

## 🎯 QUICK NAVIGATION COMMANDS

| Phrase | Action | Walls Activated |
|--------|--------|-----------------|
| "Recall last chat" | `session_search(limit=1, sort=newest)` | Yellow → All |
| "Recall past session" | `session_search(query=...)` | Yellow → Project, Reference |
| "Wake up, daddy's home" | Full context restore | All walls |
| "Show memory graph" | Open Obsidian graph view | Pink (visual) |
| "Sync memory" | Run `obsidian-github-sync.sh` | Purple, Gray |

---

*Generated: 2026-08-25 | Vault: hermes_memory | Sync: bhavyarajput0001-bit/shared-agent-memory*