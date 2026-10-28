import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Search, DownloadCloud, CheckCircle2, Filter } from 'lucide-react';

export const SentimentResults = () => {
  const { resultsData, datasetMeta } = useApp();
  const [filterSentiment, setFilterSentiment] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredData = resultsData.filter(item => {
    const matchesTab = filterSentiment === 'ALL' || item.predicted.toUpperCase() === filterSentiment;
    const matchesSearch = item.text.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // SVG Donut Slices
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const posStroke = (44.7 / 100) * circumference;
  const negStroke = (36.4 / 100) * circumference;
  const neuStroke = (18.9 / 100) * circumference;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Sentiment Analysis Results</h1>
          <p className="page-description">
            View the prediction results for your dataset (Experiment 8 & Unit 3)
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => {
            const csvContent = "data:text/csv;charset=utf-8," +
              "Review Text,Actual,Predicted,Confidence\n" +
              resultsData.map(r => `"${r.text}",${r.actual},${r.predicted},${r.confidence}`).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "sentiment_analysis_results.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <DownloadCloud size={16} />
          <span>Export Results (CSV)</span>
        </button>
      </div>

      <div className="upload-grid" style={{ gridTemplateColumns: '1fr 1.6fr' }}>
        {/* Left: Sentiment Distribution */}
        <div className="content-card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
            Sentiment Distribution
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '10px 0 20px' }}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="26" />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="26"
                  strokeDasharray={`${posStroke} ${circumference}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="26"
                  strokeDasharray={`${negStroke} ${circumference}`}
                  strokeDashoffset={`-${posStroke}`}
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="26"
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
                <span style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>50k</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Reviews</span>
              </div>
            </div>

            <div className="chart-legend" style={{ width: '100%', maxWidth: '240px' }}>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
                <span className="legend-label">Positive</span>
                <span className="legend-pct" style={{ color: '#10b981' }}>44.7% (22,340)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
                <span className="legend-label">Negative</span>
                <span className="legend-pct" style={{ color: '#ef4444' }}>36.4% (18,210)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
                <span className="legend-label">Neutral</span>
                <span className="legend-pct" style={{ color: '#f59e0b' }}>18.9% (9,450)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sample Predictions Table */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
              Sample Predictions
            </h2>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['ALL', 'POSITIVE', 'NEGATIVE', 'NEUTRAL'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterSentiment(tab)}
                  className={`sample-chip ${filterSentiment === tab ? 'active' : ''}`}
                  style={{
                    backgroundColor: filterSentiment === tab ? '#6366f1' : '#f1f5f9',
                    color: filterSentiment === tab ? '#ffffff' : '#64748b',
                    borderColor: filterSentiment === tab ? '#6366f1' : '#e2e8f0'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>Review Text</th>
                  <th style={{ width: '18%' }}>Actual</th>
                  <th style={{ width: '18%' }}>Predicted</th>
                  <th style={{ width: '19%' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500', color: '#334155' }}>{item.text}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.actual === 'Positive'
                            ? 'badge-positive'
                            : item.actual === 'Negative'
                            ? 'badge-negative'
                            : 'badge-neutral'
                        }`}
                      >
                        {item.actual}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.predicted === 'Positive'
                            ? 'badge-positive'
                            : item.predicted === 'Negative'
                            ? 'badge-negative'
                            : 'badge-neutral'
                        }`}
                      >
                        {item.predicted}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>
                          {item.confidence.toFixed(2)}
                        </span>
                        <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${item.confidence * 100}%`,
                              backgroundColor: item.confidence > 0.9 ? '#10b981' : '#6366f1'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
