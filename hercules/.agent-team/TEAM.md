# Hercules agent team

## Participants

| Agent | Role | Working surface |
| --- | --- | --- |
| Antigravity | coordinator / live editor | VS Code workspace and `.agent-team/` |
| Claude Code | architecture and implementation | shared checkout |
| OpenCode | focused implementation and tests | shared checkout |
| Hermes | review, verification, and documentation | shared checkout |

## Coordination

The local Agent Relay broker is the message bus. Use channel `general` for
handoffs and status, and DMs for targeted requests. The board is the durable
file-based view that Antigravity can watch in VS Code.

Do not have two agents modify the same file simultaneously. Parallel work is
for separate files or read-only investigation; integration happens only after
the owning agent posts a handoff.

## Handoff format

```text
STATUS <agent> <task> <working|blocked|done>
FILES <comma-separated paths>
CHECK <command and result>
NEXT <handoff or blocker>
```