
/* =====================================
   1. ARTISAN PROFILE DATA
===================================== */

const artisanProfiles = {
    ram: {
        name: "RAM KUMAR",
        skill: "Pottery Artist",
        location: "Location: AGRA, UTTAR PRADESH",
        experience: "Experience: 8 Years",
        speciality: "Speciality: Handmade Clay Art",
        about: "I create beautiful handmade pottery inspired by traditional Indian art.",
        image: "POTTERY.png"
    },

    smita: {
        name: "SMITA DEVI",
        skill: "Handloom Artist",
        location: "Location: KASOL",
        experience: "Experience: 5 Years",
        speciality: "Speciality: Traditional Handloom",
        about: "I create beautiful handmade handloom products using traditional techniques.",
        image: "HANDLOOMM.png"
    },

    neha: {
        name: "NEHA SINGH",
        skill: "Jewellery Artist",
        location: "Location: PATNA",
        experience: "Experience: 4 Years",
        speciality: "Speciality: Handmade Jewellery",
        about: "I create beautiful handmade jewellery inspired by Indian crafts.",
        image: "JEWELLERYY.png"
    }
};


/* =====================================
   2. SHOW ARTISAN PROFILE
===================================== */

function showProfile(artisanKey) {
    const artisan = artisanProfiles[artisanKey];

    if (!artisan) {
        return;
    }

    document.getElementById("profile-name").innerText = artisan.name;
    document.getElementById("profile-skill").innerText = artisan.skill;
    document.getElementById("profile-location").innerText = artisan.location;
    document.getElementById("profile-experience").innerText = artisan.experience;
    document.getElementById("profile-speciality").innerText = artisan.speciality;
    document.getElementById("profile-about").innerText = artisan.about;
    document.getElementById("profile-image").src = artisan.image;
    document.getElementById("profile-image").alt = artisan.name;

    document.getElementById("profile").scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================
   3. SEARCH ARTISANS
===================================== */

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("artisan-search");
const categoryFilter = document.getElementById("category-filter");
const locationFilter = document.getElementById("location-filter");
const searchMessage = document.getElementById("search-message");

function searchArtisan() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value.toLowerCase().trim();
    const selectedLocation = locationFilter.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".artisan-list .artisan-card");
    let found = 0;

    cards.forEach(function(card) {
        const name = card.dataset.name.toLowerCase();
        const skill = card.dataset.skill.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        const location = card.dataset.location.toLowerCase();

        const textMatch =
            name.includes(searchText) || skill.includes(searchText);

        const categoryMatch =
            selectedCategory === "" || category === selectedCategory;

        const locationMatch =
            location.includes(selectedLocation);

        if (textMatch && categoryMatch && locationMatch) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    if (found === 0) {
        searchMessage.innerText = "No artisans found. Try another search!";
    } else {
        searchMessage.innerText = found + " artisan(s) found.";
    }
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    searchArtisan();
});

searchInput.addEventListener("input", searchArtisan);
categoryFilter.addEventListener("change", searchArtisan);
locationFilter.addEventListener("input", searchArtisan);


/* =====================================
   4. RESET SEARCH
===================================== */

document.getElementById("reset-search").addEventListener("click", function() {
    searchInput.value = "";
    categoryFilter.value = "";
    locationFilter.value = "";

    document.querySelectorAll(".artisan-list .artisan-card").forEach(function(card) {
        card.style.display = "";
    });

    searchMessage.innerText = "Showing all artisans.";
});


/* =====================================
   5. FAVOURITE ARTISAN
===================================== */

function getSavedFavourites() {
    return JSON.parse(localStorage.getItem("craftnest-favourites") || "[]");
}

function favourite(button) {
    const card = button.closest(".artisan-card");
    const artisanName = card.dataset.name;

    let favourites = getSavedFavourites();

    if (favourites.includes(artisanName)) {
        favourites = favourites.filter(function(name) {
            return name !== artisanName;
        });

        button.classList.remove("favourited");
        button.innerText = "♡ Favourite";
    } else {
        favourites.push(artisanName);

        button.classList.add("favourited");
        button.innerText = "♥ Favourite";
    }

    localStorage.setItem(
        "craftnest-favourites",
        JSON.stringify(favourites)
    );
}

function loadFavourites() {
    const favourites = getSavedFavourites();

    document.querySelectorAll(".artisan-list .artisan-card").forEach(function(card) {
        const name = card.dataset.name;
        const button = card.querySelector(".favorite-btn");

        if (favourites.includes(name)) {
            button.classList.add("favourited");
            button.innerText = "♥ Favourite";
        }
    });
}

loadFavourites();


/* =====================================
   6. ARTISAN RATINGS
===================================== */

function getSavedRatings() {
    return JSON.parse(localStorage.getItem("craftnest-ratings") || "{}");
}

function createRatings() {
    const cards = document.querySelectorAll(".artisan-list .artisan-card");

    cards.forEach(function(card) {
        const artisanName = card.dataset.name;

        const ratingBox = document.createElement("div");
        ratingBox.className = "rating-box";

        ratingBox.innerHTML = `
            <p>Rate this artisan:</p>
            <div class="rating-stars"></div>
            <p class="rating-message">No rating yet</p>
        `;

        card.appendChild(ratingBox);

        const starsContainer = ratingBox.querySelector(".rating-stars");
        const ratingMessage = ratingBox.querySelector(".rating-message");

        let ratings = getSavedRatings();
        let currentRating = ratings[artisanName] || 0;

        function updateStars() {
            const stars = starsContainer.querySelectorAll("button");

            stars.forEach(function(star, index) {
                if (index < currentRating) {
                    star.style.opacity = "1";
                } else {
                    star.style.opacity = "0.4";
                }
            });
        }

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("button");

            star.type = "button";
            star.innerText = "★";
            star.setAttribute("aria-label", "Rate " + i + " out of 5");

            star.addEventListener("click", function() {
                currentRating = i;

                ratings = getSavedRatings();
                ratings[artisanName] = currentRating;

                localStorage.setItem(
                    "craftnest-ratings",
                    JSON.stringify(ratings)
                );

                ratingMessage.innerText = "Your rating: " + currentRating + "/5";
                updateStars();
            });

            starsContainer.appendChild(star);
        }

        if (currentRating > 0) {
            ratingMessage.innerText = "Your rating: " + currentRating + "/5";
        }

        updateStars();
    });
}

createRatings();


/* =====================================
   7. CONTACT FORM DEMO
===================================== */

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    contactMessage.innerText =
        "Thank you! Your message has been recorded for this demo.";

    contactForm.reset();
});
