export function DisplayTemperature(currentTempData, displayElement) {
  // find dom elemenent
  const myApp = document.getElementById(displayElement);

  myApp.innerHTML = "";

  let myTempHtml = "";
  myTempHtml = `<h2>${currentTempData.tempData.temperature} °C</h2>`;

  myApp.innerHTML = myTempHtml;
}
export function DisplayWind(currentWindData, displayElement) {
  const Mywind = document.getElementById(displayElement);

  let windSpeedHTML = `<h2>${currentWindData.windData.windSpeed}</h2>`;
  let windDiretionHTML = `<h2>${currentWindData.windData.windDirection}</h2>`;
  Mywind.innerHTML = windSpeedHTML + windDiretionHTML;
}

export function DisplayWeatherType(currentWeatherType, displayElement) {
  const myApp = document.getElementById(displayElement);

  myApp.innerHTML = "";

  let myWeatherTypeHtml = "";

  myWeatherTypeHtml = `<i>${currentWeatherType.weatherType[0]}</i>`;

  myApp.innerHTML = myWeatherTypeHtml;
}

export function DisplaySunset(currentSunset, displayElement) {
  const MYSunSet = document.getElementById(displayElement);

  let sunRiseHTML = `<h2>${currentSunset.sunData[0].sunrise}</h2>`;
  let sunSetHTML = `<h3>${currentSunset.sunData[0].sunset}</h3>`;
  MYSunSet.innerHTML = sunRiseHTML + sunSetHTML;
}
const yeet = document.querySelectorAll(".box1");

yeet.forEach((element) => {
  const weatherText = element.querySelector(".weather-text");

  // Hide the text when the page loads
  weatherText.style.display = "none"; // Hide the text

  element.addEventListener("mousedown", () => {
    // Toggle the "origin" class on click
    element.classList.toggle("origin");

    if (element.classList.contains("origin")) {
      weatherText.style.display = "block"; // Show the text
    } else {
      weatherText.style.display = "none"; // Hide the text
    }
  });
});
