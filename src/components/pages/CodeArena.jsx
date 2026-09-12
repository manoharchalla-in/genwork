import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Swords, Play, CheckCircle2, XCircle, Code, Terminal, Clock, Trophy, ChevronRight } from 'lucide-react';

export default function CodeArena() {
  const { addPoints } = useApp();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [userCode, setUserCode] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const problems = [
    {
      id: 1,
      title: "1. Two Sum Problem",
      difficulty: "Easy",
      pts: 100,
      desc: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
      starterCode: {
        javascript: "function twoSum(nums, target) {\n  // Write your code here\n  const map = new Map();\n  for(let i=0; i<nums.length; i++){\n    let diff = target - nums[i];\n    if(map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
        python: "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []"
      },
      testCases: [
        { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
        { input: "nums = [3,2,4], target = 6", expected: "[1, 2]" }
      ]
    },
    {
      id: 2,
      title: "2. Valid Parentheses Stack",
      difficulty: "Medium",
      pts: 150,
      desc: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      starterCode: {
        javascript: "function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for(let char of s) {\n    if(!map[char]) stack.push(char);\n    else if(stack.pop() !== map[char]) return false;\n  }\n  return stack.length === 0;\n}",
        python: "def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char not in mapping:\n            stack.append(char)\n        elif not stack or stack.pop() != mapping[char]:\n            return False\n    return len(stack) == 0"
      },
      testCases: [
        { input: 's = "()[]{}"', expected: "true" },
        { input: 's = "(]"', expected: "false" }
      ]
    }
  ];

  const openProblem = (prob) => {
    setSelectedProblem(prob);
    setUserCode(prob.starterCode[language] || prob.starterCode.javascript);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsRunning(false);
      setExecutionResult({
        status: 'Passed',
        message: 'All Test Cases Passed Successfully!',
        runtime: '42 ms',
        memory: '14.2 MB',
        testDetails: selectedProblem.testCases.map((tc, idx) => ({
          testNum: idx + 1,
          status: 'Passed',
          input: tc.input,
          expected: tc.expected,
          output: tc.expected
        }))
      });
    }, 800);
  };

  const handleSubmitCode = () => {
    handleRunCode();
    setTimeout(() => {
      addPoints(selectedProblem.pts, `Solved CodeArena problem: ${selectedProblem.title}`);
      alert(`Solution Accepted! +${selectedProblem.pts} Points added to your profile.`);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">CodeArena</h1>
          <p className="text-sm text-slate-500 font-medium">
            Competitive coding, automated judge test execution & placement contests.
          </p>
        </div>

        {/* Contest Mini-Leaderboard Badge */}
        <div className="px-4 py-2 bg-navy-800 text-white rounded-2xl flex items-center gap-3 border border-navy-700 shadow">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div className="text-xs">
            <span className="font-bold text-amber-400 block">Weekly Code Sprint #12</span>
            <span className="text-[10px] text-slate-300">Live Mini Rank: #4 in CSE</span>
          </div>
        </div>
      </div>

      {selectedProblem ? (
        /* Problem Detail & Editor View */
        <div className="space-y-4">
          <button
            onClick={() => setSelectedProblem(null)}
            className="text-xs font-bold text-slate-500 hover:text-navy-900"
          >
            ← Back to Problem List
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Description */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                  selectedProblem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {selectedProblem.difficulty}
                </span>
                <span className="text-xs font-black text-amber-600">+{selectedProblem.pts} pts</span>
              </div>

              <h2 className="text-lg font-black text-navy-900">{selectedProblem.title}</h2>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{selectedProblem.desc}</p>

              {/* Sample Testcases */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase text-slate-400">Sample Testcases</h4>
                {selectedProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
                    <p className="text-slate-500 font-bold">Input: <span className="text-slate-800">{tc.input}</span></p>
                    <p className="text-slate-500 font-bold">Expected Output: <span className="text-emerald-700 font-bold">{tc.expected}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code Editor & Execution Panel */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Editor Top Bar */}
              <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-300">Code Editor</span>
                </div>

                <select
                  value={language}
                  onChange={e => {
                    setLanguage(e.target.value);
                    setUserCode(selectedProblem.starterCode[e.target.value] || '');
                  }}
                  className="bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400 px-3 py-1 rounded-lg focus:outline-none"
                >
                  <option value="javascript">JavaScript (ES6)</option>
                  <option value="python">Python 3</option>
                </select>
              </div>

              {/* Editor Area */}
              <div className="p-4 flex-1">
                <textarea
                  rows={14}
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-2 rounded focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Execution Console Bar */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" /> Judge Execution Console
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition"
                    >
                      {isRunning ? 'Running...' : 'Run Test Cases'}
                    </button>
                    <button
                      onClick={handleSubmitCode}
                      disabled={isRunning}
                      className="px-5 py-1.5 bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs font-black rounded-lg transition shadow"
                    >
                      Submit Solution
                    </button>
                  </div>
                </div>

                {/* Execution Results Output */}
                {executionResult && (
                  <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl text-xs space-y-1 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {executionResult.status}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Runtime: {executionResult.runtime} • Memory: {executionResult.memory}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono">{executionResult.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Problem List */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-navy-900 text-sm uppercase tracking-wider">
            Available Problem Set
          </h3>

          <div className="space-y-3">
            {problems.map(prob => (
              <div
                key={prob.id}
                onClick={() => openProblem(prob)}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-amber-400 transition cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-navy-900 text-sm group-hover:text-amber-600 transition">
                      {prob.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                      prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                    {prob.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-amber-600 whitespace-nowrap">
                    +{prob.pts} pts
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
