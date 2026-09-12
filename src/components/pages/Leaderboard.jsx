import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Crown, Search, Plus, Award, Shield, Sparkles } from 'lucide-react';

export default function Leaderboard() {
  const { user } = useApp();
  const [leaderboardType, setLeaderboardType] = useState('Assessments');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, name: 'VIKRAM SHARMA', points: 3450, tier: 'Level 2 Lv3', dept: 'CSE', batch: '2026', avatarBg: 'bg-emerald-900 text-champagne-300' },
    { rank: 2, name: user.name, points: user.points || 1450, tier: `${user.tier?.name || 'Level 1'} ${user.tier?.level || 'Lv4'}`, dept: 'CSE', batch: '2026', isCurrentUser: true, avatarBg: 'bg-champagne-500 text-obsidian-950' },
    { rank: 3, name: 'ANANYA ROY', points: 2900, tier: 'Level 2 Lv1', dept: 'ECE', batch: '2026', avatarBg: 'bg-obsidian-800 text-champagne-200' },
    { rank: 4, name: 'PRIYA NAIR', points: 2400, tier: 'Level 1 Lv5', dept: 'IT', batch: '2026', avatarBg: 'bg-obsidian-800 text-slate-300' },
    { rank: 5, name: 'ROHAN VERMA', points: 1950, tier: 'Level 1 Lv3', dept: 'CSE', batch: '2026', avatarBg: 'bg-obsidian-800 text-slate-300' }
  ]);

  const filteredList = leaderboardData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('') : 'U';

  return (
    <div className="space-y-8 text-slate-100 font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-700/60 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Trophy className="w-7 h-7 text-champagne-400" /> Executive Leaderboard
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Institutional rankings across verified assessments and gamified skill points.
          </p>
        </div>

        {/* Board Type Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-obsidian-900 rounded-2xl border border-obsidian-700">
            {['Assessments', 'Practice Bank', 'Weekly Ranking'].map(type => (
              <button
                key={type}
                onClick={() => setLeaderboardType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  leaderboardType === type
                    ? 'bg-gradient-to-r from-champagne-400 to-champagne-500 text-obsidian-950 font-black shadow-foil'
                    : 'text-slate-400 hover:text-white hover:bg-obsidian-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 unequal-height pedestals podium (Spec §3 Podium Metaphor) */}
      <div className="grid grid-cols-3 gap-4 lg:gap-6 items-end max-w-4xl mx-auto pt-6 pb-4">
        
        {/* #2 Rank Pedestal (Left) */}
        <div className="glossy-card glossy-card-hover rounded-3xl p-6 text-center space-y-3 border border-obsidian-700 relative order-1">
          <div className="w-14 h-14 mx-auto rounded-full bg-obsidian-800 border-2 border-slate-400 flex items-center justify-center font-bold text-slate-200 text-base shadow-inner">
            {getInitials(leaderboardData[1]?.name)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">2ND PLACE</span>
            <h3 className="font-serif text-lg font-bold text-white truncate">{leaderboardData[1]?.name}</h3>
            <span className="font-mono text-sm font-extrabold text-champagne-300 block mt-1">{leaderboardData[1]?.points} PTS</span>
          </div>
          <div className="h-24 bg-gradient-to-t from-obsidian-900 to-obsidian-800 rounded-2xl border border-obsidian-700 flex items-center justify-center font-serif text-3xl font-black text-slate-500">
            2
          </div>
        </div>

        {/* #1 Rank Champion Pedestal (Center - Tallest with Sheen & Foil Sheen Crown) */}
        <div className="foil-sheen rounded-3xl p-8 text-center space-y-4 border-2 border-champagne-400 shadow-foil relative order-2 -translate-y-4">
          <div className="p-2 w-10 h-10 rounded-full bg-champagne-400 text-obsidian-950 mx-auto shadow-md">
            <Crown className="w-6 h-6 fill-obsidian-950" />
          </div>

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-champagne-400 to-champagne-500 text-obsidian-950 flex items-center justify-center font-black text-xl shadow-foil border-2 border-white">
            {getInitials(leaderboardData[0]?.name)}
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-champagne-300 tracking-widest block">GRAND CHAMPION</span>
            <h2 className="font-serif text-xl font-extrabold text-white truncate">{leaderboardData[0]?.name}</h2>
            <span className="font-mono text-lg font-black text-champagne-300 block mt-1">{leaderboardData[0]?.points} PTS</span>
          </div>

          <div className="h-32 bg-gradient-to-t from-champagne-500/20 to-obsidian-850 rounded-2xl border border-champagne-400/40 flex items-center justify-center font-serif text-4xl font-black text-champagne-400">
            1
          </div>
        </div>

        {/* #3 Rank Pedestal (Right) */}
        <div className="glossy-card glossy-card-hover rounded-3xl p-6 text-center space-y-3 border border-obsidian-700 relative order-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-obsidian-800 border-2 border-amber-700 flex items-center justify-center font-bold text-amber-200 text-base shadow-inner">
            {getInitials(leaderboardData[2]?.name)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest block">3RD PLACE</span>
            <h3 className="font-serif text-lg font-bold text-white truncate">{leaderboardData[2]?.name}</h3>
            <span className="font-mono text-sm font-extrabold text-champagne-300 block mt-1">{leaderboardData[2]?.points} PTS</span>
          </div>
          <div className="h-16 bg-gradient-to-t from-obsidian-900 to-obsidian-800 rounded-2xl border border-obsidian-700 flex items-center justify-center font-serif text-2xl font-black text-slate-600">
            3
          </div>
        </div>

      </div>

      {/* Standings Table */}
      <div className="glossy-card rounded-3xl p-6 border border-obsidian-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-white">Full Cohort Standings</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search student rank..."
            className="px-4 py-2 text-xs bg-obsidian-950 border border-obsidian-700 focus:border-champagne-400 rounded-xl text-white outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-950 text-slate-400 uppercase font-bold text-[10px] border-b border-obsidian-700">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department & Batch</th>
                <th className="py-3 px-4">Tier Rank</th>
                <th className="py-3 px-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-800/80 font-medium">
              {filteredList.map(item => (
                <tr key={item.rank} className={`hover:bg-obsidian-800/50 transition ${item.isCurrentUser ? 'bg-champagne-400/10 border-l-4 border-l-champagne-400' : ''}`}>
                  <td className="py-3.5 px-4 font-mono font-black text-champagne-400 text-sm">#{item.rank}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-obsidian-800 border border-champagne-400/30 flex items-center justify-center text-[10px] text-champagne-300">
                      {getInitials(item.name)}
                    </div>
                    <span>{item.name}</span>
                    {item.isCurrentUser && <span className="px-2 py-0.5 bg-champagne-400 text-obsidian-950 text-[9px] font-black rounded-full uppercase">You</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{item.dept} • Batch {item.batch}</td>
                  <td className="py-3.5 px-4 text-champagne-200 font-serif italic">{item.tier}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-champagne-300 text-sm">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
