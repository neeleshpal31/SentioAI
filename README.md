# SentioAI — Intelligent NLP Sentiment Analysis & Review Intelligence Platform

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-NLP-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-Academic-blue.svg)](#)

> **MCA 3rd Semester NLP Project**  
> **Author**: Neelesh Pal  
> **Documentation**: See [CASE_STUDY.md](./CASE_STUDY.md) for full academic analysis, curriculum mapping, and mathematical formulations.

---

## 📌 Project Overview

**SentioAI** is a sentiment analysis and natural language processing workstation. Built for postgraduate NLP research, it demonstrates the full transition from unstructured text to sequential neural sentiment classification.

### 🎯 Curriculum Mapping (MCA 3rd Semester NLP Units)
1. **Unit 1: Text Preprocessing & Morphological Analysis**
   - Case normalization, regex noise cleaning (URLs, HTML tags, special symbols).
   - Tokenization, stopword removal, stemming, and lemmatization.
2. **Unit 2: Feature Representation & Vector Space Modeling**
   - Bag-of-Words (BoW), N-grams, TF-IDF vectorization, and dense word embeddings.
3. **Unit 3: Sequential Deep Learning vs. Classical ML Classifiers**
   - Classical Baselines: Multinomial Naive Bayes, Linear Support Vector Machines (LinearSVC).
   - Recurrent Neural Architectures: 1D CNN, GRU, LSTM, and Bidirectional LSTM (BiLSTM).

---

## ✨ Features & Interactive Screens

The application features 12+ interconnected workspaces:

- 📊 **Dashboard**: High-level telemetry, dataset metrics (50k movie reviews), and model performance summaries.
- 📁 **Upload Dataset**: Ingestion portal with file statistics and live sample preview.
- 🧪 **Preprocessing Lab**: Step-by-step interactive filters with immediate statistical reduction telemetry.
- ⚙️ **Model Training Center**: Interactive hyperparameter tuning (epochs, batch size, learning rate) and loss curves.
- 📈 **Sentiment Results**: Multi-class breakdown (Positive, Negative, Neutral), precision, recall, and F1-scores.
- 📉 **Visualizations**: Sentiment distributions, token length histograms, and word cloud insights.
- ⚖️ **Model Comparison Suite**: Comprehensive benchmark comparing accuracy, inference latency, and memory footprints.
- 🔍 **Live Sentiment Predictor**: Instant inference engine featuring Explainable AI (XAI) token valence salience.
- 💾 **Saved Results & Export**: Downloadable evaluation reports, CSV summaries, and model artifacts.
- 👤 **Researcher Profile**: Student researcher credentials and academic configuration.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python 3.x](https://www.python.org/) (optional, for the backend benchmark script)

### 1. Web Application (React + Vite)
```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install frontend dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Standalone NLP Benchmark Script
```bash
# Install Python dependencies
pip install pandas scikit-learn numpy

# Run the benchmark script
python backend/train_and_evaluate.py
```

---

## 🌐 Deploying to GitHub Pages

This repository comes pre-configured with a **GitHub Actions** automated deployment workflow (`.github/workflows/deploy.yml`).

1. Push this repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The deployment workflow will automatically trigger, build the application, and publish it live!

---

## 📁 Repository Structure

```text
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── backend/
│   └── train_and_evaluate.py   # Python NLP pipeline (Unit 1, 2, 3 benchmark)
├── src/
│   ├── components/             # Reusable UI components (Sidebar, TopNavbar, Modals)
│   ├── context/                # Global React application state (AppContext)
│   ├── pages/                  # 12+ UI modules & pages
│   ├── App.jsx                 # Main application router
│   ├── index.css               # Design tokens, typography, and theme styling
│   └── main.jsx                # Application root entry
├── index.html                  # HTML entry template
├── vite.config.js              # Vite configuration with relative base paths
├── CASE_STUDY.md               # Complete academic case study report
└── package.json                # Project dependencies and build scripts
```

---

## 📝 License & Academic Attribution
Developed for academic purposes under the MCA 3rd Semester Natural Language Processing coursework.
