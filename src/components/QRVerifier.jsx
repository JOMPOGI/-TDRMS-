import React, { useState } from 'react';
import { api } from '../services/api';

export default function ReceiptVerifier() {
  const [verificationData, setVerificationData] = useState({
    receiptNumber: '',
    donorName: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const verifyReceipt = async () => {
    if (!verificationData.receiptNumber.trim()) {
      setError('Receipt number is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      // Simulate API call to verify receipt
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification logic
      const mockReceipts = [
        {
          id: 'RCP-2024-001',
          donorName: 'Juan Dela Cruz',
          amount: 5000.00,
          date: '2024-01-15',
          paymentType: 'Donation',
          template: 'Standard Receipt',
          description: 'Monthly church donation',
          contactInfo: 'juan@email.com',
          issuedBy: 'Maria Santos'
        },
        {
          id: 'RCP-2024-002',
          donorName: 'Maria Garcia',
          amount: 2500.00,
          date: '2024-01-16',
          paymentType: 'Membership Fee',
          template: 'Membership Receipt',
          description: 'Annual membership renewal',
          contactInfo: 'maria@email.com',
          issuedBy: 'Maria Santos'
        },
        {
          id: 'RCP-2024-003',
          donorName: 'Pedro Santos',
          amount: 1000.00,
          date: '2024-01-17',
          paymentType: 'Purchase',
          template: 'Event Receipt',
          description: 'Event ticket purchase',
          contactInfo: 'pedro@email.com',
          issuedBy: 'Maria Santos'
        }
      ];

      const receipt = mockReceipts.find(r => 
        r.id.toLowerCase() === verificationData.receiptNumber.toLowerCase()
      );

      if (!receipt) {
        throw new Error('Receipt not found');
      }

      // Additional verification if donor name and amount are provided
      if (verificationData.donorName && receipt.donorName.toLowerCase() !== verificationData.donorName.toLowerCase()) {
        throw new Error('Donor name does not match');
      }

      if (verificationData.amount && parseFloat(verificationData.amount) !== receipt.amount) {
        throw new Error('Amount does not match');
      }

      setVerificationResult(receipt);
    } catch (error) {
      setError(error.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Receipt Verification</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Verify receipt authenticity using receipt details
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Verification Form */}
        <div>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
            📄 Receipt Verification
          </h3>
          
          <div className="form-group">
            <label htmlFor="receiptNumber" className="form-label">
              Receipt Number *
            </label>
            <input
              type="text"
              id="receiptNumber"
              name="receiptNumber"
              className="form-control"
              value={verificationData.receiptNumber}
              onChange={handleChange}
              placeholder="e.g., RCP-2024-001"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="donorName" className="form-label">
              Donor Name (Optional)
            </label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              className="form-control"
              value={verificationData.donorName}
              onChange={handleChange}
              placeholder="Enter donor name for additional verification"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (Optional)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              value={verificationData.amount}
              onChange={handleChange}
              placeholder="Enter amount for additional verification"
              step="0.01"
              min="0"
            />
          </div>
          
          <button
            className="btn btn-primary"
            onClick={verifyReceipt}
            disabled={isLoading}
            style={{ width: '100%', marginTop: '16px' }}
          >
            {isLoading ? 'Verifying...' : 'Verify Receipt'}
          </button>
          
          {error && (
            <div className="error-message" style={{ marginTop: '16px' }}>
              {error}
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
            ℹ️ How to Verify
          </h3>
          
          <div style={{
            padding: '20px',
            background: 'var(--light-gold)',
            borderRadius: '12px',
            border: '1px solid var(--primary-gold)'
          }}>
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
              Verification Steps:
            </h4>
            <ol style={{ color: 'var(--dark-gray)', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>Enter the receipt number (required)</li>
              <li>Optionally enter donor name for additional verification</li>
              <li>Optionally enter amount for additional verification</li>
              <li>Click "Verify Receipt" to check authenticity</li>
            </ol>
            
            <div style={{ marginTop: '16px', padding: '12px', background: 'white', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-blue)' }}>Test Receipt Numbers:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '14px', color: 'var(--dark-gray)' }}>
                <li>RCP-2024-001</li>
                <li>RCP-2024-002</li>
                <li>RCP-2024-003</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Verification Result */}
      {verificationResult && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ color: 'var(--success-green)', marginBottom: '16px' }}>
            ✅ Verification Successful
          </h3>
          
          <div className="receipt">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div className="receipt-number">{verificationResult.id}</div>
                <div className="receipt-date">{formatDate(verificationResult.date)}</div>
              </div>
              <div className="receipt-amount">{formatAmount(verificationResult.amount)}</div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '4px' }}>
                {verificationResult.donorName}
              </div>
              <div style={{ color: 'var(--dark-gray)', fontSize: '14px', marginBottom: '8px' }}>
                {verificationResult.contactInfo}
              </div>
              <div style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
                {verificationResult.description}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'var(--accent-blue)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {verificationResult.paymentType}
                </span>
                <span style={{
                  background: 'var(--light-gold)',
                  color: 'var(--primary-blue)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {verificationResult.template}
                </span>
                <span style={{
                  background: 'var(--success-green)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  VERIFIED
                </span>
              </div>
              
              <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>
                Issued by: {verificationResult.issuedBy}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Security Info */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
          🔒 Security Features
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>📄 Receipt Number:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Unique identifier for each receipt
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>👤 Donor Verification:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Cross-check donor name for additional security
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>💰 Amount Verification:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Verify the exact amount for fraud prevention
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 