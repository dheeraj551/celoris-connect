# Celoris Connect

A sophisticated, dual-role web application designed to serve as the central management hub for a tutor-student matching service. Features an Admin Dashboard for complete platform oversight and a Tutor Portal for tutors to find opportunities and manage their activities.

## 🌟 Features

### Admin Dashboard 👨💻
- **Dashboard Overview** - Key metrics and analytics
- **User Management** - View, create, edit, and manage all users
- **Lead Management** - Create and post new student leads with CPL
- **Tutor Approvals** - Review and approve/reject tutor applications
- **Transaction Monitoring** - Detailed log of all financial transactions
- **Support Center** - Manage and respond to support tickets
- **AI Assistant** - Powered by Google Gemini for intelligent insights

### Tutor Portal 👩🏫
- **Lead Marketplace** - Browse and filter available student leads
- **Application System** - Apply for leads with automatic CPL deduction
- **My Applications** - Track application status (Pending, Approved, Rejected)
- **Profile Management** - Update professional details and upload verification documents
- **Wallet** - View current balance and transaction history
- **Support Center** - Create and track support tickets

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Heroicons + Lucide React
- **Backend**: Appwrite (Authentication, Database, Storage)
- **AI**: Google Gemini API for Admin AI Assistant
- **Deployment**: Coolify with Nixpacks
- **Web Server**: Nginx

## 📋 Prerequisites

- Node.js 18+ 
- Appwrite server (self-hosted on Coolify)
- Google Gemini API key
- Coolify deployment environment

## ⚙️ Appwrite Configuration

### 1. Create Appwrite Project
1. Set up Appwrite on your Coolify instance
2. Create a new project called "Celoris Connect"
3. Note down your project settings

### 2. Configure Platform
1. Go to **Settings** → **API Keys**
2. Generate a new API key with all permissions
3. Go to **Settings** → **Platforms** → **Add Platform**
4. Select **Web** → **React**
5. Configure as:
   - **Name**: `Celoris Connect React`
   - **Host**: `localhost` (for development)
   - **Redirect URLs**: 
     - Development: `http://localhost:5173/auth/callback`
     - Production: `https://your-domain.com/auth/callback`

### 3. Create Database Collections
Create the following collections in your Appwrite database:

#### Users Collection (`users`)
```json
{
  "name": "users",
  "permissions": {
    "read": ["*"],
    "write": ["user:current"]
  },
  "attributes": [
    {"name": "role", "type": "enum", "options": ["admin", "tutor"]},
    {"name": "name", "type": "string", "size": 255},
    {"name": "email", "type": "string", "size": 255},
    {"name": "phone", "type": "string", "size": 20, "required": false},
    {"name": "location", "type": "string", "size": 255, "required": false},
    {"name": "specialization", "type": "string", "size": 255, "required": false},
    {"name": "verified", "type": "boolean", "default": false},
    {"name": "wallet_balance", "type": "number", "default": 0},
    {"name": "createdAt", "type": "datetime", "default": "now()"}
  ]
}
```

#### Leads Collection (`leads`)
```json
{
  "name": "leads",
  "permissions": {
    "read": ["*"],
    "write": ["role:admin"]
  },
  "attributes": [
    {"name": "title", "type": "string", "size": 255},
    {"name": "subject", "type": "string", "size": 100},
    {"name": "grade", "type": "string", "size": 50},
    {"name": "location", "type": "string", "size": 255},
    {"name": "cpl", "type": "number", "default": 0},
    {"name": "description", "type": "text"},
    {"name": "requirements", "type": "string", "size": 1000, "required": false},
    {"name": "schedule", "type": "string", "size": 255, "required": false},
    {"name": "status", "type": "enum", "options": ["active", "filled", "expired"]},
    {"name": "createdAt", "type": "datetime", "default": "now()"},
    {"name": "adminId", "type": "string", "size": 50}
  ]
}
```

#### Applications Collection (`applications`)
```json
{
  "name": "applications",
  "permissions": {
    "read": ["*"],
    "write": ["role:tutor"]
  },
  "attributes": [
    {"name": "leadId", "type": "string", "size": 50},
    {"name": "userId", "type": "string", "size": 50},
    {"name": "status", "type": "enum", "options": ["pending", "approved", "rejected"]},
    {"name": "cpl", "type": "number", "default": 0},
    {"name": "appliedAt", "type": "datetime", "default": "now()"},
    {"name": "reviewedAt", "type": "datetime", "required": false},
    {"name": "notes", "type": "text", "required": false}
  ]
}
```

#### Transactions Collection (`transactions`)
```json
{
  "name": "transactions",
  "permissions": {
    "read": ["*"],
    "write": ["role:admin"]
  },
  "attributes": [
    {"name": "userId", "type": "string", "size": 50},
    {"name": "type", "type": "enum", "options": ["credit", "debit"]},
    {"name": "amount", "type": "number"},
    {"name": "description", "type": "string", "size": 255},
    {"name": "applicationId", "type": "string", "size": 50, "required": false},
    {"name": "createdAt", "type": "datetime", "default": "now()"}
  ]
}
```

#### Support Tickets Collection (`support_tickets`)
```json
{
  "name": "support_tickets",
  "permissions": {
    "read": ["*"],
    "write": ["*"]
  },
  "attributes": [
    {"name": "userId", "type": "string", "size": 50},
    {"name": "title", "type": "string", "size": 255},
    {"name": "description", "type": "text"},
    {"name": "status", "type": "enum", "options": ["open", "in_progress", "resolved", "closed"]},
    {"name": "priority", "type": "enum", "options": ["low", "medium", "high", "urgent"]},
    {"name": "assignedTo", "type": "string", "size": 50, "required": false},
    {"name": "createdAt", "type": "datetime", "default": "now()"},
    {"name": "updatedAt", "type": "datetime", "required": false}
  ]
}
```

### 4. Create Storage Buckets
1. Go to **Storage** → **Buckets**
2. Create buckets:
   - `avatars` (public read, authenticated write)
   - `documents` (private read, authenticated write)

## 🛠️ Local Development

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd celoris-connect
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_PUBLIC_ENDPOINT=https://your-appwrite-domain.com/v1
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Get Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Go to **API Keys** → **Create API Key**
4. Copy the key to your `.env` file

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173`

## 🚢 Deployment on Coolify

### 1. Prepare Repository
1. Commit and push your code to GitHub
2. Ensure your repository is public

### 2. Deploy on Coolify
1. **Create New Project** in Coolify dashboard
2. **Source Control** → **New Source**
3. Connect your GitHub repository
4. **Platform**: Select **React**
5. **Build Mode**: **Nixpacks**
6. **Build Path**: `/` (root)
7. **Environment Variables**:
   ```
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_PUBLIC_ENDPOINT=https://your-appwrite-domain.com/v1
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### 3. Configure Domain (Optional)
1. Go to **Domains** in your project settings
2. Add your custom domain
3. Coolify will automatically provision SSL certificate

### 4. Update Appwrite Platform Settings
Add your deployment domain to Appwrite platform configuration:
- **Redirect URL**: `https://your-domain.com/auth/callback`

## 👥 User Roles & Access

### Admin Role
- Full platform oversight
- User management capabilities
- Lead creation and management
- Application approval/rejection
- Transaction monitoring
- Support ticket management
- AI assistant access

### Tutor Role
- Lead marketplace access
- Application submission
- Application status tracking
- Profile management
- Wallet access
- Support ticket creation

## 🔧 API Integration

### Appwrite SDK Usage
The application uses the Appwrite JavaScript SDK for:
- **Authentication**: `createEmailSession`, `create`, `get`, `logout`
- **Database**: `listDocuments`, `createDocument`, `updateDocument`, `deleteDocument`
- **Storage**: `createFile`, `getFile`, `deleteFile`

### Gemini AI Integration
The AI assistant uses Google Gemini API for:
- Data analysis and insights
- Content generation
- Natural language queries about platform data

## 🧪 Testing

### Demo Accounts
Create these test accounts in your Appwrite authentication:

**Admin Account**:
- Email: admin@celoris.com
- Password: admin123
- Role: admin

**Tutor Account**:
- Email: tutor@celoris.com
- Password: tutor123
- Role: tutor

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary software for Celoris Connect.

## 🆘 Support

For issues or questions:
1. Check the support center in the application
2. Create a support ticket
3. Review this documentation

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] Payment gateway integration
- [ ] Automated lead matching