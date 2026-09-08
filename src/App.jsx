import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { queryStudentBot } from './utils/studentBotEngine';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const [pinnedChats, setPinnedChats] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  const handleClearAllChats = () => {
    setPinnedChats([]);
    setRecentChats([]);
    setActiveChat(null);
    setMessages([]);
  };

  const handleSendMessage = (text, isThinking) => {
    const userMsg = { role: 'user', content: text, isThinking };
    
    // Auto-create chat in sidebar if start of conversation
    if (!activeChat) {
      const newTitle = text.length > 25 ? text.substring(0, 25) + '...' : text;
      setActiveChat(newTitle);
      setRecentChats((prev) => [newTitle, ...prev]);
    }

    // Query trained student database bot engine
    const botReply = queryStudentBot(text);

    const aiMsg = { 
      role: 'assistant', 
      content: botReply, 
      isThinking 
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#f9f9f9] text-[#0d0d0d] font-sans antialiased overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeChat={activeChat}
        setActiveChat={(chat) => {
          setActiveChat(chat);
          setMessages([]);
        }}
        pinnedChats={pinnedChats}
        recentChats={recentChats}
        onClearAllChats={handleClearAllChats}
      />
      <ChatArea 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeChat={activeChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
