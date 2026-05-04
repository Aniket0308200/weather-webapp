#!/bin/bash

# Weather AI Agent Backend Startup Script for macOS/Linux

echo ""
echo "========================================"
echo "  Weather AI Agent Backend"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi

echo "[1/4] Checking Python installation..."
python3 --version
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "[2/4] Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to create virtual environment"
        exit 1
    fi
    echo "Virtual environment created successfully!"
    echo ""
else
    echo "[2/4] Virtual environment already exists"
    echo ""
fi

# Activate virtual environment
echo "[3/4] Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to activate virtual environment"
    exit 1
fi
echo "Virtual environment activated!"
echo ""

# Install requirements
echo "[4/4] Installing dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "Dependencies installed!"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "========================================"
    echo "  IMPORTANT: Setup Required"
    echo "========================================"
    echo ""
    echo "The .env file does not exist!"
    echo ""
    echo "1. Copy .env.example to .env:"
    echo "   cp .env.example .env"
    echo ""
    echo "2. Edit .env and add your OpenWeatherMap API key:"
    echo "   - Get free key from: https://openweathermap.org/api"
    echo "   - Open .env in a text editor"
    echo "   - Replace 'your_api_key_here' with your actual key"
    echo ""
    echo "3. Make sure Ollama is running:"
    echo "   - Download from: https://ollama.ai"
    echo "   - Run: ollama serve"
    echo "   - Pull model: ollama pull deepseek-r1:1.5b"
    echo ""
    echo "After setup, run this script again."
    echo ""
    exit 1
fi

# Check if Ollama is running
echo "Checking if Ollama is running..."
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo ""
    echo "WARNING: Ollama does not appear to be running!"
    echo ""
    echo "Please start Ollama:"
    echo "1. Download from https://ollama.ai"
    echo "2. Install and run"
    echo "3. In another terminal, run: ollama serve"
    echo "4. Pull the model: ollama pull deepseek-r1:1.5b"
    echo ""
    echo "Press Enter to continue anyway..."
    read
else
    echo "Ollama is running! ✓"
    echo ""
fi

# Start the Flask server
echo ""
echo "========================================"
echo "  Starting Backend Server"
echo "========================================"
echo ""
echo "Server will run on: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python main.py
