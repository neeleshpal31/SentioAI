import React from 'react';
import { useApp } from '../context/AppContext';
import { DownloadCloud, Eye, Trash2, FileText, CheckCircle2 } from 'lucide-react';

export const SavedResults = () => {
  const { savedFiles, deleteSavedFile } = useApp();

  const handleDownload = (file) => {
    let content = '';
    let mimeType = 'text/plain';

    if (file.type === 'CSV') {
      content = 'id,review,sentiment,confidence\n1,"Amazing movie, loved it!",Positive,0.96\n2,"Worst experience ever.",Negative,0.95\n3,"It was okay, not bad.",Neutral,0.78\n';
      mimeType = 'text/csv';
    } else if (file.type === 'JSON') {
      content = JSON.stringify({
        project: 'SentioAI - NLP Review Intelligence',
        evaluator: 'MCA 3rd Semester NLP Project',
        accuracy: 0.923,
        precision: 0.91,
        recall: 0.93,
        f1_score: 0.92,
        dataset_size: 50000,
        best_model: 'LSTM'
      }, null, 2);
      mimeType = 'application/json';
    } else {
      content = 'SENTIOAI_MODEL_WEIGHTS_BINARY_BLOB_HDF5_CHECKPOINT_VERSION_3';
      mimeType = 'application/octet-stream';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">Saved Results</h1>
          <p className="page-description">
            View and export your analysis results, trained models, and reports
          </p>
        </div>
      </div>

      {/* Main Files Table Card */}
      <div className="content-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>File Name</th>
                <th style={{ width: '18%' }}>Type</th>
                <th style={{ width: '22%' }}>Date</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: file.type === 'CSV' ? '#d1fae5' : file.type === 'Model' ? '#e0e7ff' : '#fee2e2',
                          color: file.type === 'CSV' ? '#059669' : file.type === 'Model' ? '#4f46e5' : '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <FileText size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{file.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{file.size} • {file.rows}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: file.type === 'CSV' ? '#ecfdf5' : file.type === 'Model' ? '#ede9fe' : '#fef2f2',
                        color: file.type === 'CSV' ? '#059669' : file.type === 'Model' ? '#6d28d9' : '#dc2626',
                        border: '1px solid currentColor'
                      }}
                    >
                      {file.type}
                    </span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.88rem' }}>{file.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        className="icon-badge-btn"
                        style={{ width: '32px', height: '32px', color: '#2563eb' }}
                        onClick={() => handleDownload(file)}
                        title="Download file"
                      >
                        <DownloadCloud size={16} />
                      </button>
                      <button
                        className="icon-badge-btn"
                        style={{ width: '32px', height: '32px', color: '#059669' }}
                        onClick={() => alert(`Viewing metadata for ${file.name}:\nSize: ${file.size}\nStatus: Verified\nFormat: ${file.type}`)}
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="icon-badge-btn"
                        style={{ width: '32px', height: '32px', color: '#ef4444' }}
                        onClick={() => deleteSavedFile(file.id)}
                        title="Delete file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
