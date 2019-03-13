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
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '°F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li> | ' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '°F </li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}


