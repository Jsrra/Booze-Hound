
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

    L.marker(currentCords).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();


  }, function () {
    alert('It cannot find the current location.');
  });

// console.log('test');