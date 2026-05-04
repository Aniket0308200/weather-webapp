# 🎯 START HERE - Complete Backend Setup

## 📌 You Are Here

You got the error: **"Connection error: Make sure the backend is running on http://localhost:5000"**

This means the backend is NOT running. Let's fix it!

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Open 3 Terminals/Command Prompts

You need **3 separate terminals** open at the same time.

### Step 2: Terminal 1 - Start Ollama

```bash
ollama serve
```

**Expected output:**
```
Listening on 127.0.0.1:11434
```

**Keep this running!** Don't close it.

### Step 3: Terminal 2 - Start Backend

**Windows:**
```bash
cd my-weather-app\backend
run_backend.bat
```

**macOS/Linux:**
```bash
cd my-weather-app/backend
chmod +x run_backend.sh
./run_backend.sh
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

**Keep this running!** Don't close it.

### Step 4: Terminal 3 - Start Frontend

```bash
cd my-weather-app
npm run dev
```

**Expected output:**
```
VITE v8.0.10 ready in 500 ms
➜  Local:   http://localhost:5173/
```

**Keep this running!** Don't close it.

### Step 5: Open Browser

Go to: **http://localhost:5173**

### Step 6: Test Chat

1. Look for **blue chat icon** in bottom-right corner
2. Click it
3. Type: `"What's the weather in Mumbai?"`
4. Get AI response!

---

## ⚠️ Important: First Time Only

Before running the backend for the first time, you need to:

### 1. Get OpenWeatherMap API Key

1. Go to https://openweathermap.org/api
2. Click "Sign Up"
3. Create account (free)
4. Go to API keys section
5. Copy your API key

### 2. Setup .env File

**Windows:**
```bash
cd my-weather-app\backend
copy .env.example .env
```

**macOS/Linux:**
```bash
cd my-weather-app/backend
cp .env.example .env
```

### 3. Edit .env File

1. Open `.env` in a text editor (Notepad, VS Code, etc.)
2. Find this line:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual API key
4. Save the file

### 4. Install Ollama

1. Download from https://ollama.ai
2. Install
3. Run this command:
   ```bash
   ollama pull deepseek-r1:1.5b
   ```
4. Wait for download to complete (~1GB)

---

## ✅ Checklist Before Running

- [ ] Python 3.8+ installed
- [ ] Ollama installed
- [ ] DeepSeek model pulled (`ollama pull deepseek-r1:1.5b`)
- [ ] OpenWeatherMap API key obtained
- [ ] `.env` file created with API key
- [ ] 3 terminals ready

---

## 🎯 Running the Backend

### Every Time You Want to Use the App

**Terminal 1:**
```bash
ollama serve
```

**Terminal 2:**
```bash
cd my-weather-app\backend
run_backend.bat
```
(or `./run_backend.sh` on macOS/Linux)

**Terminal 3:**
```bash
cd my-weather-app
npm run dev
```

**Browser:**
```
http://localhost:5173
```

---

## 🔍 Verify Everything is Running

### Check Ollama
```bash
curl http://localhost:11434/api/tags
```

### Check Backend
```bash
curl http://localhost:5000/health
```

You should get:
```json
{"status":"ok","message":"Weather AI Agent is running"}
```

---

## 🆘 Troubleshooting

### "Cannot connect to Ollama"
- Make sure Terminal 1 is running `ollama serve`
- Check it shows `Listening on 127.0.0.1:11434`

### "Port 5000 already in use"
- Another app is using port 5000
- Close other apps or restart your computer

### "Module not found" error
- Virtual environment not activated
- Run: `pip install -r requirements.txt`

### "API key error"
- Check `.env` file has correct key
- Get new key from openweathermap.org

### Chat still not working
- Check all 3 terminals are running
- Check browser console (F12) for errors
- Restart all 3 terminals

---

## 📚 Detailed Guides

For more detailed information, see:

- **`RUN_BACKEND_NOW.md`** - Simple running instructions
- **`BACKEND_SETUP_GUIDE.md`** - Complete setup guide
- **`SETUP_DIAGRAM.md`** - Visual diagrams
- **`backend/README.md`** - Backend documentation

---

## 🎉 You're Ready!

Once all 3 terminals are running:

1. Open http://localhost:5173
2. Click chat icon
3. Ask about weather
4. Enjoy! 🌤️

---

## 💡 Pro Tips

- Keep all 3 terminals open while using the app
- Don't close any terminal until you're done
- If something breaks, restart all 3 terminals
- Check terminal output for error messages

---

**Questions? Check the detailed guides above!**

**Ready? Let's go! 🚀**
