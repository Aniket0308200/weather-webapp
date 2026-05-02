import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Cloud, Moon, Sun, Wind, Droplets, Eye, Gauge, MapPin } from 'lucide-react';
import SearchWithAutocomplete from './components/SearchWithAutocomplete';
import DynamicBackground from './components/DynamicBackground';
import Navigation from './components/Navigation';
import RealWorldMap from './components/RealWorldMap';
import SunMoonInfo from './components/SunMoonInfo';
import { getThemeByWeatherCode } from './utils/weatherTheme';

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
      });

      const hourly = forecast[0].hour.map((h) => ({
        time: h.time,
        temp: h.temp_c,
        code: h.condition.code,
        precipitation: h.chance_of_rain,
        icon: h.condition.icon,
      }));
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

      const newTheme = getThemeByWeatherCode(current.condition.code);
      setTheme(newTheme);
    } catch (err) {
      setError('Failed to fetch weather. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Delhi');
  }, []);

  const handleSaveLocation = () => {
    if (weather && !savedLocations.some((loc) => loc.city === weather.city)) {
      const newLocation = { city: weather.city, country: weather.country };
      const updated = [...savedLocations, newLocation];
      setSavedLocations(updated);
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        color: 'white',
        transition: 'background 1s ease-in-out',
      }}
    >
      <DynamicBackground weatherCode={weather?.code} isDark={isDark} />

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      {/* Main Container with padding for navigation */}
      <div className="min-h-screen p-4 md:p-8 lg:pl-80 pt-24 lg:pt-8 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search and Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">Weather</h1>
              <p className="text-white/60">Premium Dashboard</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="p-4 rounded-full glass-card hover:bg-white/20 transition-all"
            >
              {isDark ? <Sun size={28} /> : <Moon size={28} />}
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
                      className="glass-card rounded-3xl p-8 md:p-12"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin size={28} className="text-white" />
                            <h2 className="text-5xl md:text-6xl font-bold text-white">{weather.city}</h2>
                          </div>
                          <p className="text-white/60 text-lg ml-11">{weather.country}</p>
                        </div>
                        {weather.icon && (
                          <motion.img
                            src={weather.icon}
                            alt={weather.condition}
                            className="w-32 h-32 icon-bounce"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-4 mb-4">
                          <span className="text-9xl font-bold text-white">{weather.temp}</span>
                          <span className="text-5xl text-white/70">°C</span>
                        </div>
                        <p className="text-xl text-white/60">Feels like {weather.feelsLike}°C</p>
                      </div>

                      {/* Weather Condition Highlight */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl mb-6"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`,
                          border: `2px solid ${theme.primary}60`,
                        }}
                      >
                        <p className="text-center text-3xl md:text-4xl font-bold text-white">
                          {weather.condition}
                        </p>
                      </motion.div>

                      {/* Save Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveLocation}
                        className="w-full py-3 rounded-2xl glass-card hover:bg-white/20 transition-all font-semibold text-lg"
                      >
                        ⭐ Save Location
                      </motion.button>
                    </motion.div>

                    {/* Metrics Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
                    <RealWorldMap weather={weather} theme={theme} isDark={isDark} />

                    {/* Hourly Forecast */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-card rounded-3xl p-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Hourly Forecast</h3>
                      <div className="overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex gap-3 min-w-max">
                          {hourlyData.slice(0, 12).map((hour, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              className="flex flex-col items-center gap-2 p-3 rounded-xl flex-shrink-0 w-20 glass-card hover:bg-white/15 transition-all"
                            >
                              <span className="text-xs font-semibold text-white/70">
                                {new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {hour.icon && <img src={hour.icon} alt="" className="w-8 h-8" />}
                              <span className="text-sm font-bold text-white">{Math.round(hour.temp)}°</span>
                            </motion.div>
                          ))}
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
                      className="glass-card rounded-3xl p-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📅</span> 7-Day Forecast
                      </h3>
                      <div className="space-y-3">
                        {dailyData.slice(0, 7).map((day, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-xl glass-card hover:bg-white/15 transition-all border border-white/10 hover:border-white/20"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-white">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              {day.icon && <img src={day.icon} alt="" className="w-6 h-6" />}
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
                        ))}
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
                  className="glass-card rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">📍 Saved Locations</h2>
                  {savedLocations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedLocations.map((loc, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => {
                            fetchWeather(loc.city);
                            setActiveTab('dashboard');
                          }}
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-6 rounded-2xl glass-card hover:bg-white/20 transition-all text-left"
                        >
                          <p className="font-bold text-white text-lg">{loc.city}</p>
                          <p className="text-sm text-white/60">{loc.country}</p>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/60 text-lg">No saved locations yet. Add one from the dashboard!</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">⚙️ Settings</h2>
                  <div className="space-y-6">
                    {/* Theme Toggle */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-between p-6 rounded-2xl glass-card hover:bg-white/15 transition-all"
                    >
                      <div>
                        <p className="text-lg font-semibold text-white">Dark Mode</p>
                        <p className="text-sm text-white/60">Toggle between light and dark themes</p>
                      </div>
                      <motion.button
                        onClick={() => setIsDark(!isDark)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full glass-card hover:bg-white/20 transition-all"
                      >
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                      </motion.button>
                    </motion.div>

                    {/* Temperature Unit */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between p-6 rounded-2xl glass-card hover:bg-white/15 transition-all"
                    >
                      <div>
                        <p className="text-lg font-semibold text-white">Temperature Unit</p>
                        <p className="text-sm text-white/60">Currently set to Celsius (°C)</p>
                      </div>
                      <span className="text-2xl font-bold text-white">°C</span>
                    </motion.div>

                    {/* Default Location */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between p-6 rounded-2xl glass-card hover:bg-white/15 transition-all"
                    >
                      <div>
                        <p className="text-lg font-semibold text-white">Default Location</p>
                        <p className="text-sm text-white/60">{weather?.city || 'Delhi'}</p>
                      </div>
                      <span className="text-sm font-semibold text-white/60">Set</span>
                    </motion.div>

                    {/* About */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 rounded-2xl glass-card"
                    >
                      <p className="text-lg font-semibold text-white mb-2">About</p>
                      <p className="text-sm text-white/60">Premium Weather Dashboard v1.0</p>
                      <p className="text-xs text-white/40 mt-2">Powered by WeatherAPI.com</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
