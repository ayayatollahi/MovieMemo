// Function to add a product to the cart
export const addToCart = (product) => {
  // Retrieve the current cart from localStorage or initialize an empty array if it doesn't exist
  const currCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const isInCart = currCart.some((item) => product.id === item.id);

  let updatedCart;

  if (isInCart) {
    // If the product is already in the cart, increment its count
    updatedCart = currCart.map((item) =>
      item.id === product.id ? { ...item, count: item.count + 1 } : item
    );
  } else {
    // If the product is not in the cart, add it with a count of 1
    const newItem = { ...product, count: 1 };
    updatedCart = [...currCart, newItem];
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

// Function to add a movie to the journal
export const addToJournal = (movie) => {
  // Retrieve the current journal from localStorage or initialize an empty array if it doesn't exist
  const currentJournal = JSON.parse(localStorage.getItem("journal")) || [];

  // Check if the movie is already in the journal
  const isInJournal = currentJournal.some((item) => item.id === movie.id);

  let updatedJournal;

  if (isInJournal) {
    // If the movie is already in the journal, do nothing
    updatedJournal = currentJournal;
  } else {
    // If the movie is not in the journal, add it
    updatedJournal = [...currentJournal, movie];
  }

  // Save the updated journal back to localStorage
  localStorage.setItem("journal", JSON.stringify(updatedJournal));
};

// Function to remove a movie card from the DOM and the journal
export const removeCard = (movie) => {
  // Find the movie card in the DOM using its unique ID
  const movieCard = document.querySelector(`#movie-card-${movie.id}`);

  // If the movie card exists, remove it from the DOM
  if (movieCard) {
    movieCard.remove();
  }

  // Retrieve the current journal from localStorage or initialize an empty array if it doesn't exist
  let journalMovies = JSON.parse(localStorage.getItem("journal")) || [];

  // Filter out the movie to remove it from the journal array
  journalMovies = journalMovies.filter(
    (storedMovie) => storedMovie.id !== movie.id
  );

  // Save the updated journal back to localStorage
  localStorage.setItem("journal", JSON.stringify(journalMovies));
};
