import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, Building, IdCard, Key, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const { login, activePortalTab } = useApp();
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('23HT1A4301');
  const [studentPassword, setStudentPassword] = useState('••••••••••••');
  
  const [adminEmail, setAdminEmail] = useState('admin.vance@city.edu');
  const [adminKey, setAdminKey] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    login('student', {
      studentId: studentId || '23HT1A4301',
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    login('admin', {
      email: adminEmail || 'admin.vance@city.edu',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-slate-900 selection:text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Top Header Branding Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-slate-900">GEN<span className="text-slate-500">WORK</span></span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">Skill & Placement Portal</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white shadow-xs px-4 py-2 rounded-full border border-slate-200">
          <Building className="w-4 h-4 text-slate-900" />
          <span>CITY Engineering College</span>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Header Portal Title Indicator */}
          <div className="mb-6 text-center">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center space-x-2 border bg-white border-slate-200 text-slate-900 shadow-xs">
              {activePortalTab === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-900" />
                  <span>DEDICATED FACULTY & ADMIN PORTAL</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-slate-900" />
                  <span>DEDICATED STUDENT PORTAL</span>
                </>
              )}
            </span>
          </div>

          {/* Form Card (Pro Pure Black & White High Contrast) */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900" />

            {/* Student Login Form */}
            {activePortalTab === 'student' && (
              <form onSubmit={handleStudentLogin} className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 mb-3 shadow-xs">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-wide">Student Sign In</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Access your learning path, assessments & rankings</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <IdCard className="w-3.5 h-3.5 text-slate-900" />
                    <span>Hall Ticket / Student ID</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 23HT1A4301"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold font-mono outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-900" />
                      <span>Password</span>
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-slate-600 font-bold hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 font-medium">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 bg-slate-100 text-slate-900 focus:ring-slate-900"
                    />
                    <span>Remember my session</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-500">Batch 2026</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 uppercase tracking-wider group"
                >
                  <span>ENTER STUDENT PORTAL</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-medium">Demo Student Credentials Pre-filled</p>
                </div>
              </form>
            )}

            {/* Admin Login Form */}
            {activePortalTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 mb-3 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-wide">Administrator Portal</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Management, analytics & assessment control</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-900" />
                    <span>Faculty / Admin Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin.vance@city.edu"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <Key className="w-3.5 h-3.5 text-slate-900" />
                      <span>Security Key / Password</span>
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-slate-600 font-bold hover:underline">Reset Passkey</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter security key"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs flex items-center space-x-3">
                  <ShieldAlert className="w-5 h-5 text-slate-900 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">Security Requirement</span>
                    <span className="text-[11px] text-slate-600 font-medium">Restricted to authorized faculty & administration staff only.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 uppercase tracking-wider group"
                >
                  <span>AUTHENTICATE ADMIN ACCESS</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-medium">Demo Admin Credentials Pre-filled</p>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-500 font-medium">
        © 2026 GENWORK Placement & Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
}
