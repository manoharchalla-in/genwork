import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, Mic, BookOpen, Edit3, MessageSquare, Search, Play, 
  Square, Volume2, CheckCircle2, RotateCcw, Clock, ArrowRight, Shield
} from 'lucide-react';

export default function LSRW() {
  const { addPoints } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  // Recording State for Speaking/Versant
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Writing state
  const [essayText, setEssayText] = useState('');

  const lsrwCategories = [
    { id: 'listening', title: 'Listening Comprehension', icon: Headphones, count: 5, color: 'bg-blue-500' },
    { id: 'speaking', title: 'Speaking & Pronunciation', icon: Mic, count: 4, color: 'bg-amber-500' },
    { id: 'reading', title: 'Reading Passage Analysis', icon: BookOpen, count: 6, color: 'bg-emerald-500' },
    { id: 'writing', title: 'Writing & Essay Builder', icon: Edit3, count: 3, color: 'bg-purple-500' },
    { id: 'asq_speaking', title: 'ASQ_Speaking Evaluation', icon: MessageSquare, count: 2, color: 'bg-indigo-500' },
    { id: 'versant', title: 'Versant Practice Simulation', icon: Volume2, count: 4, color: 'bg-rose-500' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordedAudio(false);
    const timer = setInterval(() => {
      setRecordingSeconds(prev => {
        if (prev >= 15) {
          clearInterval(timer);
          setIsRecording(false);
          setRecordedAudio(true);
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordedAudio(true);
  };

  const submitModule = () => {
    addPoints(100, "Completed LSRW Module");
    alert("Response submitted successfully! +100 Points earned.");
    setActiveModule(null);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">LSRW Practice</h1>
          <p className="text-sm text-slate-600 font-medium">
            Listening, Speaking, Reading, Writing & Versant English fluency training.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300/80 rounded-xl focus:outline-none focus:border-emerald-500 shadow-xs font-bold text-slate-900"
          />
        </div>
      </div>

      {/* Active Interactive Test Runner */}
      {activeModule ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <button
              onClick={() => setActiveModule(null)}
              className="text-xs font-bold text-slate-700 hover:text-emerald-700 hover:underline transition"
            >
              ← Back to LSRW Categories
            </button>
            <span className="px-3.5 py-1 bg-amber-50 text-amber-800 text-xs font-extrabold rounded-full border border-amber-200/80">
              {activeCategory.toUpperCase()} Module
            </span>
          </div>

          {/* Module 1: Listening Clip */}
          {activeCategory === 'listening' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <h3 className="font-extrabold text-slate-900 text-base">Audio Clip: Campus Interview Protocol</h3>
              <div className="p-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl flex items-center gap-4 shadow-md">
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Play className="w-5 h-5 fill-slate-950" />
                </button>
                <div className="flex-1">
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="w-1/3 bg-amber-400 h-full"></div>
                  </div>
                  <span className="text-[10px] text-emerald-300 mt-1 block">0:14 / 1:30</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-slate-800">Q1: What is the main advice given by the HR interviewer in the audio clip?</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input type="radio" name="listening" className="accent-emerald-600" /> Focus on concise communication and key technical projects.
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input type="radio" name="listening" className="accent-emerald-600" /> Memorize entire code solutions line by line.
                  </label>
                </div>
              </div>

              <button onClick={submitModule} className="w-full py-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold rounded-xl text-xs hover:from-emerald-800 hover:to-slate-800 shadow-md shadow-emerald-950/20">
                Submit Listening Assessment
              </button>
            </div>
          )}

          {/* Module 2: Speaking / Versant Mic Test */}
          {(activeCategory === 'speaking' || activeCategory === 'versant' || activeCategory === 'asq_speaking') && (
            <div className="space-y-6 max-w-xl mx-auto text-center">
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-widest">Speaking Prompt</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">
                  "Describe a challenging software bug you encountered and how you systematically debugged it."
                </p>
              </div>

              {/* Mic Controls & Visualizer */}
              <div className="py-6 flex flex-col items-center justify-center space-y-4">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-rose-600 text-white animate-pulse shadow-xl shadow-rose-600/30 ring-8 ring-rose-100' 
                    : 'bg-gradient-to-br from-emerald-800 to-teal-900 text-amber-300 shadow-lg'
                }`}>
                  <Mic className="w-10 h-10" />
                </div>

                {isRecording ? (
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-rose-600 animate-pulse">● Recording Voice ({recordingSeconds}s)</span>
                    <button
                      onClick={handleStopRecording}
                      className="block px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Stop Recording
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-md hover:from-amber-300 hover:to-amber-400"
                  >
                    Start Recording Answer
                  </button>
                )}

                {recordedAudio && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Voice response recorded successfully! Playback available.
                  </div>
                )}
              </div>

              {recordedAudio && (
                <button onClick={submitModule} className="w-full py-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold rounded-xl text-xs hover:from-emerald-800 shadow-md">
                  Submit Speaking Test Response
                </button>
              )}
            </div>
          )}

          {/* Module 3: Reading Passage */}
          {activeCategory === 'reading' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs leading-relaxed text-slate-700 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">Passage: The Rise of Distributed Microservices</h4>
                <p>
                  Microservice architectures isolate software components into independently deployable units communicating over standard network protocols. 
                  While offering superior horizontal scaling, microservices introduce distributed state complexity...
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-slate-900">What is a primary tradeoff of microservices mentioned above?</p>
                <div className="space-y-1 text-xs">
                  <label className="block p-2.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-emerald-50/50">
                    <input type="radio" name="reading" className="mr-2 accent-emerald-600" /> Increased distributed state complexity
                  </label>
                  <label className="block p-2.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-emerald-50/50">
                    <input type="radio" name="reading" className="mr-2 accent-emerald-600" /> Complete loss of horizontal scaling
                  </label>
                </div>
              </div>

              <button onClick={submitModule} className="w-full py-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold rounded-xl text-xs hover:from-emerald-800 shadow-md">
                Submit Reading Answers
              </button>
            </div>
          )}

          {/* Module 4: Writing Essay Editor */}
          {activeCategory === 'writing' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <h4 className="font-extrabold text-slate-900 text-sm">Essay Prompt</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Write a 150-word essay explaining the importance of ethical AI development in engineering.
                </p>
              </div>

              <div className="space-y-1">
                <textarea
                  rows={8}
                  placeholder="Start typing your essay response here..."
                  value={essayText}
                  onChange={e => setEssayText(e.target.value)}
                  className="w-full p-4 text-xs bg-slate-50 border border-slate-300/80 rounded-2xl focus:outline-none focus:border-emerald-500 font-mono"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-500 px-1">
                  <span>Target: 150 words</span>
                  <span className="text-amber-700">
                    {essayText.trim() ? essayText.trim().split(/\s+/).length : 0} words typed
                  </span>
                </div>
              </div>

              <button onClick={submitModule} className="w-full py-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold rounded-xl text-xs hover:from-emerald-800 shadow-md">
                Submit Essay
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Categories Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lsrwCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-extrabold rounded-full border border-amber-200/80">
                      {cat.count} tests
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Practice interactive tests to improve your score.
                  </p>
                </div>

                <button
                  onClick={() => { setActiveCategory(cat.id); setActiveModule(true); }}
                  className="mt-6 w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20"
                >
                  <span>Open Category</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
