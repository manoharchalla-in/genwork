import React, { useState } from 'react';
import { 
  SquarePen, 
  MessageSquare, 
  Search, 
  PanelLeftClose, 
  Store,
  Trash2,
  X
} from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  setIsOpen, 
  activeChat, 
  setActiveChat, 
  pinnedChats, 
  recentChats,
  onClearAllChats 
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:relative z-50 h-[100dvh] w-[280px] max-w-[85vw] md:w-[260px] bg-[#f9f9f9] border-r border-[#e5e5e5]/80 
        flex flex-col transition-transform duration-300 ease-in-out select-none left-0 top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden'}
      `}>
        {/* Header Icons: Title & Close */}
        <div className="p-3 flex items-center justify-between border-b border-gray-200/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-900 tracking-tight pl-1">ChatGPT</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <button className="p-1.5 hover:bg-gray-200/60 rounded-md transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 hover:bg-gray-200/60 rounded-md transition-colors"
              title="Close sidebar"
            >
              <X className="w-5 h-5 md:hidden text-gray-700" />
              <PanelLeftClose className="w-4 h-4 hidden md:block" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 text-sm font-medium text-gray-700">
          
          {/* Main Action: New Chat */}
          <button 
            onClick={() => {
              setActiveChat(null);
              if (window.innerWidth < 768) setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-xl bg-gray-200/80 hover:bg-gray-200 text-gray-900 font-semibold transition-colors mb-2 shadow-sm"
          >
            <SquarePen className="w-4 h-4 text-gray-800" />
            <span>New chat</span>
          </button>

          {/* Clear All Chats Option if any exist */}
          {(pinnedChats.length > 0 || recentChats.length > 0) && (
            <div className="pt-1 px-1 pb-2">
              <button
                onClick={() => {
                  onClearAllChats();
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                title="Remove all chats from sidebar"
              >
                <span>Clear all chats</span>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Pinned Section */}
          {pinnedChats.length > 0 && (
            <div className="pt-2">
              <div className="px-3 text-xs font-semibold text-gray-400 tracking-wider">Pinned</div>
              <div className="mt-1 space-y-0.5">
                {pinnedChats.map((chat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setActiveChat(chat);
                      if (window.innerWidth < 768) setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs truncate transition-colors ${
                      activeChat === chat ? 'bg-gray-200 text-gray-900 font-semibold' : 'hover:bg-gray-200/50 text-gray-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="truncate">{chat}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recents Section */}
          {recentChats.length > 0 && (
            <div className="pt-2 pb-2">
              <div className="px-3 text-xs font-semibold text-gray-400 tracking-wider flex items-center justify-between">
                <span>Recents</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {recentChats.map((chat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setActiveChat(chat);
                      if (window.innerWidth < 768) setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs truncate transition-colors ${
                      activeChat === chat ? 'bg-gray-200 text-gray-900 font-semibold' : 'hover:bg-gray-200/50 text-gray-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="truncate">{chat}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Profile Bar */}
        <div className="p-3 border-t border-[#e5e5e5]/80 flex items-center justify-between shrink-0 bg-[#f9f9f9]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              MY
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-gray-900 truncate">MR. YouTube</span>
              <span className="text-[10px] text-gray-500 truncate">Go</span>
            </div>
          </div>
          <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500">
            <Store className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
