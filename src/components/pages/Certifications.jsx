import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, Share2, ShieldCheck, Download, ExternalLink, Globe, Sparkles } from 'lucide-react';

export default function Certifications() {
  const { user } = useApp();

  const [certificates, setCertificates] = useState([
    {
      id: 'CERT-2026-8891',
      title: 'Full Stack Java & Cloud Engineering Mastery',
      issuedBy: 'CITY Engineering College & GENWORK Platform',
      issueDate: 'Sep 01, 2026',
      band: 'Distinction (94% Score)',
      verifyUrl: 'https://genwork.edu/verify/CERT-2026-8891'
    },
    {
      id: 'CERT-2026-4412',
      title: 'Versant Advanced Spoken English Proficiency',
      issuedBy: 'GENWORK LSRW Evaluation Center',
      issueDate: 'Aug 20, 2026',
      band: 'Band 7.5 (Proficient)',
      verifyUrl: 'https://genwork.edu/verify/CERT-2026-4412'
    }
  ]);

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Verifiable Skill Certifications & Portfolio
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                Public Portfolio Link
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Blockchain-backed certificate verification registry & shareable recruiter portfolio.
            </p>
          </div>
        </div>

        <button 
          onClick={() => alert(`Public Portfolio URL copied: https://genwork.edu/portfolio/${user.studentId}`)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Share2 className="w-4 h-4 text-slate-950" /> Copy Public Recruiter Portfolio Link
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">{cert.id}</span>
                <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">{cert.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{cert.issuedBy}</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-700 font-bold">{cert.band}</span>
              <span className="text-slate-500">Issued: {cert.issueDate}</span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button 
                onClick={() => alert(`Certificate ${cert.id} downloaded as PDF.`)}
                className="flex-1 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" /> Download Certificate PDF
              </button>
              <button 
                onClick={() => alert(`Verifying certificate on registry: ${cert.verifyUrl}`)}
                className="px-3 py-2 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-300 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" /> Registry Verification
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
