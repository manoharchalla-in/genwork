import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, Search, LayoutGrid, List, Folder, ArrowRight, 
  Clock, Trophy, Play, Check, ChevronLeft
} from 'lucide-react';

export default function Assessments() {
  const { addPoints } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Quantitative & Aptitude Mastery",
      testCount: 4,
      desc: "Speed math, percentages, ratios, permutations, and probability tests.",
      tests: [
        { 
          id: 101, 
          title: "Speed Math & Number Systems Evaluation", 
          duration: "15 mins", 
          questionsCount: 5, 
          points: 100, 
          status: "Not Started",
          score: null,
          questions: [
            { q: "What is 15% of 480?", options: ["64", "72", "80", "68"], correct: 1 },
            { q: "Find the odd one out: 3, 5, 7, 12, 13, 17", options: ["7", "12", "13", "17"], correct: 1 },
            { q: "If A can complete a job in 6 days and B in 12 days, how long together?", options: ["4 days", "5 days", "3 days", "6 days"], correct: 0 },
            { q: "Solve for x: 2x + 7 = 21", options: ["6", "7", "8", "9"], correct: 1 },
            { q: "The average of 5 numbers is 20. If one number is removed, average becomes 18. What was removed?", options: ["28", "30", "25", "22"], correct: 0 }
          ]
        },
        { 
          id: 102, 
          title: "Permutations & Probability Diagnostic", 
          duration: "20 mins", 
          questionsCount: 5, 
          points: 150, 
          status: "Completed",
          score: "90%",
          questions: []
        }
      ]
    },
    {
      id: 2,
      name: "Core Computer Science Fundamentals",
      testCount: 3,
      desc: "OS, DBMS, Computer Networks, and Object-Oriented Programming principles.",
      tests: [
        { 
          id: 201, 
          title: "DBMS SQL & Normalization Assessment", 
          duration: "25 mins", 
          questionsCount: 5, 
          points: 150, 
          status: "Not Started",
          score: null,
          questions: [
            { q: "Which SQL keyword is used to remove duplicates from a result set?", options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"], correct: 1 },
            { q: "Which normal form eliminates partial dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 1 },
            { q: "ACID properties: What does 'I' stand for?", options: ["Integrity", "Isolation", "Index", "Instance"], correct: 1 },
            { q: "Primary Key can contain NULL values. True or False?", options: ["True", "False"], correct: 1 },
            { q: "Which clause groups rows with identical values in summary rows?", options: ["GROUP BY", "ORDER BY", "HAVING", "COLLECT"], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Technical Coding Readiness",
      testCount: 2,
      desc: "Data structures logic, algorithm complexity analysis, and pseudocode comprehension.",
      tests: [
        { 
          id: 301, 
          title: "Data Structures & Time Complexity Benchmark", 
          duration: "30 mins", 
          questionsCount: 4, 
          points: 200, 
          status: "Not Started",
          score: null,
          questions: [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(N log N)", "O(N)", "O(N²)", "O(1)"], correct: 2 },
            { q: "Which data structure operates on a LIFO principle?", options: ["Queue", "Stack", "Heap", "Tree"], correct: 1 }
          ]
        }
      ]
    }
  ];

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTestResult(null);
  };

  const handleOptionSelect = (qIdx, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const submitTest = () => {
    if (!activeTest || !activeTest.questions) return;
    let correctCount = 0;
    activeTest.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / activeTest.questions.length) * 100);
    const earnedPoints = Math.round((correctCount / activeTest.questions.length) * activeTest.points);

    setTestResult({
      correct: correctCount,
      total: activeTest.questions.length,
      percentage,
      earnedPoints
    });

    if (earnedPoints > 0) {
      addPoints(earnedPoints, `Completed assessment: ${activeTest.title}`);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Assessments</h1>
          <p className="text-sm text-slate-600 font-medium">
            Test your knowledge across aptitude, CS fundamentals, and coding topics.
          </p>
        </div>

        {/* Search & Layout Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300/80 rounded-xl focus:outline-none focus:border-emerald-500 shadow-xs font-bold text-slate-900"
            />
          </div>

          <div className="flex p-1 bg-white border border-slate-200/80 rounded-xl shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white' : 'text-slate-700'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white' : 'text-slate-700'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Test Taking Modal View */}
      {activeTest ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <button
              onClick={() => setActiveTest(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-emerald-700 hover:underline transition"
            >
              <ChevronLeft className="w-4 h-4 text-emerald-600" />
              Back to Assessments
            </button>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              {activeTest.duration} Timer
            </span>
          </div>

          {!testResult ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-600">
                  Question {currentQuestionIdx + 1} of {activeTest.questions.length}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {activeTest.questions[currentQuestionIdx].q}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {activeTest.questions[currentQuestionIdx].options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(currentQuestionIdx, optIdx)}
                      className={`w-full p-4 text-left text-xs font-bold rounded-2xl border transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-emerald-700 shadow-md'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-emerald-50/40 hover:border-emerald-300 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                          isSelected ? 'bg-emerald-400 text-slate-950 border-emerald-300' : 'bg-white border-slate-300 text-slate-900'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-300" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                  className="px-4 py-2.5 text-xs font-bold bg-white border border-slate-300 text-slate-800 disabled:opacity-40 rounded-xl hover:bg-slate-50 transition"
                >
                  Previous Question
                </button>

                {currentQuestionIdx < activeTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-800 to-teal-800 text-white hover:from-emerald-700 hover:to-teal-700 rounded-xl transition shadow-md"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={submitTest}
                    className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 rounded-xl transition shadow-md font-extrabold"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="text-center max-w-md mx-auto py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-300 text-amber-600 flex items-center justify-center mx-auto shadow-md shadow-amber-500/10">
                <Trophy className="w-8 h-8 text-amber-500 fill-amber-500" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Assessment Complete!</h3>
              <p className="text-xs text-slate-600 font-medium">
                You scored <strong className="text-emerald-700">{testResult.percentage}%</strong> ({testResult.correct}/{testResult.total} correct answers).
              </p>
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl font-extrabold text-emerald-900 text-sm shadow-xs">
                +{testResult.earnedPoints} Points Earned for your Tier Rank!
              </div>
              <button
                onClick={() => { setActiveTest(null); setTestResult(null); }}
                className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-900 to-teal-900 text-white hover:from-emerald-800 hover:to-teal-800 rounded-xl transition shadow-md"
              >
                Return to Assessment List
              </button>
            </div>
          )}
        </div>
      ) : selectedCategory ? (
        /* Selected Category Test List */
        <div className="space-y-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-emerald-700 hover:underline transition"
          >
            ← Back to Categories
          </button>
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">{selectedCategory.name}</h2>
            <p className="text-xs text-slate-600 font-medium">{selectedCategory.desc}</p>

            <div className="space-y-3 pt-2">
              {selectedCategory.tests.map(test => (
                <div key={test.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{test.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {test.duration}</span>
                      <span>•</span>
                      <span>{test.questionsCount} MCQs</span>
                      <span>•</span>
                      <span className="text-amber-600 font-extrabold">+{test.points} pts</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {test.status === 'Completed' ? (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                        Score: {test.score}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-200/80 text-slate-700 text-xs font-bold rounded-full">
                        Not Started
                      </span>
                    )}

                    <button
                      onClick={() => startTest(test)}
                      className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white hover:from-emerald-800 hover:to-slate-800 rounded-xl transition flex items-center gap-1.5 shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      {test.status === 'Completed' ? 'Retake' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
            <Folder className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">No categories found</h3>
          <p className="text-xs text-slate-600 max-w-sm font-medium">You don't have any matching categories yet or search returned no results.</p>
        </div>
      ) : (
        /* Category Grid / List View */
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCategories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200/80">
                    {cat.testCount} tests
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base transition group-hover:text-emerald-800">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1.5 line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(cat)}
                className="mt-6 w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20"
              >
                <span>Open Category</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
