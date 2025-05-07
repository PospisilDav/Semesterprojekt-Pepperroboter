"use strict";

var pepperController = window.pepperController;

function homepageFullyLoaded(e) {
  window.console.log("Homepage initialized");

  // Check if 'isMuted' value is already stored
  var isMutedStored = localStorage.getItem("isMuted");

  if (isMutedStored === null) {
    // First visit: default is unmuted
    pepperController.setUnmute();
    localStorage.setItem("isMuted", "false");
    window.console.log("First visit: unmuted by default");
  } else {
    // Later visits: apply saved mute state
    var isMuted = isMutedStored === "true";
    if (isMuted) {
      pepperController.setMute();
    } else {
      pepperController.setUnmute();
    }
    window.console.log("Repeat visit: isMuted =", isMuted);
  }

  // Immediately stop any current speech
  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hallo! Ich bin Pepper. Wählen Sie eine der Optionen unten oder tippen Sie auf meinen Bildschirm um zu beginnen."
    );
  }, 800);
}

window.addEventListener("load", homepageFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  var headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hallo! Ich bin Pepper. Wählen Sie eine der Optionen unten oder tippen Sie auf meinen Bildschirm um zu beginnen."
        );
      }, 800);
    });
  }
});
