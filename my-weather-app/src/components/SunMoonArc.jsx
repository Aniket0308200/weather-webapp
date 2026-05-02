import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { calculateSunPosition, calculateMoonPosition, formatTime } from '../utils/weatherTheme';

export default function SunMoonArc({ weather, theme, isDark }) {
  if (!weather) return null;

  const sunPos = calculateSunPosition(new Date().toISOString(), weather.sunrise, weather.sunset);
  const moonPos = calculateMoonPosition(new Date().toISOString(), weather.moonrise, weather.moonset);

  // Calculate arc positions (SVG path)
  const sunX = Math.cos(Math.PI + sunPos * Math.PI) * 120;
  const sunY = Math.sin(Math.PI + sunPos * Math.PI) * 120;

  const moonX = Math.cos(Math.PI + moonPos * Math.PI) * 120;
  const moonY = Math.sin(Math.PI + moonPos * Math.PI) * 120;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sun Arc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8"
        style={{
          boxShadow: `0 8px 32px ${theme.neon}`,
        }}
      >
        <h3 className="text-lg font-semibold mb-6 text-white">
          Sun Position
        </h3>

        <div className="relative w-full aspect-square max-w-xs mx-auto mb-6">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Arc background */}
            <defs>
              <linearGradient id="sunArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={theme.secondary} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Arc path */}
            <path
              d="M 30 150 A 120 120 0 0 1 270 150"
              fill="none"
              stroke="url(#sunArcGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />

            {/* Sun position indicator */}
            <motion.circle
              cx={150 + sunX}
              cy={150 + sunY}
              r="12"
              fill={theme.primary}
              animate={{
                cx: 150 + sunX,
                cy: 150 + sunY,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
              opacity="0.8"
            />

            {/* Glow effect */}
            <motion.circle
              cx={150 + sunX}
              cy={150 + sunY}
              r="20"
              fill="none"
              stroke={theme.primary}
              strokeWidth="1"
              animate={{
                cx: 150 + sunX,
                cy: 150 + sunY,
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-white/70">
            <span>Sunrise</span>
            <span>Sunset</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-white/70">Sunrise</span>
            <span className="text-white font-semibold">
              {formatTime(weather.sunrise)}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-white/70">Sunset</span>
            <span className="text-white font-semibold">
              {formatTime(weather.sunset)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Moon Arc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8"
        style={{
          boxShadow: `0 8px 32px ${theme.neon}`,
        }}
      >
        <h3 className="text-lg font-semibold mb-6 text-white">
          Moon Position
        </h3>

        <div className="relative w-full aspect-square max-w-xs mx-auto mb-6">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Arc background */}
            <defs>
              <linearGradient id="moonArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={theme.secondary} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Arc path */}
            <path
              d="M 30 150 A 120 120 0 0 1 270 150"
              fill="none"
              stroke="url(#moonArcGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />

            {/* Moon position indicator */}
            <motion.circle
              cx={150 + moonX}
              cy={150 + moonY}
              r="12"
              fill={theme.accent}
              animate={{
                cx: 150 + moonX,
                cy: 150 + moonY,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
              opacity="0.8"
            />

            {/* Glow effect */}
            <motion.circle
              cx={150 + moonX}
              cy={150 + moonY}
              r="20"
              fill="none"
              stroke={theme.accent}
              strokeWidth="1"
              animate={{
                cx: 150 + moonX,
                cy: 150 + moonY,
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>

          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-white/70">
            <span>Moonrise</span>
            <span>Moonset</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-white/70">Moonrise</span>
            <span className="text-white font-semibold">
              {weather.moonrise ? formatTime(weather.moonrise) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-white/70">Moonset</span>
            <span className="text-white font-semibold">
              {weather.moonset ? formatTime(weather.moonset) : 'N/A'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
