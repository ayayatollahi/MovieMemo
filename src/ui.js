export const renderProdCart = (prod, container) => {
  const card = document.createElement("div");
  card.setAttribute("id", prod.id);
  const figure = document.createElement("figure");
  //figure.className = "rounded-t-md overflow-hidden w-full w-96";
  //card.className = "shadow-xl hover:shadow-2xl";
  card.textContent = prod.title;
  container.appendChild(card);
};
