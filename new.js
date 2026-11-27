
 // SEARCH ARTISAN

function searchArtisan() {

    let name = document.getElementById("artisan-search").value.toLowerCase().trim();

    let category = document.getElementById("category-filter").value.toLowerCase().trim();

    let location = document.getElementById("location-filter").value.toLowerCase().trim();

    let cards = document.querySelectorAll(".artisan-list .artisan-card");

    let found = 0;

    for (let i = 0; i < cards.length; i++) {

        let cardText = cards[i].innerText.toLowerCase();

        let nameMatch = cardText.includes(name);
        let categoryMatch = cardText.includes(category);
        let locationMatch = cardText.includes(location);

        if (nameMatch && categoryMatch && locationMatch) {

            cards[i].style.display = "";
            found++;

        } else {

            cards[i].style.display = "none";

        }
    }

    let message = document.getElementById("search-message");

    if (message) {
        if (found == 0) {
            message.innerText = "No artisans found. Try another search!";
        } else {
            message.innerText = found + " artisan(s) found";
        }
    }
}


// SEARCH FORM

let searchForm = document.querySelector(".search-form");

let searchInput = document.getElementById("artisan-search");

let categoryFilter = document.getElementById("category-filter");

let locationFilter = document.getElementById("location-filter");


// Show search message

let searchMessage = document.createElement("p");

searchMessage.id = "search-message";

searchForm.appendChild(searchMessage);


// Search when button is clicked

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    searchArtisan();

});


// Search while typing

searchInput.addEventListener("input", searchArtisan);


// Search when category changes

categoryFilter.addEventListener("change", searchArtisan);


// Search when location changes

locationFilter.addEventListener("input", searchArtisan);
