# Project 1 - Booze Hound

## Description

This responsive web application allows users to search for bars in a specified city. Bars that users have previously looked up will be saved in their local storage and displayed in the buttons below the map.

## User Story

- AS A person that wants to easily discover new bars in any given location,
- I WANT to be able to enter a city into a search field to surface pertinent information about the bars located in that city such as the name, address, and website,
- SO THAT I can make better informed decisions when ultimately deciding which establishment to patronize.

## Acceptance Criteria

- GIVEN a dashboard with a search field
- WHEN I enter a city
- THEN the bars of that city will be displayed on the map as individual markers
- WHEN I click on a specific bar
- THEN its key information such as the address, phone number, website link can be shown as well as its location on the map
- THEN that bar, along with any other bars that were previously clicked on, will be stored in client-side storage as persistent data.

## Usage

• Once a city is entered into the search bar, a list of bars will be generated and as a default, the location of the first bar on the list will be displayed on the map.
• Users can click on "MORE INFO" to have a modal popup appear with the selected bar's information and/or click on the "Show Map" button to have the location of that bar display on the map at the bottom of the page.
• Search history will be saved in local storage and bars that were previously searched for will appear as buttons below the map.
• This desktop app is mobile compatible.

## Mock-Up
![Deployed Website](./assets/animation.gif)

## Credits

The Five Loopers:
• Irakli Eradze (https://github.com/ikaera)
• JR Li (https://github.com/NewJR666)
• Rances Rodriguez (https://github.com/Caliza)
• Joseph Serrato (https://github.com/Jsrra)
• Xavier Teo (https://github.com/XvrTeo)

## Technology Use

• Materialize CSS
• 1st server-side API: Open Brewery DB (https://www.openbrewerydb.org/)
• 2nd server-side API: Leaflet (https://leafletjs.com/)

## License

MIT License
Copyright (c) [2023] [The Five Loopers]
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
