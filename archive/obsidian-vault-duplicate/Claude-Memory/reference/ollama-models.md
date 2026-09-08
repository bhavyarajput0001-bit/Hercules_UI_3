---

name: ollama-models
description: Available local Ollama models for JARVIS
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# Ollama Models (Local)

## Installed Models
| Model | Size | Use Case |
|-------|------|----------|
| `llama3.2:3b` | 2.0 GB | **Default** - fast, capable, good for voice |
| `qwen3.5:latest` | 6.6 GB | Advanced reasoning, coding |
| `gemma3:1b` | 815 MB | Ultra-fast, lightweight |
| `minimax-m2.1:cloud` | Cloud | Cloud fallback |

## Management
```bash
# List models
ollama list

# Pull new model
ollama pull <model>

# Remove model
ollama rm <model>

# Run model directly
ollama run llama3.2:3b
```

## JARVIS Integration
- Default: `llama3.2:3b` (configured in `config.json`)
- Switch via Settings panel at http://localhost:8000
- Models auto-detected via `/api/models` endpoint

## Related
[[jarvis-command-center]] [[omniroute-api-key]]