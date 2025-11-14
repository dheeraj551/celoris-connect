#!/bin/bash

# Celoris Connect Setup Script
# This script helps you set up the development environment

echo "🚀 Setting up Celoris Connect..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment file..."
    cp .env.example .env
    echo "📝 Please edit .env file with your Appwrite credentials:"
    echo "   - VITE_APPWRITE_PROJECT_ID"
    echo "   - VITE_APPWRITE_PUBLIC_ENDPOINT" 
    echo "   - VITE_GEMINI_API_KEY"
else
    echo "✅ .env file already exists"
fi

# Display next steps
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your credentials"
echo "2. Set up Appwrite collections (see README.md)"
echo "3. Run 'npm run dev' to start development server"
echo "4. Visit http://localhost:5173"
echo ""
echo "🌐 For deployment:"
echo "- Follow DEPLOYMENT.md guide for Coolify setup"
echo "- Make sure to configure environment variables"
echo "- Set up your domain and SSL certificate"
echo ""
echo "💡 Need help? Check the README.md file"