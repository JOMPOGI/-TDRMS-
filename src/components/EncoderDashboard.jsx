import React from 'react';

export default function EncoderDashboard({ onNavigate }) {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Welcome, Encoder</h1>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Manage receipts and donations efficiently
        </p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => onNavigate('issueReceipt')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--primary-gold)',
              marginBottom: '16px'
            }}>
              📄
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Issue Receipt
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Create new donation or purchase receipts
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('receiptArchive')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--accent-blue)',
              marginBottom: '16px'
            }}>
              📁
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Receipt Archive
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              View and manage past receipts
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
              Verify receipt authenticity
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
          Quick Stats
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-green)' }}>15</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Receipts Today</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>₱45,000</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Amount</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-gold)' }}>3</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
} 