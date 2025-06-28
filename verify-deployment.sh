#!/bin/bash

echo "🚀 Portfolio Deployment Verification"
echo "====================================="

# Check if build folder exists
if [ -d "frontend/build" ]; then
    echo "✅ Build folder exists"
else
    echo "❌ Build folder missing - run 'cd frontend && yarn build'"
    exit 1
fi

# Check if index.html exists
if [ -f "frontend/build/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
    exit 1
fi

# Check if 404.html exists
if [ -f "frontend/build/404.html" ]; then
    echo "✅ 404.html exists"
else
    echo "❌ 404.html missing"
fi

# Check if static assets exist
if [ -d "frontend/build/static" ]; then
    echo "✅ Static assets folder exists"
else
    echo "❌ Static assets missing"
    exit 1
fi

# Check file sizes
INDEX_SIZE=$(stat -c%s "frontend/build/index.html")
if [ $INDEX_SIZE -gt 1000 ]; then
    echo "✅ index.html size looks good ($INDEX_SIZE bytes)"
else
    echo "⚠️  index.html seems small ($INDEX_SIZE bytes)"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Update homepage in frontend/package.json with your GitHub repo URL"
echo "2. Push to GitHub repository"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Your site will be live at: https://USERNAME.github.io/REPO-NAME"
echo ""
echo "📁 Ready to deploy from: frontend/build/"