---

name: jarvis-command-center
description: JARVIS/B.R. Command Center - voice-first AI assistant with web UI
metadata:
  type: project
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #project
---


# JARVIS Command Center

## Project Overview
Voice-first AI assistant inspired by Iron Man's JARVIS, with Stark HUD aesthetic. Features:
- 3 AI personas: RAVEN (JARVIS), ROACH (tactical), RIA (intuitive)
- Real-time system telemetry (CPU, RAM, battery, disk)
- Camera vision feed with HUD overlay
- Multi-empire dashboard (Creator/Revenue/Agency/Asset)
- Voice commands via macOS `say` + speech recognition
- System integrations: Spotify, web search, app launching, website opening
- AI provider switching: Ollama (local) + Omniroute API
- Settings panel for API keys, model selection, voice toggle

## Architecture
- **Backend**: FastAPI async server (`jarvis_server.py`)
- **Frontend**: Embedded HTML/CSS/JS with WebSocket for real-time updates
- **AI**: Ollama (llama3.2:3b) + Omniroute (sk-d656ee33b2d34cb0-f54790-3ecdd835)
- **Voice**: macOS `say` command with persona-specific voices
- **Camera**: OpenCV MJPEG stream at `/api/camera/stream`
- **Telemetry**: psutil via WebSocket (1s interval)

## Key Files
- `/Users/bhavyarajput/Desktop/JarvisProject/jarvis_server.py` - Main server
- `/Users/bhavyarajput/Desktop/JarvisProject/start.sh` - Launcher
- `/Users/bhavyarajput/Desktop/JarvisProject/config.json` - Persistent config

## Running
```bash
cd /Users/bhavyarajput/Desktop/JarvisProject
./venv/bin/python3 jarvis_server.py
# Access at http://localhost:8000
```

## Next Steps
- [ ] Add persistent conversation history
- [ ] Integrate with actual empire data sources
- [ ] Add workflow automation (scheduled tasks)
- [ ] Build desktop wrapper (Tauri/Electron)
- [ ] Add plugin system for extensibility
- [x] **Supabase Integration** - Database, realtime, storage, auth, vector search

## Supabase Integration (Added 2026-08-25)
- **Client**: `supabase_client.py` - Full Python client with database, realtime, storage, auth, embeddings
- **Config**: `config.json` - Supabase URL and publishable key
- **Schema**: `supabase_schema.sql` - Tables for conversations, system_states, embeddings + RLS + realtime
- **API Endpoints** (in `jarvis_server.py`):
  - `POST /api/supabase/conversations` - Log conversation
  - `GET /api/supabase/conversations` - Get history (filter by persona)
  - `POST /api/supabase/system-state` - Save system state
  - `GET /api/supabase/system-state/{type}` - Get system state
  - `POST /api/supabase/storage/upload` - Upload file
  - `GET /api/supabase/storage/download` - Download file
  - `GET /api/supabase/storage/public-url` - Get public URL
  - `POST /api/supabase/embeddings/store` - Store embedding
  - `POST /api/supabase/embeddings/search` - Vector similarity search

## Related
[[user-profile]] [[omniroute-api-key]] [[ollama-models]] [[supabase-integration]]