"""Settings Service"""
from typing import AsyncIterator
from datetime import datetime
from app.models import AppConfig, SettingsPatchInput

class SettingsService:
    def __init__(self):
        self._config = AppConfig(
            theme="obsidian-night",
            density="comfortable",
            fontScale=1.0,
            ai={},
            core={},
            privacy={},
            voice={}
        )

    async def get(self) -> AppConfig:
        return self._config

    def current(self) -> AppConfig:
        return self._config

    async def patch(self, patch: SettingsPatchInput) -> AppConfig:
        if patch.ai is not None:
            self._config.ai.update(patch.ai)
        if patch.core is not None:
            self._config.core.update(patch.core)
        if patch.privacy is not None:
            self._config.privacy.update(patch.privacy)
        if patch.voice is not None:
            self._config.voice.update(patch.voice)
        return self._config

    async def reset(self) -> AppConfig:
        self._config = AppConfig(
            theme="obsidian-night",
            density="comfortable",
            fontScale=1.0,
            ai={},
            core={},
            privacy={},
            voice={}
        )
        return self._config

    async def export(self) -> str:
        return self._config.model_dump_json(indent=2)

    async def import_config(self, json_str: str) -> AppConfig:
        self._config = AppConfig.model_validate_json(json_str)
        return self._config

settings_service = SettingsService()