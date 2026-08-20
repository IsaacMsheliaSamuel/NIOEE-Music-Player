# Weather App

A responsive weather app built with HTML, CSS, and vanilla JavaScript.

## Features

- Search weather by city name
- Current location weather (via browser geolocation)
- Displays: temperature, condition, icon, humidity, wind speed
- 5-day forecast
- °C / °F toggle
- Search history (stored in localStorage)
- Dynamic background based on weather condition
- Loading and error states
- Fully responsive (mobile + desktop)

## How to Run

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `script.js` and replace `YOUR_API_KEY_HERE` with your key:
   ```js
   const API_KEY = 'your_actual_key';
   ```
3. Open `index.html` in your browser — no build step needed.

> Note: The free OpenWeatherMap plan covers both `/weather` and `/forecast` endpoints used in this app.
