---
tags:
  - #memory
  - #project
---

# 🤖 JARVIS Command Center

Voice-first AI assistant with web UI, telemetry, camera, multi-empire dashboard.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Frontend                      │
│  (React 19, Tailwind, shadcn/ui, WebSocket client)      │
└──────────────────────┬──────────────────────────────────┘
                       │ WebSocket / REST
┌──────────────────────▼──────────────────────────────────┐
│                   FastAPI Backend                        │
│  (API routes, WebSocket manager, LLM orchestration)     │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌───────────────┐ ┌───────────┐ ┌─────────────┐
│   Ollama      │ │ Omniroute │ │  Tools/MCP  │
│  (local LLMs) │ │ (cloud)   │ │  (skills)   │
└───────────────┘ └───────────┘ └─────────────┘
```

## 🎯 Features

- **Voice Interface** — Wake word + STT/TTS pipeline
- **Telemetry Dashboard** — Real-time system metrics (CPU, RAM, GPU, network)
- **Camera Integration** — Vision analysis via LLM
- **Multi-Empire View** — Multiple project/workspace contexts
- **Skill System** — Dynamic skill loading for specialized tasks
- **Persistent Memory** — Cross-session context via Obsidian

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind v4, shadcn/ui |
| Backend | FastAPI, Pydantic v2, SQLAlchemy 2.0, Redis |
| Real-time | WebSockets (FastAPI), Server-Sent Events |
| Local LLM | Ollama (llama3.2:3b, qwen3.5, gemma3:1b) |
| Cloud LLM | Omniroute (minimax-m2.1:cloud, gpt-4o, claude-3.5) |
| Database | PostgreSQL + pgvector (embeddings) |
| Observability | Grafana + Prometheus + Loki + Tempo |
| Deployment | Docker Compose (local), Kubernetes (prod) |

## 🚀 Running Locally

```bash
# Backend
cd ~/Projects/JARVIS/backend
uv venv && source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd ~/Projects/JARVIS/frontend
pnpm install
pnpm dev

# Ollama (separate terminal)
ollama serve
ollama pull llama3.2:3b
```

## 🔗 Related Notes

- [[Project Context]] — Stack decisions, environment
- [[AI Models]] — Model configs, selection strategy
- [[Tool Reference]] — CLI tools for development
- [[Debugging Playbooks]] — Troubleshooting JARVIS
- [[Development Standards]] — Code conventions for this project

---
*Graph view: Press `Cmd+G` to see connections*
