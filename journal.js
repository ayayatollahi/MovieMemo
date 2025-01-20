/*document.addEventListener("DOMContentLoaded", () => {
  // Get references to the hamburger button and mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Check if the elements exist before adding event listeners
  if (menuToggle && mobileMenu) {
    console.log("Hamburger menu initialized.");

    // Add a click event listener to toggle the visibility of the mobile menu
    menuToggle.addEventListener("click", () => {
      console.log("Hamburger menu clicked!");
      mobileMenu.classList.toggle("hidden");
    });
  } else {
    console.error("Error: Hamburger menu elements not found!");
  }
});*/
document.getElementById("menu-toggle").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});
