import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Trophy, FileSpreadsheet, Headphones, Target,
  Keyboard, BookOpen, Video, Users, FileText,
  Menu, LogOut, ShieldCheck, Bot, Layers, Clock, Briefcase, Award, Heart, MessageSquare, Flame,
  MoreHorizontal, X, Compass, User
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'assessments', label: 'Assessments', icon: FileSpreadsheet },
  { id: 'lsrw', label: 'LSRW Practice', icon: Headphones },
  { id: 'typing-test', label: 'Typing Test', icon: Keyboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'smart-notes', label: 'Smart Notes', icon: FileText },
  { id: 'study-planner', label: 'Study Planner', icon: Clock },
  { id: 'resume-builder', label: 'AI Resume Builder', icon: FileSpreadsheet },
  { id: 'mock-interview', label: 'AI Mock Interview', icon: Video },
  { id: 'doubt-forum', label: 'Doubt Forum', icon: MessageSquare },
  { id: 'job-board', label: 'Job Placement Board', icon: Briefcase },
  { id: 'certifications', label: 'Certifications & Portfolio', icon: Award },
  { id: 'pair-programming', label: 'Pair Programming', icon: Users },
  { id: 'blogs', label: 'Blogs', icon: FileText },
];

export const ADMIN_NAV_ITEMS = [
  { id: 'admin', label: 'Admin Command Center', icon: ShieldCheck },
  { id: 'admin-overview', label: '1. Overview', icon: LayoutDashboard },
  { id: 'admin-people', label: '2. People & RBAC', icon: Users },
  { id: 'admin-content', label: '3. Content Pipeline', icon: Layers },
  { id: 'admin-engagement', label: '4. Gamification & Blogs', icon: Flame },
  { id: 'admin-monitoring', label: '5. Live Proctoring & Audit', icon: ShieldCheck },
  { id: 'admin-reports', label: '6. Custom Reports', icon: FileSpreadsheet },
  { id: 'admin-settings', label: '7. Platform Settings', icon: Bot },
  { id: 'admin-dir', label: 'Student Directory', icon: Users },
  { id: 'admin-rbac', label: 'RBAC Permission Matrix', icon: ShieldCheck },
  { id: 'admin-csv', label: 'Batch & CSV Bulk Import', icon: FileSpreadsheet },
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
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  
  // Admin role gets clean dedicated Admin Command Center navigation
  const navList = userRole === 'admin' ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  // Key mobile bottom nav items for high-frequency touch access
  const mobileBottomNavItems = userRole === 'admin' ? [
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
    { id: 'admin-people', label: 'People', icon: Users },
    { id: 'admin-monitoring', label: 'Proctor', icon: ShieldCheck },
    { id: 'admin-reports', label: 'Reports', icon: FileSpreadsheet },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessments', label: 'Practice', icon: FileSpreadsheet },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'smart-notes', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950 pb-16 md:pb-0">
      {/* Top Header - White Clean Theme with Safe Area padding */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl text-slate-900 border-b border-slate-200 h-16 flex items-center justify-between px-3 sm:px-6 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="hidden md:flex p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition min-w-[44px] min-h-[44px] items-center justify-center"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMoreOpen(true)}
            className="flex md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition min-w-[44px] min-h-[44px] items-center justify-center"
            title="Open Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="h-9 sm:h-10 px-2 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-xs">
              <img src="/genwork-logo.jpg" alt="GEN-VNXV Logo" className="h-6 sm:h-7 object-contain rounded" />
            </div>
            <div>
              <span className="font-serif font-black text-lg sm:text-xl tracking-wider text-slate-900">GEN-<span className="text-red-600">VNXV</span></span>
              <span className="hidden sm:block text-[9px] uppercase font-bold tracking-widest text-slate-500">Skill & Placement Readiness</span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Role Switcher Pill */}
          <button
            onClick={() => {
              const nextRole = userRole === 'student' ? 'admin' : 'student';
              setUserRole(nextRole);
              if (nextRole === 'admin') setCurrentView('admin');
              else setCurrentView('dashboard');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 min-h-[36px] ${
              userRole === 'admin' 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${userRole === 'admin' ? 'text-rose-600' : 'text-emerald-600'}`} />
            <span className="capitalize text-[11px] sm:text-xs">Role: <strong>{userRole}</strong></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none min-w-[44px] min-h-[44px] justify-center"
              aria-label="User profile menu"
            >
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md border border-slate-700">
                {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Signed in as</p>
                  <p className="font-bold text-slate-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Batch:</span>
                    <span className="text-emerald-700 font-bold">{user.batch}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setCurrentView('dashboard'); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-3 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 font-bold transition min-h-[44px]"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-700" />
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
                  className="w-full text-left px-4 py-3 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 font-bold transition min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>Switch to {userRole === 'student' ? 'Admin' : 'Student'} View</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button 
                  onClick={() => { logout(); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-4 py-3 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold transition min-h-[44px]"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Desktop / Tablet Sidebar (Hidden on Mobile 360-640px) */}
        <aside className={`hidden md:flex ${sidebarOpen ? 'w-64' : 'w-16'} bg-white text-slate-800 border-r border-slate-200 transition-all duration-200 flex-col z-20 shadow-xs h-full shrink-0`}>
          <div className="px-3 py-2 border-b border-slate-100 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block truncate">
              {sidebarOpen ? (userRole === 'admin' ? 'ADMINISTRATION' : 'STUDENT NAVIGATION') : 'NAV'}
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin">
            {navList.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                  }}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[44px] relative ${
                    isActive 
                      ? 'bg-slate-900 text-white font-extrabold shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {sidebarOpen && <span className="truncate text-xs font-semibold">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Container (Wide Max Width Container ~1440-1600px) */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-3 sm:p-6 lg:p-8 relative h-full">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Fixed for 360px - 640px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg safe-area-inset-bottom">
        {mobileBottomNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[56px] min-h-[48px] transition-all ${
                isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-slate-900 text-white' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setMobileMoreOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[56px] min-h-[48px] transition-all ${
            mobileMoreOpen ? 'text-slate-900 font-extrabold' : 'text-slate-500 font-medium'
          }`}
        >
          <div className="p-1 rounded-lg">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">More</span>
        </button>
      </div>

      {/* Mobile Full Screen "More" Sheet */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Platform Navigation</h3>
                <p className="text-xs text-slate-500 font-medium">All modules & tools tailored for phone access</p>
              </div>
              <button 
                onClick={() => setMobileMoreOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-1.5 scrollbar-thin">
              {navList.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMoreOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all min-h-[44px] ${
                      isActive 
                        ? 'bg-slate-900 text-white font-black shadow-md' 
                        : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

