let weatherType = document.querySelector('.weather-type');
let weatherMeasure = document.querySelector('.measure');
let celsius = weatherMeasure.innerHTML;
let fahrenheit = convertToF(celsius);

function convertToF(celsius) {
  wheaterF = celsius * (9/5) + (32);
  return wheaterF;
}

weatherType.addEventListener('click', function(){
  weatherMeasure.innerHTML = convertToF(celsius);
  weatherType.innerHTML = "F";
});
