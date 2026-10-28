import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Brain, Sparkles, Cpu, BarChart3, Database, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { setCurrentView, handleLogin } = useApp();
  const [email, setEmail] = useState('neelesh@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email);
  };

  return (
    <div className="auth-page-root">
      <div className="auth-split-card">
        {/* Left Hero Side */}
        <div className="auth-hero-side">
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
              src="/assets/robot_mascot.jpg"
              alt="SentioAI Robot Mascot"
              className="auth-mascot-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h2 className="auth-hero-title">AI Review Intelligence</h2>
            <p className="auth-hero-subtitle">
              Analyze. Understand. Make Better Decisions.
            </p>
          </div>

          {/* 4 Feature Badges from Mockup */}
          <div className="auth-feature-pills">
            <div className="auth-pill">
              <Sparkles size={16} color="#818cf8" />
              <span>Sentiment Analysis</span>
            </div>
            <div className="auth-pill">
              <Cpu size={16} color="#34d399" />
              <span>Deep Learning Models</span>
            </div>
            <div className="auth-pill">
              <BarChart3 size={16} color="#f472b6" />
              <span>Detailed Visualizations</span>
            </div>
            <div className="auth-pill">
              <Database size={16} color="#38bdf8" />
              <span>Multiple Datasets</span>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Welcome Back</h1>
            <p className="auth-form-desc">
              Sign in to continue to AI Review Intelligence
            </p>
          </div>

          <form onSubmit={onSubmit}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-extra-row">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Password reset link has been dispatched to ' + email); }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}>
              <span>Sign In</span>
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* Google OAuth Simulation */}
          <button
            type="button"
            className="btn-google"
            onClick={() => handleLogin('neelesh.pal.mca@google.com')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="auth-footer-text">
            Don't have an account?{' '}
            <span className="auth-footer-link" onClick={() => setCurrentView('signup')}>
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
