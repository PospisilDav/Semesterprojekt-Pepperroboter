document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.games-carousel');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const gameCards = document.querySelectorAll('.game-card');
  const paginationDots = document.querySelectorAll('.pagination-dot');
  
  let currentPage = 0;
  const cardWidth = 280;
  const cardGap = 20;
  const visibleCards = 3; // Number of cards visible at once
  const totalCards = gameCards.length;
  const totalPages = Math.ceil(totalCards / visibleCards);
  
  /**
   * Updates the carousel position and styles
   */
  function updateCarousel() {
    // Calculate how many cards to shift
    const offset = -(currentPage * visibleCards * (cardWidth + cardGap));
    carousel.style.transform = `translateX(${offset}px)`;
    
    // Update pagination dots
    paginationDots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Update prev and next buttons
    prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
  }
  
  /**
   * Navigate to the previous page
   */
  const goToPrevPage = () => {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    } else if (totalPages > 1) {
      // Circular navigation - go to last page when at first page
      currentPage = totalPages - 1;
      updateCarousel();
    }
  };
  
  /**
   * Navigate to the next page
   */
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    } else if (totalPages > 1) {
      // Go to first page if at last page (circular navigation)
      currentPage = 0;
      updateCarousel();
    }
  };
  
  // Event listeners for buttons
  prevButton.addEventListener('click', goToPrevPage);
  nextButton.addEventListener('click', goToNextPage);
  
  // Event listeners for pagination dots
  paginationDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = dot.dataset.index;
      if (index) {
        currentPage = parseInt(index, 10);
        updateCarousel();
      }
    });
  });
  
  // Initialize carousel
  updateCarousel();
});