import React, { useState } from 'react';
import { FileText, Heart, Share2, Search, Plus, Eye, Tag, ChevronRight } from 'lucide-react';

export default function Blogs() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likesMap, setLikesMap] = useState({ 1: 42, 2: 89, 3: 120 });
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const tags = [
    'All', '#Test Preparation', '#WebDevelopment', '#AWS', '#DevOps', '#Software Testing', '#Algorithms'
  ];

  const blogsList = [
    {
      id: 1,
      title: "Top 10 Campus Placement Coding Questions & How to Solve Them",
      author: "Sneha Reddy",
      date: "Sep 08, 2026",
      tags: ['#Test Preparation', '#Algorithms'],
      desc: "A comprehensive breakdown of frequently asked data structures questions during campus recruitment drives at tier-1 tech firms.",
      views: "2.3k views"
    },
    {
      id: 2,
      title: "Mastering AWS Cloud Essentials for Entry Level Software Roles",
      author: "Amit Varma",
      date: "Sep 04, 2026",
      tags: ['#AWS', '#DevOps'],
      desc: "Key AWS services every graduate engineer should understand before technical interviews: S3, EC2, Lambda, and IAM security protocols.",
      views: "1.8k views"
    },
    {
      id: 3,
      title: "Building Scalable Web Apps with React & Node Microservices",
      author: "Alex Pierce",
      date: "Sep 01, 2026",
      tags: ['#WebDevelopment', '#Software Testing'],
      desc: "Step by step architecture tutorial on setting up RESTful services, frontend state management, and continuous deployment pipelines.",
      views: "3.1k views"
    }
  ];

  const filteredBlogs = blogsList.filter(b => {
    const matchesTag = selectedTag === 'All' || b.tags.includes(selectedTag);
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleLike = (id) => {
    setLikesMap(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">All Blogs</h1>
          <p className="text-sm text-slate-600 font-medium">
            Student articles, placement experiences, and technical insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300/80 rounded-xl focus:outline-none focus:border-emerald-500 shadow-xs font-bold text-slate-900"
            />
          </div>

          <button
            onClick={() => setCreatingBlog(!creatingBlog)}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 text-slate-950" /> Create Blog
          </button>
        </div>
      </div>

      {creatingBlog && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg space-y-4 max-w-3xl mx-auto">
          <h3 className="text-base font-extrabold text-slate-900">Publish New Student Blog Post</h3>
          <input
            type="text"
            placeholder="Article Title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500"
          />
          <textarea
            placeholder="Write markdown / article content..."
            rows={5}
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setCreatingBlog(false)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl text-slate-700">Cancel</button>
            <button onClick={() => { alert('Blog published!'); setCreatingBlog(false); }} className="px-5 py-2 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white text-xs font-extrabold rounded-xl shadow-md">Publish Article</button>
          </div>
        </div>
      )}

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Popular Tags */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3 h-fit">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-emerald-600" /> Popular Tags
          </h3>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white font-extrabold shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50/50 border border-slate-200/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Center Feed: Blog Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition space-y-3 group">
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 cursor-pointer transition">
                {blog.title}
              </h2>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {blog.desc}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-600">{blog.author} • {blog.date}</span>

                <div className="flex items-center gap-4">
                  <button onClick={() => handleLike(blog.id)} className="flex items-center gap-1 hover:text-rose-600 transition font-bold">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>{likesMap[blog.id] || 0}</span>
                  </button>
                  <button onClick={() => alert('Article link copied to clipboard!')} className="hover:text-emerald-700 transition">
                    <Share2 className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Trending Insights */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 h-fit">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-500" /> Trending Insights
          </h3>

          <div className="space-y-3">
            {blogsList.map((item, idx) => (
              <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase block">#{idx + 1} Trending</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-2">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium mt-1 block">{item.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
