// Weather Site JavaScript Functions
const temp = 31;
const speed = 5;
buildWC(speed, temp);

const direction = "S"; //Set your own value
windDial(direction);

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
    feelTemp.innerHTML = wc;
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

const weather = getCondition("rainy");
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
    switch (weather){
        case "cloudy":
            weatherImage.setAttribute("class", "cloudy");
            break;
        case "clear":
            weatherImage.setAttribute("class", "clear");
            break;
        case "rainy":
            weatherImage.setAttribute("class", "rainy");
            break;
        case "foggy":
            weatherImage.setAttribute("class", "foggy");
            break;
        case "snowy":
            weatherImage.setAttribute("class", "snowy");
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