// let autocomplete;

// // Autocomplete search bar
// function initAutocomplete() {
//     autocomplete = new google.maps.places.Autocomplete(
//         document.getElementById('search'),
//         {
//             types: ['restaurant', 'cafe'],
//             componentRestrictions: {'country': ['US']},
//             fields: ['address_components','adr_address', 'place_id', 'geometry', 'opening_hours', 'secondary_opening_hours', 'name', 'atmosphere', 'website']
//         });

//         autocomplete.addListener('place_changed', onPlaceChanged);
// }