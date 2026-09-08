"""
Hercules Main Orchestrator — Central Multi-Agent Orchestration & Task Execution Engine
"""

from typing import Dict, Any, List
from .ceo import hercules_ceo
from .ceo_assistant import ceo_assistant
from .memory import task_memory
from .report import report_generator
from .output import voice_output, chat_output

# Departments
from .departments.reasoning import logic_solver, problem_analyzer, strategy_planner
from .departments.coding import compiler_agent, debugger_agent, optimizer_agent, claude_code_agent
from .departments.research import scraper_agent, refiner_agent, system_checker_agent, summarizer_agent
from .departments.generation import image_generator_agent, video_creator_agent, graphics_designer_agent, music_composer_agent
from .departments.pc_control import system_monitor_agent, pc_automation_agent, file_manager_agent
from .departments.designer import ui_ux_designer_agent, theme_styler_agent, visual_mapper_agent

# Labour Agents
from .labour import email_automation_agent, pdf_summarizer_agent, clipboard_manager_agent

class HerculesOrchestrator:
    """Master controller executing the complete Hercules tree workflow."""

    def __init__(self):
        self.name = "Hercules Master Orchestrator"

    def execute_prompt(self, user_prompt: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Full pipeline:
        1. CEO Reviews & Checks Task Memory
        2. CEO Assistant Refines Prompt & Explains Process
        3. Commissioned Department / Labour Agent Executes
        4. Memory Records Execution & How It Was Done
        5. Concise Report Synthesizes Findings
        6. Voice & Chat Output Channels Formulated
        """
        # Step 1 & 2: CEO & Assistant
        ceo_brief = hercules_ceo.review_and_commission(user_prompt)
        refined = ceo_brief["refined_plan"]
        memory_match = ceo_brief.get("memory_context")

        dept = refined["department"]
        agent = refined["agent"]
        action_type = refined.get("action_type")

        # Step 3: Department Execution
        exec_result: Dict[str, Any] = {}

        try:
            # 1. Reasoning Department
            if dept == "Reasoning":
                if agent == "Logic Solver":
                    exec_result = logic_solver.solve(user_prompt, context)
                elif agent == "Problem Analyzer":
                    exec_result = problem_analyzer.analyze(user_prompt, context)
                else:
                    exec_result = strategy_planner.plan(user_prompt)

            # 2. Coding Department
            elif dept == "Coding":
                if agent == "Claude Code":
                    # Real end-to-end implementation via the Claude Code worker.
                    cwd = context.get("cwd") if context else None
                    exec_result = claude_code_agent.run_task(user_prompt, cwd=cwd)
                elif agent == "Debugger":
                    exec_result = debugger_agent.debug(user_prompt, context.get("error", "Error in script") if context else "Syntax/runtime issue")
                elif agent == "Optimizer":
                    exec_result = optimizer_agent.optimize(user_prompt)
                else:
                    # Default python execution check
                    code_sample = context.get("code", "print('Hercules Code Execution Check: OK')") if context else "print('Hercules Code Execution Check: OK')"
                    exec_result = compiler_agent.run_code(code_sample)

            # 3. Research Department
            elif dept == "Research":
                if agent == "Scraper":
                    url = context.get("url", "https://news.ycombinator.com") if context else "https://news.ycombinator.com"
                    exec_result = scraper_agent.scrape_url(url)
                elif agent == "Refiner":
                    exec_result = refiner_agent.refine(user_prompt)
                elif agent == "System Checker":
                    exec_result = system_checker_agent.check()
                else:
                    exec_result = summarizer_agent.summarize(user_prompt)

            # 4. Generation Department
            elif dept == "Generation":
                if agent == "Image Generator":
                    exec_result = image_generator_agent.generate(user_prompt)
                elif agent == "Video Creator":
                    exec_result = video_creator_agent.create_storyboard(user_prompt)
                elif agent == "Music Composer":
                    exec_result = music_composer_agent.compose()
                else:
                    exec_result = graphics_designer_agent.design_badge(user_prompt[:20])

            # 5. PC Control Department
            elif dept == "PC Control":
                if agent == "System Monitor":
                    exec_result = system_monitor_agent.get_system_metrics()
                elif agent == "File Manager":
                    if "downloads" in user_prompt.lower():
                        exec_result = file_manager_agent.organize_downloads()
                    elif "desktop" in user_prompt.lower():
                        exec_result = file_manager_agent.organize_desktop()
                    else:
                        exec_result = file_manager_agent.search_files(user_prompt)
                else:
                    # Automation agent
                    if "clean" in user_prompt.lower():
                        exec_result = pc_automation_agent.execute_action("clean_temp")
                    elif "desktop" in user_prompt.lower():
                        exec_result = pc_automation_agent.execute_action("show_desktop")
                    elif "snap left" in user_prompt.lower():
                        exec_result = pc_automation_agent.execute_action("snap_left")
                    elif "snap right" in user_prompt.lower():
                        exec_result = pc_automation_agent.execute_action("snap_right")
                    else:
                        exec_result = pc_automation_agent.execute_action("minimize_window")

            # 6. Designer Department
            elif dept == "Designer":
                if agent == "Visual Mapper":
                    steps = refined.get("steps", ["Decompose", "Analyze", "Execute", "Verify"])
                    mermaid = visual_mapper_agent.create_mermaid_diagram(user_prompt[:30], steps)
                    exec_result = {"status": "success", "mermaid": mermaid, "summary": f"Generated visual workflow chart."}
                elif agent == "Theme Styler":
                    exec_result = theme_styler_agent.generate_theme()
                else:
                    exec_result = ui_ux_designer_agent.design_component(user_prompt[:30])

            # 7. Labour Agents
            elif dept == "Labour Agents":
                if agent == "Email Automation":
                    exec_result = email_automation_agent.compose_email(
                        recipient="Recipient",
                        subject=f"Regarding {user_prompt[:40]}",
                        purpose=user_prompt
                    )
                elif agent == "PDF Summarizer":
                    sample_file = context.get("file_path", "README.md") if context else "README.md"
                    exec_result = pdf_summarizer_agent.summarize_file(sample_file)
                else:
                    exec_result = {"agent": "Clipboard Manager", "history": clipboard_manager_agent.get_history(3)}

            else:
                exec_result = {"status": "completed", "summary": f"Processed directive for {dept}."}

        except Exception as e:
            exec_result = {"status": "error", "error": str(e), "summary": f"Execution error in {agent}: {e}"}

        # Step 4: Record in Memory
        actions_taken = refined.get("steps", [])
        summary_str = exec_result.get("summary") or exec_result.get("explanation") or str(exec_result)[:200]
        task_memory.record_task(
            prompt=user_prompt,
            refined_plan=refined,
            department=dept,
            agent_name=agent,
            actions_taken=actions_taken,
            result_summary=summary_str,
            success=exec_result.get("status") != "error"
        )

        # Step 5: Generate Concise Executive Report
        report_md = report_generator.generate_report(
            prompt=user_prompt,
            refined_plan=refined,
            department=dept,
            agent_name=agent,
            execution_result=exec_result,
            memory_match=memory_match
        )

        # Step 6: Dual Outputs
        voice_str = voice_output.format_speech(summary_str)
        chat_str = chat_output.format_chat(report_md, exec_result)

        return {
            "prompt": user_prompt,
            "ceo_brief": ceo_brief,
            "department": dept,
            "agent": agent,
            "execution": exec_result,
            "report": report_md,
            "output": {
                "voice": voice_str,
                "chat": chat_str
            },
            "memory_recalled": bool(memory_match)
        }

hercules = HerculesOrchestrator()
