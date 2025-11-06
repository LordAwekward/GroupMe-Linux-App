#!/bin/bash

# Setup script for GitHub repository and first release

echo "🚀 GroupMe Linux - GitHub Setup"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit - GroupMe Linux Desktop App

Features:
- System tray integration
- Auto-launch on startup
- Minimize to tray
- Settings menu
- Persistent login
- Custom icon support"

echo ""
echo "✅ Initial commit created!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME with your GitHub username):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/GroupMe.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Create your first release:"
echo ""
echo "   git tag v1.0.0"
echo "   git push origin v1.0.0"
echo ""
echo "4. GitHub Actions will automatically build and create a release!"
echo "   Check: https://github.com/YOUR_USERNAME/GroupMe/releases"
echo ""
echo "📖 For more details, see RELEASE.md"
