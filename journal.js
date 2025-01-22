import { fetchProducts, apiConfig } from "./src/network.js";
import { addToJournal, addToCart, removeCard } from "./src/storage.js";

const variable = fetchProducts();
console.log(variable);

document.addEventListener("DOMContentLoaded", () => {
  const movieContainer = document.getElementById("movie-list");

  // Fetch the movies from localStorage
  const journalMovies = JSON.parse(localStorage.getItem("journal")) || [];

  if (journalMovies.length === 0) {
    movieContainer.innerHTML = `<p class="text-white">Your journal is empty. Start adding movies!</p>`;
  } else {
    journalMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  }
});

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
      <button id="remove-button-${movie.id}"
        class="w-full bg-orange-500 text-gray-800 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Remove
      </button>
    </div>
  `;

  // Now, find the remove button and attach the event listener
  const removeButton = movieCard.querySelector(`#remove-button-${movie.id}`);

  removeButton.addEventListener("click", () => {
    // Remove the card from the DOM
    movieCard.remove();

    // Call your removeCard function to handle further logic (like updating localStorage)
    removeCard(movie);
  });

  return movieCard;
}
