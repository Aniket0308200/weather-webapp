import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Generate random values outside component to avoid re-renders
const generateParticles = () => {
  return [...Array(20)].map(() => ({
    x: Math.random() * window.innerWidth,
    duration: 8 + Math.random() * 4,
    delay: Math.random() * 2,
  }));
};

const generateRaindrops = () => {
  return [...Array(30)].map(() => ({
    x: Math.random() * window.innerWidth,
    duration: 2 + Math.random() * 1,
    delay: Math.random() * 0.5,
  }));
};

const generateLightningFlashes = () => {
  return [...Array(3)].map(() => ({
    delay: Math.random() * 3,
  }));
};

const generateFrostCircles = () => {
  return [...Array(15)].map(() => ({
    width: Math.random() * 200 + 50,
    height: Math.random() * 200 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 4 + Math.random() * 2,
  }));
};

export default function ThemeBackground({ theme, isDark }) {
  const gradientClass = isDark ? 'from-slate-950 via-slate-900 to-slate-950' : theme.gradient;

  // Generate random values once per component mount
  const particles = useMemo(() => generateParticles(), []);
  const raindrops = useMemo(() => generateRaindrops(), []);
  const lightningFlashes = useMemo(() => generateLightningFlashes(), []);
  const frostCircles = useMemo(() => generateFrostCircles(), []);

  return (
    <>
      {/* Main gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-0 bg-gradient-to-br ${gradientClass} -z-10`}
      />

      {/* Animated particles for autumn/spring theme */}
      {theme.animation === 'particles' && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{
                x: particle.x,
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              className="absolute w-2 h-2 rounded-full bg-white/20"
            />
          ))}
        </div>
      )}

      {/* Raindrop animation for monsoon */}
      {theme.animation === 'raindrop' && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {raindrops.map((drop, i) => (
            <motion.div
              key={i}
              initial={{
                x: drop.x,
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                delay: drop.delay,
              }}
              className="absolute w-1 h-4 rounded-full bg-cyan-300/40"
            />
          ))}
        </div>
      )}

      {/* Lightning flash for storm */}
      {theme.animation === 'lightning' && (
        <div className="fixed inset-0 -z-10">
          {lightningFlashes.map((flash, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 0, 0.3, 0, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: flash.delay,
              }}
              className="absolute inset-0 bg-white/10"
            />
          ))}
        </div>
      )}

      {/* Shimmer effect for summer */}
      {theme.animation === 'shimmer' && (
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
      )}

      {/* Frost effect for winter */}
      {theme.animation === 'frost' && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {frostCircles.map((circle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
              }}
              className="absolute rounded-full border border-cyan-300/30"
              style={{
                width: circle.width + 'px',
                height: circle.height + 'px',
                left: circle.left + '%',
                top: circle.top + '%',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
