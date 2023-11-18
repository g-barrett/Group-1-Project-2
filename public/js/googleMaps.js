// CLient side JS
// Renders the Maps to the page

// Code provided by google documentation
// Initialize and add the map

// Need the search to pull in the geolocation
// Thought set an array for the add marker to loop through the contnet


// Google Autocomplete Search Form
let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search'),
        {
            types: ['restaurant'],
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
        document.getElementById('search').placeholder = 'Enter a place';
    } else {
        // Display details about the valid place
        var loc = place.geometry.location;

        // Updates the map to the location chosen
        map.setCenter(loc);
        new google.maps.Marker({
            position: loc,
            map: map,
            title: place.name // using the place name as the marker title
        });

        map.setZoom(15);

        document.getElementById('details').innerHTML = place.name;


    }
}

let map;

let lat = 30.266666;
let lng = -97.733330;

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