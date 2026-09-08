---
name: llm-integration
sub-ceo: llm-orchestrator
created: 2026-09-03
last-updated: 2026-09-03T00:00:00Z
---

## Recent Tasks

## Templates & Patterns

## Sub-Agent Performance
- model-selector | Accuracy: 95% | Avg Time: 2 min
- prompt-optimizer | Accuracy: 90% | Avg Time: 5 min
- token-counter | Accuracy: 98% | Avg Time: 1 min
- output-validator | Accuracy: 92% | Avg Time: 3 min

## Known Issues & Solutions
- Omniroute timeout → Retry with exponential backoff, max 3 retries
- Model unavailable → Fallback to Ollama local models
- Env not applied at runtime (Master Prompt, 2026-09-04) → ES imports hoist ABOVE dotenv.config(), so module-scope `process.env.X` reads run before .env loads; and POST /api/config runtime swaps were ignored. Fix: read env LAZILY inside each call (`function env(k, fb) { return process.env[k] || fb; }`). Apply this pattern to any module that consumes env vars at import time.

## Optimization Notes
- Cache model selection decisions for similar task types
- Use prompt-optimizer for complex multi-step reasoning tasks
