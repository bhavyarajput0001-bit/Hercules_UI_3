---

name: shadcn-skills
description: mattbx/shadcn-skills - shadcn/ui component skills for AI assistants (discovery + review)
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
  - #skill
---


# shadcn-skills (mattbx/shadcn-skills)

**Path:** `/Users/bhavyarajput/shadcn-skills`
**Repo:** https://github.com/mattbx/shadcn-skills

## Overview
shadcn/ui component skills — helps LLMs understand and use shadcn/ui correctly. Prevents hallucinated/incorrect component usage.

## 2 Skills

| Skill | Purpose |
|-------|---------|
| `shadcn-component-discovery` | Find and understand shadcn components |
| `shadcn-component-review` | Review component usage for best practices |

## Use Cases
- Projects using shadcn/ui — prevents AI slop in component usage
- AI-assisted UI development with correct patterns
- Component audit and refactoring
- Team standardization on shadcn/ui patterns

## Integration Points
- **shadcn-ui-mcp-server**: Live component data via MCP
- **taste-skill**: Design quality enforcement
- **ECC**: Add to skills collection
- **anthropics/frontend-design**: Design guidance layer

## Quick Access
```bash
ls /Users/bhavyarajput/shadcn-skills/skills/
```

## Related
[[shadcn-ui-mcp-server]] [[taste-skill]] [[everything-claude-code]] [[anthropics-skills]]