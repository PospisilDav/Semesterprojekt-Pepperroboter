"use strict";

var pepperController = window.pepperController;

function homepageFullyLoaded(e) {
  window.console.log("Homepage initialized");

  pepperController.setUnmute(); // default: set unmute
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
  const headerAvatar = document.querySelector(".header-avatar");

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
