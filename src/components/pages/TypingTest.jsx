import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Keyboard, RotateCcw, Trophy, CheckCircle, Zap, Award, Play, 
  Pause, RefreshCw, BarChart2, AlertCircle, ArrowRight
} from 'lucide-react';

const TEXT_CORPUS = {
  Easy: [
    "the quick brown fox jumps over the lazy dog. programming is fun and rewarding when you practice every single day with focus.",
    "simple code runs fast when logic is clear. take small steps each day to build your typing confidence and precision.",
    "clean habits make strong developers. focus on accuracy first and speed will follow naturally over time."
  ],
  Medium: [
    "Engineering colleges track student skill development, assessments, and placement readiness to prepare candidates for modern software technology roles. Consistency and deliberate practice build strong technical foundations across all computer science domains.",
    "Data structures and algorithms form the backbone of efficient software architecture. Understanding time complexity allows engineers to write scalable code that performs well under heavy load and high concurrency.",
    "Effective communication, active listening, and technical writing are essential skills for engineering graduates entering corporate environments. Placement preparation requires balancing core computer science knowledge with soft skills."
  ],
  Hard: [
    "Polymorphism, encapsulation, and asynchronous event loops form quintessential architectural tenets of robust software engineering frameworks across distributed cloud paradigms; moreover, algorithmic optimizations require meticulous profiling of memory consumption and thread synchronization.",
    "In microservice architectures, event-driven message brokers decouple monolithic dependencies into asynchronous channels: Kafka, RabbitMQ, and gRPC facilitate high-throughput streaming while preserving strict transactional data integrity and fault-tolerant state recovery.",
    "Concurrent execution in multi-threaded environments introduces race conditions, deadlocks, and volatile memory visibility issues; consequently, synchronization primitives like mutexes, semaphores, and atomic memory barriers are mandatory for low-level system integrity."
  ]
};

export default function TypingTest() {
  const { addPoints, user } = useApp();

  const [screen, setScreen] = useState('config');
  const [durationPreset, setDurationPreset] = useState(60);
  const [customDuration, setCustomDuration] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [attemptsCount, setAttemptsCount] = useState(5);
  const [bestWpm, setBestWpm] = useState(74);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targetText, setTargetText] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [wpmTimeseries, setWpmTimeseries] = useState([]);
  const [errorKeysCount, setErrorKeysCount] = useState({});

  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [grossErrors, setGrossErrors] = useState(0);

  const [testResults, setTestResults] = useState(null);

  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  const activeDurationSec = customDuration ? parseInt(customDuration, 10) || 60 : durationPreset;
  const isCustomInvalid = customDuration !== '' && (parseInt(customDuration, 10) < 10 || parseInt(customDuration, 10) > 600);

  const presets = [
    { sec: 30, label: '30s', sub: 'SPRINT' },
    { sec: 60, label: '1m', sub: 'STANDARD' },
    { sec: 120, label: '2m', sub: 'LONG FORM' },
    { sec: 180, label: '3m', sub: 'ENDURANCE' },
    { sec: 300, label: '5m', sub: 'MARATHON' },
  ];

  const handleStartTest = () => {
    if (isCustomInvalid) return;
    const initialText = (TEXT_CORPUS[difficulty] || TEXT_CORPUS.Medium).join(' ');
    setTargetText(initialText);
    setTypedInput('');
    setHasStarted(false);
    setIsPaused(false);
    setTimeLeft(activeDurationSec);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setGrossErrors(0);
    setWpmTimeseries([]);
    setErrorKeysCount({});
    setScreen('test');

    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  useEffect(() => {
    const handleBlur = () => {
      if (screen === 'test' && hasStarted && timeLeft > 0) {
        setIsPaused(true);
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [screen, hasStarted, timeLeft]);

  useEffect(() => {
    let interval = null;
    if (screen === 'test' && hasStarted && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prev - 1;
        });

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
  }, [screen, hasStarted, isPaused, timeLeft, typedInput]);

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
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
      setLiveWpm(currentNetWpm > 0 ? currentNetWpm : 0);
    }

    if (val.length >= targetText.length) {
      finishTest();
    }
  };

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

    const elapsedSec = activeDurationSec - timeLeft || activeDurationSec;
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
      ptsEarned,
      isNewBest: netWpm > bestWpm
    });

    if (netWpm > bestWpm) setBestWpm(netWpm);
    setAttemptsCount(prev => prev + 1);

    if (ptsEarned > 0) {
      addPoints(ptsEarned, `Completed Typing Speed Test: ${netWpm} WPM`);
    }

    setScreen('results');
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-slate-800" />
            Typing Speed Test
          </h1>
          <p className="text-sm text-slate-600 font-medium">
            Measure your typing speed, accuracy, and rhythm.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-white text-slate-900 border border-slate-300 rounded-full font-bold text-xs w-fit shadow-xs">
          {attemptsCount} attempt(s)
        </div>
      </div>

      {/* SCREEN 1: CONFIGURE TEST */}
      {screen === 'config' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-4xl">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">Configure your test</h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Pick a duration and difficulty, then start. The timer begins on your first keystroke.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Duration Preset Cards & Custom Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Duration</span>
                <span className="text-xs font-bold text-slate-600">
                  {customDuration ? `${customDuration} seconds` : `${durationPreset} seconds`}
                </span>
              </div>

              {/* 5 Preset Cards */}
              <div className="grid grid-cols-5 gap-2">
                {presets.map(p => {
                  const isSelected = durationPreset === p.sec && !customDuration;
                  return (
                    <button
                      key={p.sec}
                      onClick={() => { setDurationPreset(p.sec); setCustomDuration(''); }}
                      className={`p-3 rounded-xl border text-center transition ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs' 
                          : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50 font-semibold'
                      }`}
                    >
                      <span className="text-sm font-extrabold block">{p.label}</span>
                      <span className={`text-[9px] uppercase tracking-wider block font-bold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {p.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Duration Input */}
              <div className="pt-1">
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">Custom Duration</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="120"
                    min={10}
                    max={600}
                    value={customDuration}
                    onChange={e => setCustomDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">sec</span>
                </div>
                {isCustomInvalid && (
                  <p className="text-[10px] text-slate-900 font-bold mt-1">Please enter seconds between 10 and 600.</p>
                )}
              </div>
            </div>

            {/* Right Column: Difficulty Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Difficulty</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">{difficulty}</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'Easy', title: 'Easy', desc: 'Short sentences. Common words.' },
                  { id: 'Medium', title: 'Medium', desc: 'Paragraphs. Everyday topics.' },
                  { id: 'Hard', title: 'Hard', desc: 'Advanced prose. Uncommon words.' },
                ].map(d => {
                  const isSelected = difficulty === d.id;
                  return (
                    <label
                      key={d.id}
                      onClick={() => setDifficulty(d.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs' 
                          : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-extrabold block">{d.title}</span>
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {d.desc}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="difficulty"
                        checked={isSelected}
                        onChange={() => setDifficulty(d.id)}
                        className="accent-white"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-700">
              Ready to start a <strong className="text-slate-900">{activeDurationSec}s {difficulty}</strong> test.
            </p>

            <button
              onClick={handleStartTest}
              disabled={isCustomInvalid}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-white fill-white" />
              <span>Start test →</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2: LIVE TYPING TEST */}
      {screen === 'test' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-4xl mx-auto relative">
          {/* Pause Blur Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-30 rounded-2xl flex flex-col items-center justify-center space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900">Test Paused</h3>
              <p className="text-xs font-medium text-slate-600">Click anywhere to resume timer and typing.</p>
              <button 
                onClick={() => { setIsPaused(false); inputRef.current?.focus(); }}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Resume Test
              </button>
            </div>
          )}

          {/* Live Stats Bar */}
          <div className="grid grid-cols-4 gap-4 text-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500">Timer</span>
              <p className="text-2xl font-extrabold text-slate-900">{timeLeft}s</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500">WPM</span>
              <p className="text-2xl font-extrabold text-slate-900">{liveWpm}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500">Accuracy</span>
              <p className="text-2xl font-extrabold text-slate-900">{liveAccuracy}%</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500">Errors</span>
              <p className="text-2xl font-extrabold text-slate-900">{grossErrors}</p>
            </div>
          </div>

          {/* Live Monospace Text Display with Caret */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-base font-mono leading-relaxed select-none min-h-[160px] cursor-text tracking-wide"
          >
            {!hasStarted && (
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider animate-pulse">
                ► Start typing to begin test...
              </p>
            )}

            {targetText.split('').map((char, idx) => {
              let charStyle = 'text-slate-400';
              if (idx < typedInput.length) {
                if (typedInput[idx] === char) {
                  charStyle = 'text-slate-900 font-bold';
                } else {
                  charStyle = 'text-white bg-slate-900 font-bold px-0.5 rounded-xs';
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

          {/* Hidden Capture Input */}
          <input
            ref={inputRef}
            type="text"
            value={typedInput}
            onChange={handleInputChange}
            onPaste={e => e.preventDefault()}
            className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
            autoFocus
          />

          {/* Action Control */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">Click passage area if input loses focus.</span>
            <button
              onClick={() => setScreen('config')}
              className="px-3.5 py-1.5 text-xs font-bold bg-white border border-slate-300 text-slate-900 rounded-xl hover:bg-slate-50 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart / Reconfigure
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: RESULTS & ANALYTICS */}
      {screen === 'results' && testResults && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Test Results & Analytics</h2>
              <p className="text-xs text-slate-600 font-medium">Detailed breakdown of your WPM, accuracy, and typing rhythm.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full">
                +{testResults.ptsEarned} Points Earned
              </span>
              {testResults.isNewBest && (
                <span className="px-3 py-1 bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-full">
                  ★ New Best WPM!
                </span>
              )}
            </div>
          </div>

          {/* Headline Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-900 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-300">Net WPM</span>
              <p className="text-3xl font-extrabold text-white mt-0.5">{testResults.netWpm}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Raw WPM</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{testResults.rawWpm}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Accuracy</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{testResults.accuracy}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Consistency</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{testResults.consistency}%</p>
            </div>
          </div>

          {/* Speed Graph */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-slate-700" /> WPM Speed Over Time
            </h3>

            {wpmTimeseries.length > 0 ? (
              <div className="h-40 flex items-end justify-between gap-1 pt-4 px-2 border-b border-slate-300">
                {wpmTimeseries.map((item, idx) => {
                  const maxWpm = Math.max(...wpmTimeseries.map(i => i.wpm), 100);
                  const heightPct = Math.max(10, Math.round((item.wpm / maxWpm) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[9px] font-mono font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition">
                        {item.wpm}
                      </span>
                      <div 
                        className="w-full bg-slate-800 rounded-t-sm transition-all" 
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[8px] font-mono text-slate-500">{item.t}s</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-xs font-bold text-slate-500">
                WPM timeseries sampled over test duration.
              </div>
            )}
          </div>

          {/* Character Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-900">Character Stats Breakdown</h4>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Correct Characters:</span>
                <strong className="text-slate-900">{testResults.correctChars}</strong>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Incorrect Keystrokes:</span>
                <strong className="text-slate-900">{testResults.incorrectChars}</strong>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Test Duration:</span>
                <strong className="text-slate-900">{testResults.timeTaken}</strong>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-900">Comparison vs Historical Best</h4>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Your Personal Best:</span>
                <strong className="text-slate-900">{bestWpm} WPM</strong>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Attempt Difference:</span>
                <strong className="text-slate-900">
                  {testResults.netWpm >= bestWpm ? `+${testResults.netWpm - bestWpm} WPM` : `-${bestWpm - testResults.netWpm} WPM`}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Retry Same Settings</span>
            </button>

            <button
              onClick={() => setScreen('config')}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <span>New Test Configuration</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
