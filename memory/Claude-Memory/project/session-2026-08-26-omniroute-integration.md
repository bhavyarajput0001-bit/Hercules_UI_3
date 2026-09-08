---
tags:
  - #session
  - #project
  - #omniroute
  - #claude-code
  - #opencode
---

# Session 2026-08-26: Omniroute API Integration

## Summary
Integrated Omniroute API with Claude Code via opencode gateway running on localhost:20128. Created categorized profiles for free models.

## Key Accomplishments

### 1. Omniroute Gateway Setup
- Opencode gateway running at `http://localhost:20128` (PID 1730)
- Configured with Omniroute API key: `sk-d656ee33b2d34cb0-89a9dc-80b992e0`
- Gateway exposes 663+ models from multiple providers via OpenAI-compatible API

### 2. Claude Code Profiles Created

#### Main Profile: `~/.claude/profiles/omniroute/`
- Model: `auto/best-coding` (smart routing to best coding model)
- Base URL: `http://localhost:20128`

#### Free Models Profile: `~/.claude/profiles/omniroute-free/`
Categorized sub-profiles for specific use cases:

| Profile | Model | Use Case |
|---------|-------|----------|
| `general/` | `auto/best-free` | General purpose, smart free routing |
| `coding/` | `auto/coding:free` | Code generation, debugging, refactoring |
| `reasoning/` | `auto/reasoning` | Complex logic, analysis, planning |
| `vision/` | `auto/vision` | Image understanding, OCR, visual tasks |
| `chat/` | `auto/best-free` | Conversation, Q&A |
| `fast/` | `auto/fast` | Speed-optimized responses |
| `image-gen/` | `veo-free/veo` | Video/image generation (Veo, Seedance) |
| `multimodal/` | `auto/multimodal` | Mixed text/image/audio inputs |
| `ui-ux/` | `auto/gemma` | Frontend, design, UI tasks |

### 3. Free Models Identified (40+)
Key free models available via gateway:
- **Coding**: `oc/deepseek-v4-flash-free`, `oc/north-mini-code-free`, `cline/poolside/laguna-m.1:free`
- **Reasoning**: `gpt-oss-120b` (via antigravity, nvidia, huggingchat, lmarena)
- **Vision**: `gemma-4-31b-it` (via cline, ddgw, huggingchat)
- **Image Gen**: `veo-free/veo`, `veo-free/seedance`
- **Multimodal**: `gemma-4-31B-it`, `gemma-4-26B-A4B-it`
- **General**: `auto/best-free`, `auto/coding:free`, `auto/fast`, `auto/chat`

### 4. Usage Examples
```bash
# Smart free routing
claude --model auto/best-free --env ANTHROPIC_BASE_URL=http://localhost:20128

# Code-specific
claude --model auto/coding:free --env ANTHROPIC_BASE_URL=http://localhost:20128

# Image generation
claude --model veo-free/veo --env ANTHROPIC_BASE_URL=http://localhost:20128
```

### 5. Memory Updates
- Updated `CLAUDE.md` with new API key and session log
- Updated Obsidian `MEMORY.md` index with new session entry
- Created this session documentation file

## Technical Details
- Gateway routes requests to Omniroute cloud API
- Omniroute handles provider selection (Anthropic, OpenAI, Google, DeepSeek, etc.)
- Free models identified by `:free` suffix or known free providers (gpt-oss, gemma, nemotron)
- `auto/*` models use intelligent routing based on task type

## Next Steps
- Test specialized profiles with real tasks
- Monitor which free models perform best per category
- Consider adding paid model profiles for production workloads