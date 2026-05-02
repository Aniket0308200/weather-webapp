import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { calculateSunPosition, calculateMoonPosition, formatTime } from '../utils/weatherTheme';

export default function EnhancedSunMoonArc({ weather, theme }) {
  if (!weather) return null;

  const sunPos = calculateSunPosition(new Date().toISOString(), weather.sunrise, weather.sunset);
  const moonPos = calculateMoonPosition(new Date().toISOString(), weather.moonrise, weather.moonset);

  // Calculate arc positions with better math
  const sunX = Math.cos(Math.PI + sunPos * Math.PI) * 140;
  const sunY = Math.sin(Math.PI + sunPos * Math.PI) * 140;

  const moonX = Math.cos(Math.PI + moonPos * Math.PI) * 140;
  const moonY = Math.sin(Math.PI + moonPos * Math.PI) * 140;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sun Arc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-organic-lg p-8"
        style={{
          boxShadow: `0 20px 60px ${theme.neon}`,
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-8">☀️ Sun Position</h3>

        <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
          <svg viewBox="0 0 320 220" className="w-full h-full">
            <defs>
              <linearGradient id="sunArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
              <filter id="sunGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Arc path */}
            <path
              d="M 40 180 A 140 140 0 0 1 280 180"
              fill="none"
              stroke="url(#sunArcGradient)"
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.6"
            />

            {/* Sun position with glow */}
            <motion.circle
              cx={160 + sunX}
              cy={180 + sunY}
              r="16"
              fill="#fbbf24"
              filter="url(#sunGlow)"
              animate={{
                cx: 160 + sunX,
                cy: 180 + sunY,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Outer glow ring */}
            <motion.circle
              cx={160 + sunX}
              cy={180 + sunY}
              r="28"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              animate={{
                cx: 160 + sunX,
                cy: 180 + sunY,
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-sm text-white/70 font-semibold">
            <span>🌅 Sunrise</span>
            <span>🌇 Sunset</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className="text-white/70">Sunrise</span>
            <span className="text-white font-bold text-lg">{formatTime(weather.sunrise)}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className="text-white/70">Sunset</span>
            <span className="text-white font-bold text-lg">{formatTime(weather.sunset)}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Moon Arc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card rounded-organic-lg p-8"
        style={{
          boxShadow: `0 20px 60px ${theme.neon}`,
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-8">🌙 Moon Position</h3>

        <div className="relative w-full aspect-square max-w-xs mx-auto mb-8">
          <svg viewBox="0 0 320 220" className="w-full h-full">
            <defs>
              <linearGradient id="moonArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
              </linearGradient>
              <filter id="moonGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Arc path */}
            <path
              d="M 40 180 A 140 140 0 0 1 280 180"
              fill="none"
              stroke="url(#moonArcGradient)"
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.6"
            />

            {/* Moon position with glow */}
            <motion.circle
              cx={160 + moonX}
              cy={180 + moonY}
              r="14"
              fill="#e0f2fe"
              filter="url(#moonGlow)"
              animate={{
                cx: 160 + moonX,
                cy: 180 + moonY,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Outer glow ring */}
            <motion.circle
              cx={160 + moonX}
              cy={180 + moonY}
              r="24"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              animate={{
                cx: 160 + moonX,
                cy: 180 + moonY,
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>

          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-sm text-white/70 font-semibold">
            <span>🌙 Moonrise</span>
            <span>🌙 Moonset</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className="text-white/70">Moonrise</span>
            <span className="text-white font-bold text-lg">
              {weather.moonrise ? formatTime(weather.moonrise) : 'N/A'}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className="text-white/70">Moonset</span>
            <span className="text-white font-bold text-lg">
              {weather.moonset ? formatTime(weather.moonset) : 'N/A'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
