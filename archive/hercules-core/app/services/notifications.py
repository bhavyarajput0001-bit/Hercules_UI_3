"""Notifications Service"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import Notice, ApprovalRequest, RiskLevel

class NotificationService:
    def __init__(self):
        self._notices = {}
        self._approvals = {}
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        notices = [
            Notice(id="notif-1", kind="info", title="Core Online", body="Hercules core is now online and ready", read=False, at=datetime.utcnow().isoformat()),
            Notice(id="notif-2", kind="warn", title="High Token Usage", body="Agent Turing has used 890k tokens this session", read=False, at=datetime.utcnow().isoformat()),
            Notice(id="notif-3", kind="success", title="Build Succeeded", body="Hercules frontend build completed", read=True, at=datetime.utcnow().isoformat()),
        ]
        for n in notices:
            self._notices[n.id] = n

        approvals = [
            ApprovalRequest(id="appr-1", kind="agent-action", title="Deploy to Staging", description="Turing requests to deploy Hercules frontend to staging", agentId="agent-2", risk=RiskLevel.MEDIUM, context={"environment": "staging", "service": "hercules-frontend"}, createdAt=datetime.utcnow().isoformat(), expiresAt=datetime.utcnow().isoformat(), status="pending"),
        ]
        for a in approvals:
            self._approvals[a.id] = a

    async def list(self):
        return sorted(self._notices.values(), key=lambda x: x.at, reverse=True)

    async def markRead(self, ids):
        for id in ids:
            if id in self._notices:
                self._notices[id].read = True

    async def markAllRead(self):
        for n in self._notices.values():
            n.read = True

    async def dismiss(self, id):
        if id in self._notices:
            del self._notices[id]

    async def snooze(self, id, minutes):
        pass

    async def approvals(self):
        return list(self._approvals.values())

    async def respond(self, requestId, approved):
        if requestId in self._approvals:
            self._approvals[requestId].status = "approved" if approved else "denied"

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onNotice(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

notification_service = NotificationService()