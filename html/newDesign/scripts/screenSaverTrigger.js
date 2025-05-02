const INACTIVITY_TRIGGER_SECONDS = 120;
const TIMEOUT_POLLING_INTERVAL = 1000;

function resolve_path_dynamically() {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");
  const projectRootIndex = pathParts.indexOf("newDesign");
  const rootPath = pathParts.slice(0, projectRootIndex + 1).join("/");
  const htmlPath = "file://" + rootPath + "/pages/screenSaver/ScreenSaver.html";
  return htmlPath;
}

var last_interaction = Date.now();

setInterval(function () {
  const now = Date.now();
  const seconds_since_last_interaction = Math.floor(
    (now - last_interaction) / 1000
  );
  if (seconds_since_last_interaction >= INACTIVITY_TRIGGER_SECONDS) {
    console.log("Inactivity detected, redirecting to screen saver...");
    window.location.href = resolve_path_dynamically();
  }
}, TIMEOUT_POLLING_INTERVAL);

document.addEventListener("click", function () {
  console.log("User interaction detected, resetting inactivity timer...");
  last_interaction = Date.now();
});
