@echo off
echo.
echo 🇪🇸 Building Aprende Espanol PWA...
echo ========================================

echo.
echo Checking Node.js version...
node --version
if errorlevel 1 (
    echo Error: Node.js not found
    pause
    exit /b 1
)

echo.
echo Building production bundle...
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!

echo.
echo Checking build files...
if exist "build\index.html" echo ✅ index.html
if exist "build\manifest.json" echo ✅ manifest.json  
if exist "build\sw.js" echo ✅ sw.js

echo.
echo 🚀 Ready to deploy!
echo.
echo Next steps:
echo • Test locally: serve -s build
echo • Deploy: Go to https://netlify.com/drop
echo • Drag the 'build' folder to deploy instantly!
echo.

pause