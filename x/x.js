let barLat = "";
let barLon = "";

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    var city = document.getElementById("city").value;
    saveToStorage(city)
    fetch("https://api.openbrewerydb.org/breweries?by_city=" + city)
        .then(function (response) {

            return response.json();

            barLat = data[0].latitude
            barLon = data[0].longitude

        })
        .then(function render(breweries) {
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
});
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

if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function (myPosition) {

        const lat = myPosition.coords.latitude;
        const lon = myPosition.coords.longitude;
        // console.log(lat, lon);

        const currentCords = [lat, lon];

        const map = L.map('map').setView(currentCords, 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // console.log(barLat, bar)
        L.marker([barLat, barLon])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 260,
                minWidth: 90,
                autoClose: false,
                closeOnClick: false,
                className: 'beer-popup',

            }))
            .setPopupContent('Beer Bar')
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
    });

const searchHistory = document.querySelector("#search-history")
var savedCities = JSON.parse(localStorage.getItem("saved-city")) || []
function saveToStorage(cityName) {
    savedCities.push(cityName)
    localStorage.setItem("saved-city", JSON.stringify(savedCities))
}
function createButtons() {
    for (i = 0; i < savedCities.length; i++) {
        var newButton = document.createElement("button")
        newButton.textContent = savedCities[i]
        newButton.addEventListener("click", function () {
            console.log(this.textContent)
            render(this.textContent)
        })
        searchHistory.append(newButton)
    }

}
;