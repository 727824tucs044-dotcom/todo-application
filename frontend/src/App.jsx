import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import CalendarView from './components/CalendarView';
import RemindersView from './components/RemindersView';
import FocusMode from './components/FocusMode';
import ProfileView from './components/ProfileView';
import AdminView from './components/AdminView';
import TaskModal from './components/TaskModal';
import AuthModal from './components/AuthModal';
import ConfirmModal from './components/ConfirmModal';
import CommandPalette from './components/CommandPalette';
import { taskApi } from './services/api';

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('landing'); // landing, dashboard, tasks, calendar, reminders, focus, profile, admin

  // Modal Controls
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Sidebar Collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');

  // Initial Demo Tasks
  const defaultTasks = [
    {
      id: 101,
      title: 'Architect Spring Boot REST Security Suite',
      description: 'Implement JWT token filter, BCrypt password encoder, and role-based authorization endpoints.',
      priority: 'HIGH',
      category: 'Dev',
      status: 'COMPLETE',
      deadline: new Date(Date.now() + 86400000).toISOString(),
      reminderDate: new Date(Date.now() + 3600000).toISOString(),
    },
    {
      id: 102,
      title: 'Design TaskFlow Pro Glassmorphism Frontend',
      description: 'Build Apple & Linear inspired dashboard with HTML5 particles canvas, Framer Motion, and dark mode.',
      priority: 'HIGH',
      category: 'Design',
      status: 'INCOMPLETE',
      deadline: new Date(Date.now() + 172800000).toISOString(),
      reminderDate: new Date(Date.now() + 7200000).toISOString(),
    },
    {
      id: 103,
      title: 'Set up Precision Smart Reminders & Calendar Grid',
      description: 'Integrate FullCalendar month/week views with real-time countdown meters and audio triggers.',
      priority: 'MEDIUM',
      category: 'Work',
      status: 'INCOMPLETE',
      deadline: new Date(Date.now() + 259200000).toISOString(),
      reminderDate: new Date(Date.now() + 14400000).toISOString(),
    },
  ];

  const [tasks, setTasks] = useState(defaultTasks);

  // Sync user state on login
  useEffect(() => {
    if (user) {
      fetchTasks();
      if (activeTab === 'landing') {
        setActiveTab('dashboard');
      }
    } else {
      setActiveTab('landing');
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await taskApi.getTasks();
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setTasks(res.data);
      }
    } catch (err) {
      console.warn('Backend tasks API unreachable, retaining interactive client state:', err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-theme', isDarkMode);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActiveTab('landing');
  };

  const handleSaveTask = async (taskPayload, taskId) => {
    try {
      if (taskId) {
        await taskApi.updateTask(taskId, taskPayload);
      } else {
        await taskApi.createTask(taskPayload);
      }
      fetchTasks();
    } catch (err) {
      // Local Fallback State
      if (taskId) {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...taskPayload } : t)));
      } else {
        const newTask = {
          id: Date.now(),
          ...taskPayload,
          status: 'INCOMPLETE',
          createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
      }
    }
  };

  const handleToggleComplete = async (taskId) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    const willBeComplete = targetTask && targetTask.status !== 'COMPLETE';

    if (willBeComplete) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981'],
      });
    }

    try {
      await taskApi.toggleComplete(taskId);
      fetchTasks();
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: t.status === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE' } : t))
      );
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDeleteId) return;
    try {
      await taskApi.deleteTask(taskToDeleteId);
      fetchTasks();
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDeleteId));
    }
    setTaskToDeleteId(null);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#090d16] text-slate-100' : 'light-theme bg-slate-50 text-slate-900'} relative transition-colors duration-300`}>
      {/* Dynamic Ambient Background Canvas */}
      <BackgroundCanvas />

      {/* Navbar */}
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onGoHome={() => setActiveTab(user ? 'dashboard' : 'landing')}
        tasks={tasks}
      />

      {/* Authenticated Sidebar Layout vs Landing View */}
      {user && activeTab !== 'landing' ? (
        <div className="flex pt-16 min-h-screen">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenTaskModal={() => {
              setTaskToEdit(null);
              setIsTaskModalOpen(true);
            }}
            onLogout={handleLogout}
            user={user}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
            {activeTab === 'dashboard' || activeTab === 'tasks' ? (
              <DashboardView
                user={user}
                tasks={tasks}
                onOpenTaskModal={() => {
                  setTaskToEdit(null);
                  setIsTaskModalOpen(true);
                }}
                onToggleComplete={handleToggleComplete}
                onEditTask={(task) => {
                  setTaskToEdit(task);
                  setIsTaskModalOpen(true);
                }}
                onDeleteTask={(id) => {
                  setTaskToDeleteId(id);
                  setIsConfirmOpen(true);
                }}
                onSelectTab={setActiveTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ) : activeTab === 'calendar' ? (
              <CalendarView
                tasks={tasks}
                onOpenTaskModal={() => {
                  setTaskToEdit(null);
                  setIsTaskModalOpen(true);
                }}
              />
            ) : activeTab === 'reminders' ? (
              <RemindersView tasks={tasks} onToggleComplete={handleToggleComplete} />
            ) : activeTab === 'focus' ? (
              <FocusMode />
            ) : activeTab === 'profile' ? (
              <ProfileView
                user={user}
                onUpdateUser={setUser}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                tasks={tasks}
              />
            ) : activeTab === 'admin' ? (
              <AdminView />
            ) : null}
          </main>
        </div>
      ) : (
        <LandingPage
          onGetStarted={() => handleOpenAuth('register')}
          onOpenAuth={() => handleOpenAuth('login')}
        />
      )}

      {/* Modals & Dialogs */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSaveTask={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task item?"
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onOpenTaskModal={() => {
          setTaskToEdit(null);
          setIsTaskModalOpen(true);
        }}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        user={user}
      />
    </div>
  );
}