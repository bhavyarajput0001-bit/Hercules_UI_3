---
tags:
  - #memory
---

# 📏 Development Standards

Code style, git workflow, testing conventions.

## 🎨 Code Style

### Python
```bash
# Format: black (line-length 100)
# Lint: ruff (replaces flake8, isort, pyupgrade)
# Type: mypy --strict
# Test: pytest -xvs --tb=short

# pyproject.toml
[tool.black]
line-length = 100
target-version = ["py312"]

[tool.ruff]
line-length = 100
target-version = "py312"
select = ["E", "F", "I", "UP", "B", "C4", "PT", "PTH"]
```

### TypeScript/React
```bash
# Format: prettier (single-quote, trailing-comma es5)
# Lint: eslint (typescript-eslint, react-hooks)
# Type: tsc --noEmit
# Test: vitest / playwright

# .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🌿 Git Workflow

```bash
# Branch naming
feat/<short-description>    # New feature
fix/<short-description>     # Bug fix
refactor/<description>      # Code improvement
docs/<description>          # Documentation
chore/<description>         # Maintenance

# Commit format (conventional)
feat(api): add user pagination endpoint
fix(ui): resolve mobile nav overflow
refactor(db): extract query builder

# PR checklist
- [ ] Tests pass (CI green)
- [ ] Types check (mypy/tsc)
- [ ] Lint clean (ruff/eslint)
- [ ] No console.log/print left
- [ ] Updated docs if API changed
- [ ] Self-reviewed diff
```

## 🧪 Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Unit | pytest / vitest | 80%+ (critical paths 100%) |
| Integration | pytest-asyncio / playwright | Key user flows |
| Contract | pact / schemathesis | API boundaries |
| E2E | playwright / cypress | Critical paths only |
| Performance | locust / k6 | Baseline + regression |

**Rules:**
- Test behavior, not implementation
- No mocked internals — test at boundaries
- Fast tests in CI, slow tests nightly
- Flaky tests = blocker, fix or delete

## 🏗️ Architecture Principles

1. **Modular** — Clear boundaries, single responsibility
2. **Async-first** — `async/await` everywhere, no sync I/O in hot paths
3. **Dependency injection** — Pass deps, don't import globals
4. **Explicit over implicit** — Config over convention
5. **Fail fast** — Validate at boundaries, crash early
6. **Observability built-in** — Logs, metrics, traces by default

## 🔒 Security

- Never commit secrets (use `.env`, keychain, 1Password CLI)
- `pip-audit` / `npm audit` in CI
- Dependabot / Renovate for updates
- SAST: `bandit` (Python), `eslint-plugin-security` (TS)
- Container: distroless, non-root, read-only fs

---
*Enforced by `requesting-code-review` skill on PRs*
