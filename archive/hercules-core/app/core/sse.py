"""SSE Event streaming for real-time updates"""
from typing import AsyncIterator
import asyncio
import json
from datetime import datetime
from sse_starlette.sse import EventSourceResponse
from fastapi import Request

class SSEManager:
    def __init__(self):
        self._channels: dict[str, list[asyncio.Queue]] = {
            "core": [],
            "agent": [],
            "task": [],
            "automation": [],
            "system": [],
            "activity": [],
            "notice": [],
            "media": [],
            "voice": [],
        }

    def subscribe(self, channel: str) -> asyncio.Queue:
        queue = asyncio.Queue()
        if channel in self._channels:
            self._channels[channel].append(queue)
        return queue

    def unsubscribe(self, channel: str, queue: asyncio.Queue):
        if channel in self._channels and queue in self._channels[channel]:
            self._channels[channel].remove(queue)

    async def publish(self, channel: str, event: dict):
        if channel in self._channels:
            event["timestamp"] = datetime.utcnow().isoformat()
            for queue in self._channels[channel]:
                try:
                    queue.put_nowait(event)
                except asyncio.QueueFull:
                    pass

    async def event_generator(self, channel: str, request: Request) -> AsyncIterator[dict]:
        queue = self.subscribe(channel)
        try:
            while True:
                if await request.is_disconnected():
                    break
                try:
                    event = await asyncio.wait_for(queue.get(), timeout=30.0)
                    yield {"event": channel, "data": json.dumps(event)}
                except asyncio.TimeoutError:
                    # Send heartbeat
                    yield {"event": "heartbeat", "data": json.dumps({"ts": datetime.utcnow().isoformat()})}
        finally:
            self.unsubscribe(channel, queue)

# Global SSE manager
sse_manager = SSEManager()

def create_sse_endpoint(channel: str):
    async def sse_endpoint(request: Request):
        return EventSourceResponse(sse_manager.event_generator(channel, request))
    return sse_endpoint