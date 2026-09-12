import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, Lock, FileText, Mail, Building2, Layers, IdCard, Shield, 
  Sparkles, CheckCircle2, Clock, Zap, ArrowRight, ChevronRight, Award, 
  Flame, Target, Keyboard, BookOpen, Headphones, Bot, Video, Briefcase, Heart
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
    { id: 'ai-tutor', title: 'AI Study Tutor', desc: 'OCR Doubt Solver', icon: Bot },
    { id: 'flashcards', title: 'Flashcards (SRS)', desc: 'Active Recall', icon: Layers },
    { id: 'mock-interview', title: 'AI Mock Interview', desc: 'STAR Scoring', icon: Video },
    { id: 'job-board', title: 'Job Placement', desc: 'AI Matched Drives', icon: Briefcase },
  ];

  return (
    <div className="space-y-8 text-slate-100 font-sans pb-12">
      {/* Asymmetric Hero Framing Profile Card — Obsidian & Champagne Sheen */}
      <div className="glossy-card rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-champagne-400/25">
        
        {/* Left Focal Info */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-champagne-400/10 border border-champagne-400/30 text-champagne-300 text-[10px] font-bold uppercase tracking-widest">
              OFFICIAL READINESS PROFILE
            </span>
            <span className="px-3 py-1 rounded-full bg-obsidian-800 border border-obsidian-700 text-slate-400 text-[10px] font-mono">
              ID: {user.studentId}
            </span>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {user.name}
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              {user.institution} • {user.department} • Batch {user.passoutYear}
            </p>
          </div>

          {/* Key Attributes Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-700/80 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Status</span>
              <span className="font-bold text-emerald-400">{user.status}</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-700/80 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Batch Group</span>
              <span className="font-bold text-champagne-200 truncate block">{user.batch}</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-700/80 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Current Rank</span>
              <span className="font-bold text-champagne-400 font-mono">#{user.points > 2000 ? '4' : '12'} in Batch</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-700/80 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">LSRW Band</span>
              <span className="font-bold text-white font-mono">7.5 / 9.0</span>
            </div>
          </div>
        </div>

        {/* Right Foil Sheen Tier Badge & Action */}
        <div className="flex flex-col items-center lg:items-end justify-center space-y-4">
          <div className="foil-sheen rounded-3xl p-6 border-2 border-champagne-400/50 text-center space-y-2 min-w-[220px] shadow-foil">
            <Shield className="w-10 h-10 text-champagne-400 mx-auto" />
            <div>
              <span className="text-[10px] font-black uppercase text-champagne-300/80 tracking-widest block">PERFORMANCE TIER</span>
              <h2 className="font-serif text-2xl font-black text-white">{user.tier?.name || 'Level 1'}</h2>
              <span className="text-xs font-mono font-bold text-champagne-200">{user.tier?.level || 'Lv1'} Rank</span>
            </div>
          </div>

          <button 
            onClick={() => addPoints(100, "Daily Platform Login Bonus")}
            className="btn-metallic w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-obsidian-950" />
            <span>CLAIM DAILY BONUS (+100 PTS)</span>
          </button>
        </div>
      </div>

      {/* Hero Numerals Stat Grid (Numerals as Design Objects per Spec §2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glossy-card glossy-card-hover rounded-2xl p-6 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.highlight ? 'text-champagne-400' : 'text-slate-500'}`} />
              </div>
              <p className="font-serif text-3xl font-black text-white font-mono">{stat.value}</p>
              <p className="text-xs font-medium text-champagne-300/70">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Feature Launches & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Launch Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-champagne-400" /> AI Placement Super-App Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLaunch.map(mod => {
              const Icon = mod.icon;
              return (
                <div 
                  key={mod.id}
                  onClick={() => setCurrentView(mod.id)}
                  className="glossy-card glossy-card-hover rounded-2xl p-5 cursor-pointer flex items-center space-x-4 border border-obsidian-700/80 group"
                >
                  <div className="p-3.5 rounded-xl bg-obsidian-950 border border-champagne-400/30 text-champagne-400 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-champagne-300 transition">{mod.title}</h3>
                    <p className="text-xs text-slate-400">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deadlines Section */}
        <div className="glossy-card rounded-3xl p-6 space-y-4 border border-obsidian-700">
          <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-champagne-400" /> Upcoming Deadlines
          </h2>

          <div className="space-y-3">
            {upcomingDeadlines.map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-obsidian-950/80 border border-obsidian-800 space-y-1">
                <span className="text-[10px] font-bold text-champagne-400 uppercase tracking-wider">{d.category} • {d.pts}</span>
                <h4 className="font-bold text-xs text-white">{d.title}</h4>
                <span className="text-[10px] text-slate-400 block">Due: {d.due}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
