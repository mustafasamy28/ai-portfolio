# Fix reCAPTCHA "Invalid domain for site key" Error

## 🔍 Root Cause

The error **"ERROR for site owner: Invalid domain for site key"** occurs because:

1. **Hardcoded Site Key**: The reCAPTCHA site key `6LenvhQqAAAAAPlAG2EoXWetFNLXhIn-jwjf3_gp` was registered for specific domains (likely the original developer's domain or localhost)

2. **Domain Not Authorized**: When deployed to Vercel at `mostafa-samy.vercel.app`, this domain is **not authorized** in the Google reCAPTCHA console for that site key

3. **Google's Security**: Google reCAPTCHA only allows site keys to work on domains that are explicitly registered in the reCAPTCHA admin console

## ✅ Solution Options

### Option 1: Add Vercel Domain to Existing Site Key (If you have access)

If you have access to the Google account that created the site key:

1. **Go to Google reCAPTCHA Admin Console**
   - Visit: https://www.google.com/recaptcha/admin
   - Sign in with the Google account that owns the site key

2. **Find Your Site Key**
   - Look for site key: `6LenvhQqAAAAAPlAG2EoXWetFNLXhIn-jwjf3_gp`
   - Click on it to edit

3. **Add Authorized Domains**
   - In the "Domains" section, add:
     - `mostafa-samy.vercel.app`
     - `mostafa-samy-*.vercel.app` (for preview deployments)
     - `localhost` (for local development)
     - Your custom domain if you have one

4. **Save Changes**
   - Click "Save"
   - Wait a few minutes for changes to propagate

5. **Test**
   - Refresh your Vercel deployment
   - The reCAPTCHA should now work

### Option 2: Create New reCAPTCHA Site Key (Recommended)

Create a new site key specifically for your domain:

1. **Go to Google reCAPTCHA Admin Console**
   - Visit: https://www.google.com/recaptcha/admin
   - Sign in with your Google account

2. **Create New Site**
   - Click **"+ Create"** button
   - Fill in the form:
     - **Label**: `Mostafa Samy Portfolio`
     - **reCAPTCHA type**: Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
     - **Domains**: Add these domains:
       - `mostafa-samy.vercel.app`
       - `mostafa-samy-*.vercel.app` (covers all preview deployments)
       - `localhost` (for local development)
       - `127.0.0.1` (for local development)
       - Your custom domain (if applicable)
     - **Owners**: Your email address
   - Accept the reCAPTCHA Terms of Service
   - Click **"Submit"**

3. **Copy Your New Site Key**
   - You'll see two keys:
     - **Site Key** (public, used in frontend) - Copy this
     - **Secret Key** (private, for backend verification) - Keep this secret

4. **Add to Vercel Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add new variable:
     - **Name**: `VITE_RECAPTCHA_SITE_KEY`
     - **Value**: Your new site key (starts with `6L...`)
     - **Environment**: Production, Preview, Development
   - Click **"Save"**

5. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger auto-deployment

### Option 3: Remove reCAPTCHA (If Not Needed)

If you don't need reCAPTCHA protection, you can remove it:

1. **Remove reCAPTCHA Component**
   - Edit `src/Components/Form.jsx`
   - Remove the `<ReCAPTCHA>` component
   - Remove the `capVal` validation check

2. **Remove Dependency** (optional)
   ```bash
   npm uninstall react-google-recaptcha @types/react-google-recaptcha
   ```

## 🔧 Current Implementation

The code has been updated to support environment variables:

```javascript
// In Form.jsx
const PUBLIC_kEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LenvhQqAAAAAPlAG2EoXWetFNLXhIn-jwjf3_gp';
```

This means:
- If `VITE_RECAPTCHA_SITE_KEY` is set in Vercel, it will use that
- Otherwise, it falls back to the hardcoded key (which needs domain authorization)

## 📝 Recommended Steps

**For Production:**

1. **Create a new reCAPTCHA site key** (Option 2) - Most secure and proper solution
2. **Add `VITE_RECAPTCHA_SITE_KEY` to Vercel environment variables**
3. **Redeploy your project**

**For Local Development:**

1. Add `VITE_RECAPTCHA_SITE_KEY` to your `.env` file:
   ```env
   VITE_RECAPTCHA_SITE_KEY=your-new-site-key-here
   ```
2. Make sure `localhost` is in the authorized domains list

## 🎯 Quick Fix (Temporary)

If you need a quick temporary fix while setting up properly:

1. Go to https://www.google.com/recaptcha/admin
2. Find site key `6LenvhQqAAAAAPlAG2EoXWetFNLXhIn-jwjf3_gp`
3. Add `mostafa-samy.vercel.app` to authorized domains
4. Wait 5-10 minutes for propagation
5. Refresh your site

## ⚠️ Important Notes

- **Site keys are public** - It's safe to expose them in frontend code
- **Secret keys are private** - Never expose them in frontend code
- **Domain authorization is required** - Google checks the domain on every request
- **Changes take time** - Domain updates can take 5-10 minutes to propagate
- **Multiple domains** - You can add multiple domains to one site key

## 🔗 Useful Links

- **reCAPTCHA Admin Console**: https://www.google.com/recaptcha/admin
- **reCAPTCHA Documentation**: https://developers.google.com/recaptcha/docs/display
- **Domain Configuration Guide**: https://developers.google.com/recaptcha/docs/domain_validation

---

**After fixing, your reCAPTCHA will work on:**
- ✅ `mostafa-samy.vercel.app` (production)
- ✅ Preview deployments
- ✅ Localhost (if added)


