"""Agent Service - manages agents, roles, and departments"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    Agent, AgentRole, Department, AgentTier, RiskLevel, AgentSpawnInput,
    DepartmentCreateInput
)

class AgentService:
    def __init__(self):
        self._agents = {}
        self._roles = {}
        self._departments = {}
        self._listeners = []
        
        self._seed_roles()
        self._seed_departments()
        self._seed_agents()

    def _seed_roles(self):
        roles = [
            AgentRole(id="role-researcher", name="Researcher", description="Deep research and analysis", color="#3b82f6", capabilities=["research", "analysis", "synthesis"], defaultAutonomy=70, defaultRisk=RiskLevel.LOW),
            AgentRole(id="role-coder", name="Coder", description="Software development and debugging", color="#8b5cf6", capabilities=["coding", "debugging", "architecture", "review"], defaultAutonomy=60, defaultRisk=RiskLevel.MEDIUM),
            AgentRole(id="role-designer", name="Designer", description="UI/UX and visual design", color="#ec4899", capabilities=["design", "prototyping", "user-research"], defaultAutonomy=50, defaultRisk=RiskLevel.LOW),
            AgentRole(id="role-planner", name="Planner", description="Task planning and project management", color="#f59e0b", capabilities=["planning", "scheduling", "coordination"], defaultAutonomy=80, defaultRisk=RiskLevel.LOW),
            AgentRole(id="role-qa", name="QA Engineer", description="Testing and quality assurance", color="#10b981", capabilities=["testing", "automation", "security"], defaultAutonomy=40, defaultRisk=RiskLevel.MEDIUM),
            AgentRole(id="role-ops", name="Operations", description="System operations and monitoring", color="#6366f1", capabilities=["monitoring", "deployment", "incident-response"], defaultAutonomy=70, defaultRisk=RiskLevel.HIGH),
        ]
        for role in roles:
            self._roles[role.id] = role

    def _seed_departments(self):
        depts = [
            Department(id="dept-engineering", name="Engineering", code="ENG", mission="Build and maintain software systems", color="#8b5cf6", budgetUsd=50000, autonomy=70, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            Department(id="dept-research", name="Research", code="RES", mission="Explore new technologies and approaches", color="#3b82f6", budgetUsd=20000, autonomy=80, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            Department(id="dept-design", name="Design", code="DSG", mission="Create intuitive and beautiful interfaces", color="#ec4899", budgetUsd=15000, autonomy=60, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            Department(id="dept-operations", name="Operations", code="OPS", mission="Keep systems running smoothly", color="#6366f1", budgetUsd=30000, autonomy=70, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
        ]
        for dept in depts:
            self._departments[dept.id] = dept

    def _seed_agents(self):
        agents = [
            Agent(id="agent-1", name="Ada", roleId="role-researcher", departmentId="dept-research", autonomy=75, risk=RiskLevel.LOW, status="active", createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), tokensUsed=125000, costUsd=0.15),
            Agent(id="agent-2", name="Turing", roleId="role-coder", departmentId="dept-engineering", autonomy=65, risk=RiskLevel.MEDIUM, status="active", createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), tokensUsed=890000, costUsd=1.23),
            Agent(id="agent-3", name="Eames", roleId="role-designer", departmentId="dept-design", autonomy=55, risk=RiskLevel.LOW, status="active", createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), tokensUsed=45000, costUsd=0.08),
            Agent(id="agent-4", name="Von Neumann", roleId="role-planner", departmentId="dept-engineering", autonomy=85, risk=RiskLevel.LOW, status="active", createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), tokensUsed=32000, costUsd=0.05),
            Agent(id="agent-5", name="Hopper", roleId="role-qa", departmentId="dept-engineering", autonomy=45, risk=RiskLevel.MEDIUM, status="active", createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), tokensUsed=180000, costUsd=0.32),
        ]
        for agent in agents:
            self._agents[agent.id] = agent

    async def list(self):
        return list(self._agents.values())

    async def roles(self):
        return list(self._roles.values())

    async def get(self, id):
        return self._agents.get(id)

    async def spawn(self, input):
        agent = Agent(
            id=f"agent-{uuid.uuid4().hex[:8]}",
            name=input.name,
            roleId=input.roleId,
            departmentId=input.departmentId,
            parentId=input.parentId,
            autonomy=input.autonomy,
            risk=input.risk,
            status="active",
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._agents[agent.id] = agent
        await self._emit({"type": "updated", "agent": agent})
        return agent

    async def retire(self, id):
        if id in self._agents:
            self._agents[id].status = "retired"
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "removed", "id": id})

    async def pause(self, id):
        if id in self._agents:
            self._agents[id].status = "paused"
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def resume(self, id):
        if id in self._agents:
            self._agents[id].status = "active"
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def boost(self, id):
        if id in self._agents:
            self._agents[id].autonomy = min(100, self._agents[id].autonomy + 10)
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def steer(self, id, guidance):
        if id in self._agents:
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def grantCapability(self, id, scopeId):
        if id in self._agents:
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def revokeCapability(self, id, scopeId):
        if id in self._agents:
            self._agents[id].updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "agent": self._agents[id]})

    async def trace(self, id):
        return []

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onAgentEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

agent_service = AgentService()