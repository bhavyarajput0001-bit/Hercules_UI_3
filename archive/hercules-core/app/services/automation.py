"""Automation Service - manages automations and workflows"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    Automation, AutomationTriggerKind, RiskLevel, AutomationRun, WorkflowGraph,
    AutomationCreateInput
)

class AutomationService:
    def __init__(self):
        self._automations = {}
        self._runs = {}
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        autos = [
            Automation(id="auto-1", name="Daily Standup", description="Run daily standup at 9 AM", trigger={"kind": "schedule", "expr": "0 9 * * *"}, agentId="agent-4", risk=RiskLevel.LOW, enabled=True, requiresApproval=False, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), lastRunAt=datetime.utcnow().isoformat(), lastRunStatus="ok"),
            Automation(id="auto-2", name="Memory Consolidation", description="Consolidate memories weekly", trigger={"kind": "schedule", "expr": "0 2 * * 0"}, agentId="agent-1", risk=RiskLevel.LOW, enabled=True, requiresApproval=False, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), lastRunAt=datetime.utcnow().isoformat(), lastRunStatus="ok"),
            Automation(id="auto-3", name="Code Review", description="Auto-review PRs when opened", trigger={"kind": "event", "expr": "pr.opened"}, agentId="agent-5", risk=RiskLevel.MEDIUM, enabled=True, requiresApproval=True, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
        ]
        for a in autos:
            self._automations[a.id] = a
            self._runs[a.id] = []

    async def list(self):
        return list(self._automations.values())

    async def create(self, input):
        auto = Automation(
            id=f"auto-{uuid.uuid4().hex[:8]}",
            name=input.name,
            description=input.description,
            trigger={"kind": input.triggerKind.value, "expr": input.expr},
            agentId=input.agentId,
            risk=input.risk,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._automations[auto.id] = auto
        self._runs[auto.id] = []
        return auto

    async def update(self, id, patch):
        if id not in self._automations:
            raise ValueError(f"Automation {id} not found")
        auto = self._automations[id]
        for k, v in patch.items():
            if hasattr(auto, k):
                setattr(auto, k, v)
        auto.updatedAt = datetime.utcnow().isoformat()
        return auto

    async def run(self, id):
        if id not in self._automations:
            raise ValueError(f"Automation {id} not found")
        run = AutomationRun(
            id=f"run-{uuid.uuid4().hex[:8]}",
            automationId=id,
            status="ok",
            startedAt=datetime.utcnow().isoformat(),
            completedAt=datetime.utcnow().isoformat(),
            log=["Automation executed successfully"],
            artifacts=[]
        )
        self._runs[id].append(run)
        auto = self._automations[id]
        auto.lastRunAt = run.startedAt
        auto.lastRunStatus = "ok"
        auto.updatedAt = datetime.utcnow().isoformat()
        
        await self._emit({"type": "run", "automationId": id, "status": "ok"})
        return run

    async def duplicate(self, id):
        if id not in self._automations:
            raise ValueError(f"Automation {id} not found")
        auto = self._automations[id]
        new_auto = Automation(
            id=f"auto-{uuid.uuid4().hex[:8]}",
            name=f"{auto.name} (copy)",
            description=auto.description,
            trigger=auto.trigger,
            agentId=auto.agentId,
            risk=auto.risk,
            enabled=False,
            requiresApproval=auto.requiresApproval,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._automations[new_auto.id] = new_auto
        self._runs[new_auto.id] = []
        return new_auto

    async def remove(self, id):
        if id in self._automations:
            del self._automations[id]
            if id in self._runs:
                del self._runs[id]

    async def workflowFor(self, id):
        return WorkflowGraph(nodes=[], edges=[])

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onRunEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

automation_service = AutomationService()