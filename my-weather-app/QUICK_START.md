# ⚡ Quick Start - AI Weather Assistant

## 🎯 5-Minute Setup

### Step 1: Install Ollama (2 min)
```bash
# Download from https://ollama.ai
# Install and run

# Then pull the model
ollama pull deepseek-r1:1.5b
```

### Step 2: Setup Backend (2 min)
```bash
cd my-weather-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key
# (Get free key from https://openweathermap.org/api)

# Start backend
python main.py
```

### Step 3: Run Frontend (1 min)
```bash
cd my-weather-app
npm run dev
```

### Step 4: Test! 🎉
- Open `http://localhost:5173`
- Click the blue chat icon (bottom-right)
- Ask: "What's the weather in Mumbai?"

## 📋 Checklist

- [ ] Ollama installed and running
- [ ] DeepSeek model pulled (`ollama pull deepseek-r1:1.5b`)
- [ ] Backend dependencies installed
- [ ] `.env` file configured with API key
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] Chat widget visible in app

## 🔗 Important URLs

| Service | URL | Status |
|---------|-----|--------|
| Ollama | `http://localhost:11434` | Should be running |
| Backend | `http://localhost:5000` | Should be running |
| Frontend | `http://localhost:5173` | Should be running |

## 💬 Try These Queries

```
"What's the weather in Mumbai?"
"Will it rain tomorrow?"
"Is it a good time to go jogging?"
"How humid is it in Delhi?"
"What's the temperature forecast?"
```

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to Ollama" | Run `ollama serve` in another terminal |
| "Model not found" | Run `ollama pull deepseek-r1:1.5b` |
| "Chat not working" | Check backend is running on port 5000 |
| "API key error" | Get free key from openweathermap.org |

## 📚 Full Documentation

- **Setup Guide**: `AI_AGENT_SETUP.md`
- **Backend Docs**: `backend/README.md`
- **Implementation**: `IMPLEMENTATION_SUMMARY.md`

## 🚀 Next Steps

1. Get OpenWeatherMap API key (free)
2. Install Ollama
3. Run backend
4. Run frontend
5. Chat with AI! 🤖

---

**That's it! You're ready to go! 🎉**
