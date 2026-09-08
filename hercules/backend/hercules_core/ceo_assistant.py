"""
Hercules CEO Assistant — Prompt Refiner & Task Decomposer ("Explains How To Do It")
Breaks down high-level user directives into structured departmental requirements and step-by-step actions.
"""

import re
from typing import Dict, Any, List
from .skills import skills_registry

# Implementation-class verbs route to the Claude Code execution worker (a real
# code-building / refactor / scaffold task), and NOT when a stronger intent from
# another department (image/video/email/pdf/design/research) is present.
_IMPLEMENT_VERBS = [
    "build", "implement", "refactor", "scaffold", "write a script",
    "create a project", "create a folder", "set up", "write tests",
    "deploy", "write code to", "fix this repo", "create a function",
    "add feature", "make a script", "create a real",
]
_OTHER_INTENT = [
    "image", "picture", "photo", "draw", "video", "storyboard",
    "music", "song", "audio", "logo", "badge", "svg", "email", "mail",
    "pdf", "document", "clipboard", "theme", "color", "palette",
    "mermaid", "flowchart", "diagram", "mindmap", "scrape", "meet",
]

class CEOAssistant:
    """Prompt Refiner and Operational Decomposer."""

    def __init__(self):
        self.name = "CEO Assistant"
        self.role = "Refiner & Process Explainer"

    def refine_and_explain(self, user_prompt: str, memory_context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Decomposes the prompt into:
        - Target Department & Lead Agent
        - Operational requirements
        - Step-by-step instructions explaining how to do the task
        - Matching skill if available
        """
        p_lower = user_prompt.lower().strip()
        matched_skill = skills_registry.match_skill(user_prompt)

        # Department & Agent classification rules
        department = "Reasoning"
        agent = "Logic Solver"
        steps = []
        action_type = "analyze"

        if matched_skill:
            department = matched_skill.get("department", "Labour Agents")
            agent = matched_skill.get("agent", "Email Automation")
            steps = [
                f"Matched procedural skill: '{matched_skill['name']}'",
                "Extract parameters and format required template",
                "Execute and validate final payload"
            ]
            action_type = "skill_execution"

        # 0. Claude Code — real implementation worker. When the directive is an
        #    explicit request for Claude, or a code-building task (not a syntax
        #    error to debug nor an optimization pass), dispatch the whole task to
        #    the Claude Code execution agent rather than a sandboxed snippet.
        #    Guarded so generation/research/design/labour intent still wins.
        elif ("claude code" in p_lower or "using claude" in p_lower
              or "delegate to claude" in p_lower) or (
            any(k in p_lower for k in _IMPLEMENT_VERBS)
            and not any(k in p_lower for k in _OTHER_INTENT)
        ):
            department = "Coding"
            agent = "Claude Code"
            action_type = "implement"
            steps = [
                "Dispatch the full directive to the Claude Code execution worker",
                "Let it read, write, and run in the estate to perform the task",
                "Capture the verified result and report completion"
            ]

        # 1. Coding
        elif any(k in p_lower for k in ["code", "python", "script", "function", "debug", "compile", "optimize", "syntax error", "traceback"]):
            department = "Coding"
            if any(k in p_lower for k in ["debug", "error", "traceback", "fix"]):
                agent = "Debugger"
                action_type = "debug"
                steps = [
                    "Inspect syntax and runtime traceback",
                    "Isolate root failure condition",
                    "Synthesize verified patch and return clean code"
                ]
            elif any(k in p_lower for k in ["optimize", "fast", "speed", "memory"]):
                agent = "Optimizer"
                action_type = "optimize"
                steps = [
                    "Profile computational complexity",
                    "Refactor hotspots with vectorization and caching",
                    "Verify functional equivalence"
                ]
            else:
                agent = "Compiler"
                action_type = "compile"
                steps = [
                    "Validate syntax and type signatures",
                    "Execute in sandboxed environment",
                    "Capture execution results"
                ]

        # 2. PC Control / Automation
        elif any(k in p_lower for k in ["organize", "clean temp", "disk", "pc", "window", "snap", "minimize", "maximize", "powershell", "cmd", "run command", "show desktop", "type "]):
            department = "PC Control"
            if any(k in p_lower for k in ["monitor", "cpu", "ram", "battery", "specs", "usage"]):
                agent = "System Monitor"
                action_type = "monitor"
                steps = ["Query native hardware metrics via psutil", "Format diagnostics summary"]
            elif any(k in p_lower for k in ["organize", "downloads", "desktop", "files", "search"]):
                agent = "File Manager"
                action_type = "file_action"
                steps = ["Locate target directories", "Categorize by file extensions", "Safely relocate items"]
            else:
                agent = "Automation Agent"
                action_type = "automation"
                steps = ["Parse OS control parameters", "Dispatch native Windows/Mac API action", "Verify execution state"]

        # 3. Research
        elif any(k in p_lower for k in ["search", "scrape", "find information", "research", "summarize web", "http", "url", "who is", "what is"]):
            department = "Research"
            if "scrape" in p_lower or "http" in p_lower or "url" in p_lower:
                agent = "Scraper"
                action_type = "scrape"
                steps = ["Fetch raw webpage contents", "Extract main article text", "Filter HTML noise"]
            else:
                agent = "Summarizer"
                action_type = "summarize"
                steps = ["Synthesize multi-source insights", "Extract key facts", "Format concise briefing"]

        # 4. Generation
        elif any(k in p_lower for k in ["image", "picture", "photo", "video", "storyboard", "music", "song", "logo", "badge", "svg", "draw"]):
            department = "Generation"
            if any(k in p_lower for k in ["image", "picture", "photo", "draw"]):
                agent = "Image Generator"
                action_type = "image"
                steps = ["Construct 8K photorealistic style prompt", "Apply cinematic composition rules"]
            elif any(k in p_lower for k in ["video", "storyboard", "clip"]):
                agent = "Video Creator"
                action_type = "video"
                steps = ["Construct 4-scene pacing structure", "Assign audio and camera cues"]
            elif any(k in p_lower for k in ["music", "song", "audio", "beat", "melody"]):
                agent = "Music Composer"
                action_type = "music"
                steps = ["Select key scale and chord progression", "Define BPM and synthesizer profile"]
            else:
                agent = "Graphics Designer"
                action_type = "graphics"
                steps = ["Generate SVG vectors and style attributes"]

        # 5. Designer
        elif any(k in p_lower for k in ["ui", "ux", "theme", "color", "palette", "wireframe", "diagram", "mermaid", "flowchart", "mindmap"]):
            department = "Designer"
            if any(k in p_lower for k in ["diagram", "mermaid", "flowchart", "map"]):
                agent = "Visual Mapper"
                action_type = "diagram"
                steps = ["Map nodes and directional edges", "Render Mermaid markdown diagram"]
            elif any(k in p_lower for k in ["theme", "color", "palette", "dark mode"]):
                agent = "Theme Styler"
                action_type = "theme"
                steps = ["Generate harmonious HSL design tokens", "Validate contrast ratios"]
            else:
                agent = "UI/UX Designer"
                action_type = "ui"
                steps = ["Draft responsive wireframe layout", "Specify component hierarchies"]

        # 6. Labour Agents
        elif any(k in p_lower for k in ["email", "mail", "pdf", "clipboard", "snippet"]):
            department = "Labour Agents"
            if "pdf" in p_lower or "document" in p_lower:
                agent = "PDF Summarizer"
                action_type = "pdf"
                steps = ["Ingest file contents", "Extract core propositions", "Produce executive briefing"]
            elif "clipboard" in p_lower or "snippet" in p_lower:
                agent = "Clipboard Manager"
                action_type = "clipboard"
                steps = ["Inspect clipboard history", "Perform snippet retrieval/saving"]
            else:
                agent = "Email Automation"
                action_type = "email"
                steps = ["Parse recipient and objective", "Draft structured email with clear CTA"]

        # If memory recalled a previous execution, incorporate previous steps
        if memory_context and memory_context.get("how_it_was_done"):
            prev_steps = memory_context["how_it_was_done"].get("steps", [])
            if prev_steps:
                steps = [f"Adopt verified prior workflow: {s}" for s in prev_steps]

        explanation = f"To execute '{user_prompt}', we route to the **{department} Department** ({agent}). The process involves: " + "; ".join(steps)

        return {
            "department": department,
            "agent": agent,
            "action_type": action_type,
            "steps": steps,
            "explanation": explanation,
            "matched_skill": matched_skill.get("id") if matched_skill else None
        }

ceo_assistant = CEOAssistant()
