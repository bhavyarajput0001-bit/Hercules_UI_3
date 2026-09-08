import { FormEvent, useEffect, useState } from "react";
import type { CoreState, HerculesSnapshot } from "./types/hercules";
import { mockApi } from "./services/mockApi";

const navigation = ["Home", "Command", "Chat", "Agents", "Departments", "Tasks", "Projects", "Memory", "Files", "Knowledge", "Automations", "System", "Analytics"];
const stateCopy: Record<CoreState, string> = {
  idle: "Standing by.", listening: "Listening.", thinking: "Thinking.", executing: "Executing workflow.",
  success: "Operation completed.", warning: "Awaiting authorization.", error: "Attention required.", offline: "Core offline."
};

export default function App() {
  const [snapshot, setSnapshot] = useState<HerculesSnapshot>();
  const [activeModule, setActiveModule] = useState("Home");
  const [command, setCommand] = useState("");
  const [coreState, setCoreState] = useState<CoreState>("idle");

  useEffect(() => { mockApi.getSnapshot().then((data) => { setSnapshot(data); setCoreState(data.coreState); }); }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!command.trim()) return;
    setCoreState("thinking");
    await mockApi.submitCommand(command);
    setCommand("");
    setCoreState("success");
    window.setTimeout(() => setCoreState("idle"), 1300);
  }

  if (!snapshot) return <main className="loading">Initializing HERCULES…</main>;

  return <div className="app-shell" data-state={coreState}>
    <aside className="sidebar">
      <div className="wordmark"><span className="mark">✦</span> HERCULES <small>AI</small></div>
      <p className="system-online"><i />SYSTEM ONLINE</p>
      <nav>{navigation.map((item) => <button key={item} className={activeModule === item ? "active" : ""} onClick={() => setActiveModule(item)}><span>◌</span>{item}</button>)}</nav>
      <button className="settings" onClick={() => setActiveModule("Settings")}>⌘ Settings</button>
    </aside>
    <main className="workspace">
      <header><div><span className="eyebrow">{activeModule === "Home" ? "CORE" : "MODULE"}</span><h1>{activeModule === "Home" ? "Hercules Command Center" : activeModule}</h1></div><div className="top-status"><span>● Secure</span><time>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time><button>BR</button></div></header>
      {activeModule === "Home" ? <section className="home-grid">
        <section className="core-panel"><div className="core-wrap"><div className="orb orbit-one" /><div className="orb orbit-two" /><div className="core"><span>H</span></div></div><p className="core-state">{stateCopy[coreState]}</p><p className="core-hint">Hercules core is ready for your next instruction.</p>
          <form className="command-bar" onSubmit={handleSubmit}><span>✦</span><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Ask Hercules anything…" aria-label="Command" /><button type="submit">Send</button></form><p className="shortcut">⌘ K to open global command</p>
        </section>
        <aside className="right-rail"><section className="panel"><p className="panel-label">ACTIVE OPERATIONS</p>{snapshot.agents.map((agent) => <div className="agent" key={agent.id}><i className={agent.status} /><div><strong>{agent.name}</strong><small>{agent.currentTask ?? agent.status}</small></div><em>{agent.progress ? `${agent.progress}%` : agent.status}</em></div>)}</section>
          <section className="panel"><p className="panel-label">CURRENT WORKFLOW</p><strong className="workflow-title">{snapshot.workflow.title}</strong><div className="progress"><span style={{ width: `${snapshot.workflow.progress}%` }} /></div><p className="progress-text">{snapshot.workflow.progress}% complete</p>{snapshot.workflow.steps.map((step) => <p className={`step ${step.status}`} key={step.id}><b>{step.status === "complete" ? "✓" : step.status === "active" ? "●" : "○"}</b>{step.label}</p>)}</section></aside>
      </section> : <section className="module-placeholder"><span>HERCULES / {activeModule.toUpperCase()}</span><h2>{activeModule} foundation</h2><p>This module is reserved for its production workflow. Connect your backend through the service interfaces in <code>src/services</code>.</p></section>}
      <footer className="metrics">{snapshot.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><i><b style={{ width: `${metric.level}%` }} /></i></div>)}<div className="connection">◉ CONNECTED</div></footer>
    </main>
  </div>;
}
