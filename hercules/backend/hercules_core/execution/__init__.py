"""
Hercules Core — Execution Tools
Real executors the departments can dispatch work to. Unlike the rule-based
department agents, these hands actually run the machine.

The first (and primary) executor is Claude Code: a headless `claude -p` worker
that performs a directive end-to-end and reports back a structured result. It is
a worker, not the brain — the CEO/classifier/planner still decide WHAT to do;
this package decides HOW the work physically happens.
"""

from .claude_code import ClaudeCodeExecutor, claude_code_executor

__all__ = ["ClaudeCodeExecutor", "claude_code_executor"]
