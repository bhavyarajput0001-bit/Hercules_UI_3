"""Memory Service - manages memory records and search"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    MemoryRecord, MemoryKind, MemorySearchHit, WriteMemoryInput
)

class MemoryService:
    def __init__(self):
        self._memories = {}
        self._seed_data()

    def _seed_data(self):
        memories = [
            MemoryRecord(id="mem-1", kind=MemoryKind.FACT, content="User prefers dark theme with electric blue accents", tags=["preference", "ui"], pinned=True, source="user", weight=1.0, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            MemoryRecord(id="mem-2", kind=MemoryKind.DECISION, content="Selected React + Vite + TypeScript for frontend stack", tags=["architecture", "decision"], pinned=True, source="planning", weight=1.0, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            MemoryRecord(id="mem-3", kind=MemoryKind.LEARNING, content="OmniRoute provides 18 routing strategies including auto/coding, auto/fast, auto/cheap", tags=["learning", "omniroute"], pinned=False, source="research", weight=0.8, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            MemoryRecord(id="mem-4", kind=MemoryKind.PREFERENCE, content="User works in IST timezone (UTC+5:30)", tags=["preference", "timezone"], pinned=True, source="user", weight=1.0, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            MemoryRecord(id="mem-5", kind=MemoryKind.CONVERSATION, content="Discussed BakuOS Phase 0 architecture with Pam agent", tags=["conversation", "bakuos"], pinned=False, source="chat", weight=0.6, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
        ]
        for m in memories:
            self._memories[m.id] = m

    async def search(self, query, opts=None):
        opts = opts or {}
        kind = opts.get("kind", "all")
        limit = opts.get("limit", 10)
        
        results = []
        for mem in self._memories.values():
            if kind != "all" and mem.kind != kind:
                continue
            if query.lower() in mem.content.lower() or any(query.lower() in tag.lower() for tag in mem.tags):
                results.append(MemorySearchHit(
                    record=mem,
                    score=0.9,
                    matchedSnippet=mem.content[:200]
                ))
        return results[:limit]

    async def list(self):
        return list(self._memories.values())

    async def write(self, input):
        mem = MemoryRecord(
            id=f"mem-{uuid.uuid4().hex[:8]}",
            kind=input.kind,
            content=input.content,
            tags=input.tags,
            source=input.source,
            weight=input.weight,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._memories[mem.id] = mem
        return mem

    async def update(self, id, patch):
        if id not in self._memories:
            raise ValueError(f"Memory {id} not found")
        mem = self._memories[id]
        for k, v in patch.items():
            if hasattr(mem, k):
                setattr(mem, k, v)
        mem.updatedAt = datetime.utcnow().isoformat()
        return mem

    async def pin(self, id, pinned):
        if id in self._memories:
            self._memories[id].pinned = pinned
            self._memories[id].updatedAt = datetime.utcnow().isoformat()

    async def delete(self, id):
        if id in self._memories:
            del self._memories[id]

    async def consolidate(self):
        return {"merged": 0, "savedTokens": 0}

    async def decayCurve(self):
        return [{"day": i, "strength": max(0.1, 1.0 - i * 0.05)} for i in range(30)]

    async def graph(self):
        nodes = [
            {"id": m.id, "label": m.content[:30], "weight": m.weight, "kind": m.kind}
            for m in self._memories.values()
        ]
        return {"nodes": nodes, "links": []}

memory_service = MemoryService()