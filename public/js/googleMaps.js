let autocomplete;

let map;

let lat = 30.266666;
let lng = -97.733330;
// let markers = [/*Pass in API info*/];

// Imports API fetchData
const fetchData = require('../../utils/apiUtil').fetchData;


// Generate auto complete
function initAutocomplete() {
    console.log('ERROR IS ABOVE ME');

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search'),
        {
            types: ['restaurant', 'cafe', ],
            componentRestrictions: {'country': ['US']},
            fields: ['place_id', 'geometry', 'name']
        }
    );

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
var place = autocomplete.getPlace();

if (!place.geometry) {
// User did not select a prediction; reset the input field
document.getElementById('autocomplete').placeholder = 'Enter a place';
} else {
// Display details about the valid place
document.getElementById('details').innerHTML = place.name;
    }
}

// new google.maps.places.Autocomplete(document.getElementById('search'));
// var ac = new google.maps.places.Autocomplete(document.getElementById('search'));
// google.maps.event.addListener(ac, 'place_changed', function(){
//     var place = ac.getPlace();
//     console.log(place.formatted_address);
//     console.log(place.url);
//     console.log(place.geometry.location);
// });



let markers = [/*Pass in API info*/];

async function initMap() {
// Lat Long variables
const position = { lat: lat, lng: lng };
//  New map
map = new google.maps.Map(document.getElementById('map'), {
zoom: 10,
center: position
});

function addMarker(props) {
const marker = new google.maps.Marker({
position: props.coords,
map: map,
title: 'Uluru'
// icon:''
});

if(props.content) {
var infoWindow = new google.maps.InfoWindow({
content: props.content
})
marker.addListener('click', function(){
infoWindow.open(map, marker);
})
}
    }


    for (let i = 0; i < markers.length; i++ ) {
    addMarker( markers[i]);
    }
    // Template for the map markers
    addMarker({
        coords:{ lat: lat, lng: lng },
        content: "<h1>Austin</h1>"
    });


    

}


initMap();


// Get current position of the user from browser
function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    // Display user's position
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
  
      // Display user's position on an a href link
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=11/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  
      barconfig.latitude = latitude;
      barconfig.longitude = longitude;
  
      getweather();
  
      // Search from the default search term
      var searchterm = document.getElementById("whattosearch").value.trim();
      if (searchterm.length === 0) {
        searchterm = barconfig.defaultsearchterm;
      }
      barconfig.searchterm = searchterm;
      configsave();
      getGoogleSearch(searchterm);
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  // END Get current position of the user from browser
  */