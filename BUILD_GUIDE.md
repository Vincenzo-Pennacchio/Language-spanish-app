# Aprende Español - App Build e Distribuzione

Questo documento spiega come buildare e distribuire l'app "Aprende Español" come Progressive Web App (PWA) o come applicazione desktop.

## 🚀 Build di Produzione

### Prerequisiti
- Node.js (v14 o superiore)
- npm o yarn
- Git (opzionale per deploy)

### Comandi di Build

```bash
# Installa le dipendenze
npm install

# Build di produzione ottimizzata
npm run build

# Test del build locale
npm run serve

# Analizza le dimensioni del bundle
npm run analyze
```

### Ottimizzazioni Incluse
- ✅ Minificazione e compressione del codice
- ✅ Tree shaking per rimuovere codice inutilizzato
- ✅ Ottimizzazione immagini e assets
- ✅ Service Worker per funzionalità offline
- ✅ Manifest PWA per installabilità
- ✅ Lazy loading dei componenti
- ✅ Code splitting automatico

## 📱 Distribuzione PWA

### Hosting Statico (Raccomandato)

#### Netlify
1. Crea un account su [Netlify](https://netlify.com)
2. Collega il repository GitHub
3. Imposta build command: `npm run build`
4. Imposta publish directory: `build`
5. Deploy automatico ad ogni push

#### Vercel
1. Crea un account su [Vercel](https://vercel.com)
2. Importa il progetto da GitHub
3. Deploy automatico - nessuna configurazione necessaria

#### GitHub Pages
1. Build: `npm run build`
2. Deploy nella cartella `build`
3. Configura GitHub Pages dal repository

### Self-Hosting

```bash
# Dopo il build
npm install -g serve
serve -s build -l 3000

# Oppure con nginx/apache
# Copia i file da build/ alla web root
```

### Configurazione Domini

```nginx
# Nginx config per PWA
server {
    listen 80;
    server_name tuodominio.com;
    root /path/to/build;
    index index.html;
    
    # PWA caching headers
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker
    location /sw.js {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # SPA fallback
    try_files $uri $uri/ /index.html;
}
```

## 💻 App Desktop (Electron)

### Setup Electron
```bash
# Installa Electron
npm install --save-dev electron electron-builder

# Crea script di package
npm run electron:build

# Genera installatori per tutte le piattaforme
npm run electron:dist
```

### Configurazione Electron
Il file `electron.js` è configurato per:
- Window manager ottimizzato
- Menu nativo
- Auto-updater
- Deep linking
- Sicurezza migliorata

### Distribuibili Generati
- Windows: `.exe` installer + portable
- macOS: `.dmg` + App Store package  
- Linux: `.deb`, `.rpm`, `.AppImage`

## 🔧 Personalizzazione

### Variabili d'Ambiente
Crea un file `.env` per personalizzare:

```env
REACT_APP_NAME="Aprende Español"
REACT_APP_VERSION="1.0.0"
REACT_APP_DESCRIPTION="App per imparare lo spagnolo"
REACT_APP_API_URL="https://api.tuodominio.com"
REACT_APP_ANALYTICS_ID="UA-XXXXXXXXX-X"
```

### Branding
- Logo: Sostituisci i file in `public/icons/`
- Colori: Modifica le variabili CSS in `src/index.css`
- Manifest: Aggiorna `public/manifest.json`

## 📊 Analytics e Monitoraggio

### Google Analytics
```javascript
// Aggiungi a public/index.html
gtag('config', 'GA_TRACKING_ID', {
  page_title: 'Aprende Español',
  page_location: window.location.href
});
```

### Error Tracking
```bash
# Sentry per error tracking
npm install @sentry/react @sentry/tracing
```

## 🔄 Auto-Update

### PWA Update
- L'app si aggiorna automaticamente quando vengono pushate modifiche
- Gli utenti vedono un banner di aggiornamento
- Supporta update in background

### Electron Update
- Configurato con `electron-updater`
- Download automatico degli aggiornamenti
- Installazione tramite notifica

## 📈 Performance

### Metriche Target
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s  
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Ottimizzazioni Applicate
- Lazy loading delle route
- Image optimization
- Service Worker caching
- Bundle splitting
- Resource preloading

## 🚨 Risoluzione Problemi

### Build Fallisce
```bash
# Pulisci cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Verifica versione Node
node --version  # Deve essere >= 14
```

### PWA Non Installabile
1. Verifica manifesto valido
2. Controlla HTTPS (richiesto per PWA)
3. Testa con Chrome DevTools > Application > Manifest

### Service Worker Non Funziona
1. Verifica registrazione in DevTools > Application > Service Workers
2. Controlla scope del SW
3. Testa cache in DevTools > Application > Cache Storage

## 📞 Supporto

Per problemi di deployment o configurazione:
- GitHub Issues: Segnala bug e richieste
- Email: support@aprendeespanol.com
- Documentazione: [Wiki del progetto]

---

**Nota**: Questo setup è ottimizzato per performance e user experience. L'app funziona offline e può essere installata come app nativa su tutti i dispositivi.