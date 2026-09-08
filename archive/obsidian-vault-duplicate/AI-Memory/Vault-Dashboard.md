---
tags: [dashboard, vault-overview]
---

# 📊 Vault Dashboard

## Vault Statistics

```dataview
TABLE WITHOUT ID
  vault as "Vault",
  length(rows) as "Notes",
  sum(rows.size) as "Total Size (KB)"
FROM ""
WHERE vault
GROUP BY vault
SORT length(rows) DESC
```

## By Type

```dataview
TABLE WITHOUT ID
  type as "Type",
  length(rows) as "Count"
FROM ""
WHERE type
GROUP BY type
SORT length(rows) DESC
```

## Recent Sessions

```dataview
TABLE WITHOUT ID
  file.link as "Session",
  vault as "Vault",
  date as "Date"
FROM ""
WHERE type = "session"
SORT date DESC
LIMIT 10
```

## Projects

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  vault as "Vault",
  status as "Status"
FROM ""
WHERE type = "project"
```

## Cross-Vault Links

```dataview
TABLE WITHOUT ID
  file.link as "Source",
  outgoing as "Links To"
FROM ""
WHERE outgoing
FLATTEN file.outlinks as outgoing
WHERE outgoing.vault != file.vault
```

## Graph View Links

- [[Graph View]] — Built-in graph (Ctrl+G)
- [[Vault-Overview]] — Canvas overview

---

*Auto-generated dashboard. Refresh with `Dataview: Rebuild Index`*
