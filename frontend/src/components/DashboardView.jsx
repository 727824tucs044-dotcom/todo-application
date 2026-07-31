import React, { useState } from 'react';
import {
  Sparkles, CheckCircle2, Clock, AlertTriangle, Flame, Plus,
  Calendar, Search, Filter, ArrowUpRight, TrendingUp, Sun, CloudRain, Shield
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function DashboardView({
  user,
  tasks = [],
  onOpenTaskModal,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onSelectTab,
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Analytics Math
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETE').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'COMPLETE').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'HIGH' && t.status !== 'COMPLETE').length;
  const overdueTasks = tasks.filter((t) => {
    if (t.status === 'COMPLETE' || !t.deadline) return false;
    return new Date(t.deadline) < new Date();
  }).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Chart Data Mock
  const weeklyData = [
    { day: 'Mon', completed: Math.max(1, completedTasks - 4), total: totalTasks + 2 },
    { day: 'Tue', completed: Math.max(2, completedTasks - 3), total: totalTasks + 1 },
    { day: 'Wed', completed: Math.max(3, completedTasks - 2), total: totalTasks + 3 },
    { day: 'Thu', completed: Math.max(4, completedTasks - 1), total: totalTasks },
    { day: 'Fri', completed: completedTasks, total: totalTasks },
    { day: 'Sat', completed: completedTasks + 1, total: totalTasks + 1 },
    { day: 'Sun', completed: completedTasks + 2, total: totalTasks + 2 },
  ];

  // Quotes List
  const quotes = [
    "“Productivity is never an accident. It is always the result of a commitment to excellence.”",
    "“Focus on being productive instead of busy.”",
    "“The secret of getting ahead is getting started.”",
    "“Small daily improvements over time lead to stunning results.”"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Filter & Sort Logic
  let processedTasks = [...tasks];

  if (searchQuery.trim()) {
    processedTasks = processedTasks.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (filterPriority !== 'ALL') {
    processedTasks = processedTasks.filter((t) => t.priority === filterPriority);
  }

  if (filterStatus !== 'ALL') {
    if (filterStatus === 'COMPLETE') processedTasks = processedTasks.filter((t) => t.status === 'COMPLETE');
    if (filterStatus === 'PENDING') processedTasks = processedTasks.filter((t) => t.status !== 'COMPLETE');
  }

  if (sortBy === 'NEWEST') processedTasks.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  if (sortBy === 'DEADLINE') processedTasks.sort((a, b) => new Date(a.deadline || '9999') - new Date(b.deadline || '9999'));
  if (sortBy === 'PRIORITY') {
    const pRank = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    processedTasks.sort((a, b) => (pRank[b.priority] || 0) - (pRank[a.priority] || 0));
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* GREETING HERO BAR */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Workspace Overview</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {getGreeting()}, {user?.name || user?.username || 'Productivity Champ'} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-2 italic max-w-xl">
            {randomQuote}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Quick Create Task */}
          <button
            onClick={() => onOpenTaskModal()}
            className="flex-1 lg:flex-none px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Task</span>
          </button>

          {/* Pomodoro Focus Launcher */}
          <button
            onClick={() => onSelectTab('focus')}
            className="px-5 py-3.5 rounded-2xl font-semibold text-sm glass-panel hover:bg-slate-800 text-slate-200 border border-slate-700 transition flex items-center space-x-2"
          >
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Focus Mode</span>
          </button>
        </div>
      </div>

      {/* STATS METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</div>
          <div className="text-3xl font-black text-white mt-2">{totalTasks}</div>
          <div className="text-[11px] text-slate-500 mt-1">All active items</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Completed</div>
          <div className="text-3xl font-black text-emerald-300 mt-2">{completedTasks}</div>
          <div className="text-[11px] text-emerald-500 mt-1">{completionPercentage}% completion rate</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Pending</div>
          <div className="text-3xl font-black text-amber-300 mt-2">{pendingTasks}</div>
          <div className="text-[11px] text-amber-500 mt-1">In progress</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">High Priority</div>
          <div className="text-3xl font-black text-rose-300 mt-2">{highPriorityTasks}</div>
          <div className="text-[11px] text-rose-500 mt-1">Needs attention</div>
        </div>

        <div className="col-span-2 md:col-span-1 glass-panel p-5 rounded-2xl border border-purple-500/20 bg-purple-950/10">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Overdue</div>
          <div className="text-3xl font-black text-purple-300 mt-2">{overdueTasks}</div>
          <div className="text-[11px] text-purple-500 mt-1">Passed deadline</div>
        </div>
      </div>

      {/* GRAPH & PRODUCTIVITY RING SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity Graph */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <span>Weekly Task Completion Velocity</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Track your task completion trend over time</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Recharts
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Circle & Quick Shortcuts */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Completion Index</h3>
            <p className="text-xs text-slate-400">Total overall milestone progress</p>

            <div className="my-6 flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#6366f1"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - completionPercentage / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{completionPercentage}%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Finished</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onSelectTab('calendar')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Open Calendar Grid</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => onSelectTab('reminders')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>View Smart Reminders</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR & TASK LIST */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>My Tasks Suite</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {processedTasks.length} Items
            </span>
          </h2>

          {/* Search, Filter & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETE">Completed</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 focus:outline-none"
            >
              <option value="NEWEST">Newest First</option>
              <option value="DEADLINE">Sort by Deadline</option>
              <option value="PRIORITY">Sort by Priority</option>
            </select>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3">
          {processedTasks.length > 0 ? (
            processedTasks.map((task) => {
              const isCompleted = task.status === 'COMPLETE';
              const priorityColors = {
                HIGH: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                MEDIUM: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                LOW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
              };

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl glass-panel-interactive border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCompleted ? 'opacity-60 bg-slate-950/40 border-slate-800' : 'border-slate-700/80'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Animated Checkbox */}
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-600 hover:border-indigo-400 bg-slate-900'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </button>

                    <div>
                      <h4 className={`font-bold text-sm text-white ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {/* Priority Badge */}
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${priorityColors[task.priority] || priorityColors.MEDIUM}`}>
                          {task.priority || 'MEDIUM'}
                        </span>

                        {/* Category Tag */}
                        {task.category && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            {task.category}
                          </span>
                        )}

                        {/* Deadline tag */}
                        {task.deadline && (
                          <span className="text-[10px] font-medium text-slate-400 flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            <span>{new Date(task.deadline).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => onEditTask(task)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-400 hover:text-rose-300 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-slate-400 glass-panel rounded-2xl border border-dashed border-slate-800">
              <CheckCircle2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-base">No tasks match your filters.</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or add a new task.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}