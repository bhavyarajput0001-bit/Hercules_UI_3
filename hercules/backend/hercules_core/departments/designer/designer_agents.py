"""
Hercules Designer Department — UI/UX Designer, Theme Styler & Visual Mapper
"""

from typing import Dict, Any, List

class UIUXDesignerAgent:
    """Creates user-friendly interface wireframes, component layouts, and UX blueprints."""

    def __init__(self):
        self.name = "UI/UX Designer"
        self.department = "Designer"

    def design_component(self, component_name: str, layout_type: str = "card") -> Dict[str, Any]:
        return {
            "agent": self.name,
            "department": self.department,
            "component": component_name,
            "layout_type": layout_type,
            "structure": {
                "header": f"<h3>{component_name}</h3>",
                "body": "<div class='content-grid'>...</div>",
                "footer": "<div class='actions-row'>...</div>"
            },
            "ux_principles": ["High contrast", "Clear affordance", "Subtle micro-interactions", "Responsive flex/grid"]
        }

class ThemeStylerAgent:
    """Formulates design tokens, HSL color palettes, typography, and dark mode systems."""

    def __init__(self):
        self.name = "Theme Styler"
        self.department = "Designer"

    def generate_theme(self, theme_name: str = "cyber_hud") -> Dict[str, Any]:
        themes = {
            "cyber_hud": {
                "bg_base": "#0a0f1d",
                "bg_card": "rgba(15, 23, 42, 0.8)",
                "accent": "#45d9ff",
                "accent_glow": "rgba(69, 217, 255, 0.3)",
                "success": "#69ffa8",
                "warning": "#ffc857",
                "danger": "#ff5c77",
                "font_family": "'Inter', 'SF Pro Display', system-ui, sans-serif"
            },
            "minimal_monochrome": {
                "bg_base": "#121212",
                "bg_card": "#1e1e1e",
                "accent": "#ffffff",
                "accent_glow": "rgba(255, 255, 255, 0.15)",
                "success": "#4caf50",
                "warning": "#ff9800",
                "danger": "#f44336",
                "font_family": "'Inter', system-ui, sans-serif"
            }
        }
        return {
            "agent": self.name,
            "department": self.department,
            "theme": theme_name,
            "tokens": themes.get(theme_name, themes["cyber_hud"])
        }

class VisualMapperAgent:
    """Generates Mermaid diagrams, state charts, entity-relationship diagrams, and mindmaps."""

    def __init__(self):
        self.name = "Visual Mapper"
        self.department = "Designer"

    def create_mermaid_diagram(self, title: str, steps: List[str]) -> str:
        lines = ["```mermaid", "graph TD", f"  Start([\"{title}\"])"]
        for i, step in enumerate(steps, 1):
            lines.append(f"  Step{i}[\"{step}\"]")
            if i == 1:
                lines.append(f"  Start --> Step1")
            else:
                lines.append(f"  Step{i-1} --> Step{i}")
        lines.append(f"  Step{len(steps)} --> End([\"Done\"])")
        lines.append("```")
        return "\n".join(lines)

ui_ux_designer_agent = UIUXDesignerAgent()
theme_styler_agent = ThemeStylerAgent()
visual_mapper_agent = VisualMapperAgent()
