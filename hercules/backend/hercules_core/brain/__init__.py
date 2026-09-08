"""HERCULES BRAIN — self-contained procedural reasoner.

The brain thinks offline: perceive -> classify -> reason -> plan -> delegate ->
verify -> record -> report. No model is required to plan; hands execute.
"""
import os  # noqa: F401
from .engine import BrainEngine, brain_engine
from .memory_rb import BrainMemory, brain_memory
from .cognition import classify, select_mode, mode_spec, load_modes
from .planner import load_procedures, match_procedure
from .hands import register_llm_hand, run_hand

# Optional model router (Phase 3). Only installs when explicitly requested so the
# brain never touches a network unless the operator arms keys as hand tools.
if os.getenv("HERCULES_BRAIN_ROUTER") == "1":
    try:
        from . import hands_router  # noqa: F401
        hands_router.install()
    except Exception:
        pass

__all__ = [
    "BrainEngine", "brain_engine",
    "BrainMemory", "brain_memory",
    "classify", "select_mode", "mode_spec", "load_modes",
    "load_procedures", "match_procedure",
    "register_llm_hand", "run_hand",
]