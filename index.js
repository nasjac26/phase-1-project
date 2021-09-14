let init = () =>

{
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search')
const movieCard = document.getElementById('movie-card')
const movieContainer = document.getElementById('movie-container')

let fetchStreamApi = (search) => {
  return fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=`+search, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    "x-rapidapi-key": "d220c32422msh6b2054b6955b0a5p179a78jsnd83410f5b4c1"
  }
  })
  .then(response => response.json())
  .then(json => renderSearchResults(json))
  .catch(err => {
    console.error(err);
  });
}

let renderSearchResults = (jsonData) => {
  clearSearchResults()
  console.log(jsonData)
  jsonData.results.map(searchResultItem => {
    let newSearchResultName = document.createElement('h2')
    newSearchResultName.innerText = searchResultItem.name
    debugger;
    let newSearchResultImage = document.createElement('img')
    newSearchResultImage.classList.add('photo')
    newSearchResultImage.src = searchResultItem.picture
    movieCard.appendChild(newSearchResultName)
    movieCard.appendChild(newSearchResultImage)
    searchResultItem.locations.map(searchResultLocation => {
      let newSearchLink= document.createElement('a')
      newSearchLink.href = searchResultLocation.url
      newSearchLink.onclick = function externalAlert () {
        return confirm("You are being sent to an external website")
      }
      let newSearchIcon = document.createElement('img')
      newSearchIcon.src = searchResultLocation.icon
    newSearchLink.appendChild(newSearchIcon)
    movieCard.appendChild(newSearchLink)

    })
   

  })
  }

let clearSearchResults = () =>{
movieCard.innerHTML = "";
}


let amendSearch = (event) => {
  event.preventDefault()
  let searchString = search.value.replace(" ", "%20")
  fetchStreamApi(searchString)
  search.value = ""
  }


searchForm.addEventListener('submit', amendSearch)
}
document.addEventListener('DOMContentLoaded', init())