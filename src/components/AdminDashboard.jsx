import React from 'react';

export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Admin Dashboard</h1>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Manage system settings, templates, and user roles
        </p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => onNavigate('templateManager')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--primary-gold)',
              marginBottom: '16px'
            }}>
              📋
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Template Management
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Create and manage receipt templates
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('userRoleManager')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--accent-blue)',
              marginBottom: '16px'
            }}>
              👥
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              User Management
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Manage user roles and permissions
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('receiptArchive')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--success-green)',
              marginBottom: '16px'
            }}>
              📁
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Receipt Archive
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              View all system receipts
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('reportGenerator')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--warning-orange)',
              marginBottom: '16px'
            }}>
              📊
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Reports
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              Generate financial reports
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('notificationLog')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--danger-red)',
              marginBottom: '16px'
            }}>
              🔔
            </div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Notifications
            </h3>
            <p style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
              View system notifications
            </p>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => onNavigate('qrVerify')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--secondary-blue)',
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
          System Overview
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-green)' }}>3</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Active Templates</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>3</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>System Users</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-gold)' }}>₱8,500</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Revenue</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--warning-orange)' }}>15</div>
            <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Receipts Today</div>
          </div>
        </div>
      </div>
    </div>
  );
} 