import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Crown, Search, Plus } from 'lucide-react';

export default function Leaderboard() {
  const { user } = useApp();
  const [leaderboardType, setLeaderboardType] = useState('Assessments');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [leaderboardData, setLeaderboardData] = useState([]);

  const filteredList = leaderboardData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topThree = filteredList.filter(item => item.rank <= 3);
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  const handleSeedCurrentStudent = () => {
    setLeaderboardData([
      { rank: 1, name: user.name, points: user.points, tier: `${user.tier.name} ${user.tier.level}`, dept: "CSE", batch: "2026", isCurrentUser: true }
    ]);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leaderboard</h1>
          <p className="text-sm text-slate-600 font-medium">
            Top student rankings across institutional evaluations.
          </p>
        </div>

        {/* Toggles & Search */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setLeaderboardType('Assessments')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                leaderboardType === 'Assessments'
                  ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Assessments
            </button>
            <button
              onClick={() => setLeaderboardType('Internal')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                leaderboardType === 'Internal'
                  ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Internal Activities
            </button>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300/80 rounded-xl focus:outline-none focus:border-emerald-500 shadow-xs font-bold text-slate-900"
            />
          </div>
        </div>
      </div>

      {filteredList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shadow-md shadow-amber-500/10">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">No student rankings yet</h3>
            <p className="text-xs text-slate-600 max-w-sm mt-1 font-medium">
              Student rankings for {leaderboardType} will appear here once evaluation scores are published.
            </p>
          </div>
          <button
            onClick={handleSeedCurrentStudent}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-950/20"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>Publish Current Student Score</span>
          </button>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {topThree.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-2">
              {/* 2nd Place */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col items-center order-2 md:order-1">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center text-xs border border-slate-200 mb-2">
                  #2
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {getInitials(topThree[1].name)}
                </div>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 mt-2">{topThree[1].label || 'RUNNER UP'}</span>
                <h3 className="font-extrabold text-slate-900 text-sm">{topThree[1].name}</h3>
                <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {topThree[1].tier}
                </span>
                <div className="mt-2 font-extrabold text-slate-900 text-base">{topThree[1].points} pts</div>
              </div>

              {/* 1st Place */}
              <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-xl text-center flex flex-col items-center relative -translate-y-1 order-1 md:order-2">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xs mb-2 mt-1 shadow-xs">
                  <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  {getInitials(topThree[0].name)}
                </div>
                <span className="text-[10px] font-extrabold uppercase text-amber-700 mt-2">{topThree[0].label || 'CHAMPION'}</span>
                <h3 className="font-extrabold text-slate-900 text-base">{topThree[0].name}</h3>
                <span className="mt-1 px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                  {topThree[0].tier}
                </span>
                <div className="mt-3 font-extrabold text-amber-600 text-lg">{topThree[0].points} pts</div>
              </div>

              {/* 3rd Place */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center flex flex-col items-center order-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center text-xs border border-slate-200 mb-2">
                  #3
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {getInitials(topThree[2].name)}
                </div>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 mt-2">{topThree[2].label || 'THIRD PLACE'}</span>
                <h3 className="font-extrabold text-slate-900 text-sm">{topThree[2].name}</h3>
                <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {topThree[2].tier}
                </span>
                <div className="mt-2 font-extrabold text-slate-900 text-base">{topThree[2].points} pts</div>
              </div>
            </div>
          )}

          {/* Standings Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold tracking-wider text-[10px] border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6">Rank</th>
                    <th className="py-3.5 px-6">Student Name</th>
                    <th className="py-3.5 px-6">Performance Tier</th>
                    <th className="py-3.5 px-6">Department</th>
                    <th className="py-3.5 px-6 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item) => (
                    <tr 
                      key={item.rank}
                      className={`hover:bg-slate-50/80 transition ${
                        item.isCurrentUser ? 'bg-emerald-50/40 font-bold' : ''
                      }`}
                    >
                      <td className="py-3.5 px-6 font-extrabold text-slate-900">#{item.rank}</td>
                      <td className="py-3.5 px-6 font-extrabold text-slate-900">{item.name}</td>
                      <td className="py-3.5 px-6">
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                          {item.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-slate-600">{item.dept} ({item.batch})</td>
                      <td className="py-3.5 px-6 text-right font-extrabold text-emerald-800 text-sm">{item.points} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
