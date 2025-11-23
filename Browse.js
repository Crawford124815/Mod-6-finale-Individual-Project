const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".search__name");
const inputfield = document.querySelector(".input__field")
let searchValue = "";

const parameters = new URLSearchParams(window.location.search)
const searchTermFromParams = parameters.get("searchTerm")

if (searchTermFromParams) {
  inputfield.value = searchTermFromParams
  renderMovies(searchTermFromParams)
}

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
  if (!searchTermFromParams.length > 0) {
    alert("Please enter a movie title");
    return      
  }

  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchValue}&apikey=dcc16eb4`
  );

  const data = await response.json();

 
  // if (!data || data.Response === 'False' || !Array.isArray(data.Search)) {
  //   if (data && data.Error) {
  //     alert(`Error fetching movie data: ${data.Error}`);
  //   } else {
  //     alert("No movies found or an error occurred. Please try a different search term.");
  //   }
  //   return;
  // }

  const moviesArr = data.Search;
  console.log(moviesArr);
  moviesWrapper.innerHTML = moviesArr
    .slice(0, 6)
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

