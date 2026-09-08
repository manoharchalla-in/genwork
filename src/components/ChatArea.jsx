import React, { useState } from 'react';
import { 
  PanelLeftOpen, 
  RotateCw, 
  Plus, 
  BrainCircuit, 
  Mic, 
  AudioLines,
  Send
} from 'lucide-react';

export default function ChatArea({ sidebarOpen, setSidebarOpen, activeChat, messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const [isThinkingActive, setIsThinkingActive] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input, isThinkingActive);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderFormattedContent = (content) => {
    if (!content.includes('|')) {
      return <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">{cleanSymbols(content)}</div>;
    }

    const lines = content.split('\n');
    const elements = [];
    let inTable = false;
    let tableRows = [];

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        tableRows.push(line);
      } else {
        if (inTable && tableRows.length > 0) {
          elements.push(renderTableBlock(tableRows, `table-${idx}`));
          tableRows = [];
          inTable = false;
        }
        if (line.startsWith('### ')) {
          elements.push(
            <h3 key={`h3-${idx}`} className="text-sm sm:text-base font-bold text-gray-900 mt-2 mb-1 flex items-center gap-1.5">
              {line.replace('### ', '')}
            </h3>
          );
        } else if (line.startsWith('#### ')) {
          elements.push(
            <h4 key={`h4-${idx}`} className="text-xs sm:text-sm font-semibold text-gray-800 mt-2 mb-1">
              {line.replace('#### ', '')}
            </h4>
          );
        } else if (line.startsWith('##### ')) {
          elements.push(
            <h5 key={`h5-${idx}`} className="text-xs sm:text-xs font-semibold text-purple-800 mt-2 mb-0.5">
              {line.replace('##### ', '')}
            </h5>
          );
        } else if (line.trim()) {
          elements.push(
            <div key={`line-${idx}`} className="whitespace-pre-wrap my-0.5 leading-relaxed text-xs sm:text-sm">
              {cleanSymbols(line)}
            </div>
          );
        }
      }
    });

    if (inTable && tableRows.length > 0) {
      elements.push(renderTableBlock(tableRows, 'table-end'));
    }

    return <div>{elements}</div>;
  };

  const cleanSymbols = (text) => {
    return text.replace(/\*\*/g, '').replace(/`/g, '');
  };

  const renderTableBlock = (rows, key) => {
    const parsedRows = rows
      .filter(r => !r.includes(':---') && !r.includes('---'))
      .map(r => r.split('|').slice(1, -1).map(c => cleanSymbols(c.trim())));

    if (parsedRows.length === 0) return null;

    const headers = parsedRows[0];
    const body = parsedRows.slice(1);

    return (
      <div key={key} className="my-2 w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white -mx-1 sm:mx-0 p-0">
        <table className="w-full text-left text-[11px] sm:text-xs border-collapse min-w-[300px]">
          <thead>
            <tr className="bg-gray-100/90 border-b border-gray-200 text-gray-700 font-semibold">
              {headers.map((h, hIdx) => (
                <th key={hIdx} className="px-2 sm:px-3 py-1.5 sm:py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {body.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-gray-50/80 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-800 font-medium max-w-[200px] break-words">
                    {cIdx === 0 ? (
                      <span className="font-semibold text-gray-900">{cell}</span>
                    ) : cell.includes('🟢') ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                        {cell}
                      </span>
                    ) : cell.includes('🔴') ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="flex-1 flex flex-col h-[100dvh] bg-[#f9f9f9] relative overflow-hidden w-full">
      
      {/* Top Navbar */}
      <header className="h-12 px-2.5 sm:px-4 flex items-center justify-between text-gray-700 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-gray-200/40 shrink-0 z-10">
        <div className="flex items-center gap-2">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-1 hover:bg-gray-200/60 rounded-lg transition-colors text-gray-700"
              title="Open sidebar"
            >
              <PanelLeftOpen className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <img src="./logo.jpg" alt="MYCHAT Logo" className="w-6 h-6 object-contain rounded-md" />
            <h1 className="font-bold text-xs sm:text-sm tracking-tight text-gray-800 truncate max-w-[160px] sm:max-w-none">
              {activeChat || 'MYCHAT'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            className="p-1.5 hover:bg-gray-200/60 rounded-lg transition-colors text-gray-500"
            title="Refresh chat"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Scroll Container */}
      <div className="flex-1 overflow-y-auto px-1.5 sm:px-4 flex flex-col items-center w-full">
        {messages.length === 0 ? (
          /* Empty State - Landing screen matching reference screenshot */
          <div className="flex-1 flex flex-col items-center justify-center -mt-10 text-center px-4">
            <img src="./logo.jpg" alt="MYCHAT Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl mb-4 shadow-md border border-gray-100" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2 select-none">
              MYCHAT
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-sm mb-6">
              Your AI Assistant for Student Portal Data & Analytics
            </p>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="w-full max-w-3xl py-2.5 sm:py-6 space-y-3 sm:space-y-6">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <img src="./logo.jpg" alt="MYCHAT Avatar" className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-contain shrink-0 mt-0.5 border border-gray-200" />
                )}
                <div 
                  className={`max-w-[96%] sm:max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm leading-relaxed overflow-hidden ${
                    msg.role === 'user'
                      ? 'bg-gray-200 text-gray-900 rounded-br-none'
                      : 'text-gray-800 bg-white border border-gray-200/80 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.isThinking && (
                    <div className="flex items-center gap-1.5 text-[11px] text-purple-600 font-medium mb-2 border-b border-purple-100 pb-1">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      <span>Reasoned with Think mode</span>
                    </div>
                  )}
                  {renderFormattedContent(msg.content)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Pill Input Container */}
      <div className="w-full px-2 sm:px-4 pb-2.5 sm:pb-6 pt-1 flex justify-center bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent shrink-0">
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-200/90 px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 transition-all focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
        >
          {/* Plus Attachment Button */}
          <button 
            type="button"
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            title="Attach file"
          >
            <Plus className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          {/* Text Input */}
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none px-1 min-w-0"
          />

          {/* Think Toggle Button */}
          <button 
            type="button"
            onClick={() => setIsThinkingActive(!isThinkingActive)}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all shrink-0 ${
              isThinkingActive 
                ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                : 'text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
            title="Toggle Think Mode"
          >
            <BrainCircuit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            <span className="hidden sm:inline">Think</span>
          </button>

          {/* Mic Button */}
          <button 
            type="button"
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            title="Voice Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Blue Soundwave / Submit Action Button */}
          <button 
            type="submit"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm shrink-0"
            title="Send Message"
          >
            {input.trim() ? (
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <AudioLines className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            )}
          </button>
        </form>
      </div>

    </main>
  );
}
