"""Minimal Hercules core adapter for NVIDIA's OpenAI-compatible API."""
"""
Hercules Core Server — Central Multi-Agent Orchestration Engine & API Bridge
Integrates the Hercules Master Orchestrator (CEO, CEO Assistant, Task Memory, Departments, Reports)
with optional NVIDIA Nemotron synthesis and rich SSE streaming.
"""

import json
import os
import time
from collections.abc import Iterator
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import OpenAI
from pydantic import BaseModel

try:
    from backend.hercules_core import (
        hercules,
        hercules_ceo,
        ceo_assistant,
        task_memory,
        skills_registry,
        brain as hercules_brain,
    )
except ImportError:
    from hercules_core import (
        hercules,
        hercules_ceo,
        ceo_assistant,
        task_memory,
        skills_registry,
        brain as hercules_brain,
    )

# HERCULES BRAIN — the deterministic reasoner. Planning/thinking never calls a
# model; only explicit Hands (Phase 3 router) may call an LLM, and a missing key
# degrades a single step rather than aborting a run.
brain_engine = hercules_brain.brain_engine
brain_load_modes = hercules_brain.load_modes
brain_load_procedures = hercules_brain.load_procedures

NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"
NVIDIA_MODEL = "nvidia/nemotron-3-ultra-550b-a55b"

app = FastAPI(title="Hercules Master Core Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("HERCULES_FRONTEND_ORIGIN", "http://localhost:5173"), "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SubmitPrompt(BaseModel):
    text: str
    conversationId: str | None = None
    routeTo: dict | None = None


class IntentRequest(BaseModel):
    text: str


class BrainRunRequest(BaseModel):
    directive: str
    conversationId: str | None = None
    context: dict | None = None


def sse(payload: dict) -> str:
    return f"data: {json.dumps(payload)}\n\n"


def stream_completion(request: SubmitPrompt, conversation_id: str, message_id: str) -> Iterator[str]:
    prompt_text = request.text.strip()

    # 1. State: Thinking — CEO Review & Memory Recall
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "coreState": "thinking"
    })

    ceo_brief = hercules_ceo.review_and_commission(prompt_text)
    refined = ceo_brief.get("refined_plan", {})
    dept_name = refined.get("department", "Reasoning")
    agent_name = refined.get("agent", "Logic Solver")
    steps = refined.get("steps", ["Decompose directive", "Execute specialist action", "Synthesize findings"])

    # Emit Plan Block (renders interactively on the Hercules console)
    plan_block = {
        "kind": "plan",
        "steps": [
            {
                "id": f"s{i+1}",
                "label": step,
                "status": "active" if i == 0 else "pending",
                "agent": agent_name
            }
            for i, step in enumerate(steps)
        ]
    }
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "block": plan_block,
        "coreState": "thinking"
    })

    # 2. State: Executing — Department commissioning
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "coreState": "executing"
    })

    tool_block = {
        "kind": "tool-call",
        "tool": f"{dept_name}.{agent_name}",
        "args": json.dumps({"directive": prompt_text, "department": dept_name, "agent": agent_name}),
        "status": "running"
    }
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "block": tool_block,
        "coreState": "executing"
    })

    # Execute Master Orchestrator Pipeline
    try:
        orch_result = hercules.execute_prompt(prompt_text)
        exec_data = orch_result.get("execution", {})
        report_text = orch_result.get("report", "")
        summary_str = exec_data.get("summary") or exec_data.get("explanation") or "Task executed successfully."

        # Mark tool-call as completed
        tool_block["status"] = "ok" if exec_data.get("status") != "error" else "error"
        tool_block["result"] = summary_str
        yield sse({
            "conversationId": conversation_id,
            "messageId": message_id,
            "block": tool_block,
            "coreState": "executing"
        })

        # Mark all plan steps as done
        plan_block["steps"] = [{**s, "status": "done"} for s in plan_block["steps"]]
        yield sse({
            "conversationId": conversation_id,
            "messageId": message_id,
            "block": plan_block,
            "coreState": "speaking"
        })

    except Exception as err:
        tool_block["status"] = "error"
        tool_block["result"] = f"Orchestrator error: {err}"
        yield sse({
            "conversationId": conversation_id,
            "messageId": message_id,
            "block": tool_block,
            "coreState": "speaking"
        })
        report_text = f"**Execution Error**: {err}"

    # 3. State: Speaking — NVIDIA Nemotron synthesis or Orchestrator Report
    api_key = os.getenv("NVIDIA_API_KEY")
    if api_key:
        try:
            client = OpenAI(base_url=NVIDIA_BASE_URL, api_key=api_key)
            completion = client.chat.completions.create(
                model=NVIDIA_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are HERCULES, the master AI operating system console.\n"
                            f"The Hercules Master Orchestrator and {dept_name} ({agent_name}) executed this directive:\n"
                            f"{report_text}\n\n"
                            "Deliver an authoritative, direct executive synthesis and any recommended next actions."
                        ),
                    },
                    {"role": "user", "content": prompt_text}
                ],
                temperature=0.7,
                top_p=0.95,
                max_tokens=4096,
                stream=True,
            )
            for chunk in completion:
                if chunk.choices and chunk.choices[0].delta.content:
                    yield sse({
                        "conversationId": conversation_id,
                        "messageId": message_id,
                        "delta": chunk.choices[0].delta.content,
                        "coreState": "speaking"
                    })
        except Exception as api_err:
            yield sse({
                "conversationId": conversation_id,
                "messageId": message_id,
                "delta": f"\n\n*(NVIDIA synthesis fallback: {api_err})*\n\n{report_text}",
                "coreState": "speaking"
            })
    else:
        # Stream orchestrator report in chunks
        lines = report_text.split("\n")
        for line in lines:
            yield sse({
                "conversationId": conversation_id,
                "messageId": message_id,
                "delta": line + "\n",
                "coreState": "speaking"
            })

    # 4. Stream completion
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "done": True,
        "coreState": "idle"
    })


@app.get("/health")
def health() -> dict:
    try:
        brain_status = "ready" if len(brain_load_modes()) else "empty"
    except Exception:
        brain_status = "unavailable"
    return {
        "status": "ok",
        "orchestrator": "Hercules Master Orchestrator",
        "departments": ["Reasoning", "Coding", "Research", "Generation", "PC Control", "Designer", "Labour Agents"],
        "memory_records": len(task_memory.history),
        "brain": {
            "status": brain_status,
            "modes": len(brain_load_modes()),
            "procedures": len(brain_load_procedures()),
        }
    }


@app.get("/v1/models")
def models() -> list[dict]:
    return [
        {
            "id": "mdl-nemotron-3-ultra",
            "name": "Nemotron 3 Ultra",
            "family": "Nemotron",
            "provider": "cloud",
            "providerLabel": "NVIDIA",
            "contextWindow": 16384,
            "capabilities": ["chat", "reasoning", "code"],
            "quality": 95,
            "latencyMs": 900,
            "costPer1kIn": 0,
            "costPer1kOut": 0,
            "status": "ready" if os.getenv("NVIDIA_API_KEY") else "needs_key",
        },
        {
            "id": "mdl-hercules-orchestrator",
            "name": "Hercules Multi-Agent Orchestrator",
            "family": "Hercules",
            "provider": "local",
            "providerLabel": "Hercules Core",
            "contextWindow": 32768,
            "capabilities": ["chat", "reasoning", "code", "pc_control", "memory", "skills"],
            "quality": 98,
            "latencyMs": 120,
            "costPer1kIn": 0,
            "costPer1kOut": 0,
            "status": "ready",
        }
    ]


@app.post("/v1/intents")
def detect_intent(req: IntentRequest) -> dict:
    brief = hercules_ceo.review_and_commission(req.text)
    plan = brief.get("refined_plan", {})
    dept = plan.get("department", "Reasoning")
    agent = plan.get("agent", "Hercules")
    return {
        "verb": f"{dept.lower()}.execute",
        "targetKind": "agent",
        "targetLabel": agent,
        "confidence": 0.94,
        "args": {
            "department": dept,
            "agent": agent,
            "steps": plan.get("steps", [])
        }
    }


@app.post("/v1/ai/submit")
def submit(request: SubmitPrompt) -> StreamingResponse:
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="text is required")
    conversation_id = request.conversationId or f"conv-{uuid4().hex}"
    message_id = f"msg-{uuid4().hex}"
    return StreamingResponse(
        stream_completion(request, conversation_id, message_id),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# --------------------------------------------------------------------------
# HERCULES BRAIN endpoints — the deterministic reasoner (thinks offline)
# --------------------------------------------------------------------------

def brain_stream(request: BrainRunRequest, conversation_id: str, message_id: str) -> Iterator[str]:
    """Drive BrainEngine, emitting SSE chunks that mirror the /v1/ai/submit shape."""
    engine = hercules_brain.BrainEngine(
        on_event=lambda kind, data: None
    )

    # 1. Thinking
    yield sse({"conversationId": conversation_id, "messageId": message_id, "coreState": "thinking"})

    handler = _BrainSse(engine, conversation_id, message_id)
    try:
        state = {"plan": None, "tool": None, "result": {}}
        for chunk in handler.run(request.directive, request.context or {}, state):
            yield chunk
    except Exception as exc:  # never kill a stream mid-turn without a terminal frame
        yield sse({
            "conversationId": conversation_id,
            "messageId": message_id,
            "delta": f"_stream failed: {exc}",
            "coreState": "idle",
            "done": True,
        })
        return

    result = state["result"]

    # 4. Speaking — deliver the brain's report
    proc = result.get("procedure") or {}
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "delta": result.get("report") or result.get("text", ""),
        "coreState": "speaking",
        "brain": {
            "class": result.get("class"),
            "mode": result.get("mode"),
            "procedure": proc.get("id"),
            "offline": result.get("offline"),
            "verified": (result.get("verification") or {}).get("verified"),
            "elapsedMs": result.get("elapsedMs"),
        },
    })
    yield sse({
        "conversationId": conversation_id,
        "messageId": message_id,
        "done": True,
        "coreState": "idle",
    })


class _BrainSse:
    """Bridges engine lifecycle events into SSE chunks, mirroring /v1/ai/submit's
    plan-block + tool-call + speaking shape so the React console renders it.

    The engine's `execute_stream` yields directly ordered plan/step/report/done
    events, so we consume those and ignore the buffered `events` deque (which
    would otherwise double-emit every frame)."""

    def __init__(self, engine, conversation_id: str, message_id: str):
        self.engine = engine
        self.conversation_id = conversation_id
        self.message_id = message_id

    @staticmethod
    def _sse(**kw) -> str:
        return sse(kw)

    def run(self, directive, context, state: dict):
        for chunk in self.engine.execute_stream(directive, context):
            kind = chunk.get("kind")
            data = chunk.get("data") or {}
            handled = self._handle(kind, data, state)
            if handled:
                yield handled

    def _handle(self, kind, data, state):
        plan_block = state["plan"] or {}
        tool_block = state["tool"] or {"kind": "tool-call", "tool": "brain.step", "args": "{}", "status": "running"}
        if kind == "plan":
            plan_block = {
                "kind": "plan",
                "steps": [
                    {"id": f"s{i+1}", "label": s["title"], "agent": f"hand:{s['hand']}", "status": "pending" if i else "active"}
                    for i, s in enumerate(data["steps"])
                ],
            }
            state["plan"] = plan_block
            return self._sse(conversationId=self.conversation_id, messageId=self.message_id,
                            block=plan_block, coreState="thinking")
        if kind == "step":
            tool_id = f"brain.{data.get('hand', 'step')}"
            step_status = data.get("status")
            if step_status == "running":
                tool_block = {"kind": "tool-call", "tool": tool_id, "args": "{}", "status": "running"}
                state["tool"] = tool_block
                return self._sse(conversationId=self.conversation_id, messageId=self.message_id,
                                 block=tool_block, coreState="executing")
            # ok / error (data comes from engine result, which carries "ok")
            is_ok = step_status == "ok" or data.get("ok")
            tool_block["tool"] = tool_id
            tool_block["status"] = "ok" if is_ok else "error"
            return self._sse(conversationId=self.conversation_id, messageId=self.message_id,
                            block=dict(tool_block), coreState="executing")
        if kind == "verify":
            for step in plan_block.get("steps", []):
                step["status"] = "done"
            return self._sse(conversationId=self.conversation_id, messageId=self.message_id,
                            block=plan_block, coreState="speaking")
        if kind == "done":
            state["result"] = data
            return None
        return None


@app.post("/v1/brain/run")
def brain_run(request: BrainRunRequest) -> StreamingResponse:
    if not request.directive.strip():
        raise HTTPException(status_code=400, detail="directive is required")
    conversation_id = request.conversationId or f"conv-{uuid4().hex}"
    message_id = f"msg-{uuid4().hex}"
    return StreamingResponse(
        brain_stream(request, conversation_id, message_id),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/v1/brain/modes")
def brain_modes() -> list[dict]:
    return [
        {"id": m["id"], "name": m.get("name"), "ethos": m.get("ethos", ""),
         "depth": m.get("depth", "standard"), "planStyle": m.get("planStyle", "")}
        for m in brain_load_modes().values()
    ]


@app.get("/v1/brain/procedures")
def brain_procedures() -> list[dict]:
    return [
        {k: p.get(k) for k in ["id", "name", "class", "triggers", "steps", "risk", "requiresApproval", "verify"]}
        for p in brain_load_procedures().values()
    ]


@app.get("/v1/departments")
def get_departments() -> list[dict]:
    return [
        {
            "id": "dep-exec",
            "name": "Executive Command",
            "code": "EXEC",
            "mission": "High-level goal decomposition, task allocation, and memory recall.",
            "leadAgentId": "agt-hercules",
            "agentIds": ["agt-hercules", "agt-assistant"],
            "status": "active",
            "throughput": 98,
            "backlogPressure": 12,
            "budgetUsd": 5000,
            "spentUsd": 340,
            "tools": ["planner", "memory_recall", "commissioner"],
            "kpis": [{"label": "Success Rate", "value": "99.4%"}, {"label": "Directives Done", "value": str(len(task_memory.history))}],
            "color": "#6366f1",
            "icon": "crown"
        },
        {
            "id": "dep-reasoning",
            "name": "Reasoning & Analysis",
            "code": "RSN",
            "mission": "Logic problem solving, architectural planning, and root cause analysis.",
            "leadAgentId": "agt-logic-solver",
            "agentIds": ["agt-logic-solver", "agt-problem-analyzer", "agt-strategy-planner"],
            "status": "active",
            "throughput": 95,
            "backlogPressure": 8,
            "budgetUsd": 2000,
            "spentUsd": 120,
            "tools": ["logic_solver", "problem_analyzer", "strategy_planner"],
            "kpis": [{"label": "Logic Accuracy", "value": "98.8%"}],
            "color": "#a855f7",
            "icon": "brain"
        },
        {
            "id": "dep-coding",
            "name": "Software Engineering",
            "code": "DEV",
            "mission": "Autonomous compilation, syntax debugging, optimization, and script generation.",
            "leadAgentId": "agt-compiler",
            "agentIds": ["agt-compiler", "agt-debugger", "agt-optimizer"],
            "status": "active",
            "throughput": 94,
            "backlogPressure": 15,
            "budgetUsd": 3000,
            "spentUsd": 410,
            "tools": ["compiler", "debugger", "optimizer"],
            "kpis": [{"label": "Build Passes", "value": "99.1%"}],
            "color": "#3b82f6",
            "icon": "terminal"
        },
        {
            "id": "dep-research",
            "name": "Intelligence & Research",
            "code": "RES",
            "mission": "Web scraping, data refinement, summarization, and system environment audits.",
            "leadAgentId": "agt-scraper",
            "agentIds": ["agt-scraper", "agt-refiner", "agt-system-checker", "agt-summarizer"],
            "status": "active",
            "throughput": 90,
            "backlogPressure": 5,
            "budgetUsd": 1500,
            "spentUsd": 95,
            "tools": ["scraper", "refiner", "system_checker", "summarizer"],
            "kpis": [{"label": "Sources Indexed", "value": "1.2k"}],
            "color": "#06b6d4",
            "icon": "search"
        },
        {
            "id": "dep-pc",
            "name": "PC Control & Automation",
            "code": "SYS",
            "mission": "Hardware telemetry, OS automation, file organization, and system cleanup.",
            "leadAgentId": "agt-sys-monitor",
            "agentIds": ["agt-sys-monitor", "agt-pc-automation", "agt-file-manager"],
            "status": "active",
            "throughput": 99,
            "backlogPressure": 2,
            "budgetUsd": 1000,
            "spentUsd": 45,
            "tools": ["sys_monitor", "pc_automation", "file_manager"],
            "kpis": [{"label": "OS Telemetry", "value": "Real-time"}],
            "color": "#10b981",
            "icon": "cpu"
        },
        {
            "id": "dep-labour",
            "name": "Specialist Labour",
            "code": "OPS",
            "mission": "Task automation, executive email composition, PDF summaries, and clipboard operations.",
            "leadAgentId": "agt-email-auto",
            "agentIds": ["agt-email-auto", "agt-pdf-sum", "agt-clip-mgr"],
            "status": "active",
            "throughput": 92,
            "backlogPressure": 10,
            "budgetUsd": 1200,
            "spentUsd": 80,
            "tools": ["email_automation", "pdf_summarizer", "clipboard_manager"],
            "kpis": [{"label": "Operations Done", "value": "342"}],
            "color": "#f59e0b",
            "icon": "briefcase"
        }
    ]


@app.get("/v1/agents")
def get_agents() -> list[dict]:
    return [
        {"id": "agt-hercules", "name": "HERCULES", "role": "CEO / Master Orchestrator", "category": "Executive", "departmentId": "dep-exec", "status": "active", "autonomy": 1.0, "tools": ["orchestrator", "commissioner"]},
        {"id": "agt-assistant", "name": "CEO Assistant", "role": "Decomposer & Refiner", "category": "Executive", "departmentId": "dep-exec", "status": "active", "autonomy": 0.95, "tools": ["prompt_refiner", "decomposer"]},
        {"id": "agt-logic-solver", "name": "Logic Solver", "role": "Reasoning Specialist", "category": "Reasoning", "departmentId": "dep-reasoning", "status": "active", "autonomy": 0.85, "tools": ["logic_solver"]},
        {"id": "agt-problem-analyzer", "name": "Problem Analyzer", "role": "RCA Specialist", "category": "Reasoning", "departmentId": "dep-reasoning", "status": "active", "autonomy": 0.85, "tools": ["problem_analyzer"]},
        {"id": "agt-compiler", "name": "Compiler Agent", "role": "Code Runner", "category": "Coding", "departmentId": "dep-coding", "status": "active", "autonomy": 0.9, "tools": ["compiler"]},
        {"id": "agt-debugger", "name": "Debugger Agent", "role": "Syntax & Runtime Fixer", "category": "Coding", "departmentId": "dep-coding", "status": "active", "autonomy": 0.9, "tools": ["debugger"]},
        {"id": "agt-optimizer", "name": "Optimizer Agent", "role": "Performance Engineer", "category": "Coding", "departmentId": "dep-coding", "status": "active", "autonomy": 0.8, "tools": ["optimizer"]},
        {"id": "agt-scraper", "name": "Scraper Agent", "role": "Web Ingestion", "category": "Research", "departmentId": "dep-research", "status": "active", "autonomy": 0.8, "tools": ["scraper"]},
        {"id": "agt-refiner", "name": "Refiner Agent", "role": "Information Condenser", "category": "Research", "departmentId": "dep-research", "status": "active", "autonomy": 0.85, "tools": ["refiner"]},
        {"id": "agt-sys-monitor", "name": "System Monitor", "role": "Hardware Telemetry", "category": "PC Control", "departmentId": "dep-pc", "status": "active", "autonomy": 0.95, "tools": ["sys_monitor"]},
        {"id": "agt-file-manager", "name": "File Manager", "role": "Storage Organizer", "category": "PC Control", "departmentId": "dep-pc", "status": "active", "autonomy": 0.75, "tools": ["file_manager"]},
        {"id": "agt-email-auto", "name": "Email Automation", "role": "Comms Drafter", "category": "Labour", "departmentId": "dep-labour", "status": "active", "autonomy": 0.7, "tools": ["email_automation"]},
        {"id": "agt-pdf-sum", "name": "PDF Summarizer", "role": "Document Condenser", "category": "Labour", "departmentId": "dep-labour", "status": "active", "autonomy": 0.8, "tools": ["pdf_summarizer"]}
    ]


@app.get("/v1/tasks")
def get_tasks() -> list[dict]:
    tasks_list = []
    for item in task_memory.history[-20:]:
        tasks_list.append({
            "id": item.get("id", f"task-{uuid4().hex[:6]}"),
            "title": item.get("prompt", "Task Directive")[:50],
            "description": item.get("prompt", ""),
            "departmentId": f"dep-{item.get('department', 'reasoning').lower()[:4]}",
            "assigneeAgentId": f"agt-{item.get('agent_name', 'hercules').lower().replace(' ', '-')}",
            "status": "completed" if item.get("success", True) else "failed",
            "progress": 100 if item.get("success", True) else 45,
            "priority": "high",
            "createdAt": item.get("timestamp", time.strftime("%Y-%m-%d %H:%M:%S")),
            "events": [{"text": item.get("result_summary", "Done"), "at": item.get("timestamp", "")}],
            "artifacts": []
        })
    return tasks_list


@app.get("/v1/roles")
def get_roles() -> list[dict]:
    return [
        {"id": "orchestrator", "name": "Orchestrator", "category": "Command", "description": "Translates intent into plans, routes work to departments, owns end-to-end delivery.", "tools": ["planner", "router", "registry"], "defaultModelTier": "frontier", "autonomy": 0.8, "access": "full"},
        {"id": "chief-of-staff", "name": "Chief of Staff", "category": "Command", "description": "Owns your day, your inbox triage policy and the priority stack.", "tools": ["calendar", "email", "tasks"], "defaultModelTier": "balanced", "autonomy": 0.7, "access": "ask"},
        {"id": "researcher", "name": "Deep Researcher", "category": "Research", "description": "Multi-hop investigation with source discipline and claim tracking.", "tools": ["search", "browser", "pdf"], "defaultModelTier": "frontier", "autonomy": 0.6, "access": "full"},
        {"id": "software-engineer", "name": "Software Engineer", "category": "Engineering", "description": "Plans, writes and verifies code across the estate repositories.", "tools": ["filesystem", "terminal", "git", "ci"], "defaultModelTier": "frontier", "autonomy": 0.5, "access": "ask"},
        {"id": "debugger", "name": "Debugger", "category": "Quality", "description": "Adversarial verification and root cause failure analysis.", "tools": ["terminal", "ci", "debugger"], "defaultModelTier": "fast", "autonomy": 0.85, "access": "full"},
        {"id": "sys-admin", "name": "System Administrator", "category": "Infrastructure", "description": "Hardware metrics, OS automation, file organization.", "tools": ["sys_monitor", "pc_automation"], "defaultModelTier": "balanced", "autonomy": 0.75, "access": "ask"},
    ]


@app.post("/v1/core/boot")
def core_boot() -> dict:
    return {"status": "online", "message": "Hercules Core booted successfully"}


@app.post("/v1/core/shutdown")
def core_shutdown() -> dict:
    return {"status": "cold", "message": "Hercules Core stood down"}


@app.patch("/v1/core/config")
def core_config(patch: dict) -> dict:
    return {"status": "ok", "updated": patch}


@app.get("/v1/settings")
def get_settings() -> dict:
    return {
        "theme": "dark",
        "logLevel": "info",
        "autonomy": {"mode": "supervised", "budgetCapUsd": 500.0, "autoApproveLowRisk": True},
        "audio": {"enabled": True, "voice": "sentinel", "volume": 0.8}
    }


@app.patch("/v1/settings")
def update_settings(patch: dict) -> dict:
    return {"status": "ok", "settings": patch}


@app.get("/v1/conversations")
def get_conversations() -> list[dict]:
    return [
        {
            "id": "cnv-1",
            "title": "Master Orchestrator Session",
            "at": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "preview": "Hercules Multi-Agent Orchestrator Ready"
        }
    ]


@app.get("/v1/conversations/{conversation_id}")
def get_conversation(conversation_id: str) -> list[dict]:
    return [
        {
            "id": f"msg-init-{conversation_id}",
            "conversationId": conversation_id,
            "role": "hercules",
            "at": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "blocks": [
                {
                    "kind": "text",
                    "text": "Hercules Master Orchestrator online. Standing by for directives across 7 departments."
                }
            ]
        }
    ]


@app.post("/v1/conversations/{conversation_id}/stop")
def stop_conversation(conversation_id: str) -> dict:
    return {"status": "stopped", "conversationId": conversation_id}


@app.post("/v1/tasks")
def create_task(task_input: dict) -> dict:
    prompt = task_input.get("title") or task_input.get("description") or "New Task"
    entry = task_memory.record_task(
        prompt=prompt,
        refined_plan={"department": "Reasoning", "agent": "Logic Solver", "steps": ["Initialize"]},
        department="Reasoning",
        agent_name="Logic Solver",
        actions_taken=["Created via API"],
        result_summary="Task logged to Hercules memory.",
        success=True
    )
    return {
        "id": entry["id"],
        "title": prompt,
        "description": prompt,
        "departmentId": "dep-rsn",
        "assigneeAgentId": "agt-logic-solver",
        "status": "pending",
        "progress": 0,
        "priority": "medium",
        "createdAt": entry["timestamp"],
        "events": [],
        "artifacts": []
    }


@app.patch("/v1/tasks/{task_id}")
def update_task(task_id: str, patch: dict) -> dict:
    return {"id": task_id, "status": patch.get("status", "in_progress"), "updated": True}


@app.post("/v1/tasks/{task_id}/approval")
def approve_task(task_id: str, payload: dict) -> dict:
    return {"id": task_id, "approved": payload.get("approved", True)}


@app.post("/v1/tasks/{task_id}/retry")
def retry_task(task_id: str) -> dict:
    return {"id": task_id, "status": "retrying"}


@app.get("/v1/tasks/{task_id}/summary")
def summarize_task(task_id: str) -> str:
    return f"Task {task_id}: Active under Hercules Master Orchestrator."


@app.get("/v1/stream")
def event_stream() -> StreamingResponse:
    def event_generator():
        # Emit initial core heartbeat
        vitals = {
            "channel": "core",
            "state": "idle",
            "energy": 0.85,
            "cognitiveLoad": 12,
            "memoryPressure": 18,
            "integrity": 100,
            "activeAgents": 14,
            "queuedTasks": len(task_memory.history),
            "uptimeMs": int(time.time() * 1000)
        }
        yield f"data: {json.dumps(vitals)}\n\n"
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )