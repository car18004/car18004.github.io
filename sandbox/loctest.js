'use strict';
// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - car18004@byui.edu"
    }
};

var storage = window.localStorage;
// Call the function to get our location
getGeoLocation();
// Gets longitude and latitude of current location
function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = "Getting Location...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            // Combine the values
            const locale = lat + "," + long;

            console.log(`Lat and Long are: ${locale}.`);
             // Call getLocation function, send locale
             getLocation(locale);
        })
    } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else
} // end getGeoLocation

