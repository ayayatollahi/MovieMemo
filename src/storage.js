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
