# 🤖 AI Weather Assistant Backend - Complete Guide

## 📌 Quick Navigation

| Need | File | Time |
|------|------|------|
| **First time?** | [`START_HERE.md`](START_HERE.md) | 5 min |
| **Just run it** | [`RUN_BACKEND_NOW.md`](RUN_BACKEND_NOW.md) | 2 min |
| **Detailed setup** | [`BACKEND_SETUP_GUIDE.md`](BACKEND_SETUP_GUIDE.md) | 10 min |
| **Visual guide** | [`SETUP_DIAGRAM.md`](SETUP_DIAGRAM.md) | 5 min |
| **ASCII art** | [`VISUAL_GUIDE.txt`](VISUAL_GUIDE.txt) | 3 min |
| **Backend docs** | [`backend/README.md`](backend/README.md) | 15 min |
| **Summary** | [`SOLUTION_SUMMARY.md`](SOLUTION_SUMMARY.md) | 5 min |

---

## 🎯 The Problem You're Facing

```
Connection error: Make sure the backend is running on http://localhost:5000
```

**This means:** The backend server is not running.

**Solution:** Follow the guides above to start it!

---

## ⚡ 30-Second Quick Start

### Prerequisites (Do Once)
```bash
# 1. Get API key from https://openweathermap.org/api
# 2. Setup .env file
cd my-weather-app/backend
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux

# 3. Edit .env and add your API key
# 4. Install Ollama from https://ollama.ai
ollama pull deepseek-r1:1.5b
```

### Running (Every Time)
```bash
# Terminal 1
ollama serve

# Terminal 2
cd my-weather-app/backend
run_backend.bat  # Windows
./run_backend.sh # macOS/Linux

# Terminal 3
cd my-weather-app
npm run dev

# Browser
http://localhost:5173
```

---

## 📚 Documentation Structure

### For Different Users

**👶 Beginner?**
→ Start with [`START_HERE.md`](START_HERE.md)

**⏱️ In a hurry?**
→ Use [`RUN_BACKEND_NOW.md`](RUN_BACKEND_NOW.md)

**🔧 Technical?**
→ Read [`BACKEND_SETUP_GUIDE.md`](BACKEND_SETUP_GUIDE.md)

**👁️ Visual learner?**
→ Check [`SETUP_DIAGRAM.md`](SETUP_DIAGRAM.md)

**📖 Want details?**
→ See [`backend/README.md`](backend/README.md)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────┐
│  Browser (http://localhost:5173)        │
│  ├─ Weather App                         │
│  └─ Chat Widget (Blue Icon)             │
└──────────────┬──────────────────────────┘
               │ HTTP
┌──────────────▼──────────────────────────┐
│  Backend (http://localhost:5000)        │
│  ├─ Flask Server                        │
│  ├─ AI Agent (LangGraph)                │
│  └─ Weather Tools                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Ollama (http://localhost:11434)        │
│  └─ DeepSeek 1.5B LLM                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  External APIs                          │
│  └─ OpenWeatherMap                      │
└─────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Step 1: Prerequisites
- Python 3.8+
- Ollama
- OpenWeatherMap API key

### Step 2: Setup
- Create `.env` file
- Add API key
- Install dependencies

### Step 3: Run
- Start Ollama
- Start Backend
- Start Frontend
- Open browser

### Step 4: Test
- Click chat icon
- Ask weather question
- Get AI response

---

## 📋 Startup Scripts

### Windows
```bash
cd my-weather-app\backend
run_backend.bat
```

### macOS/Linux
```bash
cd my-weather-app/backend
chmod +x run_backend.sh
./run_backend.sh
```

---

## 🔍 Verification

### Check Ollama
```bash
curl http://localhost:11434/api/tags
```

### Check Backend
```bash
curl http://localhost:5000/health
```

### Check Frontend
```
Open http://localhost:5173 in browser
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to Ollama | Run `ollama serve` |
| Port 5000 in use | Close other apps |
| Module not found | Run `pip install -r requirements.txt` |
| API key error | Check `.env` file |
| Chat not working | Check all 3 terminals |

---

## 📞 Need Help?

1. **Quick answer?** → [`RUN_BACKEND_NOW.md`](RUN_BACKEND_NOW.md)
2. **Detailed help?** → [`BACKEND_SETUP_GUIDE.md`](BACKEND_SETUP_GUIDE.md)
3. **Visual guide?** → [`SETUP_DIAGRAM.md`](SETUP_DIAGRAM.md)
4. **Backend docs?** → [`backend/README.md`](backend/README.md)

---

## ✨ Features

✅ Natural language weather queries
✅ Real-time weather data
✅ Smart suggestions
✅ Conversation history
✅ Local LLM (privacy-focused)
✅ Responsive chat UI
✅ Production-ready code

---

## 🎯 Next Steps

1. **Read:** [`START_HERE.md`](START_HERE.md)
2. **Setup:** Follow one-time setup
3. **Run:** Use startup scripts
4. **Test:** Open browser and chat
5. **Enjoy:** Your AI Weather Assistant!

---

## 📊 File Structure

```
my-weather-app/
├── backend/
│   ├── run_backend.bat      ← Windows startup
│   ├── run_backend.sh       ← macOS/Linux startup
│   ├── main.py              ← Flask server
│   ├── agent.py             ← AI Agent
│   ├── tools.py             ← Weather tools
│   ├── prompt.py            ← LLM prompts
│   ├── requirements.txt      ← Dependencies
│   ├── .env.example          ← Config template
│   └── README.md             ← Backend docs
│
├── START_HERE.md            ← Read first!
├── RUN_BACKEND_NOW.md       ← Quick start
├── BACKEND_SETUP_GUIDE.md   ← Detailed guide
├── SETUP_DIAGRAM.md         ← Visual diagrams
├── VISUAL_GUIDE.txt         ← ASCII art
└── README_BACKEND.md        ← This file
```

---

## 🎉 You're Ready!

Everything is set up and ready to go.

**Start with:** [`START_HERE.md`](START_HERE.md)

**Then run:** `run_backend.bat` or `./run_backend.sh`

**Enjoy:** Your AI Weather Assistant! 🌤️

---

**Questions? Check the guides above!**
