import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Play, CheckCircle, RefreshCw, BarChart2 } from 'lucide-react';

export const ModelTraining = () => {
  const {
    selectedModel,
    setSelectedModel,
    hyperparameters,
    setHyperparameters,
    isTraining,
    setIsTraining,
    trainingProgress,
    setTrainingProgress,
    currentEpoch,
    setCurrentEpoch,
    lossHistory,
    setLossHistory,
    modelMetrics,
    setModelMetrics
  } = useApp();

  const [activeEpochIndex, setActiveEpochIndex] = useState(7);

  const startTrainingSimulation = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentEpoch(1);

    let epoch = 1;
    const interval = setInterval(() => {
      epoch += 1;
      setCurrentEpoch(epoch);
      setTrainingProgress(Math.min(100, Math.round((epoch / hyperparameters.epochs) * 100)));

      if (epoch >= hyperparameters.epochs) {
        clearInterval(interval);
        setIsTraining(false);
        setTrainingProgress(100);
        setCurrentEpoch(hyperparameters.epochs);

        // Update metrics based on model
        if (selectedModel.includes('BiLSTM')) {
          setModelMetrics({ accuracy: '93.1%', precision: '0.92', recall: '0.94', f1Score: '0.93' });
        } else if (selectedModel.includes('GRU')) {
          setModelMetrics({ accuracy: '91.4%', precision: '0.89', recall: '0.91', f1Score: '0.90' });
        } else if (selectedModel.includes('CNN')) {
          setModelMetrics({ accuracy: '90.2%', precision: '0.88', recall: '0.89', f1Score: '0.88' });
        } else {
          setModelMetrics({ accuracy: '92.3%', precision: '0.91', recall: '0.93', f1Score: '0.92' });
        }
      }
    }, 600);
  };

  // SVG dimensions for Loss Curve
  const svgWidth = 520;
  const svgHeight = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Max and min loss
  const maxLoss = 1.0;
  const minLoss = 0.0;

  const getX = (epoch) => padding.left + ((epoch - 1) / (lossHistory.length - 1)) * plotWidth;
  const getY = (loss) => padding.top + plotHeight - ((loss - minLoss) / (maxLoss - minLoss)) * plotHeight;

  // SVG Paths
  const trainLossPath = lossHistory.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getY(d.trainLoss)}`).join(' ');
  const valLossPath = lossHistory.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.epoch)} ${getY(d.valLoss)}`).join(' ');

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Model Training</h1>
          <p className="page-description">
            Train deep learning models for sentiment analysis (Unit 3 Lab)
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={startTrainingSimulation}
          disabled={isTraining}
        >
          {isTraining ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
          <span>{isTraining ? 'Training in Progress...' : 'Start Training'}</span>
        </button>
      </div>

      <div className="training-grid">
        {/* Left Column: Model Configuration & Hyperparameters */}
        <div className="content-card">
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>Select Model</label>
            <select
              className="form-input"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{ fontWeight: '600', color: '#1e293b' }}
            >
              <option value="LSTM (Recommended)">LSTM (Recommended)</option>
              <option value="BiLSTM (Bidirectional LSTM)">BiLSTM (Bidirectional LSTM)</option>
              <option value="GRU">GRU (Gated Recurrent Unit)</option>
              <option value="CNN (1D Text CNN)">CNN (1D Text CNN)</option>
              <option value="Naive Bayes">Naive Bayes (TF-IDF Baseline)</option>
              <option value="SVM (Support Vector Machine)">SVM (Linear Classifier)</option>
            </select>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginTop: '14px' }}>
            Hyperparameters
          </h3>

          <div className="hyperparams-grid">
            <div className="form-group">
              <label className="form-label">Epochs</label>
              <input
                type="text"
                className="form-input"
                value={`${currentEpoch}/${hyperparameters.epochs}`}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Batch Size</label>
              <select
                className="form-input"
                value={hyperparameters.batchSize}
                onChange={(e) => setHyperparameters(prev => ({ ...prev, batchSize: Number(e.target.value) }))}
              >
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={64}>64</option>
                <option value={128}>128</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Learning Rate</label>
              <input
                type="text"
                className="form-input"
                value={hyperparameters.learningRate}
                onChange={(e) => setHyperparameters(prev => ({ ...prev, learningRate: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Embedding Dim</label>
              <input
                type="number"
                className="form-input"
                value={hyperparameters.embeddingDim}
                onChange={(e) => setHyperparameters(prev => ({ ...prev, embeddingDim: Number(e.target.value) }))}
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Dropout Rate</label>
              <input
                type="number"
                step="0.05"
                className="form-input"
                value={hyperparameters.dropoutRate}
                onChange={(e) => setHyperparameters(prev => ({ ...prev, dropoutRate: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Training Progress Box */}
          <div className="training-progress-box">
            <div className="progress-header">
              <span>Training Progress</span>
              <span style={{ color: '#6366f1' }}>
                Epoch {currentEpoch}/{hyperparameters.epochs} ({trainingProgress}%)
              </span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${trainingProgress}%` }}
              ></div>
            </div>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={startTrainingSimulation}
            disabled={isTraining}
          >
            <span>{isTraining ? 'Training...' : 'Start Training'}</span>
          </button>
        </div>

        {/* Right Column: Training & Validation Loss Curves */}
        <div className="content-card loss-curve-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
              Loss & Convergence Curves
            </h2>
            <div className="loss-legend">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
                Training Loss
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f97316' }}></span>
                Validation Loss
              </span>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              style={{ width: '100%', height: 'auto', maxHeight: '280px' }}
            >
              {/* Horizontal Grid lines */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={svgWidth - padding.right}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="end"
                      fontWeight="600"
                    >
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Epoch X-axis markers */}
              {lossHistory.map((d) => {
                const x = getX(d.epoch);
                return (
                  <g key={d.epoch}>
                    <text
                      x={x}
                      y={svgHeight - 15}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      {d.epoch}
                    </text>
                  </g>
                );
              })}

              <text
                x={svgWidth / 2}
                y={svgHeight}
                fill="#64748b"
                fontSize="11"
                textAnchor="middle"
                fontWeight="700"
              >
                Epochs
              </text>

              {/* Curves */}
              <path
                d={trainLossPath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={valLossPath}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Dots */}
              {lossHistory.map((d) => (
                <g key={d.epoch}>
                  <circle
                    cx={getX(d.epoch)}
                    cy={getY(d.trainLoss)}
                    r="4"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={getX(d.epoch)}
                    cy={getY(d.valLoss)}
                    r="4"
                    fill="#f97316"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom 4 Performance Metric Cards */}
      <div className="stats-grid-4" style={{ marginTop: '24px' }}>
        <div className="stat-card" style={{ '--stat-accent': '#10b981' }}>
          <div className="stat-details">
            <span className="stat-title">Accuracy</span>
            <span className="stat-value" style={{ color: '#10b981' }}>{modelMetrics.accuracy}</span>
            <span className="stat-subtext" style={{ color: '#64748b' }}>Test Dataset Split</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#6366f1' }}>
          <div className="stat-details">
            <span className="stat-title">Precision</span>
            <span className="stat-value">{modelMetrics.precision}</span>
            <span className="stat-subtext" style={{ color: '#6366f1' }}>Weighted Average</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#8b5cf6' }}>
          <div className="stat-details">
            <span className="stat-title">Recall</span>
            <span className="stat-value">{modelMetrics.recall}</span>
            <span className="stat-subtext" style={{ color: '#8b5cf6' }}>Sensitivity Score</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#ec4899' }}>
          <div className="stat-details">
            <span className="stat-title">F1-Score</span>
            <span className="stat-value">{modelMetrics.f1Score}</span>
            <span className="stat-subtext" style={{ color: '#ec4899' }}>Harmonic Mean</span>
          </div>
        </div>
      </div>
    </div>
  );
};
