/* ====================================
Global Variables
=====================================*/

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
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
  }
  if (e.target.classList.contains("chevron-down")) {
    techListDiv.style.display = "";
    // This next else if ensures that the button clicked is the chevron icon and elimates the div being removed if the user clicks elsewhere on the page.
  } else if (e.target === techChevron) {
    //   Removes the tech div is the chevron-down class is not active
    techListDiv.style.display = "none";
  }
});
