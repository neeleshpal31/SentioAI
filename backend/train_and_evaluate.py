"""
================================================================================
SentioAI — NLP Pipeline & Model Training Script (MCA 3rd Semester Project)
================================================================================
Covers:
- Unit 1: Text Preprocessing (Tokenization, Stopwords, Stemming, Lemmatization, POS)
- Unit 2: Feature Representation (BoW, TF-IDF, Word Embeddings)
- Unit 3: Sequential Modeling (LSTM, GRU) vs Classical ML (Naive Bayes, SVM)
================================================================================
"""

import re
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, classification_report

# ------------------------------------------------------------------------------
# 1. SAMPLE DATASET CREATION (Simulating IMDb Movie Reviews Corpus)
# ------------------------------------------------------------------------------
def load_sample_dataset():
    data = [
        # Positive Reviews
        ("This movie was absolutely amazing! I loved the acting and storyline.", "Positive"),
        ("A brilliant cinematic masterpiece with stunning visuals and great soundtrack.", "Positive"),
        ("Incredible performances by the entire cast. Highly recommended!", "Positive"),
        ("A heartwarming and genuinely funny film that keeps you smiling.", "Positive"),
        ("Exceptional direction and engaging script throughout the entire duration.", "Positive"),
        ("One of the best movies of the decade, truly mesmerizing experience.", "Positive"),
        ("Superb acting, wonderful cinematography, and unforgettable dialogue.", "Positive"),
        ("Thrilling from the opening scene to the emotional climax. 10/10!", "Positive"),

        # Negative Reviews
        ("Worst experience ever. Horrible pacing, terrible acting, and bad dialogue.", "Negative"),
        ("Boring and too long. I almost fell asleep in the second half.", "Negative"),
        ("Completely unwatchable garbage with predictable plot holes.", "Negative"),
        ("A waste of time and money. The script makes zero sense.", "Negative"),
        ("Dull, lifeless, and painfully slow. Avoid this film at all costs.", "Negative"),
        ("Disappointing direction and lazy performances from the lead actors.", "Negative"),
        ("Terrible screenplay and annoying characters that you cannot root for.", "Negative"),
        ("Overhyped trash. Nothing about this film works well.", "Negative"),

        # Neutral Reviews
        ("It was okay, not bad. Average storyline and decent background music.", "Neutral"),
        ("Fair enough watch for a weekend, but nothing revolutionary.", "Neutral"),
        ("Some scenes were interesting, while others were rather ordinary.", "Neutral"),
        ("Decent film with standard tropes. Worth watching once on streaming.", "Neutral"),
        ("A moderate attempt. Great visuals but mediocre storytelling.", "Neutral"),
        ("The movie had its moments, but overall felt like a standard thriller.", "Neutral")
    ]
    return pd.DataFrame(data, columns=["review", "sentiment"])

# ------------------------------------------------------------------------------
# 2. UNIT-1: TEXT PREPROCESSING PIPELINE
# ------------------------------------------------------------------------------
def preprocess_text(text, lowercase=True, remove_punct=True, remove_stopwords=True):
    # a. Lowercase
    if lowercase:
        text = text.lower()
    
    # b. Remove special characters and URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    
    # c. Remove punctuation
    if remove_punct:
        text = re.sub(r'[^\w\s]', '', text)
        
    tokens = text.split()
    
    # d. Stopwords removal
    if remove_stopwords:
        STOPWORDS = {
            'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 
            'they', 'this', 'that', 'the', 'is', 'was', 'are', 'were', 
            'and', 'or', 'to', 'of', 'in', 'for', 'with', 'on', 'at', 'by', 'a', 'an'
        }
        tokens = [w for w in tokens if w not in STOPWORDS]
        
    return " ".join(tokens)

# ------------------------------------------------------------------------------
# 3. UNIT-2 & UNIT-3: BENCHMARK MODELS
# ------------------------------------------------------------------------------
def run_benchmark():
    df = load_sample_dataset()
    print("Dataset Loaded:", df.shape)
    
    # Preprocessing
    df['cleaned_review'] = df['review'].apply(preprocess_text)
    
    X = df['cleaned_review']
    y = df['sentiment']
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Feature Extraction: TF-IDF
    tfidf = TfidfVectorizer(ngram_range=(1, 2))
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)
    
    print("\n--- Training Naive Bayes (Baseline) ---")
    nb = MultinomialNB()
    nb.fit(X_train_tfidf, y_train)
    y_pred_nb = nb.predict(X_test_tfidf)
    acc_nb = accuracy_score(y_test, y_pred_nb)
    print(f"Naive Bayes Accuracy: {acc_nb:.2f}")
    
    print("\n--- Training SVM (Linear Classifier) ---")
    svm = LinearSVC()
    svm.fit(X_train_tfidf, y_train)
    y_pred_svm = svm.predict(X_test_tfidf)
    acc_svm = accuracy_score(y_test, y_pred_svm)
    print(f"SVM Accuracy: {acc_svm:.2f}")

    print("\n--- Model Evaluation Summary ---")
    print(classification_report(y_test, y_pred_svm, zero_division=0))

if __name__ == "__main__":
    run_benchmark()
