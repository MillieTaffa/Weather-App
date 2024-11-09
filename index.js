//injecting JS into inner html

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#location");


    cityElement.innerHTML = response.data.city
    temperatureElement.innerHTML = Math.round(temperature)

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