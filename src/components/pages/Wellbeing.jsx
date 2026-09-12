import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Smile, Frown, Meh, AlertCircle, Shield, CheckCircle2 } from 'lucide-react';

export default function Wellbeing() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckin = (mood) => {
    setSelectedMood(mood);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Wellbeing & Workload Check-in
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                Opt-In & Confidential
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Lightweight weekly mood & academic stress check-in to prevent burnout.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
        {!submitted ? (
          <>
            <h2 className="text-base font-extrabold text-slate-900">How manageable did your study workload feel this week?</h2>
            
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={() => handleCheckin('Great')}
                className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 text-emerald-800 transition flex flex-col items-center space-y-2"
              >
                <Smile className="w-10 h-10 text-emerald-600" />
                <span className="font-bold text-xs">Great 🙂</span>
              </button>

              <button 
                onClick={() => handleCheckin('Manageable')}
                className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-200 hover:border-amber-500 text-amber-800 transition flex flex-col items-center space-y-2"
              >
                <Meh className="w-10 h-10 text-amber-600" />
                <span className="font-bold text-xs">Okay 😐</span>
              </button>

              <button 
                onClick={() => handleCheckin('Overwhelmed')}
                className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-200 hover:border-rose-500 text-rose-800 transition flex flex-col items-center space-y-2"
              >
                <Frown className="w-10 h-10 text-rose-600" />
                <span className="font-bold text-xs">Heavy 🙁</span>
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-extrabold text-slate-900 text-sm">Thank you for checking in!</h3>
            <p className="text-xs text-slate-600 font-medium">Your response has been logged anonymously to help your institution balance study workloads.</p>
            {selectedMood === 'Overwhelmed' && (
              <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-amber-950 text-xs text-left">
                <span className="font-bold block mb-1">Institutional Support Resource:</span>
                Contact CITY Engineering College Student Counseling Cell at <strong>counseling@city.edu</strong> or call ext. 402 for confidential support.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
