import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function TemplateManager() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    purpose: '',
    signatories: [''],
    brandingColors: { primary: '#D4AF37', secondary: '#1e3c72' }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await api.getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSignatoryChange = (index, value) => {
    const newSignatories = [...formData.signatories];
    newSignatories[index] = value;
    setFormData(prev => ({
      ...prev,
      signatories: newSignatories
    }));
  };

  const addSignatory = () => {
    setFormData(prev => ({
      ...prev,
      signatories: [...prev.signatories, '']
    }));
  };

  const removeSignatory = (index) => {
    if (formData.signatories.length > 1) {
      const newSignatories = formData.signatories.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        signatories: newSignatories
      }));
    }
  };

  const handleColorChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      brandingColors: {
        ...prev.brandingColors,
        [type]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Template name is required';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    if (formData.signatories.some(s => !s.trim())) {
      newErrors.signatories = 'All signatories must be filled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (editingTemplate) {
        await api.updateTemplate(editingTemplate.id, formData);
      } else {
        await api.createTemplate(formData);
      }
      
      setShowForm(false);
      setEditingTemplate(null);
      resetForm();
      loadTemplates();
    } catch (error) {
      alert('Error saving template: ' + error.message);
    }
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      organization: template.organization,
      purpose: template.purpose,
      signatories: [...template.signatories],
      brandingColors: { ...template.brandingColors }
    });
    setShowForm(true);
  };

  const handleDelete = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.deleteTemplate(templateId);
        loadTemplates();
      } catch (error) {
        alert('Error deleting template: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      organization: '',
      purpose: '',
      signatories: [''],
      brandingColors: { primary: '#D4AF37', secondary: '#1e3c72' }
    });
    setErrors({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTemplate(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="card-title">Template Management</h2>
            <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
              Create and manage receipt templates
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add Template
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Standard Receipt"
                  />
                  {errors.name && (
                    <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="organization" className="form-label">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-control"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g., St. Mary's Parish"
                  />
                  {errors.organization && (
                    <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                      {errors.organization}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="purpose" className="form-label">
                    Purpose *
                  </label>
                  <textarea
                    id="purpose"
                    name="purpose"
                    className="form-control"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Describe what this template is for"
                    rows="3"
                  />
                  {errors.purpose && (
                    <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                      {errors.purpose}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="form-group">
                  <label className="form-label">
                    Signatories *
                  </label>
                  {formData.signatories.map((signatory, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        className="form-control"
                        value={signatory}
                        onChange={(e) => handleSignatoryChange(index, e.target.value)}
                        placeholder="e.g., Fr. John Smith"
                      />
                      {formData.signatories.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeSignatory(index)}
                          style={{ padding: '8px 12px' }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addSignatory}
                    style={{ fontSize: '14px', padding: '8px 16px' }}
                  >
                    + Add Signatory
                  </button>
                  {errors.signatories && (
                    <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                      {errors.signatories}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Branding Colors
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Primary</label>
                      <input
                        type="color"
                        value={formData.brandingColors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', color: 'var(--dark-gray)' }}>Secondary</label>
                      <input
                        type="color"
                        value={formData.brandingColors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Templates List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {templates.map(template => (
          <div key={template.id} className="card" style={{ border: '1px solid var(--light-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
                  {template.name}
                </h4>
                <p style={{ color: 'var(--dark-gray)', marginBottom: '8px' }}>
                  <strong>Organization:</strong> {template.organization}
                </p>
                <p style={{ color: 'var(--dark-gray)', marginBottom: '8px' }}>
                  <strong>Purpose:</strong> {template.purpose}
                </p>
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--primary-blue)' }}>Signatories:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {template.signatories.map((signatory, index) => (
                      <span key={index} style={{
                        background: 'var(--light-gold)',
                        color: 'var(--primary-blue)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {signatory}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    background: template.brandingColors.primary,
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: '1px solid var(--dark-gray)'
                  }}></span>
                  <span style={{
                    background: template.brandingColors.secondary,
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: '1px solid var(--dark-gray)'
                  }}></span>
                  <span style={{ fontSize: '12px', color: 'var(--dark-gray)' }}>
                    Branding Colors
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(template)}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(template.id)}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {templates.length === 0 && !showForm && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dark-gray)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h3>No templates found</h3>
          <p>Create your first receipt template to get started</p>
        </div>
      )}
    </div>
  );
} 