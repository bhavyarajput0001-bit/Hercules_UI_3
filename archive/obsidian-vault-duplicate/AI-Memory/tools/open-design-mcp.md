---
ref: open-design-mcp
type: tool
tags: [#tool/open-design, #tool/mcp, #pattern/implementation]
---

# Tool: Open Design MCP Server

## Source
- App: `/Applications/Open Design.app`
- MCP Helper: `/Applications/Open Design.app/Contents/Frameworks/Open Design Helper.app/Contents/MacOS/Open Design Helper`
- Daemon CLI: `/Applications/Open Design.app/Contents/Resources/app/prebundled/daemon/daemon-cli.mjs`

## Configuration
```json
{
  "mcp": {
    "open-design": {
      "type": "local",
      "command": [
        "/Applications/Open Design.app/Contents/Frameworks/Open Design Helper.app/Contents/MacOS/Open Design Helper",
        "/Applications/Open Design.app/Contents/Resources/app/prebundled/daemon/daemon-cli.mjs",
        "mcp"
      ],
      "enabled": true,
      "environment": {
        "OD_DATA_DIR": "/Users/bhavyarajput/Library/Application Support/Open Design/namespaces/release-stable/data",
        "OD_SIDECAR_IPC_PATH": "/tmp/open-design/ipc/release-stable/daemon.sock",
        "ELECTRON_RUN_AS_NODE": "1"
      }
    }
  }
}
```

## Environment Variables
| Variable | Value |
|----------|-------|
| OD_DATA_DIR | `~/Library/Application Support/Open Design/namespaces/release-stable/data` |
| OD_SIDECAR_IPC_PATH | `/tmp/open-design/ipc/release-stable/daemon.sock` |
| ELECTRON_RUN_AS_NODE | `1` |

## Usage
1. Add to `opencode.jsonc` (project or global)
2. Restart opencode
3. Tools available via MCP protocol

## Capabilities
- Design file access
- Component inspection
- Design token extraction
- Asset export

## Troubleshooting
- **Server not starting**: Check IPC socket path exists
- **Permission denied**: Ensure Helper app has execute permissions
- **No tools exposed**: Verify daemon-cli.mjs exports MCP handlers

## Related
- [[Pattern: opencode-mcp-config]]
- [[Session: 2026-08-24]]