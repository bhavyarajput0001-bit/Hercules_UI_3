---
name: supabase-integration
description: Supabase integration with MCP server and agent skills for JARVIS
metadata:
  type: project
  created: 2026-08-25
  updated: 2026-08-25
tags:
  - #memory
  - #project
  - #supabase
  - #mcp
  - #jarvis
---

# Supabase Integration for JARVIS

## Overview
Supabase is the backend-as-a-service for JARVIS Command Center, providing:
- PostgreSQL database
- Authentication (email/password, OAuth)
- Real-time subscriptions
- Edge Functions
- Storage

## MCP Server Setup (2026-08-25)
- **Project Ref**: qyfgrtbprklunmzfalid
- **MCP URL**: https://mcp.supabase.com/mcp?project_ref=qyfgrtbprklunmzfalid&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching
- **Scope**: Project (.mcp.json)
- **Auth**: OAuth - pending (`claude mcp login supabase`)

## Supabase Client Setup (Next.js)
- **Server Client**: `utils/supabase/server.ts` - Server Components with cookie handling
- **Client Client**: `utils/supabase/client.ts` - Client Components
- **Middleware**: `utils/supabase/middleware.ts` - Session refresh

## Agent Skills Installed
- **supabase** - Supabase best practices and patterns
- **supabase-postgres-best-practices** - Postgres schema, RLS, migrations

## Next Steps
1. Complete MCP authentication: `claude mcp login supabase`
2. Create `todos` table in Supabase dashboard
3. Add Row Level Security (RLS) policies
4. Implement auth flows (login, signup, logout)
5. Connect JARVIS to Supabase for user data, telemetry

## Related
- [[JARVIS Command Center]] - Main project using Supabase
- [[reference/supabase-mcp]] - MCP server details
- [[Session 2026-08-25]] - This session's work