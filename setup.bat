@echo off
echo ========================================
echo E-LEARNING PLATFORM - SETUP SCRIPT
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK
echo.

echo [2/5] Setting up Backend...
cd backend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit backend/.env file with your configuration!
)
echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo Backend setup: OK
echo.

echo [3/5] Setting up Frontend...
cd frontend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo Frontend setup: OK
echo.

echo [4/5] Creating uploads directory...
if not exist backend\uploads mkdir backend\uploads
echo Uploads directory: OK
echo.

echo ========================================
echo SETUP COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Make sure MongoDB is running
echo 2. Edit backend/.env with your MongoDB URI
echo 3. Run: npm run dev (in backend folder)
echo 4. Run: npm run dev (in frontend folder)
echo.
echo For detailed instructions, see INSTALLATION.md
echo.
pause
