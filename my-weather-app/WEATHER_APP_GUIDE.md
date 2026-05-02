# Ultra-Premium React Weather OS Dashboard

A high-end, responsive weather web application built with React (Vite), Tailwind CSS, and Framer Motion. Features a premium smartwatch/futuristic OS dashboard design with dynamic theme engine.

## 🎨 Features

### Advanced Theme Engine
- **Clear/Summer**: Gold/Blue gradients with shimmer effects
- **Rain/Monsoon**: Deep Teal/Slate with raindrop animations
- **Winter/Pre-Winter**: Cyan/White with frost border effects
- **Storm/Tufan**: Charcoal/Purple with lightning flash effects
- **Autumn/Spring**: Orange/Soft Pink with floating particle effects

### UI Components
- **Glassmorphic Cards**: Backdrop blur with neon borders
- **Sidebar**: Saved locations with LocalStorage persistence
- **Sun & Moon Tracker**: Semi-circle arc showing celestial positions
- **Metrics Grid**: UV Index, Humidity, Visibility, Wind, Air Pressure
- **24-Hour Forecast**: Hourly weather predictions
- **7-Day Forecast**: Daily weather with precipitation and UV data
- **Global Search**: Geocoding with Indian city prioritization

### Design Features
- Hidden scrollbars (CSS-based)
- Smooth theme transitions with Framer Motion
- Dark/Light mode toggle
- Responsive layout (mobile to desktop)
- Premium animations and micro-interactions

## 📦 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main container component
│   ├── SearchBar.jsx          # Global location search
│   ├── CurrentWeather.jsx     # Current conditions display
│   ├── HourlyForecast.jsx     # 24-hour forecast
│   ├── DailyForecast.jsx      # 7-day forecast
│   ├── SunMoonTracker.jsx     # Celestial position tracker
│   ├── Sidebar.jsx            # Saved locations sidebar
│   └── ThemeBackground.jsx    # Animated theme backgrounds
├── utils/
│   ├── weatherEngine.js       # API calls & weather logic
│   └── themeController.js     # Theme configuration
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Global styles & animations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 🔌 API Integration

### Open-Meteo API
The app uses the free [Open-Meteo API](https://open-meteo.com/) for:
- Current weather conditions
- 24-hour hourly forecast
- 7-day daily forecast
- Sunrise/sunset times
- Moonrise/moonset times
- Moon phase data

### Geocoding API
Uses Open-Meteo Geocoding API for:
- Location search with autocomplete
- Reverse geocoding
- Indian city prioritization

**No API key required!** Both APIs are free and public.

## 🎯 Key Components

### Dashboard.jsx
Main orchestrator component that:
- Manages location state
- Handles weather data fetching
- Controls theme switching
- Coordinates all sub-components

### SearchBar.jsx
Features:
- Debounced search (300ms)
- Indian city prioritization
- Dropdown results with animations
- Click-outside detection

### CurrentWeather.jsx
Displays:
- Current temperature (large)
- Feels-like temperature
- Weather icon with animation
- Wind information with rotating compass
- 4-metric grid (Humidity, Visibility, Pressure, UV Index)

### HourlyForecast.jsx
Shows:
- Next 24 hours of weather
- Temperature for each hour
- Weather icons
- Precipitation probability
- Horizontal scrolling (hidden scrollbar)

### DailyForecast.jsx
Displays:
- 7-day forecast
- Max/min temperatures
- Weather conditions
- Precipitation amount
- UV index

### SunMoonTracker.jsx
Features:
- Semi-circle arc for sun position
- Semi-circle arc for moon position
- Sunrise/sunset times
- Moonrise/moonset times
- Moon phase name

### Sidebar.jsx
Functionality:
- Save current location
- View saved locations
- Delete saved locations
- LocalStorage persistence
- Click to switch locations

### ThemeBackground.jsx
Animated backgrounds:
- Shimmer (Summer)
- Raindrop (Monsoon)
- Frost circles (Winter)
- Lightning flashes (Storm)
- Floating particles (Autumn)

## 🎨 Theme System

### Theme Configuration
Each theme includes:
- Gradient colors (light & dark)
- Primary/secondary/accent text colors
- Card background opacity
- Border colors
- Glow/shadow colors
- Animation type

### Dark Mode
- Manual toggle button (Sun/Moon icon)
- Overlays current weather theme
- Darkens gradients and backgrounds
- Adjusts opacity values

### Weather Code Mapping
Weather codes (0-99) from Open-Meteo are mapped to themes:
- 0-3: Clear/Partly Cloudy → Summer
- 45-48: Fog → Winter
- 51-67: Drizzle/Rain → Monsoon
- 71-86: Snow → Winter
- 95-99: Thunderstorm → Storm

## 💾 LocalStorage

### Saved Locations
```javascript
// Format stored in localStorage
{
  name: "Delhi",
  country: "India",
  latitude: 28.7041,
  longitude: 77.1025,
  admin1: "Delhi"
}
```

Key: `savedLocations` (JSON array)

## 🎬 Animations

### Framer Motion
- Page transitions (fade + slide)
- Component entrance animations
- Hover effects on interactive elements
- Loading spinner rotation
- Weather icon floating animation

### CSS Animations
- Shimmer effect (Summer)
- Raindrop falling (Monsoon)
- Frost pulsing (Winter)
- Lightning flashing (Storm)
- Particle floating (Autumn)

## 📱 Responsive Design

- **Mobile**: Single column layout, sidebar below
- **Tablet**: Sidebar on left, content on right
- **Desktop**: Full layout with optimal spacing

Breakpoint: `lg` (1024px)

## 🔧 Customization

### Change Default Location
Edit `Dashboard.jsx`:
```javascript
const defaultLocation = {
  name: 'Your City',
  country: 'Your Country',
  latitude: 0.0,
  longitude: 0.0,
  admin1: 'State/Province',
};
```

### Modify Theme Colors
Edit `themeController.js`:
```javascript
export const themeConfigs = {
  summer: {
    gradient: 'from-yellow-400 via-blue-400 to-cyan-300',
    // ... other properties
  },
};
```

### Adjust Animation Speed
Edit component files or `index.css`:
```javascript
animate={{ rotate: 360 }}
transition={{ duration: 20 }} // Change duration
```

## 🐛 Troubleshooting

### Weather data not loading
- Check internet connection
- Verify Open-Meteo API is accessible
- Check browser console for errors

### Animations not smooth
- Ensure hardware acceleration is enabled
- Check browser performance settings
- Reduce animation complexity on low-end devices

### Scrollbar visible
- Verify `index.css` is imported
- Check browser DevTools for CSS conflicts
- Clear browser cache

## 📊 Performance

- **Bundle Size**: ~384KB (gzipped: ~123KB)
- **CSS Size**: ~22KB (gzipped: ~6KB)
- **API Calls**: Minimal (only on location change)
- **Animations**: GPU-accelerated with Framer Motion

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Dependencies

- **react**: ^19.2.5
- **react-dom**: ^19.2.5
- **vite**: ^8.0.10
- **tailwindcss**: ^4.2.4
- **framer-motion**: ^12.38.0
- **lucide-react**: ^1.14.0 (Icons)
- **axios**: ^1.15.2 (HTTP client)

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component documentation
3. Check browser console for errors
4. Verify API connectivity

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
