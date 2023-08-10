function dateFormat(date) {
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[date.getMonth()];
  return `${day} ${month} ${date.getDate()} ${year}, ${hours}:${minutes}`;
}

let now = new Date();
let formattedDate = dateFormat(now);

let dateAndTime = document.querySelector("#day-and-time");
dateAndTime.innerHTML = formattedDate;

let h1 = document.querySelector("#city-name");
let apiKey = `cdd1f5b4dd99e4adb623b7909b4163f3`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;

function insertCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#city-input");
  let city = enterCity.value;

  if (city) {
    let apiKey = `cdd1f5b4dd99e4adb623b7909b4163f3`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    h1.innerHTML = "";
    alert(`Please enter city`);
  }
}
let enterCity = document.querySelector("form");
enterCity.addEventListener("submit", insertCity);

function showTemperature(response) {
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = `${temperature}`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `WindSpeed: ${wind} km/hr`;

  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;

  let description = response.data.weather[0].description;
  let displayDescription = document.querySelector("#weather-description");
  displayDescription.innerHTML = `${description}`;
}

function showMyWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `cdd1f5b4dd99e4adb623b7909b4163f3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", showMyWeather);
