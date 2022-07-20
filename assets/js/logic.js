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

searchBtn.click(function () {
    var userSearch = document.querySelector("#userSearch").value;
    localStorage.setItem('userSearch', (userSearch));

    // Only adds to search history if something is actually inputted
    if(userSearch){
        addSearchHistory();
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
  
});

function clearData () {
    window.localStorage.clear();
    window.location.reload();
};