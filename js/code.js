let weatherLocation = document.querySelector('.weather-location');
let weatherMeasure = document.querySelector('.measure');
let weatherType = document.querySelector('.weather-type');
let weatherDate = document.querySelector('.weather-date');

function convertToF(celsius) {
  let fahrenheit = (celsius * 1.8000) + (32);
  return fahrenheit;
}

function convertToC(fahrenheit) {
  let celsius = fahrenheit * (9 / 5) + (32);
  return celsius;
}

var getPosition = function(data) {
  // converter date
  let currentData = new Date(data.dt * 1000);
  day = ('0' + currentData.getDate()).slice(-2);
  month = ('0' + (currentData.getMonth() + 1)).slice(-2);
  year = currentData.getFullYear();

  weatherMeasure.innerHTML = data.main.temp;
  weatherLocation.innerHTML = data.name + ',' + data.sys.country;
  weatherDate.innerHTML = day + '/' + month + '/' + year;
  celsius = weatherMeasure.innerHTML;
  fahrenheit = convertToF(celsius);
  weatherF = convertToC(fahrenheit);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var posLatitude = position.coords.latitude;
    var posLongitude = position.coords.longitude;

    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" +
      posLatitude + "&lon=" + posLongitude +
      "&appid=5fb4f48349670d743ffb765da99e7262&units=metric";
    $.getJSON(url, getPosition, 'json');
  });
}

weatherType.addEventListener('click', function() {
  if (weatherType.innerHTML == "C") {
    weatherMeasure.innerHTML = fahrenheit;
    weatherType.innerHTML = "F";
  } else {
    weatherMeasure.innerHTML = celsius;
    weatherType.innerHTML = "C";
  }
});
