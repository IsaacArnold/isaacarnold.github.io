/* ====================================
Global Variables
=====================================*/

const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const nav = document.querySelector(".nav");
const overlayNav = document.querySelector(".overlay-nav");

/* ====================================
Event Listeners
=====================================*/

// Listens for clicks in the main nav and shows the overlay if the item clicked is the hamburger menu icon
nav.addEventListener("click", (e) => {
  if (e.target === hamburger) {
    overlayNav.style.display = "";
  }
});

// Listens for clicks in the overlay nav and closes the overlay if the item clicked is the close icon
overlayNav.addEventListener("click", (e) => {
  if (e.target.classList == "close" || e.target.tagName === "A") {
    overlayNav.style.display = "none";
    console.log("closed");
  }
});
