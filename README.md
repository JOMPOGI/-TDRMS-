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

## Deployment with GitHub Actions

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Save the settings

3. **GitHub Actions Workflow**
   - The workflow file `.github/workflows/deploy.yml` is already configured
   - It automatically builds and deploys on every push to the main branch
   - No additional setup required

### How It Works

- **Automatic Deployment**: Every push to the main branch triggers the workflow
- **Build Process**: Installs dependencies and builds the React app
- **Deployment**: Deploys the built files to the gh-pages branch
- **Live Site**: GitHub Pages serves the latest version automatically

### Team Collaboration

- **Shared Repository**: All team members work on the same repository
- **Instant Updates**: Any push to main branch updates the live site
- **Consistent URL**: The deployed site URL remains the same
- **Remote Access**: Anyone can access the app from any device

### Workflow Details

The GitHub Actions workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the app with `npm run build`
5. Deploys to GitHub Pages using the gh-pages action

## Project Structure

```
src/
├── components/
│   ├── BackButton.jsx           # Reusable back navigation
│   ├── LoginPage.jsx            # Authentication page
│   ├── EncoderDashboard.jsx     # Encoder main dashboard
│   ├── ReceiptForm.jsx          # Receipt creation form
│   ├── ReceiptArchive.jsx       # Encoder receipt archive
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
- Verify receipts
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

### Receipt Design
- **Receipt format** with proper numbering
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

**TDRMS** - Smart Transaction and Donation Receipt Management System 
