# Weather AI Agent Backend

A Python-based AI agent for weather queries using LangGraph, Ollama (DeepSeek), and OpenWeatherMap API.

## 🚀 Quick Start

### Prerequisites

1. **Python 3.8+**
2. **Ollama** - Download from [ollama.ai](https://ollama.ai)
3. **DeepSeek 1.5B Model** - Will be auto-downloaded by Ollama

### Installation

1. **Install Ollama**
   - Download and install from [ollama.ai](https://ollama.ai)
   - Start Ollama service

2. **Pull DeepSeek Model**
   ```bash
   ollama pull deepseek-r1:1.5b
   ```

3. **Setup Python Environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   OLLAMA_BASE_URL=http://localhost:11434
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

### Running the Backend

1. **Start Ollama** (if not already running)
   ```bash
   ollama serve
   ```

2. **Start Flask Server**
   ```bash
   python main.py
   ```

   The server will run on `http://localhost:5000`

## 📡 API Endpoints

### 1. Health Check
```
GET /health
```
Response:
```json
{
  "status": "ok",
  "message": "Weather AI Agent is running"
}
```

### 2. Chat Endpoint
```
POST /chat
Content-Type: application/json

{
  "message": "Will it rain tomorrow in Mumbai?"
}
```

Response:
```json
{
  "response": "Based on the forecast, there's a 70% chance of rain tomorrow in Mumbai. I'd recommend carrying an umbrella!",
  "status": "success"
}
```

### 3. Get Weather
```
GET /weather/<city>?date=today
```

Parameters:
- `city` (required): City name
- `date` (optional): 'today', 'tomorrow' (default: 'today')

Response:
```json
{
  "data": {
    "city": "Mumbai",
    "country": "IN",
    "temperature": 28,
    "feels_like": 32,
    "humidity": 75,
    "condition": "Partly cloudy",
    "wind_speed": 12.5,
    "pressure": 1013,
    "visibility": 10,
    "rain_probability": 60
  },
  "status": "success"
}
```

### 4. Reset Conversation
```
POST /reset
```

Response:
```json
{
  "message": "Conversation reset",
  "status": "success"
}
```

## 🧠 Agent Architecture

### Components

1. **WeatherAgent** (`agent.py`)
   - Main agent class
   - Manages conversation history
   - Calls Ollama LLM
   - Executes tools

2. **Tools** (`tools.py`)
   - `get_weather()` - Fetch current weather
   - `get_weather_forecast()` - Fetch multi-day forecast

3. **Prompts** (`prompt.py`)
   - System prompt for the LLM
   - Tool descriptions

4. **Flask API** (`main.py`)
   - REST endpoints
   - Request/response handling

### Agent Flow

```
User Query
    ↓
LLM Analysis (DeepSeek)
    ↓
Tool Call Decision
    ├─ Yes → Execute Tool (Weather API)
    │         ↓
    │    LLM Response Generation
    │         ↓
    └─ No → Direct Response
    ↓
Return Response to User
```

## 🛠️ Troubleshooting

### Issue: "Cannot connect to Ollama"
- Make sure Ollama is running: `ollama serve`
- Check if running on correct port: `http://localhost:11434`

### Issue: "Model not found"
- Pull the model: `ollama pull deepseek-r1:1.5b`
- Check available models: `ollama list`

### Issue: "API Key error"
- Verify OpenWeatherMap API key in `.env`
- Get free key from [openweathermap.org](https://openweathermap.org/api)

### Issue: CORS errors
- Flask-CORS is configured for all origins
- For production, restrict to specific domains

## 📊 Example Queries

The agent can handle various weather queries:

1. **Simple Weather**
   - "What's the weather in Mumbai?"
   - "Is it raining today?"

2. **Forecast Questions**
   - "Will it rain tomorrow?"
   - "What's the temperature forecast for next week?"

3. **Activity Suggestions**
   - "Is it a good time to go jogging?"
   - "Can I go for a walk today?"

4. **Specific Conditions**
   - "How humid is it in Delhi?"
   - "What's the wind speed in Bangalore?"

## 🔧 Configuration

### Model Selection
To use a different model, edit `agent.py`:
```python
self.model = "llama2"  # or any other Ollama model
```

Available models: `ollama list`

### Temperature & Parameters
Adjust LLM behavior in `agent.py`:
```python
payload = {
    "temperature": 0.7,  # Lower = more deterministic
    "top_p": 0.9,
    "top_k": 40,
}
```

### API Timeout
Adjust timeout in `tools.py`:
```python
response = requests.get(url, params=params, timeout=10)  # seconds
```

## 📝 Notes

- Conversation history is kept for context (last 10 messages)
- Weather data is fetched in real-time from OpenWeatherMap
- Ollama runs locally, no external LLM API calls
- All responses are generated locally for privacy

## 🚀 Production Deployment

For production:

1. Use a production WSGI server (Gunicorn, uWSGI)
2. Set `FLASK_ENV=production`
3. Disable `FLASK_DEBUG`
4. Use environment variables for secrets
5. Add rate limiting
6. Add request validation
7. Use HTTPS

Example with Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 main:app
```

## 📄 License

MIT License
