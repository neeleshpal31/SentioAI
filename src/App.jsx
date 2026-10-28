import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { LogoutModal } from './components/common/LogoutModal';

// Pages matching all 13 screens in the user's mockup
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { UploadDataset } from './pages/UploadDataset';
import { TextPreprocessing } from './pages/TextPreprocessing';
import { ModelTraining } from './pages/ModelTraining';
import { SentimentResults } from './pages/SentimentResults';
import { Visualizations } from './pages/Visualizations';
import { CompareModels } from './pages/CompareModels';
import { PredictReview } from './pages/PredictReview';
import { SavedResults } from './pages/SavedResults';
import { UserProfile } from './pages/UserProfile';

import './pages/pages.css';

const MainRouter = () => {
  const { currentView, isAuthenticated } = useApp();

  // Screen 1: Standalone Login Page
  if (currentView === 'login') {
    return <Login />;
  }

  // Screen 2: Standalone Signup Page
  if (currentView === 'signup') {
    return <Signup />;
  }

  // Authenticated Views (Screens 3 to 12)
  const renderCurrentPage = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />; // Screen 3
      case 'upload':
        return <UploadDataset />; // Screen 4
      case 'preprocessing':
        return <TextPreprocessing />; // Screen 5
      case 'training':
        return <ModelTraining />; // Screen 6
      case 'results':
        return <SentimentResults />; // Screen 7
      case 'visualizations':
        return <Visualizations />; // Screen 8
      case 'compare':
        return <CompareModels />; // Screen 9
      case 'predict':
        return <PredictReview />; // Screen 10
      case 'saved':
        return <SavedResults />; // Screen 11
      case 'profile':
        return <UserProfile />; // Screen 12
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="main-wrapper">
        <TopNavbar />
        <main style={{ flex: 1 }}>{renderCurrentPage()}</main>
      </div>

      {/* Screen 13: Logout Confirmation Modal */}
      <LogoutModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
