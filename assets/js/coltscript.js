var LAT;
var LON;
var currentCity = '';
var prevInfo = false;

// Update the map using the city name provided by the user in the search bar
    // Note to Cody: This is the function that should be tied to the event listener
    // on the Search Button. The event listener should take the city name entered in
    // the search bar and pass it as the "city" argument in the getData function.
function getData(city) {

  var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
  var apiKey = "e9da07741ba3933502e8f95cfbb33359";

  var url = baseUrl + "q=" + city + "&appid=" + apiKey;

  currentCity = city;
  logSearch();
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      LAT = data.coord.lat;
      LON = data.coord.lon;
      updateMap(LAT, LON);
    });
}

// Create The Initial Map
    // Note to Cody: We need to dynamically change these 
    // coordinates below using your current location function
function initMap() {
  // replace the coordinates on next line with variables from cody's function
  updateMap(29.4241, -98.4936);
}

// Update The Map
function updateMap(LAT, LON) {
  const currentLocation = { lat: LAT, lng: LON };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: currentLocation,
    zoom: 15,
    mapId: "8d193001f940fde3",
  });

  // Create the places service.
  const places = new google.maps.places.PlacesService(map);
  let getNextPage;
  const moreButton = document.getElementById("more");

  // moreButton.onclick = function () {
  //   moreButton.disabled = true;
  //   if (getNextPage) {
  //     getNextPage();
  //   }
  // };

  // Perform a nearby search.
  places.nearbySearch(
    { location: currentLocation, radius: 500, keyword: "EV charging station" },
    (results, status, pagination) => {
      if (status !== "OK" || !results) return;

      addPlaces(results, map);
      // moreButton.disabled = !pagination || !pagination.hasNextPage;
      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage();
        };
      }
    }
  );
}

// Add search results to the map & list
function addPlaces(places, map) {
  const placesList = document.getElementById("places");

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      const marker = new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });

      const li = document.createElement("li");
      const searchButton = document.getElementById('searchButton');
      const searchBar = document.getElementById('searchBar')
      
      var request = {
        placeId: place.place_id,
        fields: [
          "name",
          "rating",
          "formatted_phone_number",
          "geometry",
          "formatted_address",
        ],
      };

      places = new google.maps.places.PlacesService(map);
      places.getDetails(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          li.innerHTML =
            place.name +
            "<br>" +
            results.formatted_address +
            "<br>" +
            results.formatted_phone_number;
          placesList.appendChild(li);
          address = results.formatted_address;
          phone = results.formatted_phone_number;

          const contentString = place.name + "<br>" + address + "<br>" + phone;
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

          marker.addListener("click", () => {
            if (prevInfo) {
              prevInfo.close();
            }
            prevInfo = infowindow;
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });

          
          li.addEventListener("click", () => {
            map.setCenter(place.geometry.location);
            if (prevInfo) {
              prevInfo.close();
            }
            prevInfo = infowindow;
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
        }
      }
    }
  }
}


// Local Storage Handling
var historyListEl = document.getElementById('historyListEl');
var historyArray = [];
var searchDataObj = {};

// Load the prior search history when the page loads
(function(item) {
historyArray = JSON.parse(localStorage.getItem('historyArray'));
if (historyArray) {
    historyArray.splice(10);
    
    for (var i = 0; i < historyArray.length; i++) {
    var newEl = document.createElement("li")
    newEl.textContent = historyArray[i].city;
    historyListEl.appendChild(newEl);
    }
}
else {
    var decoy = { city: '' }
    historyArray = [decoy];
}
})()

// Log new searches into the history
var logSearch = function() {
  cityUpper = currentCity.toUpperCase();
  searchDataObj = { city: cityUpper };
  if (historyArray) {
  historyArray.unshift(searchDataObj);
  }
  else {
      historyArray.push(searchDataObj);
  }
  historyArray.splice(10);
  localStorage.setItem('historyArray', JSON.stringify(historyArray));
  var newEl = document.createElement("li");
  newEl.textContent = cityUpper;
  historyListEl.insertBefore(newEl, historyListEl.firstChild);
}
searchButton.addEventListener("click", 
function(event){
  event.preventDefault();
  historyListEl.innerHTML = "";
  getData(searchBar.value)});



// Cody: Need to add event listener for the history list that 
// passes the clicked cities name through the getData(); function