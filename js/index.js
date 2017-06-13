$(document).ready(function(){
 getLocation();
});

var lon = null;
var lat =  null;
var tempInCelsius = null;
var tempInFahrenheit = null;
var tempUnit = 0;

function getLocation() {
  if (navigator.geolocation) {      navigator.geolocation.getCurrentPosition(showPosition); }
}

function showPosition(position) {
lat= position.coords.latitude;
lon= position.coords.longitude;
callOpenWeatherMapAPI();
}
function changeTempeatureUnit(){
  if(tempUnit == 0){ $("#temperature").text(tempInFahrenheit);
$('button').text('°F');
tempUnit = 1;
  } else { $("#temperature").text(tempInCelsius);
$('button').text('°C');
tempUnit = 0;
  }
}
function callOpenWeatherMapAPI() {
var url ="https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=df2dd470c781c41603e19e0b2476470e";
$.getJSON(url,function(result){
$("#city").text(result.name);
tempInCelsius = Math.floor(result.main.temp-273.15);
tempInFahrenheit = Math.floor(result.main.temp*9/5 -459.67);    $("#temperature").text(tempInCelsius);
$("#description").text(result.weather[0].main);
var imageUrl =  "http://openweathermap.org/img/w/"+result.weather[0].icon+".png";
document.getElementById("myImage").src = imageUrl;
});
}
