import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, Camera, Sparkles, Send, HelpCircle, FileText, CheckCircle2, 
  ArrowRight, ShieldCheck, Volume2, MessageSquare, AlertCircle, RefreshCw, Upload
} from 'lucide-react';

export default function AITutor() {
  const { addPoints } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Alexander! I'm your Socratic AI Study Tutor. Ask me any question, or upload a photo of a textbook problem! I'll guide you step-by-step with hints.",
      hints: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [hintStep, setHintStep] = useState(0);
  const [groundedDoc, setGroundedDoc] = useState('Data Structures & Algorithms Syllabus (CS201)');
  const [escalated, setEscalated] = useState(false);

  const sampleDoubt = {
    question: "How do I calculate the time complexity of a recursive Fibonacci function with memoization?",
    hint1: "Think about how many distinct subproblems exist for Fibonacci of N.",
    hint2: "Without memoization it computes fib(n-1) and fib(n-2) repeatedly ($O(2^n)$). But with a memo array, how many times is each `fib(k)` actually computed?",
    fullSolution: "With memoization, each value from `fib(0)` to `fib(n)` is computed exactly once and cached in $O(1)$ time. Therefore, there are $N$ distinct subproblems, leading to a linear time complexity of **$O(N)$** and space complexity of **$O(N)$** for the call stack and cache array."
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = { sender: 'user', text: inputQuery };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Simulate Socratic AI Response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Great question regarding "${userMsg.text}". Let's solve this Socratically!`,
          hint1: sampleDoubt.hint1,
          hint2: sampleDoubt.hint2,
          fullSolution: sampleDoubt.fullSolution,
          stepShown: 1
        }
      ]);
      addPoints(10, 'Asked AI Study Tutor Doubt');
    }, 600);
  };

  const handleImageUpload = () => {
    alert("Camera/Image OCR Activated: Scanning mathematical equation from image...");
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: "[Uploaded Photo of Problem: Solve Integral ∫(x² + 3x) dx]" },
      {
        sender: 'ai',
        text: "OCR parsed the equation: **∫(x² + 3x) dx**. Let's apply the power rule of integration!",
        hint1: "Recall the power rule: ∫ x^n dx = (x^(n+1))/(n+1) + C.",
        hint2: "Integrate x² and 3x separately: ∫ x² dx + 3 * ∫ x dx.",
        fullSolution: "Result: **(x³ / 3) + (3x² / 2) + C**",
        stepShown: 1
      }
    ]);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Header Banner - Clean White Premium */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 shadow-xs">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              Socratic AI Study Tutor
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-black tracking-widest">
                Grounded Mode
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              OCR Camera Doubt Solving, Socratic Hint Ladder & Grounded Syllabus Guidance.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <FileText className="w-4 h-4 text-slate-700" />
          <span className="text-slate-500 font-bold">Grounded to:</span>
          <span className="font-extrabold text-slate-900 truncate max-w-[200px]">{groundedDoc}</span>
        </div>
      </div>

      {/* Main Chat & Camera Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chat Feed (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[620px]">
          {/* Top Bar */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 rounded-t-3xl text-xs font-bold">
            <span className="text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Grounded Socratic Response Mode
            </span>
            <button 
              onClick={() => { setEscalated(true); alert("Doubt escalated to assigned trainer (Dr. Eleanor Vance) with full chat transcript."); }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Escalate to Human Trainer
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-3 ${
                  m.sender === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none font-medium' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  <div className="font-semibold">{m.text}</div>

                  {/* Socratic Hint Ladder UI */}
                  {m.hint1 && (
                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                      <span className="font-extrabold text-emerald-900 block text-[11px] uppercase tracking-wider flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Socratic Hint #1
                      </span>
                      <p className="text-emerald-950 font-medium">{m.hint1}</p>

                      {hintStep >= 1 ? (
                        <div className="pt-2 border-t border-emerald-200 text-emerald-900">
                          <span className="font-extrabold text-[11px] uppercase block mb-1">Socratic Hint #2</span>
                          <p>{m.hint2}</p>

                          {hintStep >= 2 ? (
                            <div className="mt-2 p-2.5 bg-amber-100/80 border border-amber-300 rounded-lg text-amber-950 font-mono text-[11px]">
                              <span className="font-bold block text-slate-900 mb-1">Full Step-by-Step Solution:</span>
                              {m.fullSolution}
                            </div>
                          ) : (
                            <button 
                              onClick={() => setHintStep(2)}
                              className="mt-2 px-3 py-1 bg-amber-500 text-slate-950 rounded-lg font-bold text-[10px] hover:bg-amber-400"
                            >
                              Show Final Solution
                            </button>
                          )}
                        </div>
                      ) : (
                        <button 
                          onClick={() => setHintStep(1)}
                          className="px-3 py-1 bg-emerald-950 text-white rounded-lg font-bold text-[10px] hover:bg-emerald-900"
                        >
                          Need More Help? Show Hint #2
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-slate-50/50 rounded-b-3xl flex items-center space-x-2">
            <button
              type="button"
              onClick={handleImageUpload}
              className="p-3 bg-white border border-slate-300 hover:border-emerald-600 rounded-2xl text-slate-700 hover:text-emerald-700 shadow-sm transition"
              title="Camera/Image Doubt Solver"
            >
              <Camera className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask a doubt or paste a code snippet..."
              className="flex-1 bg-white border border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3 text-xs text-slate-900 outline-none font-medium"
            />

            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl shadow-md hover:from-emerald-900 transition"
            >
              <Send className="w-5 h-5 text-amber-400" />
            </button>
          </form>
        </div>

        {/* Right Sidebar: Grounded Material & Proactive Quiz */}
        <div className="space-y-6">
          {/* Grounded Knowledge Base Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" /> Grounded Course Documents
            </h3>
            <div className="space-y-2 text-xs">
              {['Data Structures & Algorithms Syllabus', 'Quantitative Aptitude Formula Sheet', 'Versant Speech Rubric'].map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => setGroundedDoc(doc)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    groundedDoc === doc
                      ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {doc}
                </button>
              ))}
            </div>
          </div>

          {/* Proactive 3-Question Micro Quiz Nudge */}
          <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 p-5 rounded-3xl border border-amber-300/40 space-y-3">
            <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider block">Active Retrieval Nudge</span>
            <h4 className="font-extrabold text-slate-900 text-xs">Want a quick 3-question quiz on Memoization & Recursion?</h4>
            <button 
              onClick={() => alert("Launching 3-Question Micro-Quiz on Memoization (+30 pts for completion)...")}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm hover:from-amber-300"
            >
              Start 3-Question Micro Quiz (+30 Pts)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
