const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".search__name");

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

async function renderMovies(searchTerm) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=dcc16eb4&s=${searchTerm}`
  );
  const data = await response.json();
  const moviesArr = data.Search;
  console.log(moviesArr);
  moviesWrapper.innerHTML = moviesArr
    .slice(0, 6)
    .map((movie) => {
      return `
    <div class="movie>
    <img src=${movie.Poster}/>  
    <h2>${movie.Title}</h2>
    <h3>${movie.Year}</h3>
    <button>Learn More</button>
    </div>  
    `;
    })
    .join("");
}
