@echo off
echo ============================================
echo    Hajj och Umrah - Startar Server
echo ============================================
echo.
echo  Stangar tidigare processer...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq Hajj*" >nul 2>&1

echo  Klart! Tidigare processer stangda.
echo.
echo  Servern startas nu...
echo  Nar du ser "Waiting on http://localhost:8081"
echo  ar servern igang!
echo.
echo  Tryck W - oppna i webblasaren
echo  Tryck A - oppna Android-emulator
echo  Tryck I - oppna iOS-simulator
echo  Skanna QR-koden med Expo Go
echo.
echo ============================================
echo.
cd /d "%~dp0"
npx expo start
