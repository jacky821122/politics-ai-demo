#!/bin/bash

echo "🚀 Setting up Politics AI Demo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

echo "✅ Dependencies installed successfully!"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found."
    echo "   Please create a .env.local file with your OPENAI_API_KEY:"
    echo "   OPENAI_API_KEY=your_api_key_here"
    echo ""
fi

echo "🎯 Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To deploy to Vercel:"
echo "  vercel"
echo ""
echo "Don't forget to set OPENAI_API_KEY in your Vercel environment variables!"
