import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Trophy, FileSpreadsheet, Headphones, Target,
  Keyboard, BookOpen, Video, Users, FileText,
  Menu, LogOut, ShieldCheck, Bot, Layers, Clock, Briefcase, Award, Heart, MessageSquare
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-tutor', label: 'AI Study Tutor', icon: Bot },
  { id: 'flashcards', label: 'Flashcards (SRS)', icon: Layers },
  { id: 'smart-notes', label: 'Smart Notes', icon: FileText },
  { id: 'study-planner', label: 'Study Planner', icon: Clock },
  { id: 'resume-builder', label: 'AI Resume Builder', icon: FileSpreadsheet },
  { id: 'mock-interview', label: 'AI Mock Interview', icon: Video },
  { id: 'doubt-forum', label: 'Doubt Forum', icon: MessageSquare },
  { id: 'job-board', label: 'Job Placement Board', icon: Briefcase },
  { id: 'certifications', label: 'Certifications & Portfolio', icon: Award },
  { id: 'wellbeing', label: 'Wellbeing Check-in', icon: Heart },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'assessments', label: 'Assessments', icon: FileSpreadsheet },
  { id: 'lsrw', label: 'LSRW Practice', icon: Headphones },
  { id: 'practice', label: 'Practice Bank', icon: Target },
  { id: 'typing-test', label: 'Typing Test', icon: Keyboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'trainings', label: 'Trainings', icon: Video },
  { id: 'pair-programming', label: 'Pair Programming', icon: Users },
  { id: 'blogs', label: 'Blogs', icon: FileText },
];

export const ADMIN_NAV_ITEMS = [
  { id: 'admin', label: 'Admin Command Center', icon: ShieldCheck },
  { id: 'assessments', label: 'Assessment Manager', icon: FileSpreadsheet },
  { id: 'courses', label: 'Course Content', icon: BookOpen },
  { id: 'blogs', label: 'Publish Blogs', icon: FileText },
];

export default function Layout({ children }) {
  const { 
    currentView, 
    setCurrentView, 
    userRole, 
    setUserRole, 
    user, 
    logout,
    sidebarOpen, 
    setSidebarOpen
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navList = userRole === 'admin' ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-champagne-400 selection:text-obsidian-950">
      {/* Top Header - Obsidian Glossy Bar */}
      <header className="sticky top-0 z-40 bg-obsidian-900/90 backdrop-blur-xl text-white border-b border-obsidian-700/60 h-16 flex items-center justify-between px-4 sm:px-6 shadow-glossy">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 text-slate-400 hover:text-champagne-400 hover:bg-obsidian-800 rounded-xl transition"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="h-10 px-2.5 bg-obsidian-850 rounded-xl flex items-center justify-center border border-champagne-400/30 shadow-inner">
              <img src="/genwork-logo.jpg" alt="GENWORK Logo" className="h-7 object-contain rounded" />
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-wider text-white">GEN<span className="text-champagne-400">WORK</span></span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-champagne-300/70">Obsidian & Champagne Edition</span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Role Switcher Pill */}
          <button
            onClick={() => {
              const nextRole = userRole === 'student' ? 'admin' : 'student';
              setUserRole(nextRole);
              if (nextRole === 'admin') setCurrentView('admin');
              else setCurrentView('dashboard');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 ${
              userRole === 'admin' 
                ? 'bg-garnet-500/20 border-garnet-500/50 text-rose-300' 
                : 'bg-champagne-400/10 border-champagne-400/40 text-champagne-200 hover:bg-champagne-400/20'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${userRole === 'admin' ? 'text-rose-400' : 'text-champagne-400'}`} />
            <span>Role: <strong className="capitalize">{userRole}</strong></span>
          </button>

          {/* Gamification Points Badge - Champagne Sheen */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne-400/40 bg-gradient-to-r from-obsidian-850 via-obsidian-800 to-obsidian-850 text-champagne-200 font-bold text-xs shadow-glossy">
            <Trophy className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
            <span className="font-mono text-white font-extrabold">{user.points || 0} PTS</span>
            {user.tier && <span className="text-champagne-300 font-serif italic text-[11px]">({user.tier.name} {user.tier.level})</span>}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne-400 to-champagne-500 text-obsidian-950 font-black text-sm flex items-center justify-center shadow-foil border border-champagne-200/50">
                {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-70 glass-modal rounded-2xl shadow-glossy border border-champagne-400/30 py-3 z-50 text-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-obsidian-700/60">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-champagne-400/80">Signed in as</p>
                  <p className="font-bold text-white text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="px-4 py-2.5 border-b border-obsidian-700/60 bg-obsidian-950/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Batch:</span>
                    <span className="text-champagne-300 font-bold">{user.batch}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mt-1">
                    <span>Points:</span>
                    <span className="text-champagne-400 font-bold font-mono">{user.points} pts</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setCurrentView('dashboard'); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-obsidian-800 hover:text-champagne-300 flex items-center gap-2 font-bold transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-champagne-400" />
                  <span>My Profile & Dashboard</span>
                </button>
                <button 
                  onClick={() => { 
                    const nextRole = userRole === 'student' ? 'admin' : 'student';
                    setUserRole(nextRole);
                    if (nextRole === 'admin') setCurrentView('admin');
                    else setCurrentView('dashboard');
                    setProfileDropdownOpen(false); 
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-obsidian-800 hover:text-champagne-300 flex items-center gap-2 font-bold transition"
                >
                  <ShieldCheck className="w-4 h-4 text-champagne-400" />
                  <span>Switch to {userRole === 'student' ? 'Admin' : 'Student'} View</span>
                </button>
                <div className="border-t border-obsidian-700/60 my-1"></div>
                <button 
                  onClick={() => { logout(); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 font-bold transition"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-obsidian-900/95 text-slate-200 border-r border-obsidian-700/60 transition-all duration-200 flex flex-col z-20 shadow-xl`}>
          <div className="px-4 py-3 border-b border-obsidian-700/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-400/80 block">
              {sidebarOpen ? (userRole === 'admin' ? 'ADMINISTRATION' : 'STUDENT NAVIGATION') : 'NAV'}
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
            {navList.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-obsidian-800 via-obsidian-850 to-obsidian-800 text-white font-extrabold shadow-glossy border border-champagne-400/40 border-l-4 border-l-champagne-400' 
                      : 'text-slate-400 hover:bg-obsidian-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-champagne-400' : 'text-slate-500'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Sidebar Footer */}
          {sidebarOpen && user.tier && (
            <div className="p-3.5 border border-champagne-400/20 bg-gradient-to-br from-obsidian-850 to-obsidian-900 m-2.5 rounded-2xl text-xs space-y-2 shadow-inner">
              <div className="flex justify-between font-bold text-slate-200">
                <span className="text-[11px]">Tier Rank</span>
                <span className="text-champagne-300 font-serif italic text-xs">{user.tier.name} {user.tier.level}</span>
              </div>
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden border border-obsidian-700">
                <div 
                  className="bg-gradient-to-r from-champagne-500 to-champagne-300 h-full rounded-full transition-all shadow-foil"
                  style={{ width: `${(user.points / user.tier.nextTierPoints) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 text-right font-mono">
                {user.tier.nextTierPoints - user.points} pts to next tier
              </p>
            </div>
          )}
        </aside>

        {/* Content Container (100% Width & Smooth Scrolling) */}
        <main className="flex-1 overflow-y-auto bg-obsidian-950 p-4 sm:p-6 lg:p-8 relative min-h-screen">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
