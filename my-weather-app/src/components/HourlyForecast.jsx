import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';
import { formatTime } from '../utils/weatherEngine';

export default function HourlyForecast({ data, theme, isDark }) {
  if (!data || !data.hourly) return null;

  const { hourly, current_time } = data;
  const currentIndex = hourly.time.findIndex(t => new Date(t) > new Date(current_time));
  const nextHours = hourly.time.slice(currentIndex, currentIndex + 24);

  const getWeatherIcon = (code) => {
    if (code === 0 || code === 1) return <Sun size={24} className="text-yellow-300" />;
    if (code >= 51 && code <= 82) return <CloudRain size={24} className="text-blue-300" />;
    if (code >= 71 && code <= 86) return <CloudSnow size={24} className="text-cyan-300" />;
    return <Cloud size={24} className="text-slate-300" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-3xl backdrop-blur-xl border p-6 ${theme.card}`}
    >
      <h2 className={`text-xl font-bold ${theme.primary} mb-6`}>24-Hour Forecast</h2>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {nextHours.map((time, idx) => {
            const temp = Math.round(hourly.temperature_2m[currentIndex + idx]);
            const code = hourly.weather_code[currentIndex + idx];
            const precipitation = hourly.precipitation_probability[currentIndex + idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl flex-shrink-0 w-20 ${
                  isDark ? 'bg-white/5' : 'bg-white/10'
                } border border-white/10 hover:border-white/30 transition-all`}
              >
                <span className={`text-xs font-semibold ${theme.secondary}`}>
                  {formatTime(time)}
                </span>
                <div className="flex justify-center">
                  {getWeatherIcon(code)}
                </div>
                <span className={`text-sm font-bold ${theme.primary}`}>
                  {temp}°
                </span>
                {precipitation > 0 && (
                  <span className="text-xs text-blue-300">
                    {precipitation}%
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
