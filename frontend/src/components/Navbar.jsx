import React, { useState } from 'react';
import { Sparkles, Search, Bell, Sun, Moon, User, LogOut, Shield, ChevronDown, AlertCircle } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  activeTab,
  onSelectTab,
  onOpenCommandPalette,
  isDarkMode,
  toggleTheme,
  onGoHome,
  tasks = []
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Compute urgent reminders for notifications
  const upcomingReminders = tasks.filter(
    (t) => t.status !== 'COMPLETE' && t.reminderDate && new Date(t.reminderDate) > new Date()
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 glass-panel border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onGoHome}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-600/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400 font-extrabold text-lg">
            T
          </div>
        </div>
        <div>
          <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
            TaskFlow <span className="text-gradient">Pro</span>
          </span>
        </div>
      </div>

      {/* Center Search / Command Palette Launcher */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:text-white transition text-xs font-medium group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
            <span>Search tasks, commands, calendar...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Search button mobile */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden p-2.5 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/60 hover:border-indigo-500/40 transition"
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
        </button>

        {user ? (
          <>
            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className="relative p-2.5 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/60 transition"
              >
                <Bell className="w-5 h-5" />
                {upcomingReminders.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel border border-slate-700/80 p-4 shadow-2xl z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-white uppercase tracking-wider">
                    <span>Notifications ({upcomingReminders.length})</span>
                    <button onClick={() => onSelectTab('reminders')} className="text-indigo-400 hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {upcomingReminders.length > 0 ? (
                      upcomingReminders.slice(0, 4).map((rem) => (
                        <div key={rem.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          <div className="text-xs">
                            <div className="font-semibold text-white">{rem.title}</div>
                            <div className="text-slate-400 mt-0.5">
                              Reminder: {new Date(rem.reminderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-xs text-slate-400">
                        No upcoming notifications.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/40 transition"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow">
                    {user.name ? user.name.charAt(0) : user.username?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-white max-w-[100px] truncate">
                  {user.name || user.username}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel border border-slate-700/80 p-2 shadow-2xl z-50">
                  <div className="px-3 py-2 border-b border-slate-800 text-xs">
                    <div className="font-bold text-white truncate">{user.name || user.username}</div>
                    <div className="text-slate-400 truncate">{user.email || 'user@taskflowpro.com'}</div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTab('profile');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition mt-1"
                  >
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>My Profile</span>
                  </button>

                  {user.role === 'ROLE_ADMIN' && (
                    <button
                      onClick={() => {
                        onSelectTab('admin');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-indigo-400 hover:bg-slate-800 transition"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition border-t border-slate-800/80 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}