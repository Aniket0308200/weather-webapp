# 🚀 Backend Setup Guide - Step by Step

## 📋 Prerequisites

Before starting, make sure you have:

1. **Python 3.8+** installed
   - Download from [python.org](https://www.python.org/)
   - During installation, check "Add Python to PATH"

2. **Ollama** installed and running
   - Download from [ollama.ai](https://ollama.ai)
   - Install and run the application

3. **OpenWeatherMap API Key** (free)
   - Get from [openweathermap.org/api](https://openweathermap.org/api)

## ✅ Step-by-Step Setup

### Step 1: Verify Python Installation

**Windows (Command Prompt or PowerShell):**
```bash
python --version
```

**macOS/Linux (Terminal):**
```bash
python3 --version
```

You should see: `Python 3.x.x`

### Step 2: Verify Ollama Installation

**Windows/macOS/Linux:**
```bash
ollama --version
```

You should see the Ollama version.

### Step 3: Pull DeepSeek Model

**Windows/macOS/Linux:**
```bash
ollama pull deepseek-r1:1.5b
```

This downloads the model (~1GB). Wait for it to complete.

### Step 4: Start Ollama Service

**Windows:**
- Ollama should auto-start
- Or open Ollama application

**macOS:**
- Ollama should auto-start
- Or run: `ollama serve`

**Linux:**
```bash
ollama serve
```

Keep this terminal open!

### Step 5: Setup Backend (Choose Your OS)

#### Option A: Windows (Easiest)

1. **Open Command Prompt or PowerShell**
2. **Navigate to backend folder:**
   ```bash
   cd my-weather-app\backend
   ```

3. **Run the startup script:**
   ```bash
   run_backend.bat
   ```

   This will:
   - Create virtual environment
   - Install dependencies
   - Check for .env file
   - Start the server

#### Option B: macOS/Linux

1. **Open Terminal**
2. **Navigate to backend folder:**
   ```bash
   cd my-weather-app/backend
   ```

3. **Make script executable:**
   ```bash
   chmod +x run_backend.sh
   ```

4. **Run the startup script:**
   ```bash
   ./run_backend.sh
   ```

   This will:
   - Create virtual environment
   - Install dependencies
   - Check for .env file
   - Start the server

#### Option C: Manual Setup (All OS)

If the scripts don't work, do it manually:

1. **Navigate to backend:**
   ```bash
   cd my-weather-app/backend
   ```

2. **Create virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment file:**
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

5. **Edit .env file:**
   - Open `.env` in a text editor
   - Replace `your_api_key_here` with your OpenWeatherMap API key
   - Save the file

6. **Start the server:**
   ```bash
   python main.py
   ```

### Step 6: Configure .env File

1. **Open `.env` file** in a text editor (Notepad, VS Code, etc.)

2. **Add your OpenWeatherMap API key:**
   ```
   OPENWEATHER_API_KEY=your_actual_api_key_here
   OLLAMA_BASE_URL=http://localhost:11434
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

3. **Save the file**

### Step 7: Verify Backend is Running

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

**Test the backend:**
```bash
# In another terminal/command prompt
curl http://localhost:5000/health
```

You should get:
```json
{"status":"ok","message":"Weather AI Agent is running"}
```

## 🎯 Common Issues & Solutions

### Issue 1: "Python is not recognized"
**Solution:**
- Python is not in PATH
- Reinstall Python and check "Add Python to PATH"
- Or use full path: `C:\Python311\python.exe --version`

### Issue 2: "No module named 'flask'"
**Solution:**
- Virtual environment not activated
- Run: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (macOS/Linux)
- Then: `pip install -r requirements.txt`

### Issue 3: "Cannot connect to Ollama"
**Solution:**
- Ollama is not running
- Start Ollama: `ollama serve`
- Wait for it to start
- Then start backend

### Issue 4: "Model not found"
**Solution:**
- Pull the model: `ollama pull deepseek-r1:1.5b`
- Wait for download to complete
- Then start backend

### Issue 5: "Invalid API key"
**Solution:**
- Get free key from [openweathermap.org/api](https://openweathermap.org/api)
- Add to `.env` file
- Restart backend

### Issue 6: "Port 5000 already in use"
**Solution:**
- Another app is using port 5000
- Kill the process or use different port
- Edit `main.py` and change port: `app.run(port=5001)`

## 📊 Verification Checklist

- [ ] Python installed and in PATH
- [ ] Ollama installed and running
- [ ] DeepSeek model pulled (`ollama pull deepseek-r1:1.5b`)
- [ ] Backend folder accessible
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] `.env` file created with API key
- [ ] Backend running on `http://localhost:5000`
- [ ] Health check returns success

## 🔄 Running Backend Again

**Next time you want to run the backend:**

**Windows:**
```bash
cd my-weather-app\backend
run_backend.bat
```

**macOS/Linux:**
```bash
cd my-weather-app/backend
./run_backend.sh
```

**Manual:**
```bash
cd my-weather-app/backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py
```

## 🧪 Test the Backend

Once running, test with these commands:

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Chat Query:**
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather in Mumbai?"}'
```

**Get Weather:**
```bash
curl http://localhost:5000/weather/Mumbai
```

## 🎉 Success!

If you see:
```
 * Running on http://127.0.0.1:5000
```

Your backend is running! Now:

1. Keep this terminal open
2. Open another terminal
3. Run frontend: `npm run dev`
4. Open browser to `http://localhost:5173`
5. Click chat icon and test!

## 📞 Need Help?

1. Check the troubleshooting section above
2. Read `backend/README.md` for more details
3. Check browser console (F12) for errors
4. Check backend terminal for error messages

---

**You're all set! Backend is ready to go! 🚀**
