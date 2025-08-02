import React, { useState } from 'react';

import LoginPage from './components/LoginPage';

import EncoderDashboard from './components/EncoderDashboard';
import ReceiptForm from './components/ReceiptForm';
import ReceiptArchive from './components/ReceiptArchive';
import ReceiptVerifier from './components/QRVerifier';

import AdminDashboard from './components/AdminDashboard';
import TemplateManager from './components/TemplateManager';
import UserRoleManager from './components/UserRoleManager';
import ReceiptArchiveAdmin from './components/ReceiptArchiveAdmin';
import ReportGenerator from './components/ReportGenerator';
import NotificationLog from './components/NotificationLog';

import ViewerDashboard from './components/ViewerDashboard';
import ReceiptAccessForm from './components/ReceiptAccessForm';

import BackButton from './components/BackButton';

export default function App() {
  const [user, setUser] = useState(null);  // e.g. { role: 'encoder', name: 'Maria Santos' }
  const [pageHistory, setPageHistory] = useState([]);  // Track visited pages stack
  const currentPage = pageHistory.length > 0 ? pageHistory[pageHistory.length - 1] : '';

  // Push a new page to history
  const navigateTo = (newPage) => {
    setPageHistory(history => [...history, newPage]);
  };

  // Pop the last page to go back
  const goBack = () => {
    setPageHistory(history => {
      if (history.length <= 1) return history; // can't go back if only one page
      return history.slice(0, history.length - 1);
    });
  };

  // On login initialize to dashboard
  const handleLogin = (userData) => {
    setUser(userData);
    setPageHistory(['dashboard']);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const showBackButton = pageHistory.length > 1;

  const handleBackButton = () => {
    goBack();
  };

  const renderPage = () => {
    if (user.role === 'encoder') {
      switch (currentPage) {
        case 'issueReceipt':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptForm user={user} onSuccess={() => navigateTo('dashboard')} />
            </>
          );
        case 'receiptArchive':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptArchive user={user} />
            </>
          );
        case 'qrVerify':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptVerifier />
            </>
          );
        case 'dashboard':
        default:
          return <EncoderDashboard onNavigate={navigateTo} />;
      }
    } else if (user.role === 'admin') {
      switch (currentPage) {
        case 'templateManager':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <TemplateManager />
            </>
          );
        case 'userRoleManager':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <UserRoleManager />
            </>
          );
        case 'receiptArchive':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptArchiveAdmin />
            </>
          );
        case 'reportGenerator':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReportGenerator />
            </>
          );
        case 'notificationLog':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <NotificationLog />
            </>
          );
        case 'dashboard':
        default:
          return <AdminDashboard onNavigate={navigateTo} />;
      }
    } else if (user.role === 'viewer') {
      switch (currentPage) {
        case 'receiptAccessForm':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptAccessForm />
            </>
          );
        case 'qrVerify':
          return (
            <>
              {showBackButton && <BackButton onBack={handleBackButton} />}
              <ReceiptVerifier />
            </>
          );
        case 'dashboard':
        default:
          return <ViewerDashboard onNavigate={navigateTo} />;
      }
    }
    return <p>Role not recognized.</p>;
  };

  return (
    <div className="container">
      {renderPage()}
      <button
        onClick={() => {
          setUser(null);
          setPageHistory([]);
        }}
        style={{ 
          marginTop: 20,
          background: 'var(--danger-red)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
} 