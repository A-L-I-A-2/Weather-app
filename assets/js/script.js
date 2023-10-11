import { extractCoords, getAddressByCity, makeWeekData, makeDayData, makeSunData, makeWindSpeedData, updateWindDirection, makeWeatherTypeData, getCurrentLocation, getPosition, dataConversion, makeTempData } from "./modules/module.js";
import { DisplayTemperature, DisplayWeatherType, DisplaySunset, DisplayWind, DisplayWeatherTypeOnly } from "./modules/view.js";


// let displayElementId = '';
let weatherData;
let searchData;

initApp();

function initApp() {

  getPosition()
    .then(({ latitude, longitude }) => {
      return getCurrentLocation(latitude, longitude);
    })
    .then((data) => {
      weatherData = data;
      const allData = dataConversion(weatherData);

      DisplayTemperature(allData, 'myApp');
      DisplayWind(allData, 'windSpeed');
      DisplayWeatherType(allData, 'weatherType');
      DisplaySunset(allData, 'sunSet');
    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });
}


// CALLBACKS HER ("KLIKKERE")
// hoisted functions
window._viewCallbacks = { weatherClick, returnClick };

function weatherClick(weatherTypeData) {
  DisplayWeatherTypeOnly(weatherTypeData, 'weatherType');
}

function returnClick() {
  initApp();
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' || event.code === 13) {
    getAddressByCity(searchInput.value)
      .then((coordinates) => {
        return extractCoords(coordinates);
      })
      .then(({ latitude, longitude}) => {
        return getCurrentLocation(latitude, longitude);
      })
      .then((data) => {
        searchData = data;
        const allSearchedData = dataConversion(searchData);
        
        DisplayTemperature(allSearchedData, 'myApp');
        DisplayWind(allSearchedData, 'windSpeed');
        DisplayWeatherType(allSearchedData, 'weatherType');
        DisplaySunset(allSearchedData, 'sunSet');
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      })
  }
});

