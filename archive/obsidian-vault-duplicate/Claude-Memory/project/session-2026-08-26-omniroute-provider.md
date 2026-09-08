---
name: session-2026-08-26-omniroute-provider
description: OmniRoute provider configured in Hermes with 663 models, 41 categorized free model aliases by use case
metadata:
  type: session
  created: 2026-08-26
  updated: 2026-08-26
tags:
  - #memory
  - #session
  - #hermes
  - #omniroute
---

# Session: 2026-08-26 — OmniRoute Provider + Free Models Categorization

## Summary
Configured the `omniroute` provider in Hermes using local OmniRoute instance (http://localhost:20128/v1) with API key. Fetched 663 models from `/v1/models` endpoint, identified ~90 free models, and created 41 categorized aliases under `omnifree-*` namespace.

## What Was Accomplished

### 1. OmniRoute Provider Configuration
- **Provider**: `omniroute` added to `~/.hermes/config.yaml`
- **Base URL**: `http://localhost:20128/v1` (local OmniRoute instance)
- **API Key**: `sk-d656ee33b2d34cb0-89a9dc-80b992e0`
- **Models Fetched**: 663 total from `/v1/models` endpoint
- **Default Provider**: Set `model.provider: omniroute` globally

### 2. Free Model Analysis (663 total → ~90 free)
Categorized by provider prefix indicating free access:
- **oc/** (opencode): deepseek-v4-flash-free, nemotron-3-ultra-free, mimo-v2.5-free, north-mini-code-free, hy3-free, big-pickle
- **cl/** (cline): poolside/laguna-m.1:free, openrouter/free, tencent/hy3:free, stepfun/step-3.7-flash, google/gemma-4-31b-it:free, nvidia/nemotron-3-ultra:free, minimax/m3, deepseek-v4-flash, deepseek-v4-pro
- **felo/**: felo-chat, felo-search, felo-scholar, felo-social, felo-document
- **veo-free/**: veo, seedance
- **huggingchat/**: 15 models (DeepSeek, Qwen, Kimi, GLM, Nemotron, Llama-4, MiniMax, GPT-OSS, etc.)
- **ollama-cloud/**: gemma4:31b, glm-5.1, minimax-m2.7, nemotron-3-super, qwen3.5:397b, kimi-k2.6
- **tllm/**: GPT_4o, GPT_5 series, gemini series, CLAUDE series, deepseek_v4, sonar-pro, openrouter models
- **ddgw/**: gpt-5.4-mini, gpt-5.4-nano, mistral-small-2603, tinfoil/gpt-oss-120b, tinfoil/gemma4-31b, claude-haiku-4-5
- **auto/ combos**: best-free, coding:free, cheap, offline

### 3. Created 41 Categorized Aliases (`omnifree-*`)

| Category | Count | Aliases |
|----------|-------|---------|
| **Coding** | 9 | omnifree-coding, omnifree-coding-best, omnifree-coding-deepseek, omnifree-coding-nemotron, omnifree-coding-qwen, omnifree-coding-glm, omnifree-coding-kimi, omnifree-coding-mimo, omnifree-coding-poolside |
| **Reasoning** | 4 | omnifree-reasoning, omnifree-reasoning-o3, omnifree-reasoning-o4, omnifree-reasoning-command |
| **Vision** | 5 | omnifree-vision, omnifree-vision-gemma, omnifree-vision-ernie, omnifree-vision-llama4, omnifree-vision-command |
| **Image Generation** | 2 | omnifree-img-veo, omnifree-img-seedance |
| **General Chat** | 15 | omnifree-chat, omnifree-chat-gpt, omnifree-chat-gemini, omnifree-chat-claude, omnifree-chat-grok, omnifree-chat-deepseek, omnifree-chat-sonar, omnifree-chat-felo, omnifree-chat-hugging, omnifree-chat-minimax, omnifree-chat-gpt-oss, omnifree-chat-step, omnifree-chat-ollama, omnifree-chat-openrouter |

### 4. Alias Limitation Discovered
The `model.aliases` format stores values as literal model names sent to the endpoint. The resolver doesn't treat `omniroute/` prefix as a catalog provider, so aliases require explicit `--provider omniroute` flag or bare model names.

**Working usage:**
```bash
hermes chat -q "test" --model auto/coding:free
hermes chat -q "test" --model oc/deepseek-v4-flash-free --provider omniroute
```

## Current State
- **Hermes Config**: `providers.omniroute` + `model.provider: omniroute` + 41 aliases in `model.aliases`
- **All free models accessible** via direct model name with global provider
- **Categories documented** for quick selection by use case

## Next Steps
1. Consider adding `omniroute` to models.dev catalog for native alias resolution
2. Could create `model_aliases:` dict format entries for auto-provider detection
3. Add more granular categorization (UI/UX, specific languages, etc.)

## Related
[[jarvis-command-center]] [[omniroute-api-key]] [[reference/omniroute-api-key]]