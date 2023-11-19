let autocomplete;
let map;
var placesService;
// let lat = 30.266666;
// let lng = -97.733330;

// Google required callback once operating
function initMap() {
  // Creates Google Map
  // var map = new google.maps.Map(mapDiv, {

  map = new google.maps.Map(document.getElementById("map"), {
    // Austin coordinates
    center: { lat: 30.266666, lng: -97.73333 },
    zoom: 15,
  });

  placesService = new google.maps.places.PlacesService(map);

  // Autocomplete textbox creation
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search"),
    {
      types: ["geocode"],
      componentRestrictions: { country: ["US"] },
      // fields: ['address_components','adr_address', 'place_id', 'geometry', 'opening_hours', 'secondary_opening_hours', 'name', 'atmosphere', 'website']
    }
  );

  autocomplete.addListener("place_changed", onPlaceChanged);
}

// Initializes new map after search and finds nearby places
function onPlaceChanged() {
  document.getElementById("results").innerHTML = "";

  var place = autocomplete.getPlace();
  console.log(place);

  // Creates Google Map
  map = new google.maps.Map(document.getElementById("map"), {
    // Austin coordinates
    center: place.geometry.location,
    zoom: 15,
  });

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: place.geometry.location,
      radius: "500",
      type: ["restaurant", "cafe"],
    },
    callback
  );
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// Perform a nearby search based on the selected place
// placesService.nearbySearch(
//     {
//         location: place.geometry.location,
//         // Adjust the radius as needed
//         radius: 500,
//         types: ['geocode'],
//         componentRestrictions: {'country': ['US']},
//         fields: ['address_components','adr_address', 'place_id', 'geometry', 'opening_hours', 'secondary_opening_hours', 'name', 'atmosphere', 'website']
//     },
//     displayResults
// );
// }

// function displayResults(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         var resultsDiv = document.getElementById('results');
//         resultsDiv.innerHTML = '';

//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             var name = place.name;
//             var address = place.vicinity;

//             var resultItem = document.createElement('div');
//             resultItem.innerHTML = '<strong>' + name + '</strong><br>' + address;
//             resultsDiv.appendChild(resultItem);
//         }
//     }
// }

// Testing does render correctly

// var sampleResults = [
//     { name: 'Restaurant 1', vicinity: 'Address 1' },
//     { name: 'Restaurant 2', vicinity: 'Address 2' },
// ];

// Call displayResults with the sample data
// displayResults(sampleResults, google.maps.places.PlacesServiceStatus.OK);

/*
INCASE I FUCK UP

let autocomplete;
let map;
var placesService;
// let lat = 30.266666;
// let lng = -97.733330;

// Initializes Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    // Austin coordinates
        center: { lat: 30.266666, lng: -97.733330 }, 
        zoom: 15,
    });

    placesService = new google.maps.places.PlacesService(map);

    autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('search'),
            {
            types: ['restaurant', 'cafe'],
            componentRestrictions: { country: ['US'] },
            }
        );

    autocomplete.addListener('place_changed', onPlaceChanged);
}

// Autocomplete search bar
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search'),
        {
            types: ['geocode'],
            componentRestrictions: {'country': ['US']},
            // fields: ['address_components','adr_address', 'place_id', 'geometry', 'opening_hours', 'secondary_opening_hours', 'name', 'atmosphere', 'website']
        });

        autocomplete.addListener('place_changed', onPlaceChanged);
}

// Initializes new map When map search clicked
function onPlaceChanged() {
    var place = autocomplete.getPlace();

    // Exits search if nothing selected
    if (!place.geometry) {
        return;
    }

    // Perform a nearby search based on the selected place
    placesService.nearbySearch(
        {
            location: place.geometry.location,
            // Adjust the radius as needed
            radius: 500, 
            types: ['geocode'],
            componentRestrictions: {'country': ['US']},
            fields: ['address_components','adr_address', 'place_id', 'geometry', 'opening_hours', 'secondary_opening_hours', 'name', 'atmosphere', 'website']
        },
        displayResults
    );
}

function displayResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var name = place.name;
            var address = place.vicinity;

            var resultItem = document.createElement('div');
            resultItem.innerHTML = '<strong>' + name + '</strong><br>' + address;
            resultsDiv.appendChild(resultItem);
        }
    }
}

// Testing does render correctly

var sampleResults = [
    { name: 'Restaurant 1', vicinity: 'Address 1' },
    { name: 'Restaurant 2', vicinity: 'Address 2' },
];

// Call displayResults with the sample data
displayResults(sampleResults, google.maps.places.PlacesServiceStatus.OK);


*/
