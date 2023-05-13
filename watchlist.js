const BaseUrl = " https://www.omdbapi.com/?apikey=3cd7d4a6&";
const watchlist = JSON.parse(localStorage.getItem("watchlist"));
const DisplayElement = document.getElementById("mainel");

let toDisplay = "";

function removeMovie(imdbId) {
  console.log("removed bro");
  const movieElement = document.getElementById(`movie_${imdbId}`);
  if (movieElement) {
    const indexToRemove = watchlist.indexOf(imdbId);
    watchlist.splice(indexToRemove, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    movieElement.remove();
  }
}

function renderWatchlist(data) {
  toDisplay = `
    <div class = "movie-box-js" id="movie_${data.imdbID}">
    <div class = "moviesPoster"> 
        <img src="${data.Poster}">
    </div> 
    
    <div class ="movies-details">

          <div class ="details-heading">
          <h2>${data.Title}<h2>
          <p>
          ⭐${data.imdbRating}</p>
          </div>
          
          <div class = "details-genre" >
          <p>${data.Runtime}</p>
            <p>${data.Genre}</p>
            <button class = "add-movies-btn" id="removeBtn_${data.imdbID}")">- Remove</button>
          </div>

          <div class ="details-plot">
            <p>${data.Plot}</p>
          </div>

    </div>
    
</div>  
`;
}

function main() {
  DisplayElement.innerHTML = "";
  watchlist.forEach((element) => {
    fetch(`${BaseUrl}i=${element}`)
      .then((res) => res.json())
      .then((data) => {
        renderWatchlist(data);
        DisplayElement.innerHTML += toDisplay;
      });
  });
  DisplayElement.addEventListener("click", (event) => {
    if (event.target.matches(".add-movies-btn")) {
      const imdbId = event.target.id.replace("removeBtn_", "");
      removeMovie(imdbId);
    }
  });
}

main();
