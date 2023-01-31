let barLat = "";
let barLon = "";

document.getElementById("submit").addEventListener("click", handleSearchSubmit)




function handleSearchSubmit(event) {
    event.preventDefault();
    var city = document.getElementById("city").value;
    search(city)
}
function search(city) {

    if (!city) {
        return
    }
    saveToStorage(city)
    fetch("https://api.openbrewerydb.org/breweries?by_city=" + city)
        .then(function (response) {

            return response.json();

            barLat = data[0].latitude
            barLon = data[0].longitude
            console.log(barLat, barLon)

        })
        .then(function render(breweries) {
            console.log(breweries)
            console.log(breweries[0].latitude)
            console.log(breweries[0].longitude)
            geoLocation(breweries[0].latitude, breweries[0].longitude, breweries[0].name)
            var results = document.getElementById("results");
            results.innerHTML = "";
            for (var i = 0; i < breweries.length; i++) {
                var brewery = breweries[i];
                results.innerHTML +=
                    "<div class='card'>" +
                    "<div class='card-content'>" +
                    "<span class='card-title'>" +
                    brewery.name +
                    "</span>" +
                    "<p>Type: " +
                    brewery.brewery_type +
                    "</p>" +
                    "<p>Address: " +
                    brewery.street +
                    "</p>" +
                    "<p>Phone: " +
                    brewery.phone +
                    "</p>" +
                    "</div>" +
                    "<div class='card-action'>" +
                    "<a class='modal-trigger' href='#modal" +
                    i +
                    "'>More info</a>" +
                    "</div>" +
                    "</div>" +
                    "<div id='modal" +
                    i +
                    "' class='modal'>" +
                    "<div class='modal-content'>" +
                    "<h4>" +
                    brewery.name +
                    "</h4>" +
                    "<p>Type:" +
                    brewery.brewery_type +
                    "</p>" +
                    "<p>Address: " +
                    brewery.street +
                    "</p>" +
                    "<p>Phone: " +
                    brewery.phone +
                    "</p>" +
                    "<p>Website: " +
                    "<a href='" + brewery.website_url + "'>" + brewery.website_url + "</a>" +
                    "</p>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                    "<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>" +
                    "</div>" +
                    "</div>";

            }
            createButtons();
            var modals = document.querySelectorAll(".modal");
            M.Modal.init(modals);
        });
};
// Get references to the search form and input field
var searchForm = document.querySelector("form");
var searchInput = document.querySelector("input[type='text']");
// Create a "Reset" button
var resetButton = document.createElement("button");

resetButton.innerHTML = "Reset";
resetButton.classList.add("btn");
resetButton.classList.add("waves-effect");
resetButton.classList.add("waves-light");
resetButton.classList.add("blue");
searchForm.appendChild(resetButton);
// Add a click event listener to the "Reset" button
resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    searchInput.value = "";
    searchInput.focus();
});

function geoLocation(longitude, latitude, barName) {

    navigator.geolocation.getCurrentPosition(function (myPosition) {

        const lat = myPosition.coords.latitude;
        const lon = myPosition.coords.longitude;
        console.log(lat, lon);

        const currentCords = [longitude, latitude];

        const map = L.map('map').setView(currentCords, 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // console.log(barLat, bar)
        L.marker([longitude, latitude])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 260,
                minWidth: 90,
                autoClose: false,
                closeOnClick: false,
                className: 'beer-popup',

            }))
            .setPopupContent(barName)
            .openPopup();
        // const latitude = data.list

        //use Leaflet method `on()`
        map.on('click', function (mEvent) {
            console.log(mEvent);
            const lat = mEvent.latlng.lat;
            const lng = mEvent.latlng.lng;
            // const {lat, lng} = mEvent.latlng;


        });
        // console.log(on);

    }, function () {
        alert('It cannot find the current location.');
    })
}

const searchHistory = document.querySelector("#search-history")

function saveToStorage(cityName) {
    var savedCities = JSON.parse(localStorage.getItem("saved-city")) || []
    console.log(savedCities.includes(cityName))
    if (savedCities.includes(cityName)) {
        return 0;
    }
    savedCities.push(cityName)
    localStorage.setItem("saved-city", JSON.stringify(savedCities))
}
function createButtons() {
    searchHistory.innerHTML = ""
    var savedCities = JSON.parse(localStorage.getItem("saved-city")) || []
    for (i = 0; i < savedCities.length; i++) {
        var newButton = document.createElement("button")
        newButton.textContent = savedCities[i]
        newButton.value = savedCities[i]

        // newButton.addEventListener("click", function () {
        //     console.log(this.textContent)
        //     render(this.textContent)
        // })
        searchHistory.append(newButton)
    }

}
;
function recallHistory(event) {
    event.preventDefault();
    console.log(event)
    console.log(event.target)
    console.log(event.target.innerHTML)
    search(event.target.value)
}
searchHistory.addEventListener("click", recallHistory)
