# Build & Deployment Guide - Windows

## Quick Start
```powershell
# Test the build process
.\build.ps1

# Clean build
.\build.ps1 -Clean

# Build with analysis
.\build.ps1 -Analyze

# Build and deploy to Vercel
.\build.ps1 -DeployTarget vercel
```

## Prerequisites

### Required Software
- **Node.js 14+** - Download from [nodejs.org](https://nodejs.org)
- **Git** - Download from [git-scm.com](https://git-scm.com)

### Verify Installation
```powershell
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
```

## Build Process

### 1. Install Dependencies
```powershell
npm install
```

### 2. Build for Production
```powershell
# Standard build
npm run build

# OR use our custom script
.\build.ps1
```

### 3. Test Locally
```powershell
# Install serve globally
npm install -g serve

# Serve the build
serve -s build -p 3000
```

**Open:** http://localhost:3000

## Deployment Options

### Option 1: Netlify (Recommended)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the `build` folder to the page
3. Your app is live instantly!

### Option 2: Vercel
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy from build folder
cd build
vercel --prod
```

### Option 3: GitHub Pages
```powershell
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d build"

npm run deploy
```

### Option 4: Manual Upload
1. Build the app: `npm run build`
2. Copy contents of `build\` folder
3. Upload to your web hosting service

## PWA Features Validation

After deployment, test these features:

### Installation
- **Desktop:** Chrome shows install button in address bar
- **Mobile:** Chrome shows "Add to Home Screen" banner

### Offline Functionality
1. Visit your deployed app
2. Turn off internet connection
3. Refresh page - should still work

### Auto-Updates
- App checks for updates every time it loads
- Users get notified of new versions

## Build Script Features

Our `build.ps1` script provides:

### Standard Build
```powershell
.\build.ps1
```
- Installs dependencies if needed
- Builds production bundle
- Validates PWA manifest
- Creates deployment helper

### Clean Build
```powershell
.\build.ps1 -Clean
```
- Removes `node_modules` and `build` folders
- Fresh installation and build
- Useful for troubleshooting

### Bundle Analysis
```powershell
.\build.ps1 -Analyze
```
- Shows largest JavaScript/CSS files
- Helps optimize bundle size
- Identifies potential improvements

### Auto-Deploy
```powershell
.\build.ps1 -DeployTarget netlify
.\build.ps1 -DeployTarget vercel
```
- Builds and deploys in one command
- Requires CLI tools installed

## Performance Targets

After deployment, your app should achieve:

- **Lighthouse PWA Score:** 95+
- **Performance Score:** 90+  
- **First Load:** < 3 seconds
- **Bundle Size:** < 2MB
- **Mobile Responsive:** All screen sizes

## Troubleshooting

### Build Fails
```powershell
# Clean and retry
.\build.ps1 -Clean
```

### NPM Install Errors
```powershell
# Clear npm cache
npm cache clean --force

# Remove package-lock.json
Remove-Item package-lock.json

# Reinstall
npm install
```

### PowerShell Execution Policy
```powershell
# If scripts are blocked
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Service Worker Issues
- Clear browser cache
- Check HTTPS requirement for SW
- Verify manifest.json is accessible

## Environment Variables

Create `.env.production` for production settings:

```
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
BUILD_PATH=build
```

## Domain Setup

### Custom Domain (Netlify)
1. Build and deploy your app
2. Go to Domain Settings in Netlify dashboard  
3. Add your custom domain
4. Update DNS records as instructed

### Custom Domain (Vercel)
1. Deploy with `vercel --prod`
2. Go to project dashboard
3. Add domain in settings
4. Update DNS records

## Monitoring

### PWA Metrics
Use browser DevTools:
1. **F12** → **Application** → **Service Workers**
2. **Lighthouse** → Run PWA audit
3. **Network** → Test offline functionality

### Analytics (Optional)
Add Google Analytics:
```javascript
// Add to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## Update Process

To update your deployed app:

1. Make your changes
2. Run `.\build.ps1`
3. Deploy using same method as initial deployment
4. Users automatically get updates through service worker

---

## Quick Commands Reference

```powershell
# Development
npm start                    # Start dev server
npm test                    # Run tests  
npm run build               # Production build

# Custom build script
.\build.ps1                 # Standard build
.\build.ps1 -Clean          # Clean build  
.\build.ps1 -Analyze        # With analysis

# Deployment
serve -s build              # Local test
netlify deploy --prod       # Netlify deploy
vercel --prod               # Vercel deploy
```

Your Spanish learning PWA is ready for the world! 🇪🇸🚀