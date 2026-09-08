#!/usr/bin/env python3
"""Generate tag cloud for AI Memory Vault."""

import re
from pathlib import Path
from collections import Counter

VAULT = Path(__file__).parent.parent

def extract_tags(filepath):
    """Extract tags from frontmatter and inline."""
    content = filepath.read_text(encoding='utf-8')
    tags = []
    
    # Frontmatter tags
    fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)
        tags_match = re.search(r'tags:\s*\[(.*?)\]', fm, re.DOTALL)
        if tags_match:
            tags_str = tags_match.group(1)
            tags.extend([t.strip().strip('"\'') for t in tags_str.split(',') if t.strip()])
    
    # Inline tags (#tag)
    tags.extend(re.findall(r'#(\w+/\w+)', content))
    
    return tags

def main():
    all_tags = Counter()
    
    for md_file in VAULT.rglob("*.md"):
        if md_file.name in ("INDEX.md", "README.md", "templates.md"):
            continue
        tags = extract_tags(md_file)
        all_tags.update(tags)
    
    print("# Tag Cloud")
    print("")
    print(f"*Generated: {len(all_tags)} unique tags*")
    print("")
    
    # Group by prefix
    by_prefix = {}
    for tag, count in all_tags.most_common():
        prefix = tag.split('/')[0] if '/' in tag else 'other'
        if prefix not in by_prefix:
            by_prefix[prefix] = []
        by_prefix[prefix].append((tag, count))
    
    for prefix in sorted(by_prefix.keys()):
        print(f"## {prefix}")
        for tag, count in by_prefix[prefix]:
            bar = '█' * min(count, 20)
            print(f"- `#{tag}` ({count}) {bar}")
        print()

if __name__ == "__main__":
    main()