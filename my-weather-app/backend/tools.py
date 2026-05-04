"""
Weather API Tools for the AI Agent
"""
import requests
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', 'f8e24dd296b7444cb27141718260105')
OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'


def get_weather(city: str, date: str = 'today') -> Dict[str, Any]:
    """
    Fetch weather data for a given city and date.
    
    Args:
        city: City name (e.g., 'Mumbai', 'London')
        date: Date ('today', 'tomorrow', or specific date)
    
    Returns:
        Dictionary with weather information
    """
    try:
        # Get current weather
        current_url = f"{OPENWEATHER_BASE_URL}/weather"
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(current_url, params=params, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        
        weather_info = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': round(data['main']['temp']),
            'feels_like': round(data['main']['feels_like']),
            'humidity': data['main']['humidity'],
            'condition': data['weather'][0]['main'],
            'description': data['weather'][0]['description'],
            'wind_speed': round(data['wind']['speed'], 1),
            'pressure': data['main']['pressure'],
            'visibility': round(data['visibility'] / 1000, 1),
            'rain_probability': data.get('clouds', {}).get('all', 0),
            'sunrise': data['sys']['sunrise'],
            'sunset': data['sys']['sunset'],
        }
        
        # Get forecast for tomorrow
        if date.lower() in ['tomorrow', 'next day']:
            forecast_url = f"{OPENWEATHER_BASE_URL}/forecast"
            response = requests.get(forecast_url, params=params, timeout=5)
            response.raise_for_status()
            
            forecast_data = response.json()
            if forecast_data['list']:
                tomorrow_forecast = forecast_data['list'][8]  # 24 hours later
                weather_info['tomorrow_forecast'] = {
                    'temperature': round(tomorrow_forecast['main']['temp']),
                    'condition': tomorrow_forecast['weather'][0]['main'],
                    'rain_probability': tomorrow_forecast['clouds']['all'],
                }
        
        return weather_info
    
    except requests.exceptions.RequestException as e:
        return {
            'error': f'Failed to fetch weather data: {str(e)}',
            'city': city
        }
    except KeyError as e:
        return {
            'error': f'Invalid city name: {city}',
            'city': city
        }


def get_weather_forecast(city: str, days: int = 5) -> Dict[str, Any]:
    """
    Fetch weather forecast for multiple days.
    
    Args:
        city: City name
        days: Number of days to forecast (1-5)
    
    Returns:
        Dictionary with forecast information
    """
    try:
        url = f"{OPENWEATHER_BASE_URL}/forecast"
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        forecast_list = []
        
        for i, forecast in enumerate(data['list'][:days * 8]):  # 8 forecasts per day
            if i % 8 == 0:  # Get one forecast per day
                forecast_list.append({
                    'date': forecast['dt_txt'].split()[0],
                    'temperature': round(forecast['main']['temp']),
                    'condition': forecast['weather'][0]['main'],
                    'rain_probability': forecast['clouds']['all'],
                    'humidity': forecast['main']['humidity'],
                })
        
        return {
            'city': city,
            'forecast': forecast_list
        }
    
    except Exception as e:
        return {
            'error': f'Failed to fetch forecast: {str(e)}',
            'city': city
        }
