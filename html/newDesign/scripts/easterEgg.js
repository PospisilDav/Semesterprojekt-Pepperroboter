/**
 * Easter Egg - Mini Pepper that appears after being active for a set time
 */
(function() {
  // Initialize when DOM is ready
  function domReadyHandler() {
    // Activity tracking variables
    var activeTime = 0;
    var lastActivityTime = new Date().getTime();
    var activityInterval = null;
    
    // Configuration
    var ACTIVITY_CHECK_FREQUENCY = 1000; // Check interval in ms
    var ACTIVITY_REQUIREMENT_MINUTES = 1; // Minutes before Pepper appears
    var MAX_INACTIVITY_TIME = 90000; // Max inactivity time in ms (1.5 min)
    
    var pepperIcon = null;
    
    // Start tracking user activity
    function setupActivityMonitoring() {
      lastActivityTime = new Date().getTime();
      
      activityInterval = window.setInterval(function() {
        var currentTime = new Date().getTime();
        var timeSinceLastActivity = currentTime - lastActivityTime;
        
        // Reset on inactivity
        if (timeSinceLastActivity > MAX_INACTIVITY_TIME) {
          window.console && console.log("Inactive for too long, resetting counter");
          activeTime = 0;
          updateDebugInfo();
          hideSmallPepper();
          return;
        }
        
        activeTime = activeTime + 1;
        updateDebugInfo();
        
        // Show Easter egg when time requirement met
        if (activeTime >= ACTIVITY_REQUIREMENT_MINUTES * 60) {
          showSmallPepper();
        }
      }, ACTIVITY_CHECK_FREQUENCY);
      
      // Register user interaction events
      addEventListeners(['click', 'mousemove', 'keypress', 'touchstart', 'scroll'], recordUserActivity);
    }
    
    // Add events with cross-browser support
    function addEventListeners(events, handler) {
      for (var i = 0; i < events.length; i++) {
        if (document.addEventListener) {
          document.addEventListener(events[i], handler, false);
        } else if (document.attachEvent) {
          document.attachEvent('on' + events[i], handler);
        } else {
          document['on' + events[i]] = handler;
        }
      }
    }
    
    // Track user activity
    function recordUserActivity() {
      lastActivityTime = new Date().getTime();
    }
    
    // Display the Pepper icon
    function showSmallPepper() {
      if (pepperIcon && document.body.contains(pepperIcon)) {
        return;
      }
      
      try {
        pepperIcon = document.createElement('div');
        pepperIcon.className = 'easter-egg-pepper-icon';
        pepperIcon.setAttribute('title', 'Klick mich!');
        
        // Add navigation on click
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
        
        document.body.appendChild(pepperIcon);
        
        // Animate entrance
        window.setTimeout(function() {
          pepperIcon.style.opacity = '1';
          pepperIcon.style.transform = 'translateX(15px) rotate(90deg)';
          pepperIcon.style.webkitTransform = 'translateX(15px) rotate(90deg)';
          pepperIcon.style.MozTransform = 'translateX(15px) rotate(90deg)';
          pepperIcon.style.msTransform = 'translateX(15px) rotate(90deg)';
        }, 100);
      } catch (e) {
        window.console && console.log("Error showing Pepper icon: " + e.message);
      }
    }
    
    // Remove the Pepper icon
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
    
    // Update debug display
    function updateDebugInfo() {
      var debugElement = document.getElementById('easter-egg-debug');
      if (debugElement) {
        var minutesActive = Math.floor(activeTime / 60);
        var secondsActive = activeTime % 60;
        if (typeof debugElement.textContent !== 'undefined') {
          debugElement.textContent = 'Active time: ' + minutesActive + 'm ' + secondsActive + 's';
        } else {
          debugElement.innerText = 'Active time: ' + minutesActive + 'm ' + secondsActive + 's';
        }
      }
    }
    
    // Handle Easter egg activation
    function triggerEasterEgg(method) {
      window.console && console.log('Easter egg triggered by: ' + method);
      
      try {
        // Create transition effect
        var overlay = document.createElement('div');
        overlay.className = 'easter-egg-overlay';
        document.body.appendChild(overlay);
        
        var path = resolveTeamPagePath();
        
        window.setTimeout(function() {
          window.location.href = path;
        }, 800);
      } catch (e) {
        window.console && console.log("Error triggering easter egg: " + e.message);
        window.location.href = './pages/teamPage/teamPage.html';
      }
    }
    
    // Get path to team page from current location
    function resolveTeamPagePath() {
      // Get base URL
      var baseUrl;
      var currentUrl = window.location.href;
      var lastSlashIndex = currentUrl.lastIndexOf('/');
      
      if (lastSlashIndex !== -1) {
        baseUrl = currentUrl.substring(0, lastSlashIndex);
      } else {
        baseUrl = currentUrl;
      }
      
      // Find project root
      var newDesignIndex = baseUrl.indexOf('/newDesign');
      
      if (newDesignIndex !== -1) {
        var rootPath = baseUrl.substring(0, newDesignIndex + '/newDesign'.length);
        return rootPath + '/pages/teamPage/teamPage.html';
      } else {
        return './pages/teamPage/teamPage.html';
      }
    }
    
    // Add CSS for Easter egg elements
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
          '  background-image: url("./assets/mini_pepper.png");',
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
    
        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = cssText;
        } else {
          styleElement.appendChild(document.createTextNode(cssText));
        }
        
        var head = document.getElementsByTagName('head')[0];
        if (head) {
          head.appendChild(styleElement);
        } else {
          document.body.appendChild(styleElement);
        }
      } catch (e) {
        window.console && console.log("Error adding styles: " + e.message);
      }
    }
    
    // Start functionality
    function init() {
      try {
        addEasterEggStyles();
        setupActivityMonitoring();
      } catch (e) {
        window.console && console.log("Error initializing Easter egg: " + e.message);
      }
    }
    
    init();
  }

  // Cross-browser DOM ready handler
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", domReadyHandler);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState === "complete") {
        domReadyHandler();
      }
    });
  } else {
    var oldonload = window.onload;
    window.onload = function() {
      if (typeof oldonload === 'function') {
        oldonload();
      }
      domReadyHandler();
    };
  }

  // Immediate initialization if document is already loaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(domReadyHandler, 1);
  }
})();