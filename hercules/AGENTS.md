# HERCULES shared agent rules

This checkout is a shared workspace for Antigravity, Claude Code, OpenCode,
and Hermes.

## Team protocol

- Read `.agent-team/BOARD.md` and `.agent-team/TEAM.md` before editing.
- Claim a task in `.agent-team/BOARD.md` before changing project files.
- One agent owns a file at a time. Announce ownership in the relay `general`
  channel before editing; release it when the change is verified.
- Keep edits focused. Do not reformat files owned by another agent.
- Run the narrowest relevant check after each edit and record the result in the
  board.
- Post handoffs, blockers, and completed work to the relay `general` channel.
- Never commit secrets, API keys, generated output, or provider credentials.

Antigravity is the interactive VS Code participant. It uses the same checkout,
board, and relay channel as the terminal workers, so file changes appear live
in the editor and can be reviewed before handoff.