# Visual Guide: Icons & Backgrounds

## 🎨 Complete Visual Reference

### Weather Condition Mapping

---

## ☀️ SUNNY WEATHER (Code: 1000)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: cloud-for-sun.jpg      │
│  Icon: sun-icon.png                 │
│  Overlay: 35% dark                  │
│  Temperature: Any                   │
│                                     │
│  ☀️ Bright, clear skies             │
│  Perfect visibility                 │
│  Warm and pleasant                  │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Clear, sunny conditions
**Temperature**: Any (typically 15°C+)
**Visual Effect**: Bright, warm appearance

---

## ☁️ PARTLY CLOUDY (Codes: 1003, 1006)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: basant-panchami-cloud  │
│  Icon: cloud-icon.png               │
│  Overlay: 35% dark                  │
│  Temperature: Any                   │
│                                     │
│  ☁️ Some clouds, mostly clear       │
│  Mixed conditions                   │
│  Pleasant weather                   │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Partly cloudy conditions
**Temperature**: Any (typically 10-25°C)
**Visual Effect**: Balanced, mixed appearance

---

## 🌫️ OVERCAST (Code: 1009)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: dark-cloud.jpg         │
│  Icon: cloud-icon.png               │
│  Overlay: 35% dark                  │
│  Temperature: Any                   │
│                                     │
│  🌫️ Completely overcast             │
│  Gray skies                         │
│  Dim lighting                       │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Overcast, gray skies
**Temperature**: Any (typically 5-15°C)
**Visual Effect**: Dim, gray appearance

---

## 🌫️ MIST/FOG (Codes: 1030, 1135)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: more-cloud-for-night   │
│  Icon: cloud-icon.png               │
│  Overlay: 35% dark                  │
│  Temperature: Any                   │
│                                     │
│  🌫️ Foggy, misty conditions         │
│  Reduced visibility                 │
│  Cool and damp                      │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Mist, fog, haze
**Temperature**: Any (typically 5-10°C)
**Visual Effect**: Hazy, misty appearance

---

## 🌧️ RAINY - WARM (Codes: 1063-1195, Temp > 0°C)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: rainy-cloud.jpg        │
│  Icon: rainy-icon.png               │
│  Overlay: 35% dark                  │
│  Temperature: > 0°C                 │
│                                     │
│  🌧️ Regular rain                    │
│  Wet conditions                     │
│  Moderate temperature               │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Rain in warm weather
**Temperature**: 1°C to 25°C
**Visual Effect**: Wet, rainy appearance

---

## 🥶 RAINY - COLD (Codes: 1063-1195, Temp ≤ 0°C)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: rainy-cloud.jpg        │
│  Icon: winter-rain-icon.png         │
│  Overlay: 35% dark                  │
│  Temperature: ≤ 0°C                 │
│                                     │
│  🥶 Cold rain / Freezing rain       │
│  Icy conditions                     │
│  Winter weather                     │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Rain in cold/winter weather
**Temperature**: -10°C to 0°C
**Visual Effect**: Cold, icy appearance

---

## ❄️ SNOWY (Codes: 1204-1252)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: snowflack-cloud.jpg    │
│  Icon: winter-snow-icon.png         │
│  Overlay: 35% dark                  │
│  Temperature: ≤ 0°C                 │
│                                     │
│  ❄️ Snow, sleet                     │
│  White, cold conditions             │
│  Winter weather                     │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Snow, sleet, winter precipitation
**Temperature**: -20°C to 0°C
**Visual Effect**: Cold, snowy appearance

---

## ⛈️ THUNDERSTORM (Codes: 1273-1282)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: cloud-thanderstroom    │
│  Icon: cloud-thanderstroom.jpg      │
│  Overlay: 35% dark                  │
│  Temperature: Any                   │
│  + Lightning effects                │
│                                     │
│  ⛈️ Thunder, lightning              │
│  Severe weather                     │
│  Dramatic conditions                │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Thunderstorms, lightning
**Temperature**: Any (typically 10-25°C)
**Visual Effect**: Dark, dramatic with lightning flashes

---

## 🥶 WINTER RAIN (Codes: 1150-1201)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: winter-rainy-cloud     │
│  Icon: winter-rain-icon.png         │
│  Overlay: 35% dark                  │
│  Temperature: ≤ 0°C                 │
│                                     │
│  🥶 Winter rain / Freezing rain     │
│  Cold, wet conditions               │
│  Winter weather                     │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Rain in winter conditions
**Temperature**: -15°C to 0°C
**Visual Effect**: Cold, winter appearance

---

## 🌙 NIGHT - REGULAR (Any code, isDark = true, Temp > 0°C)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: Based on weather       │
│  Icon: moon-icon.png                │
│  Overlay: 35% dark                  │
│  Temperature: > 0°C                 │
│                                     │
│  🌙 Night time                      │
│  Clear or cloudy night              │
│  Moderate temperature               │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Night time, any weather
**Temperature**: 5°C to 20°C
**Visual Effect**: Night, calm appearance

---

## 🌙 NIGHT - WINTER (Any code, isDark = true, Temp ≤ 0°C)

```
┌─────────────────────────────────────┐
│                                     │
│  Background: Based on weather       │
│  Icon: moon-winter-icon.png         │
│  Overlay: 35% dark                  │
│  Temperature: ≤ 0°C                 │
│                                     │
│  🌙 Winter night                    │
│  Cold night conditions              │
│  Freezing temperatures              │
│                                     │
└─────────────────────────────────────┘
```

**When Used**: Night time in winter
**Temperature**: -20°C to 0°C
**Visual Effect**: Cold, winter night appearance

---

## 📊 Temperature Decision Tree

```
Weather Code
    ↓
Is it Rainy (1063-1195)?
    ├─ YES → Temperature ≤ 0°C?
    │         ├─ YES → winter-rain-icon.png
    │         └─ NO  → rainy-icon.png
    └─ NO  → Continue...

Is it Night (isDark = true)?
    ├─ YES → Temperature ≤ 0°C?
    │         ├─ YES → moon-winter-icon.png
    │         └─ NO  → moon-icon.png
    └─ NO  → Continue...

Use default icon for weather code
```

---

## 🎨 Overlay Effect

### Before Overlay
```
┌─────────────────────────────────────┐
│                                     │
│  Background Image (Full brightness) │
│  Text: Hard to read                 │
│  UI: Low contrast                   │
│                                     │
└─────────────────────────────────────┘
```

### After Overlay (35% dark)
```
┌─────────────────────────────────────┐
│                                     │
│  Background Image (Darkened)        │
│  Text: Easy to read                 │
│  UI: High contrast                  │
│  Image: Still visible               │
│                                     │
└─────────────────────────────────────┘
```

**Opacity**: 35% (rgba(0, 0, 0, 0.35))
**Effect**: Subtle darkening for readability
**Result**: Professional appearance

---

## 🔄 Transition Effect

### Weather Change Animation

```
Time: 0s
┌─────────────────────────────────────┐
│  Background: cloud-for-sun.jpg      │
│  Opacity: 100%                      │
└─────────────────────────────────────┘
         ↓ (1 second transition)
Time: 0.5s
┌─────────────────────────────────────┐
│  Background: Fading between images  │
│  Opacity: 50%                       │
└─────────────────────────────────────┘
         ↓ (1 second transition)
Time: 1s
┌─────────────────────────────────────┐
│  Background: rainy-cloud.jpg        │
│  Opacity: 100%                      │
└─────────────────────────────────────┘
```

**Duration**: 1 second
**Easing**: ease-in-out
**Effect**: Smooth, professional transition

---

## 📱 Display Locations

### Current Weather Card
```
┌─────────────────────────────────────┐
│  Location Name                      │
│                          [ICON]     │
│  Temperature: 28°C                  │
│  Feels like: 26°C                   │
│  Condition: Sunny                   │
└─────────────────────────────────────┘
         ↑
    Icon displayed here
    (sun-icon.png for sunny)
```

### Hourly Forecast
```
┌──────┬──────┬──────┬──────┐
│ 9 AM │10 AM │11 AM │12 PM │
│[ICON]│[ICON]│[ICON]│[ICON]│
│ 22°  │ 24°  │ 26°  │ 28°  │
└──────┴──────┴──────┴──────┘
   ↑
Icons displayed here
(one for each hour)
```

### 7-Day Forecast
```
┌─────────────────────────────────────┐
│ Mon  │ Tue  │ Wed  │ Thu  │ Fri    │
│[ICON]│[ICON]│[ICON]│[ICON]│[ICON]  │
│ 28°  │ 26°  │ 22°  │ 20°  │ 18°    │
│ 18°  │ 16°  │ 14°  │ 12°  │ 10°    │
└─────────────────────────────────────┘
   ↑
Icons displayed here
(one for each day)
```

---

## 🎯 Selection Logic Flow

```
User searches for location
         ↓
API returns weather data
(code, temp, condition)
         ↓
getCustomWeatherIcon() called
         ↓
Check weather code
         ├─ 1000? → sun-icon.png
         ├─ 1003/1006? → cloud-icon.png
         ├─ 1063-1195? → Check temp
         │              ├─ ≤0°C? → winter-rain-icon.png
         │              └─ >0°C? → rainy-icon.png
         ├─ 1204-1252? → winter-snow-icon.png
         ├─ 1273-1282? → cloud-thanderstroom.jpg
         └─ Other? → sun-icon.png (default)
         ↓
Icon displayed in UI
         ↓
Background selected similarly
         ↓
35% overlay applied
         ↓
Content displayed with smooth transition
```

---

## 📋 Quick Reference Table

| Condition | Code | Icon | Background | Temp |
|-----------|------|------|------------|------|
| Sunny | 1000 | ☀️ sun | cloud-for-sun | Any |
| Cloudy | 1003-1006 | ☁️ cloud | basant-panchami | Any |
| Overcast | 1009 | ☁️ cloud | dark-cloud | Any |
| Fog | 1030, 1135 | ☁️ cloud | more-cloud-night | Any |
| Rain (warm) | 1063-1195 | 🌧️ rainy | rainy-cloud | >0°C |
| Rain (cold) | 1063-1195 | 🥶 winter-rain | rainy-cloud | ≤0°C |
| Snow | 1204-1252 | ❄️ snow | snowflack | ≤0°C |
| Storm | 1273-1282 | ⛈️ storm | thunderstorm | Any |
| Winter Rain | 1150-1201 | 🥶 winter-rain | winter-rainy | ≤0°C |
| Night | Any | 🌙 moon | Based on weather | >0°C |
| Winter Night | Any | 🌙 moon-winter | Based on weather | ≤0°C |

---

## ✨ Visual Enhancements Summary

✅ **Weather-Specific Backgrounds**
- 8 different background images
- Matches weather conditions
- Professional appearance

✅ **Custom Weather Icons**
- 7 different icon types
- Temperature-aware selection
- Consistent styling

✅ **Content Readability**
- 35% dark overlay
- High contrast text
- Professional polish

✅ **Smooth Transitions**
- 1-second fade effect
- ease-in-out easing
- No jarring changes

✅ **Consistent Experience**
- Same logic for all views
- Predictable behavior
- Professional appearance

---

## 🎉 Result

Your weather app now displays:
- Professional, weather-specific visuals
- Smart icon selection based on conditions
- Readable content with overlay
- Smooth transitions
- Consistent experience across all views

Enjoy your enhanced weather app! 🌤️
