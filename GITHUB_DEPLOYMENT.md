# GitHub Deployment Guide

## Quick Start Commands

Run these commands in your terminal from the project root directory:

```bash
# Initialize git repository
git init

# Add all files (respecting .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: AI Portfolio with hybrid chatbot"

# Add remote repository
git remote add origin https://github.com/mustafasamy28/ai-portfolio.git

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

## Step-by-Step Instructions

### 1. Initialize Git Repository

```bash
git init
```

This creates a new git repository in your project directory.

### 2. Stage All Files

```bash
git add .
```

This stages all files except those in `.gitignore`:
- ✅ Source code and components
- ✅ Configuration files
- ✅ Documentation
- ❌ `node_modules/` (excluded)
- ❌ `.env` files (excluded)
- ❌ Build artifacts (excluded)

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: AI Portfolio with hybrid chatbot"
```

Or use a more detailed message:
```bash
git commit -m "Initial commit: AI Portfolio

- React portfolio with responsive design
- Hybrid chatbot (rule-based + OpenAI GPT-4o-mini)
- Voice chat support with Whisper API
- Rate limiting and error handling
- Vercel serverless functions
- EmailJS contact form integration"
```

### 4. Add Remote Repository

```bash
git remote add origin https://github.com/mustafasamy28/ai-portfolio.git
```

**Note**: Make sure you've created the repository on GitHub first:
1. Go to https://github.com/new
2. Repository name: `ai-portfolio`
3. Description: "AI Portfolio with hybrid chatbot"
4. Visibility: Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 5. Set Main Branch and Push

```bash
git branch -M main
git push -u origin main
```

This will:
- Rename your branch to `main` (if it's not already)
- Push all commits to GitHub
- Set upstream tracking for future pushes

## Verification

After pushing, verify your repository:

1. Visit: https://github.com/mustafasamy28/ai-portfolio
2. Check that all files are present
3. Verify `.env` is NOT visible (it's in `.gitignore`)
4. Check that README.md displays correctly

## Future Updates

For future changes:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Important Notes

### ✅ Files Included
- All source code (`src/`)
- Configuration files (`package.json`, `vite.config.js`, etc.)
- Documentation (`README.md`, `CHATBOT_SETUP.md`)
- Public assets (`public/`)
- Serverless functions (`api/`)

### ❌ Files Excluded (via .gitignore)
- `node_modules/` - Dependencies (install with `npm install`)
- `.env` - Environment variables (use `.env.example` as template)
- `dist/` - Build output (generated on build)
- `.vercel/` - Vercel deployment files
- Editor files (`.vscode/`, `.idea/`, etc.)

### 🔒 Security Checklist

Before pushing, ensure:
- [ ] No API keys in code
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` has placeholder values only
- [ ] No sensitive data in comments
- [ ] No hardcoded credentials

## Troubleshooting

### "Repository not found"
- Make sure you've created the repository on GitHub
- Check the repository name matches: `ai-portfolio`
- Verify your GitHub username: `mustafasamy28`

### "Permission denied"
- Make sure you're authenticated with GitHub
- Use GitHub CLI: `gh auth login`
- Or use SSH instead of HTTPS

### "Large files" warning
- Check for large files in `src/assets/`
- Consider using Git LFS for large assets
- Or optimize images before committing

### Want to use SSH instead?

If you prefer SSH:

```bash
git remote set-url origin git@github.com:mustafasamy28/ai-portfolio.git
git push -u origin main
```

## Next Steps After Deployment

1. **Set up Vercel Integration**
   - Connect GitHub repository to Vercel
   - Configure environment variables
   - Enable automatic deployments

2. **Configure Environment Variables**
   - Add `OPENAI_API_KEY` in Vercel dashboard
   - Add EmailJS credentials
   - See [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for details

3. **Test Deployment**
   - Visit your Vercel deployment URL
   - Test chatbot functionality
   - Verify contact form works

4. **Update README**
   - Add your live portfolio URL
   - Update any project-specific details

---

**Repository URL**: https://github.com/mustafasamy28/ai-portfolio

