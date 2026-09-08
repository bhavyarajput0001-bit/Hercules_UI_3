"""Terminal Service - manages terminal sessions"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    TerminalSession, ExecResult, TerminalLine,
    TerminalCreateInput, TerminalExecInput
)

class TerminalService:
    def __init__(self):
        self._sessions = {}
        self._buffers = {}
        self._seed_data()

    def _seed_data(self):
        sessions = [
            TerminalSession(id="term-1", name="Main Shell", shell="zsh", cwd="/Users/bhavyarajput", createdAt=datetime.utcnow().isoformat(), status="running"),
            TerminalSession(id="term-2", name="Python REPL", shell="bash", cwd="/Users/bhavyarajput/Downloads/ai_os", createdAt=datetime.utcnow().isoformat(), status="running"),
        ]
        for s in sessions:
            self._sessions[s.id] = s
            self._buffers[s.id] = [
                TerminalLine(id=str(uuid.uuid4()), sessionId=s.id, text=f"Welcome to {s.shell}", at=datetime.utcnow().isoformat(), kind="system")
            ]

    async def sessions(self):
        return list(self._sessions.values())

    async def create(self, input):
        session = TerminalSession(
            id=f"term-{uuid.uuid4().hex[:8]}",
            name=input.name,
            shell=input.shell,
            cwd=input.cwd,
            createdAt=datetime.utcnow().isoformat()
        )
        self._sessions[session.id] = session
        self._buffers[session.id] = [
            TerminalLine(id=str(uuid.uuid4()), sessionId=session.id, text=f"Welcome to {input.shell}", at=datetime.utcnow().isoformat(), kind="system")
        ]
        return session

    async def close(self, id):
        if id in self._sessions:
            self._sessions[id].status = "exited"
            del self._buffers[id]

    async def exec(self, input, sessionId):
        start = datetime.utcnow()
        output = f"$ {input.command}\nCommand executed (mock)\n"
        self._buffers[sessionId].append(TerminalLine(
            id=str(uuid.uuid4()), sessionId=sessionId, text=input.command, at=start.isoformat(), kind="stdout"
        ))
        self._buffers[sessionId].append(TerminalLine(
            id=str(uuid.uuid4()), sessionId=sessionId, text=output, at=datetime.utcnow().isoformat(), kind="stdout"
        ))
        return ExecResult(exitCode=0, stdout=output, stderr="", durationMs=100)

    async def buffer(self, sessionId):
        return self._buffers.get(sessionId, [])

    async def completions(self, prefix):
        cmds = ["ls", "cd", "git", "npm", "python", "pip", "docker", "kubectl", "curl", "wget"]
        return [c for c in cmds if c.startswith(prefix)]

terminal_service = TerminalService()