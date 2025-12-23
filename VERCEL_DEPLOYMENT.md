# Vercel Deployment Guide - AI Portfolio

Complete step-by-step guide to deploy your AI Portfolio to Vercel.

## 📋 Prerequisites

- ✅ GitHub repository: `mustafasamy28/ai-portfolio` (already set up)
- Vercel account (sign up at https://vercel.com if needed)
- Environment variables ready (see list below)

## 🔑 Environment Variables Required

**IMPORTANT:** For Vite projects, environment variables exposed to the client must be prefixed with `VITE_`.

Configure these in Vercel Dashboard → Settings → Environment Variables:

### Frontend (EmailJS - Contact Form)
| Variable Name | Description | Where to Get It |
|--------------|-------------|-----------------|
| `VITE_REACT_APP_SERVICE_ID` | EmailJS Service ID | [EmailJS Dashboard](https://dashboard.emailjs.com/admin) |
| `VITE_REACT_APP_TEMPLATE_ID` | EmailJS Template ID | [EmailJS Dashboard](https://dashboard.emailjs.com/admin) |
| `VITE_REACT_APP_PUBLIC_KEY` | EmailJS Public Key | [EmailJS Dashboard](https://dashboard.emailjs.com/admin) |

### Backend (OpenAI - Chatbot)
| Variable Name | Description | Where to Get It |
|--------------|-------------|-----------------|
| `OPENAI_API_KEY` | OpenAI API Key for GPT-4o-mini | [OpenAI Platform](https://platform.openai.com/api-keys) |

**Note:** 
- Frontend variables (`VITE_*`) are exposed to the browser
- Backend variable (`OPENAI_API_KEY`) is only available in serverless functions
- Set all variables for **Production**, **Preview**, and **Development** environments

## 🚀 Step-by-Step Deployment

### Step 1: Sign In to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Sign in with your GitHub account (recommended for easy integration)
3. Authorize Vercel to access your GitHub repositories

### Step 2: Import GitHub Repository

1. Click **"Add New..."** button (top right corner)
2. Select **"Project"**
3. Click **"Import Git Repository"**
4. You'll see a list of your GitHub repositories
5. Find and click on: **`mustafasamy28/ai-portfolio`**
6. Click **"Import"**

### Step 3: Configure Project Settings

#### Project Name
- **Project Name**: `mostafa-samy-portfolio`
  - This will give you: `https://mostafa-samy-portfolio.vercel.app`
  - **Alternative**: Use `mostafa-samy` for shorter URL: `https://mostafa-samy.vercel.app`
  - You can change this later in Project Settings → General

#### Framework Preset
- **Framework Preset**: Should auto-detect as **"Vite"**
- If not detected, manually select **"Vite"** or **"Other"**

#### Root Directory
- Leave as **`.`** (root directory)

#### Build and Output Settings
- **Build Command**: `npm run build` (should auto-fill)
- **Output Directory**: `dist` (should auto-fill)
- **Install Command**: `npm install` (should auto-fill)
- **Development Command**: `npm run dev` (optional)

### Step 4: Configure Environment Variables

**⚠️ CRITICAL:** Add environment variables BEFORE first deployment:

1. In the project configuration page, scroll down to **"Environment Variables"** section
2. Click **"Add"** button for each variable:

   **Variable 1:**
   ```
   Name: VITE_REACT_APP_SERVICE_ID
   Value: [Your EmailJS Service ID]
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 2:**
   ```
   Name: VITE_REACT_APP_TEMPLATE_ID
   Value: [Your EmailJS Template ID]
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 3:**
   ```
   Name: VITE_REACT_APP_PUBLIC_KEY
   Value: [Your EmailJS Public Key]
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 4:**
   ```
   Name: OPENAI_API_KEY
   Value: sk-[Your OpenAI API Key]
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

3. Click **"Save"** after adding each variable
4. Verify all 4 variables are listed

### Step 5: Deploy

1. Review all settings one more time
2. Click **"Deploy"** button (bottom of the page)
3. Watch the build logs in real-time:
   - Installing dependencies
   - Building project
   - Deploying to Vercel edge network
4. Build typically takes 2-3 minutes

### Step 6: Verify Deployment

Once deployment completes:

1. You'll see a **✅ Success** message
2. Your deployment URL will be displayed:
   - **Production**: `https://mostafa-samy-portfolio.vercel.app`
3. Click the URL to visit your live portfolio
4. Test the following:
   - ✅ Portfolio homepage loads
   - ✅ Navigation works
   - ✅ Chatbot button appears (bottom right)
   - ✅ Chatbot responds to questions
   - ✅ Contact form works (if EmailJS configured)
   - ✅ All pages are accessible
   - ✅ Mobile responsive design

## 🔧 Custom Domain (Optional)

To use a custom domain like `mostafa-samy.com`:

1. Go to **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `mostafa-samy.com`
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (up to 24 hours)
5. Vercel automatically provisions SSL certificate

## 📝 Project URL Structure

After deployment, you'll have:

- **Production URL**: `https://mostafa-samy-portfolio.vercel.app`
- **Preview URLs**: `https://mostafa-samy-portfolio-{hash}.vercel.app` (for PRs/branches)
- **Automatic HTTPS**: ✅ Enabled by default
- **Global CDN**: ✅ Automatic

## 🔄 Automatic Deployments

Vercel automatically deploys:

- ✅ **Every push to `main` branch** → Production deployment
- ✅ **Every pull request** → Preview deployment with unique URL
- ✅ **Every branch push** → Preview deployment

You can disable auto-deployments in Project Settings if needed.

## 🛠️ Troubleshooting

### Build Fails

**Error: "Module not found" or "Cannot find module"**
- Solution: Ensure `package.json` has all dependencies
- Run `npm install` locally to verify
- Check `package-lock.json` is committed

**Error: "Environment variable not found"**
- Solution: Ensure all env vars are set in Vercel dashboard
- Variable names must match exactly (case-sensitive)
- Redeploy after adding variables

**Error: "Build command failed"**
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Check for TypeScript/ESLint errors

### Chatbot Not Working

**Rule-based responses work, but OpenAI fallback doesn't:**
- Check `OPENAI_API_KEY` is set correctly in Vercel
- Verify API key format: starts with `sk-`
- Check OpenAI account has credits/quota
- View serverless function logs: **Project** → **Functions** → `/api/chat`

**Serverless function errors:**
- Go to **Project Dashboard** → **Functions** tab
- Click on `/api/chat` or `/api/voice-chat`
- Check error logs and stack traces
- Verify `OPENAI_API_KEY` is accessible in serverless functions

**"OPENAI_API_KEY is not configured" error:**
- Ensure variable is set for Production environment
- Redeploy after adding the variable
- Check variable name is exactly `OPENAI_API_KEY`

### Contact Form Not Working

**EmailJS errors:**
- Verify all three EmailJS variables are set:
  - `VITE_REACT_APP_SERVICE_ID`
  - `VITE_REACT_APP_TEMPLATE_ID`
  - `VITE_REACT_APP_PUBLIC_KEY`
- Check EmailJS dashboard for service status
- Verify EmailJS template is published
- Check browser console for errors

**Form submits but no email received:**
- Check EmailJS dashboard → Email Logs
- Verify email template configuration
- Check spam folder
- Verify recipient email in template

### Image Not Loading in README

If `src/assets/PortFolio.png` doesn't show in GitHub README:
- GitHub READMEs can't access `src/` folder directly
- Options:
  1. Move image to `public/` folder: `public/PortFolio.png`
  2. Use GitHub raw URL: `https://raw.githubusercontent.com/mustafasamy28/ai-portfolio/main/src/assets/PortFolio.png`
  3. Use a different image hosting service

### CORS Errors

**"Access-Control-Allow-Origin" errors:**
- Serverless functions already include CORS headers
- If issues persist, check Vercel function configuration
- Verify API endpoints are correct: `/api/chat` and `/api/voice-chat`

## 📊 Monitoring & Analytics

Vercel provides built-in monitoring:

- **Analytics**: Page views, performance metrics
- **Logs**: Serverless function execution logs
- **Speed Insights**: Real-time performance monitoring
- **Web Vitals**: Core Web Vitals tracking

Access via **Project Dashboard** → **Analytics** tab

## 🔐 Security Best Practices

1. ✅ Never commit `.env` files (already in `.gitignore`)
2. ✅ Use Vercel environment variables (not hardcoded in code)
3. ✅ Rotate API keys periodically
4. ✅ Use different keys for production/preview if needed
5. ✅ Keep dependencies updated (`npm audit`)
6. ✅ Review serverless function logs regularly

## 💰 Vercel Free Tier

**What's Included:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ 100 serverless function executions/day
- ✅ Custom domains (unlimited)
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ Preview deployments for PRs

**Upgrade to Pro ($20/month) if you need:**
- Higher bandwidth (1TB)
- More serverless executions (1M/month)
- Team collaboration features
- Advanced analytics

## 📞 Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Vite Documentation**: https://vitejs.dev

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] GitHub repository is public and accessible
- [ ] All environment variables are ready (EmailJS + OpenAI)
- [ ] Project builds locally (`npm run build` succeeds)
- [ ] No sensitive data hardcoded in code
- [ ] `.env` is in `.gitignore` (already done ✅)
- [ ] All dependencies are in `package.json`
- [ ] `package-lock.json` is committed

## ✅ Post-Deployment Checklist

After deployment, verify:
- [ ] Portfolio loads at the deployment URL
- [ ] All pages are accessible
- [ ] Chatbot responds to queries (rule-based)
- [ ] OpenAI fallback works (if API key configured)
- [ ] Contact form sends emails (if EmailJS configured)
- [ ] Mobile responsive design works
- [ ] Images and assets load correctly
- [ ] Navigation works smoothly
- [ ] No console errors in browser DevTools

---

## 🎯 Quick Reference

**Your Portfolio URLs:**
- Production: `https://mostafa-samy-portfolio.vercel.app`
- GitHub: `https://github.com/mustafasamy28/ai-portfolio`

**Environment Variables Needed:**
1. `VITE_REACT_APP_SERVICE_ID` (EmailJS)
2. `VITE_REACT_APP_TEMPLATE_ID` (EmailJS)
3. `VITE_REACT_APP_PUBLIC_KEY` (EmailJS)
4. `OPENAI_API_KEY` (OpenAI)

**Build Settings:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

🎉 **Congratulations!** Your AI Portfolio is now live on Vercel!

For detailed chatbot setup, see [CHATBOT_SETUP.md](./CHATBOT_SETUP.md)
