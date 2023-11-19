let autocomplete;
let map;
var placesService;

// JQuery Code
// BOOTSTRAP CAROUSEL
$(document).ready(function () {
	// Initialize the carousel
	$("#imageCarousel").carousel();
	$("#restaurantCarousel").carousel({
		interval: false,
	});
	$(".form.search").on("submit", function (e) {
		e.preventDefault();
		var query = $("#search").val();
		searchAndDisplay(query);
		$("#results").show();
	});
});

// Google required callback once operating
function initMap() {
	window.restaurantCount = 0;

	// Creates Google Map
	// var map = new google.maps.Map(mapDiv, {

	map = new google.maps.Map(document.getElementById("map"), {
		// Austin coordinates
		center: { lat: 30.266666, lng: -97.73333 },
		zoom: 15,
		styles: [
			{
				featureType: "road",
				elementType: "labels",
				stylers: [{ visibility: "off" }],
			},
			{
				elementType: "labels.text.fill",
				stylers: [{ color: "#EC058E" }],
			},
			{
				elementType: "labels.text.stroke",
				stylers: [{ color: "#D3FA52" }],
			},
			{
				featureType: "landscape.man_made",
				elementType: "geometry",
				stylers: [{ color: "#FDFFFC" }],
			},
			{
				featureType: "landscape.natural",
				elementType: "geometry",
				stylers: [{ color: "#D3FA52" }],
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [{ color: "#D3FA52" }],
			},
			{
				featureType: "road",
				elementType: "geometry.fill",
				stylers: [{ color: "#D3FA52" }],
			},
			{
				featureType: "road",
				elementType: "geometry.stroke",
				stylers: [{ color: "#FDFFFC" }],
			},
			{
				featureType: "road.arterial",
				elementType: "geometry.fill",
				stylers: [{ color: "#EC058E" }],
			},
			{
				featureType: "road.local",
				elementType: "geometry.fill",
				stylers: [{ color: "black" }],
			},
			{
				featureType: "landscape",
				elementType: "geometry",
				stylers: [{ color: "#30332E" }],
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [{ color: "#043CAD" }],
			},
		],
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
}

// Generate map coordinates upon search btn press
function searchAndDisplay(query) {
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({ address: query }, function (results, status) {
		if (status === "OK") {
			map.setCenter(results[0].geometry.location);
			var searchLocation = results[0].geometry.location;

			placesService.nearbySearch(
				{
					location: searchLocation,
					radius: "500",
					type: ["restaurant", "cafe"],
					keyword: "dining, food, drinks, lunch, breakfast, dinner",
				},
				callback
			);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

// Initializes new map after search and finds nearby places
function onPlaceChanged() {
	document.getElementById("results").innerHTML = "";

	var place = autocomplete.getPlace();
	console.log(place);

	// Creates Google Map
	map = new google.maps.Map(document.getElementById("map"), {
		// New map coordinates
		center: place.geometry.location,
		zoom: 15,
	});

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(
		{
			location: place.geometry.location,
			radius: "500",
			type: ["restaurant", "cafe"],
			keyword: "dining, food, drinks, lunch, breakfast, dinner",
		},
		callback
	);
	// injectCSS();
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		const carouselInner = document.querySelector(
			"#restaurantCarousel .carousel-inner"
		);
		carouselInner.innerHTML = "";
		let carouselItem = null;
		let rowDiv = null;
		let count = 0;

		results.forEach((restaurant, index) => {
			if (count % 3 === 0) {
				// Every three restaurants, create a new carousel item and row
				carouselItem = document.createElement("div");
				carouselItem.className =
					"carousel-item" + (index === 0 ? " active" : "");
				rowDiv = document.createElement("div");
				rowDiv.className = "row"; // Bootstrap row class
				carouselItem.appendChild(rowDiv);
				carouselInner.appendChild(carouselItem);
			}

			// Create a column for each restaurant
			let colDiv = document.createElement("div");
			colDiv.className = "col-md-4";

			// Create a card for the restaurant
			let cardDiv = document.createElement("div");
			cardDiv.className = "restaurant-card";

			// Add restaurant details to the card
			let restaurantName = document.createElement("h5");
			restaurantName.textContent = restaurant.name;
			cardDiv.appendChild(restaurantName);

			if (restaurant.photos) {
				let restaurantImage = document.createElement("img");
				restaurantImage.src = restaurant.photos[0].getUrl();
				restaurantImage.className = "img-fluid"; // Responsive images
				cardDiv.appendChild(restaurantImage);
			}

			// Maybe add ratings/likes/etc here?

			// Append the card to the column
			colDiv.appendChild(cardDiv);

			// Append the column to the current row
			rowDiv.appendChild(colDiv);

			count++;
		});

		$("#restaurantCarousel").carousel();
	}
}
