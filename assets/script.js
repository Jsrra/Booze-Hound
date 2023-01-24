
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

    
      //use Leaflet method `on()`
      map.on('click', function(mEvent){
        console.log(mEvent);
        const lat = mEvent.latlng.lat;
        const lng = mEvent.latlng.lng;
        // const {lat, lng} = mEvent.latlng;

        L.marker([lat, lng])
        .addTo(map)
        .bindPopup( L.popup({
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



// console.log('test');