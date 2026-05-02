import axios from 'axios';

const WEATHER_API_KEY = 'f8e24dd296b7444cb27141718260105';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

// Weather code to theme mapping
export const weatherCodeThemes = {
  // Clear/Summer
  1000: { name: 'Clear', theme: 'summer', gradient: 'from-yellow-400 via-blue-400 to-cyan-300' },
  1003: { name: 'Partly Cloudy', theme: 'summer', gradient: 'from-yellow-200 via-blue-200 to-slate-300' },
  
  // Cloudy
  1006: { name: 'Cloudy', theme: 'autumn', gradient: 'from-orange-300 via-pink-200 to-slate-400' },
  1009: { name: 'Overcast', theme: 'autumn', gradient: 'from-orange-300 via-pink-200 to-slate-400' },
  
  // Fog
  1030: { name: 'Mist', theme: 'winter', gradient: 'from-cyan-200 via-white to-slate-300' },
  1135: { name: 'Fog', theme: 'winter', gradient: 'from-cyan-300 via-white to-blue-200' },
  
  // Drizzle
  1063: { name: 'Patchy rain nearby', theme: 'monsoon', gradient: 'from-teal-400 via-slate-500 to-slate-600' },
  1069: { name: 'Patchy snow nearby', theme: 'winter', gradient: 'from-cyan-400 via-blue-200 to-slate-300' },
  1072: { name: 'Patchy freezing drizzle nearby', theme: 'winter', gradient: 'from-cyan-500 via-blue-400 to-slate-500' },
  
  // Rain
  1150: { name: 'Light drizzle', theme: 'monsoon', gradient: 'from-teal-400 via-slate-500 to-slate-600' },
  1153: { name: 'Light rain', theme: 'monsoon', gradient: 'from-teal-500 via-slate-600 to-slate-700' },
  1168: { name: 'Freezing drizzle', theme: 'winter', gradient: 'from-cyan-400 via-blue-300 to-slate-400' },
  1171: { name: 'Heavy freezing drizzle', theme: 'winter', gradient: 'from-cyan-500 via-blue-400 to-slate-500' },
  1180: { name: 'Patchy light rain', theme: 'monsoon', gradient: 'from-teal-500 via-slate-600 to-slate-700' },
  1183: { name: 'Light rain', theme: 'monsoon', gradient: 'from-teal-500 via-slate-600 to-slate-700' },
  1186: { name: 'Moderate rain', theme: 'monsoon', gradient: 'from-teal-600 via-slate-700 to-slate-800' },
  1189: { name: 'Moderate rain', theme: 'monsoon', gradient: 'from-teal-600 via-slate-700 to-slate-800' },
  1192: { name: 'Heavy rain', theme: 'monsoon', gradient: 'from-teal-700 via-slate-800 to-slate-900' },
  1195: { name: 'Heavy rain', theme: 'monsoon', gradient: 'from-teal-700 via-slate-800 to-slate-900' },
  1198: { name: 'Light freezing rain', theme: 'winter', gradient: 'from-cyan-400 via-blue-300 to-slate-400' },
  1201: { name: 'Moderate or heavy freezing rain', theme: 'winter', gradient: 'from-cyan-500 via-blue-400 to-slate-500' },
  
  // Snow
  1204: { name: 'Light sleet', theme: 'winter', gradient: 'from-cyan-400 via-blue-200 to-slate-300' },
  1207: { name: 'Moderate or heavy sleet', theme: 'winter', gradient: 'from-cyan-500 via-blue-300 to-slate-400' },
  1210: { name: 'Patchy light snow', theme: 'winter', gradient: 'from-cyan-300 via-white to-blue-200' },
  1213: { name: 'Light snow', theme: 'winter', gradient: 'from-cyan-400 via-blue-100 to-slate-300' },
  1216: { name: 'Moderate snow', theme: 'winter', gradient: 'from-cyan-400 via-blue-200 to-slate-300' },
  1219: { name: 'Heavy snow', theme: 'winter', gradient: 'from-cyan-500 via-blue-200 to-slate-400' },
  1222: { name: 'Heavy snow', theme: 'winter', gradient: 'from-cyan-500 via-blue-300 to-slate-400' },
  1225: { name: 'Heavy snow', theme: 'winter', gradient: 'from-cyan-500 via-blue-300 to-slate-400' },
  
  // Rain showers
  1240: { name: 'Light rain shower', theme: 'monsoon', gradient: 'from-teal-500 via-slate-600 to-slate-700' },
  1243: { name: 'Moderate or heavy rain shower', theme: 'monsoon', gradient: 'from-teal-600 via-slate-700 to-slate-800' },
  1246: { name: 'Torrential rain shower', theme: 'monsoon', gradient: 'from-teal-700 via-slate-800 to-slate-900' },
  
  // Snow showers
  1249: { name: 'Light snow showers', theme: 'winter', gradient: 'from-cyan-400 via-blue-200 to-slate-300' },
  1252: { name: 'Moderate or heavy snow showers', theme: 'winter', gradient: 'from-cyan-500 via-blue-300 to-slate-400' },
  
  // Thunderstorm
  1273: { name: 'Patchy light rain with thunder', theme: 'storm', gradient: 'from-slate-800 via-purple-700 to-slate-900' },
  1276: { name: 'Moderate or heavy rain with thunder', theme: 'storm', gradient: 'from-slate-900 via-purple-800 to-slate-950' },
  1279: { name: 'Patchy light snow with thunder', theme: 'storm', gradient: 'from-slate-800 via-purple-700 to-slate-900' },
  1282: { name: 'Moderate or heavy snow with thunder', theme: 'storm', gradient: 'from-slate-900 via-purple-800 to-slate-950' },
};

// Fetch weather data using WeatherAPI
export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${latitude},${longitude}`,
        days: 7,
        aqi: 'yes',
        alerts: 'yes',
      },
    });

    const data = response.data;
    
    // Transform WeatherAPI response to match our expected format
    return {
      current: {
        temperature_2m: data.current.temp_c,
        apparent_temperature: data.current.feelslike_c,
        relative_humidity_2m: data.current.humidity,
        weather_code: data.current.condition.code,
        wind_speed_10m: data.current.wind_kph,
        wind_direction_10m: data.current.wind_degree,
        uv_index: data.current.uv,
        visibility: data.current.vis_km * 1000,
        pressure_msl: data.current.pressure_mb,
        precipitation: data.current.precip_mm,
      },
      hourly: {
        time: data.forecast.forecastday[0].hour.map(h => h.time_epoch * 1000),
        temperature_2m: data.forecast.forecastday[0].hour.map(h => h.temp_c),
        weather_code: data.forecast.forecastday[0].hour.map(h => h.condition.code),
        precipitation_probability: data.forecast.forecastday[0].hour.map(h => h.chance_of_rain),
        wind_speed_10m: data.forecast.forecastday[0].hour.map(h => h.wind_kph),
      },
      daily: {
        time: data.forecast.forecastday.map(d => d.date),
        weather_code: data.forecast.forecastday.map(d => d.day.condition.code),
        temperature_2m_max: data.forecast.forecastday.map(d => d.day.maxtemp_c),
        temperature_2m_min: data.forecast.forecastday.map(d => d.day.mintemp_c),
        precipitation_sum: data.forecast.forecastday.map(d => d.day.totalprecip_mm),
        uv_index_max: data.forecast.forecastday.map(d => d.day.uv),
        sunrise: data.forecast.forecastday.map(d => d.astro.sunrise),
        sunset: data.forecast.forecastday.map(d => d.astro.sunset),
        moonrise: data.forecast.forecastday.map(d => d.astro.moonrise),
        moonset: data.forecast.forecastday.map(d => d.astro.moonset),
        moon_phase: data.forecast.forecastday.map(d => {
          const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
          const phaseIndex = Math.round((phases.length - 1) * (d.astro.moon_illumination / 100));
          return phaseIndex / phases.length;
        }),
      },
      current_time: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Geocode location name to coordinates
export const geocodeLocation = async (query) => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: query,
        aqi: 'no',
      },
    });

    // WeatherAPI doesn't have a dedicated search endpoint, so we'll use a workaround
    // For better results, use the search endpoint if available
    const location = response.data.location;
    
    return [
      {
        name: location.name,
        country: location.country,
        latitude: location.lat,
        longitude: location.lon,
        admin1: location.region,
      },
    ];
  } catch (error) {
    console.error('Error geocoding location:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};

// Reverse geocode coordinates to location name
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${latitude},${longitude}`,
        aqi: 'no',
      },
    });

    const location = response.data.location;
    return {
      name: location.name,
      country: location.country,
      latitude: location.lat,
      longitude: location.lon,
      admin1: location.region,
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
};

// Get theme based on weather code
export const getThemeByWeatherCode = (code) => {
  return weatherCodeThemes[code] || weatherCodeThemes[1000];
};

// Format time
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// Get wind direction label
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Calculate sun position (0-1, where 0 is sunrise and 1 is sunset)
export const calculateSunPosition = (currentTime, sunrise, sunset) => {
  const current = new Date(currentTime).getTime();
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();
  
  if (current < sunriseTime || current > sunsetTime) {
    return current < sunriseTime ? -0.2 : 1.2;
  }
  
  return (current - sunriseTime) / (sunsetTime - sunriseTime);
};

// Calculate moon position (0-1, where 0 is moonrise and 1 is moonset)
export const calculateMoonPosition = (currentTime, moonrise, moonset) => {
  if (!moonrise || !moonset) return 0.5;
  
  const current = new Date(currentTime).getTime();
  const moonriseTime = new Date(moonrise).getTime();
  const moonsetTime = new Date(moonset).getTime();
  
  if (current < moonriseTime || current > moonsetTime) {
    return current < moonriseTime ? -0.2 : 1.2;
  }
  
  return (current - moonriseTime) / (moonsetTime - moonriseTime);
};
