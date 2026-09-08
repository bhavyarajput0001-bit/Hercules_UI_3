#!/usr/bin/env bash
# Hercules Memory Autosync
# Canonical memory vault: hercules_folder/Hercules/memory/ (git-tracked + pushed to GitHub).
# Every agent (opencode, Claude, Hermes) writes THROUGH symlinks into the vault, so nothing
# to copy for them. This script handles:
#   1. Hercules app working memory (brain-memory JSON -> markdown mirror)
#   2. .agent-team/BOARD.md -> vault
#   3. git commit + push of the Hercules repo
#   4. legacy safety mirror into ~/shared-agent-memory (no git ops)
#
# Triggered by LaunchAgent com.user.obsidian-autosync: every 900s + WatchPaths.

set -uo pipefail

HERO_ROOT="$HOME/Downloads/ai_os/hercules_folder/Hercules"
VAULT="$HERO_ROOT/memory"
APP_MEM="$HERO_ROOT/hercules/backend/hercules_core/data/brain-memory"
BR_MIRROR="$VAULT/Hercules/Brain-Memory"
LOG_DIR="$HOME/shared-agent-memory/logs"

DATE=$(date +"%Y-%m-%d %H:%M:%S")

mkdir -p "$BR_MIRROR" "$LOG_DIR"
exec >> "$LOG_DIR/autosync.log" 2>> "$LOG_DIR/autosync.error.log"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "=== Hercules Memory Autosync ($DATE) ==="

# 1) App working memory -> markdown mirror
if [[ -d "$APP_MEM" ]]; then
    for j in episodic procedure_usage; do
        src="$APP_MEM/$j.json"
        dst="$BR_MIRROR/$j.json.md"
        if [[ -f "$src" ]]; then
            python3 - "$src" "$dst" <<'PY' 2>/dev/null
import json, sys, datetime
src, dst = sys.argv[1], sys.argv[2]
try:
    data = json.load(open(src))
except Exception as e:
    data = {"_error": str(e)}
title = src.split("/")[-1].replace(".json", "")
with open(dst, "w") as f:
    f.write(f"# {title} — auto snapshot\n\nAuto-generated: {datetime.datetime.now().isoformat()}\nSource: `{src}`\n\n")
    f.write(json.dumps(data, indent=2, default=str))
PY
            log "mirrored $j.json -> Brain-Memory/$j.json.md"
        fi
    done
else
    log "SKIP app memory: $APP_MEM not found"
fi

# 2) BOARD.md -> vault
if [[ -f "$HERO_ROOT/.agent-team/BOARD.md" ]]; then
    cp "$HERO_ROOT/hercules/.agent-team/BOARD.md" "$VAULT/Hercules/BOARD.md"
    log "synced BOARD.md -> vault"
fi

# 3) git commit + push the Hercules repo (includes memory/)
if cd "$HERO_ROOT"; then
    if ! git diff --quiet || ! git diff --cached --quiet || [[ -n $(git ls-files --others --exclude-standard) ]]; then
        git add -A
        git commit -m "autosync: $DATE memory vault update" >/dev/null 2>&1
        log "committed"
        if git push origin main >/dev/null 2>> "$LOG_DIR/autosync.error.log"; then
            log "pushed origin/main"
        else
            log "push skipped/failed (network?)"
        fi
    else
        log "no changes"
    fi
fi

# 4) legacy safety mirror (keeps old consumers working; no git ops here)
rsync -a --delete "$VAULT/" "$HOME/shared-agent-memory/obsidian-vault/" >/dev/null 2>&1 || true

log "=== Autosync complete ==="