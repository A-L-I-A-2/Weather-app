// Global variables
const tempData = [];
const weatherTypeData = [];
const windData = [];
const sunData = [];
const dayData = [];
const weekData = [];
console.log('Temperatur & humidity', tempData);
console.log('Vejrtype', weatherTypeData);
console.log('Vindhastighed & vindretning', windData);
console.log('Solopgang & Solnedgang', sunData);
console.log('Vejrudsigt for dagen', dayData);
console.log('Vejrudsigt for ugen', weekData);

// Get current position in coordinates ~ latitude and longitude
navigator.geolocation.getCurrentPosition((position) => {
    //console.log(position.coords.latitude, position.coords.longitude);
    getCurrentLocation(position.coords.latitude, position.coords.longitude);
});
    
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
        console.log('Samlet vejrdata', data);
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
    //console.log(temp);
    //console.log(humidity);
    
    const currentHour = new Date().getHours();

    // Use the map method to create an array of objects
    const tempDatas = temp.map((temperature, i) => ({
        temperature,
        humidity: humidity[i]
    }));
    //console.log(tempDatas);

    if (tempDatas && currentHour >= 0 && currentHour < tempDatas.length) {
        const tempDatasNow = tempDatas[currentHour];
        //console.log(tempDatasNow);

        // Push the entire tempDatas object for current hour to tempData
        tempData.push(tempDatasNow);

    } else {
        console.error("No data available for the current hour.");
    }
}

function makeWeatherTypeData(rawData) {
    const weatherCode = rawData.hourly.weathercode;
    //console.log(weatherCode);
    
    // const currentHour = new Date().getHours();
    const weatherDescription = [];
    //console.log(weatherDescription);
    
    for (const code of weatherCode) {
        switch (true) {
            case code === 0:
            //console.log("Clear sky");
            weatherDescription.push("Clear sky");
            break;
            case code > 0 && code < 4: 
            //console.log("Mainly clear, partly cloudy, and overcast");
            weatherDescription.push("Mainly clear, partly cloudy, and overcast");
            break;
            case code >= 45 && code < 49:
            //console.log("Fog and depositing rime fog");
            weatherDescription.push("Fog and depositing rime fog");
            break;
            case code >= 51 && code < 56:
            //console.log("Drizzle: Light, moderate, and dense intensity");
            weatherDescription.push("Drizzle: Light, moderate, and dense intensity");
            break;
            case code >= 56 && code < 58:
            //console.log("Freezing Drizzle: Light and dense intensity");
            weatherDescription.push("Freezing Drizzle: Light and dense intensity");
            break;
            case code >= 61 && code < 66:
            //console.log("Rain: Slight, moderate and heavy intensity");
            weatherDescription.push("Rain: Slight, moderate and heavy intensity");
            break;
            case code >= 66 && code < 68:
            //console.log("Freezing Rain: Light and heavy intensity");
            weatherDescription.push("Freezing Rain: Light and heavy intensity");
            break;
            case code >= 71 && code < 76:
            //console.log("Snow fall: Slight, moderate, and heavy intensity");
            weatherDescription.push("Snow fall: Slight, moderate, and heavy intensity");
            break;
            case code === 77:
            //console.log("Snow grains");
            weatherDescription.push("Snow grains");
            break;
            case code >= 80 && code < 83:
            //console.log("Rain showers: Slight, moderate, and violent");
            weatherDescription.push("Rain showers: Slight, moderate, and violent");
            break;
            case code >= 85 && code < 87:
            //console.log("Snow showers slight and heavy");
            weatherDescription.push("Snow showers slight and heavy");
            break;
            case code === 95:
            //console.log("Thunderstorm: Slight or moderate");
            weatherDescription.push("Thunderstorm: Slight or moderate");
            break;
            case code >= 96 && code < 100:
            //console.log("Thunderstorm with slight and heavy hail");
            weatherDescription.push("Thunderstorm with slight and heavy hail");
            break;
            default:
                console.log("Unknown weather code");
            break;
        }
    }
    weatherTypeData.push(weatherDescription);
}

function makeWindSpeedData(rawData) {
    const windSpeed = rawData.hourly.windspeed_10m;
    const windDirection = rawData.hourly.winddirection_10m;
    //console.log(windSpeed);
    //console.log(windDirection);

    const currentHour = new Date().getHours();

    const windSpeedDatas = windSpeed.map((windSpeed, i) => ({
        windSpeed,
        windDirection: windDirection[i],
    }));
    //console.log(windSpeedDatas);

    if (windSpeedDatas && currentHour >= 0 && currentHour < windSpeedDatas.length) {
        const windSpeedDatasNow = windSpeedDatas[currentHour];
        //console.log(windSpeedDatasNow);

        windData.push(windSpeedDatasNow);
        } else {
        console.error("No data available for the current hour.");
    }
}

function makeSunData(rawData) {
    const sunRise = rawData.daily.sunrise;
    const sunSet = rawData.daily.sunset;

    const sunDatas = sunRise.map((sunRise, i) => ({
        sunRise,
        sunSet: sunSet[i],
    }));
    //console.log(sunDatas);
    sunData.push(sunDatas);
}

function makeDayData(rawData) {
    const temperature = rawData.hourly.temperature_2m;
    const weathercode = rawData.hourly.weathercode;
    const cloudcover = rawData.hourly.cloudcover;
    const visibility = rawData.hourly.visibility;
    const rain = rawData.hourly.rain;
    //console.log(temperature);
    //console.log(weathercode);
    //console.log(cloudcover);
    //console.log(visibility);
    //console.log(rain);

    const weatherDescription = [];
    //console.log(weatherDescription);
    for (const code of weathercode) {
        switch (true) {
            case code === 0:
            //console.log("Clear sky");
            weatherDescription.push("Clear sky");
            break;
            case code > 0 && code < 4: 
            //console.log("Mainly clear, partly cloudy, and overcast");
            weatherDescription.push("Mainly clear, partly cloudy, and overcast");
            break;
            case code >= 45 && code < 49:
            //console.log("Fog and depositing rime fog");
            weatherDescription.push("Fog and depositing rime fog");
            break;
            case code >= 51 && code < 56:
            //console.log("Drizzle: Light, moderate, and dense intensity");
            weatherDescription.push("Drizzle: Light, moderate, and dense intensity");
            break;
            case code >= 56 && code < 58:
            //console.log("Freezing Drizzle: Light and dense intensity");
            weatherDescription.push("Freezing Drizzle: Light and dense intensity");
            break;
            case code >= 61 && code < 66:
            //console.log("Rain: Slight, moderate and heavy intensity");
            weatherDescription.push("Rain: Slight, moderate and heavy intensity");
            break;
            case code >= 66 && code < 68:
            //console.log("Freezing Rain: Light and heavy intensity");
            weatherDescription.push("Freezing Rain: Light and heavy intensity");
            break;
            case code >= 71 && code < 76:
            //console.log("Snow fall: Slight, moderate, and heavy intensity");
            weatherDescription.push("Snow fall: Slight, moderate, and heavy intensity");
            break;
            case code === 77:
            //console.log("Snow grains");
            weatherDescription.push("Snow grains");
            break;
            case code >= 80 && code < 83:
            //console.log("Rain showers: Slight, moderate, and violent");
            weatherDescription.push("Rain showers: Slight, moderate, and violent");
            break;
            case code >= 85 && code < 87:
            //console.log("Snow showers slight and heavy");
            weatherDescription.push("Snow showers slight and heavy");
            break;
            case code === 95:
            //console.log("Thunderstorm: Slight or moderate");
            weatherDescription.push("Thunderstorm: Slight or moderate");
            break;
            case code >= 96 && code < 100:
            //console.log("Thunderstorm with slight and heavy hail");
            weatherDescription.push("Thunderstorm with slight and heavy hail");
            break;
            default:
                console.log("Unknown weather code");
            break;
        }
    }

    const dayDatas = temperature.map((temperature, i) => ({
        temperature,
        weathercode: weatherDescription[i],
        cloudcover: cloudcover[i],
        visibility: visibility[i],
        rain: rain[i],
    }));
    //console.log(dayDatas);

    dayData.push(dayDatas);

}

function makeWeekData(rawData) {
    const temperature = rawData.hourly.temperature_2m;
    const weatherCode = rawData.daily.weathercode;
    //console.log(temperature);
    //console.log(weatherCode);

    const weatherDescription = [];
    //console.log(weatherDescription);
    
    for (const code of weatherCode) {
        switch (true) {
            case code === 0:
            //console.log("Clear sky");
            weatherDescription.push("Clear sky");
            break;
            case code > 0 && code < 4: 
            //console.log("Mainly clear, partly cloudy, and overcast");
            weatherDescription.push("Mainly clear, partly cloudy, and overcast");
            break;
            case code >= 45 && code < 49:
            //console.log("Fog and depositing rime fog");
            weatherDescription.push("Fog and depositing rime fog");
            break;
            case code >= 51 && code < 56:
            //console.log("Drizzle: Light, moderate, and dense intensity");
            weatherDescription.push("Drizzle: Light, moderate, and dense intensity");
            break;
            case code >= 56 && code < 58:
            //console.log("Freezing Drizzle: Light and dense intensity");
            weatherDescription.push("Freezing Drizzle: Light and dense intensity");
            break;
            case code >= 61 && code < 66:
            //console.log("Rain: Slight, moderate and heavy intensity");
            weatherDescription.push("Rain: Slight, moderate and heavy intensity");
            break;
            case code >= 66 && code < 68:
            //console.log("Freezing Rain: Light and heavy intensity");
            weatherDescription.push("Freezing Rain: Light and heavy intensity");
            break;
            case code >= 71 && code < 76:
            //console.log("Snow fall: Slight, moderate, and heavy intensity");
            weatherDescription.push("Snow fall: Slight, moderate, and heavy intensity");
            break;
            case code === 77:
            //console.log("Snow grains");
            weatherDescription.push("Snow grains");
            break;
            case code >= 80 && code < 83:
            //console.log("Rain showers: Slight, moderate, and violent");
            weatherDescription.push("Rain showers: Slight, moderate, and violent");
            break;
            case code >= 85 && code < 87:
            //console.log("Snow showers slight and heavy");
            weatherDescription.push("Snow showers slight and heavy");
            break;
            case code === 95:
            //console.log("Thunderstorm: Slight or moderate");
            weatherDescription.push("Thunderstorm: Slight or moderate");
            break;
            case code >= 96 && code < 100:
            //console.log("Thunderstorm with slight and heavy hail");
            weatherDescription.push("Thunderstorm with slight and heavy hail");
            break;
            default:
                console.log("Unknown weather code");
            break;
        }
    }

    const dataPerDay = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hoursPerDay = 24; // Assuming there are 24 hours in a day

    // Find the current day of the week
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Reorganize daysOfWeek array to start with the current day
    const reorderedDaysOfWeek = [...daysOfWeek.slice(today), ...daysOfWeek.slice(0, today)];

    // Loop through the temperature data and calculate the average per day
    for (let day = 0; day < 7; day++) {
        const startIndex = day * hoursPerDay;
        const endIndex = startIndex + hoursPerDay;

        const dailyData = temperature.slice(startIndex, endIndex);
        const dailyAverage = dailyData.reduce((sum, temp) => sum + temp, 0) / hoursPerDay;

        dataPerDay.push({
            dayOfWeek: reorderedDaysOfWeek[day], // Convert day number to day of the week
            averageTemperature: dailyAverage.toFixed(2), // Round to 2 decimal places
            weatherCode: weatherDescription[day],
        });
    }
    //console.log(dataPerDay);
    weekData.push(dataPerDay);
}