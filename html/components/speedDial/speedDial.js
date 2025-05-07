var isMuted = localStorage.getItem("isMuted") === "true";
var pepperController = window.pepperController;

const DEFAULT_PATH_MUTE_BUTTON = "../../assets/icons/volume_mute.svg";
const DEFAULT_PATH_UNMUTE_BUTTON = "../../assets/icons/volume_on.png";

function updateMuteUI() {
  var muteBtn = document.getElementById("muteBtn");
  if (!muteBtn) return;

  var muteImg = muteBtn.querySelector("img");
  if (isMuted) {
    muteImg.src = window.CUSTOM_UNMUTE_PATH || DEFAULT_PATH_UNMUTE_BUTTON;
  } else {
    muteImg.src = window.CUSTOM_MUTE_PATH || DEFAULT_PATH_MUTE_BUTTON;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var speedDial = document.querySelector(".speed-dial");
  var speedDialButton = document.querySelector(".speed-dial-button");
  var muteBtn = document.getElementById("muteBtn");
  var stopBtn = document.getElementById("stopBtn");

  updateMuteUI();

  if (speedDialButton) {
    speedDialButton.addEventListener("click", function () {
      speedDial.classList.toggle("active");
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", function () {
      pepperController.shutUpAndContinue();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", function () {
      if (isMuted) {
        pepperController.setUnmute();
        pepperController.playSound(0);
      } else {
        pepperController.setMute();
        pepperController.playSound(0);
      }

      isMuted = !isMuted;
      localStorage.setItem("isMuted", isMuted ? "true" : "false");
      updateMuteUI();
    });
  }
});
