import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';

const PAYMENT_TYPES = ['Donation', 'Membership Fee', 'Purchase'];
const PRESET_TEMPLATES = ['Standard Receipt', 'Membership Receipt', 'Event Receipt'];
const DONATION_CATEGORIES = ['Church', 'Charity', 'Education', 'Medical', 'Disaster Relief', 'Community', 'Monthly', 'Annual', 'Special Event'];

export default function ReceiptForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    paymentType: '',
    template: '',
    donorName: '',
    contactInfo: '',
    amount: '',
    description: '',
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.paymentType) {
      newErrors.paymentType = 'Payment type is required';
    }
    
    if (!formData.template) {
      newErrors.template = 'Template is required';
    }
    
    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Donor name is required';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const receiptData = {
        ...formData,
        amount: parseFloat(formData.amount),
        issuedBy: user.name
      };
      
      const receipt = await api.createReceipt(receiptData);
      setGeneratedReceipt(receipt);
      setShowSuccessModal(true);
    } catch (error) {
      alert('Error creating receipt: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onSuccess();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Issue Receipt</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Create a new donation or purchase receipt
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <div className="form-group">
              <label htmlFor="paymentType" className="form-label">
                Payment Type *
              </label>
              <select
                id="paymentType"
                name="paymentType"
                className="form-select"
                value={formData.paymentType}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Select payment type</option>
                {PAYMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.paymentType && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.paymentType}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="template" className="form-label">
                Receipt Template *
              </label>
              <select
                id="template"
                name="template"
                className="form-select"
                value={formData.template}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Select template</option>
                {PRESET_TEMPLATES.map(template => (
                  <option key={template} value={template}>{template}</option>
                ))}
              </select>
              {errors.template && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.template}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="donorName" className="form-label">
                Donor/Purchaser Name *
              </label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                className="form-control"
                value={formData.donorName}
                onChange={handleChange}
                placeholder="Enter full name"
                disabled={isLoading}
              />
              {errors.donorName && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.donorName}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="contactInfo" className="form-label">
                Contact Information *
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                className="form-control"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Email or phone number"
                disabled={isLoading}
              />
              {errors.contactInfo && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.contactInfo}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Amount (₱) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
              {errors.amount && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.amount}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the donation or purchase"
                rows="4"
                disabled={isLoading}
              />
              {errors.description && (
                <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                  {errors.description}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Tags/Categories
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add custom tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleTagAdd}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Add
                </button>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {DONATION_CATEGORIES.map(category => (
                  <button
                    key={category}
                    type="button"
                    className="btn"
                    style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      background: formData.tags.includes(category) ? 'var(--primary-gold)' : 'var(--light-gray)',
                      color: formData.tags.includes(category) ? 'var(--primary-blue)' : 'var(--dark-gray)',
                      border: '1px solid var(--primary-gold)'
                    }}
                    onClick={() => {
                      if (formData.tags.includes(category)) {
                        handleTagRemove(category);
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, category]
                        }));
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {formData.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--primary-gold)',
                        color: 'var(--primary-blue)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-blue)',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ minWidth: '200px' }}
          >
            {isLoading ? 'Creating Receipt...' : 'Issue Receipt'}
          </button>
        </div>
      </form>
      
      {/* Success Modal */}
      {showSuccessModal && generatedReceipt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                color: 'var(--success-green)',
                marginBottom: '16px'
              }}>
                ✅
              </div>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
                Receipt Created Successfully!
              </h3>
              <p style={{ color: 'var(--dark-gray)', marginBottom: '24px' }}>
                The receipt has been issued and saved to the archive.
              </p>
              
              {/* Receipt Preview with QR Code */}
              <div style={{
                background: 'white',
                border: '2px solid var(--primary-gold)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                      {generatedReceipt.id}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--success-green)' }}>
                    ₱{parseFloat(generatedReceipt.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '4px' }}>
                    {generatedReceipt.donorName}
                  </div>
                  <div style={{ color: 'var(--dark-gray)', fontSize: '14px', marginBottom: '8px' }}>
                    {generatedReceipt.contactInfo}
                  </div>
                  <div style={{ color: 'var(--dark-gray)', fontSize: '14px' }}>
                    {generatedReceipt.description}
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
                      {generatedReceipt.paymentType}
                    </span>
                    <span style={{
                      background: 'var(--light-gold)',
                      color: 'var(--primary-blue)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {generatedReceipt.template}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>
                    Issued by: {generatedReceipt.issuedBy}
                  </div>
                </div>
                
                {/* QR Code */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                  padding: '16px',
                  background: 'var(--light-gray)',
                  borderRadius: '8px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <QRCodeSVG
                      value={JSON.stringify({
                        receiptId: generatedReceipt.id,
                        donorName: generatedReceipt.donorName,
                        amount: generatedReceipt.amount,
                        date: new Date().toISOString(),
                        issuedBy: generatedReceipt.issuedBy
                      })}
                      size={120}
                      level="M"
                      includeMargin={true}
                    />
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      marginTop: '8px'
                    }}>
                      Scan to verify receipt
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                className="btn btn-primary"
                onClick={handleSuccessClose}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 