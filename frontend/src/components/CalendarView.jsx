import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Sparkles, CheckCircle2, X } from 'lucide-react';

export default function CalendarView({ tasks = [], onOpenTaskModal }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  // Generate Days Matrix
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysMatrix = [];
  // Padding previous month days
  for (let i = 0; i < firstDayIndex; i++) {
    daysMatrix.push(null);
  }
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    daysMatrix.push(day);
  }

  // Helper to match tasks on a specific day
  const getTasksForDay = (dayNum) => {
    if (!dayNum) return [];
    return tasks.filter((t) => {
      if (!t.deadline) return false;
      const d = new Date(t.deadline);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === dayNum;
    });
  };

  const today = new Date();
  const isCurrentMonthToday = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Calendar Header Control Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              {monthNames[month]} {year}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Interactive Calendar & Event Timelines</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={goToday}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
          >
            Today
          </button>

          <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => onOpenTaskModal()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Task</span>
          </button>
        </div>
      </div>

      {/* Main Calendar Grid Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-xs font-extrabold uppercase tracking-wider text-slate-400 py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysMatrix.map((dayNum, idx) => {
            if (!dayNum) {
              return <div key={idx} className="h-28 rounded-2xl bg-slate-950/20 border border-transparent" />;
            }

            const dayTasks = getTasksForDay(dayNum);
            const isToday = isCurrentMonthToday && today.getDate() === dayNum;

            return (
              <div
                key={idx}
                className={`h-28 p-2 rounded-2xl border transition flex flex-col justify-between overflow-hidden group ${
                  isToday
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isToday ? 'bg-indigo-600 text-white' : 'text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {dayTasks.length > 0 && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                {/* Day Tasks List */}
                <div className="space-y-1 overflow-y-auto max-h-16">
                  {dayTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTask(t)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded-md cursor-pointer truncate transition ${
                        t.priority === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : t.priority === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Details Popup Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel bg-slate-900 border border-slate-700 p-6 rounded-3xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedTask.priority || 'MEDIUM'} Priority
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{selectedTask.title}</h3>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedTask.description && (
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {selectedTask.description}
              </p>
            )}

            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Deadline: {new Date(selectedTask.deadline).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}