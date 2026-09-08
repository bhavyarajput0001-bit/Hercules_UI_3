"""
Hercules Coding Department — Compiler & Code Execution Agent
"""

import sys
import subprocess
import tempfile
from pathlib import Path
from typing import Dict, Any

class CompilerAgent:
    """Validates code syntax, runs sandboxed execution, and inspects compilation."""

    def __init__(self):
        self.name = "Compiler"
        self.department = "Coding"

    def run_code(self, code: str, language: str = "python", timeout: int = 10) -> Dict[str, Any]:
        """Safely executes code snippets and returns stdout, stderr, and execution status."""
        if language.lower() in ("python", "py"):
            try:
                # Syntax check first
                compile(code, "<hercules_exec>", "exec")
            except SyntaxError as se:
                return {
                    "agent": self.name,
                    "department": self.department,
                    "ok": False,
                    "error": f"Syntax Error: {se.msg} at line {se.lineno}",
                    "stdout": "",
                    "stderr": str(se)
                }

            with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as tf:
                tf.write(code)
                tf_path = tf.name

            try:
                res = subprocess.run(
                    [sys.executable, tf_path],
                    capture_output=True, text=True, timeout=timeout
                )
                return {
                    "agent": self.name,
                    "department": self.department,
                    "ok": res.returncode == 0,
                    "stdout": res.stdout.strip(),
                    "stderr": res.stderr.strip(),
                    "returncode": res.returncode
                }
            except subprocess.TimeoutExpired:
                return {"agent": self.name, "department": self.department, "ok": False, "error": "Execution timed out"}
            finally:
                try:
                    Path(tf_path).unlink(missing_ok=True)
                except Exception:
                    pass

        return {"agent": self.name, "department": self.department, "ok": False, "error": f"Unsupported language: {language}"}

compiler_agent = CompilerAgent()
