//injecting JS into inner html

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#location");
    let descriptionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector(".weather-app-icon");

    cityElement.innerHTML = response.data.city
    temperatureElement.innerHTML = Math.round(temperature)
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date)

     let condition = response.data.condition.description.toLowerCase();

    if (condition.includes("cloud")) {
        iconElement.src = "src/cloudy-icon.png";
    } else if (condition.includes("rain")) {
        iconElement.src = "src/rainy-icon.png";
    } else if (condition.includes("sun")) {
        iconElement.src = "src/sun-icon.png";
    } else {
        iconElement.src = "src/sun-icon.png";
    }
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekdays[date.getDay()]

    if (minutes < 0) {
        minutes=`0${minutes}`
    }

    return `${day}, ${hours}:${minutes}`
}

function searchCity(city) {
    let apiKey = "a1f90bc0bf23da8c35fe325tob5f8845";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=a1f90bc0bf23da8c35fe325tob5f8845`;
    axios.get(apiUrl).then(refreshWeather)
}

function returnResult(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value)
}

let searchFormat = document.querySelector("#search-panel");
searchFormat.addEventListener("submit", returnResult)

//Individual day forecast

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Tues", "Wed", "Thursday", "Friday", "Saturday"];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml =forecastHtml+ `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div> 
                <div class="weather-forecast-icon">⛅</div> 
                <div class="weather-forecast-temperature">
                    <div class="weather-forecast-temp"><b>15°</b></div> 
                    <div class="weather-forecast-temp">9°</div> 
                </div> 
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHtml;
}

displayForecast();
