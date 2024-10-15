'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

'use strict';

/**
 * Menu Slider Logic
 */

// Get necessary DOM elements
document.addEventListener('DOMContentLoaded', function () {
  const viewMenuBtn = document.getElementById('view-menu-btn');
  const menuPdfModal = document.getElementById('menu-pdf-modal');
  const closePdfModalBtn = document.querySelector('.close-pdf-modal');

  // Open the menu PDF modal
  viewMenuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    menuPdfModal.classList.add('active');
  });

  // Close the menu PDF modal
  closePdfModalBtn.addEventListener('click', function () {
    menuPdfModal.classList.remove('active');
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener('click', function (e) {
    if (e.target === menuPdfModal) {
      menuPdfModal.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const bookTableBtn = document.getElementById('book-table-btn');
  const tableModal = document.getElementById('table-modal');
  const closeTableModalBtn = document.querySelector('.close-table-modal');
  const tables = document.querySelectorAll('.table');

  // Simulate table booking status persistence
  let tableStatus = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
  };

  // Update the UI based on booking status
  const updateTableUI = () => {
    tables.forEach((table) => {
      const tableNumber = table.getAttribute('data-table');
      if (tableStatus[tableNumber]) {
        table.setAttribute('data-booked', 'true');
      } else {
        table.setAttribute('data-booked', 'false');
      }
    });
  };

  // Open the table modal
  bookTableBtn.addEventListener('click', function (e) {
    e.preventDefault();
    updateTableUI(); // Update UI based on booking status
    tableModal.classList.add('active');
  });

  // Close the table modal
  closeTableModalBtn.addEventListener('click', function () {
    tableModal.classList.remove('active');
  });

  // Handle table booking
  tables.forEach(function (table) {
    table.addEventListener('click', function () {
      const isBooked = this.getAttribute('data-booked') === 'true';
      const tableNumber = this.getAttribute('data-table');

      if (isBooked) {
        alert(`Table ${tableNumber} is already booked.`);
      } else {
        const confirmBooking = confirm(`Do you want to book Table ${tableNumber}?`);
        if (confirmBooking) {
          tableStatus[tableNumber] = true; // Mark table as booked
          updateTableUI();
          alert(`Table ${tableNumber} has been successfully booked!`);
        }
      }
    });
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener('click', function (e) {
    if (e.target === tableModal) {
      tableModal.classList.remove('active');
    }
  });
});

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});