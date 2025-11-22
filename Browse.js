const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".search__name");

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

async function renderMovies(searchTerm) {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&apikey=dcc16eb4`
  );
  // if (!data.Search) {
  //   moviesData.innerHTML = <p>No results found</p>;
 
  //   console.log(moviesData)
  // }

  // const moviesData = data.Search
  const data = await response.json();
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
    <button class="learn__more--btn click__effect">Learn More</button>
    </div>  
    `;
  })
  .join("");

}

