import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Smile,
  Frown,
  Meh,
  UploadCloud,
  Cpu,
  CheckCircle2,
  Download,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const Dashboard = () => {
  const { datasetMeta, setCurrentView } = useApp();

  // Donut SVG calculations for 44.7%, 36.4%, 18.9%
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.8
  const posStroke = (44.7 / 100) * circumference; // ~196.6
  const negStroke = (36.4 / 100) * circumference; // ~160.1
  const neuStroke = (18.9 / 100) * circumference; // ~83.1

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Overview of your sentiment analysis project
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setCurrentView('predict')}
        >
          <Sparkles size={16} />
          <span>Live Review Predictor</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-grid-4">
        {/* Total Reviews */}
        <div className="stat-card" style={{ '--stat-accent': '#6366f1' }}>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#e0e7ff', color: '#6366f1' }}>
            <FileText size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Total Reviews</span>
            <span className="stat-value">{datasetMeta.totalReviews.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#6366f1' }}>IMDb Movie Corpus</span>
          </div>
        </div>

        {/* Positive */}
        <div className="stat-card" style={{ '--stat-accent': '#10b981' }}>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#d1fae5', color: '#10b981' }}>
            <Smile size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Positive</span>
            <span className="stat-value">{datasetMeta.positiveCount.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#10b981' }}>44.7% of total</span>
          </div>
        </div>

        {/* Negative */}
        <div className="stat-card" style={{ '--stat-accent': '#ef4444' }}>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
            <Frown size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Negative</span>
            <span className="stat-value">{datasetMeta.negativeCount.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#ef4444' }}>36.4% of total</span>
          </div>
        </div>

        {/* Neutral */}
        <div className="stat-card" style={{ '--stat-accent': '#f59e0b' }}>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            <Meh size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Neutral</span>
            <span className="stat-value">{datasetMeta.neutralCount.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#f59e0b' }}>18.9% of total</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Donut Chart, Right Recent Activity */}
      <div className="dashboard-main-grid">
        {/* Sentiment Distribution Donut Chart */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
              Sentiment Distribution
            </h2>
            <span className="badge badge-primary">50k Samples</span>
          </div>

          <div className="donut-chart-container">
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="28"
                />
                {/* Positive slice (Green) */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="28"
                  strokeDasharray={`${posStroke} ${circumference}`}
                  strokeDashoffset="0"
                />
                {/* Negative slice (Red) */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="28"
                  strokeDasharray={`${negStroke} ${circumference}`}
                  strokeDashoffset={`-${posStroke}`}
                />
                {/* Neutral slice (Amber) */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="28"
                  strokeDasharray={`${neuStroke} ${circumference}`}
                  strokeDashoffset={`-${posStroke + negStroke}`}
                />
              </svg>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>92.3%</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>LSTM Accuracy</span>
              </div>
            </div>

            {/* Legend matching Mockup */}
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
                <span className="legend-label">Positive</span>
                <span className="legend-pct" style={{ color: '#10b981' }}>44.7%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
                <span className="legend-label">Negative</span>
                <span className="legend-pct" style={{ color: '#ef4444' }}>36.4%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
                <span className="legend-label">Neutral</span>
                <span className="legend-pct" style={{ color: '#f59e0b' }}>18.9%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
              Recent Activity
            </h2>
            <TrendingUp size={18} color="#6366f1" />
          </div>

          <div className="activity-feed-list">
            <div className="activity-item">
              <div className="activity-icon-box" style={{ backgroundColor: '#e0e7ff', color: '#6366f1' }}>
                <UploadCloud size={18} />
              </div>
              <div>
                <div className="activity-title">Dataset uploaded</div>
                <div className="activity-desc">Movie Reviews Dataset (50,000 samples)</div>
                <div className="activity-time">2 min ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-box" style={{ backgroundColor: '#dbeafe', color: '#2563eb' }}>
                <Cpu size={18} />
              </div>
              <div>
                <div className="activity-title">Model trained</div>
                <div className="activity-desc">LSTM Model • Accuracy: 92.3%</div>
                <div className="activity-time">18 min ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-box" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="activity-title">Sentiment analysis completed</div>
                <div className="activity-desc">Accuracy: 92.3% on validation split</div>
                <div className="activity-time">25 min ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-box" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                <Download size={18} />
              </div>
              <div>
                <div className="activity-title">Results exported</div>
                <div className="activity-desc">Saved as CSV format</div>
                <div className="activity-time">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
