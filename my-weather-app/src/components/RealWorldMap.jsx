import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RealWorldMap({ weather, theme, isDark }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !weather) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        tileSize: 256,
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Remove old marker if exists
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    // Get coordinates from weather data
    // Note: WeatherAPI doesn't provide lat/lon directly, so we'll use approximate coordinates
    // In production, you'd want to use a geocoding API or store coordinates
    const getCoordinates = (city) => {
      const coordinates = {
        'Delhi': [28.7041, 77.1025],
        'Mumbai': [19.0760, 72.8777],
        'Bangalore': [12.9716, 77.5946],
        'Kolkata': [22.5726, 88.3639],
        'Chennai': [13.0827, 80.2707],
        'Hyderabad': [17.3850, 78.4867],
        'Pune': [18.5204, 73.8567],
        'Ahmedabad': [23.0225, 72.5714],
        'Jaipur': [26.9124, 75.7873],
        'Lucknow': [26.8467, 80.9462],
        'New York': [40.7128, -74.0060],
        'London': [51.5074, -0.1278],
        'Paris': [48.8566, 2.3522],
        'Tokyo': [35.6762, 139.6503],
        'Sydney': [-33.8688, 151.2093],
        'Dubai': [25.2048, 55.2708],
        'Singapore': [1.3521, 103.8198],
        'Bangkok': [13.7563, 100.5018],
        'Hong Kong': [22.3193, 114.1694],
        'Los Angeles': [34.0522, -118.2437],
      };
      return coordinates[city] || [20, 0];
    };

    const [lat, lon] = getCoordinates(weather.city);

    // Add new marker
    markerRef.current = L.marker([lat, lon], {
      title: weather.city,
    })
      .bindPopup(
        `<div style="font-family: Arial; color: #333;">
          <strong>${weather.city}, ${weather.country}</strong><br/>
          Temperature: ${weather.temp}°C<br/>
          Condition: ${weather.condition}<br/>
          Humidity: ${weather.humidity}%
        </div>`
      )
      .addTo(map);

    // Open popup
    markerRef.current.openPopup();

    // Center map on location
    map.setView([lat, lon], 10);

    // Cleanup function
    return () => {
      // Keep map instance for reuse
    };
  }, [weather]);

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-3xl p-8 h-96 flex items-center justify-center"
      >
        <p className="text-white/60">Loading map...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-3xl p-6 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <MapPin size={24} style={{ color: theme.primary }} />
        <h3 className="text-2xl font-bold text-white">World Map</h3>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative w-full rounded-2xl overflow-hidden border border-white/10"
        style={{ height: '400px', zIndex: 1 }}
      />

      {/* Location Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 mt-6"
      >
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Location</p>
          <p className="text-sm font-bold text-white">{weather.city}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Temperature</p>
          <p className="text-lg font-bold text-white">{weather.temp}°C</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Condition</p>
          <p className="text-sm font-bold text-white">{weather.condition}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
