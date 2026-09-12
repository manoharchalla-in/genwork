import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Flame, CheckCircle, XCircle, Award } from 'lucide-react';

export default function Practice() {
  const { addPoints } = useApp();
  const [selectedTopic, setSelectedTopic] = useState('Quant');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [streak, setStreak] = useState(3);
  const [sessionPoints, setSessionPoints] = useState(0);

  const practiceQuestions = [
    {
      id: 1,
      topic: 'Quant',
      difficulty: 'Medium',
      question: "A train running at a speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
      options: ["120 metres", "150 metres", "180 metres", "324 metres"],
      correct: 1,
      explanation: "Speed = 60 * (5/18) m/s = 50/3 m/s. Length = Speed * Time = (50/3) * 9 = 150 metres."
    },
    {
      id: 2,
      topic: 'Logical Reasoning',
      difficulty: 'Easy',
      question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
      options: ["1/3", "1/8", "2/8", "1/16"],
      correct: 1,
      explanation: "This is a simple division series. Each number is half of the previous number."
    },
    {
      id: 3,
      topic: 'CS Fundamentals',
      difficulty: 'Medium',
      question: "Which of the following sorting algorithms is NOT stable in its standard implementation?",
      options: ["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"],
      correct: 2,
      explanation: "QuickSort swaps non-adjacent elements over long distances, making it inherently unstable."
    },
    {
      id: 4,
      topic: 'Verbal',
      difficulty: 'Hard',
      question: "Select the word nearest in meaning to: 'EPHEMERAL'",
      options: ["Transient", "Permanent", "Eternal", "Substantial"],
      correct: 0,
      explanation: "Ephemeral means lasting for a very short time; transient."
    }
  ];

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQ = practiceQuestions[activeQuestionIdx % practiceQuestions.length];

  const handleSelect = (idx) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correct) {
      setStreak(prev => prev + 1);
      setSessionPoints(prev => prev + 30);
      addPoints(30, "Practice question answered correctly");
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setActiveQuestionIdx(prev => prev + 1);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Practice Bank</h1>
          <p className="text-sm text-slate-600 font-medium">
            Daily practice problems in Aptitude, CS Fundamentals & Logical Reasoning.
          </p>
        </div>

        {/* Streak & Points Counter Widget */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 border border-rose-200/80 rounded-xl text-rose-800 font-bold text-xs shadow-xs">
            <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>Streak: {streak} Days</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 font-bold text-xs shadow-xs">
            <Award className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Session: +{sessionPoints} pts</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase text-emerald-700 tracking-wider mr-1">Topic:</span>
          {['Quant', 'Logical Reasoning', 'Verbal', 'CS Fundamentals'].map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                selectedTopic === topic
                  ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:bg-emerald-50/50'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase text-amber-700 tracking-wider">Difficulty:</span>
          {['Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                selectedDifficulty === diff
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:bg-amber-50/50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Active Practice Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
            {currentQ.topic} • {currentQ.difficulty}
          </span>
          <span className="text-xs font-extrabold text-amber-700">
            +30 Pts / Correct Answer
          </span>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correct;

            let btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-900 hover:bg-emerald-50/40 hover:border-emerald-300';

            if (hasAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-emerald-700 font-bold shadow-md';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border text-xs font-bold text-left transition flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                    hasAnswered && isCorrect ? 'bg-emerald-400 text-slate-950 border-emerald-300' : 'bg-white border-slate-300 text-slate-900'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {hasAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-300" />}
                {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback & Explanation */}
        {hasAnswered && (
          <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/80 rounded-2xl space-y-1.5 text-xs">
            <h4 className="font-extrabold text-emerald-900">
              Explanation & Logic
            </h4>
            <p className="text-slate-700 font-medium leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question Control */}
        {hasAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-6 py-3 text-xs font-extrabold bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 text-white rounded-xl shadow-md shadow-emerald-950/20 transition"
            >
              Next Practice Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
