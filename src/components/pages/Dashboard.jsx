import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, Lock, FileText, Mail, Building2, Layers, IdCard, Shield, 
  Sparkles, CheckCircle2, Clock, Zap, ArrowRight, ChevronRight, Award, 
  Flame, Target, Keyboard, BookOpen, Headphones
} from 'lucide-react';

export default function Dashboard() {
  const { user, setCurrentView, addPoints } = useApp();

  const quickStats = [
    { label: "Total Points", value: `${user.points} pts`, desc: "Gamification Rank", icon: Trophy },
    { label: "Performance Tier", value: `${user.tier.name} ${user.tier.level}`, desc: "Active Status", icon: Shield },
    { label: "Completed Evaluations", value: "8 Passed", desc: "100% Pass Rate", icon: CheckCircle2 },
    { label: "Daily Streak", value: "7 Days", desc: "Active Learner", icon: Flame },
  ];

  const upcomingDeadlines = [
    { title: "Quantitative Aptitude Evaluation - Batch 2026", due: "Tomorrow, 6:00 PM", category: "Assessments", pts: "+150 pts" },
    { title: "Logical Reasoning & Puzzle Challenge", due: "Sep 12, 11:59 PM", category: "Practice Bank", pts: "+120 pts" },
    { title: "Versant English Speaking Practice Test 4", due: "Sep 15, 5:00 PM", category: "LSRW", pts: "+100 pts" },
  ];

  const badges = [
    { title: "Speed Demon", desc: "70+ WPM in Typing Test", icon: Zap },
    { title: "Top Evaluation", desc: "Scored 90%+ in Assessment", icon: Award },
    { title: "7-Day Streak", desc: "Completed practice 7 days in row", icon: Flame },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Banner & Welcome Card - Cinematic Pro Emerald Gold Gradient */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block mb-1">
            GENWORK STUDENT PLATFORM
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
            {user.institution} • {user.department} • Batch {user.passoutYear}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
              ID: {user.studentId}
            </span>
            <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-md text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30">
              Status: {user.status}
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
              {user.batch}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <button 
            onClick={() => alert('Generating student progress report PDF...')}
            className="px-4 py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-white" /> Download Report
          </button>
          <button 
            onClick={() => addPoints(100, "Daily Bonus")}
            className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" /> Claim Daily Bonus (+100 pts)
          </button>
        </div>

        {/* Cinematic Ambient Glow */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Quick Stats Grid - Cinematic Gradient Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Points", value: `${user.points} pts`, desc: "Gamification Rank", icon: Trophy, bg: "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/20" },
          { label: "Performance Tier", value: `${user.tier.name} ${user.tier.level}`, desc: "Active Status", icon: Shield, bg: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-600/20" },
          { label: "Completed Evaluations", value: "8 Passed", desc: "100% Pass Rate", icon: CheckCircle2, bg: "bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-teal-600/20" },
          { label: "Daily Streak", value: "7 Days", desc: "Active Learner", icon: Flame, bg: "bg-gradient-to-br from-rose-600 to-rose-700 text-white shadow-rose-600/20" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">{stat.label}</span>
                <p className="text-xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{stat.desc}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${stat.bg}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
