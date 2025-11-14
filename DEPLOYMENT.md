# 🚀 Coolify Deployment Guide for Celoris Connect

This guide will walk you through deploying Celoris Connect on Coolify with Nixpacks.

## Prerequisites

✅ **Appwrite Server** running on Coolify  
✅ **GitHub Repository** with your code  
✅ **Google Gemini API Key**  
✅ **Domain** (optional but recommended)

## Step 1: Appwrite Setup

### 1.1 Create Collections in Appwrite
Follow the database schema in the main README.md to create:
- `users` collection
- `leads` collection  
- `applications` collection
- `transactions` collection
- `support_tickets` collection

### 1.2 Create Storage Buckets
- `avatars` bucket (public read, authenticated write)
- `documents` bucket (private read, authenticated write)

### 1.3 Configure Platform
- Platform: Web → React
- Host: Your deployment domain
- Redirect URLs: 
  - `https://your-domain.com/auth/callback`

## Step 2: Deploy to Coolify

### 2.1 Create New Project
1. Go to Coolify Dashboard
2. Click **"New Project"**
3. Select **"Source Control"**

### 2.2 Source Configuration
1. **Repository**: Select your GitHub repository
2. **Branch**: `main` (or your preferred branch)
3. **Platform**: **React**
4. **Build Mode**: **Nixpacks**

### 2.3 Build Configuration
```
Build Path: /
Install Command: npm ci
Build Command: npm run build
Start Command: npx serve dist -s -l $PORT
```

### 2.4 Environment Variables
Add these environment variables in Coolify:
```env
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_PUBLIC_ENDPOINT=https://your-appwrite-domain.com/v1
VITE_GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 2-5 minutes)
3. Check deployment logs for any errors

## Step 3: Configure Custom Domain

### 3.1 Add Domain in Coolify
1. Go to your project settings
2. Navigate to **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain: `app.celoris.in`
5. Coolify will automatically configure SSL via Let's Encrypt

### 3.2 DNS Configuration
Point your domain's DNS A record to your Coolify server IP:
```
Type: A
Name: app (or your subdomain)
Value: [Your Coolify Server IP]
TTL: 3600
```

### 3.3 Update Appwrite Platform
After domain is working, update Appwrite platform:
- **Redirect URL**: `https://app.celoris.in/auth/callback`

## Step 4: Create Test Users

### 4.1 Admin User
In Appwrite Authentication:
1. Create user: `admin@celoris.com`
2. Set password: `admin123`
3. Update user preferences: `{"role": "admin", "name": "Admin User"}`

### 4.2 Tutor User
In Appwrite Authentication:
1. Create user: `tutor@celoris.com`
2. Set password: `tutor123`
3. Update user preferences: `{"role": "tutor", "name": "Tutor User"}`

## Step 5: Create Sample Data

### 5.1 Sample Lead
```json
{
  "title": "Mathematics Grade 10 Tutoring",
  "subject": "Mathematics",
  "grade": "Grade 10", 
  "location": "Mumbai, Maharashtra",
  "cpl": 25,
  "description": "Looking for a qualified mathematics tutor for a Grade 10 student. Subjects include algebra, geometry, and trigonometry.",
  "status": "active"
}
```

## Step 6: Test Deployment

### 6.1 Access Application
Visit: `https://app.celoris.in`

### 6.2 Login Testing
1. **Admin Login**: `admin@celoris.com` / `admin123`
2. **Tutor Login**: `tutor@celoris.com` / `tutor123`

### 6.3 Feature Testing
- [ ] Dashboard loads correctly
- [ ] Navigation works
- [ ] Authentication functions
- [ ] Data displays properly
- [ ] AI Assistant responds

## Troubleshooting

### Build Fails
```bash
# Check build logs in Coolify
# Common issues:
# - Missing environment variables
# - Node version conflicts
# - Build timeout
```

### Authentication Issues
```bash
# Verify Appwrite configuration:
# 1. Platform settings correct
# 2. Redirect URLs match
# 3. CORS settings allow your domain
```

### SSL Certificate Issues
```bash
# Coolify automatically handles SSL
# If issues persist:
# 1. Check domain DNS settings
# 2. Wait 5-10 minutes for certificate provisioning
# 3. Clear browser cache
```

## Performance Optimization

### 6.1 Enable Caching
The included `nginx.conf` already includes:
- Gzip compression
- Static file caching
- Security headers

### 6.2 Monitor Resources
- Check Coolify dashboard for resource usage
- Monitor build times and deploy frequency
- Review error logs regularly

## Security Checklist

- [x] HTTPS enabled (auto via Coolify)
- [x] Environment variables secured
- [x] CORS properly configured in Appwrite
- [x] User roles properly enforced
- [x] No sensitive data in client code

## Maintenance

### Regular Updates
```bash
# Update dependencies monthly:
npm update
git add .
git commit -m "Update dependencies"
git push
# Coolify will auto-deploy
```

### Backup Strategy
- Appwrite data is persistent
- Consider regular database backups
- Keep environment variable records secure

## Support

If you encounter issues:
1. Check Coolify deployment logs
2. Review browser console errors
3. Verify Appwrite configuration
4. Test authentication flow
5. Check environment variables

---

**🎉 Congratulations!** Your Celoris Connect application is now live on Coolify!

Access your application at: `https://app.celoris.in`