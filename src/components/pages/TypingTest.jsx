import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Keyboard, RotateCcw, Trophy, CheckCircle, Zap, Award, Play, 
  Pause, RefreshCw, BarChart2, AlertCircle, ArrowRight, Sparkles,
  Volume2, VolumeX, Eye, Flame, Code, BookOpen, Clock, Activity,
  Sliders, Share2, Download, Check, Shield, User, HelpCircle, Maximize2
} from 'lucide-react';

// --- QUOTES & CODE CORPUS ---
const QUOTES_CORPUS = [
  { text: "Simplicity is prerequisite for reliability. Software engineering is a race between software engineers who strive to build larger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots.", author: "Edsger W. Dijkstra" },
  { text: "Talk is cheap. Show me the code. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Linus Torvalds & Martin Fowler" },
  { text: "First, solve the problem. Then, write the code. Premature optimization is the root of all evil in programming.", author: "John Johnson & Donald Knuth" },
];

const CODE_CORPUS = [
  "function binarySearch(arr, target) { let low = 0, high = arr.length - 1; while (low <= high) { const mid = Math.floor((low + high) / 2); if (arr[mid] === target) return mid; else if (arr[mid] < target) low = mid + 1; else high = mid - 1; } return -1; }",
  "const fetchUserData = async (userId) => { try { const response = await fetch(`/api/v1/users/${userId}`); if (!response.ok) throw new Error('Network response failed'); const data = await response.json(); return { success: true, data }; } catch (err) { console.error('API Error:', err.message); return { success: false, error: err }; } };",
  "class LRUCache { constructor(capacity) { this.capacity = capacity; this.cache = new Map(); } get(key) { if (!this.cache.has(key)) return -1; const val = this.cache.get(key); this.cache.delete(key); this.cache.set(key, val); return val; } put(key, val) { if (this.cache.has(key)) this.cache.delete(key); this.cache.set(key, val); if (this.size > this.capacity) this.cache.delete(this.cache.keys().next().value); } }"
];

const TEXT_CORPUS = {
  Easy: [
    "the quick brown fox jumps over the lazy dog. programming is fun and rewarding when you practice every single day with focus.",
    "simple code runs fast when logic is clear. take small steps each day to build your typing confidence and precision.",
    "clean habits make strong developers. focus on accuracy first and speed will follow naturally over time."
  ],
  Medium: [
    "Engineering colleges track student skill development, assessments, and placement readiness to prepare candidates for modern software technology roles. Consistency and deliberate practice build strong technical foundations across all computer science domains.",
    "Data structures and algorithms form the backbone of efficient software architecture. Understanding time complexity allows engineers to write scalable code that performs well under heavy load and high concurrency."
  ],
  Hard: [
    "Polymorphism, encapsulation, and asynchronous event loops form quintessential architectural tenets of robust software engineering frameworks across distributed cloud paradigms; moreover, algorithmic optimizations require meticulous profiling of memory consumption and thread synchronization.",
    "In microservice architectures, event-driven message brokers decouple monolithic dependencies into asynchronous channels: Kafka, RabbitMQ, and gRPC facilitate high-throughput streaming while preserving strict transactional data integrity and fault-tolerant state recovery."
  ],
  Expert: [
    "const state = { wpm: 120, acc: 99.4, err: 0 }; async function syncStats(api='https://gen-vnxv.edu/v1/metrics') { const res = await fetch(api, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(state) }); return res.ok; }",
    "SELECT users.id, profiles.wpm_rank, COUNT(attempts.id) FROM users JOIN profiles ON users.id = profiles.user_id WHERE attempts.created_at >= NOW() - INTERVAL '7 days' GROUP BY users.id HAVING AVG(attempts.accuracy) > 95.0 ORDER BY profiles.wpm_rank DESC LIMIT 50;"
  ]
};

// Keyboard Layout for Visual Heatmap & Finger Guide
const QWERTY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
];

const FINGER_MAP = {
  Q: 'Left Pinky', A: 'Left Pinky', Z: 'Left Pinky',
  W: 'Left Ring', S: 'Left Ring', X: 'Left Ring',
  E: 'Left Middle', D: 'Left Middle', C: 'Left Middle',
  R: 'Left Index', F: 'Left Index', V: 'Left Index', T: 'Left Index', G: 'Left Index', B: 'Left Index',
  Y: 'Right Index', H: 'Right Index', N: 'Right Index', U: 'Right Index', J: 'Right Index', M: 'Right Index',
  I: 'Right Middle', K: 'Right Middle', ',': 'Right Middle',
  O: 'Right Ring', L: 'Right Ring', '.': 'Right Ring',
  P: 'Right Pinky', ';': 'Right Pinky', '/': 'Right Pinky', ' ': 'Thumbs'
};

export default function TypingTest() {
  const { addPoints, user } = useApp();

  // Navigation / Engine states
  const [screen, setScreen] = useState('config'); // 'config' | 'test' | 'results'
  const [mode, setMode] = useState('time'); // 'time' | 'words' | 'quote' | 'code' | 'zen'
  
  // Config parameters
  const [durationPreset, setDurationPreset] = useState(60);
  const [customDuration, setCustomDuration] = useState('');
  const [wordCountPreset, setWordCountPreset] = useState(25);
  const [difficulty, setDifficulty] = useState('Medium');
  
  // Toggles
  const [includePunctuation, setIncludePunctuation] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [fingerGuideEnabled, setFingerGuideEnabled] = useState(true);
  const [ghostRacerEnabled, setGhostRacerEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [themeStyle, setThemeStyle] = useState('neon'); // 'neon' | 'light'
  
  // User records & stats
  const [attemptsCount, setAttemptsCount] = useState(12);
  const [bestWpm, setBestWpm] = useState(84);
  const [weeklyGoal, setWeeklyGoal] = useState(90);

  // Live test engine state
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targetText, setTargetText] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveRawWpm, setLiveRawWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [grossErrors, setGrossErrors] = useState(0);
  
  // Detailed Keystroke & Analytics log
  const [wpmTimeseries, setWpmTimeseries] = useState([]);
  const [errorKeysCount, setErrorKeysCount] = useState({});
  const [ghostPosition, setGhostPosition] = useState(0);
  
  // Results & Orchestrated animation state
  const [testResults, setTestResults] = useState(null);
  const [animatedWpm, setAnimatedWpm] = useState(0);
  
  const inputRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioCtxRef = useRef(null);

  const activeDurationSec = customDuration ? parseInt(customDuration, 10) || 60 : durationPreset;
  const isCustomInvalid = customDuration !== '' && (parseInt(customDuration, 10) < 10 || parseInt(customDuration, 10) > 600);

  // Mechanical Click Audio Synthesizer
  const playClickSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type === 'error' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(type === 'error' ? 140 : 600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Silently fall back if Web Audio disabled
    }
  };

  // Generate target passage based on mode
  const generateTargetText = () => {
    if (mode === 'quote') {
      const q = QUOTES_CORPUS[Math.floor(Math.random() * QUOTES_CORPUS.length)];
      return `"${q.text}" — ${q.author}`;
    }
    if (mode === 'code') {
      return CODE_CORPUS[Math.floor(Math.random() * CODE_CORPUS.length)];
    }
    let text = (TEXT_CORPUS[difficulty] || TEXT_CORPUS.Medium).join(' ');
    if (mode === 'words') {
      const words = text.split(' ').slice(0, wordCountPreset);
      text = words.join(' ');
    }
    if (!includePunctuation) text = text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!includeNumbers) text = text.replace(/[0-9]/g, "");
    return text;
  };

  // Start Test Action
  const handleStartTest = () => {
    if (isCustomInvalid) return;
    const text = generateTargetText();
    setTargetText(text);
    setTypedInput('');
    setHasStarted(false);
    setIsPaused(false);
    setTimeLeft(mode === 'time' ? activeDurationSec : 0);
    setLiveWpm(0);
    setLiveRawWpm(0);
    setLiveAccuracy(100);
    setGrossErrors(0);
    setCombo(0);
    setMaxCombo(0);
    setGhostPosition(0);
    setWpmTimeseries([]);
    setErrorKeysCount({});
    setScreen('test');

    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  // Focus loss handler
  useEffect(() => {
    const handleBlur = () => {
      if (screen === 'test' && hasStarted && (mode !== 'time' || timeLeft > 0)) {
        setIsPaused(true);
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [screen, hasStarted, timeLeft, mode]);

  // Live Timer & Ghost Racer Loop
  useEffect(() => {
    let interval = null;
    if (screen === 'test' && hasStarted && !isPaused) {
      interval = setInterval(() => {
        if (mode === 'time') {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              finishTest();
              return 0;
            }
            return prev - 1;
          });
        }

        // Update Ghost Racer position based on 80 WPM baseline pace
        if (startTimeRef.current && ghostRacerEnabled) {
          const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
          const ghostTargetChar = Math.round((bestWpm * 5 * elapsedSec) / 60);
          setGhostPosition(Math.min(targetText.length, ghostTargetChar));
        }

        // Record WPM Timeseries sample
        if (startTimeRef.current) {
          const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
          const elapsedMin = elapsedSec / 60 || 0.01;
          const currentWpm = Math.round((typedInput.length / 5) / elapsedMin);

          setWpmTimeseries(prev => [
            ...prev,
            { t: Math.round(elapsedSec), wpm: Math.max(0, currentWpm) }
          ]);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, hasStarted, isPaused, timeLeft, typedInput, mode, ghostRacerEnabled, bestWpm, targetText]);

  // Input keystroke handler
  const handleInputChange = (e) => {
    const val = e.target.value;

    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
    }

    // Sound effect trigger
    if (val.length > typedInput.length) {
      const charIndex = val.length - 1;
      if (val[charIndex] === targetText[charIndex]) {
        playClickSound('click');
        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);
      } else {
        playClickSound('error');
        setCombo(0);
      }
    }

    setTypedInput(val);

    let errors = 0;
    const newKeyErrors = { ...errorKeysCount };

    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) {
        errors++;
        const key = targetText[i] ? targetText[i].toUpperCase() : 'EXTRA';
        newKeyErrors[key] = (newKeyErrors[key] || 0) + 1;
      }
    }

    setErrorKeysCount(newKeyErrors);
    setGrossErrors(errors);

    const totalTypedChars = val.length;
    const correctChars = totalTypedChars - errors;
    const acc = totalTypedChars > 0 ? Math.max(0, Math.round((correctChars / totalTypedChars) * 100)) : 100;
    setLiveAccuracy(acc);

    if (startTimeRef.current) {
      const elapsedMin = ((Date.now() - startTimeRef.current) / 1000) / 60 || 0.01;
      const currentNetWpm = Math.round((correctChars / 5) / elapsedMin);
      const currentRawWpm = Math.round((totalTypedChars / 5) / elapsedMin);
      setLiveWpm(currentNetWpm > 0 ? currentNetWpm : 0);
      setLiveRawWpm(currentRawWpm > 0 ? currentRawWpm : 0);
    }

    // Auto-finish condition for words/quote/code or passage end
    if (val.length >= targetText.length) {
      finishTest();
    }
  };

  // Test End Orchestrator
  const finishTest = () => {
    const totalTypedChars = typedInput.length;
    let uncorrectedErrors = 0;
    let correctChars = 0;
    let incorrectChars = 0;

    for (let i = 0; i < typedInput.length; i++) {
      if (typedInput[i] === targetText[i]) {
        correctChars++;
      } else {
        incorrectChars++;
        uncorrectedErrors++;
      }
    }

    const elapsedSec = mode === 'time' ? (activeDurationSec - timeLeft || activeDurationSec) : Math.round(((Date.now() - (startTimeRef.current || Date.now())) / 1000));
    const elapsedMin = elapsedSec / 60 || 0.01;

    const rawWpm = Math.round((totalTypedChars / 5) / elapsedMin);
    const netWpm = Math.max(0, Math.round(((totalTypedChars / 5) - uncorrectedErrors) / elapsedMin));
    const finalAccuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 100;

    let consistency = 88;
    if (wpmTimeseries.length > 1) {
      const wpms = wpmTimeseries.map(item => item.wpm);
      const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
      if (mean > 0) {
        const variance = wpms.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wpms.length;
        const stddev = Math.sqrt(variance);
        consistency = Math.max(50, Math.min(99, Math.round(100 - ((stddev / mean) * 100))));
      }
    }

    const ptsEarned = Math.round(netWpm * (finalAccuracy / 100));

    setTestResults({
      netWpm,
      rawWpm,
      accuracy: finalAccuracy,
      consistency,
      timeTaken: `${elapsedSec}s`,
      correctChars,
      incorrectChars,
      maxCombo,
      ptsEarned,
      isNewBest: netWpm > bestWpm
    });

    if (netWpm > bestWpm) setBestWpm(netWpm);
    setAttemptsCount(prev => prev + 1);

    if (ptsEarned > 0) {
      addPoints(ptsEarned, `Cinematic Typing Test: ${netWpm} WPM`);
    }

    setScreen('results');

    // Trigger Count-up Hero Animation for Net WPM
    setAnimatedWpm(0);
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = netWpm / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= netWpm) {
        setAnimatedWpm(netWpm);
        clearInterval(timer);
      } else {
        setAnimatedWpm(Math.floor(start));
      }
    }, stepTime);
  };

  // Next finger hint for character
  const nextChar = targetText[typedInput.length] ? targetText[typedInput.length].toUpperCase() : '';
  const recommendedFinger = FINGER_MAP[nextChar] || 'Thumbs / Index';

  // Fullscreen Mode Toggle Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 selection:bg-slate-900 selection:text-white pb-12">
      
      {/* Top Header & Mode Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900">
              <Keyboard className="w-6 h-6" />
            </div>
            <span>TYPING TEST</span>
            <span className="text-[10px] px-3 py-1 rounded-full uppercase font-mono font-extrabold bg-slate-900 text-white tracking-widest">
              OFFICIAL READINESS
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Measure your typing speed, accuracy, and rhythm in full-screen arena.
          </p>
        </div>

        {/* Top Controls: Sound, Fullscreen, Attempt Counter */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Full Screen Mode</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              soundEnabled ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Keystroke Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Mute'}</span>
          </button>

          <div className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-extrabold text-slate-800">
            {attemptsCount} Attempts
          </div>
        </div>
      </div>

      {/* SCREEN 1: CONFIGURE TEST */}
      {screen === 'config' && (
        <div className="space-y-6 max-w-5xl mx-auto">
          
          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            {[
              { id: 'time', label: 'Timed Mode', icon: Clock },
              { id: 'words', label: 'Words Mode', icon: BookOpen },
              { id: 'quote', label: 'Quote Mode', icon: Flame },
              { id: 'code', label: 'Code Mode', icon: Code },
              { id: 'zen', label: 'Zen Practice', icon: Sparkles },
            ].map(m => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-sm font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Box: Parameters (Duration / Word Count) */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-700" /> Test Target Setup
              </h2>

              {mode === 'time' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Duration Preset</span>
                    <span className="text-slate-900">{activeDurationSec} Seconds</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[30, 60, 120, 180, 300].map(sec => (
                      <button
                        key={sec}
                        onClick={() => { setDurationPreset(sec); setCustomDuration(''); }}
                        className={`py-2.5 rounded-xl border text-xs font-mono font-extrabold transition ${
                          durationPreset === sec && !customDuration
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Custom Duration (10s - 600s)</label>
                    <input
                      type="number"
                      placeholder="e.g. 120"
                      value={customDuration}
                      onChange={e => setCustomDuration(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              )}

              {mode === 'words' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Word Goal Preset</span>
                    <span className="text-slate-900">{wordCountPreset} Words</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[10, 25, 50, 100, 200].map(count => (
                      <button
                        key={count}
                        onClick={() => setWordCountPreset(count)}
                        className={`py-2.5 rounded-xl border text-xs font-mono font-extrabold transition ${
                          wordCountPreset === count
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {count} W
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Toggles & Options */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Feature Toggles</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                    <span>Ghost Racer</span>
                    <input
                      type="checkbox"
                      checked={ghostRacerEnabled}
                      onChange={e => setGhostRacerEnabled(e.target.checked)}
                      className="accent-slate-900"
                    />
                  </label>

                  <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                    <span>Finger Guide</span>
                    <input
                      type="checkbox"
                      checked={fingerGuideEnabled}
                      onChange={e => setFingerGuideEnabled(e.target.checked)}
                      className="accent-slate-900"
                    />
                  </label>

                  <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                    <span>Punctuation</span>
                    <input
                      type="checkbox"
                      checked={includePunctuation}
                      onChange={e => setIncludePunctuation(e.target.checked)}
                      className="accent-slate-900"
                    />
                  </label>

                  <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                    <span>Numbers</span>
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={e => setIncludeNumbers(e.target.checked)}
                      className="accent-slate-900"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Box: Difficulty Tiers & Goal Tracker */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Difficulty & Personal Goal
              </h2>

              <div className="space-y-2.5">
                {[
                  { id: 'Easy', label: 'Easy', desc: 'Common words & short prose.' },
                  { id: 'Medium', label: 'Medium', desc: 'Standard technical paragraphs.' },
                  { id: 'Hard', label: 'Hard', desc: 'Complex vocabulary & syntax.' },
                  { id: 'Expert', label: 'Expert Code & Symbols', desc: 'API endpoints, SQL & JSON code tokens.' },
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      difficulty === d.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-extrabold block">{d.label}</span>
                      <span className={`text-[10px] font-medium ${difficulty === d.id ? 'text-slate-300' : 'text-slate-500'}`}>{d.desc}</span>
                    </div>
                    {difficulty === d.id && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>

              {/* Goal Setter Widget */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Weekly Target Goal</span>
                  <span className="font-mono font-extrabold text-slate-900">{weeklyGoal} WPM</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-slate-900 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((bestWpm / weeklyGoal) * 100))}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Current Best: <strong className="text-slate-900">{bestWpm} WPM</strong> ({Math.round((bestWpm / weeklyGoal) * 100)}% achieved)
                </p>
              </div>
            </div>

          </div>

          {/* Start Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              Mode: <strong className="text-slate-900 uppercase">{mode}</strong> | Difficulty: <strong className="text-slate-900">{difficulty}</strong>
            </div>

            <button
              onClick={handleStartTest}
              disabled={isCustomInvalid}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-md transition flex items-center gap-3 uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Test Arena</span>
            </button>
          </div>

        </div>
      )}

      {/* SCREEN 2: LIVE TEST STAGE */}
      {screen === 'test' && (
        <div className="max-w-5xl mx-auto space-y-6 relative">
          
          {/* Paused Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-40 rounded-3xl flex flex-col items-center justify-center space-y-4">
              <h3 className="text-2xl font-black text-slate-900">TEST PAUSED</h3>
              <p className="text-xs text-slate-500 font-medium">Click button below or focus input to resume test.</p>
              <button
                onClick={() => { setIsPaused(false); inputRef.current?.focus(); }}
                className="px-6 py-3 bg-slate-900 text-white font-black text-xs rounded-xl shadow-lg"
              >
                Resume Typing
              </button>
            </div>
          )}

          {/* Live Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
            <div className="p-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Timer</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                {mode === 'time' ? `${timeLeft}s` : '∞'}
              </p>
            </div>

            <div className="p-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Net WPM</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900">{liveWpm}</p>
            </div>

            <div className="p-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Accuracy</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">{liveAccuracy}%</p>
            </div>

            <div className="p-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Streak Combo</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-600">{combo}x</p>
            </div>

            <div className="p-2 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Gross Errors</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-rose-600">{grossErrors}</p>
            </div>
          </div>

          {/* Ghost Racer Track */}
          {ghostRacerEnabled && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> You ({typedInput.length} chars)
                </span>
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ghost Best ({ghostPosition} chars @ {bestWpm} WPM)
                </span>
              </div>

              <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                {/* Live Position Bar */}
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-slate-900 rounded-full transition-all duration-200" 
                  style={{ width: `${Math.min(100, (typedInput.length / targetText.length) * 100)}%` }}
                />
                {/* Ghost Marker Pin */}
                <div 
                  className="absolute top-0 bottom-0 w-2 bg-amber-400 rounded-full transition-all duration-300"
                  style={{ left: `${Math.min(99, (ghostPosition / targetText.length) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Monospace Typing Passage Display */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className="p-8 rounded-3xl bg-white border border-slate-200 text-lg font-mono leading-relaxed select-none min-h-[200px] cursor-text tracking-wide relative overflow-hidden shadow-sm text-slate-800"
          >
            {!hasStarted && (
              <div className="absolute top-4 right-4 text-xs font-mono font-extrabold text-slate-900 animate-pulse uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping" />
                Press Any Key to Start Test
              </div>
            )}

            {targetText.split('').map((char, idx) => {
              let charStyle = 'text-slate-400';
              if (idx < typedInput.length) {
                if (typedInput[idx] === char) {
                  charStyle = 'text-slate-900 font-bold';
                } else {
                  charStyle = 'text-white bg-slate-900 font-bold px-1 rounded-xs shadow-xs';
                }
              }

              const isCaretPosition = idx === typedInput.length;

              return (
                <span key={idx} className={`relative ${charStyle}`}>
                  {isCaretPosition && (
                    <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-slate-900 animate-pulse" />
                  )}
                  {char}
                </span>
              );
            })}
          </div>

          {/* Hidden Keyboard Input */}
          <input
            ref={inputRef}
            type="text"
            value={typedInput}
            onChange={handleInputChange}
            onPaste={e => e.preventDefault()}
            className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
            autoFocus
          />

          {/* Finger Guide & Keyboard Highlight */}
          {fingerGuideEnabled && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 font-bold">NEXT KEY FINGER GUIDE:</span>
                <span className="text-slate-900 font-extrabold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Target '{nextChar || 'END'}' → Use <strong className="underline">{recommendedFinger}</strong>
                </span>
              </div>

              {/* Visual Keyboard Overlay */}
              <div className="space-y-1.5 max-w-2xl mx-auto pt-2">
                {QWERTY_ROWS.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1">
                    {row.map(k => {
                      const isNextKey = nextChar === k;
                      return (
                        <div
                          key={k}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs border transition ${
                            isNextKey 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-105' 
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {k}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Control Footer */}
          <div className="flex justify-between items-center text-xs pt-2">
            <span className="text-slate-500">Click passage text if focus is lost.</span>
            <button
              onClick={() => setScreen('config')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 font-bold transition flex items-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Test
            </button>
          </div>

        </div>
      )}

      {/* SCREEN 3: CINEMATIC RESULTS & ANALYTICS */}
      {screen === 'results' && testResults && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
          
          {/* Hero WPM Highlight Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <span className="text-xs font-mono font-black uppercase text-slate-500 tracking-widest block mb-2">
              NET TYPING SPEED
            </span>

            <div className="text-6xl sm:text-8xl font-black font-mono text-slate-900 tracking-tight">
              {animatedWpm} <span className="text-2xl text-slate-400">WPM</span>
            </div>

            {testResults.isNewBest && (
              <div className="mt-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>NEW PERSONAL RECORD ACHIEVED!</span>
              </div>
            )}
          </div>

          {/* Headline Analytics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Raw Speed</span>
              <p className="text-3xl font-black font-mono text-slate-900 mt-1">{testResults.rawWpm} WPM</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Accuracy</span>
              <p className="text-3xl font-black font-mono text-emerald-600 mt-1">{testResults.accuracy}%</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Consistency</span>
              <p className="text-3xl font-black font-mono text-slate-900 mt-1">{testResults.consistency}%</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Max Streak</span>
              <p className="text-3xl font-black font-mono text-amber-600 mt-1">{testResults.maxCombo}x</p>
            </div>
          </div>

          {/* WPM Speed Graph Over Time */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-700" /> WPM Speed Timeline Graph
            </h3>

            {wpmTimeseries.length > 0 ? (
              <div className="h-44 flex items-end justify-between gap-1 pt-6 px-2 border-b border-slate-200">
                {wpmTimeseries.map((item, idx) => {
                  const maxWpm = Math.max(...wpmTimeseries.map(i => i.wpm), 100);
                  const heightPct = Math.max(10, Math.round((item.wpm / maxWpm) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[9px] font-mono font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition">
                        {item.wpm}
                      </span>
                      <div 
                        className="w-full bg-slate-900 group-hover:bg-slate-700 rounded-t-sm transition-all" 
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[8px] font-mono text-slate-500">{item.t}s</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-xs font-mono text-slate-500">
                Keystroke telemetry logged across test duration.
              </div>
            )}
          </div>

          {/* Keystroke Heatmap Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-extrabold uppercase text-slate-900 tracking-wider">
              Keyboard Error Heatmap (Most Missed Keys)
            </h3>

            <div className="space-y-1.5 max-w-2xl mx-auto pt-2">
              {QWERTY_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1">
                  {row.map(k => {
                    const errCount = errorKeysCount[k] || 0;
                    let bg = 'bg-slate-50 text-slate-600 border-slate-200';
                    if (errCount > 0 && errCount < 3) bg = 'bg-amber-50 text-amber-900 border-amber-300 font-bold';
                    if (errCount >= 3) bg = 'bg-rose-50 text-rose-900 border-rose-300 font-bold';
                    return (
                      <div
                        key={k}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex flex-col items-center justify-center font-mono text-xs border ${bg}`}
                      >
                        <span>{k}</span>
                        {errCount > 0 && <span className="text-[8px] opacity-80">{errCount}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Same Settings</span>
            </button>

            <button
              onClick={() => setScreen('config')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 text-slate-900 font-black text-xs rounded-2xl hover:bg-slate-50 transition flex items-center justify-center gap-2 uppercase tracking-wider shadow-xs"
            >
              <span>Reconfigure Parameters</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

