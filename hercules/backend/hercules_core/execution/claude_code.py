"""
Hercules Core — Claude Code Execution Worker
============================================
Runs the Claude Code CLI headless (`claude -p`) as a real execution tool inside
Hercules. This is a WORKER, not the brain: the CEO / CEO Assistant / planner
decide WHAT to do; this executor performs the directive on the machine and
returns a structured result.

Two modes:
  * run()    — one-shot JSON result (for JSON callers / automation).
  * stream() — yields parsed stream-json events (assistant text, tool calls,
               final result) so the server can stream live progress as SSE.

Autonomy (configurable, defaults to full-auto for unattended background work):
  * HERCULES_CLAUDE_MODE=auto (default) -> --dangerously-skip-permissions
  * HERCULES_CLAUDE_MODE=safe          -> read-only --allowedTools only
  * a per-call `autonomy` argument overrides the env var.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
from pathlib import Path
from typing import Any, Dict, Iterator, List, Optional

# Default target directory Claude Code works in when no cwd is supplied.
DEFAULT_WORKSPACE = Path.home() / "Hercules" / "workspace"

# Backstop so a runaway directive can never loop forever or hang the stream.
MAX_TURNS = int(os.getenv("HERCULES_CLAUDE_MAX_TURNS", "20"))
TIMEOUT_S = float(os.getenv("HERCULES_CLAUDE_TIMEOUT", "600"))

# Read-only tool allowlist used in "safe" autonomy mode. Anything riskier than
# these (writes, shell, network) will error out of the turn instead of running.
SAFE_ALLOWED_TOOLS = "Read,Glob,Grep,LS"

MODE_ENV = os.getenv("HERCULES_CLAUDE_MODE", "auto")  # auto | safe


def _which_claude() -> Optional[str]:
    """Resolve the claude binary. Prefer an explicit override, then PATH."""
    override = os.getenv("HERCULES_CLAUDE_BIN")
    if override and os.path.exists(override):
        return override
    return shutil.which("claude")


class ClaudeCodeExecutor:
    """Spawns the Claude Code CLI headless to perform a directive."""

    def __init__(self, binary: Optional[str] = None):
        self.binary = binary or _which_claude()
        self.available = self.binary is not None

    # -- public ----------------------------------------------------------

    def run(
        self,
        directive: str,
        cwd: Optional[str] = None,
        autonomy: Optional[str] = None,
        max_turns: int = MAX_TURNS,
        timeout: float = TIMEOUT_S,
    ) -> Dict[str, Any]:
        """Execute `directive` headless and return a structured result.

        Returns {"ok": bool, "output": str, "isError": bool, ...meta}.
        Never raises: failures are returned as {"ok": False, "error": ...}.
        """
        if not self.available:
            return {"ok": False, "output": "", "isError": True,
                    "error": "claude CLI not found on PATH (set HERCULES_CLAUDE_BIN)"}

        workdir = self._ensure_cwd(cwd)
        cmd = self._build_command(directive, fmt="json", autonomy=autonomy, max_turns=max_turns)
        started = time.monotonic()
        try:
            res = subprocess.run(
                cmd,
                cwd=str(workdir),
                capture_output=True,
                text=True,
                timeout=timeout,
                env=self._env(),
            )
        except subprocess.TimeoutExpired:
            return {"ok": False, "output": "", "isError": True,
                    "error": f"claude timed out after {timeout:.0f}s", "cwd": str(workdir)}
        except Exception as exc:  # noqa: BLE001 — worker must never crash the estate
            return {"ok": False, "output": "", "isError": True,
                    "error": f"claude spawn failed: {exc}", "cwd": str(workdir)}

        elapsed_ms = int((time.monotonic() - started) * 1000)
        payload = self._parse_json_result(res.stdout)
        if payload is None:
            return {
                "ok": res.returncode == 0,
                "output": (res.stdout or res.stderr or "").strip(),
                "isError": res.returncode != 0,
                "returncode": res.returncode,
                "durationMs": elapsed_ms,
                "cwd": str(workdir),
                "raw": (res.stdout or "")[-2000:],
            }
        payload.update({"ok": not payload.get("isError", False),
                        "returncode": res.returncode,
                        "durationMs": elapsed_ms,
                        "cwd": str(workdir)})
        return payload

    def stream(
        self,
        directive: str,
        cwd: Optional[str] = None,
        autonomy: Optional[str] = None,
        max_turns: int = MAX_TURNS,
        timeout: float = TIMEOUT_S,
    ) -> Iterator[Dict[str, Any]]:
        """Run headless in stream-json mode, yielding parsed events:

            {"kind": "text", "text": "..."}          assistant text (may be partial)
            {"kind": "tool", "name": "Bash"}         a tool call started
            {"kind": "result", **meta}               final result marker

        Also yields {"kind": "error", "error": ...} if anything goes wrong.
        """
        if not self.available:
            yield {"kind": "error", "error": "claude CLI not found on PATH (set HERCULES_CLAUDE_BIN)"}
            return

        workdir = self._ensure_cwd(cwd)
        cmd = self._build_command(directive, fmt="stream-json", autonomy=autonomy, max_turns=max_turns)
        started = time.monotonic()
        try:
            proc = subprocess.Popen(
                cmd,
                cwd=str(workdir),
                stdin=subprocess.DEVNULL,  # child must not hold our stdin open or it never EOFs
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env=self._env(),
            )
        except Exception as exc:  # noqa: BLE001
            yield {"kind": "error", "error": f"claude spawn failed: {exc}"}
            return

        leftover: List[str] = []
        try:
            assert proc.stdout is not None
            for line in proc.stdout:
                if time.monotonic() - started > timeout:
                    proc.kill()
                    yield {"kind": "error", "error": f"claude timed out after {timeout:.0f}s"}
                    return
                line = line.strip()
                if not line:
                    continue
                event = self._parse_stream_line(line)
                if event is not None:
                    yield event
                else:
                    leftover.append(line)
        finally:
            # Reap the child. Never let a stuck wait turn into an unhandled
            # 500 on the SSE stream — kill and drain instead.
            try:
                proc.wait(timeout=10)
            except Exception:  # noqa: BLE001 — subprocess.TimeoutExpired etc.
                try:
                    proc.kill()
                except Exception:  # noqa: BLE001
                    pass
                proc.wait(timeout=5)

        # Process finished without a `result` frame — surface raw tail if any.
        if leftover:
            tail = "\n".join(leftover)[-2000:]
            yield {"kind": "text", "text": tail + ("\n" if not tail.endswith("\n") else "")}
        stderr = ""
        try:
            if proc.stderr:
                stderr = proc.stderr.read().strip()
        except Exception:  # noqa: BLE001
            stderr = ""
        if stderr:
            yield {"kind": "error", "error": stderr[-1000:]}

    # -- internals -------------------------------------------------------

    def _env(self) -> Dict[str, str]:
        env = os.environ.copy()
        env.setdefault("CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "1")
        return env

    def _ensure_cwd(self, cwd: Optional[str]) -> Path:
        target = Path(cwd).expanduser() if cwd else DEFAULT_WORKSPACE
        target.mkdir(parents=True, exist_ok=True)
        return target

    def _resolve_autonomy(self, autonomy: Optional[str]) -> str:
        mode = (autonomy or MODE_ENV or "auto").strip().lower()
        return "safe" if mode in ("safe", "gated") else "auto"

    def _build_command(
        self,
        directive: str,
        fmt: str,
        autonomy: Optional[str],
        max_turns: int,
    ) -> List[str]:
        cmd = [
            self.binary,
            "-p", directive,
            "--output-format", fmt,
            "--max-turns", str(max_turns),
        ]
        if self._resolve_autonomy(autonomy) == "safe":
            cmd += ["--allowedTools", SAFE_ALLOWED_TOOLS]
        else:
            cmd += ["--dangerously-skip-permissions"]
        return cmd

    @staticmethod
    def _parse_json_result(stdout: str) -> Optional[Dict[str, Any]]:
        """Parse the single JSON object `claude --output-format json` prints."""
        if not stdout:
            return None
        try:
            data = json.loads(stdout)
        except json.JSONDecodeError:
            return None
        if not isinstance(data, dict):
            return None
        return {
            "output": data.get("result", ""),
            "isError": bool(data.get("is_error", False)),
            "numTurns": data.get("num_turns", 0),
            "totalCostUsd": data.get("total_cost_usd", 0.0),
        }

    @staticmethod
    def _parse_stream_line(line: str) -> Optional[Dict[str, Any]]:
        """Map one stream-json line to an event dict (None => not parseable)."""
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            return None
        if not isinstance(event, dict):
            return None

        etype = event.get("type")
        if etype == "assistant":
            msg = event.get("message") or {}
            for block in msg.get("content") or []:
                if not isinstance(block, dict):
                    continue
                if block.get("type") == "text" and block.get("text"):
                    return {"kind": "text", "text": block["text"]}
                if block.get("type") == "tool_use":
                    return {"kind": "tool", "name": block.get("name", "tool")}
        elif etype == "result":
            return {
                "kind": "result",
                "result": event.get("result", ""),
                "isError": bool(event.get("is_error", False)),
                "numTurns": event.get("num_turns", 0),
                "durationMs": event.get("duration_ms", 0),
                "totalCostUsd": event.get("total_cost_usd", 0.0),
            }
        return None


claude_code_executor = ClaudeCodeExecutor()


if __name__ == "__main__":
    print(f"claude binary: {claude_code_executor.binary}")
    r = claude_code_executor.run("Create a file called hello.txt containing the text 'Hello Hercules'")
    print(json.dumps(r, indent=2))
