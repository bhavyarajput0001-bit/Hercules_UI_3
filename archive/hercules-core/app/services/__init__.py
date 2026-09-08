"""Services package - exports all service instances"""
from app.services.core import core_service
from app.services.ai import ai_service
from app.services.agents import agent_service
from app.services.tasks import task_service
from app.services.memory import memory_service
from app.services.files import file_service
from app.services.knowledge import knowledge_service
from app.services.automation import automation_service
from app.services.browser import browser_service
from app.services.terminal import terminal_service
from app.services.system import system_service
from app.services.analytics import analytics_service
from app.services.activity import activity_service
from app.services.notifications import notification_service
from app.services.settings import settings_service
from app.services.permissions import permission_service
from app.services.media import media_service
from app.services.voice import voice_service

__all__ = [
    "core_service",
    "ai_service",
    "agent_service",
    "task_service",
    "memory_service",
    "file_service",
    "knowledge_service",
    "automation_service",
    "browser_service",
    "terminal_service",
    "system_service",
    "analytics_service",
    "activity_service",
    "notification_service",
    "settings_service",
    "permission_service",
    "media_service",
    "voice_service",
]