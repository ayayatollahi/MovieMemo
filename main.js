import { fetchProducts, apiConfig } from "./src/network.js";
import { addToJournal, addToCart } from "./src/storage.js";

const search = document.querySelector("#search-bar");
const movieContainer = document.getElementById("movie-list");
const menu = document.getElementById("mobile-menu");
const movieJournal = JSON.parse(localStorage.getItem("journal"));

let movies = []; // Initialize an empty array

document.getElementById("menu-toggle").addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function isInTheList(element) {
  return favorites.some((e) => e === element);
}

function saveFavorites(movieId) {
  localStorage.setItem(String(movieId), JSON.stringify(favorites));
}

async function getPopularMovies() {
  const response = await fetch(
    `${apiConfig.tmdbBaseUrl}/movie/popular?api_key=${apiConfig.tmdbApiKey}`
  );
  return await response.json();
}

// Fetch movies and populate the `movies` array
async function fetchMovies() {
  try {
    movies = (await getPopularMovies()).results;
    displayMovies(""); // Display all movies on page load
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

async function displayMovies(input) {
  if (!movieContainer) return;
  let addButton;
  try {
    if (!input) {
      // Display all movies if input is empty
      movieContainer.innerHTML = "";
      movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
        addButton = movieCard.querySelector(`#add-button-${movie.id}`);
        addButton.style.backgroundColor = movieJournal.find(
          (fav) => fav.id === movie.id
        )
          ? "#28A745"
          : "bg-yellow-400";
      });
    } else {
      // Filter movies based on input
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(input.toLowerCase())
      );

      movieContainer.innerHTML = "";

      if (!filteredMovies.length) {
        movieContainer.innerHTML = `<p class="text-white">No movies found matching "${input}"</p>`;
      } else {
        filteredMovies.forEach((movie) => {
          const movieCard = createMovieCard(movie);
          movieContainer.appendChild(movieCard);
        });
      }
    }
  } catch (error) {
    console.error("Error displaying movies:", error);
    movieContainer.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
  }
}

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.className =
    "bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105";

  movieCard.innerHTML = `
    <img
      src="${apiConfig.imageBaseUrl + movie.poster_path}"
      alt="${movie.title}"
      class="w-full h-64 object-cover"
    />
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-2">${movie.title}</h2>
      <p class="text-sm text-gray-600 mb-2">
        <span class="font-semibold">Release Date:</span> ${movie.release_date}
      </p>
      <p class="text-sm text-gray-600 mb-2">
        <span class="font-semibold">Language:</span> ${movie.original_language}
      </p>
      <p class="text-sm text-gray-600 mb-4">
        <span class="font-semibold">Rating:</span> ${movie.vote_average}
      </p>
      <button id="add-button-${movie.id}"
        class="w-full bg-yellow-400 text-gray-800 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Add to Journal
      </button>
    </div>
  `;

  // Attach event listener to the button to add movie to journal
  const addButton = movieCard.querySelector(`#add-button-${movie.id}`);
  addButton.addEventListener("click", () => {
    addToJournal(movie);
    favorites.push(movie);
    saveFavorites(movie.id);

    //const movieInJournal = movies.some(
    // (storedMovie) => storedMovie.id === movie.id
    //);
    const btn = document.getElementById(`add-button-${movie.id}`);
    if (isInTheList(movie)) {
      btn.style.backgroundColor = "#28a745";
    }

    alert(`Added "${movie.title}" to your Journal!`);
  });

  return movieCard;
}

// Debounce search input
let debounceTimeout;
search.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const input = search.value.trim();
    displayMovies(input);
  }, 300); // 300ms debounce delay
});

// Fetch and display movies on page load
fetchMovies();
