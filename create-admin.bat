@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    TẠO TÀI KHOẢN ADMIN
echo ========================================
echo.

cd backend

echo 🔄 Đang tạo tài khoản admin...
echo.

node src/utils/createAdmin.js

echo.
echo ========================================
echo.
pause
