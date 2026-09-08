---
name: memory-knowledge
metadata: 
  node_type: memory
  sub-ceo: memory-curator
  created: 2026-09-04
  last-updated: 2026-09-04T00:00:00Z
  originSessionId: 56700510-f27a-40af-bc7d-9a697658271e
  modified: 2026-09-04T04:51:12.554Z
---

## Recent Tasks
- ORCH-000 | 2026-09-04 | N/A | Created — shared memory system + memory-map.md index initialized

## Templates & Patterns
- memory-map-workflow → memory-curator maintains one-line-per-file index; detail loaded on demand (token-minimal recall)

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- Token budget: map loads <300 tokens; dept files <2000 tokens — curator compacts over budget
- Archive strategy: entries >120 days old → memory/archive/

## Optimization Notes
- Index cheap → detail on demand is the pattern that makes every session cheaper over time