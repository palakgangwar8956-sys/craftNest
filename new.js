
let websitename = "CraftNest";
console.log(websitename);

// Artisan names
let artisans = ["Ram Kumar", "Smita Devi", "Neha Singh"];
console.log(artisans);

// One artisan object
let artisan = {
    name: "Ram Kumar",
    skill: "Pottery",
    location: "Agra"
};

console.log(artisan.name);
console.log(artisan.skill);


// SEARCH ARTISAN

function searchArtisan() {

    let name = document.getElementById("artisan-search").value.toLowerCase();
    let category = document.getElementById("category-filter").value.toLowerCase();
    let location = document.getElementById("location-filter").value.toLowerCase();

    let section = document.getElementsByClassName("artisan-list")[0];
    let cards = section.getElementsByClassName("artisan-card");

    let found = 0;

    for (let i = 0; i < cards.length; i++) {

        let cardText = cards[i].innerText.toLowerCase();

        if (
            cardText.includes(name) &&
            cardText.includes(category) &&
            cardText.includes(location)
        ) {
            cards[i].style.display = "";
            found++;
        } else {
            cards[i].style.display = "none";
        }
    }

    if (found == 0) {
        alert("No artisans found, try something else");
    }
}


// SEARCH FORM

let searchForm = document.getElementsByClassName("search-form")[0];

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    searchArtisan();
});


// FAVOURITE BUTTON

function favourite(button) {

    if (button.innerText == "♡ Favourite") {
        button.innerText = "♥ Favourited";
    } else {
        button.innerText = "♡ Favourite";
    }
}


// CONTACT FORM

let contactForm = document.getElementsByClassName("contact-form")[0];

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();

    if (name == "") {
        alert("Please enter your name");
        return;
    }

    alert("Thank you " + name + " for contacting us!");

    contactForm.reset();
});


// ARTISAN PROFILE DATA

let artisanProfiles = {

    ram: {
        name: "RAM KUMAR",
        image: "POTTERY.png",
        skill: "Pottery Artist",
        location: "AGRA, UTTAR PRADESH",
        experience: "8 Years",
        speciality: "Handmade Clay Art",
        about: "I create beautiful handmade pottery inspired by traditional Indian art."
    },

    smita: {
        name: "SMITA DEVI",
        image: "HANDLOOMM.png",
        skill: "Handloom Artist",
        location: "KASOL, HIMACHAL PRADESH",
        experience: "6 Years",
        speciality: "Traditional Handloom Weaving",
        about: "I create traditional handloom products with care and creativity."
    },

    neha: {
        name: "NEHA SINGH",
        image: "JEWELLERYY.png",
        skill: "Jewellery Artist",
        location: "PATNA, BIHAR",
        experience: "5 Years",
        speciality: "Handmade Jewellery",
        about: "I make unique handmade jewellery inspired by Indian designs."
    }

};


// SHOW SELECTED ARTISAN PROFILE

function showProfile(selectedArtisan) {

    let profile = artisanProfiles[selectedArtisan];

    if (!profile) {
        alert("Artisan profile not found");
        return;
    }

    document.getElementById("profile-image").src = profile.image;

    document.getElementById("profile-image").alt = profile.name;

    document.getElementById("profile-name").innerText = profile.name;

    document.getElementById("profile-skill").innerText = profile.skill;

    document.getElementById("profile-location").innerText =
        "Location: " + profile.location;

    document.getElementById("profile-experience").innerText =
        "Experience: " + profile.experience;

    document.getElementById("profile-speciality").innerText =
        "Speciality: " + profile.speciality;

    document.getElementById("profile-about").innerText = profile.about;

}


// VIEW PROFILE BUTTONS

document.addEventListener("click", function(event) {

    let button = event.target.closest(".visit-profile");

    if (!button) {
        return;
    }

    event.preventDefault();

    let selectedArtisan = button.getAttribute("data-artisan");

    showProfile(selectedArtisan);

    document.getElementById("profile").scrollIntoView({
        behavior: "smooth"
    });

});


// TOTAL ARTISANS

function showArtisanCount() {
    alert("Total Artisans: " + artisans.length);
}
