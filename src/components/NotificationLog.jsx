import React, { useState, useEffect } from 'react';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Receipt Created',
    message: 'Receipt RCP-2024-004 has been successfully created by Maria Santos',
    timestamp: '2024-01-18T10:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'info',
    title: 'System Update',
    message: 'New template "Special Event Receipt" has been added to the system',
    timestamp: '2024-01-18T09:15:00Z',
    read: true
  },
  {
    id: 3,
    type: 'warning',
    title: 'High Activity Alert',
    message: 'System has processed 15 receipts in the last hour',
    timestamp: '2024-01-18T08:45:00Z',
    read: false
  },
  {
    id: 4,
    type: 'error',
    title: 'Failed Receipt Generation',
    message: 'Failed to generate receipt RCP-2024-003 due to template error',
    timestamp: '2024-01-18T08:30:00Z',
    read: true
  },
  {
    id: 5,
    type: 'success',
    title: 'User Role Updated',
    message: 'User John Doe role has been changed from Viewer to Encoder',
    timestamp: '2024-01-18T07:20:00Z',
    read: true
  },
  {
    id: 6,
    type: 'info',
    title: 'Daily Report Generated',
    message: 'Daily financial report for January 17, 2024 has been generated',
    timestamp: '2024-01-17T23:59:00Z',
    read: true
  }
];

export default function NotificationLog() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [showRead, setShowRead] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, filterType, showRead, searchTerm]);

  const loadNotifications = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNotifications(mockNotifications);
    setIsLoading(false);
  };

  const filterNotifications = () => {
    let filtered = [...notifications];
    
    if (filterType) {
      filtered = filtered.filter(notification => notification.type === filterType);
    }
    
    if (!showRead) {
      filtered = filtered.filter(notification => !notification.read);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(term) ||
        notification.message.toLowerCase().includes(term)
      );
    }
    
    setFilteredNotifications(filtered);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌'
    };
    return icons[type] || '📢';
  };

  const getTypeColor = (type) => {
    const colors = {
      success: 'var(--success-green)',
      info: 'var(--accent-blue)',
      warning: 'var(--warning-orange)',
      error: 'var(--danger-red)'
    };
    return colors[type] || 'var(--dark-gray)';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="card-title">Notification Log</h2>
            <p style={{ color: 'var(--dark-gray)', margin: 0 }}>
              System notifications and alerts
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {getUnreadCount() > 0 && (
              <span style={{
                background: 'var(--danger-red)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getUnreadCount()} unread
              </span>
            )}
            <button
              className="btn btn-secondary"
              onClick={markAllAsRead}
              disabled={getUnreadCount() === 0}
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Search</label>
            <input
              type="text"
              className="search-input"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div>
            <label className="form-label">Status</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={showRead}
                  onChange={(e) => setShowRead(e.target.checked)}
                />
                Show Read
              </label>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--dark-gray)' }}>
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''} found
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFilterType('');
              setShowRead(true);
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dark-gray)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
          <h3>No notifications found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className="card"
              style={{
                border: notification.read ? '1px solid var(--light-gray)' : '2px solid var(--primary-gold)',
                background: notification.read ? 'white' : 'var(--light-gold)',
                opacity: notification.read ? 0.8 : 1
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                  <div style={{
                    fontSize: '24px',
                    color: getTypeColor(notification.type)
                  }}>
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <h4 style={{
                        color: 'var(--primary-blue)',
                        margin: 0,
                        fontSize: '16px'
                      }}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span style={{
                          background: 'var(--danger-red)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          NEW
                        </span>
                      )}
                    </div>
                    
                    <p style={{
                      color: 'var(--dark-gray)',
                      margin: '4px 0 8px 0',
                      fontSize: '14px'
                    }}>
                      {notification.message}
                    </p>
                    
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>🕒 {formatTimestamp(notification.timestamp)}</span>
                      <span style={{
                        background: getTypeColor(notification.type),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        textTransform: 'uppercase'
                      }}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '4px' }}>
                  {!notification.read && (
                    <button
                      className="btn"
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        background: 'var(--accent-blue)',
                        color: 'white'
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                    onClick={() => deleteNotification(notification.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Notification Types Info */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--light-gold)',
        borderRadius: '8px',
        border: '1px solid var(--primary-gold)'
      }}>
        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>
          Notification Types
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: 'var(--success-green)' }}>✅ Success:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Successful operations like receipt creation, user updates
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--accent-blue)' }}>ℹ️ Info:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              General information, system updates, reports generated
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--warning-orange)' }}>⚠️ Warning:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              System alerts, high activity, potential issues
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--danger-red)' }}>❌ Error:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--dark-gray)' }}>
              Failed operations, system errors, critical issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 