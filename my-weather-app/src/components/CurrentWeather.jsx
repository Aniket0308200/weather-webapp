import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWindDirection } from '../utils/weatherEngine';

export default function CurrentWeather({ data, theme, isDark }) {
  if (!data) return null;

  const { current } = data;
  const weatherCode = current.weather_code;
  const temp = Math.round(current.temperature_2m);
  const feelsLike = Math.round(current.apparent_temperature);
  const humidity = current.relative_humidity_2m;
  const windSpeed = Math.round(current.wind_speed_10m);
  const windDirection = getWindDirection(current.wind_direction_10m);
  const visibility = (current.visibility / 1000).toFixed(1);
  const pressure = Math.round(current.pressure_msl);
  const uvIndex = Math.round(current.uv_index * 10) / 10;

  const metrics = [
    { icon: Droplets, label: 'Humidity', value: `${humidity}%`, color: 'text-blue-400' },
    { icon: Eye, label: 'Visibility', value: `${visibility} km`, color: 'text-cyan-400' },
    { icon: Gauge, label: 'Pressure', value: `${pressure} mb`, color: 'text-purple-400' },
    { icon: Zap, label: 'UV Index', value: uvIndex, color: 'text-yellow-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl backdrop-blur-xl border p-8 ${theme.card}`}
    >
      {/* Main Temperature Display */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-7xl font-bold ${theme.primary}`}
          >
            {temp}°
          </motion.div>
          <div className={`text-lg ${theme.secondary} mt-2`}>
            Feels like {feelsLike}°
          </div>
        </div>

        {/* Weather Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`${theme.primary} opacity-80`}
        >
          {weatherCode === 0 || weatherCode === 1 ? (
            <Sun size={80} />
          ) : weatherCode >= 51 && weatherCode <= 82 ? (
            <CloudRain size={80} />
          ) : (
            <Cloud size={80} />
          )}
        </motion.div>
      </div>

      {/* Weather Description */}
      <div className={`text-xl font-semibold ${theme.secondary} mb-8`}>
        {data.weatherDescription || 'Clear Sky'}
      </div>

      {/* Wind Information */}
      <div className={`flex items-center gap-4 mb-8 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white/10'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        >
          <Wind size={32} className={theme.primary} />
        </motion.div>
        <div>
          <div className={`text-sm ${theme.secondary}`}>Wind</div>
          <div className={`text-2xl font-bold ${theme.primary}`}>
            {windSpeed} km/h {windDirection}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white/10'} border border-white/10`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className={metric.color} />
                <span className={`text-xs ${theme.secondary}`}>{metric.label}</span>
              </div>
              <div className={`text-lg font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
