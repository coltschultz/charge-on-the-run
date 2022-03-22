var prevInfo = false;
function initMap() {
    // Create the map.
    const currentLocation = { lat: 29.4241, lng: -98.4936 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: currentLocation,
      zoom: 15,
      mapId: "8d193001f940fde3",
    });

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
    
    // Perform a nearby search.
    service.nearbySearch(
      { location: currentLocation, radius: 500, keyword: "EV charging station" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
  
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`);
  }


  }

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

        var request = {
            placeId: place.place_id,
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'formatted_address']
          };
          
          service = new google.maps.places.PlacesService(map);
          service.getDetails(request, callback);
          


          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
            //   createMarker(place);
            //   console.log(results);
              li.innerHTML = place.name + '<br>' + results.formatted_address + '<br>' + results.formatted_phone_number;
            //   console.log(results.formatted_address);
              placesList.appendChild(li);
              address = results.formatted_address
              phone = results.formatted_phone_number

  
          const contentString = place.name + '<br>' + address + '<br>' + phone;
                console.log(place.geometry);
          const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });
          
            marker.addListener("click", () => {
                if(prevInfo){ prevInfo.close(); }
                prevInfo = infowindow;
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
              });
            });

            var url = 'https://www.google.com/maps/dir/29.5370752,-98.3891968/ChargePoint+Charging+Station,+11005+I-35+Frontage+Rd,+San+Antonio,+TX+78233/@29.5475603,-98.3982677'

        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
          if(prevInfo){ prevInfo.close(); }
          prevInfo = infowindow;
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
    }
    (() => {
    const message = document.querySelector('#message');

    // check if the Geolocation API is supported
    if (!navigator.geolocation) {
        message.textContent = `Your browser doesn't support Geolocation`;
        message.classList.add('error');
        return;
    }

    // handle click event
   var btn = document.querySelector('#show');
    btn.addEventListener('click', function () {
        // get the current position
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });


    // handle success case
    function onSuccess(position) {
        const {
            latitude,
            longitude
        } = position.coords;

        message.classList.add('success');
        message.textContent = `Your location: (${latitude},${longitude})`;
    }

    // handle error case
    function onError() {
        message.classList.add('error');
        message.textContent = `Failed to get your location!`;
    }
})();
}
      }
    }
  }

const currentPosition = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        currentPosition.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    currentPosition.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        currentPosition.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
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
}getLocation(); 