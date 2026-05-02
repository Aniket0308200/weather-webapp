# WeatherAPI Setup Guide

## Step 1: Get Your Free API Key

1. Go to: **https://www.weatherapi.com/**
2. Click **"Sign Up Free"**
3. Fill in your details and create an account
4. Check your email and verify your account
5. Log in to your dashboard
6. Copy your **API Key** from the dashboard

## Step 2: Add API Key to Your Project

Open `src/utils/weatherEngine.js` and replace this line:

```javascript
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your WeatherAPI key
```

With your actual API key:

```javascript
const WEATHER_API_KEY = 'your_actual_api_key_here';
```

**Example:**
```javascript
const WEATHER_API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
```

## Step 3: Save and Refresh

1. Save the file (Ctrl+S)
2. Go back to your browser
3. Refresh the page (F5)
4. The app should now work! ✅

## What You Get with Free Plan

- ✅ Current weather
- ✅ 7-day forecast
- ✅ Hourly forecast
- ✅ Alerts
- ✅ Air quality data
- ✅ Astronomy data (sunrise, sunset, moon phases)
- ✅ 1 million calls/month

## Troubleshooting

### Still getting errors?
1. Make sure you copied the API key correctly (no extra spaces)
2. Verify your account email
3. Wait a few minutes for the API key to activate
4. Clear browser cache (Ctrl+Shift+Delete)
5. Refresh the page

### API key not working?
- Go to https://www.weatherapi.com/my/
- Check if your account is active
- Generate a new API key if needed

## Need Help?

Visit: https://www.weatherapi.com/docs/

---

**Once you add your API key, the app will work perfectly!** 🌤️
