import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UploadCloud,
  Sliders,
  Cpu,
  PieChart,
  Palette,
  GitCompare,
  MessageSquarePlus,
  DownloadCloud,
  User,
  LogOut,
  Brain
} from 'lucide-react';

export const Sidebar = () => {
  const { currentView, setCurrentView, setShowLogoutModal } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Data', icon: UploadCloud },
    { id: 'preprocessing', label: 'Text Preprocessing', icon: Sliders },
    { id: 'training', label: 'Model Training', icon: Cpu },
    { id: 'results', label: 'Sentiment Analysis', icon: PieChart },
    { id: 'visualizations', label: 'Visualizations', icon: Palette },
    { id: 'compare', label: 'Compare Models', icon: GitCompare },
    { id: 'predict', label: 'Predict Review', icon: MessageSquarePlus },
    { id: 'saved', label: 'Saved Results', icon: DownloadCloud },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon-box">
          <Brain size={24} />
        </div>
        <div className="brand-title">
          <span>SentioAI</span>
          <span className="brand-subtitle">Review Intelligence</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon className="icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Footer Button */}
      <div className="sidebar-footer">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="sidebar-logout-btn"
          title="Sign out of SentioAI"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
