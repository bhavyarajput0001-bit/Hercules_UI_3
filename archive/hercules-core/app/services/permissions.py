"""Permissions Service"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    PermissionScope, SecretHandle, AuditEntry, AutonomyPolicy,
    AgentTier, RiskLevel, PermissionGrantInput, AutonomyPatchInput
)

class PermissionService:
    def __init__(self):
        self._scopes = {}
        self._secrets = {}
        self._audit = []
        self._autonomy = AutonomyPolicy()
        self._seed_data()

    def _seed_data(self):
        scopes = [
            PermissionScope(id="scope-files-read", name="File Read", description="Read files from workspace", tierRequired=AgentTier.TIER_0, risk=RiskLevel.LOW),
            PermissionScope(id="scope-files-write", name="File Write", description="Write files to workspace", tierRequired=AgentTier.TIER_1, risk=RiskLevel.MEDIUM),
            PermissionScope(id="scope-terminal", name="Terminal Access", description="Execute terminal commands", tierRequired=AgentTier.TIER_1, risk=RiskLevel.HIGH),
            PermissionScope(id="scope-browser", name="Browser Control", description="Control browser tabs", tierRequired=AgentTier.TIER_1, risk=RiskLevel.MEDIUM),
            PermissionScope(id="scope-agents-spawn", name="Spawn Agents", description="Create new agents", tierRequired=AgentTier.TIER_2, risk=RiskLevel.HIGH),
            PermissionScope(id="scope-secrets", name="Secrets Access", description="Read secret handles", tierRequired=AgentTier.TIER_3, risk=RiskLevel.CRITICAL),
        ]
        for s in scopes:
            self._scopes[s.id] = s

        secrets = [
            SecretHandle(id="sec-1", label="GitHub Token", masked="ghp_****_abcd", lastUsed=datetime.utcnow().isoformat(), rotatedAt=datetime.utcnow().isoformat()),
            SecretHandle(id="sec-2", label="OmniRoute API Key", masked="or_****_efgh", lastUsed=datetime.utcnow().isoformat(), rotatedAt=datetime.utcnow().isoformat()),
        ]
        for s in secrets:
            self._secrets[s.id] = s

    async def scopes(self) -> list[PermissionScope]:
        return list(self._scopes.values())

    async def grant(self, scopeId: str, tiers: list[AgentTier]):
        pass

    async def revoke(self, scopeId: str, tiers: list[AgentTier]):
        pass

    async def roleAccess(self, agentId: str, access: str):
        pass

    async def secrets(self) -> list[SecretHandle]:
        return list(self._secrets.values())

    async def rotateSecret(self, id: str) -> SecretHandle:
        if id in self._secrets:
            self._secrets[id].masked = f"{self._secrets[id].masked.split('_')[0]}_****_{uuid.uuid4().hex[:4]}"
            self._secrets[id].rotatedAt = datetime.utcnow().isoformat()
            self._secrets[id].lastUsed = datetime.utcnow().isoformat()
        return self._secrets[id]

    async def audit(self, filter: dict = None) -> list[AuditEntry]:
        return self._audit

    async def simulateAttack(self, kind: str) -> dict:
        return {"blocked": True, "detail": f"Simulated {kind} attack was blocked"}

    async def autonomy(self) -> AutonomyPolicy:
        return self._autonomy

    async def setAutonomy(self, patch: AutonomyPatchInput) -> AutonomyPolicy:
        if patch.level is not None:
            self._autonomy.level = patch.level
        if patch.stance is not None:
            self._autonomy.stance = patch.stance
        if patch.autoApproveLowRisk is not None:
            self._autonomy.autoApproveLowRisk = patch.autoApproveLowRisk
        if patch.autoApproveWithinWorkspace is not None:
            self._autonomy.autoApproveWithinWorkspace = patch.autoApproveWithinWorkspace
        if patch.requireApprovalAbove is not None:
            self._autonomy.requireApprovalAbove = patch.requireApprovalAbove
        if patch.estateFrozen is not None:
            self._autonomy.estateFrozen = patch.estateFrozen
        if patch.spendCapUsd is not None:
            self._autonomy.spendCapUsd = patch.spendCapUsd
        return self._autonomy

permission_service = PermissionService()