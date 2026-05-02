import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow, Droplets } from 'lucide-react';
import { formatDate } from '../utils/weatherTheme';

export default function SevenDayForecast({ dailyData, theme }) {
  if (!dailyData || dailyData.length === 0) return null;

  const getWeatherIcon = (code) => {
    if (code === 1000) return <Sun size={28} style={{ color: '#fbbf24' }} />;
    if (code >= 1063 && code <= 1195) return <CloudRain size={28} style={{ color: '#3b82f6' }} />;
    if (code >= 1204 && code <= 1252) return <CloudSnow size={28} style={{ color: '#06b6d4' }} />;
    return <Cloud size={28} style={{ color: '#9ca3af' }} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6"
      style={{
        boxShadow: `0 8px 32px ${theme.neon}`,
      }}
    >
      <h3 className="text-lg font-semibold mb-6 text-white">
        7-Day Forecast
      </h3>

      <div className="space-y-3">
        {dailyData.slice(0, 7).map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20">
                <p className="text-sm font-semibold" style={{ color: theme.secondary }}>
                  {formatDate(day.date)}
                </p>
              </div>
              <div className="flex justify-center w-12">
                {getWeatherIcon(day.code)}
              </div>
            </div>

            <div className="flex items-center gap-6 flex-1 justify-end">
              <div className="text-right">
                <p className="text-xs opacity-70">Temperature</p>
                <p className="text-lg font-bold text-white">
                  {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                </p>
              </div>

              {day.precipitation > 0 && (
                <div className="flex items-center gap-1 text-blue-400">
                  <Droplets size={16} />
                  <span className="text-sm">{day.precipitation}mm</span>
                </div>
              )}

              <div className="text-right">
                <p className="text-xs opacity-70">UV</p>
                <p className="text-lg font-bold text-yellow-400">
                  {day.uvIndex?.toFixed(1) || 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
