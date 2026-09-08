#!/usr/bin/env bash
# Restore script for the 2026-09-08 Hercules consolidation (see MANIFEST.md).
# Reverses every move recorded in MANIFEST.md. Nothing is deleted; this is the undo path.
#
# Usage:
#   bash archive/restore.sh            # perform restore
#   bash archive/restore.sh --dry-run  # print what would happen
#
# NOTE: This restores to the PRE-consolidation layout. Run BEFORE renaming/adding files
# under memory/ or hercules/ if you want a clean undo.

set -uo pipefail

T_ROOT="$HOME/Downloads/ai_os/hercules_folder/Hercules"
A="$T_ROOT/archive"
C="$HOME/Downloads/Coding/ai_os"
D="$HOME/Downloads/ai_os"
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

do_move() {
    local src="$1" dst="$2"
    [[ -e "$src" ]] || { echo "skip (missing): $src"; return; }
    if [[ $DRY -eq 1 ]]; then echo "[dry] $src -> $dst"; return; fi
    mkdir -p "$(dirname "$dst")"
    mv "$src" "$dst" && echo "moved: $src -> $dst"
}

# 1) app + mockups + git back to original repo location
do_move "$T_ROOT/hercules" "$C/Hercules/hercules"
do_move "$T_ROOT/holo-mockups" "$C/Hercules/holo-mockups"
do_move "$T_ROOT/.git" "$C/Hercules/.git"

# 2) canonical vault -> original premade vault location
do_move "$T_ROOT/memory" "$C/Obsidian"

# 3) artifacts back to repo root
do_move "$A/old-repo-artifacts/uploads" "$C/Hercules/uploads"
for f in "$A"/old-repo-artifacts/screenshot.png "$A"/old-repo-artifacts/hercules-full-experience.png "$A"/old-repo-artifacts/hercules-ultron-hud.png "$A"/old-repo-artifacts/.DS_Store; do
    do_move "$f" "$C/Hercules/$(basename "$f")"
done

# 4) duplicates back to original locations
do_move "$A/Hercules_Final_UI" "$D/Hercules_Final_UI"
do_move "$A/Hercules_frontend" "$C/Hercules_frontend"
do_move "$A/hercules-core" "$D/hercules-core"
do_move "$A/launch_hercules.py" "$D/launch_hercules.py"
do_move "$A/docker-compose.hercules.yml" "$D/docker-compose.hercules.yml"

# 5) old-hercules + old repo copies back to the target folder (pre-consolidation target state)
mkdir -p "$T_ROOT"
do_move "$A/old-hercules" "$T_ROOT/hercules"
do_move "$A/old-uploads" "$T_ROOT/uploads"
do_move "$A/old-package-lock.json" "$T_ROOT/package-lock.json"

# 6) agent symlinks back to original files
if [[ $DRY -eq 1 ]]; then
    echo "[dry] restore opencode/claude/hermes pre-symlink files"
else
    rm -f "$HOME/.config/opencode/memory/index.md"
    cp -p "$A/legacy-agent-files/opencode/index.md.bak" "$HOME/.config/opencode/memory/index.md" 2>/dev/null && echo "restored opencode index.md"
    rm -f "$HOME/.claude/CLAUDE.md"
    cp -p "$A/legacy-agent-files/claude/CLAUDE.md.bak" "$HOME/.claude/CLAUDE.md" 2>/dev/null && echo "restored CLAUDE.md"
    rm -f "$HOME/.claude/memory"
    if [[ -d "$C/Obsidian/Claude-Memory/claude-memory" ]]; then
        mv "$C/Obsidian/Claude-Memory/claude-memory" "$HOME/.claude/memory" && echo "restored ~/.claude/memory"
    fi
    rm -f "$HOME/.hermes/memories/USER.md" "$HOME/.hermes/memories/MEMORY.md"
    # hermes originals were symlinks to ~/Documents/Obsidian/hermes_memory; restore links
    ln -sf "$HOME/Documents/Obsidian/hermes_memory/USER.md" "$HOME/.hermes/memories/USER.md"
    ln -sf "$HOME/Documents/Obsidian/hermes_memory/MEMORY.md" "$HOME/.hermes/memories/MEMORY.md"
    echo "restored hermes symlinks"
fi

# 7) LaunchAgent back to original autosync script
if [[ $DRY -eq 1 ]]; then
    echo "[dry] restore original LaunchAgent plist path"
else
    launchctl unload "$HOME/Library/LaunchAgents/com.user.obsidian-autosync.plist" 2>/dev/null || true
fi

echo
if [[ $DRY -eq 1 ]]; then echo "DRY-RUN — nothing changed."; else echo "Restore complete. Re-run installs/builds before using the app."; fi