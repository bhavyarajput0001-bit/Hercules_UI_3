---
name: automation-scheduling
metadata: 
  node_type: memory
  sub-ceo: automation-lead
  created: 2026-09-04
  last-updated: 2026-09-04T00:00:00Z
  originSessionId: 56700510-f27a-40af-bc7d-9a697658271e
  modified: 2026-09-04T04:51:12.562Z
---

## Recent Tasks
- ORCH-000 | 2026-09-04 | N/A | Created — department initialized with v2.0 build

## Templates & Patterns
<!-- Pattern Name → Workflow used -->

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- Recurring automation on 8GB machine: prefer session-scoped schedules (CronCreate) over durable daemons where possible
- Claude Code schedules auto-expire after 7 days — re-create on weekly maintenance

## Optimization Notes
- Every recurring task gets a template → next schedule is a lookup, not a build