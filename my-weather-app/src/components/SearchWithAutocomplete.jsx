import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, MapPin, Loader, X } from 'lucide-react';
import axios from 'axios';

const WEATHER_API_KEY = 'f8e24dd296b7444cb27141718260105';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

export default function SearchWithAutocomplete({ onSearch, theme }) {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Fetch suggestions with smart filtering
  useEffect(() => {
    if (searchInput.length < 1) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Use proxy to avoid CORS issues on mobile
        const response = await axios.get(`/api/weather/current.json`, {
          params: {
            key: WEATHER_API_KEY,
            q: searchInput,
            aqi: 'no',
          },
        });

        const location = response.data.location;
        const result = {
          name: location.name,
          region: location.region,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
        };

        // Filter and limit to top 10 results
        setSuggestions([result]);
        setShowSuggestions(true);
      } catch (error) {
        // Try alternative search if exact match fails
        try {
          const altResponse = await axios.get(`/api/weather/current.json`, {
            params: {
              key: WEATHER_API_KEY,
              q: searchInput,
              aqi: 'no',
            },
          });
          setSuggestions([]);
        } catch {
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSelect = (suggestion) => {
    onSearch(suggestion.name);
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      ref={searchRef}
      className="relative w-full mb-5"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 rounded-organic-lg">
          <SearchIcon size={20} className="text-white/60 flex-shrink-0" />
          
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => searchInput.length > 0 && setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent outline-none placeholder-white/40 text-white text-sm sm:text-base md:text-lg min-w-0"
          />
          
          {/* Clear button */}
          {searchInput && (
            <motion.button
              type="button"
              onClick={handleClear}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
            >
              <X size={20} className="text-white/60" />
            </motion.button>
          )}
          
          {loading && (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="flex-shrink-0">
              <Loader size={20} className="text-white/60" />
            </motion.div>
          )}
          
          <button
            type="submit"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-xs sm:text-sm font-semibold flex-shrink-0 whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="autocomplete-dropdown"
            >
              {suggestions.map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(suggestion)}
                  whileHover={{ x: 4 }}
                  className="autocomplete-item w-full flex items-center gap-3"
                >
                  <MapPin size={16} className="text-white/40 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-white truncate">{suggestion.name}</div>
                    <div className="text-xs text-white/40 truncate">
                      {suggestion.region && `${suggestion.region}, `}
                      {suggestion.country}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
