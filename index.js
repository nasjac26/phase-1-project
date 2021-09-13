const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search')

let fetchStreamApi = (search) => {
  return fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=`+search, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    "x-rapidapi-key": "d220c32422msh6b2054b6955b0a5p179a78jsnd83410f5b4c1"
  }
  })
  .then(response => response.json())
  .then(json => testFunction(json))
  .catch(err => {
    console.error(err);
  });
}

let testFunction = (jsonData) => {
  console.log(jsonData)

}

let amendSearch = (event) => {
  event.preventDefault()
  let searchString = search.value.replace(" ", "%20")
  fetchStreamApi(searchString)
  search.value = ""
  }


searchForm.addEventListener('submit', amendSearch)

