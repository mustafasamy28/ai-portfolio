# Vercel Deployment Script for PowerShell
# Run this after authenticating with Vercel CLI

Write-Host "🚀 Deploying AI Portfolio to Vercel..." -ForegroundColor Cyan

# Step 1: Link project (if not already linked)
Write-Host "📦 Linking project..." -ForegroundColor Yellow
vercel link --yes --scope=mustafasamy28

# Step 2: Deploy to production
Write-Host "🚀 Deploying to production..." -ForegroundColor Yellow
vercel deploy --prod --yes

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your portfolio is live at: https://mostafa-samy-portfolio.vercel.app" -ForegroundColor Green

Write-Host "`n⚠️  Don't forget to set environment variables in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "   - VITE_REACT_APP_SERVICE_ID" -ForegroundColor White
Write-Host "   - VITE_REACT_APP_TEMPLATE_ID" -ForegroundColor White
Write-Host "   - VITE_REACT_APP_PUBLIC_KEY" -ForegroundColor White
Write-Host "   - OPENAI_API_KEY" -ForegroundColor White


