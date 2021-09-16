let init = () =>

{
const searchForm = document.getElementById('search-form')
// const searchBox = document.getElementById('search')
// const movieCard = document.getElementById('movie-card')
const movieContainer = document.getElementById('movie-container')
// const movieTitle = document.getElementById('card-title')
// const iconList = document.getElementById('icon-list')
const magnify = document.getElementsByClassName('search-input')


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
  // console.log(jsonData)
  jsonData.results.map(searchResultItem => {
    let newMovieCard = document.createElement('div')
    newMovieCard.className = 'card, float-child'
    
    let newSearchResultName = document.createElement('h5')
    newSearchResultName.innerText = searchResultItem.name
    newSearchResultName.className = 'title' // need to append to newMovieCardBody
    
    let newSearchResultImage = document.createElement('img')
    newSearchResultImage.className = 'photo'
      if (!searchResultItem.picture) {
        newSearchResultImage.src = "placeholder.png"
      } else {
        newSearchResultImage.src = searchResultItem.picture // need to append to newMovieCardBody
      }

    

    // let newMovieCardBody = document.createElement('div')
    // newMovieCardBody.className = 'movie-card-body'

    let lineBreak = document.createElement('div')
    lineBreak.innerText = '_________________________________'
    // newMovieCardBody.appendChild(lineBreak)
    
    // newMovieCardBody.appendChild(newSearchResultName) //this appends title

    newMovieCard.append(newSearchResultName, newSearchResultImage, lineBreak) //this appends image to card
    // newMovieCard.appendChild(newMovieCardBody)
    
   
    
    searchResultItem.locations.map(searchResultLocation => {
      let newSearchLink= document.createElement('a')
      newSearchLink.href = searchResultLocation.url
        newSearchLink.onclick = function externalAlert () {
        newSearchLink.target = "_new"
        return confirm("You are being sent to an external website")
        }
      let newSearchIcon = document.createElement('img')
      newSearchIcon.src = searchResultLocation.icon
      newSearchIcon.className = 'icon-class' //ADDED CLASS TO ICON FOR PADDING
      newSearchLink.appendChild(newSearchIcon)
      newMovieCard.appendChild(newSearchLink)
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