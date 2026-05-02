import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow, Droplets } from 'lucide-react';
import { formatDate } from '../utils/weatherEngine';

export default function DailyForecast({ data, theme, isDark }) {
  if (!data || !data.daily) return null;

  const { daily } = data;

  const getWeatherIcon = (code) => {
    if (code === 0 || code === 1) return <Sun size={28} className="text-yellow-300" />;
    if (code >= 51 && code <= 82) return <CloudRain size={28} className="text-blue-300" />;
    if (code >= 71 && code <= 86) return <CloudSnow size={28} className="text-cyan-300" />;
    return <Cloud size={28} className="text-slate-300" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-3xl backdrop-blur-xl border p-6 ${theme.card}`}
    >
      <h2 className={`text-xl font-bold ${theme.primary} mb-6`}>7-Day Forecast</h2>

      <div className="space-y-3">
        {daily.time.slice(0, 7).map((date, idx) => {
          const maxTemp = Math.round(daily.temperature_2m_max[idx]);
          const minTemp = Math.round(daily.temperature_2m_min[idx]);
          const code = daily.weather_code[idx];
          const precipitation = Math.round(daily.precipitation_sum[idx]);
          const uvIndex = Math.round(daily.uv_index_max[idx] * 10) / 10;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5 }}
              className={`flex items-center justify-between p-4 rounded-xl ${
                isDark ? 'bg-white/5' : 'bg-white/10'
              } border border-white/10 hover:border-white/30 transition-all`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-20">
                  <div className={`text-sm font-semibold ${theme.secondary}`}>
                    {formatDate(date)}
                  </div>
                </div>
                <div className="flex justify-center w-12">
                  {getWeatherIcon(code)}
                </div>
              </div>

              <div className="flex items-center gap-6 flex-1 justify-end">
                <div className="text-right">
                  <div className={`text-xs ${theme.secondary}`}>Temperature</div>
                  <div className={`text-lg font-bold ${theme.primary}`}>
                    {maxTemp}° / {minTemp}°
                  </div>
                </div>

                {precipitation > 0 && (
                  <div className="flex items-center gap-1 text-blue-300">
                    <Droplets size={16} />
                    <span className="text-sm">{precipitation}mm</span>
                  </div>
                )}

                <div className="text-right">
                  <div className={`text-xs ${theme.secondary}`}>UV</div>
                  <div className={`text-lg font-bold text-yellow-300`}>
                    {uvIndex}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
