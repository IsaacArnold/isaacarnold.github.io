/* ====================================
Global Variables
=====================================*/

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const laptopNav = document.querySelector(".laptop-nav");
const overlayNav = document.querySelector(".overlay-nav");
const techChevron = document.querySelector(".chevron-right");
const technologies = document.querySelector(".technologies");

/* ====================================
Event Listeners
=====================================*/

// Listens for clicks in the main nav and shows the overlay if the item clicked is the hamburger menu icon
// Sliding idea from Tyler Pfledderer - Slack communication
nav.addEventListener("click", (e) => {
  if (e.target === hamburger) {
    overlayNav.classList.toggle("overlay-visible");
  }
});

// Listens for clicks in the overlay nav and closes the overlay if the item clicked is the close icon
overlayNav.addEventListener("click", (e) => {
  if (e.target.classList == "close" || e.target.tagName === "A") {
    overlayNav.classList.toggle("overlay-visible");
  }
});

technologies.addEventListener("click", (e) => {
  const techListDiv = document.querySelector(".tech-list");
  let techHTML = `
        <svg width="40" height="40">
            <use xlink:href="#html"/>
        </svg>

        <svg width="40" height="40">
            <use xlink:href="#css"/>
        </svg>

        <svg width="40" height="40">
            <use xlink:href="#sass"/>
        </svg>                             

        <svg width="40" height="40">
            <use xlink:href="#js"/>
        </svg>
      `;
  techListDiv.innerHTML = techHTML;

  // If the click is on the chevron then complete the following
  if (e.target === techChevron) {
    //   Toggles in the class to rotate the chevron
    techChevron.classList.toggle("chevron-down");
    techListDiv.classList.toggle("techlist-not-visible");
  }
});

/* ====================================
Mobile viewport script
-- Addresses the issue of mobile browser UI with 100vh
-- Method taken from CSS-Tricks post > URL: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
=====================================*/

// Listens for when the browser is resized
window.addEventListener("resize", () => {
  // Get the viewport height and multiply to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// Adds a listener to the refreshing of the page
window.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

/* ====================================
Scrollspy Script
=====================================*/

/* ====================================
Active link after click - Laptop navigation
From KodeBase Youtube tutorial -> URL: https://www.youtube.com/watch?v=3cS0IsV-yhA
=====================================*/
const laptopNavList = laptopNav.querySelectorAll("ul li a");

laptopNavList.forEach((link) => {
  link.addEventListener("click", () => {
    laptopNavList.forEach((a) => a.classList.remove("active"));
    link.classList.add("active");
  });
});

/* ====================================
Active link after click - Overlay navigation
From KodeBase Youtube tutorial -> URL: https://www.youtube.com/watch?v=3cS0IsV-yhA
=====================================*/
const overlayNavList = overlayNav.querySelectorAll("ul li a");
console.log(overlayNavList);

overlayNavList.forEach((link) => {
  link.addEventListener("click", () => {
    overlayNavList.forEach((a) => a.classList.remove("active"));
    link.classList.add("active");
  });
});
