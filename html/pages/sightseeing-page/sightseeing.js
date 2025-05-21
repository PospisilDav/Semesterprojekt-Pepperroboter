"use strict";

var pepperController = window.pepperController;

function sightseeingFullyLoaded(e) {
  window.console.log("sightseeing initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier erfahren Sie mehr über das Deutsche Uhrenmus e um und weitere Highlights."
    );
  }, 800);
}

window.addEventListener("load", sightseeingFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  var headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier erfahren Sie mehr über das Deutsche Uhrenmus e um und weitere Highlights."
        );
      }, 800);
    });
  }
});

// Function to handle touch feedback
document.addEventListener("DOMContentLoaded", function() {
  // Only apply if this is a touch device
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    // Handle content images
    var contentImages = document.querySelectorAll('.content-image');
    for (var i = 0; i < contentImages.length; i++) {
      (function(image) {
        image.addEventListener('touchstart', function() {
          this.classList.add('touched');
        });
        
        image.addEventListener('touchend', function() {
          var self = this;
          setTimeout(function() {
            self.classList.remove('touched');
          }, 300);
        });
      })(contentImages[i]);
    }
    
    // Handle list items
    var listItems = document.querySelectorAll('.list-item:not(.active)');
    for (var i = 0; i < listItems.length; i++) {
      (function(item) {
        item.addEventListener('touchstart', function() {
          this.classList.add('touch-highlight');
        });
        
        item.addEventListener('touchend', function() {
          var self = this;
          setTimeout(function() {
            self.classList.remove('touch-highlight');
          }, 300);
        });
        
        item.addEventListener('touchmove', function() {
          this.classList.remove('touch-highlight');
        });
      })(listItems[i]);
    }
    
    // Handle content sections
    var contentSections = document.querySelectorAll('.content-section');
    for (var i = 0; i < contentSections.length; i++) {
      (function(section) {
        if (section.classList.contains('active')) {
          section.addEventListener('touchstart', function() {
            this.classList.add('touched');
          });
          
          section.addEventListener('touchend', function() {
            var self = this;
            setTimeout(function() {
              self.classList.remove('touched');
            }, 300);
          });
        }
      })(contentSections[i]);
    }
    
    // Handle buttons
    var buttons = document.querySelectorAll('.tell-me-button');
    for (var i = 0; i < buttons.length; i++) {
      (function(button) {
        button.addEventListener('touchstart', function() {
          this.classList.add('touched');
        });
        
        button.addEventListener('touchend', function() {
          var self = this;
          setTimeout(function() {
            self.classList.remove('touched');
          }, 300);
        });
        
        button.addEventListener('touchcancel', function() {
          this.classList.remove('touched');
        });
      })(buttons[i]);
    }
  }
  
  // Add tap detection to improve selection experience
  var listItems = document.querySelectorAll('.list-item');
  for (var i = 0; i < listItems.length; i++) {
    (function(item) {
      item.addEventListener('touchstart', function(event) {
        this._touchStartTime = Date.now();
        if (event && event.touches && event.touches[0]) {
          this._touchStartX = event.touches[0].clientX;
          this._touchStartY = event.touches[0].clientY;
        }
      });
      
      item.addEventListener('touchend', function(event) {
        // Only trigger if it's a tap (quick touch without much movement)
        var touchTime = Date.now() - (this._touchStartTime || 0);
        var touchEndX = 0;
        var touchEndY = 0;
        
        if (event && event.changedTouches && event.changedTouches[0]) {
          touchEndX = event.changedTouches[0].clientX;
          touchEndY = event.changedTouches[0].clientY;
        }
        
        var movement = 0;
        if (typeof this._touchStartX !== 'undefined' && 
            typeof this._touchStartY !== 'undefined') {
          var deltaX = touchEndX - this._touchStartX;
          var deltaY = touchEndY - this._touchStartY;
          movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        }
        
        // If it was a quick tap without much movement
        if (touchTime < 300 && movement < 10) {
          // Add a pulse animation
          this.classList.add('pulse-feedback');
          var self = this;
          setTimeout(function() {
            self.classList.remove('pulse-feedback');
          }, 500);
        }
      });
    })(listItems[i]);
  }
});