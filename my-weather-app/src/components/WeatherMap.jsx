import { motion } from 'framer-motion';
import { MapPin, Loader } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function WeatherMap({ weather, theme, isDark }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !weather) return;

    // Create a simple map using OpenStreetMap tiles
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Create map canvas
    const canvas = document.createElement('canvas');
    canvas.width = mapContainer.clientWidth;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, isDark ? '#1a1a2e' : '#87ceeb');
    gradient.addColorStop(1, isDark ? '#16213e' : '#e0f6ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw location marker (center)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw ripple effect
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(${theme.primary === '#06b6d4' ? '6,182,212' : '59,130,246'},${0.3 - i * 0.1})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20 + i * 15, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw marker
    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.fill();

    // Draw marker border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Draw location label
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(weather.city, centerX, centerY - 40);

    // Draw coordinates
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(`Weather: ${weather.condition}`, centerX, centerY + 50);

    mapContainer.appendChild(canvas);
  }, [weather, isDark, theme]);

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-3xl p-8 h-96 flex items-center justify-center"
      >
        <Loader className="animate-spin" size={32} />
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
        <h3 className="text-2xl font-bold text-white">Location Map</h3>
      </div>

      {/* Map Canvas */}
      <div
        ref={mapRef}
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
      />

      {/* Map Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 mt-6"
      >
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Temperature</p>
          <p className="text-lg font-bold text-white">{weather.temp}°C</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Condition</p>
          <p className="text-sm font-bold text-white">{weather.condition}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-1">Humidity</p>
          <p className="text-lg font-bold text-white">{weather.humidity}%</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
