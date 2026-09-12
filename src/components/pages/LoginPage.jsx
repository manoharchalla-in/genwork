import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Eye, EyeOff, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const { login, activePortalTab } = useApp();
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('23HT1A4301');
  const [studentPassword, setStudentPassword] = useState('••••••••••••');
  
  const [adminEmail, setAdminEmail] = useState('admin.vance@city.edu');
  const [adminKey, setAdminKey] = useState('••••••••••••');

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
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/40 text-slate-900 flex flex-col justify-between items-center px-4 py-3 sm:px-6 md:px-10 font-sans selection:bg-indigo-600 selection:text-white overflow-hidden">
      
      {/* Background Soft Glow Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Branding Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-9 px-2 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-xs">
            <img src="/genwork-logo.jpg" alt="Logo" className="h-6 object-contain rounded" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-slate-900 leading-tight">GEN-<span className="text-red-600">VNXV</span></span>
            <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-500 leading-none">Technologies</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-extrabold text-slate-700 bg-white/80 backdrop-blur-md shadow-xs px-3.5 py-1.5 rounded-full border border-slate-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Placement & Readiness Portal</span>
        </div>
      </header>

      {/* Split Dual-Panel Card */}
      <main className="w-full max-w-5xl my-auto flex-shrink flex items-center justify-center py-2 overflow-hidden">
        <div className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-slate-200/90 shadow-2xl shadow-slate-950/5 overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[calc(100vh-100px)] w-full">
          
          {/* Left Panel: Brand & Value Proposition */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Logo / Mascot Badge */}
              <div className="inline-flex items-center space-x-2.5 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs w-fit">
                <img src="/genwork-logo.jpg" alt="Genmitra Technologies" className="h-7 object-contain" />
                <span className="text-xs font-black text-slate-800 tracking-wider">GENMITRA</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Turn memories into meaningful goals.
                </h1>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Real-time assessments, AI interview simulations, LSRW practice, and placement tracking in one unified portal.
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>Easy customization flow</span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                  </div>
                  <span>Secure account and checkout</span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  </div>
                  <span>Fast placement updates</span>
                </div>
              </div>
            </div>

            {/* Sub-footer inside Left Panel */}
            <div className="pt-4 text-[10px] font-semibold text-slate-400">
              Powered by Genmitra Technologies
            </div>
          </div>

          {/* Right Panel: Sign In Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white overflow-y-auto">
            
            {/* Header Title & Portal Indicator */}
            <div className="space-y-1 mb-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  {activePortalTab === 'admin' ? 'Faculty Sign In' : 'Sign In'}
                </h2>
                <span className="text-[11px] font-extrabold text-indigo-600 px-2.5 py-0.5 bg-indigo-50 rounded-full border border-indigo-100">
                  {activePortalTab === 'admin' ? 'Admin Mode' : 'Student Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {activePortalTab === 'admin' 
                  ? 'Enter faculty email and security key to access administration' 
                  : 'Enter your credentials to access your student dashboard'}
              </p>
            </div>

            {/* Student Login Form */}
            {activePortalTab === 'student' && (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Email or Hall Ticket ID</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-extrabold text-slate-700">Password</label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Create or enter password"
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2"
                  >
                    <span>Sign In</span>
                  </button>
                </div>

                <div className="text-center pt-1">
                  <p className="text-xs font-medium text-slate-500">
                    Don't have an account? <span className="font-extrabold text-indigo-600 cursor-pointer hover:underline">Sign Up</span>
                  </p>
                </div>
              </form>
            )}

            {/* Admin Login Form */}
            {activePortalTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Faculty / Admin Email</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin.vance@city.edu"
                    className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-extrabold text-slate-700">Security Key</label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot security key?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter security key"
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Authorized faculty & administrator access only.</span>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2"
                  >
                    <span>Authenticate Admin</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-1.5 text-center text-[11px] text-slate-400 font-medium flex-shrink-0">
        © 2026 GEN-VNXV Placement & Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
}

