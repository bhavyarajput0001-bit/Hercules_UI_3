"""Activity Service"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import ActivityEvent, ActivityKind

class ActivityService:
    def __init__(self):
        self._events = []
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        events = [
            ActivityEvent(id=str(uuid.uuid4()), kind=ActivityKind.TASK_CREATED, title="Task created: Implement Agent Estate screen", description="New task created in Engineering project", agentId="agent-2", taskId="task-1", traceId="trace-1", at=datetime.utcnow().isoformat()),
            ActivityEvent(id=str(uuid.uuid4()), kind=ActivityKind.AGENT_SPAWNED, title="Agent spawned: Ada (Researcher)", description="New researcher agent added to Research department", agentId="agent-1", traceId="trace-2", at=datetime.utcnow().isoformat()),
            ActivityEvent(id=str(uuid.uuid4()), kind=ActivityKind.AUTOMATION_RUN, title="Automation run: Daily Standup", description="Daily standup automation completed successfully", traceId="trace-3", at=datetime.utcnow().isoformat()),
            ActivityEvent(id=str(uuid.uuid4()), kind=ActivityKind.FILE_WRITE, title="File written: /src/components/AgentCard.tsx", description="Agent card component created", agentId="agent-2", traceId="trace-4", at=datetime.utcnow().isoformat()),
            ActivityEvent(id=str(uuid.uuid4()), kind=ActivityKind.APPROVAL_REQUESTED, title="Approval requested: Deploy to staging", description="Agent Turing requests approval for staging deployment", agentId="agent-2", traceId="trace-5", at=datetime.utcnow().isoformat()),
        ]
        self._events = events

    async def list(self, filter=None):
        events = self._events
        if filter:
            if filter.get("kinds"):
                events = [e for e in events if e.kind in filter["kinds"]]
            if filter.get("query"):
                q = filter["query"].lower()
                events = [e for e in events if q in e.title.lower() or q in e.description.lower()]
            if filter.get("limit"):
                events = events[:filter["limit"]]
        return sorted(events, key=lambda x: x.at, reverse=True)

    async def export(self, format="json"):
        return {"filename": f"activity-export.{format}", "bytes": 5200, "rows": len(self._events)}

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

activity_service = ActivityService()