"""
Hercules CEO — Strategic Executive & High-Level Goal Overseer
Evaluates incoming directives, queries memory for prior task knowledge, consults CEO Assistant,
and commissions the appropriate department to execute.
"""

from typing import Dict, Any
from .memory import task_memory
from .ceo_assistant import ceo_assistant

class HerculesCEO:
    """Executive Commander of the Hercules Multi-Agent Hierarchy."""

    def __init__(self):
        self.title = "CEO"
        self.organization = "Hercules"

    def review_and_commission(self, user_prompt: str) -> Dict[str, Any]:
        """
        1. Query task memory for previous execution history.
        2. Direct CEO Assistant to refine the prompt and outline how to do it.
        3. Formulate the executive commission for departmental execution.
        """
        # Step 1: Memory recall check
        memory_match = task_memory.recall_task(user_prompt)

        # Step 2: Assistant prompt refinement and step-by-step explainer
        refined_plan = ceo_assistant.refine_and_explain(user_prompt, memory_context=memory_match)

        return {
            "ceo": self.title,
            "organization": self.organization,
            "goal": user_prompt,
            "memory_recalled": bool(memory_match),
            "memory_context": memory_match,
            "refined_plan": refined_plan,
            "commission": {
                "target_department": refined_plan["department"],
                "lead_agent": refined_plan["agent"],
                "instructions": refined_plan["steps"]
            }
        }

hercules_ceo = HerculesCEO()
