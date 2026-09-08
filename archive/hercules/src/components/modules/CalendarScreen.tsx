'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, ChevronLeft, ChevronRight, Today, Star, Bell, MapPin, Users } from 'lucide-react';
import { useAppStore, useCalendar } from '@/store';
import clsx from 'clsx';

const viewModes = ['month', 'week', 'day', 'agenda'] as const;
const filterOptions = ['all', 'meetings', 'tasks', 'reminders', 'birthdays'] as const;

export function CalendarScreen() {
  const events = useCalendar();
  const { openModal } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'meetings' | 'tasks' | 'reminders' | 'birthdays'>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    let result = events.filter(event => {
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (typeFilter !== 'all' && event.type !== typeFilter) {
        return false;
      }
      return true;
    });
    result.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return result;
  }, [events, searchQuery, typeFilter]);

  const eventStats = useMemo(() => ({
    total: events.length,
    upcoming: events.filter(e => new Date(e.start) > new Date()).length,
    today: events.filter(e => isSameDay(new Date(e.start), new Date())).length,
    meetings: events.filter(e => e.type === 'meeting').length,
  }), [events]);

  const monthDays = useMemo(() => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];
    const firstDay = start.getDay();
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: new Date(start.getTime() - (firstDay - i) * 86400000), currentMonth: false });
    }
    for (let d = 1; d <= end.getDate(); d++) {
      days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), d), currentMonth: true });
    }
    const lastDay = end.getDay();
    for (let i = 1; i <= 6 - lastDay; i++) {
      days.push({ date: new Date(end.getTime() + i * 86400000), currentMonth: false });
    }
    return days;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(start.getTime() + i * 86400000));
    }
    return days;
  }, [currentDate]);

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(e => isSameDay(new Date(e.start), date));
  };

  const goToToday = () => setCurrentDate(new Date());

  const formatMonth = (date: Date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Calendar</h1>
            <p className="text-body-sm text-hercules-text-muted">Schedule & manage events</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goToToday} className="btn-secondary flex items-center gap-2"><Today className="w-4 h-4" /> Today</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'calendar', action: 'create' })} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Event</motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><ChevronLeft className="w-5 h-5" /></motion.button>
            <h2 className="font-medium text-heading-sm text-hercules-text min-w-[180px] text-center">{formatMonth(currentDate)}</h2>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><ChevronRight className="w-5 h-5" /></motion.button>
          </div>

          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search events..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>

          <div className="flex items-center gap-2">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{filterOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select>
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">{viewModes.map(mode => (<button key={mode} onClick={() => setViewMode(mode)} className={clsx('px-3 py-1.5 rounded-lg transition-colors text-body-sm', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</button>))}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Calendar statistics"><StatCard label="Total Events" value={eventStats.total} icon=Calendar color="text-hercules-text" /><StatCard label="Upcoming" value={eventStats.upcoming} icon=Clock color="text-hercules-primary" /><StatCard label="Today" value={eventStats.today} icon=Star color="text-hercules-warning" /><StatCard label="Meetings" value={eventStats.meetings} icon=Users color="text-hercules-info" /></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait"><motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {viewMode === 'month' && (<MonthView currentDate={currentDate} events={filteredEvents} onDateClick={setCurrentDate} onEventClick={setSelectedEvent} monthDays={monthDays} getEventsForDay={getEventsForDay} />)}
          {viewMode === 'week' && (<WeekView currentDate={currentDate} events={filteredEvents} onEventClick={setSelectedEvent} weekDays={weekDays} />)}
          {viewMode === 'day' && (<DayView currentDate={currentDate} events={filteredEvents} onEventClick={setSelectedEvent} />)}
          {viewMode === 'agenda' && (<AgendaView events={filteredEvents} onEventClick={setSelectedEvent} />)}
        </motion.div></AnimatePresence>
        {filteredEvents.length === 0 && viewMode !== 'month' && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center"><Calendar className="w-16 h-16 text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">No events found</h3><p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p></motion.div>)}
      </div>

      <AnimatePresence>{selectedEvent && <EventDetailModal event={events.find(e => e.id === selectedEvent)} onClose={() => setSelectedEvent(null)} />}</AnimatePresence>
    </div>
  );
}

function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function formatTime(date: Date) { return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) { return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>; }

function MonthView({ currentDate, events, onDateClick, onEventClick, monthDays, getEventsForDay }: any) {
  const today = new Date();
  return (<div className="glass rounded-xl border border-hercules-border/50 overflow-hidden"><div className="grid grid-cols-7 border-b border-hercules-border/30"><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Sun</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Mon</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Tue</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Wed</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Thu</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Fri</div><div className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim py-3">Sat</div></div><div className="grid grid-cols-7 p-1">{monthDays.map((day, i) => { const dayEvents = getEventsForDay(day.date); const isToday = isSameDay(day.date, today); const isSelected = isSameDay(day.date, currentDate); return (<motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onDateClick(day.date)} className={clsx('relative min-h-[100px] p-2 rounded-lg flex flex-col', !day.currentMonth && 'opacity-50', isToday && 'bg-hercules-primary/10 border border-hercules-primary/30', isSelected && 'ring-2 ring-hercules-primary')}>{dayEvents.slice(0, 3).map(ev => (<EventChip key={ev.id} event={ev} onClick={e => { e.stopPropagation(); onEventClick(ev.id); }} />))}{dayEvents.length > 3 && (<div className="text-micro text-hercules-text-dim text-center mt-1">+{dayEvents.length - 3} more</div>)}</motion.button>); })}</div></div>);
}

function WeekView({ currentDate, events, onEventClick, weekDays }: any) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (<div className="glass rounded-xl border border-hercules-border/50 overflow-hidden"><div className="grid grid-cols-[60px_repeat(7,1fr)]"><div className="border-r border-hercules-border/30"></div>{weekDays.map((day, i) => (<div key={i} className="border-r border-hercules-border/30 py-2 px-1"><p className="text-caption font-medium text-hercules-text-dim">{day.toLocaleString('default', { weekday: 'short' })}</p><p className="font-medium text-body text-hercules-text">{day.getDate()}</p></div>))}</div><div className="grid grid-cols-[60px_repeat(7,1fr)] h-[calc(100vh-300px)]">{hours.map(h => (<div key={h} className="border-r border-hercules-border/30 py-1 px-1"><span className="text-micro text-hercules-text-dim">{h.toString().padStart(2, '0')}:00</span></div>))}{weekDays.map((day, d) => (<div key={d} className="relative border-r border-hercules-border/30">{events.filter(e => isSameDay(new Date(e.start), day)).map(ev => { const start = new Date(ev.start); const end = new Date(ev.end); const top = (start.getHours() + start.getMinutes() / 60) * 60; const height = ((end.getTime() - start.getTime()) / 60000); return (<motion.div key={ev.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={e => { e.stopPropagation(); onEventClick(ev.id); }} className="absolute left-1 right-1 rounded bg-hercules-primary/20 border border-hercules-primary/30 p-1 text-micro text-hercules-primary" style={{ top: `${top}px`, height: `${Math.max(height, 30)}px` }}><p className="truncate font-medium">{ev.title}</p><p className="truncate">{formatTime(start)} - {formatTime(end)}</p></motion.div>); })}</div>))}</div></div>);
}

function DayView({ currentDate, events, onEventClick }: any) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter(e => isSameDay(new Date(e.start), currentDate));
  return (<div className="glass rounded-xl border border-hercules-border/50 overflow-hidden"><div className="grid grid-cols-[60px_1fr] h-[calc(100vh-300px)]">{hours.map(h => (<div key={h} className="border-r border-hercules-border/30 py-1 px-1"><span className="text-micro text-hercules-text-dim">{h.toString().padStart(2, '0')}:00</span></div>))}<div className="relative">{dayEvents.map(ev => { const start = new Date(ev.start); const end = new Date(ev.end); const top = (start.getHours() + start.getMinutes() / 60) * 60; const height = ((end.getTime() - start.getTime()) / 60000); return (<motion.div key={ev.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => onEventClick(ev.id)} className="absolute left-2 right-2 rounded bg-hercules-primary/20 border border-hercules-primary/30 p-2 text-hercules-primary" style={{ top: `${top}px`, height: `${Math.max(height, 40)}px` }}><p className="font-medium">{ev.title}</p><p className="text-caption">{formatTime(start)} - {formatTime(end)}</p><p className="text-micro truncate">{ev.location || ''}</p></motion.div>); })}</div></div></div>);
}

function AgendaView({ events, onEventClick }: any) {
  const grouped = events.reduce((acc: any, ev) => { const date = new Date(ev.start).toDateString(); if (!acc[date]) acc[date] = []; acc[date].push(ev); return acc; }, {});
  return (<div className="space-y-6">{Object.entries(grouped).map(([date, evs]: [string, any]) => (<motion.div key={date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="flex items-center gap-3 mb-3"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><Calendar className="w-5 h-5 text-hercules-primary" /></div><div><p className="font-medium text-body text-hercules-text">{new Date(date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</p><p className="text-caption text-hercules-text-dim">{evs.length} event{evs.length !== 1 ? 's' : ''}</p></div></div><div className="space-y-2">{evs.map(ev => (<motion.div key={ev.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => onEventClick(ev.id)} className="glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 flex items-center gap-4"><div className="w-2 h-full rounded-full bg-hercules-primary" /><div className="flex-1"><p className="font-medium text-body-sm text-hercules-text">{ev.title}</p><p className="text-caption text-hercules-text-dim flex items-center gap-2"><span>{formatTime(new Date(ev.start))} - {formatTime(new Date(ev.end))}</span>{ev.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>}</p></div></motion.div>))}</div></motion.div>))}</div>);
}

function EventChip({ event, onClick }: { event: any; onClick: (e: React.MouseEvent) => void }) { return (<motion.button onClick={onClick} className="text-micro px-1.5 py-0.5 rounded bg-hercules-primary/20 text-hercules-primary truncate" style={{ backgroundColor: `var(--hercules-${event.color || 'primary'})20`, color: `var(--hercules-${event.color || 'primary'})` }}>{event.title}</motion.button>); }

function EventDetailModal({ event, onClose }: { event: any; onClose: () => void }) { if (!event) return null; return <Modal type="settings" data={{ section: 'calendar' }} onClose={onClose}><div className="p-6 max-w-2xl"><div className="flex items-start justify-between mb-6"><h2 className="text-heading-lg font-semibold text-hercules-text">{event.title}</h2><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button></div><div className="space-y-4"><div className="glass p-4 rounded-xl border border-hercules-border/50 text-body-sm text-hercules-text">{event.description || 'No description'}</div><div className="grid grid-cols-2 gap-4 text-caption text-hercules-text-dim"><div><span className="block text-hercules-text-dim">Start</span><span>{new Date(event.start).toLocaleString()}</span></div><div><span className="block text-hercules-text-dim">End</span><span>{new Date(event.end).toLocaleString()}</span></div><div><span className="block text-hercules-text-dim">Type</span><span className="badge badge-sm">{event.type}</span></div><div><span className="block text-hercules-text-dim">Location</span><span>{event.location || '—'}</span></div></div><div><span className="block text-hercules-text-dim text-caption">Attendees</span><div className="flex flex-wrap gap-2 mt-1">{event.attendees?.map((a: string) => <span key={a} className="badge badge-neutral">{a}</span>)}</div></div></div></div></Modal>; }

import { Grid, List, Layers, ChevronUp, MapPin, Users, Star, Bell } from 'lucide-react';