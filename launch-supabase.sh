#!/bin/bash

# =============================================
# LAUNCH CELORIS CONNECT WITH SUPABASE
# =============================================

echo "🚀 Launching Celoris Connect with Supabase..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this from the celoris-connect directory"
    exit 1
fi

# Check for Supabase environment variables
if [ ! -f ".env" ] || ! grep -q "VITE_SUPABASE_URL" .env || grep -q "your-project.supabase.co" .env 2>/dev/null; then
    echo "❌ Supabase environment variables not configured!"
    echo ""
    echo "📋 Setup Steps:"
    echo "1. Create Supabase project at https://supabase.com"
    echo "2. Get your project URL and anon key"
    echo "3. Update .env file:"
    echo "   VITE_SUPABASE_URL=https://your-project.supabase.co"
    echo "   VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo "4. Run SQL schema: supabase-schema.sql"
    echo ""
    echo "💡 Or run: ./setup-supabase.sh"
    exit 1
fi

echo "✅ Environment configured"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🔥 LIVE DEVELOPMENT FEATURES:"
echo "   • Hot reloading - instant updates"
echo "   • Real-time subscriptions"
echo "   • Auto TypeScript types"
echo "   • Built-in authentication"
echo ""
echo "🌐 Starting development server..."
echo "   URL: http://localhost:5173"
echo "   Supabase: Connected"
echo ""

# Start development server
npm run dev