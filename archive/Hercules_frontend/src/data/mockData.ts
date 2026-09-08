import type { HerculesSnapshot } from "../types/hercules";

export const mockSnapshot: HerculesSnapshot = {
  coreState: "idle",
  agents: [
    { id: "research", name: "Research", department: "Intelligence", status: "active", progress: 72, currentTask: "Mapping sources" },
    { id: "engineering", name: "Engineering", department: "Build", status: "active", progress: 44, currentTask: "Preparing interface" },
    { id: "browser", name: "Browser", department: "Operations", status: "queued", currentTask: "Awaiting authorization" },
    { id: "creative", name: "Creative", department: "Studio", status: "idle" }
  ],
  workflow: {
    id: "hercules-foundation",
    title: "Building Hercules frontend foundation",
    progress: 67,
    steps: [
      { id: "research", label: "Research", status: "complete" },
      { id: "architecture", label: "Architecture", status: "complete" },
      { id: "development", label: "Development", status: "active" },
      { id: "testing", label: "Testing", status: "pending" }
    ]
  },
  metrics: [
    { label: "CPU", value: "42%", level: 42 },
    { label: "Memory", value: "61%", level: 61 },
    { label: "Storage", value: "54%", level: 54 },
    { label: "Network", value: "28.4 MB/s", level: 28 }
  ]
};
