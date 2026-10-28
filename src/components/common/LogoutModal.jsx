import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut } from 'lucide-react';

export const LogoutModal = () => {
  const { showLogoutModal, setShowLogoutModal, handleLogout } = useApp();

  if (!showLogoutModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <LogOut size={28} />
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>
          Logout
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '24px' }}>
          Are you sure you want to logout?
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            className="btn-secondary"
            style={{ width: '120px' }}
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn-danger"
            style={{ width: '120px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
