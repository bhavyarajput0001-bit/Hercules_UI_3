"""
Hercules Departments Namespace
"""

from .reasoning import logic_solver, problem_analyzer, strategy_planner
from .coding import compiler_agent, debugger_agent, optimizer_agent
from .research import scraper_agent, refiner_agent, system_checker_agent, summarizer_agent
from .generation import image_generator_agent, video_creator_agent, graphics_designer_agent, music_composer_agent
from .pc_control import system_monitor_agent, pc_automation_agent, file_manager_agent
from .designer import ui_ux_designer_agent, theme_styler_agent, visual_mapper_agent

__all__ = [
    "logic_solver", "problem_analyzer", "strategy_planner",
    "compiler_agent", "debugger_agent", "optimizer_agent",
    "scraper_agent", "refiner_agent", "system_checker_agent", "summarizer_agent",
    "image_generator_agent", "video_creator_agent", "graphics_designer_agent", "music_composer_agent",
    "system_monitor_agent", "pc_automation_agent", "file_manager_agent",
    "ui_ux_designer_agent", "theme_styler_agent", "visual_mapper_agent"
]
