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

dropdownEl.addEventListener('click', function (event) {
    let state = event.target.innerText;
    fetchBreweries(state)
    // console.log(event); 
    console.log(event.target.innerText);
    console.log(event.target.value)
    showButton.classList.remove('hide')
    showInput.classList.remove('hide')
});

searchCity.addEventListener('click', handleCitySearch)

function fetchBreweries(state) {
    let apiUrlBreweries = `https://api.openbrewerydb.org/breweries?by_state=${state}`;
    fetch(apiUrlBreweries).then(function (response) {
        console.log(response);
        console.log(response.json);

        return response.json()
    }).then(function (data) {
        console.log(data);
        data.forEach(brewery => {
            breweries.push(brewery)
        })
        displayBrewery(data)
    })
}

function handleCitySearch() {
    let city = document.querySelector('input').value
    searchBreweryByCity(city)
}

function searchBreweryByCity(city) {

    for (let i = 0; i < breweries.length; i++) {
        if (breweries[i].city === city) {
            cityBreweries.push(breweries[i])
        }
    }
    console.log(cityBreweries);
    displayBrewereyByCity()
}

function displayBrewery(data) {

    breweryList.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        let cardHeader = document.createElement('div');
        let cardBody = document.createElement('div');
        let card = document.createElement('div');
        cardBody.classList.add('cardBody')
        card.classList.add('brewClass')
        // brewName1.textContent = data[i].name
        // brewAddress1.textContent = data[i].street
        // brewCity1.textContent = data[i].city
        // brewState1.textContent =', ' +data[i].state 
        // brewName2.textContent = data[i].name 
        let brew2 = document.createElement('p')
        brew2.textContent = data[i].name
        let brew3 = document.createElement('p')
        brew3.textContent = data[i].street
        let brew4 = document.createElement('p')
        brew4.textContent = data[i].city+',  '+data[i].state+': '+data[i].postal_code
        cardHeader.append(brew2)
        cardBody.append(brew3, brew4)
        card.append(cardHeader, cardBody)
        breweryList.append(card)

        // console.log(brew2, 'beta');
    }


}

function displayBrewereyByCity() {
    if (cityBreweries.length === 0) {
        searchFeedBack.classList.remove('hide')
        setTimeout(function () {           
            searchFeedBack.classList.add('hide')
        }, 3000)
    }
}




