# Agent Ecosystem Audit — 2026-08-25

## Overview
Comprehensive audit of AI agent frameworks, chat histories, and local repositories on Mac M3 Air (8GB RAM).

---

## 1. Chat Histories Found

| Tool | Location | Conversations | Accessible |
|------|----------|---------------|------------|
| **Claude Desktop** | `~/Library/Application Support/Claude/` | Sessions + config | ✅ Yes |
| **Claude Code** | `~/.claude/` | `history.jsonl` + 22 custom agents | ✅ Yes |
| **ChatGPT** | `~/Library/Application Support/com.openai.chat/conversations-v3-*/` | 340+ `.data` files | ✅ Yes |
| **OpenAI Atlas** | `~/Library/Application Support/com.openai.atlas/` | Conversations, gizmos | ✅ Yes |
| **OpenAI Codex** | `~/Library/Application Support/com.openai.codex/` | Minimal | ⚠️ Limited |

**Missing:** Cursor, Codeium, GitHub Copilot — not installed or no local history.

---

## 2. Cloned GitHub Agent Repositories

### Primary Collections

| Repo | Path | Size | Key Assets |
|------|------|------|------------|
| **everything-claude-code** | `~/cloned-repos/everything-claude-code/` | ~200MB | 70 agents, 288 skills, commands, workflows, MCP |
| **awesome-claude-code-subagents** | `~/cloned-repos/awesome-claude-code-subagents/` | ~50MB | **200+ agents** in 10 categories |
| **superpowers** | `~/cloned-repos/superpowers/` | ~30MB | 13 meta-skills (planning, debugging, review) |
| **agent-skills** | `~/cloned-repos/agent-skills/` | ~5MB | React/Vercel packages |

### Specialized Skills

| Repo | Focus |
|------|-------|
| `shadcn-skills` | UI component patterns |
| `taste-skill` | Design taste |
| `ui-ux-pro-max-skill` | Pro UI/UX |
| `github-mcp-server` | GitHub API via MCP |
| `bencium-claude-code-design-skill` | Design system |
| `awesome-opencode` | OpenCode ecosystem |

---

## 3. Agent Categories (200+ from awesome-claude-code-subagents)

| Category | Agents | Key Examples |
|----------|--------|--------------|
| **01-core-development** | 12 | backend-developer, frontend-developer, fullstack, api-designer, microservices-architect |
| **02-language-specialists** | 27 | python-pro, typescript-pro, rust-engineer, golang-pro, react-specialist, nextjs-developer |
| **03-infrastructure** | 17 | devops-engineer, kubernetes-specialist, terraform-engineer, sre-engineer, cloud-architect |
| **04-quality-security** | 18 | security-auditor, penetration-tester, code-reviewer, debugger, performance-engineer |
| **05-data-ai** | 13 | ai-engineer, ml-engineer, llm-architect, prompt-engineer, data-scientist |
| **06-developer-experience** | 16 | mcp-developer, refactoring-specialist, documentation-engineer, cli-developer |
| **07-specialized-domains** | 16 | blockchain-developer, fintech-engineer, game-developer, iot-engineer |
| **08-business-product** | 17 | product-manager, project-manager, business-analyst, ux-researcher |
| **09-meta-orchestration** | 11 | multi-agent-coordinator, workflow-orchestrator, agent-organizer |
| **10-research-analysis** | 11 | research-analyst, competitive-analyst, market-researcher, trend-analyst |

---

## 4. Custom Claude Code Agents (22 in `~/.claude/agents/`)

```
ai-ml-engineer.md          database-expert.md         learning-oriented.md       security-auditor.md
backend-specialist.md      debug-specialist.md        minimalist-essentialist.md security-paranoid.md
code-analyzer.md           devops-engineer.md         performance-optimizer.md   systems-architect.md
collaborative-teammate.md  experimental-explorer.md   pragmatic-shipper.md       test-engineer.md
craftsman-perfectionist.md first-principles-thinker.md researcher.md             work-ethic-selector.md
frontend-specialist.md     knowledge-preserver.md
```

---

## 5. Obsidian Vault Structure

**Path:** `~/Documents/Obsidian/Claude-Memory/`

```
Claude-Memory/
├── MEMORY.md                 # Main index
├── Vault-Dashboard.md        # Dashboard view
├── Vault-Overview.canvas     # Visual canvas
├── feedback/                 # Feedback entries
├── project/                  # Project notes
├── reference/                # Reference materials
├── repos/                    # Repo documentation (13 files)
│   ├── anthropics-skills.md
│   ├── awesome-claude-code-subagents.md
│   ├── awesome-opencode.md
│   ├── everything-claude-code.md
│   ├── github-mcp-server.md
│   ├── karpathy-claude-md.md
│   ├── shadcn-skills.md
│   ├── shadcn-ui-mcp-server.md
│   ├── skills-sh-claude-seo.md
│   ├── superpowers.md
│   ├── taste-skill.md
│   └── work-ethic-agents.md
└── user/                     # User preferences
```

---

## 6. Recommended Frameworks for M3 Air (8GB)

### ✅ Top Picks (Lightweight, Ollama-native)

| Framework | Memory | Ollama | Type | Best For |
|-----------|--------|--------|------|----------|
| **LangGraph** | Low | ✅ Native | Graph-based | Complex workflows, human-in-loop |
| **Atomic Agents** | **Minimal** | ✅ Via LiteLLM | Single-file | Custom agents, zero bloat |
| **Agno** | Low | ✅ Native | Full-stack | Memory + tools + knowledge |
| **Instructor** | Minimal | ✅ Via LiteLLM | Structured output | Reliable JSON from LLMs |
| **CrewAI** | Low | ✅ Via Ollama | Role-based | Team simulations |

### ⚠️ Avoid (Too Heavy for 8GB)

| Framework | Reason |
|-----------|--------|
| **OpenHands** | Full dev environment, ~2GB+ base |
| **AutoGen (full)** | Multi-agent overhead |
| **Semantic Kernel** | Enterprise-grade, heavy deps |
| **LangChain (full)** | Bloated, use LangGraph instead |

### 🎯 Integration Strategy

1. **Use LangGraph** as orchestration backbone (persistent checkpoints → Obsidian)
2. **Wrap Atomic Agents** for specialized single-purpose tools
3. **Add Agno** for long-term memory + knowledge base
4. **Sync to Obsidian** via custom MCP or file watchers
5. **Leverage existing 200+ agents** as prompt templates, not runtime deps

---

## 7. Safety & Compatibility Checklist

| Concern | Status | Mitigation |
|---------|--------|------------|
| **Memory (8GB)** | ✅ Addressed | Use lazy-loading, single-agent-at-a-time |
| **Storage (256GB)** | ✅ Fine | Repos ~300MB total, frameworks ~200MB |
| **Local-first** | ✅ All support Ollama | No cloud deps required |
| **Security** | ✅ Audited | All MIT/Apache-2, no network calls without consent |
| **M3 Apple Silicon** | ✅ Native arm64 | All Python/Node frameworks compile natively |
| **Obsidian sync** | 🔄 Manual | Build MCP server or use file watchers |

---

## 8. Next Steps

### Immediate (This Week)
- [ ] Install **LangGraph** + **Atomic Agents** + **Agno** via `uv pip install`
- [ ] Create MCP server for Obsidian vault read/write
- [ ] Import top 20 agents from awesome-claude-code-subagents as prompt templates
- [ ] Set up LangGraph checkpointing to Obsidian `project/` folder

### Short-term
- [ ] Build custom `agent-installer` meta-agent (from category 09)
- [ ] Create `memory-synthesizer` to merge ChatGPT + Claude histories
- [ ] Add `workflow-orchestrator` for multi-agent JARVIS tasks

### Long-term
- [ ] Fine-tune local models (qwen3.5, gemma3) on your agent patterns
- [ ] Build self-improving agent loop using `verification-before-completion` skill
- [ ] Deploy to JARVIS Command Center (localhost:8000)

---

## 9. Key Links

- **LangGraph**: https://github.com/langchain-ai/langgraph
- **Atomic Agents**: https://github.com/BrainBlend-AI/atomic-agents
- **Agno**: https://github.com/agno-agi/agno
- **Instructor**: https://github.com/jxnl/instructor
- **Obsidian MCP**: https://github.com/kalmysh/obsidian-mcp (community)

---

*Generated by Claude Code audit — saved to Obsidian vault for persistence*