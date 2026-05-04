"""
Flask API for Weather AI Agent
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import WeatherAgent
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the weather agent
weather_agent = WeatherAgent(
    ollama_base_url=os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
)


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Weather AI Agent is running'
    })


@app.route('/chat', methods=['POST'])
def chat():
    """
    Chat endpoint for weather queries
    
    Request body:
    {
        "message": "Will it rain tomorrow in Mumbai?"
    }
    
    Response:
    {
        "response": "AI response here",
        "status": "success"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'Missing message field',
                'status': 'error'
            }), 400
        
        user_message = data['message'].strip()
        
        if not user_message:
            return jsonify({
                'error': 'Message cannot be empty',
                'status': 'error'
            }), 400
        
        # Process the query
        response = weather_agent.process_query(user_message)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/reset', methods=['POST'])
def reset():
    """Reset conversation history"""
    try:
        weather_agent.reset_conversation()
        return jsonify({
            'message': 'Conversation reset',
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/weather/<city>', methods=['GET'])
def get_weather_endpoint(city):
    """
    Get weather for a specific city
    
    Query parameters:
    - date: 'today', 'tomorrow' (default: 'today')
    """
    try:
        from tools import get_weather
        
        date = request.args.get('date', 'today')
        weather_data = get_weather(city, date)
        
        return jsonify({
            'data': weather_data,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=os.getenv('FLASK_DEBUG', False)
    )
