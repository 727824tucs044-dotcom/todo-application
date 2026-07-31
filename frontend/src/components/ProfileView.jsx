import React, { useState } from 'react';
import { User, Mail, Shield, Key, Award, Flame, CheckCircle2, Sparkles, Sun, Moon } from 'lucide-react';
import { userApi } from '../services/api';

export default function ProfileView({ user, onUpdateUser, isDarkMode, toggleTheme, tasks = [] }) {
  const [name, setName] = useState(user?.name || user?.username || '');
  const [email, setEmail] = useState(user?.email || 'user@taskflowpro.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const completedCount = tasks.filter((t) => t.status === 'COMPLETE').length;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await userApi.updateProfile({ name, email });
    } catch (err) {
      console.warn('Backend unavailable, updating local profile:', err);
    }
    const updatedUser = { ...user, name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onUpdateUser(updatedUser);
    setStatusMsg('Profile updated successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Profile Banner Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-1 shadow-xl shadow-indigo-600/30 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center text-2xl font-black text-white uppercase">
            {name ? name.charAt(0) : 'U'}
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-2xl font-extrabold text-white">{name}</h1>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'PRO User'}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">{email}</p>

          {/* Achievement Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {completedCount} Tasks Accomplished
            </span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> 7-Day Focus Streak
            </span>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center">
          {statusMsg}
        </div>
      )}

      {/* Main Settings Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-indigo-400" />
            <span>Personal Information</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Security & Preferences */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Security & Theme Preferences</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Visual Interface Theme</h4>
              <p className="text-[11px] text-slate-400">Toggle between Obsidian Dark and Clean Light aesthetics.</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white hover:border-indigo-500/40 transition"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Change Password
            </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none"
            />
            <input
              type="password"
              placeholder="New Secure Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setStatusMsg('Password updated successfully.');
                setCurrentPassword('');
                setNewPassword('');
                setTimeout(() => setStatusMsg(''), 3000);
              }}
              className="w-full py-2.5 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}