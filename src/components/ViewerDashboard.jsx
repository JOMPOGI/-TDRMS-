import React from 'react';

export default function ViewerDashboard({ onNavigate }) {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Welcome, Viewer</h1>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Access and verify receipt information
        </p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => onNavigate('receiptAccessForm')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--accent-blue)',
              marginBottom: '16px'
            }}>
              📄
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Receipt Access
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Search and access receipt information
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('qrVerify')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--success-green)',
              marginBottom: '16px'
            }}>
              🔍
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Receipt Verification
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Verify receipt authenticity using receipt details
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
          Quick Access
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>3</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Available Receipts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-green)' }}>₱8,500</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Value</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-gold)' }}>100%</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Verified</div>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
          How to Use
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>📄 Receipt Access:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>Search by receipt number or donor name</li>
              <li>View receipt details and download</li>
              <li>Access QR codes for verification</li>
            </ul>
          </div>
                      <div>
              <strong style={{ color: 'var(--primary-blue)' }}>🔍 Receipt Verification:</strong>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
                <li>Enter receipt number to verify</li>
                <li>Add donor name for additional security</li>
                <li>Verify amount for fraud prevention</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
} 