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
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Header - Soft Light White Theme */}
      <header className="sticky top-0 z-30 bg-white text-slate-900 border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="h-10 px-2 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-xs">
              <img src="/genwork-logo.jpg" alt="GENWORK Logo" className="h-8 object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wide text-slate-900">GENWORK</span>
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
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition flex items-center gap-1.5 ${
              userRole === 'admin' 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${userRole === 'admin' ? 'text-rose-600' : 'text-emerald-600'}`} />
            <span>Role: <strong className="capitalize">{userRole}</strong></span>
          </button>

          {/* Gamification Points Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-300/80 bg-amber-50 text-amber-900 font-bold text-xs shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{user.points || 0} pts</span>
            {user.tier && <span className="text-amber-800 font-medium">({user.tier.name} {user.tier.level})</span>}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-700 text-white font-bold text-sm flex items-center justify-center shadow-md">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                  <p className="font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Batch:</span>
                    <span className="text-emerald-700 font-bold">{user.batch}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mt-1">
                    <span>Points:</span>
                    <span className="text-amber-600 font-bold">{user.points} pts</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setCurrentView('dashboard'); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 font-medium"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
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
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Switch to {userRole === 'student' ? 'Admin' : 'Student'} View</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button 
                  onClick={() => { logout(); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
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
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white text-slate-800 border-r border-slate-200 transition-all duration-200 flex flex-col z-20`}>
          <div className="px-4 py-3 border-b border-slate-100">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-bold shadow-lg shadow-emerald-950/20' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-3.5 border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 m-2.5 rounded-2xl text-xs space-y-1.5 shadow-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Tier Rank</span>
                <span className="text-emerald-800 font-extrabold">{user.tier.name} {user.tier.level}</span>
              </div>
              <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full transition-all"
                  style={{ width: `${(user.points / user.tier.nextTierPoints) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-emerald-800 text-right font-bold">
                {user.tier.nextTierPoints - user.points} pts to next tier
              </p>
            </div>
          )}
        </aside>

        {/* Content Container (100% Width & Smooth Scrolling) */}
        <main className="flex-1 overflow-y-auto bg-slate-50/60 p-4 sm:p-6 lg:p-8 relative min-h-screen">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
