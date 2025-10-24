@echo off
REM Rehaal Travel Website - Quick Deploy Script for Windows
REM This script prepares and deploys your website to Vercel

echo.
echo ========================================
echo Rehaal Travel Website - Deployment Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Git initialized
) else (
    echo Git repository already initialized
)

REM Check for uncommitted changes
git status --short > nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo Uncommitted changes detected
    set /p commit="Would you like to commit them? (y/n): "
    
    if /i "%commit%"=="y" (
        set /p message="Enter commit message: "
        git add .
        git commit -m "%message%"
        echo Changes committed
    )
)

REM Check if remote exists
git remote | findstr "origin" > nul
if %errorlevel% neq 0 (
    echo.
    echo No remote repository found
    set /p repo_url="Enter your GitHub repository URL: "
    git remote add origin %repo_url%
    echo Remote added
)

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin main 2>nul || git push -u origin master

if %errorlevel% equ 0 (
    echo Code pushed to GitHub successfully
) else (
    echo Failed to push to GitHub
    echo Please check your repository URL and try again
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment preparation complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to https://vercel.com/dashboard
echo 2. Click 'Add New...' - 'Project'
echo 3. Import your GitHub repository
echo 4. Add environment variables from .env file
echo 5. Click 'Deploy'
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
echo Good luck with your deployment!
echo.
pause
