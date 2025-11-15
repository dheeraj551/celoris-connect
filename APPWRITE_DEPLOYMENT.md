# 🚀 Appwrite Sites Deployment Guide for Celoris Connect

This guide will walk you through deploying Celoris Connect directly within your Appwrite project using the Sites feature.

## 📋 Prerequisites

✅ **Appwrite Project** configured with your credentials  
✅ **GitHub Repository** with your Celoris Connect code  
✅ **Google Gemini API Key**  
✅ **Appwrite Sites feature enabled**  

## Step 1: GitHub Repository Setup

### 1.1 Create GitHub Repository
1. Go to GitHub.com and create a new repository
2. **Repository Name**: `celoris-connect`
3. **Description**: "Tutor-Student Matching Platform with Admin Dashboard and Tutor Portal"
4. **Visibility**: Public (required for Appwrite Sites)
5. **Don't initialize** with README (we already have one)

### 1.2 Push Your Code
Run these commands to push your code to GitHub:
```bash
cd /path/to/celoris-connect
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/celoris-connect.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

## Step 2: Appwrite Database Setup

Before deploying, ensure your Appwrite database has the required collections:

### 2.1 Create Collections
In your Appwrite console at `https://appwrite.celoris.in`:

#### **Users Collection**
```json
{
  "name": "users",
  "permissions": { "read": ["*"], "write": ["user:current"] },
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

#### **Leads Collection**
```json
{
  "name": "leads",
  "permissions": { "read": ["*"], "write": ["role:admin"] },
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

#### **Applications Collection**
```json
{
  "name": "applications",
  "permissions": { "read": ["*"], "write": ["role:tutor"] },
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

#### **Transactions Collection**
```json
{
  "name": "transactions",
  "permissions": { "read": ["*"], "write": ["role:admin"] },
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

#### **Support Tickets Collection**
```json
{
  "name": "support_tickets",
  "permissions": { "read": ["*"], "write": ["*"] },
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

### 2.2 Create Storage Buckets
Go to **Storage** → **Create Bucket**:
- **avatars** (Public bucket)
- **documents** (Private bucket)

## Step 3: Deploy on Appwrite Sites

### 3.1 Create New Site
1. Go to **Sites** in your Appwrite console
2. Click **"Create Site"**
3. Select **"GitHub"** integration

### 3.2 Connect GitHub Repository
1. **Repository**: Select `celoris-connect` from your GitHub
2. **Branch**: `main`
3. **Framework**: Select **React**

### 3.3 Build Configuration
Set these build settings:
```
Install Command: npm install
Build Command: npm run deploy:build
Output Directory: dist
```

### 3.4 Environment Variables
Add these environment variables in Appwrite Sites:
```env
VITE_APPWRITE_PROJECT_ID=69172e650018b6ea783d
VITE_APPWRITE_PUBLIC_ENDPOINT=https://appwrite.celoris.in/v1
VITE_GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

### 3.5 Deploy
1. Click **"Deploy Site"**
2. Wait for the build process to complete (2-5 minutes)
3. Monitor build logs for any errors

## Step 4: Configure Custom Domain

### 4.1 Add Custom Domain
1. In your Site settings, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain: `app.celoris.in`
4. Save the configuration

### 4.2 DNS Configuration
Point your domain's DNS to your Appwrite server:
```
Type: CNAME
Name: app
Value: [Your Appwrite domain]
TTL: 3600
```

### 4.3 SSL Certificate
- Appwrite automatically provisions SSL via Let's Encrypt
- Wait 5-10 minutes for certificate activation

## Step 5: Update Appwrite Platform Settings

After your site is deployed with the custom domain:

1. Go to **Settings** → **Platforms**
2. Select your React platform
3. Update **Production Host**: `https://app.celoris.in`
4. Add **Redirect URL**: `https://app.celoris.in/auth/callback`
5. Save changes

## Step 6: Get Google Gemini API Key

### 6.1 Create API Key
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Go to **API Keys** → **"Create API Key"**
4. Copy the generated key

### 6.2 Add to Environment Variables
1. In Appwrite Sites settings
2. Go to **Environment Variables**
3. Update `VITE_GEMINI_API_KEY` with your actual key
4. Redeploy the site

## Step 7: Create Test Users

### 7.1 Admin Account
1. Go to **Authentication** → **Users** in Appwrite
2. Create new user:
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

### 7.2 Tutor Account
1. Create another user:
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

## Step 8: Test Deployment

### 8.1 Access Application
Visit: `https://app.celoris.in`

### 8.2 Test Authentication
- **Admin Login**: `admin@celoris.com` / `admin123`
- **Tutor Login**: `tutor@celoris.com` / `tutor123`

### 8.3 Verify Features
- [ ] Dashboard loads correctly
- [ ] Navigation works
- [ ] Authentication functions
- [ ] Data displays properly
- [ ] AI Assistant responds (requires Gemini API key)

## Troubleshooting

### Build Failures
```bash
# Common build issues:
# 1. Check build logs in Appwrite Sites
# 2. Verify environment variables are set
# 3. Ensure Node.js version compatibility
# 4. Check for build script errors
```

### Authentication Issues
```bash
# Verify Appwrite configuration:
# 1. Platform settings correct
# 2. Redirect URLs match deployment domain
# 3. CORS settings allow your domain
```

### SSL Certificate Problems
```bash
# If SSL issues occur:
# 1. Wait 10-15 minutes after domain setup
# 2. Check DNS propagation
# 3. Verify domain configuration in Appwrite
```

## Performance Optimization

### 8.1 Build Optimization
Your application includes:
- Code splitting for better loading
- Tree shaking to remove unused code
- Gzip compression for faster delivery
- Static asset caching

### 8.2 Appwrite Integration
- Optimized for Appwrite Sites infrastructure
- Automatic CDN distribution
- Global edge caching

## Security Checklist

- [x] HTTPS enabled (automatic with custom domain)
- [x] Environment variables secured
- [x] CORS properly configured
- [x] User roles enforced
- [x] No sensitive data in client code

## Maintenance

### Regular Updates
```bash
# Update dependencies and deploy:
npm update
git add .
git commit -m "Update dependencies"
git push
# Appwrite Sites will auto-deploy
```

### Backup Strategy
- Appwrite data is automatically backed up
- Source code is in GitHub
- Environment variables should be documented securely

## Support

If you encounter issues:

1. Check Appwrite Sites deployment logs
2. Review browser console errors
3. Verify Appwrite database configuration
4. Test authentication flow
5. Confirm environment variables

---

**🎉 Congratulations!** Your Celoris Connect application is now live on Appwrite Sites!

Access your application at: `https://app.celoris.in`

Your dual-role tutor-student matching platform is ready for production use!