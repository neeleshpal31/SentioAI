import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  // Valid views: 'login', 'signup', 'dashboard', 'upload', 'preprocessing', 'training', 'results', 'visualizations', 'compare', 'predict', 'saved', 'profile'
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // User State
  const [user, setUser] = useState({
    name: 'Neelesh Pal',
    email: 'neelesh@example.com',
    role: 'MCA Student / NLP Researcher',
    university: 'MCA 3rd Semester NLP Project',
    avatar: 'NP'
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Dataset Uploaded', text: 'Movie Reviews Dataset (50k rows) is ready', time: '2 min ago', read: false },
    { id: 2, title: 'Model Trained', text: 'LSTM model achieved 92.3% accuracy', time: '18 min ago', read: false },
    { id: 3, title: 'Analysis Completed', text: 'Dataset sentiment classified successfully', time: '25 min ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dataset State
  const [datasetMeta, setDatasetMeta] = useState({
    name: 'Movie Reviews Dataset',
    totalReviews: 50000,
    columns: 2,
    fileType: 'CSV',
    fileSize: '4.2 MB',
    positiveCount: 22340,
    negativeCount: 18210,
    neutralCount: 9450
  });

  const [previewRows, setPreviewRows] = useState([
    { id: 1, text: 'Amazing movie, loved it! The acting and visuals were top notch.', label: 'Positive' },
    { id: 2, text: 'Worst experience ever. Horrible pacing and bad dialogue.', label: 'Negative' },
    { id: 3, text: 'It was okay, not bad. Average storyline and decent music.', label: 'Neutral' },
    { id: 4, text: 'Great acting and incredible cinematography throughout.', label: 'Positive' },
    { id: 5, text: 'Boring and too long. I almost fell asleep in the second half.', label: 'Negative' },
    { id: 6, text: 'A thrilling masterpiece! Kept me on the edge of my seat.', label: 'Positive' },
    { id: 7, text: 'Predictable plot and bland performances from all leads.', label: 'Negative' },
    { id: 8, text: 'Fair enough watch on a weekend, nothing revolutionary.', label: 'Neutral' }
  ]);

  // Preprocessing State
  const [preprocessConfig, setPreprocessConfig] = useState({
    lowercase: true,
    removePunctuation: true,
    removeStopwords: true,
    stemming: true,
    lemmatization: true,
    removeSpecialChars: true,
    tokenization: true,
    showCleanedText: true
  });

  const [sampleOriginalText, setSampleOriginalText] = useState(
    'This movie was absolutely AMAZING!! I loved the acting, the story, and the visuals. #BestMovieEver https://reviews.org'
  );

  const [preprocessStats, setPreprocessStats] = useState({
    totalWords: 123450,
    uniqueWords: 18320,
    afterCleaning: 95210,
    removedWords: 28240
  });

  // Model Training State
  const [selectedModel, setSelectedModel] = useState('LSTM (Recommended)');
  const [hyperparameters, setHyperparameters] = useState({
    epochs: 10,
    batchSize: 32,
    learningRate: 0.001,
    embeddingDim: 100,
    dropoutRate: 0.2
  });

  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(80); // 80% as in mockup
  const [currentEpoch, setCurrentEpoch] = useState(8);
  const [lossHistory, setLossHistory] = useState([
    { epoch: 1, trainLoss: 0.88, valLoss: 0.95 },
    { epoch: 2, trainLoss: 0.65, valLoss: 0.72 },
    { epoch: 3, trainLoss: 0.48, valLoss: 0.55 },
    { epoch: 4, trainLoss: 0.38, valLoss: 0.46 },
    { epoch: 5, trainLoss: 0.30, valLoss: 0.40 },
    { epoch: 6, trainLoss: 0.24, valLoss: 0.35 },
    { epoch: 7, trainLoss: 0.19, valLoss: 0.32 },
    { epoch: 8, trainLoss: 0.16, valLoss: 0.29 },
    { epoch: 9, trainLoss: 0.13, valLoss: 0.27 },
    { epoch: 10, trainLoss: 0.11, valLoss: 0.25 }
  ]);

  const [modelMetrics, setModelMetrics] = useState({
    accuracy: '92.3%',
    precision: '0.91',
    recall: '0.93',
    f1Score: '0.92'
  });

  // Sentiment Analysis Results
  const [resultsData, setResultsData] = useState([
    { id: 1, text: 'Amazing movie, loved it!', actual: 'Positive', predicted: 'Positive', confidence: 0.96 },
    { id: 2, text: 'Worst experience ever.', actual: 'Negative', predicted: 'Negative', confidence: 0.95 },
    { id: 3, text: 'It was okay, not bad.', actual: 'Neutral', predicted: 'Neutral', confidence: 0.78 },
    { id: 4, text: 'Great acting and story.', actual: 'Positive', predicted: 'Positive', confidence: 0.92 },
    { id: 5, text: 'Boring and too long.', actual: 'Negative', predicted: 'Negative', confidence: 0.90 },
    { id: 6, text: 'Brilliant direction and music!', actual: 'Positive', predicted: 'Positive', confidence: 0.97 },
    { id: 7, text: 'Completely unwatchable garbage.', actual: 'Negative', predicted: 'Negative', confidence: 0.99 },
    { id: 8, text: 'Average flick for time pass.', actual: 'Neutral', predicted: 'Neutral', confidence: 0.82 }
  ]);

  // Model Comparison Data (Screenshot 9)
  const [comparisonModels] = useState([
    { name: 'Naive Bayes (BoW)', accuracy: '0.82', precision: '0.80', recall: '0.81', f1: '0.80', time: '2s', type: 'Baseline ML' },
    { name: 'SVM (Linear TF-IDF)', accuracy: '0.86', precision: '0.84', recall: '0.85', f1: '0.84', time: '5s', type: 'Traditional ML' },
    { name: 'Random Forest', accuracy: '0.85', precision: '0.83', recall: '0.84', f1: '0.83', time: '10s', type: 'Ensemble' },
    { name: 'CNN (1D Text)', accuracy: '0.90', precision: '0.88', recall: '0.89', f1: '0.88', time: '45s', type: 'Deep Learning' },
    { name: 'LSTM (Recommended)', accuracy: '0.92', precision: '0.91', recall: '0.93', f1: '0.92', time: '1m 20s', type: 'RNN Deep Learning', isBest: true },
    { name: 'GRU', accuracy: '0.91', precision: '0.89', recall: '0.91', f1: '0.90', time: '1m 10s', type: 'RNN Deep Learning' },
    { name: 'BiLSTM', accuracy: '0.93', precision: '0.91', recall: '0.92', f1: '0.92', time: '1m 40s', type: 'RNN Deep Learning' }
  ]);

  // Single Prediction State
  const [singleReviewText, setSingleReviewText] = useState(
    'This movie is really fantastic! The acting was superb and the story kept me engaged throughout. Highly recommended!'
  );
  const [singleResult, setSingleResult] = useState({
    sentiment: 'Positive',
    confidence: '94.6%',
    scores: { positive: 94.6, neutral: 3.8, negative: 1.6 },
    keywords: [
      { word: 'fantastic', weight: '+0.88', type: 'pos' },
      { word: 'superb', weight: '+0.92', type: 'pos' },
      { word: 'engaged', weight: '+0.74', type: 'pos' },
      { word: 'recommended', weight: '+0.85', type: 'pos' }
    ],
    tokens: ['movie', 'fantastic', 'acting', 'superb', 'story', 'engaged', 'throughout', 'recommended']
  });

  // Saved Results List (Screenshot 11)
  const [savedFiles, setSavedFiles] = useState([
    { id: 1, name: 'movie_reviews_results.csv', type: 'CSV', date: '23 Oct 2026', size: '3.8 MB', rows: '50,000' },
    { id: 2, name: 'sentiment_predictions.csv', type: 'CSV', date: '21 Oct 2026', size: '1.2 MB', rows: '15,000' },
    { id: 3, name: 'trained_lstm_model.h5', type: 'Model', date: '18 Oct 2026', size: '42.5 MB', rows: 'Weights' },
    { id: 4, name: 'preprocessed_data.csv', type: 'CSV', date: '15 Oct 2026', size: '2.4 MB', rows: '50,000' },
    { id: 5, name: 'nlp_evaluation_report.json', type: 'JSON', date: '12 Oct 2026', size: '240 KB', rows: 'Summary' }
  ]);

  // Actions
  const handleLogin = (email) => {
    setUser(prev => ({ ...prev, email: email || 'neelesh@example.com' }));
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSignup = (fullName, email) => {
    setUser(prev => ({
      ...prev,
      name: fullName || 'Neelesh Pal',
      email: email || 'neelesh@example.com',
      avatar: (fullName || 'NP').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    }));
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    setCurrentView('login');
  };

  const deleteSavedFile = (id) => {
    setSavedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isAuthenticated,
        setIsAuthenticated,
        showLogoutModal,
        setShowLogoutModal,
        searchQuery,
        setSearchQuery,
        user,
        setUser,
        notifications,
        setNotifications,
        showNotifications,
        setShowNotifications,
        datasetMeta,
        setDatasetMeta,
        previewRows,
        setPreviewRows,
        preprocessConfig,
        setPreprocessConfig,
        sampleOriginalText,
        setSampleOriginalText,
        preprocessStats,
        setPreprocessStats,
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
        setModelMetrics,
        resultsData,
        setResultsData,
        comparisonModels,
        singleReviewText,
        setSingleReviewText,
        singleResult,
        setSingleResult,
        savedFiles,
        setSavedFiles,
        handleLogin,
        handleSignup,
        handleLogout,
        deleteSavedFile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
