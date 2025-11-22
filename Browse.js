const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".search__name");
const parameters = new URLSearchParams(window.location.search)
let searchValue = "";

console.log(parameters.get("searchTerm"))

function changeSearchValue(event) {
  searchValue = event.target.value;
}

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

function movieInfo() {
  alert("More movie info coming soon!");
}

async function renderMovies() {
  if (!searchValue.length > 0) {
    alert("Please enter a movie title");
    return      
  }

  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchValue}&apikey=dcc16eb4`
  );

  const data = await response.json();

  if (!data || typeof data === undefined) {
    alert("Error fetching movie data. Please try again later.");
    return
  }

  const moviesArr = data.Search;
  console.log(moviesArr);
  moviesWrapper.innerHTML = moviesArr
    .slice(0, 9)
    .map((movie) => {
      return `
    <div class="movie">
    <img class="movie__title--img" src=${movie.Poster}/>  
    <h2 class="movie__title">${movie.Title}</h2>
    <h3 class="movie__year">${movie.Year}</h3>
    <button class="learn__more--btn click__effect"
    onclick="movieInfo()">Learn More</button>
    </div>  
    `;
  })
  .join("");

}

