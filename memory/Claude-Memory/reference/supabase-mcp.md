---
name: supabase-mcp
description: Supabase project qyfgrtbprklunmzfalid MCP server configuration
metadata:
  type: reference
  created: 2026-08-25
  updated: 2026-08-25
tags:
  - #memory
  - #reference
  - #supabase
  - #mcp
---

# Supabase MCP Configuration

## Project Details
- **Project Ref**: `qyfgrtbprklunmzfalid`
- **MCP URL**: `https://mcp.supabase.com/mcp?project_ref=qyfgrtbprklunmzfalid&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching`
- **Dashboard**: https://supabase.com/dashboard/project/qyfgrtbprklunmzfalid

## Features Enabled
- `docs` — Supabase documentation access
- `account` — Account management
- `database` — Database operations (SQL, schema, migrations)
- `debugging` — Debugging tools
- `development` — Development helpers
- `functions` — Edge Functions management
- `branching` — Database branching

## opencode Configuration
Added to `~/.config/opencode/opencode.json`:

```json
{
  "mcp": {
    "supabase": {
      "type": "remote",
      "url": "https://mcp.supabase.com/mcp?project_ref=qyfgrtbprklunmzfalid&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching",
      "enabled": true
    }
  }
}
```

## Authentication
Run: `opencode mcp auth supabase`
- Opens browser for OAuth flow
- Completes authentication with Supabase

## Available Tools
The MCP server provides tools for:
- Database queries and schema management
- Edge Functions deployment and management
- Project configuration and settings
- Branching operations
- Real-time subscriptions
- Auth user management
- Storage operations

## Related
- [Supabase Agent Skills](supabase-agent-skills.md) — Postgres Best Practices + Supabase skills
- [External Systems](external-systems.md) — Master external systems index