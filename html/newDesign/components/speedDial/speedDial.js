var isMuted = false;

document.addEventListener("DOMContentLoaded", function () {
  const speedDial = document.querySelector(".speed-dial");
  const speedDialButton = document.querySelector(".speed-dial-button");
  const muteBtn = document.getElementById("muteBtn");

  if (speedDialButton) {
    speedDialButton.addEventListener("click", function () {
      speedDial.classList.toggle("active");
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", function () {
      if (isMuted) {
        console.log("Test");
        window.pepperController.setUnmute();
        window.pepperController.playSound(0);
        muteBtn.querySelector("img").src = "./assets/icons/volume_mute.svg";
      } else {
        console.log("Test");
        window.pepperController.setMute();
        window.pepperController.playSound(0);
        muteBtn.querySelector("img").src = "./assets/icons/volume_on.png";
      }

      isMuted = !isMuted;
    });
  }
});
