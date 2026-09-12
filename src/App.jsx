import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage';

import Dashboard from './components/pages/Dashboard';
import Leaderboard from './components/pages/Leaderboard';
import Assessments from './components/pages/Assessments';
import LSRW from './components/pages/LSRW';
import Practice from './components/pages/Practice';
import TypingTest from './components/pages/TypingTest';
import Courses from './components/pages/Courses';
import PairProgramming from './components/pages/PairProgramming';
import Blogs from './components/pages/Blogs';
import AdminPanel from './components/pages/AdminPanel';

// v3 AI Super-App Modules
import SmartNotes from './components/pages/SmartNotes';
import StudyPlanner from './components/pages/StudyPlanner';
import ResumeBuilder from './components/pages/ResumeBuilder';
import MockInterview from './components/pages/MockInterview';
import DoubtForum from './components/pages/DoubtForum';
import JobBoard from './components/pages/JobBoard';
import Certifications from './components/pages/Certifications';

function MainContent() {
  const { currentView } = useApp();

  switch (currentView) {
    case 'dashboard':
      return <Dashboard />;
    case 'smart-notes':
      return <SmartNotes />;
    case 'study-planner':
      return <StudyPlanner />;
    case 'resume-builder':
      return <ResumeBuilder />;
    case 'mock-interview':
      return <MockInterview />;
    case 'doubt-forum':
      return <DoubtForum />;
    case 'job-board':
      return <JobBoard />;
    case 'certifications':
      return <Certifications />;
    case 'leaderboard':
      return <Leaderboard />;
    case 'assessments':
      return <Assessments />;
    case 'lsrw':
      return <LSRW />;
    case 'typing-test':
      return <TypingTest />;
    case 'courses':
      return <Courses />;
    case 'pair-programming':
      return <PairProgramming />;
    case 'blogs':
      return <Blogs />;
    case 'admin':
      return <AdminPanel />;
    default:
      return <Dashboard />;
  }
}

function AppShell() {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <MainContent />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
