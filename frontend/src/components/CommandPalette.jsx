import React, { useState, useEffect } from 'react';
import { Search, Calendar, Bell, Shield, User, Clock, CheckSquare, Plus, Sparkles, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette({ isOpen, onClose, onSelectTab, onOpenTaskModal, isDarkMode, toggleTheme, user }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Handled by App.jsx
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'create-task', title: 'Create New Task', icon: Plus, category: 'Actions', action: () => { onOpenTaskModal(); onClose(); } },
    { id: 'dashboard', title: 'Go to Dashboard', icon: Sparkles, category: 'Navigation', action: () => { onSelectTab('dashboard'); onClose(); } },
    { id: 'tasks', title: 'View All Tasks', icon: CheckSquare, category: 'Navigation', action: () => { onSelectTab('tasks'); onClose(); } },
    { id: 'calendar', title: 'Open Calendar View', icon: Calendar, category: 'Navigation', action: () => { onSelectTab('calendar'); onClose(); } },
    { id: 'reminders', title: 'Check Reminders', icon: Bell, category: 'Navigation', action: () => { onSelectTab('reminders'); onClose(); } },
    { id: 'focus', title: 'Start Focus Mode (Pomodoro)', icon: Clock, category: 'Tools', action: () => { onSelectTab('focus'); onClose(); } },
    { id: 'profile', title: 'User Profile & Settings', icon: User, category: 'Navigation', action: () => { onSelectTab('profile'); onClose(); } },
    ...(user?.role === 'ROLE_ADMIN' ? [{ id: 'admin', title: 'Admin Dashboard', icon: Shield, category: 'Admin', action: () => { onSelectTab('admin'); onClose(); } }] : []),
    { id: 'theme', title: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, icon: isDarkMode ? Sun : Moon, category: 'Preferences', action: () => { toggleTheme(); onClose(); } },
  ];

  const filteredActions = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-slate-900/90 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        >
          {/* Header Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80">
            <Search className="w-5 h-5 text-indigo-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length > 0 ? (
              filteredActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm text-slate-200 hover:bg-indigo-600/20 hover:text-white border border-transparent hover:border-indigo-500/30 transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-indigo-400 group-hover:text-white transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-xs text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                      {item.category}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">
                No matching commands found.
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Tip: Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">ESC</kbd> to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
