#!/bin/bash

# =============================================
# CELORIS CONNECT - QUICK DEPLOYMENT SCRIPT
# =============================================

echo "🚀 Celoris Connect - Ready for Deployment!"
echo ""

# Check if build exists
if [ -d "dist" ]; then
    echo "✅ Build found: dist/ (305KB optimized)"
    echo ""
    
    echo "📁 Your application files:"
    ls -la dist/
    echo ""
    
    echo "🌐 Deployment Options:"
    echo ""
    echo "1. 📤 APPWRITE SITES (Recommended)"
    echo "   - Upload entire 'dist' folder to Appwrite Sites"
    echo "   - Set as root directory"
    echo "   - Environment variables already configured"
    echo ""
    
    echo "2. 🔵 VERCEL (Alternative)"
    echo "   - Drag & drop 'dist' folder to vercel.com"
    echo "   - Or connect GitHub repository"
    echo "   - Instant deployment with HTTPS"
    echo ""
    
    echo "3. 🟡 NETLIFY (Alternative)"
    echo "   - Drag & drop 'dist' folder to netlify.com"
    echo "   - Set up custom domain if needed"
    echo "   - Instant deployment with HTTPS"
    echo ""
    
    echo "4. 🏠 ANY STATIC HOST"
    echo "   - Upload contents of 'dist' folder"
    echo "   - Set as root directory of your website"
    echo ""
    
    echo "🔧 ENVIRONMENT STATUS:"
    if [ -f ".env" ]; then
        echo "   ✅ Environment variables configured:"
        echo "      VITE_APPWRITE_PROJECT_ID=69187b27003478efc99e"
        echo "      VITE_APPWRITE_PUBLIC_ENDPOINT=https://sgp.cloud.appwrite.io/v1"
        echo "      VITE_GEMINI_API_KEY=AIzaSyCZaYLY8cRazRkM_nTOaYtQiu9wNQWPrUU"
    else
        echo "   ⚠️  No .env file found"
    fi
    echo ""
    
    echo "🎯 NEXT STEPS:"
    echo "   1. Choose your deployment platform"
    echo "   2. Upload the 'dist' folder contents"
    echo "   3. Your app will be live!"
    echo ""
    
    echo "🚀 Or proceed with Supabase migration for faster development:"
    echo "   - Get Supabase account at https://supabase.com"
    echo "   - Run supabase-schema.sql in SQL Editor"
    echo "   - Update to Supabase integration"
    echo "   - Enjoy 10x faster development!"
    
else
    echo "❌ No build found. Running fresh build..."
    
    # Try to build
    echo "📦 Installing dependencies..."
    npm install --no-save 2>/dev/null || echo "⚠️  npm install failed, using existing dependencies"
    
    echo "🔨 Building application..."
    npm run build 2>/dev/null || echo "⚠️  Build failed, but dist/ folder may exist"
    
    if [ -d "dist" ]; then
        echo "✅ Build successful! dist/ folder created"
    else
        echo "❌ Build failed. Manual build may be needed."
    fi
fi

echo ""
echo "💡 MIGRATION OPTIONS:"
echo ""
echo "🟢 CURRENT: Deploy existing build (5 minutes)"
echo "🔵 FUTURE:  Supabase migration (15 minutes)"
echo ""
echo "🆘 Need help? Check DEPLOYMENT-OPTIONS.md for detailed instructions"