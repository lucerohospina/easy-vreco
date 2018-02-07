// Inicializando funciones de google maps.
function initMap() {
  // Agregando el gmap 
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397,
      lng: 150.644},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // geolocalización de HTML5
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // agregando input
  var startInput = document.getElementById('start-input');
  var finishingInput = document.getElementById('finishing-input');
  new google.maps.places.Autocomplete(startInput);
  new google.maps.places.Autocomplete(finishingInput);

  // trazando ruta
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;

var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  directionsService.route({
    origin: startInput.value,
    destination: finishingInput.value,
    travelMode: "DRIVING"
  }, function(response, status) {
    if(status === "OK") {
      directionsDisplay.setDirections(response);
    } else {
      window.alert("No encontramos una ruta");
    }
  })
}

directionsDisplay.setMap(map);

var drawRoute = function() {
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};

document.getElementById("finder-btn").addEventListener("click", drawRoute);
console.log("click");
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

 

  
