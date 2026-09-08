"""
HERCULES BRAIN · cognition
Deterministic task fingerprinting and thinking-mode selection.
PURE PYTHON — never calls a model. This is where the brain decides HOW to think.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

BASE = Path(__file__).resolve().parent

# Task classes the brain can recognize offline.
TASK_CLASSES: List[str] = [
    "code", "research", "design", "memory", "document",
    "system", "automation", "reasoning", "write", "transform",
    "security", "optimization", "novel", "architecture", "refactor",
]

# Heuristic keyword groups -> task class. Longer, more specific groups win by count.
CLASS_KEYWORDS: Dict[str, List[str]] = {
    "code": ["code", "python", "script", "function", "compile", "debug", "traceback", "syntax", "bug", "implement", "program", "api", "build"],
    "research": ["research", "search", "scrape", "who is", "what is", "investigate", "find information", "report on", "source", "web", "http", "url"],
    "design": ["design", "wireframe", "ui", "ux", "theme", "palette", "color", "diagram", "mermaid", "flowchart", "landing", "component", "visual"],
    "memory": ["remember", "recall", "note", "memory", "store", "forget", "consolidate", "what did"],
    "document": ["summarize", "document", "pdf", "readme", "write up", "briefing", "report", "transcript", "digest"],
    "system": ["system", "cpu", "ram", "disk", "process", "gpu", "battery", "monitor", "device", "hardware", "diagnostic", "telemetry"],
    "automation": ["automate", "schedule", "cron", "workflow", "trigger", "whenever", "every", "automation", "premade"],
    "reasoning": ["solve", "analy", "why", "logic", "prove", "determine", "explain", "root cause", "premise", "calculate"],
    "write": ["write", "email", "draft", "compose", "message", "post", "reply", "letter", "copy"],
    "transform": ["convert", "transform", "format", "parse", "extract", "reformat", "scrape into", "translate"],
    "security": ["secure", "security", "auth", "permission", "privacy", "secret", "vulnerab", "risk", "attack", "audit", "leak", "pii", "breach"],
    "optimization": ["slow", "latency", "optimize", "perf", "bottleneck", "memory leak", "measure", "fast"],
    "refactor": ["refactor", "clean", "simplify", "technical debt", "restructure", "maintain"],
    "architecture": ["architect", "platform", "migrat", "module", "boundary", "integrat", "infra", "service", "design system"],
}

# Task class -> default thinking mode (fallback if no stronger signal).
CLASS_MODE_HINT: Dict[str, str] = {
    "code": "craftsman",
    "research": "research",
    "design": "craftsman",
    "memory": "minimalist",
    "document": "research",
    "system": "optimizer",
    "automation": "pragmatic",
    "reasoning": "reasoning",
    "write": "pragmatic",
    "transform": "pragmatic",
    "security": "security",
    "optimization": "optimizer",
    "novel": "first-principles",
    "architecture": "systems",
    "refactor": "minimalist",
}


def _load_json(path: Path) -> Dict[str, Any]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def load_modes() -> Dict[str, Dict[str, Any]]:
    """Load all brain/modes/*.json into a dict keyed by mode id."""
    modes: Dict[str, Dict[str, Any]] = {}
    modes_dir = BASE / "modes"
    if modes_dir.exists():
        for f in sorted(modes_dir.glob("*.json")):
            data = _load_json(f)
            if data.get("id"):
                modes[data["id"]] = data
    return modes


def classify(task: str) -> Dict[str, Any]:
    """
    Fingerprint a directive into a task class. Deterministic keyword scoring.
    Returns: { class, confidence, matchedKeywords[], modeHint }
    """
    t = task.lower().strip()
    scores: Dict[str, int] = {}
    matched: Dict[str, List[str]] = {}
    for cls, kws in CLASS_KEYWORDS.items():
        count = 0
        hits: List[str] = []
        for kw in kws:
            if kw in t:
                count += 1
                hits.append(kw)
        if count:
            scores[cls] = count
            matched[cls] = hits

    if not scores:
        return {"class": "reasoning", "confidence": 0.3, "matchedKeywords": [], "modeHint": "reasoning"}

    best = max(scores, key=lambda c: (scores[c], len(matched[c])))
    confidence = min(1.0, 0.4 + scores[best] * 0.15)
    return {
        "class": best,
        "confidence": round(confidence, 2),
        "matchedKeywords": matched[best],
        "modeHint": CLASS_MODE_HINT.get(best, "reasoning"),
    }


def select_mode(task: str, task_class: str, available_modes: Optional[Dict[str, Dict[str, Any]]] = None) -> str:
    """
    Choose a thinking mode for the task. Deterministic:
      1. direct mode-id / mode-name mention wins;
      2. else scan every mode's selectionSignals against the task (highest hit count);
      3. else fall back to the class's default modeHint.
    """
    modes = available_modes if available_modes is not None else load_modes()
    t = task.lower()

    # 1. Explicit mention of a mode name or id.
    for mid, m in modes.items():
        name = (m.get("name") or "").lower()
        if mid in t or name in t:
            return mid

    # 2. Selection-signal scoring across modes.
    best_mid: Optional[str] = None
    best_hits = 0
    for mid, m in modes.items():
        signals = m.get("selectionSignals", [])
        hits = sum(1 for s in signals if s in t)
        if hits > best_hits:
            best_hits = hits
            best_mid = mid
    if best_mid and best_hits >= 1:
        return best_mid

    # 3. Class default.
    return CLASS_MODE_HINT.get(task_class, "reasoning")


def mode_spec(mode_id: str, available_modes: Optional[Dict[str, Dict[str, Any]]] = None) -> Dict[str, Any]:
    modes = available_modes if available_modes is not None else load_modes()
    return modes.get(mode_id, {"id": "reasoning", "name": "Reasoning", "planStyle": "reason step-by-step", "reportTone": "structured"})


if __name__ == "__main__":
    for sample in ["organize my downloads folder by type",
                   "debug this python traceback and fix it",
                   "research who runs the ai_os project",
                   "write a professional email to the hiring team",
                   "optimize the slow database query",
                   "design a wireframe for a landing page"]:
        c = classify(sample)
        m = select_mode(sample, c["class"])
        print(f"{sample[:48]:50} -> {c['class']:12} conf={c['confidence']} mode={m}")