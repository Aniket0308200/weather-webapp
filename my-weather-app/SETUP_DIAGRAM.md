# 📊 Setup Diagram & Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Terminal 1: Ollama Service                              │  │
│  │  $ ollama serve                                          │  │
│  │  ✓ Running on http://localhost:11434                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Terminal 2: Backend Server                              │  │
│  │  $ cd my-weather-app/backend                            │  │
│  │  $ run_backend.bat (Windows) or ./run_backend.sh (Mac)  │  │
│  │  ✓ Running on http://localhost:5000                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Terminal 3: Frontend Server                             │  │
│  │  $ cd my-weather-app                                    │  │
│  │  $ npm run dev                                           │  │
│  │  ✓ Running on http://localhost:5173                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Browser                                                 │  │
│  │  http://localhost:5173                                  │  │
│  │  ✓ Weather App with Chat Widget                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 Data Flow

```
User Types Message in Chat Widget
         ↓
Frontend (React) sends HTTP POST to Backend
         ↓
Backend (Flask) receives message
         ↓
AI Agent (LangGraph) processes query
         ↓
Decision: Does it need weather data?
         ├─ YES → Call Weather Tool
         │         ├─ OpenWeatherMap API
         │         └─ Return weather data
         │
         └─ NO → Direct response
         ↓
LLM (DeepSeek via Ollama) generates response
         ↓
Backend sends response to Frontend
         ↓
Chat Widget displays message
```

## 🔧 Setup Steps Visualization

```
Step 1: Install Prerequisites
├─ Python 3.8+
├─ Ollama
└─ OpenWeatherMap API Key

Step 2: Start Services (3 Terminals)
├─ Terminal 1: ollama serve
├─ Terminal 2: run_backend.bat (or .sh)
└─ Terminal 3: npm run dev

Step 3: Test
├─ Open http://localhost:5173
├─ Click chat icon
└─ Ask a weather question

Step 4: Enjoy!
└─ Chat with AI Weather Assistant
```

## 🖥️ Terminal Setup (Windows)

```
┌─────────────────────────────────────────────────────────────┐
│ Terminal 1: Ollama                                          │
├─────────────────────────────────────────────────────────────┤
│ $ ollama serve                                              │
│ Listening on 127.0.0.1:11434                               │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Terminal 2: Backend                                         │
├─────────────────────────────────────────────────────────────┤
│ $ cd my-weather-app\backend                                │
│ $ run_backend.bat                                           │
│ [1/4] Checking Python...                                    │
│ [2/4] Creating venv...                                      │
│ [3/4] Activating venv...                                    │
│ [4/4] Installing dependencies...                            │
│ * Running on http://127.0.0.1:5000                         │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Terminal 3: Frontend                                        │
├─────────────────────────────────────────────────────────────┤
│ $ cd my-weather-app                                         │
│ $ npm run dev                                               │
│ VITE v8.0.10 ready in 500 ms                               │
│ ➜  Local:   http://localhost:5173/                         │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Browser                                                     │
├─────────────────────────────────────────────────────────────┤
│ Open: http://localhost:5173                                │
│ Click blue chat icon (bottom-right)                        │
│ Type: "What's the weather in Mumbai?"                      │
│ Get: AI response with weather data                         │
└─────────────────────────────────────────────────────────────┘
```

## 🖥️ Terminal Setup (macOS/Linux)

```
┌─────────────────────────────────────────────────────────────┐
│ Terminal 1: Ollama                                          │
├─────────────────────────────────────────────────────────────┤
│ $ ollama serve                                              │
│ Listening on 127.0.0.1:11434                               │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Terminal 2: Backend                                         │
├─────────────────────────────────────────────────────────────┤
│ $ cd my-weather-app/backend                                │
│ $ chmod +x run_backend.sh                                   │
│ $ ./run_backend.sh                                          │
│ [1/4] Checking Python...                                    │
│ [2/4] Creating venv...                                      │
│ [3/4] Activating venv...                                    │
│ [4/4] Installing dependencies...                            │
│ * Running on http://127.0.0.1:5000                         │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Terminal 3: Frontend                                        │
├─────────────────────────────────────────────────────────────┤
│ $ cd my-weather-app                                         │
│ $ npm run dev                                               │
│ VITE v8.0.10 ready in 500 ms                               │
│ ➜  Local:   http://localhost:5173/                         │
│ (Keep this running)                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Browser                                                     │
├─────────────────────────────────────────────────────────────┤
│ Open: http://localhost:5173                                │
│ Click blue chat icon (bottom-right)                        │
│ Type: "What's the weather in Mumbai?"                      │
│ Get: AI response with weather data                         │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Checklist

```
Prerequisites:
☐ Python 3.8+ installed
☐ Ollama installed
☐ OpenWeatherMap API key obtained

Setup:
☐ Backend folder accessible
☐ .env file created with API key
☐ Dependencies installed

Running:
☐ Terminal 1: Ollama running (ollama serve)
☐ Terminal 2: Backend running (run_backend.bat/sh)
☐ Terminal 3: Frontend running (npm run dev)
☐ Browser: http://localhost:5173 open

Testing:
☐ Chat widget visible (blue icon, bottom-right)
☐ Can type messages
☐ Getting AI responses
☐ Weather data displayed correctly
```

## 🚨 Troubleshooting Flowchart

```
Chat not working?
│
├─ Backend error?
│  ├─ Check Terminal 2 for errors
│  ├─ Is Ollama running? (Terminal 1)
│  ├─ Is .env file configured?
│  └─ Restart backend
│
├─ Frontend error?
│  ├─ Check browser console (F12)
│  ├─ Is backend running on :5000?
│  ├─ Clear browser cache
│  └─ Restart frontend
│
├─ Ollama error?
│  ├─ Is Ollama installed?
│  ├─ Is model pulled? (ollama pull deepseek-r1:1.5b)
│  └─ Restart Ollama
│
└─ API error?
   ├─ Is API key valid?
   ├─ Is API key in .env?
   └─ Get new key from openweathermap.org
```

## 🎯 Quick Reference

| Component | Command | Port | Status |
|-----------|---------|------|--------|
| Ollama | `ollama serve` | 11434 | Must be running |
| Backend | `run_backend.bat` (Windows) or `./run_backend.sh` (Mac/Linux) | 5000 | Must be running |
| Frontend | `npm run dev` | 5173 | Must be running |
| Browser | `http://localhost:5173` | - | Open in browser |

---

**All three services must be running for the chat to work!**
