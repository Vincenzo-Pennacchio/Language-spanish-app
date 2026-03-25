# PowerShell Build Script for Aprende Español PWA
# This script builds the app for production deployment on Windows

param(
    [switch]$Clean = $false,
    [switch]$Analyze = $false,
    [string]$DeployTarget = ""
)

# Colors for console output
$ErrorColor = "Red"
$SuccessColor = "Green"  
$InfoColor = "Cyan"
$WarningColor = "Yellow"

Write-Host "🇪🇸 Building Aprende Español PWA..." -ForegroundColor $InfoColor
Write-Host "==================================" -ForegroundColor $InfoColor

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor $InfoColor
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor $SuccessColor
    
    $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($majorVersion -lt 14) {
        Write-Host "Error: Node.js version 14 or higher is required" -ForegroundColor $ErrorColor
        exit 1
    }
} catch {
    Write-Host "Error: Node.js not found. Please install Node.js 14 or higher" -ForegroundColor $ErrorColor
    exit 1
}

# Clean if requested
if ($Clean) {
    Write-Host "Cleaning previous build..." -ForegroundColor $InfoColor
    if (Test-Path "build") {
        Remove-Item -Recurse -Force "build"
    }
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"  
    }
    if (Test-Path "package-lock.json") {
        Remove-Item -Force "package-lock.json"
    }
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor $InfoColor
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor $ErrorColor
        exit 1
    }
}

# Set environment variables
$env:NODE_ENV = "production"
$env:GENERATE_SOURCEMAP = "false"
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$env:REACT_APP_VERSION = $packageJson.version

Write-Host "Building production bundle..." -ForegroundColor $InfoColor
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor $ErrorColor
    exit 1
}

# Verify build directory exists
if (-not (Test-Path "build")) {
    Write-Host "Build failed: build directory not found" -ForegroundColor $ErrorColor
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor $SuccessColor
Write-Host ""

# Display build information
Write-Host "Build Information:" -ForegroundColor $InfoColor
Write-Host "==================" -ForegroundColor $InfoColor
Write-Host "Build directory: $((Get-Location).Path)\build"

$buildSize = (Get-ChildItem -Path "build" -Recurse | Measure-Object -Property Length -Sum).Sum
$buildSizeMB = [math]::Round($buildSize / 1MB, 2)
Write-Host "Build size: $buildSizeMB MB"

Write-Host ""
Write-Host "Generated files:" -ForegroundColor $InfoColor
Get-ChildItem -Path "build" | Format-Table -Property Name, Length, LastWriteTime

# Validate critical files
Write-Host "Validating critical files..." -ForegroundColor $InfoColor
$criticalFiles = @("index.html", "manifest.json", "sw.js")

foreach ($file in $criticalFiles) {
    $filePath = Join-Path "build" $file
    if (Test-Path $filePath) {
        Write-Host "✓ $file" -ForegroundColor $SuccessColor
    } else {
        Write-Host "✗ $file missing" -ForegroundColor $ErrorColor
    }
}

# Validate PWA manifest
$manifestPath = Join-Path "build" "manifest.json"
if (Test-Path $manifestPath) {
    Write-Host "Validating PWA manifest..." -ForegroundColor $InfoColor
    try {
        $manifest = Get-Content $manifestPath | ConvertFrom-Json
        $requiredFields = @("name", "short_name", "start_url", "display", "icons")
        $missingFields = @()
        
        foreach ($field in $requiredFields) {
            if (-not $manifest.$field) {
                $missingFields += $field
            }
        }
        
        if ($missingFields.Count -eq 0) {
            Write-Host "✓ Manifest valid" -ForegroundColor $SuccessColor
        } else {
            Write-Host "✗ Missing manifest fields: $($missingFields -join ', ')" -ForegroundColor $ErrorColor
        }
    } catch {
        Write-Host "✗ Manifest validation failed: $($_.Exception.Message)" -ForegroundColor $ErrorColor
    }
}

# Generate deployment info
Write-Host "Generating deployment info..." -ForegroundColor $InfoColor
$deployInfo = @{
    buildDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    version = $env:REACT_APP_VERSION
    nodeVersion = $nodeVersion
    buildMode = "production"
    features = @{
        pwa = $true
        offline = $true
        installable = $true
        responsive = $true
        darkMode = $true
    }
} | ConvertTo-Json -Depth 3

$deployInfo | Out-File -Encoding utf8 -FilePath "build\deploy-info.json"

# Bundle analysis
if ($Analyze) {
    Write-Host ""
    Write-Host "Analyzing bundle size..." -ForegroundColor $InfoColor
    
    if (Test-Path "build\static\js") {
        Write-Host "JavaScript bundles:" -ForegroundColor $InfoColor
        Get-ChildItem -Path "build\static\js" -Filter "*.js" | 
            Sort-Object Length -Descending | 
            Select-Object -First 5 | 
            ForEach-Object { 
                $sizeMB = [math]::Round($_.Length / 1MB, 2)
                Write-Host "  $($_.Name): $sizeMB MB"
            }
    }
    
    if (Test-Path "build\static\css") {
        Write-Host ""
        Write-Host "CSS bundles:" -ForegroundColor $InfoColor
        Get-ChildItem -Path "build\static\css" -Filter "*.css" | 
            Sort-Object Length -Descending | 
            Select-Object -First 3 | 
            ForEach-Object { 
                $sizeMB = [math]::Round($_.Length / 1MB, 2)
                Write-Host "  $($_.Name): $sizeMB MB"
            }
    }
}

# Final instructions  
Write-Host ""
Write-Host "🎉 Build complete!" -ForegroundColor $SuccessColor
Write-Host ""
Write-Host "Next steps:" -ForegroundColor $WarningColor
Write-Host "1. Test locally: serve -s build (install serve globally first)"
Write-Host "2. Deploy to hosting platform of your choice"
Write-Host "3. Monitor: Check PWA metrics in browser DevTools"
Write-Host ""
Write-Host "Deployment options:" -ForegroundColor $InfoColor
Write-Host "• Netlify: https://netlify.com/drop (drag & drop)"
Write-Host "• Vercel: vercel --prod (requires CLI)"
Write-Host "• GitHub Pages: Configure in repository settings"
Write-Host "• Manual: Copy build\ contents to your web server"
Write-Host ""
Write-Host "Your PWA is ready for deployment!" -ForegroundColor $SuccessColor

# Auto-deploy if target specified
if ($DeployTarget -ne "") {
    Write-Host ""
    Write-Host "Auto-deploying to $DeployTarget..." -ForegroundColor $InfoColor
    
    switch ($DeployTarget.ToLower()) {
        "netlify" {
            if (Get-Command "netlify" -ErrorAction SilentlyContinue) {
                Set-Location "build"
                netlify deploy --prod --dir=.
                Set-Location ".."
            } else {
                Write-Host "Netlify CLI not found. Install it with: npm i -g netlify-cli" -ForegroundColor $ErrorColor
            }
        }
        "vercel" {
            if (Get-Command "vercel" -ErrorAction SilentlyContinue) {
                Set-Location "build"
                vercel --prod
                Set-Location ".."
            } else {
                Write-Host "Vercel CLI not found. Install it with: npm i -g vercel" -ForegroundColor $ErrorColor
            }
        }
        default {
            Write-Host "Unknown deployment target: $DeployTarget" -ForegroundColor $ErrorColor
        }
    }
}