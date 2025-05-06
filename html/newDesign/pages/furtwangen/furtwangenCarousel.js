document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  var carousel = document.querySelector('.furtwangen-carousel');
  var cardItems = document.querySelectorAll('.card');
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var paginationContainer = document.querySelector('.pagination-dots');
  var carouselWrapper = document.querySelector('.carousel-wrapper');

  // Configuration
  var currentPage = 0;
  var visibleCards = 3.8;
  var totalCards = cardItems.length;
  var moveStep = 2;
  var totalPages = Math.max(3, Math.ceil((totalCards - visibleCards) / moveStep) + 1);
  
  // Drag state tracking
  var isDragging = false;
  var startPosX = 0;
  var startTranslateX = 0;
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
    
    var maxScroll = (totalCards - visibleCards) * (100 / visibleCards);
    
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

  function handleDragStart(e) {
    isDragging = true;
    startPosX = getPositionX(e);
    startTranslateX = currentTranslateX;
    carousel.style.transition = 'none';
    e.preventDefault();
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    
    var currentPosition = getPositionX(e);
    var diff = currentPosition - startPosX;
    var newTranslateX = startTranslateX + (diff / carouselWrapper.offsetWidth) * 100;
    
    var maxScroll = -((100 / visibleCards) * (totalCards - visibleCards));
    newTranslateX = Math.max(Math.min(newTranslateX, 10), maxScroll - 10);
    
    carousel.style.transform = 'translateX(' + newTranslateX + '%)';
    e.preventDefault();
  }

  function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    carousel.style.transition = 'transform 0.5s ease-in-out';
    
    var currentPosition = getPositionX(e);
    var diff = currentPosition - startPosX;
    
    if (Math.abs(diff) > carouselWrapper.offsetWidth / 10) {
      (diff > 0) ? goToPrevPage() : goToNextPage();
    } else {
      updateCarousel();
    }
    
    e.preventDefault();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  carousel.addEventListener('mousedown', handleDragStart);
  carousel.addEventListener('touchstart', handleDragStart);
  
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('touchmove', handleDragMove);
  
  window.addEventListener('mouseup', handleDragEnd);
  window.addEventListener('touchend', handleDragEnd);
  
  carousel.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (isDragging) e.preventDefault();
    });
  });

  prevButton.addEventListener('click', function(e) {
    e.preventDefault();
    goToPrevPage();
  });

  nextButton.addEventListener('click', function(e) {
    e.preventDefault();
    goToNextPage();
  });

  carousel.style.cursor = 'grab';
  carousel.addEventListener('mousedown', function() { carousel.style.cursor = 'grabbing'; });
  carousel.addEventListener('mouseup', function() { carousel.style.cursor = 'grab'; });

  updateCarousel();
});