import React, { useState, useEffect } from 'react';
import { X, Calendar, Bell, Tag, Sparkles, Check, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskModal({ isOpen, onClose, onSaveTask, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('Work');
  const [deadline, setDeadline] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [labels, setLabels] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'MEDIUM');
      setCategory(taskToEdit.category || 'Work');
      setDeadline(taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().slice(0, 16) : '');
      setReminderDate(taskToEdit.reminderDate ? new Date(taskToEdit.reminderDate).toISOString().slice(0, 16) : '');
      setLabels(taskToEdit.labels ? taskToEdit.labels.join(', ') : '');
    } else {
      resetForm();
    }
  }, [taskToEdit, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setCategory('Work');
    setDeadline('');
    setReminderDate('');
    setLabels('');
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      reminderDate: reminderDate ? new Date(reminderDate).toISOString() : null,
      labels: labels ? labels.split(',').map((l) => l.trim()).filter(Boolean) : [],
    };

    onSaveTask(payload, taskToEdit?.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl glass-panel bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {taskToEdit ? 'Edit Task' : 'Create New Task'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Task Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Task Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prepare Q3 Product Roadmap Presentation"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add detailed task notes, sub-bullet points, or reference URLs..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Priority & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="HIGH"> High Priority</option>
                  <option value="MEDIUM"> Medium Priority</option>
                  <option value="LOW"> Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Category Tag
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Design">Design</option>
                  <option value="Dev">Development</option>
                  <option value="Study">Study</option>
                </select>
              </div>
            </div>

            {/* Deadline & Reminder Timestamps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Deadline Date</span>
                </label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Smart Reminder</span>
                </label>
                <input
                  type="datetime-local"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Custom Labels */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                <span>Labels (Comma separated)</span>
              </label>
              <input
                type="text"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="e.g. Q3, Frontend, Urgent"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>{taskToEdit ? 'Update Task' : 'Save Task'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}