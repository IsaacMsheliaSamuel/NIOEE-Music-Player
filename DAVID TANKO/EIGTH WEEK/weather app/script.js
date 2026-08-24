const apiKey = "b3e0e5d0ab740820422218f2c64a867f";

const baseUrl =
    "https://api.openweathermap.org/data/2.5/weather";

const form = document.querySelector("#search-form");
const cityInput = document.querySelector(".city_input");
const spinner = document.querySelector(".loading-indicator");
const errorMessage = document.querySelector(".error");
const weatherCard = document.querySelector(".weather-card");
const temp = document.querySelector(".temp");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city-name");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");


form.addEventListener("submit", function (submit) {

    submit.preventDefault();

    const city = cityInput.value;

    if (city) {
        fetchWeather(city);
    }
});


async function fetchWeather(city) {
    weatherCard.hidden = true;
    spinner.hidden = false;
    errorMessage.hidden = true;

    try {
        const response = await fetch(
            `${baseUrl}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "City not found");
        }

        renderWeather(data);

    } catch (err) {
        errorMessage.textContent = err.message || "City not found";
        errorMessage.hidden = false;
        weatherCard.hidden = true;
        spinner.hidden = true;
    }
}


function renderWeather(data) {
    weatherCard.hidden = false;
    spinner.hidden = true;
    cityName.textContent = data.name;

    temp.textContent = `${Math.round(data.main.temp)}°C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    const icon = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;
}