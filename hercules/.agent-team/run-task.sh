#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TASK="${*:-Read AGENTS.md and .agent-team/BOARD.md, report READY, and wait for an assigned task.}"
LOG_DIR="$ROOT/.agent-team/logs"
mkdir -p "$LOG_DIR"

cat >> "$ROOT/.agent-team/BOARD.md" <<EOF

- $(date -u +%Y-%m-%dT%H:%M:%SZ) Antigravity: dispatched shared task to Claude Code, OpenCode, and Hermes.
EOF

(
  cd "$ROOT"
  claude --print --dangerously-skip-permissions \
    --append-system-prompt "You are Hercules-Claude. Follow AGENTS.md. Coordinate through .agent-team/BOARD.md. Do not edit files owned by another agent. Task: $TASK" \
    "$TASK"
) > "$LOG_DIR/claude.log" 2>&1 &

(
  cd "$ROOT"
  opencode run --auto --prompt "You are Hercules-OpenCode. Follow AGENTS.md. Coordinate through .agent-team/BOARD.md. Do not edit files owned by another agent. Task: $TASK"
) > "$LOG_DIR/opencode.log" 2>&1 &

(
  cd "$ROOT"
  hermes --yolo --in "$ROOT" -z "You are Hercules-Hermes. Follow AGENTS.md. Coordinate through .agent-team/BOARD.md. Do not edit files owned by another agent. Task: $TASK"
) > "$LOG_DIR/hermes.log" 2>&1 &

cat <<EOF
Dispatched shared task concurrently.
Project: $ROOT
Logs: $LOG_DIR/{claude,opencode,hermes}.log
Board: $ROOT/.agent-team/BOARD.md
Important: assign separate file ownership before allowing parallel edits.
EOF