
let inputval = document.querySelector('#cityinput');
let btn = document.querySelector('#add');
let city = document.querySelector('#cityoutput');
let descrip = document.querySelector('#description');
let icon = document.querySelector('.icon');
let temp = document.querySelector('#temp');
let wind = document.querySelector('#wind');
let main = document.querySelector('.main');
let body = document.querySelector('body');
let screen = document.querySelector('.screen');
let feel = document.querySelector('#feelslike');
let minTemp = document.querySelector('#min-temp');
let maxTemp = document.querySelector('#max-temp');
let  imgDisplay = document.querySelector('.container-fluid');

//api link id
apik = '4d8fb5b93d4af21d66a2948710284366'

//convert kelvin to celcious. 1 kelvin is equal to 272.15 celcious
function convertion(val){
    return (val - 273).toFixed(2)
}
//click event
btn.addEventListener('click',function(){

        //api link
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+',&APPID='+apik)

        .then(res => res.json())
        //.then (data => consol.log(data))
        .then(data => {
            
            let name = data['name']
            let descrip = data['weather'][0]['description']
            let tempature = data['main']['temp']
            let feel_like = data['main']['feels_like']
            let minTemperature = data['main']['temp_min']
            let maxTemperature = data['main']['temp_max']
            let wndspd = data['wind']['speed']

            city.innerHTML = `<span>${name}</span>`
            description.innerHTML=`Sky Conditions: <span>${descrip}</span>`
            temp.innerHTML = `Tempature: <span>${convertion(tempature)}°C</span>`
            feel.innerHTML =`Feels like: <span>${convertion(feel_like)}°C</span>`
            minTemp.innerHTML = `Minimun Temperature: <span>${convertion(minTemperature)}°C</span>`
            maxTemp.innerHTML = `Minimun Temperature: <span>${convertion(maxTemperature)}°C</span>`
            wind.innerHTML =`Wind Speed: <span>${wndspd} km p/h</span>` 
            
            switch (descrip) {

              case'clear sky':
              icon.style.backgroundImage = "url('icons/sun-icon.png')";
              break;

              case'broken clouds':
              icon.style.backgroundImage = "url('icons/Broken-clouds.png')";
              break;

              case'few clouds':
              icon.style.backgroundImage = "url('icons/Few-clouds.png')";
              break;

              case'scattered clouds':
              icon.style.backgroundImage = "url('icons/Few-clouds.png')";
              break;

              case'light rain':
              icon.style.backgroundImage = "url('icons/lite-rain.png')";
              break;

              case'very heavy rain':
              icon.style.backgroundImage = "url('icons/VH-rain.png')";
              break;

              case'heavy intensity rain':
              icon.style.backgroundImage = "url('icons/VH-rain.png')";
              break;
          }
        })

})

window.addEventListener("load", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        lon = position.coords.longitude;
        lat = position.coords.latitude;
    
        // API URL
        const base =
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
  `lon=${lon}&appid=4d8fb5b93d4af21d66a2948710284366`;
    
        // Calling the API
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let name = data['name']
            let descrip = data['weather'][0]['description']
            let tempature = data['main']['temp']
            let feel_like = data['main']['feels_like']
            let minTemperature = data['main']['temp_min']
            let maxTemperature = data['main']['temp_max']
            let wndspd = data['wind']['speed']

            city.innerHTML = `<span>${name}</span>`
            description.innerHTML=`Sky Conditions: <span>${descrip}</span>`
            temp.innerHTML = `Tempature: <span>${convertion(tempature)}°C</span>`
            feel.innerHTML =`Feels like: <span>${convertion(feel_like)}°C</span>`
            minTemp.innerHTML = `Minimun Temperature: <span>${convertion(minTemperature)}°C</span>`
            maxTemp.innerHTML = `Minimun Temperature: <span>${convertion(maxTemperature)}°C</span>`
            wind.innerHTML =`Wind Speed: <span>${wndspd} km p/h</span>`

            switch (descrip) {

              case'clear sky':
              icon.style.backgroundImage = "url('icons/sun-icon.png')";
              break;

              case'broken clouds':
              icon.style.backgroundImage = "url('icons/Broken-clouds.png')";
              break;

              case'few clouds':
              icon.style.backgroundImage = "url('icons/Few-clouds.png')";
              break;

              case'scattered clouds':
              icon.style.backgroundImage = "url('icons/Few-clouds.png')";
              break;

              case'very heavy rain':
              icon.style.backgroundImage = "url('icons/VH-rain.png')";
              break;

              case'heavy intensity rain':
              icon.style.backgroundImage = "url('icons/VH-rain.png')";
              break;
          }

          });
      });
    }
  });


