"""Media Service"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import MediaState, MediaArtifact

class MediaService:
    def __init__(self):
        self._state = MediaState()
        self._library = {}
        self._queue = []
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        self._library = {
            "media-1": MediaArtifact(id="media-1", name="Hercules Demo", kind="render", sizeMb=45.2, status="ready", at=datetime.utcnow().isoformat(), frames=1200),
            "media-2": MediaArtifact(id="media-2", name="BakuOS Walkthrough", kind="transcript", sizeMb=2.1, status="ready", at=datetime.utcnow().isoformat(), words=3500),
        }
        self._queue = [{"id": "media-1", "title": "Hercules Demo"}]

    async def state(self) -> MediaState:
        return self._state

    async def play(self):
        self._state.playing = True

    async def pause(self):
        self._state.playing = False

    async def next(self):
        pass

    async def prev(self):
        pass

    async def seek(self, positionSec: float):
        pass

    async def setVolume(self, v: float):
        self._state.volume = max(0.0, min(1.0, v))

    async def toggleMute(self):
        self._state.muted = not self._state.muted

    async def setShuffle(self, on: bool):
        self._state.shuffle = on

    async def cycleRepeat(self) -> str:
        modes = ["off", "one", "all"]
        current = modes.index(self._state.repeat)
        self._state.repeat = modes[(current + 1) % len(modes)]
        return self._state.repeat

    async def setDevice(self, name: str):
        self._state.device = name

    async def enqueue(self, trackIds: list[str]):
        for tid in trackIds:
            if tid in self._library:
                self._queue.append({"id": tid, "title": self._library[tid].name})

    async def library(self) -> list[MediaArtifact]:
        return list(self._library.values())

    async def removeFromQueue(self, index: int):
        if 0 <= index < len(self._queue):
            self._queue.pop(index)

    async def toggleLibraryItem(self, id: str):
        pass

    async def _emit(self, event: dict):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onState(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

media_service = MediaService()