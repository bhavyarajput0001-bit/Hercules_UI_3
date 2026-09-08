"""
Hercules Coding Department — Claude Code Execution Agent
========================================================
A real implementation agent. Unlike the rule-based Compiler/Debugger/Optimizer
(which run sandboxed snippets or return canned responses), this agent dispatches
the full directive to a headless Claude Code worker that performs it end-to-end
on the machine — writing files, running commands, iterating — and reports back.

It is one tool among the Coding department's tools; it does NOT replace the
orchestrator's planning. The orchestrator routes to this agent only when the
directive is a real implementation task.
"""

from __future__ import annotations

import time
from typing import Any, Dict, Optional

from ..execution.claude_code import claude_code_executor

class ClaudeCodeAgent:
    """Coding-department agent backed by the Claude Code execution worker."""

    def __init__(self):
        self.name = "Claude Code"
        self.department = "Coding"

    def run_task(
        self,
        directive: str,
        cwd: Optional[str] = None,
        autonomy: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Execute `directive` via Claude Code and return an agent-shaped result
        compatible with the orchestrator's exec_result contract:

            {status: "success"|"error", summary, output, agent, department, ...}

        Never raises — transport failures degrade to an error result.
        """
        started = time.monotonic()
        res = claude_code_executor.run(directive, cwd=cwd, autonomy=autonomy)
        elapsed_ms = int((time.monotonic() - started) * 1000)

        ok = bool(res.get("ok"))
        output = str(res.get("output", "")).strip()
        error = str(res.get("error", "")).strip() if res.get("error") else ""
        summary = output or error or "Claude Code executed the directive (no text output)."

        return {
            "agent": self.name,
            "department": self.department,
            "status": "success" if ok else "error",
            "ok": ok,
            "summary": summary[:2000],
            "output": output[:4000],
            "error": error,
            "num_turns": res.get("numTurns", 0),
            "duration_ms": res.get("durationMs", elapsed_ms),
            "cwd": res.get("cwd", ""),
            "total_cost_usd": res.get("totalCostUsd", 0.0),
            "tool": "claude_code",
        }


claude_code_agent = ClaudeCodeAgent()