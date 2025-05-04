var isMuted = false;
var pepperController = window.pepperController;

document.addEventListener("DOMContentLoaded", function () {
  const speedDial = document.querySelector(".speed-dial");
  const speedDialButton = document.querySelector(".speed-dial-button");
  const muteBtn = document.getElementById("muteBtn");
  const stopBtn = document.getElementById("stopBtn");

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
        window.pepperController.setUnmute();
        window.pepperController.playSound(0);
        muteBtn.querySelector("img").src = "./assets/icons/volume_mute.svg";
      } else {
        window.pepperController.setMute();
        window.pepperController.playSound(0);
        muteBtn.querySelector("img").src = "./assets/icons/volume_on.png";
      }

      isMuted = !isMuted;
    });
  }
});
