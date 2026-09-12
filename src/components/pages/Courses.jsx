import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Play, CheckCircle, Award, ChevronRight, Video, FileText } from 'lucide-react';

export default function Courses() {
  const { addPoints } = useApp();
  const [activeCourse, setActiveCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms Masterclass",
      category: "Computer Science",
      progress: 65,
      lessonsCount: 12,
      desc: "Comprehensive guide to arrays, linked lists, trees, graphs, and dynamic programming.",
      modules: [
        { title: "Module 1: Time & Space Complexity", duration: "25m", type: "video", done: true },
        { title: "Module 2: Arrays & Two Pointer Technique", duration: "40m", type: "video", done: true },
        { title: "Module 3: Stack & Queue Implementation", duration: "35m", type: "reading", done: true },
        { title: "Module 4: Binary Search Trees & Traversal", duration: "50m", type: "video", done: false },
        { title: "Module 5: Dynamic Programming Fundamentals", duration: "60m", type: "quiz", done: false },
      ]
    },
    {
      id: 2,
      title: "Full-Stack Web Development BootCamp",
      category: "Software Engineering",
      progress: 40,
      lessonsCount: 15,
      desc: "React, Node.js, Express, PostgreSQL, and REST API architectural patterns.",
      modules: [
        { title: "Module 1: HTML5 & Modern CSS Grid Layouts", duration: "30m", type: "video", done: true },
        { title: "Module 2: React State & Custom Hooks", duration: "45m", type: "video", done: true },
        { title: "Module 3: Node.js Backend Server & Middleware", duration: "50m", type: "reading", done: false },
      ]
    }
  ];

  return (
    <div className="space-y-6 text-slate-900">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Courses</h1>
        <p className="text-sm text-slate-600 font-medium">
          Structured curriculum, lesson modules, progress tracking, and certificates.
        </p>
      </div>

      {activeCourse ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
          <button onClick={() => setActiveCourse(null)} className="text-xs font-bold text-slate-700 hover:text-emerald-700 hover:underline transition">
            ← Back to Course Catalog
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">{activeCourse.category}</span>
              <h2 className="text-xl font-extrabold text-slate-900">{activeCourse.title}</h2>
            </div>
            <button 
              onClick={() => { addPoints(200, "Completed course"); alert("Certificate generated!"); }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md hover:from-amber-300 hover:to-amber-400 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-slate-950 fill-slate-950" /> Download Certificate
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Course Curriculum & Lessons</h3>
            {activeCourse.modules.map((m, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between hover:border-emerald-300 transition">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${m.done ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200/80 text-slate-600 border-slate-300'}`}>
                    {m.done ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{m.title}</h4>
                    <span className="text-[10px] text-slate-500 font-medium">{m.duration} • {m.type}</span>
                  </div>
                </div>
                <button className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-950/20">
                  {m.done ? 'Review' : 'Start Lesson'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(c => (
            <div key={c.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {c.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{c.lessonsCount} Lessons</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition">{c.title}</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">{c.desc}</p>

                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Completion Progress</span>
                    <span className="text-amber-700 font-extrabold">{c.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full" style={{ width: `${c.progress}%` }}></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveCourse(c)}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 hover:from-emerald-800 hover:to-slate-800 font-extrabold text-white rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20"
              >
                <span>Continue Course</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
