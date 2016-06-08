let urlLocationIp = 'http://ip-api.com/json/';  // get location for ip
let confs = {};
let weatherLocation = document.querySelector('.weather-location');
let weatherMeasure = document.querySelector('.measure');
let weatherType = document.querySelector('.weather-type');
let weatherDate = document.querySelector('.weather-date');

// init values
confs.celsius = 0;
confs.fahrenheit = 0;

function getLocation(data) {
    confs.posLat = data.lat;
    confs.posLong = data.lon;
    confs.city = data.city;
    confs.regionName = data.region;
    confs.country = data.countryCode;
    confs.url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + confs.posLat + '&lon=' + confs.posLong + '&appid=5fb4f48349670d743ffb765da99e7262&units=metric';
    getWeather(confs.url);
}

if (navigator.geolocation) {
    fetch(urlLocationIp, {
        method: 'get'
    }).then(function(response) {
        response.json().then(function(result) {
            getLocation(result);
        })
    }).catch(function(err) {
        console.error(err);
    });
} else {
    console.log("Your Browser not supported geolocation api. Atualiza ele MANO!");
}

function getWeather(url) {
    fetch(url, {
        method: 'get'
    }).then(function(response) {
        response.json().then(function(result) {
            getResult(result);
        })
    }).catch(function(err) {
        console.error(err);
    });
}

function getResult(weather) {
    weatherMeasure.innerHTML = weather.main.temp;
    weatherLocation.innerHTML = weather.name + ' - ' + confs.regionName + ' / ' + confs.country;
    confs.celsius = weatherMeasure.innerHTML;
    confs.fahrenheit = convertToF(confs.celsius);
}

function convertToF(celsius) {
    let fahrenheit = (celsius * 1.8000) + (32);
    return fahrenheit;
}

function convertToC(fahrenheit) {
    let celsius = fahrenheit * (9 / 5) + (32);
    return celsius;
}

weatherType.addEventListener('click', function() {
    if (weatherType.innerHTML === "C") {
        weatherMeasure.innerHTML = confs.fahrenheit;
        weatherType.innerHTML = "F";
    } else {
        weatherMeasure.innerHTML = confs.celsius;
        weatherType.innerHTML = "C";
    }
});
