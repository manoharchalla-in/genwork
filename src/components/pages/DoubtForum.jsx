import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, ThumbsUp, CheckCircle2, ShieldCheck, Plus, Search } from 'lucide-react';

export default function DoubtForum() {
  const { user, addPoints } = useApp();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to fix cyclic dependency error in Spring Boot Beans?',
      author: 'VIKRAM SHARMA',
      batch: 'ABAP - CITY 2026',
      upvotes: 14,
      answers: 3,
      verified: true,
      tags: ['Java', 'Spring Boot', 'Backend'],
      body: 'I am getting a BeanCurrentlyInCreationException when initializing ServiceA and ServiceB. How can I resolve this cycle?'
    },
    {
      id: 2,
      title: 'Difference between shallow copy and deep copy in Python?',
      author: 'ANANYA ROY',
      batch: 'ECE - CITY 2026',
      upvotes: 8,
      answers: 2,
      verified: false,
      tags: ['Python', 'Data Structures'],
      body: 'When should I use copy.copy() vs copy.deepcopy()?'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newTitle || !newBody) return;

    setQuestions(prev => [
      {
        id: Date.now(),
        title: newTitle,
        author: user.name,
        batch: user.batch,
        upvotes: 1,
        answers: 0,
        verified: false,
        tags: ['General'],
        body: newBody
      },
      ...prev
    ]);
    setNewTitle('');
    setNewBody('');
    addPoints(15, 'Posted Doubt in Community Forum');
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Peer Doubt Forum & Q&A
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                StackOverflow-style
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Verified trainer answers, peer reputation points & AI duplicate detection.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Post Question & Question List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Question Form */}
          <form onSubmit={handlePostQuestion} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">ASK THE COMMUNITY</h3>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Question Title (e.g., How does indexing work in MySQL?)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold outline-none focus:border-emerald-600"
            />
            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              rows={3}
              placeholder="Describe your problem or paste error trace..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium outline-none focus:border-emerald-600"
            />
            <button type="submit" className="px-4 py-2.5 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white font-bold text-xs rounded-xl shadow-md">
              Post Question (+15 Pts)
            </button>
          </form>

          {/* Questions Feed */}
          <div className="space-y-4">
            {questions.map(q => (
              <div key={q.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 text-sm hover:text-emerald-700 cursor-pointer">{q.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{q.author} • {q.batch}</p>
                  </div>
                  {q.verified && (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Trainer Verified Answer
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 font-medium">{q.body}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center space-x-2">
                    {q.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 text-slate-500 font-bold">
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <ThumbsUp className="w-4 h-4" /> {q.upvotes}
                    </button>
                    <span>{q.answers} Answers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Top Peer Responders */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">TOP COMMUNITY HELPER REPUTATION</h3>
            <div className="space-y-3">
              {[
                { name: 'ALEXANDER PIERCE', rep: '1,450 Rep Pts', badges: 'Level 1' },
                { name: 'ANANYA ROY', rep: '4,100 Rep Pts', badges: 'Level 2' }
              ].map((h, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-900">{h.name}</h4>
                    <span className="text-[10px] text-amber-600 font-bold">{h.rep}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">{h.badges}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
