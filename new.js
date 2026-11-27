
/* =====================================
   1. SEARCH ARTISAN
===================================== */

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


/* =====================================
   2. SEARCH FORM
===================================== */

let searchForm = document.querySelector(".search-form");

let searchInput = document.getElementById("artisan-search");

let categoryFilter = document.getElementById("category-filter");

let locationFilter = document.getElementById("location-filter");


// Search message

let searchMessage = document.createElement("p");

searchMessage.id = "search-message";

if (searchForm) {
    searchForm.appendChild(searchMessage);
}


// Search button

if (searchForm) {

    searchForm.addEventListener("submit", function(event) {

        event.preventDefault();

        searchArtisan();

    });

}


// Search while typing

if (searchInput) {
    searchInput.addEventListener("input", searchArtisan);
}


// Search when category changes

if (categoryFilter) {
    categoryFilter.addEventListener("change", searchArtisan);
}


// Search when location changes

if (locationFilter) {
    locationFilter.addEventListener("input", searchArtisan);
}


/* =====================================
   3. ARTISAN RATING
===================================== */

let artisanCards = document.querySelectorAll(".artisan-list .artisan-card");

artisanCards.forEach(function(card, index) {

    // Get artisan name

    let artisanName = card.querySelector("h3");

    if (!artisanName) {
        artisanName = card.querySelector("h2");
    }

    let name = artisanName
        ? artisanName.innerText.trim()
        : "artisan-" + index;


    // Create rating box

    let ratingBox = document.createElement("div");

    ratingBox.className = "rating-box";

    ratingBox.innerHTML = `
        <p>Rate this artisan:</p>
        <div class="rating-stars"></div>
        <p class="rating-message">No rating yet</p>
    `;

    card.appendChild(ratingBox);


    // Get rating elements

    let stars = ratingBox.querySelector(".rating-stars");

    let message = ratingBox.querySelector(".rating-message");


    // Get saved ratings

    let savedRatings = JSON.parse(
        localStorage.getItem("craftnest-ratings") || "{}"
    );

    let currentRating = savedRatings[name] || 0;


    // Create 5 stars

    for (let i = 1; i <= 5; i++) {

        let star = document.createElement("button");

        star.innerText = "★";

        star.style.color = "#f5a623";
        star.style.fontSize = "25px";
        star.style.background = "none";
        star.style.border = "none";
        star.style.cursor = "pointer";


        // Show selected stars

        if (i <= currentRating) {
            star.style.opacity = "1";
        } else {
            star.style.opacity = "0.4";
        }


        // Give rating when clicked

        star.addEventListener("click", function() {

            currentRating = i;

            savedRatings[name] = currentRating;


            // Save rating in browser

            localStorage.setItem(
                "craftnest-ratings",
                JSON.stringify(savedRatings)
            );


            // Show rating message

            message.innerText =
                "Your rating: " + currentRating + "/5";


            // Update star color

            let allStars = stars.querySelectorAll("button");

            allStars.forEach(function(button, index) {

                if (index < currentRating) {
                    button.style.opacity = "1";
                } else {
                    button.style.opacity = "0.4";
                }

            });

        });


        stars.appendChild(star);

    }


    // Show previously saved rating

    if (currentRating > 0) {

        message.innerText =
            "Your rating: " + currentRating + "/5";

    }

});
