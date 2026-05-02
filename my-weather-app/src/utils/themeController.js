// Theme configurations for different weather conditions
export const themeConfigs = {
  summer: {
    name: 'Summer',
    gradient: 'from-yellow-400 via-blue-400 to-cyan-300',
    darkGradient: 'from-yellow-600 via-blue-600 to-cyan-500',
    primary: 'text-yellow-300',
    secondary: 'text-blue-300',
    accent: 'text-cyan-300',
    cardBg: 'bg-white/5',
    cardBorder: 'border-yellow-400/30',
    glowColor: 'shadow-yellow-400/20',
    animation: 'shimmer',
  },
  monsoon: {
    name: 'Monsoon',
    gradient: 'from-teal-500 via-slate-600 to-slate-700',
    darkGradient: 'from-teal-700 via-slate-800 to-slate-900',
    primary: 'text-teal-300',
    secondary: 'text-slate-300',
    accent: 'text-cyan-300',
    cardBg: 'bg-white/3',
    cardBorder: 'border-teal-400/20',
    glowColor: 'shadow-teal-400/10',
    animation: 'raindrop',
  },
  winter: {
    name: 'Winter',
    gradient: 'from-cyan-300 via-blue-300 to-slate-400',
    darkGradient: 'from-cyan-500 via-blue-500 to-slate-600',
    primary: 'text-cyan-300',
    secondary: 'text-blue-300',
    accent: 'text-white',
    cardBg: 'bg-white/8',
    cardBorder: 'border-cyan-400/40',
    glowColor: 'shadow-cyan-400/30',
    animation: 'frost',
  },
  storm: {
    name: 'Storm',
    gradient: 'from-slate-800 via-purple-700 to-slate-900',
    darkGradient: 'from-slate-900 via-purple-800 to-slate-950',
    primary: 'text-purple-300',
    secondary: 'text-slate-300',
    accent: 'text-purple-200',
    cardBg: 'bg-white/2',
    cardBorder: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    animation: 'lightning',
  },
  autumn: {
    name: 'Autumn',
    gradient: 'from-orange-400 via-pink-300 to-rose-300',
    darkGradient: 'from-orange-600 via-pink-500 to-rose-500',
    primary: 'text-orange-300',
    secondary: 'text-pink-300',
    accent: 'text-rose-300',
    cardBg: 'bg-white/6',
    cardBorder: 'border-orange-400/25',
    glowColor: 'shadow-orange-400/15',
    animation: 'particles',
  },
};

// Get theme based on theme name
export const getTheme = (themeName) => {
  return themeConfigs[themeName] || themeConfigs.summer;
};

// Combine theme with dark mode
export const applyDarkMode = (theme, isDark) => {
  if (!isDark) return theme;
  
  return {
    ...theme,
    gradient: theme.darkGradient,
    cardBg: 'bg-black/40',
    cardBorder: 'border-white/10',
  };
};

// Get complementary colors for UI elements
export const getThemeColors = (theme) => {
  return {
    bg: `bg-gradient-to-br ${theme.gradient}`,
    text: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    card: `${theme.cardBg} backdrop-blur-xl border ${theme.cardBorder}`,
    glow: theme.glowColor,
  };
};
