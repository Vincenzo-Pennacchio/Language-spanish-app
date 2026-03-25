# Aprende Español - PWA 🇪🇸

A comprehensive Progressive Web Application for learning Spanish, designed specifically for Italian speakers.

## ✨ Features

### Core Learning Modules
- **📚 Vocabulary Foundation** - 150+ words across 9 categories
- **📖 Grammar Guide** - Essential Spanish grammar with examples
- **💬 Phrase Bank** - Common conversations and expressions
- **🗣️ Pronunciation Coach** - Text-to-speech with native pronunciation
- **📈 Progress Tracker** - Track learning achievements and statistics
- **🎯 Immersion Plan** - Structured learning path
- **🤖 Conversation Simulator** - Interactive dialogue practice

### Advanced Features  
- **🎮 Mini Games** - Word matching and speed translation games
- **❓ Interactive Quizzes** - Multiple choice and fill-in-the-blank
- **📱 PWA Support** - Install as mobile/desktop app
- **🌙 Dark Mode** - Eye-friendly dark theme
- **📱 Mobile Responsive** - Works perfectly on all devices
- **⚡ Offline Support** - Continue learning without internet
- **🔄 Auto-Updates** - Always get the latest features

## 🚀 Getting Started (Windows)

### Prerequisites
- **Node.js 14+** - [Download here](https://nodejs.org)
- **Git** - [Download here](https://git-scm.com)

### Quick Setup
```powershell
# Clone the repository
git clone [repository-url] spanish-app
cd spanish-app

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔨 Build & Deploy

### Using Our Custom Build Script (Recommended)
```powershell
# Standard build
.\build.ps1

# Clean build (removes all cache)
.\build.ps1 -Clean

# Build with bundle analysis
.\build.ps1 -Analyze

# Build and auto-deploy to Vercel
.\build.ps1 -DeployTarget vercel
```

### Manual Build
```powershell
# Production build
npm run build

# Test locally  
npm install -g serve
serve -s build -p 3000
```

## 📱 Installation as PWA

After deployment, users can install the app:
- **Desktop:** Click install button in browser address bar
- **Mobile:** Use "Add to Home Screen" option
- **Offline:** App works without internet connection

## 🚀 Deployment Options

### 1. Netlify (Easiest)
1. Run `.\build.ps1` 
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `build` folder
4. Done! Your app is live

### 2. Vercel
```powershell
npm i -g vercel
.\build.ps1 -DeployTarget vercel
```

### 3. GitHub Pages
```powershell
npm install --save-dev gh-pages
# Add "deploy": "gh-pages -d build" to package.json scripts
npm run deploy
```

## 🎯 Performance Targets

Our app achieves:
- ⚡ **Lighthouse PWA Score:** 95+
- 🚀 **Performance Score:** 90+
- ⏱️ **First Load:** < 3 seconds  
- 📦 **Bundle Size:** < 2MB
- 📱 **Mobile Responsive:** All screen sizes

## 🛠️ Development Scripts

```powershell
# Development
npm start                    # Start dev server (localhost:3000)
npm test                     # Run tests
npm run build               # Production build

# Custom build script  
.\build.ps1                 # Standard production build
.\build.ps1 -Clean          # Clean build (fresh install)  
.\build.ps1 -Analyze        # Build with bundle analysis

# Deployment
serve -s build              # Test production build locally
netlify deploy --prod       # Deploy to Netlify
vercel --prod               # Deploy to Vercel
```

## 📁 Project Structure

```
spanish-app/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── App.js             # Main app component
│   ├── AppContext.js      # Global state management
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles
│   └── components/
│       ├── HomePage.js              # Landing page
│       ├── VocabularyFoundation.js  # Vocabulary learning
│       ├── GrammarGuide.js          # Grammar lessons
│       ├── PhraseBank.js            # Common phrases
│       ├── PronunciationCoach.js    # Pronunciation practice
│       ├── ProgressTracker.js       # Progress tracking
│       ├── ImmersionPlan.js         # Learning plan
│       ├── ConversationSimulator.js # Dialogue practice
│       ├── MiniGames.js            # Interactive games
│       ├── InteractiveQuiz.js       # Quizzes
│       └── Settings.js              # App settings
├── build.ps1               # Windows build script
├── BUILD_GUIDE_WINDOWS.md  # Windows deployment guide
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
Create `.env.production` for production settings:
```
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
BUILD_PATH=build
```

### PWA Settings
The app is configured as a PWA with:
- ✅ **Installable** - Add to home screen
- ✅ **Offline** - Works without internet  
- ✅ **Auto-updates** - Users get latest version automatically
- ✅ **Responsive** - Perfect on all devices

## 🐛 Troubleshooting

### PowerShell Script Issues
```powershell
# If execution is blocked
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Build Failures  
```powershell
# Clean and rebuild
.\build.ps1 -Clean
```

### NPM Issues
```powershell
# Clear cache and reinstall
npm cache clean --force
Remove-Item package-lock.json
Remove-Item -Recurse node_modules
npm install
```

## 📱 Mobile Testing

Test the PWA on mobile:
1. Deploy to Netlify/Vercel
2. Open on mobile browser
3. Test "Add to Home Screen"
4. Verify offline functionality
5. Check responsive design

## 🌟 Key Technologies

- **React 18.2.0** - Modern React with hooks
- **Progressive Web App** - Installable, offline-capable
- **Context API** - State management with localStorage persistence
- **CSS Grid/Flexbox** - Mobile-first responsive design
- **Web Speech API** - Native text-to-speech
- **Service Worker** - Offline support and caching
- **Lucide Icons** - Beautiful, consistent icons

## 🔗 Useful Links

- **Build Guide:** [BUILD_GUIDE_WINDOWS.md](BUILD_GUIDE_WINDOWS.md)
- **React Docs:** [reactjs.org](https://reactjs.org)
- **PWA Guide:** [web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)
- **Netlify Deploy:** [netlify.com/drop](https://netlify.com/drop)
- **Vercel Deploy:** [vercel.com](https://vercel.com)

---

## 🎉 Quick Start Summary

1. **Install:** `npm install`
2. **Develop:** `npm start`
3. **Build:** `.\build.ps1`  
4. **Deploy:** Drag `build` folder to [netlify.com/drop](https://netlify.com/drop)
5. **Enjoy:** Your Spanish learning PWA is live! 🇪🇸

Your students can now install and use your app on any device, even offline! 🚀