import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Map weather codes to background images
const getBackgroundImage = (weatherCode, isDay) => {
  // Clear/Sunny weather
  if (weatherCode === 1000) {
    return isDay ? 'url(/src/assets/cloud-for-sun.jpg)' : 'url(/src/assets/cloud-for-night.jpg)';
  }
  // Partly cloudy
  else if (weatherCode === 1003 || weatherCode === 1006) {
    return isDay ? 'url(/src/assets/basant-panchami-cloud.jpg)' : 'url(/src/assets/cloud-for-night.jpg)';
  }
  // Overcast
  else if (weatherCode === 1009) {
    return isDay ? 'url(/src/assets/dark-cloud.jpg)' : 'url(/src/assets/more-cloud-for-night.jpg)';
  }
  // Mist/Fog
  else if (weatherCode === 1030 || weatherCode === 1135) {
    return isDay ? 'url(/src/assets/more-cloud-for-night.jpg)' : 'url(/src/assets/more-cloud-for-night.jpg)';
  }
  // Rainy
  else if (weatherCode >= 1063 && weatherCode <= 1195) {
    return isDay ? 'url(/src/assets/rainy-cloud.jpg)' : 'url(/src/assets/more-cloud-for-night.jpg)';
  }
  // Snowy
  else if (weatherCode >= 1204 && weatherCode <= 1252) {
    return isDay ? 'url(/src/assets/snowflack-cloud.jpg)' : 'url(/src/assets/winter-cloud.jpg)';
  }
  // Stormy/Thunderstorm
  else if (weatherCode >= 1273 && weatherCode <= 1282) {
    return isDay ? 'url(/src/assets/cloud-thanderstroom.jpg)' : 'url(/src/assets/more-cloud-for-night.jpg)';
  }
  // Winter rain
  else if (weatherCode >= 1150 && weatherCode <= 1201) {
    return isDay ? 'url(/src/assets/winter-rainy-cloud.jpg)' : 'url(/src/assets/winter-cloud.jpg)';
  }
  // Default fallback
  return isDay ? 'url(/src/assets/cloud-for-sun.jpg)' : 'url(/src/assets/cloud-for-night.jpg)';
};

export default function DynamicBackground({ weatherCode, isDark, isDay }) {
  const [raindrops, setRaindrops] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('url(/src/assets/cloud-for-sun.jpg)');

  // Determine background image based on weather code and day/night
  useEffect(() => {
    const bgImage = getBackgroundImage(weatherCode, isDay);
    setBackgroundImage(bgImage);
  }, [weatherCode, isDay]);

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
      {/* Dynamic Background Image with Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transition: 'background-image 1s ease-in-out',
          zIndex: 0,
        }}
      >
        {/* Overlay only on the background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.25)',
            transition: 'background 0.3s ease-in-out',
          }}
        />
      </div>

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
