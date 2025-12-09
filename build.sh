#!/bin/bash
set -e

echo "Installing Node.js dependencies..."
npm ci

echo "Building React app..."
npm run build

echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt

echo "Build complete!"

