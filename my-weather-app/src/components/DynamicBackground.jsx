import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DynamicBackground({ weatherCode, isDark }) {
  const [raindrops, setRaindrops] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(34, 197, 94) 50%, rgb(59, 130, 246) 100%)');

  // Determine background color and effects based on weather code
  useEffect(() => {
    let bgColor = 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(34, 197, 94) 50%, rgb(59, 130, 246) 100%)';
    
    // Clear weather (sunny)
    if (weatherCode === 1000) {
      bgColor = 'linear-gradient(135deg, rgb(255, 193, 7) 0%, rgb(255, 152, 0) 50%, rgb(255, 87, 34) 100%)';
    }
    // Partly cloudy
    else if (weatherCode === 1003 || weatherCode === 1006) {
      bgColor = 'linear-gradient(135deg, rgb(189, 189, 189) 0%, rgb(158, 158, 158) 50%, rgb(117, 117, 117) 100%)';
    }
    // Overcast
    else if (weatherCode === 1009) {
      bgColor = 'linear-gradient(135deg, rgb(144, 144, 144) 0%, rgb(97, 97, 97) 50%, rgb(66, 66, 66) 100%)';
    }
    // Mist/Fog
    else if (weatherCode === 1030 || weatherCode === 1135) {
      bgColor = 'linear-gradient(135deg, rgb(176, 176, 176) 0%, rgb(128, 128, 128) 50%, rgb(105, 105, 105) 100%)';
    }
    // Rainy
    else if (weatherCode >= 1063 && weatherCode <= 1195) {
      bgColor = 'linear-gradient(135deg, rgb(55, 65, 81) 0%, rgb(31, 41, 55) 50%, rgb(15, 23, 42) 100%)';
    }
    // Snowy
    else if (weatherCode >= 1204 && weatherCode <= 1252) {
      bgColor = 'linear-gradient(135deg, rgb(226, 232, 240) 0%, rgb(203, 213, 225) 50%, rgb(148, 163, 184) 100%)';
    }
    // Stormy
    else if (weatherCode >= 1273 && weatherCode <= 1282) {
      bgColor = 'linear-gradient(135deg, rgb(30, 27, 34) 0%, rgb(55, 48, 163) 50%, rgb(63, 81, 181) 100%)';
    }

    setBackgroundColor(bgColor);
  }, [weatherCode]);

  // Generate raindrops for rainy weather
  useEffect(() => {
    if (weatherCode >= 1063 && weatherCode <= 1195) {
      const drops = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.3 + Math.random() * 0.3,
      }));
      setRaindrops(drops);
    } else {
      setRaindrops([]);
    }
  }, [weatherCode]);

  // Generate snowflakes for snowy weather
  useEffect(() => {
    if (weatherCode >= 1204 && weatherCode <= 1252) {
      const flakes = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 2 + Math.random() * 4,
      }));
      setSnowflakes(flakes);
    } else {
      setSnowflakes([]);
    }
  }, [weatherCode]);

  // Generate falling leaves for autumn
  useEffect(() => {
    if (weatherCode === 1003 || weatherCode === 1006) {
      const leafArray = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      }));
      setLeaves(leafArray);
    } else {
      setLeaves([]);
    }
  }, [weatherCode]);

  return (
    <>
      {/* Dynamic Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: backgroundColor,
          transition: 'background 1s ease-in-out',
          zIndex: 0,
        }}
      />

      {/* Raindrop Effect - Heavy Rain */}
      {raindrops.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {raindrops.map((drop) => (
            <motion.div
              key={drop.id}
              className="raindrop"
              style={{
                left: `${drop.left}%`,
              }}
              animate={{
                y: ['-10vh', '100vh'],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                delay: drop.delay,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Snowflake Effect - Winter Snow */}
      {snowflakes.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {snowflakes.map((flake) => (
            <motion.div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
              }}
              animate={{
                y: ['-10vh', '100vh'],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: flake.duration,
                repeat: Infinity,
                delay: flake.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Falling Leaves Effect - Autumn */}
      {leaves.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {leaves.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="leaf"
              style={{
                left: `${leaf.left}%`,
              }}
              animate={{
                y: ['-10vh', '100vh'],
                rotate: [0, 360],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Sun Flare Effect - Clear/Sunny */}
      {weatherCode === 1000 && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="sun-flare" />
        </div>
      )}

      {/* Heat Shimmer - Hot/Sunny */}
      {weatherCode === 1000 && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="heat-shimmer" />
        </div>
      )}

      {/* Cloud Float Effect - Cloudy */}
      {(weatherCode === 1003 || weatherCode === 1006 || weatherCode === 1009) && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          <motion.div
            className="cloud-bg text-white/20"
            style={{ fontSize: '200px' }}
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.div>
        </div>
      )}

      {/* Lightning Flash Effect - Stormy */}
      {weatherCode >= 1273 && weatherCode <= 1282 && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1, background: 'rgba(255, 255, 255, 0)' }}
          animate={{
            background: [
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0)',
            ],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 2,
          }}
        />
      )}
    </>
  );
}
