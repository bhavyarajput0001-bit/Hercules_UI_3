---
name: resource-management
metadata: 
  node_type: memory
  sub-ceo: resource-manager
  created: 2026-09-04
  last-updated: 2026-09-04T07:00:37Z
  originSessionId: 56700510-f27a-40af-bc7d-9a697658271e
  modified: 2026-09-04T07:00:37Z
---

## Recent Tasks
- ORCH-001 | 2026-09-04 | Execute piped shell command | Basic command validation, no resource impact
- ORCH-000 | 2026-09-04 | N/A | Created — department initialized with v2.0 build

## Templates & Patterns
- hardware-check-workflow → resource-monitor reads sysctl/memory_pressure/df → outputs concurrency cap + mode
- shell-command-validation → echo | grep pattern test (baseline shell functionality)

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- M3 Air 8GB baseline: cap formula min(4, floor(availGB/2)) → usually 3 concurrent agents
- memory_pressure > 60 or swap > 200MB → force sequential mode

## Optimization Notes
- Reuse cap decisions for same task-shapes (log + recall instead of re-reading every time)
- Simple shell validation tasks: <1s execution, no memory overhead
