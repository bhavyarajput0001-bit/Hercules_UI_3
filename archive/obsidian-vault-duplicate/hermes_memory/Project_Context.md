---
tags:
  - #memory
  - #project
---

# 📦 Project Context

Active projects, tech stack decisions, and conventions.

## 🏗️ JARVIS Command Center
- **Stack**: FastAPI + Next.js + Tailwind + shadcn/ui
- **Local LLM**: Ollama (llama3.2:3b, qwen3.5, gemma3:1b)
- **Cloud LLM**: Omniroute (minimax-m2.1:cloud)
- **Running at**: localhost:8000
- **Repo**: ~/Projects/JARVIS (assumed)

## 💻 Development Standards
- **Python**: black, ruff, mypy, pytest + pytest-asyncio
- **TypeScript**: prettier, eslint, tsc --strict
- **Git**: feat/fix branches, conventional commits
- **Testing**: TDD, integration > unit, pytest-xdist for parallel
- **Architecture**: Modular, async-first, dependency injection

## 🔧 Environment (Mac M3 Air 8GB/256GB)
- **Shell**: zsh + atuin + starship + fzf + fd + bat + delta
- **Package managers**: uv (Python), pnpm (Node)
- **Containers**: Docker Desktop / colima
- **Editor**: VS Code / Zed / Neovim

## 🧠 Memory System
- **Shared Agent Memory**: ~/shared-agent-memory/ (git-synced)
- **Obsidian Vaults**: 
  - Claude-Memory (auto-loaded)
  - AI-Memory
  - hermes_memory (this vault)
- **Hermes Profile**: default (~/.hermes/profiles/default/)

## 🌐 API Keys (stored in keychain/env)
- Omniroute: sk-d656ee33b2d34cb0-f54790-3ecdd835
- GitHub: gh auth token
- Anthropic: (if configured)

---
*Link related notes with [[wikilinks]] to populate graph view*
