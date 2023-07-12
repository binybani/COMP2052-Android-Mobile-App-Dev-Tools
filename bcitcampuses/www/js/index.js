/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
}
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
