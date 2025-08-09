@echo off
echo Starting Portfolio Development Server...
echo.
echo Your portfolio will be available at:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python from https://python.org
    echo Or use any other web server to serve the files.
    pause
    exit /b 1
)

REM Start simple HTTP server
python -m http.server 8000
