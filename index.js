let init = () =>

{
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search')
const movieCard = document.getElementById('movie-card')
const movieContainer = document.getElementById('movie-container')
const movieTitle = document.getElementById('card-title')
const iconList = document.getElementById('icon-list')


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
    let newMovieCard = document.createElement('div')
    // newMovieCard.id = `${searchResultItem.name}`
    newMovieCard.className = 'card, row, float-child'
    
    
    
    let newSearchResultName = document.createElement('h5')
    newSearchResultName.innerText = searchResultItem.name
    newSearchResultName.className = 'title' //took out card-title class
    
    let newSearchResultImage = document.createElement('img')
    newSearchResultImage.className = 'card-img-top'
    newSearchResultImage.className = 'photo'
    newSearchResultImage.src = searchResultItem.picture

    let newMovieCardBody = document.createElement('div')
    // newMovieCardBody.id = `movie-${searchResultItem.name}`
    newMovieCardBody.className = 'card-body, test-card-body'

    
    newMovieCardBody.appendChild(newSearchResultName) //this appends title

    newMovieCardBody.appendChild(newSearchResultImage) //this appends image to card
    newMovieCard.appendChild(newMovieCardBody)

    searchResultItem.locations.map(searchResultLocation => {
      let newSearchLink= document.createElement('a')
      newSearchLink.href = searchResultLocation.url
      newSearchLink.onclick = function externalAlert () {
        return confirm("You are being sent to an external website")
      }
      let newSearchIcon = document.createElement('img')
      newSearchIcon.src = searchResultLocation.icon
      newSearchIcon.className = 'icon-class' //ADDED CLASS TO ICON FOR PADDING
    newSearchLink.appendChild(newSearchIcon)
    newMovieCardBody.appendChild(newSearchLink)
    })
    
    movieContainer.appendChild(newMovieCard)


  })
  }

let clearSearchResults = () =>{
  movieContainer.innerText = "";
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