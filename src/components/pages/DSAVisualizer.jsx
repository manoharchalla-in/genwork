import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, ChevronRight, Sliders } from 'lucide-react';

export default function DSAVisualizer() {
  const [algorithm, setAlgorithm] = useState('BubbleSort');
  const [array, setArray] = useState([45, 20, 85, 30, 60, 15, 70, 40]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // ms

  const generateRandomArray = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 15);
    setArray(newArr);
    setActiveIndices([]);
    setIsPlaying(false);
  };

  const stepBubbleSort = async () => {
    setIsPlaying(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise(r => setTimeout(r, speed));
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
    setActiveIndices([]);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">DSA Visualizer</h1>
          <p className="text-sm text-slate-500 font-medium">
            Interactive step-by-step algorithm animations & state visualizations.
          </p>
        </div>

        {/* Algorithm Selector & Generate */}
        <div className="flex items-center gap-2">
          <select
            value={algorithm}
            onChange={e => setAlgorithm(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl text-navy-900 shadow-xs focus:outline-none"
          >
            <option value="BubbleSort">Bubble Sort</option>
            <option value="SelectionSort">Selection Sort</option>
            <option value="BinaryTree">Binary Search Tree</option>
          </select>
          <button
            onClick={generateRandomArray}
            className="px-3.5 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 rounded-xl transition"
          >
            Reset Array
          </button>
        </div>
      </div>

      {/* Main Visualizer Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={stepBubbleSort}
              disabled={isPlaying}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs font-black rounded-xl shadow transition flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-navy-950" />}
              <span>{isPlaying ? 'Sorting...' : 'Play Animation'}</span>
            </button>
          </div>

          {/* Speed Slider */}
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Speed:</span>
            <input
              type="range"
              min="100"
              max="800"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Bar Animation View */}
        <div className="h-64 bg-slate-900 rounded-2xl p-6 flex items-end justify-center gap-4 border border-slate-800">
          {array.map((val, idx) => {
            const isActive = activeIndices.includes(idx);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[48px]">
                <span className="text-[10px] font-mono font-bold text-slate-300">{val}</span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-200 ${
                    isActive ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-105' : 'bg-emerald-500'
                  }`}
                  style={{ height: `${val * 2.2}px` }}
                />
                <span className="text-[9px] font-mono text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Code Sync Panel */}
        <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Algorithm Pseudocode Execution Sync:</span>
          <p className={activeIndices.length > 0 ? 'text-amber-300 font-bold bg-amber-950/50 p-1 rounded' : 'text-slate-400'}>
            if (arr[j] &gt; arr[j + 1]) swap(arr[j], arr[j + 1]);
          </p>
        </div>
      </div>
    </div>
  );
}
