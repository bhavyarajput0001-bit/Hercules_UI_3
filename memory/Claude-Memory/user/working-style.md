---

name: working-style
description: Communication preferences and collaboration approach
metadata:
  type: user
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
---


# Working Style

## Communication Preferences

### Response Format
- Prefer concise, direct responses - minimal markdown in CLI
- Technical depth: assume competence, don't over-explain basics
- Code comments: minimal, only for non-obvious logic
- Use plain text renderable in terminal (no MEDIA tags)

### Collaboration Style
- Default to action for low-risk operations (file edits, running tests, installs)
- Always ask before: destructive ops, external API calls, credential usage, foreground focus
- Show tool output/results, not just plans

## Code Preferences

### Style
- Code formatting: follow project conventions (prettier/black/ruff)
- Testing: test-driven when possible, integration over unit
- Documentation: inline for public APIs, README for projects
- Architecture: modular, async-first, dependency injection

### Workflow
- Git: feature branches, conventional commits, PRs for review
- Branch naming: `feat/`, `fix/`, `refactor/`, `chore/`
- Commit message style: conventional (`feat: add X`, `fix: resolve Y`)

## Tools and Environment

### Preferred Stack
- **Primary language(s)**: Python (backend), TypeScript (frontend)
- **Frameworks**: FastAPI, Next.js/React, Tailwind, shadcn/ui
- **Package managers**: pip/uv (Python), pnpm (Node)
- **Build tools**: Vite, Turbo, PyInstaller
- **AI Tools**: Ollama (local), Omniroute (cloud), Hermes Agent

---

*Note: These preferences help Claude work in a way that matches your style.*
