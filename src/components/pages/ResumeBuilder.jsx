import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Sparkles, Download, CheckCircle2, AlertTriangle, FileText, User } from 'lucide-react';

export default function ResumeBuilder() {
  const { user, addPoints } = useApp();
  const [targetJobDesc, setTargetJobDesc] = useState('Seeking a Full Stack Software Engineer skilled in React, Node.js, Data Structures, and SQL.');
  const [atsScore, setAtsScore] = useState(88);

  const handleATSCheck = () => {
    setAtsScore(94);
    addPoints(20, 'Ran ATS Resume Check');
    alert("ATS Scoring Engine: 94% Match Score! Keywords 'React', 'Data Structures', 'SQL' verified.");
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              AI Resume Builder & ATS Checker
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                Kickresume-style
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Auto-sync platform certifications, AI bullet-point enhancer & ATS keyword parser.
            </p>
          </div>
        </div>

        <button 
          onClick={() => alert("Downloading ATS-optimized PDF Resume...")}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4 text-slate-950" /> Export ATS PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Resume Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <p className="text-xs text-slate-500">{user.email} • {user.studentId} • {user.institution}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full">Verified Student</span>
          </div>

          {/* Education & Platform Achievements */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">EDUCATION & CERTIFICATIONS</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
              <p className="font-extrabold text-slate-900">{user.department} — {user.batch}</p>
              <p className="text-slate-600">Platform Level: {user.tier.name} ({user.points} pts) • Versant English Band: 7.5</p>
            </div>
          </div>

          {/* Project Bullet Enhancer */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>PROJECT EXPERIENCE (AI ENHANCED)</span>
              <button onClick={() => alert("AI Bullet Enhancer: Quantified achievement metrics added!")} className="text-amber-600 font-bold text-[10px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Quantify Bullet
              </button>
            </h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 space-y-2 font-medium">
              <p className="font-bold text-slate-900">• Full Stack Student Readiness Portal</p>
              <p className="text-slate-600">Developed a full-stack platform with JWT auth, reducing manual placement tracking time by 40% across 500+ student cohorts.</p>
            </div>
          </div>
        </div>

        {/* Right Column: ATS Match Score Engine */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center">
            <span className="text-xs font-black uppercase text-slate-400">ATS KEYWORD MATCH SCORE</span>
            
            <div className="w-32 h-32 mx-auto rounded-full bg-emerald-950 border-4 border-emerald-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-amber-400">{atsScore}%</span>
            </div>

            <div className="text-left space-y-2 pt-2">
              <label className="text-[10px] font-bold uppercase text-slate-400">Target Job Description</label>
              <textarea
                value={targetJobDesc}
                onChange={e => setTargetJobDesc(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none"
              />
              <button 
                onClick={handleATSCheck}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 shadow-sm"
              >
                Run ATS Match Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
