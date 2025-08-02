#!/bin/bash

echo "🔧 Fixing Movies App Backend Deployment"
echo "========================================"

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI is not installed. Please install it first:"
    echo "   curl -L https://fly.io/install.sh | sh"
    exit 1
fi

echo "📋 Current deployment status:"
fly status

echo ""
echo "🔑 Setting up secrets..."
echo "You'll need to provide the following:"
echo "1. DATABASE_URL (MySQL connection string)"
echo "2. JWT_SECRET (a strong secret key)"

read -p "Enter your DATABASE_URL: " DATABASE_URL
read -p "Enter your JWT_SECRET: " JWT_SECRET

if [ -z "$DATABASE_URL" ] || [ -z "$JWT_SECRET" ]; then
    echo "❌ Both DATABASE_URL and JWT_SECRET are required"
    exit 1
fi

echo "🔧 Setting secrets..."
fly secrets set DATABASE_URL="$DATABASE_URL"
fly secrets set JWT_SECRET="$JWT_SECRET"
fly secrets set NODE_ENV="production"

echo "🚀 Deploying..."
fly deploy

echo "✅ Deployment complete!"
echo "🔍 Check the deployment:"
echo "   fly logs"
echo "   fly status" 