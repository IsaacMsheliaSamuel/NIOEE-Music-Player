// ============================================================
// Weather App - script.js
// ============================================================
// Sign up for a free API key at https://openweathermap.org/api
// Replace the value below with your own key before you start.
// ============================================================

const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ------------------------------------------------------------
// STEP 1: SELECT YOUR DOM ELEMENTS
// ------------------------------------------------------------
// Use document.getElementById() or querySelector() to grab
// every element you need to read from or update.
//
// You will need at minimum:
//   - The search form (or button)
//   - The city name input
//   - The loading indicator
//   - The error message container and its text element
//   - The weather card container
//   - The individual elements inside the card (city, icon, temp, etc.)
//
// Example:
//   const cityInput = document.getElementById('...');


// ------------------------------------------------------------
// STEP 2: LISTEN FOR THE SEARCH EVENT
// ------------------------------------------------------------
// Add an event listener to the form's "submit" event.
// Remember to call e.preventDefault() to stop the page reloading.
// Read the city name from the input and pass it to fetchWeather().
//
// Example structure:
//
// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const city = /* get value from input */;
//   if (city) fetchWeather(city);
// });


// ------------------------------------------------------------
// STEP 3: FETCH CURRENT WEATHER
// ------------------------------------------------------------
// Write an async function fetchWeather(city) that:
//
//   a) Shows the loading indicator (remove the "hidden" class)
//      and hides the weather card and any previous error
//
//   b) Calls the OpenWeatherMap "current weather" endpoint:
//      GET /weather?q={city}&appid={API_KEY}&units=metric
//
//   c) Checks if the response is OK (response.ok).
//      If not, throw an error with a friendly message.
//
//   d) Parses the JSON and calls renderWeather(data)
//
//   e) Catches any error and calls showError(message)
//
// Hint: use try / catch around your fetch call.
//
// API docs: https://openweathermap.org/current


// ------------------------------------------------------------
// STEP 4: RENDER THE WEATHER DATA
// ------------------------------------------------------------
// Write a function renderWeather(data) that:
//
//   a) Hides the loading indicator
//   b) Makes the weather card visible
//   c) Fills in each element with data from the API response:
//
//      - City name      → data.name
//      - Country        → data.sys.country
//      - Temperature    → data.main.temp  (already in °C with units=metric)
//      - Condition text → data.weather[0].description
//      - Icon           → https://openweathermap.org/img/wn/{data.weather[0].icon}@2x.png
//      - Humidity       → data.main.humidity  (%)
//      - Wind speed     → data.wind.speed  (m/s — convert to km/h by × 3.6)
//
// Example API response shape:
// {
//   name: "London",
//   sys: { country: "GB", sunrise: 1234, sunset: 5678 },
//   main: { temp: 14.2, humidity: 78 },
//   wind: { speed: 3.5 },
//   weather: [{ description: "light rain", icon: "10d" }],
//   dt: 1700000000
// }


// ------------------------------------------------------------
// STEP 5: HANDLE ERRORS
// ------------------------------------------------------------
// Write a function showError(message) that:
//   - Hides the loading indicator and weather card
//   - Sets the error text to `message`
//   - Makes the error container visible


// ------------------------------------------------------------
// STEP 6: 5-DAY FORECAST (Bonus)
// ------------------------------------------------------------
// The /forecast endpoint returns weather every 3 hours for 5 days.
// Endpoint: GET /forecast?q={city}&appid={API_KEY}&units=metric
//
// To get one entry per day:
//   - Loop through data.list
//   - Group entries by date (use new Date(item.dt * 1000).toDateString())
//   - Pick the entry closest to midday (hour === 12) for each day
//   - Take the first 5 days
//
// For each day, create a card element showing:
//   - Day name (Mon, Tue…)  → date.toLocaleDateString('en-US', { weekday: 'short' })
//   - Weather icon
//   - High temp  → item.main.temp
//   - Low temp   → item.main.temp_min


// ------------------------------------------------------------
// STEP 7: °C / °F TOGGLE (Bonus)
// ------------------------------------------------------------
// Keep the raw Celsius value in a variable (e.g. currentTempC).
// When the toggle button is clicked:
//   - Flip a boolean (isCelsius)
//   - Recalculate: °F = (°C × 9/5) + 32
//   - Update the temperature element's text
//   - Update the button label to show the opposite unit
// Do the same for forecast card temperatures.


// ------------------------------------------------------------
// STEP 8: CURRENT LOCATION (Bonus)
// ------------------------------------------------------------
// Add a click listener to the location button that calls:
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
//
// In successCallback, use coords.latitude and coords.longitude
// to call the API with lat/lon instead of city name:
//   GET /weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric


// ------------------------------------------------------------
// STEP 9: SEARCH HISTORY (Bonus)
// ------------------------------------------------------------
// Each time a successful search runs, store the city name.
// Use localStorage so history survives a page refresh:
//   localStorage.setItem('weatherHistory', JSON.stringify(array))
//   JSON.parse(localStorage.getItem('weatherHistory') || '[]')
//
// Render the history as clickable buttons.
// Clicking one should re-run the search for that city.
// Add a "Clear" button that empties the array and re-renders.


// ------------------------------------------------------------
// STEP 10: DYNAMIC BACKGROUND (Bonus)
// ------------------------------------------------------------
// After rendering weather, add a class to document.body
// based on the weather condition string (data.weather[0].main):
//
//   Clear       → 'sunny'
//   Clouds      → 'cloudy'
//   Rain/Drizzle→ 'rainy'
//   Snow        → 'snowy'
//   Thunderstorm→ 'stormy'
//   Mist/Fog…   → 'misty'
//   night (dt between sunset and sunrise) → 'night'
//
// Remove the previous class before adding the new one.
// Define matching CSS classes in style.css with gradient backgrounds.
