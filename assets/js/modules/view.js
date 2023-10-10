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
    console.log(currentWeatherType.weatherType[0]);
    const myApp = document.getElementById(displayElement);

    myApp.innerHTML = "";

    let myWeatherTypeHtml = "";

    myWeatherTypeHtml = `<i>${currentWeatherType.weatherType[0]}</i>`;

    myApp.innerHTML = myWeatherTypeHtml;
}

export function DisplaySunset(currentSunset, displayElement) {
    console.log(currentSunset.sunData[0]);
    
}

export function DisplayWind(currentWindData, displayElement) {
    console.log(currentWindData.windData);

    const myApp = document.getElementById(displayElement);
}