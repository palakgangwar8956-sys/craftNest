alert("Welcome to CraftNest!");

// ==================================
// 1. ARTISAN PROFILES
// ==================================

let artisanProfiles = {

    ram: {
        name: "RAM KUMAR",
        skill: "Pottery Artist",
        location: "Agra, Uttar Pradesh",
        experience: "8 Years",
        speciality: "Handmade Clay Art",
        about: "I create beautiful handmade pottery inspired by traditional Indian art.",
        image: "POTTERY.png"
    },

    smita: {
        name: "SMITA DEVI",
        skill: "Handloom Artist",
        location: "Kasol, Himachal Pradesh",
        experience: "6 Years",
        speciality: "Traditional Handloom",
        about: "I make traditional handloom products with care and creativity.",
        image: "HANDLOOMM.png"
    },

    neha: {
        name: "NEHA SINGH",
        skill: "Jewellery Artist",
        location: "Patna, Bihar",
        experience: "5 Years",
        speciality: "Handmade Jewellery",
        about: "I design unique handmade jewellery using traditional techniques.",
        image: "JEWELLERYY.png"
    }

};


// ==================================
// 2. SHOW ARTISAN PROFILE
// ==================================

function showProfile(artisanId) {

    let artisan = artisanProfiles[artisanId];

    if (artisan == undefined) {
        return;
    }

    document.getElementById("profile-image").src = artisan.image;

    document.getElementById("profile-name").innerText = artisan.name;

    document.getElementById("profile-skill").innerText = artisan.skill;

    document.getElementById("profile-location").innerText =
        "Location: " + artisan.location;

    document.getElementById("profile-experience").innerText =
        "Experience: " + artisan.experience;

    document.getElementById("profile-speciality").innerText =
        "Speciality: " + artisan.speciality;

    document.getElementById("profile-about").innerText = artisan.about;

}


// Profile links
let profileLinks = document.querySelectorAll(".visit-profile");

for (let i = 0; i < profileLinks.length; i++) {

    profileLinks[i].addEventListener("click", function () {

        let artisanId = this.getAttribute("data-artisan");

        showProfile(artisanId);

    });

}


// Featured artisan profiles
let featuredLinks = document.querySelectorAll(
    ".featured-artisans .artisan-card a"
);

for (let i = 0; i < featuredLinks.length; i++) {

    featuredLinks[i].addEventListener("click", function () {

        let artisanName = this.parentElement
            .querySelector("h3")
            .innerText.toLowerCase();

        if (artisanName.includes("ram")) {
            showProfile("ram");
        }

        else if (artisanName.includes("smita")) {
            showProfile("smita");
        }

        else if (artisanName.includes("neha")) {
            showProfile("neha");
        }

    });

}


// ==================================
// 3. SEARCH ARTISAN
// ==================================

function searchArtisan() {

    let name = document.getElementById("artisan-search")
        .value.toLowerCase().trim();

    let category = document.getElementById("category-filter")
        .value.toLowerCase().trim();

    let location = document.getElementById("location-filter")
        .value.toLowerCase().trim();

    let cards = document.querySelectorAll(
        ".artisan-list .artisan-card"
    );

    let found = 0;

    for (let i = 0; i < cards.length; i++) {

        let cardText = cards[i].innerText.toLowerCase();

        let nameMatch = cardText.includes(name);

        let categoryMatch =
            category == "" || cardText.includes(category);

        let locationMatch = cardText.includes(location);

        if (nameMatch && categoryMatch && locationMatch) {

            cards[i].style.display = "";
            found++;

        }

        else {

            cards[i].style.display = "none";

        }

    }

    let message = document.getElementById("search-message");

    if (message) {

        if (found == 0) {
            message.innerText =
                "No artisans found. Try another search!";
        }

        else {
            message.innerText = found + " artisan(s) found";
        }

    }

}


// Search form
let searchForm = document.querySelector(".search-form");

let searchInput = document.getElementById("artisan-search");

let categoryFilter = document.getElementById("category-filter");

let locationFilter = document.getElementById("location-filter");


// Search message
let searchMessage = document.createElement("p");

searchMessage.id = "search-message";

searchForm.appendChild(searchMessage);


// Search button
searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    searchArtisan();

});


// Search while typing
searchInput.addEventListener("input", searchArtisan);


// Search category
categoryFilter.addEventListener("change", searchArtisan);


// Search location
locationFilter.addEventListener("input", searchArtisan);


// ==================================
// 4. FAVOURITE ARTISAN
// ==================================

function favourite(button) {

    let card = button.closest(".artisan-card");

    let artisanName = card.querySelector("h3").innerText;

    let saved = JSON.parse(
        localStorage.getItem("craftnest-favourites") || "[]"
    );

    if (saved.includes(artisanName)) {

        saved = saved.filter(function (name) {
            return name != artisanName;
        });

        button.innerText = "♡ Favourite";

    }

    else {

        saved.push(artisanName);

        button.innerText = "♥ Favourited";

    }

    localStorage.setItem(
        "craftnest-favourites",
        JSON.stringify(saved)
    );

}


// Restore favourites after refresh
let favouriteButtons = document.querySelectorAll(".favorite-btn");

for (let i = 0; i < favouriteButtons.length; i++) {

    let cardName = favouriteButtons[i]
        .closest(".artisan-card")
        .querySelector("h3").innerText;

    let savedNames = JSON.parse(
        localStorage.getItem("craftnest-favourites") || "[]"
    );

    if (savedNames.includes(cardName)) {

        favouriteButtons[i].innerText = "♥ Favourited";

    }

}


// ==================================
// 5. CUSTOMER RATINGS
// ==================================

let artisanCards = document.querySelectorAll(
    ".artisan-list .artisan-card"
);

for (let i = 0; i < artisanCards.length; i++) {

    let ratingArea = document.createElement("p");

    ratingArea.className = "rating-area";

    ratingArea.innerHTML =
        'Rate: <button type="button">1</button> ' +
        '<button type="button">2</button> ' +
        '<button type="button">3</button> ' +
        '<button type="button">4</button> ' +
        '<button type="button">5</button>';

    artisanCards[i].appendChild(ratingArea);

    let ratingButtons = ratingArea.querySelectorAll("button");

    for (let j = 0; j < ratingButtons.length; j++) {

        ratingButtons[j].addEventListener("click", function () {

            let rating = j + 1;

            let artisanName = artisanCards[i]
                .querySelector("h3").innerText;

            let allRatings = JSON.parse(
                localStorage.getItem("craftnest-ratings") || "{}"
            );

            allRatings[artisanName] = rating;

            localStorage.setItem(
                "craftnest-ratings",
                JSON.stringify(allRatings)
            );

            ratingMessage.innerText =
                "Your rating: " + rating + "/5";

        });

    }

    let ratingMessage = document.createElement("span");

    ratingMessage.innerText = " Not rated yet";

    ratingArea.appendChild(ratingMessage);

}


// ==================================
// 6. INQUIRY FORM
// ==================================

let contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let customerName = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    let message = document.getElementById("message").value;

    if (
        customerName.trim() == "" ||
        email.trim() == "" ||
        message.trim() == ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    alert(
        "Thank you, " + customerName +
        "! Your inquiry has been recorded."
    );

    contactForm.reset();

});


// ==================================
// 7. ADMIN VERIFICATION
// ==================================

let adminTable = document.querySelector(".admin-section table");

let adminRows = adminTable.querySelectorAll("tr");


// Add action heading
let actionHeading = document.createElement("th");

actionHeading.innerText = "Admin Action";

adminRows[0].appendChild(actionHeading);


// Add approve and reject buttons
for (let i = 1; i < adminRows.length; i++) {

    let statusCell = adminRows[i].cells[3];

    let actionCell = document.createElement("td");

    let approveButton = document.createElement("button");

    let rejectButton = document.createElement("button");


    approveButton.innerText = "Approve";

    rejectButton.innerText = "Reject";

    rejectButton.style.marginLeft = "5px";


    approveButton.addEventListener("click", function () {

        statusCell.innerText = "Verified";

    });


    rejectButton.addEventListener("click", function () {

        statusCell.innerText = "Rejected";

    });


    actionCell.appendChild(approveButton);

    actionCell.appendChild(rejectButton);

    adminRows[i].appendChild(actionCell);

}
