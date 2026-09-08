"""
HERCULES BRAIN · memory_rb (rollback-safe)
Episodic + procedural memory for the brain. Writes are journaled in memory and
only committed to disk on success, so a crashed run leaves no partial state.
No LLM. (Semantic/pgvector recall lands in Phase 5; JSON file remains the
offline fallback.)
"""
from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

BASE = Path(__file__).resolve().parent
MEMORY_DIR = BASE.parent / "data" / "brain-memory"
MEMORY_FILE = MEMORY_DIR / "episodic.json"
PROCEDURE_USAGE_FILE = MEMORY_DIR / "procedure_usage.json"

# ---------------------------------------------------------------------------
# Episodic memory (JSON append-only with in-run rollback)
# ---------------------------------------------------------------------------


class BrainMemory:
    def __init__(self, memory_dir: Optional[Path] = None):
        self.dir = Path(memory_dir) if memory_dir else MEMORY_DIR
        self.episodic_file = self.dir / "episodic.json"
        self.procedure_file = self.dir / "procedure_usage.json"
        try:
            self.dir.mkdir(parents=True, exist_ok=True)
        except Exception:
            pass
        self._pending: List[Dict[str, Any]] = []
        self._load()

    def _load(self) -> None:
        self.episodic: List[Dict[str, Any]] = self._read_json(self.episodic_file, [])
        self.procedure_usage: Dict[str, Dict[str, Any]] = self._read_json(self.procedure_file, {})

    @staticmethod
    def _read_json(path: Path, default: Any) -> Any:
        try:
            if path.exists():
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception:
            pass
        return default

    def _save(self) -> None:
        try:
            with open(self.episodic_file, "w", encoding="utf-8") as f:
                json.dump(self.episodic[-500:], f, indent=2, ensure_ascii=False)
            with open(self.procedure_file, "w", encoding="utf-8") as f:
                json.dump(self.procedure_usage, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

    def begin(self) -> None:
        """Open a write transaction. Nothing persists until commit()."""
        self._pending = []

    def stage(self, record: Dict[str, Any]) -> None:
        self._pending.append(record)

    def commit(self) -> int:
        """Persist staged records atomically (best-effort single write)."""
        if not self._pending:
            return 0
        self.episodic.extend(self._pending)
        count = len(self._pending)
        self._pending = []
        self._save()
        return count

    def rollback(self) -> int:
        n = len(self._pending)
        self._pending = []
        return n

    # -- recall -------------------------------------------------------------

    def recall(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Keyword-overlap recall (Jaccard-ish). Returns best matches."""
        q = set(self._keywords(query))
        if not q:
            return self.episodic[-limit:][::-1]
        scored = []
        for rec in self.episodic:
            body = " ".join([
                str(rec.get("task", "")),
                str(rec.get("procedure", "")),
                str(rec.get("summary", "")),
            ])
            k = set(self._keywords(body))
            if not k:
                continue
            inter = len(q & k)
            union = len(q | k)
            score = inter / union if union else 0
            scored.append((score, rec))
        scored.sort(key=lambda x: -x[0])
        return [r for _, r in scored[:limit] if _ > 0.1]

    def procedure_hits(self, procedure_id: str) -> int:
        return int(self.procedure_usage.get(procedure_id, {}).get("times", 0))

    def note_procedure_use(self, procedure_id: str, task: str, ok: bool) -> None:
        cur = self.procedure_usage.get(procedure_id, {"times": 0, "successes": 0, "last": None, "examples": []})
        cur["times"] = int(cur.get("times", 0)) + 1
        if ok:
            cur["successes"] = int(cur.get("successes", 0)) + 1
        cur["last"] = time.strftime("%Y-%m-%dT%H:%M:%SZ")
        examples = cur.get("examples", [])
        examples.append({"task": task[:120], "ok": ok, "at": cur["last"]})
        cur["examples"] = examples[-20:]
        self.procedure_usage[procedure_id] = cur

    def record_run(self, plan: Dict[str, Any], results: List[Dict[str, Any]], ok: bool) -> None:
        """Stage a full run record for later commit()."""
        self.stage({
            "at": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "task": plan.get("task", ""),
            "class": plan.get("class", ""),
            "mode": plan.get("mode", ""),
            "procedure": plan.get("procedure", {}).get("id"),
            "steps": [{"hand": r.get("hand"), "ok": r.get("ok")} for r in results],
            "ok": ok,
            "summary": f"{plan.get('task', '')[:120]} — {('ok' if ok else 'degraded')} via {plan.get('procedure', {}).get('id', 'default')}",
        })
        self.note_procedure_use(str(plan.get("procedure", {}).get("id", "default")), plan.get("task", ""), ok)

    # -- helpers -------------------------------------------------------------

    @staticmethod
    def _keywords(text: str) -> List[str]:
        import re
        stop = {
            "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with",
            "is", "was", "are", "were", "it", "this", "that", "i", "you", "my", "of",
        }
        toks = re.findall(r"[a-z0-9_]{2,}", str(text).lower())
        return [t for t in toks if t not in stop]


brain_memory = BrainMemory()


if __name__ == "__main__":
    m = BrainMemory(memory_dir=Path("/tmp/hercules-brain-mem-test"))
    m.begin()
    m.record_run({"task": "organize my downloads", "class": "automation", "mode": "pragmatic", "procedure": {"id": "organize_downloads"}}, [{"hand": "code", "ok": True}], True)
    m.commit()
    print("recall:", m.recall("organize downloads"))