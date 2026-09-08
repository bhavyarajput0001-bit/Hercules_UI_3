export type CoreState = "idle" | "listening" | "thinking" | "executing" | "success" | "warning" | "error" | "offline";
export type AgentStatus = "active" | "idle" | "queued" | "completed" | "failed";

export interface Agent {
  id: string;
  name: string;
  department: string;
  status: AgentStatus;
  progress?: number;
  currentTask?: string;
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: "complete" | "active" | "pending";
}

export interface Workflow {
  id: string;
  title: string;
  progress: number;
  steps: WorkflowStep[];
}

export interface SystemMetric {
  label: string;
  value: string;
  level: number;
}

export interface HerculesSnapshot {
  coreState: CoreState;
  agents: Agent[];
  workflow: Workflow;
  metrics: SystemMetric[];
}
