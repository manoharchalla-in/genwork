import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const initialUser = {
  name: "ALEXANDER PIERCE",
  email: "alexander.p@student.city.edu",
  institution: "CITY Engineering College",
  batch: "ABAP - CITY 2026",
  studentId: "23HT1A4301",
  status: "Active",
  passoutYear: "2026",
  department: "Computer Science & Engineering",
  points: 1450,
  tier: {
    name: "Level 1",
    level: "Lv4",
    currentPoints: 1450,
    nextTierPoints: 2000,
    badgeColor: "from-amber-500 to-amber-600",
    icon: "Shield"
  },
  badges: [
    { id: 1, title: "Speed Demon", icon: "Zap", desc: "Reached 70+ WPM in Typing Test" },
    { id: 2, title: "First Blood", icon: "CheckCircle", desc: "Completed first Assessment with 90%+" },
    { id: 3, title: "7-Day Streak", icon: "Flame", desc: "Active on platform 7 days in a row" }
  ]
};

export const TIERS = [
  { name: "Level 1", minPoints: 0, levels: ["Lv1", "Lv2", "Lv3", "Lv4", "Lv5"], color: "bg-slate-800" },
  { name: "Level 2", minPoints: 2000, levels: ["Lv1", "Lv2", "Lv3", "Lv4", "Lv5"], color: "bg-slate-800" },
  { name: "Level 3", minPoints: 5000, levels: ["Lv1", "Lv2", "Lv3", "Lv4", "Lv5"], color: "bg-slate-800" },
  { name: "Level 4", minPoints: 10000, levels: ["Lv1", "Lv2", "Lv3", "Lv4"], color: "bg-slate-800" },
  { name: "Level 5", minPoints: 20000, levels: ["Lv1"], color: "bg-slate-800" }
];

export const initialAdminUser = {
  name: "DR. ELEANOR VANCE",
  email: "admin.vance@city.edu",
  institution: "CITY Engineering College",
  department: "System Administration & Faculty Head",
  role: "Administrator",
  batch: "Faculty Admin",
  points: 5000,
  tier: {
    name: "Admin Tier",
    level: "Lv5",
    currentPoints: 5000,
    nextTierPoints: 10000,
    badgeColor: "from-rose-500 to-red-600",
    icon: "Shield"
  },
  avatar: "EV"
};

export const AppProvider = ({ children }) => {
  const getInitialPortal = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('admin') || search.includes('admin')) {
        return 'admin';
      }
    }
    return 'student';
  };

  const [currentView, setCurrentView] = useState(getInitialPortal() === 'admin' ? 'admin' : 'dashboard');
  const [userRole, setUserRole] = useState(getInitialPortal()); // 'student' or 'admin'
  const [user, setUser] = useState(getInitialPortal() === 'admin' ? initialAdminUser : initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activePortalTab, setActivePortalTab] = useState(getInitialPortal()); // 'student' or 'admin' login view toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [supportChatOpen, setSupportChatOpen] = useState(false);

  // Auth Handlers
  const login = (role, userData) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'admin') {
      setUser({ ...initialAdminUser, ...userData });
      setCurrentView('admin');
    } else {
      setUser({ ...initialUser, ...userData });
      setCurrentView('dashboard');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Dynamic point addition & tier update
  const addPoints = (amount, reason) => {
    setUser(prev => {
      const newPoints = prev.points + amount;
      let currentTierName = "Level 1";
      let nextPoints = 2000;
      
      if (newPoints >= 20000) {
        currentTierName = "Level 5";
        nextPoints = 50000;
      } else if (newPoints >= 10000) {
        currentTierName = "Level 4";
        nextPoints = 20000;
      } else if (newPoints >= 5000) {
        currentTierName = "Level 3";
        nextPoints = 10000;
      } else if (newPoints >= 2000) {
        currentTierName = "Level 2";
        nextPoints = 5000;
      }

      const levelIndex = Math.min(5, Math.floor(((newPoints % 2000) / 400) + 1));

      return {
        ...prev,
        points: newPoints,
        tier: {
          ...prev.tier,
          name: currentTierName,
          level: `Lv${levelIndex}`,
          currentPoints: newPoints,
          nextTierPoints: nextPoints
        }
      };
    });
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      userRole,
      setUserRole,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      activePortalTab,
      setActivePortalTab,
      login,
      logout,
      sidebarOpen,
      setSidebarOpen,
      supportChatOpen,
      setSupportChatOpen,
      addPoints,
      TIERS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
