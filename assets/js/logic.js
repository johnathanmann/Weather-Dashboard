// Display current date and time
var update = function() {
    document.getElementById("datetime").innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
}
setInterval(update, 1000);

// Display current date on weather card
document.getElementById("date").innerHTML = moment().format("MMM Do YY");  

// Displays saved data on load
document.addEventListener("DOMContentLoaded", function() {
    var saved = localStorage.getItem('list');
    if (saved) {
      list.innerHTML = saved;
  };
});




// API key for the OpenWeatherMap API
var apiKey = "711c083a0e9e1df7f231968de1c91191";

// Save search history
var list = document.getElementById('searchHistory');
var searchBtn = $('#searchBtn');

searchBtn.click(function () {

    var userSearch = document.querySelector("#userSearch").value;
    localStorage.setItem('userSearch', (userSearch));

    // Only adds to search history if something is actually inputted
    if(userSearch){
        // Adds and removes classes to display the correct card
        $('#searchPrompt').addClass('hidden');
        $('#searchPrompt').removeClass('display');
        $('#cityDisplay').addClass('display');
        $('#cityDisplay').removeClass('hidden');
        addSearchHistory();
        console.log(userSearch);        
    }

  // Saves search to search history
    function addSearchHistory (){
      var ol = document.getElementById("searchHistory");
      var li = document.createElement("li");
      txtNode = document.createTextNode(localStorage.getItem('userSearch'));
      li.appendChild(txtNode);
      ol.appendChild(li);
      localStorage.setItem('list', list.innerHTML);
    }

    // Find current weather information
var weatherIcon = document.querySelector('#weatherIcon');
var cityName = document.querySelector('#cityName');
var currentTemp = document.querySelector('#currentTemp')
var humidity = document.querySelector('#humidity');
var wind = document.querySelector('#wind');
var uv = document.querySelector('#uv');

    // Variables for current weather  
var userSearch = $("#userSearch").val();
var urlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&Appid=" + apiKey + "&units=imperial";
var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&Appid=" + apiKey + "&units=imperial";
console.log(urlToday);
  
  $.ajax({
    url: urlToday,
    method: "GET"
}).then(function(response){
    console.log(response);
    cityName.innerHTML = response.name;
    currentTemp.innerHTML = response.main.temp + "&deg;F";
    humidity.innerHTML = response.main.humidity + "%";
    wind.innerHTML = response.wind.speed + " MPH";
});


});  

// Clears localStorage on click
function clearData () {
    window.localStorage.clear();
    window.location.reload();
};