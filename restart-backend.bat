@echo off
echo Restarting backend server...
cd backend
taskkill /F /IM node.exe /FI "WINDOWTITLE eq backend*" 2>nul
timeout /t 2 /nobreak >nul
start "backend" cmd /k "npm run dev"
echo Backend restarted!
cd ..
