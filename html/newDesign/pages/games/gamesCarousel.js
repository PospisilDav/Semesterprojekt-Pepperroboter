document.addEventListener('DOMContentLoaded', function () {
  // Main carousel elements
  var carousel = document.querySelector('.games-carousel');
  var gameCards = document.querySelectorAll('.game-card');
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var paginationContainer = document.querySelector('.pagination-dots');

  // Carousel state and configuration
  var currentPage = 0;
  var visibleCards = 2.5; // Number of cards visible at once
  var totalCards = gameCards.length;
  var totalPages = Math.ceil(totalCards - visibleCards + 1);

  // Ensure the carousel has proper width based on the number of cards
  carousel.style.width = (totalCards * (100 / visibleCards)) + '%';

  // Clear and recreate pagination dots
  paginationContainer.innerHTML = '';
  for (var i = 0; i < totalPages; i++) {
    var dot = document.createElement('span');
    dot.className = 'pagination-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    paginationContainer.appendChild(dot);
  }

  // Re-query the dots after creating them
  var dots = paginationContainer.querySelectorAll('.pagination-dot');

  /**
   * Updates the carousel position and styles
   */
  function updateCarousel() {
    // Calculate slide percentage based on the current page
    var slidePercentage = (100 / visibleCards) * currentPage;
    carousel.style.webkitTransform = 'translateX(-' + slidePercentage + '%)';
    carousel.style.transform = 'translateX(-' + slidePercentage + '%)';

    console.log("Moving to page:", currentPage, "Translate:", slidePercentage + "%");

    // Update pagination dots
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === Math.floor(currentPage));
    }

    // Update button states
    prevButton.disabled = currentPage === 0;
    prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';

    nextButton.disabled = currentPage >= totalPages - 1;
    nextButton.style.opacity = currentPage >= totalPages - 1 ? '0.5' : '1';
  }

  /**
   * Navigate to the previous page
   */
  function goToPrevPage() {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  }

  /**
   * Navigate to the next page
   */
  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  }

  // Event listeners for navigation buttons
  prevButton.addEventListener('click', function (e) {
    e.preventDefault();
    goToPrevPage();
  });

  nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    goToNextPage();
  });

  // Initialize carousel
  updateCarousel();
});