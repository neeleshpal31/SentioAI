import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, FileSpreadsheet, Check, Search, Database } from 'lucide-react';

export const UploadDataset = () => {
  const { datasetMeta, setDatasetMeta, previewRows, setPreviewRows } = useApp();
  const fileInputRef = useRef(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDatasetMeta(prev => ({
        ...prev,
        name: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        fileType: file.name.endsWith('.xlsx') ? 'XLSX' : file.name.endsWith('.txt') ? 'TXT' : 'CSV'
      }));
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const loadSamplePreset = (preset) => {
    if (preset === 'amazon') {
      setDatasetMeta({
        name: 'Amazon Electronics Reviews',
        totalReviews: 35000,
        columns: 2,
        fileType: 'CSV',
        fileSize: '3.1 MB',
        positiveCount: 16800,
        negativeCount: 11200,
        neutralCount: 7000
      });
      setPreviewRows([
        { id: 1, text: 'Battery life is mindblowing, lasts for 2 full days!', label: 'Positive' },
        { id: 2, text: 'Defective screen on arrival, customer care refused return.', label: 'Negative' },
        { id: 3, text: 'Standard headphones, decent sound for this price tag.', label: 'Neutral' },
        { id: 4, text: 'Super fast charging and comfortable fit in ears.', label: 'Positive' },
        { id: 5, text: 'Plastic feels cheap, stopped working after 3 weeks.', label: 'Negative' }
      ]);
    } else if (preset === 'twitter') {
      setDatasetMeta({
        name: 'Twitter Sentiment Corpus',
        totalReviews: 25000,
        columns: 2,
        fileType: 'CSV',
        fileSize: '2.4 MB',
        positiveCount: 11500,
        negativeCount: 9200,
        neutralCount: 4300
      });
      setPreviewRows([
        { id: 1, text: 'Loving the new AI features launched today! Exciting times.', label: 'Positive' },
        { id: 2, text: 'Server is down again, pathetic service delivery.', label: 'Negative' },
        { id: 3, text: 'Attending the tech summit today in New Delhi.', label: 'Neutral' },
        { id: 4, text: 'Huge shoutout to the dev team for resolving my issue!', label: 'Positive' },
        { id: 5, text: 'Worst update ever, app crashes on startup constantly.', label: 'Negative' }
      ]);
    } else {
      // Default IMDb
      setDatasetMeta({
        name: 'Movie Reviews Dataset',
        totalReviews: 50000,
        columns: 2,
        fileType: 'CSV',
        fileSize: '4.2 MB',
        positiveCount: 22340,
        negativeCount: 18210,
        neutralCount: 9450
      });
      setPreviewRows([
        { id: 1, text: 'Amazing movie, loved it! The acting and visuals were top notch.', label: 'Positive' },
        { id: 2, text: 'Worst experience ever. Horrible pacing and bad dialogue.', label: 'Negative' },
        { id: 3, text: 'It was okay, not bad. Average storyline and decent music.', label: 'Neutral' },
        { id: 4, text: 'Great acting and incredible cinematography throughout.', label: 'Positive' },
        { id: 5, text: 'Boring and too long. I almost fell asleep in the second half.', label: 'Negative' }
      ]);
    }
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2500);
  };

  const filteredPreview = previewRows.filter(row =>
    row.text.toLowerCase().includes(filterQuery.toLowerCase()) ||
    row.label.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Upload Dataset</h1>
          <p className="page-description">
            Upload your review dataset (CSV, Excel or TXT format)
          </p>
        </div>

        {/* Preset quick switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => loadSamplePreset('imdb')}>
            IMDb (50k)
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => loadSamplePreset('amazon')}>
            Amazon (35k)
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => loadSamplePreset('twitter')}>
            Twitter (25k)
          </button>
        </div>
      </div>

      <div className="upload-grid">
        {/* Left Dropzone & Metadata */}
        <div>
          <div
            className="dropzone-container"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx,.txt"
              style={{ display: 'none' }}
            />
            <div className="dropzone-icon-box">
              <UploadCloud size={32} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '6px' }}>
              Drag and drop your file here
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginBottom: '16px' }}>
              Supports CSV, Excel (.xlsx), and TXT files
            </p>
            <button className="btn-primary" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Choose File
            </button>
          </div>

          {uploadSuccess && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                backgroundColor: '#d1fae5',
                color: '#065f46',
                borderRadius: '8px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600'
              }}
            >
              <Check size={16} />
              <span>Dataset "{datasetMeta.name}" loaded successfully!</span>
            </div>
          )}

          {/* 4 Mini Cards below dropzone */}
          <div className="upload-meta-grid">
            <div className="meta-mini-card">
              <div className="meta-mini-label">Total Reviews</div>
              <div className="meta-mini-val">{datasetMeta.totalReviews.toLocaleString()}</div>
            </div>
            <div className="meta-mini-card">
              <div className="meta-mini-label">Columns</div>
              <div className="meta-mini-val">{datasetMeta.columns}</div>
            </div>
            <div className="meta-mini-card">
              <div className="meta-mini-label">File Type</div>
              <div className="meta-mini-val" style={{ color: '#6366f1' }}>{datasetMeta.fileType}</div>
            </div>
            <div className="meta-mini-card">
              <div className="meta-mini-label">File Size</div>
              <div className="meta-mini-val">{datasetMeta.fileSize}</div>
            </div>
          </div>
        </div>

        {/* Right Dataset Preview Table */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
              Dataset Preview
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '8px' }}>
              <Search size={14} color="#94a3b8" />
              <input
                type="text"
                placeholder="Filter preview..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.82rem', width: '130px' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '75%' }}>Review Text</th>
                  <th style={{ width: '25%' }}>Label</th>
                </tr>
              </thead>
              <tbody>
                {filteredPreview.map((row) => (
                  <tr key={row.id}>
                    <td style={{ color: '#334155', fontWeight: '500' }}>{row.text}</td>
                    <td>
                      <span
                        className={`badge ${
                          row.label === 'Positive'
                            ? 'badge-positive'
                            : row.label === 'Negative'
                            ? 'badge-negative'
                            : 'badge-neutral'
                        }`}
                      >
                        {row.label}
                      </span>
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
