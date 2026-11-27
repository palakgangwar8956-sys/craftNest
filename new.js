
let websitename = "CraftNest";
console.log(websitename);
let artisans = ["Ram Kumar", "Smita Devi", "Neha Singh"];
console.log(artisans);
let artisan = {
    name: "Ram Kumar",
    skill: "Pottery",
    location: "Agra"
};
console.log(artisan.name);
console.log(artisan.skill);
function searchArtisan() {

    let name = document.getElementById("artisan-search").value.toLowerCase();
    let category = document.getElementById("category-filter").value.toLowerCase();
    let location = document.getElementById("location-filter").value.toLowerCase();
    if (category == "all") {
        category = "";
    }

    if (location == "all") {
        location = "";
    }

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

    console.log("Artisans found: " + found);

    if (found == 0) {
        alert("No artisans found, try something else");
    }
}
let searchForm = document.getElementsByClassName("search-form")[0];

searchForm.onsubmit = function(event) {
    event.preventDefault();
    searchArtisan();
};
function favourite(button) {

    if (button.innerText == "♡ Favourite") {
        button.innerText = "♥ Favourited";
    } else {
        button.innerText = "♡ Favourite";
    }
}
let contactForm = document.getElementsByClassName("contact-form")[0];
contactForm.onsubmit = function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    if (name == "") {
        alert("Please enter your name");
        return;
    }
    alert("Thank you " + name + " for contacting us!");
    contactForm.reset();
};
function showArtisanCount() {
    alert("Total Artisans: " + totalartisans);
}

// ARTISAN PROFILE: show the selected artisan
function showProfile(selectedArtisan) {
    let profile;

    if (selectedArtisan == "ram") {
        profile = {
            name: "RAM KUMAR",
            image: "POTTERY.png",
            skill: "Pottery Artist",
            location: "AGRA, UTTAR PRADESH",
            experience: "8 Years",
            speciality: "Handmade Clay Art",
            about: "I create beautiful handmade pottery inspired by traditional Indian art."
        };
    } else if (selectedArtisan == "smita") {
        profile = {
            name: "SMITA DEVI",
            image: "HANDLOOMM.png",
            skill: "Handloom Artist",
            location: "KASOL, HIMACHAL PRADESH",
            experience: "6 Years",
            speciality: "Traditional Handloom Weaving",
            about: "I create traditional handloom products with care and creativity."
        };
    } else if (selectedArtisan == "neha") {
        profile = {
            name: "NEHA SINGH",
            image: "JEWELLERYY.png",
            skill: "Jewellery Artist",
            location: "PATNA, BIHAR",
            experience: "5 Years",
            speciality: "Handmade Jewellery",
            about: "I make unique handmade jewellery inspired by Indian designs."
        };
    }

    if (profile) {
        let profileSection = document.getElementById("profile");
        let profileImage = profileSection.getElementsByTagName("img")[0];
        let profileDetails = profileSection.getElementsByClassName("profile-details")[0];
        let profileTexts = profileDetails.getElementsByTagName("p");

        profileImage.src = profile.image;
        profileImage.alt = profile.name + " profile";
        profileDetails.getElementsByTagName("h2")[0].innerText = profile.name;
        profileTexts[0].innerText = profile.skill;
        profileTexts[1].innerText = "Location: " + profile.location;
        profileTexts[2].innerText = "Experience: " + profile.experience;
        profileTexts[3].innerText = "Speciality: " + profile.speciality;
        profileTexts[4].innerText = profile.about;
    }
}
