import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

export const TopNavbar = () => {
  const {
    currentView,
    setCurrentView,
    user,
    notifications,
    showNotifications,
    setShowNotifications,
    searchQuery,
    setSearchQuery
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const pageOptions = [
    { id: 'dashboard', label: '3. Dashboard' },
    { id: 'upload', label: '4. Upload Dataset' },
    { id: 'preprocessing', label: '5. Text Preprocessing' },
    { id: 'training', label: '6. Model Training' },
    { id: 'results', label: '7. Sentiment Analysis' },
    { id: 'visualizations', label: '8. Data Visualizations' },
    { id: 'compare', label: '9. Compare Models' },
    { id: 'predict', label: '10. Predict Review' },
    { id: 'saved', label: '11. Saved Results' },
    { id: 'profile', label: '12. User Profile' },
    { id: 'login', label: '1. Login Page' },
    { id: 'signup', label: '2. Signup Page' }
  ];

  return (
    <header className="top-navbar">
      {/* Left Search Bar */}
      <div className="search-box-container">
        <Search size={17} color="#94a3b8" />
        <input
          type="text"
          className="search-input"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right Navbar Controls */}
      <div className="navbar-right">
        {/* Quick Page Switcher for evaluation & seamless navigation */}
        <div className="nav-page-switcher" title="Quickly jump to any screen">
          <Sparkles size={14} color="#6366f1" />
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Screen:</span>
          <select
            className="nav-page-select"
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value)}
          >
            {pageOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-badge-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge-dot"></span>}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                padding: '16px',
                zIndex: 50
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Activity & Notifications</span>
                <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: '600' }}>
                  {unreadCount} new
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: n.read ? '#f8fafc' : '#eff6ff',
                      fontSize: '0.82rem'
                    }}
                  >
                    <CheckCircle2 size={16} color={n.read ? '#94a3b8' : '#3b82f6'} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{n.title}</div>
                      <div style={{ color: '#64748b', fontSize: '0.76rem' }}>{n.text}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Capsule */}
        <div
          className="user-profile-capsule"
          onClick={() => setCurrentView('profile')}
          title="Open User Profile"
        >
          <div className="user-avatar">{user.avatar || 'NP'}</div>
          <div className="user-info-text">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
