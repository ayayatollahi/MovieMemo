/**
 * Renders a product card and appends it to the specified container.
 * @param {Object} prod - The product object containing details like `id` and `title`.
 * @param {HTMLElement} container - The DOM element where the product card will be appended.
 */
export const renderProdCart = (prod, container) => {
  // Create a new div element for the product card
  const card = document.createElement("div");
  card.setAttribute("id", prod.id); // Set the card's ID to the product's ID

  // Create a figure element
  const figure = document.createElement("figure");

  // Set the card's text content to the product's title
  card.textContent = prod.title;

  // Append the card to the specified container
  container.appendChild(card);
};
