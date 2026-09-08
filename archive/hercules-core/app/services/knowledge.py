"""Knowledge Service - manages knowledge sources and search"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    KnowledgeSource, KnowledgeStats, KnowledgeChunk, KnowledgeSearchHit, KnowledgeSourceInput
)

class KnowledgeService:
    def __init__(self):
        self._sources = {}
        self._chunks = {}
        self._seed_data()

    def _seed_data(self):
        sources = [
            KnowledgeSource(id="ks-1", name="Hercules Docs", origin="https://github.com/hercules/docs", kind="github", status="ready", chunks=45, sizeBytes=120000, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), lastIndexedAt=datetime.utcnow().isoformat()),
            KnowledgeSource(id="ks-2", name="OmniRoute Docs", origin="https://omniroute.online/docs", kind="url", status="ready", chunks=120, sizeBytes=500000, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), lastIndexedAt=datetime.utcnow().isoformat()),
            KnowledgeSource(id="ks-3", name="BakuOS Specs", origin="./BakuOS/AGENTS.md", kind="file", status="ready", chunks=12, sizeBytes=25000, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), lastIndexedAt=datetime.utcnow().isoformat()),
        ]
        for s in sources:
            self._sources[s.id] = s
            self._chunks[s.id] = [
                KnowledgeChunk(id=f"{s.id}-chunk-{i}", sourceId=s.id, text=f"Content chunk {i} from {s.name}", metadata={"page": i})
                for i in range(min(s.chunks, 5))
            ]

    async def sources(self):
        return list(self._sources.values())

    async def stats(self):
        total_chunks = sum(s.chunks for s in self._sources.values())
        return KnowledgeStats(
            coverage=0.85,
            hitRate=0.72,
            avgLatencyMs=45,
            lastBuild=datetime.utcnow().isoformat(),
            sizeSeries=[total_chunks // 10 * i for i in range(10)],
            terms=total_chunks * 50
        )

    async def addSource(self, input):
        source = KnowledgeSource(
            id=f"ks-{uuid.uuid4().hex[:8]}",
            name=input.name,
            origin=input.origin,
            kind=input.kind,
            status="indexing",
            chunks=0,
            sizeBytes=0,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._sources[source.id] = source
        source.status = "ready"
        source.chunks = 10
        source.sizeBytes = 50000
        source.lastIndexedAt = datetime.utcnow().isoformat()
        source.updatedAt = datetime.utcnow().isoformat()
        self._chunks[source.id] = [
            KnowledgeChunk(id=f"{source.id}-chunk-{i}", sourceId=source.id, text=f"Chunk {i} from {source.name}", metadata={})
            for i in range(10)
        ]
        return source

    async def rebuild(self, sourceId):
        if sourceId in self._sources:
            self._sources[sourceId].status = "indexing"
            self._sources[sourceId].status = "ready"
            self._sources[sourceId].lastIndexedAt = datetime.utcnow().isoformat()

    async def remove(self, sourceId):
        if sourceId in self._sources:
            del self._sources[sourceId]
            if sourceId in self._chunks:
                del self._chunks[sourceId]

    async def query(self, text):
        results = []
        for source_id, chunks in self._chunks.items():
            source = self._sources.get(source_id)
            if not source:
                continue
            for chunk in chunks:
                if text.lower() in chunk.text.lower():
                    results.append(KnowledgeSearchHit(
                        chunk=chunk,
                        score=0.85,
                        sourceName=source.name
                    ))
        return results[:10]

    async def chunks(self, sourceId):
        return self._chunks.get(sourceId, [])

knowledge_service = KnowledgeService()