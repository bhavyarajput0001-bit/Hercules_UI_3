---

name: taste-skill
description: Leonxlnx/taste-skill - "Gives your AI good taste" - anti-slop skill preventing generic, boring AI output
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
  - #skill
---


# taste-skill

**Path:** `/Users/bhavyarajput/taste-skill`
**Repo:** https://github.com/Leonxlnx/taste-skill

## Overview
"Gives your AI good taste" — anti-slop skill that stops LLMs from generating generic, boring, template-looking output. Design quality gate.

## Key Components
- `skills/` — Design taste enforcement skills
- `assets/` — Reference designs, examples
- `examples/` — Before/after comparisons
- `research/` — Design principles, taste theory
- `scripts/` — Enforcement tooling
- `CHANGELOG.md` — Active development

## Philosophy
- **Anti-template**: Rejects default Bootstrap/Tailwind aesthetics
- **Intentional design**: Every choice has rationale
- **Context-aware**: Adapts to project type (landing, dashboard, portfolio)
- **Audit-first**: Redesigns start with critique

## Use Cases
- Landing pages, portfolios, marketing sites
- Design quality gate in CI/CD
- Teams wanting consistent design quality from AI
- Works as portable skill or standalone guidance

## Integration Points
- **shadcn-ui-mcp-server**: Live component data + taste enforcement
- **shadcn-skills**: Correct component usage + good taste
- **anthropics/frontend-design**: Double-layer design guidance
- **ECC**: Add as skill to 288 collection
- **Superpowers**: Portable across editors
- **Karpathy CLAUDE.md**: Behavioral discipline

## Quick Access
```bash
cat /Users/bhavyarajput/taste-skill/README.md
ls /Users/bhavyarajput/taste-skill/skills/
ls /Users/bhavyarajput/taste-skill/assets/
```

## Related
[[shadcn-ui-mcp-server]] [[shadcn-skills]] [[anthropics-skills]] [[everything-claude-code]] [[karpathy-claude-md]]