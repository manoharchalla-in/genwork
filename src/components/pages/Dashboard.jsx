import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, Lock, FileText, Mail, Building2, Layers, IdCard, Shield, 
  Sparkles, CheckCircle2, Clock, Zap, ArrowRight, ChevronRight, Award, 
  Flame, Target, Keyboard, BookOpen, Headphones, Bot, Video, Briefcase, Heart, FileSpreadsheet
} from 'lucide-react';

export default function Dashboard() {
  const { user, setCurrentView, addPoints } = useApp();

  const quickStats = [
    { label: "Total Points", value: `${user.points || 0} pts`, desc: "Gamification Rank", icon: Trophy, highlight: true },
    { label: "Performance Tier", value: `${user.tier?.name || 'Level 1'} ${user.tier?.level || 'Lv1'}`, desc: "Active Status", icon: Shield, highlight: false },
    { label: "Completed Evaluations", value: "8 Passed", desc: "100% Pass Rate", icon: CheckCircle2, highlight: false },
    { label: "Daily Practice Streak", value: "7 Days", desc: "Active Learner", icon: Flame, highlight: true },
  ];

  const upcomingDeadlines = [
    { title: "Quantitative Aptitude Evaluation - Batch 2026", due: "Tomorrow, 6:00 PM", category: "Assessments", pts: "+150 pts" },
    { title: "Logical Reasoning & Puzzle Challenge", due: "Sep 12, 11:59 PM", category: "Practice Bank", pts: "+120 pts" },
    { title: "Versant English Speaking Practice Test 4", due: "Sep 15, 5:00 PM", category: "LSRW", pts: "+100 pts" },
  ];

  const quickLaunch = [
    { id: 'resume-builder', title: 'AI Resume Builder', desc: 'ATS Resume Generator', icon: FileSpreadsheet },
    { id: 'smart-notes', title: 'Smart Notes', desc: 'AI Summarizer', icon: FileText },
    { id: 'mock-interview', title: 'AI Mock Interview', desc: 'Under Working', icon: Video },
    { id: 'job-board', title: 'Job Placement', desc: 'AI Matched Drives', icon: Briefcase },
  ];

  return (
    <div className="space-y-8 text-slate-900 font-sans pb-12">
      {/* Hero Profile Card — Clean White Light Theme */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Left Focal Info */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-extrabold uppercase tracking-widest">
              OFFICIAL READINESS PROFILE
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold">
              ID: {user.studentId}
            </span>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {user.name}
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-1">
              {user.institution} • {user.department} • Batch {user.passoutYear}
            </p>
          </div>

          {/* Key Attributes Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Status</span>
              <span className="font-extrabold text-emerald-600">{user.status}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Batch Group</span>
              <span className="font-bold text-slate-800 truncate block">{user.batch}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Current Rank</span>
              <span className="font-extrabold text-slate-900 font-mono">#{user.points > 2000 ? '4' : '12'} in Batch</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">LSRW Band</span>
              <span className="font-bold text-slate-900 font-mono">7.5 / 9.0</span>
            </div>
          </div>
        </div>

        {/* Right Tier Badge & Action */}
        <div className="flex flex-col items-center lg:items-end justify-center space-y-4">
          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-300 text-center space-y-2 min-w-[220px] shadow-sm">
            <Shield className="w-10 h-10 text-amber-600 mx-auto" />
            <div>
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-widest block">PERFORMANCE TIER</span>
              <h2 className="font-serif text-2xl font-black text-slate-900">{user.tier?.name || 'Level 1'}</h2>
              <span className="text-xs font-mono font-bold text-amber-700">{user.tier?.level || 'Lv1'} Rank</span>
            </div>
          </div>

          <button 
            onClick={() => addPoints(100, "Daily Platform Login Bonus")}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CLAIM DAILY BONUS (+100 PTS)</span>
          </button>
        </div>
      </div>

      {/* Hero Numerals Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.highlight ? 'text-amber-500' : 'text-slate-400'}`} />
              </div>
              <p className="font-serif text-3xl font-black text-slate-900 font-mono">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Feature Launches & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Launch Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> AI Placement Super-App Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLaunch.map(mod => {
              const Icon = mod.icon;
              return (
                <div 
                  key={mod.id}
                  onClick={() => setCurrentView(mod.id)}
                  className="bg-white rounded-2xl p-5 cursor-pointer flex items-center space-x-4 border border-slate-200 hover:border-slate-400 shadow-xs transition group"
                >
                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 transition">{mod.title}</h3>
                    <p className="text-xs text-slate-500">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deadlines Section */}
        <div className="bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" /> Upcoming Deadlines
          </h2>

          <div className="space-y-3">
            {upcomingDeadlines.map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">{d.category} • {d.pts}</span>
                <h4 className="font-bold text-xs text-slate-900">{d.title}</h4>
                <span className="text-[10px] text-slate-500 block font-medium">Due: {d.due}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
