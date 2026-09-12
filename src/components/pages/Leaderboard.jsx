import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Crown, Search, Plus, Award, Shield, Sparkles } from 'lucide-react';

export default function Leaderboard() {
  const { user } = useApp();
  const [leaderboardType, setLeaderboardType] = useState('Assessments');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, name: 'VIKRAM SHARMA', points: 3450, tier: 'Level 2 Lv3', dept: 'CSE', batch: '2026' },
    { rank: 2, name: user.name, points: user.points || 1450, tier: `${user.tier?.name || 'Level 1'} ${user.tier?.level || 'Lv4'}`, dept: 'CSE', batch: '2026', isCurrentUser: true },
    { rank: 3, name: 'ANANYA ROY', points: 2900, tier: 'Level 2 Lv1', dept: 'ECE', batch: '2026' },
    { rank: 4, name: 'PRIYA NAIR', points: 2400, tier: 'Level 1 Lv5', dept: 'IT', batch: '2026' },
    { rank: 5, name: 'ROHAN VERMA', points: 1950, tier: 'Level 1 Lv3', dept: 'CSE', batch: '2026' }
  ]);

  const filteredList = leaderboardData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('') : 'U';

  return (
    <div className="space-y-8 text-slate-900 font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Trophy className="w-7 h-7 text-amber-500" /> Executive Leaderboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Top student rankings across verified assessments and gamified skill points.
          </p>
        </div>

        {/* Board Type Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            {['Assessments', 'Practice Bank', 'Weekly Ranking'].map(type => (
              <button
                key={type}
                onClick={() => setLeaderboardType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  leaderboardType === type
                    ? 'bg-slate-900 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 unequal-height pedestals podium */}
      <div className="grid grid-cols-3 gap-4 lg:gap-6 items-end max-w-4xl mx-auto pt-6 pb-4">
        
        {/* #2 Rank Pedestal (Left) */}
        <div className="bg-white rounded-3xl p-6 text-center space-y-3 border border-slate-200 shadow-sm order-1">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-base">
            {getInitials(leaderboardData[1]?.name)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">2ND PLACE</span>
            <h3 className="font-serif text-lg font-bold text-slate-900 truncate">{leaderboardData[1]?.name}</h3>
            <span className="font-mono text-sm font-extrabold text-slate-700 block mt-1">{leaderboardData[1]?.points} PTS</span>
          </div>
          <div className="h-24 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center font-serif text-3xl font-black text-slate-400">
            2
          </div>
        </div>

        {/* #1 Rank Champion Pedestal (Center) */}
        <div className="bg-amber-50 rounded-3xl p-8 text-center space-y-4 border-2 border-amber-300 shadow-md order-2 -translate-y-4">
          <div className="p-2 w-10 h-10 rounded-full bg-amber-400 text-slate-950 mx-auto shadow-sm">
            <Crown className="w-6 h-6 fill-slate-950" />
          </div>

          <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-400">
            {getInitials(leaderboardData[0]?.name)}
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-amber-800 tracking-widest block">GRAND CHAMPION</span>
            <h2 className="font-serif text-xl font-extrabold text-slate-900 truncate">{leaderboardData[0]?.name}</h2>
            <span className="font-mono text-lg font-black text-amber-700 block mt-1">{leaderboardData[0]?.points} PTS</span>
          </div>

          <div className="h-32 bg-amber-200/60 rounded-2xl border border-amber-300 flex items-center justify-center font-serif text-4xl font-black text-amber-700">
            1
          </div>
        </div>

        {/* #3 Rank Pedestal (Right) */}
        <div className="bg-white rounded-3xl p-6 text-center space-y-3 border border-slate-200 shadow-sm order-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-base">
            {getInitials(leaderboardData[2]?.name)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">3RD PLACE</span>
            <h3 className="font-serif text-lg font-bold text-slate-900 truncate">{leaderboardData[2]?.name}</h3>
            <span className="font-mono text-sm font-extrabold text-slate-700 block mt-1">{leaderboardData[2]?.points} PTS</span>
          </div>
          <div className="h-16 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center font-serif text-2xl font-black text-slate-400">
            3
          </div>
        </div>

      </div>

      {/* Standings Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-slate-900">Full Cohort Standings</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search student rank..."
            className="px-4 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl text-slate-900 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department & Batch</th>
                <th className="py-3 px-4">Tier Rank</th>
                <th className="py-3 px-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredList.map(item => (
                <tr key={item.rank} className={`hover:bg-slate-50 transition ${item.isCurrentUser ? 'bg-amber-50/60 font-bold border-l-4 border-l-amber-500' : ''}`}>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">#{item.rank}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-700">
                      {getInitials(item.name)}
                    </div>
                    <span>{item.name}</span>
                    {item.isCurrentUser && <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded-full uppercase">You</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{item.dept} • Batch {item.batch}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-serif italic">{item.tier}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 text-sm">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
