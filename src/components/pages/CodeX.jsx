import React, { useState } from 'react';
import { Sparkles, Send, Code, Bug, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function CodeX() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Alexander! I'm CodeX, your AI Programming Tutor. Paste code snippets to get instant explanations, step-by-step logic breakdowns, or bug diagnosis!"
    }
  ]);
  const [input, setInput] = useState('');
  const [pastedCode, setPastedCode] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !pastedCode.trim()) return;

    const fullPrompt = pastedCode ? `${input}\n\`\`\`\n${pastedCode}\n\`\`\`` : input;
    setMessages(prev => [...prev, { sender: 'user', text: fullPrompt }]);
    setInput('');
    setPastedCode('');

    setTimeout(() => {
      let reply = "Here is the code breakdown:\n\n1. **Logic Pattern**: This uses an array iteration strategy with O(N) time complexity.\n2. **Optimization**: You can reduce space overhead by keeping a single pointer.\n3. **Placement Tip**: In interviews, always state time and space complexity upfront!";
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 tracking-tight">CodeX AI Tutor</h1>
        <p className="text-sm text-slate-500 font-medium">
          AI-assisted code explanations, bug debugging & algorithm optimization helper.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col h-[560px] overflow-hidden">
        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-navy-800 text-amber-300 font-mono rounded-br-xs shadow'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs space-y-2'
              }`}>
                {m.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 font-black text-amber-600 mb-1">
                    <Sparkles className="w-4 h-4" /> CodeX AI Explanation
                  </div>
                )}
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 space-y-3">
          {pastedCode && (
            <div className="p-2 bg-slate-900 rounded-xl text-emerald-400 font-mono text-[11px] relative">
              <span className="text-[9px] uppercase font-bold text-amber-400 block mb-1">Pasted Code Block:</span>
              <pre className="max-h-20 overflow-y-auto">{pastedCode}</pre>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPastedCode(prompt('Paste code snippet here:') || '')}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <Code className="w-4 h-4 text-amber-600" />
              <span>Attach Code</span>
            </button>

            <input
              type="text"
              placeholder="Ask CodeX about time complexity, logic, or bug fixes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-black text-xs rounded-xl shadow transition flex items-center gap-1"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
