---
name: frontend-debugging-ux
sub-ceo: frontend-ux-lead
created: 2026-09-03
last-updated: 2026-09-03T00:00:00Z
---

## Recent Tasks
<!-- Tasks logged: [Task ID] | [Date] | [Time Taken] | [Status] -->
- MP-001 | 2026-09-04 | Complex (>45 min) | Build DONE (code complete + audit fixed); DEPLOY pending pnpm install — AI Website Builder (React 18 + Vite + Tailwind, Express + better-sqlite3, Socket.IO, Omniroute, 3D/static dual mode)
  - Repo: ~/coding/Master_Prompt (pnpm workspaces packages/{shared,server,client})
  - Key deploy facts: port 3001 (API) / 5173 (web), .env has OMNIROUTE_API_KEY, seed via `pnpm db:seed`, DB at packages/server/data/master-prompt.db

## Templates & Patterns
<!-- Pattern Name → Workflow used -->
- ai-website-builder-workflow → new_workflow (created 2026-09-03, reused)

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- Omniroute API integration → Use key sk-d656ee33b2d34cb0-89a9dc-80b992e0, timeout retry with exponential backoff (see llm-integration dept)
- SQLite storage → better-sqlite3 for prompt/template persistence

## Optimization Notes
- Reuse dual-mode (3D/static) builder pattern across client sites
- Cache prompt templates in ~/.claude/memory/master-prompt/ for recall
