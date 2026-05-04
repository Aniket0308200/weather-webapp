# 🤖 AI Weather Assistant - Complete Setup Guide

This guide will help you set up the complete AI Weather Assistant system with the chat widget integrated into your weather app.

## 📋 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Weather Web App (React)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Dashboard | Locations | Settings | Chat Widget 💬  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ (HTTP)
┌─────────────────────────────────────────────────────────────┐
│              Flask Backend (Python)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /chat  /weather  /forecast  /health                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              AI Agent (LangGraph)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  LLM (DeepSeek via Ollama) + Weather Tools          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              External APIs                                  │
│  ├─ OpenWeatherMap (Weather Data)                          │
│  └─ Ollama (Local LLM)                                     │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Step-by-Step Setup

### Phase 1: Install Ollama & DeepSeek Model

#### 1.1 Download Ollama
- Visit [ollama.ai](https://ollama.ai)
- Download for your OS (Windows, macOS, Linux)
- Install and run

#### 1.2 Pull DeepSeek Model
```bash
ollama pull deepseek-r1:1.5b
```

This downloads the 1.5B parameter DeepSeek model (~1GB).

#### 1.3 Verify Ollama is Running
```bash
curl http://localhost:11434/api/tags
```

You should see the model listed.

### Phase 2: Setup Backend

#### 2.1 Navigate to Backend Directory
```bash
cd my-weather-app/backend
```

#### 2.2 Create Python Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 2.3 Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2.4 Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your OpenWeatherMap API key
# Get free key from: https://openweathermap.org/api
```

Edit `.env`:
```
OPENWEATHER_API_KEY=your_api_key_here
OLLAMA_BASE_URL=http://localhost:11434
FLASK_ENV=development
FLASK_DEBUG=True
```

#### 2.5 Start Backend Server
```bash
python main.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Phase 3: Frontend Integration

The ChatWidget is already integrated into your React app!

#### 3.1 Build Frontend
```bash
cd my-weather-app
npm run build
```

#### 3.2 Run Frontend (Development)
```bash
npm run dev
```

The app will run on `http://localhost:5173` (or similar)

### Phase 4: Test the System

#### 4.1 Test Backend API
```bash
# Health check
curl http://localhost:5000/health

# Chat endpoint
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather in Mumbai?"}'
```

#### 4.2 Test Chat Widget
1. Open your weather app in browser
2. Look for the blue chat icon in bottom-right corner
3. Click to open chat
4. Type a weather question
5. Get AI response!

## 💬 Example Queries to Try

### Weather Information
- "What's the weather in Mumbai?"
- "Is it raining today in Delhi?"
- "What's the temperature in Bangalore?"
- "How humid is it in Pune?"

### Forecasts
- "Will it rain tomorrow?"
- "What's the weather forecast for next week?"
- "Is tomorrow a good day for outdoor activities?"

### Activity Suggestions
- "Can I go jogging today?"
- "Is it a good time to go for a walk?"
- "Should I carry an umbrella?"
- "What's the best time to go outside?"

### Specific Conditions
- "What's the wind speed?"
- "How's the visibility?"
- "What's the UV index?"

## 🔧 Troubleshooting

### Issue 1: "Cannot connect to Ollama"
**Solution:**
```bash
# Make sure Ollama is running
ollama serve

# Check if accessible
curl http://localhost:11434/api/tags
```

### Issue 2: "Model not found"
**Solution:**
```bash
# Pull the model
ollama pull deepseek-r1:1.5b

# List available models
ollama list
```

### Issue 3: "CORS error in browser"
**Solution:**
- Backend CORS is already configured
- Make sure backend is running on `http://localhost:5000`
- Check browser console for exact error

### Issue 4: "Invalid API key"
**Solution:**
- Get free key from [openweathermap.org](https://openweathermap.org/api)
- Add to `.env` file
- Restart backend

### Issue 5: "Chat widget not appearing"
**Solution:**
- Clear browser cache
- Rebuild frontend: `npm run build`
- Check browser console for errors

## 📁 Project Structure

```
my-weather-app/
├── backend/
│   ├── main.py              # Flask server
│   ├── agent.py             # AI Agent logic
│   ├── tools.py             # Weather API tools
│   ├── prompt.py            # LLM prompts
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment template
│   └── README.md             # Backend docs
│
├── src/
│   ├── components/
│   │   ├── ChatWidget.jsx    # Chat UI component
│   │   ├── ChatWidget.css    # Chat styles
│   │   └── ...other components
│   ├── App.jsx               # Main app (ChatWidget integrated)
│   └── ...
│
├── index.html                # Updated with favicon
├── package.json
└── AI_AGENT_SETUP.md         # This file
```

## 🎯 Features

### Chat Widget Features
✅ Floating chat button (bottom-right)
✅ Smooth open/close animation
✅ Message history
✅ Real-time responses
✅ Loading indicator
✅ Responsive design (mobile-friendly)
✅ Keyboard support (Enter to send)
✅ Timestamp for messages
✅ Scrollable message area

### AI Agent Features
✅ Natural language understanding
✅ Weather data fetching
✅ Multi-day forecasts
✅ Contextual responses
✅ Activity suggestions
✅ Conversation history
✅ Error handling
✅ Local LLM (privacy-focused)

## 🔐 Security & Privacy

- **Local LLM**: DeepSeek runs locally via Ollama (no cloud)
- **No data storage**: Conversation history is in-memory only
- **API keys**: Stored in `.env` (not in code)
- **CORS**: Configured for development

## 📊 Performance

- **Response time**: 2-5 seconds (depends on Ollama)
- **Model size**: 1.5B parameters (lightweight)
- **Memory usage**: ~2GB for Ollama + model
- **CPU usage**: Moderate (can run on CPU)

## 🚀 Production Deployment

### Backend Deployment
```bash
# Use Gunicorn for production
gunicorn -w 4 -b 0.0.0.0:5000 main:app

# Or use Docker
docker build -t weather-agent .
docker run -p 5000:5000 weather-agent
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy dist/ folder to hosting
# (Vercel, Netlify, GitHub Pages, etc.)
```

### Environment Variables
Set in production:
```
FLASK_ENV=production
FLASK_DEBUG=False
OPENWEATHER_API_KEY=your_key
OLLAMA_BASE_URL=http://ollama-service:11434
```

## 📚 Additional Resources

- [Ollama Documentation](https://github.com/ollama/ollama)
- [DeepSeek Model](https://github.com/deepseek-ai/DeepSeek-R1)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend logs: `python main.py`
3. Check browser console: F12 → Console tab
4. Verify all services are running:
   - Ollama: `http://localhost:11434`
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

## ✨ Next Steps

1. ✅ Install Ollama & DeepSeek
2. ✅ Setup backend
3. ✅ Run frontend
4. ✅ Test chat widget
5. 🎉 Enjoy your AI Weather Assistant!

---

**Happy weather forecasting with AI! 🌤️**
