#!/bin/bash
# Vercel Deployment Script
# Run this after authenticating with Vercel CLI

echo "🚀 Deploying AI Portfolio to Vercel..."

# Step 1: Link project (if not already linked)
echo "📦 Linking project..."
vercel link --yes --scope=mustafasamy28

# Step 2: Set environment variables
echo "🔑 Setting environment variables..."
# Note: You'll need to set these manually in Vercel dashboard or use:
# vercel env add VITE_REACT_APP_SERVICE_ID production
# vercel env add VITE_REACT_APP_TEMPLATE_ID production
# vercel env add VITE_REACT_APP_PUBLIC_KEY production
# vercel env add OPENAI_API_KEY production

# Step 3: Deploy
echo "🚀 Deploying to production..."
vercel deploy --prod --yes

echo "✅ Deployment complete!"
echo "🌐 Your portfolio is live at: https://mostafa-samy-portfolio.vercel.app"


