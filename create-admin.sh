#!/bin/bash

echo ""
echo "========================================"
echo "   TẠO TÀI KHOẢN ADMIN"
echo "========================================"
echo ""

cd backend

echo "🔄 Đang tạo tài khoản admin..."
echo ""

node src/utils/createAdmin.js

echo ""
echo "========================================"
echo ""
