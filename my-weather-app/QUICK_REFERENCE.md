# 🚀 Quick Reference Guide

## Project Structure
```
my-weather-app/
├── src/
│   ├── components/
│   │   ├── ChatWidget.jsx          # AI chat widget
│   │   ├── DynamicBackground.jsx   # Day/night backgrounds
│   │   ├── Navigation.jsx          # Tab navigation
│   │   ├── RealWorldMap.jsx        # Weather map
│   │   ├── SearchWithAutocomplete.jsx
│   │   ├── SearchBar.jsx
│   │   └── SunMoonInfo.jsx
│   ├── utils/
│   │   ├── weatherIcons.js         # Icon selection logic
│   │   └── weatherTheme.js         # Theme colors
│   ├── assets/                     # Images and icons
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # Main styles
│   └── main.jsx
├── backend/
│   ├── main.py                     # Flask API
│   ├── agent.py                    # AI agent logic
│   ├── tools.py                    # Weather API tools
│   ├── prompt.py                   # AI system prompt
│   └── requirements.txt
├── package.json
└── vite.config.js
```

## Key Files for Day/Night Logic

### 1. `src/App.jsx`
- **Hourly Forecast** (Line ~475): Uses `hourIsDay` from hourly data
- **7-Day Forecast** (Line ~520): Uses `isDayForForecast = true`
- **Main Weather** (Line ~300): Uses `weather.isDay` from current data

### 2. `src/utils/weatherIcons.js`
- `getCustomWeatherIcon(weatherCode, temp, backgroundType, isDay)`
- Returns appropriate icon based on weather code and time
- Day icons: sun, clouds, rain, snow, etc.
- Night icons: moon (for all conditions at night)

### 3. `src/components/DynamicBackground.jsx`
- `getBackgroundImage(weatherCode, isDay)`
- Returns appropriate background image
- Day backgrounds: bright, sunny, cloudy
- Night backgrounds: dark, starry, cloudy

## Common Tasks

### Add a New Weather Condition
1. Find the weather code from WeatherAPI.com
2. Add condition to `getCustomWeatherIcon()` in `weatherIcons.js`
3. Add condition to `getBackgroundImage()` in `DynamicBackground.jsx`
4. Add corresponding icon and background images to `src/assets/`

### Change Icon for a Condition
1. Edit `src/utils/weatherIcons.js`
2. Update the icon path in the appropriate condition
3. Ensure icon file exists in `src/assets/`
4. Rebuild: `npm run build`

### Change Background for a Condition
1. Edit `src/components/DynamicBackground.jsx`
2. Update the background image path
3. Ensure image file exists in `src/assets/`
4. Rebuild: `npm run build`

### Fix Day/Night Detection Issues
1. Check `isDay` parameter is being passed correctly
2. Verify API is returning `is_day` field
3. Check `getCustomWeatherIcon()` has proper day/night logic
4. Check `getBackgroundImage()` has proper day/night logic

## API Integration

### Weather API
- **Provider**: WeatherAPI.com
- **Endpoint**: `https://api.weatherapi.com/v1/forecast.json`
- **Key**: `f8e24dd296b7444cb27141718260105`
- **Data**: Current weather, hourly forecast, daily forecast

### AI Chat API
- **Backend**: Flask on `http://localhost:5000`
- **Endpoint**: `/chat` (POST)
- **Model**: DeepSeek 1.5B via Ollama
- **Timeout**: 300 seconds (5 minutes)

## Build & Deploy

### Development
```bash
npm run dev          # Start dev server on port 5173
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Linux/Mac)
venv\Scripts\activate     # Activate (Windows)
pip install -r requirements.txt
python main.py       # Start Flask server
```

## Debugging

### Check Console Errors
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls

### Check Weather Data
1. Add console.log in `fetchWeather()` function
2. Log the API response
3. Verify `is_day` field is present

### Check Icon Selection
1. Add console.log in `getCustomWeatherIcon()`
2. Log the parameters and returned icon path
3. Verify icon file exists

### Check Background Selection
1. Add console.log in `getBackgroundImage()`
2. Log the parameters and returned background path
3. Verify background file exists

## Performance Tips

### Optimize Images
- Use WebP format for better compression
- Compress PNG/JPG files
- Use appropriate image sizes

### Optimize Code
- Use React.memo for components that don't change
- Use useCallback for event handlers
- Lazy load components if needed

### Optimize API Calls
- Cache weather data
- Reduce API call frequency
- Use appropriate forecast days (7 is good)

## Common Issues & Solutions

### Issue: All icons showing as moon
**Solution**: Check `isDay` parameter is being passed correctly to `getCustomWeatherIcon()`

### Issue: Background not changing
**Solution**: Check `isDay` parameter in `DynamicBackground` component

### Issue: Icons not loading
**Solution**: Check image paths in `weatherIcons.js` match actual file names in `src/assets/`

### Issue: Chat not working
**Solution**: Ensure backend is running on `http://localhost:5000`

### Issue: Slow response times
**Solution**: First request is slow (model loading), subsequent requests are faster

## Useful Links

- [WeatherAPI.com Docs](https://www.weatherapi.com/docs/)
- [React Docs](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## Environment Variables

### Frontend (.env)
```
VITE_API_KEY=f8e24dd296b7444cb27141718260105
VITE_API_BASE=https://api.weatherapi.com/v1
```

### Backend (.env)
```
OPENWEATHER_API_KEY=your_key_here
OLLAMA_BASE_URL=http://localhost:11434
FLASK_ENV=development
```

## Testing Checklist

- [ ] App loads without errors
- [ ] Weather data displays correctly
- [ ] Hourly forecast shows correct icons
- [ ] 7-day forecast shows correct icons
- [ ] Background changes with weather
- [ ] Background changes with day/night
- [ ] Chat widget works
- [ ] Search autocomplete works
- [ ] Save location works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Build completes successfully

## Version Info

- **React**: 18.x
- **Vite**: 8.x
- **Framer Motion**: Latest
- **Tailwind CSS**: Latest
- **Axios**: Latest
- **Python**: 3.8+
- **Flask**: Latest
- **LangGraph**: Latest
- **Ollama**: Latest

## Support

For issues or questions:
1. Check the documentation files in the project
2. Review the code comments
3. Check browser console for errors
4. Check backend logs for API errors
5. Verify all dependencies are installed
