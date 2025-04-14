document.addEventListener('DOMContentLoaded', function () {

  // Main carousel elements
  var carousel = document.querySelector('.games-carousel');
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var gameCards = document.querySelectorAll('.game-card');
  // Fallback to create pagination dots if not already in DOM
  var paginationDots = document.querySelector('.pagination-dots') || document.createElement('div');

  // Carousel state and configuration
  var currentPage = 0;
  var visibleCards = 3; // Number of cards visible at once
  var totalCards = gameCards.length;
  var totalPages = Math.ceil(totalCards / visibleCards);

  // Create pagination dots dynamically to ensure correct number
  paginationDots.innerHTML = '';
  paginationDots.classList.add('pagination-dots');
  for (var i = 0; i < totalPages; i++) {
    var dot = document.createElement('span');
    dot.classList.add('pagination-dot');
    dot.dataset.index = i; // Store page index for event handling
    paginationDots.appendChild(dot);
  }

  // Re-query the dots after creating them
  var dots = document.querySelectorAll('.pagination-dot');

  /**
   * Gets the current width of the carousel container to calculate card widths dynamically
   */
  function getContainerWidth() {
    return carousel.parentElement.offsetWidth;
  }

  /**
   * Updates the carousel position and styles
   */
  function updateCarousel() {
    // Each "page" is 100% of container width
    var offsetPercentage = currentPage * 100;
    carousel.style.transform = `translateX(-${offsetPercentage}%)`;

    // Update pagination dots to reflect current page
    for (var index = 0; index < dots.length; index++) {
      var dot = dots[index]
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    }

    // Update prev and next buttons state based on current position
    prevButton.disabled = currentPage === 0;
    prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';
    nextButton.disabled = currentPage === totalPages - 1;
    nextButton.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
  }

  /**
   * Navigate to the previous page with boundary check
   */
  function goToPrevPage() {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    }
  };

  /**
   * Navigate to the next page with boundary check
   */
  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  };

  /**
   * Navigate to a specific page with validation
   * Used by pagination dots
   */

  function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      currentPage = pageIndex;
      updateCarousel();
    }
  }


  // Event listeners for navigation buttons
  prevButton.addEventListener('click', goToPrevPage);
  nextButton.addEventListener('click', goToNextPage);

  // Event listeners for pagination dots
  for (var i = 0; i < dots.length; i++) {
    var dot = dots[i]
    dot.addEventListener('click', function () {
      var index = parseInt(dot.dataset.index, 10);
      goToPage(index);
    });
  }

  // Initialize carousel and append pagination dots if needed
  if (carousel.parentNode && !carousel.parentNode.querySelector('.pagination-dots')) {
    carousel.parentNode.appendChild(paginationDots);
  }
  updateCarousel();


});