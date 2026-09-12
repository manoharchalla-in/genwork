import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Plus, Sparkles, RefreshCw, CheckCircle2, Flame, Award, Download, Upload, Share2, BookOpen } from 'lucide-react';

export default function Flashcards() {
  const { addPoints } = useApp();
  const [currentDeck, setCurrentDeck] = useState('Data Structures & Algorithms Core');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [decks, setDecks] = useState([
    {
      title: 'Data Structures & Algorithms Core',
      count: 25,
      dueToday: 8,
      retention: '92%',
      cards: [
        { front: 'What is the worst-case time complexity of QuickSort?', back: 'O(N²) when the pivot chosen is consistently the smallest or largest element.' },
        { front: 'Explain the difference between a BFS and DFS traversal.', back: 'BFS uses a FIFO Queue (level-by-level), whereas DFS uses a LIFO Stack or recursion (depth-first).' },
        { front: 'What is a balanced binary search tree (AVL Tree)?', back: 'A BST where the heights of the two child subtrees of any node differ by at most one.' },
      ]
    },
    {
      title: 'Quantitative Aptitude Formulas',
      count: 40,
      dueToday: 12,
      retention: '88%',
      cards: [
        { front: 'Formula for Compound Interest', back: 'A = P(1 + r/n)^(nt)' },
        { front: 'Speed, Distance & Time relationship', back: 'Speed = Distance / Time' }
      ]
    }
  ]);

  const activeDeckObj = decks.find(d => d.title === currentDeck) || decks[0];
  const activeCards = activeDeckObj.cards;
  const currentCard = activeCards[cardIndex] || activeCards[0];

  const handleSM2Review = (rating) => {
    setIsFlipped(false);
    addPoints(5, `Reviewed Flashcard (${rating})`);
    if (cardIndex < activeCards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
      alert(`Completed flashcard deck "${currentDeck}"! Review points awarded.`);
    }
  };

  const handleAIGenerateDeck = () => {
    alert("AI Deck Generator: Extracted 10 flashcard pairs from recent lesson notes!");
    setDecks(prev => [
      ...prev,
      {
        title: 'AI Generated: DBMS Normalization',
        count: 10,
        dueToday: 10,
        retention: '100%',
        cards: [
          { front: 'Define 1st Normal Form (1NF)', back: 'Each table cell must contain a single (atomic) value, and no repeating groups exist.' },
          { front: 'Define 3rd Normal Form (3NF)', back: 'Table is in 2NF and has no transitive functional dependencies.' }
        ]
      }
    ]);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-400/40 text-amber-400 shadow-inner">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Spaced Repetition Flashcards
              <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase bg-amber-400 text-slate-950 font-bold tracking-widest">
                SM-2 Engine
              </span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Active recall decks with automated AI card generation and retention analytics.
            </p>
          </div>
        </div>

        <button 
          onClick={handleAIGenerateDeck}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-slate-950" /> AI Auto-Generate Deck
        </button>
      </div>

      {/* Main Flashcard Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Deck Flip Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[380px] relative text-center">
            <span className="absolute top-4 left-6 text-xs font-bold text-slate-400">
              Card {cardIndex + 1} of {activeCards.length} — {currentDeck}
            </span>

            {/* Flip Card Workspace */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-lg min-h-[220px] p-8 rounded-2xl bg-slate-50 border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center cursor-pointer shadow-inner hover:border-emerald-500 transition-all select-none"
            >
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">QUESTION (TAP TO FLIP)</span>
                  <p className="text-base font-extrabold text-slate-900">{currentCard.front}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">ANSWER</span>
                  <p className="text-sm font-bold text-emerald-950">{currentCard.back}</p>
                </div>
              )}
            </div>

            {/* SM-2 Recall Rating Buttons */}
            {isFlipped && (
              <div className="mt-6 flex items-center justify-center space-x-3 w-full max-w-md">
                <button 
                  onClick={() => handleSM2Review('Again')} 
                  className="flex-1 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl border border-rose-300 transition"
                >
                  Again (1 min)
                </button>
                <button 
                  onClick={() => handleSM2Review('Hard')} 
                  className="flex-1 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs rounded-xl border border-amber-300 transition"
                >
                  Hard (1 day)
                </button>
                <button 
                  onClick={() => handleSM2Review('Good')} 
                  className="flex-1 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-300 transition"
                >
                  Good (3 days)
                </button>
                <button 
                  onClick={() => handleSM2Review('Easy')} 
                  className="flex-1 py-2.5 bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold text-xs rounded-xl border border-teal-300 transition"
                >
                  Easy (7 days)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deck Manager & Retention Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Active Flashcard Decks
            </h3>

            <div className="space-y-2">
              {decks.map((deck, idx) => (
                <div 
                  key={idx}
                  onClick={() => { setCurrentDeck(deck.title); setCardIndex(0); setIsFlipped(false); }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    currentDeck === deck.title
                      ? 'bg-gradient-to-r from-emerald-950 to-teal-900 text-white border-emerald-500/40 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-xs">{deck.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentDeck === deck.title ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {deck.dueToday} Due
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] mt-1.5 opacity-80">
                    <span>{deck.count} Total Cards</span>
                    <span>Retention: {deck.retention}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
