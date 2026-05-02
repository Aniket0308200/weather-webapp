import { motion } from 'framer-motion';
import { Sun, Moon, Clock } from 'lucide-react';

export default function SunMoonInfo({ weather, theme }) {
  if (!weather) return null;

  const parseTime = (timeStr) => {
    if (!timeStr) return 'N/A';
    
    // Check if it's already in HH:MM format
    if (typeof timeStr === 'string' && timeStr.includes(':') && timeStr.length === 5) {
      // Convert 24-hour format to 12-hour format
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    }
    
    // Try to parse as date string
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) {
        return timeStr || 'N/A';
      }
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return timeStr || 'N/A';
    }
  };

  const sunriseTime = parseTime(weather.sunrise);
  const sunsetTime = parseTime(weather.sunset);
  const moonriseTime = parseTime(weather.moonrise);
  const moonsetTime = parseTime(weather.moonset);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-3xl p-6"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🌅</span> Sun & Moon
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 }}
          className="glass-card rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Sun size={20} className="text-yellow-300" />
            </div>
            <p className="text-sm font-semibold text-white/70">Sunrise</p>
          </div>
          <p className="text-lg font-bold text-white">{sunriseTime}</p>
        </motion.div>

        {/* Sunset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Sun size={20} className="text-orange-300" />
            </div>
            <p className="text-sm font-semibold text-white/70">Sunset</p>
          </div>
          <p className="text-lg font-bold text-white">{sunsetTime}</p>
        </motion.div>

        {/* Moonrise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
          className="glass-card rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Moon size={20} className="text-blue-300" />
            </div>
            <p className="text-sm font-semibold text-white/70">Moonrise</p>
          </div>
          <p className="text-lg font-bold text-white">{moonriseTime}</p>
        </motion.div>

        {/* Moonset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-indigo-500/20">
              <Moon size={20} className="text-indigo-300" />
            </div>
            <p className="text-sm font-semibold text-white/70">Moonset</p>
          </div>
          <p className="text-lg font-bold text-white">{moonsetTime}</p>
        </motion.div>
      </div>

      {/* Day Length Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock size={18} className="text-white/60" />
          <p className="text-sm font-semibold text-white/70">Daylight Duration</p>
        </div>
        <p className="text-sm text-white/60">
          Sunrise to Sunset: {sunriseTime} - {sunsetTime}
        </p>
      </motion.div>
    </motion.div>
  );
}
