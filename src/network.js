// API configuration object containing the API key, base URL, and image base URL
export const apiConfig = {
  tmdbApiKey: "87596f432dd011ebe7fdd8cc1764f5d9", // API key for accessing TMDB API
  tmdbBaseUrl: "https://api.themoviedb.org/3", // Base URL for TMDB API endpoints
  imageBaseUrl: "https://image.tmdb.org/t/p/w500", // Base URL for fetching movie images
};

/**
 * Fetches products (movies) from the TMDB API.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the response is not OK.
 */
export const fetchProducts = async () => {
  try {
    // Fetch data from the TMDB API
    const res = await fetch(apiConfig.tmdbBaseUrl);

    // Check if the response is not OK (e.g., 404, 500, etc.)
    if (!res.ok) {
      throw new Error(`${res.status}. Something went wrong`);
    }

    // Parse the response data as JSON
    const data = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error(error);
  }
};
