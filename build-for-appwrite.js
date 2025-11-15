#!/usr/bin/env node

/**
 * Build Script for Appwrite Sites React Starter Template Deployment
 * 
 * This script prepares Celoris Connect for deployment using the React starter template
 * in Appwrite Sites.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building Celoris Connect for Appwrite Sites...\n');

// Clean previous builds
if (fs.existsSync('dist')) {
  console.log('🧹 Cleaning previous build...');
  execSync('rm -rf dist');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Build the application
console.log('🔨 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Verify build output
if (!fs.existsSync('dist')) {
  console.error('❌ Build completed but dist folder not found');
  process.exit(1);
}

console.log('\n✅ Build completed successfully!');
console.log('\n📦 Deployment package ready:');
console.log(`   Location: ${path.resolve('dist')}`);
console.log('\n🚀 To deploy on Appwrite Sites:');
console.log('   1. Go to Sites → Create Site → React starter template');
console.log('   2. Upload the contents of the "dist" folder');
console.log('   3. Add environment variables');
console.log('   4. Configure your domain');
console.log('\n📋 Required environment variables:');
console.log('   VITE_APPWRITE_PROJECT_ID=69172e650018b6ea783d');
console.log('   VITE_APPWRITE_PUBLIC_ENDPOINT=https://appwrite.celoris.in/v1');
console.log('   VITE_GEMINI_API_KEY=your_gemini_api_key_here');
console.log('\n📚 See REACT_STARTER_DEPLOYMENT.md for detailed instructions\n');