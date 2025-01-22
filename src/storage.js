export const addToCart = (product) => {
  const currCart = JSON.parse(localStorage.getItem("cart")) || [];
  const isInCart = currCart.some((item) => product.id === item.id);
  let updatedCart;
  if (isInCart) {
    const newItem = { ...product, count: 1 };
    updatedCart = [...currCart, newItem];
  } else {
    updatedCart = currCart.map((item) =>
      item.id === product.id ? { ...item, count: item.count + 1 } : item
    );
  }
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const addToJournal = (movie) => {
  const currentJournal = JSON.parse(localStorage.getItem("journal")) || [];

  // Check if the movie already exists in the journal
  const isInJournal = currentJournal.some((item) => item.id === movie.id);

  let updatedJournal;
  if (isInJournal) {
    // If movie is already in journal, don't add again
    updatedJournal = currentJournal;
  } else {
    updatedJournal = [...currentJournal, movie];
  }

  localStorage.setItem("journal", JSON.stringify(updatedJournal));
};

export const removeCard = (movie) => {
  // Find the movie card using its id, which we set in the createMovieCard function
  const movieCard = document.querySelector(`#movie-card-${movie.id}`);

  // If the card exists, remove it from the DOM
  if (movieCard) {
    movieCard.remove();
  }

  // Remove the movie from localStorage (assuming you're storing movies in an array under 'journal')
  let journalMovies = JSON.parse(localStorage.getItem("journal")) || [];

  // Filter out the movie to remove it from the journal array
  journalMovies = journalMovies.filter(
    (storedMovie) => storedMovie.id !== movie.id
  );

  // Update the journal in localStorage
  localStorage.setItem("journal", JSON.stringify(journalMovies));
};
