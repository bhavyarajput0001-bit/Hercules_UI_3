# Hercules Brain — Pipeline

Deterministic, offline, sequential. No LLM required (default `offline=True`). Runs in ~1–9ms on sample directives on MacBook Air M3.

## Pipeline
1. **perceive** — ingest directive (voice/composer input)
2. **classify** — route to the correct brain mode (`brain/modes/`)
3. **reason** — cognition + planner build a step plan (`brain/planner.py`)
4. **plan** — emit plan block to SSE
5. **delegate** — hands router dispatches to departments (`brain/hands.py`, `hands_router.py`)
6. **verify** — check each step result
7. **record** — append to episodic + procedure-usage memory (`brain/memory_rb.py` → `data/brain-memory/*.json`)
8. **report** — stream delta report

## Engine
- `engine.py` — state machine driving the loop
- `cognition.py` — reasoning primitives
- `modes/` — brain modes (tight, exploratory, etc.)
- `ceo.py` / `ceo_assistant.py` — task decomposition/oversight
- `orchestrator.py` — dept orchestration (sequential — 8GB constraint)
- `labour/labour_agents.py` — worker agents
- `execution/claude_code.py` — optional external executor (Claude Code)

## SSE contract (`/v1/brain/run` → GET `/v1/brain/stream`)
```json
{ "type": "thinking", "text": "..." }
{ "type": "plan", "steps": [...] }
{ "type": "step", "id": 0, "status": "running" }
{ "type": "step", "id": 0, "status": "ok", "result": "..." }
{ "type": "report", "delta": "..." }
{ "type": "done", "done": true }
```
Invalid mode/procedure → graceful fallback + `done:true`.

## Memory (app's own)
- `data/brain-memory/episodic.json` — episode log (append, rollback-safe JSON)
- `data/brain-memory/procedure_usage.json` — procedure recall stats
- Mirrored to this vault at `Brain-Memory/` by the autosync script.

## Tuning rules (spec-aware)
- Sequential delegation only (8GB unified RAM).
- Keep memory JSON tiny; cap logs.
- Deterministic given same input — testable via sample directives in `backend/tests` (when present) or a `brain/run` smoke test.