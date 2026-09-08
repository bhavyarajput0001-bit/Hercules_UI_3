# Research Dossiers Cache

Cached identity reports produced by the Research & Intelligence department. **30-day reuse**: if a dossier exists for the same identity and is <30 days old, the research-director returns it instead of re-searching — zero-cost answer.

## Format
`<slug>.md` where slug = lowercase, dashes for spaces (e.g. `elon-musk.md`).

Each dossier:
- Executive Summary (actionable)
- Profile / Identity
- Work / Products
- Recent Activity (dated)
- Key Facts with Sources (URL inline)
- Contradictions
- Needs Verification (low-confidence)
- Sources (grouped: official, news, social, other)

## Lifecycle
- Created by: research-director → gatherers → synthesizer → verifier
- Reused: when `research "<identity>"` matches an existing <30-day-old file
- Expired: >30 days old → treated as stale, re-searched on next request
- Compaction: memory-curator archives dossiers >120 days old to `~/.claude/memory/archive/`
