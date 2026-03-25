# Simple PowerShell Build Script for Windows
# Builds and validates the Spanish Learning PWA

Write-Host "🇪🇸 Building Aprende Español PWA..." -ForegroundColor Cyan

# Check Node version
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$version = node --version
Write-Host "Node.js version: $version" -ForegroundColor Green

# Build
Write-Host "Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    
    # Check build files
    Write-Host "Checking build files..." -ForegroundColor Yellow
    if (Test-Path "build\index.html") { Write-Host "✅ index.html" -ForegroundColor Green }
    if (Test-Path "build\manifest.json") { Write-Host "✅ manifest.json" -ForegroundColor Green }
    if (Test-Path "build\sw.js") { Write-Host "✅ sw.js" -ForegroundColor Green }
    
    # Size info
    $size = (Get-ChildItem "build" -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 2)
    Write-Host "📦 Build size: $sizeMB MB" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "🚀 Ready to deploy!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "• Test: serve -s build"
    Write-Host "• Deploy: Go to https://netlify.com/drop"
    Write-Host "• Drag the 'build' folder to deploy instantly!"
    
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
}