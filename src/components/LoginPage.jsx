import React, { useState } from 'react';
import { api } from '../services/api';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await api.login(formData.username, formData.password);
      onLogin(response.user);
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div className="card-header">
          <h1 style={{
            color: 'var(--primary-blue)',
            fontSize: '28px',
            marginBottom: '8px'
          }}>
            TDRMS
          </h1>
          <p style={{
            color: 'var(--dark-gray)',
            fontSize: '16px',
            margin: 0
          }}>
            Smart Transaction and Donation Receipt Management System
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {errors.username && (
              <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                {errors.username}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <div className="error-message" style={{ fontSize: '14px', marginTop: '4px' }}>
                {errors.password}
              </div>
            )}
          </div>
          
          {loginError && (
            <div className="error-message">
              {loginError}
            </div>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: '100%', marginTop: '20px' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Forgot password functionality would be implemented here.');
            }}
            style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            Forgot password?
          </a>
        </div>
        
        <div style={{
          marginTop: '30px',
          padding: '16px',
          background: 'var(--light-gold)',
          borderRadius: '8px',
          fontSize: '14px',
          color: 'var(--primary-blue)'
        }}>
          <strong>Test Accounts:</strong><br />
          Admin: admin / admin123<br />
          Encoder: encoder / encoder123<br />
          Viewer: viewer / viewer123
        </div>
      </div>
    </div>
  );
} 