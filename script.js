// Send all data request to:
// http://www.omdbapi.com/?apikey=dcc16eb4&s=
// Poster API requests:
// http://img.omdbapi.com/?apikey=dcc16eb4&

let contrastToggle = false;
let searchTerm = "";

function toggleContrast() {
    contrastToggle = !contrastToggle
    if (contrastToggle) {
    document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

function setSearchTerm(event) {
    searchTerm = event.target.value
}

function goToBrowseMovies() {
    if (!searchTerm.length > 0) {
        return
    }
   const origin = window.location.origin;
   window.location.href =  `${origin}/Browse.html?searchTerm=${encodeURIComponent(searchTerm)}`
}a