---

name: shadcn-ui-mcp-server
description: Jpisnice/shadcn-ui-mcp-server - MCP server for shadcn/ui (React, Svelte 5, Vue, React Native) with live component data
metadata:
  type: reference
  created: 2026-08-23
  updated: 2026-08-23
tags:
  - #memory
  - #reference
---


# shadcn-ui-mcp-server

**Path:** `/Users/bhavyarajput/shadcn-ui-mcp-server`
**Repo:** https://github.com/Jpisnice/shadcn-ui-mcp-server

## Overview
MCP server giving LLMs real-time access to shadcn/ui component docs, usage examples, installation guides across React, Svelte 5, Vue, React Native.

## Key Components
- **TypeScript MCP server** in `src/`
- **MCP bundle** (`.mcpb` file) for easy installation
- **Docker** support
- **SSE implementation** for streaming
- **Component catalog** — comprehensive component data

## MCP Tools Provided
- `list_components` — All available components
- `get_component` — Component details, props, usage
- `get_installation` — Framework-specific install steps
- `search_components` — Find components by keyword
- `get_examples` — Usage examples

## Supported Frameworks
- React (Next.js, Vite, CRA)
- Svelte 5 (SvelteKit)
- Vue (Nuxt, Vite)
- React Native (Expo)

## Use Cases
- Live shadcn/ui context for ANY MCP client
- Multi-framework component guidance
- Installation help per framework
- Component discovery without hallucination

## Quick Access
```bash
cd /Users/bhavyarajput/shadcn-ui-mcp-server
npm install
npm run build
# Run stdio mode
node dist/index.js
# Or SSE mode
npm run start:sse
# Install .mcpb bundle in Claude Code
```

## Configuration
No auth required — reads local component registry.

## Integration Points
- **shadcn-skills**: Skills + live MCP data = complete stack
- **taste-skill**: Design quality enforcement
- **ECC**: Add to MCP configs
- **anthropics/frontend-design**: Design guidance

## Related
[[shadcn-skills]] [[taste-skill]] [[everything-claude-code]] [[github-mcp-server]]