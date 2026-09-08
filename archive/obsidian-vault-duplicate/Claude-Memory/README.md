---
tags:
  - #index
  - #memory
---

# Claude Memory System

This memory system is integrated with Obsidian for easy viewing and editing.

## Memory Location
- **Obsidian Vault**: `~/Documents/Obsidian/Claude-Memory/`
- **Claude Access**: `~/.claude/projects/-Users-bhavyarajput/memory/` (symlinked)

## Memory Types

### 1. User Memories (`user/`)
Information about the user's role, goals, preferences, and knowledge level.

### 2. Feedback Memories (`feedback/`)
Guidance on how to approach work - both what to avoid and what to keep doing.

### 3. Project Memories (`project/`)
Ongoing work, goals, initiatives, bugs, and incidents within projects.

### 4. Reference Memories (`reference/`)
Pointers to external systems and where information can be found.

## How to Use

### Adding Memories
1. Open Obsidian and navigate to `Claude-Memory/`
2. Create a new note in the appropriate folder
3. Use the frontmatter format:

```markdown
---
name: memory-name-in-kebab-case
description: One-line summary for relevance matching
metadata:
  type: user|feedback|project|reference
  created: 2026-08-23
  updated: 2026-08-23
---

## Memory Content

Your detailed memory content here.

**Why:** Explanation of the reason/context
**How to apply:** When and where this applies

[[related-memory]] - Link to related memories
```

### Viewing Memories in Obsidian
- Use graph view to see memory connections
- Search across all memories
- Tag memories for better organization
- Use Obsidian's backlinks to see relationships

## Best Practices

1. **Keep memories current** - Update or remove outdated information
2. **Link related memories** - Use `[[memory-name]]` syntax
3. **Be specific** - Include file paths, dates, specific examples
4. **Save from failure AND success** - Not just corrections
5. **Use absolute dates** - Convert relative dates to absolute (e.g., "Thursday" → "2026-08-23")

## What NOT to Save

- Code patterns, conventions, architecture (derive from code)
- Git history (use `git log` / `git blame`)
- Debugging solutions (the fix is in the code)
- Ephemeral task details
- Current conversation context

## Memory Index

See `MEMORY.md` for the full index of available memories.
