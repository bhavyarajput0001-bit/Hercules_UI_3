'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, Users, DollarSign, Clock, Filter, Download, Upload, RefreshCw, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useAppStore } from '@/store';
import clsx from 'clsx';

const metricOptions = ['overview', 'performance', 'usage', 'agents', 'tasks', 'departments', 'projects', 'custom'] as const;
const timeRanges = ['1h', '6h', '24h', '7d', '30d', '90d', 'custom'] as const;

export function AnalyticsScreen() {
  const [selectedMetric, setSelectedMetric] = useState<'overview' | 'performance' | 'usage' | 'agents' | 'tasks' | 'departments' | 'projects' | 'custom'>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d' | '30d' | '90d' | 'custom'>('7d');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);

  const kpis = useMemo(() => ({
    totalUsers: 1247,
    activeUsers: 892,
    retentionRate: 71.5,
    avgSessionTime: '14m 32s',
    tasksCompleted: 15420,
    tasksPending: 342,
    automationRuns: 8934,
    successRate: 94.2,
    cpuAvg: 34.5,
    memoryAvg: 52.1,
    diskUsage: 62.3,
    networkThroughput: '1.2 TB',
  }), []);

  const chartData = useMemo(() => ({
    performance: Array.from({ length: 24 }, (_, i) => ({ hour: i, cpu: 30 + Math.random() * 20, memory: 45 + Math.random() * 15, disk: 55 + Math.random() * 10 })),
    usage: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, users: 800 + Math.random() * 300, sessions: 1200 + Math.random() * 500, actions: 5000 + Math.random() * 3000 })),
    agents: Array.from({ length: 10 }, (_, i) => ({ name: `Agent ${i + 1}`, tasks: Math.floor(Math.random() * 100), success: 85 + Math.random() * 15, avgTime: 2000 + Math.random() * 5000 })),
    departments: Array.from({ length: 8 }, (_, i) => ({ name: ['Engineering', 'Research', 'Operations', 'Security', 'Data', 'DevOps', 'Product', 'Design'][i], efficiency: 70 + Math.random() * 25, throughput: Math.floor(Math.random() * 500) })),
  }), []);

  return (
    <div className="analytics-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div><h1 className="font-display font-bold text-heading-lg text-hercules-text">Analytics</h1><p className="text-body-sm text-hercules-text-muted">Insights & performance metrics</p></div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><Download className="w-4 h-4" /> Export</motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><input type="text" placeholder="Search metrics..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary" /></div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value as typeof selectedMetric)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{metricOptions.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}</select>
            <select value={timeRange} onChange={e => setTimeRange(e.target.value as typeof timeRange)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{timeRanges.map(t => <option key={t} value={t}>{t === '1h' ? 'Last Hour' : t === '6h' ? 'Last 6 Hours' : t === '24h' ? 'Last 24 Hours' : t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : t === '90d' ? 'Last 90 Days' : 'Custom Range'}</option>)}</select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4" role="status" aria-label="Key Performance Indicators">
          <KPICard label="Total Users" value={kpis.totalUsers} icon=Users trend="+12%" trendUp />
          <KPICard label="Active Users" value={kpis.activeUsers} icon=UserCheck trend="+5%" trendUp />
          <KPICard label="Retention" value={`${kpis.retentionRate}%`} icon=TrendingUp trend="+2.1%" trendUp />
          <KPICard label="Avg Session" value={kpis.avgSessionTime} icon=Clock trend="-1m" trendDown />
          <KPICard label="Tasks Done" value={kpis.tasksCompleted.toLocaleString()} icon=CheckCircle2 trend="+342" trendUp />
          <KPICard label="Pending" value={kpis.tasksPending} icon=Clock trend="-12" trendUp />
          <KPICard label="Automations" value={kpis.automationRuns.toLocaleString()} icon=Zap trend="+89" trendUp />
          <KPICard label="Success Rate" value={`${kpis.successRate}%`} icon=Target trend="+0.5%" trendUp />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          {selectedMetric === 'overview' && <OverviewCharts kpis={kpis} chartData={chartData} />}
          {selectedMetric === 'performance' && <PerformanceCharts chartData={chartData} />}
          {selectedMetric === 'usage' && <UsageCharts chartData={chartData} />}
          {selectedMetric === 'agents' && <AgentCharts chartData={chartData} />}
          {selectedMetric === 'departments' && <DepartmentCharts chartData={chartData} />}
          {selectedMetric === 'tasks' && <TaskCharts />}
          {selectedMetric === 'projects' && <ProjectCharts />}
          {selectedMetric === 'custom' && <CustomCharts />}
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon, trend, trendUp }: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }>; trend?: string; trendUp?: boolean }) {
  return <motion.div whileHover={{ y: -2 }} className="glass p-4 rounded-xl border border-hercules-border/50"><div className="flex items-start justify-between"><div className="w-10 h-10 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><Icon className="w-5 h-5 text-hercules-primary" /></div>{trend && <span className={clsx('badge badge-sm', trendUp ? 'badge-success' : 'badge-error')}>{trend}</span>}</div><p className="text-caption text-hercules-text-dim mt-3">{label}</p><p className="text-heading-md font-bold text-hercules-text mt-1">{value}</p></motion.div>;
}

function OverviewCharts({ kpis, chartData }: { kpis: any; chartData: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Resource Utilization (24h)</h3>
        <div className="h-64"><AreaChart data={chartData.performance} xKey="hour" yKeys={['cpu', 'memory', 'disk']} colors={['var(--hercules-primary)', 'var(--hercules-info)', 'var(--hercules-warning)']} labels={['CPU %', 'Memory %', 'Disk %']} /></div>
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">User Activity (30d)</h3>
        <div className="h-64"><BarChart data={chartData.usage} xKey="day" yKeys={['users', 'sessions']} colors={['var(--hercules-primary)', 'var(--hercules-success)']} labels={['Users', 'Sessions']} /></div>
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Top Agents by Performance</h3>
        <AgentPerformanceTable data={chartData.agents} />
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Department Efficiency</h3>
        <DepartmentEfficiencyChart data={chartData.departments} />
      </div>
    </div>
  );
}

function PerformanceCharts({ chartData }: { chartData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">CPU & Memory Timeline</h3><div className="h-80"><AreaChart data={chartData.performance} xKey="hour" yKeys={['cpu', 'memory']} colors={['var(--hercules-primary)', 'var(--hercules-info)']} labels={['CPU %', 'Memory %']} /></div></div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Disk I/O</h3><div className="h-80"><LineChart data={chartData.performance} xKey="hour" yKeys={['disk']} colors={['var(--hercules-warning)']} labels={['Disk %']} /></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Avg CPU" value="34.5%" icon=Cpu color="text-hercules-primary" />
        <StatBox label="Peak CPU" value="78.2%" icon=TrendingUp color="text-hercules-warning" />
        <StatBox label="Avg Memory" value="52.1%" icon=MemoryStick color="text-hercules-info" />
      </div>
    </div>
  );
}

function UsageCharts({ chartData }: { chartData: any }) {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Daily Active Users</h3><div className="h-80"><AreaChart data={chartData.usage} xKey="day" yKeys={['users']} colors={['var(--hercules-primary)']} labels={['Users']} fill /></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Sessions vs Actions</h3><div className="h-64"><BarChart data={chartData.usage} xKey="day" yKeys={['sessions', 'actions']} colors={['var(--hercules-success)', 'var(--hercules-warning)']} labels={['Sessions', 'Actions']} /></div></div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">User Retention Cohort</h3><div className="h-64"><RetentionHeatmap /></div></div>
      </div>
    </div>
  );
}

function AgentCharts({ chartData }: { chartData: any }) {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Agent Task Distribution</h3><div className="h-64"><BarChart data={chartData.agents} xKey="name" yKeys={['tasks']} colors={['var(--hercules-primary)']} labels={['Tasks']} horizontal /></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Success Rate by Agent</h3><div className="h-64"><BarChart data={chartData.agents} xKey="name" yKeys={['success']} colors={['var(--hercules-success)']} labels={['Success %']} horizontal /></div></div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Avg Execution Time</h3><div className="h-64"><BarChart data={chartData.agents} xKey="name" yKeys={['avgTime']} colors={['var(--hercules-warning)']} labels={['Time (ms)']} horizontal /></div></div>
      </div>
    </div>
  );
}

function DepartmentCharts({ chartData }: { chartData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Efficiency Scores</h3><div className="h-64"><BarChart data={chartData.departments} xKey="name" yKeys={['efficiency']} colors={['var(--hercules-primary)']} labels={['Efficiency %']} horizontal /></div></div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Task Throughput</h3><div className="h-64"><BarChart data={chartData.departments} xKey="name" yKeys={['throughput']} colors={['var(--hercules-success)']} labels={['Tasks/Day']} horizontal /></div></div>
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6"><h3 className="font-medium text-body text-hercules-text mb-4">Department Comparison</h3><div className="h-64"><RadarChart data={chartData.departments} /></div></div>
    </div>
  );
}

function TaskCharts() {
  return <div className="glass rounded-xl border border-hercules-border/50 p-6 text-center py-12"><BarChart3 className="w-16 h-16 mx-auto text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">Task Analytics</h3><p className="text-body-sm text-hercules-text-muted">Detailed task analytics coming soon</p></div>;
}
function ProjectCharts() {
  return <div className="glass rounded-xl border border-hercules-border/50 p-6 text-center py-12"><BarChart3 className="w-16 h-16 mx-auto text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">Project Analytics</h3><p className="text-body-sm text-hercules-text-muted">Detailed project analytics coming soon</p></div>;
}
function CustomCharts() {
  return <div className="glass rounded-xl border border-hercules-border/50 p-6 text-center py-12"><BarChart3 className="w-16 h-16 mx-auto text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">Custom Dashboards</h3><p className="text-body-sm text-hercules-text-muted">Create custom analytics dashboards</p></div>;
}

function AreaChart({ data, xKey, yKeys, colors, labels, fill }: { data: any[]; xKey: string; yKeys: string[]; colors: string[]; labels: string[]; fill?: boolean }) {
  return <div className="relative h-full"><svg className="w-full h-full" viewBox="0 0 500 300"><defs>{yKeys.map((key, i) => <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors[i]} stopOpacity={fill ? 0.3 : 0} /><stop offset="100%" stopColor={colors[i]} stopOpacity={0} /></linearGradient>)}</defs>{yKeys.map((key, i) => <path d={data.map((d, idx) => `${idx * (500 / (data.length - 1))},${300 - d[key] * 2.5}`).join(' ')} fill={fill ? `url(#grad-${key})` : 'none'} stroke={colors[i]} strokeWidth="2" />)}<g>{data.map((d, idx) => <text key={idx} x={idx * (500 / (data.length - 1))} y={320} className="text-[10px] fill-current text-hercules-text-dim text-anchor-middle">{idx % 2 === 0 ? d[xKey] : ''}</text>)}</g></svg></div>;
}
function BarChart({ data, xKey, yKeys, colors, labels, horizontal }: { data: any[]; xKey: string; yKeys: string[]; colors: string[]; labels: string[]; horizontal?: boolean }) {
  const maxVal = Math.max(...data.flatMap(d => yKeys.map(k => d[k])));
  return <div className="relative h-full"><svg className="w-full h-full" viewBox={horizontal ? "0 0 300 500" : "0 0 500 300"}>{data.map((d, i) => yKeys.map((key, k) => <rect key={`${i}-${k}`} x={horizontal ? 50 : i * (500 / data.length) + 20 + k * 15} y={horizontal ? i * (500 / data.length) + 20 : 300 - d[key] / maxVal * 250} width={horizontal ? d[key] / maxVal * 250 : 10} height={horizontal ? 20 : d[key] / maxVal * 250} fill={colors[k]} rx={2} />))}</svg></div>;
}
function LineChart({ data, xKey, yKeys, colors, labels }: { data: any[]; xKey: string; yKeys: string[]; colors: string[]; labels: string[] }) {
  return <div className="relative h-full"><svg className="w-full h-full" viewBox="0 0 500 300">{yKeys.map((key, i) => <path d={data.map((d, idx) => `${idx * (500 / (data.length - 1))},${300 - d[key] * 2.5}`).join(' ')} fill="none" stroke={colors[i]} strokeWidth="2" />)}</svg></div>;
}
function RetentionHeatmap() { return <div className="relative h-full"><svg className="w-full h-full" viewBox="0 0 500 300">{Array.from({ length: 12 }, (_, i) => Array.from({ length: 10 }, (_, j) => <rect key={`${i}-${j}`} x={i * 40} y={j * 28} width={35} height={23} fill={`var(--hercules-${['primary', 'success', 'warning', 'error'][Math.floor(Math.random() * 4)]})`} opacity={0.3 + Math.random() * 0.7} rx={2} />))}</svg></div>; }
function DepartmentEfficiencyChart({ data }: { data: any[] }) { return <div className="relative h-full"><svg className="w-full h-full" viewBox="0 0 500 300">{data.map((d, i) => <circle key={i} cx={i * 50 + 40} cy={300 - d.efficiency * 2.5} r={d.throughput / 10} fill="var(--hercules-primary)" opacity="0.7" />)}</svg></div>; }
function RadarChart({ data }: { data: any[] }) { return <div className="relative h-full"><svg className="w-full h-full" viewBox="0 0 300 300"><circle cx={150} cy={150} r={120} fill="none" stroke="var(--hercules-border)" /><circle cx={150} cy={150} r={80} fill="none" stroke="var(--hercules-border)" /><circle cx={150} cy={150} r={40} fill="none" stroke="var(--hercules-border)" /></svg></div>; }
function StatBox({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; color: string }) { return <div className="glass p-4 rounded-xl border border-hercules-border/50"><div className="flex items-center gap-2"><Icon className={clsx('w-5 h-5', color)} /><span className="text-caption text-hercules-text-dim">{label}</span></div><p className="text-heading-lg font-bold text-hercules-text mt-2">{value}</p></div>; }
function AgentPerformanceTable({ data }: { data: any[] }) { return <div className="space-y-3">{data.map(a => <div key={a.name} className="flex items-center justify-between p-3 glass rounded-lg border border-hercules-border/30"><div className="flex items-center gap-3"><Bot className="w-5 h-5 text-hercules-primary" /><span className="font-medium text-body-sm text-hercules-text">{a.name}</span></div><div className="flex items-center gap-4 text-caption text-hercules-text-dim"><span>{a.tasks} tasks</span><span className="text-hercules-success">{a.success.toFixed(0)}%</span><span>{(a.avgTime / 1000).toFixed(1)}s</span></div></div>)}</div>; }
function Bot() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 17h8" /><circle cx="6" cy="7" r="1" /><circle cx="18" cy="7" r="1" /></svg>; }
function CheckCircle2() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>; }
function UserCheck() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11l-5 5" /></svg>; }
function MemoryStick() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M6 3v-1" /><path d="M18 3v-1" /></svg>; }

import { Cpu, MemoryStick: MemoryStickIcon } from 'lucide-react';