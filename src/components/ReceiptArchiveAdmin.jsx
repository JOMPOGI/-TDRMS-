import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ReceiptArchiveAdmin() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('');
  const [templateFilter, setTemplateFilter] = useState('');

  useEffect(() => {
    loadReceipts();
  }, []);

  useEffect(() => {
    filterReceipts();
  }, [receipts, searchTerm, dateFrom, dateTo, paymentTypeFilter, templateFilter]);

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
    let filtered = [...receipts];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(receipt =>
        receipt.donorName.toLowerCase().includes(term) ||
        receipt.id.toLowerCase().includes(term) ||
        receipt.description.toLowerCase().includes(term) ||
        receipt.issuedBy.toLowerCase().includes(term)
      );
    }
    
    if (dateFrom) {
      filtered = filtered.filter(receipt => receipt.date >= dateFrom);
    }
    
    if (dateTo) {
      filtered = filtered.filter(receipt => receipt.date <= dateTo);
    }
    
    if (paymentTypeFilter) {
      filtered = filtered.filter(receipt => receipt.paymentType === paymentTypeFilter);
    }
    
    if (templateFilter) {
      filtered = filtered.filter(receipt => receipt.template === templateFilter);
    }
    
    setFilteredReceipts(filtered);
  };

  const handleDownload = (receipt) => {
    console.log('Downloading receipt:', receipt.id);
    alert(`Receipt ${receipt.id} download initiated`);
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

  const getPaymentTypes = () => {
    const types = [...new Set(receipts.map(r => r.paymentType))];
    return types;
  };

  const getTemplates = () => {
    const templates = [...new Set(receipts.map(r => r.template))];
    return templates;
  };

  const getTotalAmount = () => {
    return filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
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
        <h2 className="card-title">Receipt Archive (Admin)</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          View and manage all system receipts
        </p>
      </div>
      
      {/* Advanced Search and Filter */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Search</label>
            <input
              type="text"
              className="search-input"
              placeholder="Search by donor, receipt ID, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Date From</label>
            <input
              type="date"
              className="form-control"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Date To</label>
            <input
              type="date"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Payment Type</label>
            <select
              className="form-select"
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {getPaymentTypes().map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Template</label>
            <select
              className="form-select"
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
            >
              <option value="">All Templates</option>
              {getTemplates().map(template => (
                <option key={template} value={template}>{template}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--dark-gray)' }}>
            {filteredReceipts.length} receipt{filteredReceipts.length !== 1 ? 's' : ''} found
            {getTotalAmount() > 0 && (
              <span style={{ marginLeft: '16px', fontWeight: 'bold', color: 'var(--success-green)' }}>
                Total: {formatAmount(getTotalAmount())}
              </span>
            )}
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setDateFrom('');
              setDateTo('');
              setPaymentTypeFilter('');
              setTemplateFilter('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Receipts List */}
      {filteredReceipts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dark-gray)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <h3>No receipts found</h3>
          <p>Try adjusting your search criteria</p>
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
                    {receipt.issuedBy}
                  </span>
                  {receipt.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'var(--light-gray)',
                      color: 'var(--dark-gray)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {tag}
                    </span>
                  ))}
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
                    onClick={() => {
                      console.log('Viewing receipt details:', receipt.id);
                      alert(`Receipt Number: ${receipt.id}\nDonor: ${receipt.donorName}\nAmount: ₱${receipt.amount.toLocaleString()}`);
                    }}
                  >
                    🔍 Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Summary Statistics */}
      {filteredReceipts.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--light-gold)',
          borderRadius: '8px',
          border: '1px solid var(--primary-gold)'
        }}>
          <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
            Summary Statistics
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-green)' }}>
                {filteredReceipts.length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Receipts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                {formatAmount(getTotalAmount())}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Amount</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-gold)' }}>
                {getPaymentTypes().length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Payment Types</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--warning-orange)' }}>
                {getTemplates().length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Templates Used</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 