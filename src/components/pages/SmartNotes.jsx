import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Sparkles, Download, Share2, Layers, CheckCircle2, Copy } from 'lucide-react';

export default function SmartNotes() {
  const { addPoints } = useApp();
  const [noteContent, setNoteContent] = useState(
    `# Data Structures - Trees & Binary Search Trees\n\nA Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties:\n- The left subtree of a node contains only nodes with keys lesser than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Time Complexity: O(log N) average for Search/Insert/Delete.`
  );
  const [aiSummary, setAiSummary] = useState(null);

  const handleSummarize = () => {
    setAiSummary({
      keyPoints: [
        'BST left subtree keys < node key; right subtree keys > node key.',
        'Average Time Complexity for ops: O(log N).',
        'Worst-case height: O(N) when skewed (unbalanced).'
      ],
      quickQuiz: [
        'What is the search time complexity of a balanced BST? (Answer: O(log N))'
      ]
    });
    addPoints(15, 'Generated AI Note Summary');
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Smart Notes & AI Summarizer
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                NotebookLM-style
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Course-linked note-taking, AI key-point extraction & flashcard auto-generation.
            </p>
          </div>
        </div>

        <button 
          onClick={handleSummarize}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-slate-950" /> AI Summarize Note
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Note Editor */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-700">Markdown Note Editor (Linked to DS&A Course)</span>
            <button onClick={() => alert("Note exported as Markdown file.")} className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          <textarea
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            rows={14}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-900 outline-none focus:border-emerald-600 leading-relaxed"
          />
        </div>

        {/* AI Insight & Summary Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> AI Summary & Structured Key Points
          </h3>

          {aiSummary ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">KEY EXTRACTED POINTS</span>
                <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                  {aiSummary.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">RETRIEVAL QUIZ NUDGE</span>
                <p className="text-xs font-bold text-slate-900">{aiSummary.quickQuiz[0]}</p>
              </div>

              <button 
                onClick={() => alert("Extracted 3 flashcard pairs and saved to Flashcards deck!")}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-400" /> Convert Summary to Flashcard Deck
              </button>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 space-y-2 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <Sparkles className="w-6 h-6 text-slate-300 mx-auto" />
              <p>Click "AI Summarize Note" above to extract key points and auto-generate flashcards.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
