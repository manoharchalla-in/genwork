import React, { useState } from 'react';
import { Code2, Play, Share2, Save, FileCode, Terminal, Plus, Folder } from 'lucide-react';

export default function Codespace() {
  const [files, setFiles] = useState([
    { name: 'index.js', content: '// Welcome to your GENWORK Codespace\nconsole.log("Executing Cloud Sandbox Code...");\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}\n\nconsole.log("Fibonacci(7) =", fibonacci(7));' },
    { name: 'styles.css', content: '/* Add custom stylesheet rules */\nbody {\n  font-family: sans-serif;\n  background: #f8fafc;\n}' },
  ]);
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleOutput('Building environment...\nStarting Node.js runtime environment v18.16.0...\n');
    setTimeout(() => {
      setIsExecuting(false);
      setConsoleOutput(prev => prev + '> Executing index.js\nExecuting Cloud Sandbox Code...\nFibonacci(7) = 13\n\n[Process completed with status 0]');
    }, 600);
  };

  const handleCreateFile = () => {
    const fileName = prompt('Enter new filename (e.g. app.py, utils.js):');
    if (fileName) {
      setFiles(prev => [...prev, { name: fileName, content: `// New file: ${fileName}` }]);
      setActiveFileIdx(files.length);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">Personal Codespace</h1>
          <p className="text-sm text-slate-500 font-medium">
            Multi-file cloud sandbox IDE for rapid prototyping, algorithm tests & project sharing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Codespace project saved to cloud storage!')}
            className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4" /> Save
          </button>
          <button
            onClick={() => alert('Shareable URL generated: https://skillforge.edu/cs/alex-23ht1')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow transition"
          >
            <Share2 className="w-4 h-4" /> Share Link
          </button>
        </div>
      </div>

      {/* Main Cloud IDE Layout */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
        {/* Left: File Tree Explorer */}
        <div className="bg-slate-950 p-4 border-r border-slate-800 text-slate-300 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-400" /> Workspace Files
            </span>
            <button onClick={handleCreateFile} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {files.map((f, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFileIdx(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center gap-2 ${
                  activeFileIdx === idx ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500' : 'hover:bg-slate-900 text-slate-400'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: File Editor */}
        <div className="lg:col-span-2 p-4 border-r border-slate-800 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">
              Editing: {files[activeFileIdx]?.name}
            </span>
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs font-black rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5 fill-navy-950" />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>

          <textarea
            value={files[activeFileIdx]?.content}
            onChange={e => {
              const val = e.target.value;
              setFiles(prev => prev.map((f, i) => i === activeFileIdx ? { ...f, content: val } : f));
            }}
            className="w-full flex-1 bg-slate-900 text-emerald-400 font-mono text-xs p-2 focus:outline-none resize-none leading-relaxed"
            rows={18}
          />
        </div>

        {/* Right: Output Console */}
        <div className="bg-slate-950 p-4 text-slate-300 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-2 mb-2 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase text-slate-400">Output Console</span>
          </div>

          <pre className="flex-1 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed overflow-y-auto">
            {consoleOutput || 'Click "Run Code" to execute script and view stdout.'}
          </pre>
        </div>
      </div>
    </div>
  );
}
