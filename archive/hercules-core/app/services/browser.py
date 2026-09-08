"""Browser Service - manages browser tabs and automation"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    BrowserTab, SitePermission, PageAction,
    BrowserOpenInput, BrowserNavigateInput, BrowserActInput, BrowserPermissionInput
)

class BrowserService:
    def __init__(self):
        self._tabs = {}
        self._permissions = {}
        self._history = []
        self._seed_data()

    def _seed_data(self):
        tabs = [
            BrowserTab(id="tab-1", url="https://github.com", title="GitHub", agentControlled=False, createdAt=datetime.utcnow().isoformat()),
            BrowserTab(id="tab-2", url="https://omniroute.online", title="OmniRoute Dashboard", agentControlled=False, createdAt=datetime.utcnow().isoformat()),
        ]
        for t in tabs:
            self._tabs[t.id] = t

    async def tabs(self):
        return list(self._tabs.values())

    async def open(self, input):
        tab = BrowserTab(
            id=f"tab-{uuid.uuid4().hex[:8]}",
            url=input.url,
            title=input.url,
            agentControlled=input.agentControlled,
            createdAt=datetime.utcnow().isoformat()
        )
        self._tabs[tab.id] = tab
        self._history.append({"url": input.url, "title": input.url, "at": datetime.utcnow().isoformat()})
        return tab

    async def close(self, tabId):
        if tabId in self._tabs:
            del self._tabs[tabId]

    async def navigate(self, input):
        return await self.open(BrowserOpenInput(url=input.url, agentControlled=False))

    async def read(self, tabId):
        return {
            "title": "Page Title",
            "text": "Page content extracted...",
            "links": 15,
            "words": 1200
        }

    async def act(self, tabId, input):
        return [
            PageAction(id=str(uuid.uuid4()), type="click", selector="button.submit", result="Clicked submit button")
        ]

    async def history(self):
        return self._history[-50:]

    async def permissions(self):
        return list(self._permissions.values())

    async def setPermission(self, origin, input):
        self._permissions[origin] = SitePermission(origin=origin, mode=input.mode)

browser_service = BrowserService()