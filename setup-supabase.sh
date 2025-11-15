#!/bin/bash

# =============================================
# CELORIS CONNECT - SUPABASE SETUP SCRIPT
# =============================================

echo "🚀 Setting up Celoris Connect with Supabase..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the celoris-connect directory"
    exit 1
fi

# Check for Supabase credentials
if [ ! -f ".env" ] || ! grep -q "VITE_SUPABASE_URL" .env; then
    echo "📝 Setting up Supabase environment variables..."
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.supabase .env
        echo "📄 Copied .env.supabase to .env"
        echo "⚠️  Please update .env with your Supabase credentials:"
        echo "   - VITE_SUPABASE_URL"
        echo "   - VITE_SUPABASE_ANON_KEY"
        echo ""
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Supabase dependency was installed
if [ ! -d "node_modules/@supabase" ]; then
    echo "⚠️  Supabase dependency not found. Attempting manual installation..."
    
    # Try installing with force flag
    npm install @supabase/supabase-js --save --force
    
    if [ ! -d "node_modules/@supabase" ]; then
        echo "❌ Failed to install Supabase dependency"
        echo "💡 Please manually run: npm install @supabase/supabase-js"
        echo ""
        echo "Continuing with other setup..."
    fi
fi

echo "🗄️  Database Setup Instructions:"
echo "1. Create a new Supabase project at https://supabase.com"
echo "2. Copy your project URL and anon key from Settings > API"
echo "3. Update the .env file with your credentials"
echo "4. Run the SQL from supabase-schema.sql in the SQL Editor"
echo "5. Set up storage buckets: 'avatars' and 'documents'"
echo ""

echo "🔐 Authentication Setup:"
echo "1. Go to Authentication > Settings in your Supabase dashboard"
echo "2. Enable email confirmations"
echo "3. Add your domain to redirect URLs"
echo ""

echo "📁 Storage Setup:"
echo "1. Go to Storage in your Supabase dashboard"
echo "2. Create 'avatars' bucket (make public)"
echo "3. Create 'documents' bucket (make public)"
echo ""

# Check if environment variables are set
if grep -q "your-project.supabase.co" .env 2>/dev/null; then
    echo "⚠️  Please update .env file with your actual Supabase credentials before running the app"
else
    echo "✅ Environment variables appear to be configured"
    echo ""
    
    echo "🎉 Setup complete! Start developing with:"
    echo "   npm run dev"
    echo ""
    echo "🌐 Your app will be available at: http://localhost:5173"
    echo ""
    echo "🚀 Supabase Features Available:"
    echo "   • Real-time database subscriptions"
    echo "   • Built-in authentication"
    echo "   • File upload with CDN"
    echo "   • Auto-generated TypeScript types"
    echo "   • Row Level Security policies"
    echo "   • Visual SQL editor in Supabase dashboard"
fi

echo ""
echo "📚 Additional Resources:"
echo "   • Supabase Documentation: https://supabase.com/docs"
echo "   • Real-time Guide: https://supabase.com/docs/guides/realtime"
echo "   • Authentication Guide: https://supabase.com/docs/guides/auth"
echo ""
echo "Happy coding! 🎯"