import { useRef, useEffect, useState, useCallback } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';
import { geocodeLocation } from '../utils/weatherEngine';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar({ onLocationSelect, isDark }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await geocodeLocation(query);
      // Prioritize Indian cities
      const sorted = data.sort((a, b) => {
        const aIsIndia = a.country === 'India' ? 0 : 1;
        const bIsIndia = b.country === 'India' ? 0 : 1;
        return aIsIndia - bIsIndia;
      });
      setResults(sorted);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  const handleSelect = (location) => {
    onLocationSelect({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      admin1: location.admin1,
    });
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border transition-all ${
        isDark 
          ? 'bg-black/30 border-white/10 text-white' 
          : 'bg-white/10 border-white/20 text-white'
      }`}>
        <Search size={20} className="text-white/60" />
        <input
          type="text"
          placeholder="Search cities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          className="flex-1 bg-transparent outline-none placeholder-white/40 text-white"
        />
        {loading && <Loader size={20} className="animate-spin text-white/60" />}
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-2 w-full rounded-xl backdrop-blur-xl border z-50 max-h-64 overflow-y-auto ${
              isDark
                ? 'bg-black/40 border-white/10'
                : 'bg-white/10 border-white/20'
            }`}
          >
            {results.map((location, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleSelect(location)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 ${
                  isDark ? 'text-white/80 hover:text-white' : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
              >
                <MapPin size={16} className="text-white/40 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{location.name}</div>
                  <div className="text-xs text-white/40 truncate">
                    {location.admin1 && `${location.admin1}, `}{location.country}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
