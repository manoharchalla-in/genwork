import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Play, Pause, RotateCcw, Calendar, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export default function StudyPlanner() {
  const { addPoints } = useApp();
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
    if (!timerRunning) {
      addPoints(25, 'Completed 25m Focus Session');
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(25 * 60);
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Adaptive Study Planner & Focus Engine
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                Pomodoro + Reclaim.ai
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Automated timetable rebalancing, focus timer & exam deadline tracker.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pomodoro Focus Timer */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider">FOCUS TIMER (25m WORK / 5m BREAK)</span>
          
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 border-4 border-emerald-500/40 flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-black text-white font-mono">{formatTime(secondsLeft)}</span>
          </div>

          <div className="flex items-center space-x-3 w-full max-w-xs">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-3 rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 ${
                timerRunning ? 'bg-rose-600 text-white' : 'bg-emerald-950 text-white hover:bg-emerald-900'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
              <span>{timerRunning ? 'Pause' : 'Start Focus Session'}</span>
            </button>
            <button 
              onClick={resetTimer}
              className="p-3 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Auto-rebalanced Schedule */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" /> Today's Auto-Rebalanced Schedule
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Target: 3.5 hrs/day</span>
          </div>

          <div className="space-y-3">
            {[
              { time: '09:00 AM - 10:00 AM', task: 'Data Structures: Tree Traversal Lesson', module: 'Courses', completed: true },
              { time: '11:30 AM - 12:15 PM', task: 'Quantitative Aptitude Practice Bank (15 Qs)', module: 'Practice Bank', completed: true },
              { time: '03:00 PM - 03:45 PM', task: 'Versant English Speaking Mock Test 4', module: 'LSRW Practice', completed: false },
              { time: '05:30 PM - 06:00 PM', task: 'Spaced Repetition Flashcards Review (8 Cards)', module: 'Flashcards', completed: false },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between text-xs transition ${
                item.completed ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-white border-emerald-500/30 text-slate-900 shadow-sm'
              }`}>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className={`w-5 h-5 ${item.completed ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <div>
                    <h4 className={`font-bold ${item.completed ? 'line-through' : 'text-slate-900'}`}>{item.task}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{item.time} • {item.module}</span>
                  </div>
                </div>

                {!item.completed && (
                  <button onClick={() => alert("Marked study task complete! +50 Pts awarded.")} className="px-3 py-1 bg-emerald-950 text-white rounded-xl text-[10px] font-bold">
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
