"use strict";
//DOM Structures from webpage
let pageNav = document.getElementById('pageNav');
let statusContainer = document.getElementById('statusMessage');
let contentContainer = document.getElementById('mainContent');

let weatherURL = "/weather/js/weather.json";
fetchData(weatherURL);
function fetchData(weatherURL) {
    let cityName = 'Greenville'; // The data we want from the weather.json file
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);
            // data is the full JavaScript object, but we only want the greenville part
            // shorten the variable and focus only on the data we want to reduce typing
            let g = data[cityName];

            // ************ Get the content ******************************

            // Get the location data
            let locName = g.City;
            let locState = g.State;
            // Put them together
            let fullName = locName + ', ' + locState;
            // See if it worked
            console.log('fullName is: ' + fullName);
            // Get the temperature data
            let curTemp = g.Temp;
            let highTemp = g.High;
            let lowTemp = g.Low;
            console.log("Temp info is " + curTemp + " with a high of " + highTemp + " a low of " + lowTemp);
            // Get the wind data 
            let wind = g.Wind;
            let gusts = g.Gusts;
            let direction = g.Direction;
            console.log("Wind info is " + wind + " with gusts of " + gusts + " direction of " + direction);
            // Get the current conditions
            let summary = g.Summary;
            let precip = g.Precip;
            console.log("Conditions of " + summary + " and " + precip);
            // Get the hourly data 
            let hourly = g.Hourly;
            console.log("Hourlies of " + hourly);
            //get the zip
            let zip = g.Zip;
            console.log(zip);
            // get the elevation
            let elevation = g.Elevation;
            console.log(elevation);
            // //get the location
            let latitude = g.Latitude;
            console.log(latitude);
            let longitude = g.Longitude;
            console.log(longitude);
            
            
            // ************ Display the content ******************************
            // Set the title with the location name at the first
            // Gets the title element so it can be worked with
            let pageTitle = document.getElementById('page-title');
            // Create a text node containing the full name 
            let fullNameNode = document.createTextNode(fullName);
            // inserts the fullName value before any other content that might exist
            pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
            // When this is done the title should look something like this:
            // Greenville, SC | The Weather Site
            // Set the Location information/
            // Get the h1 to display the city location
            let contentHeading = document.getElementById('location');
            contentHeading.innerHTML = fullName;
            // The h1 in main h1 should now say "Greenville, SC"
            // Set the temperature information
                document.getElementById("current").innerHTML = curTemp + "°F";
                document.getElementById("high").innerHTML = highTemp + "°F";
                document.getElementById("low").innerHTML = lowTemp + "°F";
                document.getElementById("feel").innerHTML = "Feels like " + buildWC(wind, curTemp) + "°F";
            // Set the wind information
                document.getElementById("mph").innerHTML = wind + " mph";
                document.getElementById("gusts").innerHTML = gusts + " mph";
                document.getElementById("wind_direction").innerHTML = direction;
                windDial(direction);
            //Set zip
                document.getElementById("zip").innerHTML = zip;
            //set elevation
                let feet = convertMeters(elevation);
               document.getElementById("elevation").innerHTML = feet;
                // let meters = document.getElementById("elevation").innerText;
                // elevation.innerHTML = convertMeters(meters);
            //set location
                document.getElementById("latitude").innerHTML = latitude;
                document.getElementById("longitude").innerHTML = longitude;
            // Set the current conditions information
                document.getElementById("summary_title").innerHTML = summary;
                let condition = getCondition(weather);
                changeSummaryImage(condition);
            // Set the hourly temperature information
                let date = new Date();
                let nextHour = date.getHours() + 1;
                document.getElementById("hourlyLI").innerHTML = buildHourlyData(nextHour, hourly);
            // Change the status of the containers
            mainContent.setAttribute('class', ''); // removes the hide class
            statusMessage.setAttribute('class', 'hide'); // hides the status container
        })
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
}