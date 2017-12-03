var menuBtn = document.getElementById("menu-btn");
var menu = document.getElementById("menu");

menuBtn.addEventListener("click", openCloseMenu);

function openCloseMenu(){
    
    if(menu.style.display === "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";    
    }

}
var aboutEl = document.getElementById("about");
var aboutBtn = document.getElementById("about-btn");
var backBtn = document.getElementById("back-btn");

aboutBtn.addEventListener("click", function(){
    aboutEl.style.display = "block";
});

backBtn.addEventListener("click", function(){
    aboutEl.style.display = "none";
    menu.style.display = "none";
});

var icons = {
    "sun": "img/clear-sun.png",
    "cloud": "img/cloudy-weather-symbol-outline-of-two-clouds.png",
    "rain": "img/rainy-day.png",
    "snow": "img/snowflake.png",
    "mist": "img/mist.png"
};

var imgs = {
    "rain": "img/rain.jpg",
    "clouds": "img/wolken.jpg",
    "clear": "img/clear.jpg",
    "snow": "img/snow.jpg",
    "mist": "img/mist.jpg"
}

//HTML Geolocation

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    weather(lat, lon);
};


function weather(lat, lon){
    
    var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=8967d7e4b373466a8ed2781881bf5d02&units=metric";
    
    //Getting current weather
    var currentWeatherRequest = new XMLHttpRequest();
    currentWeatherRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);
            var loc = data.name;
            var country = data.sys.country;
            var temp = Math.round(data.main.temp);
            var info = data.weather[0].main;
            appendToHtml(loc, country, temp, info);
            
        }
    };
    
    currentWeatherRequest.open("GET", api);
    currentWeatherRequest.send();
};

function appendToHtml(loc, country, temp, info){
    
    var locId = document.getElementById("location");
    var tempId = document.getElementById("temperature");
    var infoId = document.getElementById("info");
    
    //Appending data 
    locId.textContent = loc + ", " + country;
    tempId.textContent= temp + "°";
    infoId.textContent = info;
    
    //Weather icons
    var weatherIcon = document.getElementById("weather-icon");
    var mainEl = document.querySelector("main");
    var vidEl = document.getElementById("vid");
    //Check weather conditions
    switch(info){
            
        case "Rain":
            weatherIcon.src = icons.rain;
            mainEl.style.backgroundImage = "url("+imgs.rain+")";
            break;
        case "Clouds":
            weatherIcon.src = icons.cloud;
            mainEl.style.backgroundImage = "url("+imgs.clouds+")";
            break;
        case "Clear":
            weatherIcon.src = icons.sun;
            mainEl.style.backgroundImage = "url("+imgs.clear+")";
            break;
        case "Snow":
            weatherIcon.src = icons.snow;
            mainEl.style.backgroundImage = "url("+imgs.snow+")";
            break;
        case "Mist":
            weatherIcon.src = icons.mist;
            mainEl.style.backgroundImage = "url("+imgs.mist+")";
            break;
        case "Sun":
            weatherIcon.src = icons.sun;
            mainEl.style.backgroundImage = "url("+imgs.clear+")";
    }
     
}

weather();
getLocation();
showPosition();
