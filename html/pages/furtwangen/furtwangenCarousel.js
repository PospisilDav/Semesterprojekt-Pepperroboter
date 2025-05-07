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
  
  // Drag state tracking
  var isDragging = false;
  var currentTranslateX = 0;
  
  carousel.style.width = (totalCards * (100 / visibleCards)) + '%';

  paginationContainer.innerHTML = '';
  for (var i = 0; i < totalPages; i++) {
    var dot = document.createElement('span');
    dot.className = 'pagination-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    paginationContainer.appendChild(dot);
  }

  var dots = paginationContainer.querySelectorAll('.pagination-dot');

  function updateCarousel() {
    var slidePercentage = (100 / visibleCards) * (currentPage * moveStep);
    
    carousel.style.webkitTransform = 'translateX(-' + slidePercentage + '%)';
    carousel.style.transform = 'translateX(-' + slidePercentage + '%)';
    currentTranslateX = -slidePercentage;

    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === Math.floor(currentPage));
    }

    prevButton.disabled = currentPage === 0;
    prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';
    nextButton.disabled = currentPage >= totalPages - 1;
    nextButton.style.opacity = currentPage >= totalPages - 1 ? '0.5' : '1';
  }

  function goToPrevPage() {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  }
  
  carousel.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (isDragging) e.preventDefault();
    });
  });

  prevButton.addEventListener('click', function(e) {
    goToPrevPage();
  });

  nextButton.addEventListener('click', function(e) {
    goToNextPage();
  });

  updateCarousel();
});