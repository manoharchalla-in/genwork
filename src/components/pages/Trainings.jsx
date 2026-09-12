import React, { useState } from 'react';
import { Video, Calendar, Clock, User, ExternalLink, CheckCircle } from 'lucide-react';

export default function Trainings() {
  const [filter, setFilter] = useState('Upcoming');

  const trainings = [
    {
      id: 1,
      title: "Placement Masterclass: Cracking Amazon & Google Technical Interviews",
      trainer: "Dr. Rajesh Kumar (Ex-Amazon Staff Engineer)",
      dateTime: "Tomorrow at 5:00 PM IST",
      type: "Upcoming",
      status: "Registration Open",
      attendees: 142
    },
    {
      id: 2,
      title: "System Design Essentials: Load Balancing & Caching",
      trainer: "Prof. Priya Sharma",
      dateTime: "Sep 14, 2026 at 6:30 PM IST",
      type: "Upcoming",
      status: "Scheduled",
      attendees: 98
    },
    {
      id: 3,
      title: "Full-Stack Mock Technical Interview Bootcamp",
      trainer: "Senior Dev Mentor Alex",
      dateTime: "Sep 05, 2026",
      type: "Recorded",
      recordingUrl: "#",
      attendees: 320
    }
  ];

  const filtered = trainings.filter(t => t.type === filter);

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trainings & Live Workshops</h1>
          <p className="text-sm text-slate-600 font-medium">
            Live webinars, placement preparation bootcamps, and archived session recordings.
          </p>
        </div>

        <div className="flex p-1 bg-white border border-slate-200/80 rounded-xl shadow-xs">
          <button
            onClick={() => setFilter('Upcoming')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'Upcoming' ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md' : 'text-slate-600'}`}
          >
            Upcoming Live
          </button>
          <button
            onClick={() => setFilter('Recorded')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'Recorded' ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md' : 'text-slate-600'}`}
          >
            Recorded Archive
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-300 transition group">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                {item.status || 'Recorded'}
              </span>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-emerald-600" /> {item.trainer}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {item.dateTime}</span>
                <span className="text-amber-700 font-extrabold">{item.attendees} Registered</span>
              </div>
            </div>

            <button
              onClick={() => alert(item.type === 'Upcoming' ? 'Joined live webinar room!' : 'Opening recording...')}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2 shrink-0"
            >
              <Video className="w-4 h-4 text-emerald-300" />
              <span>{item.type === 'Upcoming' ? 'Join Live Webinar' : 'Watch Recording'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
