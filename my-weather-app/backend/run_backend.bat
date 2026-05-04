@echo off
REM Weather AI Agent Backend Startup Script for Windows

echo.
echo ========================================
echo   Weather AI Agent Backend
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Checking Python installation...
python --version
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo [2/4] Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
    echo Virtual environment created successfully!
    echo.
) else (
    echo [2/4] Virtual environment already exists
    echo.
)

REM Activate virtual environment
echo [3/4] Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Virtual environment activated!
echo.

REM Install requirements
echo [4/4] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed!
echo.

REM Check if .env file exists
if not exist ".env" (
    echo.
    echo ========================================
    echo   IMPORTANT: Setup Required
    echo ========================================
    echo.
    echo The .env file does not exist!
    echo.
    echo 1. Copy .env.example to .env:
    echo    copy .env.example .env
    echo.
    echo 2. Edit .env and add your OpenWeatherMap API key:
    echo    - Get free key from: https://openweathermap.org/api
    echo    - Open .env in a text editor
    echo    - Replace 'your_api_key_here' with your actual key
    echo.
    echo 3. Make sure Ollama is running:
    echo    - Download from: https://ollama.ai
    echo    - Run: ollama serve
    echo    - Pull model: ollama pull deepseek-r1:1.5b
    echo.
    echo After setup, run this script again.
    echo.
    pause
    exit /b 1
)

REM Check if Ollama is running
echo Checking if Ollama is running...
curl -s http://localhost:11434/api/tags >nul 2>&1
if errorlevel 1 (
    echo.
    echo WARNING: Ollama does not appear to be running!
    echo.
    echo Please start Ollama:
    echo 1. Download from https://ollama.ai
    echo 2. Install and run
    echo 3. In another terminal, run: ollama serve
    echo 4. Pull the model: ollama pull deepseek-r1:1.5b
    echo.
    echo Press any key to continue anyway...
    pause
) else (
    echo Ollama is running! ✓
    echo.
)

REM Start the Flask server
echo.
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.
echo Server will run on: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py

pause
