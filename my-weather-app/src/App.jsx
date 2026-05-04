import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Cloud, Moon, Sun, Wind, Droplets, Eye, Gauge, MapPin } from 'lucide-react';
import SearchWithAutocomplete from './components/SearchWithAutocomplete';
import DynamicBackground from './components/DynamicBackground';
import Navigation from './components/Navigation';
import RealWorldMap from './components/RealWorldMap';
import SunMoonInfo from './components/SunMoonInfo';
import ChatWidget from './components/ChatWidget';
import { getThemeByWeatherCode } from './utils/weatherTheme';
import { getCustomWeatherIcon, getBackgroundType } from './utils/weatherIcons';

const WEATHER_API_KEY = 'f8e24dd296b7444cb27141718260105';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [theme, setTheme] = useState(getThemeByWeatherCode(1000));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveNotification, setSaveNotification] = useState(false);
  const [, setUpdateTrigger] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Update hourly forecast every minute to reflect "Now" label changes
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateTrigger((prev) => prev + 1);
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Load saved locations
  useEffect(() => {
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  // Fetch weather
  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${WEATHER_API_BASE}/forecast.json`, {
        params: {
          key: WEATHER_API_KEY,
          q: location,
          days: 7,
          aqi: 'yes',
        },
      });

      const data = response.data;
      const current = data.current;
      const forecast = data.forecast.forecastday;

      setWeather({
        city: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        timezone: data.location.tz_id,
        temp: Math.round(current.temp_c),
        feelsLike: Math.round(current.feelslike_c),
        condition: current.condition.text,
        icon: current.condition.icon,
        code: current.condition.code,
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        windDirection: current.wind_degree,
        visibility: current.vis_km,
        pressure: current.pressure_mb,
        uvIndex: current.uv,
        sunrise: forecast[0].astro.sunrise,
        sunset: forecast[0].astro.sunset,
        moonrise: forecast[0].astro.moonrise,
        moonset: forecast[0].astro.moonset,
        isDay: current.is_day,
      });

      const hourly = [];
      // Collect hourly data from all forecast days to have enough hours
      forecast.forEach((day) => {
        day.hour.forEach((h) => {
          hourly.push({
            time: h.time,
            temp: h.temp_c,
            code: h.condition.code,
            precipitation: h.chance_of_rain,
            icon: h.condition.icon,
            isDay: h.is_day,
          });
        });
      });
      setHourlyData(hourly);

      const daily = forecast.map((d) => ({
        date: d.date,
        code: d.day.condition.code,
        maxTemp: d.day.maxtemp_c,
        minTemp: d.day.mintemp_c,
        precipitation: d.day.totalprecip_mm,
        uvIndex: d.day.uv,
        icon: d.day.condition.icon,
      }));
      setDailyData(daily);

      const newTheme = getThemeByWeatherCode(current.condition.code, current.is_day);
      setTheme(newTheme);
    } catch (err) {
      setError('Failed to fetch weather. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  const handleSaveLocation = () => {
    if (weather && !savedLocations.some((loc) => loc.city === weather.city)) {
      const newLocation = { city: weather.city, country: weather.country };
      const updated = [...savedLocations, newLocation];
      setSavedLocations(updated);
      localStorage.setItem('savedLocations', JSON.stringify(updated));
      
      // Show notification
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    }
  };

  const handleDeleteLocation = (cityName) => {
    const updated = savedLocations.filter((l) => l.city !== cityName);
    setSavedLocations(updated);
    localStorage.setItem('savedLocations', JSON.stringify(updated));
    setDeleteConfirm(null);
  };

  // Get filtered hourly data for 24-hour cycle starting from current time in location's timezone
  const getFilteredHourlyData = () => {
    if (!hourlyData || hourlyData.length === 0) return [];

    // Get current time in the location's timezone
    let currentHour;
    let currentDate;

    if (weather && weather.timezone) {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: weather.timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          hour12: false,
        });
        const parts = formatter.formatToParts(new Date());
        const dateObj = {};
        parts.forEach(part => {
          dateObj[part.type] = part.value;
        });
        currentHour = parseInt(dateObj.hour);
        currentDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
      } catch (e) {
        // Fallback to local time if timezone is invalid
        const now = new Date();
        currentHour = now.getHours();
        currentDate = now.toISOString().split('T')[0];
      }
    } else {
      const now = new Date();
      currentHour = now.getHours();
      currentDate = now.toISOString().split('T')[0];
    }

    // Create a 24-hour range starting from current hour
    const filtered = [];
    
    // Step 1: Add all remaining hours from today (current hour to 23:00)
    const todayHours = hourlyData.filter((hour) => {
      const hourDate = hour.time.split(' ')[0];
      const hourTime = hour.time.split(' ')[1];
      const [hourNum] = hourTime.split(':');
      const hour24 = parseInt(hourNum);

      return hourDate === currentDate && hour24 >= currentHour;
    });

    filtered.push(...todayHours);

    // Step 2: If we don't have 24 hours yet, add hours from tomorrow and beyond
    if (filtered.length < 24) {
      const hoursNeeded = 24 - filtered.length;
      
      // Get all hours after today
      const futureHours = hourlyData.filter((hour) => {
        const hourDate = hour.time.split(' ')[0];
        return hourDate > currentDate;
      });

      // Add only the hours we need
      filtered.push(...futureHours.slice(0, hoursNeeded));
    }

    return filtered.slice(0, 24); // Ensure exactly 24 hours
  };

  // Get display label for hour (Now or time) based on location's timezone
  const getHourLabel = (hourTime) => {
    // Get current hour in the location's timezone
    let currentHour;

    if (weather && weather.timezone) {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: weather.timezone,
          hour: '2-digit',
          hour12: false,
        });
        const parts = formatter.formatToParts(new Date());
        const hourPart = parts.find(p => p.type === 'hour');
        currentHour = parseInt(hourPart.value);
      } catch (e) {
        // Fallback to local time if timezone is invalid
        currentHour = new Date().getHours();
      }
    } else {
      currentHour = new Date().getHours();
    }

    const [hourNum] = hourTime.split(':');
    const hour24 = parseInt(hourNum);

    if (hour24 === currentHour) {
      return 'Now';
    }

    // Convert to 12-hour format
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${hourTime.split(':')[1]} ${ampm}`;
  };

  return (
    <div
      data-dark-mode={isDark}
      style={{
        minHeight: '100vh',
        background: 'transparent',
        color: 'white',
        transition: 'background 1s ease-in-out',
      }}
    >
      <DynamicBackground weatherCode={weather?.code} isDark={isDark} isDay={weather?.isDay} />

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      {/* Save Location Notification */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-0"
          >
            <div className="glass-card px-3 sm:px-6 py-3 sm:py-4 rounded-2xl flex items-center gap-2 sm:gap-3 max-w-md sm:max-w-sm">
              <span className="text-xl sm:text-2xl flex-shrink-0">✅</span>
              <p className="text-white font-semibold text-sm sm:text-base">Location saved successfully!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-sm w-full"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Delete Location?</h3>
              <p className="text-white/70 text-sm sm:text-base mb-6">
                Are you sure you want to delete <span className="font-semibold text-white">{deleteConfirm}</span> from your saved locations?
              </p>
              <div className="flex gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  }}
                >
                  No, Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteLocation(deleteConfirm)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all text-white"
                  style={{
                    background: 'rgba(239, 68, 68, 0.3)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                  }}
                >
                  Yes, Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container with padding for navigation */}
      <div className="min-h-screen p-2 sm:p-4 md:p-8 lg:pl-80 pt-4 sm:pt-24 lg:pt-20 pb-20 sm:pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search and Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 md:mx-0 mx-2 sm:mb-8"
          >
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>Weather</h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 sm:p-4 rounded-full glass-card hover:bg-white/20 transition-all"
            >
              {isDark ? <Sun size={24} className="sm:w-7 sm:h-7" /> : <Moon size={24} className="sm:w-7 sm:h-7" />}
            </motion.button>
          </motion.div>

          {/* Search Bar */}
          <SearchWithAutocomplete onSearch={fetchWeather} theme={theme} />

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <Cloud size={64} className="text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-3xl bg-red-500/20 border-red-500/40 p-6 mb-8 text-red-200"
            >
              {error}
            </motion.div>
          )}

          {/* Main Content Grid */}
          {weather && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content - Left Side (2 columns) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Large Current Weather Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="glass-card rounded-3xl p-4 sm:p-8 md:p-12"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <MapPin size={24} className="sm:w-7 sm:h-7 text-white" />
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">{weather.city}</h2>
                          </div>
                          <p className="text-white/60 text-sm sm:text-lg ml-8 sm:ml-11">{weather.country}</p>
                        </div>
                        {weather.icon && (
                          <motion.img
                            src={getCustomWeatherIcon(weather.code, weather.temp, getBackgroundType(weather.code, weather.isDay), weather.isDay)}
                            alt={weather.condition}
                            className="w-24 sm:w-32 h-24 sm:h-32 icon-bounce"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </div>

                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-baseline gap-2 sm:gap-4 mb-2 sm:mb-4">
                          <span className="text-6xl sm:text-9xl font-bold text-white">{weather.temp}</span>
                          <span className="text-3xl sm:text-5xl text-white/70">°C</span>
                        </div>
                        <p className="text-base sm:text-xl text-white/60">Feels like {weather.feelsLike}°C</p>
                      </div>

                      {/* Weather Condition & Save Location - Single Block */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 sm:p-6 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`,
                          border: `2px solid ${theme.primary}60`,
                        }}
                      >
                        {/* Left: Weather Condition */}
                        <div className="flex-1">
                          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            {weather.condition}
                          </p>
                        </div>

                        {/* Right: Save Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveLocation}
                          className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-lg whitespace-nowrap w-full sm:w-auto"
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            transition: 'all 0.3s ease',
                          }}
                          onHover={{
                            background: 'rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          ⭐ Save Location
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Metrics Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4"
                    >
                      {[
                        { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: '#3b82f6' },
                        { icon: Wind, label: 'Wind', value: `${Math.round(weather.windSpeed)} km/h`, color: '#06b6d4' },
                        { icon: Eye, label: 'Visibility', value: `${weather.visibility} km`, color: '#ec4899' },
                        { icon: Gauge, label: 'Pressure', value: `${weather.pressure} mb`, color: '#f59e0b' },
                      ].map((metric, idx) => {
                        const Icon = metric.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="glass-card rounded-2xl p-4 text-center hover:bg-white/15 transition-all"
                          >
                            <Icon size={24} style={{ color: metric.color }} className="mx-auto mb-2" />
                            <p className="text-xs text-white/60 mb-1">{metric.label}</p>
                            <p className="text-lg font-bold text-white">{metric.value}</p>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Weather Map */}
                    <RealWorldMap weather={weather} theme={theme} isDark={isDark} onLocationClick={fetchWeather} />

                    {/* Hourly Forecast */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-card rounded-3xl p-4 sm:p-6"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Hourly Forecast</h3>
                      <div className="overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex gap-2 sm:gap-3 min-w-max">
                          {getFilteredHourlyData().map((hour, idx) => {
                            const hourTime = hour.time.split(' ')[1];
                            const label = getHourLabel(hourTime);
                            const isNow = label === 'Now';
                            // Use the isDay value from the hourly data
                            const hourIsDay = hour.isDay !== undefined ? hour.isDay : true;

                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02 }}
                                className={`flex flex-col items-center gap-3 sm:gap-2 p-2 sm:p-3 rounded-xl flex-shrink-0 w-18 sm:w-20 transition-all ${
                                  isNow
                                    ? 'glass-card bg-white/20 border-2 border-white/40'
                                    : 'glass-card hover:bg-white/15'
                                }`}
                              >
                                <span className={`text-xs font-semibold ${isNow ? 'text-white font-bold' : 'text-white/70'}`}>
                                  {label}
                                </span>
                                {hour.code && <img src={getCustomWeatherIcon(hour.code, hour.temp, '', hourIsDay)} alt="" className="w-6 sm:w-8 h-6 sm:h-8" />}
                                <span className="text-xs sm:text-sm font-bold text-white">{Math.round(hour.temp)}°</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* 7-Day Forecast - Right Side Panel (1 column) */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* 7-Day Forecast Card */}
                    <motion.div
                      className="glass-card rounded-3xl p-4 sm:p-6 h-64 sm:h-96 md:h-auto flex flex-col"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 flex-shrink-0">
                        <span>📅</span> 7-Day Forecast
                      </h3>
                      <div className="space-y-2 sm:space-y-3 overflow-y-auto scrollbar-hide flex-1">
                        {dailyData.slice(0, 7).map((day, idx) => {
                          // For 7-day forecast, show daytime icons (isDay = true) since we're showing max temp
                          const isDayForForecast = true;
                          return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-3 sm:p-4 rounded-xl glass-card hover:bg-white/15 transition-all border border-white/10 hover:border-white/20 flex-shrink-0"
                          >
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <span className="text-xs sm:text-sm font-semibold text-white">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              {day.code && <img src={getCustomWeatherIcon(day.code, day.maxTemp, getBackgroundType(day.code, isDayForForecast), isDayForForecast)} alt="" className="w-5 sm:w-6 h-5 sm:h-6" />}
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-white/60 mb-1">Temp</p>
                                <p className="text-sm font-bold text-white">
                                  {Math.round(day.maxTemp)}°
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-white/60 mb-1">Low</p>
                                <p className="text-sm font-bold text-white/70">
                                  {Math.round(day.minTemp)}°
                                </p>
                              </div>
                            </div>
                            {day.precipitation > 0 && (
                              <div className="mt-2 pt-2 border-t border-white/10">
                                <p className="text-xs text-blue-300">💧 {day.precipitation}mm</p>
                              </div>
                            )}
                          </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Sun & Moon Info */}
                    <SunMoonInfo weather={weather} theme={theme} />
                  </motion.div>
                </div>
              )}

              {/* Locations Tab */}
              {activeTab === 'locations' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Saved Locations Grid */}
                  <motion.div
                    className="glass-card rounded-3xl p-4 sm:p-8"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">📍 Saved Locations</h2>
                    {savedLocations.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {savedLocations.map((loc, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 sm:p-6 rounded-2xl glass-card hover:bg-white/20 transition-all group"
                          >
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-base sm:text-lg truncate">{loc.city}</p>
                                <p className="text-xs sm:text-sm text-white/60 truncate">{loc.country}</p>
                              </div>
                              <motion.button
                                onClick={() => setDeleteConfirm(loc.city)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-1 sm:p-2 rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-red-500/20 flex-shrink-0 ml-2"
                              >
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                            </div>
                            <motion.button
                              onClick={() => {
                                fetchWeather(loc.city);
                                setActiveTab('dashboard');
                              }}
                              whileHover={{ scale: 1.02 }}
                              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs sm:text-sm font-semibold text-white"
                            >
                              View Weather
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-white/60 text-lg">No saved locations yet. Add one from the dashboard!</p>
                      </div>
                    )}
                  </motion.div>

                  {/* Map Section */}
                  {savedLocations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <RealWorldMap weather={weather} theme={theme} isDark={isDark} onLocationClick={fetchWeather} />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-3xl p-4 sm:p-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">⚙️ Settings</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Theme Toggle */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-2xl glass-card hover:bg-white/15 transition-all gap-4"
                    >
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-white">Dark Mode</p>
                        <p className="text-xs sm:text-sm text-white/60">Toggle between light and dark themes</p>
                      </div>
                      <motion.button
                        onClick={() => setIsDark(!isDark)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 sm:p-3 rounded-full glass-card hover:bg-white/20 transition-all"
                      >
                        {isDark ? <Sun size={20} className="sm:w-6 sm:h-6" /> : <Moon size={20} className="sm:w-6 sm:h-6" />}
                      </motion.button>
                    </motion.div>

                    {/* Temperature Unit */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-2xl glass-card hover:bg-white/15 transition-all gap-4"
                    >
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-white">Temperature Unit</p>
                        <p className="text-xs sm:text-sm text-white/60">Currently set to Celsius (°C)</p>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-white">°C</span>
                    </motion.div>

                    {/* Default Location */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-2xl glass-card hover:bg-white/15 transition-all gap-4"
                    >
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-white">Default Location</p>
                        <p className="text-xs sm:text-sm text-white/60">{weather?.city || 'Delhi'}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white/60">Set</span>
                    </motion.div>

                    {/* About */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 sm:p-6 rounded-2xl glass-card"
                    >
                      <p className="text-base sm:text-lg font-semibold text-white mb-2">About</p>
                      <p className="text-xs sm:text-sm text-white/60">Premium Weather Dashboard v1.0</p>
                      <p className="text-xs text-white/40 mt-2">Powered by WeatherAPI.com</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
