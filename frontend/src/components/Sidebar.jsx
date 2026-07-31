import React from 'react';
import { LayoutDashboard, CheckSquare, Plus, Calendar, Bell, Clock, User, Shield, LogOut, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onOpenTaskModal, onLogout, user, isCollapsed, toggleSidebar }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: null },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: 'Live' },
    { id: 'reminders', label: 'Reminders', icon: Bell, badge: null },
    { id: 'focus', label: 'Focus Mode', icon: Clock, badge: 'Pomodoro' },
    { id: 'profile', label: 'Profile & Settings', icon: User, badge: null },
    ...(user?.role === 'ROLE_ADMIN' ? [{ id: 'admin', label: 'Admin Panel', icon: Shield, badge: 'Admin' }] : []),
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-30 glass-panel border-r border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Top */}
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Quick Add Button */}
        <button
          onClick={onOpenTaskModal}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition group ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition duration-300" />
          {!isCollapsed && <span>Create Task</span>}
        </button>

        {/* Menu Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Main Menu
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Sidebar Toggle & Logout */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {user && (
          <button
            onClick={onLogout}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        )}
      </div>
    </aside>
  );
}
