---
name: research-intelligence
metadata: 
  node_type: memory
  sub-ceo: research-director
  created: 2026-09-04
  last-updated: 2026-09-04T00:00:00Z
  originSessionId: 56700510-f27a-40af-bc7d-9a697658271e
  modified: 2026-09-04T04:50:43.871Z
---

## Recent Tasks
<!-- Tasks logged: [Task ID] | [Date] | [Time Taken] | [Status] -->
- ORCH-000 | 2026-09-04 | N/A | Created — department initialized with v2.0 build

## Templates & Patterns
<!-- Pattern Name → Workflow used -->
- identity-dossier-workflow → identity-resolver → 3-6 parallel osint-gatherers → dossier-synthesizer → source-verifier → cache to ~/.claude/memory/research-dossiers/

## Sub-Agent Performance
<!-- agent-name | Accuracy: X% | Avg Time: Y min | Issues: Z -->

## Known Issues & Solutions
- No paid search MCP yet → run on WebSearch/WebFetch, research-mcp-adapter stays dormant
- Hardware cap → max 4 concurrent gatherers on M3 Air 8GB (resource-monitor)

## Optimization Notes
- Cache dossiers for 30 days — a 3-angle repeat lookup should be a cache read, not a fan-out
- Angle count scales with stakes: "who is X" = 3 angles; "invest X before deal" = 6 angles
