#!/bin/bash

# Rehaal Travel Website - Quick Deploy Script
# This script prepares and deploys your website to Vercel

echo "🚀 Rehaal Travel Website - Deployment Script"
echo "============================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo ""
    echo "📝 Uncommitted changes detected"
    echo "Would you like to commit them? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Enter commit message:"
        read -r commit_message
        
        git add .
        git commit -m "$commit_message"
        echo "✅ Changes committed"
    fi
fi

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo ""
    echo "🔗 No remote repository found"
    echo "Enter your GitHub repository URL:"
    read -r repo_url
    
    git remote add origin "$repo_url"
    echo "✅ Remote added"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main 2>/dev/null || git push -u origin master

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your repository URL and try again"
    exit 1
fi

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'Add New...' → 'Project'"
echo "3. Import your GitHub repository"
echo "4. Add environment variables from .env file"
echo "5. Click 'Deploy'"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Good luck with your deployment!"
