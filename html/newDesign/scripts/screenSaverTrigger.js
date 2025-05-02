var INACTIVITY_TRIGGER_SECONDS = 2000;
var TIMEOUT_POLLING_INTERVAL = 1000;

function resolve_path_dynamically() {
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
    return rootPath + '/pages/screenSaver/ScreenSaver.html';
  } else {
    // Fallback: Relativer Pfad zur Screensaver-Seite
    console.log("Warning: Could not locate newDesign in path");
    return './pages/screenSaver/ScreenSaver.html';
  }
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
        var screenSaverPath = resolve_path_dynamically();
        console.log("Navigating to screen saver at: " + screenSaverPath);
        window.location.href = screenSaverPath;
      } catch (e) {
        console.log("Error redirecting to screen saver: " + e.message);
        // Fallback versuchen
        window.location.href = './pages/screenSaver/ScreenSaver.html';
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