import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Flame, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FocusMode() {
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setSessionsCompleted((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeTimes[newMode]);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeTimes[mode]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((modeTimes[mode] - timeLeft) / modeTimes[mode]) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-indigo-500/20">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Deep Work Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Focus & Pomodoro Timer</h1>
          <p className="text-slate-400 text-sm mt-1">
            Eliminate distractions and maintain hyper-focus using structured time sprints.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-300">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-bold">{sessionsCompleted} Focus Streak</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-xl border transition ${
              soundEnabled
                ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
            title="Toggle Ambient Audio"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Pomodoro Card */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-700/60 text-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-10">
          <button
            onClick={() => switchMode('focus')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              mode === 'focus'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Deep Focus (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              mode === 'shortBreak'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              mode === 'longBreak'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Circular Timer Display */}
        <div className="relative w-64 h-64 mx-auto mb-10 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-800"
              fill="transparent"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="10"
              className={
                mode === 'focus'
                  ? 'text-indigo-500'
                  : mode === 'shortBreak'
                  ? 'text-emerald-500'
                  : 'text-purple-500'
              }
              fill="transparent"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - progressPercentage / 100)}
              strokeLinecap="round"
              transition={{ duration: 0.5 }}
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-6xl font-black tracking-tight text-white font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-bold">
              {mode === 'focus' ? 'Focus Session' : mode === 'shortBreak' ? 'Rest & Recharge' : 'Long Break'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={resetTimer}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-10 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3 transition transform active:scale-95 shadow-xl ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/40'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-6 h-6 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current ml-1" />
                <span>Start Session</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Focus Productivity Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Single Tasking</h4>
            <p className="text-xs text-slate-400 mt-1">Focus on one high-priority task per Pomodoro session for maximum output.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Active Breaks</h4>
            <p className="text-xs text-slate-400 mt-1">Step away from your screen during short breaks to rest your eyes.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Flow State</h4>
            <p className="text-xs text-slate-400 mt-1">Complete 4 consecutive focus sprints to achieve deep cognitive flow.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
