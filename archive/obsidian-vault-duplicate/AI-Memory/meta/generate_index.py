#!/usr/bin/env python3
"""Generate master INDEX.md for AI Memory Vault."""

import os
import re
from pathlib import Path
from datetime import datetime
from collections import defaultdict

VAULT = Path(__file__).parent.parent
INDEX_FILE = VAULT / "INDEX.md"

# Folders to index (skip meta)
FOLDERS = [
    "sessions", "patterns", "code", "projects",
    "references", "agents", "skills", "tools"
]

def extract_frontmatter(filepath):
    """Extract YAML frontmatter from markdown file."""
    content = filepath.read_text(encoding='utf-8')
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1].strip()
            # Simple key: value parsing
            meta = {}
            for line in fm.split('\n'):
                if ':' in line:
                    k, v = line.split(':', 1)
                    meta[k.strip()] = v.strip().strip('"\'')
            return meta
    return {}

def get_files(folder):
    """Get all .md files in folder."""
    path = VAULT / folder
    if not path.exists():
        return []
    return sorted(path.rglob("*.md"), key=lambda f: f.stat().st_mtime, reverse=True)

def format_entry(filepath, folder):
    """Format a single index entry."""
    rel = filepath.relative_to(VAULT)
    meta = extract_frontmatter(filepath)
    
    title = meta.get('title') or meta.get('pattern') or meta.get('snippet') or \
            meta.get('project') or meta.get('ref') or meta.get('session') or \
            filepath.stem.replace('-', ' ').title()
    
    tags = meta.get('tags', '')
    if isinstance(tags, str):
        tags = tags.strip('[]').replace(' ', '')
    
    status = meta.get('status', '')
    date = meta.get('date', '')
    
    parts = [f"- [[{rel.with_suffix('')}]] — {title}"]
    if tags:
        parts.append(f" `{tags}`")
    if status:
        parts.append(f" [{status}]")
    if date:
        parts.append(f" ({date})")
    
    return ''.join(parts)

def generate_index():
    """Generate the master index."""
    lines = [
        "# AI Memory Vault — Master Index",
        "",
        f"*Auto-generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*",
        f"*Vault: {VAULT}*",
        "",
        "---",
        ""
    ]
    
    stats = defaultdict(int)
    
    for folder in FOLDERS:
        files = get_files(folder)
        if not files:
            continue
            
        stats[folder] = len(files)
        lines.append(f"## {folder.title()} ({len(files)})")
        lines.append("")
        
        for f in files:
            lines.append(format_entry(f, folder))
        lines.append("")
    
    # Summary
    lines.append("---")
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    total = sum(stats.values())
    for folder, count in sorted(stats.items()):
        lines.append(f"- **{folder.title()}**: {count}")
    lines.append(f"- **Total**: {total}")
    lines.append("")
    
    # Tag cloud
    lines.append("## Tags")
    lines.append("")
    lines.append("*Run `meta/tag_cloud.py` for full tag analysis*")
    lines.append("")
    
    INDEX_FILE.write_text('\n'.join(lines), encoding='utf-8')
    print(f"Generated INDEX.md with {total} entries")

if __name__ == "__main__":
    generate_index()