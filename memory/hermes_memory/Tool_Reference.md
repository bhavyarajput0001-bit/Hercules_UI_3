---
tags:
  - #memory
  - #reference
  - #tool
---

# 🔧 Tool Reference

CLI tools, shortcuts, and workflows for maximum efficiency.

## 🚀 Core CLI Superpowers (Installed)

| Tool | Command | Purpose |
|------|---------|---------|
| **atuin** | `atuin search <query>` | Shell history search + sync |
| **starship** | Auto in prompt | Fast, informative cross-shell prompt |
| **fzf** | `Ctrl+R` (history), `Ctrl+T` (files) | Fuzzy finder everywhere |
| **fd** | `fd <pattern>` | Fast `find` alternative, respects .gitignore |
| **bat** | `bat <file>` | `cat` with syntax highlighting |
| **delta** | `git diff` | Beautiful git diffs |
| **ripgrep** | `rg <pattern>` | Fast `grep`, respects .gitignore |
| **gh** | `gh <command>` | GitHub CLI (PRs, issues, repos) |
| **ollama** | `ollama run <model>` | Local LLM inference |

## ⚡ Shell Integration (Add to ~/.zshrc)

```zsh
# Atuin
eval "$(atuin init zsh)"

# Starship
eval "$(starship init zsh)"

# FZF
source <(fzf --zsh)

# Zoxide (if installed)
eval "$(zoxide init zsh)"
```

## 🤖 AI Coding Tools

| Tool | Install | Best For |
|------|---------|----------|
| **Claude Code** | `npm i -g @anthropic-ai/claude-code` | Large codebases, terminal-native |
| **Aider** | `pipx install aider-chat` | Git-native pair programming |
| **Continue** | VS Code extension | IDE-integrated AI |
| **OpenCode** | `brew install opencode` | Local-first, extensible |
| **Codex CLI** | `npm i -g @openai/codex` | OpenAI models, cloud |

## 🐳 Observability Stack (Docker)

```bash
# Grafana + Prometheus + Loki + Tempo
docker run -d \
  -p 3000:3000 -p 9090:9090 -p 3100:3100 -p 4317:4317 \
  -v grafana-data:/var/lib/grafana \
  grafana/grafana-oss

# Or use Grafana Cloud (free tier)
```

## 📦 Package Managers

```bash
# Python: uv (fast, replaces pip/pipx/poetry)
brew install uv
uv python install 3.12
uv venv && source .venv/bin/activate

# Node: pnpm (fast, disk-efficient)
brew install pnpm
pnpm install -g typescript tsx
```

## 🔑 Shortcuts to Memorize

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Atuin/fzf history search |
| `Ctrl+T` | fzf file finder |
| `Ctrl+G` | Obsidian graph view |
| `gh pr create` | Create PR from CLI |
| `rg -t ts <pattern>` | Search TypeScript files only |
| `fd -e py <pattern>` | Find Python files |
| `bat --style=numbers <file>` | Cat with line numbers |

---
*Run `atuin stats` to see your command frequency*
