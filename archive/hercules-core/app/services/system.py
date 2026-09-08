"""System Service - manages system monitoring and integrations"""
from typing import AsyncIterator
from datetime import datetime
import uuid
import psutil
import platform
from app.models import (
    SystemSnapshot, ProcessInfo, Integration, DeviceInfo
)

class SystemService:
    def __init__(self):
        self._integrations = {}
        self._devices = {}
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        self._integrations = {
            "int-1": Integration(id="int-1", name="GitHub", kind="github", status="connected", config={"org": "hercules"}, lastSyncAt=datetime.utcnow().isoformat()),
            "int-2": Integration(id="int-2", name="Slack", kind="slack", status="disconnected", config={}, lastSyncAt=None),
        }
        self._devices = {
            "dev-1": DeviceInfo(id="dev-1", name="MacBook Pro", kind="mac", status="online", lastSeenAt=datetime.utcnow().isoformat(), isDefault=True),
            "dev-2": DeviceInfo(id="dev-2", name="iPhone 15", kind="iphone", status="online", lastSeenAt=datetime.utcnow().isoformat(), isDefault=False),
        }

    async def snapshot(self):
        cpu = psutil.cpu_percent(interval=0.1)
        mem = psutil.virtual_memory()
        disk = psutil.disk_usage("/")
        net = psutil.net_io_counters()
        
        return SystemSnapshot(
            cpuPercent=cpu,
            memoryPercent=mem.percent,
            diskPercent=disk.percent,
            networkRxBytes=net.bytes_recv,
            networkTxBytes=net.bytes_sent,
            processCount=len(psutil.pids()),
            loadAverage=list(psutil.getloadavg()) if hasattr(psutil, 'getloadavg') else [0.0, 0.0, 0.0],
            uptimeSec=int(psutil.boot_time())
        )

    async def processes(self):
        procs = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'status', 'cwd']):
            try:
                info = proc.info
                procs.append(ProcessInfo(
                    pid=info['pid'],
                    name=info['name'] or "unknown",
                    cpuPercent=info['cpu_percent'] or 0.0,
                    memoryPercent=info['memory_percent'] or 0.0,
                    status=info['status'] or "unknown",
                    cwd=info['cwd']
                ))
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
        return sorted(procs, key=lambda x: x.cpuPercent, reverse=True)[:50]

    async def kill(self, pid):
        try:
            p = psutil.Process(pid)
            p.terminate()
        except psutil.NoSuchProcess:
            pass

    async def integrations(self):
        return list(self._integrations.values())

    async def connect(self, id):
        if id in self._integrations:
            self._integrations[id].status = "connected"
            self._integrations[id].lastSyncAt = datetime.utcnow().isoformat()
        return self._integrations[id]

    async def disconnect(self, id):
        if id in self._integrations:
            self._integrations[id].status = "disconnected"

    async def devices(self):
        return list(self._devices.values())

    async def setDefaultDevice(self, id):
        for dev in self._devices.values():
            dev.isDefault = (dev.id == id)

    async def openSettings(self, pane):
        pass

    async def launchAtLogin(self, on):
        pass

    async def setKeepAwake(self, on):
        pass

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onSample(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

system_service = SystemService()