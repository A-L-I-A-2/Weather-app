// Global variables
tempData = [];
weatherTypeData = [];
windData = [];
sunData = [];
dayData = [];
weekData = [];

const myAddressInput = document.getElementById('addressInput');
const myAddressSearchButton = document.getElementById('searchByAddress');

myAddressSearchButton.addEventListener("click", () => {
    // console.log(myAddressInput.value);
    getAddressByCity(myAddressInput.value);
})


// fetch city
function getAddressByCity(myCity) {

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(myCity)}&format=json`)

    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);

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
    console.log(lat, lon);
    getCurrentLocation(lat, lon);
}


function getCurrentLocation(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,winddirection_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_1cm,uv_index,is_day,cape,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`;
    
    fetch(url)
    
    .then((response) => {
        return response.json();
    })
    
    .then((data) => {
    console.log(data);
    const rawData = data; // smider al dataen ind i variablen rawData
    
    dataConversion(rawData); // kalder dataConversion med rawData
    })
    
    .catch((error) => {
    console.error(error);
    });
}
    
// convert data to readable format
function dataConversion(data) { // indsat 'data' som parameter, så vi ved hvad der passeres videre til denne funktion
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
    
    // Use the map method to create an array of objects
    const tempDatas = temp.map((temperature, i) => ({
        temperature,
        humidity: humidity[i],
    }));

    tempData.push(tempDatas);
    console.log('Temperatur og Luftfugtighed', tempData);
}
    
function makeWeatherTypeData(rawData) {
    const weatherCode = rawData.hourly.weathercode;
    
    const weatherTypeDatas = weatherCode.map((weathercode) => ({
        weathercode,
    }));

    weatherTypeData.push(weatherTypeDatas);
    console.log('Vejrtype', weatherTypeData);
}
    
    function makeWindSpeedData(rawData) {
    const windSpeed = rawData.hourly.windspeed_10m;
    const windDirection = rawData.hourly.winddirection_10m;
    /* const tempDatas = temp.map((temperature, i) => ({
        temperature,
        humidity: humidity[i],
    })); */
    const windSpeedDatas = windSpeed.map((windSpeed, i) => ({
        windSpeed,
        windDirection: windDirection[i],
    }));
    
    windData.push(windSpeedDatas);
    console.log('Vindhastighed og Vindretning', windData);
}
    
    
function makeSunData(rawData) {
    const sunRise = rawData.daily.sunrise;
    const sunSet = rawData.daily.sunset;
    
    const sunDatas = sunRise.map((sunRise, i) => ({
        sunRise,
        sunSet: sunSet[i],
    }));
    
    sunData.push(sunDatas);
    console.log('Solopgang og Solnedgang', sunData);
}
    
function makeDayData(rawData) {
    const temperature = rawData.hourly.temperature_2m;
    const weathercode = rawData.hourly.weathercode;
    const cloudcover = rawData.hourly.cloudcover;
    const visibility = rawData.hourly.visibility;
    const rain = rawData.hourly.rain;
    
    const dayDatas = temperature.map((temperature, i) => ({
        temperature,
        weathercode: weathercode[i],
        cloudcover: cloudcover[i],
        visibility: visibility[i],
        rain: rain[i],
    }));

    dayData.push(dayDatas);
    console.log('Temperatur, Vejrtype, Cloudcover, Visibility og Regn', dayData);
}
    
function makeWeekData(rawData) {
    const temperatureMax = rawData.daily.temperature_2m_max;
    const temperatureMin = rawData.daily.temperature_2m_min;
    const weatherCode = rawData.daily.weathercode;
    
    const weekDatas = temperatureMax.map((temperature_max, i) => ({
        temperature_max,
        temperature_min: temperatureMin[i],
        weathercode: weatherCode[i],
    }));
   
    weekData.push(weekDatas);
    console.log('Temperatur_max, Temperatur_min og Vejrtype', weekData);
}