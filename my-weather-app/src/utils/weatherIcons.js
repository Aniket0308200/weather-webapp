// Map weather codes to background images
const getBackgroundType = (weatherCode) => {
  // Clear/Sunny weather
  if (weatherCode === 1000) {
    return 'sunny';
  }
  // Partly cloudy (basant-panchami-cloud)
  else if (weatherCode === 1003 || weatherCode === 1006) {
    return 'basant-panchami';
  }
  // Overcast
  else if (weatherCode === 1009) {
    return 'dark-cloud';
  }
  // Mist/Fog
  else if (weatherCode === 1030 || weatherCode === 1135) {
    return 'mist';
  }
  // Rainy
  else if (weatherCode >= 1063 && weatherCode <= 1195) {
    return 'rainy';
  }
  // Snowy
  else if (weatherCode >= 1204 && weatherCode <= 1252) {
    return 'snowy';
  }
  // Stormy/Thunderstorm
  else if (weatherCode >= 1273 && weatherCode <= 1282) {
    return 'stormy';
  }
  // Winter rain
  else if (weatherCode >= 1150 && weatherCode <= 1201) {
    return 'winter-rainy';
  }
  // Default fallback
  return 'sunny';
};

// Map weather codes to custom icon images
export const getCustomWeatherIcon = (weatherCode, temp, backgroundType) => {
  // Clear/Sunny weather (1000)
  if (weatherCode === 1000) {
    return '/src/assets/sun-icon.png';
  }
  
  // Partly cloudy (1003, 1006)
  if (weatherCode === 1003 || weatherCode === 1006) {
    // Use cloud-icon only for basant-panchami background
    if (backgroundType === 'basant-panchami') {
      return '/src/assets/cloud-icon.png';
    }
    // Use cloud-icon2 for other cloudy backgrounds
    return '/src/assets/cloud-icon2.png';
  }
  
  // Overcast (1009)
  if (weatherCode === 1009) {
    return '/src/assets/cloud-icon2.png';
  }
  
  // Mist/Fog (1030, 1135)
  if (weatherCode === 1030 || weatherCode === 1135) {
    return '/src/assets/cloud-icon2.png';
  }
  
  // Rainy weather (1063-1195)
  if (weatherCode >= 1063 && weatherCode <= 1195) {
    // Check if it's winter/cold rain
    if (temp <= 0) {
      return '/src/assets/winter-rain-icon.png';
    }
    return '/src/assets/rainy-icon.png';
  }
  
  // Snowy weather (1204-1252)
  if (weatherCode >= 1204 && weatherCode <= 1252) {
    return '/src/assets/winter-snow-icon.png';
  }
  
  // Stormy/Thunderstorm (1273-1282)
  if (weatherCode >= 1273 && weatherCode <= 1282) {
    return '/src/assets/cloud-thanderstroom.jpg';
  }
  
  // Winter rain (1150-1201)
  if (weatherCode >= 1150 && weatherCode <= 1201) {
    return '/src/assets/winter-rain-icon.png';
  }
  
  // Night conditions - use moon icon
  if (weatherCode === 1003 || weatherCode === 1006) {
    // Check if it's night (you can pass isDark or check time)
    return '/src/assets/moon-icon.png';
  }
  
  // Default fallback
  return '/src/assets/sun-icon.png';
};

// Get icon based on weather condition and temperature
export const getWeatherIconByCondition = (condition, temp, isDark) => {
  const conditionLower = condition.toLowerCase();
  
  // Sunny/Clear
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return '/src/assets/sun-icon.png';
  }
  
  // Cloudy
  if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    if (isDark || conditionLower.includes('night')) {
      return '/src/assets/moon-icon.png';
    }
    return '/src/assets/cloud-icon2.png';
  }
  
  // Rainy
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    if (temp <= 0) {
      return '/src/assets/winter-rain-icon.png';
    }
    return '/src/assets/rainy-icon.png';
  }
  
  // Snowy
  if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
    return '/src/assets/winter-snow-icon.png';
  }
  
  // Stormy/Thunder
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return '/src/assets/cloud-thanderstroom.jpg';
  }
  
  // Night/Moon
  if (conditionLower.includes('night') || isDark) {
    if (temp <= 0) {
      return '/src/assets/moon-winter-icon.png';
    }
    return '/src/assets/moon-icon.png';
  }
  
  // Default
  return '/src/assets/sun-icon.png';
};

export { getBackgroundType };
