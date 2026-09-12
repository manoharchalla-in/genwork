import React, { useState } from 'react';
import { Users, Video, Mic, MessageSquare, Code, Play, CheckCircle } from 'lucide-react';

export default function PairProgramming() {
  const [role, setRole] = useState('Interviewer');
  const [chat, setChat] = useState([
    { sender: 'Peer (Priya)', text: 'Hey Alexander! Ready for the pair mock coding interview?' },
    { sender: 'You', text: 'Yes! I have shared the problem statement in the editor.' }
  ]);
  const [msgInput, setMsgInput] = useState('');
  const [code, setCode] = useState('// Shared Collaborative Room #402\n// Peer: Priya (Active Cursor: Line 4)\n\nfunction maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setChat(prev => [...prev, { sender: 'You', text: msgInput }]);
    setMsgInput('');
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pair Programming</h1>
          <p className="text-sm text-slate-600 font-medium">
            Real-time collaborative code session with peer cursors, chat & video interview mode.
          </p>
        </div>

        {/* Role Toggle & Session Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRole(role === 'Interviewer' ? 'Candidate' : 'Interviewer')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-950/20"
          >
            Role: {role}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Room #402 Live</span>
          </div>
        </div>
      </div>

      {/* Main Pair Room Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaborative Code Editor (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
          <div className="bg-slate-900/90 p-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold text-slate-200">Shared Editor</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono font-bold border border-emerald-400/30">
              Priya's Cursor: Line 4
            </span>
          </div>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-5 focus:outline-none resize-none leading-relaxed min-h-[360px]"
          />

          <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => alert('Code executed in pair session environment!')}
              className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-md hover:from-amber-300 hover:to-amber-400"
            >
              Run Pair Solution
            </button>
          </div>
        </div>

        {/* Right Sidebar: Peer Video & Chat */}
        <div className="space-y-4">
          {/* Peer Video Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">Peer Video Stream</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 bg-slate-100 hover:bg-emerald-50 rounded-lg text-slate-700 hover:text-emerald-700">
                  <Video className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 bg-slate-100 hover:bg-emerald-50 rounded-lg text-slate-700 hover:text-emerald-700">
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="h-36 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-2xl flex flex-col items-center justify-center text-white relative shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-lg shadow-md">
                PR
              </div>
              <span className="text-xs font-bold mt-2 text-white">Priya Reddy</span>
              <span className="text-[10px] text-emerald-300 font-medium">Mic Active • Connected</span>
            </div>
          </div>

          {/* Peer Chat */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col h-64 justify-between">
            <span className="text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-2">Room Chat</span>
            <div className="flex-1 overflow-y-auto my-2 space-y-2 text-xs">
              {chat.map((c, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-extrabold text-emerald-800 block text-[10px]">{c.sender}:</span>
                  <p className="text-slate-700 font-medium">{c.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendChat} className="flex gap-1.5">
              <input
                type="text"
                placeholder="Type message..."
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-emerald-500 font-bold"
              />
              <button className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white font-extrabold text-xs rounded-xl shadow-xs">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
