---
name: project-management
metadata: 
  node_type: memory
  sub-ceo: pm-lead
  created: 2026-09-04
  last-updated: 2026-09-04T00:00:00Z
  originSessionId: 56700510-f27a-40af-bc7d-9a697658271e
  modified: 2026-09-04T04:51:12.572Z
---

## Recent Tasks
- ORCH-000 | 2026-09-04 | N/A | Created — department initialized with v2.0 build

## Templates & Patterns
- todo-mode → project-planner breaks goal into verifiable items → sequential-executor runs with checkpoints
- phases-mode → 'ultracode sequential "p1 | p2"' → one phase at a time, done-criterion gates each

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- Checkpoints live in ~/.claude/memory/project-checkpoints/<slug>.md — resume any interrupted run
- Dependent phases must NOT parallelize — that's a correctness issue, not a speed one

## Optimization Notes
- Track phase estimates vs actuals here; drift data feeds better estimates next plan