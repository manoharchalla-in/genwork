import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Building, CheckCircle2, Award, ArrowRight, Filter, Search } from 'lucide-react';

export default function JobBoard() {
  const { user, addPoints } = useApp();
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: 'TCS (Tata Consultancy Services)',
      role: 'System Engineer - NQT Placement Drive 2026',
      salary: '₹7.0 - ₹9.0 LPA',
      eligibility: 'Passout 2026, Min 65% aggregate',
      matchScore: '94%',
      deadline: 'Tomorrow, 5:00 PM',
      applied: false,
      practiceTag: 'TCS NQT Pattern'
    },
    {
      id: 2,
      company: 'Wipro Limited',
      role: 'Project Engineer - Turbo Drive',
      salary: '₹6.5 LPA',
      eligibility: 'CSE/IT/ECE 2026 Batch',
      matchScore: '88%',
      deadline: 'Sep 15, 11:59 PM',
      applied: true,
      practiceTag: 'Wipro NLTH'
    }
  ]);

  const handleApply = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applied: true } : j));
    addPoints(25, 'Applied to Institutional Campus Drive');
    alert("Application Submitted! Status tracked in Institutional Placement Cell Portal.");
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner - Clean White Premium */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 shadow-xs">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              Campus Drives & Job Placement Board
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-black tracking-widest">
                AI Profile Match
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Personalized campus recruitment drives with auto-matched resume scores & practice bundles.
            </p>
          </div>
        </div>
      </div>

      {/* Main Openings List */}
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400">{job.company}</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">{job.role}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{job.eligibility} • Package: <strong className="text-emerald-700">{job.salary}</strong></p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Match Score</span>
                  <span className="text-base font-black text-amber-600">{job.matchScore}</span>
                </div>

                {!job.applied ? (
                  <button 
                    onClick={() => handleApply(job.id)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md transition uppercase tracking-wider"
                  >
                    Apply Now (+25 Pts)
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Applied
                  </span>
                )}
              </div>
            </div>

            {/* Deep Link to Company Practice Bundle */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Deadline: <strong>{job.deadline}</strong></span>
              <button 
                onClick={() => alert(`Launching practice bundle for ${job.practiceTag}...`)}
                className="text-emerald-700 font-extrabold hover:underline flex items-center gap-1"
              >
                <span>Practice {job.practiceTag} Assessment Bundle</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
