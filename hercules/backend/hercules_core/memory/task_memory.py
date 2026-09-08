"""
Hercules Memory Subsystem — Persistent Task Memory & Episodic Recall
Recalls if a task was done previously, what parameters were used, and step-by-step how it was performed.
"""

import os
import json
import time
from pathlib import Path
from typing import Dict, Any, List, Optional

def _resolve_memory_dir() -> Path:
    env_path = os.getenv("HERCULES_MEMORY_DIR")
    if env_path:
        p = Path(env_path)
        try:
            p.mkdir(parents=True, exist_ok=True)
            return p
        except Exception:
            pass

    # Try local package data directory first to stay within workspace sandbox
    local_dir = Path(__file__).resolve().parent.parent / "data" / "memory"
    try:
        local_dir.mkdir(parents=True, exist_ok=True)
        return local_dir
    except Exception:
        pass

    # Fallback to user home
    try:
        home_dir = Path.home() / ".hercules" / "memory"
        home_dir.mkdir(parents=True, exist_ok=True)
        return home_dir
    except Exception:
        pass

    # Ultimate fallback to current working directory
    fallback_dir = Path("./hercules_memory").resolve()
    fallback_dir.mkdir(parents=True, exist_ok=True)
    return fallback_dir

MEMORY_DIR = _resolve_memory_dir()
MEMORY_FILE = MEMORY_DIR / "task_history.json"

class TaskMemory:
    """Persistent task memory store with similarity recall."""

    def __init__(self):
        try:
            MEMORY_DIR.mkdir(parents=True, exist_ok=True)
        except Exception:
            pass
        self.history: List[Dict[str, Any]] = self._load()

    def _load(self) -> List[Dict[str, Any]]:
        if MEMORY_FILE.exists():
            try:
                with open(MEMORY_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    def _save(self):
        try:
            with open(MEMORY_FILE, "w", encoding="utf-8") as f:
                json.dump(self.history[-500:], f, indent=2, ensure_ascii=False)
        except Exception:
            pass

    def record_task(self, prompt: str, refined_plan: Dict[str, Any], department: str,
                    agent_name: str, actions_taken: List[str], result_summary: str,
                    success: bool = True) -> Dict[str, Any]:
        """Record a completed or attempted task into episodic memory."""
        entry = {
            "id": f"task_{int(time.time() * 1000)}",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "prompt": prompt,
            "keywords": self._extract_keywords(prompt),
            "department": department,
            "agent_name": agent_name,
            "refined_plan": refined_plan,
            "actions_taken": actions_taken,
            "result_summary": result_summary,
            "success": success,
        }
        self.history.append(entry)
        self._save()
        return entry

    def recall_task(self, query: str, threshold: float = 0.3) -> Optional[Dict[str, Any]]:
        """
        Recall if a similar task was done previously and how it was done.
        Returns the best matching previous execution or None.
        """
        if not self.history:
            return None

        query_kw = set(self._extract_keywords(query))
        if not query_kw:
            return None

        best_match = None
        best_score = 0.0

        for item in reversed(self.history):
            item_kw = set(item.get("keywords", []))
            if not item_kw:
                continue

            intersection = query_kw.intersection(item_kw)
            union = query_kw.union(item_kw)
            score = len(intersection) / len(union) if union else 0.0

            # Boost exact substring matches
            if query.lower() in item.get("prompt", "").lower() or item.get("prompt", "").lower() in query.lower():
                score += 0.4

            if score > best_score and score >= threshold:
                best_score = score
                best_match = {
                    **item,
                    "similarity_score": round(min(score, 1.0), 2),
                    "how_it_was_done": {
                        "department": item.get("department"),
                        "agent": item.get("agent_name"),
                        "steps": item.get("actions_taken", []),
                        "previous_result": item.get("result_summary"),
                        "recorded_at": item.get("timestamp"),
                    }
                }

        return best_match

    def list_recent_tasks(self, limit: int = 10) -> List[Dict[str, Any]]:
        """List the most recent executed tasks."""
        return list(reversed(self.history[-limit:]))

    def _extract_keywords(self, text: str) -> List[str]:
        if not text:
            return []
        import re
        stopwords = {
            "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with",
            "is", "was", "are", "were", "it", "this", "that", "i", "you", "my", "please", "can"
        }
        tokens = re.findall(r"\b[a-zA-Z0-9_-]{2,}\b", text.lower())
        return [t for t in tokens if t not in stopwords]

task_memory = TaskMemory()
