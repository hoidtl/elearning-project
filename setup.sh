#!/bin/bash

echo "========================================"
echo "E-LEARNING PLATFORM - SETUP SCRIPT"
echo "========================================"
echo ""

echo "[1/5] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "Node.js: $(node --version)"
echo ""

echo "[2/5] Setting up Backend..."
cd backend
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit backend/.env file with your configuration!"
fi
echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "Backend setup: OK"
echo ""

echo "[3/5] Setting up Frontend..."
cd frontend
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi
echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "Frontend setup: OK"
echo ""

echo "[4/5] Creating uploads directory..."
mkdir -p backend/uploads
echo "Uploads directory: OK"
echo ""

echo "========================================"
echo "SETUP COMPLETED SUCCESSFULLY!"
echo "========================================"
echo ""
echo "NEXT STEPS:"
echo "1. Make sure MongoDB is running"
echo "2. Edit backend/.env with your MongoDB URI"
echo "3. Run: npm run dev (in backend folder)"
echo "4. Run: npm run dev (in frontend folder)"
echo ""
echo "For detailed instructions, see INSTALLATION.md"
echo ""
