---
tags:
  - #memory
  - #reference
---

# Open Design MCP Server

MCP server configuration for the Open Design app, enabling design tooling integration.

## Configuration

Added to opencode.jsonc (project config):
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

## Details

- **App**: Open Design (macOS)
- **MCP Transport**: Local stdio
- **Data Directory**: `~/Library/Application Support/Open Design/namespaces/release-stable/data`
- **IPC Socket**: `/tmp/open-design/ipc/release-stable/daemon.sock`

## Usage

Restart opencode after config changes. The server provides design-related tools via MCP.