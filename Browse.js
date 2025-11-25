const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".search__name");
const inputfield = document.querySelector(".input__field");

let searchValue = "";
let moviesArr = []
let displayMoviesArr = []

const parameters = new URLSearchParams(window.location.search);
const searchTermFromParams = parameters.get("searchTerm");
const menuToggle = document.getElementById("menu__toggle");
const navMenu = document.getElementById("nav__menu");
const placeHolderImg = "./assets/placeholder.png";
const searchTermFromStorage = sessionStorage.getItem("movieSearchTerm");

if (searchTermFromParams) {
  inputfield.value = searchTermFromParams;
  renderMovies(searchTermFromParams);
}

function changeSearchValue(event) {
  searchValue = event.target.value;
  searchName.innerHTML = event.target.value;
}

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

if (searchTermFromStorage) {
  inputfield.value = searchTermFromStorage;
  renderMovies(searchTermFromStorage);
  searchName.innerHTML = searchTermFromStorage;
}

function movieInfo() {
  alert("More movie info coming soon!");
}

async function renderMovies() {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${
      searchValue || searchTermFromParams || searchTermFromStorage
    }&apikey=dcc16eb4`
  );

  const data = await response.json();

  if (!data || data.Response === "False" || !Array.isArray(data.Search)) {
    if (data && data.Error) {
      alert(`Error fetching movie data: ${data.Error}`);
    } else {
      alert(
        "No movies found or an error occurred. Please try a different search term."
      );
    }
    return;
  }
  displayMovies()
 moviesArr = data.Search;
 displayMoviesArr = moviesArr.slice(0, 6)
}
function displayMovies() {
  moviesWrapper.innerHTML = displayMoviesArr
    .slice(0, 6)
    .map((movie) => {
      return `
            <div class="movie">
            <img class="movie__title--img" src=${movie.Poster}"
            onerror="this.onerror=null; this.src='${placeHolderImg}';"/>  
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">${movie.Year}</h3>
            <button class="learn__more--btn click__effect"
            onclick="movieInfo()">Learn More</button>
            </div>  
            `;
    })
    .join("");

}
  let currentSortState = 'default'

  function toggleSortOrder() {
    if (currentSortState === 'default') {
      currentSortState = 'a-z';
    } else if (currentSortState === 'a-z') {
      currentSortState = 'z-a';
    } else if (currentSortState === 'z-a') {
      currentSortState = 'date';
    } else if (currentSortState === 'date') {
      currentSortState = 'default'
    }

    document.getElementById('sort__button').textContent = `Sort: ${currentSortState.toUpperCase()}`;
    sortMovies();
    renderMovies();
  }
  function sortMovies() {
  if (currentSortState === 'a-z') {
    displayMoviesArr.sort((a, b) => {
      const titleA = a.Title.toLowerCase();
      const titleB = b.Title.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else if (currentSortState === 'z-a') {
    displayMoviesArr.sort((a, b) => {
      const titleA = a.Title.toLowerCase();
      const titleB = b.Title.toLowerCase();
      return titleB.localeCompare(titleA); 
    });
  } else if (currentSortState === 'date') {
    displayMoviesArr.sort((a, b) => {
      return parseInt(b.Year) - parseInt(a.Year); 
    });
  }

}




menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});
