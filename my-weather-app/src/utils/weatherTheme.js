// Dynamic theme based on weather conditions and time of day
export const weatherThemes = {
  clear: {
    name: 'Clear',
    gradient: 'from-blue-400 via-cyan-300 to-blue-200',
    darkGradient: 'from-blue-900 via-blue-800 to-blue-700',
    primary: '#06b6d4',
    secondary: '#0ea5e9',
    accent: '#fbbf24',
    neon: 'rgba(6, 182, 212, 0.5)',
  },
  cloudy: {
    name: 'Cloudy',
    gradient: 'from-slate-400 via-slate-300 to-slate-200',
    darkGradient: 'from-slate-700 via-slate-600 to-slate-500',
    primary: '#64748b',
    secondary: '#475569',
    accent: '#cbd5e1',
    neon: 'rgba(100, 116, 139, 0.5)',
  },
  rainy: {
    name: 'Rainy',
    gradient: 'from-slate-600 via-blue-500 to-slate-700',
    darkGradient: 'from-slate-800 via-blue-700 to-slate-900',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    neon: 'rgba(59, 130, 246, 0.5)',
  },
  stormy: {
    name: 'Stormy',
    gradient: 'from-slate-800 via-purple-700 to-slate-900',
    darkGradient: 'from-slate-900 via-purple-900 to-slate-950',
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#a78bfa',
    neon: 'rgba(124, 58, 237, 0.5)',
  },
  sunny: {
    name: 'Sunny',
    gradient: 'from-yellow-300 via-orange-300 to-red-300',
    darkGradient: 'from-yellow-600 via-orange-600 to-red-600',
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    neon: 'rgba(245, 158, 11, 0.5)',
  },
  snowy: {
    name: 'Snowy',
    gradient: 'from-cyan-200 via-blue-200 to-white',
    darkGradient: 'from-cyan-600 via-blue-600 to-slate-500',
    primary: '#06b6d4',
    secondary: '#0284c7',
    accent: '#e0f2fe',
    neon: 'rgba(6, 182, 212, 0.5)',
  },
};

// Get theme based on weather code
export const getThemeByWeatherCode = (code, isDaytime = true) => {
  // WeatherAPI codes
  if (code === 1000) return isDaytime ? weatherThemes.sunny : weatherThemes.clear;
  if (code === 1003 || code === 1006) return weatherThemes.cloudy;
  if (code === 1009) return weatherThemes.cloudy;
  if (code === 1030 || code === 1135) return weatherThemes.cloudy;
  if (code >= 1063 && code <= 1195) return weatherThemes.rainy;
  if (code >= 1204 && code <= 1252) return weatherThemes.snowy;
  if (code >= 1273 && code <= 1282) return weatherThemes.stormy;
  
  return isDaytime ? weatherThemes.sunny : weatherThemes.clear;
};

// Get complementary colors
export const getThemeColors = (theme, isDark = false) => {
  return {
    gradient: isDark ? theme.darkGradient : theme.gradient,
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    neon: theme.neon,
  };
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

// Calculate moon position
export const calculateMoonPosition = (currentTime, moonrise, moonset) => {
  if (!moonrise || !moonset) return 0.5;
  
  const current = new Date(currentTime).getTime();
  const moonriseTime = new Date(moonrise).getTime();
  const moonsetTime = new Date(moonset).getTime();
  
  if (current < moonriseTime || current > moonsetTime) {
    return current < moonriseTime ? -0.2 : 1.2;
  }
  
  return (current - moonriseTime) / (moonsetTime - moonsetTime);
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

// Get wind direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
