"""
HERCULES BRAIN · engine
The deterministic pipeline. This is the brain that designs and thinks on its own.

    perceive -> classify -> reason(mode) -> plan -> delegate(hands) ->
    verify -> record(memory) -> report

NO LLM is required for the brain to think. Hands may call models (Phase 3) but
only to enrich step CONTENT, never to build the plan. A failed hand degrades a
single step; the run always completes and reports.
"""
from __future__ import annotations

import time
from typing import Any, Callable, Dict, Iterator, List, Optional

from . import cognition
from .planner import load_procedures, match_procedure, plan as build_plan
from .hands import run_hand
from .memory_rb import brain_memory

# Optional streaming hook: engine emits lifecycle events (thinking/plan/step/verify/done).
# server.py can attach a callback to turn these into SSE StreamChunks.
EventListener = Callable[[str, Dict[str, Any]], None]


class BrainEngine:
    def __init__(self, on_event: Optional[EventListener] = None):
        self.on_event = on_event or (lambda kind, data: None)

    # -- stages --------------------------------------------------------------

    def _emit(self, kind: str, data: Dict[str, Any]) -> None:
        self.on_event(kind, data)

    def perceive(self, directive: str, context: Optional[Dict[str, Any]]) -> Dict[str, Any]:
        self._emit("thinking", {"note": "Perceiving directive"})
        return {
            "directive": directive.strip(),
            "context": context or {},
            "normalized": " ".join(directive.strip().split()),
        }

    def classify(self, perceived: Dict[str, Any]) -> Dict[str, Any]:
        cls = cognition.classify(perceived["directive"])
        self._emit("thinking", {"note": f"Classified as {cls['class']} (conf {cls['confidence']})"})
        return cls

    def reason(self, perceived: Dict[str, Any], cls: Dict[str, Any]) -> Dict[str, Any]:
        mode_id = cognition.select_mode(perceived["directive"], cls["class"])
        spec = cognition.mode_spec(mode_id)
        self._emit("thinking", {"note": f"Selected thinking mode: {spec.get('name', mode_id)}"})
        return {"id": mode_id, "spec": spec}

    def plan(self, perceived: Dict[str, Any], cls: Dict[str, Any], mode: Dict[str, Any]) -> Dict[str, Any]:
        procs = load_procedures()
        proc = match_procedure(perceived["directive"], procs)
        plan_graph = build_plan(perceived["directive"], proc)
        # Override mode with the reasoning result (procedure modeHint is a fallback).
        plan_graph["mode"] = mode["id"]
        self._emit("plan", {
            "procedure": plan_graph["procedure"],
            "class": plan_graph["class"],
            "mode": plan_graph["mode"],
            "steps": [{"hand": s["hand"], "title": s["title"]} for s in plan_graph["steps"]],
        })
        return plan_graph

    def delegate(self, plan_graph: Dict[str, Any], perceived: Dict[str, Any]) -> List[Dict[str, Any]]:
        results: List[Dict[str, Any]] = []
        shared: Dict[str, Any] = {"directive": perceived["directive"], "context": perceived["context"]}
        for step in plan_graph["steps"]:
            self._emit("step", {"hand": step["hand"], "title": step["title"], "status": "running"})
            # Feed the step's declared input from prior outputs where available.
            input_ = dict(shared)
            for r in results:
                if r.get("ok"):
                    input_.setdefault(step["in"], r.get("output"))
            input_["directive"] = perceived["directive"]
            res = run_hand(step["hand"], input_)
            res["hand"] = step["hand"]
            res["title"] = step["title"]
            res["elapsedMs"] = 0
            results.append(res)
            self._emit("step", {"hand": step["hand"], "title": step["title"], "status": "ok" if res.get("ok") else "error"})
            if step.get("requiresApproval"):
                self._emit("approval", {"step": step["title"]})
        return results

    def verify(self, plan_graph: Dict[str, Any], results: List[Dict[str, Any]]) -> Dict[str, Any]:
        checks = plan_graph.get("verify", [])
        failed = [r for r in results if not r.get("ok")]
        verified = len(failed) == 0
        self._emit("verify", {"verified": verified, "degradedSteps": len(failed)})
        return {"verified": verified, "degradedSteps": len(failed), "checks": checks}

    def record(self, plan_graph: Dict[str, Any], results: List[Dict[str, Any]], verified: bool) -> None:
        brain_memory.begin()
        try:
            brain_memory.record_run(plan_graph, results, verified)
            brain_memory.commit()
        except Exception:
            brain_memory.rollback()
            self._emit("thinking", {"note": "Memory write rolled back"})

    def report(self, plan_graph: Dict[str, Any], results: List[Dict[str, Any]], verification: Dict[str, Any]) -> Dict[str, Any]:
        parts: List[str] = []
        for r in results:
            status = "✓" if r.get("ok") else "✗"
            out = r.get("output")
            if isinstance(out, dict):
                out = out.get("summary") or out.get("note") or list(out.keys())
            parts.append(f"{status} {r.get('title', r.get('hand'))}: {out if out else '(no output)'}")
        body = "\n".join(parts)
        mode_name = plan_graph.get("modeSpec", {}).get("name", plan_graph.get("mode"))
        if verification["verified"]:
            verification_text = "passed"
        else:
            verification_text = f"degraded ({verification['degradedSteps']} steps)"
        report = (
            f"# {plan_graph['task']}\n\n"
            f"**Class** {plan_graph['class']} · **Mode** {mode_name} · "
            f"**Procedure** {plan_graph.get('procedure', {}).get('name')}\n\n"
            f"**Verification** {verification_text}\n\n"
            f"{body}"
        )
        self._emit("report", {"text": report})
        return {"text": report, "verified": verification["verified"], "steps": len(results)}

    # -- entry points ----------------------------------------------------------

    def execute(self, directive: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Run the full pipeline synchronously and return the result dict."""
        result = None
        for _ in self.execute_stream(directive, context):
            pass
        # execute_stream stores the final dict on the instance.
        try:
            return self._last_execution
        except AttributeError:
            return self._execute_now(directive, context)

    def execute_stream(self, directive: str, context: Optional[Dict[str, Any]] = None) -> Iterator[Dict[str, Any]]:
        """Generator form: yields a lightweight event per step so callers (e.g. the
        SSE bridge) can stream each stage. The final result is stored and yielded
        last, then returned by execute()."""
        t0 = time.time()
        perceived = self.perceive(directive, context)
        cls = self.classify(perceived)
        mode = self.reason(perceived, cls)
        plan_graph = self.plan(perceived, cls, mode)
        yield {"kind": "plan", "data": plan_graph}

        # Stream each hand incrementally so blocked/slow hands don't stall the
        # whole SSE turn with zero frames.
        results: List[Dict[str, Any]] = []
        shared: Dict[str, Any] = {"directive": perceived["directive"], "context": perceived["context"]}
        for step in plan_graph["steps"]:
            self._emit("step", {"hand": step["hand"], "title": step["title"], "status": "running"})
            yield {"kind": "step", "data": {"hand": step["hand"], "title": step["title"], "status": "running"}}
            # Feed the step's declared input from prior outputs where available.
            input_ = dict(shared)
            for r in results:
                if r.get("ok"):
                    input_.setdefault(step["in"], r.get("output"))
            input_["directive"] = perceived["directive"]
            res = run_hand(step["hand"], input_)
            res["hand"] = step["hand"]
            res["title"] = step["title"]
            res["elapsedMs"] = 0
            results.append(res)
            status = "ok" if res.get("ok") else "error"
            self._emit("step", {"hand": step["hand"], "title": step["title"], "status": status})
            yield {"kind": "step", "data": {**res, "hand": step["hand"], "title": step["title"], "status": status}}
            if step.get("requiresApproval"):
                self._emit("approval", {"step": step["title"]})

        verification = self.verify(plan_graph, results)
        self.record(plan_graph, results, verification["verified"])
        report = self.report(plan_graph, results, verification)
        yield {"kind": "report", "data": report}

        final = {
            "directive": perceived["directive"],
            "class": cls["class"],
            "confidence": cls["confidence"],
            "mode": mode["id"],
            "modeSpec": mode["spec"],
            "procedure": plan_graph["procedure"],
            "steps": results,
            "verification": verification,
            "report": report["text"],
            "elapsedMs": int((time.time() - t0) * 1000),
            "offline": True,  # Phase 3 flips this when an llm hand is attached
        }
        self._last_execution = final
        yield {"kind": "done", "data": final}

    def _execute_now(self, directive: str, context: Optional[Dict[str, Any]]) -> Dict[str, Any]:
        # Fallback (never used by execute() which routes through execute_stream).
        return {"directive": directive, "class": "", "mode": "", "procedure": {"id": ""},
                "steps": [], "verification": {"verified": True}, "report": "",
                "elapsedMs": 0, "offline": True}


# Module-level singleton so server.py / orchestrator.py can share one brain.
brain_engine = BrainEngine()


if __name__ == "__main__":
    import json

    samples = [
        "organize my downloads folder by type",
        "debug this python traceback and fix it: ZeroDivisionError on line 12",
        "research who runs the ai_os project and report with sources",
        "write a professional email to the hiring team",
        "what is the system cpu and memory usage",
    ]
    for s in samples:
        print("\n" + "=" * 70)
        r = brain_engine.execute(s)
        print(f"DIRECTIVE: {r['directive']}")
        print(f"class={r['class']} mode={r['mode']} proc={r['procedure']['id']} offline={r['offline']}")
        for st in r["steps"]:
            ok = "✓" if st.get("ok") else "✗"
            print(f"  {ok} [{st['hand']}] {st['title']}")
        print(f"VERIFY: {'passed' if r['verification']['verified'] else 'degraded'} | {r['elapsedMs']}ms")