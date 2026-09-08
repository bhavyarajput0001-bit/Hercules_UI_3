---
pattern: opencode-mcp-config
category: implementation
tags: [#pattern/implementation, #tool/opencode, #tool/mcp]
status: proven
---

# Pattern: OpenCode MCP Server Configuration

## Problem
Need to add local MCP servers to opencode for tool integration (e.g., Open Design app).

## Solution
Add to project `opencode.jsonc` under `mcp` key with `type: "local"`.

## When to Use
- Adding any local MCP server (stdio transport)
- Need custom environment variables
- Server requires specific working directory or IPC paths

## Trade-offs
- **Pros**: Simple, version-controlled, per-project
- **Cons**: Requires opencode restart, no hot-reload

## Example
```json
{
  "mcp": {
    "server-name": {
      "type": "local",
      "command": [
        "/path/to/executable",
        "arg1", "arg2"
      ],
      "enabled": true,
      "environment": {
        "VAR_NAME": "value",
        "IPC_PATH": "/tmp/socket.sock"
      }
    }
  }
}
```

## Key Points
- `command` MUST be array of strings (not single string)
- `type: "local"` required for stdio servers
- Environment vars support `{env:VAR}` interpolation
- Set `"enabled": false` to disable inherited servers
- Restart opencode after changes

## Related
- [[Reference: opencode-config-schema]]
- [[Tool: open-design-mcp]]