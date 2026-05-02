# Layout Guide - Professional Weather Dashboard

## 🖥️ Desktop Layout (1024px+)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │ PROFESSIONAL SIDEBAR (288px)                                            │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ ☁️ WeatherOS                                                        │ │ │
│  │ │ Premium Dashboard                                                   │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ 🏠 Dashboard                                                        │ │ │
│  │ │    Current Weather                                                  │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ 📍 Locations                                                        │ │ │
│  │ │    Saved Places                                                     │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ ⚙️ Settings                                                         │ │ │
│  │ │    Preferences                                                      │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ v1.0                                                                │ │ │
│  │ │ Powered by WeatherAPI                                               │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ MAIN CONTENT (2 columns)                    │ 7-DAY FORECAST (1 column) │ │
│  │                                             │                           │ │
│  │ ┌────────────────────────────────────────┐ │ ┌─────────────────────────┐ │ │
│  │ │ 🌡️ Current Weather                    │ │ │ 📅 7-Day Forecast      │ │ │
│  │ │ Delhi, India                           │ │ │                         │ │ │
│  │ │ 28°C                                   │ │ │ Mon: 28° / 18°          │ │ │
│  │ │ Partly Cloudy                          │ │ │ Tue: 30° / 20°          │ │ │
│  │ │ [Save Location]                        │ │ │ Wed: 25° / 15°          │ │ │
│  │ └────────────────────────────────────────┘ │ │ Thu: 27° / 17°          │ │ │
│  │                                             │ │ Fri: 29° / 19°          │ │ │
│  │ ┌────────────────────────────────────────┐ │ │ Sat: 31° / 21°          │ │ │
│  │ │ 💧 Humidity: 65%  🌬️ Wind: 12 km/h    │ │ │ Sun: 26° / 16°          │ │ │
│  │ │ 👁️ Visibility: 10km  🔽 Pressure: 1013│ │ │                         │ │ │
│  │ └────────────────────────────────────────┘ │ │ (Sticky - stays visible)│ │ │
│  │                                             │ └─────────────────────────┘ │ │
│  │ ┌────────────────────────────────────────┐ │                           │ │
│  │ │ 🗺️ Location Map                        │ │                           │ │
│  │ │ [SVG Map Visualization]                │ │                           │ │
│  │ └────────────────────────────────────────┘ │                           │ │
│  │                                             │                           │ │
│  │ ┌────────────────────────────────────────┐ │                           │ │
│  │ │ ⏰ Hourly Forecast                     │ │                           │ │
│  │ │ [Scrollable hourly cards]              │ │                           │ │
│  │ └────────────────────────────────────────┘ │                           │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 📱 Mobile Layout (< 768px)

```
┌──────────────────────────────────────────────────────┐
│ ☁️ WeatherOS  [≡ Menu]                              │ ← Top Header
├──────────────────────────────────────────────────────┤
│ [Dropdown Menu]                                      │
│ 🏠 Dashboard                                         │
│ 📍 Locations                                         │
│ ⚙️ Settings                                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ 🌡️ Current Weather                              │ │
│ │ Delhi, India                                     │ │
│ │ 28°C                                             │ │
│ │ Partly Cloudy                                    │ │
│ │ [Save Location]                                  │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ 💧 Humidity: 65%  🌬️ Wind: 12 km/h             │ │
│ │ 👁️ Visibility: 10km  🔽 Pressure: 1013         │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ 🗺️ Location Map                                 │ │
│ │ [SVG Map Visualization]                          │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ ⏰ Hourly Forecast                               │ │
│ │ [Scrollable hourly cards]                        │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ 📅 7-Day Forecast                                │ │
│ │ Mon: 28° / 18°                                   │ │
│ │ Tue: 30° / 20°                                   │ │
│ │ Wed: 25° / 15°                                   │ │
│ │ Thu: 27° / 17°                                   │ │
│ │ Fri: 29° / 19°                                   │ │
│ │ Sat: 31° / 21°                                   │ │
│ │ Sun: 26° / 16°                                   │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
├──────────────────────────────────────────────────────┤
│ 🏠 Dashboard  📍 Locations  ⚙️ Settings             │ ← Mobile Dock
└──────────────────────────────────────────────────────┘
```

## 🎨 Navigation Sidebar Features

### Professional Design Elements

1. **Header Section**
   - Logo with gradient background
   - App name: "WeatherOS"
   - Tagline: "Premium Dashboard"
   - Separator line

2. **Navigation Items**
   - Icon with background color
   - Label (bold, white)
   - Description (smaller, muted)
   - Active indicator dot
   - Hover animation (slide right)
   - Neon glow on active state

3. **Footer Section**
   - Version number
   - API credit
   - Subtle background

### Styling Details

```css
/* Sidebar Background */
background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.05))
backdrop-filter: blur(32px)
border: 1px solid rgba(255,255,255,0.2)
box-shadow: inset -12px 0 40px rgba(theme.neon, 0.25)

/* Navigation Item - Active */
background: rgba(255,255,255,0.2)
border: 1px solid rgba(255,255,255,0.4)
box-shadow: 0 8px 24px rgba(theme.neon, 0.25)

/* Navigation Item - Hover */
transform: translateX(8px)
background: rgba(255,255,255,0.15)
```

## 📐 Responsive Breakpoints

| Screen Size | Layout | Sidebar | 7-Day Forecast |
|-------------|--------|---------|----------------|
| < 768px | Mobile | Top Header | Below Content |
| 768px - 1023px | Tablet | Top Header | Below Content |
| ≥ 1024px | Desktop | Left Sidebar | Sticky Right Panel |

## 🎯 Key Layout Features

1. **Sticky 7-Day Forecast** (Desktop)
   - Stays visible while scrolling
   - Max-height with scrollbar
   - Always accessible

2. **Professional Sidebar** (Desktop)
   - 288px wide (w-72)
   - Full navigation with descriptions
   - Branding and footer

3. **Responsive Header** (Mobile)
   - Compact top bar
   - Dropdown menu
   - Menu toggle button

4. **Flexible Grid**
   - 3-column on desktop (2 main + 1 sidebar)
   - 1-column on mobile (full-width)
   - Smooth transitions

## 🚀 Performance Optimizations

- Sticky positioning uses GPU acceleration
- Smooth animations with Framer Motion
- Conditional rendering for tabs
- Optimized scrollbar hiding
- Efficient grid layout

## 📊 Content Hierarchy

### Desktop Priority
1. Current Weather (Large, prominent)
2. Metrics Grid (Quick info)
3. Weather Map (Visual reference)
4. Hourly Forecast (Detailed timeline)
5. 7-Day Forecast (Sticky reference)

### Mobile Priority
1. Current Weather (Full-width)
2. Metrics Grid (2-column)
3. Weather Map (Full-width)
4. Hourly Forecast (Scrollable)
5. 7-Day Forecast (Below)

## 🎨 Color Scheme

- **Primary**: Theme-based (changes with weather)
- **Secondary**: Theme-based accent
- **Background**: Glassmorphic (white/10 to white/5)
- **Text**: White (primary), white/60 (secondary), white/40 (tertiary)
- **Borders**: white/20 (default), white/40 (active)
- **Glow**: Theme neon color with 25-40% opacity
