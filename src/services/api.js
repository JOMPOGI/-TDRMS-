// Mock API service for TDRMS
// In a real application, this would connect to your backend

// Mock data for testing
const mockUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
  { id: 2, username: 'encoder', password: 'encoder123', role: 'encoder', name: 'Maria Santos' },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer', name: 'John Doe' }
];

const mockReceipts = [
  {
    id: 'RCP-2024-001',
    date: '2024-01-15',
    donorName: 'Juan Dela Cruz',
    contactInfo: 'juan@email.com',
    amount: 5000.00,
    paymentType: 'Donation',
    description: 'Monthly church donation',
    template: 'Standard Receipt',
    tags: ['Church', 'Monthly'],
    issuedBy: 'Maria Santos',
    qrCode: 'RCP-2024-001-QR-CODE'
  },
  {
    id: 'RCP-2024-002',
    date: '2024-01-16',
    donorName: 'Maria Garcia',
    contactInfo: 'maria@email.com',
    amount: 2500.00,
    paymentType: 'Membership Fee',
    description: 'Annual membership renewal',
    template: 'Membership Receipt',
    tags: ['Membership', 'Annual'],
    issuedBy: 'Maria Santos',
    qrCode: 'RCP-2024-002-QR-CODE'
  },
  {
    id: 'RCP-2024-003',
    date: '2024-01-17',
    donorName: 'Pedro Santos',
    contactInfo: 'pedro@email.com',
    amount: 1000.00,
    paymentType: 'Purchase',
    description: 'Event ticket purchase',
    template: 'Event Receipt',
    tags: ['Event', 'Ticket'],
    issuedBy: 'Maria Santos',
    qrCode: 'RCP-2024-003-QR-CODE'
  }
];

const mockTemplates = [
  {
    id: 1,
    name: 'Standard Receipt',
    organization: 'St. Mary\'s Parish',
    purpose: 'General donations and contributions',
    signatories: ['Fr. John Smith', 'Treasurer'],
    brandingColors: { primary: '#D4AF37', secondary: '#1e3c72' },
    isActive: true
  },
  {
    id: 2,
    name: 'Membership Receipt',
    organization: 'St. Mary\'s Parish',
    purpose: 'Membership fees and dues',
    signatories: ['Fr. John Smith', 'Secretary'],
    brandingColors: { primary: '#D4AF37', secondary: '#2a5298' },
    isActive: true
  },
  {
    id: 3,
    name: 'Event Receipt',
    organization: 'St. Mary\'s Parish',
    purpose: 'Event ticket sales and registrations',
    signatories: ['Event Coordinator', 'Treasurer'],
    brandingColors: { primary: '#FFD700', secondary: '#1e3c72' },
    isActive: true
  }
];

// API functions
export const api = {
  // Authentication
  login: async (username, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, user: { ...user, password: undefined } };
    }
    throw new Error('Invalid credentials');
  },

  // Receipts
  getReceipts: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredReceipts = [...mockReceipts];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredReceipts = filteredReceipts.filter(receipt =>
        receipt.donorName.toLowerCase().includes(searchTerm) ||
        receipt.id.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.dateFrom) {
      filteredReceipts = filteredReceipts.filter(receipt => 
        receipt.date >= filters.dateFrom
      );
    }
    
    if (filters.dateTo) {
      filteredReceipts = filteredReceipts.filter(receipt => 
        receipt.date <= filters.dateTo
      );
    }
    
    return filteredReceipts;
  },

  createReceipt: async (receiptData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReceipt = {
      id: `RCP-2024-${String(mockReceipts.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      ...receiptData,
      qrCode: `RCP-2024-${String(mockReceipts.length + 1).padStart(3, '0')}-QR-CODE`
    };
    
    mockReceipts.push(newReceipt);
    return newReceipt;
  },

  // Templates
  getTemplates: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTemplates;
  },

  createTemplate: async (templateData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTemplate = {
      id: mockTemplates.length + 1,
      ...templateData,
      isActive: true
    };
    
    mockTemplates.push(newTemplate);
    return newTemplate;
  },

  updateTemplate: async (id, templateData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTemplates.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTemplates[index] = { ...mockTemplates[index], ...templateData };
      return mockTemplates[index];
    }
    throw new Error('Template not found');
  },

  deleteTemplate: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTemplates.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTemplates.splice(index, 1);
      return { success: true };
    }
    throw new Error('Template not found');
  },

  // Users
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.map(user => ({ ...user, password: undefined }));
  },

  updateUserRole: async (userId, newRole) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      return { ...user, password: undefined };
    }
    throw new Error('User not found');
  },

  // QR Verification
  verifyQRCode: async (qrCode) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const receipt = mockReceipts.find(r => r.qrCode === qrCode);
    if (receipt) {
      return { success: true, receipt };
    }
    throw new Error('Invalid QR code');
  }
};

export default api; 