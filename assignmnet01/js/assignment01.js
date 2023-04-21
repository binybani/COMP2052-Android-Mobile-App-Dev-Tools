// Html Elements
const mapPosition = document.getElementById("map");
const logo = document.getElementById("logo");
const info = document.getElementById("info");

// Hide google map
mapPosition.style.display = "none";

// Declare map and marker variable
let map, marker;

// Initialize and add the map
function initMap() {
  // The map, centered at Burnaby campus
  map = new google.maps.Map(mapPosition, {
    zoom: 16,
    center: burnaby,
  });

  // The marker, positioned Burnaby campus
  marker = new google.maps.Marker({
    position: burnaby,
    map: map,
  });
}

// Move new location
function moveToLocation(lat, lng) {
  var center = new google.maps.LatLng(lat, lng);
  map.panTo(center);
  marker.setPosition(center);
}

// Change campus location
const changeCampus = (target) => {
  const value = target.value;

  // Remove logo when user select the campus
  logo.style.display = "none";

  // Display google map
  mapPosition.style.display = "block";

  // change the map center depend on user selection
  if (value == "burnaby") {
    moveToLocation(49.249011630001974, -123.00187775720289);
    info.innerHTML = burnaby.describeSelf();
  } else if (value == "downtown") {
    moveToLocation(49.28357698312582, -123.11527627185433);
    info.innerHTML = downtown.describeSelf();
  } else if (value == "marine") {
    moveToLocation(49.3127629555893, -123.08615327116422);
    info.innerHTML = marine.describeSelf();
  } else if (value == "aerospaceTechnology") {
    moveToLocation(49.18635511834246, -123.14485683199612);
    info.innerHTML = aerospaceTechnology.describeSelf();
  } else if (value == "annacisIsland") {
    moveToLocation(49.16363249958349, -122.9700808306861);
    info.innerHTML = annacisIsland.describeSelf();
  }
};
