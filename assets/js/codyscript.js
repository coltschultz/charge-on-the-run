var currentPosition = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        currentPosition.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) { 
    console.log(position)
    currentPosition.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            currentPosition.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            currentPosition.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            currentPosition.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            currentPosition.innerHTML = "An unknown error occurred."
            break;
    }
}
getLocation();