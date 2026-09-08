"""
HERCULES BRAIN · planner
Builds an executable step DAG from a matched procedure (or a default rule-based
plan for novel tasks). PURE PYTHON — planning never calls a model.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

from .cognition import classify, load_modes, mode_spec

BASE = Path(__file__).resolve().parent
PROCEDURES_DIR = BASE.parent / "procedures"


def _load_json(path: Path) -> Dict[str, Any]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def load_procedures() -> Dict[str, Dict[str, Any]]:
    """Load procedures/*.json keyed by id."""
    procs: Dict[str, Dict[str, Any]] = {}
    if PROCEDURES_DIR.exists():
        for f in sorted(PROCEDURES_DIR.glob("*.json")):
            data = _load_json(f)
            if data.get("id"):
                procs[data["id"]] = data
    return procs


def match_procedure(task: str, procedures: Optional[Dict[str, Dict[str, Any]]] = None) -> Optional[Dict[str, Any]]:
    """
    Find the best matching procedure for a directive.
    Scoring: +2 per trigger hit, +1 per keyword hit. Returns the highest scorer
    above 0, else None (novel task -> default plan).
    """
    procs = procedures if procedures is not None else load_procedures()
    t = task.lower()
    best: Optional[Dict[str, Any]] = None
    best_score = 0
    for pid, p in procs.items():
        score = 0
        for tr in p.get("triggers", []):
            if str(tr).lower() in t:
                score += 2
        for kw in p.get("keywords", []):
            if str(kw).lower() in t:
                score += 1
        if score > best_score:
            best_score = score
            best = {**p, "matchScore": score}
    return best if best_score > 0 else None


def _default_plan(task: str, task_class: str) -> Dict[str, Any]:
    """A procedural fallback so the brain still thinks for a NOVEL task."""
    generic_steps: List[Dict[str, Any]] = [
        {"hand": "reasoner", "title": "Frame the objective and constraints", "in": "objective", "ok": "nonempty"},
        {"hand": "gather", "title": "Gather context for the task", "in": "context", "ok": "nonempty"},
    ]
    class_steps: Dict[str, List[Dict[str, Any]]] = {
        "code": [
            {"hand": "code", "title": "Produce a working implementation", "in": "directive", "ok": "nonempty"},
            {"hand": "verifier", "title": "Check the implementation for correctness", "in": "code", "ok": "nonempty"},
        ],
        "research": [
            {"hand": "search", "title": "Gather evidence across angles", "in": "directive", "ok": "nonempty"},
            {"hand": "synthesize", "title": "Synthesize findings with sources", "in": "findings", "ok": "nonempty"},
        ],
        "document": [
            {"hand": "docgen", "title": "Produce the document", "in": "directive", "ok": "nonempty"},
        ],
        "design": [
            {"hand": "design", "title": "Produce the design artifact", "in": "directive", "ok": "nonempty"},
        ],
        "system": [
            {"hand": "shell", "title": "Gather system telemetry", "in": "system", "ok": "nonempty"},
            {"hand": "synthesize", "title": "Interpret telemetry into findings", "in": "telemetry", "ok": "nonempty"},
        ],
        "automation": [
            {"hand": "automation", "title": "Define the automation", "in": "directive", "ok": "nonempty"},
        ],
        "security": [
            {"hand": "security", "title": "Run the security posture check", "in": "directive", "ok": "nonempty"},
        ],
        "optimization": [
            {"hand": "analyzer", "title": "Profile and identify the hotspot", "in": "directive", "ok": "nonempty"},
            {"hand": "optimizer", "title": "Apply and verify the fix", "in": "analysis", "ok": "nonempty"},
        ],
        "transform": [
            {"hand": "transformer", "title": "Apply the transformation", "in": "directive", "ok": "nonempty"},
        ],
    }
    steps = generic_steps + class_steps.get(task_class, [
        {"hand": "reasoner", "title": "Reason through the task", "in": "directive", "ok": "nonempty"},
        {"hand": "synthesize", "title": "Synthesize the result", "in": "reasoning", "ok": "nonempty"},
    ])
    return {
        "id": f"default-{task_class}",
        "name": f"Default {task_class} procedure",
        "class": task_class,
        "steps": steps,
        "verify": [f"Each step produced output for '{task_class}'"],
        "report": "structured",
        "isDefault": True,
    }


def plan(task: str, procedure: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Produce a plan graph for the directive.
      - If a procedure matched, use its steps verbatim (they already carry hands).
      - Else build the default rule-based plan for the task class.
    Returns: { task, class, mode, modeSpec, procedure, steps, verify, report }
    """
    task = task.strip()
    cls = classify(task)
    mode_id = cls["modeHint"]
    modes = load_modes()
    ms = mode_spec(mode_id, modes)

    if procedure is None:
        procedure = _default_plan(task, cls["class"])

    steps = [
        {
            "id": f"step-{i + 1}",
            "hand": s.get("hand", "reasoner"),
            "title": s.get("title", "Step"),
            "in": s.get("in", "directive"),
            "ok": s.get("ok", "nonempty"),
        }
        for i, s in enumerate(procedure.get("steps", []))
    ]

    return {
        "task": task,
        "class": cls["class"],
        "confidence": cls["confidence"],
        "mode": mode_id,
        "modeSpec": ms,
        "procedure": {"id": procedure.get("id"), "name": procedure.get("name"), "isDefault": bool(procedure.get("isDefault"))},
        "steps": steps,
        "verify": procedure.get("verify", []),
        "report": procedure.get("report", "structured"),
        "risk": procedure.get("risk", "low"),
        "requiresApproval": bool(procedure.get("requiresApproval", False)),
    }


if __name__ == "__main__":
    for sample in ["organize my downloads folder by type",
                   "research who runs the ai_os project"]:
        proc = match_procedure(sample)
        p = plan(sample, proc)
        print(f"\n## {sample}\n  class={p['class']} mode={p['mode']} proc={p['procedure']['id']}")
        for s in p["steps"]:
            print(f"    - [{s['hand']}] {s['title']}")