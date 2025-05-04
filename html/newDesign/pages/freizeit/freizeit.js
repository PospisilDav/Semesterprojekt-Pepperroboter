"use strict";

var pepperController = window.pepperController;

function freizeitFullyLoaded(e) {
  window.console.log("freizeit initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Entdecken Sie sportliche Aktivitäten und regionale Spezialitäten in Furtwangen."
    );
  }, 800);
}

window.addEventListener("load", freizeitFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Entdecken Sie sportliche Aktivitäten und regionale Spezialitäten in Furtwangen."
        );
      }, 800);
    });
  }
});
