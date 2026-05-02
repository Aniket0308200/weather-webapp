import { motion } from 'framer-motion';

export default function CurrentWeatherDisplay({ weather, theme }) {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-organic-lg p-8 md:p-12"
      style={{
        boxShadow: `0 20px 60px ${theme.neon}`,
      }}
    >
      {/* Header with Location */}
      <div className="flex items-start justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-2">{weather.city}</h2>
          <p className="text-lg text-white/60">{weather.country}</p>
        </motion.div>

        {/* Weather Icon */}
        {weather.icon && (
          <motion.img
            src={weather.icon}
            alt={weather.condition}
            className="w-32 h-32 md:w-40 md:h-40 icon-bounce"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </div>

      {/* Main Temperature Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-8xl md:text-9xl font-bold text-white">{weather.temp}</span>
          <span className="text-5xl text-white/70">°C</span>
        </div>
        <p className="text-xl text-white/60">Feels like {weather.feelsLike}°C</p>
      </motion.div>

      {/* Weather Condition - Prominent Position */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 p-6 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
          border: `2px solid ${theme.primary}40`,
        }}
      >
        <p className="text-center text-3xl md:text-4xl font-semibold text-white">
          {weather.condition}
        </p>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center"
      >
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-sm text-white/60 mb-1">Humidity</p>
          <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-sm text-white/60 mb-1">Wind</p>
          <p className="text-2xl font-bold text-white">{Math.round(weather.windSpeed)} km/h</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-sm text-white/60 mb-1">Visibility</p>
          <p className="text-2xl font-bold text-white">{weather.visibility} km</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
