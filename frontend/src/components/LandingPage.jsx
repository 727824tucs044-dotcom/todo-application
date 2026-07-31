import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Bell, Shield, Zap, Layers, Code, ChevronDown, Star, Play, Users, Clock, Award, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage({ onGetStarted, onOpenAuth }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const features = [
    {
      icon: Sparkles,
      title: 'Smart Task Management',
      description: 'Prioritize tasks dynamically with real-time status tracking, label tags, and drag-and-drop workflow.',
      color: 'from-indigo-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: Calendar,
      title: 'Interactive Calendar View',
      description: 'Visualize your deadlines across interactive monthly and weekly grids with color-coded event overlays.',
      color: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: Bell,
      title: 'Precision Smart Reminders',
      description: 'Never miss a critical deadline with automated audio-visual reminders and countdown notifications.',
      color: 'from-amber-500 to-rose-600',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: Clock,
      title: 'Focus & Pomodoro Timer',
      description: 'Boost your daily output using integrated single-tasking timer sprints and ambient soundscapes.',
      color: 'from-emerald-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: Shield,
      title: 'Enterprise Admin Control',
      description: 'Granular user role management, system health analytics, and audit logging built for scale.',
      color: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: Zap,
      title: 'Spring Boot REST Integration',
      description: 'Powered by a robust Java Spring Boot backend architecture providing high performance and JWT security.',
      color: 'from-blue-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Lead Product Manager at Stripe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      content: 'TaskFlow Pro transformed how our team manages sprint deadlines. The glassmorphism interface is stunning and the Spring Boot integration makes it blazingly fast.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Senior Software Engineer at Linear',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      content: 'The Pomodoro Focus mode combined with smart countdown reminders eliminated my daily procrastination completely. Best productivity SaaS hands down.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Design Director at Notion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      content: 'Extremely refined UX. Every micro-interaction feels deliberate, smooth, and high premium. It feels like an Apple product.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Is TaskFlow Pro completely integrated with the Spring Boot backend?',
      answer: 'Yes! TaskFlow Pro connects directly to a Spring Boot REST API for JWT authentication, user management, task CRUD operations, calendar query endpoints, and administrative controls.',
    },
    {
      question: 'Can I use TaskFlow Pro offline?',
      answer: 'Absolutely. TaskFlow Pro features intelligent client state fallback so you can explore all UI views, task interactions, and calendar features seamlessly even offline.',
    },
    {
      question: 'What technologies power the frontend animations?',
      answer: 'The frontend is engineered with React 19, Vite, Tailwind CSS v4, Framer Motion, HTML5 Canvas particles, and Lucide Icons for high-fps 60fps animations.',
    },
    {
      question: 'How do Smart Reminders work?',
      answer: 'You can attach reminder timestamps to tasks. The system calculates real-time countdowns and triggers sound and visual alerts when deadlines approach.',
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 overflow-x-hidden pt-20">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-indigo-600/20"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Generation Productivity SaaS</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl leading-tight"
        >
          Organize Your Work <br className="hidden sm:inline" />
          <span className="text-gradient">Smarter Than Ever Before.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed"
        >
          Manage tasks, deadlines, intelligent reminders, and full interactive calendars in one unified, modern platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition flex items-center justify-center space-x-3 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg glass-panel hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 transition flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 text-indigo-400 fill-indigo-400" />
            <span>Interactive Demo</span>
          </button>
        </motion.div>

        {/* HERO VISUAL MOCKUP & GRAPHIC BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl rounded-3xl glass-panel p-4 md:p-6 border border-slate-700/80 shadow-2xl relative group overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 text-xs text-slate-400 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="font-mono text-slate-500">taskflow-pro.saas/dashboard</span>
          </div>

          {/* Featured Hero Banner Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-64 sm:h-80 border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
              alt="TaskFlow Pro 3D Glassmorphism Hero Graphic"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-left max-w-md">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600/80 text-white uppercase tracking-wider">
                  Live Preview
                </span>
                <h3 className="text-2xl font-black text-white mt-2">Executive Productivity Suite</h3>
                <p className="text-xs text-slate-300 mt-1">Real-time Spring Boot REST integration with interactive task workflows.</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2 overflow-hidden">
                  {testimonials.map((t, idx) => (
                    <img key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src={t.avatar} alt={t.name} />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-200">10k+ Active Power Users</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="glass-panel p-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/20">
              <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">Today's Focus</div>
              <div className="text-xl font-bold text-white mb-2">Deploy Production API</div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">High Priority</span>
                <span>Due 4:00 PM</span>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">Weekly Velocity</div>
              <div className="text-2xl font-black text-white">94% Tasks Completed</div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[94%]" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-purple-950/20">
              <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">Smart Reminder</div>
              <div className="text-lg font-bold text-white">Team Sprint Sync</div>
              <div className="text-xs text-slate-400 mt-1">Starting in 15 mins</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* METRICS & STATS COUNTER */}
      <section className="border-y border-slate-800/80 bg-slate-950/40 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">99.9%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Uptime Guarantee</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">10k+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Tasks Automated</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">60 FPS</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Ultra Smooth UI</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">REST API</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Spring Boot Engine</div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID WITH HIGH RESOLUTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Engineered for Peak Performance</h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Every feature is crafted to help you eliminate friction, track progress, and accomplish more every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="glass-panel-interactive rounded-3xl border border-slate-800 overflow-hidden group flex flex-col justify-between"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Loved by Industry Professionals</h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Here is what engineering leads and product designers say about TaskFlow Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-indigo-500/40" />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPER STACK SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20 glass-panel rounded-3xl border border-slate-800 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 sm:p-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold uppercase mb-4">
              <Code className="w-4 h-4" />
              <span>Full-Stack Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built with Enterprise Tech</h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              TaskFlow Pro pairs a high-speed React 19 single-page frontend with a robust Java Spring Boot backend API. Secured with JWT tokens, BCrypt hashing, and dynamic database querying.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>Spring Boot REST API with Spring Security & JWT authentication</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>React 19 + Vite + Tailwind CSS v4 + Framer Motion</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>FullCalendar, Recharts, and Canvas confetti integration</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-950/80 font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto">
            <div className="text-slate-500 mb-2">// REST API Endpoints Overview</div>
            <div>POST /api/auth/login</div>
            <div>POST /api/auth/register</div>
            <div>GET  /api/tasks (Params: search, priority, status)</div>
            <div>POST /api/tasks (Payload: title, priority, deadline)</div>
            <div>PATCH /api/tasks/:id/complete</div>
            <div>GET  /api/calendar/tasks</div>
            <div>GET  /api/admin/users</div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 mt-2">Everything you need to know about TaskFlow Pro.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-white hover:text-indigo-400 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transform transition duration-300 ${openFaq === idx ? 'rotate-180 text-indigo-400' : 'text-slate-400'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
              T
            </div>
            <span className="font-bold text-white text-base">TaskFlow Pro</span>
          </div>

          <div>
            © {new Date().getFullYear()} TaskFlow Pro SaaS Inc. All rights reserved. Designed with precision.
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#demo" className="hover:text-white transition">Demo</a>
            <button onClick={onOpenAuth} className="hover:text-white transition">Sign In</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
