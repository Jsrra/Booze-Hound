// Leaflet Map script

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


        // const latitude = data.list

        //use Leaflet method `on()`
        map.on('click', function (mEvent) {
            console.log(mEvent);
            const lat = mEvent.latlng.lat;
            const lng = mEvent.latlng.lng;
            // const {lat, lng} = mEvent.latlng;

            L.marker([lat, lng])
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
        });
        // console.log(on);

    }, function () {
        alert('It cannot find the current location.');
    });

// <<<< openbrewerydb.org API >>>>>>

function getListBreweries() {
    //List Breweries -->by_city and by_state
    const base = 'https://api.openbrewerydb.org/breweries';

    const query = `?by_city=Brooklyn&by_state=new_york&per_page=20`;

    //Search Breweries
    // const base = https://api.openbrewerydb.org/breweries/search?query={search};
    // 

    const requestUrl = base + query;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .then(function (data) {

        })
    return;
}
getListBreweries()