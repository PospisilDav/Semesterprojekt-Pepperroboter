document.addEventListener('DOMContentLoaded', function () {
  // Main carousel elements
  var carousel = document.querySelector('.games-carousel');
  var carouselViewport = document.querySelector('.games-carousel-viewport');
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var gameCards = document.querySelectorAll('.game-card');
  var paginationContainer = document.querySelector('.pagination-dots');

  // Carousel state and configuration
  var currentPage = 0;
  var visibleCards = 3; // Number of cards visible at once
  var totalCards = gameCards.length;
  var totalPages = Math.max(1, Math.ceil(totalCards / visibleCards));

  // Debug output
  console.log("Total cards:", totalCards);
  console.log("Total pages:", totalPages);

  // Ensure the carousel has proper width based on the number of cards
  carousel.style.width = (totalCards * 100 / visibleCards) + '%';

  // Make each card take an equal portion of the carousel width
  for (var i = 0; i < gameCards.length; i++) {
    gameCards[i].style.flex = '0 0 ' + (100 / totalCards) + '%';
  }

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
    // Calculate slide percentage based on viewport width and current page
    var slidePercentage = (100 / totalPages) * currentPage;
    carousel.style.webkitTransform = 'translateX(-' + slidePercentage + '%)';
    carousel.style.transform = 'translateX(-' + slidePercentage + '%)';

    console.log("Moving to page:", currentPage, "Translate:", slidePercentage + "%");

    // Update pagination dots
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentPage);
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
      currentPage--;
      updateCarousel();
    }
  }

  /**
   * Navigate to the next page
   */
  function goToNextPage() {
    console.log("Next button clicked");
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  }

  /**
   * Navigate to a specific page
   */
  function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      currentPage = pageIndex;
      updateCarousel();
    }
  }

  // Event listeners for navigation buttons
  if (prevButton.addEventListener) {
    prevButton.addEventListener('click', function (e) {
      e.preventDefault();
      goToPrevPage();
    });
  } else if (prevButton.attachEvent) {
    prevButton.attachEvent('onclick', function (e) {
      e.preventDefault();
      goToPrevPage();
    });
  }

  if (nextButton.addEventListener) {
    nextButton.addEventListener('click', function (e) {
      e.preventDefault();
      goToNextPage();
    });
  } else if (nextButton.attachEvent) {
    nextButton.attachEvent('onclick', function (e) {
      e.preventDefault();
      goToNextPage();
    });
  }

  // Initialize carousel
  updateCarousel();
});