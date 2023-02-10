const dropdownEl = document.querySelector(".dropdown-contents");
const brewName1 = document.getElementById('brewName1');
const brewName2 = document.getElementById('brewName2');
const brewAddress1 = document.getElementById('brewAddress1');
const brewCity1 = document.getElementById('brewCity1');
const brewState1 = document.getElementById('brewState1');
const breweries = []
const breweryList = document.querySelector('#breweryList');
const searchCity = document.querySelector('.search-city')
const cityBreweries = []
const searchFeedBack = document.getElementById('search-feedBack')
const showButton = document.querySelector('.show-button')
const showInput = document.querySelector('.show-input')
let state = ''

//fetches state state data from openbrewerydb api.

function fetchBreweries() {
    const apiUrlBreweries = `https://api.openbrewerydb.org/breweries?by_state=${state}`;
    fetch(apiUrlBreweries).then(function (response) {
        console.log(response);
        console.log(response.json);

        return response.json()
    }).then(function (data) {
        console.log(data, 'beta');
        data.forEach(brewery => {
            breweries.push(brewery)
        })
        displayBrewery(data)
        console.log(breweries);
    })
}

//fetches state city data from openbrewerydb api.

function fetchBreweriesByCity(city) {
    let apiUrlBrewery = `https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}`;
    fetch(apiUrlBrewery).then(function (response) {
        console.log(response);
        console.log(response.json);

        return response.json()
    }).then(function (data) {
        console.log(data);
    })
}

function handleCitySearch() {
    let city = document.querySelector('input').value
    searchBreweryByCity(city)
}

function searchBreweryByCity(city) {
    cityBreweries.splice(0, cityBreweries.length);
    for (let i = 0; i < breweries.length; i++) {
        if (breweries[i].city === city) {
            cityBreweries.push(breweries[i])
        }
    }
    console.log(cityBreweries);
    displayBrewery(cityBreweries)
    displayNoCityAlert()
}

//displays breweries by state from dropdown menu then by breweries by city when city is entered in input field.

function displayBrewery(data) {

    breweryList.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        let cardHeader = document.createElement('div');
        let cardBody = document.createElement('div');
        let card = document.createElement('div');
        cardBody.classList.add('cardBody')
        card.classList.add('brewClass')
        let brew2 = document.createElement('p')
        brew2.textContent = data[i].name
        let brew3 = document.createElement('p')
        brew3.textContent = data[i].street
        let brew4 = document.createElement('p')
        brew4.textContent = `${data[i].city}, ${data[i].state}: ${data[i].postal_code}`
        cardHeader.append(brew2)
        cardBody.append(brew3, brew4)
        card.append(cardHeader, cardBody)
        breweryList.append(card)
    }


}

//If city does not exist in state, sends alert message.

function displayNoCityAlert() {
    if (cityBreweries.length === 0) {
        searchFeedBack.classList.remove('hide')
        setTimeout(function () {           
            searchFeedBack.classList.add('hide')
        }, 3000)
    }
}

//Event listner that handles dropdown menu.

dropdownEl.addEventListener('click', function (event) {
    state = event.target.getAttribute('data-state');
    console.log(state);
    fetchBreweries() 
    console.log(event.target.innerText);
    console.log(event.target.value)
    showButton.classList.remove('hide')
    showInput.classList.remove('hide')
});

//Event listner for city input field.

searchCity.addEventListener('click', handleCitySearch)
