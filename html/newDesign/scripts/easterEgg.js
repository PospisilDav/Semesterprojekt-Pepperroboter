/**
 * Easter Egg - Mini Pepper that appears after being active for a set time
 * WebView 48 Compatible Version
 */
(function() {
  // Wait for DOM to be ready using browser-compatible approach
  function domReadyHandler() {
    // Activity tracking variables
    var activeTime = 0;
    var lastActivityTime = new Date().getTime();
    var activityInterval = null;
    
    // Constants
    var ACTIVITY_CHECK_FREQUENCY = 1000; // Updates counter every second
    var ACTIVITY_REQUIREMENT_MINUTES = 1; // Pepper appears after 2 minutes of active usage
    var MAX_INACTIVITY_TIME = 90000; // User must interact at least every 1.5 minutes (90s)
    
    // Pepper icon element reference
    var pepperIcon = null;
    
    /**
     * Sets up monitoring of user activity
     */
    function setupActivityMonitoring() {
      // Create timestamp of last activity
      lastActivityTime = new Date().getTime();
      
      // Monitor user activity
      activityInterval = window.setInterval(function() {
        var currentTime = new Date().getTime();
        var timeSinceLastActivity = currentTime - lastActivityTime;
        
        // If user has been inactive for more than a minute, reset the counter
        if (timeSinceLastActivity > MAX_INACTIVITY_TIME) {
          window.console && console.log("Inactive for too long, resetting counter");
          activeTime = 0;
          updateDebugInfo();
          hideSmallPepper(); // Hide pepper icon if it was showing
          return;
        }
        
        // Increment active time counter
        activeTime = activeTime + 1;
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
      lastActivityTime = new Date().getTime();
    }
    
    /**
     * Show the small Pepper icon
     */
    function showSmallPepper() {
      // If already showing, do nothing
      if (pepperIcon && document.body.contains(pepperIcon)) {
        return;
      }
      
      try {
        // Create the small pepper icon if it doesn't exist
        pepperIcon = document.createElement('div');
        pepperIcon.className = 'easter-egg-pepper-icon';
        pepperIcon.setAttribute('title', 'Klick mich!');
        
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
        window.setTimeout(function() {
          pepperIcon.style.opacity = '1';
          pepperIcon.style.transform = 'translateX(15px) rotate(90deg)';
          pepperIcon.style.webkitTransform = 'translateX(15px) rotate(90deg)'; // Safari/WebKit support
          pepperIcon.style.MozTransform = 'translateX(15px) rotate(90deg)'; // Firefox support
          pepperIcon.style.msTransform = 'translateX(15px) rotate(90deg)'; // IE support
        }, 100);
      } catch (e) {
        window.console && console.log("Error showing Pepper icon: " + e.message);
      }
    }
    
    /**
     * Hide the small Pepper icon
     */
    function hideSmallPepper() {
      if (pepperIcon && document.body.contains(pepperIcon)) {
        pepperIcon.style.opacity = '0';
        pepperIcon.style.transform = 'translateX(-20px)';
        pepperIcon.style.webkitTransform = 'translateX(-20px)';
        pepperIcon.style.MozTransform = 'translateX(-20px)';
        pepperIcon.style.msTransform = 'translateX(-20px)';
        
        window.setTimeout(function() {
          try {
            if (pepperIcon && document.body.contains(pepperIcon)) {
              document.body.removeChild(pepperIcon);
            }
          } catch (e) {
            window.console && console.log("Error removing Pepper icon: " + e.message);
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
        // Set content in compatibility mode
        if (typeof debugElement.textContent !== 'undefined') {
          debugElement.textContent = 'Active time: ' + minutesActive + 'm ' + secondsActive + 's';
        } else {
          debugElement.innerText = 'Active time: ' + minutesActive + 'm ' + secondsActive + 's';
        }
      }
    }
    
    /**
     * Trigger the easter egg and navigate to team page
     */
    function triggerEasterEgg(method) {
      window.console && console.log('Easter egg triggered by: ' + method);
      
      try {
        // Create a transition effect
        var overlay = document.createElement('div');
        overlay.className = 'easter-egg-overlay';
        document.body.appendChild(overlay);
        
        // Resolve the path dynamically
        var path = resolveTeamPagePath();
        
        // Navigate after a small delay
        window.setTimeout(function() {
          window.location.href = path;
        }, 800);
      } catch (e) {
        window.console && console.log("Error triggering easter egg: " + e.message);
        // Fallback: direct navigation
        window.location.href = './pages/teamPage/teamPage.html';
      }
    }
    
    /**
     * Resolve the path to the team page dynamically
     */
    function resolveTeamPagePath() {
      // Basis-URL extrahieren (ohne Dateinamen)
      var baseUrl;
      var currentUrl = window.location.href;
      var lastSlashIndex = currentUrl.lastIndexOf('/');
      
      if (lastSlashIndex !== -1) {
        baseUrl = currentUrl.substring(0, lastSlashIndex);
      } else {
        baseUrl = currentUrl;
      }
      
      // Finden Sie die Position von "newDesign" im Pfad
      var newDesignIndex = baseUrl.indexOf('/newDesign');
      
      if (newDesignIndex !== -1) {
        // Extrahieren Sie den Basispfad bis einschließlich "newDesign"
        var rootPath = baseUrl.substring(0, baseUrl.indexOf('/newDesign') + '/newDesign'.length);
        return rootPath + '/pages/teamPage/teamPage.html';
      } else {
        // Fallback: Relativer Pfad
        return './pages/teamPage/teamPage.html';
      }
    }
    
    /**
     * Add required CSS styles
     */
    function addEasterEggStyles() {
      try {
        var styleElement = document.createElement('style');
        var cssText = [
          '.easter-egg-pepper-icon {',
          '  position: fixed;',
          '  top: 100px;',
          '  left: -20px;',
          '  width: 75px;',
          '  height: 75px;',
          '  background-image: url("./assets/mini_pepper.jpg");',
          '  background-size: contain;',
          '  background-repeat: no-repeat;',
          '  background-position: center;',
          '  cursor: pointer;',
          '  z-index: 9999;',
          '  opacity: 0;',
          '  transform: rotate(90deg);',
          '  -webkit-transform: rotate(90deg);',
          '  -moz-transform: rotate(90deg);',
          '  -ms-transform: rotate(90deg);',
          '  -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;',
          '  -moz-transition: opacity 0.5s ease, -moz-transform 0.5s ease;',
          '  -ms-transition: opacity 0.5s ease, -ms-transform 0.5s ease;',
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
          '  -webkit-animation: easter-egg-flash 1s ease-out;',
          '  animation: easter-egg-flash 1s ease-out;',
          '}',
          '@-webkit-keyframes easter-egg-flash {',
          '  0% { opacity: 0; }',
          '  50% { opacity: 1; }',
          '  100% { opacity: 0; }',
          '}',
          '@keyframes easter-egg-flash {',
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
        
        var head = document.getElementsByTagName('head')[0];
        if (head) {
          head.appendChild(styleElement);
        } else {
          // Fallback if head is not available
          document.body.appendChild(styleElement);
        }
      } catch (e) {
        window.console && console.log("Error adding styles: " + e.message);
      }
    }
    
    /**
     * Initialize Easter Egg functionality
     */
    function init() {
      try {
        addEasterEggStyles();
        setupActivityMonitoring();
      } catch (e) {
        window.console && console.log("Error initializing Easter egg: " + e.message);
      }
    }
    
    // Start the Easter Egg functionality
    init();
  }

  // Cross-browser DOMContentLoaded
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", domReadyHandler);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState === "complete") {
        domReadyHandler();
      }
    });
  } else {
    // Fallback method
    var oldonload = window.onload;
    window.onload = function() {
      if (typeof oldonload === 'function') {
        oldonload();
      }
      domReadyHandler();
    };
  }

  // Also initialize immediately if document is already complete
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(domReadyHandler, 1);
  }
})();