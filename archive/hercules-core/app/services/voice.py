"""Voice Service"""
from typing import AsyncIterator
from datetime import datetime
from app.models import VoiceConfig, VoiceProfile, VoiceEvent

class VoiceService:
    def __init__(self):
        self._config = VoiceConfig()
        self._profiles = {}
        self._listeners = []
        self._seed_data()

    def _seed_data(self):
        self._profiles = {
            "voice-1": VoiceProfile(id="voice-1", name="Default", voice="alloy", language="en", speed=1.0),
            "voice-2": VoiceProfile(id="voice-2", name="British", voice="nova", language="en-GB", speed=1.0),
        }

    async def profiles(self) -> list[VoiceProfile]:
        return list(self._profiles.values())

    async def config(self) -> VoiceConfig:
        return self._config

    async def configure(self, patch: dict):
        for k, v in patch.items():
            if hasattr(self._config, k):
                setattr(self._config, k, v)

    async def listen(self):
        pass

    async def stop(self):
        pass

    async def speak(self, text: str):
        pass

    async def stopSpeaking(self):
        pass

    async def capabilities(self) -> dict:
        return {"stt": True, "tts": True, "wakeWord": True}

    async def _emit(self, event: dict):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onVoiceEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

voice_service = VoiceService()