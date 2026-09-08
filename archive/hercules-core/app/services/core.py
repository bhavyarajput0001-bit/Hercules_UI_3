"""Core Service - manages boot phase, vitals, and core state"""
from typing import AsyncIterator, Callable, Awaitable
from datetime import datetime
import time
import uuid
from app.models import (
    BootPhase, CoreState, CoreVitals, MissionLog, AppConfig
)

class CoreService:
    def __init__(self):
        self._phase = BootPhase.COLD
        self._vitals = CoreVitals(
            state=CoreState.DORMANT,
            energy=0.0,
            cognitiveLoad=0.0,
            memoryPressure=0.0,
            integrity=100,
            activeAgents=0,
            queuedTasks=0,
            uptimeMs=0,
            focus="booting"
        )
        self._listeners = []
        self._start_time = time.time()
        self._hold_refs = {}

    @property
    def phase(self):
        return self._phase

    @property
    def vitals(self):
        self._vitals.uptimeMs = int((time.time() - self._start_time) * 1000)
        return self._vitals

    @property
    def onCoreEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    async def boot(self):
        """Boot the core system"""
        self._phase = BootPhase.BOOTING
        await self._emit({"type": "state", "state": CoreState.IDLE})
        
        # Simulate boot sequence
        self._phase = BootPhase.CALIBRATING
        await self._emit({"type": "state", "state": CoreState.IDLE})
        
        self._phase = BootPhase.ONLINE
        self._vitals.state = CoreState.IDLE
        self._vitals.focus = "ready"
        await self._emit({"type": "state", "state": CoreState.IDLE})
        await self._emit({"type": "vitals", "vitals": self.vitals})
        
        # Log boot
        await self._emit({
            "type": "log",
            "log": MissionLog(
                id=str(uuid.uuid4()),
                at=datetime.utcnow().isoformat(),
                level="info",
                message="Core booted successfully",
                source="core",
                traceId=None
            )
        })

    def holdState(self, state, owner):
        key = f"{owner}:{state}"
        self._hold_refs[key] = self._hold_refs.get(key, 0) + 1
        self._vitals.state = state
        
        def release():
            self._hold_refs[key] -= 1
            if self._hold_refs[key] <= 0:
                del self._hold_refs[key]
                if not self._hold_refs:
                    self._vitals.state = CoreState.IDLE
                    self._vitals.focus = "ready"
        
        return release

    async def shutdown(self):
        self._phase = BootPhase.COLD
        self._vitals.state = CoreState.DORMANT
        await self._emit({"type": "state", "state": CoreState.DORMANT})
        await self._emit({"type": "vitals", "vitals": self.vitals})

    async def reconfigure(self, patch):
        await self._emit({"type": "log", "log": MissionLog(
            id=str(uuid.uuid4()),
            at=datetime.utcnow().isoformat(),
            level="info",
            message=f"Core reconfigured: {patch}",
            source="core"
        )})

core_service = CoreService()