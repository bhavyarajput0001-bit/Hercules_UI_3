---
name: work-ethic-agents
description: 11 universal work ethic agents for all Claude Code sessions
tags: [agents, work-ethic, universal, philosophy]
created: 2026-08-23
---

# Work Ethic Agents — Universal Claude Code Agents

Created: 2026-08-23  
Location: `~/.claude/agents/` (available in ALL Claude Code sessions)

## The 11 Agents

| Agent | Core Philosophy | Model | Best For |
|-------|----------------|-------|----------|
| `pragmatic-shipper` | "Ship it, iterate later" | Sonnet | MVPs, deadlines, prototypes, uncertainty |
| `craftsman-perfectionist` | "Code is craft" | Opus | Core libs, long-lived code, public APIs, refactoring |
| `first-principles-thinker` | "Question everything, build from truth" | Opus | Novel problems, architecture, bottlenecks, strategy |
| `security-paranoid` | "Assume breach, verify everything" | Opus | Auth, payments, PII, public APIs, infra |
| `learning-oriented` | "Every task is a lesson" | Sonnet | New tech, onboarding, complex decisions, mentoring |
| `performance-optimizer` | "Measure, don't guess" | Sonnet | Bottlenecks, scale, cost, latency |
| `minimalist-essentialist` | "Less but better" | Sonnet | Bloat cleanup, API design, scope creep, debt |
| `collaborative-teammate` | "We > I" | Sonnet | Code review, pair programming, team conventions |
| `systems-architect` | "See the whole, design the parts" | Opus | Service design, platform, cross-cutting, migrations |
| `experimental-explorer` | "Try weird things, learn fast" | Sonnet | R&D, spikes, hackathons, tech evaluation |
| `knowledge-preserver` | "Context is king" | Sonnet | ADRs, onboarding docs, runbooks, institutional memory |
| `work-ethic-selector` | "Match the mindset to the moment" | Sonnet | Meta-agent: helps choose the right agent |

## Usage

### Direct Invocation (in any Claude Code session)
```bash
# Use an agent directly
> Use the pragmatic-shipper agent to build this MVP

# Or via Task tool
Task(agent="pragmatic-shipper", prompt="Build a quick auth prototype")
```

### Using the Selector (when unsure)
```bash
> Use the work-ethic-selector agent to help me choose the right approach for: [describe task]
```

## Design Principles

Each agent embodies a **distinct work ethic** — not just a skill set, but a philosophy:
- **Decision frameworks** for consistent choices
- **Anti-patterns** to avoid
- **When to use / NOT use** guidance
- **Output style** expectations
- **Example behaviors** showing the mindset in action

## Integration with Existing Repos

These agents complement (not replace) existing agents:
- **ECC agents** (70+) — domain-specific (react-reviewer, python-reviewer, etc.)
- **Awesome subagents** (30+) — curated domain experts
- **Work ethic agents** (11) — universal mindsets applicable to ANY domain

**Recommended workflow:** Use `work-ethic-selector` → pick mindset → combine with domain agent
```
Task(agent="work-ethic-selector", prompt="Choose mindset for: new payment API")
→ Recommends: security-paranoid + craftsman-perfectionist
→ Then: Task(agent="security-paranoid", prompt="Design payment API with Stripe")
```

## Models Used

- **Opus** (4 agents): Deep reasoning needed — craftsman, first-principles, security, systems
- **Sonnet** (7 agents): Balanced execution — others

## Universality

These agents live in `~/.claude/agents/` — they load in **every Claude Code session**, across all projects. No per-project setup needed.

## Related Memories

- [[repos/everything-claude-code]] — 70 ECC agents
- [[repos/awesome-claude-code-subagents]] — 30+ curated agents
- [[repos/anthropics-skills]] — skill-creator for making more agents