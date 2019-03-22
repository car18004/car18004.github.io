// Weather Site JavaScript Functions

// Calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;
    console.log(wc);
    wc = "Feels like " + wc + "°F";
   return wc;
}

// Wind Dial Function
function windDial(direction) {
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

const weather = getCondition("rain");
function getCondition(phrase){
    let input=phrase;
    switch (input) {
        case "cloudy":
        case "partly cloudy":
        case "Cloudy":
        case "Partly Cloudy":
            input = "cloudy";
            break;
        case "clear":
        case "sunny":
        case "Clear":
        case "Sunny":
            input = "clear";
            break;
        case "rainy":
        case "Rainy":
        case "rain":
        case "Rain":
        case "Thunderstorms":
            input = "rainy";
            break;
        case "fog":
        case "Foggy":
        case "mist":
        case "Misty":
            input = "foggy";
            break;
        case "snow":
        case "snowy":
        case "Snow":
        case "Snowy":
            input = "snowy";
            break;
    }
    console.log(input);
    return input;
}

function changeSummaryImage(weather){
    const weatherImages = weather;
    let weatherImage = document.getElementById("cur-weather");
    let weatherSmallImage = document.getElementById('weatherImage');
    switch (weather){
        case "cloudy":
            weatherImage.setAttribute("class", "cloudy");
            weatherSmallImage.setAttribute("class", "cloud-small");
            break;
        case "clear":
            weatherImage.setAttribute("class", "clear");
            weatherSmallImage.setAttribute("class", "clear-small");
            break;
        case "rainy":
            weatherImage.setAttribute("class", "rainy");
            weatherSmallImage.setAttribute("class", "rain-small");
            break;
        case "foggy":
            weatherImage.setAttribute("class", "foggy");
            weatherSmallImage.setAttribute("class", "fog-small");
            break;
        case "snowy":
            weatherImage.setAttribute("class", "snowy");
            weatherSmallImage.setAttribute("class", "snow-small");
            break;
    }
}
changeSummaryImage(weather);

let meters = document.getElementById("elevation").innerText;
elevation.innerHTML = convertMeters(meters);
function convertMeters(meters){
    let feet = 0;
    return feet = Math.floor(meters * 3.28);
}

// Convert, Format time to 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '°F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li> | ' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '°F </li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}

var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - car18004@byui.edu"
    }
};

var storage = window.localStorage;

//Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('Json object from getLocation function:');
            console.log(data);
            // Store data to localstorage 
            storage.setItem("locName", data.properties.relativeLocation.properties.city);
            storage.setItem("locState", data.properties.relativeLocation.properties.state);

            let stationsURL = data.properties.observationStations;
            getStationId(stationsURL);
            let hourlyURL = data.properties.forecastHourly;
            getHourly(hourlyURL);
            let forecastURL = data.properties.forecast;
            getForecast(forecastURL);

        })
        .catch(error => console.log('There was a getLocation error: ', error))
} 

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
    fetch(stationsURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getStationId function:');
            console.log(data);

            // Store station ID and elevation (in meters - will need to be converted to feet) 
            let stationId = data.features[0].properties.stationIdentifier;
            let stationElevation = data.features[0].properties.elevation.value;
            console.log('Station and Elevation are: ' + stationId, stationElevation);

            // Store data to localstorage 
            storage.setItem("stationId", stationId);
            storage.setItem("stationElevation", stationElevation);

            // Request the Current Weather for this station 
            getWeather(stationId);
        })
        .catch(error => console.log('There was a getStationId error: ', error))
}


// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('From getWeather function:');
            console.log(data);

            // Store weather information to localStorage 
                let textDescription = data.properties.textDescription;
                let windGust = data.properties.windGust.value;

                storage.setItem("textDescription", textDescription);
                storage.setItem("windGust", windGust);
        })
        .catch(error => console.log('There was a getWeather error: ', error))
}

// Get next 12 hours of forecast data from API
function getHourly(hourlyURL) {
    fetch(hourlyURL, idHeader)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function(data){
            console.log("Obj from get Hourly function")
            console.log(data)
            //store hourly info
            let hourly = [];
            for (let i =0; i < 13; i++ ){
                hourly[i] = data.properties.periods[i].temperature;
            }
            //get winddirection
            let windSpeed = data.properties.periods[0].windSpeed;
            let windDirection = data.properties.periods[0].windDirection;
            let temperature = data.properties.periods[0].temperature;
            //local storage
            storage.setItem("hourly", hourly);
            storage.setItem("windDirection", windDirection);
            storage.setItem("windSpeed", windSpeed);
            storage.setItem("temperature", temperature);
        })
        .catch(error => console.log('There was an error: ', error))
} 

function getForecast(forecastURL){
    fetch(forecastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
                console.log('Json object from getForecast function:');
                console.log(data);

                 let high = data.properties.periods[0].temperature;
                 let low = data.properties.periods[1].temperature;
                 //local storage
                 storage.setItem("high", high);
                 storage.setItem("low", low);  
        })
}
buildPage();

function buildPage() {
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    let pageTitle = document.getElementById('pageTitle');
    let fullName = storage.getItem("locName") + ", " + storage.getItem("locState");
    let fullNameNode = document.createTextNode(fullName);

    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    document.getElementById('location').innerHTML = fullName;
    // Task 2 - Populate location information
    let se = storage.getItem("stationElevation");
    let elevation = convertMeters(se);
    document.getElementById("elevation").innerHTML = elevation;
    console.log("Elevation in feet: " + elevation);

    let lat = storage.getItem("Latitude");
    let long = storage.getItem("Longitude");
    lat = Math.round(lat * 100) / 100;
    long = Math.round(long * 100) / 100;
    document.getElementById("latlong").innerHTML = lat + "°, " + long + "°"
    // Task 3 - Populate weather information

    let current = storage.getItem("temperature");
    document.getElementById("current").innerHTML = current + "°F";

    let high = storage.getItem("high");
    document.getElementById("high").innerHTML = high + "°F";

    let low = storage.getItem("low");
    document.getElementById("low").innerHTML = low + "°F";

    let windSpeed = storage.getItem("windSpeed");
    document.getElementById("mph").innerHTML = windSpeed;

    let windDirection = storage.getItem("windDirection");
    document.getElementById("wind_direction").innerHTML = windDirection;

    windDial(windDirection);

    let ws = windSpeed.charAt(0);
    let feelsLike = buildWC(ws, current);
    document.getElementById("feelTemp").innerHTML = feelsLike;

    let textDescription = storage.getItem("textDescription");
    document.getElementById("summary_title").innerHTML = textDescription;

    let summary = getCondition(textDescription);
    changeSummaryImage(summary);

    let windGust = storage.getItem("windGust");
    document.getElementById("gusts").innerHTML = windGust;

    let date = new Date();
    let nextHour = date.getHours() + 1;
//get hourly data
    let hourlyStorage = storage.getItem("hourly");
// Convert array
    let hourlyData = hourlyStorage.split(",");
    console.log(hourlyData);
//call function to build hourlyData and put it on website
    hourlyLI.innerHTML = buildHourlyData(nextHour, hourlyData)
    // Task 4 - Hide status and show main
    mainContent.setAttribute('class','');
    statusMessage.setAttribute('class', 'hide');
}
