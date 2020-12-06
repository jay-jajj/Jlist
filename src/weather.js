const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "e4af1a1199f0eb0094a3bd2fcf171e3a";

function getWeather(lat, lng) {
  //fetch는 데이터를가져올때 쓰는 함수이다.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //then은 데이터를 다가져온후 실행하는 함수이다. 위의 함수가 다하기까지 기다린후 함수를 실행시키는 역활
      return response.json();
    })
    .then(function (json) {
      setItem(json);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  const coordsObj = {
    //이렇게 쓰면 latitude : latitude와 똑같은 것임
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("not find");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function setItem(json) {
  console.log(json)
  const weatherInfo = json.weather[0];
  const info = document.createElement("div"),
    weatherText = document.createElement("div"),
    icon = document.createElement("img");
  info.classList.add("info");
  icon.classList.add("icon");
  info.innerText = `${json.name}\n${json.main.temp}℃`
  weatherText.classList.add("weathertext");
  icon.src = `http://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
  weatherText.innerHTML = `${weatherInfo.description}`;
  weather.appendChild(icon);
  weather.appendChild(info);
  weather.appendChild(weatherText);
}

function init() {
  loadCoords();
}

init();
