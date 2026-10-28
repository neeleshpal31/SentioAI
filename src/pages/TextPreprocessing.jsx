import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, Play, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

export const TextPreprocessing = () => {
  const {
    preprocessConfig,
    setPreprocessConfig,
    sampleOriginalText,
    setSampleOriginalText,
    preprocessStats,
    setPreprocessStats
  } = useApp();

  const [isRunning, setIsRunning] = useState(false);
  const [cleanedOutput, setCleanedOutput] = useState(
    'movie absolutely amazing loved acting story visuals bestmovieever'
  );
  const [tokenList, setTokenList] = useState([
    { token: 'movie', pos: 'NOUN', lemma: 'movie' },
    { token: 'absolutely', pos: 'ADV', lemma: 'absolutely' },
    { token: 'amazing', pos: 'ADJ', lemma: 'amazing' },
    { token: 'loved', pos: 'VERB', lemma: 'love' },
    { token: 'acting', pos: 'NOUN', lemma: 'acting' },
    { token: 'story', pos: 'NOUN', lemma: 'story' },
    { token: 'visuals', pos: 'NOUN', lemma: 'visual' },
    { token: 'bestmovieever', pos: 'PROPN', lemma: 'bestmovieever' }
  ]);

  const toggleOption = (key) => {
    setPreprocessConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const runPipeline = () => {
    setIsRunning(true);
    setTimeout(() => {
      let text = sampleOriginalText;

      // Lowercase
      if (preprocessConfig.lowercase) {
        text = text.toLowerCase();
      }

      // Remove special characters / URLs / Hashtags
      if (preprocessConfig.removeSpecialChars) {
        text = text.replace(/https?:\/\/\S+/g, '');
        text = text.replace(/#(\w+)/g, '$1');
        text = text.replace(/@(\w+)/g, '');
      }

      // Remove punctuation
      if (preprocessConfig.removePunctuation) {
        text = text.replace(/[^\w\s]/gi, '');
      }

      // Stop words list (NLTK standard subset)
      const stopWords = new Set([
        'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
        'this', 'that', 'the', 'is', 'was', 'are', 'were', 'and', 'or', 'to', 'of',
        'in', 'for', 'with', 'on', 'at', 'by', 'from', 'a', 'an'
      ]);

      let words = text.split(/\s+/).filter(Boolean);

      if (preprocessConfig.removeStopwords) {
        words = words.filter(w => !stopWords.has(w.toLowerCase()));
      }

      // Stemming / Lemmatization demo mappings
      if (preprocessConfig.lemmatization) {
        words = words.map(w => {
          if (w === 'loved') return 'love';
          if (w === 'acting') return 'act';
          if (w === 'visuals') return 'visual';
          return w;
        });
      }

      const cleaned = words.join(' ');
      setCleanedOutput(cleaned);

      // Recalculate stats
      const originalWordCount = sampleOriginalText.split(/\s+/).filter(Boolean).length;
      const cleanedWordCount = words.length;
      const diff = Math.max(0, originalWordCount - cleanedWordCount);

      setPreprocessStats(prev => ({
        ...prev,
        afterCleaning: Math.round(prev.totalWords * (cleanedWordCount / Math.max(1, originalWordCount))),
        removedWords: Math.round(prev.totalWords * (diff / Math.max(1, originalWordCount)))
      }));

      // Update tokens
      setTokenList(
        words.map(w => ({
          token: w,
          pos: w === 'love' || w === 'act' ? 'VERB' : w === 'amazing' ? 'ADJ' : 'NOUN',
          lemma: w
        }))
      );

      setIsRunning(false);
    }, 400);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Text Preprocessing</h1>
          <p className="page-description">
            Clean and preprocess your text data (NLTK, spaCy & Regex Pipeline)
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={runPipeline}
          disabled={isRunning}
        >
          {isRunning ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
          <span>{isRunning ? 'Processing...' : 'Run Preprocessing'}</span>
        </button>
      </div>

      <div className="preprocess-grid">
        {/* Left: Preprocessing Options Checklist */}
        <div className="content-card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
            Preprocessing Options
          </h2>

          <div className="checkbox-list">
            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.lowercase}
                onChange={() => toggleOption('lowercase')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Convert to lowercase</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.removePunctuation}
                onChange={() => toggleOption('removePunctuation')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Remove punctuation</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.removeStopwords}
                onChange={() => toggleOption('removeStopwords')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Remove stop words (NLTK Corpus)</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.stemming}
                onChange={() => toggleOption('stemming')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Apply stemming (Porter)</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.lemmatization}
                onChange={() => toggleOption('lemmatization')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Apply lemmatization (WordNet)</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.removeSpecialChars}
                onChange={() => toggleOption('removeSpecialChars')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Remove special characters</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.tokenization}
                onChange={() => toggleOption('tokenization')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Tokenization</span>
            </label>

            <label className="custom-checkbox-row">
              <input
                type="checkbox"
                checked={preprocessConfig.showCleanedText}
                onChange={() => toggleOption('showCleanedText')}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Show cleaned text output</span>
            </label>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={runPipeline}
            disabled={isRunning}
          >
            <span>Run Preprocessing</span>
          </button>
        </div>

        {/* Right: Original Text vs Cleaned Text */}
        <div className="content-card">
          <div className="text-compare-container">
            {/* Original Text */}
            <div className="text-box-card">
              <div className="text-box-header">
                <span>Original Text</span>
                <span style={{ color: '#ef4444' }}>Raw Input</span>
              </div>
              <textarea
                className="text-box-content"
                style={{ width: '100%', height: '80px', border: 'none', background: 'transparent', resize: 'none' }}
                value={sampleOriginalText}
                onChange={(e) => setSampleOriginalText(e.target.value)}
              />
            </div>

            {/* Cleaned Text */}
            <div className="text-box-card" style={{ borderColor: '#a7f3d0', backgroundColor: '#f0fdf4' }}>
              <div className="text-box-header">
                <span>Cleaned Text</span>
                <span style={{ color: '#059669', fontWeight: '700' }}>Preprocessed</span>
              </div>
              <div className="text-box-content" style={{ color: '#065f46', minHeight: '60px' }}>
                {cleanedOutput}
              </div>
            </div>

            {/* Tokenization & POS Tagging Breakdown */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                Extracted Tokens & POS Tags (Unit 1 Lab)
              </div>
              <div className="token-pill-container">
                {tokenList.map((item, idx) => (
                  <span key={idx} className="token-pill">
                    {item.token} <small style={{ opacity: 0.7 }}>[{item.pos}]</small>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Metric Cards */}
      <div className="stats-grid-4" style={{ marginTop: '24px' }}>
        <div className="stat-card" style={{ '--stat-accent': '#6366f1' }}>
          <div className="stat-details">
            <span className="stat-title">Total Words</span>
            <span className="stat-value">{preprocessStats.totalWords.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#64748b' }}>Raw Dataset Tokens</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#8b5cf6' }}>
          <div className="stat-details">
            <span className="stat-title">Unique Words</span>
            <span className="stat-value">{preprocessStats.uniqueWords.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#8b5cf6' }}>Vocabulary Size</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#10b981' }}>
          <div className="stat-details">
            <span className="stat-title">After Cleaning</span>
            <span className="stat-value">{preprocessStats.afterCleaning.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#10b981' }}>Informative Tokens</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': '#ef4444' }}>
          <div className="stat-details">
            <span className="stat-title">Removed (Noise)</span>
            <span className="stat-value">{preprocessStats.removedWords.toLocaleString()}</span>
            <span className="stat-subtext" style={{ color: '#ef4444' }}>Stopwords & Punctuation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
