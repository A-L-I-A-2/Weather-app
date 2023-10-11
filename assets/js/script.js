import { makeWeekData, makeDayData, makeSunData, makeWindSpeedData, updateWindDirection, makeWeatherTypeData, getCurrentLocation, getPosition, dataConversion, makeTempData } from "./modules/module.js";
import { DisplayTemperature, DisplayWeatherType, DisplaySunset, DisplayWind, DisplayWeatherTypeOnly } from "./modules/view.js";
// import { tempData } from "./modules/controller.js";

// let displayElementId = '';
let weatherData;
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