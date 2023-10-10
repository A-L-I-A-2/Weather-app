import { makeWeekData, makeDayData, makeSunData, makeWindSpeedData, updateWindDirection, makeWeatherTypeData, getCurrentLocation, getPosition, dataConversion, makeTempData } from "./modules/module.js";
import { DisplayTemperature, DisplayWeatherType, DisplaySunset, DisplayWind } from "./modules/view.js";
// import { tempData } from "./modules/controller.js";

let displayElementId = 'myApp';
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

      DisplayTemperature(allData, displayElementId);
      DisplayWeatherType(allData, displayElementId);
      DisplaySunset(allData, displayElementId);
      DisplayWind(allData, displayElementId);

    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });
}

