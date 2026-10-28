import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Brain, ArrowRight, UserPlus, Shield } from 'lucide-react';

export const Signup = () => {
  const { setCurrentView, handleSignup } = useApp();
  const [fullName, setFullName] = useState('Neelesh Pal');
  const [email, setEmail] = useState('neelesh@example.com');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup(fullName, email);
  };

  return (
    <div className="auth-page-root">
      <div className="auth-split-card">
        {/* Left Hero Side */}
        <div
          className="auth-hero-side"
          style={{
            background: 'linear-gradient(145deg, #1e1b4b 0%, #2e1065 50%, #4338ca 100%)'
          }}
        >
          <div className="auth-hero-branding">
            <div className="brand-icon-box">
              <Brain size={24} />
            </div>
            <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.25rem' }}>
              SentioAI
            </div>
          </div>

          <div className="auth-mascot-container">
            <img
              src="/assets/analytics_art.jpg"
              alt="AI Analytics & Review Intelligence"
              className="auth-mascot-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h2 className="auth-hero-title">Start Analyzing Reviews with AI</h2>
            <p className="auth-hero-subtitle">
              Turn reviews into valuable insights using machine learning and deep learning.
            </p>
          </div>

          {/* Carousel Indicator Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
            <span style={{ width: '24px', height: '8px', borderRadius: '4px', backgroundColor: '#818cf8' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }}></span>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Create Your Account</h1>
            <p className="auth-form-desc">
              Join AI Review Intelligence to get started
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Neelesh Pal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="neelesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}>
              <span>Sign Up</span>
              <UserPlus size={17} />
            </button>
          </form>

          <div className="auth-footer-text">
            Already have an account?{' '}
            <span className="auth-footer-link" onClick={() => setCurrentView('login')}>
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
