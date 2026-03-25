#!/bin/bash

# Build script for Aprende Español PWA
# This script builds the app for production deployment

set -e # Exit on any error

echo "🇪🇸 Building Aprende Español PWA..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "${BLUE}Checking Node.js version...${NC}"
node_version=$(node --version)
echo "Node.js version: $node_version"

# Check if Node version is >= 14
major_version=$(echo $node_version | cut -d'.' -f1 | sed 's/v//')
if [ "$major_version" -lt "14" ]; then
    echo -e "${RED}Error: Node.js version 14 or higher is required${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install
fi

# Clean previous build
echo -e "${BLUE}Cleaning previous build...${NC}"
rm -rf build/

# Set environment variables for production
export NODE_ENV=production
export GENERATE_SOURCEMAP=false
export REACT_APP_VERSION=$(node -p "require('./package.json').version")

echo -e "${BLUE}Building production bundle...${NC}"
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo -e "${RED}Build failed: build directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}Build completed successfully!${NC}"
echo ""

# Display build information
echo -e "${BLUE}Build Information:${NC}"
echo "=================="
echo "Build directory: $(pwd)/build"
echo "Build size:"
du -sh build/

echo ""
echo -e "${BLUE}Generated files:${NC}"
ls -la build/

echo ""
echo -e "${BLUE}Static assets:${NC}"
if [ -d "build/static" ]; then
    ls -la build/static/
fi

# Validate critical files
echo ""
echo -e "${BLUE}Validating critical files...${NC}"

critical_files=("index.html" "manifest.json" "sw.js")
for file in "${critical_files[@]}"; do
    if [ -f "build/$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file missing${NC}"
    fi
done

# Validate PWA manifest
if [ -f "build/manifest.json" ]; then
    echo -e "${BLUE}Validating PWA manifest...${NC}"
    node -e "
        const fs = require('fs');
        try {
            const manifest = JSON.parse(fs.readFileSync('build/manifest.json', 'utf8'));
            const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
            const missing = required.filter(field => !manifest[field]);
            if (missing.length === 0) {
                console.log('\x1b[32m✓ Manifest valid\x1b[0m');
            } else {
                console.log('\x1b[31m✗ Missing manifest fields:', missing.join(', '), '\x1b[0m');
            }
        } catch (error) {
            console.log('\x1b[31m✗ Manifest validation failed:', error.message, '\x1b[0m');
        }
    "
fi

# Generate deployment info
echo ""
echo -e "${BLUE}Generating deployment info...${NC}"
cat > build/deploy-info.json << EOF
{
    "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "version": "$REACT_APP_VERSION",
    "nodeVersion": "$node_version",
    "buildMode": "production",
    "features": {
        "pwa": true,
        "offline": true,
        "installable": true,
        "responsive": true,
        "darkMode": true
    }
}
EOF

# Create deployment script
echo ""
echo -e "${BLUE}Creating deployment script...${NC}"
cat > build/deploy.sh << 'EOF'
#!/bin/bash
# Quick deployment script

echo "🚀 Deploying Aprende Español..."

# Example deployment to Netlify
# netlify deploy --prod --dir=.

# Example deployment to Vercel  
# vercel --prod

# Example deployment to GitHub Pages
# gh-pages -d .

echo "Choose your deployment method:"
echo "1. Netlify: netlify deploy --prod --dir=."
echo "2. Vercel: vercel --prod"  
echo "3. GitHub Pages: gh-pages -d ."
echo "4. Copy to web server: rsync -av . user@server:/var/www/html/"

EOF

chmod +x build/deploy.sh

# Performance analysis
echo ""
echo -e "${BLUE}Analyzing bundle size...${NC}"
if command -v npx &> /dev/null; then
    echo "Main bundle sizes:"
    find build/static -name "*.js" -exec basename {} \; | head -5 | while read file; do
        size=$(find build/static -name "$file" -exec du -h {} \; | cut -f1)
        echo "  $file: $size"
    done
    
    echo ""
    echo "CSS bundle sizes:"
    find build/static -name "*.css" -exec basename {} \; | head -3 | while read file; do
        size=$(find build/static -name "$file" -exec du -h {} \; | cut -f1)
        echo "  $file: $size"
    done
fi

# Final instructions
echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test locally: npm install -g serve && serve -s build"
echo "2. Deploy: Choose from options in build/deploy.sh"
echo "3. Monitor: Check PWA metrics in browser DevTools"
echo ""
echo -e "${BLUE}Deployment options:${NC}"
echo "• Netlify: drag & drop build folder to netlify.com/drop"
echo "• Vercel: vercel --prod (requires CLI)"
echo "• GitHub Pages: gh-pages -d build (requires setup)"
echo "• Manual: Copy build/ contents to your web server"
echo ""
echo -e "${GREEN}Your PWA is ready for deployment!${NC}"