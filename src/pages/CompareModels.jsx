import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GitCompare, Award, Zap, CheckCircle2, Trophy } from 'lucide-react';

export const CompareModels = () => {
  const { comparisonModels, setSelectedModel, setCurrentView } = useApp();
  const [selectedSort, setSelectedSort] = useState('accuracy');

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Model Comparison</h1>
          <p className="page-description">
            Compare different models performance (Syllabus: ML vs Deep Learning Benchmark)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', padding: '8px 14px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
          <Trophy size={18} color="#059669" />
          <span style={{ fontSize: '0.86rem', fontWeight: '700', color: '#065f46' }}>
            Top Performer: BiLSTM / LSTM (92-93% Acc)
          </span>
        </div>
      </div>

      {/* Main Comparison Table Card */}
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '26%' }}>Model</th>
                <th style={{ width: '14%' }}>Accuracy</th>
                <th style={{ width: '14%' }}>Precision</th>
                <th style={{ width: '14%' }}>Recall</th>
                <th style={{ width: '14%' }}>F1-Score</th>
                <th style={{ width: '18%' }}>Training Time</th>
              </tr>
            </thead>
            <tbody>
              {comparisonModels.map((m) => {
                const isHighlight = m.name.includes('LSTM');
                return (
                  <tr
                    key={m.name}
                    style={{
                      backgroundColor: isHighlight ? '#f0fdf4' : 'transparent',
                      fontWeight: isHighlight ? '700' : 'normal'
                    }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: isHighlight ? '#065f46' : '#0f172a', fontWeight: '700' }}>
                          {m.name}
                        </span>
                        {m.isBest && (
                          <span className="badge badge-positive" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                            Best Match
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ color: Number(m.accuracy) >= 0.9 ? '#10b981' : '#334155', fontWeight: '700' }}>
                        {m.accuracy}
                      </span>
                    </td>
                    <td>{m.precision}</td>
                    <td>{m.recall}</td>
                    <td>
                      <span style={{ fontWeight: '700', color: Number(m.f1) >= 0.9 ? '#10b981' : '#475569' }}>
                        {m.f1}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{m.time}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Performance Benchmark Charts */}
      <div className="dashboard-main-grid">
        <div className="content-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>
            Accuracy Comparison Bar Chart
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {comparisonModels.map((m) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '130px', fontSize: '0.82rem', fontWeight: '600', color: '#1e293b' }}>
                  {m.name.split(' ')[0]}
                </span>
                <div style={{ flex: 1, height: '14px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Number(m.accuracy) * 100}%`,
                      backgroundColor: Number(m.accuracy) >= 0.92 ? '#10b981' : Number(m.accuracy) >= 0.88 ? '#6366f1' : '#94a3b8',
                      borderRadius: '4px'
                    }}
                  ></div>
                </div>
                <span style={{ width: '45px', fontSize: '0.82rem', fontWeight: '700', textAlign: 'right' }}>
                  {(Number(m.accuracy) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px', color: '#0f172a' }}>
            Model Selection Guide
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>
            In accordance with **Unit 3 (Recurrent Neural Networks)**, sequence models like LSTM and GRU outperform traditional bag-of-words (Naive Bayes/SVM) because they retain context and word ordering across the sequence.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px 14px', backgroundColor: '#eff6ff', borderRadius: '8px', borderLeft: '3px solid #3b82f6', fontSize: '0.84rem' }}>
              <strong>LSTM / BiLSTM:</strong> Captures long-range dependencies in complex movie reviews.
            </div>
            <div style={{ padding: '10px 14px', backgroundColor: '#ecfdf5', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.84rem' }}>
              <strong>GRU:</strong> Faster training time with nearly identical precision (1m 10s vs 1m 20s).
            </div>
            <div style={{ padding: '10px 14px', backgroundColor: '#fffbeb', borderRadius: '8px', borderLeft: '3px solid #f59e0b', fontSize: '0.84rem' }}>
              <strong>Naive Bayes:</strong> Ultra-fast baseline (2s), suitable for rapid prototyping.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
