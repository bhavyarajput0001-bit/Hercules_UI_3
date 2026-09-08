---
tags:
  - #memory
---

# 🤖 AI Models Configuration

Local (Ollama) + Cloud (Omniroute) model setup.

## 🏠 Local Models (Ollama)

| Model | Size | Use Case | Command |
|-------|------|----------|---------|
| **llama3.2:3b** | 2.0 GB | Default, general coding | `ollama run llama3.2:3b` |
| **qwen3.5** | ~4 GB | Reasoning, math, code | `ollama run qwen3.5` |
| **gemma3:1b** | 0.8 GB | Fast, low memory | `ollama run gemma3:1b` |
| **codellama:7b** | 3.8 GB | Code-specific (if pulled) | `ollama run codellama:7b` |
| **deepseek-coder:6.7b** | 3.8 GB | Code generation | `ollama run deepseek-coder:6.7b` |

### Memory Management (M3 Air 8GB)
```bash
# Keep only 1-2 models loaded
ollama ps              # See running models
ollama stop <model>    # Free memory
ollama rm <model>      # Delete model

# Quantization: use q4_K_M for balance
ollama pull llama3.2:3b-q4_K_M
```

## ☁️ Cloud Models (Omniroute)

**Endpoint**: `https://api.omniroute.ai/v1`  
**Key**: `sk-d656ee33b2d34cb0-f54790-3ecdd835`

| Model | Context | Best For |
|-------|---------|----------|
| **minimax-m2.1:cloud** | 1M tokens | Long context, reasoning |
| **gpt-4o** | 128k | General, vision |
| **claude-3.5-sonnet** | 200k | Coding, analysis |
| **gemini-1.5-pro** | 2M | Massive context |

## 🔄 Model Selection Strategy

| Task | Recommended |
|------|-------------|
| Quick code edits | llama3.2:3b (local) |
| Complex reasoning | minimax-m2.1:cloud |
| Large file analysis | gemini-1.5-pro (2M ctx) |
| Code generation | claude-3.5-sonnet / deepseek-coder |
| Offline/private | Any local model |
| Cost-sensitive | Local only |

## ⚙️ Hermes Provider Config

```yaml
# ~/.hermes/profiles/default/config.yaml
providers:
  ollama:
    base_url: http://localhost:11434
    default_model: llama3.2:3b
  omniroute:
    base_url: https://api.omniroute.ai/v1
    api_key: ${OMNIROUTE_API_KEY}
    default_model: minimax-m2.1:cloud
```

---
*Set `OMNIROUTE_API_KEY` in shell env or keychain*
