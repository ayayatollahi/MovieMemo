import { fetchProducts, apiConfig } from "./src/network.js";

//import { renderProdCard } from "./src/ui.js";

/*
const prodCont = document.querySelector("#movie-list");
const allProducts = await fetchProducts();
console.log("allProducts: ", allProducts);
allProducts.forEach((prod) => renderProdCard(prod, prodCont)); */

document.getElementById("menu-toggle").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

async function getPopularMovies() {
  const response = await fetch(
    `${apiConfig.tmdbBaseUrl}/movie/popular?api_key=${apiConfig.tmdbApiKey}`
  );
  return await response.json();
}

async function getImg() {
  const response = await fetch(apiConfig.imageBaseUrl);
  return await response.json();
}

async function displayMovies() {
  try {
    const movies = (await getPopularMovies()).results;
    const movieContainer = document.getElementById("movie-list");

    if (!movieContainer) return;

    movieContainer.innerHTML = "";
    const images = getImg();
    console.log("images : ", images);

    movies.forEach((movie) => {
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
              <span class="font-semibold">Release Date:</span> ${
                movie.release_date
              }
            </p>
            <p class="text-sm text-gray-600 mb-2">
              <span class="font-semibold">Language:</span> ${
                movie.original_language
              }
            </p>
            <p class="text-sm text-gray-600 mb-4">
              <span class="font-semibold">Rating:</span> ${movie.vote_average}
            </p>
            <button
              class="w-full bg-yellow-400 text-gray-800 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Add
            </button>
          </div>
          `;
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
displayMovies();
