#!/bin/bash

# Deploy script for Fly.io
# Usage: ./deploy.sh

set -e

echo " Starting deployment to Fly.io..."

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI is not installed. Please install it first:"
    echo "   macOS: brew install flyctl"
    echo "   Linux: curl -L https://fly.io/install.sh | sh"
    echo "   Windows: powershell -Command \"iwr https://fly.io/install.ps1 -useb | iex\""
    exit 1
fi

# Check if user is logged in
if ! fly auth whoami &> /dev/null; then
    echo "❌ Not logged in to Fly.io. Please run: fly auth login"
    exit 1
fi

# Check if app exists, if not create it
if ! fly apps list | grep -q "movies-app-backend"; then
    echo "📱 Creating new Fly.io app..."
    fly apps create movies-app-backend
fi

# Set secrets (you'll need to update these with your actual values)
echo "🔐 Setting environment secrets..."
echo "⚠️  Please make sure to update these secrets with your actual values!"

# Uncomment and update these lines with your actual values:
# fly secrets set DATABASE_URL="your-production-database-url"
# fly secrets set JWT_SECRET="your-production-jwt-secret"

echo "📦 Building and deploying..."
fly deploy

echo " Deployment completed!"
echo " Your app should be available at: https://movies-app-backend.fly.dev"
echo " Health check: https://movies-app-backend.fly.dev/health"

# Optional: Open the app in browser
read -p "Would you like to open the app in your browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    fly open
fi 