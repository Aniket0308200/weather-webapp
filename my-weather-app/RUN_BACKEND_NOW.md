# ▶️ RUN BACKEND NOW - Simple Instructions

## 🎯 You Need 3 Terminals Running

### Terminal 1: Ollama (Keep Running)
```bash
ollama serve
```

### Terminal 2: Backend (Keep Running)

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

### Terminal 3: Frontend (Keep Running)
```bash
cd my-weather-app
npm run dev
```

---

## ✅ When Everything is Running

You should see:
- Terminal 1: `Listening on 127.0.0.1:11434`
- Terminal 2: `Running on http://127.0.0.1:5000`
- Terminal 3: `Local: http://localhost:5173`

---

## 🌐 Open Browser

Go to: **http://localhost:5173**

---

## 💬 Test Chat

1. Click the **blue chat icon** (bottom-right corner)
2. Type: `"What's the weather in Mumbai?"`
3. Get AI response!

---

## ⚠️ If Chat Says "Connection Error"

**Check:**
1. Is Terminal 1 (Ollama) running?
2. Is Terminal 2 (Backend) running?
3. Is Terminal 2 showing `Running on http://127.0.0.1:5000`?

**If not:**
- Stop Terminal 2 (Ctrl+C)
- Check error message
- Fix the issue
- Run again

---

## 🔧 First Time Setup Only

**Before running, do this ONCE:**

1. **Get API Key:**
   - Go to https://openweathermap.org/api
   - Sign up (free)
   - Copy your API key

2. **Setup .env:**
   ```bash
   cd my-weather-app/backend
   copy .env.example .env  (Windows)
   cp .env.example .env    (macOS/Linux)
   ```

3. **Edit .env:**
   - Open `.env` in text editor
   - Replace `your_api_key_here` with your actual key
   - Save

4. **Install Ollama:**
   - Download from https://ollama.ai
   - Install
   - Run: `ollama pull deepseek-r1:1.5b`

---

## 🚀 Now You're Ready!

Just run the 3 terminals and enjoy! 🎉

---

## 📞 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to Ollama" | Run `ollama serve` in Terminal 1 |
| "Port 5000 in use" | Close other apps or use different port |
| "Module not found" | Run `pip install -r requirements.txt` |
| "API key error" | Check .env file has correct key |
| "Chat not responding" | Check all 3 terminals are running |

---

**That's it! Enjoy your AI Weather Assistant! 🌤️**
