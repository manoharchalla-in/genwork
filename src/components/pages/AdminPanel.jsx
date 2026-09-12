import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, Users, Upload, BarChart2, Plus, Download, FileSpreadsheet, 
  BookOpen, Lock, CheckCircle2, Search, Sliders, Shield, RefreshCw,
  AlertTriangle, Eye, EyeOff, Activity, Bell, FileText, Check, X, Filter,
  Settings, Award, Flame, Zap, Target, Layers, Play, Video, MessageSquare,
  HelpCircle, Trash2, Edit3, UserPlus, Server, Database, Key, ShieldAlert,
  ArrowRight, Sparkles, TrendingUp, CheckSquare, Clock, Globe
} from 'lucide-react';

export default function AdminPanel() {
  const { user, setUser, addPoints, userRole, setUserRole } = useApp();
  
  // Primary Navigation Clusters (Section 2 Spec)
  const [activeSection, setActiveSection] = useState('overview'); // overview, people, content, engagement, monitoring, reports, settings
  const [subTab, setSubTab] = useState('kpis'); // Subtab within activeSection
  
  // Impersonation state
  const [impersonatingStudent, setImpersonatingStudent] = useState(null);

  // Institution & Scope Filter (Super Admin / ABAC)
  const [selectedInstitution, setSelectedInstitution] = useState('CITY Engineering College');
  const [selectedBatch, setSelectedBatch] = useState('ALL');

  // --- MOCK DATA FOR SECTIONS ---
  
  // 1. Roles & Access
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', scope: 'Global (All Institutions)', usersCount: 2, isCustom: false },
    { id: 2, name: 'Institution Admin', scope: 'CITY Engineering College', usersCount: 5, isCustom: false },
    { id: 3, name: 'Placement Trainer', scope: 'ABAP - CITY 2026 Batch', usersCount: 12, isCustom: false },
    { id: 4, name: 'Content Moderator', scope: 'Blogs & Forums', usersCount: 3, isCustom: true },
    { id: 5, name: 'Live Proctor', scope: 'Proctored Assessments', usersCount: 8, isCustom: true }
  ]);

  // 2. People Data
  const [students, setStudents] = useState([
    { id: '23HT1A4301', name: 'ALEXANDER PIERCE', email: 'alexander.p@student.city.edu', batch: 'ABAP - CITY 2026', dept: 'CSE', status: 'Active', points: 1450, tier: 'Level 1', risk: 'Low', missed: 0, theta: '+1.4' },
    { id: '23HT1A4302', name: 'VIKRAM SHARMA', email: 'vikram.s@student.city.edu', batch: 'ABAP - CITY 2026', dept: 'CSE', status: 'Active', points: 2850, tier: 'Level 2', risk: 'High', missed: 3, theta: '-0.8' },
    { id: '23HT1A4303', name: 'ANANYA ROY', email: 'ananya.r@student.city.edu', batch: 'ABAP - CITY 2026', dept: 'ECE', status: 'Active', points: 4100, tier: 'Level 2', risk: 'Low', missed: 0, theta: '+2.1' },
    { id: '23HT1A4304', name: 'ROHAN VERMA', email: 'rohan.v@student.city.edu', batch: 'ABAP - CITY 2026', dept: 'CSE', status: 'Inactive', points: 920, tier: 'Level 1', risk: 'Medium', missed: 2, theta: '-0.2' },
    { id: '23HT1A4305', name: 'PRIYA NAIR', email: 'priya.n@student.city.edu', batch: 'ABAP - CITY 2026', dept: 'IT', status: 'Active', points: 6300, tier: 'Level 3', risk: 'Low', missed: 0, theta: '+1.9' },
  ]);

  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);
  const [pointAdjustAmount, setPointAdjustAmount] = useState(100);
  const [pointAdjustReason, setPointAdjustReason] = useState('Hackathon Winner Bonus');

  // 3. Content Modules Data
  const [assessments, setAssessments] = useState([
    { id: 'ASS-101', title: 'Quantitative Aptitude Evaluation', category: 'Aptitude', questions: 25, duration: 45, status: 'Published', proctored: true, batch: 'ABAP - CITY 2026' },
    { id: 'ASS-102', title: 'Data Structures & Algorithms Mock', category: 'Coding', questions: 15, duration: 60, status: 'Draft', proctored: true, batch: 'ABAP - CITY 2026' },
    { id: 'ASS-103', title: 'Versant Communication Assessment', category: 'LSRW', questions: 30, duration: 30, status: 'Published', proctored: false, batch: 'ABAP - CITY 2026' },
  ]);

  const [lsrwQueue, setLsrwQueue] = useState([
    { id: 'LSRW-SUB-88', student: 'VIKRAM SHARMA', type: 'Speaking - Retell Sentence', aiScore: 68, subscores: { fluency: 65, pronunciation: 70, vocabulary: 68 }, audioUrl: '#', status: 'Pending Review' },
    { id: 'LSRW-SUB-89', student: 'ROHAN VERMA', type: 'Writing - Essay Submission', aiScore: 74, subscores: { grammar: 72, coherence: 78, vocabulary: 72 }, status: 'Pending Review' }
  ]);

  const [liveProctorSessions, setLiveProctorSessions] = useState([
    { id: 'PROC-1', student: 'VIKRAM SHARMA', assessment: 'Quantitative Aptitude Evaluation', warnings: 3, lastSwitch: '2 mins ago', status: 'Red Flag' },
    { id: 'PROC-2', student: 'ALEXANDER PIERCE', assessment: 'Quantitative Aptitude Evaluation', warnings: 0, lastSwitch: 'None', status: 'Clean' },
    { id: 'PROC-3', student: 'ANANYA ROY', assessment: 'Quantitative Aptitude Evaluation', warnings: 1, lastSwitch: '14 mins ago', status: 'Warning' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-901', actor: 'Dr. Eleanor Vance', action: 'POINT_OVERRIDE', entity: 'Student (23HT1A4301)', before: '1350 pts', after: '1450 pts', ip: '192.168.1.45', time: '10 mins ago' },
    { id: 'LOG-902', actor: 'Dr. Eleanor Vance', action: 'ASSESSMENT_PUBLISH', entity: 'Assessment (ASS-101)', before: 'Draft', after: 'Published', ip: '192.168.1.45', time: '1 hour ago' },
    { id: 'LOG-903', actor: 'System Auto-Proctor', action: 'PROCTOR_FLAG', entity: 'Session PROC-1 (VIKRAM SHARMA)', before: '0 violations', after: '3 violations', ip: '10.0.4.12', time: '2 hours ago' }
  ]);

  // Handle Manual Point Adjustment
  const handlePointAdjustment = (studentId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, points: s.points + Number(pointAdjustAmount) };
      }
      return s;
    }));
    // Add audit log
    const targetStudent = students.find(s => s.id === studentId);
    setAuditLogs(prev => [
      {
        id: `LOG-${Date.now().toString().slice(-3)}`,
        actor: user?.name || 'Admin',
        action: 'MANUAL_POINT_ADJUSTMENT',
        entity: `Student (${studentId})`,
        before: `${targetStudent?.points} pts`,
        after: `${targetStudent?.points + Number(pointAdjustAmount)} pts`,
        ip: '127.0.0.1',
        time: 'Just now'
      },
      ...prev
    ]);
    alert(`Adjusted +${pointAdjustAmount} points for ${targetStudent?.name}. Reason: ${pointAdjustReason}`);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      
      {/* Impersonation Warning Banner */}
      {impersonatingStudent && (
        <div className="bg-amber-500 text-slate-950 px-6 py-3 rounded-2xl flex items-center justify-between font-bold text-xs shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-slate-950" />
            <span>IMPERSONATION MODE ACTIVE: Viewing system as Student <strong>{impersonatingStudent.name} ({impersonatingStudent.id})</strong></span>
          </div>
          <button 
            onClick={() => setImpersonatingStudent(null)} 
            className="bg-slate-950 text-amber-400 hover:bg-slate-900 px-3 py-1 rounded-xl uppercase text-[10px] tracking-wider transition"
          >
            Exit Impersonation
          </button>
        </div>
      )}

      {/* Top Section Header & Scope Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 text-slate-900 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Advanced Admin Command Center
                <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-slate-900 text-white font-black tracking-widest">
                  Single Source of Truth
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Multi-tenant institutional governance, 46-section specification & live database control.
              </p>
            </div>
          </div>
        </div>

        {/* Institution & Scope Selectors */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center space-x-2 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500 font-bold">Tenant:</span>
            <select 
              value={selectedInstitution} 
              onChange={e => setSelectedInstitution(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer text-xs"
            >
              <option value="CITY Engineering College">CITY Engineering College</option>
              <option value="STANFORD Tech Institute">STANFORD Tech Institute</option>
              <option value="ALL">All Institutions (Global)</option>
            </select>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center space-x-2 text-xs">
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500 font-bold">Batch:</span>
            <select 
              value={selectedBatch} 
              onChange={e => setSelectedBatch(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer text-xs"
            >
              <option value="ALL">All Batches</option>
              <option value="ABAP - CITY 2026">ABAP - CITY 2026</option>
              <option value="ECE - CITY 2026">ECE - CITY 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (10 Master & Patch v2 Clusters) */}
      <div className="flex overflow-x-auto p-1.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold scrollbar-none shadow-sm gap-1">
        {[
          { id: 'overview', label: '1. Overview & At-Risk', icon: Activity },
          { id: 'people', label: '2. People & ABAC Scoping', icon: Users },
          { id: 'content', label: '3. Content & Practice Bank', icon: Layers },
          { id: 'trainings', label: '4. Live Trainings & Flashcards', icon: Video },
          { id: 'ai-gov', label: '5. AI Governance & QC Queues', icon: Sparkles },
          { id: 'flagged', label: '6. Unified Flagged Inbox', icon: AlertTriangle },
          { id: 'monitoring', label: '7. Live Proctor & Audit Log', icon: ShieldAlert },
          { id: 'reports', label: '8. Custom Report Builder', icon: BarChart2 },
          { id: 'data-control', label: '9. Data Control Center', icon: Database },
          { id: 'settings', label: '10. Platform & Privacy', icon: Settings },
        ].map(nav => {
          const Icon = nav.icon;
          const isSelected = activeSection === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => { setActiveSection(nav.id); setSubTab('kpis'); }}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                isSelected
                  ? 'bg-slate-900 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">{nav.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: OVERVIEW (Command Center Dashboard) */}
      {/* ========================================================================= */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Active Students', val: '1,420', change: '+12% vs last mo', color: 'border-emerald-500/30' },
              { label: 'Avg Completion', val: '84.2%', change: '+3.4% target', color: 'border-teal-500/30' },
              { label: 'Avg Points', val: '2,850', change: 'Level 2 Cohort', color: 'border-amber-500/30' },
              { label: 'Graded Today', val: '148', change: 'Auto & Manual', color: 'border-blue-500/30' },
              { label: 'Flagged Proctors', val: '3 Events', change: 'Action Required', alert: true, color: 'border-rose-500/50 bg-rose-950/20' },
              { label: 'Pending Blogs', val: '2 Posts', change: 'In Review Queue', color: 'border-purple-500/30' },
            ].map((kpi, idx) => (
              <div key={idx} className={`bg-white p-4 rounded-2xl border ${kpi.color} shadow-sm space-y-1 relative overflow-hidden`}>
                {kpi.alert && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
                <span className="text-[10px] font-extrabold uppercase text-slate-500">{kpi.label}</span>
                <p className={`text-xl font-black ${kpi.alert ? 'text-rose-600' : 'text-slate-900'}`}>{kpi.val}</p>
                <p className="text-[10px] font-semibold text-slate-400">{kpi.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* At-Risk Students Widget (Predictive Analytics per Spec §3) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    At-Risk Student Intervention Engine (Predictive IRT / Retention)
                  </h3>
                  <p className="text-xs text-slate-500">Flags students with 3+ missed assessments, streak breaks & negative theta ability trends.</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg">High Priority</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Student</th>
                      <th className="py-3 px-3">Batch</th>
                      <th className="py-3 px-3">Missed Tasks</th>
                      <th className="py-3 px-3">Theta Trend</th>
                      <th className="py-3 px-3">Risk Level</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {students.filter(s => s.risk !== 'Low').map(st => (
                      <tr key={st.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3">
                          <span className="font-extrabold text-slate-900 block">{st.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{st.id}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{st.batch}</td>
                        <td className="py-3 px-3 font-bold text-rose-600">{st.missed} Missed</td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-600">{st.theta}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            st.risk === 'High' ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
                          }`}>
                            {st.risk} Risk
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button 
                            onClick={() => setImpersonatingStudent(st)} 
                            className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-bold text-[10px] hover:bg-slate-800 transition"
                          >
                            Impersonate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Batch Comparison Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-600" /> Batch Performance Matrix
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'ABAP - CITY 2026', avgPts: '2,850', completion: '88%', avgScore: '78.4%', lsrwBand: '7.5' },
                  { name: 'ECE - CITY 2026', avgPts: '2,410', completion: '81%', avgScore: '72.1%', lsrwBand: '7.0' },
                  { name: 'IT - CITY 2026', avgPts: '3,100', completion: '92%', avgScore: '83.5%', lsrwBand: '8.0' },
                ].map((b, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{b.name}</h4>
                      <span className="text-[10px] text-slate-500 font-semibold">LSRW Band: {b.lsrwBand}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-700 block">{b.avgScore} Avg</span>
                      <span className="text-[10px] text-slate-400 font-medium">{b.completion} Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: PEOPLE & RBAC (Institutions, Batches, Students, Roles Matrix) */}
      {/* ========================================================================= */}
      {activeSection === 'people' && (
        <div className="space-y-6">
          {/* Subtabs for People */}
          <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
            {[
              { id: 'kpis', label: 'Student Directory & Impersonation' },
              { id: 'roles', label: 'RBAC Permission Matrix' },
              { id: 'batches', label: 'Batch & CSV Bulk Import' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition ${
                  subTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subtab 1: Student Directory & Manual Points */}
          {subTab === 'kpis' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Student Roster & Attribute-Based Directory</h3>
                  <p className="text-xs text-slate-500">Filter by institution, department, tier level & manage student points.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Search student name or ID..." 
                    className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 font-medium w-64"
                  />
                  <button className="px-3.5 py-2 bg-emerald-950 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
                  </button>
                </div>
              </div>

              {/* Student Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Student ID</th>
                      <th className="py-3 px-3">Full Name</th>
                      <th className="py-3 px-3">Batch & Dept</th>
                      <th className="py-3 px-3">Points & Tier</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {students.map(st => (
                      <tr key={st.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{st.id}</td>
                        <td className="py-3 px-3">
                          <span className="font-extrabold text-slate-900 block">{st.name}</span>
                          <span className="text-[10px] text-slate-400">{st.email}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <span className="block font-bold">{st.batch}</span>
                          <span className="text-[10px] text-slate-400">{st.dept}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-black text-amber-600 block">{st.points} pts</span>
                          <span className="text-[10px] font-bold text-emerald-700">{st.tier}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button 
                            onClick={() => setSelectedStudentForDetail(st)} 
                            className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-[10px] font-bold hover:bg-slate-200"
                          >
                            Points Adjust
                          </button>
                          <button 
                            onClick={() => setImpersonatingStudent(st)} 
                            className="px-2.5 py-1 bg-emerald-950 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-900"
                          >
                            View as Student
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Point Adjustment Modal / Panel */}
              {selectedStudentForDetail && (
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" /> Manual Point / Tier Adjustment for {selectedStudentForDetail.name}
                    </h4>
                    <button onClick={() => setSelectedStudentForDetail(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕ Close</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="number" 
                      value={pointAdjustAmount} 
                      onChange={e => setPointAdjustAmount(e.target.value)}
                      placeholder="Point Amount (e.g. 100)" 
                      className="px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl font-mono font-bold"
                    />
                    <input 
                      type="text" 
                      value={pointAdjustReason} 
                      onChange={e => setPointAdjustReason(e.target.value)}
                      placeholder="Mandatory Reason for Audit Log" 
                      className="px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl font-medium"
                    />
                    <button 
                      onClick={() => handlePointAdjustment(selectedStudentForDetail.id)}
                      className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 shadow-sm"
                    >
                      Apply & Record Audit Log
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subtab 2: RBAC Matrix */}
          {subTab === 'roles' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">RBAC + ABAC Role Matrix & Self-Service Permissions</h3>
                  <p className="text-xs text-slate-500">Configure permission ceiling for Institution Admins, Trainers & Moderators.</p>
                </div>
                <button className="px-3.5 py-2 bg-emerald-950 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition">
                  + Create Custom Role
                </button>
              </div>

              <div className="space-y-3">
                {roles.map(r => (
                  <div key={r.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-slate-900 text-xs">{r.name}</h4>
                        {r.isCustom && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[9px] font-bold rounded-full">Custom Role</span>}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">Scope: {r.scope}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-slate-600 font-bold">{r.usersCount} Active Users</span>
                      <button className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-100">
                        Configure Permissions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab 3: CSV Import */}
          {subTab === 'batches' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Batch Management & Bulk CSV Onboarding</h3>
              <p className="text-xs text-slate-500">Validation preview engine flags duplicate emails and malformed student IDs before commit.</p>
              
              <div className="p-8 border-2 border-dashed border-slate-300 rounded-3xl text-center space-y-3 bg-slate-50/50">
                <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Drag & Drop Student CSV Roster File</p>
                  <p className="text-[10px] text-slate-400">Required columns: `Student_ID`, `Full_Name`, `Email`, `Department`, `Batch_ID`</p>
                </div>
                <button onClick={() => alert('Validation Preview: 20 rows valid, 0 errors. Ready to commit.')} className="px-4 py-2 bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-md">
                  Select CSV File & Validate Preview
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: CONTENT PIPELINE (Assessments, LSRW, Practice Bank, Courses) */}
      {/* ========================================================================= */}
      {activeSection === 'content' && (
        <div className="space-y-6">
          <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
            {[
              { id: 'kpis', label: 'Assessments & Proctoring Specs' },
              { id: 'lsrw', label: 'LSRW Speech & Writing Queue' },
              { id: 'practice', label: 'Practice Bank (IRT Calibration)' },
              { id: 'courses', label: 'Courses & Trainings Builder' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition ${
                  subTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subtab 1: Assessments & All Feature Modules Pipeline */}
          {subTab === 'kpis' && (
            <div className="space-y-6">
              {/* Feature Modules Quick Management Grid (All 15 Connected) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-600" />
                      Platform Modules Admin Manager (All 15 Connected Features)
                    </h3>
                    <p className="text-xs text-slate-500">Directly control, configure, and monitor live status across every platform module.</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full">15/15 Active</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { name: 'Dashboard', route: 'dashboard', status: 'Live', count: '1,420 Users' },
                    { name: 'Leaderboard', route: 'leaderboard', status: 'Active', count: 'Weekly Reset' },
                    { name: 'Assessments', route: 'assessments', status: 'Live', count: '25 Active' },
                    { name: 'LSRW Practice', route: 'lsrw', status: 'Grading Queue', count: '2 Pending' },
                    { name: 'Typing Test', route: 'typing-test', status: 'Live Engine', count: '50+ Specs' },
                    { name: 'Courses', route: 'courses', status: 'Published', count: '12 Tracks' },
                    { name: 'Smart Notes', route: 'smart-notes', status: 'AI Synced', count: '480 Saved' },
                    { name: 'Study Planner', route: 'study-planner', status: 'Active', count: '890 Plans' },
                    { name: 'AI Resume Builder', route: 'resume-builder', status: 'Live', count: '310 Exports' },
                    { name: 'AI Mock Interview', route: 'mock-interview', status: 'Beta (Under Working)', count: 'v1.4' },
                    { name: 'Doubt Forum', route: 'doubt-forum', status: 'Active', count: '42 Open' },
                    { name: 'Job Placement Board', route: 'job-board', status: 'Live', count: '18 Drives' },
                    { name: 'Certifications', route: 'certifications', status: 'Auto-Issue', count: '150 Verifications' },
                    { name: 'Pair Programming', route: 'pair-programming', status: 'Live IDE', count: '5 Sessions' },
                    { name: 'Blogs', route: 'blogs', status: 'Moderation Queue', count: '4 Published' },
                  ].map((mod, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 hover:border-slate-400 transition">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 truncate">{mod.name}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold">{mod.count}</p>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">{mod.status}</span>
                        <button 
                          onClick={() => alert(`Configuring ${mod.name} admin parameters...`)}
                          className="text-[9px] font-bold text-emerald-700 hover:underline"
                        >
                          Manage →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Manager Table */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Assessment & Exam Category Manager</h3>
                    <p className="text-xs text-slate-500">Configure proctoring rules, tab-switch limits & category tags.</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white font-bold text-xs rounded-xl shadow-md">
                    + Launch Assessment Wizard
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">Assessment ID</th>
                        <th className="py-3 px-3">Title</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Questions & Duration</th>
                        <th className="py-3 px-3">Proctored</th>
                        <th className="py-3 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {assessments.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3 font-mono font-bold text-slate-900">{a.id}</td>
                          <td className="py-3 px-3 font-extrabold text-slate-900">{a.title}</td>
                          <td className="py-3 px-3 text-slate-600">{a.category}</td>
                          <td className="py-3 px-3 text-slate-600">{a.questions} Qs / {a.duration} mins</td>
                          <td className="py-3 px-3">
                            {a.proctored ? (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">Webcam + Tab-Lock</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600">Standard</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              a.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Subtab 2: LSRW Grading Queue (Spec §6) */}
          {subTab === 'lsrw' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">LSRW Manual & Quality Control Review Queue</h3>
              <p className="text-xs text-slate-500">Spot-check AI speech & writing scores, play audio recordings and override final band scores.</p>

              <div className="space-y-4">
                {lsrwQueue.map(item => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                        <h4 className="font-extrabold text-slate-900 text-xs">{item.student} — {item.type}</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                        AI Score: {item.aiScore}/100
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <button onClick={() => alert('Playing student audio response recording...')} className="px-3 py-1.5 bg-emerald-950 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 text-amber-400" /> Play Recording
                        </button>
                        <span className="text-slate-600 text-[11px]">
                          Subscores: Fluency ({item.subscores.fluency}), Pronunciation ({item.subscores.pronunciation})
                        </span>
                      </div>

                      <button onClick={() => alert('Score override submitted and sent to student dashboard.')} className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-amber-400">
                        Override & Add Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab 3: IRT Calibration */}
          {subTab === 'practice' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Practice Bank IRT Calibration Engine</h3>
              <p className="text-xs text-slate-500">Live item response parameters (discrimination/difficulty) and miscalibration alerts.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-900">Topic Coverage Heatmap</h4>
                  <p className="text-[11px] text-slate-500">Verbal Ability (Hard) has low coverage (3 questions available).</p>
                  <span className="inline-block px-2 py-1 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg">Gap Flagged</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-900">Miscalibrated Questions Alert</h4>
                  <p className="text-[11px] text-slate-500">Question #402 has negative discrimination (higher-tier students failing).</p>
                  <button onClick={() => alert('Question opened for answer-key review.')} className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Review Key</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: GAMIFICATION & BLOGS (Leaderboard Config, Points Rules, Blogs) */}
      {/* ========================================================================= */}
      {activeSection === 'engagement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Gamification Engine & Leaderboard Rule Editor</h3>
            <p className="text-xs text-slate-500">Modify point allocations for platform activities without deploying code.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { action: 'Assessment Completion', pts: '+150 Pts', mod: 'Bonus for 90%+' },
                { action: 'Practice Bank Question', pts: '+20 Pts', mod: 'Scaled by IRT' },
                { action: 'LSRW Speaking Test', pts: '+100 Pts', mod: 'Band 7+' },
                { action: 'Daily Practice Streak', pts: '+50 Pts/Day', mod: '7-Day Multiplier' },
              ].map((rule, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{rule.action}</span>
                  <p className="text-lg font-black text-amber-600">{rule.pts}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{rule.mod}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LIVE PROCTORING & AUDIT LOG (Spec §11) */}
      {/* ========================================================================= */}
      {activeSection === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Proctoring Monitor */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> Live Assessment Invigilator Grid
                </h3>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold text-[10px] rounded-full animate-pulse">Live Feed Active</span>
              </div>

              <div className="space-y-3">
                {liveProctorSessions.map(proc => (
                  <div key={proc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-extrabold text-slate-900">{proc.student}</h4>
                      <span className="text-[10px] text-slate-500">Violations: {proc.warnings} tab switches</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        proc.status === 'Red Flag' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {proc.status}
                      </span>
                      <button onClick={() => alert(`Warning message sent to ${proc.student}'s active session browser.`)} className="px-2.5 py-1 bg-slate-900 text-white font-bold text-[10px] rounded-lg">
                        Warn Student
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Immutable Platform Audit Log
              </h3>

              <div className="space-y-3">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{log.actor} ({log.ip})</span>
                      <span>{log.time}</span>
                    </div>
                    <p className="font-bold text-slate-900">{log.action}: {log.entity}</p>
                    <p className="text-[10px] text-slate-600">Change: {log.before} → {log.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: TRAININGS & FLASHCARDS (Patch v2 §48 & §49) */}
      {/* ========================================================================= */}
      {activeSection === 'trainings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Video className="w-5 h-5 text-emerald-600" /> Live Trainings & Spaced Repetition Flashcards Engine
                </h3>
                <p className="text-xs text-slate-500">Schedule live sessions, record attendance, and configure SM-2 flashcard parameters.</p>
              </div>
              <button onClick={() => alert('Launching Training Session Creator...')} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs">
                + Create Live Training
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-slate-900">Upcoming Live Training: Advanced System Design</h4>
                <p className="text-[11px] text-slate-500">Target: ABAP - CITY 2026 • Speaker: Dr. Eleanor Vance • Tomorrow, 4:00 PM</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => alert('Copying Zoom link...')} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg">Copy Zoom Link</button>
                  <button onClick={() => alert('Sending notification to batch...')} className="px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg">Send Reminder</button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-slate-900">SM-2 Spaced Repetition Parameters</h4>
                <p className="text-[11px] text-slate-500">Initial Interval: 1 Day • Ease Factor Step: 0.15 • Batch Recall Average: 82%</p>
                <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg">Active Calibration</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: AI GOVERNANCE & QC QUEUES (Patch v2 §50) */}
      {/* ========================================================================= */}
      {activeSection === 'ai-gov' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" /> Human-in-the-Loop AI Governance & Review Queues
            </h3>
            <p className="text-xs text-slate-500">No high-stakes student score runs unreviewed. Override AI evaluations with mandatory audit logs.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-slate-900">1. LSRW Speech Review Queue</h4>
                <p className="text-[11px] text-slate-500">2 attempts flagged (low confidence & 10% QC sample).</p>
                <button onClick={() => setSubTab('lsrw')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Open LSRW Queue →</button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-slate-900">2. AI Mock Interview Review</h4>
                <p className="text-[11px] text-slate-500">Review video/audio delivery metrics before campus drives.</p>
                <button onClick={() => alert('Opening AI Interview Review Console...')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Open Interview Queue →</button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-slate-900">3. AI Resume Keyword Packs</h4>
                <p className="text-[11px] text-slate-500">Manage synonym aliases and company pattern packs (TCS, Infosys).</p>
                <button onClick={() => alert('Opening Keyword Synonym Manager...')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Manage Keyword Packs →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: UNIFIED FLAGGED CONTENT INBOX (Patch v2 §56) */}
      {/* ========================================================================= */}
      {activeSection === 'flagged' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" /> Unified Flagged Content Triage Inbox
            </h3>
            <span className="px-3 py-1 bg-rose-100 text-rose-800 font-extrabold text-xs rounded-full">3 Items Flagged</span>
          </div>

          <div className="space-y-3">
            {[
              { source: 'Proctoring Monitor', item: 'VIKRAM SHARMA — 3 Tab Switches in Quant Evaluation', severity: 'High', status: 'Open' },
              { source: 'Doubt Forum', item: 'Reported response on Question #881 (Inappropriate Language)', severity: 'Medium', status: 'Open' },
              { source: 'AI Writing Checker', item: 'Plagiarism hit (84% similarity) on Essay Submission #89', severity: 'High', status: 'In Review' },
            ].map((flag, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-400 block">{flag.source}</span>
                  <h4 className="font-extrabold text-slate-900">{flag.item}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold text-[9px] rounded-full">{flag.severity} Severity</span>
                  <button onClick={() => alert(`Reviewing flagged item from ${flag.source}...`)} className="px-3 py-1 bg-slate-900 text-white font-bold text-[10px] rounded-lg">Resolve Item</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 7: LIVE PROCTORING & AUDIT LOG */}
      {/* ========================================================================= */}
      {activeSection === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Proctoring Monitor */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> Live Assessment Invigilator Grid
                </h3>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold text-[10px] rounded-full animate-pulse">Live Feed Active</span>
              </div>

              <div className="space-y-3">
                {liveProctorSessions.map(proc => (
                  <div key={proc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-extrabold text-slate-900">{proc.student}</h4>
                      <span className="text-[10px] text-slate-500">Violations: {proc.warnings} tab switches</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        proc.status === 'Red Flag' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {proc.status}
                      </span>
                      <button onClick={() => alert(`Warning message sent to ${proc.student}'s active session browser.`)} className="px-2.5 py-1 bg-slate-900 text-white font-bold text-[10px] rounded-lg">
                        Warn Student
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Immutable Platform Audit Log
              </h3>

              <div className="space-y-3">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{log.actor} ({log.ip})</span>
                      <span>{log.time}</span>
                    </div>
                    <p className="font-bold text-slate-900">{log.action}: {log.entity}</p>
                    <p className="text-[10px] text-slate-600">Change: {log.before} → {log.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 8: CUSTOM REPORT BUILDER (Patch v2 §57) */}
      {/* ========================================================================= */}
      {activeSection === 'reports' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-600" /> Custom Analytics Report Builder & Scheduled Exports
          </h3>
          <p className="text-xs text-slate-500">Pick custom metric x dimension combinations to generate Placement Cell export bundles.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-slate-900">Placement Readiness Summary</h4>
              <p className="text-[11px] text-slate-500">Composite PDF report for campus recruiters.</p>
              <button onClick={() => alert('Exporting Placement Readiness Summary PDF...')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Export PDF</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-slate-900">Cohort Skill Gap Matrix</h4>
              <p className="text-[11px] text-slate-500">CSV analysis of low-scoring topics across batches.</p>
              <button onClick={() => alert('Exporting CSV Skill Gap Matrix...')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Export CSV</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-slate-900">Weekly Scheduled Email Digest</h4>
              <p className="text-[11px] text-slate-500">Auto-sent to Institution Admins every Monday 8:00 AM.</p>
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg">Scheduled</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 9: DATA CONTROL CENTER (Patch v2 §46) */}
      {/* ========================================================================= */}
      {activeSection === 'data-control' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" /> Admin Data Control Center (Single Source of Truth Mapping)
            </h3>
            <p className="text-xs text-slate-500">Shows exact database API mappings between Admin operations and Student Panel displays.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { studentField: 'Student Name / ID', adminSource: 'Student Management (Section 2)' },
              { studentField: 'Batch & Department', adminSource: 'Batch Management (Section 3)' },
              { studentField: 'LSRW Band Score', adminSource: 'LSRW Review Queue (Section 50.1)' },
              { studentField: 'Passed Evaluations', adminSource: 'Assessment Engine (Section 4)' },
              { studentField: 'Placement Readiness %', adminSource: 'Readiness Engine (Section 18)' },
              { studentField: 'ATS Resume Match', adminSource: 'AI Resume Builder (Section 10 & 50.3)' },
              { studentField: 'Job Drive Postings', adminSource: 'Placement Board (Section 13)' },
              { studentField: 'Verified Certificates', adminSource: 'Certification Manager (Section 14)' },
              { studentField: 'Live Training Sessions', adminSource: 'Trainings Management (Section 48)' },
            ].map((map, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Student Field</span>
                <p className="font-extrabold text-slate-900">{map.studentField}</p>
                <span className="text-[10px] font-bold text-emerald-700 block pt-1">Source: {map.adminSource}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 10: PLATFORM & PRIVACY SETTINGS (Patch v2 §58) */}
      {/* ========================================================================= */}
      {activeSection === 'settings' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-700" /> Platform System Settings & Privacy / Consent Log
            </h3>
            <p className="text-xs text-slate-500">Configure global platform defaults, data retention limits, and student privacy consent records.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-slate-900">Proctoring Data Retention Policy</h4>
              <p className="text-[11px] text-slate-500">Raw webcam snapshots & audio recordings deleted after 30 days.</p>
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg">Policy Active</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-slate-900">Student GDPR Consent Logs</h4>
              <p className="text-[11px] text-slate-500">1,420 students consented to AI audio processing and webcam proctoring.</p>
              <button onClick={() => alert('Exporting GDPR consent audit logs...')} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Export Consent Log</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
