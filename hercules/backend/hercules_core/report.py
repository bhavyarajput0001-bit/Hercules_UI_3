"""
Hercules Concise Report Generator
Synthesizes inputs, departmental executions, memory recall, and outputs into executive reports.
"""

import time
from typing import Dict, Any, List

class ReportGenerator:
    """Produces structured, concise executive summaries and technical briefings."""

    def __init__(self):
        self.name = "Concise Report"

    def generate_report(self, prompt: str, refined_plan: Dict[str, Any], department: str,
                        agent_name: str, execution_result: Dict[str, Any],
                        memory_match: Dict[str, Any] = None) -> str:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

        recall_line = "None (First-time execution)"
        if memory_match:
            prev_time = memory_match.get("timestamp", "earlier")
            sim = memory_match.get("similarity_score", 1.0)
            recall_line = f"✓ Prior task identified ({int(sim*100)}% match from {prev_time})"

        steps_formatted = ""
        steps = refined_plan.get("steps", [])
        if steps:
            steps_formatted = "\n".join(f"  {i}. {s}" for i, s in enumerate(steps, 1))

        output_summary = execution_result.get("summary") or execution_result.get("result") or "Executed successfully."

        report = f"""### 🏛️ HERCULES EXECUTIVE REPORT
**Task**: *{prompt}*
**Timestamp**: `{timestamp}` | **Memory Recall**: {recall_line}

---

#### 📋 Execution Breakdown
- **Department**: `{department}`
- **Lead Agent**: `{agent_name}`
- **Execution Strategy**:
{steps_formatted or "  1. Decomposed goal and dispatched to specialized agent."}

#### ⚡ Result & Outcome
{output_summary}
"""
        return report.strip()

report_generator = ReportGenerator()
