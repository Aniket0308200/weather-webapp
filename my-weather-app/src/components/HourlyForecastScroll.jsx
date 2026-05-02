import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

export default function HourlyForecastScroll({ hourlyData, theme }) {
  if (!hourlyData || hourlyData.length === 0) return null;

  const getWeatherIcon = (code) => {
    if (code === 1000) return <Sun size={24} style={{ color: '#fbbf24' }} />;
    if (code >= 1063 && code <= 1195) return <CloudRain size={24} style={{ color: '#3b82f6' }} />;
    if (code >= 1204 && code <= 1252) return <CloudSnow size={24} style={{ color: '#06b6d4' }} />;
    return <Cloud size={24} style={{ color: '#9ca3af' }} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6"
      style={{
        boxShadow: `0 8px 32px ${theme.neon}`,
      }}
    >
      <h3 className="text-lg font-semibold mb-6 text-white">
        24-Hour Forecast
      </h3>

      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {hourlyData.slice(0, 24).map((hour, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl flex-shrink-0 w-20 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <span className="text-xs font-semibold opacity-70">
                {new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex justify-center">
                {getWeatherIcon(hour.code)}
              </div>
              <span className="text-sm font-bold text-white">
                {Math.round(hour.temp)}°
              </span>
              {hour.precipitation > 0 && (
                <span className="text-xs text-blue-400">
                  {hour.precipitation}%
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
