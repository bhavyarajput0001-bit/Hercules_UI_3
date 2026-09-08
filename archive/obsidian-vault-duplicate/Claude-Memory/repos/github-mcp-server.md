---

name: github-mcp-server
description: github/github-mcp-server - Official GitHub MCP Server for native GitHub API access via Model Context Protocol
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# github-mcp-server

**Path:** `/Users/bhavyarajput/github-mcp-server`
**Repo:** https://github.com/github/github-mcp-server

## Overview
Official GitHub MCP Server — gives LLMs native GitHub API access via standardized Model Context Protocol. Maintained by GitHub.

## Key Components
- **Go implementation** in `cmd/`, `internal/`, `pkg/`
- **Docker support** (`Dockerfile`, `docker-compose.yml`)
- **Extensive docs** in `docs/` (100K+ README)
- **UI** in `ui/` for testing
- **MCP server binary** — runs stdio or SSE

## Capabilities (MCP Tools)
- Repository operations: create, read, update, delete
- Pull requests: create, review, merge, comment
- Issues: create, list, update, comment
- Search: code, repos, users, issues
- GitHub Actions: workflow runs, logs
- Organizations/teams management
- Releases, branches, tags
- Webhooks, deploy keys

## Use Cases
- Native GitHub integration for ANY MCP client (Claude Code, Cursor, etc.)
- Automated PR reviews, issue triage
- Repository management via natural language
- CI/CD workflow interaction
- Enterprise-ready — official GitHub maintained

## Quick Access
```bash
cd /Users/bhavyarajput/github-mcp-server
go build -o github-mcp ./cmd/github-mcp
./github-mcp  # stdio mode
# Or Docker:
docker build -t github-mcp .
docker run -i --rm -e GITHUB_TOKEN=$GITHUB_TOKEN github-mcp
```

## Configuration
Requires `GITHUB_TOKEN` env var with appropriate scopes.

## Integration Points
- **ECC**: Native GitHub ops in ECC dashboard/workflows
- **awesome-claude-code-subagents**: GitHub-specialized agents
- **JARVIS**: Voice-controlled GitHub operations
- **Superpowers**: Portable GitHub skills

## Related
[[everything-claude-code]] [[awesome-claude-code-subagents]] [[jarvis-command-center]] [[superpowers]]