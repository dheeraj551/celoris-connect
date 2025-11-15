# 🚀 Appwrite Sites - React Starter Template Deployment

This guide explains how to deploy Celoris Connect using the **React starter template** in Appwrite Sites.

## 📋 Prerequisites

✅ **Appwrite Project** configured with your credentials  
✅ **Google Gemini API Key**  
✅ **Appwrite Sites feature enabled**  

## 🎯 Template Selection

**Choose "React starter" template** from the Appwrite Sites templates:
- ✅ React starter ← **SELECT THIS ONE**
- ❌ Docusaurus (documentation site)
- ❌ React playground (demo/testing)

## 📊 Step 1: Database Setup

Before deployment, ensure your Appwrite database has these collections:

### Create Collections in Appwrite Console
Go to your Appwrite console at `https://appwrite.celoris.in`:

#### **Users Collection**
```
Name: users
Permissions: Read (Anyone), Write (Users)

Attributes:
- role: String (enum: admin, tutor)
- name: String (required, max: 255)
- email: String (required, max: 255)
- phone: String (max: 20, optional)
- location: String (max: 255, optional)
- specialization: String (max: 255, optional)
- verified: Boolean (default: false)
- wallet_balance: Number (default: 0)
- createdAt: Datetime (default: now())
```

#### **Leads Collection**
```
Name: leads
Permissions: Read (Anyone), Write (Admins)

Attributes:
- title: String (required, max: 255)
- subject: String (required, max: 100)
- grade: String (required, max: 50)
- location: String (required, max: 255)
- cpl: Number (default: 0)
- description: Text (required)
- requirements: String (max: 1000, optional)
- schedule: String (max: 255, optional)
- status: String (enum: active, filled, expired)
- createdAt: Datetime (default: now())
- adminId: String (required, max: 50)
```

#### **Applications Collection**
```
Name: applications
Permissions: Read (Anyone), Write (Users)

Attributes:
- leadId: String (required, max: 50)
- userId: String (required, max: 50)
- status: String (enum: pending, approved, rejected)
- cpl: Number (default: 0)
- appliedAt: Datetime (default: now())
- reviewedAt: Datetime (optional)
- notes: Text (optional)
```

#### **Transactions Collection**
```
Name: transactions
Permissions: Read (Anyone), Write (Admins)

Attributes:
- userId: String (required, max: 50)
- type: String (enum: credit, debit)
- amount: Number (required)
- description: String (required, max: 255)
- applicationId: String (max: 50, optional)
- createdAt: Datetime (default: now())
```

#### **Support Tickets Collection**
```
Name: support_tickets
Permissions: Read (Anyone), Write (Users)

Attributes:
- userId: String (required, max: 50)
- title: String (required, max: 255)
- description: Text (required)
- status: String (enum: open, in_progress, resolved, closed)
- priority: String (enum: low, medium, high, urgent)
- assignedTo: String (max: 50, optional)
- createdAt: Datetime (default: now())
- updatedAt: Datetime (optional)
```

### Create Storage Buckets
1. Go to **Storage** → **Create Bucket**
2. Create bucket: `avatars` (Public)
3. Create bucket: `documents` (Private)

## 🚀 Step 2: Deploy with React Starter Template

### 2.1 Create New Site
1. Go to **Sites** in your Appwrite console
2. Click **"Create Site"**
3. Select **"React starter"** template
4. Name your site: `celoris-connect`

### 2.2 Upload Your Code
1. **Build your application locally**:
   ```bash
   npm install
   npm run build
   ```

2. **Package your `dist` folder**:
   - Create a ZIP file of the `dist` folder
   - Name it: `celoris-connect-build.zip`

3. **Upload to Appwrite Sites**:
   - Drag and drop your ZIP file
   - Wait for upload to complete

### 2.3 Environment Variables Configuration
After upload, add environment variables in Appwrite Sites:

```env
VITE_APPWRITE_PROJECT_ID=69172e650018b6ea783d
VITE_APPWRITE_PUBLIC_ENDPOINT=https://appwrite.celoris.in/v1
VITE_GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

## 🔑 Step 3: Get Google Gemini API Key

### 3.1 Create API Key
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Go to **API Keys** → **"Create API Key"**
4. Copy the generated key

### 3.2 Add to Environment Variables
1. In Appwrite Sites → **Environment Variables**
2. Add `VITE_GEMINI_API_KEY` with your actual key
3. Redeploy the site

## 🌐 Step 4: Configure Custom Domain

### 4.1 Add Domain
1. In Sites settings → **Domains**
2. Click **"Add Domain"**
3. Enter: `app.celoris.in`
4. Save configuration

### 4.2 DNS Setup
Point your domain to Appwrite:
```
Type: CNAME
Name: app
Value: [Your Appwrite domain]
TTL: 3600
```

### 4.3 SSL Certificate
- Automatic SSL via Let's Encrypt
- Wait 10-15 minutes for activation

## 📱 Step 5: Update Appwrite Platform Settings

### 5.1 Platform Configuration
1. Go to **Settings** → **Platforms**
2. Select your React platform
3. Update **Production Host**: `https://app.celoris.in`
4. Add **Redirect URL**: `https://app.celoris.in/auth/callback`
5. Save changes

## 👥 Step 6: Create Test Users

### 6.1 Admin Account
1. **Authentication** → **Users** in Appwrite
2. Create user:
   - **Email**: `admin@celoris.com`
   - **Password**: `admin123`
3. Update user preferences:
   ```json
   {
     "role": "admin",
     "name": "Admin User",
     "email": "admin@celoris.com"
   }
   ```

### 6.2 Tutor Account
1. Create user:
   - **Email**: `tutor@celoris.com`
   - **Password**: `tutor123`
2. Update preferences:
   ```json
   {
     "role": "tutor",
     "name": "Tutor User",
     "email": "tutor@celoris.com"
   }
   ```

## ✅ Step 7: Test Deployment

### 7.1 Access Application
Visit: `https://app.celoris.in`

### 7.2 Login Testing
- **Admin**: `admin@celoris.com` / `admin123`
- **Tutor**: `tutor@celoris.com` / `tutor123`

### 7.3 Feature Verification
- [ ] Dashboard loads correctly
- [ ] Navigation works
- [ ] Authentication functions
- [ ] Data displays properly
- [ ] AI Assistant responds (requires Gemini API key)

## 🔧 Troubleshooting

### Build Issues
```bash
# If build fails locally:
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables
```bash
# Verify all env vars are set:
VITE_APPWRITE_PROJECT_ID=69172e650018b6ea783d
VITE_APPWRITE_PUBLIC_ENDPOINT=https://appwrite.celoris.in/v1
VITE_GEMINI_API_KEY=your_key_here
```

### Authentication Problems
```bash
# Check Appwrite platform settings:
1. Redirect URLs match deployment domain
2. CORS allows your domain
3. Platform type is React
```

## 📈 Benefits of React Starter Template

✅ **Optimized for Vite** - Fast build times  
✅ **TypeScript ready** - Full type safety  
✅ **Modern React** - React 18 with hooks  
✅ **Appwrite integration** - Seamless backend  
✅ **Production ready** - Optimized builds  
✅ **Auto-scaling** - Built on Appwrite infrastructure  

## 🎯 Project Features

Your deployed application includes:

### Admin Dashboard
- Dashboard overview with analytics
- User management interface
- Lead management system
- Tutor approval workflow
- Transaction monitoring
- Support ticket management
- AI assistant powered by Gemini

### Tutor Portal
- Lead marketplace browsing
- Application submission system
- Application status tracking
- Profile management
- Wallet and transactions
- Support ticket creation

## 🚀 Next Steps

After successful deployment:

1. **Add real data** to your collections
2. **Configure user roles** and permissions
3. **Set up real Gemini API** for AI features
4. **Test all functionality** thoroughly
5. **Share with stakeholders** for feedback

---

**🎉 Congratulations!** Your Celoris Connect application is now live using the React starter template!

Access your tutor-student matching platform at: `https://app.celoris.in`