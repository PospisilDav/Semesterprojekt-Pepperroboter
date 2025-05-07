var isMuted = localStorage.getItem("isMuted") === "true";

function updateUI() {
  var muteText = document.getElementById("muteText");
  var muteImg = document.querySelector("#muteBtn img");

  if (isMuted) {
    muteText.textContent = "Entstummen";
    muteImg.src = "../../assets/icons/volume_on.png";
  } else {
    muteText.textContent = "Stummschalten";
    muteImg.src = "../../assets/icons/volume_mute.svg";
  }
}

function toggleMute() {
  if (isMuted) {
    window.pepperController.setUnmute();
    window.pepperController.playSound(0);
  } else {
    window.pepperController.playSound(0);
    window.pepperController.setMute();
  }

  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted ? "true" : "false");
  updateUI();
}

function volPlus() {
  window.pepperController.volPlus();
  window.pepperController.playSound(0);
}

function volMinus() {
  window.pepperController.volMinus();
  window.pepperController.playSound(0);
}

document.addEventListener("DOMContentLoaded", function () {
  updateUI();
  var muteBtn = document.getElementById("muteBtn");
  muteBtn.addEventListener("click", function () {
    toggleMute();
  });
});
