import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Trash2, Plus, ChevronRight } from 'lucide-react';

export default function Sidebar({ onLocationSelect, currentLocation, isDark }) {
  const [savedLocations, setSavedLocations] = useState([]);

  // Load saved locations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedLocations(parsed);
      } catch (e) {
        console.error('Error parsing saved locations:', e);
        setSavedLocations([]);
      }
    }
  }, []);

  // Save locations to localStorage
  const saveLocation = (location) => {
    const exists = savedLocations.some(
      loc => loc.latitude === location.latitude && loc.longitude === location.longitude
    );
    if (!exists) {
      const updated = [...savedLocations, location];
      setSavedLocations(updated);
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
  };

  // Remove location
  const removeLocation = (idx) => {
    const updated = savedLocations.filter((_, i) => i !== idx);
    setSavedLocations(updated);
    localStorage.setItem('savedLocations', JSON.stringify(updated));
  };

  // Add current location to saved
  const handleAddCurrent = () => {
    if (currentLocation) {
      saveLocation(currentLocation);
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-80 rounded-3xl backdrop-blur-xl border p-6 h-full flex flex-col ${
        isDark
          ? 'bg-black/30 border-white/10'
          : 'bg-white/10 border-white/20'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Saved Locations</h2>

      {/* Add Current Location Button */}
      {currentLocation && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddCurrent}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-4 transition-all ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 border border-white/20'
              : 'bg-white/20 hover:bg-white/30 border border-white/30'
          }`}
        >
          <Plus size={20} className="text-white" />
          <span className="text-white font-medium">Add Current Location</span>
        </motion.button>
      )}

      {/* Saved Locations List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence>
          {savedLocations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-white/40"
            >
              <MapPin size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">No saved locations yet</p>
            </motion.div>
          ) : (
            savedLocations.map((location, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
                onClick={() => onLocationSelect(location)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {location.name}
                    </div>
                    <div className="text-xs text-white/50 truncate">
                      {location.admin1 && `${location.admin1}, `}{location.country}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 ml-2" />
                </div>

                {/* Delete Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLocation(idx);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-white/20'} text-xs text-white/40 text-center`}>
        <p>Click a location to view weather</p>
      </div>
    </motion.div>
  );
}
