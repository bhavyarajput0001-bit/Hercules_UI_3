"""Hercules Core - FastAPI Backend for Hercules Frontend"""
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from app.config import get_settings
from app.core.sse import sse_manager, create_sse_endpoint

# Import all services
from app.services import (
    core_service, ai_service, agent_service, task_service,
    memory_service, file_service, knowledge_service, automation_service,
    browser_service, terminal_service, system_service, analytics_service,
    activity_service, notification_service, settings_service,
    permission_service, media_service, voice_service
)
from app.models import (
    AgentSpawnInput, TaskCreateInput, TaskUpdateInput, ProjectCreateInput,
    DepartmentCreateInput, AutomationCreateInput, KnowledgeSourceInput,
    TerminalCreateInput, TerminalExecInput, BrowserOpenInput,
    BrowserNavigateInput, BrowserActInput, BrowserPermissionInput,
    SettingsPatchInput, VoiceConfigPatch, PermissionGrantInput,
    AutonomyPatchInput, SubmitPromptInput
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await core_service.boot()
    yield
    # Shutdown
    await core_service.shutdown()


app = FastAPI(
    title="Hercules Core",
    description="Backend API for Hercules AI Operating System Console",
    version="0.1.0",
    lifespan=lifespan
)

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check
@app.get("/health")
async def health():
    return {"status": "ok", "service": "hercules-core", "version": "0.1.0"}


# SSE endpoints
app.add_api_route("/v1/stream/core", create_sse_endpoint("core"), methods=["GET"])
app.add_api_route("/v1/stream/agent", create_sse_endpoint("agent"), methods=["GET"])
app.add_api_route("/v1/stream/task", create_sse_endpoint("task"), methods=["GET"])
app.add_api_route("/v1/stream/automation", create_sse_endpoint("automation"), methods=["GET"])
app.add_api_route("/v1/stream/system", create_sse_endpoint("system"), methods=["GET"])
app.add_api_route("/v1/stream/activity", create_sse_endpoint("activity"), methods=["GET"])
app.add_api_route("/v1/stream/notice", create_sse_endpoint("notice"), methods=["GET"])
app.add_api_route("/v1/stream/media", create_sse_endpoint("media"), methods=["GET"])
app.add_api_route("/v1/stream/voice", create_sse_endpoint("voice"), methods=["GET"])


# Core endpoints
@app.post("/v1/core/boot")
async def core_boot():
    await core_service.boot()
    return {"status": "booted"}

@app.post("/v1/core/shutdown")
async def core_shutdown():
    await core_service.shutdown()
    return {"status": "shutdown"}

@app.patch("/v1/core/config")
async def core_reconfigure(patch: dict):
    await core_service.reconfigure(patch)
    return {"status": "reconfigured"}


# AI endpoints
@app.get("/v1/models")
async def ai_models():
    return await ai_service.models()

@app.get("/v1/conversations")
async def ai_conversations():
    return await ai_service.conversations()

@app.get("/v1/conversations/{conversation_id}")
async def ai_conversation(conversation_id: str):
    return await ai_service.conversation(conversation_id)

@app.post("/v1/ai/submit")
async def ai_submit(input: SubmitPromptInput, request: Request):
    from sse_starlette.sse import EventSourceResponse
    import json
    
    async def event_generator():
        async for chunk in ai_service.submit(input):
            yield {"event": "message", "data": json.dumps(chunk.model_dump())}
    
    return EventSourceResponse(event_generator())

@app.post("/v1/conversations/{conversation_id}/stop")
async def ai_stop(conversation_id: str):
    await ai_service.stop(conversation_id)
    return {"status": "stopped"}

@app.post("/v1/intents")
async def ai_intent(text: dict):
    intent = await ai_service.actAsIntent(text.get("text", ""))
    return intent.model_dump() if intent else None

@app.get("/v1/tasks/{task_id}/summary")
async def ai_summarize(task_id: str):
    return {"summary": await ai_service.summarize(task_id)}


# Agents endpoints
@app.get("/v1/agents")
async def agents_list():
    return await agent_service.list()

@app.get("/v1/agents/{agent_id}")
async def agents_get(agent_id: str):
    agent = await agent_service.get(agent_id)
    if not agent:
        return JSONResponse(status_code=404, content={"detail": "Agent not found"})
    return agent

@app.post("/v1/agents")
async def agents_spawn(input: AgentSpawnInput):
    return await agent_service.spawn(input)

@app.delete("/v1/agents/{agent_id}")
async def agents_retire(agent_id: str):
    await agent_service.retire(agent_id)
    return {"status": "retired"}

@app.post("/v1/agents/{agent_id}/pause")
async def agents_pause(agent_id: str):
    await agent_service.pause(agent_id)
    return {"status": "paused"}

@app.post("/v1/agents/{agent_id}/resume")
async def agents_resume(agent_id: str):
    await agent_service.resume(agent_id)
    return {"status": "resumed"}

@app.post("/v1/agents/{agent_id}/boost")
async def agents_boost(agent_id: str):
    await agent_service.boost(agent_id)
    return {"status": "boosted"}

@app.post("/v1/agents/{agent_id}/steer")
async def agents_steer(agent_id: str, guidance: dict):
    await agent_service.steer(agent_id, guidance.get("guidance", ""))
    return {"status": "steered"}

@app.post("/v1/agents/{agent_id}/scopes")
async def agents_scopes(agent_id: str, input: dict):
    if "add" in input:
        await agent_service.grantCapability(agent_id, input["add"])
    elif "remove" in input:
        await agent_service.revokeCapability(agent_id, input["remove"])
    return {"status": "updated"}

@app.get("/v1/agents/{agent_id}/trace")
async def agents_trace(agent_id: str):
    return await agent_service.trace(agent_id)

@app.get("/v1/roles")
async def agents_roles():
    return await agent_service.roles()


# Departments endpoints
@app.get("/v1/departments")
async def departments_list():
    return list(agent_service._departments.values())

@app.get("/v1/departments/{department_id}")
async def departments_get(department_id: str):
    dept = agent_service._departments.get(department_id)
    if not dept:
        return JSONResponse(status_code=404, content={"detail": "Department not found"})
    return dept

@app.post("/v1/departments")
async def departments_create(input: DepartmentCreateInput):
    # Simple implementation
    import uuid
    from datetime import datetime
    dept = {
        "id": f"dept-{uuid.uuid4().hex[:8]}",
        "name": input.name,
        "code": input.code,
        "mission": input.mission,
        "color": input.color,
        "budgetUsd": 0.0,
        "autonomy": 50,
        "createdAt": datetime.utcnow().isoformat(),
        "updatedAt": datetime.utcnow().isoformat()
    }
    agent_service._departments[dept["id"]] = dept
    return dept

@app.patch("/v1/departments/{department_id}")
async def departments_patch(department_id: str, patch: dict):
    if department_id in agent_service._departments:
        dept = agent_service._departments[department_id]
        for k, v in patch.items():
            if k in dept:
                dept[k] = v
        dept["updatedAt"] = datetime.utcnow().isoformat()
        return dept
    return JSONResponse(status_code=404, content={"detail": "Department not found"})

@app.post("/v1/departments/{department_id}/roster")
async def departments_roster(department_id: str):
    agents = [a for a in await agent_service.list() if a.departmentId == department_id]
    return agents


# Tasks endpoints
@app.get("/v1/tasks")
async def tasks_list():
    return await task_service.list()

@app.get("/v1/tasks/{task_id}")
async def tasks_get(task_id: str):
    task = await task_service.get(task_id)
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    return task

@app.post("/v1/tasks")
async def tasks_create(input: TaskCreateInput):
    return await task_service.create(input)

@app.patch("/v1/tasks/{task_id}")
async def tasks_update(task_id: str, input: TaskUpdateInput):
    return await task_service.update(task_id, input)

@app.post("/v1/tasks/{task_id}/approval")
async def tasks_approve(task_id: str, input: dict):
    await task_service.approve(task_id, input.get("approved", False))
    return {"status": "approved" if input.get("approved") else "denied"}

@app.post("/v1/tasks/{task_id}/retry")
async def tasks_retry(task_id: str):
    await task_service.retry(task_id)
    return {"status": "retry"}

@app.post("/v1/tasks/{task_id}/log")
async def tasks_log(task_id: str, input: dict):
    await task_service.log(task_id, input.get("text", ""))
    return {"status": "logged"}

@app.get("/v1/tasks/{task_id}/artifacts")
async def tasks_artifacts(task_id: str):
    return await task_service.artifacts(task_id)


# Projects endpoints
@app.get("/v1/projects")
async def projects_list():
    return await task_service.list_projects()

@app.post("/v1/projects")
async def projects_create(input: ProjectCreateInput):
    return await task_service.create_project(input)

@app.patch("/v1/projects/{project_id}")
async def projects_patch(project_id: str, patch: dict):
    if "status" in patch:
        await task_service.set_status(project_id, patch["status"])
    return await task_service.get(project_id)

@app.post("/v1/projects/{project_id}/milestones/{milestone_id}/toggle")
async def projects_toggle_milestone(project_id: str, milestone_id: str):
    return await task_service.toggle_milestone(project_id, milestone_id)

@app.get("/v1/projects/{project_id}/brief")
async def projects_brief(project_id: str):
    return {"brief": await task_service.brief(project_id)}


# Memory endpoints
@app.get("/v1/memory")
async def memory_list():
    return await memory_service.list()

@app.post("/v1/memory/search")
async def memory_search(input: dict):
    return await memory_service.search(input.get("q", ""), input)

@app.post("/v1/memory")
async def memory_write(input: dict):
    from app.models import WriteMemoryInput
    return await memory_service.write(WriteMemoryInput(**input))

@app.patch("/v1/memory/{memory_id}")
async def memory_update(memory_id: str, patch: dict):
    return await memory_service.update(memory_id, patch)

@app.patch("/v1/memory/{memory_id}/pin")
async def memory_pin(memory_id: str, input: dict):
    await memory_service.pin(memory_id, input.get("pinned", True))
    return {"status": "pinned"}

@app.delete("/v1/memory/{memory_id}")
async def memory_delete(memory_id: str):
    await memory_service.delete(memory_id)
    return {"status": "deleted"}

@app.post("/v1/memory/consolidate")
async def memory_consolidate():
    return await memory_service.consolidate()

@app.get("/v1/memory/decay")
async def memory_decay():
    return await memory_service.decayCurve()

@app.get("/v1/memory/graph")
async def memory_graph():
    return await memory_service.graph()


# Files endpoints
@app.get("/v1/files/tree")
async def files_tree(root: str = "/"):
    return await file_service.tree(root)

@app.get("/v1/files")
async def files_list(dir: str = "/"):
    return await file_service.list(dir)

@app.get("/v1/files/content")
async def files_read(path: str):
    result = await file_service.read(path)
    if not result:
        return JSONResponse(status_code=404, content={"detail": "File not found"})
    return result

@app.post("/v1/files/search")
async def files_search(input: dict):
    return await file_service.search(input.get("q", ""))

@app.post("/v1/files/folder")
async def files_create_folder(input: dict):
    return await file_service.createFolder(input.get("parentPath", "/"), input.get("name", ""))

@app.post("/v1/files/upload")
async def files_upload(input: dict):
    return await file_service.upload(input.get("parentPath", "/"), input.get("files", []))

@app.post("/v1/files/watch")
async def files_watch(input: dict):
    await file_service.watch(input.get("path", ""), input.get("on", True))
    return {"status": "ok"}

@app.post("/v1/files/index")
async def files_index(input: dict):
    await file_service.index(input.get("path", ""), input.get("on", True))
    return {"status": "ok"}

@app.post("/v1/files/reveal")
async def files_reveal(input: dict):
    await file_service.reveal(input.get("path", ""))
    return {"status": "ok"}

@app.post("/v1/files/trash")
async def files_trash(input: dict):
    await file_service.trash(input.get("path", ""))
    return {"status": "trashed"}

@app.post("/v1/files/restore")
async def files_restore(input: dict):
    await file_service.restore(input.get("path", ""))
    return {"status": "restored"}

@app.put("/v1/files/content")
async def files_write(input: dict):
    return await file_service.write(input.get("path", ""), input.get("content", ""))

@app.get("/v1/files/trash")
async def files_trash_list():
    return await file_service.trashList()

@app.get("/v1/files/audit")
async def files_audit():
    return await file_service.audit()


# Knowledge endpoints
@app.get("/v1/knowledge/sources")
async def knowledge_sources():
    return await knowledge_service.sources()

@app.get("/v1/knowledge/stats")
async def knowledge_stats():
    return await knowledge_service.stats()

@app.post("/v1/knowledge/sources")
async def knowledge_add_source(input: KnowledgeSourceInput):
    return await knowledge_service.addSource(input)

@app.post("/v1/knowledge/sources/{source_id}/rebuild")
async def knowledge_rebuild(source_id: str):
    await knowledge_service.rebuild(source_id)
    return {"status": "rebuilding"}

@app.delete("/v1/knowledge/sources/{source_id}")
async def knowledge_remove(source_id: str):
    await knowledge_service.remove(source_id)
    return {"status": "removed"}

@app.post("/v1/knowledge/query")
async def knowledge_query(input: dict):
    return await knowledge_service.query(input.get("text", ""))

@app.get("/v1/knowledge/sources/{source_id}/chunks")
async def knowledge_chunks(source_id: str):
    return await knowledge_service.chunks(source_id)


# Automation endpoints
@app.get("/v1/automations")
async def automations_list():
    return await automation_service.list()

@app.post("/v1/automations")
async def automations_create(input: AutomationCreateInput):
    return await automation_service.create(input)

@app.patch("/v1/automations/{automation_id}")
async def automations_update(automation_id: str, patch: dict):
    return await automation_service.update(automation_id, patch)

@app.post("/v1/automations/{automation_id}/run")
async def automations_run(automation_id: str):
    return await automation_service.run(automation_id)

@app.post("/v1/automations/{automation_id}/duplicate")
async def automations_duplicate(automation_id: str):
    return await automation_service.duplicate(automation_id)

@app.delete("/v1/automations/{automation_id}")
async def automations_remove(automation_id: str):
    await automation_service.remove(automation_id)
    return {"status": "removed"}

@app.get("/v1/automations/{automation_id}/workflow")
async def automations_workflow(automation_id: str):
    return await automation_service.workflowFor(automation_id)


# Browser endpoints
@app.get("/v1/browser/tabs")
async def browser_tabs():
    return await browser_service.tabs()

@app.post("/v1/browser/tabs")
async def browser_open(input: BrowserOpenInput):
    return await browser_service.open(input)

@app.delete("/v1/browser/tabs/{tab_id}")
async def browser_close(tab_id: str):
    await browser_service.close(tab_id)
    return {"status": "closed"}

@app.post("/v1/browser/tabs/{tab_id}/navigate")
async def browser_navigate(tab_id: str, input: BrowserNavigateInput):
    return await browser_service.navigate(input)

@app.post("/v1/browser/tabs/{tab_id}/read")
async def browser_read(tab_id: str):
    return await browser_service.read(tab_id)

@app.post("/v1/browser/tabs/{tab_id}/act")
async def browser_act(tab_id: str, input: BrowserActInput):
    return await browser_service.act(tab_id, input)

@app.get("/v1/browser/history")
async def browser_history():
    return await browser_service.history()

@app.get("/v1/browser/permissions")
async def browser_permissions():
    return await browser_service.permissions()

@app.patch("/v1/browser/permissions/{origin}")
async def browser_set_permission(origin: str, input: BrowserPermissionInput):
    await browser_service.setPermission(origin, input)
    return {"status": "updated"}


# Terminal endpoints
@app.get("/v1/terminal/sessions")
async def terminal_sessions():
    return await terminal_service.sessions()

@app.post("/v1/terminal/sessions")
async def terminal_create(input: TerminalCreateInput):
    return await terminal_service.create(input)

@app.delete("/v1/terminal/sessions/{session_id}")
async def terminal_close(session_id: str):
    await terminal_service.close(session_id)
    return {"status": "closed"}

@app.post("/v1/terminal/sessions/{session_id}/exec")
async def terminal_exec(session_id: str, input: TerminalExecInput):
    return await terminal_service.exec(input, session_id)

@app.get("/v1/terminal/sessions/{session_id}/buffer")
async def terminal_buffer(session_id: str):
    return await terminal_service.buffer(session_id)

@app.get("/v1/terminal/completions")
async def terminal_completions(prefix: str = ""):
    return await terminal_service.completions(prefix)


# System endpoints
@app.get("/v1/system/snapshot")
async def system_snapshot():
    return await system_service.snapshot()

@app.get("/v1/system/processes")
async def system_processes():
    return await system_service.processes()

@app.post("/v1/system/processes/{pid}/kill")
async def system_kill(pid: int):
    await system_service.kill(pid)
    return {"status": "killed"}

@app.get("/v1/integrations")
async def system_integrations():
    return await system_service.integrations()

@app.post("/v1/integrations/{integration_id}/connect")
async def system_connect(integration_id: str):
    return await system_service.connect(integration_id)

@app.post("/v1/integrations/{integration_id}/disconnect")
async def system_disconnect(integration_id: str):
    await system_service.disconnect(integration_id)
    return {"status": "disconnected"}

@app.get("/v1/system/devices")
async def system_devices():
    return await system_service.devices()

@app.post("/v1/system/devices/{device_id}/default")
async def system_set_default_device(device_id: str):
    await system_service.setDefaultDevice(device_id)
    return {"status": "updated"}

@app.post("/v1/system/open-settings")
async def system_open_settings(input: dict):
    await system_service.openSettings(input.get("pane", "general"))
    return {"status": "opened"}

@app.patch("/v1/system/login-item")
async def system_launch_at_login(input: dict):
    await system_service.launchAtLogin(input.get("on", True))
    return {"status": "updated"}

@app.patch("/v1/system/keep-awake")
async def system_keep_awake(input: dict):
    await system_service.setKeepAwake(input.get("on", True))
    return {"status": "updated"}


# Analytics endpoints
@app.get("/v1/analytics/summary")
async def analytics_summary(days: int = 7):
    return await analytics_service.summary(days)

@app.post("/v1/analytics/export")
async def analytics_export():
    return await analytics_service.export()


# Activity endpoints
@app.post("/v1/activity/list")
async def activity_list(input: dict = None):
    return await activity_service.list(input)

@app.post("/v1/activity/export")
async def activity_export(input: dict):
    return await activity_service.export(input.get("format", "json"))


# Notifications endpoints
@app.get("/v1/notifications")
async def notifications_list():
    return await notification_service.list()

@app.post("/v1/notifications/read")
async def notifications_mark_read(input: dict):
    await notification_service.markRead(input.get("ids", []))
    return {"status": "read"}

@app.post("/v1/notifications/read-all")
async def notifications_mark_all_read():
    await notification_service.markAllRead()
    return {"status": "all read"}

@app.delete("/v1/notifications/{notification_id}")
async def notifications_dismiss(notification_id: str):
    await notification_service.dismiss(notification_id)
    return {"status": "dismissed"}

@app.post("/v1/notifications/{notification_id}/snooze")
async def notifications_snooze(notification_id: str, input: dict):
    await notification_service.snooze(notification_id, input.get("minutes", 5))
    return {"status": "snoozed"}

@app.get("/v1/approvals")
async def approvals_list():
    return await notification_service.approvals()

@app.post("/v1/approvals/{request_id}")
async def approvals_respond(request_id: str, input: dict):
    await notification_service.respond(request_id, input.get("approved", False))
    return {"status": "responded"}


# Settings endpoints
@app.get("/v1/settings")
async def settings_get():
    return await settings_service.get()

@app.patch("/v1/settings")
async def settings_patch(input: SettingsPatchInput):
    return await settings_service.patch(input)

@app.post("/v1/settings/reset")
async def settings_reset():
    return await settings_service.reset()

@app.get("/v1/settings/export")
async def settings_export():
    return {"json": await settings_service.export()}

@app.post("/v1/settings/import")
async def settings_import(input: dict):
    return await settings_service.import_config(input.get("json", ""))


# Permissions endpoints
@app.get("/v1/permissions/scopes")
async def permissions_scopes():
    return await permission_service.scopes()

@app.post("/v1/permissions/grant")
async def permissions_grant(input: PermissionGrantInput):
    await permission_service.grant(input.scopeId, input.tiers)
    return {"status": "granted"}

@app.post("/v1/permissions/revoke")
async def permissions_revoke(input: PermissionGrantInput):
    await permission_service.revoke(input.scopeId, input.tiers)
    return {"status": "revoked"}

@app.patch("/v1/agents/{agent_id}/access")
async def permissions_role_access(agent_id: str, input: dict):
    await permission_service.roleAccess(agent_id, input.get("access", "restricted"))
    return {"status": "updated"}

@app.get("/v1/secrets")
async def permissions_secrets():
    return await permission_service.secrets()

@app.post("/v1/secrets/{secret_id}/rotate")
async def permissions_rotate_secret(secret_id: str):
    return await permission_service.rotateSecret(secret_id)

@app.post("/v1/audit/list")
async def permissions_audit(input: dict = None):
    return await permission_service.audit(input)

@app.get("/v1/policy/autonomy")
async def permissions_autonomy():
    return await permission_service.autonomy()

@app.patch("/v1/policy/autonomy")
async def permissions_set_autonomy(input: AutonomyPatchInput):
    return await permission_service.setAutonomy(input)


# Media endpoints
@app.get("/v1/media/state")
async def media_state():
    return await media_service.state()

@app.post("/v1/media/play")
async def media_play():
    await media_service.play()
    return {"status": "playing"}

@app.post("/v1/media/pause")
async def media_pause():
    await media_service.pause()
    return {"status": "paused"}

@app.post("/v1/media/next")
async def media_next():
    await media_service.next()
    return {"status": "next"}

@app.post("/v1/media/prev")
async def media_prev():
    await media_service.prev()
    return {"status": "prev"}

@app.post("/v1/media/seek")
async def media_seek(input: dict):
    await media_service.seek(input.get("positionSec", 0))
    return {"status": "seeked"}

@app.post("/v1/media/volume")
async def media_volume(input: dict):
    await media_service.setVolume(input.get("volume", 0.8))
    return {"status": "updated"}

@app.get("/v1/media/library")
async def media_library():
    return await media_service.library()

@app.post("/v1/media/queue/remove")
async def media_remove_from_queue(input: dict):
    await media_service.removeFromQueue(input.get("index", 0))
    return {"status": "removed"}

@app.post("/v1/media/library/{media_id}/toggle")
async def media_toggle_library(media_id: str):
    await media_service.toggleLibraryItem(media_id)
    return {"status": "toggled"}

@app.post("/v1/media/mute")
async def media_mute():
    await media_service.toggleMute()
    return {"status": "toggled"}

@app.post("/v1/media/shuffle")
async def media_shuffle(input: dict):
    await media_service.setShuffle(input.get("on", True))
    return {"status": "updated"}

@app.post("/v1/media/repeat")
async def media_repeat():
    mode = await media_service.cycleRepeat()
    return {"repeat": mode}

@app.post("/v1/media/device")
async def media_device(input: dict):
    await media_service.setDevice(input.get("device", ""))
    return {"status": "updated"}

@app.post("/v1/media/enqueue")
async def media_enqueue(input: dict):
    await media_service.enqueue(input.get("trackIds", []))
    return {"status": "enqueued"}


# Voice endpoints
@app.get("/v1/voice/profiles")
async def voice_profiles():
    return await voice_service.profiles()

@app.get("/v1/voice/config")
async def voice_config():
    return await voice_service.config()

@app.patch("/v1/voice/config")
async def voice_configure(input: VoiceConfigPatch):
    await voice_service.configure(input.model_dump(exclude_none=True))
    return {"status": "updated"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8420, reload=True)