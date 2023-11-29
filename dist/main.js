(()=>{const e=document.querySelector(".city-input"),t=document.querySelector(".search-btn"),n=(document.querySelector(".location-btn"),document.querySelector(".current-weather")),r=document.querySelector(".weather-cards"),a=(document.querySelector(".error_text"),"c93fd1817f3fbe42aeac0a63076603b9"),i=(t,i,o)=>{fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${i}&lon=${o}&appid=${a}`).then((e=>e.json())).then((a=>{const i=[],o=a.list.filter((e=>{const t=new Date(e.dt_txt).getDate();if(!i.includes(t))return i.push(t)}));e.value="",n.innerHTML="",r.innerHTML="",o.forEach(((e,a)=>{const i=((e,t,n)=>{const r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date).getDay()];return 0===n?`<div class="details">\n                    <h2>${r} <span>|</span> ${t.dt_txt.split(" ")[0]}</h2>\n                    <h2>${e}</h2>\n                    <h6 id="main-temp">${(t.main.temp-273.15).toFixed(2)}°C</h6>\n                    <h6>Feels Like: ${(t.main.feels_like-273.15).toFixed(2)}°C</h6>\n                    <h6>Wind: ${t.wind.speed} M/S</h6>\n                    <h6>Humidity: ${t.main.humidity}%</h6>\n                </div>\n                <div class="icon">\n                    <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@4x.png" alt="weather-icon">\n                    <h6>${t.weather[0].description}</h6>\n                </div>`:`<li class="card">\n                    <h3>${t.dt_txt.split(" ")[0]}</h3>\n                    <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@4x.png" alt="weather-icon">\n                    <h6>Temp: ${(t.main.temp-273.15).toFixed(2)}°C</h6>\n                    <h6>Wind: ${t.wind.speed} M/S</h6>\n                    <h6>Humidity: ${t.main.humidity}%</h6>\n                </li>`})(t,e,a);0===a?n.insertAdjacentHTML("beforeend",i):r.insertAdjacentHTML("beforeend",i)}))})).catch((()=>{alert("An error occurred while fetching the weather forecast!")}))},o=()=>{const t=e.value.trim();""!==t&&fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=1&appid=${a}`).then((e=>e.json())).then((e=>{if(!e.length)return c();const{lat:t,lon:n,name:r}=e[0];i(r,t,n)})).catch((()=>{alert("An error occurred while fetching the coordinates!")}))};function c(){alert(`No coordinates found for ${cityName}`)}navigator.geolocation.getCurrentPosition((e=>{const{latitude:t,longitude:n}=e.coords;fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${t}&lon=${n}&limit=1&appid=${a}`).then((e=>e.json())).then((e=>{const{name:r}=e[0];i(r,t,n)})).catch((()=>{alert("An error occurred while fetching the city name!")}))}),(e=>{e.code===e.PERMISSION_DENIED?alert("Geolocation request denied. Please reset location permission to grant access again"):alert("Geolocation request error. Please reset location permission.")})),t.addEventListener("click",o),e.addEventListener("keyup",(e=>"Enter"===e.key&&o()))})();