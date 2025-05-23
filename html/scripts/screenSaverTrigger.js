const INACTIVITY_TRIGGER_SECONDS = 120;
const TIMEOUT_POLLING_INTERVAL = 1000;

const DEFAULT_PATH = "../screenSaver/screenSaver.html";

var last_interaction = Date.now();
var inactivityTimer = null;

function initScreenSaverTrigger() {
  /**
   * Polling elapsed time since last interaction
   * and redirect to screensaver page if it exceeded
   */
  inactivityTimer = setInterval(function () {
    var now = Date.now();
    var seconds_since_last_interaction = Math.floor(
      (now - last_interaction) / 1000
    );

    if (seconds_since_last_interaction >= INACTIVITY_TRIGGER_SECONDS) {
      window.location.href = window.CUSTOM_SCREENSAVER_PATH || DEFAULT_PATH;
      //window.location.href = window.location.origin + "/pages/screenSaver/screenSaver.html"
    }
  }, TIMEOUT_POLLING_INTERVAL);

  addInteractionEvents();
}

function addInteractionEvents() {
  /**
   * Add event listeners to reset the inactivity timer
   * on user interaction events
   */
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

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(initScreenSaverTrigger, 1);
}
