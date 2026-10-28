import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Palette, BarChart3, Cloud, Grid } from 'lucide-react';

export const Visualizations = () => {
  const [activeTab, setActiveTab] = useState('wordcloud'); // 'wordcloud', 'topwords', 'sentiment', 'confusion'

  const wordCloudData = [
    { text: 'movie', size: 48, color: '#10b981', sentiment: 'pos' },
    { text: 'good', size: 42, color: '#059669', sentiment: 'pos' },
    { text: 'acting', size: 38, color: '#3b82f6', sentiment: 'neu' },
    { text: 'story', size: 34, color: '#6366f1', sentiment: 'neu' },
    { text: 'great', size: 36, color: '#10b981', sentiment: 'pos' },
    { text: 'excellent', size: 32, color: '#047857', sentiment: 'pos' },
    { text: 'worst', size: 30, color: '#ef4444', sentiment: 'neg' },
    { text: 'plot', size: 28, color: '#f59e0b', sentiment: 'neu' },
    { text: 'praising', size: 26, color: '#10b981', sentiment: 'pos' },
    { text: 'boring', size: 26, color: '#dc2626', sentiment: 'neg' },
    { text: 'cinema', size: 24, color: '#8b5cf6', sentiment: 'neu' },
    { text: 'character', size: 24, color: '#64748b', sentiment: 'neu' },
    { text: 'fans', size: 22, color: '#06b6d4', sentiment: 'pos' },
    { text: 'terrible', size: 22, color: '#ef4444', sentiment: 'neg' },
    { text: 'superb', size: 24, color: '#10b981', sentiment: 'pos' },
    { text: 'direction', size: 20, color: '#475569', sentiment: 'neu' },
    { text: 'waste', size: 20, color: '#b91c1c', sentiment: 'neg' },
    { text: 'classic', size: 22, color: '#7c3aed', sentiment: 'pos' },
    { text: 'visuals', size: 20, color: '#0284c7', sentiment: 'pos' },
    { text: 'dialogue', size: 18, color: '#64748b', sentiment: 'neu' }
  ];

  const topFrequentWords = [
    { word: 'movie', count: 10458, pct: 100 },
    { word: 'good', count: 8820, pct: 84 },
    { word: 'great', count: 7650, pct: 73 },
    { word: 'film', count: 6230, pct: 60 },
    { word: 'story', count: 5410, pct: 52 },
    { word: 'acting', count: 4310, pct: 41 },
    { word: 'time', count: 3890, pct: 37 },
    { word: 'best', count: 3610, pct: 35 },
    { word: 'plot', count: 3240, pct: 31 },
    { word: 'character', count: 2980, pct: 28 }
  ];

  // Confusion Matrix (3x3: Pos, Neg, Neu)
  const confusionData = [
    { actual: 'Positive', predPos: 21450, predNeg: 390, predNeu: 500, total: 22340 },
    { actual: 'Negative', predPos: 410, predNeg: 17200, predNeu: 600, total: 18210 },
    { actual: 'Neutral', predPos: 520, predNeg: 480, predNeu: 8450, total: 9450 }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Data Visualizations</h1>
          <p className="page-description">
            Explore insights from your review data (Unit 2 BoW & TF-IDF Exploration)
          </p>
        </div>
      </div>

      {/* Visualization Tab Buttons */}
      <div className="viz-tabs-row">
        <button
          className={`viz-tab-btn ${activeTab === 'wordcloud' ? 'active' : ''}`}
          onClick={() => setActiveTab('wordcloud')}
        >
          Word Cloud & Frequency
        </button>
        <button
          className={`viz-tab-btn ${activeTab === 'topwords' ? 'active' : ''}`}
          onClick={() => setActiveTab('topwords')}
        >
          Top Words Chart
        </button>
        <button
          className={`viz-tab-btn ${activeTab === 'confusion' ? 'active' : ''}`}
          onClick={() => setActiveTab('confusion')}
        >
          Confusion Matrix Heatmap
        </button>
      </div>

      {/* Main Dual Grid: Word Cloud on left & Frequency on right (Matching Screenshot 8) */}
      {(activeTab === 'wordcloud' || activeTab === 'topwords') && (
        <div className="upload-grid" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
          {/* Word Cloud View */}
          <div className="content-card">
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              Corpus Word Cloud
            </h2>
            <div className="word-cloud-wrapper">
              {wordCloudData.map((item, idx) => (
                <span
                  key={idx}
                  className="cloud-word"
                  style={{
                    fontSize: `${item.size}px`,
                    color: item.color,
                    fontWeight: item.size > 30 ? '800' : '600',
                    transform: idx % 4 === 0 ? 'rotate(-6deg)' : idx % 5 === 0 ? 'rotate(5deg)' : 'none'
                  }}
                  title={`${item.text} (${item.sentiment.toUpperCase()})`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Top 10 Most Frequent Words Chart */}
          <div className="content-card">
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
              Top 10 Most Frequent Words
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {topFrequentWords.map((item) => (
                <div key={item.word} className="frequency-bar-row">
                  <span className="freq-word-label">{item.word}</span>
                  <div className="freq-bar-track">
                    <div
                      className="freq-bar-fill"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="freq-val-label">{item.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confusion Matrix View */}
      {activeTab === 'confusion' && (
        <div className="content-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                Multi-Class Confusion Matrix (LSTM Model)
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                True vs Predicted class distribution on 50,000 test reviews
              </p>
            </div>
            <span className="badge badge-positive">Overall Acc: 92.3%</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Actual / Predicted</th>
                  <th>Predicted Positive</th>
                  <th>Predicted Negative</th>
                  <th>Predicted Neutral</th>
                  <th>Class Precision</th>
                </tr>
              </thead>
              <tbody>
                {confusionData.map((row) => (
                  <tr key={row.actual}>
                    <td style={{ fontWeight: '700', textAlign: 'left' }}>{row.actual}</td>
                    <td style={{ backgroundColor: row.actual === 'Positive' ? '#d1fae5' : '#f8fafc', fontWeight: '700', color: row.actual === 'Positive' ? '#065f46' : '#64748b' }}>
                      {row.predPos.toLocaleString()}
                    </td>
                    <td style={{ backgroundColor: row.actual === 'Negative' ? '#fee2e2' : '#f8fafc', fontWeight: '700', color: row.actual === 'Negative' ? '#991b1b' : '#64748b' }}>
                      {row.predNeg.toLocaleString()}
                    </td>
                    <td style={{ backgroundColor: row.actual === 'Neutral' ? '#fef3c7' : '#f8fafc', fontWeight: '700', color: row.actual === 'Neutral' ? '#92400e' : '#64748b' }}>
                      {row.predNeu.toLocaleString()}
                    </td>
                    <td style={{ fontWeight: '800', color: '#6366f1' }}>
                      {row.actual === 'Positive' ? '96.0%' : row.actual === 'Negative' ? '94.5%' : '89.4%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
