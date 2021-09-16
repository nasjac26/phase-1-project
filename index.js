let init = () => {
  const searchForm = document.getElementById('search-form')
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
    clearSearchResults();
    jsonData.results.map(searchResultItem => {
      let newMovieCard = document.createElement('div')
      newMovieCard.className = 'card, float-child'
      
      let newSearchResultName = document.createElement('h5')
      newSearchResultName.innerText = searchResultItem.name
      newSearchResultName.className = 'title'
      
      let newSearchResultImage = document.createElement('img')
      newSearchResultImage.className = 'photo'
        if (!searchResultItem.picture) {
          newSearchResultImage.src = "placeholder.png"
        } else {
          newSearchResultImage.src = searchResultItem.picture 
        }

      let lineBreak = document.createElement('div')
      lineBreak.innerText = '_________________________________'
      
      newMovieCard.append(newSearchResultName, newSearchResultImage, lineBreak) 
    
      searchResultItem.locations.map(searchResultLocation => {
        let newSearchLink= document.createElement('a')
        newSearchLink.href = searchResultLocation.url
          newSearchLink.onclick = function externalAlert () {
          newSearchLink.target = "_new"
          return confirm("You are being sent to an external website")
          }
        let newSearchIcon = document.createElement('img')
        newSearchIcon.src = searchResultLocation.icon
        newSearchIcon.className = 'icon-class'
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