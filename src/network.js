export const apiConfig = {
  tmdbApiKey: "87596f432dd011ebe7fdd8cc1764f5d9",
  tmdbBaseUrl: "https://api.themoviedb.org/3",
  imageBaseUrl: "https://image.tmdb.org/t/p/w500",
};

export const fetchProducts = async () => {
  try {
    const res = await fetch(apiConfig.tmdbBaseUrl);
    if (!res.ok) {
      throw new Error(`${res.status}. Something went wrong`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
