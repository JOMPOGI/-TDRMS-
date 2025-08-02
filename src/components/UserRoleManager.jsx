import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const ROLES = ['viewer', 'encoder', 'admin'];

export default function UserRoleManager() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUser(userId);
    setSuccessMessage('');
    
    try {
      await api.updateUserRole(userId, newRole);
      setSuccessMessage(`User role updated successfully to ${newRole}`);
      loadUsers(); // Reload to get updated data
    } catch (error) {
      alert('Error updating user role: ' + error.message);
    } finally {
      setUpdatingUser(null);
    }
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      viewer: 'Viewer',
      encoder: 'Encoder',
      admin: 'Administrator'
    };
    return roleNames[role] || role;
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      viewer: 'Can view and download receipts, verify QR codes',
      encoder: 'Can issue receipts, view archives, verify QR codes',
      admin: 'Full system access including user management and templates'
    };
    return descriptions[role] || '';
  };

  const getRoleColor = (role) => {
    const colors = {
      viewer: 'var(--accent-blue)',
      encoder: 'var(--primary-gold)',
      admin: 'var(--danger-red)'
    };
    return colors[role] || 'var(--dark-gray)';
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">User Role Management</h2>
        <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
          Manage user roles and permissions
        </p>
      </div>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
          Role Descriptions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {ROLES.map(role => (
            <div key={role} className="card" style={{ border: '1px solid var(--light-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  background: getRoleColor(role),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginRight: '8px'
                }}>
                  {getRoleDisplayName(role)}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--dark-gray)', margin: 0 }}>
                {getRoleDescription(role)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
          System Users
        </h3>
        
        <div className="table">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Current Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dark-gray)' }}>
                        ID: {user.id}
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style={{
                      background: 'var(--light-gray)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {user.username}
                    </code>
                  </td>
                  <td>
                    <span style={{
                      background: getRoleColor(user.role),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select
                        className="form-select"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={updatingUser === user.id}
                        style={{ minWidth: '120px', fontSize: '14px' }}
                      >
                        {ROLES.map(role => (
                          <option key={role} value={role}>
                            {getRoleDisplayName(role)}
                          </option>
                        ))}
                      </select>
                      
                      {updatingUser === user.id && (
                        <div style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>
                          Updating...
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          Role Permissions Summary
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Viewer:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>Search and view receipts</li>
              <li>Download receipts</li>
              <li>Verify QR codes</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Encoder:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>All Viewer permissions</li>
              <li>Issue new receipts</li>
              <li>Manage receipt archive</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-blue)' }}>Admin:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: 'var(--dark-gray)' }}>
              <li>All Encoder permissions</li>
              <li>Manage templates</li>
              <li>Manage user roles</li>
              <li>Generate reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 