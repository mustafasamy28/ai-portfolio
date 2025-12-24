# Setting Environment Variables in Vercel

Your project is deployed! Now you need to add environment variables.

## Option 1: Via Vercel Dashboard (Easiest)

1. Go to: https://vercel.com/dashboard
2. Click on project: **mostafa-samy**
3. Go to **Settings** → **Environment Variables**
4. Add these 4 variables:

   **Variable 1:**
   - Name: `VITE_REACT_APP_SERVICE_ID`
   - Value: [Your EmailJS Service ID]
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Name: `VITE_REACT_APP_TEMPLATE_ID`
   - Value: [Your EmailJS Template ID]
   - Environment: Production, Preview, Development

   **Variable 3:**
   - Name: `VITE_REACT_APP_PUBLIC_KEY`
   - Value: [Your EmailJS Public Key]
   - Environment: Production, Preview, Development

   **Variable 4:**
   - Name: `OPENAI_API_KEY`
   - Value: sk-[Your OpenAI API Key]
   - Environment: Production, Preview, Development

5. After adding all variables, go to **Deployments** tab
6. Click the three dots on latest deployment → **Redeploy**

## Option 2: Via CLI (Interactive)

Run these commands one by one (you'll be prompted to enter values):

```bash
vercel env add VITE_REACT_APP_SERVICE_ID production
vercel env add VITE_REACT_APP_TEMPLATE_ID production
vercel env add VITE_REACT_APP_PUBLIC_KEY production
vercel env add OPENAI_API_KEY production
```

For each command:
- When prompted "What's the value of VITE_REACT_APP_SERVICE_ID?", paste your value
- When prompted "Add VITE_REACT_APP_SERVICE_ID to which Environments?", type: `production,preview,development`

After adding all variables, redeploy:
```bash
vercel --prod
```

## Your Live Portfolio

🌐 **Production URL**: https://mostafa-samy.vercel.app

The portfolio is live, but:
- ✅ Rule-based chatbot responses work (no API key needed)
- ⚠️ OpenAI fallback needs `OPENAI_API_KEY`
- ⚠️ Contact form needs EmailJS variables


