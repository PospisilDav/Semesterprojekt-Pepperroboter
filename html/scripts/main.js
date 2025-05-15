document.addEventListener('DOMContentLoaded', function() {
  var touchElements = document.querySelectorAll('.card, .show-button, .header-avatar-container, .logo-section, .action-button');
  
  for (var i = 0; i < touchElements.length; i++) {
    (function(element) {
      element.classList.add('touch-element');
      
      // Touch handling
      element.addEventListener('touchend', function() {
        var el = this;
        el.classList.add('clicked');
        
        setTimeout(function() {
          el.classList.remove('clicked');
        }, el.classList.contains('header-avatar-container') ? 1200 : 1000);
      });
      
      element.addEventListener('touchcancel', function() {
        this.classList.remove('clicked');
      });
      
      // Mouse handling (desktop)
      element.addEventListener('click', function() {
        if (!('ontouchstart' in window)) {
          var el = this;
          el.classList.add('clicked');
          
          setTimeout(function() {
            el.classList.remove('clicked');
          }, el.classList.contains('header-avatar-container') ? 800 : 500);
        }
      });
    })(touchElements[i]);
  }
});