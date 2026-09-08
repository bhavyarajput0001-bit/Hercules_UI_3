---

name: omniroute-api-key
description: Omniroute API key for multi-provider AI access
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# Omniroute API Key

## Key
`sk-d656ee33b2d34cb0-f54790-3ecdd835`

## Usage
- Configured in JARVIS settings panel (http://localhost:8000 → Settings)
- Used as fallback when Ollama models insufficient
- Supports auto model routing for optimal cost/latency

## Integration Points
- JARVIS Command Center: `jarvis_server.py` AIProvider class
- Config: `CONFIG.omniroute_api_key` in config.json
- Endpoint: `https://api.omniroute.com/v1/chat/completions`

## Security
- Store in config.json (gitignored)
- Never commit to version control
- Rotate periodically

## Related
[[jarvis-command-center]] [[ollama-models]]