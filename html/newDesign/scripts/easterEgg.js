/**
 * Easter Egg - Mini Pepper that appears after being active for a set time
 */
document.addEventListener('DOMContentLoaded', function() {
  // Activity tracking variables
  var activeTime = 0;
  var lastActivityTime = Date.now();
  var activityInterval = null;
  
  // Constants
  var ACTIVITY_CHECK_FREQUENCY = 1000; // Updates counter every second
  var ACTIVITY_REQUIREMENT_MINUTES = 2; // Pepper appears after 2 minutes of active usage
  var MAX_INACTIVITY_TIME = 90000; // User must interact at least every 1.5 minutes (90s)
  
  // Pepper icon element reference
  var pepperIcon = null;
  
  /**
   * Sets up monitoring of user activity
   */
  function setupActivityMonitoring() {
    // Create timestamp of last activity
    lastActivityTime = Date.now();
    
    // Monitor user activity
    activityInterval = setInterval(function() {
      var currentTime = Date.now();
      var timeSinceLastActivity = currentTime - lastActivityTime;
      
      // If user has been inactive for more than a minute, reset the counter
      if (timeSinceLastActivity > MAX_INACTIVITY_TIME) {
        console.log("Inactive for too long, resetting counter");
        activeTime = 0;
        updateDebugInfo();
        hideSmallPepper(); // Hide pepper icon if it was showing
        return;
      }
      
      // Increment active time counter
      activeTime += 1;
      updateDebugInfo();
      
      // Check if it's time to show the easter egg
      if (activeTime >= ACTIVITY_REQUIREMENT_MINUTES * 60) {
        showSmallPepper();
      }
    }, ACTIVITY_CHECK_FREQUENCY);
    
    // Register activity events (use older event attachment for compatibility)
    addEventListeners(['click', 'mousemove', 'keypress', 'touchstart', 'scroll'], recordUserActivity);
  }
  
  /**
   * Helper function to add event listeners with better compatibility
   */
  function addEventListeners(events, handler) {
    for (var i = 0; i < events.length; i++) {
      if (document.addEventListener) {
        document.addEventListener(events[i], handler, false);
      } else if (document.attachEvent) {
        // For older IE
        document.attachEvent('on' + events[i], handler);
      } else {
        document['on' + events[i]] = handler;
      }
    }
  }
  
  /**
   * Record that the user was active
   */
  function recordUserActivity() {
    lastActivityTime = Date.now();
  }
  
  /**
   * Show the small Pepper icon
   */
  function showSmallPepper() {
    // If already showing, do nothing
    if (pepperIcon && document.body.contains(pepperIcon)) {
      return;
    }
    
    // Create the small pepper icon if it doesn't exist
    pepperIcon = document.createElement('div');
    pepperIcon.className = 'easter-egg-pepper-icon';
    pepperIcon.setAttribute('title', 'Klick mich!'); // Use setAttribute for compatibility
    
    // Add click event to navigate to team page
    if (pepperIcon.addEventListener) {
      pepperIcon.addEventListener('click', function() {
        triggerEasterEgg('pepper-icon');
      });
    } else if (pepperIcon.attachEvent) {
      pepperIcon.attachEvent('onclick', function() {
        triggerEasterEgg('pepper-icon');
      });
    } else {
      pepperIcon.onclick = function() {
        triggerEasterEgg('pepper-icon');
      };
    }
    
    // Add icon to body
    document.body.appendChild(pepperIcon);
    
    // Animate entrance (compatible approach)
    setTimeout(function() {
      pepperIcon.style.opacity = '1';
      pepperIcon.style.transform = 'translateX(15px) rotate(90deg)';
    }, 100);
  }
  
  /**
   * Hide the small Pepper icon
   */
  function hideSmallPepper() {
    if (pepperIcon && document.body.contains(pepperIcon)) {
      pepperIcon.style.opacity = '0';
      pepperIcon.style.transform = 'translateX(-20px)';
      
      setTimeout(function() {
        if (pepperIcon && document.body.contains(pepperIcon)) {
          document.body.removeChild(pepperIcon);
        }
      }, 500);
    }
  }
  
  /**
   * Update debug info display
   */
  function updateDebugInfo() {
    var debugElement = document.getElementById('easter-egg-debug');
    if (debugElement) {
      var minutesActive = Math.floor(activeTime / 60);
      var secondsActive = activeTime % 60;
      debugElement.innerHTML = 'Active time: ' + minutesActive + 'm ' + secondsActive + 's';
    }
  }
  
  /**
   * Trigger the easter egg and navigate to team page
   */
  function triggerEasterEgg(method) {
    console.log('Easter egg triggered by: ' + method);
    
    // Create a transition effect
    var overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    document.body.appendChild(overlay);
    
    window.location.href = './pages/teamPage/teamPage.html';
  }
  
  /**
   * Add required CSS styles
   */
  function addEasterEggStyles() {
    var styleElement = document.createElement('style');
    var cssText = [
      '.easter-egg-pepper-icon {',
      '  position: fixed;',
      '  top: 100px;',
      '  left: -20px;',
      '  width: 75px;',
      '  height: 75px;',
      '  background-image: url("./assets/mini_pepper.png");',
      '  background-size: contain;',
      '  background-repeat: no-repeat;',
      '  background-position: center;',
      '  cursor: pointer;',
      '  z-index: 9999;',
      '  opacity: 0;',
      '  transform: rotate(90deg);',
      '  -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;',
      '  transition: opacity 0.5s ease, transform 0.5s ease;',
      '  -webkit-filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));',
      '  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));',
      '}',
      '.easter-egg-overlay {',
      '  position: fixed;',
      '  top: 0;',
      '  left: 0;',
      '  right: 0;',
      '  bottom: 0;',
      '  background-color: rgba(109, 209, 233, 0.2);',
      '  z-index: 9999;',
      '  -webkit-animation: flash 1s ease-out;',
      '  animation: flash 1s ease-out;',
      '}',
      '@-webkit-keyframes flash {',
      '  0% { opacity: 0; }',
      '  50% { opacity: 1; }',
      '  100% { opacity: 0; }',
      '}',
      '@keyframes flash {',
      '  0% { opacity: 0; }',
      '  50% { opacity: 1; }',
      '  100% { opacity: 0; }',
      '}'
    ].join('\n');

    // Use older APIs for better compatibility
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssText;
    } else {
      styleElement.appendChild(document.createTextNode(cssText));
    }
    
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  
  /**
   * Initialize Easter Egg functionality
   */
  function init() {
    addEasterEggStyles();
    setupActivityMonitoring();
  }
  
  // Start the Easter Egg functionality
  init();
});