import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Mic, Sparkles, Play, CheckCircle2, AlertCircle, Award, RefreshCw } from 'lucide-react';

export default function MockInterview() {
  const { addPoints } = useApp();
  const [selectedRole, setSelectedRole] = useState('Full Stack Software Engineer');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [report, setReport] = useState(null);

  const handleStartInterview = () => {
    setIsRecording(true);
    setTranscript("For my full stack project, I used React for the frontend and Node.js with PostgreSQL. We used JWT tokens for session management and implemented indexing to speed up SQL queries by 35%.");
  };

  const handleFinishInterview = () => {
    setIsRecording(false);
    setReport({
      overallScore: 88,
      starAdherence: '92% (Situation, Task, Action, Result clear)',
      fillerWords: '2 filler words (um, like)',
      deliveryPace: '145 WPM (Ideal range)',
      aiFeedback: 'Strong explanation of indexing and JWT auth. Consider elaborating on error-handling edge cases.'
    });
    addPoints(50, 'Completed AI Mock Interview');
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner - Clean White Premium */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 shadow-xs">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              AI Voice & Video Mock Interview
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-black tracking-widest">
                MockMate-style
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Resume-aware questions, live speech delivery scoring & STAR method feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Webcam & Speech Recording Arena */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs">
            <span className="font-bold text-slate-700">Target Role: {selectedRole}</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-extrabold rounded-lg">Question 1 of 5</span>
          </div>

          {/* Artificial Webcam / AI Interviewer Box */}
          <div className="h-64 rounded-2xl bg-slate-950 border-2 border-slate-800 flex flex-col items-center justify-center text-center p-6 text-white relative overflow-hidden shadow-inner">
            <div className="w-16 h-16 rounded-full bg-emerald-900/80 border border-emerald-400 flex items-center justify-center mb-3">
              <Video className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-sm font-extrabold max-w-md">"Tell me about a challenging technical project you built and how you optimized its performance?"</p>
            {isRecording && <span className="absolute top-4 right-4 px-3 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-full animate-ping">Recording Audio...</span>}
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-3 pt-2">
            {!isRecording ? (
              <button onClick={handleStartInterview} className="flex-1 py-3 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2">
                <Mic className="w-4 h-4 text-amber-400" /> Start Answer Recording
              </button>
            ) : (
              <button onClick={handleFinishInterview} className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md">
                Stop Recording & Generate AI Feedback
              </button>
            )}
          </div>

          {transcript && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Live Speech Transcript</span>
              <p className="font-medium italic text-slate-900">"{transcript}"</p>
            </div>
          )}
        </div>

        {/* Right Column: AI Feedback Report */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Interview Readiness Report
            </h3>

            {report ? (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-emerald-950 text-white rounded-2xl text-center space-y-1">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase">OVERALL READINESS</span>
                  <p className="text-3xl font-black text-amber-400">{report.overallScore}/100</p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between">
                    <span className="text-slate-500">STAR Method Adherence:</span>
                    <span className="font-bold text-emerald-700">{report.starAdherence}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between">
                    <span className="text-slate-500">Filler Words Count:</span>
                    <span className="font-bold text-slate-900">{report.fillerWords}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between">
                    <span className="text-slate-500">Speech Pace:</span>
                    <span className="font-bold text-slate-900">{report.deliveryPace}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                  <span className="font-bold block text-[11px] uppercase mb-1">AI Evaluator Feedback</span>
                  <p>{report.aiFeedback}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                Complete an answer recording above to generate a STAR method feedback report.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
