@echo off
echo ============================================
echo    Hajj och Umrah - Startar Appen
echo ============================================
echo.
echo  Stangar ALLA tidigare processer...

:: Doda alla node-processer (Metro, Expo, etc)
taskkill /F /IM "node.exe" >nul 2>&1

:: Doda specifika portar
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8082 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :19000 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :19006 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul
echo  Klart! Alla tidigare processer stangda.
echo.
echo  Kollar om Android-emulatorn ar igang...

"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" get-state >nul 2>&1
if errorlevel 1 (
    echo  Startar Pixel 9 emulatorn...
    start "" "%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe" -avd Pixel_9
    echo  Vantar pa att emulatorn startar...
    "%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" wait-for-device
    :WAIT_BOOT
    timeout /t 3 /nobreak >nul
    for /f %%b in ('"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell getprop sys.boot_completed 2^>nul') do (
        if "%%b"=="1" goto BOOTED
    )
    goto WAIT_BOOT
    :BOOTED
    echo  Emulatorn ar igang!
    timeout /t 3 /nobreak >nul
) else (
    echo  Emulatorn kor redan!
)

:: Avaktivera skarmlas och las upp skarmen
echo  Laser upp skarmen...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell settings put secure lock_screen_lock_after_timeout 0 >nul 2>&1
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell settings put system screen_off_timeout 2147483647 >nul 2>&1
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell svc power stayon true >nul 2>&1
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell input keyevent 82 >nul 2>&1
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell input keyevent 3 >nul 2>&1
echo  Klart!

echo.
echo  Startar Expo Go pa emulatorn...
echo.
echo ============================================
echo.
cd /d "%~dp0"
set REACT_NATIVE_PACKAGER_HOSTNAME=localhost
npx expo start --android
