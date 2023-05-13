const inputEl = document.getElementById("search-input");
const btnEL = document.getElementById("btn");
const mainEl = document.getElementById("movieslist");
const BaseUrl = "https://www.omdbapi.com/?apikey=3cd7d4a6&";

mainEl.innerHTML = `
  <div class="start-exploring-img">
    <img src="explore.png">
    <h3>Start exploring</h3>
  </div>
`;

btnEL.addEventListener("click", () => {
  let inputValue = inputEl.value;
  mainEl.innerHTML = "";

  fetch(`${BaseUrl}s=${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      let res = data.Response;

      if (data.Response === "True") {
        for (let imdb of data.Search) {
          fetchImdb(imdb);
        }
      } else if (data.Response === "False") {
        mainEl.innerHTML = `
          <div class="not-found">
            <h3>Unable to find what you’re looking for. <br>Please try another search.</h3>
          </div>
        `;
      }
    });
});

function fetchImdb(rating) {
  let id = rating.imdbID;

  fetch(`${BaseUrl}i=${rating.imdbID}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const movieId = data.imdbID;
      const movieElement = document.querySelector(`[data-id="${movieId}"]`);
      if (movieElement) {
        return;
      }
      renderMovies(data, rating.imdbID, movieId);
    });
}

function renderMovies(moviesData, id, movieId) {
  const movieDiv = document.createElement("div");
  movieDiv.setAttribute("data-id", movieId); // Setting a data attribute with the imdbID
  movieDiv.innerHTML = `
    <div class="movie-box-js">
      <div class="moviesPoster"> 
        <img src="${moviesData.Poster}">
      </div> 
      
      <div class="movies-details">
        <div class="details-heading">
          <h2>${moviesData.Title}<h2>
          <p>⭐${moviesData.imdbRating}</p>
        </div>

        <div class="details-genre">
          <p>${moviesData.Runtime}</p>
          <p>${moviesData.Genre}</p>
          <button id="addbtn_${id}" class="add-movies-btn">+ Watchlist</button>
        </div>

        <div class="details-plot">
          <p>${moviesData.Plot}</p>
        </div>
      </div>
    </div>`;

  mainEl.appendChild(movieDiv);

  // Add an event listener to the button element
  const addButton = document.getElementById(`addbtn_${id}`);
  addButton.addEventListener("click", () => {
    console.log("added");
    const addedToWatchlist = document.getElementById(`addbtn_${id}`);
    addedToWatchlist.textContent = "Added";
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (watchlist.includes(id)) {
      return;
    }
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  });
}
