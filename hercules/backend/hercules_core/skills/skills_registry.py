"""
Hercules Skills Registry — Extensible Bank of Procedural Skills & Workflows
"""

import os
import json
from pathlib import Path
from typing import Dict, Any, List, Optional

SKILLS_DIR = Path(__file__).parent

class SkillsRegistry:
    """Loads, discovers, and matches procedural skills from JSON/code definitions."""

    def __init__(self):
        self.skills: Dict[str, Dict[str, Any]] = {}
        self.load_all_skills()

    def load_all_skills(self):
        """Scan skills folder and load all *.json skill templates."""
        self.skills.clear()
        for f in SKILLS_DIR.glob("*.json"):
            try:
                with open(f, "r", encoding="utf-8") as fp:
                    data = json.load(fp)
                    skill_id = data.get("id", f.stem)
                    self.skills[skill_id] = data
            except Exception:
                pass

    def match_skill(self, prompt: str) -> Optional[Dict[str, Any]]:
        """Find the best matching skill for a user prompt."""
        p_lower = prompt.lower()
        best_skill = None
        best_score = 0

        for s_id, s_data in self.skills.items():
            triggers = s_data.get("triggers", [])
            score = 0
            for t in triggers:
                if t.lower() in p_lower:
                    score += 2
            keywords = s_data.get("keywords", [])
            for k in keywords:
                if k.lower() in p_lower:
                    score += 1

            if score > best_score and score >= 2:
                best_score = score
                best_skill = s_data

        return best_skill

    def get_skill(self, skill_id: str) -> Optional[Dict[str, Any]]:
        return self.skills.get(skill_id)

    def list_skills(self) -> List[Dict[str, Any]]:
        return list(self.skills.values())

    def register_skill(self, skill_data: Dict[str, Any]) -> bool:
        """Dynamically add or save a new skill."""
        s_id = skill_data.get("id")
        if not s_id:
            return False
        self.skills[s_id] = skill_data
        try:
            file_path = SKILLS_DIR / f"{s_id}.json"
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(skill_data, f, indent=2)
            return True
        except Exception:
            return False

skills_registry = SkillsRegistry()
