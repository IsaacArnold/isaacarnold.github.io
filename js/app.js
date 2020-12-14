/* ====================================
Global Variables
=====================================*/

const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const nav = document.querySelector(".nav");
const overlayNav = document.querySelector(".overlay-nav");

nav.addEventListener("click", (e) => {
  if (e.target.classList == "hamburger") {
    overlayNav.style.display = "";
  }
});

overlayNav.addEventListener("click", (e) => {
  if (e.target.classList == "close") {
    overlayNav.style.display = "none";
  }
});
