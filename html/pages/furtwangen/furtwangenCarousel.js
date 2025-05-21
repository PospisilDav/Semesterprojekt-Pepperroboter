document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  var carousel = document.querySelector('.furtwangen-carousel');
  var cardItems = document.querySelectorAll('.card');
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var paginationContainer = document.querySelector('.pagination-dots');

  // Configuration
  var currentPage = 0;
  var visibleCards = 3.8;
  var totalCards = cardItems.length;
  var moveStep = 2;
  var totalPages = Math.max(3, Math.ceil((totalCards - visibleCards) / moveStep) + 1);
  
  // Set the carousel width based on the total cards and visible cards ratio
  carousel.style.width = (totalCards * (100 / visibleCards)) + '%';

  // Dynamically generate pagination dots
  paginationContainer.innerHTML = '';
  for (var i = 0; i < totalPages; i++) {
    var dot = document.createElement('span');
    dot.className = 'pagination-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    paginationContainer.appendChild(dot);
  }

  // Store pagination dots for later use
  var dots = paginationContainer.querySelectorAll('.pagination-dot');

  /**
   * Updates the carousel position and UI state
   * - Translates the carousel horizontally based on current page
   * - Updates the active pagination dot
   * - Updates the state of navigation buttons
   */
  function updateCarousel() {
    // Calculate how much to slide the carousel
    var slidePercentage = (100 / visibleCards) * (currentPage * moveStep);
    
    carousel.style.webkitTransform = 'translateX(-' + slidePercentage + '%)';
    carousel.style.transform = 'translateX(-' + slidePercentage + '%)';
    currentTranslateX = -slidePercentage;

    // Update active pagination dot based on current page
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === Math.floor(currentPage));
    }

    // Disable prev button if on the first page
    prevButton.disabled = currentPage === 0;
    prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';

    // Disable next button if on the last page
    nextButton.disabled = currentPage >= totalPages - 1;
    nextButton.style.opacity = currentPage >= totalPages - 1 ? '0.5' : '1';
  }

  /**
   * Navigates to the previous page if not already on the first page
   */
  function goToPrevPage() {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  }
  
  /**
   * Navigates to the next page if not already on the last page
   */
  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  }
  
  prevButton.addEventListener('click', function(e) {
    goToPrevPage();
  });

  nextButton.addEventListener('click', function(e) {
    goToNextPage();
  });

  updateCarousel();
});