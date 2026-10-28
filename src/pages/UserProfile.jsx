import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Shield, Check, Camera } from 'lucide-react';

export const UserProfile = () => {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    }));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <h1 className="page-title">User Profile</h1>
          <p className="page-description">
            Manage your personal credentials and academic project settings
          </p>
        </div>
      </div>

      <div className="upload-grid" style={{ gridTemplateColumns: '0.8fr 1.2fr' }}>
        {/* Left Column: Avatar & Summary Card */}
        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '36px 24px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)'
              }}
            >
              {user.avatar || 'NP'}
            </div>
            <button
              type="button"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
              onClick={() => alert('Profile photo upload dialog')}
              title="Upload new photo"
            >
              <Camera size={15} color="#475569" />
            </button>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
            {user.name}
          </h2>
          <p style={{ color: '#6366f1', fontSize: '0.86rem', fontWeight: '600', marginTop: '2px' }}>
            {user.role}
          </p>
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
            {user.university}
          </span>

          <div style={{ marginTop: '24px', width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <button
              className="btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={() => alert('Profile photo upload ready')}
            >
              Change Profile Picture
            </button>
          </div>
        </div>

        {/* Right Column: Profile Form Card (Matching Screenshot 12) */}
        <div className="content-card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
            Account Credentials
          </h2>

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password (Leave blank to keep unchanged)</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {saveToast && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}
              >
                <Check size={16} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ padding: '11px 24px' }}>
              <span>Update Profile</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
