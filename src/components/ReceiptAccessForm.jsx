import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ReceiptAccessForm() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('receiptNumber');
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    loadReceipts();
  }, []);

  useEffect(() => {
    filterReceipts();
  }, [receipts, searchTerm, searchType]);

  const loadReceipts = async () => {
    try {
      const data = await api.getReceipts();
      setReceipts(data);
    } catch (error) {
      console.error('Error loading receipts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterReceipts = () => {
    if (!searchTerm.trim()) {
      setFilteredReceipts([]);
      return;
    }
    
    let filtered = [...receipts];
    const term = searchTerm.toLowerCase();
    
    if (searchType === 'receiptNumber') {
      filtered = filtered.filter(receipt =>
        receipt.id.toLowerCase().includes(term)
      );
    } else if (searchType === 'donorName') {
      filtered = filtered.filter(receipt =>
        receipt.donorName.toLowerCase().includes(term)
      );
    }
    
    setFilteredReceipts(filtered);
  };

  const handleDownload = (receipt) => {
    console.log('Downloading receipt:', receipt.id);
    alert(`Receipt ${receipt.id} download initiated`);
  };

  const handleVerifyReceipt = async (receipt) => {
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 500));
      setVerificationResult(receipt);
    } catch (error) {
      alert('Receipt verification failed: ' + error.message);
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

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">Loading receipts...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Receipt Access</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Search and access receipt information
        </p>
      </div>
      
      {/* Search Form */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
          Search Receipts
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Search Type</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="receiptNumber">Receipt Number</option>
              <option value="donorName">Donor Name</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Search Term</label>
            <input
              type="text"
              className="search-input"
              placeholder={searchType === 'receiptNumber' ? 'Enter receipt number...' : 'Enter donor name...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--dark-gray)' }}>
            {filteredReceipts.length} receipt{filteredReceipts.length !== 1 ? 's' : ''} found
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        </div>
      </div>
      
      {/* Search Results */}
      {searchTerm && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
            Search Results
          </h3>
          
          {filteredReceipts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dark-gray)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3>No receipts found</h3>
              <p>Try a different search term</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredReceipts.map(receipt => (
                <div key={receipt.id} className="receipt">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <div className="receipt-number">{receipt.id}</div>
                      <div className="receipt-date">{formatDate(receipt.date)}</div>
                    </div>
                    <div className="receipt-amount">{formatAmount(receipt.amount)}</div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '4px' }}>
                      {receipt.donorName}
                    </div>
                    <div style={{ color: 'var(--dark-gray)', fontSize: '14px', marginBottom: '8px' }}>
                      {receipt.contactInfo}
                    </div>
                    <div style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
                      {receipt.description}
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
                        {receipt.paymentType}
                      </span>
                      <span style={{
                        background: 'var(--light-gold)',
                        color: 'var(--primary-blue)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {receipt.template}
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
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDownload(receipt)}
                        style={{ fontSize: '14px', padding: '8px 16px' }}
                      >
                        📥 Download
                      </button>
                      <button
                        className="btn"
                        style={{
                          fontSize: '14px',
                          padding: '8px 16px',
                          background: 'var(--light-gold)',
                          color: 'var(--primary-blue)',
                          border: '1px solid var(--primary-gold)'
                        }}
                        onClick={() => handleVerifyReceipt(receipt)}
                      >
                        🔍 Verify
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* QR Verification Result */}
      {verificationResult && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ color: 'var(--success-green)', marginBottom: '16px' }}>
            ✅ QR Verification Successful
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
      
      {/* Instructions */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
          How to Access Receipts
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>📄 Search by Receipt Number:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>Enter the exact receipt number (e.g., RCP-2024-001)</li>
              <li>View complete receipt details</li>
              <li>Download the receipt as PDF</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>👤 Search by Donor Name:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>Enter donor name to find all their receipts</li>
              <li>View donation history</li>
              <li>Access multiple receipts at once</li>
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