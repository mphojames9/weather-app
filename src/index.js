const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const errorDisplay = document.querySelector(".error_text");
const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

     const now = new Date();
     const dayOfWeek = daysOfWeek[now.getDay()];


const API_KEY = "c93fd1817f3fbe42aeac0a63076603b9";

const createWeatherCard = (cityName, _sunset,_sunrise, weatherItem, index) => {
    if(index === 0) { 
        function convertTimestamptoTime_sunrise() {

            let unixTimestamp = _sunrise;
            let dateObj = new Date(unixTimestamp * 1000.0021);
            let utcString = dateObj.toUTCString();
         
            let time = utcString.slice(-30, -7);
            return time;
        }
        function convertTimestamptoTime_sunset() {

            let unixTimestamp = _sunset;
            let dateObj = new Date(unixTimestamp * 1000.0021);
            let utcString = dateObj.toUTCString();
         
            let time = utcString.slice(-30, -7);
            return time;
        }
       const sunrise = convertTimestamptoTime_sunrise();
       const sunset = convertTimestamptoTime_sunset();

        return `<div class="details">
                    <h2>${dayOfWeek} <span>|</span> ${weatherItem.dt_txt.split(" ")[0]}</h2>
                    <h2>${cityName}</h2>
                    <h6 id="main-temp">${(weatherItem.main.temp - 273.15).toFixed(0)}°C</h6>
                    <div class="min_max">
                    <h6>L : ${(weatherItem.main.temp_min - 273.15).toFixed(0)}°C</h6>
                    <span>|</span>
                    <h6>H : ${(weatherItem.main.temp_max - 273.15).toFixed(0)}°C</h6>
                    </div>
                    <h6>Feels Like: ${(weatherItem.main.feels_like - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Visibility: ${weatherItem.visibility / 100} KM</h6>
                    <h6 class="sunset_sunrise">Sunrise: ${sunset} </h6>
                    <h6 class="sunset_sunrise">Sunset: ${sunrise} </h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { 
        return `<li class="card">
                    <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description.toUpperCase()}</h6>
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }

}
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        const _sunrise = data.city.sunrise;
        const _sunset = data.city.sunset;
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
            const html = createWeatherCard(cityName, _sunrise, _sunset, weatherItem, index);
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

    else{   
        const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
        fetch(API_URL).then(response => response.json()).then(data => {
            if (!data.length) return noCoordinates();
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
        }).catch(() => {
            getCityCoordinatesError();
        });
    }

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


