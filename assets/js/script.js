// Global variables
const tempData = [];
const weatherTypeData = [];
const windData = [];
const sunData = [];
const dayData = [];
const weekData = [];

// HTML elements
const myAddressInput = document.getElementById("addressInput");
const myAddressSearchButton = document.getElementById("searchByAddress");

// event listeners
myAddressSearchButton.addEventListener("click", () => {
  // console.log(myAddressInput.value);
  getAddressByCity(myAddressInput.value);
});

// fetch closest answered city name from user input
function getAddressByCity(myCity) {
  fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      myCity
    )}&format=json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);

      extractCoords(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// convert city data to coordinates
function extractCoords(data) {
  const lat = data[0].lat;
  const lon = data[0].lon;
  // console.log(lat, lon);

  getCurrentLocation(lat, lon);
}

// fetch api data with coordinates
function getCurrentLocation(latitude, longitude) {
  const apiEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,winddirection_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_1cm,uv_index,is_day,cape,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`;

  fetch(apiEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return response.json();
      }
    })

    .then((data) => {
      console.log("Samlet vejrdata", data);
      const rawData = data; // smider al dataen ind i variablen rawData

      dataConversion(rawData); // kalder dataConversion med rawData
    })

    .catch((error) => {
      console.error(error);
    });
}

// convert data to readable format
function dataConversion(data) {
  // indsat 'data' som parameter, så vi ved hvad der passeres videre til denne funktion
  const rawData = data;

  // kalder funktioner til at håndtere data (udtrække fra api'en)
  makeTempData(rawData);
  makeWeatherTypeData(rawData);
  makeWindSpeedData(rawData);
  makeSunData(rawData);
  makeDayData(rawData);
  makeWeekData(rawData);
}

// extract and sort info to array tempData
function makeTempData(rawData) {
  const temp = rawData.hourly.temperature_2m;
  const humidity = rawData.hourly.relativehumidity_2m;

  const currentHour = new Date().getHours();

  // Use the map method to create an array of objects
  const tempDatas = temp.map((temperature, i) => ({
    temperature,
    humidity: humidity[i],
  }));

  if (tempDatas && currentHour >= 0 && currentHour < tempDatas.length) {
    const tempDatasNow = tempDatas[currentHour];
    console.log(tempDatasNow);

    // Push the entire tempDatas array to tempData
    tempData.push(tempDatasNow);

    // Call function to update temperature display
    displayTempData(
      currentHour,
      tempDatasNow.temperature,
      tempDatasNow.humidity
    );
  } else {
    console.error("No data available for the current hour.");
  }
  console.log("Temperatur og Luftfugtighed", tempData);
}

function makeWeatherTypeData(rawData) {
  const weatherCode = rawData.hourly.weathercode;

  const currentHour = new Date().getHours();

  const weatherTypeDatas = weatherCode.map((weathercode) => ({
    weathercode,
  }));

  if (
    weatherTypeDatas &&
    currentHour >= 0 &&
    currentHour < weatherTypeDatas.length
  ) {
    const weatherTypeDataNow = weatherTypeDatas[currentHour];
    console.log(weatherTypeDataNow);

    weatherTypeData.push(weatherTypeDatas);

    displayWeatherCode(currentHour, weatherTypeDataNow.weathercode);
  } else {
    console.error("No data available for the current hour.");
  }

  console.log("Vejrtype", weatherTypeData);
}

function makeWindSpeedData(rawData) {
  const windSpeed = rawData.hourly.windspeed_10m;
  const windDirection = rawData.hourly.winddirection_10m;

  const currentHour = new Date().getHours();

  const windSpeedDatas = windSpeed.map((windSpeed, i) => ({
    windSpeed,
    windDirection: windDirection[i],
  }));

  if (
    windSpeedDatas &&
    currentHour >= 0 &&
    currentHour < windSpeedDatas.length
  ) {
    const windSpeedDatasNow = windSpeedDatas[currentHour];
    console.log(windSpeedDatasNow);

    windData.push(windSpeedDatas);

    displayWindSpeed(
      currentHour,
      windSpeedDatasNow.windSpeed,
      windSpeedDatasNow.windDirection
    );
  } else {
    console.error("No data available for the current hour.");
  }

  console.log("Vindhastighed og Vindretning", windData);
}

function makeSunData(rawData) {
  const sunRise = rawData.daily.sunrise;
  const sunSet = rawData.daily.sunset;

  const currentDay = new Date().getDay();

  const sunDatas = sunRise.map((sunRise, i) => ({
    sunRise,
    sunSet: sunSet[i],
  }));

  if (sunDatas && currentDay >= 0 && currentDay < sunDatas.length) {
    const sunDatasNow = sunDatas[currentDay];
    console.log(sunDatasNow);

    sunData.push(sunDatas);

    displaySunData(currentDay, sunDatasNow.sunRise, sunDatasNow.sunSet);
  } else {
    console.error("No data available for the current hour.");
  }

  console.log("Solopgang og Solnedgang", sunData);
}

function makeDayData(rawData) {
  const temperature = rawData.hourly.temperature_2m;
  const weathercode = rawData.hourly.weathercode;
  const cloudcover = rawData.hourly.cloudcover;
  const visibility = rawData.hourly.visibility;
  const rain = rawData.hourly.rain;

  const currentHour = new Date().getHours();

  const dayDatas = temperature.map((temperature, i) => ({
    temperature,
    weathercode: weathercode[i],
    cloudcover: cloudcover[i],
    visibility: visibility[i],
    rain: rain[i],
  }));

  if (dayDatas && currentHour >= 0 && currentHour < dayDatas.length) {
    const dayDatasNow = dayDatas[currentHour];
    console.log(dayDatasNow);

    windData.push(dayDatasNow);

    displayDayForecast(
      currentHour,
      dayDatasNow.temperature,
      dayDatasNow.weathercode,
      dayDatasNow.cloudcover,
      dayDatasNow.visibility,
      dayDatasNow.rain
    );
  } else {
    console.error("No data available for the current hour.");
  }

  dayData.push(dayDatas);
  console.log("Temperatur, Vejrtype, Cloudcover, Visibility og Regn", dayData);
}

function makeWeekData(rawData) {
  const temperatureMax = rawData.daily.temperature_2m_max;
  const temperatureMin = rawData.daily.temperature_2m_min;
  const weatherCode = rawData.daily.weathercode;

  const currentDay = new Date().getDay();

  const weekDatas = temperatureMax.map((temperature_max, i) => ({
    temperature_max,
    temperature_min: temperatureMin[i],
    weathercode: weatherCode[i],
  }));

  if (weekDatas && currentDay >= 0 && currentDay < weekDatas.length) {
    const weekDatasNow = weekDatas[currentDay];
    console.log(weekDatasNow);

    windData.push(weekDatasNow);

    displayWeekForecast(
      currentDay,
      weekDatasNow.weathercode,
      weekDatasNow.temperature_max,
      weekDatasNow.temperature_min
    );
  } else {
    console.error("No data available for the current hour.");
  }
  weekData.push(weekDatas);
  console.log("Temperatur_max, Temperatur_min og Vejrtype", weekData);
}

// Functions to update display
function displayTempData(currentHour, temperature, humidity) {
  const tempDisplay = document.getElementById("tempContainer");
  const humidDisplay = document.getElementById("humidContainer");
  if (tempDisplay && humidDisplay) {
    tempDisplay.textContent = `Temperature at hour ${
      currentHour + 1
    }: ${temperature} °C`;
    humidDisplay.textContent = `Humidity at hour ${
      currentHour + 1
    }: ${humidity} %`;
  } else {
    console.error("No data available");
  }
  // console.log(`Temperature at hour ${currentHour + 1}: ${temperature}°C`);
  // console.log(`Humidity at hour ${currentHour + 1}: ${humidity}°C`);
}
function displayWeatherCode(currentHour, weathercode) {
  const weathercodeDisplay = document.getElementById("results");
  if (weathercodeDisplay) {
    weathercodeDisplay.textContent = `Weathercode at hour ${
      currentHour + 1
    }: ${weathercode}`;
  } else {
    console.error("No data available");
  }
}

function displayWindSpeed(currentHour, windSpeed, windDirection) {
  const windSpeedDisplay = document.getElementById("windSpeed");
  const windDirectionDisplay = document.getElementById("windDirection");
  if (windSpeedDisplay && windDirectionDisplay) {
    windSpeedDisplay.textContent = `Windspeed at hour ${
      currentHour + 1
    }: ${windSpeed} km/h`;
    windDirectionDisplay.textContent = `Winddirection at hour ${
      currentHour + 1
    }: ${windDirection}`;
    // console.log(`Windspeed at hour ${currentHour + 1}: ${windSpeed} km/h`);
    // console.log(`Winddirection at hour ${currentHour + 1}: ${windDirection}`);
  } else {
    console.error("No data available");
  }
}

function displaySunData(currentDay, sunRise, sunSet) {
  const sunRiseDisplay = document.getElementById("sunRise");
  const sunSetDisplay = document.getElementById("sunSet");

  if (sunRiseDisplay && sunSetDisplay) {
    const sunriseTime = new Date(sunRise);
    const sunsetTime = new Date(sunSet);

    const sunriseHour = sunriseTime.getHours();
    const sunriseMinutes = sunriseTime.getMinutes();

    const sunsetHour = sunsetTime.getHours();
    const sunsetMinutes = sunsetTime.getMinutes();

    sunRiseDisplay.textContent = `Sunrise: ${sunriseHour}:${sunriseMinutes}`;
    sunSetDisplay.textContent = `Sunset: ${sunsetHour}:${sunsetMinutes}`;
  } else {
    console.error("No data available");
  }
}

function displayDayForecast(
  currentHour,
  temperature,
  weathercode,
  cloudcover,
  visibility,
  rain
) {
  const tempDisplay = document.getElementById("tempForecast");
  const weathercodeDisplay = document.getElementById("weatherForecast");
  const cloudcoverDisplay = document.getElementById("cloudcoverForecast");
  const visibilityDisplay = document.getElementById("visibilityForecast");
  const rainDisplay = document.getElementById("rainForecast");

  if (
    tempDisplay &&
    weathercodeDisplay &&
    cloudcoverDisplay &&
    visibilityDisplay &&
    rainDisplay
  ) {
    tempDisplay.textContent = `Temperature at hour ${
      currentHour + 1
    }: ${temperature} °C`;
    weathercodeDisplay.textContent = `Weathercode at hour ${
      currentHour + 1
    }: ${weathercode}`;
    cloudcoverDisplay.textContent = `Cloudcover at hour ${
      currentHour + 1
    }: ${cloudcover}`;
    visibilityDisplay.textContent = `Visibility at hour ${
      currentHour + 1
    }: ${visibility} km`;
    rainDisplay.textContent = `Rain at hour ${currentHour + 1}: ${rain} mm`;
  } else {
    console.error("No data available");
  }
}

function displayWeekForecast(
  currentDay,
  weathercode,
  temperature_max,
  temperature_min
) {
  const weekForecast = document.getElementById("weekForecast");
  weekForecast.innerHTML += `<ul>
      <li>Maximum temp: ${temperature_max}</li>
      <li>Minimum temp: ${temperature_min}</li>
      <li>weathercode: ${weathercode}</li>
      </ul>`;
}
