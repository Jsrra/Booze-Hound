const dropdownEl = document.querySelector(".dropdown-contents");
const brewName1 = document.getElementById('brewName1');
const brewAddress1 = document.getElementById('brewAddress1');
const brewCity1 = document.getElementById('brewCity1');
const brewState1 = document.getElementById('brewState1');
const breweries = []
const searchCity = document.querySelector('.search-city')
const cityBreweries = []
const searchFeedBack = document.getElementById('search-feedBack')

dropdownEl.addEventListener('click', function(event){
    let state = event.target.innerText;
    fetchBreweries(state)
// console.log(event); 
console.log(event.target.innerText);   
console.log(event.target.value)
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
        data.forEach(brewery=>{
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
        if (breweries[i].city===city) {
            cityBreweries.push(breweries[i])
        }        
    }
    console.log(cityBreweries);
    displayBrewereyByCity()
}

function displayBrewery(data) {
    console.log(data[0].name, 'beta');
    console.log(data[0].street, 'beta');
    for (let i = 0; i < breweries.length; i++) {
    brewName1.textContent = data[i].name
    brewAddress1.textContent = data[i].street
    brewCity1.textContent = data[i].city
    brewState1.textContent =', ' +data[i].state  
        
    }
    
}

function displayBrewereyByCity() {
    if (cityBreweries.length===0) {
        searchFeedBack.classList.remove('hide')
        setTimeout(function () {
            searchFeedBack.classList.add('hide')
        }, 3000)
    }
}
// function openMenu () {
//     document.querySelector('.dropdown-contents')
    
// }