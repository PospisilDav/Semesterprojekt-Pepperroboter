document.addEventListener("DOMContentLoaded", function() {
  // Get the avatar container
  const avatarContainer = document.querySelector('.header-avatar-container');
  
  // Add click event listener
  if (avatarContainer) {
    avatarContainer.addEventListener('click', function() {
      // Add the clicked class to trigger animation
      this.classList.add('clicked');
      
      // Remove the class after animation completes to allow it to be triggered again
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 800); // Match this to the animation duration
    });
  }
});

// Function to handle touchFeedback
document.addEventListener('DOMContentLoaded', function() {
  // Elements that need touch feedback
  var touchElements = document.querySelectorAll('.card, .show-button, .header-avatar-container, .logo-section, .action-button');
  
  for (var i = 0; i < touchElements.length; i++) {
    (function(element) {
      // Add touch class name for CSS targeting
      element.classList.add('touch-element');
      
      // Start touch - add active class
      //element.addEventListener('touchstart', function(e) {
      //  this.classList.add('touch-active');
      //  // Prevent default only for elements that aren't links or have special behavior
      //  if (!this.href && !this.classList.contains('header-avatar-container')) {
      //    e.preventDefault();
      //  }
      //});
      
      // End touch - remove active class after delay
      element.addEventListener('touchend', function() {
        var el = this;
        el.classList.add("clicked")
        // Keep active state visible briefly for visual feedback
        setTimeout(function() {
          el.classList.remove('clicked');
        }, 500);
      });
      
      // Cancel touch - remove active class immediately
      element.addEventListener('touchcancel', function() {
        this.classList.remove('touch-active');
      });
      
      // Special handling for avatar click animation
      if (element.classList.contains('header-avatar-container')) {
        element.addEventListener('touchend', function() {
          this.classList.add('clicked');
          var el = this;
          setTimeout(function() {
            el.classList.remove('clicked');
          }, 800); // Match animation duration
        });
      }
    })(touchElements[i]);
  }
});

// Get the avatar container
document.addEventListener("DOMContentLoaded", function() {
  var avatarContainer = document.querySelector('.header-avatar-container');
  
  // Add click event listener
  if (avatarContainer) {
    avatarContainer.addEventListener('click', function() {
      // Add the clicked class to trigger animation
      this.classList.add('clicked');
      
      // Remove the class after animation completes to allow it to be triggered again
      var self = this;
      setTimeout(function() {
        self.classList.remove('clicked');
      }, 800); // Match this to the animation duration
    });
  }
});