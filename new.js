
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
