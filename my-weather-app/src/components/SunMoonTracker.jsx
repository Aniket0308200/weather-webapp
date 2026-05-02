import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { calculateSunPosition, calculateMoonPosition, formatTime } from '../utils/weatherEngine';

export default function SunMoonTracker({ data, theme }) {
  if (!data || !data.daily || !data.current_time) {
    return null;
  }

  const { daily, current_time } = data;
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];
  const moonrise = daily.moonrise[0];
  const moonset = daily.moonset[0];
  const moonPhase = daily.moon_phase[0];

  const sunPos = useMemo(
    () => calculateSunPosition(current_time, sunrise, sunset),
    [current_time, sunrise, sunset]
  );
  const moonPos = useMemo(
    () => calculateMoonPosition(current_time, moonrise, moonset),
    [current_time, moonrise, moonset]
  );

  // Calculate arc position (0 = left, 0.5 = top, 1 = right)
  const sunX = Math.cos(Math.PI + sunPos * Math.PI) * 100;
  const sunY = Math.sin(Math.PI + sunPos * Math.PI) * 100;

  const moonX = Math.cos(Math.PI + moonPos * Math.PI) * 100;
  const moonY = Math.sin(Math.PI + moonPos * Math.PI) * 100;

  const getMoonPhaseName = (phase) => {
    if (phase < 0.125) return 'New Moon';
    if (phase < 0.25) return 'Waxing Crescent';
    if (phase < 0.375) return 'First Quarter';
    if (phase < 0.5) return 'Waxing Gibbous';
    if (phase < 0.625) return 'Full Moon';
    if (phase < 0.75) return 'Waning Gibbous';
    if (phase < 0.875) return 'Last Quarter';
    return 'Waning Crescent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`rounded-3xl backdrop-blur-xl border p-8 ${theme.card}`}
    >
      <h2 className={`text-xl font-bold ${theme.primary} mb-8`}>Sun & Moon Tracker</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sun Tracker */}
        <div>
          <div className={`text-lg font-semibold ${theme.secondary} mb-4`}>Sun Position</div>
          <div className="relative w-full aspect-square max-w-xs mx-auto">
            {/* Arc background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(253, 224, 71, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#sunGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Sun position indicator */}
            <motion.div
              animate={{
                left: `calc(50% + ${sunX}px)`,
                top: `calc(50% + ${sunY}px)`,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sun size={32} className="text-yellow-300 drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-white/50">
              <span>Sunrise</span>
              <span>Sunset</span>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={theme.secondary}>Sunrise:</span>
              <span className={theme.primary}>{formatTime(sunrise)}</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.secondary}>Sunset:</span>
              <span className={theme.primary}>{formatTime(sunset)}</span>
            </div>
          </div>
        </div>

        {/* Moon Tracker */}
        <div>
          <div className={`text-lg font-semibold ${theme.secondary} mb-4`}>Moon Position</div>
          <div className="relative w-full aspect-square max-w-xs mx-auto">
            {/* Arc background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(165, 243, 252, 0.3)" />
                  <stop offset="100%" stopColor="rgba(100, 116, 139, 0.3)" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#moonGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Moon position indicator */}
            <motion.div
              animate={{
                left: `calc(50% + ${moonX}px)`,
                top: `calc(50% + ${moonY}px)`,
              }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
            >
              <Moon size={32} className="text-cyan-300 drop-shadow-lg" />
            </motion.div>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-white/50">
              <span>Moonrise</span>
              <span>Moonset</span>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={theme.secondary}>Moonrise:</span>
              <span className={theme.primary}>{moonrise ? formatTime(moonrise) : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.secondary}>Moonset:</span>
              <span className={theme.primary}>{moonset ? formatTime(moonset) : 'N/A'}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className={theme.secondary}>Phase:</span>
              <span className={theme.primary}>{getMoonPhaseName(moonPhase)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
