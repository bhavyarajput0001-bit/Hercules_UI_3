# Memory Map — Shared Memory Index

> Token-minimal recall: every session reads THIS file first (cheap, <300 tokens). Load a department file only when the task matches. Never load the whole tree.

## Departments (20)

| Department | Memory File | Last Updated | Has Templates |
|------------|-------------|--------------|---------------|
| Agent Creation & Mgmt | departments/agent-creation.md | 2026-09-03 | no |
| LLM Integration & Opt | departments/llm-integration.md | 2026-09-03 | no |
| Voice Gen & Processing | departments/voice-generation.md | - | no |
| Database Architecture | departments/database-architecture.md | 2026-09-03 | no |
| Frontend Debug & UX | departments/frontend-debugging-ux.md | 2026-09-03 | yes (ai-website-builder) |
| Backend Debug & Perf | departments/backend-debugging.md | - | no |
| Image Generation | departments/image-generation.md | - | no |
| Image Processing | departments/image-processing.md | - | no |
| Video Generation | departments/video-generation.md | - | no |
| Video Processing | departments/video-processing.md | - | no |
| Data Processing & ETL | departments/data-processing.md | - | no |
| Security & Hardening | departments/security-hardening.md | - | no |
| Testing & QA | departments/testing-qa.md | - | no |
| Documentation & Knowledge | departments/documentation.md | - | no |
| Deployment & Infra | departments/deployment-infrastructure.md | - | no |
| Research & Intelligence | departments/research-intelligence.md | 2026-09-04 | yes (identity-dossier) |
| Resource | Resource & HW Mgmt | departments/resource-management.md | 2026-09-04 | yes HW Mgmt | departments/resource-management.md | 2026-09-04 (ORCH-001) | yes (hardware-check) |
| Memory & Knowledge Curation | departments/memory-knowledge.md | 2026-09-04 | yes (memory-map) |
| Automation | Automation & Scheduling | departments/automation-scheduling.md | 2026-09-04 | no | Scheduling | departments/automation-scheduling.md | 2026-09-04 (ORCH-001) | no |
| Project Mgmt & Phases | departments/project-management.md | 2026-09-04 | yes (todo, phases) |

## Global Files

| File | Purpose | Size |
|------|---------|------|
| ceo-logs.md | Task index + session history | small |
| performance-metrics.md | Speed reduction tracking | small |
| research-dossiers/ | Cached identity reports (30-day reuse) | grows with use |
| project-checkpoints/ | Sequential run resume points | grows with use |

## Recall Rules

1. Task arrives → scan this map for matching department/template (1 read, ~300 tokens)
2. Match found → read that ONE department file (≤2000 tokens)
3. No match → proceed novel, log new template after completion
4. Research request → check research-dossiers/ BEFORE searching the web (cache hit = zero-cost answer)
5. Compaction duty → memory-curator runs monthly; archives entries >120 days

## Update Log

- 2026-09-04: Initialized with v2.0 build (20 departments, 5 modes)