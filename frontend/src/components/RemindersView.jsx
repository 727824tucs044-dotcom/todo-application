import React, { useState, useEffect } from 'react';
import { Bell, Clock, AlertCircle, CheckCircle2, Volume2, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function RemindersView({ tasks = [], onToggleComplete }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter tasks with reminder dates
  const reminderTasks = tasks.filter((t) => t.reminderDate || t.deadline);

  const getCountdown = (targetDateStr) => {
    if (!targetDateStr) return 'No timestamp';
    const target = new Date(targetDateStr);
    const diffMs = target - now;

    if (diffMs <= 0) return 'Expired / Due Now';

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours}h ${mins}m ${secs}s left`;
  };

  const playTestAlert = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5 note
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.3);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-cyan-600/20 text-cyan-400">
            <Bell className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Precision Smart Reminders</h1>
            <p className="text-xs text-slate-400 mt-0.5">Real-Time Deadline Timelines & Alert Engine</p>
          </div>
        </div>

        <button
          onClick={playTestAlert}
          className="px-5 py-2.5 rounded-2xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition flex items-center space-x-2 self-start md:self-auto"
        >
          <Volume2 className="w-4 h-4" />
          <span>Test Sound Alert</span>
        </button>
      </div>

      {/* Reminders List Cards */}
      <div className="space-y-4">
        {reminderTasks.length > 0 ? (
          reminderTasks.map((t) => {
            const isCompleted = t.status === 'COMPLETE';
            const reminderTime = t.reminderDate || t.deadline;
            const countdownText = getCountdown(reminderTime);
            const isPast = new Date(reminderTime) < now && !isCompleted;

            return (
              <div
                key={t.id}
                className={`p-6 rounded-3xl glass-panel-interactive border transition flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isPast
                    ? 'border-rose-500/40 bg-rose-950/10'
                    : isCompleted
                    ? 'border-slate-800 opacity-60'
                    : 'border-slate-700/80'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl ${isPast ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-600/20 text-indigo-400'}`}>
                    <Clock className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className={`font-bold text-lg text-white ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                      {t.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Scheduled for: {new Date(reminderTime).toLocaleString()}
                    </p>

                    <div className="flex items-center space-x-3 mt-3">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                        isPast
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}>
                        {countdownText}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end md:self-center">
                  <button
                    onClick={() => onToggleComplete(t.id)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 ${
                      isCompleted
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? 'Done' : 'Mark Complete'}</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center text-slate-400 glass-panel rounded-3xl border border-dashed border-slate-800">
            <Bell className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="font-semibold text-base">No active reminders scheduled.</p>
            <p className="text-xs text-slate-500 mt-1">Set a reminder timestamp when creating or editing a task.</p>
          </div>
        )}
      </div>
    </div>
  );
}