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

// Save search history
var list = document.getElementById('searchHistory');
var searchBtn = $('#searchBtn');

// Displays weather on searchBtn click and adds city's to search history
searchBtn.click(function () {
    // Grab user input
    var userSearch = document.querySelector("#userSearch").value;
    localStorage.setItem('userSearch', (userSearch));

    // Only adds to search history if something is actually inputted
    if(userSearch){
        // Adds and removes classes to display the correct card
        addSearchHistory();
        console.log(userSearch);        
    }
  // Saves search to search history
    function addSearchHistory (){
      var li = $("<li class='pastCity' >" + userSearch + "</li>");
      $('#searchHistory').append(li);
      localStorage.setItem('list', list.innerHTML);
    }
    

    requestWeather();
    
// Search btn listen
});

// Clears localStorage on click
function clearData () {
    window.localStorage.clear();
    window.location.reload();
};

// Function that finds and displays weather
function requestWeather(){
// API key for the OpenWeatherMap API
var apiKey = "711c083a0e9e1df7f231968de1c91191";

    // Find current weather information display locations
var weatherIcon = document.querySelector('#weatherIcon');
var cityName = document.querySelector('#cityName');
var currentTemp = document.querySelector('#currentTemp')
var humidity = document.querySelector('#humidity');
var wind = document.querySelector('#wind');
var uv = document.querySelector('#uv');

    // Variables for current weather  
var clearSearch = $("#userSearch");
var userSearch = $("#userSearch").val();
var urlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&Appid=" + apiKey + "&units=imperial";
console.log(urlToday);
  
// This AJAX call gets all of the information for the city and displays it
        $.ajax({
            url: urlToday,
            method: "GET"
        }).then(function(response){
            // Displays current weather forecast card and hides current city card
            $('#searchPrompt').addClass('hidden');
            $('#searchPrompt').removeClass('display');
            $('#cityDisplay').addClass('display');
            $('#cityDisplay').removeClass('hidden');
            clearSearch.value = "";
            cityName.innerHTML = response.name;
            currentTemp.innerHTML = response.main.temp + "&deg;F";
            humidity.innerHTML = response.main.humidity + "%";
            wind.innerHTML = response.wind.speed + " MPH";
            var weather = 'https://openweathermap.org/img/w/'+ response.weather[0].icon + '.png';
            weatherIcon.src = weather;
            // The following AJAX call will find the UV index for the current day
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(response){
                console.log(uvUrl);
                uv.innerHTML = response.value;
                if(response.value <= 15){
                    uv.style.backgroundColor = "#d15e5e";
                };
                if(response.value <= 10){
                    uv.style.backgroundColor = "#e68549";
                };
                if(response.value <= 5){
                    uv.style.backgroundColor = "#a5db9c";
                };
            // Create forecast header on search
            var forecastTitle = $("<h1 class='p-4' >5 Day Forecast</h1>")
            $('#forecastHeader').append(forecastTitle);
            }); 

        // 5 day forecast
        var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + apiKey + "&lat=" + lat +  "&lon=" + lon;
        // Find and print forecast
        $.ajax({
            url: urlForecast,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {;
                // Create cards
                var forecastColumn = $("<div class='col-lg col-12 col-md-6'>");
                var forecastDiv = $("<div class='card forecastCard m-1 mb-4'>");
                var forecastCard = $("<div class='card-body pb-2'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='mb-0'>");
                var forecastHumid = $("<p class='mb-0'>");
                var forecastWind = $("<p class='mb-0'>");
                // Find dates
                var forecastDateValue = moment(response.list[i].dt_txt).format("L")
                // Add card to page
                $('#forecast').append(forecastColumn);
                forecastColumn.append(forecastDiv);
                forecastDiv.append(forecastCard);
                // Find values
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", "Icon of " + response.list[i].weather[0].main)
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumid.text(response.list[i].main.humidity);
                forecastHumid.prepend("Humidity: ");
                forecastHumid.append("%"); 
                forecastWind.text(response.list[i].wind.speed);
                forecastWind.prepend("Wind: ");
                forecastWind.append(" MPH"); 
                // Add value to the cards
                forecastCard.append(forecastDate);
                forecastCard.append(forecastIcon);
                forecastCard.append(forecastTemp);
                forecastCard.append(forecastHumid);
                forecastCard.append(forecastWind);
                forecastDate.text(forecastDateValue);
            }
        });
        // If city name is invalid the card displayed will not change
        }).catch( function() {
            $('#searchPrompt').addClass('display');
            $('#cityDisplay').removeClass('display');
            $('#cityDisplay').addClass('hidden');
            console.log("Invalid city name");
          } );
};