import { motion } from 'framer-motion';
import { Cloud, MapPin, Settings, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WatchWidget from './WatchWidget';

export default function Navigation({ activeTab, setActiveTab, theme, timezone }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', description: 'Current Weather' },
    { id: 'locations', icon: MapPin, label: 'Locations', description: 'Saved Places' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'Preferences' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Professional */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-72 backdrop-blur-2xl bg-gradient-to-b from-white/15 to-white/5 border-r border-white/20 flex-col z-50"
        style={{
          boxShadow: `inset -12px 0 40px ${theme.neon}40`,
        }}
      >
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-8 py-4 border-b border-white/10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <Cloud size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WeatherOS</h1>
            </div>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 md:px-6 md:pt-3 md:pb-0 3xl:p-6 space-y-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group mb-3 ${
                  isActive
                    ? 'bg-white/20 border border-white/40'
                    : 'hover:bg-white/10 border border-white/10'
                }`}
                style={{
                  boxShadow: isActive ? `0 8px 24px ${theme.neon}40` : 'none',
                }}
              >
                <div
                  className={`p-3 rounded-xl transition-all ${
                    isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                  }`}
                  style={{
                    color: 'white',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/50">{item.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 rounded-full"
                    style={{ background: theme.primary }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          // className="border-t border-white/10"
        >
          {/* Watch Widget */}
          <WatchWidget timezone={timezone} />

          {/* v1.0 card — below watch, separated by a line */}
          <div className="mx-4 mt-4 mb-4 border-t border-white/10 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/60 text-center">
                <span className="block font-semibold text-white/80 mb-1">v1.0</span>
                Powered by WeatherAPI
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:hidden fixed top-0 left-0 right-0 backdrop-blur-2xl bg-gradient-to-b from-white/15 to-white/5 border-b border-white/20 z-50"
        style={{
          boxShadow: `inset 0 12px 40px ${theme.neon}40`,
        }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <Cloud size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">WeatherOS</p>
              <p className="text-xs text-white/50">Dashboard</p>
            </div>
          </div>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-white/20 border border-white/40'
                          : 'hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Icon size={18} style={{ color: theme.primary }} />
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50">{item.description}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Bottom Spacer */}
      <div className="lg:hidden h-24" />
    </>
  );
}
