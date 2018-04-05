/***** Weather Functions *****/

/* Main Variables */
const API_Key = "3cf57a22513b0540441a6fe9628f1130";
var lat, lon, h;

/* Getting Geolocation */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition);
  console.log("Geolocation is supported!");
 } else {
  alert("HTML5 Geolocation is not supported in this browser.");
}

/* Weather based on Country Position (lat, lon) */
function getPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+API_Key+"&units=metric";
  /* Get all the information needed for the weather features */
  $.getJSON(api, function(data) {
    $("#humidity").html(data.main.humidity + " %");
    $("#wind").html(data.wind.speed + " km/h");
    $("#temp").html(data.main.temp + " C <sup> o</sup");
    $("#min-temp").html(data.main.temp_min + " C <sup> o</sup");
    $("#max-temp").html(data.main.temp_max + " C <sup> o</sup");
    $("#w-description").html(data.weather[0].main + ", " + data.weather[0].description);
    $("#country-info").html(data.name + ", " + data.sys.country);

    /* Weather Icon Cases */
    switch (data.weather[0].description) {
      case "clear sky": 
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-sunny\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-clear\"></i>")
        };
        break;

      case "few clouds":
      case "broken clouds":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-cloudy\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-cloudy\"></i>")
        };
        break;

      case "scattered clouds":
        $("#weather-icon").html("<i class=\"wi wi-cloudy\"></i>");
        break;

      case "shower rain":
      case "light rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-showers\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-showers\"></i>")
        };
        break;
      
      case "rain":
      case "very heavy rain":
      case "extreme rain":
      case "light intensity shower rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-rain\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-rain\"></i>")
        };
        break;

      case "thunderstorm":
      case "heavy thunderstorm":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-thunderstorm\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-thunderstorm\"></i>")
        };
        break;

      case "snow":
      case "light snow":
      case "heavy snow":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-snow\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-snow\"></i>")
        };
        break;

      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-rain-mix\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-rain-mix\"></i>")
        };
        break;

      case "mist":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-fog\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-fog\"></i>")
        };
        break;

      case "thunderstorm with light rain":
      case "thunderstorm with rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-storm-showers\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-storm-showers\"></i>")
        };
        break;

      default:
        $("#weather-icon").html("<i class=\"wi wi-alien\"></i>");
        break;
    }
  });
}


/* Temperature Type Conversion */

function toC() {
  $("#c-temp").prop("disabled", true);
  $("#c-temp").css("color", "#fff");
  $("#c-temp").css("cursor", "default");
  $("#t-temp").prop("disabled", false);
  $("#t-temp").css("color", "#1488cc");
  $("#t-temp").css("cursor", "pointer");
  $("#temp").html(Math.round((parseInt($("#temp").text()) - 32)/ 1.8).toFixed(1) + "<sup>o</sup>");
}

function toF() {
  $("#t-temp").prop("disabled", true);
  $("#t-temp").css("color", "#fff");
  $("#t-temp").css("cursor", "default");
  $("#c-temp").prop("disabled", false);
  $("#c-temp").css("color", "#1488cc");
  $("#c-temp").css("cursor", "pointer");
  $("#temp").html(((parseInt($("#temp").text()) * 1.8) + 32).toFixed(1) + "<sup>o</sup>");
}

/***** Date and Time Functions *****/

/* Time */

/* Checks if the Time Minutes and Seconds are less or bigger than 10, adds 0 before a 1 digit number */
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

/* Time Function */
function liveTime() {
  /* Creating a Date Obj */
  var time = new Date();
  /* Get Hours, Minutes and Seconds */
  h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();
  /* Minutes and Seconds checkTime Function */
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  /* Output the Time */
  document.getElementById('t-time').innerHTML = h + ":" + m + ":" + s;
  /* Update interval of the Time (Updates the Time only with refresh without this Timeout check ) */
  t = setTimeout(function() {
    liveTime()
    }, 1000);
}
liveTime();

/* Date */

/* Checks if the Day's number is less or bigger than 10, adds 0 before a 1 digit number */
function checkDate(i) {
  if (i < 10) {
  i = "0" + i;
  }
  return i;
}

function todayDate() {
  /* Creating a Date Obj */
  var date = new Date();
  /* Get Day, Month and Year */
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  /* Day number checkTime Function */
  day = checkDate(day);

  /* Month Array */
  var monthArr = new Array();
      monthArr[0] = "Jan";
      monthArr[1] = "Feb";
      monthArr[2] = "Mar";
      monthArr[3] = "Apr";
      monthArr[4] = "May";
      monthArr[5] = "Jun";
      monthArr[6] = "Jul";
      monthArr[7] = "Aug";
      monthArr[8] = "Sep";
      monthArr[9] = "Oct";
      monthArr[10] = "Nov";
      monthArr[11] = "Dec";
  var getMonthArr = monthArr[month];

  /* Output the Date */
  document.getElementById('date-day').innerHTML = day;
  document.getElementById('date-month').innerHTML = getMonthArr;
  document.getElementById('date-year').innerHTML = year;
}
todayDate();

/***** Search Autocomplete *****/

/* Search Input Field */
var input = document.getElementById('place-search');
/* Search Autocomplete Feature */
var autocomplete = new google.maps.places.Autocomplete(input);
/* Weather based on Country Name (from Search) */
function placeSearch() {
  var x = document.getElementById("place-search").value;
  document.getElementById("country-info").innerHTML = x;
  var api = "https://api.openweathermap.org/data/2.5/weather?q="+x+"&APPID="+API_Key+"&units=metric";
  /* Get all the information needed for the weather features */
  $.getJSON(api, function(data) {
    $("#humidity").html(data.main.humidity + " %");
    $("#wind").html(data.wind.speed + " km/h");
    $("#temp").html(data.main.temp + " C <sup> o</sup");
    $("#min-temp").html(data.main.temp_min + " C <sup> o</sup");
    $("#max-temp").html(data.main.temp_max + " C <sup> o</sup");
    $("#w-description").html(data.weather[0].main + ", " + data.weather[0].description);
    $("#country-info").html(data.name + ", " + data.sys.country);

    /* Weather Icon Cases */
    switch (data.weather[0].description) {
      case "clear sky": 
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-sunny\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-clear\"></i>")
        };
        break;

      case "few clouds":
      case "broken clouds":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-cloudy\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-cloudy\"></i>")
        };
        break;

      case "scattered clouds":
        $("#weather-icon").html("<i class=\"wi wi-cloudy\"></i>");
        break;

      case "shower rain":
      case "light rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-showers\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-showers\"></i>")
        };
        break;
      
      case "rain":
      case "very heavy rain":
      case "extreme rain":
      case "light intensity shower rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-rain\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-rain\"></i>")
        };
        break;

      case "thunderstorm":
      case "heavy thunderstorm":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-thunderstorm\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-thunderstorm\"></i>")
        };
        break;

      case "snow":
      case "light snow":
      case "heavy snow":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-snow\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-snow\"></i>")
        };
        break;

      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-rain-mix\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-alt-rain-mix\"></i>")
        };
        break;

      case "mist":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-fog\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-fog\"></i>")
        };
        break;

      case "thunderstorm with light rain":
      case "thunderstorm with rain":
        if(h < 20) {
          $("#weather-icon").html("<i class=\"wi wi-day-storm-showers\"></i>")
        } else {
          $("#weather-icon").html("<i class=\"wi wi-night-storm-showers\"></i>")
        };
        break;

      default:
        $("#weather-icon").html("<i class=\"wi wi-alien\"></i>");
        break;
    }
  });
}