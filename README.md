# Smart Transaction and Donation Receipt Management System (TDRMS)

A user-friendly system designed for NU Dasma student organizations to easily customize and manage their Official Receipts (OR) as proof of payment for donations, membership fees, and purchases. 

## Features

### 🔐 Authentication & Role Management
- **Multi-role system**: Admin, Encoder, and Viewer roles
- **Secure login** with form validation
- **Role-based navigation** and access control

### 📄 Receipt Management
- **Professional receipt design** with gold and blue banking theme
- **Receipt issuance** with customizable templates
- **Receipt archive** with search and filtering
- **Receipt verification
- **Download functionality** for receipts

### 👥 Admin Features
- **Template management** - Create and customize receipt templates
- **User role management** - Manage user permissions
- **Advanced receipt archive** with detailed analytics
- **Report generation** - Financial reports and analytics
- **Notification system** - System alerts and notifications

## Test Accounts

Use these credentials to test different roles:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Encoder | `encoder` | `encoder123` |
| Viewer | `viewer` | `viewer123` |

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tdrms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── BackButton.jsx           # Reusable back navigation
│   ├── LoginPage.jsx            # Authentication page
│   ├── EncoderDashboard.jsx     # Encoder main dashboard
│   ├── ReceiptForm.jsx          # Receipt creation form
│   ├── ReceiptArchive.jsx       # Encoder receipt archive
│   ├── QRVerifier.jsx           # QR code verification
│   ├── AdminDashboard.jsx       # Admin main dashboard
│   ├── TemplateManager.jsx      # Template management
│   ├── UserRoleManager.jsx      # User role management
│   ├── ReceiptArchiveAdmin.jsx  # Admin receipt archive
│   ├── ReportGenerator.jsx      # Financial reports
│   ├── NotificationLog.jsx      # System notifications
│   ├── ViewerDashboard.jsx      # Viewer main dashboard
│   └── ReceiptAccessForm.jsx    # Receipt search and access
├── services/
│   └── api.js                   # Mock API service
├── App.jsx                      # Main application component
├── index.js                     # React entry point
└── index.css                    # Global styles
```

## Role Permissions

### 👤 Viewer
- Search and view receipts
- Download receipts
- Verify QR codes
- Access receipt information

### 📝 Encoder
- All Viewer permissions
- Issue new receipts
- Manage receipt archive
- Create donation/purchase receipts
- Tag and categorize receipts

### 🔧 Admin
- All Encoder permissions
- Manage receipt templates
- Manage user roles
- Generate financial reports
- View system notifications
- Advanced analytics

## Key Features

### Receipt Templates
- **Customizable templates** with organization branding
- **Multiple signatories** support
- **Branding colors** configuration
- **Template management** for admins

### QR Code System
- **Unique QR codes** for each receipt
- **Camera scanning** support
- **Manual entry** option
- **Instant verification** results

### Professional Receipt Design
- **Real-world receipt format** with proper numbering
- **Organization branding** integration
- **Professional typography** and layout
- **Print-ready** design

### Advanced Search & Filtering
- **Multi-criteria search** (receipt number, donor name)
- **Date range filtering**
- **Payment type filtering**
- **Template-based filtering**

## Technology Stack

- **React 18** - Frontend framework
- **CSS3** - Styling with custom properties
- **JavaScript ES6+** - Modern JavaScript features
- **Mock API** - Simulated backend services

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style

- **Functional components** with React hooks
- **Professional CSS** with custom properties
- **Responsive design** principles
- **Accessibility** best practices

## Future Enhancements

- **Backend integration** with real API
- **PDF generation** for receipts
- **Email notifications**
- **Advanced analytics** dashboard
- **Mobile app** version
- **Multi-language** support
- **Audit logging** system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**TDRMS** - Professional Smart Transaction and Donation Receipt Management System 
