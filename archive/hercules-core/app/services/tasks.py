"""Task Service - manages tasks and projects"""
from typing import AsyncIterator
from datetime import datetime
import uuid
from app.models import (
    Task, TaskStatus, TaskPriority, Project, ProjectStatus,
    TaskCreateInput, TaskUpdateInput, ProjectCreateInput, Artifact
)

class TaskService:
    def __init__(self):
        self._tasks = {}
        self._projects = {}
        self._artifacts = {}
        self._listeners = []
        
        self._seed_data()

    def _seed_data(self):
        projects = [
            Project(id="proj-1", name="Hercules Frontend", codename="HERC-UI", goal="Build the command center UI", due="2026-12-31", budgetUsd=50000, status=ProjectStatus.ACTIVE, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            Project(id="proj-2", name="BakuOS Core", codename="BAKU", goal="Personal AI operating system", due="2027-06-30", budgetUsd=100000, status=ProjectStatus.PLANNING, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
        ]
        for p in projects:
            self._projects[p.id] = p
        
        tasks = [
            Task(id="task-1", title="Implement Agent Estate screen", objective="Build the agent management interface", priority=TaskPriority.HIGH, status=TaskStatus.DONE, projectId="proj-1", departmentId="dept-engineering", assigneeAgentId="agent-2", estimateMin=120, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), startedAt=datetime.utcnow().isoformat(), completedAt=datetime.utcnow().isoformat()),
            Task(id="task-2", title="Add real-time SSE streaming", objective="Connect frontend to backend via SSE", priority=TaskPriority.HIGH, status=TaskStatus.RUNNING, projectId="proj-1", departmentId="dept-engineering", assigneeAgentId="agent-2", estimateMin=90, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat(), startedAt=datetime.utcnow().isoformat()),
            Task(id="task-3", title="Design BakuOS dashboard", objective="Create dashboard mockups for BakuOS", priority=TaskPriority.NORMAL, status=TaskStatus.PENDING, projectId="proj-2", departmentId="dept-design", assigneeAgentId="agent-3", estimateMin=180, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
            Task(id="task-4", title="Set up Obsidian memory sync", objective="Connect Obsidian vault as long-term memory", priority=TaskPriority.HIGH, status=TaskStatus.BLOCKED, projectId="proj-2", departmentId="dept-research", assigneeAgentId="agent-1", estimateMin=60, createdAt=datetime.utcnow().isoformat(), updatedAt=datetime.utcnow().isoformat()),
        ]
        for t in tasks:
            self._tasks[t.id] = t

    async def list(self):
        return list(self._tasks.values())

    async def get(self, id):
        return self._tasks.get(id)

    async def create(self, input):
        task = Task(
            id=f"task-{uuid.uuid4().hex[:8]}",
            title=input.title,
            objective=input.objective,
            priority=input.priority,
            projectId=input.projectId,
            departmentId=input.departmentId,
            assigneeAgentId=input.assigneeAgentId,
            estimateMin=input.estimateMin,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._tasks[task.id] = task
        await self._emit({"type": "created", "task": task})
        return task

    async def update(self, id, patch):
        if id not in self._tasks:
            raise ValueError(f"Task {id} not found")
        task = self._tasks[id]
        if patch.status is not None:
            task.status = patch.status
            if patch.status == TaskStatus.RUNNING and not task.startedAt:
                task.startedAt = datetime.utcnow().isoformat()
            elif patch.status == TaskStatus.DONE and not task.completedAt:
                task.completedAt = datetime.utcnow().isoformat()
        if patch.priority is not None:
            task.priority = patch.priority
        if patch.assigneeAgentId is not None:
            task.assigneeAgentId = patch.assigneeAgentId
        if patch.projectId is not None:
            task.projectId = patch.projectId
        task.updatedAt = datetime.utcnow().isoformat()
        await self._emit({"type": "updated", "task": task})
        return task

    async def approve(self, id, approved):
        if id in self._tasks:
            task = self._tasks[id]
            if approved:
                task.status = TaskStatus.RUNNING
                if not task.startedAt:
                    task.startedAt = datetime.utcnow().isoformat()
            else:
                task.status = TaskStatus.CANCELLED
            task.updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "task": task})

    async def cancel(self, id):
        if id in self._tasks:
            task = self._tasks[id]
            task.status = TaskStatus.CANCELLED
            task.updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "task": task})

    async def retry(self, id):
        if id in self._tasks:
            task = self._tasks[id]
            task.status = TaskStatus.PENDING
            task.startedAt = None
            task.completedAt = None
            task.updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "task": task})

    async def assignTo(self, id, agentId):
        if id in self._tasks:
            task = self._tasks[id]
            task.assigneeAgentId = agentId
            task.updatedAt = datetime.utcnow().isoformat()
            await self._emit({"type": "updated", "task": task})

    async def log(self, id, text):
        pass

    async def artifacts(self, taskId):
        return self._artifacts.get(taskId, [])

    async def _emit(self, event):
        for listener in self._listeners:
            try:
                await listener(event)
            except Exception:
                pass

    @property
    def onTaskEvent(self):
        class Emitter:
            def __init__(self, listeners):
                self._listeners = listeners
            def subscribe(self, listener):
                self._listeners.append(listener)
                return lambda: self._listeners.remove(listener) if listener in self._listeners else None
        return Emitter(self._listeners)

    async def list_projects(self):
        return list(self._projects.values())

    async def create_project(self, input):
        project = Project(
            id=f"proj-{uuid.uuid4().hex[:8]}",
            name=input.name,
            codename=input.codename,
            goal=input.goal,
            due=input.due,
            budgetUsd=input.budgetUsd,
            createdAt=datetime.utcnow().isoformat(),
            updatedAt=datetime.utcnow().isoformat()
        )
        self._projects[project.id] = project
        return project

    async def set_status(self, id, status):
        if id in self._projects:
            self._projects[id].status = status
            self._projects[id].updatedAt = datetime.utcnow().isoformat()

    async def toggle_milestone(self, projectId, milestoneId):
        return self._projects[projectId]

    async def brief(self, id):
        return f"Project brief for {id}"

task_service = TaskService()