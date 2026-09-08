---
name: supabase-agent-skills
description: Postgres Best Practices + Supabase agent skills installed for opencode, Claude Code, Hermes, Continue
metadata:
  type: reference
  created: 2026-08-25
  updated: 2026-08-25
tags:
  - #memory
  - #reference
  - #supabase
  - #skills
---

# Supabase Agent Skills

## Installed Skills

### 1. Supabase (`supabase/agent-skills`)
**Location**: `~/.agents/skills/supabase`
**Scope**: Universal + symlinked to Claude Code, OpenClaw, Continue, Hermes Agent

Comprehensive Supabase skill covering:
- Database operations (queries, migrations, schema)
- Auth (sessions, JWT, RLS, cookies, SSR)
- Edge Functions
- Realtime
- Storage
- Vectors
- Cron/Queues
- CLI and MCP server usage
- Debugging/troubleshooting

### 2. Postgres Best Practices (`supabase-postgres-best-practices`)
**Location**: `~/.agents/skills/supabase-postgres-best-practices`
**Scope**: Universal + symlinked to Claude Code, OpenClaw, Continue, Hermes Agent

Postgres best practices maintained by Supabase:
- Schema design, column types
- Migrations and declarative schemas
- RLS policies and verification tests
- Indexes, triggers, database functions
- pg_cron, pgmq, pgvector
- Performance (EXPLAIN, CPU, connections, locking, bloat)
- Security (RLS, permissions)

## Usage
These skills auto-load when working on Supabase-related tasks. They provide:
- Ready-made instructions for common Supabase operations
- Scripts and resources for accurate implementation
- Best practices for Postgres schema and queries

## Related
- [[supabase-mcp]] — MCP server configuration
- [[project/supabase-integration]] — JARVIS Supabase integration
- [[external-systems]] — Other external references