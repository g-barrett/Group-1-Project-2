// CLient side JS
// Renders the Maps to the page

// Code provided by google documentation
// Initialize and add the map
let map;

async function initMap() {
    const position = { lat: -25.344, lng: 131.031 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: position
    });

    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Uluru'
    });
}


initMap();









// CARAS CODE
/*
// ---GOOGLE MAPS API TO SHOW GAS STATIONS----
// Start variables for the map, service, and information window
let map;
let service;
let infowindow;
// Disable fields
document.getElementById(“diesel”).disabled = true;
document.getElementById(“gasoline”).disabled = true;
document.getElementById(“midGrade”).disabled = true;
document.getElementById(“premium”).disabled = true;
// Function to show the modal
function showModal() {
    const modal = document.getElementById(‘loading-modal’);
    modal.classList.add(‘is-active’);
}
// Function to hide the modal
function hideModal() {
    const modal = document.getElementById(‘loading-modal’);
    modal.classList.remove(‘is-active’);
}
// Function to setup the Google Map with provided latitude and longitude
function initMap(lat, lng) {
    // Convert user input to Google Maps latitude and longitude object
    const userInput = new google.maps.LatLng(lat, lng);
    // Setup the information window (this will display details when a marker is clicked)
    infowindow = new google.maps.InfoWindow();
    // Start Google Map centered on the given coordinates and with a zoom level of 15
    map = new google.maps.Map(document.getElementById(“map-result”), {
        center: userInput,
        zoom: 15,
    });
    // Construct a request to search for gas stations around the user’s location
    const request = {
        location: userInput,
        radius: ‘500’,
        query: “Gas station”
    };
    // Setup the Places Service to query Google Maps
    service = new google.maps.places.PlacesService(map);
    // Perform a text search using the constructed request
    service.textSearch(request, (results, status) => {
        // If the search was successful, add markers for each found place
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            // Center the map on the first result
            map.setCenter(results[0].geometry.location);
        }
    });
}
// Function to create a clickable marker for a specific place on the map
function createMarker(place) {
    // Skip if the place lacks essential details
    if (!place.name || !place.geometry.location) return;
    // Create a new marker at the place’s location
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        icon: “./assets/images/station-marker.png”
    });
    // Attach an event listener to open an info window with the place’s name when the marker is clicked
    google.maps.event.addListener(marker, “click”, () => {
        infowindow.setContent(place.name || “”);
        infowindow.open(map);
    });
}
// ---API TO GET LATITUDE AND LONGITUDE OF A CITY----
// Function to convert a city’s name into latitude and longitude
function getLatLngFromCity(city) {
    // API key and endpoint for Google’s Geocoding service
    const apiKey = “AIzaSyBxWLcUfDyLG_YtaDZMM5GFhq5rCt7m7EM”;
    const apiUrl = https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey};
    // Fetch the city’s coordinates using the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // If a valid response is received, update the UI and fetch relevant details
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                document.getElementById(‘latitude’).value = location.lat;
                document.getElementById(‘longitude’).value = location.lng;
                initMap(location.lat, location.lng);
                fetchGasPrices(location.lng, location.lat);
            }
        })
        // Log any errors during the fetch process
        .catch(error => console.error(“Error fetching geocode data: “, error));
}
// Disable the input fields
document.getElementById(“longitude”).disabled = true;
document.getElementById(“latitude”).disabled = true;
// ---API To FETCH GAS PRIZES BY COORDINATES ----
// Function to fetch gas prices based on given coordinates
function fetchGasPrices(longitude, latitude) {
    showModal();  // Show the modal when you start fetching the data
     // Create a new XMLHttpRequest to fetch data
     var xhr = new XMLHttpRequest();
    // Create a new XMLHttpRequest to fetch data
    var xhr = new XMLHttpRequest();
    xhr.open(“GET”, https://api.collectapi.com/gasPrice/fromCoordinates?lng=${longitude}&lat=${latitude});
    // Set necessary headers for the request
    xhr.setRequestHeader(“content-type”, “application/json”);
    xhr.setRequestHeader(“authorization”, “apikey 08VbL3jN1gp2ATqNQtFypp:2TsHZX1IoAjbTJgk7nxLML”);
    // Process the response when data loading is complete
    xhr.onload = function() {
        // If the request was successful, update the UI with the received data
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success && response.result) {
                document.getElementById(“diesel”).value = response.result.diesel;
                document.getElementById(“gasoline”).value = response.result.gasoline;
                document.getElementById(“midGrade”).value = response.result.midGrade;
                document.getElementById(“premium”).value = response.result.premium;
            } else {
                console.error(“Error in fetching gas prices:“, response.message);
            }
        } else {
            console.error(“Failed to retrieve gas prices.“);
        }
    };
    // Log any errors that occur during the data fetching process
    xhr.onerror = function() {
        console.error(“Error occurred while fetching data.“);
    };
    // Send the actual request
    xhr.send();
    // Automatically hide the modal after 4 seconds
    setTimeout(hideModal, 4000);
}
// Attach event listeners when the document is fully loaded
document.addEventListener(‘DOMContentLoaded’, function() {
    // Display user’s previously searched cities
    renderUserInput();
    // When the “submit” button is clicked, fetch details for the entered city
    document.getElementById(‘submit-button’).addEventListener(‘click’, function(event) {
        event.preventDefault();
        const city = document.getElementById(‘city’).value;
        getLatLngFromCity(city);
    });
});
// Function to display the user’s previous city searches from local storage
function renderUserInput() {
    let citySearchInput = JSON.parse(localStorage.getItem(‘citySearch’));
    let cityHistory = document.getElementById(‘user-city’);
    // If there are past searches, render them on the page
    if (citySearchInput !== null) {
        cityHistory.innerHTML = ‘’;
        citySearchInput.forEach(function(citySearch) {
            let cityItem = document.createElement(‘p’);
            cityItem.textContent = citySearch.citySearch;
            cityHistory.appendChild(cityItem);
        });
    }
}
// Attach another event listener to the “submit” button to save the entered city in local storage
document.getElementById(‘submit-button’).addEventListener(‘click’, function(event) {
    event.preventDefault();
    let city = document.getElementById(‘city’).value;
    var citySearch = {
        citySearch: city,
    };
    // Save the search if it’s not empty
    if (city.trim() !== ‘’) {
        let citySearchInput = JSON.parse(localStorage.getItem(‘citySearch’)) || [];
        citySearchInput.push(citySearch);
        localStorage.setItem(‘citySearch’, JSON.stringify(citySearchInput));
        renderUserInput();
    } else {
        console.error(‘Enter a city name’);
        return;
    }
});
// Expose the initMap function to the global scope, so it can be accessed outside this script
window.initMap = initMap;
*/

/* Gabes code
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