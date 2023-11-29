const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const errorDisplay = document.querySelector(".error_text");


const API_KEY = "c93fd1817f3fbe42aeac0a63076603b9";

const createWeatherCard = (cityName, weatherItem, index) => {
    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ];
    
         const now = new Date();
         const dayOfWeek = daysOfWeek[now.getDay()];
         
    if(index === 0) { 
        return `<div class="details">
                    <h2>${dayOfWeek} <span>|</span> ${weatherItem.dt_txt.split(" ")[0]}</h2>
                    <h2>${cityName}</h2>
                    <h6 id="main-temp">${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Feels Like: ${(weatherItem.main.feels_like - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { 
        return `<li class="card">
                    <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return noCoordinates();
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        getCityCoordinatesError();
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; 
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                getCityNameError();
            });
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                requestPermissionDenied();
            } else {
                geoRequestDenied();
            }
        });
}

getUserCoordinates();
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

function getCityCoordinatesError(){
    alert("An error occurred while fetching the coordinates!");
}

function getCityNameError(){
    alert("An error occurred while fetching the city name!");
}

function requestPermissionDenied(){
    alert("Geolocation request denied. Please reset location permission to grant access again");
}

function geoRequestDenied(){
    alert("Geolocation request error. Please reset location permission.");
}

function noCoordinates(){
    alert(`No coordinates found for ${cityName}`)
}
