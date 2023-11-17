const searchForm = document.querySelector('.form-search');
const search= document.querySelector('#search').value;
const searchResults = document.querySelector('#search-results');


searchForm.addeventlistener('submit', async (event) => {
    event.preventDefault();
    // display search results 
    try {
        const response = await fetch(`/api/restaurants?search=${search}`);
        const restaurants = await response.json();

        searchResults.innerHTML = '';

    } catch(error) {
        console.error('Error fetching restaurants:', error);
    }

});

const likeButtonHandler = async (event) => {
    // if clicked sends restaurant to likes list on the user profile page

};

const saveButtonHandler = async (event) => {
    // if clicked sedns restaurant to want to go column on the user profile page
};