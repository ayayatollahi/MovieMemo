// Import necessary functions from external modules
import { fetchProducts, apiConfig } from "./src/network.js";
import { addToJournal, addToCart, removeCard } from "./src/storage.js";

// Fetch products and log them to the console (for debugging purposes)
const variable = fetchProducts();
console.log(variable);

// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Get the container where movie cards will be displayed
  const movieContainer = document.getElementById("movie-list");

  // Fetch the movies from localStorage or initialize an empty array if none exist
  const journalMovies = JSON.parse(localStorage.getItem("journal")) || [];

  // Check if the journal is empty
  if (journalMovies.length === 0) {
    // Display a message if the journal is empty
    movieContainer.innerHTML = `<p class="text-white">Your journal is empty. Start adding movies!</p>`;
  } else {
    // Loop through each movie in the journal and create a movie card for it
    journalMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  }
});

/**
 * Function to create a movie card element
 * @param {Object} movie - The movie object containing details like title, poster_path, etc.
 * @returns {HTMLElement} - The created movie card element
 */
function createMovieCard(movie) {
  // Create a div element to hold the movie card
  const movieCard = document.createElement("div");
  movieCard.className =
    "bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105";

  // Set the inner HTML of the movie card using template literals
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

  // Find the remove button within the movie card
  const removeButton = movieCard.querySelector(`#remove-button-${movie.id}`);

  // Add an event listener to the remove button
  removeButton.addEventListener("click", () => {
    // Remove the movie card from the DOM
    movieCard.remove();

    // Call the removeCard function to handle further logic (like updating localStorage)
    removeCard(movie);
  });

  // Return the created movie card element
  return movieCard;
}
