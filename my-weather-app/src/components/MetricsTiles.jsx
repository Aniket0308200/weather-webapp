import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge, Zap, Compass } from 'lucide-react';
import { getWindDirection } from '../utils/weatherTheme';

export default function MetricsTiles({ weather, theme }) {
  if (!weather) return null;

  const metrics = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      color: '#3b82f6',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(weather.windSpeed)} km/h`,
      color: theme.primary,
    },
    {
      icon: Compass,
      label: 'Wind Direction',
      value: getWindDirection(weather.windDirection),
      color: '#8b5cf6',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${weather.visibility} km`,
      color: '#ec4899',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.pressure} mb`,
      color: '#f59e0b',
    },
    {
      icon: Zap,
      label: 'UV Index',
      value: weather.uvIndex?.toFixed(1) || 'N/A',
      color: '#fbbf24',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all group"
            style={{
              boxShadow: `0 4px 16px ${theme.neon}`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2"
              >
                <Icon size={24} style={{ color: metric.color }} />
              </motion.div>
              <p className="text-xs opacity-70 mb-1">{metric.label}</p>
              <p className="text-lg font-bold text-white">
                {metric.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
