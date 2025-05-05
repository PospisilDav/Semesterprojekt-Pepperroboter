const INACTIVITY_TRIGGER_SECONDS = 10;
const TIMEOUT_POLLING_INTERVAL = 1000;

const DEFAULT_PATH = "../screenSaver/ScreenSaver.html";

var last_interaction = Date.now();
var inactivityTimer = null;

function initScreenSaverTrigger() {
  inactivityTimer = setInterval(function () {
    var now = Date.now();
    var seconds_since_last_interaction = Math.floor(
      (now - last_interaction) / 1000
    );

    if (seconds_since_last_interaction >= INACTIVITY_TRIGGER_SECONDS) {
      window.location.href = window.CUSTOM_SCREENSAVER_PATH || DEFAULT_PATH;
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

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(initScreenSaverTrigger, 1);
}
