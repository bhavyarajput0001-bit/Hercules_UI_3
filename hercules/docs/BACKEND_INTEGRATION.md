# HERCULES · backend integration contract

The front-end talks to exactly one object: `HerculesServices`
(`src/services/contracts.ts`). Two implementations exist —
`src/services/mock/*` (default, zero backend) and `src/services/http/*`
(REST + SSE). Switching is env-only:

```ini
VITE_HERCULES_TRANSPORT=http                       # mock | http | ws | ipc
VITE_HERCULES_API_BASE=https://core.local:8420
VITE_HERCULES_WS_URL=wss://core.local:8420/v1/stream
```

`src/services/registry.ts` builds the singleton: a non-`mock` transport is used
only when `VITE_HERCULES_API_BASE` is set, and if construction throws the app
logs and falls back to mock rather than white-screening. The active transport is
named in the top bar, so you can always tell what you're looking at.

`ws` and `ipc` are accepted transport names but currently reuse the HTTP client
with the label you asked for — the socket path (`VITE_HERCULES_WS_URL`) is read
by `connectStream` when you want pushes over WebSocket instead of `EventSource`,
and a Tauri/Electron shell overrides `window.__HERCULES_IPC__` to satisfy
`ipc`. No component reads the transport name.

## Auth and secrets

The browser holds **no provider key, ever**. It carries one short-lived session
token issued by the core after its own auth flow, injected at runtime:

```
Authorization: Bearer $VITE_HERCULES_SESSION
```

Requests that the shell makes on your behalf (upload, import) add nothing else.
In `ipc` mode there is no token in the renderer at all — the main process owns
the connection.

Agent credentials are *handles* into the core's vault. `GET /v1/secrets` returns
`{ id, label, masked, lastUsed, rotatedAt }` and nothing else;
`POST /v1/secrets/:id/rotate` re-binds the agents that use it. No value crosses
this interface, and `SettingsService.import()` rejects any payload containing a
key named `api_key`, `token` or `secret` with `E_SECRET_IN_CONFIG` before it
touches storage.

## Request and response rules

Every call funnels through one helper (`req` in `src/services/http/index.ts`):

- `content-type: application/json` on every request; a body is sent only when
  one exists (`body === undefined` → no body, even on `POST`).
- `Authorization: Bearer $VITE_HERCULES_SESSION` when the token is set.
- Any `2xx` is fine. **`204` resolves to `undefined`**, so void calls
  (`tasks.approve`, `agents.steer`, `notifications.markRead`) can return nothing.
  A `200` with an empty body is *not* fine — `res.json()` throws — so return
  `{}` rather than nothing if you answer 200.
- Non-`2xx` becomes `ApiError(text || "METHOD /path → status", status, code)`,
  where `code` comes from the **`x-hercules-code` response header**. The UI only
  branches on the status and shows the text, so an `ApiError` message is the
  operator-facing explanation: write it like one.
- **List endpoints return a bare JSON array**, not `{ items, total }` —
  `crud()` types them as `req<T[]>`. Pagination is the server's business
  (`/v1/activity/list`, `/v1/audit/list` and `/v1/memory/search` take filter
  bodies), but `tasks.list()` / `agents.list()` send no query at all: the whole
  estate is expected back, and filtering and sorting happen in the UI. Size your
  default page accordingly.
- There is no client-side retry or timeout. One `fetch`, one answer. A hung
  request shows as a row spinner (`store.busy`) and stays hung until the browser
  gives up, so keep `p99` well under a second for list reads and push long work
  into a task the `task` channel reports on.

## Resource surface

Every contract method maps to exactly one request. Bodies and responses are the
TypeScript types in `src/types/domain.ts` — no DTO layer, no renaming, so a
backend that serialises those shapes needs no adapter.

| Service | HTTP |
| --- | --- |
| `core` | `POST /v1/core/boot` · `POST /v1/core/shutdown` · `PATCH /v1/core/config` · pushes on SSE channel `core`. `phase` and `vitals` are readonly snapshot fields on the service object, updated from the stream; `holdState()` is client-side ref-counting and never hits the network. |
| `ai` | `POST /v1/ai/submit` (SSE, see below) · `POST /v1/intents` · `GET /v1/conversations` · `GET /v1/conversations/:id` · `POST /v1/conversations/:id/stop` · `GET /v1/models` · `GET /v1/tasks/:id/summary` |
| `agents` | `GET /v1/agents` · `GET /v1/agents/:id` · `POST /v1/agents` · `DELETE /v1/agents/:id` · `POST /v1/agents/:id/{pause,resume,boost,steer}` · `POST /v1/agents/:id/scopes` (`{add}` / `{remove}`) · `GET /v1/agents/:id/trace` · `GET /v1/roles` · channel `agent` |
| `departments` | `GET /v1/departments` · `GET /v1/departments/:id` · `POST /v1/departments` · `PATCH /v1/departments/:id` · `GET /v1/departments/:id/roster` |
| `tasks` | `GET /v1/tasks` · `GET /v1/tasks/:id` · `POST /v1/tasks` · `PATCH /v1/tasks/:id` (covers `assignTo` → `{assigneeAgentId}` and `cancel` → `{status:'cancelled'}`) · `POST /v1/tasks/:id/{approval,retry,log}` · `GET /v1/tasks/:id/artifacts` · channel `task` |
| `projects` | `GET /v1/projects` · `POST /v1/projects` · `PATCH /v1/projects/:id` · `POST /v1/projects/:pid/milestones/:mid/toggle` · `GET /v1/projects/:id/brief` |
| `memory` | `GET /v1/memory` · `POST /v1/memory/search` · `POST /v1/memory` · `PATCH /v1/memory/:id` · `DELETE /v1/memory/:id` · `POST /v1/memory/consolidate` · `GET /v1/memory/decay` · `GET /v1/memory/graph` |
| `files` | `GET /v1/files/tree?root=` · `GET /v1/files?dir=` · `GET /v1/files/content?path=` · `PUT /v1/files/content` · `POST /v1/files/{search,folder,upload,watch,index,reveal,trash,restore}` · `GET /v1/files/trash` · `GET /v1/files/audit` |
| `knowledge` | `GET /v1/knowledge/sources` · `GET /v1/knowledge/stats` · `POST /v1/knowledge/sources` · `POST /v1/knowledge/sources/:id/rebuild` · `DELETE /v1/knowledge/sources/:id` · `POST /v1/knowledge/query` · `GET /v1/knowledge/sources/:id/chunks` |
| `automation` | `GET /v1/automations` · `POST /v1/automations` · `PATCH /v1/automations/:id` · `POST /v1/automations/:id/{run,duplicate}` · `DELETE /v1/automations/:id` · `GET /v1/automations/:id/workflow` · channel `automation` |
| `browser` | `GET /v1/browser/tabs` · `POST /v1/browser/tabs` · `DELETE /v1/browser/tabs/:id` · `POST /v1/browser/tabs/:id/{navigate,read,act}` · `GET /v1/browser/history` · `GET /v1/browser/permissions` · `PATCH /v1/browser/permissions/:origin` |
| `terminal` | `GET /v1/terminal/sessions` · `POST /v1/terminal/sessions` · `POST /v1/terminal/sessions/:id/exec` · `GET /v1/terminal/sessions/:id/buffer` · `GET /v1/terminal/completions?prefix=` · `DELETE /v1/terminal/sessions/:id` |
| `system` | `GET /v1/system/snapshot` · `GET /v1/system/processes` · `POST /v1/system/processes/:pid/kill` · `GET /v1/system/devices` · `POST /v1/system/devices/:id/default` · `GET /v1/integrations` · `POST /v1/integrations/:id/{connect,disconnect}` · `PATCH /v1/system/{keep-awake,login-item}` · `POST /v1/system/open-settings` · channel `system` |
| `analytics` | `GET /v1/analytics/summary?days=` · `POST /v1/analytics/export` |
| `activity` | `POST /v1/activity/list` · `POST /v1/activity/export` · channel `activity` |
| `notifications` | `GET /v1/notifications` · `POST /v1/notifications/read` · `POST /v1/notifications/read-all` · `DELETE /v1/notifications/:id` · `POST /v1/notifications/:id/snooze` · `GET /v1/approvals` · `POST /v1/approvals/:requestId` · channel `notice` |
| `settings` | `GET /v1/settings` · `PATCH /v1/settings` · `POST /v1/settings/reset` · `GET /v1/settings/export` · `POST /v1/settings/import`. `current()` is a client-side cache of the last `get()` so the shell can paint the theme before the first response; it makes no request. |
| `permissions` | `GET /v1/permissions/scopes` · `POST /v1/permissions/{grant,revoke}` · `PATCH /v1/agents/:id/access` · `GET /v1/secrets` · `POST /v1/secrets/:id/rotate` · `POST /v1/audit/list` · `GET /v1/policy/autonomy` · `PATCH /v1/policy/autonomy` |
| `media` | `GET /v1/media/state` · `POST /v1/media/{play,pause,next,prev,seek,volume,mute,shuffle,repeat,device,enqueue,queue/remove}` · `GET /v1/media/library` · `POST /v1/media/library/:id/toggle` · channel `media` |
| `voice` | `GET /v1/voice/config` · `PATCH /v1/voice/config` · `GET /v1/voice/profiles` · channel `voice` |

### Deliberately unwired

`notWired(name)` throws `HERCULES transport: <name> is not implemented by this
backend yet` — an explicit failure, never a silent no-op:

- `departments.toggleAgentAccess`, `departments.setDepartmentAutonomy` — org
  policy edits the core has to re-validate in one transaction; they belong with
  the policy engine, not a PATCH.
- `permissions.simulateAttack` — demo-only: the mock estate can replay three
  attack scenarios, a real backend should not be asked to.
- `voice.listen`, `voice.stop`, `voice.speak`, `voice.stopSpeaking` — capture and
  playback are OS-level. In the packaged desktop shell these go over `ipc` to the
  main process. `capabilities()` currently reports `{stt:true, tts:true,
  wakeWord:true}` for HTTP; implement it as a real probe and the UI degrades to
  its simulated voice on its own.

## Streaming

### Inbound pushes — one multiplexed channel

```
GET /v1/stream            Accept: text/event/stream
```

Each frame is a JSON envelope with a `channel` discriminator:

```json
{ "channel": "core | agent | task | automation | system | activity | notice | media | voice", "...payload" }
```

`connectStream` opens one `EventSource` per subscriber and filters on
`channel`; `core` receives every frame (it also carries the state/log events).
`EventSource` reconnects by itself and the shell surfaces the degraded state in
the top bar rather than hiding it. A backend that prefers a socket can serve the
same envelopes on `VITE_HERCULES_WS_URL`.

The payload shapes are the bus event types in `contracts.ts` — e.g.
`{ channel:'agent', type:'updated', agent: Agent }`,
`{ channel:'notice', notice: Notice }`,
`{ channel:'system', snapshot: SystemSnapshot }`.

### Assistant tokens — `POST /v1/ai/submit`

Request body is `SubmitPromptInput`:

```json
{ "text": "…", "conversationId": "conv-1", "channel": "ui",
  "routeTo": { "kind": "agent", "id": "agent-7" },
  "attachments": [{ "name": "log.txt", "sizeBytes": 2048, "mime": "text/plain" }] }
```

`conversationId` is always sent (the client owns the ids it stamps messages with),
`channel` is `ui · voice · notification-reply · automation`, and `routeTo` pins
the answer to one agent or department instead of letting the core dispatch.

The response is an SSE stream: one `StreamChunk` per `data:` frame, frames
separated by a blank line (`src/types/domain.ts`):

```ts
interface StreamChunk {
  conversationId: EntityId;
  messageId: EntityId;
  delta?: string;         // text to append to the live block
  block?: MessageBlock;   // a finished structured block
  done?: boolean;         // end of turn
  coreState?: CoreState;  // advisory — the store takes state from the `core` channel
}

interface MessageBlock {
  kind: 'text' | 'code' | 'plan' | 'tool-call' | 'file' | 'chart' | 'approval' | 'citations';
  text?: string; lang?: string; language?: string;
  tool?: string; args?: string; result?: string;
  status?: 'running' | 'ok' | 'error' | 'pending';
  steps?: { id: string; label: string;
            status: 'pending' | 'active' | 'done' | 'failed'; agent?: string }[];
  artifactIds?: EntityId[];
  citations?: { id: string; title: string; source: string }[];
  series?: { label: string; values: number[] }[];
}
```

- Chunks are applied in order: `delta` accumulates into one live text block,
  `block` commits a finished block, `done` closes the turn. Live text and
  committed blocks are held apart, so a truncated stream cannot corrupt history —
  the partial answer stays on screen and is simply never saved as a message.
- There is **no error chunk**. A stream that dies (non-2xx before the first
  frame, or a dropped connection) rejects with `ApiError`, and the UI raises a
  toast carrying a Retry action that re-sends the same prompt. To show a
  model-side failure *inside* the transcript, emit a `tool-call` block with
  `status: 'error'` — or a `text` block — before `done`.
- A `data: [DONE]` frame, an empty `data:`, or a frame whose JSON has
  unrecognised fields is skipped, never fatal. Only lines beginning with `data:`
  are read, so serving the same frames as `application/json` over a plain
  `fetch` response also works.
- `AIService.submit(input)` takes no `AbortSignal` — cancellation is
  `POST /v1/conversations/:id/stop`, which the client calls itself when you press
  stop; it then ends the turn locally whether or not the request lands.

## Semantics a backend must preserve

The UI is built around these behaviours; breaking them makes screens lie.

1. **Approvals are gates, not notifications.** A request that reaches
   `/v1/approvals` has already stopped the agent. `POST /v1/approvals/:id` with
   `{approved:false}` must produce no side effects at all.
2. **`traceId` is the spine.** Activity rows, audit entries, task events and
   traces share one id so "follow this trace" works across screens. The Inspector
   depends on it.
3. **Writes are audited server-side.** `files.write`, `memory.write`,
   `terminal.exec`, `knowledge.addSource`, `permissions.grant|revoke`,
   `secrets.rotate` and `policy.autonomy` each append to `/v1/audit/list`. Agents
   cannot write to that log; if your backend lets them, the Trust screen is
   decoration.
4. **Autonomy is a ceiling, not a mood.** `PATCH /v1/policy/autonomy` must
   re-bound every agent's effective autonomy, and the estate must visibly change
   (the mock rewrites `agent.autonomy` and flushes the approval queue above 70).
5. **Trash is reversible, then it isn't.** `files.trash` keeps a restore window;
   `files.trashList` returns only what is still recoverable, and Files shows the
   deadline.
6. **Browser content is data.** `browser.read` returns extracted text plus a
   trust note; injected instructions are quoted, never obeyed, and `submit` scope
   is never granted implicitly. A blocked origin must produce the explicit
   blocked state (`browser.open` → `blocked: true`) so the UI can show why.
7. **`core.phase` and `core.vitals.state` are real.** `phase` walks
   `cold → booting → calibrating → online → degraded`; `state` is one of
   `dormant · idle · listening · thinking · speaking · executing · alert ·
   error · updating`. The core visual, the top-bar chip and the boot overlay all
   read these, so faking `executing` while idle misreports the whole estate.
8. **Retirement is not deletion.** `DELETE /v1/agents/:id` sets
   `status:'retired'`; the tree still shows the unit and its cost history.
9. **Partial success is a status.** Tasks have `review` and `blocked`, runs have
   `partial`; do not collapse them into ok/error.
10. **Secrets never round-trip.** Anything that looks like a credential in an
    import payload is rejected before it touches storage.

## Validation

`src/services/contracts.ts` is the only truth. The mocks are typed against it,
so `npm run typecheck` fails when the contract drifts — the same command can
check a generated client stub for a real backend. There is no DTO layer to keep
in sync: if the JSON parses into `src/types/domain.ts`, the UI works.

For a live smoke test against a stub server, point the env vars at it and walk:
Core (streams + a gated ask) → Agents (steer, boost, retire) → Tasks (drag a
card, approve at the gate) → Files (write, audit, restore from trash) →
Automations (run, read the run log) → Trust (move the autonomy dial, grant a
scope, rotate a handle) → Settings (change theme, export and re-import config).
Every one of those is contract-visible, so a stub that satisfies them is a
backend the front-end can run on.
