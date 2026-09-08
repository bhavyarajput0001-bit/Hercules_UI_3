---
tags:
  - #memory
---

# 🐛 Debugging Playbooks

Systematic approaches for root cause analysis.

## 🔬 4-Phase Systematic Debugging (from `systematic-debugging` skill)

### Phase 1: Understand
- [ ] Reproduce consistently (minimal test case)
- [ ] Define expected vs actual behavior
- [ ] Identify recent changes (git log, CI)
- [ ] Check logs, metrics, traces

### Phase 2: Isolate
- [ ] Binary search: disable half the code
- [ ] Check boundaries (inputs, outputs, config)
- [ ] Compare environments (local vs prod)
- [ ] Use bisect: `git bisect start`

### Phase 3: Diagnose
- [ ] Add targeted logging/assertions
- [ ] Profile: `py-spy`, `node --inspect`, `perf`
- [ ] Check resources: memory, CPU, disk, network
- [ ] Trace requests: Jaeger, Zipkin, Grafana

### Phase 4: Fix & Verify
- [ ] Minimal fix, single commit
- [ ] Add regression test
- [ ] Verify in staging first
- [ ] Monitor post-deploy

## 🛠️ Tool-Specific Playbooks

### Python Performance
```bash
# Profile CPU
py-spy record -o profile.svg -- python script.py
py-spy top -- python script.py

# Profile memory
pip install memray
memray run script.py
memray flamegraph <output>

# Line-by-line
pip install line_profiler
kernprof -l -v script.py
```

### Node.js Debugging
```bash
# Inspector
node --inspect-brk script.js
# Open chrome://inspect

# Profiling
node --prof script.js
node --prof-process isolate-*.log > processed.txt

# Heap snapshots
node --heapsnapshot-signal=SIGUSR2 script.js
kill -SIGUSR2 <pid>
```

### Database Queries
```sql
-- PostgreSQL: explain analyze
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT * FROM table WHERE...;

-- Missing indexes
SELECT * FROM pg_stat_user_tables WHERE seq_scan > 1000;
```

## 🔍 Common Patterns

| Symptom | First Check |
|---------|-------------|
| Slow API | `EXPLAIN ANALYZE`, N+1 queries |
| Memory leak | Heap snapshots, `tracemalloc` |
| High CPU | Flame graphs, hot loops |
| Intermittent failures | Race conditions, flaky tests |
| Timeout | Deadlocks, circuit breakers, retries |

## 📊 Observability Queries

```promql
# High error rate
rate(http_requests_total{status=~"5.."}[5m]) > 0.05

# High latency (p99)
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 1

# Memory pressure
container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
```

---
*Link to [[Tool Reference]] for tool install commands*
