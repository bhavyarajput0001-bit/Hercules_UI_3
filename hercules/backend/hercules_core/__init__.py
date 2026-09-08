"""
Hercules Multi-Agent Orchestration Architecture
"""

from .orchestrator import hercules, HerculesOrchestrator
from .ceo import hercules_ceo, HerculesCEO
from .ceo_assistant import ceo_assistant, CEOAssistant
from .memory import task_memory, TaskMemory
from .skills import skills_registry, SkillsRegistry
from .report import report_generator, ReportGenerator
from .output import voice_output, VoiceOutput, chat_output, ChatOutput

__all__ = [
    "hercules", "HerculesOrchestrator",
    "hercules_ceo", "HerculesCEO",
    "ceo_assistant", "CEOAssistant",
    "task_memory", "TaskMemory",
    "skills_registry", "SkillsRegistry",
    "report_generator", "ReportGenerator",
    "voice_output", "VoiceOutput",
    "chat_output", "ChatOutput"
]
