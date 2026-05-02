import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Loader } from 'lucide-react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import SunMoonTracker from './SunMoonTracker';
import Sidebar from './Sidebar';
import ThemeBackground from './ThemeBackground';
import { fetchWeatherData, getThemeByWeatherCode } from '../utils/weatherEngine';
import { getTheme, applyDarkMode } from '../utils/themeController';

export default function Dashboard() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getTheme('summer'));

  const fetchWeather = useCallback(async (loc) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(loc.latitude, loc.longitude);
      
      // Add weather description
      const weatherCode = data.current.weather_code;
      const themeInfo = getThemeByWeatherCode(weatherCode);
      data.weatherDescription = themeInfo.name;
      
      setWeatherData(data);
      setLocation(loc);

      // Update theme based on weather
      const newTheme = getTheme(themeInfo.theme);
      const finalTheme = applyDarkMode(newTheme, isDark);
      setCurrentTheme(finalTheme);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }, [isDark]);

  // Default location (Delhi, India)
  useEffect(() => {
    const defaultLocation = {
      name: 'Delhi',
      country: 'India',
      latitude: 28.7041,
      longitude: 77.1025,
      admin1: 'Delhi',
    };
    void fetchWeather(defaultLocation);
  }, [fetchWeather]);

  const handleLocationSelect = (loc) => {
    fetchWeather(loc);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (weatherData) {
      const weatherCode = weatherData.current.weather_code;
      const themeInfo = getThemeByWeatherCode(weatherCode);
      const newTheme = getTheme(themeInfo.theme);
      const finalTheme = applyDarkMode(newTheme, !isDark);
      setCurrentTheme(finalTheme);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <ThemeBackground theme={currentTheme} isDark={isDark} />

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className={`text-4xl font-bold ${currentTheme.primary}`}>
              Weather OS
            </h1>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-4 rounded-full backdrop-blur-xl border transition-all ${
              isDark
                ? 'bg-white/10 border-white/20 text-yellow-300'
                : 'bg-white/10 border-white/20 text-slate-800'
            }`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </motion.div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar
              onLocationSelect={handleLocationSelect}
              currentLocation={location}
              isDark={isDark}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SearchBar onLocationSelect={handleLocationSelect} isDark={isDark} />
            </motion.div>

            {/* Location Info */}
            {location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center ${currentTheme.secondary}`}
              >
                <h2 className={`text-2xl font-bold ${currentTheme.primary}`}>
                  {location.name}
                </h2>
                <p className="text-sm">
                  {location.admin1 && `${location.admin1}, `}{location.country}
                </p>
              </motion.div>
            )}

            {/* Loading State */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader size={40} className={currentTheme.primary} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Weather Content */}
            <AnimatePresence mode="wait">
              {weatherData && !loading && (
                <motion.div
                  key={location?.latitude}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <CurrentWeather data={weatherData} theme={currentTheme} isDark={isDark} />
                  <HourlyForecast data={weatherData} theme={currentTheme} isDark={isDark} />
                  <SunMoonTracker data={weatherData} theme={currentTheme} />
                  <DailyForecast data={weatherData} theme={currentTheme} isDark={isDark} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
