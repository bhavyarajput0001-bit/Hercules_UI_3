---
tags:
  - #memory
  - #pattern
---

# Templates

## Session Template

```markdown
---
date: YYYY-MM-DD
session: N
project: 
tags: [#session/YYYY-MM-DD]
status: active
---

# Session YYYY-MM-DD-N

## Context
- Goal: 
- Previous: [[Session YYYY-MM-DD-N-1]]

## Work Done
- 
- 

## Decisions
- 

## Blockers
- 

## Next Steps
- 

## Files Changed
- 
```

## Pattern Template

```markdown
---
pattern: name
category: architecture|implementation|debugging|optimization
tags: [#pattern/category, #lang/xxx, #framework/xxx]
status: proven
---

# Pattern: Name

## Problem
What problem does this solve?

## Solution
Core approach / code / architecture

## When to Use
Conditions / triggers

## Trade-offs
Pros / Cons

## Example
```language
// code example
```

## Related
- [[Pattern: Related]]
- [[Project: X]]
```

## Code Snippet Template

```markdown
---
snippet: name
lang: python|typescript|rust|go|bash
tags: [#lang/xxx, #pattern/xxx]
---

# Snippet: Name

## Description
What this does

## Code
```language
// code
```

## Usage
How to use / integrate

## Dependencies
- 
```

## Project Template

```markdown
---
project: name
started: YYYY-MM-DD
status: active|paused|done
tags: [#project/name]
---

# Project: Name

## Overview
High-level description

## Architecture
- Stack:
- Key decisions:
- Diagram: [[File]]

## Progress
- [ ] Task 1
- [ ] Task 2

## Decisions Log
- Date: Decision - Reason

## Resources
- [[Reference: X]]
- [[Pattern: Y]]
```

## Reference Template

```markdown
---
ref: name
type: api|config|doc|tool
tags: [#tool/xxx, #ref/type]
---

# Reference: Name

## Source
URL / Location

## Key Info
- 
- 

## Usage
```bash
# commands
```

## Related
- 
```