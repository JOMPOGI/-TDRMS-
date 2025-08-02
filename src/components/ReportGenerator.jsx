import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ReportGenerator() {
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState('summary');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);

  useEffect(() => {
    loadReceipts();
  }, []);

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
    
    if (dateFrom) {
      filtered = filtered.filter(receipt => receipt.date >= dateFrom);
    }
    
    if (dateTo) {
      filtered = filtered.filter(receipt => receipt.date <= dateTo);
    }
    
    if (paymentTypeFilter) {
      filtered = filtered.filter(receipt => receipt.paymentType === paymentTypeFilter);
    }
    
    return filtered;
  };

  const generateReport = () => {
    const filteredReceipts = filterReceipts();
    
    if (filteredReceipts.length === 0) {
      alert('No receipts found for the selected criteria');
      return;
    }
    
    const report = {
      type: reportType,
      dateRange: { from: dateFrom, to: dateTo },
      totalReceipts: filteredReceipts.length,
      totalAmount: filteredReceipts.reduce((sum, r) => sum + r.amount, 0),
      paymentTypeBreakdown: {},
      templateBreakdown: {},
      monthlyBreakdown: {},
      topDonors: [],
      generatedAt: new Date().toISOString()
    };
    
    // Payment type breakdown
    filteredReceipts.forEach(receipt => {
      report.paymentTypeBreakdown[receipt.paymentType] = 
        (report.paymentTypeBreakdown[receipt.paymentType] || 0) + receipt.amount;
    });
    
    // Template breakdown
    filteredReceipts.forEach(receipt => {
      report.templateBreakdown[receipt.template] = 
        (report.templateBreakdown[receipt.template] || 0) + 1;
    });
    
    // Monthly breakdown
    filteredReceipts.forEach(receipt => {
      const month = new Date(receipt.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      report.monthlyBreakdown[month] = (report.monthlyBreakdown[month] || 0) + receipt.amount;
    });
    
    // Top donors
    const donorTotals = {};
    filteredReceipts.forEach(receipt => {
      donorTotals[receipt.donorName] = (donorTotals[receipt.donorName] || 0) + receipt.amount;
    });
    
    report.topDonors = Object.entries(donorTotals)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    
    setGeneratedReport(report);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const handleDownload = () => {
    if (!generatedReport) return;
    
    console.log('Downloading report:', generatedReport);
    alert('Report download initiated');
  };

  const getPaymentTypes = () => {
    const types = [...new Set(receipts.map(r => r.paymentType))];
    return types;
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Report Generator</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Generate financial reports and analytics
        </p>
      </div>
      
      {/* Report Configuration */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
          Report Configuration
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div>
            <label className="form-label">Report Type</label>
            <select
              className="form-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="payment-type">Payment Type Analysis</option>
              <option value="monthly">Monthly Breakdown</option>
              <option value="donor">Top Donors Report</option>
            </select>
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
            <label className="form-label">Payment Type Filter</label>
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
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <button
            className="btn btn-primary"
            onClick={generateReport}
            style={{ marginRight: '12px' }}
          >
            Generate Report
          </button>
          
          {generatedReport && (
            <button
              className="btn btn-secondary"
              onClick={handleDownload}
            >
              📥 Download Report
            </button>
          )}
        </div>
      </div>
      
      {/* Generated Report */}
      {generatedReport && (
        <div>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
            Generated Report
          </h3>
          
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-green)' }}>
                  {generatedReport.totalReceipts}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Receipts</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                  {formatAmount(generatedReport.totalAmount)}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Total Amount</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-gold)' }}>
                  {Object.keys(generatedReport.paymentTypeBreakdown).length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Payment Types</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--warning-orange)' }}>
                  {Object.keys(generatedReport.templateBreakdown).length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Templates Used</div>
              </div>
            </div>
          </div>
          
          {/* Payment Type Breakdown */}
          <div className="card" style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
              Payment Type Breakdown
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(generatedReport.paymentTypeBreakdown).map(([type, amount]) => (
                <div key={type} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  background: 'var(--light-gray)',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>
                    {type}
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--success-green)' }}>
                    {formatAmount(amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Monthly Breakdown */}
          <div className="card" style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
              Monthly Breakdown
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(generatedReport.monthlyBreakdown).map(([month, amount]) => (
                <div key={month} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  background: 'var(--light-gold)',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>
                    {month}
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                    {formatAmount(amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Donors */}
          <div className="card">
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>
              Top Donors
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {generatedReport.topDonors.map((donor, index) => (
                <div key={donor.name} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  background: index === 0 ? 'var(--primary-gold)' : 'var(--light-gray)',
                  borderRadius: '4px',
                  color: index === 0 ? 'var(--primary-blue)' : 'inherit'
                }}>
                  <span style={{ fontWeight: '600' }}>
                    {index + 1}. {donor.name}
                  </span>
                  <span style={{ fontWeight: 'bold', color: index === 0 ? 'var(--primary-blue)' : 'var(--success-green)' }}>
                    {formatAmount(donor.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Report Types Info */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
          Report Types
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Summary Report:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Overview of total receipts, amounts, and key metrics
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Detailed Report:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Complete breakdown with all receipt details
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Payment Type Analysis:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Analysis by donation type and payment method
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Monthly Breakdown:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Revenue trends and monthly comparisons
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Top Donors Report:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              List of highest contributing donors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 