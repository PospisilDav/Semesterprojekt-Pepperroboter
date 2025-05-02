var INACTIVITY_TRIGGER_SECONDS = 10;
var TIMEOUT_POLLING_INTERVAL = 1000;

function resolve_path_dynamically() {
  var currentPath = window.location.pathname;
  var pathParts = currentPath.split("/");
  var projectRootIndex = -1;
  
  for (var i = 0; i < pathParts.length; i++) {
    if (pathParts[i] === "newDesign") {
      projectRootIndex = i;
      break;
    }
  }
  
  if (projectRootIndex === -1) {
    console.log("Warning: Could not locate project root directory");
    return "ScreenSaver.html";
  }
  
  var rootPath = pathParts.slice(0, projectRootIndex + 1).join("/");
  var htmlPath = "file://" + rootPath + "/pages/screenSaver/ScreenSaver.html";
  return htmlPath;
}

var last_interaction = Date.now();
var inactivityTimer = null;

function initScreenSaverTrigger() {
  inactivityTimer = setInterval(function() {
    var now = Date.now();
    var seconds_since_last_interaction = Math.floor(
      (now - last_interaction) / 1000
    );
    
    if (seconds_since_last_interaction >= INACTIVITY_TRIGGER_SECONDS) {
      console.log("Inactivity detected, redirecting to screen saver...");
      try {
        window.location.href = resolve_path_dynamically();
      } catch (e) {
        console.log("Error redirecting to screen saver: " + e.message);
      }
    }
  }, TIMEOUT_POLLING_INTERVAL);
  
  addInteractionEvents();
}

function addInteractionEvents() {
  var events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
  
  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      document.addEventListener(events[i], resetInteractionTimer, false);
    } else if (document.attachEvent) {
      document.attachEvent("on" + events[i], resetInteractionTimer);
    } else {
      document["on" + events[i]] = resetInteractionTimer;
    }
  }
}

function resetInteractionTimer() {
  last_interaction = Date.now();
}

if (window.addEventListener) {
  window.addEventListener("load", initScreenSaverTrigger, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", initScreenSaverTrigger);
} else {
  window.onload = initScreenSaverTrigger;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initScreenSaverTrigger, 1);
}