'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, MemoryStick, HardDrive, Network, Activity, Thermometer, Battery, Wifi, Bluetooth, Monitor, Smartphone, Tablet, Server, Database, Zap, Settings, RefreshCw, TrendingUp, TrendingDown, CheckCircle, AlertCircle, XCircle, ExternalLink } from 'lucide-react';
import { useAppStore, useSystemMetrics } from '@/store';
import clsx from 'clsx';

export function SystemScreen() {
  const metrics = useSystemMetrics();
  const { openModal } = useAppStore();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'cpu' | 'memory' | 'disk' | 'network' | 'processes' | 'services' | 'logs'>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {}, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'cpu', label: 'CPU', icon: Cpu },
    { id: 'memory', label: 'Memory', icon: MemoryStick },
    { id: 'disk', label: 'Disk', icon: HardDrive },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'processes', label: 'Processes', icon: Server },
    { id: 'services', label: 'Services', icon: Database },
    { id: 'logs', label: 'Logs', icon: FileText },
  ];

  const systemInfo = useMemo(() => ({
    hostname: 'hercules-main',
    os: 'Hercules AI OS 1.0.0',
    kernel: 'Linux 6.8.0-hercules',
    uptime: '3 days, 4 hours, 22 minutes',
    cpuModel: 'AMD Ryzen 9 7950X (16-core)',
    totalMemory: '64 GB DDR5-5600',
    totalDisk: '2 TB NVMe',
    gpu: 'NVIDIA RTX 4090 24GB',
    ip: '192.168.1.100',
    version: '1.0.0-build.2024.01.15',
  }), []);

  return (
    <div className="system-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div><h1 className="font-display font-bold text-heading-lg text-hercules-text">System</h1><p className="text-body-sm text-hercules-text-muted">Monitor & manage system resources</p></div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setAutoRefresh(!autoRefresh)} className={clsx('btn-secondary flex items-center gap-2', autoRefresh && 'bg-hercules-primary/20 text-hercules-primary')}>
              <RefreshCw className="w-4 h-4" animate={{ rotate: autoRefresh ? 360 : 0 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
              {autoRefresh ? 'Auto Refresh' : 'Paused'}
            </motion.button>
            <select value={timeRange} onChange={e => setTimeRange(e.target.value as typeof timeRange)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              <option value="1h">Last Hour</option><option value="6h">Last 6 Hours</option><option value="24h">Last 24 Hours</option><option value="7d">Last 7 Days</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
          {tabs.map(tab => (
            <motion.button key={tab.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedTab(tab.id as typeof selectedTab)} className={clsx('tab-btn flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors', selectedTab === tab.id ? 'bg-hercules-primary/20 text-hercules-primary border border-hercules-primary/30' : 'text-hercules-text-muted hover:bg-hercules-surface-elevated/50')} role="tab" aria-selected={selectedTab === tab.id}><tab.icon className="w-4 h-4" />{tab.label}</motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={selectedTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {selectedTab === 'overview' && <OverviewTab metrics={metrics} systemInfo={systemInfo} />}
            {selectedTab === 'cpu' && <CpuTab metrics={metrics} />}
            {selectedTab === 'memory' && <MemoryTab metrics={metrics} />}
            {selectedTab === 'disk' && <DiskTab metrics={metrics} />}
            {selectedTab === 'network' && <NetworkTab metrics={metrics} />}
            {selectedTab === 'processes' && <ProcessesTab />}
            {selectedTab === 'services' && <ServicesTab />}
            {selectedTab === 'logs' && <LogsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OverviewTab({ metrics, systemInfo }: { metrics: any; systemInfo: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="CPU Usage" value={`${metrics.cpu}%`} icon=Cpu color="text-hercules-primary" trend={metrics.cpuTrend} sparkline={metrics.cpuHistory} />
        <MetricCard title="Memory Usage" value={`${metrics.memory}%`} icon=MemoryStick color="text-hercules-info" trend={metrics.memoryTrend} sparkline={metrics.memoryHistory} />
        <MetricCard title="Disk Usage" value={`${metrics.disk}%`} icon=HardDrive color="text-hercules-warning" trend={metrics.diskTrend} sparkline={metrics.diskHistory} />
        <MetricCard title="Network" value={`${metrics.networkUp}↑ ${metrics.networkDown}↓`} icon=Network color="text-hercules-success" trend="stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">System Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(systemInfo).map(([key, value]) => (
              <div key={key} className="glass p-4 rounded-lg border border-hercules-border/30">
                <p className="text-caption text-hercules-text-dim uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-body-sm font-mono text-hercules-text mt-1 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <QuickAction icon=RefreshCw label="Restart Services" onClick={() => {}} />
            <QuickAction icon=TrendingUp label="Optimize Performance" onClick={() => {}} />
            <QuickAction icon=Database label="Database Maintenance" onClick={() => {}} />
            <QuickAction icon=Zap label="Clear Cache" onClick={() => {}} />
            <QuickAction icon=Settings label="System Settings" onClick={() => {}} />
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          <AlertItem type="warning" message="CPU temperature reached 78°C" time="2 min ago" />
          <AlertItem type="info" message="Backup completed successfully" time="15 min ago" />
          <AlertItem type="success" message="Security scan passed" time="1 hour ago" />
          <AlertItem type="error" message="Disk usage exceeded 85% on /var" time="3 hours ago" />
        </div>
      </div>
    </div>
  );
}

function CpuTab({ metrics }: { metrics: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Usage" value={`${metrics.cpu}%`} icon=Cpu color="text-hercules-primary" sparkline={metrics.cpuHistory} />
        <MetricCard title="User" value={`${Math.round(metrics.cpu * 0.7)}%`} icon=User color="text-hercules-info" />
        <MetricCard title="System" value={`${Math.round(metrics.cpu * 0.2)}%`} icon=Server color="text-hercules-warning" />
        <MetricCard title="Idle" value={`${Math.round(100 - metrics.cpu)}%`} icon=CheckCircle color="text-hercules-success" />
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">CPU Cores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 16 }, (_, i) => (
            <CoreCard core={i} usage={Math.random() * 100} />
          ))}
        </div>
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Frequency & Temperature</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Current Freq" value="4.2 GHz" icon=Zap />
          <StatItem label="Max Freq" value="5.7 GHz" icon=TrendingUp />
          <StatItem label="Temperature" value="62°C" icon=Thermometer />
          <StatItem label="Power" value="85W" icon=Battery />
        </div>
      </div>
    </div>
  );
}

function MemoryTab({ metrics }: { metrics: any }) {
  const usedGB = (64 * metrics.memory / 100).toFixed(1);
  const freeGB = (64 - usedGB).toFixed(1);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total" value="64 GB" icon=MemoryStick color="text-hercules-text" />
        <MetricCard title="Used" value={`${usedGB} GB`} icon=MemoryStick color="text-hercules-primary" sparkline={metrics.memoryHistory} />
        <MetricCard title="Available" value={`${freeGB} GB`} icon=CheckCircle color="text-hercules-success" />
        <MetricCard title="Usage" value={`${metrics.memory}%`} icon=Activity color="text-hercules-warning" trend={metrics.memoryTrend} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">Memory Breakdown</h3>
          <div className="space-y-3">
            <MemoryBar label="Application" used={45} total={64} color="text-hercules-primary" />
            <MemoryBar label="Cache" used={12} total={64} color="text-hercules-info" />
            <MemoryBar label="Buffers" used={3} total={64} color="text-hercules-success" />
            <MemoryBar label="Shared" used={1.5} total={64} color="text-hercules-warning" />
            <MemoryBar label="Free" used={freeGB as any} total={64} color="text-hercules-text-dim" />
          </div>
        </div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">Swap</h3>
          <MemoryBar label="Swap" used={0.5} total={8} color="text-hercules-accent" />
          <div className="mt-4 grid grid-cols-2 gap-4 text-caption text-hercules-text-dim">
            <div><span className="block">Swappiness</span><span className="font-mono text-hercules-text">60</span></div>
            <div><span className="block">Cache Pressure</span><span className="font-mono text-hercules-text">100</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiskTab({ metrics }: { metrics: any }) {
  const partitions = [
    { mount: '/', fs: 'ext4', total: '2000 GB', used: '1240 GB', free: '760 GB', usage: 62 },
    { mount: '/home', fs: 'ext4', total: '500 GB', used: '320 GB', free: '180 GB', usage: 64 },
    { mount: '/var', fs: 'ext4', total: '200 GB', used: '170 GB', free: '30 GB', usage: 85 },
    { mount: '/tmp', fs: 'tmpfs', total: '32 GB', used: '2 GB', free: '30 GB', usage: 6 },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Space" value="2.7 TB" icon=HardDrive color="text-hercules-text" />
        <MetricCard title="Used" value="1.73 TB" icon=HardDrive color="text-hercules-primary" />
        <MetricCard title="Free" value="970 GB" icon=CheckCircle color="text-hercules-success" />
        <MetricCard title="Overall Usage" value={`${metrics.disk}%`} icon=Activity color="text-hercules-warning" sparkline={metrics.diskHistory} />
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">Partitions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-caption text-hercules-text-dim border-b border-hercules-border/30"><th className="text-left pb-2 pr-4">Mount</th><th className="text-left pb-2 pr-4">Filesystem</th><th className="text-right pb-2 pr-4">Total</th><th className="text-right pb-2 pr-4">Used</th><th className="text-right pb-2 pr-4">Free</th><th className="text-right pb-2 pr-4">Usage</th></tr></thead>
            <tbody>
              {partitions.map(p => (
                <tr key={p.mount} className="border-b border-hercules-border/20">
                  <td className="py-3 pr-4 font-mono text-hercules-text">{p.mount}</td>
                  <td className="py-3 pr-4 text-hercules-text-dim">{p.fs}</td>
                  <td className="py-3 pr-4 text-right font-mono text-hercules-text-dim">{p.total}</td>
                  <td className="py-3 pr-4 text-right font-mono text-hercules-text">{p.used}</td>
                  <td className="py-3 pr-4 text-right font-mono text-hercules-text-dim">{p.free}</td>
                  <td className="py-3 pr-4 text-right">
                    <div className="w-32 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden inline-block">
                      <div className="h-full bg-hercules-primary" style={{ width: `${p.usage}%` }} />
                    </div>
                    <span className="text-caption font-mono text-hercules-text-muted ml-2">{p.usage}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="glass rounded-xl border border-hercules-border/50 p-6">
        <h3 className="font-medium text-body text-hercules-text mb-4">I/O Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Read Speed" value="1.2 GB/s" icon=HardDrive />
          <StatItem label="Write Speed" value="980 MB/s" icon=HardDrive />
          <StatItem label="IOPS Read" value="125K" icon=Activity />
          <StatItem label="IOPS Write" value="89K" icon=Activity />
        </div>
      </div>
    </div>
  );
}

function NetworkTab({ metrics }: { metrics: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Upload" value={`${metrics.networkUp}`} icon=TrendingUp color="text-hercules-success" sparkline={metrics.networkUpHistory} />
        <MetricCard title="Download" value={`${metrics.networkDown}`} icon=TrendingDown color="text-hercules-primary" sparkline={metrics.networkDownHistory} />
        <MetricCard title="Connections" value="247" icon=Network color="text-hercules-info" />
        <MetricCard title="Latency" value="12 ms" icon=Activity color="text-hercules-warning" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">Interfaces</h3>
          <div className="space-y-3">
            <InterfaceRow name="eth0" ip="192.168.1.100" mac="00:1B:44:11:3A:B7" speed="1 Gbps" rx="2.4 TB" tx="1.8 TB" status="up" />
            <InterfaceRow name="wlan0" ip="192.168.1.101" mac="00:1B:44:11:3A:B8" speed="866 Mbps" rx="450 GB" tx="320 GB" status="up" />
            <InterfaceRow name="docker0" ip="172.17.0.1" mac="02:42:AC:11:00:02" speed="10 Gbps" rx="120 GB" tx="95 GB" status="up" />
            <InterfaceRow name="lo" ip="127.0.0.1" mac="00:00:00:00:00:00" speed="N/A" rx="45 GB" tx="45 GB" status="up" />
          </div>
        </div>
        <div className="glass rounded-xl border border-hercules-border/50 p-6">
          <h3 className="font-medium text-body text-hercules-text mb-4">Connections</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Array.from({ length: 10 }, (_, i) => (
              <ConnectionRow key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessesTab() {
  const processes = Array.from({ length: 15 }, (_, i) => ({
    pid: 1000 + i * 50,
    name: ['hercules-daemon', 'node', 'python3', 'postgres', 'redis', 'nginx', 'chrome', 'code', 'docker', 'systemd', 'sshd', 'cron', 'dbus', 'NetworkManager', 'polkitd'][i],
    cpu: Math.random() * 15,
    memory: Math.random() * 8,
    user: 'commander',
    status: ['running', 'sleeping', 'running', 'sleeping', 'running', 'sleeping', 'running', 'sleeping', 'running', 'running', 'sleeping', 'sleeping', 'sleeping', 'running', 'sleeping'][i],
  }));
  return (
    <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
      <div className="p-4 border-b border-hercules-border/30 flex items-center justify-between">
        <h3 className="font-medium text-body text-hercules-text">Processes (247 total)</h3>
        <input type="text" placeholder="Filter processes..." className="w-64 px-3 py-1.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-lg text-hercules-text placeholder:text-hercules-text-dim text-sm outline-none" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-caption text-hercules-text-dim border-b border-hercules-border/30"><th className="text-left pb-2 pr-4 w-20">PID</th><th className="text-left pb-2 pr-4">Name</th><th className="text-right pb-2 pr-4 w-20">CPU%</th><th className="text-right pb-2 pr-4 w-24">Memory%</th><th className="text-left pb-2 pr-4 w-24">User</th><th className="text-left pb-2 pr-4 w-24">Status</th></tr></thead>
          <tbody>
            {processes.map(p => (
              <tr key={p.pid} className="border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30">
                <td className="py-3 pr-4 font-mono text-hercules-text-dim">{p.pid}</td>
                <td className="py-3 pr-4 text-hercules-text">{p.name}</td>
                <td className="py-3 pr-4 text-right font-mono text-hercules-text">{p.cpu.toFixed(1)}</td>
                <td className="py-3 pr-4 text-right font-mono text-hercules-text">{p.memory.toFixed(1)}</td>
                <td className="py-3 pr-4 text-hercules-text-dim">{p.user}</td>
                <td className="py-3 pr-4"><span className={clsx('badge badge-sm', p.status === 'running' ? 'badge-success' : 'badge-neutral')}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesTab() {
  const services = [
    { name: 'hercules-daemon', status: 'running', description: 'Core HERCULES daemon', pid: 1234 },
    { name: 'postgresql', status: 'running', description: 'Database server', pid: 5678 },
    { name: 'redis', status: 'running', description: 'In-memory cache', pid: 9012 },
    { name: 'nginx', status: 'running', description: 'Web server', pid: 3456 },
    { name: 'docker', status: 'running', description: 'Container runtime', pid: 7890 },
    { name: 'ssh', status: 'running', description: 'SSH server', pid: 1111 },
    { name: 'cron', status: 'running', description: 'Task scheduler', pid: 2222 },
    { name: 'bluetooth', status: 'stopped', description: 'Bluetooth service', pid: null },
    { name: 'cups', status: 'stopped', description: 'Print service', pid: null },
  ];
  return (
    <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
      <div className="p-4 border-b border-hercules-border/30"><h3 className="font-medium text-body text-hercules-text">System Services</h3></div>
      <div className="divide-y divide-hercules-border/20">
        {services.map(svc => (
          <div key={svc.name} className="p-4 flex items-center justify-between hover:bg-hercules-surface-elevated/30">
            <div className="flex items-center gap-4">
              <div className={clsx('w-3 h-3 rounded-full', svc.status === 'running' ? 'bg-hercules-success' : 'bg-hercules-text-dim')} />
              <div><p className="font-mono text-body-sm text-hercules-text">{svc.name}</p><p className="text-caption text-hercules-text-dim">{svc.description}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <span className={clsx('badge badge-sm', svc.status === 'running' ? 'badge-success' : 'badge-neutral')}>{svc.status}</span>
              {svc.pid && <span className="text-caption font-mono text-hercules-text-dim">PID: {svc.pid}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogsTab() {
  const logs = [
    { time: '10:45:22', level: 'info', source: 'hercules-daemon', message: 'Task queue processed: 15 tasks completed' },
    { time: '10:44:18', level: 'warn', source: 'hercules-daemon', message: 'CPU temperature threshold exceeded: 78°C' },
    { time: '10:42:05', level: 'info', source: 'backup-service', message: 'Daily backup completed: 2.4 GB archived' },
    { time: '10:40:33', level: 'error', source: 'disk-monitor', message: 'Partition /var usage at 85% - cleanup recommended' },
    { time: '10:38:12', level: 'info', source: 'security-scan', message: 'Vulnerability scan completed: 0 critical, 2 medium' },
    { time: '10:35:00', level: 'info', source: 'hercules-daemon', message: 'Agent "researcher-01" registered successfully' },
  ];
  return (
    <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
      <div className="p-4 border-b border-hercules-border/30 flex items-center justify-between"><h3 className="font-medium text-body text-hercules-text">System Logs</h3><div className="flex items-center gap-2"><select className="px-3 py-1.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-lg text-hercules-text text-sm"><option>All Levels</option><option>Error</option><option>Warning</option><option>Info</option><option>Debug</option></select></div></div>
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className={clsx('px-4 py-2 border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30', log.level === 'error' && 'text-hercules-error', log.level === 'warn' && 'text-hercules-warning', log.level === 'info' && 'text-hercules-text')}>
            <span className="text-hercules-text-dim mr-3">{log.time}</span>
            <span className={clsx('badge badge-sm mr-2', log.level === 'error' ? 'badge-error' : log.level === 'warn' ? 'badge-warning' : 'badge-info')}>{log.level.toUpperCase()}</span>
            <span className="text-hercules-text-dim mr-3">{log.source}</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, trend, sparkline }: { title: string; value: string; icon: React.ComponentType<{ className?: string }>; color: string; trend?: string; sparkline?: number[] }) {
  const trendIcons: Record<string, React.ComponentType<{ className?: string }>> = { up: TrendingUp, down: TrendingDown, stable: Minus };
  return (
    <motion.div whileHover={{ y: -2 }} className="glass p-5 rounded-xl border border-hercules-border/50">
      <div className="flex items-start justify-between mb-3"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div>{trend && <trendIcons[trend] className={clsx('w-4 h-4', trend === 'up' ? 'text-hercules-success' : trend === 'down' ? 'text-hercules-error' : 'text-hercules-text-dim')} />}</div>
      <p className="text-caption text-hercules-text-dim">{title}</p>
      <p className="text-heading-lg font-bold text-hercules-text mt-1">{value}</p>
      {sparkline && <div className="mt-3 h-8"><svg className="w-full h-full" viewBox="0 0 100 30"><polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={sparkline.map((v, i) => `${i * (100 / (sparkline.length - 1))},${30 - v * 0.3}`).join(' ')} style={{ stroke: `var(--hercules-${color.replace('text-', '')})` }} /></svg></div>}
    </motion.div>
  );
}

function StatItem({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return <div className="glass p-4 rounded-lg border border-hercules-border/30"><p className="text-caption text-hercules-text-dim">{label}</p><div className="flex items-center gap-2 mt-1"><Icon className="w-5 h-5 text-hercules-primary" /><span className="font-mono text-body text-hercules-text">{value}</span></div></div>;
}

function QuickAction({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="w-full flex items-center gap-3 p-3 glass rounded-lg border border-hercules-border/30 hover:border-hercules-primary/30 hover:bg-hercules-surface-elevated/50 transition-colors text-left"><Icon className="w-5 h-5 text-hercules-primary" /><span className="text-body-sm text-hercules-text">{label}</span></button>;
}

function AlertItem({ type, message, time }: { type: string; message: string; time: string }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = { error: XCircle, warning: AlertCircle, info: Info, success: CheckCircle };
  const colors: Record<string, string> = { error: 'text-hercules-error', warning: 'text-hercules-warning', info: 'text-hercules-info', success: 'text-hercules-success' };
  const Icon = icons[type] || Info;
  return <div className="flex items-start gap-3 p-3 glass rounded-lg border border-hercules-border/30"><Icon className={clsx('w-5 h-5 mt-0.5 flex-shrink-0', colors[type])} /><div className="flex-1"><p className="text-body-sm text-hercules-text">{message}</p><p className="text-caption text-hercules-text-dim mt-0.5">{time}</p></div></div>;
}

function CoreCard({ core, usage }: { core: number; usage: number }) {
  const color = usage > 80 ? 'text-hercules-error' : usage > 60 ? 'text-hercules-warning' : 'text-hercules-primary';
  return <div className="glass p-4 rounded-lg border border-hercules-border/30 text-center"><p className="text-caption text-hercules-text-dim">Core {core}</p><p className={clsx('text-heading-md font-bold mt-1', color)}>{usage.toFixed(0)}%</p><div className="mt-2 h-2 bg-hercules-surface-elevated rounded-full overflow-hidden"><div className="h-full" style={{ width: `${usage}%`, backgroundColor: `var(--hercules-${color.replace('text-', '')})` }} /></div></div>;
}

function MemoryBar({ label, used, total, color }: { label: string; used: number; total: number; color: string }) {
  const pct = (used / total) * 100;
  return <div className="flex items-center gap-3"><span className="text-caption text-hercules-text-dim w-24">{label}</span><div className="flex-1 h-2 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full" style={{ backgroundColor: `var(--hercules-${color.replace('text-', '')})` }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} /></div><span className="text-caption font-mono text-hercules-text-muted w-16 text-right">{used.toFixed(1)} GB</span></div>;
}

function InterfaceRow({ name, ip, mac, speed, rx, tx, status }: { name: string; ip: string; mac: string; speed: string; rx: string; tx: string; status: string }) {
  return <div className="flex items-center justify-between p-3 glass rounded-lg border border-hercules-border/30"><div className="flex items-center gap-3"><div className={clsx('w-2 h-2 rounded-full', status === 'up' ? 'bg-hercules-success' : 'bg-hercules-error')} /><div><p className="font-mono text-body-sm text-hercules-text">{name}</p><p className="text-caption text-hercules-text-dim">{ip} • {mac}</p></div></div><div className="text-right text-caption text-hercules-text-dim"><p>{speed}</p><p>↓ {rx} ↑ {tx}</p></div></div>;
}

function ConnectionRow({}: {}) {
  const protos = ['TCP', 'UDP'];
  const states = ['ESTABLISHED', 'LISTEN', 'TIME_WAIT', 'CLOSE_WAIT'];
  return <div className="flex items-center justify-between p-2 glass rounded-lg border border-hercules-border/30 text-caption"><div className="flex items-center gap-3"><span className="badge badge-sm badge-neutral">{protos[Math.floor(Math.random() * 2)]}</span><span className="font-mono text-hercules-text">192.168.1.100:{3000 + Math.floor(Math.random() * 1000)}</span><span className="text-hercules-text-dim">→</span><span className="font-mono text-hercules-text-dim">{['8.8.8.8', '1.1.1.1', '192.168.1.1', '10.0.0.1'][Math.floor(Math.random() * 4)]}:{[80, 443, 53, 22][Math.floor(Math.random() * 4)]}</span></div><span className={clsx('badge badge-sm', states[0] === 'ESTABLISHED' ? 'badge-success' : 'badge-neutral')}>{states[Math.floor(Math.random() * 4)]}</span></div>;
}

import { User, FileText, Minus, Info } from 'lucide-react';