#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

RELAY=(npx --yes agent-relay)
LOG_DIR="$ROOT/.agent-team/logs"
mkdir -p "$LOG_DIR"

if ! "${RELAY[@]}" node status >/dev/null 2>&1; then
  if ! "${RELAY[@]}" node up --background --no-spawn --verbose; then
    echo "Agent Relay is unavailable; starting local shared-checkout fallback."
    echo "Relay error details are in the command output above."
    exit 0
  fi
fi
"${RELAY[@]}" node status --wait-for 10

"${RELAY[@]}" node agent spawn claude \
  --name Hercules-Claude \
  --cwd "$ROOT" \
  --channels general \
  --task "Join the Hercules team. Read AGENTS.md and .agent-team/TEAM.md and BOARD.md. Do not edit until a task is assigned; report READY and monitor the general channel." \
  || true

"${RELAY[@]}" node agent spawn opencode \
  --name Hercules-OpenCode \
  --cwd "$ROOT" \
  --channels general \
  --task "Join the Hercules team. Read AGENTS.md and .agent-team/TEAM.md and BOARD.md. Do not edit until a task is assigned; report READY and monitor the general channel." \
  || true

"${RELAY[@]}" node agent spawn hermes \
  --name Hercules-Hermes \
  --cwd "$ROOT" \
  --channels general \
  --task "Join the Hercules team. Read AGENTS.md and .agent-team/TEAM.md and BOARD.md. Do not edit until a task is assigned; report READY and monitor the general channel." \
  || true

echo
echo "Team started in: $ROOT"
echo "Watch status: ${RELAY[*]} node agent list"
echo "Watch messages: ${RELAY[*]} observer --include-dms"
echo "Live board: $ROOT/.agent-team/BOARD.md"