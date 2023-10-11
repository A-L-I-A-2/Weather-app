export function DisplayTemperature(currentTempData, displayElement) {

    console.log(currentTempData.tempData.temperature);
    

    // find dom elemenent
    const myApp = document.getElementById(displayElement);

    myApp.innerHTML = "";

    let myTempHtml = "";
    myTempHtml =`<h2>Temperature: ${currentTempData.tempData.temperature} °C</h2>`;

    myApp.innerHTML = myTempHtml;
} 

export function DisplayWeatherType(currentWeatherType, displayElement) {
    // console.log(currentWeatherType.weatherType[0]);

    // target element
    const targetElement = document.getElementById(displayElement);

    // clear html
    targetElement.innerHTML = "";

    let myWeatherTypeHtml = "";

    // defining weather icon variables
    let clear = `<i class="fa-regular fa-sun iconSize"></i>`;
    let mainlyClear = `<i class="fa-solid fa-cloud-sun iconSize"></i>`;
    let fog = `<i class="fa-solid fa-smog iconSize"></i>`;
    let droplets = `<i class="fa-solid fa-droplet iconSize"></i>`;
    let rain = `<i class="fa-solid fa-cloud-rain iconSize"></i>`;
    let snow = `<i class="fa-regular fa-snowflake iconSize"></i>`;
    let rainShower = `<i class="fa-solid fa-cloud-showers-heavy iconSize"></i>`;
    let thunder = `<i class="fa-solid fa-bolt-lightning iconSize"></i>`;
    let noData = `<i class="fa-solid fa-circle-xmark iconSize"></i>`;


    // writing html with switch
    switch (currentWeatherType.weatherType[0]) {
        case 'Clear sky':
            myWeatherTypeHtml = `${clear}`;
            break;
        case 'Mainly clear, partly cloudy, and overcast':
            myWeatherTypeHtml = `${mainlyClear}`;
            break;
        case 'Fog and depositing rime fog':
            myWeatherTypeHtml = `${fog}`;
            break;
        case 'Drizzle: Light, moderate, and dense intensity':
            myWeatherTypeHtml = `${droplets}`;
            break;
        case 'Freezing Drizzle: Light and dense intensity':
            myWeatherTypeHtml = `${droplets}`;
            break;
        case 'Rain: Slight, moderate and heavy intensity':
            myWeatherTypeHtml = `${rain}`;
            break;
        case 'Freezing Rain: Light and heavy intensity':
            myWeatherTypeHtml = `${rain}`;
            break;
        case 'Snow fall: Slight, moderate, and heavy intensity':
            myWeatherTypeHtml = `${snow}`;
            break;
        case 'Snow grains':
            myWeatherTypeHtml = `${snow}`;
            break;
        case 'Rain showers: Slight, moderate, and violent':
            myWeatherTypeHtml = `${rainShower}`;
            break;
        case 'Snow showers slight and heavy':
            myWeatherTypeHtml = `${snow}`;
            break;
        case 'Thunderstorm: Slight or moderate':
            myWeatherTypeHtml = `${thunder}`;
            break;
        case 'Thunderstorm with slight and heavy hail':
            myWeatherTypeHtml = `${thunder}`;
            break;
        default:
            myWeatherTypeHtml = `${noData}`;
            break;
    }
    
    targetElement.innerHTML = `<div class="weather" onclick="window._viewCallbacks.weatherClick('${currentWeatherType.weatherType}')">${myWeatherTypeHtml}</div>`;

    /* targetElement.addEventListener('click', ( event ) => {
        console.log(currentWeatherType.weatherType[0]);
    }); */
}

export function DisplaySunset(currentSunset, displayElement) {
    console.log(currentSunset.sunData[0]);
    
}

export function DisplayWind(currentWindData, displayElement) {
    console.log(currentWindData.windData);

    const myApp = document.getElementById(displayElement);
}

export function DisplayWeatherTypeOnly(weatherTypes, displayElement) {
    console.log(weatherTypes);

    const targetElement = document.getElementById(displayElement);

    targetElement.innerHTML = "";

    let myWeatherTypeHtml = "";

    // defining weather icon variables
    let clear = `<i class="fa-regular fa-sun iconSize"></i>`;
    let clearText = `<p>Klar himmel</p>`;
    let mainlyClear = `<i class="fa-solid fa-cloud-sun iconSize"></i>`;
    let mainlyClearText = `<p>Skyet</p>`;
    let fog = `<i class="fa-solid fa-smog iconSize"></i>`;
    let fogText = `<p>Tåget</p>`;
    let droplets = `<i class="fa-solid fa-droplet iconSize"></i>`;
    let dropletsText = `<p>Småregn</p>`;
    let rain = `<i class="fa-solid fa-cloud-rain iconSize"></i>`;
    let rainText = `<p>Regnvejr</p>`;
    let snow = `<i class="fa-regular fa-snowflake iconSize"></i>`;
    let snowText = `<p>Snevejr</p>`;
    let rainShower = `<i class="fa-solid fa-cloud-showers-heavy iconSize"></i>`;
    let rainShowerText = `<p>Skybrud</p>`;
    let thunder = `<i class="fa-solid fa-bolt-lightning iconSize"></i>`;
    let thunderText = `<p>Tordenvejr</p>`;
    let noData = `<i class="fa-solid fa-circle-xmark iconSize"></i>`;
    let noDataText = `<p>Ingen data</p>`;

    myWeatherTypeHtml = `<div>${clear}${clearText}</div><div>${mainlyClear}${mainlyClearText}</div><div>${fog}${fogText}</div><div>${droplets}${dropletsText}</div><div>${rain}${rainText}</div><div>${snow}${snowText}</div><div>${rainShower}${rainShowerText}</div><div>${thunder}${thunderText}</div><div>${noData}${noDataText}</div>`;

    targetElement.innerHTML = `<div class="weatherExpand" onclick="window._viewCallbacks.returnClick('return')">${myWeatherTypeHtml}</div>`;

}